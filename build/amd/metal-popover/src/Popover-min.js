define(["exports","metal/src/metal","metal-soy/src/Soy","metal-tooltip/src/Tooltip","./Popover.soy"],function(t,e,o,n,r){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(t,"__esModule",{value:!0});var a=i(e),u=i(o),p=i(r),f=function(t){function e(){return l(this,e),s(this,t.apply(this,arguments))}return c(e,t),e.prototype.syncAlignElement=function(e){if(t.prototype.syncAlignElement.call(this,e),e){var o=e.getAttribute("data-content");o&&(this.content=o)}},e.prototype.syncVisible=function(e){this.element.style.display=e?"block":"",t.prototype.syncVisible.call(this,e)},e}(n.TooltipBase);u["default"].register(f,p["default"]),f.STATE={content:{validator:a["default"].isString},triggerEvents:{validator:Array.isArray,value:["click","click"]}},f.Align=n.TooltipBase.Align,t["default"]=f});