define(["exports","metal/src/metal","metal-dom/src/all/dom","metal-position/src/all/position","metal-component/src/all/component","metal-events/src/events","metal-soy/src/Soy","./Dropdown.soy"],function(e,t,n,o,i,r,l,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var f=s(n),h=s(i),m=s(l),y=s(a),v=function(e){function n(t){d(this,n);var o=u(this,e.call(this,t));return o.eventHandler_=new r.EventHandler,o}return c(n,e),n.prototype.attached=function(){e.prototype.attached.call(this),this.eventHandler_.add(f["default"].on(document,"click",this.handleDocClick_.bind(this)))},n.prototype.detached=function(){e.prototype.detached.call(this),this.eventHandler_.removeAllListeners()},n.prototype.close=function(){this.expanded=!1},n.prototype.isOpen=function(){return this.expanded},n.prototype.handleDocClick_=function(e){this.element.contains(e.target)||this.close()},n.prototype.open=function(){this.expanded=!0},n.prototype.setterClassMapFn_=function(e){return t.object.mixin(this.valueClassMapFn_(),e)},n.prototype.setterPositionFn_=function(e){return t.core.isNumber(e)?e:"up"===e.toLowerCase()?o.Align.TopLeft:o.Align.BottomLeft},n.prototype.syncExpanded=function(e){if(e&&this.alignElementSelector){var t=this.element.querySelector(this.alignElementSelector);if(t){var n=this.element.querySelector(".dropdown-menu");this.alignedPosition=o.Align.align(n,t,this.position)}}},n.prototype.toggle=function(){this.expanded=!this.expanded},n.prototype.validatePosition_=function(e){if(o.Align.isValidPosition(e))return!0;switch(e.toLowerCase()){case"up":case"down":return!0;default:return!1}},n.prototype.valueBodyFn_=function(){var e=this.element&&this.element.querySelector(".dropdown-menu");return e?e.innerHTML:""},n.prototype.valueClassMapFn_=function(){var e;return e={},p(e,o.Align.TopLeft,"dropup"),p(e,o.Align.TopCenter,"dropup"),p(e,o.Align.TopRight,"dropup"),p(e,o.Align.BottomLeft,"dropdown"),p(e,o.Align.BottomCenter,"dropdown"),p(e,o.Align.BottomRight,"dropdown"),p(e,o.Align.RightCenter,"dropright"),p(e,o.Align.LeftCenter,"dropleft"),e},n.prototype.valueHeaderFn_=function(){if(this.element){for(var e=document.createElement("div"),t=0;t<this.element.childNodes.length&&!f["default"].hasClass(this.element.childNodes[t],"dropdown-menu");t++)e.appendChild(this.element.childNodes[t].cloneNode(!0));return e.innerHTML}return""},n}(h["default"]);m["default"].register(v,y["default"]),v.STATE={alignedPosition:{validator:o.Align.isValidPosition},alignElementSelector:{validator:t.core.isString},body:{isHtml:!0,valueFn:"valueBodyFn_"},classMap:{setter:"setterClassMapFn_",validator:t.core.isObject,valueFn:"valueClassMapFn_"},header:{isHtml:!0,valueFn:"valueHeaderFn_"},expanded:{value:!1},position:{setter:"setterPositionFn_",value:o.Align.BottomLeft,validator:"validatePosition_"},positionClassOnMenu:{value:!1}},e["default"]=v});