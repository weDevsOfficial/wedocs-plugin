const selectors = {
  getDocs: ( state ) => {
    const { docs } = state;
    return docs;
  },

  getDoc: ( state, id ) => {
    const { docs } = state;
    return docs.find( ( doc ) => doc.id === id );
  },

  getPages: ( state ) => {
    const { pages } = state;
    return pages;
  },

  // getContributors: ( state ) => {
  //   const { contributors } = state;
  //   return contributors;
  // },

  getLoading: ( state ) => {
    const { loading } = state;
    return loading;
  },

  getParentDocs: ( state ) => {
    const { docs } = state;
    const parentDocs = docs.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    return sortableDocs;
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
};

export default selectors;
