define(["exports","metal/src/metal","metal-component/src/all/component","metal-soy/src/Soy","./ProgressBar.soy","metal-jquery-adapter/src/JQueryAdapter"],function(e,t,r,n,a,o){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var f=u(t),c=u(r),p=u(n),d=u(a),y=u(o),h=function(e){function t(){return i(this,t),l(this,e.apply(this,arguments))}return s(t,e),t.prototype.setterValueFn_=function(e){return e<this.min&&(e=this.min),e>this.max&&(e=this.max),e},t.prototype.syncMax=function(e){e<this.value&&(this.value=e)},t.prototype.syncMin=function(e){e>this.value&&(this.value=e)},t}(c["default"]);h.STATE={barClass:{validator:f["default"].isString},label:{validator:function(e){return!f["default"].isDefAndNotNull(e)||f["default"].isString(e)}},max:{validator:f["default"].isNumber,value:100},min:{validator:f["default"].isNumber,value:0},value:{setter:"setterValueFn_",validator:f["default"].isNumber,value:0}},p["default"].register(h,d["default"]),e["default"]=h,y["default"].register("progressBar",h)});