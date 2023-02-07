"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/DocListing/index.js":
/*!********************************************!*\
  !*** ./src/components/DocListing/index.js ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ListingHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListingHeader */ "./src/components/DocListing/ListingHeader.js");
/* harmony import */ var _DocSections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DocSections */ "./src/components/DocListing/DocSections.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/docs */ "./src/data/docs/index.js");
/* harmony import */ var _BackToDocsPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BackToDocsPage */ "./src/components/BackToDocsPage.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ListingButtons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ListingButtons */ "./src/components/DocListing/ListingButtons.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();









const ListingPage = () => {
  _s();
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)();

  // const sections = useSelect( ( select ) => {
  // 	return select( docsStore ).getSectionsDocs( parseInt( id ) );
  // }, [] );

  const sections = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_4__["default"]).getParentDocs(), []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docs-section-listing wrap py-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BackToDocsPage__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListingHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: id
  }), sections && sections.map(section => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DocSections__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: section.id,
    sections: sections,
    section: section
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListingButtons__WEBPACK_IMPORTED_MODULE_7__["default"], null));
};
_s(ListingPage, "hR0QB55bTFu2h7DjZAYYVbqpXaY=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams, _wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect];
});
_c = ListingPage;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListingPage);
var _c;
__webpack_require__.$Refresh$.register(_c, "ListingPage");

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
      // 1675749868498
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("710fd63cdab6692d843e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.3d116cad0b3929b8d386.hot-update.js.map