!function(){"use strict";var e,t={966:function(){var e=window.wp.blocks,t=window.wp.i18n,o=window.wp.element,r=window.wp.blockEditor,n=window.wp.components;(0,e.registerBlockType)("wedocs/wedocs-search",{attributes:{placeholder:{type:"string",default:"Search..."},alignment:{type:"string",default:"left"},bgColor:{type:"string",default:"#ffffff"},hoverColor:{type:"string"},padding:{type:"number",default:10},margin:{type:"number",default:10},borderColor:{type:"string",default:"#cccccc"},borderType:{type:"string",default:"solid"},borderWidth:{type:"number",default:1},borderRadius:{type:"number",default:5},iconColor:{type:"string",default:"#333333"},iconBgColor:{type:"string",default:"#ffffff"},iconHoverColor:{type:"string",default:"#666666"}},save:()=>(0,o.createElement)("form",{role:"search",method:"get",className:"search-form wedocs-search-form",action:""},(0,o.createElement)("div",{className:"wedocs-search-input"},(0,o.createElement)("input",{name:"s",type:"search",className:"search-field",value:"",title:"Search for:",placeholder:"Search for a topic or question"}),(0,o.createElement)("input",{type:"hidden",name:"post_type",value:"docs"}),(0,o.createElement)("button",{type:"submit",className:"search-submit"},(0,o.createElement)("svg",{width:"15",height:"16",fill:"none"},(0,o.createElement)("path",{fillRule:"evenodd",d:"M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z",fill:"#fff"}))))),edit:({attributes:e,setAttributes:l})=>{const a=(0,r.useBlockProps)(),{margin:c,bgColor:s,padding:i,alignment:d,iconColor:u,hoverColor:m,borderType:p,placeholder:f,borderColor:h,borderWidth:g,iconBgColor:C,borderRadius:v,iconHoverColor:w}=e;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(r.BlockControls,null,(0,o.createElement)(r.AlignmentToolbar,{value:d,onChange:e=>l({alignment:e})})),(0,o.createElement)(r.InspectorControls,null,(0,o.createElement)(n.PanelBody,{title:(0,t.__)("Search Bar Settings","wedocs")},(0,o.createElement)(n.TextControl,{label:(0,t.__)("Placeholder Text","wedocs"),value:f,onChange:e=>l({placeholder:e})}),(0,o.createElement)(n.RangeControl,{label:(0,t.__)("Padding","wedocs"),value:i,onChange:e=>l({padding:e}),min:0,max:50}),(0,o.createElement)(n.RangeControl,{label:(0,t.__)("Margin","wedocs"),value:c,onChange:e=>l({margin:e}),min:0,max:50}),(0,o.createElement)(n.RangeControl,{label:(0,t.__)("Border Width","wedocs"),value:g,onChange:e=>l({borderWidth:e}),min:0,max:10}),(0,o.createElement)(n.RangeControl,{label:(0,t.__)("Border Radius","wedocs"),value:v,onChange:e=>l({borderRadius:e}),min:0,max:50}),(0,o.createElement)(n.TextControl,{label:(0,t.__)("Border Type","wedocs"),value:p,onChange:e=>l({borderType:e})}),(0,o.createElement)("p",null,(0,t.__)("Background Color","wedocs")),(0,o.createElement)(r.ColorPalette,{value:s,onChange:e=>l({bgColor:e})}),(0,o.createElement)("p",null,(0,t.__)("Border Color","wedocs")),(0,o.createElement)(r.ColorPalette,{value:h,onChange:e=>l({borderColor:e})}),(0,o.createElement)("p",null,(0,t.__)("Hover Background Color","wedocs")),(0,o.createElement)(r.ColorPalette,{value:m,onChange:e=>l({hoverColor:e})}),(0,o.createElement)("p",null,(0,t.__)("Icon Color","wedocs")),(0,o.createElement)(r.ColorPalette,{value:u,onChange:e=>l({iconColor:e})}),(0,o.createElement)("p",null,(0,t.__)("Icon Background Color","wedocs")),(0,o.createElement)(r.ColorPalette,{value:C,onChange:e=>l({iconBgColor:e})}),(0,o.createElement)("p",null,(0,t.__)("Icon Hover Color","wedocs")),(0,o.createElement)(r.ColorPalette,{value:w,onChange:e=>l({iconHoverColor:e})}))),(0,o.createElement)("form",{...a,role:"search",method:"get",className:"search-form wedocs-search-form",action:""},(0,o.createElement)("div",{className:"wedocs-search-input"},(0,o.createElement)("input",{name:"s",type:"search",className:"search-field",value:"",title:"Search for:",placeholder:"Search for a topic or question"}),(0,o.createElement)("input",{type:"hidden",name:"post_type",value:"docs"}),(0,o.createElement)("button",{type:"submit",className:"search-submit"},(0,o.createElement)("svg",{width:"15",height:"16",fill:"none"},(0,o.createElement)("path",{fillRule:"evenodd",d:"M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z",fill:"#fff"}))))))},icon:"star-empty",title:(0,t.__)("weDocs - Search Bar","wedocs"),keywords:["Search","weDocs search bar","Bar"],category:"widgets"})}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var l=o[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,o,n,l){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],n=e[d][1],l=e[d][2];for(var c=!0,s=0;s<o.length;s++)(!1&l||a>=l)&&Object.keys(r.O).every((function(e){return r.O[e](o[s])}))?o.splice(s--,1):(c=!1,l<a&&(a=l));if(c){e.splice(d--,1);var i=n();void 0!==i&&(t=i)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[o,n,l]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={584:0,442:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,l,a=o[0],c=o[1],s=o[2],i=0;if(a.some((function(t){return 0!==e[t]}))){for(n in c)r.o(c,n)&&(r.m[n]=c[n]);if(s)var d=s(r)}for(t&&t(o);i<a.length;i++)l=a[i],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(d)},o=self.webpackChunkweDocs=self.webpackChunkweDocs||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var n=r.O(void 0,[442],(function(){return r(966)}));n=r.O(n)}();