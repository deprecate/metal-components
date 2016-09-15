define(['exports', 'metal/src/metal', './domData', './DomDelegatedEventHandle', './DomEventHandle'], function (exports, _metal, _domData, _DomDelegatedEventHandle, _DomEventHandle) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _domData2 = _interopRequireDefault(_domData);

	var _DomDelegatedEventHandle2 = _interopRequireDefault(_DomDelegatedEventHandle);

	var _DomEventHandle2 = _interopRequireDefault(_DomEventHandle);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var NEXT_TARGET = '__metal_next_target__';
	var USE_CAPTURE = {
		blur: true,
		error: true,
		focus: true,
		invalid: true,
		load: true,
		scroll: true
	};

	var dom = function () {
		function dom() {
			_classCallCheck(this, dom);
		}

		_createClass(dom, null, [{
			key: 'addClasses',
			value: function addClasses(element, classes) {
				if (!_metal.core.isObject(element) || !_metal.core.isString(classes)) {
					return;
				}

				if ('classList' in element) {
					dom.addClassesWithNative_(element, classes);
				} else {
					dom.addClassesWithoutNative_(element, classes);
				}
			}
		}, {
			key: 'addClassesWithNative_',
			value: function addClassesWithNative_(element, classes) {
				classes.split(' ').forEach(function (className) {
					if (className) {
						element.classList.add(className);
					}
				});
			}
		}, {
			key: 'addClassesWithoutNative_',
			value: function addClassesWithoutNative_(element, classes) {
				var elementClassName = ' ' + element.className + ' ';
				var classesToAppend = '';

				classes = classes.split(' ');

				for (var i = 0; i < classes.length; i++) {
					var className = classes[i];

					if (elementClassName.indexOf(' ' + className + ' ') === -1) {
						classesToAppend += ' ' + className;
					}
				}

				if (classesToAppend) {
					element.className = element.className + classesToAppend;
				}
			}
		}, {
			key: 'addElementListener_',
			value: function addElementListener_(element, eventName, listener) {
				var data = _domData2.default.get(element);
				dom.addToArr_(data.listeners, eventName, listener);
			}
		}, {
			key: 'addSelectorListener_',
			value: function addSelectorListener_(element, eventName, selector, listener) {
				var data = _domData2.default.get(element);
				dom.addToArr_(data.delegating[eventName].selectors, selector, listener);
			}
		}, {
			key: 'addToArr_',
			value: function addToArr_(arr, key, value) {
				if (!arr[key]) {
					arr[key] = [];
				}
				arr[key].push(value);
			}
		}, {
			key: 'attachDelegateEvent_',
			value: function attachDelegateEvent_(element, eventName) {
				var data = _domData2.default.get(element);
				if (!data.delegating[eventName]) {
					data.delegating[eventName] = {
						handle: dom.on(element, eventName, dom.handleDelegateEvent_, !!USE_CAPTURE[eventName]),
						selectors: {}
					};
				}
			}
		}, {
			key: 'closest',
			value: function closest(element, selector) {
				while (element && !dom.match(element, selector)) {
					element = element.parentNode;
				}
				return element;
			}
		}, {
			key: 'append',
			value: function append(parent, child) {
				if (_metal.core.isString(child)) {
					child = dom.buildFragment(child);
				}
				if (child instanceof NodeList) {
					var childArr = Array.prototype.slice.call(child);
					for (var i = 0; i < childArr.length; i++) {
						parent.appendChild(childArr[i]);
					}
				} else {
					parent.appendChild(child);
				}
				return child;
			}
		}, {
			key: 'buildFragment',
			value: function buildFragment(htmlString) {
				var tempDiv = document.createElement('div');
				tempDiv.innerHTML = '<br>' + htmlString;
				tempDiv.removeChild(tempDiv.firstChild);

				var fragment = document.createDocumentFragment();
				while (tempDiv.firstChild) {
					fragment.appendChild(tempDiv.firstChild);
				}
				return fragment;
			}
		}, {
			key: 'contains',
			value: function contains(element1, element2) {
				if (_metal.core.isDocument(element1)) {
					// document.contains is not defined on IE9, so call it on documentElement instead.
					return element1.documentElement.contains(element2);
				} else {
					return element1.contains(element2);
				}
			}
		}, {
			key: 'delegate',
			value: function delegate(element, eventName, selectorOrTarget, callback, opt_default) {
				var customConfig = dom.customEvents[eventName];
				if (customConfig && customConfig.delegate) {
					eventName = customConfig.originalEvent;
					callback = customConfig.handler.bind(customConfig, callback);
				}

				if (opt_default) {
					// Wrap callback so we don't set property directly on it.
					callback = callback.bind();
					callback.defaultListener_ = true;
				}

				dom.attachDelegateEvent_(element, eventName);
				if (_metal.core.isString(selectorOrTarget)) {
					dom.addSelectorListener_(element, eventName, selectorOrTarget, callback);
				} else {
					dom.addElementListener_(selectorOrTarget, eventName, callback);
				}

				return new _DomDelegatedEventHandle2.default(_metal.core.isString(selectorOrTarget) ? element : selectorOrTarget, eventName, callback, _metal.core.isString(selectorOrTarget) ? selectorOrTarget : null);
			}
		}, {
			key: 'enterDocument',
			value: function enterDocument(node) {
				node && dom.append(document.body, node);
			}
		}, {
			key: 'exitDocument',
			value: function exitDocument(node) {
				if (node && node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		}, {
			key: 'handleDelegateEvent_',
			value: function handleDelegateEvent_(event) {
				dom.normalizeDelegateEvent_(event);
				var currElement = _metal.core.isDef(event[NEXT_TARGET]) ? event[NEXT_TARGET] : event.target;
				var ret = true;
				var container = event.currentTarget;
				var limit = event.currentTarget.parentNode;
				var defFns = [];

				while (currElement && currElement !== limit && !event.stopped) {
					event.delegateTarget = currElement;
					ret &= dom.triggerMatchedListeners_(container, currElement, event, defFns);
					currElement = currElement.parentNode;
				}

				for (var i = 0; i < defFns.length && !event.defaultPrevented; i++) {
					event.delegateTarget = defFns[i].element;
					ret &= defFns[i].fn(event);
				}

				event.delegateTarget = null;
				event[NEXT_TARGET] = limit;
				return ret;
			}
		}, {
			key: 'hasClass',
			value: function hasClass(element, className) {
				if ('classList' in element) {
					return dom.hasClassWithNative_(element, className);
				} else {
					return dom.hasClassWithoutNative_(element, className);
				}
			}
		}, {
			key: 'hasClassWithNative_',
			value: function hasClassWithNative_(element, className) {
				return element.classList.contains(className);
			}
		}, {
			key: 'hasClassWithoutNative_',
			value: function hasClassWithoutNative_(element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
			}
		}, {
			key: 'isEmpty',
			value: function isEmpty(element) {
				return element.childNodes.length === 0;
			}
		}, {
			key: 'match',
			value: function match(element, selector) {
				if (!element || element.nodeType !== 1) {
					return false;
				}

				var p = Element.prototype;
				var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
				if (m) {
					return m.call(element, selector);
				}

				return dom.matchFallback_(element, selector);
			}
		}, {
			key: 'matchFallback_',
			value: function matchFallback_(element, selector) {
				var nodes = document.querySelectorAll(selector, element.parentNode);
				for (var i = 0; i < nodes.length; ++i) {
					if (nodes[i] === element) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: 'next',
			value: function next(element, selector) {
				do {
					element = element.nextSibling;
					if (element && dom.match(element, selector)) {
						return element;
					}
				} while (element);
				return null;
			}
		}, {
			key: 'normalizeDelegateEvent_',
			value: function normalizeDelegateEvent_(event) {
				event.stopPropagation = dom.stopPropagation_;
				event.stopImmediatePropagation = dom.stopImmediatePropagation_;
			}
		}, {
			key: 'on',
			value: function on(element, eventName, callback, opt_capture) {
				if (_metal.core.isString(element)) {
					return dom.delegate(document, eventName, element, callback);
				}
				var customConfig = dom.customEvents[eventName];
				if (customConfig && customConfig.event) {
					eventName = customConfig.originalEvent;
					callback = customConfig.handler.bind(customConfig, callback);
				}
				element.addEventListener(eventName, callback, opt_capture);
				return new _DomEventHandle2.default(element, eventName, callback, opt_capture);
			}
		}, {
			key: 'once',
			value: function once(element, eventName, callback) {
				var domEventHandle = this.on(element, eventName, function () {
					domEventHandle.removeListener();
					return callback.apply(this, arguments);
				});
				return domEventHandle;
			}
		}, {
			key: 'parent',
			value: function parent(element, selector) {
				return dom.closest(element.parentNode, selector);
			}
		}, {
			key: 'registerCustomEvent',
			value: function registerCustomEvent(eventName, customConfig) {
				dom.customEvents[eventName] = customConfig;
			}
		}, {
			key: 'removeChildren',
			value: function removeChildren(node) {
				var child;
				while (child = node.firstChild) {
					node.removeChild(child);
				}
			}
		}, {
			key: 'removeClasses',
			value: function removeClasses(element, classes) {
				if (!_metal.core.isObject(element) || !_metal.core.isString(classes)) {
					return;
				}

				if ('classList' in element) {
					dom.removeClassesWithNative_(element, classes);
				} else {
					dom.removeClassesWithoutNative_(element, classes);
				}
			}
		}, {
			key: 'removeClassesWithNative_',
			value: function removeClassesWithNative_(element, classes) {
				classes.split(' ').forEach(function (className) {
					if (className) {
						element.classList.remove(className);
					}
				});
			}
		}, {
			key: 'removeClassesWithoutNative_',
			value: function removeClassesWithoutNative_(element, classes) {
				var elementClassName = ' ' + element.className + ' ';

				classes = classes.split(' ');

				for (var i = 0; i < classes.length; i++) {
					elementClassName = elementClassName.replace(' ' + classes[i] + ' ', ' ');
				}

				element.className = elementClassName.trim();
			}
		}, {
			key: 'replace',
			value: function replace(element1, element2) {
				if (element1 && element2 && element1 !== element2 && element1.parentNode) {
					element1.parentNode.insertBefore(element2, element1);
					element1.parentNode.removeChild(element1);
				}
			}
		}, {
			key: 'stopImmediatePropagation_',
			value: function stopImmediatePropagation_() {
				this.stopped = true;
				this.stoppedImmediate = true;
				Event.prototype.stopImmediatePropagation.call(this);
			}
		}, {
			key: 'stopPropagation_',
			value: function stopPropagation_() {
				this.stopped = true;
				Event.prototype.stopPropagation.call(this);
			}
		}, {
			key: 'supportsEvent',
			value: function supportsEvent(element, eventName) {
				if (dom.customEvents[eventName]) {
					return true;
				}

				if (_metal.core.isString(element)) {
					if (!elementsByTag[element]) {
						elementsByTag[element] = document.createElement(element);
					}
					element = elementsByTag[element];
				}
				return 'on' + eventName in element;
			}
		}, {
			key: 'toElement',
			value: function toElement(selectorOrElement) {
				if (_metal.core.isElement(selectorOrElement) || _metal.core.isDocument(selectorOrElement)) {
					return selectorOrElement;
				} else if (_metal.core.isString(selectorOrElement)) {
					if (selectorOrElement[0] === '#' && selectorOrElement.indexOf(' ') === -1) {
						return document.getElementById(selectorOrElement.substr(1));
					} else {
						return document.querySelector(selectorOrElement);
					}
				} else {
					return null;
				}
			}
		}, {
			key: 'toggleClasses',
			value: function toggleClasses(element, classes) {
				if (!_metal.core.isObject(element) || !_metal.core.isString(classes)) {
					return;
				}

				if ('classList' in element) {
					dom.toggleClassesWithNative_(element, classes);
				} else {
					dom.toggleClassesWithoutNative_(element, classes);
				}
			}
		}, {
			key: 'toggleClassesWithNative_',
			value: function toggleClassesWithNative_(element, classes) {
				classes.split(' ').forEach(function (className) {
					element.classList.toggle(className);
				});
			}
		}, {
			key: 'toggleClassesWithoutNative_',
			value: function toggleClassesWithoutNative_(element, classes) {
				var elementClassName = ' ' + element.className + ' ';

				classes = classes.split(' ');

				for (var i = 0; i < classes.length; i++) {
					var className = ' ' + classes[i] + ' ';
					var classIndex = elementClassName.indexOf(className);

					if (classIndex === -1) {
						elementClassName = elementClassName + classes[i] + ' ';
					} else {
						elementClassName = elementClassName.substring(0, classIndex) + ' ' + elementClassName.substring(classIndex + className.length);
					}
				}

				element.className = elementClassName.trim();
			}
		}, {
			key: 'triggerEvent',
			value: function triggerEvent(element, eventName, opt_eventObj) {
				var eventObj = document.createEvent('HTMLEvents');
				eventObj.initEvent(eventName, true, true);
				_metal.object.mixin(eventObj, opt_eventObj);
				element.dispatchEvent(eventObj);
			}
		}, {
			key: 'triggerListeners_',
			value: function triggerListeners_(listeners, event, element, defaultFns) {
				var ret = true;
				listeners = listeners || [];
				for (var i = 0; i < listeners.length && !event.stoppedImmediate; i++) {
					if (listeners[i].defaultListener_) {
						defaultFns.push({
							element: element,
							fn: listeners[i]
						});
					} else {
						ret &= listeners[i](event);
					}
				}
				return ret;
			}
		}, {
			key: 'triggerMatchedListeners_',
			value: function triggerMatchedListeners_(container, element, event, defaultFns) {
				var data = _domData2.default.get(element);
				var listeners = data.listeners[event.type];
				var ret = dom.triggerListeners_(listeners, event, element, defaultFns);

				var selectorsMap = _domData2.default.get(container).delegating[event.type].selectors;
				var selectors = Object.keys(selectorsMap);
				for (var i = 0; i < selectors.length && !event.stoppedImmediate; i++) {
					if (dom.match(element, selectors[i])) {
						listeners = selectorsMap[selectors[i]];
						ret &= dom.triggerListeners_(listeners, event, element, defaultFns);
					}
				}

				return ret;
			}
		}]);

		return dom;
	}();

	var elementsByTag = {};
	dom.customEvents = {};

	exports.default = dom;
});
//# sourceMappingURL=dom.js.map