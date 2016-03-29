define(["exports","metal/src/metal","metal-dom/src/all/dom","metal-promise/src/promise/Promise","metal-component/src/all/component","metal-events/src/events"],function(e,t,n,r,o,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var c=a(t),f=a(n),d=a(r),p=a(o),h=function(e){function t(n){u(this,t);var r=l(this,e.call(this,n));return r.eventHandler_=new i.EventHandler,r.on("select",r.select),r}return s(t,e),t.prototype.attached=function(){this.inputElement&&this.eventHandler_.add(f["default"].on(this.inputElement,"input",this.handleUserInput_.bind(this)))},t.prototype.detached=function(){this.eventHandler_.removeAllListeners()},t.prototype.handleUserInput_=function(){this.request(this.inputElement.value)},t.prototype.request=function(e){var t=this;this.pendingRequest&&this.pendingRequest.cancel("Cancelled by another request");var n=t.data(e);return c["default"].isPromise(n)||(n=d["default"].resolve(n)),this.pendingRequest=n.then(function(e){return Array.isArray(e)?e.map(t.format.bind(t)).filter(function(e){return c["default"].isDefAndNotNull(e)}):void 0}),this.pendingRequest},t.prototype.setData_=function(e){return c["default"].isFunction(e)?e:function(){return e}},t}(p["default"]);h.STATE={data:{setter:"setData_"},format:{value:c["default"].identityFunction,validator:c["default"].isFunction},inputElement:{setter:f["default"].toElement},select:{value:function(e){this.inputElement.value=e.text,this.inputElement.focus()},validator:c["default"].isFunction},visible:{validator:c["default"].isBoolean,value:!1}},e["default"]=h});