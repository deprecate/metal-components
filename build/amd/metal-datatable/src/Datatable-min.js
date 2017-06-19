define(["exports","metal/src/metal","metal-dom/src/all/dom","./Datatable.soy.js","metal-component/src/all/component","metal-keyboard-focus/src/KeyboardFocusManager","metal-soy/src/Soy","metal-useragent/src/UA"],function(e,t,a,n,r,o,s,u){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var d=l(t),y=l(a),p=l(n),h=l(r),_=l(o),b=l(s),v=l(u),m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),T=function(e){function t(){return i(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return f(t,e),g(t,[{key:"assertNoMixedTypesInArrays_",value:function(e){var t,a=this,n=function(e){var n=a.getValueType_(e);a.assertSameTypes_(t,n),t=n,a.assertNoMixedTypesInArrays_(e)},r=function(e){return a.assertNoMixedTypesInArrays_(e)};this.visit_(e,n,r)}},{key:"assertSameTypes_",value:function(e,t){if(e&&t&&e!==t)throw new Error("Datatable does not support mixed types in arrays.")}},{key:"attached",value:function(){this.keyboardFocusManager_=new _["default"](this,"td,th").setFocusHandler(this.handleNextFocus_.bind(this)).start()}},{key:"buildRef_",value:function(e,t,a){return e+t+"-"+a}},{key:"buildRefLastColumn_",value:function(e,t){var a=e.delegateTarget,n=parseInt(a.getAttribute("data-cols"),10);return this.buildRef_(t.prefix,t.row,n-1)}},{key:"buildRefLastRow_",value:function(e,t){var a=e.delegateTarget.parentNode,n=parseInt(a.getAttribute("data-rows"),10);return this.buildRef_(t.prefix,n-1,t.col)}},{key:"collectColumnsFromArrayValues_",value:function(e){var a=this,n=e.value,r=n[0]&&n[0].type===t.TYPES.OBJECT;r&&!function(){var t={},r={};n.forEach(function(e){return Object.keys(e.value).forEach(function(a){t[a]=!0,r[a]=e.value[a].type})}),e.columns=a.formatColumns(Object.keys(t)),e.columnsType=a.formatColumnsType(r)}()}},{key:"collectColumnsFromObjectKeys_",value:function(e){var t=e.value,a={},n={};Object.keys(t).forEach(function(e){a[e]=!0,n[e]=t[e].type}),e.columns=this.formatColumns(Object.keys(a)),e.columnsType=this.formatColumnsType(n)}},{key:"collectColumnsFromValues_",value:function(e){switch(e.type){case t.TYPES.ARRAY:this.collectColumnsFromArrayValues_(e);break;case t.TYPES.OBJECT:this.collectColumnsFromObjectKeys_(e)}}},{key:"disposed",value:function(){this.keyboardFocusManager_&&(this.keyboardFocusManager_.dispose(),this.keyboardFocusManager_=null)}},{key:"extractDataFromRef_",value:function(e){var a=t.REF_REGEX.exec(e);return{col:parseInt(a[2],10),prefix:e.substr(0,e.length-a[0].length),row:parseInt(a[1],10)}}},{key:"getValueType_",value:function(e){return null===e?t.TYPES.NULL:void 0===e?t.TYPES.UNDEFINED:Array.isArray(e)?t.TYPES.ARRAY:d["default"].isObject(e)&&"HTML"===e.contentKind?t.TYPES.STRING:"undefined"==typeof e?"undefined":m(e)}},{key:"handleClickToggle_",value:function(e){this.toggleTableContents(e.delegateTarget)}},{key:"handleDownArrowKey_",value:function(e,t){return e.metaKey&&v["default"].isMac?this.buildRefLastRow_(e,t):this.buildRef_(t.prefix,t.row+1,t.col)}},{key:"handleEnterKey_",value:function(e,t){var a=this.buildRef_(t.prefix,t.row,t.col)+"-label";this.refs[a]&&this.toggleTableContents(this.refs[a]),e.stopPropagation()}},{key:"handleKeydownToggle_",value:function(e){13!==e.keyCode&&32!==e.keyCode||this.toggleTableContents(e.delegateTarget)}},{key:"handleLeftArrowKey_",value:function(e,t){return!e.metaKey||!v["default"].isMac||this.buildRef_(t.prefix,t.row,0)}},{key:"handleRightArrowKey_",value:function(e,t){return!e.metaKey||!v["default"].isMac||this.buildRefLastColumn_(e,t)}},{key:"handleUpArrowKey_",value:function(e,t){return e.metaKey&&v["default"].isMac?this.buildRef_(t.prefix,0,t.col):this.buildRef_(t.prefix,t.row-1,t.col)}},{key:"handleNextFocusData_",value:function(e,t){switch(e.keyCode){case 13:case 32:return this.handleEnterKey_(e,t);case 33:return this.buildRef_(t.prefix,0,t.col);case 34:return this.buildRefLastRow_(e,t);case 35:return this.buildRefLastColumn_(e,t);case 36:return this.buildRef_(t.prefix,t.row,0);case 37:return this.handleLeftArrowKey_(e,t);case 38:return this.handleUpArrowKey_(e,t);case 39:return this.handleRightArrowKey_(e,t);case 40:return this.handleDownArrowKey_(e,t)}}},{key:"handleNextFocus_",value:function(e){var t=e.delegateTarget.getAttribute("ref"),a=this.extractDataFromRef_(t),n=this.handleNextFocusData_(e,a);return n&&(e.preventDefault(),e.stopPropagation()),n}},{key:"isAlreadyExpanded",value:function(e){return d["default"].isObject(e)&&"columns"in e&&"type"in e}},{key:"setData_",value:function(e){return this.isAlreadyExpanded(e)||(this.assertNoMixedTypesInArrays_(e),e=this.visitValuesAndExpandType_(e)),this.visitValuesAndWrapStringValues_(e)}},{key:"toggleTableContents",value:function(e){y["default"].toggleClasses(e,this.labelClasses),y["default"].toggleClasses(y["default"].next(e,"table"),this.hiddenClasses)}},{key:"visit_",value:function(e,a,n){switch(this.getValueType_(e)){case t.TYPES.ARRAY:e.forEach(function(t,n){return a(t,n,e)});break;case t.TYPES.OBJECT:Object.keys(e).forEach(function(t){return n(e[t],t,e)})}}},{key:"visitValuesAndExpandType_",value:function(e){var t=this,a=function(e,a,n){return n[a]=t.visitValuesAndExpandType_(e)},n=function(e,a,n){return n[a]=t.visitValuesAndExpandType_(e)};this.visit_(e,a,n);var r=this.getValueType_(e),o={type:r,value:e};return this.collectColumnsFromValues_(o),o}},{key:"visitValuesAndWrapStringValues_",value:function(e){var a=this,n=function(e,t,n){return n[t]=a.visitValuesAndWrapStringValues_(e)},r=function(e,t,n){return n[t]=a.visitValuesAndWrapStringValues_(e)};if(this.visit_(e,n,r),d["default"].isObject(e)){var o=this.getValueType_(e.value);o===t.TYPES.STRING&&(e.value=b["default"].toIncDom(e.value))}return e}}]),t}(h["default"]);b["default"].register(T,p["default"]),T.STATE={data:{setter:"setData_"},displayColumnsType:{validator:d["default"].isBoolean,value:!0},formatColumns:{validator:d["default"].isFunction,value:function(e){return e.sort()}},formatColumnsType:{validator:d["default"].isFunction,value:function(e){return e}},hiddenClasses:{validator:d["default"].isString,value:"hidden"},labelClasses:{validator:d["default"].isString,value:"collapsed expanded"},tableClasses:{validator:d["default"].isString,value:"table table-bordered table-condensed table-hover"}},T.REF_REGEX=/(\d+)-(\d+)$/,T.TYPES={ARRAY:"array",BOOLEAN:"boolean",NULL:"null",NUMBER:"number",OBJECT:"object",STRING:"string",UNDEFINED:"undefined"},e["default"]=T});