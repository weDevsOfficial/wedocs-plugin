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
            console.error('Failed to fetch AI settings:', error);
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

            if (!providerConfig || !providerConfig.api_key) {
                throw new Error(__('AI provider not configured or API key missing', 'wedocs'));
            }

            const selectedModel = model || providerConfig.selected_model;
            const endpoint = null;

            // Prepare the request payload
            const payload = this.preparePayload(provider, selectedModel, prompt, options);

            // Make the API call
            const response = await this.makeApiCall(
                provider,
                providerConfig.api_key,
                endpoint,
                payload,
                selectedModel
            );

            return this.parseResponse(provider, response);
        } catch (error) {
            console.error('AI content generation failed:', error);
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
     * Make API call to the specified provider
     */
    async makeApiCall(provider, apiKey, endpoint, payload, model = null) {
        const providerConfig = this.providers[provider];
        let url, headers;

        // Prepare URL and headers based on provider
        switch (provider) {
            case 'openai':
                // Use the endpoint directly from centralized config (already includes /chat/completions)
                url = providerConfig.endpoint || 'https://api.openai.com/v1/chat/completions';
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                };
                break;

            case 'anthropic':
                // Use the endpoint directly from centralized config (already includes /messages)
                url = providerConfig.endpoint || 'https://api.anthropic.com/v1/messages';
                headers = {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                };
                break;

            case 'google':
                // Use endpoint from centralized config and replace {model} placeholder
                const endpoint = providerConfig.endpoint || 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent';
                const selectedModel = model || 'gemini-2.0-flash-exp';
                url = endpoint.replace('{model}', selectedModel) + `?key=${apiKey}`;
                headers = {
                    'Content-Type': 'application/json'
                };
                break;


            default:
                throw new Error(__('Unsupported AI provider', 'wedocs'));
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let errorData = {};
            let errorMessage = __('API request failed', 'wedocs');

            try {
                const responseText = await response.text();

                // Try to parse as JSON
                if (responseText.trim().startsWith('{')) {
                    errorData = JSON.parse(responseText);
                    errorMessage = errorData.error?.message || errorData.message || errorMessage;
                } else {
                    // If it's HTML (like a 404 page), provide a more helpful message
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }
            } catch (parseError) {
                console.error('AI Service - Failed to parse error response:', parseError);
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }

            // If it's a Google model not found error, list available models
            if (provider === 'google' && errorMessage.includes('is not found for API version')) {
                try {
                    await this.listGoogleModels(apiKey);
                } catch (listError) {
                    console.error('AI Service - Failed to list models:', listError);
                }
            }

            throw new Error(errorMessage);
        }

        return await response.json();
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
