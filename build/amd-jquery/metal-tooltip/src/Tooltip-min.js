define(["exports","metal-soy/src/Soy","./TooltipBase","./Tooltip.soy","metal-jquery-adapter/src/JQueryAdapter"],function(e,t,o,n,r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0}),e.TooltipBase=e.Tooltip=void 0;var a=i(t),f=i(o),p=i(n),c=i(r),y=function(e){function t(){return l(this,t),s(this,e.apply(this,arguments))}return u(t,e),t.prototype.syncVisible=function(t){this.element.style.opacity=t?1:"",e.prototype.syncVisible.call(this,t)},t}(f["default"]);a["default"].register(y,p["default"]),y.Align=f["default"].Align,e["default"]=y,e.Tooltip=y,e.TooltipBase=f["default"],c["default"].register("tooltip",y)});