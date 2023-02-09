"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/DocListing/ListingButtons.js":
/*!*****************************************************!*\
  !*** ./src/components/DocListing/ListingButtons.js ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AddSectionModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AddSectionModal */ "./src/components/AddSectionModal.js");
/* harmony import */ var _AddArticleModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AddArticleModal */ "./src/components/AddArticleModal.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();





const ListingButtons = _ref => {
  _s();
  let {
    sections
  } = _ref;
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "doc-listing-buttons space-x-3.5 mt-10"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddSectionModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    parent: id,
    className: "py-2.5 px-4 h-fit inline-flex items-center rounded-md border border-gray-300 bg-white text-gray-700 hover:text-white hover:bg-indigo-600 px-4 text-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-3 text-base flex items-center"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add section', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AddArticleModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sections: sections,
    className: "py-2.5 px-4 h-fit inline-flex items-center rounded-md border border-gray-300 bg-white text-gray-700 hover:text-white hover:bg-indigo-600 px-4 text-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-3 text-base flex items-center"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add article', 'wedocs')));
};
_s(ListingButtons, "yQgCIz/jJfqV1l9s2yoba81MT5A=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams];
});
_c = ListingButtons;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListingButtons);
var _c;
__webpack_require__.$Refresh$.register(_c, "ListingButtons");

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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/docs */ "./src/data/docs/index.js");
/* harmony import */ var _BackToDocsPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../BackToDocsPage */ "./src/components/BackToDocsPage.js");
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
  const sections = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select(_data_docs__WEBPACK_IMPORTED_MODULE_5__["default"]).getSectionsDocs(parseInt(id));
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "docs-section-listing wrap py-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BackToDocsPage__WEBPACK_IMPORTED_MODULE_6__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListingHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: id
  }), sections && sections.length > 0 && sections.map(section => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DocSections__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: section.id,
    sections: sections,
    section: section
  })), sections && !sections.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-4 mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white shadow sm:rounded-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cursor-pointer text-base px-4 py-5 sm:px-6"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No section created for this documentation', 'wedocs')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListingButtons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sections: sections
  }));
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
      // 1675938706721
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0511158e61811bab60f7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.4fb4d45433afda89ad8d.hot-update.js.map