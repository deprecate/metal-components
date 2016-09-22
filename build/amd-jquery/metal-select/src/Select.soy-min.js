define(["exports","metal-component/src/all/component","metal-soy/src/Soy"],function(e,n,t){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function s(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(e,"__esModule",{value:!0}),e.templates=e.Select=void 0;var r,d=l(n),i=l(t);goog.loadModule(function(e){function n(e,n,a){var r;t.asserts.assertType(null==e.label||e.label instanceof Function||e.label instanceof goog.soy.data.SanitizedContent||e.label instanceof l.UnsanitizedText||goog.isString(e.label),"label",e.label,"?soydata.SanitizedHtml|string|undefined");var i=e.label;o("div",null,null,"class","select"+(e.elementClasses?" "+e.elementClasses:""),"data-onkeydown","handleKeyDown_");var p=null!=e.selectedIndex?e.selectedIndex:i||0==e.items.length?-1:0;o("input",null,null,"disabled",e.disabled,"type","hidden","name",e.hiddenInputName?e.hiddenInputName:"","value",p==-1?"":e.values?e.values[p]:""),s("input");var y=function(){for(var n=e.items,t=n.length,l=0;l<t;l++){var a=n[l];o("li",null,null,"data-onclick",null==(r=e.handleItemClick_)?"":r,"data-onkeydown",null==(r=e.handleItemKeyDown_)?"":r,"class","select-option"+(p==l?" selected":"")),o("a",null,null,"href","javascript:;");var d=a;"function"==typeof d?d():null!=d&&u(d),s("a"),s("li")}},f=function(){if(o("button",null,null,"class",(e.buttonClass?e.buttonClass:"")+" dropdown-select","disabled",e.disabled,"type","button","data-onclick","toggle","aria-haspopup","true","aria-expanded",e.expanded_?"true":"false"),p==-1){var n=i;"function"==typeof n?n():null!=n&&u(n)}else{var t=e.items[p];"function"==typeof t?t():null!=t&&u(t)}u(" "),d("span",null,null,"class",e.arrowClass?e.arrowClass:"caret"),s("button")};c({body:y,events:{stateSynced:e.handleDropdownStateSynced_},expanded:!e.disabled&&e.expanded_,header:f,ref:"dropdown"},null,a),s("div")}goog.module("Select.incrementaldom");var t=goog.require("soy"),l=goog.require("soydata");goog.require("goog.asserts"),goog.require("soy.asserts"),goog.require("goog.i18n.bidi"),goog.require("goog.string");var a=goog.require("incrementaldom"),o=a.elementOpen,s=a.elementClose,d=a.elementVoid,u=(a.elementOpenStart,a.elementOpenEnd,a.text),c=(a.attr,i["default"].getTemplate("Dropdown.incrementaldom","render"));return e.render=n,goog.DEBUG&&(n.soyTemplateName="Select.render"),e.render.params=["label","arrowClass","disabled","buttonClass","elementClasses","expanded_","handleDropdownStateSynced_","handleItemClick_","handleItemKeyDown_","hiddenInputName","items","values","selectedIndex"],e.render.types={label:"html|string",arrowClass:"any",disabled:"any",buttonClass:"any",elementClasses:"any",expanded_:"any",handleDropdownStateSynced_:"any",handleItemClick_:"any",handleItemKeyDown_:"any",hiddenInputName:"any",items:"any",values:"any",selectedIndex:"any"},e.templates=r=e,e});var u=function(e){function n(){return a(this,n),o(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return s(n,e),n}(d["default"]);i["default"].register(u,r),e.Select=u,e.templates=r,e["default"]=r});