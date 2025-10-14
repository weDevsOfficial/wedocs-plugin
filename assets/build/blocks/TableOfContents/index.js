/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/TableOfContents/ColorsControls.js":
/*!******************************************************!*\
  !*** ./src/blocks/TableOfContents/ColorsControls.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* eslint-disable @wordpress/no-unsafe-wp-apis */




const ColorsControls = ({
  attributes,
  setAttributes,
  device
}) => {
  const {
    colorsControls
  } = attributes;
  const currentColors = colorsControls[device] || {};

  // Fetch theme colors and gradients
  const {
    themeColors,
    themeGradients
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const editorSettings = select('core/block-editor').getSettings();
    return {
      themeColors: editorSettings.colors,
      themeGradients: editorSettings.gradients
    };
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "block-responsive-colors-controls",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
        style: {
          width: '100%'
        },
        popoverProps: {
          placement: 'left-start',
          offset: 36,
          shift: true
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          __next40pxDefaultSize: true,
          onClick: onToggle,
          "aria-expanded": isOpen,
          style: {
            width: '100%'
          },
          className: isOpen && 'is-open',
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
            alignment: "left",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
              colorValue: currentColors.textColor
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalText, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'block-responsive')
            })]
          })
        }),
        renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalDropdownContentWrapper, {
          style: {
            width: '260px'
          },
          paddingSize: "medium",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
            enableAlpha: true,
            value: currentColors.textColor,
            colors: [{
              colors: themeColors,
              name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Theme', 'block-responsive')
            }],
            onChange: color => setAttributes({
              colorsControls: {
                ...colorsControls,
                [device]: {
                  ...currentColors,
                  textColor: color
                }
              }
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
        style: {
          width: '100%'
        },
        popoverProps: {
          placement: 'left-start',
          offset: 36,
          shift: true
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          __next40pxDefaultSize: true,
          onClick: onToggle,
          "aria-expanded": isOpen,
          style: {
            width: '100%'
          },
          className: isOpen && 'is-open',
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
            alignment: "left",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
              colorValue: currentColors.backgroundColor
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalText, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background', 'block-responsive')
            })]
          })
        }),
        renderContent: () => {
          var _currentColors$backgr;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalDropdownContentWrapper, {
            style: {
              width: '260px'
            },
            paddingSize: "none",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
              tabs: [{
                name: 'color',
                title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'block-responsive'),
                content: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                  className: "block-editor-block-responsive-dropdown-tab-content",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
                    enableAlpha: true,
                    value: currentColors.backgroundColor,
                    colors: [{
                      colors: themeColors,
                      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Theme', 'block-responsive')
                    }],
                    onChange: color => setAttributes({
                      colorsControls: {
                        ...colorsControls,
                        [device]: {
                          ...currentColors,
                          backgroundColor: color
                        }
                      }
                    })
                  })
                })
              }, {
                name: 'gradient',
                title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gradient', 'block-responsive'),
                content: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                  className: "block-editor-block-responsive-dropdown-tab-content",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.GradientPicker, {
                    value: (_currentColors$backgr = currentColors.backgroundColor) !== null && _currentColors$backgr !== void 0 ? _currentColors$backgr : null,
                    gradients: [{
                      gradients: themeGradients,
                      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Theme', 'block-responsive')
                    }],
                    onChange: gradient => setAttributes({
                      colorsControls: {
                        ...colorsControls,
                        [device]: {
                          ...currentColors,
                          backgroundColor: gradient
                        }
                      }
                    })
                  })
                })
              }],
              children: ({
                content
              }) => content
            })
          });
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
        style: {
          width: '100%'
        },
        popoverProps: {
          placement: 'left-start',
          offset: 36,
          shift: true
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          __next40pxDefaultSize: true,
          onClick: onToggle,
          "aria-expanded": isOpen,
          style: {
            width: '100%'
          },
          className: isOpen && 'is-open',
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
            alignment: "left",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalZStack, {
              offset: -8,
              isLayered: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
                colorValue: currentColors.linkColor
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
                colorValue: currentColors.linkHoverColor
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalText, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link', 'block-responsive')
            })]
          })
        }),
        renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalDropdownContentWrapper, {
          style: {
            width: '260px'
          },
          paddingSize: "none",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
            tabs: [{
              name: 'default',
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'block-responsive'),
              content: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "block-editor-block-responsive-dropdown-tab-content",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
                  enableAlpha: true,
                  value: currentColors.linkColor,
                  colors: [{
                    colors: themeColors,
                    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Theme', 'block-responsive')
                  }],
                  onChange: color => setAttributes({
                    colorsControls: {
                      ...colorsControls,
                      [device]: {
                        ...currentColors,
                        linkColor: color
                      }
                    }
                  })
                })
              })
            }, {
              name: 'hover-color',
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover', 'block-responsive'),
              content: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "block-editor-block-responsive-dropdown-tab-content",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
                  enableAlpha: true,
                  value: currentColors.linkHoverColor,
                  colors: [{
                    colors: themeColors,
                    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Theme', 'block-responsive')
                  }],
                  onChange: color => setAttributes({
                    colorsControls: {
                      ...colorsControls,
                      [device]: {
                        ...currentColors,
                        linkHoverColor: color
                      }
                    }
                  })
                })
              })
            }],
            children: ({
              content
            }) => content
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      __next40pxDefaultSize: true,
      variant: "secondary",
      isDestructive: true,
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reset All', 'block-responsive'),
      style: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '16px'
      },
      onClick: () => {
        setAttributes({
          colorsControls: {
            ...colorsControls,
            [device]: {
              ...currentColors,
              textColor: undefined,
              backgroundColor: undefined,
              linkColor: undefined,
              linkHoverColor: undefined
            }
          }
        });
      }
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorsControls);

/***/ }),

/***/ "./src/blocks/TableOfContents/Inspector.js":
/*!*************************************************!*\
  !*** ./src/blocks/TableOfContents/Inspector.js ***!
  \*************************************************/
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
/* harmony import */ var _controls_ListItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls/ListItems */ "./src/blocks/TableOfContents/controls/ListItems.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const Inspector = ({
  attributes,
  setAttributes
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('General', 'dynamic-table-of-contents-block-wp'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TOC Title', 'dynamic-table-of-contents-block-wp'),
          value: tocTitle,
          onChange: value => setAttributes({
            tocTitle: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            marginBottom: '20px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            style: {
              fontWeight: '600',
              marginBottom: '8px',
              display: 'block'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Supported Heading Tags', 'dynamic-table-of-contents-block-wp')
          }), ['h1', 'h2', 'h3', 'h4', 'h5'].map(heading => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
            label: heading.toUpperCase(),
            checked: supportedHeadings.includes(heading),
            onChange: checked => {
              const newHeadings = checked ? [...supportedHeadings, heading] : supportedHeadings.filter(h => h !== heading);
              setAttributes({
                supportedHeadings: newHeadings
              });
            }
          }, heading))]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('List Hierarchy', 'dynamic-table-of-contents-block-wp'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Indent subheadings to show hierarchy', 'dynamic-table-of-contents-block-wp'),
          checked: showHierarchy,
          onChange: value => setAttributes({
            showHierarchy: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('List Numbering', 'dynamic-table-of-contents-block-wp'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show numbered list instead of bullets', 'dynamic-table-of-contents-block-wp'),
          checked: showNumbering,
          onChange: value => setAttributes({
            showNumbering: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Collapsible on Small Devices', 'dynamic-table-of-contents-block-wp'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Make TOC collapsible on mobile devices', 'dynamic-table-of-contents-block-wp'),
          checked: collapsibleOnMobile,
          onChange: value => setAttributes({
            collapsibleOnMobile: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Smooth Scroll Behavior', 'dynamic-table-of-contents-block-wp'),
          checked: smoothScroll,
          onChange: value => setAttributes({
            smoothScroll: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sticky Mode', 'dynamic-table-of-contents-block-wp'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Keep TOC fixed while scrolling', 'dynamic-table-of-contents-block-wp'),
          checked: stickyMode,
          onChange: value => setAttributes({
            stickyMode: value
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_controls_ListItems__WEBPACK_IMPORTED_MODULE_3__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Style', 'dynamic-table-of-contents-block-wp'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TOC Container', 'dynamic-table-of-contents-block-wp')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            marginBottom: '20px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Color', 'dynamic-table-of-contents-block-wp')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: containerBackgroundColor,
            onChange: value => setAttributes({
              containerBackgroundColor: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Width', 'dynamic-table-of-contents-block-wp'),
          value: containerWidth,
          onChange: value => setAttributes({
            containerWidth: value
          }),
          units: [{
            value: '%',
            label: '%'
          }, {
            value: 'px',
            label: 'px'
          }, {
            value: 'em',
            label: 'em'
          }, {
            value: 'rem',
            label: 'rem'
          }]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBoxControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'dynamic-table-of-contents-block-wp'),
          values: containerPadding,
          onChange: value => setAttributes({
            containerPadding: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBoxControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Margin', 'dynamic-table-of-contents-block-wp'),
          values: containerMargin,
          onChange: value => setAttributes({
            containerMargin: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Style', 'dynamic-table-of-contents-block-wp'),
          value: containerBorderStyle,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'dynamic-table-of-contents-block-wp'),
            value: 'none'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Solid', 'dynamic-table-of-contents-block-wp'),
            value: 'solid'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dashed', 'dynamic-table-of-contents-block-wp'),
            value: 'dashed'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dotted', 'dynamic-table-of-contents-block-wp'),
            value: 'dotted'
          }],
          onChange: value => setAttributes({
            containerBorderStyle: value
          })
        }), containerBorderStyle !== 'none' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Width', 'dynamic-table-of-contents-block-wp'),
            value: containerBorderWidth,
            onChange: value => setAttributes({
              containerBorderWidth: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', 'dynamic-table-of-contents-block-wp')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
              color: containerBorderColor,
              onChange: value => setAttributes({
                containerBorderColor: value
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Radius', 'dynamic-table-of-contents-block-wp'),
          value: containerBorderRadius,
          onChange: value => setAttributes({
            containerBorderRadius: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("hr", {
          style: {
            margin: '20px 0'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TOC Title', 'dynamic-table-of-contents-block-wp')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            marginBottom: '20px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'dynamic-table-of-contents-block-wp')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: titleColor,
            onChange: value => setAttributes({
              titleColor: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Size', 'dynamic-table-of-contents-block-wp'),
          value: titleFontSize,
          onChange: value => setAttributes({
            titleFontSize: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Weight', 'dynamic-table-of-contents-block-wp'),
          value: titleFontWeight,
          options: [{
            label: '300',
            value: '300'
          }, {
            label: '400',
            value: '400'
          }, {
            label: '500',
            value: '500'
          }, {
            label: '600',
            value: '600'
          }, {
            label: '700',
            value: '700'
          }, {
            label: '800',
            value: '800'
          }],
          onChange: value => setAttributes({
            titleFontWeight: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("hr", {
          style: {
            margin: '20px 0'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TOC List', 'dynamic-table-of-contents-block-wp')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            marginBottom: '20px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'dynamic-table-of-contents-block-wp')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: listColor,
            onChange: value => setAttributes({
              listColor: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            marginBottom: '20px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Color', 'dynamic-table-of-contents-block-wp')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: listHoverColor,
            onChange: value => setAttributes({
              listHoverColor: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Size', 'dynamic-table-of-contents-block-wp'),
          value: listFontSize,
          onChange: value => setAttributes({
            listFontSize: value
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ }),

/***/ "./src/blocks/TableOfContents/block.json":
/*!***********************************************!*\
  !*** ./src/blocks/TableOfContents/block.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wedocs/table-of-contents","version":"0.1.0","title":"Dynamic Table of Contents","category":"text","icon":"list-view","description":"Auto-generates a dynamic Table of Contents from selected heading levels with collapsible, numbered, and hierarchical list options.","example":{"attributes":{"tocTitle":"Table of Contents","supportedHeadings":["h2","h3"],"showHierarchy":true,"showNumbering":false}},"supports":{"html":false,"anchor":true,"color":{"background":true,"text":true,"link":true}},"attributes":{"blockId":{"type":"string","default":""},"colorsControls":{"type":"object","default":{"desktop":{"textColor":"#000000","backgroundColor":"#ffffff","linkColor":"#000000","linkHoverColor":"#000000"}}},"tocTitle":{"type":"string","default":"Table of Contents"},"supportedHeadings":{"type":"array","default":["h2","h3"]},"showHierarchy":{"type":"boolean","default":true},"showNumbering":{"type":"boolean","default":false},"collapsibleOnMobile":{"type":"boolean","default":true},"containerBackgroundColor":{"type":"string"},"containerWidth":{"type":"string","default":"100%"},"containerPadding":{"type":"object","default":{"top":"20px","right":"20px","bottom":"20px","left":"20px"}},"containerMargin":{"type":"object","default":{"top":"0px","right":"0px","bottom":"20px","left":"0px"}},"containerBorderStyle":{"type":"string","default":"solid"},"containerBorderWidth":{"type":"string","default":"1px"},"containerBorderColor":{"type":"string","default":"#e0e0e0"},"containerBorderRadius":{"type":"string","default":"5px"},"titleColor":{"type":"string"},"titleFontSize":{"type":"string","default":"18px"},"titleFontWeight":{"type":"string","default":"600"},"titlePadding":{"type":"object","default":{"top":"0px","right":"0px","bottom":"15px","left":"0px"}},"listColor":{"type":"string"},"listHoverColor":{"type":"string"},"listFontSize":{"type":"string","default":"14px"},"smoothScroll":{"type":"boolean","default":true},"stickyMode":{"type":"boolean","default":false},"additionalCssClass":{"type":"string","default":""}},"textdomain":"wedocs","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');

/***/ }),

/***/ "./src/blocks/TableOfContents/controls/ListItems.js":
/*!**********************************************************!*\
  !*** ./src/blocks/TableOfContents/controls/ListItems.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const ListItems = ({
  attributes,
  setAttributes
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('List Items', 'dynamic-table-of-contents-block-wp'),
    initialOpen: false,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('TOC Container', 'dynamic-table-of-contents-block-wp')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      style: {
        marginBottom: '20px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Color', 'dynamic-table-of-contents-block-wp')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
        color: containerBackgroundColor,
        onChange: value => setAttributes({
          containerBackgroundColor: value
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItems);

/***/ }),

/***/ "./src/blocks/TableOfContents/edit.js":
/*!********************************************!*\
  !*** ./src/blocks/TableOfContents/edit.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
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
/* harmony import */ var _ColorsControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ColorsControls */ "./src/blocks/TableOfContents/ColorsControls.js");
/* harmony import */ var _Inspector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Inspector */ "./src/blocks/TableOfContents/Inspector.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/TableOfContents/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
* Retrieves the translation of text.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
*/


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * WordPress dependencies
 */





/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    blockId,
    tocTitle,
    supportedHeadings,
    showHierarchy,
    showNumbering,
    collapsibleOnMobile,
    containerBackgroundColor,
    containerWidth,
    containerPadding,
    containerMargin,
    containerBorderStyle,
    containerBorderWidth,
    containerBorderColor,
    containerBorderRadius,
    titleColor,
    titleFontSize,
    titleFontWeight,
    titlePadding,
    listColor,
    listHoverColor,
    listFontSize,
    smoothScroll,
    stickyMode,
    additionalCssClass
  } = attributes;
  const [headings, setHeadings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);

  // Set unique block ID on first render
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!blockId) {
      setAttributes({
        blockId: `toc-${clientId}`
      });
    }
  }, [blockId, clientId, setAttributes]);

  // Mock headings for preview in editor
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const mockHeadings = [{
      level: 2,
      text: 'Introduction',
      id: 'introduction'
    }, {
      level: 3,
      text: 'Getting Started',
      id: 'getting-started'
    }, {
      level: 3,
      text: 'Basic Features',
      id: 'basic-features'
    }, {
      level: 2,
      text: 'Advanced Usage',
      id: 'advanced-usage'
    }, {
      level: 3,
      text: 'Configuration',
      id: 'configuration'
    }, {
      level: 4,
      text: 'Settings Panel',
      id: 'settings-panel'
    }, {
      level: 2,
      text: 'Conclusion',
      id: 'conclusion'
    }].filter(heading => supportedHeadings.includes(`h${heading.level}`));
    setHeadings(mockHeadings);
  }, [supportedHeadings]);
  const renderTocList = (headings, showHierarchy, showNumbering) => {
    if (headings.length === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "toc-empty-state",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No headings found. Add some headings to your content to see them here.', 'dynamic-table-of-contents-block-wp')
        })
      });
    }
    let counter = 1;
    const counters = {
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("ul", {
      className: `toc-list ${showHierarchy ? 'hierarchical' : 'flat'} ${showNumbering ? 'numbered' : 'bulleted'}`,
      children: headings.map((heading, index) => {
        if (showNumbering) {
          if (showHierarchy) {
            counters[heading.level]++;
            // Reset lower level counters
            for (let i = heading.level + 1; i <= 5; i++) {
              counters[i] = 0;
            }
          } else {
            counters[heading.level] = counter++;
          }
        }
        const indent = showHierarchy ? (heading.level - 2) * 20 : 0;
        const numberText = showNumbering ? showHierarchy ? Object.entries(counters).slice(0, heading.level - 1).map(([level, count]) => count > 0 ? count : '').filter(n => n).join('.') : counters[heading.level] : '';
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("li", {
          style: {
            marginLeft: `${indent}px`
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("a", {
            href: `#${heading.id}`,
            className: "toc-link",
            children: [showNumbering && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
              className: "toc-number",
              children: [numberText, ". "]
            }), heading.text]
          })
        }, index);
      })
    });
  };
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `${additionalCssClass} ${stickyMode ? 'sticky-mode' : ''}`.trim(),
    'data-block-id': blockId,
    style: {
      "--list-item-sytle": containerBackgroundColor,
      // backgroundColor: containerBackgroundColor,
      width: containerWidth,
      padding: containerPadding ? `${containerPadding.top} ${containerPadding.right} ${containerPadding.bottom} ${containerPadding.left}` : undefined,
      margin: containerMargin ? `${containerMargin.top} ${containerMargin.right} ${containerMargin.bottom} ${containerMargin.left}` : undefined,
      borderStyle: containerBorderStyle !== 'none' ? containerBorderStyle : undefined,
      borderWidth: containerBorderStyle !== 'none' ? containerBorderWidth : undefined,
      borderColor: containerBorderStyle !== 'none' ? containerBorderColor : undefined,
      borderRadius: containerBorderRadius
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Inspector__WEBPACK_IMPORTED_MODULE_6__["default"], {
      attributes: attributes,
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "toc-title",
        style: {
          color: titleColor,
          fontSize: titleFontSize,
          fontWeight: titleFontWeight,
          padding: titlePadding ? `${titlePadding.top} ${titlePadding.right} ${titlePadding.bottom} ${titlePadding.left}` : undefined
        },
        children: tocTitle
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "toc-content",
        style: {
          color: listColor,
          fontSize: listFontSize
        },
        children: renderTocList(headings, showHierarchy, showNumbering)
      }), collapsibleOnMobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "toc-mobile-notice",
        style: {
          marginTop: '10px',
          fontSize: '12px',
          opacity: 0.7
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(Collapsible on mobile devices)', 'dynamic-table-of-contents-block-wp')
      })]
    })]
  });
}

/***/ }),

/***/ "./src/blocks/TableOfContents/editor.scss":
/*!************************************************!*\
  !*** ./src/blocks/TableOfContents/editor.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/TableOfContents/index.js":
/*!*********************************************!*\
  !*** ./src/blocks/TableOfContents/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/TableOfContents/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/TableOfContents/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/TableOfContents/block.json");
/**
* Registers a new block provided a unique name and an object defining its behavior.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
*/


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/blocks/TableOfContents/style.scss":
/*!***********************************************!*\
  !*** ./src/blocks/TableOfContents/style.scss ***!
  \***********************************************/
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
/******/ 			"blocks/TableOfContents/index": 0,
/******/ 			"blocks/TableOfContents/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/TableOfContents/style-index"], () => (__webpack_require__("./src/blocks/TableOfContents/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map