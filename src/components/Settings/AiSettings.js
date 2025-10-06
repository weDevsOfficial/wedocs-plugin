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
    // Get centralized provider configs from wedocs_get_ai_provider_configs() PHP function
    // This ensures consistency across all AI features and settings
    const getProviderConfigs = () => {
        const configs = window.weDocsAdminVars?.aiProviderConfigs || {};
        const providers = {};
        
        // Generate settings from centralized configs
        Object.keys(configs).forEach(providerKey => {
            const provider = configs[providerKey];
            const modelKeys = Object.keys(provider.models);
            const firstModel = modelKeys[0]; // Use first model as default
            
            providers[providerKey] = {
                api_key: '',
                models: modelKeys,
                selected_model: firstModel
            };
            
            // Add endpoint for Azure if it exists
            if (providerKey === 'azure') {
                providers[providerKey].endpoint = '';
            }
        });

        return providers;
    };

    // Get default provider and model from centralized config
    const getDefaultProviderAndModel = () => {
        const providers = getProviderConfigs();
        const providerKeys = Object.keys(providers);
        const defaultProvider = providerKeys[0] || 'openai';
        const defaultModel = providers[defaultProvider]?.selected_model || 'gpt-4o-mini';
        
        return { defaultProvider, defaultModel };
    };

    const { defaultProvider, defaultModel } = getDefaultProviderAndModel();

    const [aiSettings, setAiSettings] = useState({
        default_provider: defaultProvider,
        providers: getProviderConfigs(),
        features: {
            ai_search: {
                enabled: false,
                provider: defaultProvider,
                model: defaultModel
            },
            ai_summaries: {
                enabled: false,
                provider: defaultProvider,
                model: defaultModel
            },
            ai_qa: {
                enabled: false,
                provider: defaultProvider,
                model: defaultModel
            },
            ai_recommendations: {
                enabled: false,
                provider: defaultProvider,
                model: defaultModel
            },
            ai_acknowledgements: {
                enabled: false,
                provider: defaultProvider,
                model: defaultModel
            }
        },
        ...aiSettingsData
    });

    // Get provider configurations from centralized configs
    const getProviderConfigsForUI = () => {
        const configs = window.weDocsAdminVars?.aiProviderConfigs || {};
        const providerConfigs = {};
        
        Object.keys(configs).forEach(providerKey => {
            const provider = configs[providerKey];
            const models = [];
            
            Object.keys(provider.models).forEach(modelKey => {
                models.push({
                    value: modelKey,
                    label: provider.models[modelKey]
                });
            });
            
            providerConfigs[providerKey] = {
                name: provider.name,
                models: models
            };
        });
        
        return providerConfigs;
    };

    let providerConfigs = getProviderConfigsForUI();

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
        
        // Show first 4 and last 4 characters, fill middle with asterisks
        // Maximum 15 characters total: 4 + 17 asterisks + 4 = 25
        const firstPart = key.substring(0, 4);
        const lastPart = key.substring(key.length - 4);
        const middleAsterisks = '*'.repeat(17); // Always 7 asterisks for consistent length
        
        return firstPart + middleAsterisks + lastPart;
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
                                            options={Object.keys(providerConfigs).map(providerKey => ({
                                                value: providerKey,
                                                label: providerConfigs[providerKey].name
                                            }))}
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
                                                <TextControl
                                                    label={__('API Key', 'wedocs')}
                                                    type="password"
                                                    style={{ width: '100%' }}
                                                    value={aiSettings.providers[selectedProvider]?.api_key || ''}
                                                    onChange={(value) => handleProviderChange(selectedProvider, 'api_key', value)}
                                                    placeholder={__('Enter your API key', 'wedocs')}
                                                    help={aiSettings.providers[selectedProvider]?.api_key ? 
                                                        `Current: ${maskApiKey(aiSettings.providers[selectedProvider].api_key)}` : 
                                                        __('Enter your API key for this provider', 'wedocs')
                                                    }
                                                />
                                                
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
