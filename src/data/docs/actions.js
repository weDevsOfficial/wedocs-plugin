import {
  getDocsFetchingPath,
  getDocsListingPath,
  getDocsChildrenPath,
} from './docsPath';
const actions = {
  setDocs( docs ) {
    return {
      type: 'SET_DOCS',
      docs,
    };
  },

  setDoc( doc ) {
    return { type: 'SET_DOC', doc };
  },

  setParentDocs( parents ) {
    return {
      type: 'SET_PARENT_DOCS',
      parents,
    };
  },

  setPages( pages ) {
    return {
      type: 'SET_PAGES',
      pages,
    };
  },

  setLoading( loading ) {
    return { type: 'SET_LOADING', loading };
  },

  setSortingStatus( sorting ) {
    return { type: 'SET_SORTING_STATUS', sorting };
  },

  setNeedSortingStatus( needSorting ) {
    return { type: 'SET_NEED_SORTING_STATUS', needSorting };
  },

  setUserDocIds( userDocIds ) {
    return { type: 'SET_USER_DOC_IDS', userDocIds };
  },

  setUserDocId( userDocId ) {
    return { type: 'SET_USER_DOC_ID', userDocId };
  },

  fetchFromAPI( path ) {
    return { type: 'FETCH_FROM_API', path };
  },

  fetchWithHeadersFromAPI( path ) {
    return { type: 'FETCH_WITH_HEADERS_FROM_API', path };
  },

  mergeDocs( docs ) {
    return { type: 'MERGE_DOCS', docs };
  },

  setPageDocs( docs ) {
    return { type: 'SET_PAGE_DOCS', docs };
  },

  setPagination( pagination ) {
    return { type: 'SET_PAGINATION', pagination };
  },

  markChildrenLoaded( parentIds ) {
    return { type: 'MARK_CHILDREN_LOADED', parentIds };
  },

  setLoadingChildren( loadingChildren ) {
    return { type: 'SET_LOADING_CHILDREN', loadingChildren };
  },

  /**
   * Load one page of top-level docs.
   *
   * Only roots are fetched — their section/article badges come from counts the
   * endpoint attaches, so no descendant is loaded until a doc is opened.
   *
   * @param {Object} options page / perPage / search overrides.
   */
  *loadDocsPage( options = {} ) {
    yield actions.setLoading( true );

    const { page = 1, perPage = 20, search = '' } = options;
    const { body, headers } = yield actions.fetchWithHeadersFromAPI(
      getDocsListingPath( { page, perPage, search } )
    );

    const roots = body || [];

    // Replace the roots for this page while keeping any children already
    // fetched: the dashboard resolver and a doc's own tree load can be in
    // flight at once, and a plain replace would drop the children under a
    // branch that still believes it is loaded.
    yield actions.setPageDocs( roots );
    yield actions.setParentDocs( roots );
    yield actions.setPagination( {
      page,
      perPage,
      search,
      total: parseInt( headers?.get?.( 'X-WP-Total' ) || roots.length, 10 ),
      totalPages: parseInt( headers?.get?.( 'X-WP-TotalPages' ) || 1, 10 ),
    } );

    yield actions.setLoading( false );

    return roots;
  },

  /**
   * Load the direct children of a doc, once.
   *
   * Children are merged into the same flat list the tree selectors already read
   * from, so every existing selector keeps working unchanged.
   *
   * @param {number} parentId Doc whose children should be loaded.
   */
  *loadDocChildren( parentId ) {
    const id = parseInt( parentId, 10 );

    if ( ! id ) {
      return [];
    }

    yield actions.setLoadingChildren( true );

    const children = yield actions.fetchFromAPI( getDocsChildrenPath( [ id ] ) );

    yield actions.mergeDocs( children || [] );
    yield actions.markChildrenLoaded( [ id ] );
    yield actions.setLoadingChildren( false );

    return children || [];
  },

  /**
   * Load a doc's sections and, in one further request, all of their articles.
   *
   * Used when a documentation is opened, where the listing screen needs two
   * levels at once. Two requests regardless of how many sections there are.
   *
   * @param {number} parentId Documentation being opened.
   */
  *loadDocTree( parentId ) {
    const id = parseInt( parentId, 10 );

    if ( ! id ) {
      return [];
    }

    yield actions.setLoadingChildren( true );

    let sections = [];
    let articles = [];

    try {
      sections = ( yield actions.fetchFromAPI( getDocsChildrenPath( [ id ] ) ) ) || [];
      yield actions.mergeDocs( sections );

      const sectionIds = sections.map( ( section ) => section.id );

      if ( sectionIds.length ) {
        articles = ( yield actions.fetchFromAPI( getDocsChildrenPath( sectionIds ) ) ) || [];
        yield actions.mergeDocs( articles );
      }

      // Marked only on success, so a documentation that genuinely has no
      // sections still counts as loaded and stops the screen waiting, while a
      // failed request is left unmarked and retried.
      yield actions.markChildrenLoaded( [ id, ...sectionIds ] );
    } finally {
      yield actions.setLoadingChildren( false );
    }

    return [ ...sections, ...articles ];
  },

  setHelpfulDocs( helpfulDocs ) {
    return { type: 'SET_HELPFUL_DOCS', helpfulDocs };
  },

  createDocsToAPI( doc ) {
    const path = '/wp/v2/docs';
    return { type: 'UPDATE_TO_API', path, data: doc };
  },

  removeDoc( docId ) {
    return { type: 'REMOVE_DOC', docId };
  },

  setRestrictedArticles( restrictedArticleList ) {
    return { type: 'SET_RESTRICTED_ARTICLES', restrictedArticleList };
  },

  setRestrictedArticle( restrictedArticle ) {
    return { type: 'SET_RESTRICTED_ARTICLE', restrictedArticle };
  },

  *createDoc( doc ) {
    const createdDoc = yield actions.createDocsToAPI( doc );
    yield actions.setUserDocId( createdDoc.id );
    yield actions.setDoc( createdDoc );
    return createdDoc;
  },

  *updateDoc( docId, data ) {
    const getDocsPath = getDocsFetchingPath();
    const path = '/wp/v2/docs/' + docId;
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI( getDocsPath );
    const parentDocs = response.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    yield actions.setParentDocs( sortableDocs );
    return actions.setDocs( response );
  },

  *updateDocs( data ) {
    const path = '/wp/v2/docs/update_docs_status';
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI( getDocsFetchingPath() );
    const parentDocs = response.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    yield actions.setParentDocs( sortableDocs );
    return actions.setDocs( response );
  },

  *updateNeedSortingStatus( data ) {
    const path = '/wp/v2/docs/need_sorting_status';
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs/need_sorting_status'
    );
    return actions.setNeedSortingStatus( response );
  },

  *updateSortingStatus( data ) {
    const path = '/wp/v2/docs/sorting_status';
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs/sorting_status'
    );
    yield actions.setNeedSortingStatus( response );
    return actions.setSortingStatus( response );
  },

  *updateDocMeta( docId, meta ) {
    const path = '/wp/v2/docs/' + docId + '/meta';
    const response = yield { type: 'UPDATE_TO_API', path, data: meta };
    yield actions.setRestrictedArticle( { id: docId, value: response } );
    return response;
  },

  *deleteDoc( docId ) {
    const path = '/wp/v2/docs/' + docId;
    yield { type: 'DELETE_TO_API', path };
    return actions.removeDoc( docId );
  },

  *updateParentDocs() {
    const getDocsPath = getDocsFetchingPath();

    const response = yield actions.fetchFromAPI( getDocsPath );
    const parentDocs = response.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort( ( a, b ) => a.menu_order - b.menu_order );

    yield actions.setParentDocs( sortableDocs );
    return actions.setDocs( response );
  },

  *sendMessage( data ) {
    const path = '/wp/v2/docs/message';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    return response;
  },

  *dismissPromoNotice( optionName ) {
    const response = yield actions.dismissPromoNoticeAPI( optionName );

    return response;
  },

  dismissPromoNoticeAPI( optionName ) {
    const path = '/wp/v2/docs/hide-promotion-notice';

    return { type: 'UPDATE_TO_API', path, data: { option_name: optionName } };
  },
};

export default actions;
