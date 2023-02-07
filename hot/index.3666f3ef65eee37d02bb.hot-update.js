globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./node_modules/@heroicons/react/20/solid/CheckIcon.js":
/*!*************************************************************!*\
  !*** ./node_modules/@heroicons/react/20/solid/CheckIcon.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const React = __webpack_require__(/*! react */ "react");

function CheckIcon({
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
    d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(CheckIcon);
module.exports = ForwardRef;

/***/ }),

/***/ "./node_modules/@heroicons/react/20/solid/ChevronDownIcon.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@heroicons/react/20/solid/ChevronDownIcon.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const React = __webpack_require__(/*! react */ "react");

function ChevronDownIcon({
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
    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(ChevronDownIcon);
module.exports = ForwardRef;

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layout */ "./src/components/Layout.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _DocListing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DocListing */ "./src/components/DocListing/index.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings */ "./src/components/Settings/index.js");
/* harmony import */ var _Docs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Docs */ "./src/components/Docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");







const App = () => {
  const router = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.createHashRouter)((0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.createRoutesFromElements)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Route, {
    path: "/",
    element: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Docs__WEBPACK_IMPORTED_MODULE_4__["default"], null)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Route, {
    path: "settings",
    element: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Settings__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Route, {
    path: "section/:id",
    element: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DocListing__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }))));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.RouterProvider, {
    router: router
  }));
};
_c = App;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);
var _c;
__webpack_require__.$Refresh$.register(_c, "App");

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

/***/ "./src/components/Listbox.js":
/*!***********************************!*\
  !*** ./src/components/Listbox.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/listbox/listbox.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/transitions/transition.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @heroicons/react/20/solid */ "./node_modules/@heroicons/react/20/solid/ChevronDownIcon.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @heroicons/react/20/solid */ "./node_modules/@heroicons/react/20/solid/CheckIcon.js");
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_4__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();




const ListBox = _ref => {
  _s();
  let {
    name,
    options,
    generalSettings,
    settingsData,
    setSettings
  } = _ref;
  const classNames = function () {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(' ');
  };
  const [selected, setSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(options[0]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSelected(options.find(option => option.value === generalSettings[name]));
  }, [generalSettings[name]]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSettings({
      ...settingsData,
      general: {
        ...generalSettings,
        [name]: selected.value
      }
    });
  }, [selected]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Listbox, {
    value: selected,
    onChange: setSelected
  }, _ref2 => {
    let {
      open
    } = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "relative mt-1"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Listbox.Button, {
      className: "relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "block truncate"
    }, selected.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2__, {
      className: "h-5 w-5 text-gray-400",
      "aria-hidden": "true"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Transition, {
      show: open,
      as: _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment,
      leave: "transition ease-in duration-100",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Listbox.Options, {
      className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    }, options.map(option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Listbox.Option, {
      key: option.value,
      className: _ref3 => {
        let {
          active
        } = _ref3;
        return classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-pointer relative cursor-default select-none py-2 pl-3 pr-9');
      },
      value: option
    }, _ref4 => {
      let {
        selected,
        active
      } = _ref4;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')
      }, option.name), selected ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_4__, {
        className: "h-5 w-5",
        "aria-hidden": "true"
      })) : null);
    }))))));
  });
};
_s(ListBox, "ZctX97wSOu7/FzeGXyGKXc6+X40=");
_c = ListBox;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListBox);
var _c;
__webpack_require__.$Refresh$.register(_c, "ListBox");

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

/***/ "./src/components/Settings/GeneralSettings.js":
/*!****************************************************!*\
  !*** ./src/components/Settings/GeneralSettings.js ***!
  \****************************************************/
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
/* harmony import */ var _Switcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Switcher */ "./src/components/Switcher.js");
/* harmony import */ var _Listbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Listbox */ "./src/components/Listbox.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();





const GeneralSettings = _ref => {
  _s();
  let {
    settingsData,
    generalSettingsData,
    setSettings
  } = _ref;
  const docsHomeOptions = [{
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation', 'wedocs-pro'),
    value: 'documentation'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Home', 'wedocs-pro'),
    value: 'home'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Blog', 'wedocs-pro'),
    value: 'blog'
  }];
  const [generalSettings, setGeneralSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    ...generalSettingsData
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setGeneralSettings({
      ...generalSettingsData
    });
  }, [generalSettingsData]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shadow sm:rounded-md sm:overflow-x-hidden"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "section-heading py-4 px-8 sm:px-8 sm:py-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-gray-900 font-medium text-lg"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General', 'wedocs-pro'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
    className: "h-px !bg-gray-200 border-0 dark:!bg-gray-200"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pt-6 pb-20 px-8 grid grid-cols-4 gap-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-content flex items-center justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-field-heading flex items-center space-x-2 flex-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "block text-sm font-medium text-gray-700",
    id: "headlessui-listbox-label-15",
    "data-headlessui-state": "open"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('weDocs Home', 'wedocs-pro'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-field w-full max-w-[490px] mt-1 ml-auto flex-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Listbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
    name: "home",
    options: docsHomeOptions,
    generalSettings: generalSettings,
    settingsData: settingsData,
    setSettings: setSettings
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-description w-full max-w-[490px] ml-auto mt-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-sm text-[#6B7280]"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Home page for docs page. Preferably use [wedocs] ', 'wedocs-pro'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    target: "_blank",
    className: "text-indigo-700 underline underline-offset-2"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('shortcode', 'wedocs-pro')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(' or design your own.', 'wedocs-pro')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-content flex items-center justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-heading flex items-center space-x-2 flex-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "block text-sm font-medium text-gray-700",
    id: "headlessui-listbox-label-15",
    "data-headlessui-state": "open"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email Feedback on Article', 'wedocs-pro')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tooltip cursor-pointer ml-2",
    "data-tip": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Invite readers to share their thoughts and suggestions through an email feedback form', 'wedocs-pro')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z",
    stroke: "#6b7280",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Switcher__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "email_feedback",
    generalSettings: generalSettings,
    settingsData: settingsData,
    setSettings: setSettings
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-content flex items-center justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-heading space-x-2 items-center flex flex-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "block text-sm font-medium text-gray-700",
    id: "headlessui-listbox-label-15",
    "data-headlessui-state": "open"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Helpful Feedback on Article', 'wedocs-pro')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tooltip cursor-pointer ml-2",
    "data-tip": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enabling helpful feedback on your article allows readers to provide opinions on your content', 'wedocs-pro')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z",
    stroke: "#6b7280",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Switcher__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "helpful_feedback",
    generalSettings: generalSettings,
    settingsData: settingsData,
    setSettings: setSettings
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-content flex items-center justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-heading space-x-2 items-center flex flex-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "block text-sm font-medium text-gray-700",
    id: "headlessui-listbox-label-15",
    "data-headlessui-state": "open"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Allow Comments on Article', 'wedocs-pro')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tooltip cursor-pointer ml-2",
    "data-tip": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Increase reader engagement by turning on article comments', 'wedocs-pro')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z",
    stroke: "#6b7280",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Switcher__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "allow_comments",
    generalSettings: generalSettings,
    settingsData: settingsData,
    setSettings: setSettings
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-content flex items-center justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-heading space-x-2 items-center flex flex-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "block text-sm font-medium text-gray-700",
    id: "headlessui-listbox-label-15",
    "data-headlessui-state": "open"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Allow Article Printing', 'wedocs-pro')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tooltip cursor-pointer ml-2",
    "data-tip": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable this option to allow users to print articles directly from the website', 'wedocs-pro')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z",
    stroke: "#6b7280",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Switcher__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "allow_article",
    generalSettings: generalSettings,
    settingsData: settingsData,
    setSettings: setSettings
  }))))))));
};
_s(GeneralSettings, "CS85KgCLMc86abUkSGmYsIi8uX8=");
_c = GeneralSettings;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralSettings);
var _c;
__webpack_require__.$Refresh$.register(_c, "GeneralSettings");

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

/***/ "./src/components/Settings/Menu.js":
/*!*****************************************!*\
  !*** ./src/components/Settings/Menu.js ***!
  \*****************************************/
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
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/tabs/tabs.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();




const Menu = () => {
  _s();
  const menus = {
    general: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General', 'wedocs-pro')
  };
  const [iconPath, setIconPath] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('M1 10.512l2-2m0 0l7-7 7 7m-14 0v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6');
  const handleMenuIconPath = index => {
    let path = index === 1 ? 'M10 2.866a3.99 3.99 0 0 1 3-1.354 4 4 0 1 1 0 8 3.99 3.99 0 0 1-3-1.354m3 11.354H1v-1a6 6 0 1 1 12 0v1zm0 0h6v-1a6 6 0 0 0-6-6 5.97 5.97 0 0 0-3 .803m1-7.803a4 4 0 1 1-8 0 4 4 0 1 1 8 0z' : iconPath;
    path = index === 2 ? 'M1 3.512v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z' : path;
    path = index === 3 ? 'M13 5.512a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L9 15.512H7v2H5v2H2a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 0 1 13 1.512a6 6 0 0 1 6 6z' : path;
    return path;
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Object.entries(menus).map((value, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Tab, {
    key: index,
    className: "w-full focus:outline-0 text-gray-600 aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "21",
    fill: "currentColor",
    className: "text-gray-400 flex-shrink-0 -ml-1 mr-4 h-6 w-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1 10.512l2-2m0 0l7-7 7 7m-14 0v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6",
    stroke: "#9ca3af",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "truncate"
  }, value[1]))));
};
_s(Menu, "3vVH5F0xEwkKbVyBwJu2rY0RdTc=");
_c = Menu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);
var _c;
__webpack_require__.$Refresh$.register(_c, "Menu");

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

/***/ "./src/components/Settings/SaveButton.js":
/*!***********************************************!*\
  !*** ./src/components/Settings/SaveButton.js ***!
  \***********************************************/
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
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");



const SaveButton = _ref => {
  let {
    settingsSaveHandler
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sticky flex justify-end bottom-0 mt-5 p-5 pr-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    onClick: settingsSaveHandler,
    className: "inline-flex shadow shadow-lg shadow-gray-800/30 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    className: "-ml-1 mr-3 h-5 w-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'wedocs-pro')));
};
_c = SaveButton;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SaveButton);
var _c;
__webpack_require__.$Refresh$.register(_c, "SaveButton");

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

/***/ "./src/components/Settings/index.js":
/*!******************************************!*\
  !*** ./src/components/Settings/index.js ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./src/components/Settings/Menu.js");
/* harmony import */ var _SaveButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SaveButton */ "./src/components/Settings/SaveButton.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/tabs/tabs.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _data_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/settings */ "./src/data/settings/index.js");
/* harmony import */ var _GeneralSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GeneralSettings */ "./src/components/Settings/GeneralSettings.js");
/* harmony import */ var _data_docs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../data/docs */ "./src/data/docs/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();









const SettingsPage = () => {
  _s();
  const [selectedIndex, setSelectedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const settings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_data_settings__WEBPACK_IMPORTED_MODULE_4__["default"]).getSettings(), []);
  const parentDocs = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_data_docs__WEBPACK_IMPORTED_MODULE_6__["default"]).getParentDocs(), []);
  console.log(parentDocs);
  const weDocsSettings = {
    general: {
      home: 'documentation',
      email_feedback: true,
      helpful_feedback: true,
      allow_comments: true,
      allow_article: true
    },
    permission: {
      global_permission: [],
      role_wise_permission: []
    }
  };
  const [docSettings, setDocSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    ...weDocsSettings
  });
  const handleSettingsSave = () => {
    // Update wedocs settings data.
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)(_data_settings__WEBPACK_IMPORTED_MODULE_4__["default"]).updateSettings({
      settings: docSettings
    }).then(result => {
      console.log('result:', result);
    }).catch(err => {
      console.log('error:', err);
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (settings && Object.keys(settings).length) {
      setDocSettings(settings);
    }
  }, [settings]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "min-h-full"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "py-10 sm:px-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-100"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-full"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "lg:grid lg:grid-cols-12 lg:gap-x-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Group, {
    vertical: true,
    onChange: setSelectedIndex,
    selectedIndex: selectedIndex
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "py-[18px] bg-white rounded-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.List, {
    className: "overflow-hidden px-2 space-y-0.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Menu__WEBPACK_IMPORTED_MODULE_1__["default"], null)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-6 sm:px-6 lg:px-0 lg:col-span-9"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panels, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panel, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GeneralSettings__WEBPACK_IMPORTED_MODULE_5__["default"], {
    settingsData: docSettings,
    generalSettingsData: docSettings.general,
    setSettings: setDocSettings
  }))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SaveButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
    settingsSaveHandler: handleSettingsSave
  }))))));
};
_s(SettingsPage, "LAMEWPgGhQ4EaxQ1pv4FSC4gQnY=", false, function () {
  return [_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect, _wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect];
});
_c = SettingsPage;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsPage);
var _c;
__webpack_require__.$Refresh$.register(_c, "SettingsPage");

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

/***/ "./src/components/Switcher.js":
/*!************************************!*\
  !*** ./src/components/Switcher.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/switch/switch.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();




const Switcher = _ref => {
  _s();
  let {
    name,
    generalSettings,
    settingsData,
    setSettings
  } = _ref;
  const [enabled, setEnabled] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const classNames = function () {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(' ');
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!Boolean(generalSettings[name])) {
      setEnabled(false);
    }
  }, [generalSettings[name]]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSettings({
      ...settingsData,
      general: {
        ...generalSettings,
        [name]: enabled
      }
    });
  }, [enabled]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Switch, {
    checked: enabled,
    onChange: setEnabled,
    className: "group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true",
    className: "pointer-events-none absolute h-full w-full rounded-md bg-white"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true",
    className: classNames(enabled ? 'bg-indigo-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true",
    className: classNames(enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "ml-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "text-sm text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(enabled ? 'Enable' : 'Disable', 'wedocs-pro'))));
};
_s(Switcher, "AdpXreAjsFZBn284VGI0MLPkSQI=");
_c = Switcher;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Switcher);
var _c;
__webpack_require__.$Refresh$.register(_c, "Switcher");

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
      // 1675748829130
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/label/label.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/label/label.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Label": () => (/* binding */ F),
/* harmony export */   "useLabels": () => (/* binding */ M)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
let u=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function c(){let n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(u);if(n===null){let r=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,c),r}return n}function M(){let[n,r]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);return[n.length>0?n.join(" "):void 0,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function(e){let o=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(l=>(r(t=>[...t,l]),()=>r(t=>{let i=t.slice(),a=i.indexOf(l);return a!==-1&&i.splice(a,1),i}))),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({register:o,slot:e.slot,name:e.name,props:e.props}),[o,e.slot,e.name,e.props]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(u.Provider,{value:s},e.children)},[r])]}let h="label",F=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.forwardRefWithAs)(function(r,d){let e=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_3__.useId)(),{id:o=`headlessui-label-${e}`,passive:s=!1,...l}=r,t=c(),i=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(d);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__.useIsoMorphicEffect)(()=>t.register(o),[o,t.register]);let a={ref:i,...t.props,id:o};return s&&("onClick"in a&&delete a.onClick,"onClick"in l&&delete l.onClick),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.render)({ourProps:a,theirProps:l,slot:t.slot||{},defaultTag:h,name:t.name||"Label"})});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/listbox/listbox.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/listbox/listbox.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Listbox": () => (/* binding */ Mt)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/use-disposables.js */ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../hooks/use-computed.js */ "./node_modules/@headlessui/react/dist/hooks/use-computed.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _utils_disposables_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utils/disposables.js */ "./node_modules/@headlessui/react/dist/utils/disposables.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../keyboard.js */ "./node_modules/@headlessui/react/dist/components/keyboard.js");
/* harmony import */ var _utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/calculate-active-index.js */ "./node_modules/@headlessui/react/dist/utils/calculate-active-index.js");
/* harmony import */ var _utils_bugs_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../utils/bugs.js */ "./node_modules/@headlessui/react/dist/utils/bugs.js");
/* harmony import */ var _utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/focus-management.js */ "./node_modules/@headlessui/react/dist/utils/focus-management.js");
/* harmony import */ var _internal_open_closed_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../internal/open-closed.js */ "./node_modules/@headlessui/react/dist/internal/open-closed.js");
/* harmony import */ var _hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../hooks/use-resolve-button-type.js */ "./node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js");
/* harmony import */ var _hooks_use_outside_click_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/use-outside-click.js */ "./node_modules/@headlessui/react/dist/hooks/use-outside-click.js");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../internal/hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _utils_form_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/form.js */ "./node_modules/@headlessui/react/dist/utils/form.js");
/* harmony import */ var _utils_owner_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../utils/owner.js */ "./node_modules/@headlessui/react/dist/utils/owner.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_controllable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-controllable.js */ "./node_modules/@headlessui/react/dist/hooks/use-controllable.js");
/* harmony import */ var _hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../hooks/use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
/* harmony import */ var _hooks_use_tracked_pointer_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../hooks/use-tracked-pointer.js */ "./node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js");
var Ue=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))(Ue||{}),Be=(o=>(o[o.Single=0]="Single",o[o.Multi=1]="Multi",o))(Be||{}),He=(o=>(o[o.Pointer=0]="Pointer",o[o.Other=1]="Other",o))(He||{}),Ge=(n=>(n[n.OpenListbox=0]="OpenListbox",n[n.CloseListbox=1]="CloseListbox",n[n.GoToOption=2]="GoToOption",n[n.Search=3]="Search",n[n.ClearSearch=4]="ClearSearch",n[n.RegisterOption=5]="RegisterOption",n[n.UnregisterOption=6]="UnregisterOption",n[n.RegisterLabel=7]="RegisterLabel",n))(Ge||{});function q(e,r=o=>o){let o=e.activeOptionIndex!==null?e.options[e.activeOptionIndex]:null,p=(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.sortByDomNode)(r(e.options.slice()),c=>c.dataRef.current.domRef.current),i=o?p.indexOf(o):null;return i===-1&&(i=null),{options:p,activeOptionIndex:i}}let je={[1](e){return e.dataRef.current.disabled||e.listboxState===1?e:{...e,activeOptionIndex:null,listboxState:1}},[0](e){if(e.dataRef.current.disabled||e.listboxState===0)return e;let r=e.activeOptionIndex,{isSelected:o}=e.dataRef.current,p=e.options.findIndex(i=>o(i.dataRef.current.value));return p!==-1&&(r=p),{...e,listboxState:0,activeOptionIndex:r}},[2](e,r){var i;if(e.dataRef.current.disabled||e.listboxState===1)return e;let o=q(e),p=(0,_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.calculateActiveIndex)(r,{resolveItems:()=>o.options,resolveActiveIndex:()=>o.activeOptionIndex,resolveId:c=>c.id,resolveDisabled:c=>c.dataRef.current.disabled});return{...e,...o,searchQuery:"",activeOptionIndex:p,activationTrigger:(i=r.trigger)!=null?i:1}},[3]:(e,r)=>{if(e.dataRef.current.disabled||e.listboxState===1)return e;let p=e.searchQuery!==""?0:1,i=e.searchQuery+r.value.toLowerCase(),t=(e.activeOptionIndex!==null?e.options.slice(e.activeOptionIndex+p).concat(e.options.slice(0,e.activeOptionIndex+p)):e.options).find(n=>{var T;return!n.dataRef.current.disabled&&((T=n.dataRef.current.textValue)==null?void 0:T.startsWith(i))}),u=t?e.options.indexOf(t):-1;return u===-1||u===e.activeOptionIndex?{...e,searchQuery:i}:{...e,searchQuery:i,activeOptionIndex:u,activationTrigger:1}},[4](e){return e.dataRef.current.disabled||e.listboxState===1||e.searchQuery===""?e:{...e,searchQuery:""}},[5]:(e,r)=>{let o={id:r.id,dataRef:r.dataRef},p=q(e,i=>[...i,o]);return e.activeOptionIndex===null&&e.dataRef.current.isSelected(r.dataRef.current.value)&&(p.activeOptionIndex=p.options.indexOf(o)),{...e,...p}},[6]:(e,r)=>{let o=q(e,p=>{let i=p.findIndex(c=>c.id===r.id);return i!==-1&&p.splice(i,1),p});return{...e,...o,activationTrigger:1}},[7]:(e,r)=>({...e,labelId:r.id})},X=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);X.displayName="ListboxActionsContext";function B(e){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(X);if(r===null){let o=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,B),o}return r}let J=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);J.displayName="ListboxDataContext";function H(e){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(J);if(r===null){let o=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,H),o}return r}function Ke(e,r){return (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(r.type,je,e,r)}let Ve=react__WEBPACK_IMPORTED_MODULE_0__.Fragment,Ne=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.forwardRefWithAs)(function(r,o){let{value:p,defaultValue:i,name:c,onChange:t,by:u=(l,f)=>l===f,disabled:n=!1,horizontal:T=!1,multiple:g=!1,...A}=r;const m=T?"horizontal":"vertical";let P=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(o),[y=g?[]:void 0,S]=(0,_hooks_use_controllable_js__WEBPACK_IMPORTED_MODULE_6__.useControllable)(p,t,i),[h,s]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(Ke,{dataRef:(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)(),listboxState:1,options:[],searchQuery:"",labelId:null,activeOptionIndex:null,activationTrigger:1}),a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({static:!1,hold:!1}),x=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),D=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),Q=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),M=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(typeof u=="string"?(l,f)=>{let v=u;return(l==null?void 0:l[v])===(f==null?void 0:f[v])}:u),L=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(l=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(d.mode,{[1]:()=>y.some(f=>M(f,l)),[0]:()=>M(y,l)}),[y]),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({...h,value:y,disabled:n,mode:g?1:0,orientation:m,compare:M,isSelected:L,optionsPropsRef:a,labelRef:x,buttonRef:D,optionsRef:Q}),[y,n,g,h]);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_8__.useIsoMorphicEffect)(()=>{h.dataRef.current=d},[d]),(0,_hooks_use_outside_click_js__WEBPACK_IMPORTED_MODULE_9__.useOutsideClick)([d.buttonRef,d.optionsRef],(l,f)=>{var v;s({type:1}),(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.isFocusableElement)(f,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.FocusableMode.Loose)||(l.preventDefault(),(v=d.buttonRef.current)==null||v.focus())},d.listboxState===0);let G=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:d.listboxState===0,disabled:n,value:y}),[d,n,y]),ie=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(l=>{let f=d.options.find(v=>v.id===l);!f||k(f.dataRef.current.value)}),re=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>{if(d.activeOptionIndex!==null){let{dataRef:l,id:f}=d.options[d.activeOptionIndex];k(l.current.value),s({type:2,focus:_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,id:f})}}),ae=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>s({type:0})),le=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>s({type:1})),se=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)((l,f,v)=>l===_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific?s({type:2,focus:_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,id:f,trigger:v}):s({type:2,focus:l,trigger:v})),ue=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)((l,f)=>(s({type:5,id:l,dataRef:f}),()=>s({type:6,id:l}))),pe=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(l=>(s({type:7,id:l}),()=>s({type:7,id:null}))),k=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(l=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(d.mode,{[0](){return S==null?void 0:S(l)},[1](){let f=d.value.slice(),v=f.findIndex(w=>M(w,l));return v===-1?f.push(l):f.splice(v,1),S==null?void 0:S(f)}})),de=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(l=>s({type:3,value:l})),ce=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>s({type:4})),fe=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({onChange:k,registerOption:ue,registerLabel:pe,goToOption:se,closeListbox:le,openListbox:ae,selectActiveOption:re,selectOption:ie,search:de,clearSearch:ce}),[]),be={ref:P},j=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),Te=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_10__.useDisposables)();return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{!j.current||i!==void 0&&Te.addEventListener(j.current,"reset",()=>{k(i)})},[j,k]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(X.Provider,{value:fe},react__WEBPACK_IMPORTED_MODULE_0__.createElement(J.Provider,{value:d},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_11__.OpenClosedProvider,{value:(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(d.listboxState,{[0]:_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_11__.State.Open,[1]:_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_11__.State.Closed})},c!=null&&y!=null&&(0,_utils_form_js__WEBPACK_IMPORTED_MODULE_12__.objectToFormEntries)({[c]:y}).map(([l,f],v)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_13__.Hidden,{features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_13__.Features.Hidden,ref:v===0?w=>{var Y;j.current=(Y=w==null?void 0:w.closest("form"))!=null?Y:null}:void 0,...(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.compact)({key:l,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:l,value:f})})),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.render)({ourProps:be,theirProps:A,slot:G,defaultTag:Ve,name:"Listbox"}))))}),We="button",Qe=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.forwardRefWithAs)(function(r,o){var h;let p=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_14__.useId)(),{id:i=`headlessui-listbox-button-${p}`,...c}=r,t=H("Listbox.Button"),u=B("Listbox.Button"),n=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(t.buttonRef,o),T=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_10__.useDisposables)(),g=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(s=>{switch(s.key){case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Space:case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Enter:case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.ArrowDown:s.preventDefault(),u.openListbox(),T.nextFrame(()=>{t.value||u.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.First)});break;case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.ArrowUp:s.preventDefault(),u.openListbox(),T.nextFrame(()=>{t.value||u.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Last)});break}}),A=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(s=>{switch(s.key){case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Space:s.preventDefault();break}}),m=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(s=>{if((0,_utils_bugs_js__WEBPACK_IMPORTED_MODULE_16__.isDisabledReactIssue7711)(s.currentTarget))return s.preventDefault();t.listboxState===0?(u.closeListbox(),T.nextFrame(()=>{var a;return(a=t.buttonRef.current)==null?void 0:a.focus({preventScroll:!0})})):(s.preventDefault(),u.openListbox())}),P=(0,_hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__.useComputed)(()=>{if(!!t.labelId)return[t.labelId,i].join(" ")},[t.labelId,i]),y=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:t.listboxState===0,disabled:t.disabled,value:t.value}),[t]),S={ref:n,id:i,type:(0,_hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_18__.useResolveButtonType)(r,t.buttonRef),"aria-haspopup":"listbox","aria-controls":(h=t.optionsRef.current)==null?void 0:h.id,"aria-expanded":t.disabled?void 0:t.listboxState===0,"aria-labelledby":P,disabled:t.disabled,onKeyDown:g,onKeyUp:A,onClick:m};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.render)({ourProps:S,theirProps:c,slot:y,defaultTag:We,name:"Listbox.Button"})}),$e="label",ze=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.forwardRefWithAs)(function(r,o){let p=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_14__.useId)(),{id:i=`headlessui-listbox-label-${p}`,...c}=r,t=H("Listbox.Label"),u=B("Listbox.Label"),n=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(t.labelRef,o);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_8__.useIsoMorphicEffect)(()=>u.registerLabel(i),[i]);let T=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>{var m;return(m=t.buttonRef.current)==null?void 0:m.focus({preventScroll:!0})}),g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:t.listboxState===0,disabled:t.disabled}),[t]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.render)({ourProps:{ref:n,id:i,onClick:T},theirProps:c,slot:g,defaultTag:$e,name:"Listbox.Label"})}),qe="ul",Xe=_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.Features.RenderStrategy|_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.Features.Static,Je=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.forwardRefWithAs)(function(r,o){var s;let p=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_14__.useId)(),{id:i=`headlessui-listbox-options-${p}`,...c}=r,t=H("Listbox.Options"),u=B("Listbox.Options"),n=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(t.optionsRef,o),T=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_10__.useDisposables)(),g=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_10__.useDisposables)(),A=(0,_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_11__.useOpenClosed)(),m=(()=>A!==null?A===_internal_open_closed_js__WEBPACK_IMPORTED_MODULE_11__.State.Open:t.listboxState===0)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{var x;let a=t.optionsRef.current;!a||t.listboxState===0&&a!==((x=(0,_utils_owner_js__WEBPACK_IMPORTED_MODULE_19__.getOwnerDocument)(a))==null?void 0:x.activeElement)&&a.focus({preventScroll:!0})},[t.listboxState,t.optionsRef]);let P=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(a=>{switch(g.dispose(),a.key){case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Space:if(t.searchQuery!=="")return a.preventDefault(),a.stopPropagation(),u.search(a.key);case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Enter:if(a.preventDefault(),a.stopPropagation(),t.activeOptionIndex!==null){let{dataRef:x}=t.options[t.activeOptionIndex];u.onChange(x.current.value)}t.mode===0&&(u.closeListbox(),(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_20__.disposables)().nextFrame(()=>{var x;return(x=t.buttonRef.current)==null?void 0:x.focus({preventScroll:!0})}));break;case (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(t.orientation,{vertical:_keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.ArrowDown,horizontal:_keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.ArrowRight}):return a.preventDefault(),a.stopPropagation(),u.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Next);case (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_3__.match)(t.orientation,{vertical:_keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.ArrowUp,horizontal:_keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.ArrowLeft}):return a.preventDefault(),a.stopPropagation(),u.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Previous);case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Home:case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.PageUp:return a.preventDefault(),a.stopPropagation(),u.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.First);case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.End:case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.PageDown:return a.preventDefault(),a.stopPropagation(),u.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Last);case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Escape:return a.preventDefault(),a.stopPropagation(),u.closeListbox(),T.nextFrame(()=>{var x;return(x=t.buttonRef.current)==null?void 0:x.focus({preventScroll:!0})});case _keyboard_js__WEBPACK_IMPORTED_MODULE_15__.Keys.Tab:a.preventDefault(),a.stopPropagation();break;default:a.key.length===1&&(u.search(a.key),g.setTimeout(()=>u.clearSearch(),350));break}}),y=(0,_hooks_use_computed_js__WEBPACK_IMPORTED_MODULE_17__.useComputed)(()=>{var a,x,D;return(D=(a=t.labelRef.current)==null?void 0:a.id)!=null?D:(x=t.buttonRef.current)==null?void 0:x.id},[t.labelRef.current,t.buttonRef.current]),S=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({open:t.listboxState===0}),[t]),h={"aria-activedescendant":t.activeOptionIndex===null||(s=t.options[t.activeOptionIndex])==null?void 0:s.id,"aria-multiselectable":t.mode===1?!0:void 0,"aria-labelledby":y,"aria-orientation":t.orientation,id:i,onKeyDown:P,role:"listbox",tabIndex:0,ref:n};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.render)({ourProps:h,theirProps:c,slot:S,defaultTag:qe,features:Xe,visible:m,name:"Listbox.Options"})}),Ye="li",Ze=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.forwardRefWithAs)(function(r,o){let p=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_14__.useId)(),{id:i=`headlessui-listbox-option-${p}`,disabled:c=!1,value:t,...u}=r,n=H("Listbox.Option"),T=B("Listbox.Option"),g=n.activeOptionIndex!==null?n.options[n.activeOptionIndex].id===i:!1,A=n.isSelected(t),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),P=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_21__.useLatestValue)({disabled:c,value:t,domRef:m,get textValue(){var L,d;return(d=(L=m.current)==null?void 0:L.textContent)==null?void 0:d.toLowerCase()}}),y=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(o,m);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_8__.useIsoMorphicEffect)(()=>{if(n.listboxState!==0||!g||n.activationTrigger===0)return;let L=(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_20__.disposables)();return L.requestAnimationFrame(()=>{var d,G;(G=(d=m.current)==null?void 0:d.scrollIntoView)==null||G.call(d,{block:"nearest"})}),L.dispose},[m,g,n.listboxState,n.activationTrigger,n.activeOptionIndex]),(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_8__.useIsoMorphicEffect)(()=>T.registerOption(i,P),[P,i]);let S=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(L=>{if(c)return L.preventDefault();T.onChange(t),n.mode===0&&(T.closeListbox(),(0,_utils_disposables_js__WEBPACK_IMPORTED_MODULE_20__.disposables)().nextFrame(()=>{var d;return(d=n.buttonRef.current)==null?void 0:d.focus({preventScroll:!0})}))}),h=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>{if(c)return T.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Nothing);T.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,i)}),s=(0,_hooks_use_tracked_pointer_js__WEBPACK_IMPORTED_MODULE_22__.useTrackedPointer)(),a=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(L=>s.update(L)),x=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(L=>{!s.wasMoved(L)||c||g||T.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Specific,i,0)}),D=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(L=>{!s.wasMoved(L)||c||!g||T.goToOption(_utils_calculate_active_index_js__WEBPACK_IMPORTED_MODULE_2__.Focus.Nothing)}),Q=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({active:g,selected:A,disabled:c}),[g,A,c]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_4__.render)({ourProps:{id:i,ref:y,role:"option",tabIndex:c===!0?void 0:-1,"aria-disabled":c===!0?!0:void 0,"aria-selected":A,disabled:void 0,onClick:S,onFocus:h,onPointerEnter:a,onMouseEnter:a,onPointerMove:x,onMouseMove:x,onPointerLeave:D,onMouseLeave:D},theirProps:u,slot:Q,defaultTag:Ye,name:"Listbox.Option"})}),Mt=Object.assign(Ne,{Button:Qe,Label:ze,Options:Je,Option:Ze});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/switch/switch.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/switch/switch.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Switch": () => (/* binding */ Pe)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../keyboard.js */ "./node_modules/@headlessui/react/dist/components/keyboard.js");
/* harmony import */ var _utils_bugs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/bugs.js */ "./node_modules/@headlessui/react/dist/utils/bugs.js");
/* harmony import */ var _label_label_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../label/label.js */ "./node_modules/@headlessui/react/dist/components/label/label.js");
/* harmony import */ var _description_description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../description/description.js */ "./node_modules/@headlessui/react/dist/components/description/description.js");
/* harmony import */ var _hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/use-resolve-button-type.js */ "./node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../internal/hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _utils_form_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/form.js */ "./node_modules/@headlessui/react/dist/utils/form.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _hooks_use_controllable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-controllable.js */ "./node_modules/@headlessui/react/dist/hooks/use-controllable.js");
/* harmony import */ var _hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../hooks/use-disposables.js */ "./node_modules/@headlessui/react/dist/hooks/use-disposables.js");
let b=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);b.displayName="GroupContext";let Y=react__WEBPACK_IMPORTED_MODULE_0__.Fragment;function Z(y){let[t,a]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[s,m]=(0,_label_label_js__WEBPACK_IMPORTED_MODULE_1__.useLabels)(),[c,o]=(0,_description_description_js__WEBPACK_IMPORTED_MODULE_2__.useDescriptions)(),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({switch:t,setSwitch:a,labelledby:s,describedby:c}),[t,a,s,c]),d={},h=y;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(o,{name:"Switch.Description"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(m,{name:"Switch.Label",props:{onClick(){!t||(t.click(),t.focus({preventScroll:!0}))}}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(b.Provider,{value:p},(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:d,theirProps:h,defaultTag:Y,name:"Switch.Group"}))))}let ee="button",te=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,a){let s=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_4__.useId)(),{id:m=`headlessui-switch-${s}`,checked:c,defaultChecked:o=!1,onChange:p,name:d,value:h,...v}=t,r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(b),u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),k=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(u,a,r===null?null:r.setSwitch),[n,i]=(0,_hooks_use_controllable_js__WEBPACK_IMPORTED_MODULE_6__.useControllable)(c,p,o),T=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(()=>i==null?void 0:i(!n)),g=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(e=>{if((0,_utils_bugs_js__WEBPACK_IMPORTED_MODULE_8__.isDisabledReactIssue7711)(e.currentTarget))return e.preventDefault();e.preventDefault(),T()}),C=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(e=>{e.key===_keyboard_js__WEBPACK_IMPORTED_MODULE_9__.Keys.Space?(e.preventDefault(),T()):e.key===_keyboard_js__WEBPACK_IMPORTED_MODULE_9__.Keys.Enter&&(0,_utils_form_js__WEBPACK_IMPORTED_MODULE_10__.attemptSubmit)(e.currentTarget)}),D=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)(e=>e.preventDefault()),L=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({checked:n}),[n]),R={id:m,ref:k,role:"switch",type:(0,_hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_11__.useResolveButtonType)(t,u),tabIndex:0,"aria-checked":n,"aria-labelledby":r==null?void 0:r.labelledby,"aria-describedby":r==null?void 0:r.describedby,onClick:g,onKeyUp:C,onKeyPress:D},A=(0,_hooks_use_disposables_js__WEBPACK_IMPORTED_MODULE_12__.useDisposables)();return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{var E;let e=(E=u.current)==null?void 0:E.closest("form");!e||o!==void 0&&A.addEventListener(e,"reset",()=>{i(o)})},[u,i]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,d!=null&&n&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_13__.Hidden,{features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_13__.Features.Hidden,...(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.compact)({as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:n,name:d,value:h})}),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:R,theirProps:v,slot:L,defaultTag:ee,name:"Switch"}))}),Pe=Object.assign(te,{Group:Z,Label:_label_label_js__WEBPACK_IMPORTED_MODULE_1__.Label,Description:_description_description_js__WEBPACK_IMPORTED_MODULE_2__.Description});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/components/tabs/tabs.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/components/tabs/tabs.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab": () => (/* binding */ Je)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/keyboard.js */ "./node_modules/@headlessui/react/dist/components/keyboard.js");
/* harmony import */ var _utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/focus-management.js */ "./node_modules/@headlessui/react/dist/utils/focus-management.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../hooks/use-resolve-button-type.js */ "./node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js");
/* harmony import */ var _hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-latest-value.js */ "./node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
/* harmony import */ var _internal_focus_sentinel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../internal/focus-sentinel.js */ "./node_modules/@headlessui/react/dist/internal/focus-sentinel.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/@headlessui/react/dist/hooks/use-event.js");
/* harmony import */ var _utils_micro_task_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/micro-task.js */ "./node_modules/@headlessui/react/dist/utils/micro-task.js");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../internal/hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _utils_owner_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/owner.js */ "./node_modules/@headlessui/react/dist/utils/owner.js");
var pe=(n=>(n[n.SetSelectedIndex=0]="SetSelectedIndex",n[n.RegisterTab=1]="RegisterTab",n[n.UnregisterTab=2]="UnregisterTab",n[n.RegisterPanel=3]="RegisterPanel",n[n.UnregisterPanel=4]="UnregisterPanel",n))(pe||{});let fe={[0](e,t){let r=e.tabs.filter(c=>{var s;return!((s=c.current)!=null&&s.hasAttribute("disabled"))});if(t.index<0)return{...e,selectedIndex:e.tabs.indexOf(r[0])};if(t.index>e.tabs.length)return{...e,selectedIndex:e.tabs.indexOf(r[r.length-1])};let i=e.tabs.slice(0,t.index),n=[...e.tabs.slice(t.index),...i].find(c=>r.includes(c));return n?{...e,selectedIndex:e.tabs.indexOf(n)}:e},[1](e,t){var n;if(e.tabs.includes(t.tab))return e;let r=e.tabs[e.selectedIndex],i=(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.sortByDomNode)([...e.tabs,t.tab],c=>c.current),o=(n=i.indexOf(r))!=null?n:e.selectedIndex;return o===-1&&(o=e.selectedIndex),{...e,tabs:i,selectedIndex:o}},[2](e,t){return{...e,tabs:e.tabs.filter(r=>r!==t.tab)}},[3](e,t){return e.panels.includes(t.panel)?e:{...e,panels:(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.sortByDomNode)([...e.panels,t.panel],r=>r.current)}},[4](e,t){return{...e,panels:e.panels.filter(r=>r!==t.panel)}}},q=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);q.displayName="TabsSSRContext";function J(e){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(q);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,J),r}return t}let Q=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);Q.displayName="TabsDataContext";function M(e){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Q);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,M),r}return t}let X=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);X.displayName="TabsActionsContext";function Y(e){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(X);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,Y),r}return t}function be(e,t){return (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_2__.match)(t.type,fe,e,t)}let Te=react__WEBPACK_IMPORTED_MODULE_0__.Fragment,me=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){let{defaultIndex:i=0,vertical:o=!1,manual:n=!1,onChange:c,selectedIndex:s=null,...L}=t;const g=o?"vertical":"horizontal",A=n?"manual":"auto";let d=s!==null,v=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(r),[p,l]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(be,{selectedIndex:s!=null?s:i,tabs:[],panels:[]}),P=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selectedIndex:p.selectedIndex}),[p.selectedIndex]),E=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(c||(()=>{})),f=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(p.tabs),b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({orientation:g,activation:A,...p}),[g,A,p]),y=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(u=>(l({type:1,tab:u}),()=>l({type:2,tab:u}))),I=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(u=>(l({type:3,panel:u}),()=>l({type:4,panel:u}))),R=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(u=>{k.current!==u&&E.current(u),d||l({type:0,index:u})}),k=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(d?t.selectedIndex:p.selectedIndex),G=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({registerTab:y,registerPanel:I,change:R}),[]);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_7__.useIsoMorphicEffect)(()=>{l({type:0,index:s!=null?s:i})},[s]);let j=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({tabs:[],panels:[]}),W={ref:v};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(q.Provider,{value:j},react__WEBPACK_IMPORTED_MODULE_0__.createElement(X.Provider,{value:G},react__WEBPACK_IMPORTED_MODULE_0__.createElement(Q.Provider,{value:b},b.tabs.length<=0&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_focus_sentinel_js__WEBPACK_IMPORTED_MODULE_8__.FocusSentinel,{onFocus:()=>{var u,C;for(let a of f.current)if(((u=a.current)==null?void 0:u.tabIndex)===0)return(C=a.current)==null||C.focus(),!0;return!1}}),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:W,theirProps:L,slot:P,defaultTag:Te,name:"Tabs"}))))}),Pe="div",xe=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){let{orientation:i,selectedIndex:o}=M("Tab.List"),n=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(r);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:{ref:n,role:"tablist","aria-orientation":i},theirProps:t,slot:{selectedIndex:o},defaultTag:Pe,name:"Tabs.List"})}),ge="button",ye=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){var u,C;let i=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_9__.useId)(),{id:o=`headlessui-tabs-tab-${i}`,...n}=t,{orientation:c,activation:s,selectedIndex:L,tabs:g,panels:A}=M("Tab"),d=Y("Tab"),v=M("Tab"),p=J("Tab"),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),P=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(l,r);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_7__.useIsoMorphicEffect)(()=>d.registerTab(l),[d,l]);let E=p.current.tabs.indexOf(o);E===-1&&(E=p.current.tabs.push(o)-1);let f=g.indexOf(l);f===-1&&(f=E);let b=f===L,y=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(a=>{var N;let x=a();if(x===_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.FocusResult.Success&&s==="auto"){let B=(N=(0,_utils_owner_js__WEBPACK_IMPORTED_MODULE_10__.getOwnerDocument)(l))==null?void 0:N.activeElement,Z=v.tabs.findIndex(ae=>ae.current===B);Z!==-1&&d.change(Z)}return x}),I=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(a=>{let x=g.map(B=>B.current).filter(Boolean);if(a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.Space||a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.Enter){a.preventDefault(),a.stopPropagation(),d.change(f);return}switch(a.key){case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.Home:case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.PageUp:return a.preventDefault(),a.stopPropagation(),y(()=>(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(x,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.First));case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.End:case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.PageDown:return a.preventDefault(),a.stopPropagation(),y(()=>(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(x,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Last))}if(y(()=>(0,_utils_match_js__WEBPACK_IMPORTED_MODULE_2__.match)(c,{vertical(){return a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.ArrowUp?(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(x,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Previous|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround):a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.ArrowDown?(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(x,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Next|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround):_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.FocusResult.Error},horizontal(){return a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.ArrowLeft?(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(x,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Previous|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround):a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_11__.Keys.ArrowRight?(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(x,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Next|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround):_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.FocusResult.Error}}))===_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.FocusResult.Success)return a.preventDefault()}),R=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),k=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(()=>{var a;R.current||(R.current=!0,(a=l.current)==null||a.focus(),d.change(f),(0,_utils_micro_task_js__WEBPACK_IMPORTED_MODULE_12__.microTask)(()=>{R.current=!1}))}),G=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(a=>{a.preventDefault()}),j=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selected:b}),[b]),W={ref:P,onKeyDown:I,onMouseDown:G,onClick:k,id:o,role:"tab",type:(0,_hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_13__.useResolveButtonType)(t,l),"aria-controls":(C=(u=A[f])==null?void 0:u.current)==null?void 0:C.id,"aria-selected":b,tabIndex:b?0:-1};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:W,theirProps:n,slot:j,defaultTag:ge,name:"Tabs.Tab"})}),Re="div",Ae=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){let{selectedIndex:i}=M("Tab.Panels"),o=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(r),n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selectedIndex:i}),[i]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:{ref:o},theirProps:t,slot:n,defaultTag:Re,name:"Tabs.Panels"})}),Ee="div",Se=_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.Features.RenderStrategy|_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.Features.Static,Le=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){var b,y,I,R;let i=(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_9__.useId)(),{id:o=`headlessui-tabs-panel-${i}`,...n}=t,{selectedIndex:c,tabs:s,panels:L}=M("Tab.Panel"),g=Y("Tab.Panel"),A=J("Tab.Panel"),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),v=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(d,r);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_7__.useIsoMorphicEffect)(()=>g.registerPanel(d),[g,d]);let p=A.current.panels.indexOf(o);p===-1&&(p=A.current.panels.push(o)-1);let l=L.indexOf(d);l===-1&&(l=p);let P=l===c,E=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selected:P}),[P]),f={ref:v,id:o,role:"tabpanel","aria-labelledby":(y=(b=s[l])==null?void 0:b.current)==null?void 0:y.id,tabIndex:P?0:-1};return!P&&((I=n.unmount)!=null?I:!0)&&!((R=n.static)!=null&&R)?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_14__.Hidden,{as:"span",...f}):(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:f,theirProps:n,slot:E,defaultTag:Ee,features:Se,visible:P,name:"Tabs.Panel"})}),Je=Object.assign(ye,{Group:me,List:xe,Panels:Ae,Panel:Le});


/***/ }),

/***/ "./node_modules/@headlessui/react/dist/internal/focus-sentinel.js":
/*!************************************************************************!*\
  !*** ./node_modules/@headlessui/react/dist/internal/focus-sentinel.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FocusSentinel": () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _hidden_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hidden.js */ "./node_modules/@headlessui/react/dist/internal/hidden.js");
function p({onFocus:n}){let[r,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0);return r?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Hidden,{as:"button",type:"button",features:_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Features.Focusable,onFocus:a=>{a.preventDefault();let e,u=50;function t(){if(u--<=0){e&&cancelAnimationFrame(e);return}if(n()){o(!1),cancelAnimationFrame(e);return}e=requestAnimationFrame(t)}e=requestAnimationFrame(t)}}):null}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a30565603754b649d6d4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.3666f3ef65eee37d02bb.hot-update.js.map