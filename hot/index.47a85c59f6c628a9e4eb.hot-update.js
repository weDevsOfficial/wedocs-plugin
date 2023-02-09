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
    defaultSection
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

    console.log(sectionId, newArticle.title.raw === '');
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
    defaultSection: defaultSection,
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
  const [selectedSection, setSelectedSection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSelectedSection(defaultSection?.title?.rendered);
    selectSection(defaultSection?.id);
  }, [defaultSection]);
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
_s(ComboBox, "AfCJZ8h5exW00qX4iYcscxdkIj8=", false, function () {
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
    defaultSection: section,
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
      // 1675963335205
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e6f0398f8e64ed1502af")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.47a85c59f6c628a9e4eb.hot-update.js.map