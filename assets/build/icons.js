/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/icons/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 22 18",
  fill: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M20.3574 0.120361C21.0356 0.120379 21.5839 0.668752 21.584 1.34692C21.584 1.84677 21.2856 2.27474 20.8574 2.46606V6.36353C21.5099 6.66256 21.9503 7.20505 21.9961 8.0481C21.9985 8.09871 22 8.67906 22 8.72974C22 8.77621 21.999 9.60227 21.999 9.65161C21.931 10.9279 20.9632 11.5184 19.7197 11.6145C18.9403 15.5822 15.3332 17.8801 10.999 17.8801C6.66363 17.8801 3.05521 15.5812 2.27637 11.6116C1.03483 11.4955 0.0707824 10.8026 0.00390625 9.52954C0.00145752 9.48179 0 8.77749 0 8.72974C1.39541e-06 8.68032 0.00145892 8.21911 0.00390625 8.17017C0.0497323 7.32686 0.489827 6.73982 1.14258 6.40552V2.46606C0.715048 2.27453 0.416016 1.84641 0.416016 1.34692C0.416151 0.669965 0.966565 0.120361 1.64355 0.120361C2.32161 0.120549 2.86998 0.668858 2.87012 1.34692C2.87012 1.84713 2.57124 2.27592 2.14258 2.46704V6.10571C2.20844 6.09723 2.27527 6.0913 2.34277 6.08618C3.24165 2.30043 6.77492 0.120405 11 0.120361C15.2243 0.120361 18.7565 2.29975 19.6562 6.08423C19.7241 6.08853 19.7912 6.0936 19.8574 6.10083V2.46606C19.4296 2.27466 19.1309 1.84662 19.1309 1.34692C19.131 0.669966 19.6804 0.120361 20.3574 0.120361ZM11.001 2.0686C7.3014 2.0686 4.27893 4.20979 4.0791 7.85962C4.07241 7.98673 4.06836 8.8722 4.06836 9.00122C4.06836 9.12651 4.07144 10.0059 4.07812 10.1282C4.27139 13.7836 7.29669 15.9319 11 15.9319C14.7032 15.9318 17.7286 13.7835 17.9209 10.1282C17.9285 10.0059 17.9326 9.12651 17.9326 9.00122C17.9326 8.8722 17.9286 7.98673 17.9219 7.85962C17.722 4.20989 14.7004 2.06871 11.001 2.0686ZM7.89746 6.43677C8.61856 6.43677 9.20299 7.02136 9.20312 7.74243C9.20312 8.46362 8.61865 9.0481 7.89746 9.0481C7.17631 9.04806 6.5918 8.4636 6.5918 7.74243C6.59193 7.02138 7.17639 6.43681 7.89746 6.43677ZM14.0977 6.43677C14.8195 6.43692 15.4032 7.0206 15.4033 7.74243C15.4033 8.46437 14.8196 9.04794 14.0977 9.0481C13.3756 9.0481 12.792 8.46446 12.792 7.74243C12.7921 7.02051 13.3757 6.43677 14.0977 6.43677Z",
  fill: "currentColor"
})));
})();

/******/ })()
;
//# sourceMappingURL=icons.js.map