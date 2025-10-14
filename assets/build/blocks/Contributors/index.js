/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/Contributors/block.json":
/*!********************************************!*\
  !*** ./src/blocks/Contributors/block.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wedocs/contributors","version":"1.0.0","title":"Doc Contributors","icon":"groups","category":"widgets","description":"Display the author(s)/contributors of a doc along with the last updated date.","supports":{"html":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","attributes":{"showTitle":{"type":"boolean","default":true},"title":{"type":"string","default":"Contributors"},"titleColor":{"type":"string","default":"#fff"},"contributorDisplayMode":{"type":"string","default":"all","enum":["all","manual","main_author"]},"selectedContributors":{"type":"array","default":[]},"showLastUpdated":{"type":"boolean","default":true},"dateFormat":{"type":"string","default":"wp_default"},"customDateFormat":{"type":"string","default":"F j, Y"},"datePrefix":{"type":"string","default":"Updated on"},"backgroundType":{"type":"string","default":"classic","enum":["classic","gradient"]},"backgroundColor":{"type":"string","default":"#f9f9f9"},"backgroundGradient":{"type":"string","default":""},"backgroundImage":{"type":"object","default":{"url":"","alt":""}},"padding":{"type":"object","default":{"top":"15px","right":"15px","bottom":"15px","left":"15px"}},"margin":{"type":"object","default":{"top":"10px","right":"0px","bottom":"10px","left":"0px"}},"borderStyle":{"type":"string","default":"solid","enum":["none","solid","dashed","dotted"]},"borderWidth":{"type":"object","default":{"top":"1px","right":"1px","bottom":"1px","left":"1px"}},"borderColor":{"type":"string","default":"#dddddd"},"borderRadius":{"type":"string","default":"4px"},"boxShadow":{"type":"object","default":{"enabled":false,"horizontal":"0px","vertical":"2px","blur":"4px","spread":"0px","color":"rgba(0,0,0,0.1)"}},"showAvatar":{"type":"boolean","default":true},"avatarType":{"type":"string","default":"user_avatar","enum":["user_avatar","common_icon"]},"avatarSize":{"type":"string","default":"32px"},"avatarShape":{"type":"string","default":"circle","enum":["circle","rounded","square"]},"avatarBorderStyle":{"type":"string","default":"none","enum":["none","solid","dashed"]},"avatarBorderColor":{"type":"string","default":"#dddddd"},"avatarBorderRadius":{"type":"string","default":"50%"},"avatarHoverEffect":{"type":"boolean","default":false},"nameColor":{"type":"string","default":"#333333"},"nameTypography":{"type":"object","default":{"fontSize":"14px","fontWeight":"600","fontStyle":"normal","lineHeight":"normal","letterSpacing":"normal","textTransform":"none","textDecoration":"none","fontFamily":"default"}},"nameHoverColor":{"type":"string","default":"#0073aa"},"contributorTitleColor":{"type":"string","default":"#333333"},"contributorTitleTypography":{"type":"object","default":{"fontSize":"16px","fontWeight":"600","fontStyle":"normal","lineHeight":"normal","letterSpacing":"normal","textTransform":"none","textDecoration":"none","fontFamily":"default"}},"contributorTitleHoverColor":{"type":"string","default":"#0073aa"},"dateColor":{"type":"string","default":"#666666"},"dateTypography":{"type":"object","default":{"fontSize":"12px","fontWeight":"400","fontStyle":"normal","lineHeight":"normal","letterSpacing":"normal","textTransform":"none","textDecoration":"none","fontFamily":"default"}},"additionalCssClass":{"type":"string","default":""},"enableSchema":{"type":"boolean","default":false},"linkBehavior":{"type":"string","default":"user_profile","enum":["user_profile","no_link","custom_link"]},"customLinkUrl":{"type":"string","default":""},"avatarPadding":{"type":"object","default":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}},"avatarMargin":{"type":"object","default":{"top":"0px","right":"8px","bottom":"0px","left":"0px"}},"avatarBorderWidth":{"type":"object","default":{"top":"2px","right":"2px","bottom":"2px","left":"2px"}},"avatarBoxShadow":{"type":"object","default":{"enabled":false,"horizontal":"0px","vertical":"2px","blur":"4px","spread":"0px","color":"rgba(0,0,0,0.1)"}},"namePadding":{"type":"object","default":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}},"nameMargin":{"type":"object","default":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}},"datePadding":{"type":"object","default":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}},"dateMargin":{"type":"object","default":{"top":"10px","right":"0px","bottom":"0px","left":"0px"}},"contributorGap":{"type":"string","default":"10px"},"titlePadding":{"type":"object","default":{"top":"0px","right":"0px","bottom":"10px","left":"0px"}},"titleMargin":{"type":"object","default":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}}}}');

/***/ }),

/***/ "./src/blocks/Contributors/edit.js":
/*!*****************************************!*\
  !*** ./src/blocks/Contributors/edit.js ***!
  \*****************************************/
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
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_TabSystem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/TabSystem */ "./src/blocks/components/TabSystem.js");
/* harmony import */ var _components_TypographyControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/TypographyControl */ "./src/blocks/components/TypographyControl.js");
/* harmony import */ var _components_SpacingControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/SpacingControl */ "./src/blocks/components/SpacingControl.js");
/* harmony import */ var _components_BorderControl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/BorderControl */ "./src/blocks/components/BorderControl.js");
/* harmony import */ var _components_BackgroundControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/BackgroundControl */ "./src/blocks/components/BackgroundControl.js");
/* harmony import */ var _components_ShadowControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/ShadowControl */ "./src/blocks/components/ShadowControl.js");
/* harmony import */ var _components_DimensionControl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/DimensionControl */ "./src/blocks/components/DimensionControl.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);







// Import our custom components








const Edit = props => {
  const {
    attributes,
    setAttributes
  } = props;
  const [users, setUsers] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const [isLoadingUsers, setIsLoadingUsers] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [actualContributors, setActualContributors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const [isLoadingContributors, setIsLoadingContributors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `wedocs-contributors ${attributes.additionalCssClass}`,
    style: {
      backgroundColor: attributes.backgroundType === 'classic' ? attributes.backgroundColor : undefined,
      backgroundImage: attributes.backgroundType === 'gradient' ? attributes.backgroundGradient : attributes.backgroundImage?.url ? `url(${attributes.backgroundImage.url})` : undefined,
      padding: `${attributes.padding.top} ${attributes.padding.right} ${attributes.padding.bottom} ${attributes.padding.left}`,
      margin: `${attributes.margin.top} ${attributes.margin.right} ${attributes.margin.bottom} ${attributes.margin.left}`,
      borderStyle: attributes.borderStyle !== 'none' ? attributes.borderStyle : undefined,
      borderWidth: attributes.borderStyle !== 'none' ? `${attributes.borderWidth.top} ${attributes.borderWidth.right} ${attributes.borderWidth.bottom} ${attributes.borderWidth.left}` : undefined,
      borderColor: attributes.borderStyle !== 'none' ? attributes.borderColor : undefined,
      borderRadius: attributes.borderRadius,
      boxShadow: attributes.boxShadow.enabled ? `${attributes.boxShadow.horizontal} ${attributes.boxShadow.vertical} ${attributes.boxShadow.blur} ${attributes.boxShadow.spread} ${attributes.boxShadow.color}` : undefined
    }
  });

  // Get current post data
  const currentPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getCurrentPostId,
      getCurrentPostType
    } = select('core/editor') || {};
    if (!getCurrentPostId) return null;
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getEntityRecord('postType', getCurrentPostType(), getCurrentPostId());
  }, []);

  // Fetch users when component mounts or when manual selection mode is active
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (attributes.contributorDisplayMode === 'manual') {
      setIsLoadingUsers(true);
      wp.apiFetch({
        path: '/wp/v2/users?per_page=100&context=edit'
      }).then(users => {
        setUsers(users);
        setIsLoadingUsers(false);
      }).catch(() => {
        setIsLoadingUsers(false);
      });
    }
  }, [attributes.contributorDisplayMode]);

  // Fetch actual contributors based on current post and display mode
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!currentPost) return;
    const fetchContributors = async () => {
      setIsLoadingContributors(true);
      try {
        const contributors = [];
        switch (attributes.contributorDisplayMode) {
          case 'main_author':
            if (currentPost.author) {
              const authorUser = await wp.apiFetch({
                path: `/wp/v2/users/${currentPost.author}?context=edit`
              });
              if (authorUser) {
                contributors.push(authorUser);
              }
            }
            break;
          case 'manual':
            if (attributes.selectedContributors.length > 0) {
              for (const userId of attributes.selectedContributors) {
                try {
                  const user = await wp.apiFetch({
                    path: `/wp/v2/users/${userId}?context=edit`
                  });
                  if (user) {
                    contributors.push(user);
                  }
                } catch (error) {
                  console.warn(`Could not fetch user ${userId}:`, error);
                }
              }
            }
            break;
          case 'all':
          default:
            // Get post author
            if (currentPost.author) {
              const authorUser = await wp.apiFetch({
                path: `/wp/v2/users/${currentPost.author}?context=edit`
              });
              if (authorUser) {
                contributors.push(authorUser);
              }
            }

            // Get revisions if post is saved
            if (currentPost.id) {
              try {
                const revisions = await wp.apiFetch({
                  path: `/wp/v2/${currentPost.type}/${currentPost.id}/revisions?per_page=50`
                });
                const contributorIds = [currentPost.author];
                for (const revision of revisions) {
                  if (revision.author && !contributorIds.includes(revision.author)) {
                    contributorIds.push(revision.author);
                    try {
                      const user = await wp.apiFetch({
                        path: `/wp/v2/users/${revision.author}?context=edit`
                      });
                      if (user) {
                        contributors.push(user);
                      }
                    } catch (error) {
                      console.warn(`Could not fetch revision author ${revision.author}:`, error);
                    }
                  }
                }
              } catch (error) {
                console.warn('Could not fetch revisions:', error);
              }
            }
            break;
        }
        setActualContributors(contributors);
      } catch (error) {
        console.error('Error fetching contributors:', error);
        setActualContributors([]);
      } finally {
        setIsLoadingContributors(false);
      }
    };
    fetchContributors();
  }, [currentPost, attributes.contributorDisplayMode, attributes.selectedContributors]);
  const renderPreview = () => {
    // Show loading state
    if (isLoadingContributors) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
        icon: "groups",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Doc Contributors', 'wedocs'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading contributors...', 'wedocs')
        })]
      });
    }
    if (attributes.contributorDisplayMode === 'manual' && attributes.selectedContributors.length === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
        icon: "groups",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Doc Contributors', 'wedocs'),
        instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select contributors from the settings panel.', 'wedocs')
      });
    }

    // Use actual contributors or fallback to demo data
    let displayContributors = actualContributors;
    if (!displayContributors || displayContributors.length === 0) {
      // Fallback to demo data for new posts or when no contributors found
      displayContributors = [{
        id: 1,
        name: 'Demo Author',
        avatar_urls: {
          48: weDocsAdminScriptVars.assetsUrl + "/img/demo_avatar/avatar_2.png"
        }
      }];
    }
    const avatarStyle = {
      width: attributes.avatarSize,
      height: attributes.avatarSize,
      borderRadius: attributes.avatarShape === 'circle' ? '50%' : attributes.avatarShape === 'rounded' ? attributes.avatarBorderRadius : '0',
      borderStyle: attributes.avatarBorderStyle !== 'none' ? attributes.avatarBorderStyle : undefined,
      borderColor: attributes.avatarBorderStyle !== 'none' ? attributes.avatarBorderColor : undefined,
      borderWidth: attributes.avatarBorderStyle !== 'none' ? `${attributes.avatarBorderWidth?.top || '2px'} ${attributes.avatarBorderWidth?.right || '2px'} ${attributes.avatarBorderWidth?.bottom || '2px'} ${attributes.avatarBorderWidth?.left || '2px'}` : undefined,
      padding: `${attributes.avatarPadding?.top || '0px'} ${attributes.avatarPadding?.right || '0px'} ${attributes.avatarPadding?.bottom || '0px'} ${attributes.avatarPadding?.left || '0px'}`,
      margin: `${attributes.avatarMargin?.top || '0px'} ${attributes.avatarMargin?.right || '8px'} ${attributes.avatarMargin?.bottom || '0px'} ${attributes.avatarMargin?.left || '0px'}`,
      boxShadow: attributes.avatarBoxShadow?.enabled ? `${attributes.avatarBoxShadow.horizontal} ${attributes.avatarBoxShadow.vertical} ${attributes.avatarBoxShadow.blur} ${attributes.avatarBoxShadow.spread} ${attributes.avatarBoxShadow.color}` : undefined
    };
    const titleStyle = {
      color: attributes.contributorTitleColor,
      fontSize: attributes.contributorTitleTypography.fontSize,
      fontWeight: attributes.contributorTitleTypography.fontWeight,
      fontStyle: attributes.contributorTitleTypography.fontStyle,
      fontFamily: attributes.contributorTitleTypography.fontFamily !== 'default' ? attributes.contributorTitleTypography.fontFamily : undefined,
      lineHeight: attributes.contributorTitleTypography.lineHeight !== 'normal' ? attributes.contributorTitleTypography.lineHeight : undefined,
      letterSpacing: attributes.contributorTitleTypography.letterSpacing !== 'normal' ? attributes.contributorTitleTypography.letterSpacing : undefined,
      textTransform: attributes.contributorTitleTypography.textTransform !== 'none' ? attributes.contributorTitleTypography.textTransform : undefined,
      textDecoration: attributes.contributorTitleTypography.textDecoration !== 'none' ? attributes.contributorTitleTypography.textDecoration : undefined,
      padding: `${attributes.titlePadding?.top || '0px'} ${attributes.titlePadding?.right || '0px'} ${attributes.titlePadding?.bottom || '10px'} ${attributes.titlePadding?.left || '0px'}`,
      margin: `${attributes.titleMargin?.top || '0px'} ${attributes.titleMargin?.right || '0px'} ${attributes.titleMargin?.bottom || '0px'} ${attributes.titleMargin?.left || '0px'}`
    };
    const nameStyle = {
      color: attributes.nameColor,
      fontSize: attributes.nameTypography.fontSize,
      fontWeight: attributes.nameTypography.fontWeight,
      fontStyle: attributes.nameTypography.fontStyle,
      fontFamily: attributes.nameTypography.fontFamily !== 'default' ? attributes.nameTypography.fontFamily : undefined,
      lineHeight: attributes.nameTypography.lineHeight !== 'normal' ? attributes.nameTypography.lineHeight : undefined,
      letterSpacing: attributes.nameTypography.letterSpacing !== 'normal' ? attributes.nameTypography.letterSpacing : undefined,
      textTransform: attributes.nameTypography.textTransform !== 'none' ? attributes.nameTypography.textTransform : undefined,
      textDecoration: attributes.nameTypography.textDecoration !== 'none' ? attributes.nameTypography.textDecoration : undefined,
      padding: `${attributes.namePadding?.top || '0px'} ${attributes.namePadding?.right || '0px'} ${attributes.namePadding?.bottom || '0px'} ${attributes.namePadding?.left || '0px'}`,
      margin: `${attributes.nameMargin?.top || '0px'} ${attributes.nameMargin?.right || '0px'} ${attributes.nameMargin?.bottom || '0px'} ${attributes.nameMargin?.left || '0px'}`
    };
    const dateStyle = {
      color: attributes.dateColor,
      fontSize: attributes.dateTypography.fontSize,
      fontWeight: attributes.dateTypography.fontWeight,
      fontStyle: attributes.dateTypography.fontStyle,
      fontFamily: attributes.dateTypography.fontFamily !== 'default' ? attributes.dateTypography.fontFamily : undefined,
      lineHeight: attributes.dateTypography.lineHeight !== 'normal' ? attributes.dateTypography.lineHeight : undefined,
      letterSpacing: attributes.dateTypography.letterSpacing !== 'normal' ? attributes.dateTypography.letterSpacing : undefined,
      textTransform: attributes.dateTypography.textTransform !== 'none' ? attributes.dateTypography.textTransform : undefined,
      textDecoration: attributes.dateTypography.textDecoration !== 'none' ? attributes.dateTypography.textDecoration : undefined,
      padding: `${attributes.datePadding?.top || '0px'} ${attributes.datePadding?.right || '0px'} ${attributes.datePadding?.bottom || '0px'} ${attributes.datePadding?.left || '0px'}`,
      margin: `${attributes.dateMargin?.top || '10px'} ${attributes.dateMargin?.right || '0px'} ${attributes.dateMargin?.bottom || '0px'} ${attributes.dateMargin?.left || '0px'}`
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      children: [attributes.showTitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h3", {
        style: titleStyle,
        children: attributes.title
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: attributes.contributorGap || '10px'
        },
        children: attributes.showAvatar && displayContributors.map(contributor => {
          // Handle both API response format and demo format
          const contributorName = contributor.name || contributor.display_name || 'Unknown';
          const contributorId = contributor.id || contributor.ID || Math.random();
          // Get avatar URL with fallbacks
          let avatarUrl = weDocsAdminScriptVars.assetsUrl + "/img/demo_avatar/avatar_1.png";
          if (contributor.avatar_urls) {
            avatarUrl = contributor.avatar_urls[48] || contributor.avatar_urls[96] || contributor.avatar_urls[24];
          }

          // If no avatar URL and we have an email, use Gravatar
          if (!avatarUrl && contributor.email) {
            try {
              const emailHash = btoa(contributor.email.toLowerCase().trim());
              avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=48&d=identicon`;
            } catch (e) {
              avatarUrl = weDocsAdminScriptVars.assetsUrl + "/img/demo_avatar/avatar_1.png";
            }
          }
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            style: {
              display: 'flex',
              alignItems: 'center'
            },
            children: [attributes.avatarType === 'user_avatar' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("img", {
              src: avatarUrl,
              alt: contributorName,
              style: avatarStyle
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
              style: {
                ...avatarStyle,
                backgroundColor: '#0073aa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("svg", {
                width: "16",
                height: "16",
                fill: "white",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
              style: nameStyle,
              children: contributorName
            })]
          }, contributorId);
        })
      }), attributes.showLastUpdated && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        style: dateStyle,
        children: [attributes.datePrefix, " ", new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })]
      })]
    });
  };
  const setupTabContent = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('General Settings', 'wedocs'),
      initialOpen: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Title', 'wedocs'),
        checked: attributes.showTitle,
        onChange: value => setAttributes({
          showTitle: value
        })
      }), attributes.showTitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title', 'wedocs'),
        value: attributes.title,
        onChange: value => setAttributes({
          title: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Contributor Display', 'wedocs'),
        value: attributes.contributorDisplayMode,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show all contributors', 'wedocs'),
          value: 'all'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Manually select contributors', 'wedocs'),
          value: 'manual'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show only main author', 'wedocs'),
          value: 'main_author'
        }],
        onChange: value => setAttributes({
          contributorDisplayMode: value
        })
      }), attributes.contributorDisplayMode === 'manual' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h4", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select Contributors', 'wedocs')
        }), isLoadingUsers ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          style: {
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '10px'
          },
          children: users.map(user => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("label", {
            style: {
              display: 'block',
              marginBottom: '5px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input", {
              type: "checkbox",
              checked: attributes.selectedContributors.includes(user.id),
              onChange: e => {
                const newSelected = e.target.checked ? [...attributes.selectedContributors, user.id] : attributes.selectedContributors.filter(id => id !== user.id);
                setAttributes({
                  selectedContributors: newSelected
                });
              },
              style: {
                marginRight: '8px'
              }
            }), user.name]
          }, user.id))
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Settings', 'wedocs'),
      initialOpen: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Avatar', 'wedocs'),
        checked: attributes.showAvatar,
        onChange: value => setAttributes({
          showAvatar: value
        })
      }), attributes.showAvatar && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RadioControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Type', 'wedocs'),
          selected: attributes.avatarType,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('User Avatar', 'wedocs'),
            value: 'user_avatar'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Common Icon', 'wedocs'),
            value: 'common_icon'
          }],
          onChange: value => setAttributes({
            avatarType: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Shape', 'wedocs'),
          value: attributes.avatarShape,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Circle', 'wedocs'),
            value: 'circle'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Rounded', 'wedocs'),
            value: 'rounded'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Square', 'wedocs'),
            value: 'square'
          }],
          onChange: value => setAttributes({
            avatarShape: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Effect', 'wedocs'),
          checked: attributes.avatarHoverEffect,
          onChange: value => setAttributes({
            avatarHoverEffect: value
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date Settings', 'wedocs'),
      initialOpen: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Last Updated Date', 'wedocs'),
        checked: attributes.showLastUpdated,
        onChange: value => setAttributes({
          showLastUpdated: value
        })
      }), attributes.showLastUpdated && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RadioControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date Format', 'wedocs'),
          selected: attributes.dateFormat,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WordPress Default', 'wedocs'),
            value: 'wp_default'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Format', 'wedocs'),
            value: 'custom'
          }],
          onChange: value => setAttributes({
            dateFormat: value
          })
        }), attributes.dateFormat === 'custom' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Date Format', 'wedocs'),
          value: attributes.customDateFormat,
          onChange: value => setAttributes({
            customDateFormat: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Use PHP date format. E.g., F j, Y for "January 1, 2023"', 'wedocs')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date Prefix Text', 'wedocs'),
          value: attributes.datePrefix,
          onChange: value => setAttributes({
            datePrefix: value
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Advanced', 'wedocs'),
      initialOpen: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Additional CSS Classes', 'wedocs'),
        value: attributes.additionalCssClass,
        onChange: value => setAttributes({
          additionalCssClass: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Separate multiple classes with spaces', 'wedocs')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Schema Markup', 'wedocs'),
        checked: attributes.enableSchema,
        onChange: value => setAttributes({
          enableSchema: value
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Output structured data for author and dateModified', 'wedocs')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Link Behavior', 'wedocs'),
        value: attributes.linkBehavior,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link to user profile', 'wedocs'),
          value: 'user_profile'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No link', 'wedocs'),
          value: 'no_link'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom link', 'wedocs'),
          value: 'custom_link'
        }],
        onChange: value => setAttributes({
          linkBehavior: value
        })
      }), attributes.linkBehavior === 'custom_link' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Link URL', 'wedocs'),
        value: attributes.customLinkUrl,
        onChange: value => setAttributes({
          customLinkUrl: value
        }),
        placeholder: "https://example.com/author"
      })]
    })]
  });
  const styleTabContent = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_BackgroundControl__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Container Background', 'wedocs'),
      backgroundType: attributes.backgroundType,
      onBackgroundTypeChange: value => setAttributes({
        backgroundType: value
      }),
      backgroundColor: attributes.backgroundColor,
      onBackgroundColorChange: value => setAttributes({
        backgroundColor: value
      }),
      backgroundGradient: attributes.backgroundGradient,
      onBackgroundGradientChange: value => setAttributes({
        backgroundGradient: value
      }),
      backgroundImage: attributes.backgroundImage,
      onBackgroundImageChange: value => setAttributes({
        backgroundImage: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_SpacingControl__WEBPACK_IMPORTED_MODULE_8__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Container Spacing', 'wedocs'),
      paddingValue: attributes.padding,
      onPaddingChange: value => setAttributes({
        padding: value
      }),
      marginValue: attributes.margin,
      onMarginChange: value => setAttributes({
        margin: value
      }),
      showGap: true,
      gapValue: attributes.contributorGap,
      onGapChange: value => setAttributes({
        contributorGap: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_BorderControl__WEBPACK_IMPORTED_MODULE_9__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Container Border', 'wedocs'),
      borderStyle: attributes.borderStyle,
      onBorderStyleChange: value => setAttributes({
        borderStyle: value
      }),
      borderWidth: attributes.borderWidth,
      onBorderWidthChange: value => setAttributes({
        borderWidth: value
      }),
      borderColor: attributes.borderColor,
      onBorderColorChange: value => setAttributes({
        borderColor: value
      }),
      borderRadius: attributes.borderRadius,
      onBorderRadiusChange: value => setAttributes({
        borderRadius: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_ShadowControl__WEBPACK_IMPORTED_MODULE_11__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Container Shadow', 'wedocs'),
      shadowValue: attributes.boxShadow,
      onShadowChange: value => setAttributes({
        boxShadow: value
      })
    }), attributes.showTitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_TypographyControl__WEBPACK_IMPORTED_MODULE_7__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Typography', 'wedocs'),
        value: attributes.contributorTitleTypography,
        onChange: value => setAttributes({
          contributorTitleTypography: value
        }),
        colorValue: attributes.contributorTitleColor,
        onColorChange: value => setAttributes({
          contributorTitleColor: value
        }),
        hoverColorValue: attributes.contributorTitleHoverColor,
        onHoverColorChange: value => setAttributes({
          contributorTitleHoverColor: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_SpacingControl__WEBPACK_IMPORTED_MODULE_8__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Spacing', 'wedocs'),
        paddingValue: attributes.titlePadding,
        onPaddingChange: value => setAttributes({
          titlePadding: value
        }),
        marginValue: attributes.titleMargin,
        onMarginChange: value => setAttributes({
          titleMargin: value
        }),
        showGap: false
      })]
    }), attributes.showAvatar && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_DimensionControl__WEBPACK_IMPORTED_MODULE_12__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Size', 'wedocs'),
        widthValue: attributes.avatarSize,
        onWidthChange: value => setAttributes({
          avatarSize: value
        }),
        showHeight: false
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_SpacingControl__WEBPACK_IMPORTED_MODULE_8__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Spacing', 'wedocs'),
        paddingValue: attributes.avatarPadding,
        onPaddingChange: value => setAttributes({
          avatarPadding: value
        }),
        marginValue: attributes.avatarMargin,
        onMarginChange: value => setAttributes({
          avatarMargin: value
        }),
        showGap: false
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_BorderControl__WEBPACK_IMPORTED_MODULE_9__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Border', 'wedocs'),
        borderStyle: attributes.avatarBorderStyle,
        onBorderStyleChange: value => setAttributes({
          avatarBorderStyle: value
        }),
        borderWidth: attributes.avatarBorderWidth,
        onBorderWidthChange: value => setAttributes({
          avatarBorderWidth: value
        }),
        borderColor: attributes.avatarBorderColor,
        onBorderColorChange: value => setAttributes({
          avatarBorderColor: value
        }),
        borderRadius: attributes.avatarBorderRadius,
        onBorderRadiusChange: value => setAttributes({
          avatarBorderRadius: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_ShadowControl__WEBPACK_IMPORTED_MODULE_11__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Avatar Shadow', 'wedocs'),
        shadowValue: attributes.avatarBoxShadow,
        onShadowChange: value => setAttributes({
          avatarBoxShadow: value
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_TypographyControl__WEBPACK_IMPORTED_MODULE_7__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Name Typography', 'wedocs'),
      value: attributes.nameTypography,
      onChange: value => setAttributes({
        nameTypography: value
      }),
      colorValue: attributes.nameColor,
      onColorChange: value => setAttributes({
        nameColor: value
      }),
      hoverColorValue: attributes.nameHoverColor,
      onHoverColorChange: value => setAttributes({
        nameHoverColor: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_SpacingControl__WEBPACK_IMPORTED_MODULE_8__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Name Spacing', 'wedocs'),
      paddingValue: attributes.namePadding,
      onPaddingChange: value => setAttributes({
        namePadding: value
      }),
      marginValue: attributes.nameMargin,
      onMarginChange: value => setAttributes({
        nameMargin: value
      }),
      showGap: false
    }), attributes.showLastUpdated && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_TypographyControl__WEBPACK_IMPORTED_MODULE_7__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date Typography', 'wedocs'),
        value: attributes.dateTypography,
        onChange: value => setAttributes({
          dateTypography: value
        }),
        colorValue: attributes.dateColor,
        onColorChange: value => setAttributes({
          dateColor: value
        }),
        showHoverColor: false
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_SpacingControl__WEBPACK_IMPORTED_MODULE_8__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date Spacing', 'wedocs'),
        paddingValue: attributes.datePadding,
        onPaddingChange: value => setAttributes({
          datePadding: value
        }),
        marginValue: attributes.dateMargin,
        onMarginChange: value => setAttributes({
          dateMargin: value
        }),
        showGap: false
      })]
    })]
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_components_TabSystem__WEBPACK_IMPORTED_MODULE_6__["default"], {
        defaultTab: "setup",
        children: [setupTabContent(), styleTabContent()]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      ...blockProps,
      children: renderPreview()
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/Contributors/index.js":
/*!******************************************!*\
  !*** ./src/blocks/Contributors/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/Contributors/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/Contributors/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/Contributors/style.scss");




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

/***/ "./src/blocks/Contributors/style.scss":
/*!********************************************!*\
  !*** ./src/blocks/Contributors/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/components/BackgroundControl.js":
/*!****************************************************!*\
  !*** ./src/blocks/components/BackgroundControl.js ***!
  \****************************************************/
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




const BackgroundControl = ({
  label,
  backgroundType = 'classic',
  onBackgroundTypeChange,
  backgroundColor,
  onBackgroundColorChange,
  backgroundGradient,
  onBackgroundGradientChange,
  backgroundImage = {},
  onBackgroundImageChange,
  showGradient = true,
  showImage = true
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: false,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Type', 'wedocs'),
      selected: backgroundType,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Classic', 'wedocs'),
        value: 'classic'
      }, ...(showGradient ? [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gradient', 'wedocs'),
        value: 'gradient'
      }] : [])],
      onChange: onBackgroundTypeChange
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
      marginTop: 4,
      marginBottom: 4
    }), backgroundType === 'classic' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Color', 'wedocs'),
      colorSettings: [{
        value: backgroundColor,
        onChange: onBackgroundColorChange,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'wedocs')
      }]
    }), backgroundType === 'gradient' && showGradient && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gradient CSS', 'wedocs'),
      value: backgroundGradient || '',
      onChange: onBackgroundGradientChange,
      placeholder: "linear-gradient(45deg, #ff0000, #00ff00)",
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter CSS gradient value', 'wedocs')
    }), showImage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h4", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Image', 'wedocs')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
            onSelect: media => onBackgroundImageChange({
              url: media.url,
              alt: media.alt,
              id: media.id
            }),
            allowedTypes: ['image'],
            value: backgroundImage?.id,
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              onClick: open,
              variant: "secondary",
              children: backgroundImage?.url ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Change Image', 'wedocs') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select Image', 'wedocs')
            })
          })
        }), backgroundImage?.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
            marginTop: 2,
            marginBottom: 2
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            onClick: () => onBackgroundImageChange({
              url: '',
              alt: '',
              id: ''
            }),
            variant: "secondary",
            isDestructive: true,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove Image', 'wedocs')
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackgroundControl);

/***/ }),

/***/ "./src/blocks/components/BorderControl.js":
/*!************************************************!*\
  !*** ./src/blocks/components/BorderControl.js ***!
  \************************************************/
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




const BorderControl = ({
  label,
  borderStyle = 'none',
  onBorderStyleChange,
  borderWidth = {},
  onBorderWidthChange,
  borderColor,
  onBorderColorChange,
  borderRadius,
  onBorderRadiusChange,
  showIndividualSides = true
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: false,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Style', 'wedocs'),
      value: borderStyle,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'wedocs'),
        value: 'none'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Solid', 'wedocs'),
        value: 'solid'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dashed', 'wedocs'),
        value: 'dashed'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dotted', 'wedocs'),
        value: 'dotted'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Double', 'wedocs'),
        value: 'double'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Groove', 'wedocs'),
        value: 'groove'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ridge', 'wedocs'),
        value: 'ridge'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Inset', 'wedocs'),
        value: 'inset'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Outset', 'wedocs'),
        value: 'outset'
      }],
      onChange: onBorderStyleChange
    }), borderStyle !== 'none' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      }), showIndividualSides ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Width', 'wedocs'),
        values: borderWidth,
        onChange: onBorderWidthChange,
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }],
        allowReset: true,
        resetValues: {
          top: '1px',
          right: '1px',
          bottom: '1px',
          left: '1px'
        }
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Width', 'wedocs'),
        value: borderWidth.top || '1px',
        onChange: newValue => onBorderWidthChange({
          top: newValue,
          right: newValue,
          bottom: newValue,
          left: newValue
        }),
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', 'wedocs'),
        colorSettings: [{
          value: borderColor,
          onChange: onBorderColorChange,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'wedocs')
        }]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
      marginTop: 4,
      marginBottom: 4
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Radius', 'wedocs'),
      value: borderRadius || '0px',
      onChange: onBorderRadiusChange,
      units: [{
        value: 'px',
        label: 'px'
      }, {
        value: 'em',
        label: 'em'
      }, {
        value: 'rem',
        label: 'rem'
      }, {
        value: '%',
        label: '%'
      }]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BorderControl);

/***/ }),

/***/ "./src/blocks/components/DimensionControl.js":
/*!***************************************************!*\
  !*** ./src/blocks/components/DimensionControl.js ***!
  \***************************************************/
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



const DimensionControl = ({
  label,
  widthValue,
  onWidthChange,
  heightValue,
  onHeightChange,
  showHeight = true,
  linkValues = false
}) => {
  const handleWidthChange = newValue => {
    onWidthChange(newValue);
    if (linkValues && showHeight && onHeightChange) {
      onHeightChange(newValue);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: false,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Width', 'wedocs'),
      value: widthValue || 'auto',
      onChange: handleWidthChange,
      units: [{
        value: 'px',
        label: 'px'
      }, {
        value: 'em',
        label: 'em'
      }, {
        value: 'rem',
        label: 'rem'
      }, {
        value: '%',
        label: '%'
      }, {
        value: 'auto',
        label: 'auto'
      }]
    }), showHeight && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 3,
        marginBottom: 3
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Height', 'wedocs'),
        value: heightValue || 'auto',
        onChange: onHeightChange,
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }, {
          value: '%',
          label: '%'
        }, {
          value: 'auto',
          label: 'auto'
        }]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DimensionControl);

/***/ }),

/***/ "./src/blocks/components/ShadowControl.js":
/*!************************************************!*\
  !*** ./src/blocks/components/ShadowControl.js ***!
  \************************************************/
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




const ShadowControl = ({
  label,
  shadowValue = {},
  onShadowChange,
  showToggle = true
}) => {
  var _shadowValue$enabled;
  const updateShadow = (key, newValue) => {
    onShadowChange({
      ...shadowValue,
      [key]: newValue
    });
  };
  const enabled = (_shadowValue$enabled = shadowValue.enabled) !== null && _shadowValue$enabled !== void 0 ? _shadowValue$enabled : false;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: false,
    children: [showToggle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Box Shadow', 'wedocs'),
        checked: enabled,
        onChange: value => updateShadow('enabled', value)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      })]
    }), (enabled || !showToggle) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal Offset', 'wedocs'),
        value: shadowValue.horizontal || '0px',
        onChange: value => updateShadow('horizontal', value),
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 3,
        marginBottom: 3
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical Offset', 'wedocs'),
        value: shadowValue.vertical || '2px',
        onChange: value => updateShadow('vertical', value),
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 3,
        marginBottom: 3
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blur Radius', 'wedocs'),
        value: shadowValue.blur || '4px',
        onChange: value => updateShadow('blur', value),
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 3,
        marginBottom: 3
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Spread Radius', 'wedocs'),
        value: shadowValue.spread || '0px',
        onChange: value => updateShadow('spread', value),
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shadow Color', 'wedocs'),
        colorSettings: [{
          value: shadowValue.color || 'rgba(0,0,0,0.1)',
          onChange: value => updateShadow('color', value),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color', 'wedocs')
        }]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShadowControl);

/***/ }),

/***/ "./src/blocks/components/SpacingControl.js":
/*!*************************************************!*\
  !*** ./src/blocks/components/SpacingControl.js ***!
  \*************************************************/
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



const SpacingControl = ({
  label,
  paddingValue = {},
  onPaddingChange,
  marginValue = {},
  onMarginChange,
  showPadding = true,
  showMargin = true,
  showGap = false,
  gapValue,
  onGapChange
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: false,
    children: [showPadding && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'wedocs'),
        values: paddingValue,
        onChange: onPaddingChange,
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }, {
          value: '%',
          label: '%'
        }],
        allowReset: true,
        resetValues: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      })]
    }), showMargin && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Margin', 'wedocs'),
        values: marginValue,
        onChange: onMarginChange,
        units: [{
          value: 'px',
          label: 'px'
        }, {
          value: 'em',
          label: 'em'
        }, {
          value: 'rem',
          label: 'rem'
        }, {
          value: '%',
          label: '%'
        }],
        allowReset: true,
        resetValues: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
        marginTop: 4,
        marginBottom: 4
      })]
    }), showGap && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gap', 'wedocs'),
      value: gapValue || '10px',
      onChange: onGapChange,
      units: [{
        value: 'px',
        label: 'px'
      }, {
        value: 'em',
        label: 'em'
      }, {
        value: 'rem',
        label: 'rem'
      }]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpacingControl);

/***/ }),

/***/ "./src/blocks/components/TabSystem.js":
/*!********************************************!*\
  !*** ./src/blocks/components/TabSystem.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const TabSystem = ({
  children,
  defaultTab = 'setup'
}) => {
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultTab);
  const tabs = [{
    key: 'setup',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Setup', 'wedocs'),
    icon: 'admin-settings'
  }, {
    key: 'style',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Style', 'wedocs'),
    icon: 'admin-appearance'
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "contributors-tab-system",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      style: {
        borderBottom: '1px solid #ddd',
        marginBottom: '16px',
        paddingBottom: '8px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
        children: tabs.map(tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: activeTab === tab.key ? 'primary' : 'secondary',
          onClick: () => setActiveTab(tab.key),
          style: {
            marginRight: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: `dashicons dashicons-${tab.icon}`,
            style: {
              fontSize: '16px'
            }
          }), tab.label]
        }, tab.key))
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "tab-content",
      children: children.map((child, index) => {
        const tabKey = index === 0 ? 'setup' : 'style';
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          style: {
            display: activeTab === tabKey ? 'block' : 'none'
          },
          children: child
        }, tabKey);
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabSystem);

/***/ }),

/***/ "./src/blocks/components/TypographyControl.js":
/*!****************************************************!*\
  !*** ./src/blocks/components/TypographyControl.js ***!
  \****************************************************/
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




const TypographyControl = ({
  label,
  value = {},
  onChange,
  colorValue,
  onColorChange,
  hoverColorValue,
  onHoverColorChange,
  showHoverColor = true,
  showLineHeight = true,
  showLetterSpacing = true,
  showTextTransform = true,
  showTextDecoration = true
}) => {
  const updateTypography = (key, newValue) => {
    onChange({
      ...value,
      [key]: newValue
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: false,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Colors', 'wedocs'),
      colorSettings: [{
        value: colorValue,
        onChange: onColorChange,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text Color', 'wedocs')
      }, ...(showHoverColor ? [{
        value: hoverColorValue,
        onChange: onHoverColorChange,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Color', 'wedocs')
      }] : [])]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalSpacer, {
      marginTop: 4,
      marginBottom: 4
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Family', 'wedocs'),
      value: value.fontFamily || 'default',
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'wedocs'),
        value: 'default'
      }, {
        label: 'Arial',
        value: 'Arial, sans-serif'
      }, {
        label: 'Georgia',
        value: 'Georgia, serif'
      }, {
        label: 'Helvetica',
        value: 'Helvetica, sans-serif'
      }, {
        label: 'Times New Roman',
        value: '"Times New Roman", serif'
      }, {
        label: 'Verdana',
        value: 'Verdana, sans-serif'
      }, {
        label: 'Roboto',
        value: 'Roboto, sans-serif'
      }, {
        label: 'Open Sans',
        value: '"Open Sans", sans-serif'
      }, {
        label: 'Lato',
        value: 'Lato, sans-serif'
      }, {
        label: 'Montserrat',
        value: 'Montserrat, sans-serif'
      }],
      onChange: newValue => updateTypography('fontFamily', newValue === 'default' ? undefined : newValue)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Size', 'wedocs'),
      value: value.fontSize || '14px',
      onChange: newValue => updateTypography('fontSize', newValue),
      units: [{
        value: 'px',
        label: 'px'
      }, {
        value: 'em',
        label: 'em'
      }, {
        value: 'rem',
        label: 'rem'
      }, {
        value: '%',
        label: '%'
      }]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Weight', 'wedocs'),
      value: value.fontWeight || '400',
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('100 - Thin', 'wedocs'),
        value: '100'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('200 - Extra Light', 'wedocs'),
        value: '200'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('300 - Light', 'wedocs'),
        value: '300'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('400 - Normal', 'wedocs'),
        value: '400'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('500 - Medium', 'wedocs'),
        value: '500'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('600 - Semi Bold', 'wedocs'),
        value: '600'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('700 - Bold', 'wedocs'),
        value: '700'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('800 - Extra Bold', 'wedocs'),
        value: '800'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('900 - Black', 'wedocs'),
        value: '900'
      }],
      onChange: newValue => updateTypography('fontWeight', newValue)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font Style', 'wedocs'),
      value: value.fontStyle || 'normal',
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Normal', 'wedocs'),
        value: 'normal'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Italic', 'wedocs'),
        value: 'italic'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Oblique', 'wedocs'),
        value: 'oblique'
      }],
      onChange: newValue => updateTypography('fontStyle', newValue)
    }), showLineHeight && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Line Height', 'wedocs'),
      value: value.lineHeight || 'normal',
      onChange: newValue => updateTypography('lineHeight', newValue),
      units: [{
        value: 'px',
        label: 'px'
      }, {
        value: 'em',
        label: 'em'
      }, {
        value: '',
        label: 'unitless'
      }]
    }), showLetterSpacing && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalUnitControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Letter Spacing', 'wedocs'),
      value: value.letterSpacing || 'normal',
      onChange: newValue => updateTypography('letterSpacing', newValue),
      units: [{
        value: 'px',
        label: 'px'
      }, {
        value: 'em',
        label: 'em'
      }]
    }), showTextTransform && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text Transform', 'wedocs'),
      value: value.textTransform || 'none',
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'wedocs'),
        value: 'none'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uppercase', 'wedocs'),
        value: 'uppercase'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Lowercase', 'wedocs'),
        value: 'lowercase'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Capitalize', 'wedocs'),
        value: 'capitalize'
      }],
      onChange: newValue => updateTypography('textTransform', newValue)
    }), showTextDecoration && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text Decoration', 'wedocs'),
      value: value.textDecoration || 'none',
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'wedocs'),
        value: 'none'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Underline', 'wedocs'),
        value: 'underline'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Overline', 'wedocs'),
        value: 'overline'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Line Through', 'wedocs'),
        value: 'line-through'
      }],
      onChange: newValue => updateTypography('textDecoration', newValue)
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypographyControl);

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
/******/ 			"blocks/Contributors/index": 0,
/******/ 			"blocks/Contributors/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/Contributors/style-index"], () => (__webpack_require__("./src/blocks/Contributors/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map