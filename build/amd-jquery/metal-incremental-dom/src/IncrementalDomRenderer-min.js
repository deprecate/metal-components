define(["exports","metal/src/metal","metal-dom/src/all/dom","metal-component/src/all/component","./IncrementalDomAop"],function(e,t,n,o,r){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var l=s(n),h=s(r),p=function(e){function n(t){a(this,n);var r=i(this,e.call(this,t));return r.changes_={},r.eventsCollector_=new o.EventsCollector(t),t.on("stateKeyChanged",r.handleStateKeyChanged_.bind(r)),t.on("detached",r.handleDetached_.bind(r)),r}return c(n,e),n.prototype.addInlineListeners_=function(e){for(var n=0;n<e.length;n+=2){var o=e[n],r=e[n+1];o.startsWith("data-on")&&t.core.isString(r)&&this.listenersToAttach_.push({eventName:o.substr(7),fn:r})}},n.prototype.attachInlineListeners_=function(){this.eventsCollector_.startCollecting();for(var e=0;e<this.listenersToAttach_.length;e++){var t=this.listenersToAttach_[e];this.eventsCollector_.attachListener(t.eventName,t.fn)}},n.prototype.disposeUnusedSubComponents_=function(){for(var e=Object.keys(this.component_.components),t=[],n=0;n<e.length;n++)this.subComponentsFound_[e[n]]||t.push(e[n]);this.component_.disposeSubComponents(t)},n.prototype.getSubComponent_=function(e,t,n){var o=this.component_.addSubComponent(e,t,n);return o.wasRendered&&o.setState(n),o},n.prototype.guaranteeParent_=function(){var e=this.component_.element;if(!e||!e.parentNode){var t=document.createElement("div");return e&&l["default"].append(t,e),t}},n.prototype.handleDetached_=function(){this.eventsCollector_.detachAllListeners()},n.prototype.handleInterceptedAttributesCall_=function(e,n,o,r){if(o.startsWith("data-on")){var s=o.substr(7);t.core.isFunction(n[o])&&n.removeEventListener(s,n[o]),t.core.isFunction(r)&&l["default"].on(n,s,r)}e(n,o,r)},n.prototype.handleInterceptedCloseCall_=function(e,t){this.isComponentTag_(t)||e(t)},n.prototype.handleInterceptedOpenCall_=function(e,t){var n;return n=this.isComponentTag_(t)?this.handleSubComponentCall_.apply(this,arguments):this.handleRegularCall_.apply(this,arguments)},n.prototype.handleRegularCall_=function(e,o,r,s){var a=t.array.slice(arguments,4);this.addInlineListeners_((s||[]).concat(a));var i=t.array.slice(arguments,1);this.rootElementReached_||(i[1]=n.componentKey);var c=e.apply(null,i);return this.rootElementReached_||(this.rootElementReached_=!0,this.component_.element!==c&&(this.component_.element=c)),c},n.prototype.handleStateKeyChanged_=function(e){"element"!==e.key&&(this.changes_[e.key]=e)},n.prototype.handleSubComponentCall_=function(e,n,o,r){for(var s={},a=(r||[]).concat(t.array.slice(arguments,4)),i=0;i<a.length;i+=2)s[a[i]]=a[i+1];var c=this.renderSubComponent_(n,s);return c.element},n.prototype.isComponentTag_=function(e){return e[0]===e[0].toUpperCase()},n.prototype.render=function(){this.patch()},n.prototype.renderIncDom=function(){IncrementalDOM.elementVoid("div")},n.prototype.renderWithoutPatch=function(){this.changes_={},this.rootElementReached_=!1,this.subComponentsFound_={},this.generatedKeyCount_=0,this.listenersToAttach_=[],h["default"].startInterception(this.handleInterceptedOpenCall_.bind(this),this.handleInterceptedCloseCall_.bind(this),this.handleInterceptedAttributesCall_.bind(this)),this.renderIncDom(),h["default"].stopInterception(),this.attachInlineListeners_()},n.prototype.shouldUpdate=function(){return!0},n.prototype.patch=function(){var e=this.guaranteeParent_();e?(IncrementalDOM.patch(e,this.renderWithoutPatch.bind(this)),l["default"].exitDocument(this.component_.element)):IncrementalDOM.patchOuter(this.component_.element,this.renderWithoutPatch.bind(this))},n.prototype.update=function(){var e=Object.keys(this.changes_);e.length>0&&this.shouldUpdate(this.changes_)&&(this.patch(),this.eventsCollector_.detachUnusedListeners(),this.disposeUnusedSubComponents_())},n.prototype.renderSubComponent_=function(e,t){var o=e;"Component"===e&&t.ctor&&(o=t.ctor,t=t.data||{});var r=t.key||"sub"+this.generatedKeyCount_++,s=this.getSubComponent_(r,o,t);return n.componentKey=r,s.getRenderer().renderWithoutPatch(),n.componentKey=null,s.wasRendered||s.renderAsSubComponent(),this.subComponentsFound_[r]=!0,s},n}(o.ComponentRenderer);e["default"]=p});