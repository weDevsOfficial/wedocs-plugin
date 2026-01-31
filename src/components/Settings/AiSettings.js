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
import { useState, useEffect, Fragment, useMemo } from '@wordpress/element';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const AiSettings = ({
    settingsData,
    aiSettingsData,
    setSettings,
    searchQuery = '',
}) => {
    // Searchable terms for AI settings - defined at module level to avoid recreation
    const AI_SEARCHABLE_TERMS = [
        'AI Control', 'AI Provider', 'OpenAI', 'Anthropic', 'Google', 'Gemini',
        'API Key', 'Model', 'GPT', 'Claude', 'Default Provider', 'AI Settings',
        'artificial intelligence', 'machine learning', 'configuration', 'provider',
    ];
    
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


    // Custom AI Provider Select Component
    const AiProviderSelect = ({ value, onChange, options }) => {
        const [selectedProvider, setSelectedProvider] = useState(
            options.find(option => option.value === value) || options[0]
        );

        useEffect(() => {
            setSelectedProvider(options.find(option => option.value === value) || options[0]);
        }, [value, options]);

        const handleChange = (provider) => {
            setSelectedProvider(provider);
            onChange(provider.value);
        };

        return (
            <Fragment>
                {selectedProvider && Object.keys(selectedProvider).length > 0 ? (
                    <Listbox value={selectedProvider} onChange={handleChange}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <span className="block truncate">{selectedProvider?.label}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options?.map((option) => (
                                        <Listbox.Option
                                            key={option?.value}
                                            className={({ active }) =>
                                                `cursor-pointer relative select-none py-2 pl-3 pr-9 ${
                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900'
                                                }`
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-semibold' : 'font-normal'
                                                        }`}
                                                    >
                                                        {option?.label}
                                                    </span>
                                                    {selected && (
                                                        <span
                                                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                                active ? 'text-white' : 'text-indigo-600'
                                                            }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                ) : (
                    <div className="relative mt-1">
                        <input
                            className="relative !w-full cursor-pointer !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm"
                            placeholder={__('No providers available', 'wedocs')}
                            disabled
                        />
                    </div>
                )}
            </Fragment>
        );
    };

    // Custom AI Model Select Component
    const AiModelSelect = ({ value, onChange, options }) => {
        const [selectedModel, setSelectedModel] = useState(
            options.find(option => option.value === value) || options[0]
        );

        useEffect(() => {
            setSelectedModel(options.find(option => option.value === value) || options[0]);
        }, [value, options]);

        const handleChange = (model) => {
            setSelectedModel(model);
            onChange(model.value);
        };

        return (
            <Fragment>
                {selectedModel && Object.keys(selectedModel).length > 0 ? (
                    <Listbox value={selectedModel} onChange={handleChange}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <span className="block truncate">{selectedModel?.label}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options?.map((option) => (
                                        <Listbox.Option
                                            key={option?.value}
                                            className={({ active }) =>
                                                `cursor-pointer relative select-none py-2 pl-3 pr-9 ${
                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900'
                                                }`
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-semibold' : 'font-normal'
                                                        }`}
                                                    >
                                                        {option?.label}
                                                    </span>
                                                    {selected && (
                                                        <span
                                                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                                active ? 'text-white' : 'text-indigo-600'
                                                            }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                ) : (
                    <div className="relative mt-1">
                        <input
                            className="relative !w-full cursor-pointer !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm"
                            placeholder={__('No models available', 'wedocs')}
                            disabled
                        />
                    </div>
                )}
            </Fragment>
        );
    };

    // Helper function to check if AI settings match the search query
    const matchesSearch = (text) => {
        if (!searchQuery || searchQuery.trim() === '') return true;
        return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
    };

    // Check if any AI-related content matches the search
    const hasSearchMatch = useMemo(() => {
        if (!searchQuery || searchQuery.trim() === '') return true;
        
        return AI_SEARCHABLE_TERMS.some(term => matchesSearch(term));
    }, [searchQuery]);

    return (
        <section>
            <div className="shadow sm:rounded-md">
                <div className="bg-white sm:rounded-md min-h-[500px]">
                    <div className="section-heading py-4 px-8 sm:px-8 sm:py-4">
                        <h2 className="text-gray-900 font-medium text-lg">
                            {__('AI Control Settings', 'wedocs')}
                        </h2>
                    </div>
                    <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
                    {searchQuery && !hasSearchMatch ? (
                        <div className="pt-6 pb-20 px-8">
                            <p className="text-gray-500 text-center">
                                {__('No settings found matching your search.', 'wedocs')}
                            </p>
                        </div>
                    ) : (
                    <div className="pt-6 pb-20 px-8 grid grid-cols-4 gap-5">
                        {/* Default AI Provider */}
                        <div className="col-span-4">
                            <div className="settings-content flex items-center justify-between">
                                <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                    <label
                                        className="block text-sm font-medium text-gray-600"
                                        id="headlessui-listbox-label-ai-provider"
                                        data-headlessui-state="open"
                                    >
                                        {__('Default AI Provider', 'wedocs')}
                                    </label>
                                    <div
                                        className="tooltip cursor-pointer ml-2 z-[9999]"
                                        data-tip={__(
                                            'This provider will be used as the default for all AI features unless overridden',
                                            'wedocs'
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="none"
                                        >
                                            <path
                                                d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z"
                                                stroke="#6b7280"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
                                    <div className="relative">
                                        <AiProviderSelect
                                            value={aiSettings.default_provider}
                                            onChange={handleDefaultProviderChange}
                                            options={Object.keys(providerConfigs).map(providerKey => ({
                                                value: providerKey,
                                                label: providerConfigs[providerKey].name
                                            }))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                                <p className="text-sm text-[#6B7280]">
                                    {__('This provider will be used as the default for all AI features unless overridden.', 'wedocs')}
                                </p>
                            </div>
                        </div>

                        {/* API Key */}
                        <div className="col-span-4">
                            <div className="settings-content flex items-center justify-between">
                                <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                    <label
                                        className="block text-sm font-medium text-gray-600"
                                        id="headlessui-listbox-label-api-key"
                                        data-headlessui-state="open"
                                    >
                                        {__('API Key', 'wedocs')}
                                    </label>
                                    <div
                                        className="tooltip cursor-pointer ml-2 z-[9999]"
                                        data-tip={__(
                                            'Enter your API key for the selected AI provider',
                                            'wedocs'
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="none"
                                        >
                                            <path
                                                d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z"
                                                stroke="#6b7280"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="settings-field w-full max-w-[490px] ml-auto flex-2">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="ai_api_key"
                                            id="ai-api-key"
                                            placeholder={__('Enter your API key', 'wedocs')}
                                            className="w-full !rounded-md !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                            value={aiSettings.providers[aiSettings.default_provider]?.api_key || ''}
                                            onChange={(e) => handleProviderChange(aiSettings.default_provider, 'api_key', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {aiSettings.providers[aiSettings.default_provider]?.api_key && (
                                <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                                    <p className="text-sm text-[#6B7280]">
                                        {__('Current:', 'wedocs')} {maskApiKey(aiSettings.providers[aiSettings.default_provider].api_key)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* AI Model */}
                        <div className="col-span-4">
                            <div className="settings-content flex items-center justify-between">
                                <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                    <label
                                        className="block text-sm font-medium text-gray-600"
                                        id="headlessui-listbox-label-ai-model"
                                        data-headlessui-state="open"
                                    >
                                        {__('AI Model', 'wedocs')}
                                    </label>
                                    <div
                                        className="tooltip cursor-pointer ml-2 z-[9999]"
                                        data-tip={__(
                                            'Select the model for this AI provider',
                                            'wedocs'
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="none"
                                        >
                                            <path
                                                d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z"
                                                stroke="#6b7280"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
                                    <div className="relative">
                                        <AiModelSelect
                                            value={aiSettings.providers[aiSettings.default_provider]?.selected_model || providerConfigs[aiSettings.default_provider]?.models[0]?.value}
                                            onChange={(value) => handleProviderChange(aiSettings.default_provider, 'selected_model', value)}
                                            options={providerConfigs[aiSettings.default_provider]?.models || []}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                                <p className="text-sm text-[#6B7280]">
                                    {__('Select the model for this provider', 'wedocs')}
                                </p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AiSettings;
