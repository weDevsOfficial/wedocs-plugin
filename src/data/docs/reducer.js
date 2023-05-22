const DEFAULT_STATE = {
  docs: [],
  pages: [],
  loading: false,
  userDocIds: [],
  helpfulDocs: [],
  // contributors: {},
};

const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case 'SET_DOCS':
      return {
        ...state,
        docs: [ ...action.docs ],
      };

    case 'SET_DOC':
      return {
        ...state,
        docs: [ ...state.docs, action.doc ],
      };

    case 'SET_USER_DOC_IDS':
      return {
        ...state,
        userDocIds: [ ...state.userDocIds, ...action.userDocIds ],
      };

    case 'SET_PAGES':
      return {
        ...state,
        pages: [ ...action.pages ],
      };

    // case 'SET_CONTRIBUTORS':
    //   return {
    //     ...state,
    //     contributors: { ...state.contributors, ...action.contributors },
    //   };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };

    case 'SET_HELPFUL_DOCS':
      return {
        ...state,
        helpfulDocs: action.helpfulDocs,
      };

    default:
      return state;
  }
};

export default reducer;
