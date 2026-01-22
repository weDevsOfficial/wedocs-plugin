/**
 * AI Service Utility
 *
 * Centralized service for managing AI provider integrations
 * and API calls across all AI-powered features in weDocs.
 *
 * Available WordPress Filters:
 *
 * @filter wedocs_ai_service_providers
 * Allows customization of AI service provider configurations including models,
 * base URLs, and provider names for the AI service utility.
 *
 * @since 2.0.0
 */

import { __ } from '@wordpress/i18n';

class AiService {
    constructor() {
        // Use centralized provider configs from WordPress
        this.providers = window.weDocsEditorVars?.aiProviderConfigs || {};

        /**
         * Filter: wedocs_ai_service_providers
         *
         * Allows customization of AI service provider configurations including models,
         * base URLs, and provider names for the AI service utility.
         *
         * @param {Object} providers - The providers configuration object
         * @param {Object} providers.openai - OpenAI provider configuration
         * @param {string} providers.openai.name - Provider display name
         * @param {string} providers.openai.baseUrl - API base URL
         * @param {Object} providers.openai.models - Available models object (key: model_id, value: display_name)
         * @param {Object} providers.anthropic - Anthropic provider configuration
         * @param {Object} providers.google - Google Gemini provider configuration
         *
         * @example
         * // Add a new model to OpenAI
         * wp.hooks.addFilter('wedocs_ai_service_providers', 'my-plugin', function(providers) {
         *     providers.openai.models['gpt-4-turbo'] = 'GPT-4 Turbo';
         *     return providers;
         * });
         *
         * @example
         * // Add a completely new provider
         * wp.hooks.addFilter('wedocs_ai_service_providers', 'my-plugin', function(providers) {
         *     providers.custom_provider = {
         *         name: 'Custom AI Provider',
         *         baseUrl: 'https://api.custom-provider.com/v1',
         *         models: {
         *             'custom-model-1': 'Custom Model 1',
         *             'custom-model-2': 'Custom Model 2'
         *         }
         *     };
         *     return providers;
         * });
         *
         * @example
         * // Modify existing provider configuration
         * wp.hooks.addFilter('wedocs_ai_service_providers', 'my-plugin', function(providers) {
         *     providers.openai.baseUrl = 'https://custom-openai-proxy.com/v1';
         *     return providers;
         * });
         *
         * @since 2.0.0
         */
        this.providers = wp.hooks.applyFilters('wedocs_ai_service_providers', this.providers);
    }

    /**
     * Get AI settings from WordPress
     */
    async getAiSettings() {
        try {
            const response = await fetch('/wp-json/wp/v2/docs/settings?data=wedocs_settings');
            const settings = await response.json();
            return settings?.ai || this.getDefaultAiSettings();
        } catch (error) {
            return this.getDefaultAiSettings();
        }
    }

    /**
     * Get default AI settings structure
     */
    getDefaultAiSettings() {
        const providers = {};

        // Generate settings from centralized configs
        Object.keys(this.providers).forEach(providerKey => {
            const provider = this.providers[providerKey];
            const modelKeys = Object.keys(provider.models);
            const firstModel = modelKeys[0]; // Use first model as default

            providers[providerKey] = {
                api_key: '',
                models: modelKeys,
                selected_model: firstModel
            };

        });

        return {
            default_provider: 'openai',
            providers: providers
        };
    }

    /**
     * Test API connection for a specific provider
     */
    async testApiConnection(provider, apiKey, endpoint = null) {
        try {
            const providerConfig = this.providers[provider];
            if (!providerConfig) {
                throw new Error(__('Invalid provider specified', 'wedocs'));
            }

            if (!apiKey) {
                throw new Error(__('API key is required', 'wedocs'));
            }


            const testPayload = this.getTestPayload(provider);
            const response = await this.makeApiCall(provider, apiKey, endpoint, testPayload);

            return {
                success: true,
                message: __('API connection successful', 'wedocs'),
                response: response
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || __('API connection failed', 'wedocs'),
                error: error
            };
        }
    }

    /**
     * Generate content using AI
     */
    async generateContent(prompt, options = {}) {
        try {
            const aiSettings = await this.getAiSettings();
            const {
                provider = aiSettings.default_provider,
                model = null,
                feature = 'ai_doc_writer'
            } = options;

            // Get provider and model configuration
            const providerConfig = aiSettings.providers[provider];

            if (!providerConfig) {
                throw new Error(__('AI provider not configured', 'wedocs'));
            }

            const selectedModel = model || providerConfig.selected_model;

            // Make the API call directly via WordPress REST API
            // Pass prompt and options directly instead of creating provider-specific payloads
            const restUrl = '/wp-json/wp/v2/docs/ai/generate';
            const nonce = window.weDocsEditorVars?.nonce || '';
            
            const requestBody = {
                prompt: prompt,
                provider: provider,
                model: selectedModel,
                maxTokens: options.maxTokens || 2000,
                temperature: options.temperature || 0.7,
                systemPrompt: options.systemPrompt || __('You are a helpful documentation assistant.', 'wedocs')
            };
            
            const response = await fetch(restUrl, {
                method: 'POST',
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                let errorData = {};
                let errorMessage = __('AI content generation failed. Please try again.', 'wedocs');

                try {
                    const responseText = await response.text();

                    if (responseText.trim().startsWith('{')) {
                        errorData = JSON.parse(responseText);
                        // Use the message from the API, which should already be user-friendly
                        errorMessage = errorData.message || errorData.code || errorMessage;
                        
                        // Clean up HTML error messages (WordPress fatal errors)
                        if (errorMessage.includes('<p>') || errorMessage.includes('critical error')) {
                            errorMessage = __('A server error occurred. Please try again or contact support if the problem persists.', 'wedocs');
                        }
                    } else {
                        // For non-JSON responses, provide user-friendly message
                        if (response.status === 500) {
                            errorMessage = __('A server error occurred. Please try again.', 'wedocs');
                        } else if (response.status === 403) {
                            errorMessage = __('You do not have permission to perform this action.', 'wedocs');
                        } else {
                            errorMessage = __('An error occurred. Please try again.', 'wedocs');
                        }
                    }
                } catch (parseError) {
                    // If we can't parse the error, provide a generic user-friendly message
                    if (response.status === 500) {
                        errorMessage = __('A server error occurred. Please try again.', 'wedocs');
                    } else {
                        errorMessage = __('An error occurred. Please try again.', 'wedocs');
                    }
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            // Return in format expected by callers
            return {
                content: data.content || '',
                usage: data.usage || null
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * List available models for Google Gemini API
     */
    async listGoogleModels(apiKey) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error?.message ||
                    errorData.message ||
                    __('Failed to list Google models', 'wedocs')
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get test payload for API connection testing
     */
    getTestPayload(provider) {
        const testPrompts = {
            openai: {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hello' }],
                max_tokens: 10
            },
            anthropic: {
                model: 'claude-3-haiku-20240307',
                max_tokens: 10,
                messages: [{ role: 'user', content: 'Hello' }]
            },
            google: {
                contents: [{
                    parts: [{ text: 'Hello' }]
                }]
            },
        };

        return testPrompts[provider] || testPrompts.openai;
    }

    /**
     * Prepare payload for content generation
     */
    preparePayload(provider, model, prompt, options = {}) {
        const basePayloads = {
            openai: {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: options.systemPrompt || __('You are a helpful documentation assistant.', 'wedocs')
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: options.maxTokens || 2000,
                temperature: options.temperature || 0.7
            },
            anthropic: {
                model: model,
                max_tokens: options.maxTokens || 2000,
                messages: [
                    {
                        role: 'user',
                        content: `${options.systemPrompt || __('You are a helpful documentation assistant.', 'wedocs')}\n\n${prompt}`
                    }
                ]
            },
            google: {
                contents: [{
                    parts: [{
                        text: `${options.systemPrompt || __('You are a helpful documentation assistant.', 'wedocs')}\n\n${prompt}`
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: options.maxTokens || 2000,
                    temperature: options.temperature || 0.7
                }
            },
        };

        const finalPayload = basePayloads[provider] || basePayloads.openai;

        return finalPayload;
    }

    /**
     * Make API call to the specified provider via WordPress REST API
     * This method is kept for backward compatibility with testApiConnection
     */
    async makeApiCall(provider, apiKey, endpoint, payload, model = null) {
        // Extract options from payload (provider-specific payloads vary)
        const options = this.extractOptionsFromPayload(provider, payload);
        
        // Use WordPress REST API endpoint instead of direct API calls
        const restUrl = '/wp-json/wp/v2/docs/ai/generate';
        
        // Get nonce from localized script
        const nonce = window.weDocsEditorVars?.nonce || '';
        
        const response = await fetch(restUrl, {
            method: 'POST',
            credentials: 'include', // Include cookies for authentication
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': nonce
            },
            body: JSON.stringify({
                prompt: options.prompt,
                provider: provider,
                model: model || options.model,
                maxTokens: options.maxTokens || 2000,
                temperature: options.temperature || 0.7,
                systemPrompt: options.systemPrompt
            })
        });

        if (!response.ok) {
            let errorData = {};
            let errorMessage = __('API request failed', 'wedocs');

            try {
                const responseText = await response.text();

                // Try to parse as JSON
                if (responseText.trim().startsWith('{')) {
                    errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorData.code || errorMessage;
                } else {
                    // If it's HTML (like a 404 page), provide a more helpful message
                        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                    }
                } catch (parseError) {
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Return in format expected by parseResponse
        return data;
    }

    /**
     * Extract options from provider-specific payload
     */
    extractOptionsFromPayload(provider, payload) {
        switch (provider) {
            case 'openai':
                return {
                    prompt: payload.messages?.find(m => m.role === 'user')?.content || '',
                    systemPrompt: payload.messages?.find(m => m.role === 'system')?.content || '',
                    model: payload.model,
                    maxTokens: payload.max_tokens,
                    temperature: payload.temperature
                };
            case 'anthropic':
                // Anthropic combines system prompt and user prompt in the message content
                const anthropicContent = payload.messages?.[0]?.content || '';
                const parts = anthropicContent.split('\n\n');
                return {
                    prompt: parts.slice(1).join('\n\n') || parts[0] || '',
                    systemPrompt: parts[0] || '',
                    model: payload.model,
                    maxTokens: payload.max_tokens,
                    temperature: payload.temperature
                };
            case 'google':
                // Google combines system prompt and user prompt in the text
                const googleText = payload.contents?.[0]?.parts?.[0]?.text || '';
                const googleParts = googleText.split('\n\n');
                return {
                    prompt: googleParts.slice(1).join('\n\n') || googleParts[0] || '',
                    systemPrompt: googleParts[0] || '',
                    model: null, // Google model is handled separately
                    maxTokens: payload.generationConfig?.maxOutputTokens,
                    temperature: payload.generationConfig?.temperature
                };
            default:
                return {
                    prompt: '',
                    systemPrompt: '',
                    model: null,
                    maxTokens: 2000,
                    temperature: 0.7
                };
        }
    }

    /**
     * Parse response from different providers
     */
    parseResponse(provider, response) {
        switch (provider) {
            case 'openai':

            case 'anthropic':
                return {
                    content: response.content?.[0]?.text || '',
                    usage: response.usage || null
                };

            case 'google':
                return {
                    content: response.candidates?.[0]?.content?.parts?.[0]?.text || '',
                    usage: response.usageMetadata || null
                };

            default:
                return {
                    content: '',
                    usage: null
                };
        }
    }

    /**
     * Get available models for a provider
     */
    getProviderModels(provider) {
        return this.providers[provider]?.models || {};
    }

    /**
     * Validate AI settings
     */
    validateAiSettings(settings) {
        const errors = [];

        if (!settings.default_provider) {
            errors.push(__('Default provider is required', 'wedocs'));
        }

        if (!this.providers[settings.default_provider]) {
            errors.push(__('Invalid default provider', 'wedocs'));
        }

        // Validate provider configurations
        Object.entries(settings.providers || {}).forEach(([providerKey, config]) => {
            if (config.api_key && !this.providers[providerKey]) {
                errors.push(`${providerKey}: ${__('Invalid provider', 'wedocs')}`);
            }

        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Create and export a singleton instance
const aiService = new AiService();
export default aiService;
