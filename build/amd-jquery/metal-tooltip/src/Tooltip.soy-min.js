define(["exports","metal-component/src/Component","metal-soy/src/Soy"],function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0}),e.templates=e.Tooltip=void 0;var s,a=n(t),u=n(o);goog.loadModule(function(e){function t(e,t,i){e=e||{},o.asserts.assertType(null==e.title||e.title instanceof Function||e.title instanceof n.UnsanitizedText||goog.isString(e.title),"title",e.title,"?soydata.SanitizedHtml|string|undefined");var s=e.title,u=["top","top","right","bottom","bottom","bottom","left","top"],p=null!=e.alignedPosition?e.alignedPosition:e.position,c=null!=p?u[p]:"bottom";l("div",null,null,"class","tooltip "+c+(e.elementClasses?" "+e.elementClasses:""),"role","tooltip"),a("div",null,null,"class","tooltip-arrow"),l("section",null,null,"class","tooltip-inner"),s&&s(),r("section"),r("div")}goog.module("Tooltip.incrementaldom");var o=goog.require("soy"),n=goog.require("soydata");goog.require("goog.asserts"),goog.require("goog.i18n.bidi");var i=goog.require("incrementaldom"),l=i.elementOpen,r=i.elementClose,a=i.elementVoid;i.elementOpenStart,i.elementOpenEnd,i.text,i.attr;return e.render=t,goog.DEBUG&&(t.soyTemplateName="Tooltip.render"),e.render.params=["title","alignedPosition","elementClasses","position"],e.templates=s=e,e});var p=function(e){function t(){return i(this,t),l(this,e.apply(this,arguments))}return r(t,e),t}(a["default"]);u["default"].register(p,s),e["default"]=s,e.Tooltip=p,e.templates=s});