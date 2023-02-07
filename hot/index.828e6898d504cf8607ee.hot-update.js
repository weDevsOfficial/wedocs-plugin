"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/DocListing/ListingHeader.js":
/*!****************************************************!*\
  !*** ./src/components/DocListing/ListingHeader.js ***!
  \****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/docs */ "./src/data/docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();





const ListingHeader = _ref => {
  _s();
  let {
    id
  } = _ref;
  if (!id) {
    return;
  }
  const doc = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_3__["default"]).getDoc(parseInt(id)), []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docs-heading flex justify-between items-center mt-5 mb-3.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "section-heading flex items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "flex items-center font-medium text-[#111827] text-xl space-x-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    rel: "noreferrer"
    // href={ `${ window.location.origin }/wp-admin/post.php?action=edit&post=${ id }` }
    ,
    href: `${window.location.origin}/?p=${id}`,
    className: "flex items-center group hover:text-black"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "group-hover:underline"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
  // translators: %s: Section title
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s', 'wedocs-pro'), doc?.title?.rendered)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "ml-5 stroke-gray-500 group-hover:stroke-indigo-700",
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M7.118 3.5H3.452c-1.013 0-1.833.821-1.833 1.833V14.5c0 1.012.821 1.833 1.833 1.833h9.167c1.012 0 1.833-.821 1.833-1.833v-3.667m-3.667-9.167h5.5m0 0v5.5m0-5.5l-9.167 9.167",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    rel: "noreferrer",
    href: `${window.location.origin}/wp-admin/post.php?post=${id}&action=edit`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z",
    className: "stroke-gray-500 hover:stroke-indigo-700",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))));
};
_s(ListingHeader, "oomw8dKWj9V2y6OiJ9x+wAQTVjI=", false, function () {
  return [_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect];
});
_c = ListingHeader;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListingHeader);
var _c;
__webpack_require__.$Refresh$.register(_c, "ListingHeader");

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
      // 1675750896058
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8ef80a947154ece31d56")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.828e6898d504cf8607ee.hot-update.js.map