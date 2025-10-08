/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/cog.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/cog.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const cog = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    fillRule: "evenodd",
    d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
    clipRule: "evenodd"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cog);
//# sourceMappingURL=cog.js.map

/***/ }),

/***/ "./src/blocks/DocsGrid/StyleControls.js":
/*!**********************************************!*\
  !*** ./src/blocks/DocsGrid/StyleControls.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




// Add these to your attributes in block.json

const styleAttributes = {
  gridPadding: {
    type: "object",
    default: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px"
    }
  },
  gridMargin: {
    type: "object",
    default: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    }
  },
  docTitleColor: {
    type: "string",
    default: "#333333"
  },
  docChildrenActiveColor: {
    type: "string",
    default: "#0073aa"
  },
  borderType: {
    type: "string",
    default: "solid"
  },
  borderWidth: {
    type: "string",
    default: "1px"
  },
  borderColor: {
    type: "string",
    default: "#dddddd"
  },
  borderRadius: {
    type: "string",
    default: "4px"
  },
  buttonBorderRadius: {
    type: "string",
    default: "4px"
  },
  buttonPadding: {
    type: "object",
    default: {
      top: "10px",
      right: "20px",
      bottom: "10px",
      left: "20px"
    }
  },
  buttonMargin: {
    type: "object",
    default: {
      top: "10px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    }
  },
  buttonColor: {
    type: "string",
    default: "#0073aa"
  },
  buttonHoverColor: {
    type: "string",
    default: "#005177"
  },
  buttonTextColor: {
    type: "string",
    default: "#ffffff"
  },
  buttonHoverTextColor: {
    type: "string",
    default: "#ffffff"
  },
  paginationTextColor: {
    type: "string",
    default: "#333333"
  },
  paginationTextHoverColor: {
    type: "string",
    default: "#0073aa"
  },
  paginationBackgroundColor: {
    type: "string",
    default: "#ffffff"
  },
  paginationHoverColor: {
    type: "string",
    default: "#f5f5f5"
  }
};
const StyleControls = ({
  attributes,
  setAttributes
}) => {
  const updateAttribute = attributeName => value => {
    setAttributes({
      [attributeName]: value
    });
  };
  const borderTypes = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Solid', 'wedocs'),
    value: 'solid'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dashed', 'wedocs'),
    value: 'dashed'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dotted', 'wedocs'),
    value: 'dotted'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'wedocs'),
    value: 'none'
  }];
  const colors = [{
    name: 'Sweet',
    color: '#F43F5E'
  }, {
    name: 'Orange',
    color: '#F97316'
  }, {
    name: 'Yellow',
    color: '#FACC15'
  }, {
    name: 'Purple',
    color: '#8B5CF6'
  }, {
    name: 'Light Blue',
    color: '#3B82F6'
  }, {
    name: 'Light Green',
    color: '#10B981'
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid Styles', 'wedocs'),
      icon: "admin-appearance",
      initialOpen: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Colors', 'wedocs')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
        colors: colors,
        colorSettings: [{
          value: attributes.docTitleColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Doc Title Color', 'wedocs'),
          onChange: newBgColor => updateAttribute('docTitleColor')(newBgColor)
        }, {
          value: attributes.docChildrenActiveColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Doc Children Active Color', 'wedocs'),
          onChange: newBgColor => updateAttribute('docChildrenActiveColor')(newBgColor)
        }, {
          value: attributes.borderColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', 'wedocs'),
          onChange: newBorderColor => updateAttribute('borderColor')(newBorderColor)
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid Padding', 'wedocs'),
        values: attributes.gridPadding,
        onChange: updateAttribute('gridPadding')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid Margin', 'wedocs'),
        values: attributes.gridMargin,
        onChange: updateAttribute('gridMargin')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Type', 'wedocs'),
        value: attributes.borderType,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Solid', 'wedocs'),
          value: 'solid'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dashed', 'wedocs'),
          value: 'dashed'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dotted', 'wedocs'),
          value: 'dotted'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'wedocs'),
          value: 'none'
        }],
        onChange: value => setAttributes({
          borderType: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Width', 'wedocs'),
        value: attributes.borderWidth,
        options: [{
          label: '0px',
          value: '0px'
        }, {
          label: '1px',
          value: '1px'
        }, {
          label: '2px',
          value: '2px'
        }, {
          label: '3px',
          value: '3px'
        }, {
          label: '4px',
          value: '4px'
        }, {
          label: '5px',
          value: '5px'
        }],
        onChange: value => setAttributes({
          borderWidth: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Radius', 'wedocs'),
        value: attributes.borderRadius,
        options: [{
          label: '0px',
          value: '0px'
        }, {
          label: '4px',
          value: '4px'
        }, {
          label: '8px',
          value: '8px'
        }, {
          label: '12px',
          value: '12px'
        }, {
          label: '16px',
          value: '16px'
        }, {
          label: '20px',
          value: '20px'
        }],
        onChange: value => setAttributes({
          borderRadius: value
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Styles', 'wedocs'),
      icon: "admin-appearance",
      initialOpen: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Colors', 'wedocs')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
        colors: colors,
        colorSettings: [{
          value: attributes.buttonColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Color', 'wedocs'),
          onChange: newBgColor => updateAttribute('buttonColor')(newBgColor)
        }, {
          value: attributes.buttonHoverColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Hover Color', 'wedocs'),
          onChange: newBgColor => updateAttribute('buttonHoverColor')(newBgColor)
        }, {
          value: attributes.buttonTextColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Text Color', 'wedocs'),
          onChange: newBorderColor => updateAttribute('buttonTextColor')(newBorderColor)
        }, {
          value: attributes.buttonHoverTextColor,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Hover Text Color', 'wedocs'),
          onChange: newBorderColor => updateAttribute('buttonHoverTextColor')(newBorderColor)
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Padding', 'wedocs'),
        values: attributes.buttonPadding,
        onChange: updateAttribute('buttonPadding')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Margin', 'wedocs'),
        values: attributes.buttonMargin,
        onChange: updateAttribute('buttonMargin')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Border Radius', 'wedocs'),
        value: attributes.buttonBorderRadius,
        options: [{
          label: '0px',
          value: '0px'
        }, {
          label: '4px',
          value: '4px'
        }, {
          label: '8px',
          value: '8px'
        }, {
          label: '12px',
          value: '12px'
        }, {
          label: '16px',
          value: '16px'
        }, {
          label: '20px',
          value: '20px'
        }],
        onChange: value => setAttributes({
          buttonBorderRadius: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "wedocs-color-control",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Text', 'wedocs')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          value: attributes.buttonText,
          onChange: updateAttribute('buttonText')
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StyleControls);

/***/ }),

/***/ "./src/blocks/DocsGrid/block.json":
/*!****************************************!*\
  !*** ./src/blocks/DocsGrid/block.json ***!
  \****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wedocs/wedocs-docs-grid","version":"1.0.0","title":"weDocs - Docs Grid","icon":"grid-view","category":"widgets","description":"Display all the docs in a grid view","supports":{"html":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","attributes":{"docStyle":{"type":"string","default":"1x1"},"docsPerPage":{"type":"string","default":"all"},"excludeDocs":{"type":"array","default":[]},"order":{"type":"string","default":"asc"},"orderBy":{"type":"string","default":"menu_order"},"sectionsPerDoc":{"type":"string","default":"all"},"articlesPerSection":{"type":"string","default":"all"},"showDocArticle":{"type":"boolean","default":true},"keepArticlesCollapsed":{"type":"boolean","default":false},"showViewDetails":{"type":"boolean","default":true},"gridPadding":{"type":"object","default":{"top":"20px","right":"20px","bottom":"20px","left":"20px"}},"gridMargin":{"type":"object","default":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}},"docTitleColor":{"type":"string","default":"#333333"},"docChildrenActiveColor":{"type":"string","default":"#0073aa"},"borderWidth":{"type":"string","default":"1px"},"borderColor":{"type":"string","default":"rgba(0, 0, 0, 0.1)"},"borderType":{"type":"string","default":"solid"},"borderRadius":{"type":"string","default":"4px"},"buttonBorderRadius":{"type":"string","default":"4px"},"buttonPadding":{"type":"object","default":{"top":"10px","right":"20px","bottom":"10px","left":"20px"}},"buttonMargin":{"type":"object","default":{"top":"10px","right":"0px","bottom":"0px","left":"0px"}},"buttonColor":{"type":"string","default":"#0073aa"},"buttonHoverColor":{"type":"string","default":"#005177"},"buttonText":{"type":"string","default":"View Details"},"buttonTextColor":{"type":"string","default":"#ffffff"},"buttonHoverTextColor":{"type":"string","default":"#ffffff"},"paginationTextColor":{"type":"string","default":"#333333"},"paginationTextHoverColor":{"type":"string","default":"#0073aa"},"paginationBackgroundColor":{"type":"string","default":"#ffffff"},"paginationHoverColor":{"type":"string","default":"#f5f5f5"},"paginationBorderColor":{"type":"string","default":"#dddddd"}}}');

/***/ }),

/***/ "./src/blocks/DocsGrid/edit.js":
/*!*************************************!*\
  !*** ./src/blocks/DocsGrid/edit.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/cog.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _StyleControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StyleControls */ "./src/blocks/DocsGrid/StyleControls.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const Edit = ({
  attributes,
  setAttributes
}) => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const {
    useSelect
  } = wp.data;
  const [currentPage, setCurrentPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    hideDocGrid,
    docStyle,
    docsPerPage,
    excludeDocs,
    order,
    orderBy,
    sectionsPerDoc,
    articlesPerSection,
    showDocArticle,
    keepArticlesCollapsed,
    showViewDetails,
    gridPadding,
    gridMargin,
    docTitleColor,
    docChildrenActiveColor,
    borderType,
    borderRadius,
    borderWidth,
    borderColor,
    buttonBorderRadius,
    buttonPadding,
    buttonMargin,
    buttonColor,
    buttonHoverColor,
    buttonTextColor,
    buttonText,
    buttonHoverTextColor
  } = attributes;
  const applyStyles = () => {
    const paddings = gridPadding ? `${gridPadding.top} ${gridPadding.right} ${gridPadding.bottom} ${gridPadding.left}` : '';
    const margins = gridMargin ? `${gridMargin.top} ${gridMargin.right} ${gridMargin.bottom} ${gridMargin.left}` : '';
    const btnPaddings = buttonPadding ? `${buttonPadding.top} ${buttonPadding.right} ${buttonPadding.bottom} ${buttonPadding.left}` : '';
    const btnradius = buttonBorderRadius || '8px';
    const btnMargins = buttonMargin ? `${buttonMargin.top} ${buttonMargin.right} ${buttonMargin.bottom} ${buttonMargin.left}` : '';
    return {
      item: {
        padding: paddings,
        margin: margins,
        borderStyle: borderType || 'solid',
        borderWidth: borderWidth || '1px',
        borderColor: borderColor || 'rgba(0, 0, 0, 0.1)',
        borderRadius: borderRadius || '8px',
        backgroundColor: '#fff'
      },
      title: {
        color: docTitleColor || '#1e1e1e'
      },
      children: {
        color: docChildrenActiveColor || '#0073aa'
      },
      button: {
        padding: btnPaddings,
        margin: btnMargins,
        backgroundColor: buttonColor || '#0073aa',
        color: buttonTextColor || '#ffffff',
        text: buttonText || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('View Details', 'wedocs'),
        borderRadius: btnradius || '8px',
        '--hover-bg': buttonHoverColor || '#005177',
        '--hover-color': buttonHoverTextColor || '#ffffff'
      }
    };
  };
  const renderGridItem = (doc, styles) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "wedocs-docs-grid__item",
    style: styles.item,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
      className: "wedocs-docs-grid__title",
      style: styles.title,
      children: doc.title.rendered
    }), renderSections(doc, styles), showViewDetails && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "wedocs-docs-grid__details",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "wedocs-docs-grid__details-link",
        style: styles.button,
        children: styles.button.text
      })
    })]
  }, doc.id);
  const renderSections = (doc, styles) => {
    if (!doc.sections) return null;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: `wedocs-docs-grid__sections ${keepArticlesCollapsed ? 'is-collapsed' : ''}`,
      children: [doc.sections.map(section => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "wedocs-docs-grid__section",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("h4", {
          className: "wedocs-docs-grid__section-title",
          style: {
            ...styles.title,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            children: section.title.rendered
          }), showDocArticle && section.articles && section.articles.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
            fill: "none",
            viewBox: "0 0 24 24",
            width: "16",
            strokeWidth: "2",
            stroke: "#acb8c4",
            className: keepArticlesCollapsed ? '' : 'active',
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
            })
          })]
        }), showDocArticle && !keepArticlesCollapsed && section.articles && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("ul", {
          className: "wedocs-docs-grid__articles",
          children: section.articles.map(article => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li", {
            className: "wedocs-docs-grid__article",
            style: styles.children,
            children: article.title.rendered
          }, article.id))
        })]
      }, section.id)), doc.sections.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
        className: "inside",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          })
        }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This document has no sections yet. Check back later or wait for the author to add content.', 'wedocs')]
      })]
    });
  };

  // Control options
  const docStyles = [{
    label: '1x1',
    value: '1x1'
  }, {
    label: '1x2',
    value: '1x2'
  }];
  const docsPerPageOptions = [{
    label: 'All',
    value: 'all'
  }, ...Array.from({
    length: 10
  }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1)
  }))];
  const orderByOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('weDocs Order', 'wedocs'),
    value: 'menu_order'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('ID', 'wedocs'),
    value: 'id'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Name', 'wedocs'),
    value: 'title'
  }];
  const orderOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ascending', 'wedocs'),
    value: 'asc'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Descending', 'wedocs'),
    value: 'desc'
  }];
  const countOptions = [{
    label: 'All',
    value: 'all'
  }, ...Array.from({
    length: 10
  }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1)
  }))];
  // Get published docs
  const {
    pages,
    sections,
    articles
  } = useSelect(select => {
    const {
      getEntityRecords
    } = select('core');
    const docs = getEntityRecords('postType', 'docs', {
      status: 'publish',
      per_page: -1,
      parent: 0,
      orderby: orderBy,
      order: order
    });

    // Get all sections (docs children)
    const allSections = docs ? getEntityRecords('postType', 'docs', {
      status: 'publish',
      parent_in: docs.map(doc => doc.id),
      per_page: -1
    }) : null;

    // Get all articles (sections children)
    const allArticles = allSections ? getEntityRecords('postType', 'docs', {
      status: 'publish',
      parent_in: allSections.map(section => section.id),
      per_page: -1
    }) : null;
    return {
      pages: docs,
      sections: allSections,
      articles: allArticles
    };
  }, [orderBy, order]);
  const processDocsData = () => {
    if (!pages || !sections || !articles) return [];

    // Filter and sort docs based on settings
    let processedDocs = [...pages];

    // Apply exclude filter
    if (excludeDocs && excludeDocs.length > 0) {
      processedDocs = processedDocs.filter(doc => !excludeDocs.includes(doc.id.toString()));
    }

    // Process each doc with its sections and articles
    processedDocs = processedDocs.map(doc => {
      // Get sections for this doc
      let docSections = sections.filter(section => section.parent === doc.id);

      // Limit sections if specified
      if (sectionsPerDoc !== 'all') {
        docSections = docSections.slice(0, parseInt(sectionsPerDoc));
      }

      // Process sections with their articles
      docSections = docSections.map(section => {
        let sectionArticles = articles.filter(article => article.parent === section.id);

        // Limit articles if specified
        if (articlesPerSection !== 'all') {
          sectionArticles = sectionArticles.slice(0, parseInt(articlesPerSection));
        }
        return {
          ...section,
          articles: sectionArticles
        };
      });

      // Calculate total articles for the doc
      const totalArticles = docSections.reduce((total, section) => total + section.articles.length, 0);
      return {
        ...doc,
        sections: docSections,
        articleCount: totalArticles
      };
    });
    return processedDocs;
  };
  // Handle pagination
  const getPagedDocs = docs => {
    if (docsPerPage === 'all') return docs;
    const perPage = parseInt(docsPerPage);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return docs.slice(start, end);
  };

  // Get final display docs
  const getDisplayDocs = () => {
    const processedDocs = processDocsData();
    return getPagedDocs(processedDocs);
  };

  // Pagination controls
  const renderPagination = totalDocs => {
    if (docsPerPage === 'all') return null;
    const totalPages = Math.ceil(totalDocs.length / parseInt(docsPerPage));

    // Create style objects for pagination buttons
    const paginationBaseStyle = {
      padding: '8px 12px',
      margin: '0 4px',
      backgroundColor: attributes.paginationBackgroundColor || '#fff',
      color: attributes.paginationTextColor || '#333',
      border: `1px solid ${attributes.paginationBorderColor || '#ddd'}`,
      borderRadius: attributes.borderRadius || '4px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      display: 'inline-block',
      minWidth: '32px',
      textAlign: 'center',
      fontFamily: 'inherit',
      fontSize: '14px',
      lineHeight: '1.4'
    };

    // Active button style
    const activeStyle = {
      ...paginationBaseStyle,
      backgroundColor: attributes.paginationHoverColor || '#f5f5f5',
      borderColor: attributes.paginationHoverColor || '#ccc',
      color: attributes.paginationTextHoverColor || '#0073aa'
    };

    // Hover styles will be handled by CSS custom properties
    const customProperties = {
      '--pagination-hover-bg': attributes.paginationHoverColor || '#f5f5f5',
      '--pagination-hover-color': attributes.paginationTextHoverColor || '#0073aa',
      '--pagination-hover-border': attributes.paginationHoverColor || '#ccc'
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "wedocs-docs-pagination",
      style: {
        margin: '30px 0',
        textAlign: 'center',
        ...customProperties
      },
      children: [currentPage > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        style: paginationBaseStyle,
        onClick: () => setCurrentPage(currentPage - 1),
        className: "wedocs-docs-pagination__button",
        children: "\u2190"
      }), Array.from({
        length: totalPages
      }, (_, i) => {
        const pageNum = i + 1;
        const isCurrentPage = currentPage === pageNum;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
          style: isCurrentPage ? activeStyle : paginationBaseStyle,
          className: `wedocs-docs-pagination__button ${isCurrentPage ? 'is-active' : ''}`,
          onClick: () => setCurrentPage(pageNum),
          children: pageNum
        }, pageNum);
      }), currentPage < totalPages && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        style: paginationBaseStyle,
        onClick: () => setCurrentPage(currentPage + 1),
        className: "wedocs-docs-pagination__button",
        children: "\u2192"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("style", {
        children: `
                    .wedocs-docs-pagination__button:hover:not(.is-active) {
                        background-color: var(--pagination-hover-bg) !important;
                        color: var(--pagination-hover-color) !important;
                        border-color: var(--pagination-hover-border) !important;
                    }
                `
      })]
    });
  };
  const displayDocs = getDisplayDocs();
  // Create a mapping of ID to title for suggestions
  const docsMap = pages ? pages.reduce((acc, page) => {
    acc[page.id] = page.title.rendered;
    return acc;
  }, {}) : {};

  // Prepare docs options for FormTokenField
  const docsOptions = pages ? pages.map(page => ({
    value: page.id.toString(),
    label: page.title.rendered
  })) : [];

  // Update handlers
  const updateAttribute = attributeName => value => {
    setAttributes({
      [attributeName]: value
    });
  };

  // Transform IDs to titles for FormTokenField display
  const excludeDocsDisplay = excludeDocs ? excludeDocs.map(id => docsMap[id] || id) : [];

  // Handle token changes
  const handleExcludeDocsChange = tokens => {
    // Convert titles back to IDs
    const newExcludeDocs = tokens.map(token => {
      // Find the ID for this title
      const found = Object.entries(docsMap).find(([id, title]) => title === token);
      return found ? found[0] : token;
    });
    setAttributes({
      excludeDocs: newExcludeDocs
    });
  };
  const getGridClass = () => {
    return `wedocs-docs-grid--${docStyle}`;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Doc Grid Settings', 'wedocs'),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"],
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          value: docStyle,
          options: docStyles,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('DOCS GRID COLUMN STYLE', 'wedocs'),
          onChange: updateAttribute('docStyle')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          value: docsPerPage,
          options: docsPerPageOptions,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Docs per page', 'wedocs'),
          onChange: updateAttribute('docsPerPage')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.FormTokenField, {
          value: excludeDocsDisplay,
          suggestions: Object.values(docsMap),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Exclude Docs', 'wedocs'),
          onChange: handleExcludeDocsChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          value: order,
          options: orderOptions,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order', 'wedocs'),
          onChange: updateAttribute('order')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          value: orderBy,
          options: orderByOptions,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order by', 'wedocs'),
          onChange: updateAttribute('orderBy')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          value: sectionsPerDoc,
          options: countOptions,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sections per doc', 'wedocs'),
          onChange: updateAttribute('sectionsPerDoc')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          value: articlesPerSection,
          options: countOptions,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Articles per section', 'wedocs'),
          onChange: updateAttribute('articlesPerSection')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            checked: showDocArticle,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Doc Article', 'wedocs'),
            onChange: updateAttribute('showDocArticle')
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            checked: keepArticlesCollapsed,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Keep Article Collapsed', 'wedocs'),
            onChange: updateAttribute('keepArticlesCollapsed')
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            checked: showViewDetails,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show View Details Button', 'wedocs'),
            onChange: updateAttribute('showViewDetails')
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_StyleControls__WEBPACK_IMPORTED_MODULE_5__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: hideDocGrid ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "backdrop"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "wedocs-block-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: `wedocs-docs-grid ${getGridClass()}`,
          children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Spinner, {}) : displayDocs.map(doc => renderGridItem(doc, applyStyles()))
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/DocsGrid/index.js":
/*!**************************************!*\
  !*** ./src/blocks/DocsGrid/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/DocsGrid/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/DocsGrid/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/DocsGrid/style.scss");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  /**
   * @see ./save.js
   */
  save: () => null
});

/***/ }),

/***/ "./src/blocks/DocsGrid/style.scss":
/*!****************************************!*\
  !*** ./src/blocks/DocsGrid/style.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/DocsGrid/index": 0,
/******/ 			"blocks/DocsGrid/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkweDocs"] = globalThis["webpackChunkweDocs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/DocsGrid/style-index"], () => (__webpack_require__("./src/blocks/DocsGrid/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map