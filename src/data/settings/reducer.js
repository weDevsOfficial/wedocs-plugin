const DEFAULT_SETTINGS_STATE = {
  roles: {},
  settings: {
    general: {
      docs_home: '',
      email: 'on',
      email_to: '',
      helpful: 'on',
      comments: 'off',
      print: 'on',
      enable_search: 'on',
      collapse_articles: 'off',
    },
    permission: {
      global_permission: [ 'administrator', 'editor' ],
      role_wise_permission: [ 'administrator' ],
    },
    assistant: {
      assist_enable: 'on',
      integrate_ai: {
        ai_enabled: 'off',
        sync_data: 'off',
        ai_response: {}
      },
      explore: {
        explore_enable: 'on',
      },
      message: {
        messaging_enable: 'on',
        turnstile_site_key: '',
      },
      placement: {
        order: [ 'integrate_ai', 'explore', 'message' ],
      },
      preference: {
        color_settings: {
          preview_colors: {
            widgetBg: { r: 99, g: 102, b: 241, a: 1 },
            activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
            activeTabFont: { r: 55, g: 65, b: 81, a: 1 },
            inactiveTabBg: { r: 67, g: 56, b: 202, a: 1 },
            inactiveTabFont: { r: 199, g: 210, b: 254, a: 1 },
            tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
            tabDescriptionFont: { r: 199, g: 210, b: 254, a: 1 },
            breadcrumbColor: { r: 67, g: 56, b: 202, a: 1 },
            bubbleBg: { r: 87, g: 116, b: 241, a: 1 },
            bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
          },
        },
      }
    },
    layout: {
      column: '2',
      nav_icon: 'on',
      right_bar: 'on',
      template: 'default',
      active_text: { r: 59, g: 130, b: 246, a: 1 },
      active_nav_bg: { r: 59, g: 130, b: 246, a: 1 },
      active_nav_text: { r: 255, g: 255, b: 255, a: 1 },
    },
    ai: {
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
    }
  },
  loading: false,
  saving: false,
  needUpgrade: false,
};

const reducer = ( state = DEFAULT_SETTINGS_STATE, action ) => {
  switch ( action.type ) {
    case 'SET_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ROLES':
      return { ...state, roles: action.roles };
    case 'SET_SETTINGS_OPTION':
      return {
        ...state,
        settings: {
          ...state.settings,
          [ action.option ]: action.value,
        },
      };
    case 'SET_UPGRADE_INFO':
      return { ...state, needUpgrade: action.needUpgrade };
    case 'SET_PROMO_NOTICE':
      return { ...state, promoNotice: action.promoNotice };
    case 'SET_SAVING':
      return { ...state, saving: action.saving };
    case 'SET_TURNSTILE_SITE_KEY':
      return {
        ...state,
        settings: {
          ...state.settings,
          assistant: {
            ...state.settings.assistant,
            message: {
              ...state.settings.assistant.message,
              turnstile_site_key: action.siteKey,
            }
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
