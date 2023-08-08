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
    },
    permission: {
      global_permission: [],
      role_wise_permission: [],
    },
    assistant: {
      turnstile_site_key: '',
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
    },
    layout: {
      template: 'default',
      right_bar: 'on',
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
    case 'SET_SAVING':
      return { ...state, saving: action.saving };
    case 'SET_TURNSTILE_SITE_KEY':
      return {
        ...state,
        settings: {
          ...state.settings,
          assistant: {
            ...state.settings.assistant,
            turnstile_site_key: action.siteKey,
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
