"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/data/docs/resolvers.js":
/*!************************************!*\
  !*** ./src/data/docs/resolvers.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./src/data/docs/actions.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/data/docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");




const resolvers = {
  *getDocs() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDocsFromAPI('/wp/v2/docs?per_page=-1');
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(response);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getDoc(id) {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const doc = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDocsFromAPI('/wp/v2/docs/' + id);
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDoc(doc);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  *getParentDocs() {
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(true);
    const docs = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDocsFromAPI('/wp/v2/docs?per_page=-1');
    yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(docs);
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setLoading(false);
  },
  // *getSectionsDocs( id ) {
  // 	yield actions.setLoading( true );
  // 	const docs = yield actions.fetchDocsFromAPI( '/wp/v2/docs/' + id );
  // 	yield actions.setDocs( docs );
  // 	return actions.setLoading( false );
  // },

  *getSectionsDocs(id) {
    const response = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDocsFromAPI('/wp/v2/docs?per_page=-1');
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(response);
  },
  *getDocArticles(id) {
    const docs = yield _actions__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDocsFromAPI('/wp/v2/docs?per_page=-1');
    return _actions__WEBPACK_IMPORTED_MODULE_0__["default"].setDocs(docs);
  }

  // *getDocArticles( id ) {
  // 	const docs = yield actions.fetchDocsFromAPI(
  // 		'/wp/v2/docs?per_page=-1'
  // 	);
  // 	yield actions.setDocs( docs );
  // 	const sections = docs.filter( ( doc ) => doc.parent === id );
  // 	const articles = [];
  // 	sections.forEach( ( article ) => {
  // 		const collection = docs.filter( ( doc ) => {
  // 			return doc.parent === article.id;
  // 		} );
  //
  // 		articles.push( ...collection );
  // 	} );
  //
  // 	yield actions.setDocs( docs );
  // },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/assets/css/index.css":
/*!**********************************!*\
  !*** ./src/assets/css/index.css ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1675748324074
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f812ec1c62d5e8f4a8c1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.673683024a6fb9b8cdbf.hot-update.js.map