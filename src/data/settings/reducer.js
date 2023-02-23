const DEFAULT_SETTINGS_STATE = {
  roles: {},
  settings: {
    general: {
      docs_home: '',
      email: 'on',
      email_to: '',
      helpful: 'on',
      comments: 'on',
      print: 'on',
    },
  },
  loading: false,
  saving: false,
  wedocsVersion: '1.7.1',
  upgradeVersion: '2.0.0',
};

const reducer = ( state = DEFAULT_SETTINGS_STATE, action ) => {
  switch ( action.type ) {
    case 'SET_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_SETTINGS_OPTION':
      return {
        ...state,
        settings: {
          ...state.settings,
          [ action.option ]: action.value,
        },
      };
    case 'SET_WEDOCS_VERSION':
      return { ...state, wedocsVersion: action.wedocsVersion };
    case 'SET_UPGRADE_VERSION':
      return { ...state, upgradeVersion: action.upgradeVersion };
    case 'SET_SAVING':
      return { ...state, saving: action.saving };
    default:
      return state;
  }
};

export default reducer;
