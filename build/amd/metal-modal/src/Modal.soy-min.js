define(["exports","metal-component/src/Component","metal-soy/src/Soy"],function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0}),e.templates=e.Modal=void 0;var l,i=n(t),d=n(o);goog.loadModule(function(e){function t(e,t,a){o.asserts.assertType(goog.isString(e.id)||e.id instanceof goog.soy.data.SanitizedContent,"id",e.id,"string|goog.soy.data.SanitizedContent");var l=e.id;o.asserts.assertType(null==e.body||e.body instanceof Function||e.body instanceof n.UnsanitizedText||goog.isString(e.body),"body",e.body,"?soydata.SanitizedHtml|string|undefined");var d=e.body;o.asserts.assertType(null==e.elementClasses||e.elementClasses instanceof goog.soy.data.SanitizedContent||goog.isString(e.elementClasses),"elementClasses",e.elementClasses,"null|string|undefined");var u=e.elementClasses;o.asserts.assertType(null==e.footer||e.footer instanceof Function||e.footer instanceof n.UnsanitizedText||goog.isString(e.footer),"footer",e.footer,"?soydata.SanitizedHtml|string|undefined");var c=e.footer;o.asserts.assertType(null==e.header||e.header instanceof Function||e.header instanceof n.UnsanitizedText||goog.isString(e.header),"header",e.header,"?soydata.SanitizedHtml|string|undefined");var g=e.header;o.asserts.assertType(null==e.role||e.role instanceof goog.soy.data.SanitizedContent||goog.isString(e.role),"role",e.role,"null|string|undefined");var f=e.role;r("div",null,null,"id",l,"class","modal"+(u?" "+u:""),"role",f?f:"dialog","aria-labelledby",l+"-header"),r("div",null,null,"class","modal-dialog","tabindex","0"),r("div",null,null,"class","modal-content"),r("header",null,null,"class","modal-header"),g&&(r("button",null,null,"type","button","class","close","data-onclick","hide","aria-label","Close"),r("span",null,null,"aria-hidden","true"),i("×"),s("span"),s("button"),g()),s("header"),r("section",null,null,"class","modal-body"),d&&d(),s("section"),r("footer",null,null,"class","modal-footer"),c&&c(),s("footer"),s("div"),s("div"),s("div")}goog.module("Modal.incrementaldom");var o=goog.require("soy"),n=goog.require("soydata");goog.require("goog.asserts"),goog.require("goog.i18n.bidi");var a=goog.require("incrementaldom"),r=a.elementOpen,s=a.elementClose,i=(a.elementVoid,a.elementOpenStart,a.elementOpenEnd,a.text);a.attr;return e.render=t,goog.DEBUG&&(t.soyTemplateName="Modal.render"),e.render.params=["id","body","elementClasses","footer","header","role"],e.templates=l=e,e});var u=function(e){function t(){return a(this,t),r(this,e.apply(this,arguments))}return s(t,e),t}(i["default"]);u.prototype.registerMetalComponent&&u.prototype.registerMetalComponent(u,"Modal"),d["default"].register(u,l),e["default"]=l,e.Modal=u,e.templates=l});