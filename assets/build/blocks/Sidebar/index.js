/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/Sidebar/block.json":
/*!***************************************!*\
  !*** ./src/blocks/Sidebar/block.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wedocs/wedocs-sidebar","version":"1.0.0","title":"weDocs - Sidebar","icon":"layout","category":"widgets","description":"Display a sidebar for documentation navigation","supports":{"html":true,"spacing":{"padding":true},"color":{"background":true,"text":false}},"attributes":{"excludeSections":{"type":"array","default":[]},"sectionsOrderBy":{"type":"string","default":"menu_order"},"sectionsOrder":{"type":"string","default":"asc"},"articleOrderBy":{"type":"string","default":"menu_order"},"articleOrder":{"type":"string","default":"asc"},"enableNestedArticles":{"type":"boolean","default":true},"sectionTitleTag":{"type":"string","default":"h3"},"articleTitleTag":{"type":"string","default":"h4"},"className":{"type":"string","default":""},"containerStyles":{"type":"object","default":{"backgroundColor":""}},"sectionStyles":{"type":"object","default":{"padding":"","margin":"","backgroundColor":"","backgroundColorHover":"","borderRadius":""}},"titleStyles":{"type":"object","default":{"color":"","backgroundColor":"","backgroundColorHover":"","padding":""}},"countBadgeStyles":{"type":"object","default":{"backgroundColor":"","backgroundColorHover":"","borderRadius":""}},"docListStyles":{"type":"object","default":{"backgroundColor":"","backgroundColorHover":"","textColor":"","textColorHover":""}},"treeStyles":{"type":"object","default":{"indentation":"20px","connectorColor":"","connectorWidth":"1px","itemSpacing":"4px","headerBackgroundColor":"","headerTextColor":"","headerPadding":"","headerBorderRadius":""}}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');

/***/ }),

/***/ "./src/blocks/Sidebar/components/ArticleItem.js":
/*!******************************************************!*\
  !*** ./src/blocks/Sidebar/components/ArticleItem.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const ArticleItem = ({
  article,
  attributes,
  level = 0
}) => {
  const {
    articleTitleTag,
    enableNestedArticles,
    docListStyles,
    treeStyles
  } = attributes;

  // Helper function to decode HTML entities
  const decodeHtmlEntities = text => {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Tree-specific styles
  const indentation = level * parseInt(treeStyles?.indentation?.replace('px', '') || 20);

  // Helper function to get color value or fallback
  const getColorValue = (colorValue, fallback = '') => {
    return colorValue && colorValue.trim() !== '' ? colorValue : fallback;
  };
  const articleStyle = {
    marginLeft: level > 0 ? `${indentation}px` : '0',
    marginBottom: treeStyles?.itemSpacing || '4px',
    position: 'relative',
    backgroundColor: getColorValue(docListStyles.backgroundColor),
    padding: '8px 12px',
    borderLeft: level > 0 && treeStyles?.connectorColor ? `2px solid ${treeStyles.connectorColor}` : 'none',
    borderRadius: '4px'
  };
  const iconStyle = {
    color: getColorValue(docListStyles.textColor, '#6c757d'),
    fontSize: '14px',
    marginRight: '8px'
  };
  const textStyle = {
    color: getColorValue(docListStyles.textColor)
  };
  const TitleTag = articleTitleTag || 'h4';
  const children = article.children || [];
  const hasChildren = children.length > 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wedocs-article transition-colors duration-200",
    children: [level > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wedocs-connector-line",
      style: {
        position: 'absolute',
        left: `-${parseInt(treeStyles?.indentation?.replace('px', '') || 20) / 2}px`,
        top: '0',
        bottom: '0',
        width: treeStyles?.connectorWidth || '1px',
        backgroundColor: getColorValue(treeStyles?.connectorColor, '#e5e7eb')
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center space-x-2",
      style: articleStyle,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "wedocs-article-icon",
        style: iconStyle,
        "aria-hidden": "true",
        children: "\uD83D\uDCC4"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TitleTag, {
        className: `wedocs-article-title ${TitleTag} m-0 flex-1`,
        style: textStyle,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
          href: article.permalink || `#${article.ID}`,
          className: "hover:underline transition-colors duration-200",
          style: {
            color: getColorValue(docListStyles.textColor),
            textDecoration: 'none'
          },
          onMouseEnter: e => {
            const hoverColor = getColorValue(docListStyles.textColorHover);
            if (hoverColor) {
              e.target.style.color = hoverColor;
            }
          },
          onMouseLeave: e => {
            const normalColor = getColorValue(docListStyles.textColor);
            if (normalColor) {
              e.target.style.color = normalColor;
            }
          },
          children: decodeHtmlEntities(article.post_title)
        })
      })]
    }), hasChildren && enableNestedArticles && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wedocs-article-children",
      style: {
        marginLeft: level > 0 ? `${parseInt(treeStyles?.indentation?.replace('px', '') || 20)}px` : '0',
        borderLeft: level > 0 && treeStyles?.connectorColor ? `${treeStyles?.connectorWidth || '1px'} solid ${treeStyles.connectorColor}` : 'none',
        paddingLeft: level > 0 ? '8px' : '0'
      },
      children: children.map(childArticle => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ArticleItem, {
        article: childArticle,
        attributes: attributes,
        level: level + 1
      }, childArticle.ID))
    }), hasChildren && !enableNestedArticles && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: children.map(childArticle => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ArticleItem, {
        article: childArticle,
        attributes: attributes,
        level: level
      }, childArticle.ID))
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArticleItem);

/***/ }),

/***/ "./src/blocks/Sidebar/components/CountBadge.js":
/*!*****************************************************!*\
  !*** ./src/blocks/Sidebar/components/CountBadge.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const CountBadge = ({
  count,
  attributes
}) => {
  const {
    countBadgeStyles
  } = attributes;

  // Helper function to get color value or fallback
  const getColorValue = (colorValue, fallback = '') => {
    return colorValue && colorValue.trim() !== '' ? colorValue : fallback;
  };
  const badgeStyle = {
    backgroundColor: getColorValue(countBadgeStyles.backgroundColor),
    borderRadius: countBadgeStyles.borderRadius || ''
  };
  if (count === 0) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "wedocs-count-badge text-xs px-2 py-1 text-white",
    style: badgeStyle,
    "aria-label": `${count} articles`,
    children: count
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CountBadge);

/***/ }),

/***/ "./src/blocks/Sidebar/components/SectionItem.js":
/*!******************************************************!*\
  !*** ./src/blocks/Sidebar/components/SectionItem.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ArticleItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArticleItem */ "./src/blocks/Sidebar/components/ArticleItem.js");
/* harmony import */ var _CountBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CountBadge */ "./src/blocks/Sidebar/components/CountBadge.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const SectionItem = ({
  section,
  attributes,
  level = 0
}) => {
  const [isExpanded, setIsExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const {
    sectionTitleTag,
    sectionStyles,
    titleStyles,
    treeStyles
  } = attributes;

  // Helper function to decode HTML entities
  const decodeHtmlEntities = text => {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Helper function to get color value or fallback
  const getColorValue = (colorValue, fallback = '') => {
    return colorValue && colorValue.trim() !== '' ? colorValue : fallback;
  };

  // Tree-specific styles
  const indentation = level * parseInt(treeStyles?.indentation?.replace('px', '') || 20);
  const sectionStyle = {
    marginLeft: level > 0 ? `${indentation}px` : '0',
    marginBottom: treeStyles?.itemSpacing || '4px',
    position: 'relative',
    // Apply section box styling
    backgroundColor: getColorValue(sectionStyles.backgroundColor),
    padding: sectionStyles.padding || '',
    margin: sectionStyles.margin || '',
    borderRadius: sectionStyles.borderRadius || ''
  };
  const headerStyle = {
    backgroundColor: level === 0 ? getColorValue(treeStyles?.headerBackgroundColor) : 'transparent',
    color: level === 0 ? getColorValue(treeStyles?.headerTextColor) : 'inherit',
    padding: level === 0 ? treeStyles?.headerPadding || '' : '',
    borderRadius: level === 0 ? treeStyles?.headerBorderRadius || '' : '',
    border: level > 0 && treeStyles?.connectorColor ? `1px solid ${treeStyles.connectorColor}` : 'none',
    borderLeft: level > 0 && treeStyles?.connectorColor ? `2px solid ${treeStyles.connectorColor}` : 'none'
  };
  const titleStyle = {
    color: level === 0 ? getColorValue(titleStyles?.color) : getColorValue(titleStyles?.color),
    backgroundColor: level === 0 ? getColorValue(titleStyles?.backgroundColor) : 'transparent',
    padding: level === 0 ? titleStyles?.padding || '0' : '0',
    margin: '0'
  };
  const iconStyle = {
    color: level === 0 ? getColorValue(titleStyles?.color, '#6c757d') : getColorValue(titleStyles?.color, '#6c757d'),
    fontSize: '16px',
    marginRight: '8px'
  };
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const TitleTag = sectionTitleTag || 'h3';
  const children = section.children || [];
  const childrenCount = children.length;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "wedocs-section transition-colors duration-200",
    style: sectionStyle,
    onMouseEnter: e => {
      const hoverBg = getColorValue(sectionStyles.backgroundColorHover);
      if (hoverBg) {
        e.currentTarget.style.backgroundColor = hoverBg;
      }
    },
    onMouseLeave: e => {
      const normalBg = getColorValue(sectionStyles.backgroundColor);
      e.currentTarget.style.backgroundColor = normalBg || '';
    },
    children: [level > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "wedocs-connector-line",
      style: {
        position: 'absolute',
        left: `-${parseInt(treeStyles?.indentation?.replace('px', '') || 20) / 2}px`,
        top: '0',
        bottom: '0',
        width: treeStyles?.connectorWidth || '1px',
        backgroundColor: getColorValue(treeStyles?.connectorColor, '#e5e7eb')
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "wedocs-section-header flex items-center justify-between cursor-pointer transition-colors",
      style: headerStyle,
      onClick: toggleExpanded,
      role: "button",
      tabIndex: 0,
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpanded();
        }
      },
      onMouseEnter: e => {
        if (level === 0) {
          // For top-level sections, apply Section Title Styling hover
          const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
          const hoverBg = getColorValue(titleStyles?.backgroundColorHover);
          if (titleElement && hoverBg) {
            titleElement.style.backgroundColor = hoverBg;
          }
        } else {
          // For nested sections, apply Article Title Styling hover
          const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
          const hoverBg = getColorValue(titleStyles?.backgroundColorHover);
          if (titleElement && hoverBg) {
            titleElement.style.backgroundColor = hoverBg;
          }
        }
      },
      onMouseLeave: e => {
        if (level === 0) {
          // For top-level sections, reset Section Title Styling
          const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
          const normalBg = getColorValue(titleStyles?.backgroundColor);
          if (titleElement) {
            titleElement.style.backgroundColor = normalBg || 'transparent';
          }
        } else {
          // For nested sections, reset Article Title Styling
          const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
          const normalBg = getColorValue(titleStyles?.backgroundColor);
          if (titleElement) {
            titleElement.style.backgroundColor = normalBg || 'transparent';
          }
        }
      },
      "aria-expanded": isExpanded,
      "aria-label": `Toggle ${section.post_title} section`,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "flex items-center space-x-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "wedocs-section-icon",
          style: iconStyle,
          "aria-hidden": "true",
          children: level === 0 ?
          /*#__PURE__*/
          // Blue folder icon for top-level sections
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "1.5",
            stroke: "currentColor",
            style: {
              width: '20px',
              height: '20px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            })
          }) :
          /*#__PURE__*/
          // Simple folder icon for nested sections
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "1.5",
            stroke: "currentColor",
            style: {
              width: '16px',
              height: '16px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TitleTag, {
          className: "wedocs-section-title",
          style: titleStyle,
          children: decodeHtmlEntities(section.post_title)
        })]
      }), level === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
        className: "wedocs-expand-toggle transition-colors",
        onClick: e => {
          e.stopPropagation();
          toggleExpanded();
        },
        "aria-expanded": isExpanded,
        "aria-label": `Toggle ${section.post_title} section`,
        style: {
          color: getColorValue(titleStyles?.color, '#6c757d'),
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px'
        },
        children: isExpanded ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          style: {
            width: '16px',
            height: '16px'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m4.5 15.75 7.5-7.5 7.5 7.5"
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          style: {
            width: '16px',
            height: '16px'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m19.5 8.25-7.5 7.5-7.5-7.5"
          })
        })
      })]
    }), children.length > 0 && isExpanded && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "wedocs-section-children",
      style: {
        marginLeft: level > 0 ? `${parseInt(treeStyles?.indentation?.replace('px', '') || 20)}px` : '0',
        borderLeft: level > 0 && treeStyles?.connectorColor ? `${treeStyles?.connectorWidth || '1px'} solid ${treeStyles.connectorColor}` : 'none',
        paddingLeft: level > 0 ? '8px' : '0'
      },
      children: children.map(article => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ArticleItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        article: article,
        attributes: attributes,
        level: level + 1
      }, article.ID))
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionItem);

/***/ }),

/***/ "./src/blocks/Sidebar/components/SidebarContainer.js":
/*!***********************************************************!*\
  !*** ./src/blocks/Sidebar/components/SidebarContainer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SectionItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SectionItem */ "./src/blocks/Sidebar/components/SectionItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const SidebarContainer = ({
  sections,
  attributes
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: sections && sections.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "wedocs-sections",
      children: sections.map(section => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_SectionItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        section: section,
        attributes: attributes,
        level: 0
      }, section.ID))
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "wedocs-no-content text-gray-500 italic text-center py-4",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No documentation sections found.', 'wedocs')
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarContainer);

/***/ }),

/***/ "./src/blocks/Sidebar/components/index.js":
/*!************************************************!*\
  !*** ./src/blocks/Sidebar/components/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArticleItem: () => (/* reexport safe */ _ArticleItem__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   CountBadge: () => (/* reexport safe */ _CountBadge__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   SectionItem: () => (/* reexport safe */ _SectionItem__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   SidebarContainer: () => (/* reexport safe */ _SidebarContainer__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _SidebarContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidebarContainer */ "./src/blocks/Sidebar/components/SidebarContainer.js");
/* harmony import */ var _SectionItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SectionItem */ "./src/blocks/Sidebar/components/SectionItem.js");
/* harmony import */ var _ArticleItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArticleItem */ "./src/blocks/Sidebar/components/ArticleItem.js");
/* harmony import */ var _CountBadge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CountBadge */ "./src/blocks/Sidebar/components/CountBadge.js");





/***/ }),

/***/ "./src/blocks/Sidebar/edit.js":
/*!************************************!*\
  !*** ./src/blocks/Sidebar/edit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components */ "./src/blocks/Sidebar/components/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const Edit = ({
  attributes,
  setAttributes
}) => {
  const {
    excludeSections,
    sectionsOrderBy,
    sectionsOrder,
    articleOrderBy,
    articleOrder,
    enableNestedArticles,
    sectionTitleTag,
    articleTitleTag,
    className,
    containerStyles,
    sectionStyles,
    titleStyles,
    docListStyles
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: 'wedocs-sidebar-block'
  });

  // Fetch theme colors and gradients
  const {
    themeColors,
    themeGradients
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const editorSettings = select('core/block-editor').getSettings();
    return {
      themeColors: editorSettings.colors,
      themeGradients: editorSettings.gradients
    };
  });

  // Helper function to handle color values (including empty/cleared values)
  const handleColorValue = value => {
    return value === undefined || value === null ? '' : value;
  };

  // Helper functions for updating styles
  const updateContainerStyles = (property, value) => {
    setAttributes({
      containerStyles: {
        ...containerStyles,
        [property]: handleColorValue(value)
      }
    });
  };
  const updateSectionStyles = (property, value) => {
    setAttributes({
      sectionStyles: {
        ...sectionStyles,
        [property]: handleColorValue(value)
      }
    });
  };
  const updateTitleStyles = (property, value) => {
    setAttributes({
      titleStyles: {
        ...titleStyles,
        [property]: handleColorValue(value)
      }
    });
  };
  const updateDocListStyles = (property, value) => {
    setAttributes({
      docListStyles: {
        ...docListStyles,
        [property]: handleColorValue(value)
      }
    });
  };

  // Real data fetching for preview
  const [sections, setSections] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(true);

  // Fetch real weDocs data using WordPress REST API
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const fetchDocsData = async () => {
      setIsLoading(true);
      try {
        // Build query parameters based on block attributes
        const queryParams = new URLSearchParams({
          per_page: -1,
          status: 'publish'
        });

        // Map our orderby options to WordPress REST API valid options
        let apiOrderBy = 'menu_order';
        if (sectionsOrderBy === 'menu_order') {
          apiOrderBy = 'menu_order';
        } else if (sectionsOrderBy === 'name') {
          apiOrderBy = 'title';
        } else if (sectionsOrderBy === 'slug') {
          apiOrderBy = 'slug';
        } else if (sectionsOrderBy === 'id') {
          apiOrderBy = 'id';
        } else if (sectionsOrderBy === 'count') {
          // For count, we'll fetch all and sort client-side
          apiOrderBy = 'menu_order';
        } else {
          apiOrderBy = 'menu_order';
        }
        queryParams.append('orderby', apiOrderBy);
        queryParams.append('order', sectionsOrder);

        // Apply exclude filter
        if (excludeSections.length > 0) {
          queryParams.append('exclude', excludeSections.join(','));
        }

        // Fetch docs from WordPress REST API
        const response = await wp.apiFetch({
          path: `/wp/v2/docs?${queryParams.toString()}`
        });

        // Process the data to build hierarchical structure
        const processedSections = processDocsData(response);
        setSections(processedSections);
      } catch (error) {
        // Fallback to empty array on error
        setSections([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocsData();
  }, [excludeSections, sectionsOrderBy, sectionsOrder, articleOrderBy, articleOrder, enableNestedArticles]);

  // Process flat docs array into hierarchical structure - matching admin interface logic
  const processDocsData = docs => {
    if (!docs || !Array.isArray(docs)) return [];

    // Create a map for quick lookup
    const docsMap = new Map();
    docs.forEach(doc => {
      docsMap.set(doc.id, {
        ID: doc.id,
        post_title: doc.title.rendered,
        post_name: doc.slug,
        post_parent: doc.parent,
        menu_order: doc.menu_order,
        children: []
      });
    });

    // Build hierarchical structure
    const sections = [];
    docs.forEach(doc => {
      const docObj = docsMap.get(doc.id);
      if (doc.parent === 0) {
        // This is a top-level section
        sections.push(docObj);
      } else {
        // This is a child - find its parent and add it
        const parent = docsMap.get(doc.parent);
        if (parent) {
          parent.children.push(docObj);
        }
      }
    });

    // Sort sections - matching admin interface logic
    const sortSections = docsArray => {
      return docsArray.sort((a, b) => {
        if (sectionsOrderBy === 'menu_order') {
          // Use the same sorting logic as admin interface but respect direction setting
          return sectionsOrder === 'asc' ? a.menu_order - b.menu_order : b.menu_order - a.menu_order;
        } else if (sectionsOrderBy === 'name') {
          return sectionsOrder === 'asc' ? a.post_title.localeCompare(b.post_title) : b.post_title.localeCompare(a.post_title);
        } else if (sectionsOrderBy === 'id') {
          return sectionsOrder === 'asc' ? a.ID - b.ID : b.ID - a.ID;
        } else if (sectionsOrderBy === 'slug') {
          return sectionsOrder === 'asc' ? a.post_name.localeCompare(b.post_name) : b.post_name.localeCompare(a.post_name);
        } else if (sectionsOrderBy === 'count') {
          // Sort by number of children
          const aCount = a.children ? a.children.length : 0;
          const bCount = b.children ? b.children.length : 0;
          return sectionsOrder === 'asc' ? aCount - bCount : bCount - aCount;
        }
        return 0;
      });
    };

    // Sort articles - using articleOrderBy setting
    const sortArticles = docsArray => {
      return docsArray.sort((a, b) => {
        if (articleOrderBy === 'menu_order') {
          // Use the same sorting logic as admin interface but respect direction setting
          return articleOrder === 'asc' ? a.menu_order - b.menu_order : b.menu_order - a.menu_order;
        } else if (articleOrderBy === 'name') {
          return articleOrder === 'asc' ? a.post_title.localeCompare(b.post_title) : b.post_title.localeCompare(a.post_title);
        } else if (articleOrderBy === 'id') {
          return articleOrder === 'asc' ? a.ID - b.ID : b.ID - a.ID;
        } else if (articleOrderBy === 'slug') {
          return articleOrder === 'asc' ? a.post_name.localeCompare(b.post_name) : b.post_name.localeCompare(a.post_name);
        } else if (articleOrderBy === 'count') {
          // Sort by number of children
          const aCount = a.children ? a.children.length : 0;
          const bCount = b.children ? b.children.length : 0;
          return articleOrder === 'asc' ? aCount - bCount : bCount - aCount;
        }
        return 0;
      });
    };

    // Sort sections using admin interface logic
    const sortedSections = sortSections(sections);

    // Sort children of each section using article sorting logic
    sortedSections.forEach(section => {
      if (section.children.length > 0) {
        section.children = sortArticles(section.children);
      }
    });
    return sortedSections;
  };
  const orderByOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('weDocs Order', 'wedocs'),
    value: 'menu_order'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Name', 'wedocs'),
    value: 'name'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Slug', 'wedocs'),
    value: 'slug'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('ID', 'wedocs'),
    value: 'id'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Count', 'wedocs'),
    value: 'count'
  }];
  const titleTagOptions = [{
    label: 'H2',
    value: 'h2'
  }, {
    label: 'H3',
    value: 'h3'
  }, {
    label: 'H4',
    value: 'h4'
  }, {
    label: 'H5',
    value: 'h5'
  }, {
    label: 'H6',
    value: 'h6'
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.AlignmentToolbar, {
        value: attributes.align,
        onChange: value => setAttributes({
          align: value
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Query Settings', 'wedocs'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Exclude Sections', 'wedocs'),
          value: excludeSections.join(', '),
          onChange: value => setAttributes({
            excludeSections: value.split(',').map(id => id.trim()).filter(id => id)
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comma-separated section IDs to exclude', 'wedocs')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sections Order By', 'wedocs'),
          value: sectionsOrderBy,
          options: orderByOptions,
          onChange: value => setAttributes({
            sectionsOrderBy: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order', 'wedocs'),
          value: sectionsOrder,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ascending', 'wedocs'),
            value: 'asc'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Descending', 'wedocs'),
            value: 'desc'
          }],
          onChange: value => setAttributes({
            sectionsOrder: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Article Order By', 'wedocs'),
          value: articleOrderBy,
          options: orderByOptions,
          onChange: value => setAttributes({
            articleOrderBy: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Article Order', 'wedocs'),
          value: articleOrder,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ascending', 'wedocs'),
            value: 'asc'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Descending', 'wedocs'),
            value: 'desc'
          }],
          onChange: value => setAttributes({
            articleOrder: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Nested Articles', 'wedocs'),
          checked: enableNestedArticles,
          onChange: value => setAttributes({
            enableNestedArticles: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout Settings', 'wedocs'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Title Tag', 'wedocs'),
          value: sectionTitleTag,
          options: titleTagOptions,
          onChange: value => setAttributes({
            sectionTitleTag: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Article Title Tag', 'wedocs'),
          value: articleTitleTag,
          options: titleTagOptions,
          onChange: value => setAttributes({
            articleTitleTag: value
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Box Styling', 'wedocs'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Padding', 'wedocs'),
          value: sectionStyles.padding,
          onChange: value => updateSectionStyles('padding', value),
          units: [{
            value: 'px',
            label: 'px',
            default: 12
          }, {
            value: 'em',
            label: 'em',
            default: 1
          }, {
            value: 'rem',
            label: 'rem',
            default: 1
          }, {
            value: '%',
            label: '%',
            default: 1
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Margin', 'wedocs'),
          value: sectionStyles.margin,
          onChange: value => updateSectionStyles('margin', value),
          units: [{
            value: 'px',
            label: 'px',
            default: 8
          }, {
            value: 'em',
            label: 'em',
            default: 1
          }, {
            value: 'rem',
            label: 'rem',
            default: 1
          }, {
            value: '%',
            label: '%',
            default: 1
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Background', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: sectionStyles.backgroundColor,
            onChange: newColor => updateSectionStyles('backgroundColor', newColor)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Background (Hover)', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: sectionStyles.backgroundColorHover,
            onChange: newColor => updateSectionStyles('backgroundColorHover', newColor)
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Title Styling', 'wedocs'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Title Color', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: titleStyles.color,
            onChange: newColor => updateTitleStyles('color', newColor)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Title Background', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: titleStyles.backgroundColor,
            onChange: newColor => updateTitleStyles('backgroundColor', newColor)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Section Title Background (Hover)', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: titleStyles.backgroundColorHover,
            onChange: newColor => updateTitleStyles('backgroundColorHover', newColor)
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Article Title Styling', 'wedocs'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Article Title Color', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: docListStyles.textColor,
            onChange: newColor => updateDocListStyles('textColor', newColor)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
            className: "components-base-control__label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Article Title Color (Hover)', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: docListStyles.textColorHover,
            onChange: newColor => updateDocListStyles('textColorHover', newColor)
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "wedocs-document",
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "flex items-center justify-center py-8",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: "ml-2 text-gray-600",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading weDocs data...', 'wedocs')
          })]
        }) : sections.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components__WEBPACK_IMPORTED_MODULE_5__.SidebarContainer, {
          sections: sections,
          attributes: attributes
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "text-center py-8 text-gray-500",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "mb-2",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No documentation sections found.', 'wedocs')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "text-sm",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Create some documentation sections to see them here.', 'wedocs')
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/Sidebar/index.js":
/*!*************************************!*\
  !*** ./src/blocks/Sidebar/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/Sidebar/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/blocks/Sidebar/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/Sidebar/block.json");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/blocks/Sidebar/style.css");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/blocks/Sidebar/save.js":
/*!************************************!*\
  !*** ./src/blocks/Sidebar/save.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Save = () => {
  // This is a dynamic block, so we return null
  // The content will be rendered server-side via render.php
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

/***/ }),

/***/ "./src/blocks/Sidebar/style.css":
/*!**************************************!*\
  !*** ./src/blocks/Sidebar/style.css ***!
  \**************************************/
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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

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
/******/ 			"blocks/Sidebar/index": 0,
/******/ 			"blocks/Sidebar/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/Sidebar/style-index"], () => (__webpack_require__("./src/blocks/Sidebar/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map