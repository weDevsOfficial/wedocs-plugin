!function(){"use strict";var e,t,s,r={3104:function(e,t,s){s.d(t,{Z:function(){return _}});var r=s(9818);const n={docs:[],pages:[],parents:[],loading:!1,sorting:!1,userDocIds:[],helpfulDocs:[],needSorting:!1};const o={setDocs(e){return{type:"SET_DOCS",docs:e}},setDoc(e){return{type:"SET_DOC",doc:e}},setParentDocs(e){return{type:"SET_PARENT_DOCS",parents:e}},setPages(e){return{type:"SET_PAGES",pages:e}},setLoading(e){return{type:"SET_LOADING",loading:e}},setSortingStatus(e){return{type:"SET_SORTING_STATUS",sorting:e}},setNeedSortingStatus(e){return{type:"SET_NEED_SORTING_STATUS",needSorting:e}},setUserDocIds(e){return{type:"SET_USER_DOC_IDS",userDocIds:e}},fetchFromAPI(e){return{type:"FETCH_FROM_API",path:e}},setHelpfulDocs(e){return{type:"SET_HELPFUL_DOCS",helpfulDocs:e}},createDocsToAPI(e){return{type:"UPDATE_TO_API",path:"/wp/v2/docs",data:e}},*createDoc(e){const t=yield o.createDocsToAPI(e);return yield o.setDoc(t),t},*updateDoc(e,t){const s="/wp/v2/docs/"+e;yield{type:"UPDATE_TO_API",path:s,data:t};const r=yield o.fetchFromAPI("/wp/v2/docs?per_page=-1&status=publish,draft,private"),n=r.filter((e=>!e.parent)),a=n?.sort(((e,t)=>e.menu_order-t.menu_order));return yield o.setParentDocs(a),o.setDocs(r)},*updateDocs(e){yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/update_docs_status",data:e};const t=yield o.fetchFromAPI("/wp/v2/docs?per_page=-1&status=publish,draft,private"),s=t.filter((e=>!e.parent)),r=s?.sort(((e,t)=>e.menu_order-t.menu_order));return yield o.setParentDocs(r),o.setDocs(t)},*updateNeedSortingStatus(e){yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/need_sorting_status",data:e};const t=yield o.fetchFromAPI("/wp/v2/docs/need_sorting_status");return o.setNeedSortingStatus(t)},*updateSortingStatus(e){yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/sorting_status",data:e};const t=yield o.fetchFromAPI("/wp/v2/docs/sorting_status");return yield o.setNeedSortingStatus(t),o.setSortingStatus(t)},*updateDocMeta(e,t){const s="/wp/v2/docs/"+e+"/meta";return yield{type:"UPDATE_TO_API",path:s,data:t}},*deleteDoc(e){const t="/wp/v2/docs/"+e;yield{type:"DELETE_TO_API",path:t};const s=yield o.fetchFromAPI("/wp/v2/docs?per_page=-1&status=publish,draft,private"),r=s.filter((e=>!e.parent)),n=r?.sort(((e,t)=>e.menu_order-t.menu_order));return yield o.setParentDocs(n),o.setDocs(s)},*updateParentDocs(e){const t=e.filter((e=>!e.parent)),s=t?.sort(((e,t)=>e.menu_order-t.menu_order));return yield o.setParentDocs(s),o.setDocs(e)},*sendMessage(e){return yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/message",data:e}}};var a=o,i=s(6989),d=s.n(i),c={FETCH_FROM_API(e){return d()({path:e.path})},UPDATE_TO_API(e){return d()({path:e.path,data:e.data,method:"POST"})},DELETE_TO_API(e){return d()({path:e.path,method:"DELETE"})}};const u="undefined"!=typeof weDocsAdminVars&&Boolean(weDocsAdminVars?.hasManageCap),g=wp.hooks.applyFilters("wedocs_documentation_fetching_path","/wp/v2/docs?per_page=-1&status=publish"+(u?",draft":"")),p={*getDocs(){yield a.setLoading(!0);const e=yield a.fetchFromAPI(g);return yield a.setDocs(e),a.setLoading(!1)},*getParentDocs(){yield a.setLoading(!0);const e=yield a.fetchFromAPI(g);yield a.setDocs(e);const t=e.filter((e=>!e.parent)),s=t?.sort(((e,t)=>e.menu_order-t.menu_order));return yield a.setParentDocs(s),a.setLoading(!1)},*getDoc(e){yield a.setLoading(!0);const t=yield a.fetchFromAPI(g);return yield a.setDocs(t),a.setLoading(!1)},*getPages(){yield a.setLoading(!0);const e=yield a.fetchFromAPI("/wp/v2/pages");return yield a.setPages(e),a.setLoading(!1)},*getSortingStatus(){yield a.setLoading(!0);const e=yield a.fetchFromAPI("/wp/v2/docs/sorting_status");return yield a.setSortingStatus(e),a.setLoading(!1)},*getNeedSortingStatus(){yield a.setLoading(!0);const e=yield a.fetchFromAPI("/wp/v2/docs/need_sorting_status");return yield a.setNeedSortingStatus(e),a.setLoading(!1)},*getUserDocIds(){yield a.setLoading(!0);const e=yield a.fetchFromAPI("/wp/v2/docs/users/ids");return yield a.setUserDocIds(e),a.setLoading(!1)},*getSectionsDocs(e){const t=yield a.fetchFromAPI(g);return yield a.setDocs(t),a.setLoading(!1)},*getDocArticles(e){const t=yield a.fetchFromAPI(g);return yield a.setDocs(t),a.setLoading(!1)},*getHelpfulDocs(){yield a.setLoading(!0);const e=yield a.fetchFromAPI(g);yield a.setDocs(e);const t=yield a.fetchFromAPI("/wp/v2/docs/helpfulness"),s=e.sort(((e,s)=>t.indexOf(e.id)-t.indexOf(s.id))).filter((e=>t?.includes(e?.id)));yield a.setHelpfulDocs(s),yield a.setLoading(!1)}};var l=p,_=(0,r.createReduxStore)("wedocs/docs",{reducer:(e=n,t)=>{switch(t.type){case"SET_DOCS":return{...e,docs:[...t.docs]};case"SET_DOC":const s={...e,docs:[...e.docs,t.doc]};return t.doc.parent||(s.parents=[t.doc,...e.parents]),s;case"SET_USER_DOC_IDS":return{...e,userDocIds:[...e.userDocIds,...t.userDocIds]};case"SET_PAGES":return{...e,pages:[...t.pages]};case"SET_PARENT_DOCS":return{...e,parents:[...t.parents]};case"SET_LOADING":return{...e,loading:t.loading};case"SET_SORTING_STATUS":return{...e,sorting:t.sorting};case"SET_NEED_SORTING_STATUS":return{...e,needSorting:t.needSorting};case"SET_HELPFUL_DOCS":return{...e,helpfulDocs:t.helpfulDocs};default:return e}},selectors:{getDocs:e=>{const{docs:t}=e;return t},getParentDocs:e=>{const{parents:t}=e;return t},getDoc:(e,t)=>{const{docs:s}=e;return s.find((e=>e.id===t))},getPages:e=>{const{pages:t}=e;return t},getLoading:e=>{const{loading:t}=e;return t},getSortingStatus:e=>{const{sorting:t}=e;return t},getNeedSortingStatus:e=>{const{needSorting:t}=e;return t},getUserDocIds:e=>{const{userDocIds:t}=e;return t},getSectionsDocs:(e,t)=>{const{docs:s}=e,r=s.filter((e=>e.parent===t)),n=r?.sort(((e,t)=>e.menu_order-t.menu_order));return n},getDocArticles:(e,t)=>{const{docs:s}=e,r=s.filter((e=>e.parent===t)),n=[];r.forEach((e=>{const t=s.filter((t=>t.parent===e.id));n.push(...t)}));const o=n?.sort(((e,t)=>e.menu_order-t.menu_order));return o},getSectionArticles:(e,t)=>{const{docs:s}=e,r=s.filter((e=>e.parent===t)),n=r?.sort(((e,t)=>e.menu_order-t.menu_order));return n},getHelpfulDocs:e=>{const{helpfulDocs:t}=e;return t}},actions:a,resolvers:l,controls:c})},6172:function(e,t,s){s.d(t,{Z:function(){return _}});var r=s(9818);const n={roles:{},settings:{general:{docs_home:"",email:"on",email_to:"",helpful:"on",comments:"off",print:"on",collapse_articles:"off"},permission:{global_permission:["administrator"],role_wise_permission:["administrator"]},assistant:{assist_enable:"on",integrate_ai:{ai_enabled:"off",sync_data:"off",ai_response:{}},explore:{explore_enable:"on"},message:{messaging_enable:"on",turnstile_site_key:""},placement:{order:["integrate_ai","explore","message"]},preference:{color_settings:{preview_colors:{widgetBg:{r:99,g:102,b:241,a:1},activeTabBg:{r:255,g:255,b:255,a:1},activeTabFont:{r:55,g:65,b:81,a:1},inactiveTabBg:{r:67,g:56,b:202,a:1},inactiveTabFont:{r:199,g:210,b:254,a:1},tabTitleFont:{r:255,g:255,b:255,a:1},tabDescriptionFont:{r:199,g:210,b:254,a:1},breadcrumbColor:{r:67,g:56,b:202,a:1},bubbleBg:{r:87,g:116,b:241,a:1},bubbleIcon:{r:255,g:255,b:255,a:1}}}}},layout:{column:"2",nav_icon:"on",right_bar:"on",template:"default",active_text:{r:59,g:130,b:246,a:1},active_nav_bg:{r:59,g:130,b:246,a:1},active_nav_text:{r:255,g:255,b:255,a:1}}},loading:!1,saving:!1,needUpgrade:!1};const o={getSettings(e){const{settings:t}=e;return t},getSettingsOption(e,t){const{settings:s}=e;return s[t]},getGeneralSettingsOption(e,t){const{settings:s}=e;return s?.general?.[t]},getPermissionSettingsOption(e,t){const{settings:s}=e;return s?.permission?.[t]},getAssistantSettingsOption(e,t){const{settings:s}=e;return s?.assistant?.[t]},getRoles(e){const{roles:t}=e;return t},getLoading(e){const{loading:t}=e;return t},getUpgradeInfo(e){const{needUpgrade:t}=e;return t},getSaving(e){const{saving:t}=e;return t},getTurnstileSiteKey(e){const{settings:t}=e;return t?.assistant?.message?.turnstile_site_key}};var a=o;const i={setSettings(e){return{type:"SET_SETTINGS",settings:e}},setSettingsOption(e,t){return{type:"SET_SETTINGS_OPTION",option:e,value:t}},setLoading(e){return{type:"SET_LOADING",loading:e}},setUpgradeInfo(e){return{type:"SET_UPGRADE_INFO",needUpgrade:e}},setMigrateInfo(e){return{type:"SET_MIGRATE_INFO",needMigrate:e}},setSaving(e){return{type:"SET_SAVING",saving:e}},setRoles(e){return{type:"SET_ROLES",roles:e}},setTurnstileSiteKey(e){return{type:"SET_TURNSTILE_SITE_KEY",siteKey:e}},*updateSettings(e){const t=yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/settings",data:e};return yield i.setSettings(t.data),t.data},*wedocsUpgrade(e){const t=yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/upgrade",data:e};return yield i.setUpgradeInfo(!1),t},*makeUpdateDone(){return yield{type:"UPDATE_TO_API",path:"/wp/v2/docs/upgrade/done"}}};var d=i;const c={*getSettings(){yield d.setLoading(!0);const e=yield{type:"FETCH_SETTINGS"};return yield d.setSettings(e),d.setLoading(!1)},*getUpgradeInfo(){yield d.setLoading(!0);const e=yield{type:"FETCH_UPGRADE_INFO"};return yield d.setUpgradeInfo(e),d.setLoading(!1)},*getRoles(){yield d.setLoading(!0);const e=yield{type:"FETCH_ROLES"};return yield d.setRoles(e),d.setLoading(!1)},*getTurnstileSiteKey(){yield d.setLoading(!0);const e=yield{type:"FETCH_SITE_KEY"};return yield d.setTurnstileSiteKey(e),d.setLoading(!1)}};var u=c,g=s(6989),p=s.n(g),l={FETCH_SETTINGS(){return p()({path:"/wp/v2/docs/settings?data=wedocs_settings"})},FETCH_ROLES(){return p()({path:"/wp/v2/docs/users"})},FETCH_UPGRADE_INFO(){return p()({path:"/wp/v2/docs/upgrade"})},FETCH_SITE_KEY(){return p()({path:"/wp/v2/docs/settings/turnstile-site-key"})},UPDATE_TO_API(e){return p()({path:e.path,data:e.data,method:"POST"})}},_=(0,r.createReduxStore)("wedocs/settings",{reducer:(e=n,t)=>{switch(t.type){case"SET_SETTINGS":return{...e,settings:{...e.settings,...t.settings}};case"SET_LOADING":return{...e,loading:t.loading};case"SET_ROLES":return{...e,roles:t.roles};case"SET_SETTINGS_OPTION":return{...e,settings:{...e.settings,[t.option]:t.value}};case"SET_UPGRADE_INFO":return{...e,needUpgrade:t.needUpgrade};case"SET_SAVING":return{...e,saving:t.saving};case"SET_TURNSTILE_SITE_KEY":return{...e,settings:{...e.settings,assistant:{...e.settings.assistant,message:{...e.settings.assistant.message,turnstile_site_key:t.siteKey}}}};default:return e}},selectors:a,actions:d,resolvers:u,controls:l})},6989:function(e){e.exports=window.wp.apiFetch},9818:function(e){e.exports=window.wp.data}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var s=n[e]={exports:{}};return r[e](s,s.exports,o),s.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e=o(9818),t=o(3104),s=o(6172),(0,e.register)(t.Z),(0,e.register)(s.Z)}();