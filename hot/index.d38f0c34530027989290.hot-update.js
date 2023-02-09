"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/ComboBox.js":
/*!************************************!*\
  !*** ./src/components/ComboBox.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @heroicons/react/20/solid */ "./node_modules/@heroicons/react/20/solid/ExclamationCircleIcon.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/20/solid */ "./node_modules/@heroicons/react/20/solid/ChevronUpDownIcon.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/20/solid */ "./node_modules/@heroicons/react/20/solid/CheckIcon.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/combobox/combobox.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/docs */ "./src/data/docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();








const ComboBox = _ref => {
  _s();
  let {
    sections,
    defaultSection,
    selectSectionId,
    isFormError,
    docId
  } = _ref;
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams)();
  const classNames = function () {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(' ');
  };
  const docSections = sections.map(section => ({
    id: section.id,
    name: section?.title?.rendered
  }));
  const [newSection, setNewSection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: {
      raw: ''
    },
    parent: parseInt(docId ? docId : id),
    status: 'publish'
  });
  const [selectedSection, setSelectedSection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultSection || '');
  const [sectionTitle, setSectionTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const filteredSections = sectionTitle === '' ? docSections : docSections.filter(section => {
    return section?.name.toLowerCase().includes(sectionTitle.toLowerCase());
  });
  const handleArticleSection = () => {
    if (newSection?.title?.raw === '') {
      return;
    }
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_data_docs__WEBPACK_IMPORTED_MODULE_3__["default"]).createDoc(newSection).then(result => {
      console.log(result);
      selectSectionId(result.id);
      setNewSection({
        ...newSection,
        title: {
          raw: ''
        }
      });
    }).catch(err => {});
  };
  const handleOptionSet = sectionId => {
    selectSectionId(sectionId);
  };
  const handleSectionTitle = e => {
    setSectionTitle(e.target.value);
    setNewSection({
      ...newSection,
      title: {
        raw: e.target.value
      }
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox, {
    as: "div",
    value: selectedSection,
    onChange: setSelectedSection
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative mb-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Input, {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type a section name', 'wedocs'),
    required: true,
    className: `${isFormError ? '!border-red-500 focus:ring-red-500 focus:border-red-500' : '!border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                        h-11 bg-gray-50 text-gray-900 text-base !rounded-md block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`,
    onChange: handleSectionTitle
  }), isFormError ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_6__, {
    className: "h-5 w-5 text-red-500",
    "aria-hidden": "true"
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Button, {
    className: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_7__, {
    className: "h-5 w-5 text-gray-400",
    "aria-hidden": "true"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Options, {
    className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
  }, filteredSections && filteredSections.length > 0 && filteredSections.map(section => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Option, {
    key: section.id,
    value: section.name,
    className: _ref2 => {
      let {
        active
      } = _ref2;
      return classNames('relative cursor-pointer select-none py-2.5 pl-3 pr-9 mb-0', active ? 'bg-indigo-600 text-white' : 'text-gray-900');
    },
    onClick: () => handleOptionSet(section.id)
  }, _ref3 => {
    let {
      active,
      selected
    } = _ref3;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: classNames('block truncate', selected && 'font-semibold')
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s', 'wedocs'), section.name)), selected && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_8__, {
      className: "h-5 w-5",
      "aria-hidden": "true"
    })));
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Option, {
    className: "flex items-center bg-gray-100 relative cursor-pointer text-base text-indigo-600 mb-0 select-none py-2 pl-3 pr-9",
    value: newSection?.title?.raw,
    onClick: handleArticleSection
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus text-xs mt-1.5"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create "%s" as a new section', 'wedocs'), sectionTitle ? sectionTitle : 'How to use')))));
};
_s(ComboBox, "ez4wsUJr+R0+rTjUNOBcArS5828=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams];
});
_c = ComboBox;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComboBox);
var _c;
__webpack_require__.$Refresh$.register(_c, "ComboBox");

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
      // 1675973293500
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("08b95c5852080d0fbf92")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.d38f0c34530027989290.hot-update.js.map