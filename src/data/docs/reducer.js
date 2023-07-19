const DEFAULT_STATE = {
  docs: [],
  pages: [],
  parents: [],
  loading: false,
  userDocIds: [],
  helpfulDocs: [],
};

const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case 'SET_DOCS':
      return {
        ...state,
        docs: [ ...action.docs ],
      };

    case 'SET_DOC':
      const setDocState = {
        ...state,
        docs: [ ...state.docs, action.doc ],
      };
      if ( !action.doc.parent ) {
        setDocState.parents = [ action.doc, ...state.parents ];
      }
      return setDocState;

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

    case 'SET_PARENT_DOCS':
      return {
        ...state,
        parents: [ ...action.parents ],
      };

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
