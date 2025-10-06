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
/* harmony import */ var _utils_aiService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/aiService */ "./src/utils/aiService.js");







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

  // Validate AI-generated content
  const validateGeneratedContent = content => {
    const errors = [];

    // Check if content is empty
    if (!content || content.trim().length === 0) {
      errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generated content is empty.', 'wedocs'));
      return {
        isValid: false,
        errors
      };
    }

    // Check for basic HTML structure
    const hasParagraphs = /<p[^>]*>.*?<\/p>/i.test(content);
    const hasHeadings = /<h[1-6][^>]*>.*?<\/h[1-6]>/i.test(content);
    if (!hasParagraphs && !hasHeadings) {
      errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generated content should contain at least paragraphs or headings.', 'wedocs'));
    }

    // Check for potentially dangerous HTML (basic XSS prevention)
    const dangerousPatterns = [/<script[^>]*>.*?<\/script>/gi, /<iframe[^>]*>.*?<\/iframe>/gi, /javascript:/gi, /on\w+\s*=/gi];
    for (const pattern of dangerousPatterns) {
      if (pattern.test(content)) {
        errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generated content contains potentially unsafe HTML elements.', 'wedocs'));
        break;
      }
    }

    // Check for minimum content length
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    if (textContent.length < 50) {
      errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generated content is too short. Please try again with more specific keywords.', 'wedocs'));
    }

    // Check for maximum content length (prevent extremely long content)
    if (textContent.length > 10000) {
      errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generated content is too long. Please try again with more focused keywords.', 'wedocs'));
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  };
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
      // Get AI settings to determine provider and model
      const aiSettings = await _utils_aiService__WEBPACK_IMPORTED_MODULE_6__["default"].getAiSettings();

      // Check if AI is properly configured
      if (!aiSettings.providers[aiSettings.default_provider]?.api_key) {
        // Fall back to mock content if AI is not configured
        console.warn('AI not configured, using mock content');
        const mockContent = `
                    <h2><span class="highlight">Introduction</span></h2>
                    <p>This is AI-generated content for: <strong>${title}</strong></p>
                    <p>Keywords: <span class="highlight">${keywords}</span></p>
                    <p>Overwrite mode: <strong>${overwriteContent ? 'Enabled' : 'Disabled'}</strong></p>
                    <p>Prompt used: <em>${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}</em></p>
                    <h2><span class="highlight">Key Features</span></h2>
                    <p>Based on your keywords and instructions, here's the generated content. This is a comprehensive guide that covers all the important aspects of the topic you've specified. The content is structured with proper headings and paragraphs to ensure good readability and organization.</p>
                    <h2><span class="highlight">Detailed Information</span></h2>
                    <p>This section provides more detailed information about the topic. The AI has generated relevant content based on your keywords and title. The content follows proper HTML structure with headings and paragraphs as requested.</p>
                    <h2><span class="highlight">Conclusion</span></h2>
                    <p>This content was generated using AI and can be customized as needed. The validation ensures that the content meets quality standards and is safe to use in your documentation.</p>
                `;
        const validation = validateGeneratedContent(mockContent);
        if (!validation.isValid) {
          setError(validation.errors.join(' '));
          return;
        }
        setGeneratedContent(mockContent);
        setShowPreview(true);
        return;
      }

      // Use AI service to generate content
      const systemPrompt = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You are a professional documentation writer. Generate comprehensive, well-structured documentation content using HTML tags. Use proper heading hierarchy (h2, h3, etc.) and wrap all content in paragraph tags. Highlight important terms with <span class="highlight"> tags.', 'wedocs');
      const result = await _utils_aiService__WEBPACK_IMPORTED_MODULE_6__["default"].generateContent(prompt, {
        provider: aiSettings.default_provider,
        model: aiSettings.providers[aiSettings.default_provider].selected_model,
        feature: 'ai_doc_writer',
        systemPrompt: systemPrompt,
        maxTokens: 2000,
        temperature: 0.7
      });
      if (!result.content) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI service returned empty content', 'wedocs'));
      }

      // Validate the generated content
      const validation = validateGeneratedContent(result.content);
      if (!validation.isValid) {
        setError(validation.errors.join(' '));
        return;
      }
      setGeneratedContent(result.content);
      setShowPreview(true);
    } catch (err) {
      console.error('AI generation error:', err);
      setError(err.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to generate content. Please try again.', 'wedocs'));
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

/***/ "./src/utils/aiService.js":
/*!********************************!*\
  !*** ./src/utils/aiService.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * AI Service Utility
 * 
 * Centralized service for managing AI provider integrations
 * and API calls across all AI-powered features in weDocs.
 * 
 * Available WordPress Filters:
 * 
 * @filter wedocs_ai_service_providers
 * Allows customization of AI service provider configurations including models,
 * base URLs, and provider names for the AI service utility.
 * 
 * @since 2.0.0
 */


class AiService {
  constructor() {
    this.providers = {
      openai: {
        name: 'OpenAI',
        baseUrl: 'https://api.openai.com/v1',
        models: {
          'gpt-4': 'GPT-4',
          'gpt-4o-mini': 'GPT-4o Mini',
          'gpt-3.5-turbo': 'GPT-3.5 Turbo'
        }
      },
      anthropic: {
        name: 'Anthropic',
        baseUrl: 'https://api.anthropic.com/v1',
        models: {
          'claude-3-opus-20240229': 'Claude 3 Opus',
          'claude-3-sonnet-20240229': 'Claude 3.5 Sonnet',
          'claude-3-haiku-20240307': 'Claude 3 Haiku'
        }
      },
      google: {
        name: 'Google Gemini',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        models: {
          'gemini-1.5-pro': 'Gemini 1.5 Pro',
          'gemini-1.5-flash': 'Gemini 1.5 Flash',
          'gemini-1.0-pro': 'Gemini 1.0 Pro'
        }
      },
      azure: {
        name: 'Azure OpenAI',
        baseUrl: null,
        // Will be set from endpoint
        models: {
          'gpt-4': 'GPT-4',
          'gpt-4o-mini': 'GPT-4o Mini',
          'gpt-3.5-turbo': 'GPT-3.5 Turbo'
        }
      }
    };

    /**
     * Filter: wedocs_ai_service_providers
     * 
     * Allows customization of AI service provider configurations including models,
     * base URLs, and provider names for the AI service utility.
     * 
     * @param {Object} providers - The providers configuration object
     * @param {Object} providers.openai - OpenAI provider configuration
     * @param {string} providers.openai.name - Provider display name
     * @param {string} providers.openai.baseUrl - API base URL
     * @param {Object} providers.openai.models - Available models object (key: model_id, value: display_name)
     * @param {Object} providers.anthropic - Anthropic provider configuration
     * @param {Object} providers.google - Google Gemini provider configuration
     * @param {Object} providers.azure - Azure OpenAI provider configuration
     * 
     * @example
     * // Add a new model to OpenAI
     * wp.hooks.addFilter('wedocs_ai_service_providers', 'my-plugin', function(providers) {
     *     providers.openai.models['gpt-4-turbo'] = 'GPT-4 Turbo';
     *     return providers;
     * });
     * 
     * @example
     * // Add a completely new provider
     * wp.hooks.addFilter('wedocs_ai_service_providers', 'my-plugin', function(providers) {
     *     providers.custom_provider = {
     *         name: 'Custom AI Provider',
     *         baseUrl: 'https://api.custom-provider.com/v1',
     *         models: {
     *             'custom-model-1': 'Custom Model 1',
     *             'custom-model-2': 'Custom Model 2'
     *         }
     *     };
     *     return providers;
     * });
     * 
     * @example
     * // Modify existing provider configuration
     * wp.hooks.addFilter('wedocs_ai_service_providers', 'my-plugin', function(providers) {
     *     providers.openai.baseUrl = 'https://custom-openai-proxy.com/v1';
     *     return providers;
     * });
     * 
     * @since 2.0.0
     */
    this.providers = wp.hooks.applyFilters('wedocs_ai_service_providers', this.providers);
  }

  /**
   * Get AI settings from WordPress
   */
  async getAiSettings() {
    try {
      const response = await fetch('/wp-json/wp/v2/docs/settings?data=wedocs_settings');
      const settings = await response.json();
      return settings?.ai || this.getDefaultAiSettings();
    } catch (error) {
      console.error('Failed to fetch AI settings:', error);
      return this.getDefaultAiSettings();
    }
  }

  /**
   * Get default AI settings structure
   */
  getDefaultAiSettings() {
    return {
      default_provider: 'openai',
      providers: {
        openai: {
          api_key: '',
          models: ['gpt-4', 'gpt-4o-mini', 'gpt-3.5-turbo'],
          selected_model: 'gpt-4'
        },
        anthropic: {
          api_key: '',
          models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
          selected_model: 'claude-3-sonnet-20240229'
        },
        google: {
          api_key: '',
          models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'],
          selected_model: 'gemini-1.5-pro'
        },
        azure: {
          api_key: '',
          endpoint: '',
          models: ['gpt-4', 'gpt-4o-mini', 'gpt-3.5-turbo'],
          selected_model: 'gpt-4'
        }
      }
    };
  }

  /**
   * Test API connection for a specific provider
   */
  async testApiConnection(provider, apiKey, endpoint = null) {
    try {
      const providerConfig = this.providers[provider];
      if (!providerConfig) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid provider specified', 'wedocs'));
      }
      if (!apiKey) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('API key is required', 'wedocs'));
      }

      // For Azure, endpoint is required
      if (provider === 'azure' && !endpoint) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Azure endpoint is required', 'wedocs'));
      }
      const testPayload = this.getTestPayload(provider);
      const response = await this.makeApiCall(provider, apiKey, endpoint, testPayload);
      return {
        success: true,
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('API connection successful', 'wedocs'),
        response: response
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('API connection failed', 'wedocs'),
        error: error
      };
    }
  }

  /**
   * Generate content using AI
   */
  async generateContent(prompt, options = {}) {
    try {
      const aiSettings = await this.getAiSettings();
      const {
        provider = aiSettings.default_provider,
        model = null,
        feature = 'ai_doc_writer'
      } = options;

      // Get provider and model configuration
      const providerConfig = aiSettings.providers[provider];
      if (!providerConfig || !providerConfig.api_key) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('AI provider not configured or API key missing', 'wedocs'));
      }
      const selectedModel = model || providerConfig.selected_model;
      const endpoint = provider === 'azure' ? providerConfig.endpoint : null;

      // Prepare the request payload
      const payload = this.preparePayload(provider, selectedModel, prompt, options);

      // Make the API call
      const response = await this.makeApiCall(provider, providerConfig.api_key, endpoint, payload);
      return this.parseResponse(provider, response);
    } catch (error) {
      console.error('AI content generation failed:', error);
      throw error;
    }
  }

  /**
   * Get test payload for API connection testing
   */
  getTestPayload(provider) {
    const testPrompts = {
      openai: {
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: 'Hello'
        }],
        max_tokens: 10
      },
      anthropic: {
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{
          role: 'user',
          content: 'Hello'
        }]
      },
      google: {
        contents: [{
          parts: [{
            text: 'Hello'
          }]
        }]
      },
      azure: {
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: 'Hello'
        }],
        max_tokens: 10
      }
    };
    return testPrompts[provider] || testPrompts.openai;
  }

  /**
   * Prepare payload for content generation
   */
  preparePayload(provider, model, prompt, options = {}) {
    const basePayloads = {
      openai: {
        model: model,
        messages: [{
          role: 'system',
          content: options.systemPrompt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You are a helpful documentation assistant.', 'wedocs')
        }, {
          role: 'user',
          content: prompt
        }],
        max_tokens: options.maxTokens || 2000,
        temperature: options.temperature || 0.7
      },
      anthropic: {
        model: model,
        max_tokens: options.maxTokens || 2000,
        messages: [{
          role: 'user',
          content: `${options.systemPrompt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You are a helpful documentation assistant.', 'wedocs')}\n\n${prompt}`
        }]
      },
      google: {
        contents: [{
          parts: [{
            text: `${options.systemPrompt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You are a helpful documentation assistant.', 'wedocs')}\n\n${prompt}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: options.maxTokens || 2000,
          temperature: options.temperature || 0.7
        }
      },
      azure: {
        model: model,
        messages: [{
          role: 'system',
          content: options.systemPrompt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You are a helpful documentation assistant.', 'wedocs')
        }, {
          role: 'user',
          content: prompt
        }],
        max_tokens: options.maxTokens || 2000,
        temperature: options.temperature || 0.7
      }
    };
    return basePayloads[provider] || basePayloads.openai;
  }

  /**
   * Make API call to the specified provider
   */
  async makeApiCall(provider, apiKey, endpoint, payload) {
    const providerConfig = this.providers[provider];
    let url, headers;

    // Prepare URL and headers based on provider
    switch (provider) {
      case 'openai':
        url = `${providerConfig.baseUrl}/chat/completions`;
        headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        };
        break;
      case 'anthropic':
        url = `${providerConfig.baseUrl}/messages`;
        headers = {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        };
        break;
      case 'google':
        url = `${providerConfig.baseUrl}/models/${payload.model || 'gemini-1.5-pro'}:generateContent?key=${apiKey}`;
        headers = {
          'Content-Type': 'application/json'
        };
        break;
      case 'azure':
        url = `${endpoint}/openai/deployments/${payload.model}/chat/completions?api-version=2023-12-01-preview`;
        headers = {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        };
        break;
      default:
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Unsupported AI provider', 'wedocs'));
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || errorData.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('API request failed', 'wedocs'));
    }
    return await response.json();
  }

  /**
   * Parse response from different providers
   */
  parseResponse(provider, response) {
    switch (provider) {
      case 'openai':
      case 'azure':
        return {
          content: response.choices?.[0]?.message?.content || '',
          usage: response.usage || null
        };
      case 'anthropic':
        return {
          content: response.content?.[0]?.text || '',
          usage: response.usage || null
        };
      case 'google':
        return {
          content: response.candidates?.[0]?.content?.parts?.[0]?.text || '',
          usage: response.usageMetadata || null
        };
      default:
        return {
          content: '',
          usage: null
        };
    }
  }

  /**
   * Get available models for a provider
   */
  getProviderModels(provider) {
    return this.providers[provider]?.models || {};
  }

  /**
   * Validate AI settings
   */
  validateAiSettings(settings) {
    const errors = [];
    if (!settings.default_provider) {
      errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default provider is required', 'wedocs'));
    }
    if (!this.providers[settings.default_provider]) {
      errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid default provider', 'wedocs'));
    }

    // Validate provider configurations
    Object.entries(settings.providers || {}).forEach(([providerKey, config]) => {
      if (config.api_key && !this.providers[providerKey]) {
        errors.push(`${providerKey}: ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid provider', 'wedocs')}`);
      }
      if (providerKey === 'azure' && config.api_key && !config.endpoint) {
        errors.push(`${providerKey}: ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Endpoint is required for Azure OpenAI', 'wedocs')}`);
      }
    });
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

// Create and export a singleton instance
const aiService = new AiService();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aiService);

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