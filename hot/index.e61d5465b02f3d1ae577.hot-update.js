"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/data/docs/selectors.js":
/*!************************************!*\
  !*** ./src/data/docs/selectors.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

const selectors = {
  getDocs: state => {
    const {
      docs
    } = state;
    return docs;
  },
  getDoc(state, id) {
    const {
      docs
    } = state;
    return docs.find(doc => doc.id === id);
  },
  getLoading(state) {
    const {
      loading
    } = state;
    return loading;
  },
  getParentDocs(state) {
    const {
      docs
    } = state;
    return docs.filter(doc => !doc.parent);
  },
  getSectionsDocs(state, id) {
    const {
      docs
    } = state;
    return docs.filter(doc => doc.parent === id);
  },
  getDocArticles(state, id) {
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
    return articles;
  },
  getSectionArticles(state, id) {
    const {
      docs
    } = state;
    return docs.filter(doc => doc.parent === id);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selectors);

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
      // 1675749617371
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("668a483ff13a31ca9657")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.e61d5465b02f3d1ae577.hot-update.js.map