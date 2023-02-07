"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/data/docs/actions.js":
/*!**********************************!*\
  !*** ./src/data/docs/actions.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

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
  setLoading(loading) {
    return {
      type: 'SET_LOADING',
      loading
    };
  },
  fetchDocsFromAPI(path) {
    return {
      type: 'FETCH_FROM_API',
      path
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
    yield actions.setDoc(createdDoc);
    return createdDoc;
  },
  *updateDoc(docId, data) {
    const path = '/wp/v2/docs/' + docId;
    const response = yield {
      type: 'UPDATE_TO_API',
      path,
      data
    };
    return response;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);

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
      // 1675762496051
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0b84b2417ad1bbf1e9f9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.f866e1e7b5d8e6eabaec.hot-update.js.map