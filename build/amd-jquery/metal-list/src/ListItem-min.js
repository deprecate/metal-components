define(["exports","metal/src/metal","metal-component/src/all/component","metal-soy/src/Soy","./ListItem.soy","metal-jquery-adapter/src/JQueryAdapter"],function(t,e,r,n,o,a){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(t,"__esModule",{value:!0});var u=i(e),f=i(r),p=i(n),y=i(o),m=i(a),d=function(t){function e(){return c(this,e),l(this,t.apply(this,arguments))}return s(e,t),e.prototype.setterItemFn_=function(t){return t.textPrimary&&u["default"].isString(t.textPrimary)&&(t.textPrimary=p["default"].toIncDom(t.textPrimary)),t.textSecondary&&u["default"].isString(t.textSecondary)&&(t.textSecondary=p["default"].toIncDom(t.textSecondary)),t.avatar&&t.avatar.content&&u["default"].isString(t.avatar.content)&&(t.avatar.content=p["default"].toIncDom(t.avatar.content)),Array.isArray(t.iconsHtml)&&(t.iconsHtml=t.iconsHtml.map(p["default"].toIncDom)),t},e}(f["default"]);d.prototype.registerMetalComponent&&d.prototype.registerMetalComponent(d,"ListItem"),p["default"].register(d,y["default"]),d.STATE={item:{validator:u["default"].isObject,setter:"setterItemFn_"},index:{value:-1}},t["default"]=d,m["default"].register("listItem",d)});