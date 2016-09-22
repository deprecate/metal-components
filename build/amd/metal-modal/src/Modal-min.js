define(["exports","metal/src/metal","metal-dom/src/all/dom","metal-events/src/events","./Modal.soy.js","metal-component/src/all/component","metal-soy/src/Soy"],function(e,t,n,o,i,l,u){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var d=a(t),f=a(n),v=a(i),h=a(l),y=a(u),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_=function b(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:b(i,t,n)}if("value"in o)return o.value;var l=o.get;if(void 0!==l)return l.call(n)},m=function(e){function t(){return r(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),p(t,[{key:"created",value:function(){this.eventHandler_=new o.EventHandler}},{key:"attached",value:function(){this.autoFocus_(this.autoFocus)}},{key:"autoFocus_",value:function(e){if(this.inDocument&&this.visible&&e){var t=this.element.querySelector(e);t&&t.focus()}}},{key:"detached",value:function(){_(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"detached",this).call(this),this.eventHandler_.removeAllListeners()}},{key:"disposeInternal",value:function(){f["default"].exitDocument(this.overlayElement),this.unrestrictFocus_(),_(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"disposeInternal",this).call(this)}},{key:"handleDocumentFocus_",value:function(e){this.overlay&&!this.element.contains(e.target)&&this.autoFocus_(".modal-dialog")}},{key:"handleKeyup_",value:function(e){27===e.keyCode&&this.hide()}},{key:"hide",value:function(){this.visible=!1}},{key:"restrictFocus_",value:function(){this.restrictFocusHandle_||(this.restrictFocusHandle_=f["default"].on(document,"focus",this.handleDocumentFocus_.bind(this),!0))}},{key:"shiftFocusBack_",value:function(){this.lastFocusedElement_&&(this.lastFocusedElement_.focus(),this.lastFocusedElement_=null)}},{key:"show",value:function(){this.visible=!0}},{key:"syncHideOnEscape",value:function(e){e?this.eventHandler_.add(f["default"].on(document,"keyup",this.handleKeyup_.bind(this))):this.eventHandler_.removeAllListeners()}},{key:"syncOverlay",value:function(e){var t=e&&this.visible;f["default"][t?"enterDocument":"exitDocument"](this.overlayElement)}},{key:"syncVisible",value:function(){this.syncOverlay(this.overlay),this.visible?(this.lastFocusedElement_=this.lastFocusedElement_||document.activeElement,this.autoFocus_(this.autoFocus),this.restrictFocus_()):(this.unrestrictFocus_(),this.shiftFocusBack_())}},{key:"unrestrictFocus_",value:function(){this.restrictFocusHandle_&&(this.restrictFocusHandle_.removeListener(),this.restrictFocusHandle_=null)}},{key:"valueOverlayElementFn_",value:function(){return f["default"].buildFragment('<div class="modal-backdrop fade in"></div>').firstChild}}]),t}(h["default"]);m.STATE={autoFocus:{validator:function(e){return e===!1||d["default"].isString(e)},value:".close"},body:{},bodyId:{valueFn:function(){return"modal-body-"+d["default"].getUid()}},footer:{},headerId:{valueFn:function(){return"modal-header-"+d["default"].getUid()}},header:{},hideOnEscape:{validator:d["default"].isBoolean,value:!0},noCloseButton:{value:!1},overlay:{validator:d["default"].isBoolean,value:!0},overlayElement:{initOnly:!0,valueFn:"valueOverlayElementFn_"},role:{validator:d["default"].isString,value:"dialog"}},y["default"].register(m,v["default"]),e["default"]=m});