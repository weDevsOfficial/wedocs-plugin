"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/DocListing/SectionArticles.js":
/*!******************************************************!*\
  !*** ./src/components/DocListing/SectionArticles.js ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_img_drag_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/img/drag.png */ "./src/assets/img/drag.png");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_file_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/img/file.png */ "./src/assets/img/file.png");
/* harmony import */ var _DocActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DocActions */ "./src/components/DocActions.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");






const SectionArticles = _ref => {
  let {
    article
  } = _ref;
  console.log(new Date(article.modified));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center bg-white border-b border-[#D9D9D9] py-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _assets_img_drag_png__WEBPACK_IMPORTED_MODULE_1__,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Docs Link Icon', 'wedocs-pro')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center w-full group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "truncate flex items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center pr-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _assets_img_file_png__WEBPACK_IMPORTED_MODULE_3__,
    className: "w-full h-full px-3.5",
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Docs Link Icon', 'wedocs-pro')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `${window.location.origin}/?p=${article?.id}`,
    className: "flex items-center flex-shrink-0 text-base font-medium text-gray-700"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hover:underline group-hover:text-black"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s', 'wedocs-pro'), article?.title?.rendered)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "hidden group-hover:block ml-6 stroke-gray-500 hover:stroke-indigo-700",
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
    className: "ml-4 hidden group-hover:block",
    rel: "noreferrer",
    href: `${window.location.origin}/wp-admin/post.php?post=${article?.id}&action=edit`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none",
    className: "stroke-gray-500 hover:stroke-indigo-700"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-5 flex-shrink-0 mt-4 sm:mt-0 sm:ml-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-10"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "article-comments flex gap-2 items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "20",
    height: "19",
    viewBox: "0 0 20 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M6 9.01904H6.01M10 9.01904H10.01M14 9.01904H14.01M19 9.01904C19 13.4373 14.9706 17.019 10 17.019C8.46073 17.019 7.01172 16.6756 5.74467 16.0701L1 17.019L2.39499 13.2991C1.51156 12.0614 1 10.5933 1 9.01904C1 4.60077 5.02944 1.01904 10 1.01904C14.9706 1.01904 19 4.60077 19 9.01904Z",
    stroke: "#6B7280",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "comments-counter font-medium text-sm text-[#6B7280]"
  }, "5")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "article-updated-date text-sm text-[#969696]"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Updated at 27th Aug, 2022', 'wedocs-pro'))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ml-8 flex-shrink-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DocActions__WEBPACK_IMPORTED_MODULE_4__["default"], null))));
};
_c = SectionArticles;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionArticles);
var _c;
__webpack_require__.$Refresh$.register(_c, "SectionArticles");

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
      // 1675751447556
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a0bb954bee7180fcbd4c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.3a9cafad68f2e4173655.hot-update.js.map