/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor/AiDocWriter.js":
/*!***********************************!*\
  !*** ./src/editor/AiDocWriter.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _AiDocWriterModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AiDocWriterModal */ "./src/editor/AiDocWriterModal.js");









const AiDocWriter = () => {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Check if we're in the docs post type
  const {
    isViewable,
    postTypeName
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
    const postType = select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentPostType();
    const postTypeObject = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__.store).getPostType(postType);
    return {
      isViewable: postTypeObject?.viewable,
      postTypeName: postType
    };
  }, []);

  // Only show for docs post type
  if (!isViewable || postTypeName !== 'docs') {
    return null;
  }
  console.log('AiDocWriter component rendered for docs post type, isModalOpen:', isModalOpen);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4__.PluginSidebar, {
    name: "wedocs-ai-doc-writer",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI Doc Writer', 'wedocs'),
    icon: "edit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '16px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      marginBottom: '16px',
      fontSize: '14px',
      color: '#666'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generate AI-powered documentation content with advanced language models.', 'wedocs')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => {
      console.log('Opening AI Doc Writer modal');
      setIsModalOpen(true);
    },
    className: "button button-primary",
    style: {
      width: '100%',
      height: '40px',
      fontSize: '14px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Open AI Doc Writer', 'wedocs')))), isModalOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AiDocWriterModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isOpen: isModalOpen,
    onClose: () => {
      console.log('Closing AI Doc Writer modal');
      setIsModalOpen(false);
    }
  }));
};

// Register the plugin
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('wedocs-ai-doc-writer', {
  render: AiDocWriter,
  icon: 'edit'
});

/***/ }),

/***/ "./src/editor/AiDocWriterModal.js":
/*!****************************************!*\
  !*** ./src/editor/AiDocWriterModal.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AiDocWriterPreview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AiDocWriterPreview */ "./src/editor/AiDocWriterPreview.js");






const AiDocWriterModal = ({
  isOpen,
  onClose
}) => {
  const [title, setTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [prompt, setPrompt] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [keywords, setKeywords] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [overwriteContent, setOverwriteContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [isGenerating, setIsGenerating] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [generatedContent, setGeneratedContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [showPreview, setShowPreview] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');

  // Get current post data
  const currentPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getCurrentPost,
      getEditedPostContent
    } = select('core/editor');
    const post = getCurrentPost();
    const content = getEditedPostContent();
    console.log('Post from getCurrentPost:', post);
    console.log('Content from getEditedPostContent:', content);
    return {
      ...post,
      content: {
        raw: content,
        rendered: content
      }
    };
  }, []);

  // Pre-fill title with current post title
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (currentPost?.title && !title) {
      setTitle(currentPost.title);
    }
  }, [currentPost, title]);

  // Generate dynamic prompt from title and keywords
  const generateDynamicPrompt = (docTitle, docKeywords) => {
    if (!docTitle && !docKeywords) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Generate documentation using HTML heading tags for the title. Include details on {Documentation Keywords} and wrap all content in <p> tags. Highlight headings and keywords with <span class='highlight'>.", 'wedocs');
    }
    let dynamicPrompt = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Generate documentation using HTML heading tags for '{title}'. Include relevant details on {keywords} in the documentation. Wrap all content in <p> tags. Highlight headings and keywords with <span class='highlight'>.", 'wedocs');

    // Replace placeholders with actual values
    if (docTitle) {
      dynamicPrompt = dynamicPrompt.replace('{title}', docTitle);
    } else {
      dynamicPrompt = dynamicPrompt.replace("for '{title}'", 'for the title');
    }
    if (docKeywords) {
      dynamicPrompt = dynamicPrompt.replace('{keywords}', docKeywords);
    } else {
      dynamicPrompt = dynamicPrompt.replace('Include relevant details on {keywords} in the documentation.', 'Include relevant details in the documentation.');
    }
    return dynamicPrompt;
  };

  // Update prompt when title or keywords change
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const dynamicPrompt = generateDynamicPrompt(title, keywords);
    setPrompt(dynamicPrompt);
  }, [title, keywords]);
  const handleGenerate = async () => {
    if (!title.trim()) {
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please enter a documentation title.', 'wedocs'));
      return;
    }
    if (!keywords.trim()) {
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please enter keywords to guide the AI.', 'wedocs'));
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      // Simulate AI generation (static content for now)
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockContent = `
                <h2><span class="highlight">Introduction</span></h2>
                <p>This is AI-generated content for: <strong>${title}</strong></p>
                <p>Keywords: <span class="highlight">${keywords}</span></p>
                <p>Overwrite mode: <strong>${overwriteContent ? 'Enabled' : 'Disabled'}</strong></p>
                <p>Prompt used: <em>${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}</em></p>
                <h2><span class="highlight">Key Features</span></h2>
                <p>Based on your keywords and instructions, here's the generated content...</p>
                <h2><span class="highlight">Conclusion</span></h2>
                <p>This content was generated using AI and can be customized as needed.</p>
            `;
      setGeneratedContent(mockContent);
      setShowPreview(true);
    } catch (err) {
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to generate content. Please try again.', 'wedocs'));
    } finally {
      setIsGenerating(false);
    }
  };
  const handleAccept = () => {
    // TODO: Implement content insertion logic
    console.log('Accepting content:', generatedContent);
    console.log('Overwrite mode:', overwriteContent);
    onClose();
  };
  const handleReject = () => {
    setShowPreview(false);
    setGeneratedContent('');
  };
  const handleClose = () => {
    setShowPreview(false);
    setGeneratedContent('');
    setError('');
    onClose();
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI Doc Writer', 'wedocs'),
    onRequestClose: handleClose,
    className: "wedocs-ai-doc-writer-modal",
    size: "large"
  }, !showPreview ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, {
    spacing: 4
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Generation Settings', 'wedocs'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, {
    spacing: 3
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation Title', 'wedocs'),
    value: title,
    onChange: setTitle,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your documentation title here...', 'wedocs'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The title will be used to generate relevant content.', 'wedocs'),
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keywords', 'wedocs'),
    value: keywords,
    onChange: setKeywords,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add keywords to guide AI (comma-separated)...', 'wedocs'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter relevant keywords separated by commas.', 'wedocs'),
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI Instructions', 'wedocs'),
    value: prompt,
    onChange: setPrompt,
    rows: 4,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI instructions will be auto-generated from title and keywords...', 'wedocs'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Instructions are automatically generated from your title and keywords. You can edit them manually if needed.', 'wedocs'),
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overwrite your existing Doc', 'wedocs'),
    checked: overwriteContent,
    onChange: setOverwriteContent,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('When enabled, AI content will replace the entire document. When disabled, content will be inserted at the current cursor position.', 'wedocs')
  })))), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
    status: "error",
    isDismissible: false
  }, error), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalHStack, {
    justify: "flex-end",
    spacing: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    onClick: handleClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'wedocs')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    onClick: handleGenerate,
    disabled: isGenerating
  }, isGenerating ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generating...', 'wedocs')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generate Content', 'wedocs')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AiDocWriterPreview__WEBPACK_IMPORTED_MODULE_5__["default"], {
    content: generatedContent,
    onAccept: handleAccept,
    onReject: handleReject,
    onClose: handleClose
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AiDocWriterModal);

/***/ }),

/***/ "./src/editor/AiDocWriterPreview.js":
/*!******************************************!*\
  !*** ./src/editor/AiDocWriterPreview.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



const AiDocWriterPreview = ({
  content,
  onAccept,
  onReject,
  onClose
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
    spacing: 4
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI Generated Content Preview', 'wedocs'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Review the generated content below. You can accept it to insert into your document or reject it to try again.', 'wedocs')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: content
    },
    style: {
      border: '1px solid #ddd',
      padding: '16px',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9',
      maxHeight: '400px',
      overflowY: 'auto'
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "info",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The content above is formatted with HTML tags. When inserted, it will be properly formatted in your document.', 'wedocs')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    justify: "flex-end",
    spacing: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "tertiary",
    onClick: onClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'wedocs')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: onReject
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reject & Try Again', 'wedocs')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: onAccept
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Accept & Insert', 'wedocs'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AiDocWriterPreview);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

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

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

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
/*!*****************************!*\
  !*** ./src/editor/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AiDocWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiDocWriter */ "./src/editor/AiDocWriter.js");

})();

/******/ })()
;
//# sourceMappingURL=editor.js.map