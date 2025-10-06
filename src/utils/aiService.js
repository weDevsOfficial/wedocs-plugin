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
        this.providers = {
            openai: {
                name: 'OpenAI',
                baseUrl: 'https://api.openai.com/v1',
                models: {
                    'gpt-4': 'GPT-4',
                    'gpt-4o-mini': 'GPT-4o Mini',
                    'gpt-3.5-turbo': 'GPT-3.5 Turbo'
                }
            },
            anthropic: {
                name: 'Anthropic',
                baseUrl: 'https://api.anthropic.com/v1',
                models: {
                    'claude-3-opus-20240229': 'Claude 3 Opus',
                    'claude-3-sonnet-20240229': 'Claude 3.5 Sonnet',
                    'claude-3-haiku-20240307': 'Claude 3 Haiku'
                }
            },
            google: {
                name: 'Google Gemini',
                baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
                models: {
                    'gemini-1.5-pro': 'Gemini 1.5 Pro',
                    'gemini-1.5-flash': 'Gemini 1.5 Flash',
                    'gemini-1.0-pro': 'Gemini 1.0 Pro'
                }
            },
            azure: {
                name: 'Azure OpenAI',
                baseUrl: null, // Will be set from endpoint
                models: {
                    'gpt-4': 'GPT-4',
                    'gpt-4o-mini': 'GPT-4o Mini',
                    'gpt-3.5-turbo': 'GPT-3.5 Turbo'
                }
            }
        };

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
         * @param {Object} providers.azure - Azure OpenAI provider configuration
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
        return {
            default_provider: 'openai',
            providers: {
                openai: {
                    api_key: '',
                    models: ['gpt-4', 'gpt-4o-mini', 'gpt-3.5-turbo'],
                    selected_model: 'gpt-4'
                },
                anthropic: {
                    api_key: '',
                    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
                    selected_model: 'claude-3-sonnet-20240229'
                },
                google: {
                    api_key: '',
                    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'],
                    selected_model: 'gemini-1.5-pro'
                },
                azure: {
                    api_key: '',
                    endpoint: '',
                    models: ['gpt-4', 'gpt-4o-mini', 'gpt-3.5-turbo'],
                    selected_model: 'gpt-4'
                }
            },
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

            // For Azure, endpoint is required
            if (provider === 'azure' && !endpoint) {
                throw new Error(__('Azure endpoint is required', 'wedocs'));
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
            const endpoint = provider === 'azure' ? providerConfig.endpoint : null;

            // Prepare the request payload
            const payload = this.preparePayload(provider, selectedModel, prompt, options);

            // Make the API call
            const response = await this.makeApiCall(
                provider, 
                providerConfig.api_key, 
                endpoint, 
                payload
            );

            return this.parseResponse(provider, response);
        } catch (error) {
            console.error('AI content generation failed:', error);
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
            azure: {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hello' }],
                max_tokens: 10
            }
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
            azure: {
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
            }
        };

        return basePayloads[provider] || basePayloads.openai;
    }

    /**
     * Make API call to the specified provider
     */
    async makeApiCall(provider, apiKey, endpoint, payload) {
        const providerConfig = this.providers[provider];
        let url, headers;

        // Prepare URL and headers based on provider
        switch (provider) {
            case 'openai':
                url = `${providerConfig.baseUrl}/chat/completions`;
                headers = {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                };
                break;

            case 'anthropic':
                url = `${providerConfig.baseUrl}/messages`;
                headers = {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                };
                break;

            case 'google':
                url = `${providerConfig.baseUrl}/models/${payload.model || 'gemini-1.5-pro'}:generateContent?key=${apiKey}`;
                headers = {
                    'Content-Type': 'application/json'
                };
                break;

            case 'azure':
                url = `${endpoint}/openai/deployments/${payload.model}/chat/completions?api-version=2023-12-01-preview`;
                headers = {
                    'api-key': apiKey,
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error?.message || 
                errorData.message || 
                __('API request failed', 'wedocs')
            );
        }

        return await response.json();
    }

    /**
     * Parse response from different providers
     */
    parseResponse(provider, response) {
        switch (provider) {
            case 'openai':
            case 'azure':
                return {
                    content: response.choices?.[0]?.message?.content || '',
                    usage: response.usage || null
                };

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

            if (providerKey === 'azure' && config.api_key && !config.endpoint) {
                errors.push(`${providerKey}: ${__('Endpoint is required for Azure OpenAI', 'wedocs')}`);
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
