const DEFAULT_STATE = {
  docs: [],
  pages: [],
  parents: [],
  loading: false,
  sorting: false,
  userDocIds: [],
  helpfulDocs: [],
  needSorting: false,
  restrictedArticleList: [],
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

      const isNotInParent = !state.parents.some( parent => parent?.id === action?.doc?.id );
      if ( !action.doc.parent && isNotInParent ) {
        setDocState.parents = [ { ...action.doc }, ...state.parents ];
      }
      return setDocState;

    case 'SET_USER_DOC_IDS':
      return {
        ...state,
        userDocIds: [ ...state.userDocIds, ...action.userDocIds ],
      };

    case 'SET_USER_DOC_ID':
      return {
        ...state,
        userDocIds: [ ...state.userDocIds, action.userDocId ],
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

    case 'SET_SORTING_STATUS':
      return {
        ...state,
        sorting: action.sorting,
      };

    case 'SET_NEED_SORTING_STATUS':
      return {
        ...state,
        needSorting: action.needSorting,
      };

    case 'SET_HELPFUL_DOCS':
      return {
        ...state,
        helpfulDocs: action.helpfulDocs,
      };

    case 'REMOVE_DOC':
      return {
        ...state,
        docs: [ ...state.docs?.filter( doc => doc.id !== action.docId ) ],
        parents: [ ...state.parents?.filter( parent => parent.id !== action.docId ) ],
      };

    case 'SET_RESTRICTED_ARTICLES':
      return {
        ...state,
        restrictedArticleList: [ ...action.restrictedArticleList ],
      };

    case 'SET_RESTRICTED_ARTICLE':
      return {
        ...state,
        restrictedArticleList: [
          ...state.restrictedArticleList,
          { ...action.restrictedArticle }
        ],
      };

    default:
      return state;
  }
};

export default reducer;
