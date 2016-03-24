define(["exports","metal/src/metal","metal-dom/src/all/dom","metal-events/src/events","metal-state/src/State","metal-jquery-adapter/src/JQueryAdapter"],function(e,t,n,r,a,o){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var u=l(t),c=l(n),h=l(a),f=l(o),p=function(e){function t(n){s(this,t);var a=i(this,e.call(this,n));return a.headerEventHandler_=new r.EventHandler,a.on("headerChanged",a.syncHeader),a.syncHeader(),a}return d(t,e),t.prototype.disposeInternal=function(){e.prototype.disposeInternal.call(this),this.headerEventHandler_.removeAllListeners()},t.prototype.getContentElement_=function(e){if(u["default"].isElement(this.content))return this.content;var t=c["default"].next(e,this.content);return t?t:(t=e.querySelector(this.content),t?t:this.container.querySelector(this.content))},t.prototype.handleClick_=function(e){this.toggle(e.delegateTarget||e.currentTarget)},t.prototype.handleKeydown_=function(e){13!==e.keyCode&&32!==e.keyCode||(this.toggle(e.delegateTarget||e.currentTarget),e.preventDefault())},t.prototype.syncHeader=function(){this.headerEventHandler_.removeAllListeners(),this.header&&(u["default"].isString(this.header)?this.headerEventHandler_.add(c["default"].delegate(this.container,"click",this.header,this.handleClick_.bind(this)),c["default"].delegate(this.container,"keydown",this.header,this.handleKeydown_.bind(this))):this.headerEventHandler_.add(c["default"].on(this.header,"click",this.handleClick_.bind(this)),c["default"].on(this.header,"keydown",this.handleKeydown_.bind(this))))},t.prototype.toggle=function(e){var n=this.getContentElement_(e);c["default"].toggleClasses(n,t.CSS_EXPANDED),c["default"].toggleClasses(n,t.CSS_COLLAPSED),c["default"].hasClass(n,t.CSS_EXPANDED)?(c["default"].addClasses(e,t.CSS_HEADER_EXPANDED),c["default"].removeClasses(e,t.CSS_HEADER_COLLAPSED)):(c["default"].removeClasses(e,t.CSS_HEADER_EXPANDED),c["default"].addClasses(e,t.CSS_HEADER_COLLAPSED))},t}(h["default"]);p.prototype.registerMetalComponent&&p.prototype.registerMetalComponent(p,"Toggler"),p.STATE={container:{setter:c["default"].toElement,validator:function(e){return u["default"].isString(e)||u["default"].isElement(e)},value:document},content:{validator:function(e){return u["default"].isString(e)||u["default"].isElement(e)}},header:{validator:function(e){return u["default"].isString(e)||u["default"].isElement(e)}}},p.CSS_COLLAPSED="toggler-collapsed",p.CSS_EXPANDED="toggler-expanded",p.CSS_HEADER_COLLAPSED="toggler-header-collapsed",p.CSS_HEADER_EXPANDED="toggler-header-expanded",e["default"]=p,f["default"].register("toggler",p)});