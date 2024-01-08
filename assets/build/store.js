/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data/docs/actions.js":
/*!**********************************!*\
  !*** ./src/data/docs/actions.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const actions = {
  setDocs(docs) {
    return {
      type: 'SET_DOCS',
      docs
    };
  },
  setDoc(doc) {
    return {
      type: 'SET_DOC',
      doc
    };
  },
  setParentDocs(parents) {
    return {
      type: 'SET_PARENT_DOCS',
      parents
    };
  },
  setPages(pages) {
    return {
      type: 'SET_PAGES',
      pages
    };
  },
  setLoading(loading) {
    return {
      type: 'SET_LOADING',
      loading
    };
  },
  setSortingStatus(sorting) {
    return {
      type: 'SET_SORTING_STATUS',
      sorting
    };
  },
  setNeedSortingStatus(needSorting) {
    return {
      type: 'SET_NEED_SORTING_STATUS',
      needSorting
    };
  },
  setUserDocIds(userDocIds) {
    return {
      type: 'SET_USER_DOC_IDS',
      userDocIds
    };
  },
  setUserDocId(userDocId) {
    return {
      type: 'SET_USER_DOC_ID',
      userDocId
    };
  },
  fetchFromAPI(path) {
    return {
      type: 'FETCH_FROM_API',
      path
    };
  },
  setHelpfulDocs(helpfulDocs) {
    return {
      type: 'SET_HELPFUL_DOCS',
      helpfulDocs
    };
  },
  createDocsToAPI(doc) {
    const path = '/wp/v2/docs';
    return {
      type: 'UPDATE_TO_API',
      path,
      data: doc
    };
  },
  *createDoc(doc) {
    const createdDoc = yield actions.createDocsToAPI(doc);
    yield actions.setUserDocId(createdDoc.id);
    yield actions.setDoc(createdDoc);
    return createdDoc;
  },
  *updateDoc(docId, data) {
    const path = '/wp/v2/docs/' + docId;
    yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    const response = yield actions.fetchFromAPI('/wp/v2/docs?per_page=-1&status=publish,draft,private');
    const parentDocs = response.filter(doc => !doc.parent);
    const sortableDocs = parentDocs?.sort((a, b) => a.menu_order - b.menu_order);
    yield actions.setParentDocs(sortableDocs);
    return actions.setDocs(response);
  },
  *updateDocs(data) {
    const path = '/wp/v2/docs/update_docs_status';
    yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    const response = yield actions.fetchFromAPI('/wp/v2/docs?per_page=-1&status=publish,draft,private');
    const parentDocs = response.filter(doc => !doc.parent);
    const sortableDocs = parentDocs?.sort((a, b) => a.menu_order - b.menu_order);
    yield actions.setParentDocs(sortableDocs);
    return actions.setDocs(response);
  },
  *updateNeedSortingStatus(data) {
    const path = '/wp/v2/docs/need_sorting_status';
    yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    const response = yield actions.fetchFromAPI('/wp/v2/docs/need_sorting_status');
    return actions.setNeedSortingStatus(response);
  },
  *updateSortingStatus(data) {
    const path = '/wp/v2/docs/sorting_status';
    yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    const response = yield actions.fetchFromAPI('/wp/v2/docs/sorting_status');
    yield actions.setNeedSortingStatus(response);
    return actions.setSortingStatus(response);
  },
  *updateDocMeta(docId, meta) {
    const path = '/wp/v2/docs/' + docId + '/meta';
    const response = yield {
      type: 'UPDATE_TO_API',
      path,
      data: meta
    };
    return response;
  },
  *deleteDoc(docId) {
    const path = '/wp/v2/docs/' + docId;
    yield {
      type: 'DELETE_TO_API',
      path
    };
    const response = yield actions.fetchFromAPI('/wp/v2/docs?per_page=-1&status=publish,draft,private');
    const parentDocs = response.filter(doc => !doc.parent);
    const sortableDocs = parentDocs?.sort((a, b) => a.menu_order - b.menu_order);
    yield actions.setParentDocs(sortableDocs);
    return actions.setDocs(response);
  },
  *updateParentDocs(docs) {
    const parentDocs = docs.filter(doc => !doc.parent);
    const sortableDocs = parentDocs?.sort((a, b) => a.menu_order - b.menu_order);
    yield actions.setParentDocs(sortableDocs);
    return actions.setDocs(docs);
  },
  *sendMessage(data) {
    const path = '/wp/v2/docs/message';
    const response = yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    return response;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (actions);

/***/ }),

/***/ "./src/data/docs/controls.js":
/*!***********************************!*\
  !*** ./src/data/docs/controls.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

const controls = {
  FETCH_FROM_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path
    });
  },
  UPDATE_TO_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path,
      data: action.data,
      method: 'POST'
    });
  },
  DELETE_TO_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path,
      method: 'DELETE'
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./src/data/docs/index.js":
/*!********************************!*\
  !*** ./src/data/docs/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOCS_STORE: function() { return /* binding */ DOCS_STORE; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ "./src/data/docs/reducer.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./src/data/docs/actions.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectors */ "./src/data/docs/selectors.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls */ "./src/data/docs/controls.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolvers */ "./src/data/docs/resolvers.js");






const DOCS_STORE = 'wedocs/docs';
const docsStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(DOCS_STORE, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_3__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_2__["default"],
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_5__["default"],
  controls: _controls__WEBPACK_IMPORTED_MODULE_4__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (docsStore);

/***/ }),

/***/ "./src/data/docs/reducer.js":
/*!**********************************!*\
  !*** ./src/data/docs/reducer.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const DEFAULT_STATE = {
  docs: [],
  pages: [],
  parents: [],
  loading: false,
  sorting: false,
  userDocIds: [],
  helpfulDocs: [],
  needSorting: false
};
const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_DOCS':
      return {
        ...state,
        docs: [...action.docs]
      };
    case 'SET_DOC':
      const setDocState = {
        ...state,
        docs: [...state.docs, action.doc]
      };
      if (!action.doc.parent) {
        setDocState.parents = [action.doc, ...state.parents];
      }
      return setDocState;
    case 'SET_USER_DOC_IDS':
      return {
        ...state,
        userDocIds: [...state.userDocIds, ...action.userDocIds]
      };
    case 'SET_USER_DOC_ID':
      return {
        ...state,
        userDocIds: [...state.userDocIds, action.userDocId]
      };
    case 'SET_PAGES':
      return {
        ...state,
        pages: [...action.pages]
      };
    case 'SET_PARENT_DOCS':
      return {
        ...state,
        parents: [...action.parents]
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'SET_SORTING_STATUS':
      return {
        ...state,
        sorting: action.sorting
      };
    case 'SET_NEED_SORTING_STATUS':
      return {
        ...state,
        needSorting: action.needSorting
      };
    case 'SET_HELPFUL_DOCS':
      return {
        ...state,
        helpfulDocs: action.helpfulDocs
      };
    default:
      return state;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./src/data/docs/resolvers.js":
/*!************************************!*\
  !*** ./src/data/docs/resolvers.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./src/data/docs/actions.js");

const getDocsPath = wp.hooks.applyFilters('wedocs_documentation_fetching_path', `/wp/v2/docs?per_page=-1&status=publish${typeof weDocsAdminVars !== 'undefined' ? ',draft' : ''}`);
const resolvers = {
  *getDocs() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(getDocsPath);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(response);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getParentDocs() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(getDocsPath);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(response);
    const parentDocs = response.filter(doc => !doc.parent);
    const sortableDocs = parentDocs?.sort((a, b) => a.menu_order - b.menu_order);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setParentDocs(response);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getDoc(id) {
    // yield actions.setLoading( true );
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(getDocsPath);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(response);
    // return actions.setLoading( false );
  },

  *getPages() {
    // yield actions.setLoading( true );
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI('/wp/v2/pages');
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setPages(response);
    // return actions.setLoading( false );
  },

  *getSortingStatus() {
    // yield actions.setLoading( true );
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI('/wp/v2/docs/sorting_status');
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setSortingStatus(response);
    // return actions.setLoading( false );
  },

  *getNeedSortingStatus() {
    // yield actions.setLoading( true );
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI('/wp/v2/docs/need_sorting_status');
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setNeedSortingStatus(response);
    // return actions.setLoading( false );
  },

  *getUserDocIds() {
    // yield actions.setLoading( true );
    const userDocIds = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(`/wp/v2/docs/users/ids`);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setUserDocIds(userDocIds);
    // return actions.setLoading( false );
  },

  *getSectionsDocs(id) {
    // yield actions.setLoading( true );
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(getDocsPath);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(response);
    // return actions.setLoading( false );
  },

  *getDocArticles(id) {
    // yield actions.setLoading( true );
    const docs = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(getDocsPath);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(docs);
    // return actions.setLoading( false );
  },

  *getHelpfulDocs() {
    // yield actions.setLoading( true );
    const docs = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI(getDocsPath);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(docs);
    const helpfulDocIds = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchFromAPI('/wp/v2/docs/helpfulness');
    const helpfulDocs = docs.sort((a, b) => helpfulDocIds.indexOf(a.id) - helpfulDocIds.indexOf(b.id)).filter(doc => helpfulDocIds?.includes(doc?.id));
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setHelpfulDocs(helpfulDocs);
    // yield actions.setLoading( false );
  }
};

/* harmony default export */ __webpack_exports__["default"] = (resolvers);

/***/ }),

/***/ "./src/data/docs/selectors.js":
/*!************************************!*\
  !*** ./src/data/docs/selectors.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const selectors = {
  getDocs: state => {
    const {
      docs
    } = state;
    return docs;
  },
  getParentDocs: state => {
    const {
      parents
    } = state;
    return parents;
  },
  getDoc: (state, id) => {
    const {
      docs
    } = state;
    return docs.find(doc => doc.id === id);
  },
  getPages: state => {
    const {
      pages
    } = state;
    return pages;
  },
  getLoading: state => {
    const {
      loading
    } = state;
    return loading;
  },
  getSortingStatus: state => {
    const {
      sorting
    } = state;
    return sorting;
  },
  getNeedSortingStatus: state => {
    const {
      needSorting
    } = state;
    return needSorting;
  },
  getUserDocIds: state => {
    const {
      userDocIds
    } = state;
    return userDocIds;
  },
  getSectionsDocs: (state, id) => {
    const {
      docs
    } = state;
    const sections = docs.filter(doc => doc.parent === id);
    const sortableSections = sections?.sort((a, b) => a.menu_order - b.menu_order);
    return sortableSections;
  },
  getDocArticles: (state, id) => {
    const {
      docs
    } = state;
    const sections = docs.filter(doc => doc.parent === id);
    const articles = [];
    sections.forEach(article => {
      const collection = docs.filter(doc => {
        return doc.parent === article.id;
      });
      articles.push(...collection);
    });
    const sortableArticles = articles?.sort((a, b) => a.menu_order - b.menu_order);
    return sortableArticles;
  },
  getSectionArticles: (state, id) => {
    const {
      docs
    } = state;
    const articles = docs.filter(doc => doc.parent === id);
    const sortableArticles = articles?.sort((a, b) => a.menu_order - b.menu_order);
    return sortableArticles;
  },
  getHelpfulDocs: state => {
    const {
      helpfulDocs
    } = state;
    return helpfulDocs;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (selectors);

/***/ }),

/***/ "./src/data/settings/actions.js":
/*!**************************************!*\
  !*** ./src/data/settings/actions.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const actions = {
  setSettings(settings) {
    return {
      type: 'SET_SETTINGS',
      settings
    };
  },
  setSettingsOption(option, value) {
    return {
      type: 'SET_SETTINGS_OPTION',
      option,
      value
    };
  },
  setLoading(loading) {
    return {
      type: 'SET_LOADING',
      loading
    };
  },
  setUpgradeInfo(needUpgrade) {
    return {
      type: 'SET_UPGRADE_INFO',
      needUpgrade
    };
  },
  setMigrateInfo(needMigrate) {
    return {
      type: 'SET_MIGRATE_INFO',
      needMigrate
    };
  },
  setSaving(saving) {
    return {
      type: 'SET_SAVING',
      saving
    };
  },
  setRoles(roles) {
    return {
      type: 'SET_ROLES',
      roles
    };
  },
  setTurnstileSiteKey(siteKey) {
    return {
      type: 'SET_TURNSTILE_SITE_KEY',
      siteKey
    };
  },
  *updateSettings(data) {
    const path = '/wp/v2/docs/settings';
    const response = yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    yield actions.setSettings(response.data);
    return response.data;
  },
  *wedocsUpgrade(data) {
    const path = '/wp/v2/docs/upgrade';
    const response = yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    yield actions.setUpgradeInfo(false);
    return response;
  },
  *makeUpdateDone() {
    return yield {
      type: 'UPDATE_TO_API',
      path: '/wp/v2/docs/upgrade/done'
    };
  }
};
/* harmony default export */ __webpack_exports__["default"] = (actions);

/***/ }),

/***/ "./src/data/settings/controls.js":
/*!***************************************!*\
  !*** ./src/data/settings/controls.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

const controls = {
  FETCH_SETTINGS() {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/docs/settings?data=wedocs_settings'
    });
  },
  FETCH_ROLES() {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/docs/users'
    });
  },
  FETCH_UPGRADE_INFO() {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/docs/upgrade'
    });
  },
  FETCH_SITE_KEY() {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/docs/settings/turnstile-site-key'
    });
  },
  UPDATE_TO_API(action) {
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: action.path,
      data: action.data,
      method: 'POST'
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./src/data/settings/index.js":
/*!************************************!*\
  !*** ./src/data/settings/index.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOCS_SETTINGS_STORE: function() { return /* binding */ DOCS_SETTINGS_STORE; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ "./src/data/settings/reducer.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./src/data/settings/selectors.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./src/data/settings/actions.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers */ "./src/data/settings/resolvers.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls */ "./src/data/settings/controls.js");






const DOCS_SETTINGS_STORE = 'wedocs/settings';
const settingsStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(DOCS_SETTINGS_STORE, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__["default"],
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_4__["default"],
  controls: _controls__WEBPACK_IMPORTED_MODULE_5__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (settingsStore);

/***/ }),

/***/ "./src/data/settings/reducer.js":
/*!**************************************!*\
  !*** ./src/data/settings/reducer.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
      collapse_articles: 'off'
    },
    permission: {
      global_permission: ['administrator', 'editor'],
      role_wise_permission: ['administrator']
    },
    assistant: {
      assist_enable: 'on',
      integrate_ai: {
        ai_enabled: 'off',
        sync_data: 'off',
        ai_response: {}
      },
      explore: {
        explore_enable: 'on'
      },
      message: {
        messaging_enable: 'on',
        turnstile_site_key: ''
      },
      placement: {
        order: ['integrate_ai', 'explore', 'message']
      },
      preference: {
        color_settings: {
          preview_colors: {
            widgetBg: {
              r: 99,
              g: 102,
              b: 241,
              a: 1
            },
            activeTabBg: {
              r: 255,
              g: 255,
              b: 255,
              a: 1
            },
            activeTabFont: {
              r: 55,
              g: 65,
              b: 81,
              a: 1
            },
            inactiveTabBg: {
              r: 67,
              g: 56,
              b: 202,
              a: 1
            },
            inactiveTabFont: {
              r: 199,
              g: 210,
              b: 254,
              a: 1
            },
            tabTitleFont: {
              r: 255,
              g: 255,
              b: 255,
              a: 1
            },
            tabDescriptionFont: {
              r: 199,
              g: 210,
              b: 254,
              a: 1
            },
            breadcrumbColor: {
              r: 67,
              g: 56,
              b: 202,
              a: 1
            },
            bubbleBg: {
              r: 87,
              g: 116,
              b: 241,
              a: 1
            },
            bubbleIcon: {
              r: 255,
              g: 255,
              b: 255,
              a: 1
            }
          }
        }
      }
    },
    layout: {
      column: '2',
      nav_icon: 'on',
      right_bar: 'on',
      template: 'default',
      active_text: {
        r: 59,
        g: 130,
        b: 246,
        a: 1
      },
      active_nav_bg: {
        r: 59,
        g: 130,
        b: 246,
        a: 1
      },
      active_nav_text: {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      }
    }
  },
  loading: false,
  saving: false,
  needUpgrade: false
};
const reducer = (state = DEFAULT_SETTINGS_STATE, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings
        }
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'SET_ROLES':
      return {
        ...state,
        roles: action.roles
      };
    case 'SET_SETTINGS_OPTION':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.option]: action.value
        }
      };
    case 'SET_UPGRADE_INFO':
      return {
        ...state,
        needUpgrade: action.needUpgrade
      };
    case 'SET_SAVING':
      return {
        ...state,
        saving: action.saving
      };
    case 'SET_TURNSTILE_SITE_KEY':
      return {
        ...state,
        settings: {
          ...state.settings,
          assistant: {
            ...state.settings.assistant,
            message: {
              ...state.settings.assistant.message,
              turnstile_site_key: action.siteKey
            }
          }
        }
      };
    default:
      return state;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./src/data/settings/resolvers.js":
/*!****************************************!*\
  !*** ./src/data/settings/resolvers.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./src/data/settings/actions.js");

const resolvers = {
  *getSettings() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const settings = yield {
      type: 'FETCH_SETTINGS'
    };
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setSettings(settings);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getUpgradeInfo() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const needUpgrade = yield {
      type: 'FETCH_UPGRADE_INFO'
    };
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setUpgradeInfo(needUpgrade);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getRoles() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const roles = yield {
      type: 'FETCH_ROLES'
    };
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setRoles(roles);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getTurnstileSiteKey() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const siteKey = yield {
      type: 'FETCH_SITE_KEY'
    };
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setTurnstileSiteKey(siteKey);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (resolvers);

/***/ }),

/***/ "./src/data/settings/selectors.js":
/*!****************************************!*\
  !*** ./src/data/settings/selectors.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const selectors = {
  getSettings(state) {
    const {
      settings
    } = state;
    return settings;
  },
  getSettingsOption(state, option) {
    const {
      settings
    } = state;
    return settings[option];
  },
  getGeneralSettingsOption(state, option) {
    const {
      settings
    } = state;
    return settings?.general?.[option];
  },
  getPermissionSettingsOption(state, option) {
    const {
      settings
    } = state;
    return settings?.permission?.[option];
  },
  getAssistantSettingsOption(state, option) {
    const {
      settings
    } = state;
    return settings?.assistant?.[option];
  },
  getRoles(state) {
    const {
      roles
    } = state;
    return roles;
  },
  getLoading(state) {
    const {
      loading
    } = state;
    return loading;
  },
  getUpgradeInfo(state) {
    const {
      needUpgrade
    } = state;
    return needUpgrade;
  },
  getSaving(state) {
    const {
      saving
    } = state;
    return saving;
  },
  getTurnstileSiteKey(state) {
    const {
      settings
    } = state;
    return settings?.assistant?.message?.turnstile_site_key;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (selectors);

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***************************!*\
  !*** ./src/data/store.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _docs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./docs */ "./src/data/docs/index.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./src/data/settings/index.js");



(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_docs__WEBPACK_IMPORTED_MODULE_1__["default"]);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(_settings__WEBPACK_IMPORTED_MODULE_2__["default"]);
}();
/******/ })()
;
//# sourceMappingURL=store.js.map