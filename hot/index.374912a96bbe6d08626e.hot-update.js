"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/Docs/index.js":
/*!**************************************!*\
  !*** ./src/components/Docs/index.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/docs */ "./src/data/docs/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AddPostModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AddPostModal */ "./src/components/AddPostModal.js");
/* harmony import */ var _EmptyDocs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EmptyDocs */ "./src/components/Docs/EmptyDocs.js");
/* harmony import */ var _ParentDocs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ParentDocs */ "./src/components/Docs/ParentDocs.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _SearchFilter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../SearchFilter */ "./src/components/SearchFilter.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();









const Docs = () => {
  _s();
  const parentDocs = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_1__["default"]).getParentDocs(), []);
  const loading = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_1__["default"]).getLoading(), []);
  const [searchValue, setSearchValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [filteredDocs, setFilteredDocs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([...parentDocs]);
  console.log(parentDocs, filteredDocs);
  const handleChange = event => {
    setSearchValue(event.target.value);
    const getDocs = filteredDocs.filter(doc => getDocs?.title?.rendered.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredDocs([...getDocs]);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "documentation-header flex justify-between items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center mt-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All Docs', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddPostModal__WEBPACK_IMPORTED_MODULE_3__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "ml-5 py-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`Add doc`, 'wedocs')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchFilter__WEBPACK_IMPORTED_MODULE_7__["default"], {
    handleChange: handleChange,
    searchValue: searchValue
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    role: "list",
    className: "documentation mx-auto mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
  }, !loading && parentDocs && filteredDocs?.map(doc => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ParentDocs__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: doc.id,
    doc: doc
  }))), !loading && parentDocs && !parentDocs.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EmptyDocs__WEBPACK_IMPORTED_MODULE_4__["default"], null), loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "spinner is-active float-left"
  }));
};
_s(Docs, "bBv0m1bZaDG5QPK3w4R4QMsbMc4=", false, function () {
  return [_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect, _wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect];
});
_c = Docs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Docs);
var _c;
__webpack_require__.$Refresh$.register(_c, "Docs");

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
      // 1675795382272
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2d3ba7a6132ef8d8d94c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.374912a96bbe6d08626e.hot-update.js.map