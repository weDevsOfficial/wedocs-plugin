"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/DocListing/DocSections.js":
/*!**************************************************!*\
  !*** ./src/components/DocListing/DocSections.js ***!
  \**************************************************/
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
/* harmony import */ var _assets_img_folder_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/img/folder.png */ "./src/assets/img/folder.png");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/docs */ "./src/data/docs/index.js");
/* harmony import */ var _SectionArticles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SectionArticles */ "./src/components/DocListing/SectionArticles.js");
/* harmony import */ var _AddArticleModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AddArticleModal */ "./src/components/AddArticleModal.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();









const DocSections = _ref => {
  _s();
  let {
    section,
    sections
  } = _ref;
  const {
    id,
    title
  } = section;
  const [showArticles, setShowArticles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const sectionArticles = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_5__["default"]).getSectionArticles(parseInt(id)), []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4 mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white shadow sm:rounded-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "doc-section cursor-pointer px-4 py-5 sm:px-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center group",
    onClick: () => setShowArticles(!showArticles)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _assets_img_drag_png__WEBPACK_IMPORTED_MODULE_1__,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Docs Link Icon', 'wedocs')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center w-full"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "truncate flex items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center text-sm pr-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _assets_img_folder_png__WEBPACK_IMPORTED_MODULE_3__,
    className: "w-full h-full px-3.5",
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Docs Link Icon', 'wedocs')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `${window.location.origin}/?p=${id}`,
    className: "flex items-center flex-shrink-0 text-base font-medium text-black"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hover:underline group-hover:text-black"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s', 'wedocs'), title?.rendered)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "article-counter grid place-content-center text-white font-medium text-sm w-7 h-7 bg-[#00A1E4] rounded-full"
  }, sectionArticles.length), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `${window.location.origin}/?p=${id}`,
    className: "flex items-center flex-shrink-0 text-base font-medium text-black"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
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
    href: `${window.location.origin}/wp-admin/post.php?post=${id}&action=edit`
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
  }))))), sectionArticles && sectionArticles.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ml-5 flex-shrink-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    className: `${showArticles ? 'rotate-90 transform' : ''} group-hover:text-[#00A1E4] h-5 w-5 text-gray-400`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
  }))))), showArticles && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "section-article mt-3 pl-4 sm:pl-6"
  }, sectionArticles && sectionArticles.length > 0 && sectionArticles.map(article => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SectionArticles__WEBPACK_IMPORTED_MODULE_6__["default"], {
    key: article.id,
    article: article
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddArticleModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sections: sections,
    sectionName: title?.rendered,
    className: "py-2.5 px-4 mt-7 mb-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm text-white hover:text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-3 text-base flex items-center"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add article', 'wedocs'))))));
};
_s(DocSections, "8tERFOaa/g/thHQyIVsFERoWNw4=", false, function () {
  return [_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect];
});
_c = DocSections;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DocSections);
var _c;
__webpack_require__.$Refresh$.register(_c, "DocSections");

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
      // 1675963761179
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("efa3f10b3498178e4937")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.33e68e13e9e577a707cd.hot-update.js.map