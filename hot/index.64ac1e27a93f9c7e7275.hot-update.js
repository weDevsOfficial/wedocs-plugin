"use strict";
globalThis["webpackHotUpdateweDocs"]("index",{

/***/ "./src/components/Settings/index.js":
/*!******************************************!*\
  !*** ./src/components/Settings/index.js ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./src/components/Settings/Menu.js");
/* harmony import */ var _SaveButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SaveButton */ "./src/components/Settings/SaveButton.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/tabs/tabs.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _data_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/settings */ "./src/data/settings/index.js");
/* harmony import */ var _GeneralSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GeneralSettings */ "./src/components/Settings/GeneralSettings.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "react-refresh/runtime");

var _s = __webpack_require__.$Refresh$.signature();








const SettingsPage = () => {
  _s();
  const [selectedIndex, setSelectedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const settings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_data_settings__WEBPACK_IMPORTED_MODULE_4__["default"]).getSettings(), []);
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
    }).then(result => {}).catch(err => {
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Tab.Group, {
    vertical: true,
    onChange: setSelectedIndex,
    selectedIndex: selectedIndex
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "py-[18px] h-44 bg-white rounded-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Tab.List, {
    className: "overflow-hidden px-2 space-y-0.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Menu__WEBPACK_IMPORTED_MODULE_1__["default"], null)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "space-y-6 sm:px-6 lg:px-0 lg:col-span-9"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Tab.Panels, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Tab.Panel, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GeneralSettings__WEBPACK_IMPORTED_MODULE_5__["default"], {
    settingsData: docSettings,
    generalSettingsData: docSettings.general,
    setSettings: setDocSettings
  }))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SaveButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
    settingsSaveHandler: handleSettingsSave
  }))))));
};
_s(SettingsPage, "WfoQTUdYAaL2FndtyeDvV4Q98aU=", false, function () {
  return [_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect];
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

/***/ "./src/assets/css/index.css":
/*!**********************************!*\
  !*** ./src/assets/css/index.css ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1675765763193
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2a58ef73aefe849ffd2d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=index.64ac1e27a93f9c7e7275.hot-update.js.map