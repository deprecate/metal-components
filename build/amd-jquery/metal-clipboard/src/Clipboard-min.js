define(["exports","metal/src/metal","metal-dom/src/all/dom","metal-state/src/all/state","metal-jquery-adapter/src/JQueryAdapter"],function(t,e,i,r,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(t,"__esModule",{value:!0});var s=a(e),u=a(i),d=a(r),f=a(n),h=function y(t,e,i){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,e);if(void 0===r){var n=Object.getPrototypeOf(t);return null===n?void 0:y(n,e,i)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(i)},p=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),g=function(t){function e(t){o(this,e);var i=l(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.listener_=u["default"].on(i.selector,"click",function(t){return i.initialize(t)}),i}return c(e,t),p(e,[{key:"disposeInternal",value:function(){this.listener_.dispose(),this.listener_=null,this.clipboardAction_&&(this.clipboardAction_.dispose(),this.clipboardAction_=null)}},{key:"initialize",value:function(t){this.clipboardAction_&&(this.clipboardAction_=null),this.clipboardAction_=new v({host:this,action:this.action(t.delegateTarget),target:this.target(t.delegateTarget),text:this.text(t.delegateTarget),trigger:t.delegateTarget})}}]),e}(d["default"]);g.STATE={action:{validator:s["default"].isFunction,value:function(t){return t.getAttribute("data-action")}},selector:{value:"[data-clipboard]",validator:s["default"].isString},target:{validator:s["default"].isFunction,value:function(t){return document.querySelector(t.getAttribute("data-target"))}},text:{validator:s["default"].isFunction,value:function(t){return t.getAttribute("data-text")}}};var v=function(t){function e(t){o(this,e);var i=l(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.text?i.selectValue():i.target&&i.selectTarget(),i}return c(e,t),p(e,[{key:"clearSelection",value:function(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"disposeInternal",value:function(){this.removeFakeElement(),h(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"disposeInternal",this).call(this)}},{key:"handleResult",value:function(t){t?this.host.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.host.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"removeFakeElement",value:function(){this.fake&&u["default"].exitDocument(this.fake),this.removeFakeHandler&&this.removeFakeHandler.removeListener()}},{key:"selectTarget",value:function(){if("INPUT"===this.target.nodeName||"TEXTAREA"===this.target.nodeName)this.target.select(),this.selectedText=this.target.value;else{var t=document.createRange(),e=window.getSelection();t.selectNodeContents(this.target),e.addRange(t),this.selectedText=e.toString()}this.copyText()}},{key:"selectValue",value:function(){this.removeFakeElement(),this.removeFakeHandler=u["default"].once(document,"click",this.removeFakeElement.bind(this)),this.fake=document.createElement("textarea"),this.fake.style.position="fixed",this.fake.style.left="-9999px",this.fake.setAttribute("readonly",""),this.fake.value=this.text,this.selectedText=this.text,u["default"].enterDocument(this.fake),this.fake.select(),this.copyText()}}]),e}(d["default"]);v.STATE={action:{value:"copy",validator:function(t){return"copy"===t||"cut"===t}},host:{validator:function(t){return t instanceof g}},selectedText:{validator:s["default"].isString},target:{validator:s["default"].isElement},text:{validator:s["default"].isString},trigger:{validator:s["default"].isElement}},t["default"]=g,f["default"].register("clipboard",g)});