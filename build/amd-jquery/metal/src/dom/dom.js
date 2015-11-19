'use strict';

define(['exports', 'metal/src/core', 'metal/src/object/object', 'metal/src/events/DomEventHandle'], function (exports, _core, _object, _DomEventHandle) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _object2 = _interopRequireDefault(_object);

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

	var _createClass = (function () {
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
	})();

	var dom = (function () {
		function dom() {
			_classCallCheck(this, dom);
		}

		_createClass(dom, null, [{
			key: 'addClasses',
			value: function addClasses(element, classes) {
				if (!_core2.default.isObject(element) || !_core2.default.isString(classes)) {
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
					element.classList.add(className);
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
			key: 'append',
			value: function append(parent, child) {
				if (_core2.default.isString(child)) {
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
				if (_core2.default.isDocument(element1)) {
					return element1.documentElement.contains(element2);
				} else {
					return element1.contains(element2);
				}
			}
		}, {
			key: 'delegate',
			value: function delegate(element, eventName, selector, callback) {
				var customConfig = dom.customEvents[eventName];

				if (customConfig && customConfig.delegate) {
					eventName = customConfig.originalEvent;
					callback = customConfig.handler.bind(customConfig, callback);
				}

				return dom.on(element, eventName, dom.handleDelegateEvent_.bind(null, selector, callback));
			}
		}, {
			key: 'enterDocument',
			value: function enterDocument(node) {
				dom.append(document.body, node);
			}
		}, {
			key: 'exitDocument',
			value: function exitDocument(node) {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		}, {
			key: 'handleDelegateEvent_',
			value: function handleDelegateEvent_(selector, callback, event) {
				dom.normalizeDelegateEvent_(event);
				var currentElement = event.target;
				var returnValue = true;

				while (currentElement && !event.stopped) {
					if (_core2.default.isString(selector) && dom.match(currentElement, selector)) {
						event.delegateTarget = currentElement;
						returnValue &= callback(event);
					}

					if (currentElement === event.currentTarget) {
						break;
					}

					currentElement = currentElement.parentNode;
				}

				event.delegateTarget = null;
				return returnValue;
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
			key: 'normalizeDelegateEvent_',
			value: function normalizeDelegateEvent_(event) {
				event.stopPropagation = dom.stopPropagation_;
				event.stopImmediatePropagation = dom.stopImmediatePropagation_;
			}
		}, {
			key: 'on',
			value: function on(element, eventName, callback, opt_capture) {
				if (_core2.default.isString(element)) {
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
				if (!_core2.default.isObject(element) || !_core2.default.isString(classes)) {
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
					element.classList.remove(className);
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

				if (_core2.default.isString(element)) {
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
				if (_core2.default.isElement(selectorOrElement) || _core2.default.isDocument(selectorOrElement)) {
					return selectorOrElement;
				} else if (_core2.default.isString(selectorOrElement)) {
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
				if (!_core2.default.isObject(element) || !_core2.default.isString(classes)) {
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

				_object2.default.mixin(eventObj, opt_eventObj);

				element.dispatchEvent(eventObj);
			}
		}]);

		return dom;
	})();

	var elementsByTag = {};
	dom.customEvents = {};
	exports.default = dom;
});
//# sourceMappingURL=dom.js.map