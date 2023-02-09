"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/AddArticleModal.js":
/*!*******************************************!*\
  !*** ./src/components/AddArticleModal.js ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/transitions/transition.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/dialog/dialog.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/docs */ "./src/data/docs/index.js");
/* harmony import */ var _ComboBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ComboBox */ "./src/components/ComboBox.js");
/* harmony import */ var _ComboBox2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ComboBox2 */ "./src/components/ComboBox2.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/20/solid */ "./node_modules/@heroicons/react/20/solid/ExclamationCircleIcon.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();









const AddArticleModal = _ref => {
  _s();
  let {
    sections,
    className,
    children,
    sectionName = null
  } = _ref;
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [sectionId, setSectionId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [newArticle, setNewArticle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: {
      raw: ''
    },
    parent: sectionId ? parseInt(sectionId) : '',
    status: 'publish'
  });
  const [formError, setFormError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: false,
    section: false
  });
  const onTitleChange = e => {
    setNewArticle({
      ...newArticle,
      title: {
        raw: e.target.value
      }
    });
  };
  const createDoc = () => {
    if (!sectionId || newArticle.title.raw === '') {
      return;
    }
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_data_docs__WEBPACK_IMPORTED_MODULE_3__["default"]).createDoc(newArticle).then(result => {
      setNewArticle({
        ...newArticle,
        title: {
          raw: result.title.rendered
        },
        parent: result.parent
      });
      closeModal();
    }).catch(err => {});
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setNewArticle({
      ...newArticle,
      parent: sectionId
    });
  }, [sectionId]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    onClick: openModal,
    className: className
  }, children), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Transition, {
    appear: true,
    show: isOpen,
    as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Dialog, {
    as: "div",
    className: "relative z-10",
    onClose: closeModal
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Transition.Child, {
    as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment,
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fixed inset-0 bg-black bg-opacity-25"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fixed inset-0 overflow-y-auto"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex min-h-full items-center justify-center p-4 text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Transition.Child, {
    as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment,
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Dialog.Panel, {
    className: "w-full max-w-md transform rounded-2xl bg-white py-6 px-9 text-center align-middle shadow-xl transition-all"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Dialog.Title, {
    as: "h3",
    className: "text-lg font-bold text-gray-900 mb-2"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your section title', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-gray-500 text-base"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help text how to add section', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative mt-6 mb-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "doc_title",
    id: "doc-title",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Write article name', 'wedocs'),
    required: true,
    className: "h-11 bg-gray-50 !border-gray-300 text-gray-900 text-base !rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
    value: newArticle?.title?.raw,
    onChange: onTitleChange
  }), formError.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8__, {
    className: "h-5 w-5 text-red-500",
    "aria-hidden": "true"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ComboBox__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sections: sections,
    defaultSection: sectionName,
    selectSection: setSectionId
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-6 space-x-3.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "bg-indigo-600 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md",
    onClick: createDoc
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md",
    onClick: closeModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'wedocs'))))))))));
};
_s(AddArticleModal, "mHPycsfW2Li7bX6G588QLnpB/7A=");
_c = AddArticleModal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddArticleModal);
var _c;
__webpack_require__.$Refresh$.register(_c, "AddArticleModal");

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
      // 1675936088454
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ef8c6121ae76c32e4778")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.0ca357a65a8c831e227f.hot-update.js.map