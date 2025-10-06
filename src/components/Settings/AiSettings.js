/**
 * AI Settings Component
 * 
 * Centralized AI Control Settings panel for weDocs that allows admins to configure
 * and manage API integrations with multiple AI providers.
 * 
 * Available WordPress Filters:
 * 
 * @filter wedocs_ai_provider_configs
 * Allows customization of AI provider configurations including available models.
 * Used in the settings UI to display provider options and model selections.
 * 
 * @filter wedocs_ai_service_providers  
 * Allows customization of AI service provider configurations for the AI service utility.
 * Used for API calls and provider management in the backend.
 * 
 * @since 2.0.0
 */

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
    Card,
    CardBody,
    CardHeader,
    TextControl,
    SelectControl,
    __experimentalVStack as VStack,
} from '@wordpress/components';

const AiSettings = ({
    settingsData,
    aiSettingsData,
    setSettings,
}) => {
    const [aiSettings, setAiSettings] = useState({
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
        features: {
            ai_search: {
                enabled: false,
                provider: 'openai',
                model: 'gpt-4o-mini'
            },
            ai_summaries: {
                enabled: false,
                provider: 'openai',
                model: 'gpt-4o-mini'
            },
            ai_qa: {
                enabled: false,
                provider: 'openai',
                model: 'gpt-4o-mini'
            },
            ai_recommendations: {
                enabled: false,
                provider: 'openai',
                model: 'gpt-4o-mini'
            },
            ai_acknowledgements: {
                enabled: false,
                provider: 'openai',
                model: 'gpt-4o-mini'
            }
        },
        ...aiSettingsData
    });

    // Provider configurations
    let providerConfigs = {
        openai: {
            name: 'OpenAI',
            models: [
                { value: 'gpt-4', label: 'GPT-4' },
                { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
            ]
        },
        anthropic: {
            name: 'Anthropic (Claude)',
            models: [
                { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
                { value: 'claude-3-sonnet-20240229', label: 'Claude 3.5 Sonnet' },
                { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' }
            ]
        },
        google: {
            name: 'Google Gemini',
            models: [
                { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
                { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
                { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' }
            ]
        },
        azure: {
            name: 'Azure OpenAI',
            models: [
                { value: 'gpt-4', label: 'GPT-4' },
                { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
            ]
        }
    };

    /**
     * Filter: wedocs_ai_provider_configs
     * 
     * Allows customization of AI provider configurations including available models.
     * 
     * @param {Object} providerConfigs - The provider configurations object
     * @param {Object} providerConfigs.openai - OpenAI configuration
     * @param {string} providerConfigs.openai.name - Provider display name
     * @param {Array} providerConfigs.openai.models - Available models array
     * @param {Object} providerConfigs.anthropic - Anthropic configuration
     * @param {Object} providerConfigs.google - Google Gemini configuration
     * @param {Object} providerConfigs.azure - Azure OpenAI configuration
     * 
     * @example
     * // Add a new model to OpenAI
     * wp.hooks.addFilter('wedocs_ai_provider_configs', 'my-plugin', function(configs) {
     *     configs.openai.models.push({
     *         value: 'gpt-4-turbo',
     *         label: 'GPT-4 Turbo'
     *     });
     *     return configs;
     * });
     * 
     * @example
     * // Add a completely new provider
     * wp.hooks.addFilter('wedocs_ai_provider_configs', 'my-plugin', function(configs) {
     *     configs.custom_provider = {
     *         name: 'Custom AI Provider',
     *         models: [
     *             { value: 'custom-model-1', label: 'Custom Model 1' },
     *             { value: 'custom-model-2', label: 'Custom Model 2' }
     *         ]
     *     };
     *     return configs;
     * });
     * 
     * @since 2.0.0
     */
    providerConfigs = wp.hooks.applyFilters('wedocs_ai_provider_configs', providerConfigs);


    useEffect(() => {
        setAiSettings({
            ...aiSettings,
            ...aiSettingsData
        });
    }, [aiSettingsData]);

    const handleProviderChange = (providerKey, field, value) => {
        const updatedSettings = {
            ...aiSettings,
            providers: {
                ...aiSettings.providers,
                [providerKey]: {
                    ...aiSettings.providers[providerKey],
                    [field]: value
                }
            }
        };

        setAiSettings(updatedSettings);
        setSettings({
            ...settingsData,
            ai: updatedSettings
        });
    };

    const handleDefaultProviderChange = (value) => {
        const updatedSettings = {
            ...aiSettings,
            default_provider: value
        };

        setAiSettings(updatedSettings);
        setSettings({
            ...settingsData,
            ai: updatedSettings
        });
    };


    const maskApiKey = (key) => {
        if (!key) return '';
        if (key.length <= 8) return key;
        return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
    };


    return (
        <section>
            <div className="shadow sm:rounded-md">
                <div className="bg-white sm:rounded-md min-h-[500px]">
                    <div className="section-heading py-4 px-8 sm:px-8 sm:py-4">
                        <h2 className="text-gray-900 font-medium text-lg">
                            {__('AI Control Settings', 'wedocs')}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {__('Configure AI providers and manage API integrations for all AI-powered features.', 'wedocs')}
                        </p>
                    </div>
                    <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
                    
                    <div className="pt-6 pb-20 px-8 space-y-8">
                        {/* Global Configuration */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {__('Global Configuration', 'wedocs')}
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4}>
                                    <div className="w-full">
                                        <SelectControl
                                            label={__('Default AI Provider', 'wedocs')}
                                            value={aiSettings.default_provider}
                                            options={[
                                                { value: 'openai', label: 'OpenAI' },
                                                { value: 'anthropic', label: 'Anthropic (Claude)' },
                                                { value: 'google', label: 'Google Gemini' },
                                                { value: 'azure', label: 'Azure OpenAI' }
                                            ]}
                                            onChange={handleDefaultProviderChange}
                                            help={__('This provider will be used as the default for all AI features unless overridden.', 'wedocs')}
                                        />
                                    </div>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Provider Configuration */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {__('AI Provider Configuration', 'wedocs')}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {__('Configure API key and model for the selected AI provider.', 'wedocs')}
                                </p>
                            </CardHeader>
                            <CardBody>
                                {(() => {
                                    const selectedProvider = aiSettings.default_provider;
                                    const providerConfig = providerConfigs[selectedProvider];
                                    
                                    return (
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <div className="mb-4">
                                                <h4 className="text-md font-medium text-gray-900">
                                                    {providerConfig.name}
                                                </h4>
                                            </div>
                                            
                                            <VStack spacing={3}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <TextControl
                                                        label={__('API Key', 'wedocs')}
                                                        type="password"
                                                        value={aiSettings.providers[selectedProvider]?.api_key || ''}
                                                        onChange={(value) => handleProviderChange(selectedProvider, 'api_key', value)}
                                                        placeholder={__('Enter your API key', 'wedocs')}
                                                        help={aiSettings.providers[selectedProvider]?.api_key ? 
                                                            `Current: ${maskApiKey(aiSettings.providers[selectedProvider].api_key)}` : 
                                                            __('Enter your API key for this provider', 'wedocs')
                                                        }
                                                    />
                                                    
                                                    {selectedProvider === 'azure' && (
                                                        <TextControl
                                                            label={__('Azure Endpoint', 'wedocs')}
                                                            value={aiSettings.providers[selectedProvider]?.endpoint || ''}
                                                            onChange={(value) => handleProviderChange(selectedProvider, 'endpoint', value)}
                                                            placeholder={__('https://your-resource.openai.azure.com/', 'wedocs')}
                                                            help={__('Your Azure OpenAI endpoint URL', 'wedocs')}
                                                        />
                                                    )}
                                                </div>
                                                
                                                <SelectControl
                                                    label={__('Model', 'wedocs')}
                                                    value={aiSettings.providers[selectedProvider]?.selected_model || providerConfig.models[0].value}
                                                    options={providerConfig.models}
                                                    onChange={(value) => handleProviderChange(selectedProvider, 'selected_model', value)}
                                                    help={__('Select the model for this provider', 'wedocs')}
                                                />
                                            </VStack>
                                        </div>
                                    );
                                })()}
                            </CardBody>
                        </Card>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiSettings;
