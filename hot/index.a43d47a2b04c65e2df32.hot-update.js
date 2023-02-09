"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/DocActions.js":
/*!**************************************!*\
  !*** ./src/components/DocActions.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AddArticleModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddArticleModal */ "./src/components/AddArticleModal.js");
/* harmony import */ var _AddSectionModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddSectionModal */ "./src/components/AddSectionModal.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RestrictionModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RestrictionModal */ "./src/components/RestrictionModal.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data/docs */ "./src/data/docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();









const DocActions = _ref => {
  _s();
  let {
    docId
  } = _ref;
  const [showActions, setShowActions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const sections = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_6__["default"]).getSectionsDocs(parseInt(docId)), []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "documentation-ellipsis-actions relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: () => setShowActions(!showActions),
    className: "dashicons dashicons-ellipsis d-block cursor-pointer text-sm rotate-90 text-gray-500"
  }), showActions && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "action-menus",
    className: "w-40 border border-[#DBDBDB] absolute shadow right-0 py-1 rounded-md mt-2.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddArticleModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    sections: sections,
    className: "group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus text-xs mt-1.5 ml-[-4px]"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add article', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/?p=${docId}`,
    target: "_blank",
    className: "group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RestrictionModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    docId: docId,
    className: "w-full group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete', 'wedocs'))));
};
_s(DocActions, "yMjPwcuxuOwUxlTBaf0vYcGJrd0=", false, function () {
  return [_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect];
});
_c = DocActions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DocActions);
var _c;
__webpack_require__.$Refresh$.register(_c, "DocActions");

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
      // 1675972360576
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d0da0028e34ae2817752")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.a43d47a2b04c65e2df32.hot-update.js.map