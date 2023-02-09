globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./node_modules/@heroicons/react/20/solid/ChevronUpDownIcon.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@heroicons/react/20/solid/ChevronUpDownIcon.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const React = __webpack_require__(/*! react */ "react");

function ChevronUpDownIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(ChevronUpDownIcon);
module.exports = ForwardRef;

/***/ }),

/***/ "./node_modules/@heroicons/react/20/solid/ExclamationCircleIcon.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@heroicons/react/20/solid/ExclamationCircleIcon.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const React = __webpack_require__(/*! react */ "react");

function ExclamationCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(ExclamationCircleIcon);
module.exports = ForwardRef;

/***/ }),

/***/ "./src/components/AddArticleModal.js":
/*!*******************************************!*\
  !*** ./src/components/AddArticleModal.js ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    sectionId: false
  });
  const onTitleChange = e => {
    setNewArticle({
      ...newArticle,
      title: {
        raw: e.target.value
      }
    });
    setFormError({
      ...formError,
      title: e.target.value.length === 0
    });
  };
  const createDoc = () => {
    // if ( newArticle.title.raw === '' ) {
    //     setFormError( { ...formError, title: true } );
    // 	return;
    // }
    //
    // console.log( sectionId );
    //
    // if ( ! sectionId ) {
    //     setFormError( { ...formError, sectionId: true } );
    //     return;
    // }

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
    // setFormError( { ...formError, sectionId: false } );
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your article title', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-gray-500 text-base"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help text how to add article', 'wedocs')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    selectSection: setSectionId,
    isFormError: formError.sectionId
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
_s(AddArticleModal, "OXj/uemSnGsTbcOe62yCdpABt5s=");
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

/***/ "./src/components/ComboBox.js":
/*!************************************!*\
  !*** ./src/components/ComboBox.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    selectSection,
    isFormError
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
    parent: parseInt(id),
    status: 'publish'
  });
  const [selectedSection, setSelectedSection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultSection);
  const [sectionTitle, setSectionTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const filteredSections = sectionTitle === '' ? docSections : docSections.filter(section => {
    return section?.name.toLowerCase().includes(sectionTitle.toLowerCase());
  });
  const handleArticleSection = () => {
    if (newSection?.title?.raw === '') {
      return;
    }
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_data_docs__WEBPACK_IMPORTED_MODULE_3__["default"]).createDoc(newSection).then(result => {
      selectSection(result.id);
      setNewSection({
        ...newSection,
        title: {
          raw: ''
        }
      });
    }).catch(err => {});
  };
  const handleOptionSet = sectionId => {
    selectSection(sectionId);
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
    className: "h-11 bg-gray-50 cursor-pointer !border-gray-300 text-gray-900 text-base !rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
    onChange: handleSectionTitle
  }), console.log(isFormError), isFormError ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
_s(ComboBox, "hETva2op9/emcwwyi1u1+iTyIVs=", false, function () {
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

/***/ "./src/components/ComboBox2.js":
/*!*************************************!*\
  !*** ./src/components/ComboBox2.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/combobox/combobox.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/docs */ "./src/data/docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();








const ComboBox2 = _ref => {
  _s();
  let {
    sections
  } = _ref;
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams)();
  const docSections = sections.map(section => ({
    id: section.id,
    name: section?.title?.rendered
  }));
  const [newSection, setNewSection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: {
      raw: ''
    },
    parent: parseInt(id),
    status: 'publish'
  });
  const [selectedSection, setSelectedSection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(docSections[0]);
  const [sectionTitle, setSectionTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const filteredSections = sectionTitle === '' ? docSections : docSections.filter(section => {
    return section?.name.toLowerCase().includes(sectionTitle.toLowerCase());
  });
  const handleArticleSection = () => {
    if (newSection?.title?.raw === '') {
      return;
    }
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_data_docs__WEBPACK_IMPORTED_MODULE_3__["default"]).createDoc(newSection).then(result => {
      setNewSection({
        ...newSection,
        title: {
          raw: ''
        }
      });
    }).catch(err => {
      console.log(result);
    });
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
    value: selectedSection,
    onChange: setSelectedSection
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Input, {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type a section name', 'wedocs'),
    required: true,
    className: "h-11 bg-gray-50 cursor-pointer !border-gray-300 text-gray-900 text-base !rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
    onChange: handleSectionTitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Options, null, filteredSections.map(section => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Option, {
    key: section.id,
    value: section.name
  }, section.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Option, {
    className: "flex items-center bg-gray-100 relative cursor-pointer text-base text-indigo-600 mb-0 select-none py-2 pl-3 pr-9",
    value: newSection?.title?.raw,
    onClick: handleArticleSection
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-plus text-xs mt-1.5"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create "%s" as a new section', 'wedocs'), sectionTitle ? sectionTitle : 'How to use'))));
};
_s(ComboBox2, "kfk48Ial6LcXKT6DbeSMWHqjHFM=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams];
});
_c = ComboBox2;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComboBox2);
var _c;
__webpack_require__.$Refresh$.register(_c, "ComboBox2");

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

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1675962632700
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/combobox/combobox.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/combobox/combobox.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Combobox": () => (/* binding */ ko)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../hooks/use-computed.js */ "./node_modules/@headlessui/react/dist/hooks/use-computed.js");
/* harmony import */ var _hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/use-disposables.js */ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../hooks/use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
/* harmony import */ var _hooks_use_outside_click_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-outside-click.js */ "./node_modules/@headlessui/react/dist/hooks/use-outside-click.js");
/* harmony import */ var _hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../hooks/use-resolve-button-type.js */ "./node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_tree_walker_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../hooks/use-tree-walker.js */ "./node_modules/@headlessui/react/dist/hooks/use-tree-walker.js");
/* harmony import */ var _utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/calculate-active-index.js */ "./node_modules/@headlessui/react/dist/utils/calculate-active-index.js");
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _utils_bugs_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/bugs.js */ "./node_modules/@headlessui/react/dist/utils/bugs.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _utils_form_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/form.js */ "./node_modules/@headlessui/react/dist/utils/form.js");
/* harmony import */ var _utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/focus-management.js */ "./node_modules/@headlessui/react/dist/utils/focus-management.js");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../internal/hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _internal_open_closed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../internal/open-closed.js */ "./node_modules/@headlessui/react/dist/internal/open-closed.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../keyboard.js */ "./node_modules/@headlessui/react/dist/components/keyboard.js");
/* harmony import */ var _hooks_use_controllable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-controllable.js */ "./node_modules/@headlessui/react/dist/hooks/use-controllable.js");
/* harmony import */ var _hooks_use_watch_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../hooks/use-watch.js */ "./node_modules/@headlessui/react/dist/hooks/use-watch.js");
/* harmony import */ var _hooks_use_tracked_pointer_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../hooks/use-tracked-pointer.js */ "./node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js");
var Fe=(n=>(n[n.Open=0]="Open",n[n.Closed=1]="Closed",n))(Fe||{}),_e=(n=>(n[n.Single=0]="Single",n[n.Multi=1]="Multi",n))(_e||{}),ke=(n=>(n[n.Pointer=0]="Pointer",n[n.Other=1]="Other",n))(ke||{}),we=(l=>(l[l.OpenCombobox=0]="OpenCombobox",l[l.CloseCombobox=1]="CloseCombobox",l[l.GoToOption=2]="GoToOption",l[l.RegisterOption=3]="RegisterOption",l[l.UnregisterOption=4]="UnregisterOption",l[l.RegisterLabel=5]="RegisterLabel",l))(we||{});function te(t,r=n=>n){let n=t.activeOptionIndex!==null?t.options[t.activeOptionIndex]:null,o=(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.sortByDomNode)(r(t.options.slice()),i=>i.dataRef.current.domRef.current),a=n?o.indexOf(n):null;return a===-1&&(a=null),{options:o,activeOptionIndex:a}}let Be={[1](t){return t.dataRef.current.disabled||t.comboboxState===1?t:{...t,activeOptionIndex:null,comboboxState:1}},[0](t){if(t.dataRef.current.disabled||t.comboboxState===0)return t;let r=t.activeOptionIndex,{isSelected:n}=t.dataRef.current,o=t.options.findIndex(a=>n(a.dataRef.current.value));return o!==-1&&(r=o),{...t,comboboxState:0,activeOptionIndex:r}},[2](t,r){var a;if(t.dataRef.current.disabled||t.dataRef.current.optionsRef.current&&!t.dataRef.current.optionsPropsRef.current.static&&t.comboboxState===1)return t;let n=te(t);if(n.activeOptionIndex===null){let i=n.options.findIndex(l=>!l.dataRef.current.disabled);i!==-1&&(n.activeOptionIndex=i)}let o=(0,_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.calculateActiveIndex)(r,{resolveItems:()=>n.options,resolveActiveIndex:()=>n.activeOptionIndex,resolveId:i=>i.id,resolveDisabled:i=>i.dataRef.current.disabled});return{...t,...n,activeOptionIndex:o,activationTrigger:(a=r.trigger)!=null?a:1}},[3]:(t,r)=>{let n={id:r.id,dataRef:r.dataRef},o=te(t,i=>[...i,n]);t.activeOptionIndex===null&&t.dataRef.current.isSelected(r.dataRef.current.value)&&(o.activeOptionIndex=o.options.indexOf(n));let a={...t,...o,activationTrigger:1};return t.dataRef.current.__demoMode&&t.dataRef.current.value===void 0&&(a.activeOptionIndex=0),a},[4]:(t,r)=>{let n=te(t,o=>{let a=o.findIndex(i=>i.id===r.id);return a!==-1&&o.splice(a,1),o});return{...t,...n,activationTrigger:1}},[5]:(t,r)=>({...t,labelId:r.id})},ne=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);ne.displayName="ComboboxActionsContext";function $(t){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ne);if(r===null){let n=new Error(`<${t} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,$),n}return r}let re=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);re.displayName="ComboboxDataContext";function G(t){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(re);if(r===null){let n=new Error(`<${t} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,G),n}return r}function Ue(t,r){return (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(r.type,Be,t,r)}let Ge=react__WEBPACK_IMPORTED_MODULE_0__.Fragment;function Ne(t,r){let{value:n,defaultValue:o,onChange:a,name:i,by:l=(b,T)=>b===T,disabled:d=!1,__demoMode:f=!1,nullable:e=!1,multiple:p=!1,...A}=t,[s=p?[]:void 0,R]=(0,_hooks_use_controllable_js__WEBPACK_IMPORTED_MODULE_4__.useControllable)(n,a,o),[v,c]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(Ue,{dataRef:(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)(),comboboxState:f?0:1,options:[],activeOptionIndex:null,activationTrigger:1,labelId:null}),x=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),C=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({static:!1,hold:!1}),N=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),V=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),_=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),k=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),I=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(typeof l=="string"?(b,T)=>{let P=l;return(b==null?void 0:b[P])===(T==null?void 0:T[P])}:l),H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(b=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(m.mode,{[1]:()=>s.some(T=>I(T,b)),[0]:()=>I(s,b)}),[s]),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({...v,optionsPropsRef:C,labelRef:N,inputRef:V,buttonRef:_,optionsRef:k,value:s,defaultValue:o,disabled:d,mode:p?1:0,get activeOptionIndex(){if(x.current&&v.activeOptionIndex===null&&v.options.length>0){let b=v.options.findIndex(T=>!T.dataRef.current.disabled);if(b!==-1)return b}return v.activeOptionIndex},compare:I,isSelected:H,nullable:e,__demoMode:f}),[s,o,d,p,e,f,v]);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>{v.dataRef.current=m},[m]),(0,_hooks_use_outside_click_js__WEBPACK_IMPORTED_MODULE_7__.useOutsideClick)([m.buttonRef,m.inputRef,m.optionsRef],()=>Z.closeCombobox(),m.comboboxState===0);let M=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:m.comboboxState===0,disabled:d,activeIndex:m.activeOptionIndex,activeOption:m.activeOptionIndex===null?null:m.options[m.activeOptionIndex].dataRef.current.value,value:s}),[m,d,s]),h=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(b=>{let T=m.options.find(P=>P.id===b);!T||j(T.dataRef.current.value)}),O=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{if(m.activeOptionIndex!==null){let{dataRef:b,id:T}=m.options[m.activeOptionIndex];j(b.current.value),Z.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,T)}}),u=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{c({type:0}),x.current=!0}),L=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{c({type:1}),x.current=!1}),Q=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((b,T,P)=>(x.current=!1,b===_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific?c({type:2,focus:_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,id:T,trigger:P}):c({type:2,focus:b,trigger:P}))),Y=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((b,T)=>(c({type:3,id:b,dataRef:T}),()=>c({type:4,id:b}))),se=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(b=>(c({type:5,id:b}),()=>c({type:5,id:null}))),j=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(b=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(m.mode,{[0](){return R==null?void 0:R(b)},[1](){let T=m.value.slice(),P=T.findIndex(K=>I(K,b));return P===-1?T.push(b):T.splice(P,1),R==null?void 0:R(T)}})),Z=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({onChange:j,registerOption:Y,registerLabel:se,goToOption:Q,closeCombobox:L,openCombobox:u,selectActiveOption:O,selectOption:h}),[]),de=r===null?{}:{ref:r},J=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),be=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_8__.useDisposables)();return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{!J.current||o!==void 0&&be.addEventListener(J.current,"reset",()=>{j(o)})},[J,j]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(ne.Provider,{value:Z},react__WEBPACK_IMPORTED_MODULE_0__.createElement(re.Provider,{value:m},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_9__.OpenClosedProvider,{value:(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(m.comboboxState,{[0]:_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_9__.State.Open,[1]:_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_9__.State.Closed})},i!=null&&s!=null&&(0,_utils_form_js__WEBPACK_IMPORTED_MODULE_10__.objectToFormEntries)({[i]:s}).map(([b,T],P)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Hidden,{features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Features.Hidden,ref:P===0?K=>{var ae;J.current=(ae=K==null?void 0:K.closest("form"))!=null?ae:null}:void 0,...(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.compact)({key:b,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:b,value:T})})),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.render)({ourProps:de,theirProps:A,slot:M,defaultTag:Ge,name:"Combobox"}))))}let He=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.forwardRefWithAs)(Ne),je="input",Ke=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.forwardRefWithAs)(function(r,n){var m,M,h,O;let o=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_13__.useId)(),{id:a=`headlessui-combobox-input-${o}`,onChange:i,displayValue:l,type:d="text",...f}=r,e=G("Combobox.Input"),p=$("Combobox.Input"),A=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_14__.useSyncRefs)(e.inputRef,n),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),R=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_8__.useDisposables)(),v=function(){var u;return typeof l=="function"&&e.value!==void 0?(u=l(e.value))!=null?u:"":typeof e.value=="string"?e.value:""}();(0,_hooks_use_watch_js__WEBPACK_IMPORTED_MODULE_15__.useWatch)(([u,L],[Q,Y])=>{s.current||!e.inputRef.current||(Y===0&&L===1||u!==Q)&&(e.inputRef.current.value=u)},[v,e.comboboxState]);let c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),x=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{c.current=!0}),C=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{setTimeout(()=>{c.current=!1})}),N=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(u=>{switch(s.current=!0,u.key){case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Backspace:case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Delete:if(e.mode!==0||!e.nullable)return;let L=u.currentTarget;R.requestAnimationFrame(()=>{L.value===""&&(p.onChange(null),e.optionsRef.current&&(e.optionsRef.current.scrollTop=0),p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Nothing))});break;case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Enter:if(s.current=!1,e.comboboxState!==0||c.current)return;if(u.preventDefault(),u.stopPropagation(),e.activeOptionIndex===null){p.closeCombobox();return}p.selectActiveOption(),e.mode===0&&p.closeCombobox();break;case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.ArrowDown:return s.current=!1,u.preventDefault(),u.stopPropagation(),(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(e.comboboxState,{[0]:()=>{p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Next)},[1]:()=>{p.openCombobox()}});case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.ArrowUp:return s.current=!1,u.preventDefault(),u.stopPropagation(),(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(e.comboboxState,{[0]:()=>{p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Previous)},[1]:()=>{p.openCombobox(),R.nextFrame(()=>{e.value||p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Last)})}});case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Home:if(u.shiftKey)break;return s.current=!1,u.preventDefault(),u.stopPropagation(),p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.First);case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.PageUp:return s.current=!1,u.preventDefault(),u.stopPropagation(),p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.First);case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.End:if(u.shiftKey)break;return s.current=!1,u.preventDefault(),u.stopPropagation(),p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Last);case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.PageDown:return s.current=!1,u.preventDefault(),u.stopPropagation(),p.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Last);case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Escape:return s.current=!1,e.comboboxState!==0?void 0:(u.preventDefault(),e.optionsRef.current&&!e.optionsPropsRef.current.static&&u.stopPropagation(),p.closeCombobox());case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Tab:if(s.current=!1,e.comboboxState!==0)return;e.mode===0&&p.selectActiveOption(),p.closeCombobox();break}}),V=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(u=>{p.openCombobox(),i==null||i(u)}),_=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{s.current=!1}),k=(0,_hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__.useComputed)(()=>{if(!!e.labelId)return[e.labelId].join(" ")},[e.labelId]),I=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:e.comboboxState===0,disabled:e.disabled}),[e]),H={ref:A,id:a,role:"combobox",type:d,"aria-controls":(m=e.optionsRef.current)==null?void 0:m.id,"aria-expanded":e.disabled?void 0:e.comboboxState===0,"aria-activedescendant":e.activeOptionIndex===null||(M=e.options[e.activeOptionIndex])==null?void 0:M.id,"aria-multiselectable":e.mode===1?!0:void 0,"aria-labelledby":k,defaultValue:(O=(h=r.defaultValue)!=null?h:e.defaultValue!==void 0?l==null?void 0:l(e.defaultValue):null)!=null?O:e.defaultValue,disabled:e.disabled,onCompositionStart:x,onCompositionEnd:C,onKeyDown:N,onChange:V,onBlur:_};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.render)({ourProps:H,theirProps:f,slot:I,defaultTag:je,name:"Combobox.Input"})}),We="button",Xe=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.forwardRefWithAs)(function(r,n){var c;let o=G("Combobox.Button"),a=$("Combobox.Button"),i=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_14__.useSyncRefs)(o.buttonRef,n),l=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_13__.useId)(),{id:d=`headlessui-combobox-button-${l}`,...f}=r,e=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_8__.useDisposables)(),p=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(x=>{switch(x.key){case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.ArrowDown:return x.preventDefault(),x.stopPropagation(),o.comboboxState===1&&a.openCombobox(),e.nextFrame(()=>{var C;return(C=o.inputRef.current)==null?void 0:C.focus({preventScroll:!0})});case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.ArrowUp:return x.preventDefault(),x.stopPropagation(),o.comboboxState===1&&(a.openCombobox(),e.nextFrame(()=>{o.value||a.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Last)})),e.nextFrame(()=>{var C;return(C=o.inputRef.current)==null?void 0:C.focus({preventScroll:!0})});case _keyboard_js__WEBPACK_IMPORTED_MODULE_16__.Keys.Escape:return o.comboboxState!==0?void 0:(x.preventDefault(),o.optionsRef.current&&!o.optionsPropsRef.current.static&&x.stopPropagation(),a.closeCombobox(),e.nextFrame(()=>{var C;return(C=o.inputRef.current)==null?void 0:C.focus({preventScroll:!0})}));default:return}}),A=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(x=>{if((0,_utils_bugs_js__WEBPACK_IMPORTED_MODULE_18__.isDisabledReactIssue7711)(x.currentTarget))return x.preventDefault();o.comboboxState===0?a.closeCombobox():(x.preventDefault(),a.openCombobox()),e.nextFrame(()=>{var C;return(C=o.inputRef.current)==null?void 0:C.focus({preventScroll:!0})})}),s=(0,_hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__.useComputed)(()=>{if(!!o.labelId)return[o.labelId,d].join(" ")},[o.labelId,d]),R=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:o.comboboxState===0,disabled:o.disabled,value:o.value}),[o]),v={ref:i,id:d,type:(0,_hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_19__.useResolveButtonType)(r,o.buttonRef),tabIndex:-1,"aria-haspopup":"listbox","aria-controls":(c=o.optionsRef.current)==null?void 0:c.id,"aria-expanded":o.disabled?void 0:o.comboboxState===0,"aria-labelledby":s,disabled:o.disabled,onClick:A,onKeyDown:p};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.render)({ourProps:v,theirProps:f,slot:R,defaultTag:We,name:"Combobox.Button"})}),$e="label",Je=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.forwardRefWithAs)(function(r,n){let o=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_13__.useId)(),{id:a=`headlessui-combobox-label-${o}`,...i}=r,l=G("Combobox.Label"),d=$("Combobox.Label"),f=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_14__.useSyncRefs)(l.labelRef,n);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>d.registerLabel(a),[a]);let e=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{var s;return(s=l.inputRef.current)==null?void 0:s.focus({preventScroll:!0})}),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:l.comboboxState===0,disabled:l.disabled}),[l]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.render)({ourProps:{ref:f,id:a,onClick:e},theirProps:i,slot:p,defaultTag:$e,name:"Combobox.Label"})}),qe="ul",Qe=_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.Features.RenderStrategy|_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.Features.Static,Ye=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.forwardRefWithAs)(function(r,n){var v;let o=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_13__.useId)(),{id:a=`headlessui-combobox-options-${o}`,hold:i=!1,...l}=r,d=G("Combobox.Options"),f=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_14__.useSyncRefs)(d.optionsRef,n),e=(0,_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_9__.useOpenClosed)(),p=(()=>e!==null?e===_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_9__.State.Open:d.comboboxState===0)();(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>{var c;d.optionsPropsRef.current.static=(c=r.static)!=null?c:!1},[d.optionsPropsRef,r.static]),(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>{d.optionsPropsRef.current.hold=i},[d.optionsPropsRef,i]),(0,_hooks_use_tree_walker_js__WEBPACK_IMPORTED_MODULE_20__.useTreeWalker)({container:d.optionsRef.current,enabled:d.comboboxState===0,accept(c){return c.getAttribute("role")==="option"?NodeFilter.FILTER_REJECT:c.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(c){c.setAttribute("role","none")}});let A=(0,_hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__.useComputed)(()=>{var c,x;return(x=d.labelId)!=null?x:(c=d.buttonRef.current)==null?void 0:c.id},[d.labelId,d.buttonRef.current]),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:d.comboboxState===0}),[d]),R={"aria-activedescendant":d.activeOptionIndex===null||(v=d.options[d.activeOptionIndex])==null?void 0:v.id,"aria-labelledby":A,role:"listbox",id:a,ref:f};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.render)({ourProps:R,theirProps:l,slot:s,defaultTag:qe,features:Qe,visible:p,name:"Combobox.Options"})}),Ze="li",ze=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.forwardRefWithAs)(function(r,n){var M,h;let o=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_13__.useId)(),{id:a=`headlessui-combobox-option-${o}`,disabled:i=!1,value:l,...d}=r,f=G("Combobox.Option"),e=$("Combobox.Option"),p=f.activeOptionIndex!==null?f.options[f.activeOptionIndex].id===a:!1,A=f.isSelected(l),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),R=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_21__.useLatestValue)({disabled:i,value:l,domRef:s,textValue:(h=(M=s.current)==null?void 0:M.textContent)==null?void 0:h.toLowerCase()}),v=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_14__.useSyncRefs)(n,s),c=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>e.selectOption(a));(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>e.registerOption(a,R),[R,a]);let x=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!f.__demoMode);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>{if(!f.__demoMode)return;let O=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_22__.disposables)();return O.requestAnimationFrame(()=>{x.current=!0}),O.dispose},[]),(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>{if(f.comboboxState!==0||!p||!x.current||f.activationTrigger===0)return;let O=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_22__.disposables)();return O.requestAnimationFrame(()=>{var u,L;(L=(u=s.current)==null?void 0:u.scrollIntoView)==null||L.call(u,{block:"nearest"})}),O.dispose},[s,p,f.comboboxState,f.activationTrigger,f.activeOptionIndex]);let C=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(O=>{if(i)return O.preventDefault();c(),f.mode===0&&e.closeCombobox()}),N=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(()=>{if(i)return e.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Nothing);e.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,a)}),V=(0,_hooks_use_tracked_pointer_js__WEBPACK_IMPORTED_MODULE_23__.useTrackedPointer)(),_=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(O=>V.update(O)),k=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(O=>{!V.wasMoved(O)||i||p||e.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,a,0)}),I=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(O=>{!V.wasMoved(O)||i||!p||f.optionsPropsRef.current.hold||e.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Nothing)}),H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({active:p,selected:A,disabled:i}),[p,A,i]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_12__.render)({ourProps:{id:a,ref:v,role:"option",tabIndex:i===!0?void 0:-1,"aria-disabled":i===!0?!0:void 0,"aria-selected":A,disabled:void 0,onClick:C,onFocus:N,onPointerEnter:_,onMouseEnter:_,onPointerMove:k,onMouseMove:k,onPointerLeave:I,onMouseLeave:I},theirProps:d,slot:H,defaultTag:Ze,name:"Combobox.Option"})}),ko=Object.assign(He,{Input:Ke,Button:Xe,Label:Je,Options:Ye,Option:ze});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/hooks/use-tree-walker.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/hooks/use-tree-walker.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTreeWalker": () => (/* binding */ F)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _utils_owner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/owner.js */ "./node_modules/@headlessui/react/dist/utils/owner.js");
function F({container:e,accept:t,walk:r,enabled:c=!0}){let o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(t),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(r);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{o.current=t,l.current=r},[t,r]),(0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>{if(!e||!c)return;let n=(0,_utils_owner_js__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(e);if(!n)return;let f=o.current,p=l.current,d=Object.assign(i=>f(i),{acceptNode:f}),u=n.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,d,!1);for(;u.nextNode();)p(u.currentNode)},[e,c,o,l])}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("546e4f7c4f301034bb12")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.61833ecec00ce5b2cb74.hot-update.js.map