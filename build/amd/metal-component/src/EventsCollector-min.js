define(["exports","metal/src/metal","metal-events/src/events"],function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var r=function(e){function t(n){o(this,t);var i=s(this,e.call(this));if(!n)throw new Error("The component instance is mandatory");return i.component_=n,i.eventHandles_={},i.hasListener_={},i}return i(t,e),t.prototype.attachListener=function(e,t){var o="[data-on"+e+'="'+t+'"]';if(this.hasListener_[o]=!0,!this.eventHandles_[o]){this.eventHandles_[o]=new n.EventHandler;for(var s=t.split(","),i=0;i<s.length;i++){var r=this.component_.getListenerFn(s[i]);r&&this.eventHandles_[o].add(this.component_.delegate(e,o,this.onEvent_.bind(this,r)))}}},t.prototype.detachAllListeners=function(){for(var e in this.eventHandles_)this.eventHandles_[e]&&this.eventHandles_[e].removeAllListeners();this.eventHandles_={},this.listenerCounts_={}},t.prototype.detachUnusedListeners=function(){for(var e in this.eventHandles_)this.eventHandles_[e]&&!this.hasListener_[e]&&(this.eventHandles_[e].removeAllListeners(),this.eventHandles_[e]=null)},t.prototype.disposeInternal=function(){this.detachAllListeners(),this.component_=null},t.prototype.onEvent_=function(e,t){var n=t.handledByComponent;return!n||n===this.component_||t.delegateTarget.contains(n.element)?(t.handledByComponent=this.component_,e(t)):void 0},t.prototype.startCollecting=function(){this.hasListener_={}},t}(t.Disposable);e["default"]=r});