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
import { useState, useEffect, useCallback, Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Listbox, Transition, Switch } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import AiImageAnalysisPreview from '../ProPreviews/AiImageAnalysisPreview';
import Overlay from '../ProPreviews/common/Overlay';

const AiSettings = ({ settingsData, aiSettingsData, setSettings }) => {
    const getProviderConfigs = () => {
        const configs = window.weDocsAdminVars?.aiProviderConfigs || {};
        const providers = {};

        Object.keys(configs).forEach((providerKey) => {
            const provider = configs[providerKey];
            const safeModels =
                typeof provider?.models === 'object' && provider.models !== null
                    ? provider.models
                    : {};
            const modelKeys = Object.keys(safeModels);
            const firstModel = modelKeys[0] || '';

            providers[providerKey] = {
                api_key: '',
                models: modelKeys,
                selected_model: firstModel,
            };
        });

        return providers;
    };

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
        image_analysis: {
            enabled: false,
            max_size: 1024 // Default 1MB in KB
        },
        ...aiSettingsData
    });

    // { [providerKey]: [{ value, label, vision }] } — populated by live API fetch.
    const [dynamicModels, setDynamicModels] = useState({});
    // { [providerKey]: boolean } — true while the fetch is in flight.
    const [modelsLoading, setModelsLoading] = useState({});

    /**
     * Fetch the live model list for a provider from the REST endpoint.
     * On success the dynamic list replaces the static one in the dropdown.
     * On failure the static list is kept — no change needed.
     *
     * Pass `forceRefresh = true` to bust the server-side transient cache.
     */
    const fetchModelsForProvider = useCallback( async ( provider, forceRefresh = false ) => {
        setModelsLoading( prev => ({ ...prev, [provider]: true }) );
        try {
            const path = `/wp/v2/docs/ai/models/${provider}` + ( forceRefresh ? '?refresh=true' : '' );
            const result = await apiFetch({ path, method: 'GET' });
            if ( Array.isArray( result?.models ) && result.models.length ) {
                setDynamicModels( prev => ({
                    ...prev,
                    [provider]: result.models.map( m => ({
                        value: m.id,
                        label: m.name,
                        vision: m.vision,
                    }) ),
                }) );
            }
        } catch ( _err ) {
            // Network / auth failure — keep the static fallback, nothing to update.
        } finally {
            setModelsLoading( prev => ({ ...prev, [provider]: false }) );
        }
    }, [] );

    // On mount, fetch models for every provider that already has an API key saved.
    useEffect( () => {
        const configs = window.weDocsAdminVars?.aiProviderConfigs || {};
        Object.keys( configs ).forEach( providerKey => {
            const hasKey = aiSettings.providers?.[ providerKey ]?.has_api_key;
            if ( hasKey ) {
                fetchModelsForProvider( providerKey );
            }
        } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    // Re-fetch when the user switches the active provider (and a key is saved).
    useEffect( () => {
        const provider = aiSettings.default_provider;
        const hasKey   = aiSettings.providers?.[ provider ]?.has_api_key;
        if ( hasKey ) {
            fetchModelsForProvider( provider );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ aiSettings.default_provider ] );

    // Get provider configurations from centralized configs.
    // Dynamic models (from the live API) override the static list when available.
    const getProviderConfigsForUI = () => {
        const configs = window.weDocsAdminVars?.aiProviderConfigs || {};
        const providerConfigs = {};

        Object.keys(configs).forEach(providerKey => {
            const provider = configs[providerKey];

            // Prefer the live-fetched list; fall back to the static config.
            const models = dynamicModels[providerKey] ?? Object.keys(provider.models).map(modelKey => {
                const modelConfig = provider.models[modelKey];

                // Handle both old string format and new object format.
                const modelName = typeof modelConfig === 'object' ? modelConfig.name : modelConfig;
                const hasVision = typeof modelConfig === 'object' ? modelConfig.vision : false;

                return { value: modelKey, label: modelName, vision: hasVision };
            });

            providerConfigs[providerKey] = {
                name: provider.name,
                models,
            };
        });

        return providerConfigs;
    };

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

    const handleFeatureToggle = (feature, value) => {
        const updatedSettings = {
            ...aiSettings,
            features: {
                ...aiSettings.features,
                [feature]: {
                    ...aiSettings.features?.[feature],
                    enabled: value,
                },
            },
        };

        setAiSettings(updatedSettings);
        setSettings({
            ...settingsData,
            ai: updatedSettings,
        });
    };

    const handleSummaryModeChange = (mode) => {
        const updatedSettings = {
            ...aiSettings,
            features: {
                ...aiSettings.features,
                ai_summaries: {
                    ...aiSettings.features?.ai_summaries,
                    display_mode: mode,
                },
            },
        };
        setAiSettings(updatedSettings);
        setSettings({ ...settingsData, ai: updatedSettings });
    };

    // Handler for image analysis setting changes.
    const handleImageAnalysisChange = (field, value) => {
        const updatedSettings = {
            ...aiSettings,
            image_analysis: {
                ...aiSettings.image_analysis,
                [field]: value,
            },
        };

        setAiSettings(updatedSettings);
        setSettings({
            ...settingsData,
            ai: updatedSettings,
        });
    };

    const maskApiKey = (key) => {
        if (!key) return '';
        if (key.length <= 8) return key;

        const firstPart = key.substring(0, 4);
        const lastPart = key.substring(key.length - 4);
        const middleAsterisks = '*'.repeat(17);

        return firstPart + middleAsterisks + lastPart;
    };

    let providerConfigs = getProviderConfigsForUI();

    /**
     * Filter: wedocs_ai_provider_configs
     *
     * Allows customization of AI provider configurations including available models.
     *
     * @param {Object} providerConfigs - The provider configurations object
     * @since 2.0.0
     */
    providerConfigs = wp.hooks.applyFilters(
        'wedocs_ai_provider_configs',
        providerConfigs
    );

    useEffect(() => {
        setAiSettings({
            ...aiSettings,
            ...aiSettingsData,
        });
    }, [aiSettingsData]);

    const isPro = !!window.weDocsAdminVars?.pro_active;
    const [showSummaryOverlay, setShowSummaryOverlay] = useState(false);
    const hasApiKey = !!aiSettings.providers[aiSettings.default_provider]?.api_key;

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
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                        {option?.label}
                                                    </span>
                                                    {selected && (
                                                        <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-indigo-600'}`}>
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
    const AiModelSelect = ({ value, onChange, options, isLoading = false }) => {
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
                    <Listbox value={selectedModel} onChange={handleChange} disabled={isLoading}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                                <span className="block truncate">{isLoading ? __('Loading models…', 'wedocs') : selectedModel?.label}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    {isLoading ? (
                                        <ArrowPathIcon className="h-4 w-4 text-gray-400 animate-spin" aria-hidden="true" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    )}
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
                                                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                        {option?.label}
                                                    </span>
                                                    {selected && (
                                                        <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-indigo-600'}`}>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
                                    <div className="relative flex items-center gap-2">
                                        <div className="flex-1">
                                            <AiModelSelect
                                                value={aiSettings.providers[aiSettings.default_provider]?.selected_model || providerConfigs[aiSettings.default_provider]?.models[0]?.value}
                                                onChange={(value) => handleProviderChange(aiSettings.default_provider, 'selected_model', value)}
                                                options={providerConfigs[aiSettings.default_provider]?.models || []}
                                                isLoading={modelsLoading[aiSettings.default_provider] || false}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            title={__('Refresh model list', 'wedocs')}
                                            disabled={modelsLoading[aiSettings.default_provider]}
                                            onClick={() => fetchModelsForProvider(aiSettings.default_provider, true)}
                                            className="flex-shrink-0 p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ArrowPathIcon
                                                className={`h-4 w-4 ${modelsLoading[aiSettings.default_provider] ? 'animate-spin' : ''}`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                                <p className="text-sm text-[#6B7280]">
                                    {modelsLoading[aiSettings.default_provider]
                                        ? __('Fetching available models…', 'wedocs')
                                        : __('Select the model for this provider', 'wedocs')
                                    }
                                </p>
                            </div>
                        </div>

                        {/**
                         * Filter: wedocs_ai_settings_after_model
                         *
                         * Allows Pro and other extensions to add settings after the AI model selector.
                         * Used for adding image analysis toggle and other Pro-specific settings.
                         *
                         * @since 2.2.0
                         *
                         * @param {null}     content                  Default content (null).
                         * @param {Object}   aiSettings               Current AI settings state.
                         * @param {Function} handleImageAnalysisChange Handler for image analysis setting changes.
                         * @param {Object}   providerConfigs          Provider configurations with model info.
                         */}
                        {wp.hooks.applyFilters(
                            'wedocs_ai_settings_after_model',
                            null,
                            aiSettings,
                            handleImageAnalysisChange,
                            providerConfigs
                        )}

                        {/* Image Analysis Settings - Shows when Pro is loaded */}
                        {wp.hooks.applyFilters('wedocs_pro_loaded', false) && aiSettings?.image_analysis?.enabled && (
                            <div className="col-span-4">
                                <div className="settings-content flex items-center justify-between">
                                    <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                        <label
                                            className="block text-sm font-medium text-gray-600"
                                            htmlFor="image-max-size"
                                        >
                                            {__('Maximum Image Size', 'wedocs')}
                                        </label>
                                        <div
                                            className="tooltip cursor-pointer ml-2 z-[9999]"
                                            data-tip={__(
                                                'Maximum file size for AI image analysis uploads',
                                                'wedocs'
                                            )}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
                                        <div className="relative flex items-center gap-2">
                                            <input
                                                type="number"
                                                id="image-max-size"
                                                name="image_max_size"
                                                min="100"
                                                max="5120"
                                                step="100"
                                                placeholder="1024"
                                                className="w-32 !rounded-md !border-gray-300 bg-white !py-1 !pl-3 !pr-3 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                value={aiSettings.image_analysis?.max_size || 1024}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value) || 1024;
                                                    const boundedValue = Math.max(100, Math.min(5120, value));
                                                    handleImageAnalysisChange('max_size', boundedValue);
                                                }}
                                            />
                                            <span className="text-sm text-gray-600">KB</span>
                                            <div className="ml-3 px-3 py-1 bg-gray-100 rounded-md">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {aiSettings.image_analysis?.max_size >= 1024
                                                        ? `${(aiSettings.image_analysis.max_size / 1024).toFixed(1)} MB`
                                                        : `${aiSettings.image_analysis?.max_size || 1024} KB`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                                    <p className="text-sm text-[#6B7280]">
                                        {__('Set the maximum file size for image uploads. Minimum: 100KB, Maximum: 5MB (5120KB). Default: 1MB (1024KB).', 'wedocs')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* AI Doc Summary — PRO feature */}
                        <div
                            className="col-span-4 relative"
                            onMouseEnter={() => !isPro && setShowSummaryOverlay(true)}
                            onMouseLeave={() => setShowSummaryOverlay(false)}
                        >
                            <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 mb-5" />
                            <div className="settings-content flex items-center justify-between">
                                <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                    <label className="block text-sm font-medium text-gray-600">
                                        {__('Enable AI Doc Summary', 'wedocs')}
                                    </label>
                                    <div
                                        className="tooltip cursor-pointer ml-2 z-[9999]"
                                        data-tip={__(
                                            'Show a collapsible AI-generated summary on each doc page. Requires an API key.',
                                            'wedocs'
                                        )}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
                                    <div className={`flex items-center ${!hasApiKey ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <Switch
                                            checked={!!aiSettings.features?.ai_summaries?.enabled}
                                            onChange={(val) => handleFeatureToggle('ai_summaries', val)}
                                            disabled={!hasApiKey || !isPro}
                                            aria-label="Toggle AI document summaries"
                                            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer outline-0 items-center justify-center rounded-full"
                                        >
                                            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out ${
                                                    !!aiSettings.features?.ai_summaries?.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
                                                    !!aiSettings.features?.ai_summaries?.enabled ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                            />
                                        </Switch>
                                        <span className="ml-3 text-sm text-gray-900">
                                            {!!aiSettings.features?.ai_summaries?.enabled
                                                ? __('Enable', 'wedocs')
                                                : __('Disable', 'wedocs')}
                                        </span>
                                    </div>
                                    {!hasApiKey && isPro && (
                                        <p className="text-xs text-amber-600 mt-1">
                                            {__('Add an API key above to enable AI Doc Summary.', 'wedocs')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                                <p className="text-sm text-[#6B7280]">
                                    {__('When enabled, readers can expand a collapsible AI summary on any doc page.', 'wedocs')}
                                </p>
                            </div>

                            {/* Default Display Mode */}
                            <div className="settings-content flex items-center justify-between mt-5">
                                <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                    <label className="block text-sm font-medium text-gray-600">
                                        {__('Default Display Mode', 'wedocs')}
                                    </label>
                                    <div
                                        className="tooltip cursor-pointer ml-2 z-[9999]"
                                        data-tip={__('Force all docs to use a specific presentation mode.', 'wedocs')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
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
                                    <div className="flex items-center gap-4">
                                        {[
                                            { value: 'summary', label: __('Summary only', 'wedocs') },
                                            { value: 'highlights', label: __('Highlights only', 'wedocs') },
                                        ].map((opt) => {
                                            const isSelected = (aiSettings.features?.ai_summaries?.display_mode || 'summary') === opt.value;
                                            return (
                                                <label
                                                    key={opt.value}
                                                    className={`flex items-center gap-2 cursor-pointer text-sm ${
                                                        isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'
                                                    } ${!isPro || !hasApiKey ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    <span
                                                        className={`relative inline-flex items-center justify-center h-4 w-4 rounded-full border-2 flex-shrink-0 transition-colors duration-150 ${
                                                            isSelected ? 'border-indigo-600' : 'border-gray-300'
                                                        }`}
                                                    >
                                                        {isSelected && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="ai_summaries_display_mode"
                                                        value={opt.value}
                                                        checked={isSelected}
                                                        onChange={() => handleSummaryModeChange(opt.value)}
                                                        disabled={!isPro || !hasApiKey}
                                                        className="sr-only"
                                                    />
                                                    {opt.label}
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-[#6B7280] mt-1">
                                        {__('Force all docs to use a specific mode if needed.', 'wedocs')}
                                    </p>
                                </div>
                            </div>

                            <Overlay
                                classes={`${showSummaryOverlay ? 'flex items-center justify-center' : 'hidden'}`}
                            />
                        </div>

                        {/* Show Pro preview when Pro is not loaded */}
                        {!wp.hooks.applyFilters('wedocs_pro_loaded', false) && (
                            <AiImageAnalysisPreview />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiSettings;
