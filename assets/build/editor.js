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
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _AiDocWriterModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AiDocWriterModal */ "./src/editor/AiDocWriterModal.js");









const AiDocWriter = () => {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Check if we're in the docs post type
  const {
    isViewable,
    postTypeName
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
    const postType = select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentPostType();
    const postTypeObject = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store).getPostType(postType);
    return {
      isViewable: postTypeObject?.viewable,
      postTypeName: postType
    };
  }, []);

  // Only show for docs post type
  if (!isViewable || postTypeName !== 'docs') {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginSidebar, {
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
    onClick: () => setIsModalOpen(true),
    className: "button button-primary",
    style: {
      width: '100%',
      height: '40px',
      fontSize: '14px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Open AI Doc Writer', 'wedocs')))), isModalOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AiDocWriterModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false)
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
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _AiDocWriterPreview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AiDocWriterPreview */ "./src/editor/AiDocWriterPreview.js");
/* harmony import */ var _utils_aiService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/aiService */ "./src/utils/aiService.js");










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

  // WordPress editor dispatch hooks
  const {
    insertBlocks,
    replaceBlocks,
    insertDefaultBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_5__.store);

  // Get current post data and editor state
  const {
    currentPost,
    selectedBlockId,
    blocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getCurrentPost,
      getEditedPostContent
    } = select('core/editor');
    const {
      getSelectedBlockClientId,
      getBlocks
    } = select('core/block-editor');
    const post = getCurrentPost();
    const content = getEditedPostContent();
    console.log('Post from getCurrentPost:', post);
    console.log('Content from getEditedPostContent:', content);
    return {
      currentPost: {
        id: post?.id || null,
        title: post?.title || '',
        contentRaw: content || '',
        contentRendered: content || ''
      },
      selectedBlockId: getSelectedBlockClientId() || null,
      blocks: getBlocks() || []
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

  // Clean AI-generated content
  const cleanGeneratedContent = content => {
    if (!content) return content;

    // Remove HTML document structure
    let cleaned = content.replace(/```html\s*/gi, '') // Remove markdown code blocks
    .replace(/```\s*/g, '') // Remove closing code blocks
    .replace(/<!DOCTYPE[^>]*>/gi, '') // Remove DOCTYPE
    .replace(/<html[^>]*>/gi, '') // Remove html tag
    .replace(/<\/html>/gi, '') // Remove closing html tag
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '') // Remove head section
    .replace(/<body[^>]*>/gi, '') // Remove body opening tag
    .replace(/<\/body>/gi, '') // Remove body closing tag
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove style blocks
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '') // Remove title
    .replace(/<meta[^>]*>/gi, '') // Remove meta tags
    .trim();
    return cleaned;
  };

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
    console.log(content);

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
      const aiSettings = await _utils_aiService__WEBPACK_IMPORTED_MODULE_9__["default"].getAiSettings();

      // Check if AI is properly configured
      if (!aiSettings.providers[aiSettings.default_provider]?.api_key) {
        setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI service is not configured. Please set up your AI provider settings in weDocs > Settings > AI Control Settings.', 'wedocs'));
        return;
      }

      // Use AI service to generate content
      const systemPrompt = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You are a professional documentation writer. Generate comprehensive, well-structured documentation content using HTML tags. Use proper heading hierarchy (h2, h3, etc.) and wrap all content in paragraph tags. Highlight important terms with <span class="highlight"> tags. IMPORTANT: Only return the content body without HTML document structure (no <!DOCTYPE>, <html>, <head>, <style>, or <body> tags). Return only the content that should be inserted into the document.', 'wedocs');
      const selectedModel = aiSettings.providers[aiSettings.default_provider].selected_model;
      const result = await _utils_aiService__WEBPACK_IMPORTED_MODULE_9__["default"].generateContent(prompt, {
        provider: aiSettings.default_provider,
        model: selectedModel,
        feature: 'ai_doc_writer',
        systemPrompt: systemPrompt,
        maxTokens: 2000,
        temperature: 0.7
      });
      if (!result.content) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('AI service returned empty content', 'wedocs'));
      }

      // Clean the generated content
      const cleanedContent = cleanGeneratedContent(result.content);

      // Validate the generated content
      const validation = validateGeneratedContent(cleanedContent);
      if (!validation.isValid) {
        setError(validation.errors.join(' '));
        return;
      }
      setGeneratedContent(cleanedContent);
      setShowPreview(true);
    } catch (err) {
      setError(err.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to generate content. Please try again.', 'wedocs'));
    } finally {
      setIsGenerating(false);
    }
  };

  // Sanitize content for security (following BetterDocs Pro pattern)
  const sanitizeContent = content => {
    if (!content) return content;

    // Remove script tags and their contents
    content = content.replace(/<script[^>]*>.*?<\/script>/gi, '');

    // Remove javascript: protocols but keep the anchor tags
    content = content.replace(/href\s*=\s*(["\'])\s*javascript:.*?\1/i, 'href="#"');

    // Remove all event handlers (onclick, onload, etc) but keep the elements
    content = content.replace(/\s+on\w+\s*=\s*(["\'])?[^"\']*\1?/i, '');

    // Remove any inline javascript: in attributes
    content = content.replace(/javascript\s*:/i, '');
    return content;
  };

  // Parse HTML content and create appropriate blocks
  const createContentBlocks = htmlContent => {
    const blocks = [];

    // Sanitize the content first
    const sanitizedContent = sanitizeContent(htmlContent);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedContent;

    // Process each top-level element
    Array.from(tempDiv.children).forEach(element => {
      const tagName = element.tagName.toLowerCase();
      switch (tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          const level = parseInt(tagName.charAt(1));
          blocks.push((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlock)('core/heading', {
            content: element.innerHTML,
            level: level
          }));
          break;
        case 'p':
          blocks.push((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlock)('core/paragraph', {
            content: element.innerHTML
          }));
          break;
        case 'ul':
        case 'ol':
          const listType = tagName === 'ul' ? 'ul' : 'ol';
          const listItems = Array.from(element.querySelectorAll('li')).map(li => li.innerHTML);
          blocks.push((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlock)('core/list', {
            values: listItems,
            ordered: listType === 'ol'
          }));
          break;
        case 'blockquote':
          blocks.push((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlock)('core/quote', {
            value: element.innerHTML
          }));
          break;
        default:
          // For any other HTML content, use HTML block
          blocks.push((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlock)('core/html', {
            content: element.outerHTML
          }));
          break;
      }
    });

    // If no blocks were created (e.g., only text), create a paragraph
    if (blocks.length === 0) {
      blocks.push((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_7__.createBlock)('core/paragraph', {
        content: htmlContent
      }));
    }
    return blocks;
  };
  const handleAccept = () => {
    try {
      // Create blocks from the generated content
      const contentBlocks = createContentBlocks(generatedContent);
      if (overwriteContent) {
        // Overwrite Mode: Replace entire post content
        // Get all block client IDs safely
        const blockIds = blocks.map(block => block.clientId).filter(id => id);
        if (blockIds.length > 0) {
          // Replace all existing blocks with new content blocks
          replaceBlocks(blockIds, contentBlocks);
        } else {
          // If no blocks exist, just insert the new blocks
          insertBlocks(contentBlocks);
        }
      } else {
        // Insert Mode: Insert at current cursor position
        if (selectedBlockId) {
          // Insert after the selected block
          insertBlocks(contentBlocks, selectedBlockId, 'after');
        } else {
          // No block selected, insert at the end
          insertBlocks(contentBlocks);
        }
      }

      // Close the modal
      onClose();
    } catch (error) {
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to insert content. Please try again.', 'wedocs'));
    }
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
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, {
    spacing: 3
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation Title', 'wedocs'),
    value: title,
    onChange: setTitle,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your documentation title here...', 'wedocs'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The title will be used to generate relevant content.', 'wedocs'),
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keywords', 'wedocs'),
    value: keywords,
    onChange: setKeywords,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add keywords to guide AI (comma-separated)...', 'wedocs'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter relevant keywords separated by commas.', 'wedocs'),
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true
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
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('When enabled, AI content will replace the entire document. When disabled, content will be inserted at the current cursor position.', 'wedocs'),
    __nextHasNoMarginBottom: true
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
  }, isGenerating ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generating...', 'wedocs')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generate Content', 'wedocs')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AiDocWriterPreview__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    // Use centralized provider configs from WordPress
    this.providers = window.weDocsEditorVars?.aiProviderConfigs || {};

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
    const providers = {};

    // Generate settings from centralized configs
    Object.keys(this.providers).forEach(providerKey => {
      const provider = this.providers[providerKey];
      const modelKeys = Object.keys(provider.models);
      const firstModel = modelKeys[0]; // Use first model as default

      providers[providerKey] = {
        api_key: '',
        models: modelKeys,
        selected_model: firstModel
      };

      // Add endpoint for Azure if it exists
      if (providerKey === 'azure') {
        providers[providerKey].endpoint = '';
      }
    });
    return {
      default_provider: 'openai',
      providers: providers
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
      console.log('AI Service - generateContent called with:', {
        prompt: prompt.substring(0, 100) + '...',
        options
      });

      // Get provider and model configuration
      const providerConfig = aiSettings.providers[provider];
      console.log('AI Service - Provider config:', providerConfig);
      if (!providerConfig || !providerConfig.api_key) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('AI provider not configured or API key missing', 'wedocs'));
      }
      const selectedModel = model || providerConfig.selected_model;
      const endpoint = provider === 'azure' ? providerConfig.endpoint : null;
      console.log('AI Service - Selected model:', selectedModel);
      console.log('AI Service - Provider:', provider);
      console.log('AI Service - Endpoint:', endpoint);

      // Prepare the request payload
      const payload = this.preparePayload(provider, selectedModel, prompt, options);

      // Make the API call
      const response = await this.makeApiCall(provider, providerConfig.api_key, endpoint, payload, selectedModel);
      return this.parseResponse(provider, response);
    } catch (error) {
      console.error('AI content generation failed:', error);
      throw error;
    }
  }

  /**
   * List available models for Google Gemini API
   */
  async listGoogleModels(apiKey) {
    try {
      console.log('AI Service - Listing Google models...');
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || errorData.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Failed to list Google models', 'wedocs'));
      }
      const data = await response.json();
      console.log('AI Service - Available Google models:', data);
      return data;
    } catch (error) {
      console.error('AI Service - Failed to list Google models:', error);
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
    console.log('AI Service - preparePayload called with:', {
      provider,
      model,
      prompt: prompt.substring(0, 100) + '...',
      options
    });
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
    const finalPayload = basePayloads[provider] || basePayloads.openai;
    console.log('AI Service - Final payload prepared:', finalPayload);
    return finalPayload;
  }

  /**
   * Make API call to the specified provider
   */
  async makeApiCall(provider, apiKey, endpoint, payload, model = null) {
    console.log('AI Service - makeApiCall called with:', {
      provider,
      apiKey: apiKey ? '***' + apiKey.slice(-4) : 'none',
      endpoint,
      payload,
      model
    });
    const providerConfig = this.providers[provider];
    let url, headers;

    // Prepare URL and headers based on provider
    switch (provider) {
      case 'openai':
        const openaiBaseUrl = providerConfig.endpoint || providerConfig.baseUrl || 'https://api.openai.com/v1';
        url = `${openaiBaseUrl}/chat/completions`;
        headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        };
        break;
      case 'anthropic':
        const anthropicBaseUrl = providerConfig.endpoint || providerConfig.baseUrl || 'https://api.anthropic.com/v1';
        url = `${anthropicBaseUrl}/messages`;
        headers = {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        };
        break;
      case 'google':
        // Use endpoint from centralized config and replace {model} placeholder
        const endpoint = providerConfig.endpoint || 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent';
        const selectedModel = model || 'gemini-2.0-flash-exp';
        url = endpoint.replace('{model}', selectedModel) + `?key=${apiKey}`;
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
    console.log('AI Service - Request headers:', headers);
    console.log('AI Service - Request payload:', payload);
    console.log(payload);
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      let errorData = {};
      let errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('API request failed', 'wedocs');
      try {
        const responseText = await response.text();
        console.log('AI Service - Error response text:', responseText);

        // Try to parse as JSON
        if (responseText.trim().startsWith('{')) {
          errorData = JSON.parse(responseText);
          errorMessage = errorData.error?.message || errorData.message || errorMessage;
        } else {
          // If it's HTML (like a 404 page), provide a more helpful message
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
      } catch (parseError) {
        console.error('AI Service - Failed to parse error response:', parseError);
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      // If it's a Google model not found error, list available models
      if (provider === 'google' && errorMessage.includes('is not found for API version')) {
        console.log('AI Service - Model not found, listing available models...');
        try {
          await this.listGoogleModels(apiKey);
        } catch (listError) {
          console.error('AI Service - Failed to list models:', listError);
        }
      }
      throw new Error(errorMessage);
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