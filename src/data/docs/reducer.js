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
  // Pagination state for the top-level doc listing.
  pagination: {
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 1,
    search: '',
  },
  // Parent IDs whose children have already been fetched, so a branch is only
  // ever loaded once.
  loadedChildren: [],
  loadingChildren: false,
};

const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case 'SET_DOCS':
      return {
        ...state,
        docs: [ ...action.docs ],
      };

    // Merge lazily-loaded docs into the flat list the tree selectors read from,
    // replacing any existing entry so a refetch never duplicates a row.
    case 'MERGE_DOCS': {
      const incoming = action.docs || [];

      if ( ! incoming.length ) {
        return state;
      }

      const merged = new Map( state.docs.map( ( doc ) => [ doc.id, doc ] ) );
      incoming.forEach( ( doc ) => merged.set( doc.id, { ...merged.get( doc.id ), ...doc } ) );

      return {
        ...state,
        docs: [ ...merged.values() ],
      };
    }

    // Swap in the current page's top-level docs without discarding children
    // that other requests have already loaded.
    case 'SET_PAGE_DOCS': {
      const roots = action.docs || [];
      const rootIds = new Set( roots.map( ( doc ) => doc.id ) );
      const keptChildren = state.docs.filter(
        ( doc ) => doc.parent && ! rootIds.has( doc.id )
      );

      return {
        ...state,
        docs: [ ...roots, ...keptChildren ],
      };
    }

    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.pagination },
      };

    case 'MARK_CHILDREN_LOADED':
      return {
        ...state,
        loadedChildren: [
          ...new Set( [ ...state.loadedChildren, ...action.parentIds ] ),
        ],
      };

    case 'SET_LOADING_CHILDREN':
      return {
        ...state,
        loadingChildren: action.loadingChildren,
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
        loadedChildren: state.loadedChildren.filter( ( id ) => id !== action.docId ),
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
