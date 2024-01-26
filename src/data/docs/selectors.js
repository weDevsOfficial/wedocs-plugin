const selectors = {
  getDocs: ( state ) => {
    const { docs } = state;
    return docs;
  },

  getParentDocs: ( state ) => {
    const { parents } = state;
    return parents;
  },

  getDoc: ( state, id ) => {
    const { docs } = state;
    return docs.find( ( doc ) => doc.id === id );
  },

  getPages: ( state ) => {
    const { pages } = state;
    return pages;
  },

  getLoading: ( state ) => {
    const { loading } = state;
    return loading;
  },

  getSortingStatus: ( state ) => {
    const { sorting } = state;
    return sorting;
  },

  getNeedSortingStatus: ( state ) => {
    const { needSorting } = state;
    return needSorting;
  },

  getUserDocIds: ( state ) => {
    const { userDocIds } = state;
    return userDocIds;
  },

  getSectionsDocs: ( state, id ) => {
    const { docs } = state;
    const sections = docs.filter( ( doc ) => doc.parent === id );
    const sortableSections = sections?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    return sortableSections;
  },

  getDocArticles: ( state, id ) => {
    const { docs } = state;
    const sections = docs.filter( ( doc ) => doc.parent === id );
    const articles = [];

    sections.forEach( ( article ) => {
      const collection = docs.filter( ( doc ) => {
        return doc.parent === article.id;
      } );

      articles.push( ...collection );
    } );

    const sortableArticles = articles?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );

    return sortableArticles;
  },

  getSectionArticles: ( state, id ) => {
    const { docs } = state;
    const articles = docs.filter( ( doc ) => doc.parent === id );

    const sortableArticles = articles?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );

    return sortableArticles;
  },

  getHelpfulDocs: ( state ) => {
    const { helpfulDocs } = state;
    return helpfulDocs;
  },

  getRestrictedArticles( state ) {
    const { restrictedArticleList } = state;
    return restrictedArticleList;
  },

  getRestrictedArticle( state, id ) {
    const { restrictedArticleList } = state;
    return restrictedArticleList.find( ( article ) => article.id === id );
  },
};

export default selectors;
