this.steel = {};
this.steelNamed = {};
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
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

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
})(typeof global === "undefined" ? self : global);
(function () {
	'use strict';

	/**
  * A collection of core utility functions.
  * @const
  */

	var core = (function () {
		function core() {
			babelHelpers.classCallCheck(this, core);
		}

		/**
   * Unique id property prefix.
   * @type {String}
   * @protected
   */
		babelHelpers.createClass(core, null, [{
			key: 'abstractMethod',

			/**
    * When defining a class Foo with an abstract method bar(), you can do:
    * Foo.prototype.bar = core.abstractMethod
    *
    * Now if a subclass of Foo fails to override bar(), an error will be thrown
    * when bar() is invoked.
    *
    * @type {!Function}
    * @throws {Error} when invoked to indicate the method should be overridden.
    */
			value: function abstractMethod() {
				throw Error('Unimplemented abstract method');
			}

			/**
    * Loops constructor super classes collecting its properties values. If
    * property is not available on the super class `undefined` will be
    * collected as value for the class hierarchy position.
    * @param {!function()} constructor Class constructor.
    * @param {string} propertyName Property name to be collected.
    * @return {Array.<*>} Array of collected values.
    * TODO(*): Rethink superclass loop.
    */
		}, {
			key: 'collectSuperClassesProperty',
			value: function collectSuperClassesProperty(constructor, propertyName) {
				var propertyValues = [constructor[propertyName]];
				while (constructor.__proto__ && !constructor.__proto__.isPrototypeOf(Function)) {
					constructor = constructor.__proto__;
					propertyValues.push(constructor[propertyName]);
				}
				return propertyValues;
			}

			/**
    * Gets an unique id. If `opt_object` argument is passed, the object is
    * mutated with an unique id. Consecutive calls with the same object
    * reference won't mutate the object again, instead the current object uid
    * returns. See {@link core.UID_PROPERTY}.
    * @type {opt_object} Optional object to be mutated with the uid. If not
    *     specified this method only returns the uid.
    * @throws {Error} when invoked to indicate the method should be overridden.
    */
		}, {
			key: 'getUid',
			value: function getUid(opt_object) {
				if (opt_object) {
					return opt_object[core.UID_PROPERTY] || (opt_object[core.UID_PROPERTY] = core.uniqueIdCounter_++);
				}
				return core.uniqueIdCounter_++;
			}

			/**
    * The identity function. Returns its first argument.
    * @param {*=} opt_returnValue The single value that will be returned.
    * @return {?} The first argument.
    */
		}, {
			key: 'identityFunction',
			value: function identityFunction(opt_returnValue) {
				return opt_returnValue;
			}

			/**
    * Returns true if the specified value is a boolean.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is boolean.
    */
		}, {
			key: 'isBoolean',
			value: function isBoolean(val) {
				return typeof val === 'boolean';
			}

			/**
    * Returns true if the specified value is not undefined.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is defined.
    */
		}, {
			key: 'isDef',
			value: function isDef(val) {
				return val !== undefined;
			}

			/**
    * Returns true if value is not undefined or null.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isDefAndNotNull',
			value: function isDefAndNotNull(val) {
				return core.isDef(val) && !core.isNull(val);
			}

			/**
    * Returns true if value is a document.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isDocument',
			value: function isDocument(val) {
				return val && typeof val === 'object' && val.nodeType === 9;
			}

			/**
    * Returns true if value is a dom element.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isElement',
			value: function isElement(val) {
				return val && typeof val === 'object' && val.nodeType === 1;
			}

			/**
    * Returns true if the specified value is a function.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is a function.
    */
		}, {
			key: 'isFunction',
			value: function isFunction(val) {
				return typeof val === 'function';
			}

			/**
    * Returns true if value is null.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isNull',
			value: function isNull(val) {
				return val === null;
			}

			/**
    * Returns true if the specified value is a number.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is a number.
    */
		}, {
			key: 'isNumber',
			value: function isNumber(val) {
				return typeof val === 'number';
			}

			/**
    * Returns true if value is a window.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isWindow',
			value: function isWindow(val) {
				return val !== null && val === val.window;
			}

			/**
    * Returns true if the specified value is an object. This includes arrays
    * and functions.
    * @param {?} val Variable to test.
    * @return {boolean} Whether variable is an object.
    */
		}, {
			key: 'isObject',
			value: function isObject(val) {
				var type = typeof val;
				return type === 'object' && val !== null || type === 'function';
			}

			/**
    * Returns true if value is a string.
    * @param {*} val
    * @return {Boolean}
    */
		}, {
			key: 'isString',
			value: function isString(val) {
				return typeof val === 'string';
			}

			/**
    * Merges the values of a static property a class with the values of that
    * property for all its super classes, and stores it as a new static
    * property of that class. If the static property already existed, it won't
    * be recalculated.
    * @param {!function()} constructor Class constructor.
    * @param {string} propertyName Property name to be collected.
    * @param {function(*, *):*=} opt_mergeFn Function that receives an array filled
    *   with the values of the property for the current class and all its super classes.
    *   Should return the merged value to be stored on the current class.
    * @return {boolean} Returns true if merge happens, false otherwise.
    */
		}, {
			key: 'mergeSuperClassesProperty',
			value: function mergeSuperClassesProperty(constructor, propertyName, opt_mergeFn) {
				var mergedName = propertyName + '_MERGED';
				if (constructor.hasOwnProperty(mergedName)) {
					return false;
				}

				var merged = core.collectSuperClassesProperty(constructor, propertyName);
				if (opt_mergeFn) {
					merged = opt_mergeFn(merged);
				}
				constructor[mergedName] = merged;
				return true;
			}

			/**
    * Null function used for default values of callbacks, etc.
    * @return {void} Nothing.
    */
		}, {
			key: 'nullFunction',
			value: function nullFunction() {}
		}]);
		return core;
	})();

	core.UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

	/**
  * Counter for unique id.
  * @type {Number}
  * @private
  */
	core.uniqueIdCounter_ = 1;

	this.steel.core = core;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;

	var object = (function () {
		function object() {
			babelHelpers.classCallCheck(this, object);
		}

		babelHelpers.createClass(object, null, [{
			key: 'mixin',

			/**
    * Copies all the members of a source object to a target object.
    * @param {Object} target Target object.
    * @param {...Object} var_args The objects from which values will be copied.
    * @return {Object} Returns the target object reference.
    */
			value: function mixin(target) {
				var key, source;
				for (var i = 1; i < arguments.length; i++) {
					source = arguments[i];
					for (key in source) {
						target[key] = source[key];
					}
				}
				return target;
			}

			/**
    * Returns an object based on its fully qualified external name.
    * @param {string} name The fully qualified name.
    * @param {object=} opt_obj The object within which to look; default is
    *     <code>window</code>.
    * @return {?} The value (object or primitive) or, if not found, null.
    */
		}, {
			key: 'getObjectByName',
			value: function getObjectByName(name, opt_obj) {
				var parts = name.split('.');
				var cur = opt_obj || window;
				var part;
				while (part = parts.shift()) {
					if (core.isDefAndNotNull(cur[part])) {
						cur = cur[part];
					} else {
						return null;
					}
				}
				return cur;
			}
		}]);
		return object;
	})();

	this.steel.object = object;
}).call(this);
(function () {
	'use strict';

	/**
  * Disposable utility. When inherited provides the `dispose` function to its
  * subclass, which is responsible for disposing of any object references
  * when an instance won't be used anymore. Subclasses should override
  * `disposeInternal` to implement any specific disposing logic.
  * @constructor
  */

	var Disposable = (function () {
		function Disposable() {
			babelHelpers.classCallCheck(this, Disposable);

			/**
    * Flag indicating if this instance has already been disposed.
    * @type {boolean}
    * @protected
    */
			this.disposed_ = false;
		}

		/**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */
		babelHelpers.createClass(Disposable, [{
			key: 'dispose',
			value: function dispose() {
				if (!this.disposed_) {
					this.disposeInternal();
					this.disposed_ = true;
				}
			}

			/**
    * Subclasses should override this method to implement any specific
    * disposing logic (like clearing references and calling `dispose` on other
    * disposables).
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {}

			/**
    * Checks if this instance has already been disposed.
    * @return {boolean}
    */
		}, {
			key: 'isDisposed',
			value: function isDisposed() {
				return this.disposed_;
			}
		}]);
		return Disposable;
	})();

	this.steel.Disposable = Disposable;
}).call(this);
(function () {
	'use strict';

	var Disposable = this.steel.Disposable;

	/**
  * EventHandle utility. Holds information about an event subscription, and
  * allows removing them easily.
  * EventHandle is a Disposable, but it's important to note that the
  * EventEmitter that created it is not the one responsible for disposing it.
  * That responsibility is for the code that holds a reference to it.
  * @param {!EventEmitter} emitter Emitter the event was subscribed to.
  * @param {string} event The name of the event that was subscribed to.
  * @param {!Function} listener The listener subscribed to the event.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandle = (function (_Disposable) {
		babelHelpers.inherits(EventHandle, _Disposable);

		function EventHandle(emitter, event, listener) {
			babelHelpers.classCallCheck(this, EventHandle);

			babelHelpers.get(Object.getPrototypeOf(EventHandle.prototype), 'constructor', this).call(this);

			/**
    * The EventEmitter instance that the event was subscribed to.
    * @type {EventEmitter}
    * @protected
    */
			this.emitter_ = emitter;

			/**
    * The name of the event that was subscribed to.
    * @type {string}
    * @protected
    */
			this.event_ = event;

			/**
    * The listener subscribed to the event.
    * @type {Function}
    * @protected
    */
			this.listener_ = listener;
		}

		/**
   * Disposes of this instance's object references.
   * @override
   */
		babelHelpers.createClass(EventHandle, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeListener();
				this.emitter_ = null;
				this.listener_ = null;
			}

			/**
    * Removes the listener subscription from the emitter.
    */
		}, {
			key: 'removeListener',
			value: function removeListener() {
				if (!this.emitter_.isDisposed()) {
					this.emitter_.removeListener(this.event_, this.listener_);
				}
			}
		}]);
		return EventHandle;
	})(Disposable);

	this.steel.EventHandle = EventHandle;
}).call(this);
(function () {
	'use strict';

	var EventHandle = this.steel.EventHandle;

	/**
  * This is a special EventHandle, that is responsible for dom events, instead
  * of EventEmitter events.
  * @param {!EventEmitter} emitter Emitter the event was subscribed to.
  * @param {string} event The name of the event that was subscribed to.
  * @param {!Function} listener The listener subscribed to the event.
  * @constructor
  * @extends {EventHandle}
  */

	var DomEventHandle = (function (_EventHandle) {
		babelHelpers.inherits(DomEventHandle, _EventHandle);

		function DomEventHandle(emitter, event, listener) {
			babelHelpers.classCallCheck(this, DomEventHandle);

			babelHelpers.get(Object.getPrototypeOf(DomEventHandle.prototype), 'constructor', this).call(this, emitter, event, listener);
		}

		/**
   * @inheritDoc
   */
		babelHelpers.createClass(DomEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				this.emitter_.removeEventListener(this.event_, this.listener_);
			}
		}]);
		return DomEventHandle;
	})(EventHandle);

	this.steel.DomEventHandle = DomEventHandle;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var object = this.steel.object;
	var DomEventHandle = this.steel.DomEventHandle;

	var dom = (function () {
		function dom() {
			babelHelpers.classCallCheck(this, dom);
		}

		babelHelpers.createClass(dom, null, [{
			key: 'addClasses',

			/**
    * Adds the requested CSS classes to an element.
    * @param {!Element} element The element to add CSS classes to.
    * @param {string} classes CSS classes to add.
    */
			value: function addClasses(element, classes) {
				if (!core.isObject(element) || !core.isString(classes)) {
					return;
				}

				if ('classList' in element) {
					dom.addClassesWithNative_(element, classes);
				} else {
					dom.addClassesWithoutNative_(element, classes);
				}
			}

			/**
    * Adds the requested CSS classes to an element using classList.
    * @param {!Element} element The element to add CSS classes to.
    * @param {string} classes CSS classes to add.
    * @protected
    */
		}, {
			key: 'addClassesWithNative_',
			value: function addClassesWithNative_(element, classes) {
				classes.split(' ').forEach(function (className) {
					element.classList.add(className);
				});
			}

			/**
    * Adds the requested CSS classes to an element without using classList.
    * @param {!Element} element The element to add CSS classes to.
    * @param {string} classes CSS classes to add.
    * @protected
    */
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

			/**
    * Appends a child node with text or other nodes to a parent node. If
    * child is a HTML string it will be automatically converted to a document
    * fragment before appending it to the parent.
    * @param {!Element} parent The node to append nodes to.
    * @param {!(Element|NodeList|string)} child The thing to append to the parent.
    * @return {!Element} The appended child.
    */
		}, {
			key: 'append',
			value: function append(parent, child) {
				if (core.isString(child)) {
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

			/**
    * Helper for converting a HTML string into a document fragment.
    * @param {string} htmlString The HTML string to convert.
    * @return {!Element} The resulting document fragment.
    */
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

			/**
    * Listens to the specified event on the given DOM element, but only calls the
    * callback with the event when it triggered by elements that match the given
    * selector.
    * @param {!Element} element The container DOM element to listen to the event on.
    * @param {string} eventName The name of the event to listen to.
    * @param {string} selector The selector that matches the child elements that
    *   the event should be triggered for.
    * @param {!function(!Object)} callback Function to be called when the event is
    *   triggered. It will receive the normalized event object.
    * @return {!DomEventHandle} Can be used to remove the listener.
    */
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

			/**
    * Inserts node in document as last element.
    * @param {Element} node Element to remove children from.
    */
		}, {
			key: 'enterDocument',
			value: function enterDocument(node) {
				dom.append(document.body, node);
			}

			/**
    * Removes node from document.
    * @param {Element} node Element to remove children from.
    */
		}, {
			key: 'exitDocument',
			value: function exitDocument(node) {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}

			/**
    * This is called when an event is triggered by a delegate listener (see
    * `dom.delegate` for more details).
    * @param {string} selector The selector or element that matches the child
    *   elements that the event should be triggered for.
    * @param {!function(!Object)} callback Function to be called when the event
    *   is triggered. It will receive the normalized event object.
    * @param {!Event} event The event payload.
    * @return {boolean} False if at least one of the triggered callbacks returns
    *   false, or true otherwise.
    */
		}, {
			key: 'handleDelegateEvent_',
			value: function handleDelegateEvent_(selector, callback, event) {
				dom.normalizeDelegateEvent_(event);

				var currentElement = event.target;
				var returnValue = true;

				while (currentElement && !event.stopped) {
					if (core.isString(selector) && dom.match(currentElement, selector)) {
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

			/**
    * Checks if the given element has the requested css class.
    * @param {!Element} element
    * @param {string} className
    * @return {boolean}
    */
		}, {
			key: 'hasClass',
			value: function hasClass(element, className) {
				if ('classList' in element) {
					return dom.hasClassWithNative_(element, className);
				} else {
					return dom.hasClassWithoutNative_(element, className);
				}
			}

			/**
    * Checks if the given element has the requested css class using classList.
    * @param {!Element} element
    * @param {string} className
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'hasClassWithNative_',
			value: function hasClassWithNative_(element, className) {
				return element.classList.contains(className);
			}

			/**
    * Checks if the given element has the requested css class without using classList.
    * @param {!Element} element
    * @param {string} className
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'hasClassWithoutNative_',
			value: function hasClassWithoutNative_(element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
			}

			/**
    * Checks if the given element is empty or not.
    * @param {!Element} element
    * @return {boolean}
    */
		}, {
			key: 'isEmpty',
			value: function isEmpty(element) {
				return element.childNodes.length === 0;
			}

			/**
    * Check if an element matches a given selector.
    * @param {Element} element
    * @param {string} selector
    * @return {boolean}
    */
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

			/**
    * Check if an element matches a given selector, using an internal implementation
    * instead of calling existing javascript functions.
    * @param {Element} element
    * @param {string} selector
    * @return {boolean}
    * @protected
    */
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

			/**
    * Normalizes the event payload for delegate listeners.
    * @param {!Event} event
    */
		}, {
			key: 'normalizeDelegateEvent_',
			value: function normalizeDelegateEvent_(event) {
				event.stopPropagation = dom.stopPropagation_;
				event.stopImmediatePropagation = dom.stopImmediatePropagation_;
			}

			/**
    * Listens to the specified event on the given DOM element. This function normalizes
    * DOM event payloads and functions so they'll work the same way on all supported
    * browsers.
    * @param {!Element|string} element The DOM element to listen to the event on, or
    *   a selector that should be delegated on the entire document.
    * @param {string} eventName The name of the event to listen to.
    * @param {!function(!Object)} callback Function to be called when the event is
    *   triggered. It will receive the normalized event object.
    * @return {!DomEventHandle} Can be used to remove the listener.
    */
		}, {
			key: 'on',
			value: function on(element, eventName, callback) {
				if (core.isString(element)) {
					return dom.delegate(document, eventName, element, callback);
				}
				var customConfig = dom.customEvents[eventName];
				if (customConfig && customConfig.event) {
					eventName = customConfig.originalEvent;
					callback = customConfig.handler.bind(customConfig, callback);
				}
				element.addEventListener(eventName, callback);
				return new DomEventHandle(element, eventName, callback);
			}

			/**
    * Listens to the specified event on the given DOM element once. This
    * function normalizes DOM event payloads and functions so they'll work the
    * same way on all supported browsers.
    * @param {!Element} element The DOM element to listen to the event on.
    * @param {string} eventName The name of the event to listen to.
    * @param {!function(!Object)} callback Function to be called when the event
    *   is triggered. It will receive the normalized event object.
    * @return {!DomEventHandle} Can be used to remove the listener.
    */
		}, {
			key: 'once',
			value: function once(element, eventName, callback) {
				var domEventHandle = this.on(element, eventName, function () {
					domEventHandle.removeListener();
					return callback.apply(this, arguments);
				});
				return domEventHandle;
			}

			/**
    * Registers a custom event.
    * @param {string} eventName The name of the custom event.
    * @param {!Object} customConfig An object with information about how the event
    *   should be handled.
    */
		}, {
			key: 'registerCustomEvent',
			value: function registerCustomEvent(eventName, customConfig) {
				dom.customEvents[eventName] = customConfig;
			}

			/**
    * Removes all the child nodes on a DOM node.
    * @param {Element} node Element to remove children from.
    */
		}, {
			key: 'removeChildren',
			value: function removeChildren(node) {
				var child;
				while (child = node.firstChild) {
					node.removeChild(child);
				}
			}

			/**
    * Removes the requested CSS classes from an element.
    * @param {!Element} element The element to remove CSS classes from.
    * @param {string} classes CSS classes to remove.
    */
		}, {
			key: 'removeClasses',
			value: function removeClasses(element, classes) {
				if (!core.isObject(element) || !core.isString(classes)) {
					return;
				}

				if ('classList' in element) {
					dom.removeClassesWithNative_(element, classes);
				} else {
					dom.removeClassesWithoutNative_(element, classes);
				}
			}

			/**
    * Removes the requested CSS classes from an element using classList.
    * @param {!Element} element The element to remove CSS classes from.
    * @param {string} classes CSS classes to remove.
    * @protected
    */
		}, {
			key: 'removeClassesWithNative_',
			value: function removeClassesWithNative_(element, classes) {
				classes.split(' ').forEach(function (className) {
					element.classList.remove(className);
				});
			}

			/**
    * Removes the requested CSS classes from an element without using classList.
    * @param {!Element} element The element to remove CSS classes from.
    * @param {string} classes CSS classes to remove.
    * @protected
    */
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

			/**
    * Replaces the first element with the second.
    * @param {Element} element1
    * @param {Element} element2
    */
		}, {
			key: 'replace',
			value: function replace(element1, element2) {
				if (element1 && element2 && element1 !== element2) {
					element1.parentNode.insertBefore(element2, element1);
					element1.parentNode.removeChild(element1);
				}
			}

			/**
    * The function that replaces `stopImmediatePropagation_` for events.
    * @protected
    */
		}, {
			key: 'stopImmediatePropagation_',
			value: function stopImmediatePropagation_() {
				this.stopped = true;
				Event.prototype.stopImmediatePropagation.call(this);
			}

			/**
    * The function that replaces `stopPropagation` for events.
    * @protected
    */
		}, {
			key: 'stopPropagation_',
			value: function stopPropagation_() {
				this.stopped = true;
				Event.prototype.stopPropagation.call(this);
			}

			/**
    * Checks if the given element supports the given event type.
    * @param {!Element|string} element The DOM element or element tag name to check.
    * @param {string} eventName The name of the event to check.
    * @return {boolean}
    */
		}, {
			key: 'supportsEvent',
			value: function supportsEvent(element, eventName) {
				if (dom.customEvents[eventName]) {
					return true;
				}

				if (core.isString(element)) {
					if (!elementsByTag[element]) {
						elementsByTag[element] = document.createElement(element);
					}
					element = elementsByTag[element];
				}
				return 'on' + eventName in element;
			}

			/**
    * Converts the given argument to a DOM element. Strings are assumed to
    * be selectors, and so a matched element will be returned. If the arg
    * is already a DOM element it will be the return value.
    * @param {string|Element|Document} selectorOrElement
    * @return {Element} The converted element, or null if none was found.
    */
		}, {
			key: 'toElement',
			value: function toElement(selectorOrElement) {
				if (core.isElement(selectorOrElement) || core.isDocument(selectorOrElement)) {
					return selectorOrElement;
				} else if (core.isString(selectorOrElement)) {
					if (selectorOrElement[0] === '#' && selectorOrElement.indexOf(' ') === -1) {
						return document.getElementById(selectorOrElement.substr(1));
					} else {
						return document.querySelector(selectorOrElement);
					}
				} else {
					return null;
				}
			}

			/**
    * Adds or removes one or more classes from an element. If any of the classes
    * is present, it will be removed from the element, or added otherwise.
    * @param {!Element} element The element which classes will be toggled.
    * @param {string} classes The classes which have to added or removed from the element.
    */
		}, {
			key: 'toggleClasses',
			value: function toggleClasses(element, classes) {
				if (!core.isObject(element) || !core.isString(classes)) {
					return;
				}

				if ('classList' in element) {
					dom.toggleClassesWithNative_(element, classes);
				} else {
					dom.toggleClassesWithoutNative_(element, classes);
				}
			}

			/**
    * Adds or removes one or more classes from an element using classList.
    * If any of the classes is present, it will be removed from the element,
    * or added otherwise.
    * @param {!Element} element The element which classes will be toggled.
    * @param {string} classes The classes which have to added or removed from the element.
    */
		}, {
			key: 'toggleClassesWithNative_',
			value: function toggleClassesWithNative_(element, classes) {
				classes.split(' ').forEach(function (className) {
					element.classList.toggle(className);
				});
			}

			/**
    * Adds or removes one or more classes from an element without using classList.
    * If any of the classes is present, it will be removed from the element,
    * or added otherwise.
    * @param {!Element} element The element which classes will be toggled.
    * @param {string} classes The classes which have to added or removed from the element.
    */
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

			/**
    * Triggers the specified event on the given element.
    * NOTE: This should mostly be used for testing, not on real code.
    * @param {!Element} element The node that should trigger the event.
    * @param {string} eventName The name of the event to be triggred.
    * @param {Object=} opt_eventObj An object with data that should be on the
    *   triggered event's payload.
    */
		}, {
			key: 'triggerEvent',
			value: function triggerEvent(element, eventName, opt_eventObj) {
				var eventObj = document.createEvent('HTMLEvents');
				eventObj.initEvent(eventName, true, true);
				object.mixin(eventObj, opt_eventObj);
				element.dispatchEvent(eventObj);
			}
		}]);
		return dom;
	})();

	var elementsByTag = {};
	dom.customEvents = {};

	this.steel.dom = dom;
}).call(this);
(function () {
	'use strict';

	var array = (function () {
		function array() {
			babelHelpers.classCallCheck(this, array);
		}

		babelHelpers.createClass(array, null, [{
			key: 'equal',

			/**
    * Checks if the given arrays have the same content.
    * @param {!Array<*>} arr1
    * @param {!Array<*>} arr2
    * @return {boolean}
    */
			value: function equal(arr1, arr2) {
				for (var i = 0; i < arr1.length; i++) {
					if (arr1[i] !== arr2[i]) {
						return false;
					}
				}
				return arr1.length === arr2.length;
			}

			/**
    * Returns the first value in the given array that isn't undefined.
    * @param {!Array} arr
    * @return {*}
    */
		}, {
			key: 'firstDefinedValue',
			value: function firstDefinedValue(arr) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] !== undefined) {
						return arr[i];
					}
				}
			}

			/**
    * Transforms the input nested array to become flat.
    * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
    * @param {Array.<*>} opt_output Optional output array.
    * @return {Array.<*>} Flat array.
    */
		}, {
			key: 'flatten',
			value: function flatten(arr, opt_output) {
				var output = opt_output || [];
				for (var i = 0; i < arr.length; i++) {
					if (Array.isArray(arr[i])) {
						array.flatten(arr[i], output);
					} else {
						output.push(arr[i]);
					}
				}
				return output;
			}

			/**
    * Removes the first occurrence of a particular value from an array.
    * @param {Array.<T>} arr Array from which to remove value.
    * @param {T} obj Object to remove.
    * @return {boolean} True if an element was removed.
    * @template T
    */
		}, {
			key: 'remove',
			value: function remove(arr, obj) {
				var i = arr.indexOf(obj);
				var rv;
				if (rv = i >= 0) {
					array.removeAt(arr, i);
				}
				return rv;
			}

			/**
    * Removes from an array the element at index i
    * @param {Array} arr Array or array like object from which to remove value.
    * @param {number} i The index to remove.
    * @return {boolean} True if an element was removed.
    */
		}, {
			key: 'removeAt',
			value: function removeAt(arr, i) {
				return Array.prototype.splice.call(arr, i, 1).length === 1;
			}
		}]);
		return array;
	})();

	this.steel.array = array;
}).call(this);
(function () {
	'use strict';

	var string = (function () {
		function string() {
			babelHelpers.classCallCheck(this, string);
		}

		babelHelpers.createClass(string, null, [{
			key: 'collapseBreakingSpaces',

			/**
    * Removes the breaking spaces from the left and right of the string and
    * collapses the sequences of breaking spaces in the middle into single spaces.
    * The original and the result strings render the same way in HTML.
    * @param {string} str A string in which to collapse spaces.
    * @return {string} Copy of the string with normalized breaking spaces.
    */
			value: function collapseBreakingSpaces(str) {
				return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
			}

			/**
    * Calculates the hashcode for a string. The hashcode value is computed by
    * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
    * property of using 31 prime is that the multiplication can be replaced by
    * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
    * Modern VMs do this sort of optimization automatically.
    * @param {String} val Target string.
    * @return {Number} Returns the string hashcode.
    */
		}, {
			key: 'hashCode',
			value: function hashCode(val) {
				var hash = 0;
				for (var i = 0, len = val.length; i < len; i++) {
					hash = 31 * hash + val.charCodeAt(i);
					hash %= 0x100000000;
				}
				return hash;
			}

			/**
    * Replaces interval into the string with specified value, e.g.
    * `replaceInterval("abcde", 1, 4, "")` returns "ae".
    * @param {string} str The input string.
    * @param {Number} start Start interval position to be replaced.
    * @param {Number} end End interval position to be replaced.
    * @param {string} value The value that replaces the specified interval.
    * @return {string}
    */
		}, {
			key: 'replaceInterval',
			value: function replaceInterval(str, start, end, value) {
				return str.substring(0, start) + value + str.substring(end);
			}
		}]);
		return string;
	})();

	this.steel.string = string;
}).call(this);
(function () {
	'use strict';

	var dom = this.steel.dom;
	var string = this.steel.string;

	/**
  * Class with static methods responsible for doing browser feature checks.
  */

	var features = (function () {
		function features() {
			babelHelpers.classCallCheck(this, features);
		}

		babelHelpers.createClass(features, null, [{
			key: 'checkAnimationEventName',

			/**
    * Some browsers still supports prefixed animation events. This method can
    * be used to retrieve the current browser event name for both, animation
    * and transition.
    * @return {object}
    */
			value: function checkAnimationEventName() {
				if (features.animationEventName_ === undefined) {
					features.animationEventName_ = {
						animation: features.checkAnimationEventName_('animation'),
						transition: features.checkAnimationEventName_('transition')
					};
				}
				return features.animationEventName_;
			}

			/**
    * @protected
    * @param {string} type Type to test: animation, transition.
    * @return {string} Browser event name.
    */
		}, {
			key: 'checkAnimationEventName_',
			value: function checkAnimationEventName_(type) {
				var prefixes = ['Webkit', 'MS', 'O', ''];
				var typeTitleCase = string.replaceInterval(type, 0, 1, type.substring(0, 1).toUpperCase());
				var suffixes = [typeTitleCase + 'End', typeTitleCase + 'End', typeTitleCase + 'End', type + 'end'];
				for (var i = 0; i < prefixes.length; i++) {
					if (features.animationElement_.style[prefixes[i] + typeTitleCase] !== undefined) {
						return prefixes[i].toLowerCase() + suffixes[i];
					}
				}
				return type + 'end';
			}

			/**
    * Some browsers (like IE9) change the order of element attributes, when html
    * is rendered. This method can be used to check if this behavior happens on
    * the current browser.
    * @return {boolean}
    */
		}, {
			key: 'checkAttrOrderChange',
			value: function checkAttrOrderChange() {
				if (features.attrOrderChange_ === undefined) {
					var originalContent = '<div data-component="" data-ref=""></div>';
					var element = document.createElement('div');
					dom.append(element, originalContent);
					features.attrOrderChange_ = originalContent !== element.innerHTML;
				}
				return features.attrOrderChange_;
			}
		}]);
		return features;
	})();

	features.animationElement_ = document.createElement('div');
	features.animationEventName_ = undefined;
	features.attrOrderChange_ = undefined;

	this.steel.features = features;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var string = this.steel.string;

	var html = (function () {
		function html() {
			babelHelpers.classCallCheck(this, html);
		}

		/**
   * HTML regex patterns.
   * @enum {RegExp}
   * @protected
   */
		babelHelpers.createClass(html, null, [{
			key: 'compress',

			/**
    * Minifies given HTML source by removing extra white spaces, comments and
    * other unneeded characters without breaking the content structure. As a
    * result HTML become smaller in size.
    * - Contents within <code>, <pre>, <script>, <style>, <textarea> and
    *   conditional comments tags are preserved.
    * - Comments are removed.
    * - Conditional comments are preserved.
    * - Breaking spaces are collapsed into a single space.
    * - Unneeded spaces inside tags (around = and before />) are removed.
    * - Spaces between tags are removed, even from inline-block elements.
    * - Spaces surrounding tags are removed.
    * - DOCTYPE declaration is simplified to <!DOCTYPE html>.
    * - Does not remove default attributes from <script>, <style>, <link>,
    *   <form>, <input>.
    * - Does not remove values from boolean tag attributes.
    * - Does not remove "javascript:" from in-line event handlers.
    * - Does not remove http:// and https:// protocols.
    * @param {string} htmlString Input HTML to be compressed.
    * @return {string} Compressed version of the HTML.
    */
			value: function compress(htmlString) {
				var preserved = {};
				htmlString = html.preserveBlocks_(htmlString, preserved);
				htmlString = html.simplifyDoctype_(htmlString);
				htmlString = html.removeComments_(htmlString);
				htmlString = html.removeIntertagSpaces_(htmlString);
				htmlString = html.collapseBreakingSpaces_(htmlString);
				htmlString = html.removeSpacesInsideTags_(htmlString);
				htmlString = html.removeSurroundingSpaces_(htmlString);
				htmlString = html.returnBlocks_(htmlString, preserved);
				return htmlString.trim();
			}

			/**
    * Collapses breaking spaces into a single space.
    * @param {string} htmlString
    * @return {string}
    * @protected
    */
		}, {
			key: 'collapseBreakingSpaces_',
			value: function collapseBreakingSpaces_(htmlString) {
				return string.collapseBreakingSpaces(htmlString);
			}

			/**
    * Searches for first occurrence of the specified open tag string pattern
    * and from that point finds next ">" position, identified as possible tag
    * end position.
    * @param {string} htmlString
    * @param {string} openTag Open tag string pattern without open tag ending
    *     character, e.g. "<textarea" or "<code".
    * @return {string}
    * @protected
    */
		}, {
			key: 'lookupPossibleTagBoundary_',
			value: function lookupPossibleTagBoundary_(htmlString, openTag) {
				var tagPos = htmlString.indexOf(openTag);
				if (tagPos > -1) {
					tagPos += htmlString.substring(tagPos).indexOf('>') + 1;
				}
				return tagPos;
			}

			/**
    * Preserves contents inside any <code>, <pre>, <script>, <style>,
    * <textarea> and conditional comment tags. When preserved, original content
    * are replaced with an unique generated block id and stored into
    * `preserved` map.
    * @param {string} htmlString
    * @param {Object} preserved Object to preserve the content indexed by an
    *     unique generated block id.
    * @return {html} The preserved HTML.
    * @protected
    */
		}, {
			key: 'preserveBlocks_',
			value: function preserveBlocks_(htmlString, preserved) {
				htmlString = html.preserveOuterHtml_(htmlString, '<!--[if', '<![endif]-->', preserved);
				htmlString = html.preserveInnerHtml_(htmlString, '<code', '</code', preserved);
				htmlString = html.preserveInnerHtml_(htmlString, '<pre', '</pre', preserved);
				htmlString = html.preserveInnerHtml_(htmlString, '<script', '</script', preserved);
				htmlString = html.preserveInnerHtml_(htmlString, '<style', '</style', preserved);
				htmlString = html.preserveInnerHtml_(htmlString, '<textarea', '</textarea', preserved);
				return htmlString;
			}

			/**
    * Preserves inner contents inside the specified tag. When preserved,
    * original content are replaced with an unique generated block id and
    * stored into `preserved` map.
    * @param {string} htmlString
    * @param {string} openTag Open tag string pattern without open tag ending
    *     character, e.g. "<textarea" or "<code".
    * @param {string} closeTag Close tag string pattern without close tag
    *     ending character, e.g. "</textarea" or "</code".
    * @param {Object} preserved Object to preserve the content indexed by an
    *     unique generated block id.
    * @return {html} The preserved HTML.
    * @protected
    */
		}, {
			key: 'preserveInnerHtml_',
			value: function preserveInnerHtml_(htmlString, openTag, closeTag, preserved) {
				var tagPosEnd = html.lookupPossibleTagBoundary_(htmlString, openTag);
				while (tagPosEnd > -1) {
					var tagEndPos = htmlString.indexOf(closeTag);
					htmlString = html.preserveInterval_(htmlString, tagPosEnd, tagEndPos, preserved);
					htmlString = htmlString.replace(openTag, '%%%~1~%%%');
					htmlString = htmlString.replace(closeTag, '%%%~2~%%%');
					tagPosEnd = html.lookupPossibleTagBoundary_(htmlString, openTag);
				}
				htmlString = htmlString.replace(/%%%~1~%%%/g, openTag);
				htmlString = htmlString.replace(/%%%~2~%%%/g, closeTag);
				return htmlString;
			}

			/**
    * Preserves interval of the specified HTML into the preserved map replacing
    * original contents with an unique generated id.
    * @param {string} htmlString
    * @param {Number} start Start interval position to be replaced.
    * @param {Number} end End interval position to be replaced.
    * @param {Object} preserved Object to preserve the content indexed by an
    *     unique generated block id.
    * @return {string} The HTML with replaced interval.
    * @protected
    */
		}, {
			key: 'preserveInterval_',
			value: function preserveInterval_(htmlString, start, end, preserved) {
				var blockId = '%%%~BLOCK~' + core.getUid() + '~%%%';
				preserved[blockId] = htmlString.substring(start, end);
				return string.replaceInterval(htmlString, start, end, blockId);
			}

			/**
    * Preserves outer contents inside the specified tag. When preserved,
    * original content are replaced with an unique generated block id and
    * stored into `preserved` map.
    * @param {string} htmlString
    * @param {string} openTag Open tag string pattern without open tag ending
    *     character, e.g. "<textarea" or "<code".
    * @param {string} closeTag Close tag string pattern without close tag
    *     ending character, e.g. "</textarea" or "</code".
    * @param {Object} preserved Object to preserve the content indexed by an
    *     unique generated block id.
    * @return {html} The preserved HTML.
    * @protected
    */
		}, {
			key: 'preserveOuterHtml_',
			value: function preserveOuterHtml_(htmlString, openTag, closeTag, preserved) {
				var tagPos = htmlString.indexOf(openTag);
				while (tagPos > -1) {
					var tagEndPos = htmlString.indexOf(closeTag) + closeTag.length;
					htmlString = html.preserveInterval_(htmlString, tagPos, tagEndPos, preserved);
					tagPos = htmlString.indexOf(openTag);
				}
				return htmlString;
			}

			/**
    * Removes all comments of the HTML. Including conditional comments and
    * "<![CDATA[" blocks.
    * @param {string} htmlString
    * @return {string} The HTML without comments.
    * @protected
    */
		}, {
			key: 'removeComments_',
			value: function removeComments_(htmlString) {
				var preserved = {};
				htmlString = html.preserveOuterHtml_(htmlString, '<![CDATA[', ']]>', preserved);
				htmlString = html.preserveOuterHtml_(htmlString, '<!--', '-->', preserved);
				htmlString = html.replacePreservedBlocks_(htmlString, preserved, '');
				return htmlString;
			}

			/**
    * Removes spaces between tags, even from inline-block elements.
    * @param {string} htmlString
    * @return {string} The HTML without spaces between tags.
    * @protected
    */
		}, {
			key: 'removeIntertagSpaces_',
			value: function removeIntertagSpaces_(htmlString) {
				htmlString = htmlString.replace(html.Patterns.INTERTAG_CUSTOM_CUSTOM, '~%%%%%%~');
				htmlString = htmlString.replace(html.Patterns.INTERTAG_CUSTOM_TAG, '~%%%<');
				htmlString = htmlString.replace(html.Patterns.INTERTAG_TAG, '><');
				htmlString = htmlString.replace(html.Patterns.INTERTAG_TAG_CUSTOM, '>%%%~');
				return htmlString;
			}

			/**
    * Removes spaces inside tags.
    * @param {string} htmlString
    * @return {string} The HTML without spaces inside tags.
    * @protected
    */
		}, {
			key: 'removeSpacesInsideTags_',
			value: function removeSpacesInsideTags_(htmlString) {
				htmlString = htmlString.replace(html.Patterns.TAG_END_SPACES, '$1$2');
				htmlString = htmlString.replace(html.Patterns.TAG_QUOTE_SPACES, '=$1$2$3');
				return htmlString;
			}

			/**
    * Removes spaces surrounding tags.
    * @param {string} htmlString
    * @return {string} The HTML without spaces surrounding tags.
    * @protected
    */
		}, {
			key: 'removeSurroundingSpaces_',
			value: function removeSurroundingSpaces_(htmlString) {
				return htmlString.replace(html.Patterns.SURROUNDING_SPACES, '$1');
			}

			/**
    * Restores preserved map keys inside the HTML. Note that the passed HTML
    * should contain the unique generated block ids to be replaced.
    * @param {string} htmlString
    * @param {Object} preserved Object to preserve the content indexed by an
    *     unique generated block id.
    * @param {string} replaceValue The value to replace any block id inside the
    * HTML.
    * @return {string}
    * @protected
    */
		}, {
			key: 'replacePreservedBlocks_',
			value: function replacePreservedBlocks_(htmlString, preserved, replaceValue) {
				for (var blockId in preserved) {
					htmlString = htmlString.replace(blockId, replaceValue);
				}
				return htmlString;
			}

			/**
    * Simplifies DOCTYPE declaration to <!DOCTYPE html>.
    * @param {string} htmlString
    * @return {string}
    * @protected
    */
		}, {
			key: 'simplifyDoctype_',
			value: function simplifyDoctype_(htmlString) {
				var preserved = {};
				htmlString = html.preserveOuterHtml_(htmlString, '<!DOCTYPE', '>', preserved);
				htmlString = html.replacePreservedBlocks_(htmlString, preserved, '<!DOCTYPE html>');
				return htmlString;
			}

			/**
    * Restores preserved map original contents inside the HTML. Note that the
    * passed HTML should contain the unique generated block ids to be restored.
    * @param {string} htmlString
    * @param {Object} preserved Object to preserve the content indexed by an
    *     unique generated block id.
    * @return {string}
    * @protected
    */
		}, {
			key: 'returnBlocks_',
			value: function returnBlocks_(htmlString, preserved) {
				for (var blockId in preserved) {
					htmlString = htmlString.replace(blockId, preserved[blockId]);
				}
				return htmlString;
			}
		}]);
		return html;
	})();

	html.Patterns = {
		/**
   * @type {RegExp}
   */
		INTERTAG_CUSTOM_CUSTOM: /~%%%\s+%%%~/g,

		/**
   * @type {RegExp}
   */
		INTERTAG_TAG_CUSTOM: />\s+%%%~/g,

		/**
   * @type {RegExp}
   */
		INTERTAG_CUSTOM_TAG: /~%%%\s+</g,

		/**
   * @type {RegExp}
   */
		INTERTAG_TAG: />\s+</g,

		/**
   * @type {RegExp}
   */
		SURROUNDING_SPACES: /\s*(<[^>]+>)\s*/g,

		/**
   * @type {RegExp}
   */
		TAG_END_SPACES: /(<(?:[^>]+?))(?:\s+?)(\/?>)/g,

		/**
   * @type {RegExp}
   */
		TAG_QUOTE_SPACES: /\s*=\s*(["']?)\s*(.*?)\s*(\1)/g
	};

	this.steel.html = html;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var Disposable = this.steel.Disposable;
	var EventHandle = this.steel.EventHandle;

	/**
  * EventEmitter utility.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitter = (function (_Disposable) {
		babelHelpers.inherits(EventEmitter, _Disposable);

		function EventEmitter() {
			babelHelpers.classCallCheck(this, EventEmitter);

			babelHelpers.get(Object.getPrototypeOf(EventEmitter.prototype), 'constructor', this).call(this);

			/**
    * Holds event listeners scoped by event type.
    * @type {!Object<string, !Array<!function()>>}
    * @protected
    */
			this.events_ = [];

			/**
    * The maximum number of listeners allowed for each event type. If the number
    * becomes higher than the max, a warning will be issued.
    * @type {number}
    * @protected
    */
			this.maxListeners_ = 10;

			/**
    * Configuration option which determines if an event facade should be sent
    * as a param of listeners when emitting events. If set to true, the facade
    * will be passed as the first argument of the listener.
    * @type {boolean}
    * @protected
    */
			this.shouldUseFacade_ = false;
		}

		/**
   * Adds a listener to the end of the listeners array for the specified events.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @param {boolean} opt_default Flag indicating if this listener is a default
   *   action for this event. Default actions are run last, and only if no previous
   *   listener call `preventDefault()` on the received event facade.
   * @return {!EventHandle} Can be used to remove the listener.
   */
		babelHelpers.createClass(EventEmitter, [{
			key: 'addListener',
			value: function addListener(events, listener, opt_default) {
				this.validateListener_(listener);

				events = this.normalizeEvents_(events);
				for (var i = 0; i < events.length; i++) {
					this.addSingleListener_(events[i], listener, opt_default);
				}

				return new EventHandle(this, events, listener);
			}

			/**
    * Adds a listener to the end of the listeners array for a single event.
    * @param {string} event
    * @param {!Function} listener
    * @param {boolean} opt_default Flag indicating if this listener is a default
    *   action for this event. Default actions are run last, and only if no previous
    *   listener call `preventDefault()` on the received event facade.
    * @return {!EventHandle} Can be used to remove the listener.
    * @param {Function=} opt_origin The original function that was added as a
    *   listener, if there is any.
    * @protected
    */
		}, {
			key: 'addSingleListener_',
			value: function addSingleListener_(event, listener, opt_default, opt_origin) {
				this.emit('newListener', event, listener);

				if (!this.events_[event]) {
					this.events_[event] = [];
				}
				this.events_[event].push({
					'default': opt_default,
					fn: listener,
					origin: opt_origin
				});

				var listeners = this.events_[event];
				if (listeners.length > this.maxListeners_ && !listeners.warned) {
					console.warn('Possible EventEmitter memory leak detected. %d listeners added ' + 'for event %s. Use emitter.setMaxListeners() to increase limit.', listeners.length, event);
					listeners.warned = true;
				}
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.events_ = [];
			}

			/**
    * Execute each of the listeners in order with the supplied arguments.
    * @param {string} event
    * @param {*} opt_args [arg1], [arg2], [...]
    * @return {boolean} Returns true if event had listeners, false otherwise.
    */
		}, {
			key: 'emit',
			value: function emit(event) {
				var args = Array.prototype.slice.call(arguments, 1);
				var listeners = (this.events_[event] || []).concat();

				var facade;
				if (this.getShouldUseFacade()) {
					facade = {
						preventDefault: function preventDefault() {
							facade.preventedDefault = true;
						},
						target: this,
						type: event
					};
					args.push(facade);
				}

				var defaultListeners = [];
				for (var i = 0; i < listeners.length; i++) {
					if (listeners[i]['default']) {
						defaultListeners.push(listeners[i]);
					} else {
						listeners[i].fn.apply(this, args);
					}
				}
				if (!facade || !facade.preventedDefault) {
					for (var j = 0; j < defaultListeners.length; j++) {
						defaultListeners[j].fn.apply(this, args);
					}
				}

				if (event !== '*') {
					this.emit.apply(this, ['*', event].concat(args));
				}

				return listeners.length > 0;
			}

			/**
    * Gets the configuration option which determines if an event facade should
    * be sent as a param of listeners when emitting events. If set to true, the
    * facade will be passed as the first argument of the listener.
    * @return {boolean}
    */
		}, {
			key: 'getShouldUseFacade',
			value: function getShouldUseFacade() {
				return this.shouldUseFacade_;
			}

			/**
    * Returns an array of listeners for the specified event.
    * @param {string} event
    * @return {Array} Array of listeners.
    */
		}, {
			key: 'listeners',
			value: function listeners(event) {
				return (this.events_[event] || []).map(function (listener) {
					return listener.fn;
				});
			}

			/**
    * Adds a listener that will be invoked a fixed number of times for the
    * events. After each event is triggered the specified amount of times, the
    * listener is removed for it.
    * @param {!(Array|string)} events
    * @param {number} amount The amount of times this event should be listened
    * to.
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */
		}, {
			key: 'many',
			value: function many(events, amount, listener) {
				events = this.normalizeEvents_(events);
				for (var i = 0; i < events.length; i++) {
					this.many_(events[i], amount, listener);
				}

				return new EventHandle(this, events, listener);
			}

			/**
    * Adds a listener that will be invoked a fixed number of times for a single
    * event. After the event is triggered the specified amount of times, the
    * listener is removed.
    * @param {string} event
    * @param {number} amount The amount of times this event should be listened
    * to.
    * @param {!Function} listener
    * @protected
    */
		}, {
			key: 'many_',
			value: function many_(event, amount, listener) {
				var self = this;

				if (amount <= 0) {
					return;
				}

				function handlerInternal() {
					if (--amount === 0) {
						self.removeListener(event, handlerInternal);
					}
					listener.apply(self, arguments);
				}

				self.addSingleListener_(event, handlerInternal, false, listener);
			}

			/**
    * Checks if a listener object matches the given listener function. To match,
    * it needs to either point to that listener or have it as its origin.
    * @param {!Object} listenerObj
    * @param {!Function} listener
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'matchesListener_',
			value: function matchesListener_(listenerObj, listener) {
				return listenerObj.fn === listener || listenerObj.origin && listenerObj.origin === listener;
			}

			/**
    * Converts the parameter to an array if only one event is given.
    * @param  {!(Array|string)} events
    * @return {!Array}
    * @protected
    */
		}, {
			key: 'normalizeEvents_',
			value: function normalizeEvents_(events) {
				return core.isString(events) ? [events] : events;
			}

			/**
    * Removes a listener for the specified events.
    * Caution: changes array indices in the listener array behind the listener.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!Object} Returns emitter, so calls can be chained.
    */
		}, {
			key: 'off',
			value: function off(events, listener) {
				this.validateListener_(listener);

				events = this.normalizeEvents_(events);
				for (var i = 0; i < events.length; i++) {
					var listenerObjs = this.events_[events[i]] || [];
					this.removeMatchingListenerObjs_(listenerObjs, listener);
				}

				return this;
			}

			/**
    * Adds a listener to the end of the listeners array for the specified events.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */
		}, {
			key: 'on',
			value: function on() {
				return this.addListener.apply(this, arguments);
			}

			/**
    * Adds a one time listener for the events. This listener is invoked only the
    * next time each event is fired, after which it is removed.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */
		}, {
			key: 'once',
			value: function once(events, listener) {
				return this.many(events, 1, listener);
			}

			/**
    * Removes all listeners, or those of the specified events. It's not a good
    * idea to remove listeners that were added elsewhere in the code,
    * especially when it's on an emitter that you didn't create.
    * @param {(Array|string)=} opt_events
    * @return {!Object} Returns emitter, so calls can be chained.
    */
		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners(opt_events) {
				if (opt_events) {
					var events = this.normalizeEvents_(opt_events);
					for (var i = 0; i < events.length; i++) {
						this.events_[events[i]] = null;
					}
				} else {
					this.events_ = {};
				}
				return this;
			}

			/**
    * Removes all listener objects from the given array that match the given
    * listener function.
    * @param {!Array.<Object>} listenerObjs
    * @param {!Function} listener
    * @protected
    */
		}, {
			key: 'removeMatchingListenerObjs_',
			value: function removeMatchingListenerObjs_(listenerObjs, listener) {
				for (var i = listenerObjs.length - 1; i >= 0; i--) {
					if (this.matchesListener_(listenerObjs[i], listener)) {
						listenerObjs.splice(i, 1);
					}
				}
			}

			/**
    * Removes a listener for the specified events.
    * Caution: changes array indices in the listener array behind the listener.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!Object} Returns emitter, so calls can be chained.
    */
		}, {
			key: 'removeListener',
			value: function removeListener() {
				return this.off.apply(this, arguments);
			}

			/**
    * By default EventEmitters will print a warning if more than 10 listeners
    * are added for a particular event. This is a useful default which helps
    * finding memory leaks. Obviously not all Emitters should be limited to 10.
    * This function allows that to be increased. Set to zero for unlimited.
    * @param {number} max The maximum number of listeners.
    * @return {!Object} Returns emitter, so calls can be chained.
    */
		}, {
			key: 'setMaxListeners',
			value: function setMaxListeners(max) {
				this.maxListeners_ = max;
				return this;
			}

			/**
    * Sets the configuration option which determines if an event facade should
    * be sent as a param of listeners when emitting events. If set to true, the
    * facade will be passed as the first argument of the listener.
    * @param {boolean} shouldUseFacade
    * @return {!Object} Returns emitter, so calls can be chained.
    */
		}, {
			key: 'setShouldUseFacade',
			value: function setShouldUseFacade(shouldUseFacade) {
				this.shouldUseFacade_ = shouldUseFacade;
				return this;
			}

			/**
    * Checks if the given listener is valid, throwing an exception when it's not.
    * @param  {*} listener
    * @protected
    */
		}, {
			key: 'validateListener_',
			value: function validateListener_(listener) {
				if (!core.isFunction(listener)) {
					throw new TypeError('Listener must be a function');
				}
			}
		}]);
		return EventEmitter;
	})(Disposable);

	this.steel.EventEmitter = EventEmitter;
}).call(this);
(function () {
	/*!
  * Polyfill from Google's Closure Library.
  * Copyright 2013 The Closure Library Authors. All Rights Reserved.
  */

	'use strict';

	var core = this.steel.core;

	var async = {};

	/**
  * Throw an item without interrupting the current execution context.  For
  * example, if processing a group of items in a loop, sometimes it is useful
  * to report an error while still allowing the rest of the batch to be
  * processed.
  * @param {*} exception
  */
	async.throwException = function (exception) {
		// Each throw needs to be in its own context.
		async.nextTick(function () {
			throw exception;
		});
	};

	/**
  * Fires the provided callback just before the current callstack unwinds, or as
  * soon as possible after the current JS execution context.
  * @param {function(this:THIS)} callback
  * @param {THIS=} opt_context Object to use as the "this value" when calling
  *     the provided function.
  * @template THIS
  */
	async.run = function (callback, opt_context) {
		if (!async.run.workQueueScheduled_) {
			// Nothing is currently scheduled, schedule it now.
			async.nextTick(async.run.processWorkQueue);
			async.run.workQueueScheduled_ = true;
		}

		async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
	};

	/** @private {boolean} */
	async.run.workQueueScheduled_ = false;

	/** @private {!Array.<!async.run.WorkItem_>} */
	async.run.workQueue_ = [];

	/**
  * Run any pending async.run work items. This function is not intended
  * for general use, but for use by entry point handlers to run items ahead of
  * async.nextTick.
  */
	async.run.processWorkQueue = function () {
		// NOTE: additional work queue items may be pushed while processing.
		while (async.run.workQueue_.length) {
			// Don't let the work queue grow indefinitely.
			var workItems = async.run.workQueue_;
			async.run.workQueue_ = [];
			for (var i = 0; i < workItems.length; i++) {
				var workItem = workItems[i];
				try {
					workItem.fn.call(workItem.scope);
				} catch (e) {
					async.throwException(e);
				}
			}
		}

		// There are no more work items, reset the work queue.
		async.run.workQueueScheduled_ = false;
	};

	/**
  * @constructor
  * @final
  * @struct
  * @private
  *
  * @param {function()} fn
  * @param {Object|null|undefined} scope
  */
	async.run.WorkItem_ = function (fn, scope) {
		/** @const */
		this.fn = fn;
		/** @const */
		this.scope = scope;
	};

	/**
  * Fires the provided callbacks as soon as possible after the current JS
  * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
  * reasons.
  * @param {function(this:SCOPE)} callback Callback function to fire as soon as
  *     possible.
  * @param {SCOPE=} opt_context Object in whose scope to call the listener.
  * @template SCOPE
  */
	async.nextTick = function (callback, opt_context) {
		var cb = callback;
		if (opt_context) {
			cb = callback.bind(opt_context);
		}
		cb = async.nextTick.wrapCallback_(cb);
		// Introduced and currently only supported by IE10.
		if (core.isFunction(window.setImmediate)) {
			window.setImmediate(cb);
			return;
		}
		// Look for and cache the custom fallback version of setImmediate.
		if (!async.nextTick.setImmediate_) {
			async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
		}
		async.nextTick.setImmediate_(cb);
	};

	/**
  * Cache for the setImmediate implementation.
  * @type {function(function())}
  * @private
  */
	async.nextTick.setImmediate_ = null;

	/**
  * Determines the best possible implementation to run a function as soon as
  * the JS event loop is idle.
  * @return {function(function())} The "setImmediate" implementation.
  * @private
  */
	async.nextTick.getSetImmediateEmulator_ = function () {
		// Create a private message channel and use it to postMessage empty messages
		// to ourselves.
		var Channel = window.MessageChannel;
		// If MessageChannel is not available and we are in a browser, implement
		// an iframe based polyfill in browsers that have postMessage and
		// document.addEventListener. The latter excludes IE8 because it has a
		// synchronous postMessage implementation.
		if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
			/** @constructor */
			Channel = function () {
				// Make an empty, invisible iframe.
				var iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = '';
				document.documentElement.appendChild(iframe);
				var win = iframe.contentWindow;
				var doc = win.document;
				doc.open();
				doc.write('');
				doc.close();
				var message = 'callImmediate' + Math.random();
				var origin = win.location.protocol + '//' + win.location.host;
				var onmessage = (function (e) {
					// Validate origin and message to make sure that this message was
					// intended for us.
					if (e.origin !== origin && e.data !== message) {
						return;
					}
					this.port1.onmessage();
				}).bind(this);
				win.addEventListener('message', onmessage, false);
				this.port1 = {};
				this.port2 = {
					postMessage: function postMessage() {
						win.postMessage(message, origin);
					}
				};
			};
		}
		if (typeof Channel !== 'undefined') {
			var channel = new Channel();
			// Use a fifo linked list to call callbacks in the right order.
			var head = {};
			var tail = head;
			channel.port1.onmessage = function () {
				head = head.next;
				var cb = head.cb;
				head.cb = null;
				cb();
			};
			return function (cb) {
				tail.next = {
					cb: cb
				};
				tail = tail.next;
				channel.port2.postMessage(0);
			};
		}
		// Implementation for IE6-8: Script elements fire an asynchronous
		// onreadystatechange event when inserted into the DOM.
		if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
			return function (cb) {
				var script = document.createElement('script');
				script.onreadystatechange = function () {
					// Clean up and call the callback.
					script.onreadystatechange = null;
					script.parentNode.removeChild(script);
					script = null;
					cb();
					cb = null;
				};
				document.documentElement.appendChild(script);
			};
		}
		// Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
		// or more.
		return function (cb) {
			setTimeout(cb, 0);
		};
	};

	/**
  * Helper function that is overrided to protect callbacks with entry point
  * monitor if the application monitors entry points.
  * @param {function()} callback Callback function to fire as soon as possible.
  * @return {function()} The wrapped callback.
  * @private
  */
	async.nextTick.wrapCallback_ = function (opt_returnValue) {
		return opt_returnValue;
	};

	this.steel.async = async;
}).call(this);
(function () {
	'use strict';

	var array = this.steel.array;
	var core = this.steel.core;
	var object = this.steel.object;
	var EventEmitter = this.steel.EventEmitter;
	var async = this.steel.async;

	/**
  * Attribute adds support for having object properties that can be watched for
  * changes, as well as configured with validators, setters and other options.
  * See the `addAttr` method for a complete list of available attribute
  * configuration options.
  * @constructor
  * @extends {EventEmitter}
  */

	var Attribute = (function (_EventEmitter) {
		babelHelpers.inherits(Attribute, _EventEmitter);

		function Attribute(opt_config) {
			babelHelpers.classCallCheck(this, Attribute);

			babelHelpers.get(Object.getPrototypeOf(Attribute.prototype), 'constructor', this).call(this);

			/**
    * Object with information about the batch event that is currently
    * scheduled, or null if none is.
    * @type {Object}
    * @protected
    */
			this.scheduledBatchData_ = null;

			/**
    * Object that contains information about all this instance's attributes.
    * @type {!Object<string, !Object>}
    * @protected
    */
			this.attrsInfo_ = {};

			this.setShouldUseFacade(true);
			this.mergeInvalidAttrs_();
			this.addAttrsFromStaticHint_(opt_config);
		}

		/**
   * A list with attribute names that will automatically be rejected as invalid.
   * Subclasses can define their own invalid attributes by setting this static
   * on their constructors, which will be merged together and handled automatically.
   * @type {!Array<string>}
   */

		/**
   * Adds the given attribute.
   * @param {string} name The name of the new attribute.
   * @param {Object.<string, *>=} config The configuration object for the new attribute.
   *   This object can have the following keys:
   *   setter - Function for normalizing new attribute values. It receives the new value
   *   that was set, and returns the value that should be stored.
   *   validator - Function that validates new attribute values. When it returns false,
   *   the new value is ignored.
   *   value - The default value for this attribute. Note that setting this to an object
   *   will cause all attribute instances to use the same reference to the object. To
   *   have each attribute instance use a different reference, use the `valueFn` option
   *   instead.
   *   valueFn - A function that returns the default value for this attribute.
   *   writeOnce - Ignores writes to the attribute after it's been first written to. That is,
   *   allows writes only when setting the attribute for the first time.
   * @param {*} initialValue The initial value of the new attribute. This value has higher
   *   precedence than the default value specified in this attribute's configuration.
   */
		babelHelpers.createClass(Attribute, [{
			key: 'addAttr',
			value: function addAttr(name, config, initialValue) {
				this.buildAttrInfo_(name, config, initialValue);
				Object.defineProperty(this, name, this.buildAttrPropertyDef_(name));
			}

			/**
    * Adds the given attributes.
    * @param {!Object.<string, !Object>} configs An object that maps the names of all the
    *   attributes to be added to their configuration objects.
    * @param {!Object.<string, *>} initialValues An object that maps the names of
    *   attributes to their initial values. These values have higher precedence than the
    *   default values specified in the attribute configurations.
    * @param {boolean|Object=} opt_defineContext If value is false
    *     `Object.defineProperties` will not be called. If value is a valid
    *     context it will be used as definition context, otherwise `this`
    *     will be the context.
    */
		}, {
			key: 'addAttrs',
			value: function addAttrs(configs, initialValues, opt_defineContext) {
				initialValues = initialValues || {};
				var names = Object.keys(configs);

				var props = {};
				for (var i = 0; i < names.length; i++) {
					var name = names[i];
					this.buildAttrInfo_(name, configs[name], initialValues[name]);
					props[name] = this.buildAttrPropertyDef_(name);
				}

				if (opt_defineContext !== false) {
					Object.defineProperties(opt_defineContext || this, props);
				}
			}

			/**
    * Adds attributes from super classes static hint `MyClass.ATTRS = {};`.
    * @param {!Object.<string, !Object>} configs An object that maps the names
    *     of all the attributes to be added to their configuration objects.
    * @protected
    */
		}, {
			key: 'addAttrsFromStaticHint_',
			value: function addAttrsFromStaticHint_(config) {
				var ctor = this.constructor;
				var defineContext = false;
				if (Attribute.mergeAttrsStatic(ctor)) {
					defineContext = ctor.prototype;
				}
				this.addAttrs(ctor.ATTRS_MERGED, config, defineContext);
			}

			/**
    * Checks that the given name is a valid attribute name. If it's not, an error
    * will be thrown.
    * @param {string} name The name to be validated.
    * @throws {Error}
    */
		}, {
			key: 'assertValidAttrName_',
			value: function assertValidAttrName_(name) {
				if (this.constructor.INVALID_ATTRS_MERGED[name]) {
					throw new Error('It\'s not allowed to create an attribute with the name "' + name + '".');
				}
			}

			/**
    * Builds the info object for the requested attribute.
    * @param {string} name The name of the attribute.
    * @param {Object} config The config object of the attribute.
    * @param {*} initialValue The initial value of the attribute.
    * @protected
    */
		}, {
			key: 'buildAttrInfo_',
			value: function buildAttrInfo_(name, config, initialValue) {
				this.assertValidAttrName_(name);

				this.attrsInfo_[name] = {
					config: config || {},
					initialValue: initialValue,
					state: Attribute.States.UNINITIALIZED
				};
			}

			/**
    * Builds the property definition object for the requested attribute.
    * @param {string} name The name of the attribute.
    * @return {!Object}
    * @protected
    */
		}, {
			key: 'buildAttrPropertyDef_',
			value: function buildAttrPropertyDef_(name) {
				return {
					configurable: true,
					enumerable: true,
					get: function get() {
						return this.getAttrValue_(name);
					},
					set: function set(val) {
						this.setAttrValue_(name, val);
					}
				};
			}

			/**
    * Calls the requested function, running the appropriate code for when it's
    * passed as an actual function object or just the function's name.
    * @param {!Function|string} fn Function, or name of the function to run.
    * @param {!Array} An optional array of parameters to be passed to the
    *   function that will be called.
    * @return {*} The return value of the called function.
    * @protected
    */
		}, {
			key: 'callFunction_',
			value: function callFunction_(fn, args) {
				if (core.isString(fn)) {
					return this[fn].apply(this, args);
				} else if (core.isFunction(fn)) {
					return fn.apply(this, args);
				}
			}

			/**
    * Calls the attribute's setter, if there is one.
    * @param {string} name The name of the attribute.
    * @param {*} value The value to be set.
    * @return {*} The final value to be set.
    */
		}, {
			key: 'callSetter_',
			value: function callSetter_(name, value) {
				var info = this.attrsInfo_[name];
				var config = info.config;
				if (config.setter) {
					value = this.callFunction_(config.setter, [value]);
				}
				return value;
			}

			/**
    * Calls the attribute's validator, if there is one.
    * @param {string} name The name of the attribute.
    * @param {*} value The value to be validated.
    * @return {boolean} Flag indicating if value is valid or not.
    */
		}, {
			key: 'callValidator_',
			value: function callValidator_(name, value) {
				var info = this.attrsInfo_[name];
				var config = info.config;
				if (config.validator) {
					return this.callFunction_(config.validator, [value]);
				}
				return true;
			}

			/**
    * Checks if the it's allowed to write on the requested attribute.
    * @param {string} name The name of the attribute.
    * @return {boolean}
    */
		}, {
			key: 'canSetAttribute',
			value: function canSetAttribute(name) {
				var info = this.attrsInfo_[name];
				return !info.config.writeOnce || !info.written;
			}

			/**
    * @inheritDoc
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(Object.getPrototypeOf(Attribute.prototype), 'disposeInternal', this).call(this);
				this.attrsInfo_ = null;
				this.scheduledBatchData_ = null;
			}

			/**
    * Emits the attribute change batch event.
    * @protected
    */
		}, {
			key: 'emitBatchEvent_',
			value: function emitBatchEvent_() {
				if (!this.isDisposed()) {
					var data = this.scheduledBatchData_;
					this.scheduledBatchData_ = null;
					this.emit('attrsChanged', data);
				}
			}

			/**
    * Returns the value of the requested attribute.
    * Note: this can and should be accomplished by accessing the attribute as a regular property.
    * This should only be used in cases where a function is actually needed.
    * @param {string} name
    * @return {*}
    */
		}, {
			key: 'get',
			value: function get(name) {
				return this[name];
			}

			/**
    * Gets the config object for the requested attribute.
    * @param {string} name The attribute's name.
    * @return {Object}
    * @protected
    */
		}, {
			key: 'getAttrConfig',
			value: function getAttrConfig(name) {
				return (this.attrsInfo_[name] || {}).config;
			}

			/**
    * Returns an object that maps attribute names to their values.
    * @param {Array<string>=} opt_names A list of names of the attributes that should be
    *   returned. If none is given, all attributes will be returned.
    * @return {Object.<string, *>}
    */
		}, {
			key: 'getAttrs',
			value: function getAttrs(opt_names) {
				var attrsMap = {};
				var names = opt_names || this.getAttrNames();

				for (var i = 0; i < names.length; i++) {
					attrsMap[names[i]] = this[names[i]];
				}

				return attrsMap;
			}

			/**
    * Returns an array with all attribute names.
    * @return {Array.<string>}
    */
		}, {
			key: 'getAttrNames',
			value: function getAttrNames() {
				return Object.keys(this.attrsInfo_);
			}

			/**
    * Gets the value of the specified attribute. This is passed as that attribute's
    * getter to the `Object.defineProperty` call inside the `addAttr` method.
    * @param {string} name The name of the attribute.
    * @return {*}
    * @protected
    */
		}, {
			key: 'getAttrValue_',
			value: function getAttrValue_(name) {
				this.initAttr_(name);

				return this.attrsInfo_[name].value;
			}

			/**
    * Informs of changes to an attributes value through an event. Won't trigger
    * the event if the value hasn't changed or if it's being initialized.
    * @param {string} name The name of the attribute.
    * @param {*} prevVal The previous value of the attribute.
    * @protected
    */
		}, {
			key: 'informChange_',
			value: function informChange_(name, prevVal) {
				if (this.shouldInformChange_(name, prevVal)) {
					var data = {
						attrName: name,
						newVal: this[name],
						prevVal: prevVal
					};
					this.emit(name + 'Changed', data);
					this.scheduleBatchEvent_(data);
				}
			}

			/**
    * Initializes the specified attribute, giving it a first value.
    * @param {string} name The name of the attribute.
    * @protected
    */
		}, {
			key: 'initAttr_',
			value: function initAttr_(name) {
				var info = this.attrsInfo_[name];
				if (info.state !== Attribute.States.UNINITIALIZED) {
					return;
				}

				info.state = Attribute.States.INITIALIZING;
				this.setInitialValue_(name);
				if (!info.written) {
					info.state = Attribute.States.INITIALIZING_DEFAULT;
					this.setDefaultValue_(name);
				}
				info.state = Attribute.States.INITIALIZED;
			}

			/**
    * Merges an array of values for the ATTRS property into a single object.
    * @param {!Array} values The values to be merged.
    * @return {!Object} The merged value.
    * @static
    * @protected
    */
		}, {
			key: 'mergeInvalidAttrs_',

			/**
    * Merges the values of the `INVALID_ATTRS` static for the whole hierarchy of
    * the current instance.
    * @protected
    */
			value: function mergeInvalidAttrs_() {
				core.mergeSuperClassesProperty(this.constructor, 'INVALID_ATTRS', function (values) {
					return array.flatten(values).reduce(function (merged, val) {
						if (val) {
							merged[val] = true;
						}
						return merged;
					}, {});
				});
			}

			/**
    * Removes the requested attribute.
    * @param {string} name The name of the attribute.
    */
		}, {
			key: 'removeAttr',
			value: function removeAttr(name) {
				this.attrsInfo_[name] = null;
				delete this[name];
			}

			/**
    * Schedules an attribute change batch event to be emitted asynchronously.
    * @param {!Object} attrChangeData Information about an attribute's update.
    * @protected
    */
		}, {
			key: 'scheduleBatchEvent_',
			value: function scheduleBatchEvent_(attrChangeData) {
				if (!this.scheduledBatchData_) {
					async.nextTick(this.emitBatchEvent_, this);
					this.scheduledBatchData_ = {
						changes: {}
					};
				}

				var name = attrChangeData.attrName;
				var changes = this.scheduledBatchData_.changes;
				if (changes[name]) {
					changes[name].newVal = attrChangeData.newVal;
				} else {
					changes[name] = attrChangeData;
				}
			}

			/**
    * Sets the value of the requested attribute.
    * Note: this can and should be accomplished by setting the attribute as a regular property.
    * This should only be used in cases where a function is actually needed.
    * @param {string} name
    * @param {*} value
    * @return {*}
    */
		}, {
			key: 'set',
			value: function set(name, value) {
				this[name] = value;
			}

			/**
    * Sets the value of all the specified attributes.
    * @param {!Object.<string,*>} values A map of attribute names to the values they
    *   should be set to.
    */
		}, {
			key: 'setAttrs',
			value: function setAttrs(values) {
				var names = Object.keys(values);

				for (var i = 0; i < names.length; i++) {
					this[names[i]] = values[names[i]];
				}
			}

			/**
    * Sets the value of the specified attribute. This is passed as that attribute's
    * setter to the `Object.defineProperty` call inside the `addAttr` method.
    * @param {string} name The name of the attribute.
    * @param {*} value The new value of the attribute.
    * @protected
    */
		}, {
			key: 'setAttrValue_',
			value: function setAttrValue_(name, value) {
				if (!this.canSetAttribute(name) || !this.validateAttrValue_(name, value)) {
					return;
				}

				var info = this.attrsInfo_[name];
				if (info.initialValue === undefined && info.state === Attribute.States.UNINITIALIZED) {
					info.state = Attribute.States.INITIALIZED;
				}

				var prevVal = this[name];
				info.value = this.callSetter_(name, value);
				info.written = true;
				this.informChange_(name, prevVal);
			}

			/**
    * Sets the default value of the requested attribute.
    * @param {string} name The name of the attribute.
    * @return {*}
    */
		}, {
			key: 'setDefaultValue_',
			value: function setDefaultValue_(name) {
				var config = this.attrsInfo_[name].config;

				if (config.value !== undefined) {
					this[name] = config.value;
				} else {
					this[name] = this.callFunction_(config.valueFn);
				}
			}

			/**
    * Sets the initial value of the requested attribute.
    * @param {string} name The name of the attribute.
    * @return {*}
    */
		}, {
			key: 'setInitialValue_',
			value: function setInitialValue_(name) {
				var info = this.attrsInfo_[name];
				if (info.initialValue !== undefined) {
					this[name] = info.initialValue;
					info.initialValue = undefined;
				}
			}

			/**
    * Checks if we should inform about an attributes update. Updates are ignored
    * during attribute initialization. Otherwise, updates to primitive values
    * are only informed when the new value is different from the previous
    * one. Updates to objects (which includes functions and arrays) are always
    * informed outside initialization though, since we can't be sure if all of
    * the internal data has stayed the same.
    * @param {string} name The name of the attribute.
    * @param {*} prevVal The previous value of the attribute.
    * @return {boolean}
    */
		}, {
			key: 'shouldInformChange_',
			value: function shouldInformChange_(name, prevVal) {
				var info = this.attrsInfo_[name];
				return info.state === Attribute.States.INITIALIZED && (core.isObject(prevVal) || prevVal !== this[name]);
			}

			/**
    * Validates the attribute's value, which includes calling the validator defined
    * in the attribute's configuration object, if there is one.
    * @param {string} name The name of the attribute.
    * @param {*} value The value to be validated.
    * @return {boolean} Flag indicating if value is valid or not.
    */
		}, {
			key: 'validateAttrValue_',
			value: function validateAttrValue_(name, value) {
				var info = this.attrsInfo_[name];

				return info.state === Attribute.States.INITIALIZING_DEFAULT || this.callValidator_(name, value);
			}
		}], [{
			key: 'mergeAttrs_',
			value: function mergeAttrs_(values) {
				return object.mixin.apply(null, [{}].concat(values.reverse()));
			}

			/**
    * Merges the ATTRS static variable for the given constructor function.
    * @param  {!Function} ctor Constructor function.
    * @return {boolean} Returns true if merge happens, false otherwise.
    * @static
    */
		}, {
			key: 'mergeAttrsStatic',
			value: function mergeAttrsStatic(ctor) {
				return core.mergeSuperClassesProperty(ctor, 'ATTRS', Attribute.mergeAttrs_);
			}
		}]);
		return Attribute;
	})(EventEmitter);

	Attribute.INVALID_ATTRS = ['attrs'];

	/**
  * Constants that represent the states that an attribute can be in.
  * @type {!Object}
  */
	Attribute.States = {
		UNINITIALIZED: 0,
		INITIALIZING: 1,
		INITIALIZING_DEFAULT: 2,
		INITIALIZED: 3
	};

	this.steel.Attribute = Attribute;
}).call(this);
(function () {
	'use strict';

	/**
  * The component registry is used to register components, so they can
  * be accessible by name.
  * @type {Object}
  */

	var ComponentRegistry = (function () {
		function ComponentRegistry() {
			babelHelpers.classCallCheck(this, ComponentRegistry);
		}

		/**
   * Holds all registered components, indexed by their names.
   * @type {!Object<string, function()>}
   * @protected
   * @static
   */
		babelHelpers.createClass(ComponentRegistry, null, [{
			key: 'getConstructor',

			/**
    * Gets the constructor function for the given component name, or
    * undefined if it hasn't been registered yet.
    * @param {string} name The component's name.
    * @return {?function}
    * @static
    */
			value: function getConstructor(name) {
				var constructorFn = ComponentRegistry.components_[name];
				if (!constructorFn) {
					console.error('There\'s no constructor registered for the component ' + 'named ' + name + '. Components need to be registered via ' + 'ComponentRegistry.register.');
				}
				return constructorFn;
			}

			/**
    * Registers a component.
    * @param {string} name The component's name.
    * @param {string} constructorFn The component's constructor function.
    * @static
    */
		}, {
			key: 'register',
			value: function register(name, constructorFn) {
				ComponentRegistry.components_[name] = constructorFn;
				constructorFn.NAME = name;
				constructorFn.TEMPLATES = ComponentRegistry.Templates[name];
			}
		}]);
		return ComponentRegistry;
	})();

	ComponentRegistry.components_ = {};

	/**
  * Holds all registered component templates, indexed by component names.
  * Soy files automatically add their templates to this object when imported.
  * @type {!Object<string, !Object<string, !function()>>}
  * @static
  */
	ComponentRegistry.Templates = {};

	this.steel.ComponentRegistry = ComponentRegistry;
}).call(this);
(function () {
	'use strict';

	var ComponentRegistry = this.steel.ComponentRegistry;
	var Disposable = this.steel.Disposable;

	var ComponentCollector = (function (_Disposable) {
		babelHelpers.inherits(ComponentCollector, _Disposable);

		function ComponentCollector() {
			babelHelpers.classCallCheck(this, ComponentCollector);
			babelHelpers.get(Object.getPrototypeOf(ComponentCollector.prototype), 'constructor', this).apply(this, arguments);
		}

		/**
   * Holds all collected components, indexed by their id.
   * @type {!Object<string, !Component>}
   */
		babelHelpers.createClass(ComponentCollector, [{
			key: 'addComponent',

			/**
    * Adds a component to this collector.
    * @param {!Component} component
    */
			value: function addComponent(component) {
				ComponentCollector.components[component.id] = component;
			}

			/**
    * Creates the appropriate component from the given config data if it doesn't
    * exist yet.
    * @param {string} componentName The name of the component to be created.
    * @param {string} id The id of the component to be created.
    * @param {Object=} opt_data
    * @return {!Component} The component instance.
    */
		}, {
			key: 'createComponent',
			value: function createComponent(componentName, id, opt_data) {
				var component = ComponentCollector.components[id];
				if (!component) {
					var ConstructorFn = ComponentRegistry.getConstructor(componentName);
					var data = opt_data || {};
					data.id = id;
					data.element = '#' + id;
					component = new ConstructorFn(data);
				}
				return component;
			}

			/**
    * Removes the given component from this collector.
    * @param {!Component} component
    */
		}, {
			key: 'removeComponent',
			value: function removeComponent(component) {
				delete ComponentCollector.components[component.id];
			}

			/**
    * Updates an existing component instance with new attributes.
    * @param {string} id The id of the component to be created or updated.
    * @param {Object=} opt_data
    * @return {Component} The extracted component instance.
    */
		}, {
			key: 'updateComponent',
			value: function updateComponent(id, opt_data) {
				var component = ComponentCollector.components[id];
				if (component && opt_data) {
					component.setAttrs(opt_data);
				}
				return component;
			}
		}]);
		return ComponentCollector;
	})(Disposable);

	ComponentCollector.components = {};

	this.steel.ComponentCollector = ComponentCollector;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var dom = this.steel.dom;
	var Disposable = this.steel.Disposable;

	/**
  * EventEmitterProxy utility. It's responsible for linking two EventEmitter
  * instances together, emitting events from the first emitter through the
  * second one. That means that listening to a supported event on the target
  * emitter will mean listening to it on the origin emitter as well.
  * @param {EventEmitter | Element} originEmitter Events originated on this emitter
  *   will be fired for the target emitter's listeners as well. Can be either a real
  *   EventEmitter instance or a DOM element.
  * @param {EventEmitter} targetEmitter Event listeners attached to this emitter
  *   will also be triggered when the event is fired by the origin emitter.
  * @param {Object} opt_blacklist Optional blacklist of events that should not be
  *   proxied.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitterProxy = (function (_Disposable) {
		babelHelpers.inherits(EventEmitterProxy, _Disposable);

		function EventEmitterProxy(originEmitter, targetEmitter, opt_blacklist, opt_whitelist) {
			babelHelpers.classCallCheck(this, EventEmitterProxy);

			babelHelpers.get(Object.getPrototypeOf(EventEmitterProxy.prototype), 'constructor', this).call(this);

			/**
    * Map of events that should not be proxied.
    * @type {Object}
    * @protected
    */
			this.blacklist_ = opt_blacklist || {};

			/**
    * The origin emitter. This emitter's events will be proxied through the
    * target emitter.
    * @type {EventEmitter}
    * @protected
    */
			this.originEmitter_ = originEmitter;

			/**
    * Holds a map of events from the origin emitter that are already being proxied.
    * @type {Object}
    * @protected
    */
			this.proxiedEvents_ = {};

			/**
    * The target emitter. This emitter will emit all events that come from
    * the origin emitter.
    * @type {EventEmitter}
    * @protected
    */
			this.targetEmitter_ = targetEmitter;

			/**
    * Map of events that should be proxied. If whitelist is set blacklist is ignored.
    * @type {Object}
    * @protected
    */
			this.whitelist_ = opt_whitelist;

			this.startProxy_();
		}

		/**
   * @inheritDoc
   */
		babelHelpers.createClass(EventEmitterProxy, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				var removeFnName = this.originEmitter_.removeEventListener ? 'removeEventListener' : 'removeListener';
				for (var event in this.proxiedEvents_) {
					this.originEmitter_[removeFnName](event, this.proxiedEvents_[event]);
				}

				this.proxiedEvents_ = null;
				this.originEmitter_ = null;
				this.targetEmitter_ = null;
			}

			/**
    * Proxies the given event from the origin to the target emitter.
    * @param {string} event
    */
		}, {
			key: 'proxyEvent_',
			value: function proxyEvent_(event) {
				if (!this.shouldProxyEvent_(event)) {
					return;
				}

				var self = this;
				this.proxiedEvents_[event] = function () {
					var args = [event].concat(Array.prototype.slice.call(arguments, 0));
					self.targetEmitter_.emit.apply(self.targetEmitter_, args);
				};

				if (core.isElement(this.originEmitter_) || core.isDocument(this.originEmitter_)) {
					dom.on(this.originEmitter_, event, this.proxiedEvents_[event]);
				} else {
					this.originEmitter_.on(event, this.proxiedEvents_[event]);
				}
			}

			/**
    * Checks if the given event should be proxied.
    * @param {string} event
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'shouldProxyEvent_',
			value: function shouldProxyEvent_(event) {
				if (this.whitelist_ && !this.whitelist_[event]) {
					return false;
				}
				if (this.blacklist_[event]) {
					return false;
				}
				return !this.proxiedEvents_[event] && (!(this.originEmitter_.removeEventListener || this.originEmitter_.addEventListener) || dom.supportsEvent(this.originEmitter_, event));
			}

			/**
    * Starts proxying all events from the origin to the target emitter.
    * @protected
    */
		}, {
			key: 'startProxy_',
			value: function startProxy_() {
				this.targetEmitter_.on('newListener', this.proxyEvent_.bind(this));
			}
		}]);
		return EventEmitterProxy;
	})(Disposable);

	this.steel.EventEmitterProxy = EventEmitterProxy;
}).call(this);
(function () {
	'use strict';

	var Disposable = this.steel.Disposable;

	/**
  * EventHandler utility. It's useful for easily removing a group of
  * listeners from different EventEmitter instances.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandler = (function (_Disposable) {
		babelHelpers.inherits(EventHandler, _Disposable);

		function EventHandler() {
			babelHelpers.classCallCheck(this, EventHandler);

			babelHelpers.get(Object.getPrototypeOf(EventHandler.prototype), 'constructor', this).call(this);

			/**
    * An array that holds the added event handles, so the listeners can be
    * removed later.
    * @type {Array.<EventHandle>}
    * @protected
    */
			this.eventHandles_ = [];
		}

		/**
   * Adds event handles to be removed later through the `removeAllListeners`
   * method.
   * @param {...(!EventHandle)} var_args
   */
		babelHelpers.createClass(EventHandler, [{
			key: 'add',
			value: function add() {
				for (var i = 0; i < arguments.length; i++) {
					this.eventHandles_.push(arguments[i]);
				}
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.eventHandles_ = null;
			}

			/**
    * Removes all listeners that have been added through the `add` method.
    */
		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners() {
				for (var i = 0; i < this.eventHandles_.length; i++) {
					this.eventHandles_[i].removeListener();
				}

				this.eventHandles_ = [];
			}
		}]);
		return EventHandler;
	})(Disposable);

	this.steel.EventHandler = EventHandler;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var ComponentCollector = this.steel.ComponentCollector;
	var Disposable = this.steel.Disposable;
	var EventHandler = this.steel.EventHandler;

	/**
  * Collects inline events from a passed element, detaching previously
  * attached events that are not being used anymore.
  * @param {Component} component
  * @constructor
  * @extends {Disposable}
  */

	var EventsCollector = (function (_Disposable) {
		babelHelpers.inherits(EventsCollector, _Disposable);

		function EventsCollector(component) {
			babelHelpers.classCallCheck(this, EventsCollector);

			babelHelpers.get(Object.getPrototypeOf(EventsCollector.prototype), 'constructor', this).call(this);

			if (!component) {
				throw new Error('The component instance is mandatory');
			}

			/**
    * Holds the component intance.
    * @type {!Component}
    * @protected
    */
			this.component_ = component;

			/**
    * Holds the attached delegate event handles, indexed by the css selector.
    * @type {!Object<string, EventHandler>}
    * @protected
    */
			this.eventHandles_ = {};

			/**
    * Holds flags indicating which selectors a group has listeners for.
    * @type {!Object<string, !Object<string, boolean>>}
    * @protected
    */
			this.groupHasListener_ = {};
		}

		/**
   * Attaches the listener described by the given params, unless it has already
   * been attached.
   * @param {string} eventType
   * @param {string} fnNamesString
   * @param {boolean} permanent
   * @protected
   */
		babelHelpers.createClass(EventsCollector, [{
			key: 'attachListener_',
			value: function attachListener_(eventType, fnNamesString, groupName) {
				var selector = '[data-on' + eventType + '="' + fnNamesString + '"]';

				this.groupHasListener_[groupName][selector] = true;

				if (!this.eventHandles_[selector]) {
					this.eventHandles_[selector] = new EventHandler();
					var fnNames = fnNamesString.split(',');
					for (var i = 0; i < fnNames.length; i++) {
						var fn = this.getListenerFn(fnNames[i]);
						if (fn) {
							this.eventHandles_[selector].add(this.component_.delegate(eventType, selector, this.onEvent_.bind(this, fn)));
						}
					}
				}
			}

			/**
    * Attaches all listeners declared as attributes on the given element and
    * its children.
    * @param {string} content
    * @param {boolean} groupName
    */
		}, {
			key: 'attachListeners',
			value: function attachListeners(content, groupName) {
				if (!core.isString(content)) {
					return;
				}
				this.groupHasListener_[groupName] = {};
				this.attachListenersFromHtml_(content, groupName);
			}

			/**
    * Attaches listeners found in the given html content.
    * @param {string} content
    * @param {boolean} groupName
    * @protected
    */
		}, {
			key: 'attachListenersFromHtml_',
			value: function attachListenersFromHtml_(content, groupName) {
				if (content.indexOf('data-on') === -1) {
					return;
				}
				var regex = /data-on([a-z]+)=['"]([^'"]+)['"]/g;
				var match = regex.exec(content);
				while (match) {
					this.attachListener_(match[1], match[2], groupName);
					match = regex.exec(content);
				}
			}

			/**
    * Removes all previously attached event listeners to the component.
    */
		}, {
			key: 'detachAllListeners',
			value: function detachAllListeners() {
				for (var selector in this.eventHandles_) {
					if (this.eventHandles_[selector]) {
						this.eventHandles_[selector].removeAllListeners();
					}
				}
				this.eventHandles_ = {};
				this.listenerCounts_ = {};
			}

			/**
    * Detaches all existing listeners that are not being used anymore.
    * @protected
    */
		}, {
			key: 'detachUnusedListeners',
			value: function detachUnusedListeners() {
				for (var selector in this.eventHandles_) {
					if (this.eventHandles_[selector]) {
						var unused = true;
						for (var groupName in this.groupHasListener_) {
							if (this.groupHasListener_[groupName][selector]) {
								unused = false;
								break;
							}
						}
						if (unused) {
							this.eventHandles_[selector].removeAllListeners();
							this.eventHandles_[selector] = null;
						}
					}
				}
			}

			/**
    * @inheritDoc
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.detachAllListeners();
				this.component_ = null;
			}

			/**
    * Gets the listener function from its name. If the name is prefixed with a
    * component id, the function will be called on that specified component. Otherwise
    * it will be called on this event collector's component instead.
    * @param {string} fnName
    * @return {function()}
    */
		}, {
			key: 'getListenerFn',
			value: function getListenerFn(fnName) {
				var fnComponent;
				var split = fnName.split(':');
				if (split.length === 2) {
					fnName = split[1];
					fnComponent = ComponentCollector.components[split[0]];
					if (!fnComponent) {
						console.error('No component with the id "' + split[0] + '" has been collected' + 'yet. Make sure that you specify an id for an existing component when ' + 'adding inline listeners.');
					}
				}
				fnComponent = fnComponent || this.component_;
				if (core.isFunction(fnComponent[fnName])) {
					return fnComponent[fnName].bind(fnComponent);
				} else {
					console.error('No function named "' + fnName + '" was found in the component with id "' + fnComponent.id + '". Make sure that you specify valid function names when adding ' + 'inline listeners.');
				}
			}

			/**
    * Checks if this EventsCollector instance has already attached listeners for the given
    * group before.
    * @param  {string} group
    * @return {boolean}
    */
		}, {
			key: 'hasAttachedForGroup',
			value: function hasAttachedForGroup(group) {
				return !!this.groupHasListener_.hasOwnProperty(group);
			}

			/**
    * Fires when an event that was registered by this collector is triggered. Makes
    * sure that the event was meant for this component and calls the appropriate
    * listener function for it.
    * @param {!function(!Object)} fn
    * @param {!Object} event
    * @return {*} The return value of the call to the listener function, or undefined
    *   if no function was called.
    * @protected
    */
		}, {
			key: 'onEvent_',
			value: function onEvent_(fn, event) {
				// This check prevents parent components from handling their child inline listeners.
				var eventComp = event.handledByComponent;
				if (!eventComp || eventComp === this.component_ || event.delegateTarget.contains(eventComp.element)) {
					event.handledByComponent = this.component_;
					return fn(event);
				}
			}
		}]);
		return EventsCollector;
	})(Disposable);

	this.steel.EventsCollector = EventsCollector;
}).call(this);
(function () {
	'use strict';

	var object = this.steel.object;
	var Disposable = this.steel.Disposable;

	/**
  * Stores surface data to be used later by Components.
  */

	var SurfaceCollector = (function (_Disposable) {
		babelHelpers.inherits(SurfaceCollector, _Disposable);

		function SurfaceCollector() {
			babelHelpers.classCallCheck(this, SurfaceCollector);

			babelHelpers.get(Object.getPrototypeOf(SurfaceCollector.prototype), 'constructor', this).call(this);

			/**
    * Holds all registered surfaces, mapped by their element ids.
    * @type {!Array<!Object>}
    * @protected
    */
			this.surfaces_ = {};
		}

		/**
   * Adds a surface to this collector.
   * @param {string} surfaceElementId
   * @param {Object=} opt_data Surface data to be stored.
   */
		babelHelpers.createClass(SurfaceCollector, [{
			key: 'addSurface',
			value: function addSurface(surfaceElementId, opt_data) {
				if (this.surfaces_[surfaceElementId]) {
					this.updateSurface(surfaceElementId, opt_data);
				} else {
					this.surfaces_[surfaceElementId] = opt_data;
				}
			}

			/**
    * @inheritDoc
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.surfaces_ = null;
			}

			/**
    * Gets the data for the given surface id.
    * @param {string} surfaceElementId
    * @return {!Object}
    */
		}, {
			key: 'getSurface',
			value: function getSurface(surfaceElementId) {
				return this.surfaces_[surfaceElementId] ? this.surfaces_[surfaceElementId] : null;
			}

			/**
    * Removes all surfaces from this collector.
    */
		}, {
			key: 'removeAllSurfaces',
			value: function removeAllSurfaces() {
				this.surfaces_ = [];
			}

			/**
    * Removes the surface with the given surface id.
    * @param {string} surfaceElementId
    */
		}, {
			key: 'removeSurface',
			value: function removeSurface(surfaceElementId) {
				this.surfaces_[surfaceElementId] = null;
			}

			/**
    * Updates a surface from this collector.
    * @param {string} surfaceElementId
    * @param {Object=} opt_data Surface data to update the existing data.
    */
		}, {
			key: 'updateSurface',
			value: function updateSurface(surfaceElementId, opt_data) {
				object.mixin(this.surfaces_[surfaceElementId], opt_data);
			}
		}]);
		return SurfaceCollector;
	})(Disposable);

	this.steel.SurfaceCollector = SurfaceCollector;
}).call(this);
(function () {
	'use strict';

	var array = this.steel.array;
	var core = this.steel.core;
	var dom = this.steel.dom;
	var features = this.steel.features;
	var html = this.steel.html;
	var object = this.steel.object;
	var string = this.steel.string;
	var Attribute = this.steel.Attribute;
	var ComponentCollector = this.steel.ComponentCollector;
	var EventEmitterProxy = this.steel.EventEmitterProxy;
	var EventHandler = this.steel.EventHandler;
	var EventsCollector = this.steel.EventsCollector;
	var SurfaceCollector = this.steel.SurfaceCollector;

	/**
  * Component collects common behaviors to be followed by UI components, such
  * as Lifecycle, bounding box element creation, CSS classes management,
  * events encapsulation and surfaces support. Surfaces are an area of the
  * component that can have information rendered into it. A component
  * manages multiple surfaces. Surfaces are only rendered when its content is
  * modified, representing render performance gains. For each surface, render
  * attributes could be associated, when the render context of a surface gets
  * modified the component Lifecycle re-paints the modified surface
  * automatically.
  *
  * Example:
  *
  * <code>
  * class CustomComponent extends Component {
  *   constructor(config) {
  *     super(config);
  *   }
  *
  *   getElementContent() {
  *     return this.getSurfaceElement('header');
  *   }
  *
  *   getSurfaceContent(surfaceId, surfaceElementId) {
  *   }
  *
  *   attached() {
  *   }
  *
  *   detached() {
  *   }
  * }
  *
  * CustomComponent.ATTRS = {
  *   title: { value: 'Title' },
  *   fontSize: { value: '10px' }
  * };
  *
  * CustomComponent.SURFACES = {
  *   header: { renderAttrs: ['title', 'fontSize'] },
  *   bottom: { renderAttrs: ['fontSize'] }
  * };
  * </code>
  *
  * @param {!Object} opt_config An object with the initial values for this component's
  *   attributes.
  * @constructor
  * @extends {Attribute}
  */

	var Component = (function (_Attribute) {
		babelHelpers.inherits(Component, _Attribute);

		function Component(opt_config) {
			babelHelpers.classCallCheck(this, Component);

			babelHelpers.get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this, opt_config);

			/**
    * Holds data about all surfaces that were collected through the
    * `replaceSurfacePlaceholders_` method.
    * @type {!Array}
    * @protected
    */
			this.collectedSurfaces_ = [];

			/**
    * Gets all nested components.
    * @type {!Array<!Component>}
    */
			this.components = {};

			/**
    * Whether the element is being decorated.
    * @type {boolean}
    * @protected
    */
			this.decorating_ = false;

			/**
    * Holds events that were listened through the `delegate` Component function.
    * @type {EventHandler}
    * @protected
    */
			this.delegateEventHandler_ = null;

			/**
    * Instance of `EventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {EventEmitterProxy}
    * @protected
    */
			this.elementEventProxy_ = null;

			/**
    * The `EventHandler` instance for events attached from the `events` attribute.
    * @type {!EventHandler}
    * @protected
    */
			this.eventsAttrHandler_ = new EventHandler();

			/**
    * Collects inline events from html contents.
    * @type {!EventsCollector}
    * @protected
    */
			this.eventsCollector_ = new EventsCollector(this);

			/**
    * Holds the number of generated ids for each surface's contents.
    * @type {!Object}
    * @protected
    */
			this.generatedIdCount_ = {};

			/**
    * Whether the element is in document.
    * @type {boolean}
    */
			this.inDocument = false;

			/**
    * The initial config option passed to this constructor.
    * @type {!Object}
    * @protected
    */
			this.initialConfig_ = opt_config || {};

			/**
    * The ids of the surfaces registered by this component.
    * @type {!Object<string, boolean>}
    * @protected
    */
			this.surfaceIds_ = {};

			/**
    * Whether the element was rendered.
    * @type {boolean}
    */
			this.wasRendered = false;

			/**
    * The component's element will be appended to the element this variable is
    * set to, unless the user specifies another parent when calling `render` or
    * `attach`.
    * @type {!Element}
    */
			this.DEFAULT_ELEMENT_PARENT = document.body;

			core.mergeSuperClassesProperty(this.constructor, 'ELEMENT_CLASSES', this.mergeElementClasses_);
			core.mergeSuperClassesProperty(this.constructor, 'ELEMENT_TAG_NAME', array.firstDefinedValue);
			core.mergeSuperClassesProperty(this.constructor, 'SURFACE_TAG_NAME', array.firstDefinedValue);
			this.addSurfacesFromStaticHint_();

			this.delegateEventHandler_ = new EventHandler();

			this.created_();
		}

		/**
   * Helper responsible for extracting components from strings and config data.
   * @type {!ComponentCollector}
   * @protected
   * @static
   */

		/**
   * Adds the listeners specified in the given object.
   * @param {Object} events
   * @protected
   */
		babelHelpers.createClass(Component, [{
			key: 'addListenersFromObj_',
			value: function addListenersFromObj_(events) {
				var eventNames = Object.keys(events || {});
				for (var i = 0; i < eventNames.length; i++) {
					var info = this.extractListenerInfo_(events[eventNames[i]]);
					if (info.fn) {
						var handler;
						if (info.selector) {
							handler = this.delegate(eventNames[i], info.selector, info.fn);
						} else {
							handler = this.on(eventNames[i], info.fn);
						}
						this.eventsAttrHandler_.add(handler);
					}
				}
			}

			/**
    * Adds a simple attribute with the given name, if it doesn't exist yet.
    * @param {string} attrName
    * @param {Object=} opt_initialValue Optional initial value for the new attr.
    * @protected
    */
		}, {
			key: 'addMissingAttr_',
			value: function addMissingAttr_(attrName, initialValue) {
				if (!this.getAttrConfig(attrName)) {
					this.addAttr(attrName, {}, initialValue);
				}
			}

			/**
    * Overrides `addSingleListener_` from `EventEmitter`, so we can create
    * the `EventEmitterProxy` instance only when it's needed for the first
    * time.
    * @param {string} event
    * @param {!Function} listener
    * @param {Function=} opt_origin The original function that was added as a
    *   listener, if there is any.
    * @protected
    * @override
    */
		}, {
			key: 'addSingleListener_',
			value: function addSingleListener_(event, listener, opt_origin) {
				if (!this.elementEventProxy_ && dom.supportsEvent(this.constructor.ELEMENT_TAG_NAME_MERGED, event)) {
					this.elementEventProxy_ = new EventEmitterProxy(this.element, this);
				}
				babelHelpers.get(Object.getPrototypeOf(Component.prototype), 'addSingleListener_', this).call(this, event, listener, opt_origin);
			}

			/**
    * Registers a surface to the component. Surface elements are not
    * automatically appended to the component element.
    * @param {string} surfaceId The surface id to be registered.
    * @param {Object=} opt_surfaceConfig Optional surface configuration.
    * @chainable
    */
		}, {
			key: 'addSurface',
			value: function addSurface(surfaceId, opt_surfaceConfig) {
				var config = opt_surfaceConfig || {};
				config.cacheState = config.cacheState || Component.Cache.NOT_INITIALIZED;

				var surfaceElementId = this.getSurfaceElementId_(surfaceId, config);
				if (this.surfaceIds_[surfaceElementId]) {
					Component.surfacesCollector.updateSurface(surfaceElementId, config);
				} else {
					this.surfaceIds_[surfaceElementId] = true;
					Component.surfacesCollector.addSurface(surfaceElementId, config);
					if (config.componentName && surfaceId !== this.id) {
						this.createSubComponent_(config.componentName, surfaceElementId);
					}
					this.cacheSurfaceRenderAttrs_(surfaceElementId);
				}

				return this;
			}

			/**
    * Registers surfaces to the component. Surface elements are not
    * automatically appended to the component element.
    * @param {!Object.<string, Object=>} configs An object that maps the names
    *     of all the surfaces to be added to their configuration objects.
    * @chainable
    */
		}, {
			key: 'addSurfaces',
			value: function addSurfaces(configs) {
				for (var surfaceId in configs) {
					this.addSurface(surfaceId, configs[surfaceId]);
				}
				return this;
			}

			/**
    * Adds surfaces from super classes static hint.
    * @protected
    */
		}, {
			key: 'addSurfacesFromStaticHint_',
			value: function addSurfacesFromStaticHint_() {
				core.mergeSuperClassesProperty(this.constructor, 'SURFACES', this.mergeObjects_);
				this.surfacesRenderAttrs_ = {};

				var configs = this.constructor.SURFACES_MERGED;
				for (var surfaceId in configs) {
					this.addSurface(surfaceId, object.mixin({}, configs[surfaceId]));
				}
			}

			/**
    * Invokes the attached Lifecycle. When attached, the component element is
    * appended to the DOM and any other action to be performed must be
    * implemented in this method, such as, binding DOM events. A component can
    * be re-attached multiple times.
    * @param {(string|Element)=} opt_parentElement Optional parent element
    *     to render the component.
    * @param {(string|Element)=} opt_siblingElement Optional sibling element
    *     to render the component before it. Relevant when the component needs
    *     to be rendered before an existing element in the DOM, e.g.
    *     `component.render(null, existingElement)`.
    * @protected
    * @chainable
    */
		}, {
			key: 'attach',
			value: function attach(opt_parentElement, opt_siblingElement) {
				if (!this.inDocument) {
					this.renderElement_(opt_parentElement, opt_siblingElement);
					this.inDocument = true;
					if (!this.wasRendered) {
						this.updatePlaceholderSurfaces_();
					}
					this.attached();
				}
				return this;
			}

			/**
    * Lifecycle. When attached, the component element is appended to the DOM
    * and any other action to be performed must be implemented in this method,
    * such as, binding DOM events. A component can be re-attached multiple
    * times, therefore the undo behavior for any action performed in this phase
    * must be implemented on the detach phase.
    */
		}, {
			key: 'attached',
			value: function attached() {}

			/**
    * Builds the data for this component's main element's surface.
    * @return {!Object}
    * @protected
    */
		}, {
			key: 'buildElementSurfaceData_',
			value: function buildElementSurfaceData_() {
				return {
					componentName: this.constructor.NAME
				};
			}

			/**
    * Builds a surface placeholder, attaching it to the given data.
    * @param {string} surfaceElementId
    * @param {Object=} opt_data
    * @return {string}
    */
		}, {
			key: 'buildPlaceholder',
			value: function buildPlaceholder(surfaceElementId, opt_data) {
				if (surfaceElementId && opt_data) {
					opt_data.surfaceElementId = surfaceElementId;
					this.addSurface(surfaceElementId, opt_data);
				}
				return '%%%%~s' + (surfaceElementId ? '-' + surfaceElementId : '') + '~%%%%';
			}

			/**
    * Caches the given content for the surface with the requested id.
    * @param {string} surfaceElementId
    * @param {string} content
    */
		}, {
			key: 'cacheSurfaceContent',
			value: function cacheSurfaceContent(surfaceElementId, content) {
				var cacheState = this.computeSurfaceCacheState_(content);
				var surface = this.getSurface(surfaceElementId);
				surface.cacheState = cacheState;
			}

			/**
    * Caches surface render attributes into a O(k) flat map representation.
    * Relevant for performance to calculate the surfaces group that were
    * modified by attributes mutation.
    * @param {string} surfaceElementId The surface id to be cached into the flat map.
    * @protected
    */
		}, {
			key: 'cacheSurfaceRenderAttrs_',
			value: function cacheSurfaceRenderAttrs_(surfaceElementId) {
				var attrs = this.getSurface(surfaceElementId).renderAttrs || [];
				for (var i = 0; i < attrs.length; i++) {
					if (!this.surfacesRenderAttrs_[attrs[i]]) {
						this.surfacesRenderAttrs_[attrs[i]] = {};
						this.addMissingAttr_(attrs[i], this.initialConfig_[attrs[i]]);
					}
					this.surfacesRenderAttrs_[attrs[i]][surfaceElementId] = true;
				}
			}

			/**
    * Checks if the given content has an element tag with the given id.
    * @param {!Element|string} content
    * @param {string} id
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'checkHasElementTag_',
			value: function checkHasElementTag_(content, id) {
				return core.isString(content) ? content.indexOf(' id="' + id + '"') !== -1 : content.id === id;
			}

			/**
    * Compares cache states.
    * @param {number} currentCacheState
    * @param {number} previousCacheState
    * @return {boolean} True if there's a cache hit, or false for cache miss.
    */
		}, {
			key: 'compareCacheStates_',
			value: function compareCacheStates_(currentCacheState, previousCacheState) {
				return currentCacheState !== Component.Cache.NOT_INITIALIZED && currentCacheState !== Component.Cache.NOT_CACHEABLE && currentCacheState === previousCacheState;
			}

			/**
    * Computes the cache state for the surface content. If value is string, the
    * cache state is represented by its hashcode.
    * @param {Object} value The value to calculate the cache state.
    * @return {Object} The computed cache state.
    * @protected
    */
		}, {
			key: 'computeSurfaceCacheState_',
			value: function computeSurfaceCacheState_(value) {
				if (core.isString(value)) {
					if (features.checkAttrOrderChange()) {
						value = this.convertHtmlToBrowserFormat_(value);
					}
					return string.hashCode(value);
				}
				return Component.Cache.NOT_CACHEABLE;
			}

			/**
    * Converts the given html string to the format the current browser uses
    * when html is rendered. This is done by rendering the html in a temporary
    * element, and returning its resulting rendered html.
    * @param {string} htmlString The html to be converted.
    * @return {string}
    * @protected
    */
		}, {
			key: 'convertHtmlToBrowserFormat_',
			value: function convertHtmlToBrowserFormat_(htmlString) {
				var element = document.createElement('div');
				dom.append(element, htmlString);
				return element.innerHTML;
			}

			/**
    * Creates a surface that was found via a string placeholder.
    * @param {string=} opt_surfaceElementId
    * @param {string=} opt_parentSurfaceElementId The id of the surface element that contains
    *   the surface to be created, or undefined if there is none.
    * @return {string} The element id of the created surface.
    * @protected
    */
		}, {
			key: 'createPlaceholderSurface_',
			value: function createPlaceholderSurface_(opt_surfaceElementId, opt_parentSurfaceElementId) {
				var surfaceElementId = opt_surfaceElementId;
				if (!core.isDefAndNotNull(surfaceElementId)) {
					surfaceElementId = this.generateSurfaceElementId_(opt_parentSurfaceElementId);
				}
				var surface = this.getSurface(surfaceElementId);
				if (!surface) {
					this.addSurface(surfaceElementId, {
						surfaceElementId: surfaceElementId
					});
				}
				return surfaceElementId;
			}

			/**
    * Creates a sub component.
    * @param {string} componentName
    * @param {string} componentId
    * @return {!Component}
    * @protected
    */
		}, {
			key: 'createSubComponent_',
			value: function createSubComponent_(componentName, componentId) {
				this.components[componentId] = Component.componentsCollector.createComponent(componentName, componentId, this.getSurface(componentId).componentData);
				return this.components[componentId];
			}

			/**
    * Creates the surface element with its id namespaced to the component id.
    * @param {string} surfaceElementId The id of the element for the surface to be
    *   created.
    * @return {Element} The surface element.
    * @protected
    */
		}, {
			key: 'createSurfaceElement_',
			value: function createSurfaceElement_(surfaceElementId) {
				var el = document.createElement(this.constructor.SURFACE_TAG_NAME_MERGED);
				el.id = surfaceElementId;
				return el;
			}

			/**
    * Decorates this component as a subcomponent, meaning that no rendering is
    * needed since it was already rendered by the parent component. Handles the
    * same logics that `renderAsSubComponent`, but also makes sure that the
    * surfaces content is updated if the html is incorrect for the given data.
    */
		}, {
			key: 'decorateAsSubComponent',
			value: function decorateAsSubComponent() {
				this.decorating_ = true;
				this.renderAsSubComponent();
				this.decorating_ = false;
			}

			/**
    * Listens to a delegate event on the component's element.
    * @param {string} eventName The name of the event to listen to.
    * @param {string} selector The selector that matches the child elements that
    *   the event should be triggered for.
    * @param {!function(!Object)} callback Function to be called when the event is
    *   triggered. It will receive the normalized event object.
    * @return {!DomEventHandle} Can be used to remove the listener.
    */
		}, {
			key: 'delegate',
			value: function delegate(eventName, selector, callback) {
				var handle = dom.delegate(this.element, eventName, selector, callback);
				this.delegateEventHandler_.add(handle);
				return handle;
			}

			/**
    * Invokes the detached Lifecycle. When detached, the component element is
    * removed from the DOM and any other action to be performed must be
    * implemented in this method, such as, unbinding DOM events. A component
    * can be detached multiple times.
    * @chainable
    */
		}, {
			key: 'detach',
			value: function detach() {
				if (this.inDocument) {
					this.element.parentNode.removeChild(this.element);
					this.inDocument = false;
					this.detached();
				}
				this.eventsCollector_.detachAllListeners();
				return this;
			}

			/**
    * Lifecycle. When detached, the component element is removed from the DOM
    * and any other action to be performed must be implemented in this method,
    * such as, unbinding DOM events. A component can be detached multiple
    * times, therefore the undo behavior for any action performed in this phase
    * must be implemented on the attach phase.
    */
		}, {
			key: 'detached',
			value: function detached() {}

			/**
    * Internal implementation for the creation phase of the component.
    * @protected
    */
		}, {
			key: 'created_',
			value: function created_() {
				this.on('eventsChanged', this.onEventsChanged_);
				this.addListenersFromObj_(this.events);

				this.on('attrsChanged', this.handleAttributesChanges_);
				Component.componentsCollector.addComponent(this);
			}

			/**
    * Lifecycle. Creates the component using existing DOM elements. Often the
    * component can be created using existing elements in the DOM to leverage
    * progressive enhancement. Any extra operation necessary to prepare the
    * component DOM must be implemented in this phase. Decorate phase replaces
    * render phase.
    *
    * Decoration Lifecycle:
    *   decorate - Decorate is manually called.
    *   retrieve existing html - The cache for all surfaces is filled with any
    *     existing html from the document.
    *   render surfaces - Surfaces that cause a cache miss are rendered, including
    *     the main content (`getElementContent`).
    *   attribute synchronization - All synchronization methods are called.
    *   attach - Attach Lifecycle is called.
    * @chainable
    */
		}, {
			key: 'decorate',
			value: function decorate() {
				this.decorating_ = true;
				this.render();
				this.decorating_ = false;
				return this;
			}

			/**
    * Calls `dispose` on all subcomponents.
    * @protected
    */
		}, {
			key: 'disposeSubComponents_',
			value: function disposeSubComponents_() {
				var ids = Object.keys(this.components);
				for (var i = 0; i < ids.length; i++) {
					var component = this.components[ids[i]];
					if (!component.isDisposed()) {
						Component.componentsCollector.removeComponent(component);
						component.dispose();
					}
				}
				this.components = null;
			}

			/**
    * @inheritDoc
    */
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				var _this = this;

				this.detach();

				if (this.elementEventProxy_) {
					this.elementEventProxy_.dispose();
					this.elementEventProxy_ = null;
				}

				this.delegateEventHandler_.removeAllListeners();
				this.delegateEventHandler_ = null;

				this.disposeSubComponents_();
				this.generatedIdCount_ = null;
				this.surfacesRenderAttrs_ = null;

				Object.keys(this.surfaceIds_).forEach(function (surfaceId) {
					return _this.removeSurface(surfaceId);
				});
				this.surfaceIds_ = null;

				babelHelpers.get(Object.getPrototypeOf(Component.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Extracts listener info from the given value.
    * @param {function()|string|{selector:string,fn:function()|string}} value
    * @return {!{selector:string,fn:function()}}
    * @protected
    */
		}, {
			key: 'extractListenerInfo_',
			value: function extractListenerInfo_(value) {
				var info = {
					fn: value
				};
				if (core.isObject(value) && !core.isFunction(value)) {
					info.selector = value.selector;
					info.fn = value.fn;
				}
				if (core.isString(info.fn)) {
					info.fn = this.eventsCollector_.getListenerFn(info.fn);
				}
				return info;
			}

			/**
    * Fires attributes synchronization changes for attributes.
    * @protected
    */
		}, {
			key: 'syncAttrs_',
			value: function syncAttrs_() {
				var attrNames = this.getAttrNames();
				for (var i = 0; i < attrNames.length; i++) {
					this.fireAttrChange_(attrNames[i]);
				}
			}

			/**
    * Fires attributes synchronization changes for attributes.
    * @param {Object.<string, Object>} changes Object containing the attribute
    *     name as key and an object with newVal and prevVal as value.
    * @protected
    */
		}, {
			key: 'syncAttrsFromChanges_',
			value: function syncAttrsFromChanges_(changes) {
				for (var attr in changes) {
					this.fireAttrChange_(attr, changes[attr]);
				}
			}

			/**
    * Finds the element that matches the given id on this component. This searches
    * on the document first, for performance. If the element is not found, it's
    * searched in the component's element directly.
    * @param {string} id
    * @return {Element}
    * @protected
    */
		}, {
			key: 'findElementById_',
			value: function findElementById_(id) {
				return document.getElementById(id) || this.element && this.element.querySelector('#' + id);
			}

			/**
    * Finds the element with the given id in the given content, if there is one.
    * @param {string} id
    * @param {string} content
    * @return {Element}
    * @protected
    */
		}, {
			key: 'findElementInContent_',
			value: function findElementInContent_(id, content) {
				var element;
				if (core.isString(content)) {
					content = dom.buildFragment(content).childNodes[0];
				}
				if (content && content.id === id) {
					element = content;
				}
				return element;
			}

			/**
    * Fires attribute synchronization change for the attribute.
    * @param {Object.<string, Object>} change Object containing newVal and
    *     prevVal keys.
    * @protected
    */
		}, {
			key: 'fireAttrChange_',
			value: function fireAttrChange_(attr, opt_change) {
				var fn = this['sync' + attr.charAt(0).toUpperCase() + attr.slice(1)];
				if (core.isFunction(fn)) {
					if (!opt_change) {
						opt_change = {
							newVal: this[attr],
							prevVal: undefined
						};
					}
					fn.call(this, opt_change.newVal, opt_change.prevVal);
				}
			}

			/**
    * Generates an id for a surface that was found inside the contents of the main
    * element or of a parent surface.
    * @param {string=} opt_parentSurfaceElementId The id of the parent surface, or undefined
    *   if there is none.
    * @return {string} The generated id.
    */
		}, {
			key: 'generateSurfaceElementId_',
			value: function generateSurfaceElementId_(opt_parentSurfaceElementId) {
				var parentElementId = opt_parentSurfaceElementId || this.id;
				this.generatedIdCount_[parentElementId] = (this.generatedIdCount_[parentElementId] || 0) + 1;
				return parentElementId + '-s' + this.generatedIdCount_[parentElementId];
			}

			/**
    * Gets the html that should be used to build this component's main element with
    * some content.
    * @param {string} content
    * @return {string}
    */
		}, {
			key: 'getComponentHtml',
			value: function getComponentHtml(content) {
				return this.wrapContentIfNecessary(content, this.id, this.constructor.ELEMENT_TAG_NAME_MERGED);
			}

			/**
    * Gets the content that should be rendered in the component's main element.
    * Should be implemented by subclasses.
    * @return {Object|string} The content to be rendered. If the content is a
    *   string, surfaces can be represented by placeholders in the format specified
    *   by Component.SURFACE_REGEX. Also, if the string content's main wrapper has
    *   the component's id, then it will be used to render the main element tag.
    */
		}, {
			key: 'getElementContent',
			value: function getElementContent() {}

			/**
    * Calls `getElementContent` and replaces all placeholders in the returned content.
    * This is called when rendering sub components, so it also attaches listeners to
    * the original content.
    * @return {string} The content with all placeholders already replaced.
    */
		}, {
			key: 'getElementExtendedContent',
			value: function getElementExtendedContent() {
				var content = this.getElementContent();
				this.eventsCollector_.attachListeners(content);
				return this.replaceSurfacePlaceholders_(content);
			}

			/**
    * Gets surfaces that got modified by the specified attributes changes.
    * @param {Object.<string, Object>} changes Object containing the attribute
    *     name as key and an object with newVal and prevVal as value.
    * @return {Object.<string, boolean>} Object containing modified surface ids
    *     as key and true as value.
    */
		}, {
			key: 'getModifiedSurfacesFromChanges_',
			value: function getModifiedSurfacesFromChanges_(changes) {
				var surfaces = [{}];
				for (var attr in changes) {
					if (this.surfacesRenderAttrs_[attr]) {
						surfaces.push(this.surfacesRenderAttrs_[attr]);
					}
				}
				return object.mixin.apply(null, surfaces);
			}

			/**
    * Same as `getSurfaceHtml`, but only called for non component surfaces.
    * @param {string} surfaceElementId
    * @param {string} content
    * @return {string}
    */
		}, {
			key: 'getNonComponentSurfaceHtml',
			value: function getNonComponentSurfaceHtml(surfaceElementId, content) {
				return this.wrapContentIfNecessary(content, surfaceElementId, this.constructor.SURFACE_TAG_NAME_MERGED);
			}

			/**
    * Gets surface configuration object. If surface is not registered returns
    * null.
    * @param {string} surfaceId The surface id or its element id.
    * @return {Object} The surface configuration object.
    */
		}, {
			key: 'getSurface',
			value: function getSurface(surfaceId) {
				var surface = Component.surfacesCollector.getSurface(this.getSurfaceElementId_(surfaceId));
				return surface ? surface : Component.surfacesCollector.getSurface(surfaceId);
			}

			/**
    * Gets the content for the requested surface. Should be implemented by subclasses.
    * @param {string} surfaceId The surface id.
    * @param {string} surfaceElementId The surface element id
    * @return {Object|string} The content to be rendered. If the content is a
    *   string, surfaces can be represented by placeholders in the format specified
    *   by Component.SURFACE_REGEX.
    */
		}, {
			key: 'getSurfaceContent',
			value: function getSurfaceContent() {}

			/**
    * Gets the content for the requested surface. By default this just calls
    * `getSurfaceContent`, but can be overriden to add more behavior (check
    * `SoyComponent` for an example).
    * @param {string} surfaceElementId The surface element id.
    * @return {Object|string} The content to be rendered.
    * @protected
    */
		}, {
			key: 'getSurfaceContent_',
			value: function getSurfaceContent_(surfaceElementId) {
				var surface = this.getSurface(surfaceElementId);
				if (surfaceElementId === this.id) {
					return this.getElementContent();
				} else if (surface.componentName) {
					var component = ComponentCollector.components[surfaceElementId];
					if (component.wasRendered) {
						return '';
					} else {
						return component.getElementExtendedContent();
					}
				} else {
					return this.getSurfaceContent(this.getSurfaceId_(surfaceElementId, surface), surfaceElementId);
				}
			}

			/**
    * Queries from the document or creates an element for the surface. Surface
    * elements have its surface id namespaced to the component id, e.g. for a
    * component with id `gallery` and a surface with id `pictures` the surface
    * element will be represented by the id `gallery-pictures`. Surface
    * elements must also be appended to the component element.
    * @param {string} surfaceId The surface id.
    * @return {Element} The surface element or null if surface not registered.
    */
		}, {
			key: 'getSurfaceElement',
			value: function getSurfaceElement(surfaceId) {
				var surface = this.getSurface(surfaceId);
				if (!surface) {
					return null;
				}
				if (!surface.element) {
					if (surface.componentName) {
						var component = ComponentCollector.components[surfaceId];
						if (component) {
							surface.element = component.element;
						}
					} else {
						var surfaceElementId = this.getSurfaceElementId_(surfaceId, surface);
						surface.element = this.findElementById_(surfaceElementId) || this.createSurfaceElement_(surfaceElementId);
					}
				}
				return surface.element;
			}

			/**
    * Adds the component id as the prefix of the given surface id if necessary.
    * @param {string} surfaceId
    * @param {Object=} opt_surface The surface data.
    * @return {string}
    */
		}, {
			key: 'getSurfaceElementId_',
			value: function getSurfaceElementId_(surfaceId, opt_surface) {
				var surface = opt_surface || {};
				if (surface.surfaceElementId) {
					return surface.surfaceElementId;
				} else if (surface.componentName || this.hasComponentPrefix_(surfaceId)) {
					return surfaceId;
				} else {
					return this.prefixSurfaceId_(surfaceId);
				}
			}

			/**
    * Gets the html that should be used to build a surface's main element with its
    * content.
    * @param {string} surfaceElementId
    * @param {string} content
    * @return {string}
    */
		}, {
			key: 'getSurfaceHtml',
			value: function getSurfaceHtml(surfaceElementId, content) {
				var surface = this.getSurface(surfaceElementId);
				if (surface.componentName) {
					return ComponentCollector.components[surfaceElementId].getComponentHtml(content);
				} else {
					return this.getNonComponentSurfaceHtml(surfaceElementId, content);
				}
			}

			/**
    * Gets the surface id for the given surface element id
    * @param {string} surfaceElementId
    * @param {!Object} surface
    * @return {string}
    * @protected
    */
		}, {
			key: 'getSurfaceId_',
			value: function getSurfaceId_(surfaceElementId, surface) {
				if (surface.componentName || !this.hasComponentPrefix_(surfaceElementId)) {
					return surfaceElementId;
				} else {
					return surfaceElementId.substr(this.id.length + 1);
				}
			}

			/**
    * A map of surface ids to the respective surface object.
    * @return {!Object}
    */
		}, {
			key: 'getSurfaces',
			value: function getSurfaces() {
				var surfaces = {};
				Object.keys(this.surfaceIds_).forEach((function (surfaceElementId) {
					var surface = Component.surfacesCollector.getSurface(surfaceElementId);
					surfaces[this.getSurfaceId_(surfaceElementId, surface)] = surface;
				}).bind(this));
				return surfaces;
			}

			/**
    * Handles attributes batch changes. Responsible for surface mutations and
    * attributes synchronization.
    * @param {Event} event
    * @protected
    */
		}, {
			key: 'handleAttributesChanges_',
			value: function handleAttributesChanges_(event) {
				if (this.inDocument) {
					this.renderSurfacesContent_(this.getModifiedSurfacesFromChanges_(event.changes));
				}
				this.syncAttrsFromChanges_(event.changes);
			}

			/**
    * Checks if the given surface id has this component's prefix.
    * @param {string} surfaceId
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'hasComponentPrefix_',
			value: function hasComponentPrefix_(surfaceId) {
				return surfaceId.substr(0, this.id.length) === this.id && (surfaceId.length === this.id.length || surfaceId[this.id.length] === '-');
			}

			/**
    * Fired when the `events` attribute value is changed.
    * @param {!Object} event
    * @protected
    */
		}, {
			key: 'onEventsChanged_',
			value: function onEventsChanged_(event) {
				this.eventsAttrHandler_.removeAllListeners();
				this.addListenersFromObj_(event.newVal);
			}

			/**
    * Makes an unique id for the component.
    * @return {string} Unique id.
    * @protected
    */
		}, {
			key: 'makeId_',
			value: function makeId_() {
				return 'metal_c_' + core.getUid(this);
			}

			/**
    * Merges an array of values for the ELEMENT_CLASSES property into a single object.
    * @param {!Array.<string>} values The values to be merged.
    * @return {!string} The merged value.
    * @protected
    */
		}, {
			key: 'mergeElementClasses_',
			value: function mergeElementClasses_(values) {
				var marked = {};
				return values.filter(function (val) {
					if (!val || marked[val]) {
						return false;
					} else {
						marked[val] = true;
						return true;
					}
				}).join(' ');
			}

			/**
    * Merges an array of objects into a single object. Used by the SURFACES static
    * variable.
    * @param {!Array} values The values to be merged.
    * @return {!Object} The merged value.
    * @protected
    */
		}, {
			key: 'mergeObjects_',
			value: function mergeObjects_(values) {
				return object.mixin.apply(null, [{}].concat(values.reverse()));
			}

			/**
    * Prefixes the given surface id with this component's id.
    * @param {string} surfaceId
    * @return {string}
    * @protected
    */
		}, {
			key: 'prefixSurfaceId_',
			value: function prefixSurfaceId_(surfaceId) {
				return this.id + '-' + surfaceId;
			}

			/**
    * Unregisters a surface and removes its element from the DOM.
    * @param {string} surfaceId The surface id.
    * @chainable
    */
		}, {
			key: 'removeSurface',
			value: function removeSurface(surfaceId) {
				var el = this.getSurfaceElement(surfaceId);
				if (el && el.parentNode) {
					el.parentNode.removeChild(el);
				}
				var surfaceElementId = this.getSurfaceElementId_(surfaceId, this.getSurface(surfaceId));
				Component.surfacesCollector.removeSurface(surfaceElementId);
				this.surfaceIds_[surfaceElementId] = false;
				return this;
			}

			/**
    * Lifecycle. Renders the component into the DOM. Render phase replaces
    * decorate phase, without progressive enhancement support.
    *
    * Render Lifecycle:
    *   render - Decorate is manually called.
    *   render surfaces - All surfaces content are rendered, including the
    *     main content (`getElementContent`).
    *   attribute synchronization - All synchronization methods are called.
    *   attach - Attach Lifecycle is called.
    *
    * @param {(string|Element)=} opt_parentElement Optional parent element
    *     to render the component.
    * @param {(string|Element)=} opt_siblingElement Optional sibling element
    *     to render the component before it. Relevant when the component needs
    *     to be rendered before an existing element in the DOM, e.g.
    *     `component.render(null, existingElement)`.
    * @chainable
    */
		}, {
			key: 'render',
			value: function render(opt_parentElement, opt_siblingElement) {
				if (this.wasRendered) {
					throw new Error(Component.Error.ALREADY_RENDERED);
				}

				this.addSurface(this.id, this.buildElementSurfaceData_());
				this.renderSurfacesContent_(this.surfaceIds_);

				this.syncAttrs_();

				this.attach(opt_parentElement, opt_siblingElement);

				this.wasRendered = true;

				return this;
			}

			/**
    * Renders this component as a subcomponent, meaning that no actual rendering is
    * needed since it was already rendered by the parent component. This just handles
    * other logics from the rendering lifecycle, like attaching event listeners.
    */
		}, {
			key: 'renderAsSubComponent',
			value: function renderAsSubComponent() {
				this.addSurface(this.id, this.buildElementSurfaceData_());
				this.syncAttrs_();
				this.attach();
				this.wasRendered = true;
			}

			/**
    * Renders a surface that holds a component.
    * @param {string} surfaceElementId
    * @param {(Object|string)?} opt_content The content to be rendered.
    * @protected
    */
		}, {
			key: 'renderComponentSurface_',
			value: function renderComponentSurface_(surfaceElementId, opt_content) {
				var component = ComponentCollector.components[surfaceElementId];
				if (component.wasRendered) {
					var surface = this.getSurface(surfaceElementId);
					Component.componentsCollector.updateComponent(surfaceElementId, surface.componentData);
				} else if (opt_content) {
					var element = component.element;
					if (dom.isEmpty(element)) {
						// If we have the rendered content for this component, but it hasn't
						// been rendered in its element yet, we render it manually here. That
						// can happen if the subcomponent's element is set before the parent
						// element renders its content.
						dom.append(element, opt_content);
					}
					if (this.decorating_) {
						component.decorateAsSubComponent();
					} else {
						component.renderAsSubComponent();
					}
				} else {
					component.render();
				}
			}

			/**
    * Renders the component element into the DOM.
    * @param {(string|Element)=} opt_parentElement Optional parent element
    *     to render the component.
    * @param {(string|Element)=} opt_siblingElement Optional sibling element
    *     to render the component before it. Relevant when the component needs
    *     to be rendered before an existing element in the DOM, e.g.
    *     `component.render(null, existingElement)`.
    * @protected
    */
		}, {
			key: 'renderElement_',
			value: function renderElement_(opt_parentElement, opt_siblingElement) {
				var element = this.element;
				element.id = this.id;
				if (opt_siblingElement || !element.parentNode) {
					var parent = dom.toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
					parent.insertBefore(element, dom.toElement(opt_siblingElement));
				}
			}

			/**
    * Renders the contents of all the surface placeholders found in the given content.
    * @param {string} content
    * @param {string} surfaceElementId The id of surface element the content is from.
    * @protected
    */
		}, {
			key: 'renderPlaceholderSurfaceContents_',
			value: function renderPlaceholderSurfaceContents_(content, surfaceElementId) {
				var instance = this;
				content.replace(Component.SURFACE_REGEX, function (match, id) {
					instance.renderSurfaceContent(instance.createPlaceholderSurface_(id, surfaceElementId));
					return match;
				});
			}

			/**
    * Render content into a surface. If the specified content is the same of
    * the current surface content, nothing happens. If the surface cache state
    * is not initialized or the content is not eligible for cache or content is
    * different, the surfaces re-renders. It's not recommended to use this
    * method directly since surface content can be provided by
    * `getSurfaceContent(surfaceElementId)`.
    * @param {string} surfaceElementId The surface id.
    * @param {(Object|string)?} opt_content The content to be rendered.
    * @param {string?} opt_cacheContent The content that should be cached for
    *   this surface. If none is given, the rendered content will be used for this.
    */
		}, {
			key: 'renderSurfaceContent',
			value: function renderSurfaceContent(surfaceElementId, opt_content, opt_cacheContent) {
				var surface = this.getSurface(surfaceElementId);
				if (surface.componentName && surfaceElementId !== this.id) {
					this.renderComponentSurface_(surfaceElementId, opt_content);
					return;
				}

				var content = opt_content || this.getSurfaceContent_(surfaceElementId);
				if (core.isDefAndNotNull(content)) {
					var cacheContent = opt_cacheContent || content;

					var firstCacheContent = cacheContent;
					if (this.decorating_) {
						// We cache the entire original content first when decorating so we can compare
						// with the full content we got from the dom. After comparing, we cache the correct
						// value so updates can work as expected for this surface.
						this.cacheSurfaceContent(surfaceElementId, html.compress(this.getSurfaceElement(surfaceElementId).outerHTML));
						if (content === cacheContent) {
							content = this.replaceSurfacePlaceholders_(content, surfaceElementId);
						}
						firstCacheContent = content;
					}

					var previousCacheState = surface.cacheState;
					this.cacheSurfaceContent(surfaceElementId, firstCacheContent);
					var cacheHit = this.compareCacheStates_(surface.cacheState, previousCacheState);
					if (this.decorating_) {
						this.cacheSurfaceContent(surfaceElementId, cacheContent);
					}

					if (cacheHit) {
						if (this.decorating_) {
							this.eventsCollector_.attachListeners(cacheContent, surfaceElementId);
						}
						this.renderPlaceholderSurfaceContents_(content, surfaceElementId);
					} else {
						this.eventsCollector_.attachListeners(cacheContent, surfaceElementId);
						this.replaceSurfaceContent_(surfaceElementId, content);
					}
				}
			}

			/**
    * Renders all surfaces contents ignoring the cache.
    * @param {Object.<string, Object=>} surfaces Object map where the key is
    *     the surface id and value the optional surface configuration.
    * @protected
    */
		}, {
			key: 'renderSurfacesContent_',
			value: function renderSurfacesContent_(surfaces) {
				this.generatedIdCount_ = {};

				var id = this.id;
				if (surfaces[id]) {
					// Always render the main content surface first.
					this.renderSurfaceContent(id);
				}
				for (var surfaceElementId in surfaces) {
					if (surfaceElementId !== id && !this.getSurface(surfaceElementId).handled) {
						this.renderSurfaceContent(surfaceElementId);
					}
				}
				if (this.wasRendered) {
					this.updatePlaceholderSurfaces_();
					this.eventsCollector_.detachUnusedListeners();
				}
			}

			/**
    * Replaces the content of this component's element with the given one.
    * @param {string} content The content to be rendered.
    * @protected
    */
		}, {
			key: 'replaceElementContent_',
			value: function replaceElementContent_(content) {
				var element = this.element;
				var newElement = this.findElementInContent_(this.id, content);
				if (newElement) {
					this.updateElementAttributes_(element, newElement);
					content = newElement.childNodes;
				}
				dom.removeChildren(element);
				dom.append(element, content);
			}

			/**
    * Replaces the content of a surface with a new one.
    * @param {string} surfaceElementId The surface id.
    * @param {Element|string} content The content to be rendered.
    * @protected
    */
		}, {
			key: 'replaceSurfaceContent_',
			value: function replaceSurfaceContent_(surfaceElementId, content) {
				content = this.replaceSurfacePlaceholders_(content, surfaceElementId);
				if (surfaceElementId === this.id) {
					this.replaceElementContent_(content);
					return;
				}

				var el = this.getSurfaceElement(surfaceElementId);
				if (this.checkHasElementTag_(content, surfaceElementId)) {
					var surface = this.getSurface(surfaceElementId);
					surface.element = content;
					if (core.isString(content)) {
						surface.element = dom.buildFragment(content).childNodes[0];
					}
					if (el.parentNode) {
						dom.replace(el, surface.element);
					}
				} else {
					dom.removeChildren(el);
					dom.append(el, content);
				}
			}

			/**
    * Replaces the given content's surface placeholders with their real contents.
    * @param {string|Element} content
    * @param {string=} opt_surfaceElementId The id of the surface element that contains
    *   the given content, or undefined if the content is from the main element.
    * @return {string} The final string with replaced placeholders.
    * @protected
    */
		}, {
			key: 'replaceSurfacePlaceholders_',
			value: function replaceSurfacePlaceholders_(content, opt_surfaceElementId) {
				if (!core.isString(content)) {
					return content;
				}

				var instance = this;
				return content.replace(Component.SURFACE_REGEX, function (match, id) {
					// Surfaces should already have been created before being rendered so they can be
					// accessed from their getSurfaceContent calls.
					id = instance.createPlaceholderSurface_(id, opt_surfaceElementId);
					instance.getSurface(id).handled = true;

					var surfaceContent = instance.getSurfaceContent_(id);
					var surfaceHtml = instance.getSurfaceHtml(id, surfaceContent);
					var expandedHtml = instance.replaceSurfacePlaceholders_(surfaceHtml, id);
					instance.collectedSurfaces_.push({
						cacheContent: surfaceContent,
						content: expandedHtml,
						surfaceElementId: id
					});

					return expandedHtml;
				});
			}

			/**
    * Setter logic for element attribute.
    * @param {string|Element} val
    * @return {Element}
    * @protected
    */
		}, {
			key: 'setterElementFn_',
			value: function setterElementFn_(val) {
				var element = dom.toElement(val);
				if (!element) {
					element = this.valueElementFn_();
				}
				return element;
			}

			/**
    * Attribute synchronization logic for the `elementClasses` attribute.
    * @param {string} newVal
    * @param {string} prevVal
    */
		}, {
			key: 'syncElementClasses',
			value: function syncElementClasses(newVal, prevVal) {
				var classesToAdd = this.constructor.ELEMENT_CLASSES_MERGED;
				if (newVal) {
					classesToAdd = classesToAdd + ' ' + newVal;
				}
				if (prevVal) {
					dom.removeClasses(this.element, prevVal);
				}
				dom.addClasses(this.element, classesToAdd);
			}

			/**
    * Attribute synchronization logic for `visible` attribute.
    * Updates the element's display value according to its visibility.
    * @param {boolean} newVal
    */
		}, {
			key: 'syncVisible',
			value: function syncVisible(newVal) {
				this.element.style.display = newVal ? '' : 'none';
			}

			/**
    * Sets the attributes from the second element to the first element.
    * @param {!Element} element
    * @param {!Element} newElement
    * @protected
    */
		}, {
			key: 'updateElementAttributes_',
			value: function updateElementAttributes_(element, newElement) {
				var attrs = newElement.attributes;
				for (var i = 0; i < attrs.length; i++) {
					// The "id" and "class" html attributes are already synced via the "id"
					// and "elementClasses" component attributes, respectively.
					if (attrs[i].name !== 'id' && attrs[i].name !== 'class') {
						element.setAttribute(attrs[i].name, attrs[i].value);
					}
				}

				if (element.tagName !== newElement.tagName) {
					console.error('The component named "' + this.constructor.NAME + '" tried to change the component ' + 'element\'s tag name, which is not allowed. Make sure to always return the same tag ' + 'name for the component element on getElementContent. This may also have been caused by ' + 'passing an element to this component with a different tag name from the one it uses.');
				}
			}

			/**
    * Updates a surface after it has been rendered through placeholders.
    * @param {!{content: string, cacheContent: string, surfaceElementId: string}} collectedData
    *   Data about the collected surface. Should have the surface's id, content and the
    *   content that should be cached for it.
    * @protected
    */
		}, {
			key: 'updatePlaceholderSurface_',
			value: function updatePlaceholderSurface_(collectedData) {
				var surfaceElementId = collectedData.surfaceElementId;
				var surface = this.getSurface(surfaceElementId);
				if (surface.componentName) {
					// Elements of component surfaces are unchangeable, so we need to replace the
					// rendered element with the component's.
					dom.replace(this.findElementById_(surfaceElementId), this.getSurfaceElement(surfaceElementId));
				}

				if (this.decorating_ || surface.componentName) {
					// Component surfaces need to be handled in case some internal details have changed.
					// Also, if this component is being decorated, it needs to go through the regular flow
					// to check if the cache matches.
					this.renderSurfaceContent(surfaceElementId, collectedData.content, collectedData.cacheContent);
				} else {
					// This surface's element has either changed or never been created yet. Let's just
					// reset it to null, so it can be fetched from the dom again when necessary. Also,
					// since there's no need to do cache checks or rerender, let's just attach its
					// listeners and cache its content manually.
					surface.element = null;
					this.cacheSurfaceContent(surfaceElementId, collectedData.cacheContent);
					this.eventsCollector_.attachListeners(collectedData.cacheContent, surfaceElementId);
				}
			}

			/**
    * Updates all collected surfaces.
    * @protected
    */
		}, {
			key: 'updatePlaceholderSurfaces_',
			value: function updatePlaceholderSurfaces_() {
				for (var i = this.collectedSurfaces_.length - 1; i >= 0; i--) {
					this.updatePlaceholderSurface_(this.collectedSurfaces_[i]);
					this.getSurface(this.collectedSurfaces_[i].surfaceElementId).handled = false;
				}
				this.collectedSurfaces_ = [];
			}

			/**
    * Validator logic for element attribute.
    * @param {string|Element} val
    * @return {boolean} True if val is a valid element.
    * @protected
    */
		}, {
			key: 'validatorElementFn_',
			value: function validatorElementFn_(val) {
				return core.isElement(val) || core.isString(val);
			}

			/**
    * Validator logic for elementClasses attribute.
    * @param {string} val
    * @return {boolean} True if val is a valid element classes.
    * @protected
    */
		}, {
			key: 'validatorElementClassesFn_',
			value: function validatorElementClassesFn_(val) {
				return core.isString(val);
			}

			/**
    * Validator logic for the `events` attribute.
    * @param {Object} val
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'validatorEventsFn_',
			value: function validatorEventsFn_(val) {
				return !core.isDefAndNotNull(val) || core.isObject(val);
			}

			/**
    * Validator logic for the `id` attribute.
    * @param {string} val
    * @return {boolean} True if val is a valid id.
    * @protected
    */
		}, {
			key: 'validatorIdFn_',
			value: function validatorIdFn_(val) {
				return core.isString(val);
			}

			/**
    * Provides the default value for element attribute.
    * @return {!Element} The element.
    * @protected
    */
		}, {
			key: 'valueElementFn_',
			value: function valueElementFn_() {
				if (!this.id) {
					// This may happen because the default value of "id" depends on "element",
					// and the default value of "element" depends on "id".
					this.id = this.makeId_();
				}
				var element = this.findElementInContent_(this.id, this.getElementContent());
				if (!element) {
					element = this.findElementInContent_(this.id, this.getComponentHtml(''));
				}
				dom.removeChildren(element);
				dom.exitDocument(element);
				return element;
			}

			/**
    * Provides the default value for id attribute.
    * @return {string} The id.
    * @protected
    */
		}, {
			key: 'valueIdFn_',
			value: function valueIdFn_() {
				var element = this.element;
				return element && element.id ? element.id : this.makeId_();
			}

			/**
    * Wraps the content with the given tag, unless the content already has an element with the
    * correct id.
    * @param {string} content
    * @param {string} id
    * @param {string} tag
    * @return {string}
    * @protected
    */
		}, {
			key: 'wrapContentIfNecessary',
			value: function wrapContentIfNecessary(content, id, tag) {
				if (!this.checkHasElementTag_(content, id)) {
					content = '<' + tag + ' id="' + id + '">' + content + '</' + tag + '>';
				}
				return content;
			}
		}]);
		return Component;
	})(Attribute);

	Component.componentsCollector = new ComponentCollector();

	/**
  * Helper responsible for temporarily holding surface data.
  * @type {!SurfaceCollector}
  * @protected
  * @static
  */
	Component.surfacesCollector = new SurfaceCollector();

	/**
  * Component attributes definition.
  * @type {Object}
  * @static
  */
	Component.ATTRS = {
		/**
   * Component element bounding box.
   * @type {Element}
   * @writeOnce
   */
		element: {
			setter: 'setterElementFn_',
			validator: 'validatorElementFn_',
			valueFn: 'valueElementFn_',
			writeOnce: true
		},

		/**
   * CSS classes to be applied to the element.
   * @type {Array.<string>}
   */
		elementClasses: {
			validator: 'validatorElementClassesFn_'
		},

		/**
   * Listeners that should be attached to this component. Should be provided as an object,
   * where the keys are event names and the values are the listener functions (or function
   * names).
   * @type {Object<string, (function()|string|{selector: string, fn: function()|string})>}
   */
		events: {
			validator: 'validatorEventsFn_',
			value: null
		},

		/**
   * Component element id. If not specified will be generated.
   * @type {string}
   * @writeOnce
   */
		id: {
			validator: 'validatorIdFn_',
			valueFn: 'valueIdFn_',
			writeOnce: true
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: core.isBoolean,
			value: true
		}
	};

	/**
  * CSS classes to be applied to the element.
  * @type {string}
  * @protected
  * @static
  */
	Component.ELEMENT_CLASSES = 'component';

	/**
  * Element tag name is a string that specifies the type of element to be
  * created. The nodeName of the created element is initialized with the
  * value of tag name.
  * @type {string}
  * @default div
  * @protected
  * @static
  */
	Component.ELEMENT_TAG_NAME = 'div';

	/**
  * The regex used to search for surface placeholders.
  * @type {RegExp}
  * @static
  */
	Component.SURFACE_REGEX = /\%\%\%\%~s(?:-([^~:]+))?~\%\%\%\%/g;

	/**
  * Surface tag name is a string that specifies the type of element to be
  * created for the surfaces. The nodeName of the created element is
  * initialized with the value of tag name.
  * @type {string}
  * @default div
  * @protected
  * @static
  */
	Component.SURFACE_TAG_NAME = 'div';

	/**
  * Cache states for the component.
  * @enum {string}
  */
	Component.Cache = {
		/**
   * Cache is not allowed for this state.
   */
		NOT_CACHEABLE: -1,

		/**
   * Cache not initialized.
   */
		NOT_INITIALIZED: -2
	};

	/**
  * Errors thrown by the component.
  * @enum {string}
  */
	Component.Error = {
		/**
   * Error when the component is already rendered and another render attempt
   * is made.
   */
		ALREADY_RENDERED: 'Component already rendered'
	};

	/**
  * A list with attribute names that will automatically be rejected as invalid.
  * @type {!Array<string>}
  */
	Component.INVALID_ATTRS = ['components', 'elementContent'];

	this.steel.Component = Component;
}).call(this);
(function () {
	'use strict';

	var ComponentRegistry = this.steel.ComponentRegistry;

	var SoyComponentAop = {
		/**
   * The function that should be called instead of a template call. If null, the original function
   * will be called instead.
   * @type {function()}
   * @protected
   */
		interceptFn_: null,

		/**
   * Flag indicating if soy templates have already been registered for interception or not.
   * @type {boolean}
   * @protected
   */
		registeredTemplates_: false,

		/**
   * Gets the original function of the given template function. If no original exists,
   * returns the given function itself.
   * @param {!function()} fn
   * @return {!function()}
   */
		getOriginalFn: function getOriginalFn(fn) {
			return fn.originalFn ? fn.originalFn : fn;
		},

		/**
   * Handles a template call, calling the current interception function if one is set, or otherwise
   * just calling the original function instead.
   * @param {string} compName The name of the component this template function belongs to.
   * @param {string} templateName The name of the template this call was made for.
   * @param {!function()} originalFn The original template function that was intercepted.
   * @param {Object} opt_data Template data object.
   * @param {*} opt_ignored
   * @param {Object} opt_ijData Template injected data object.
   * @return {*} The return value of the function that is called to handle this interception.
   */
		handleTemplateCall_: function handleTemplateCall_(compName, templateName, originalFn, opt_data, opt_ignored, opt_ijData) {
			if (SoyComponentAop.interceptFn_) {
				return SoyComponentAop.interceptFn_.call(null, compName, templateName, originalFn, opt_data, opt_ignored, opt_ijData);
			} else {
				return originalFn.call(null, opt_data, opt_ignored, opt_ijData);
			}
		},

		/**
   * Registers all templates so they can be intercepted, unless they've already
   * been registered before.
   */
		registerAll: function registerAll() {
			if (!SoyComponentAop.registeredTemplates_) {
				Object.keys(ComponentRegistry.Templates).forEach(function (compName) {
					SoyComponentAop.registerTemplates(compName);
				});
				SoyComponentAop.registeredTemplates_ = true;
			}
		},

		/**
   * Registers the templates for the requested component so they can be intercepted.
   * @param {string} compName
   */
		registerTemplates: function registerTemplates(compName) {
			var compTemplates = ComponentRegistry.Templates[compName];
			Object.keys(compTemplates).forEach(function (templateName) {
				var originalFn = compTemplates[templateName];
				if (!originalFn.originalFn) {
					compTemplates[templateName] = SoyComponentAop.handleTemplateCall_.bind(null, compName, templateName, originalFn);
					compTemplates[templateName].originalFn = originalFn;
				}
			});
		},

		/**
   * Starts intercepting all template calls, replacing them with a call
   * to the given function instead.
   * @param {!function()} fn
   */
		startInterception: function startInterception(fn) {
			this.registerAll();
			SoyComponentAop.interceptFn_ = fn;
		},

		/**
   * Stops intercepting template calls.
   */
		stopInterception: function stopInterception() {
			SoyComponentAop.interceptFn_ = null;
		}
	};

	this.steel.SoyComponentAop = SoyComponentAop;
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var object = this.steel.object;
	var Component = this.steel.Component;
	var ComponentRegistry = this.steel.ComponentRegistry;
	var SoyComponentAop = this.steel.SoyComponentAop;

	// The injected data that will be passed to soy templates.
	var ijData = {};

	/**
  * Special Component class that handles a better integration between soy templates
  * and the components. It allows for automatic rendering of surfaces that have soy
  * templates defined with their names, skipping the call to `getSurfaceContent`.
  * @param {Object} opt_config An object with the initial values for this component's
  *   attributes.
  * @constructor
  * @extends {Component}
  */

	var SoyComponent = (function (_Component) {
		babelHelpers.inherits(SoyComponent, _Component);

		function SoyComponent(opt_config) {
			babelHelpers.classCallCheck(this, SoyComponent);

			babelHelpers.get(Object.getPrototypeOf(SoyComponent.prototype), 'constructor', this).call(this, opt_config);

			/**
    * The parameters defined in this component's "content" soy template.
    * @type {Array}
    * @protected
    */
			this.contentParams_ = null;

			/**
    * Flags indicating which surface names have already been found on this component's content.
    * @type {!Object<string, boolean>}
    * @protected
    */
			this.firstSurfaceFound_ = {};

			/**
    * Indicates which surface is currently being rendered, or null if none is.
    * @type {boolean}
    * @protected
    */
			this.surfaceBeingRendered_ = null;

			/**
    * Flag indicating if inner calls to templates should be skipped.
    * @type {boolean}
    * @protected
    */
			this.skipInnerCalls_ = false;

			this.addSurfacesFromTemplates_(opt_config);
		}

		/**
   * Adds surfaces for each registered template that is not named `element`.
   * @param {Object=} opt_config Optional component configuration.
   * @protected
   */
		babelHelpers.createClass(SoyComponent, [{
			key: 'addSurfacesFromTemplates_',
			value: function addSurfacesFromTemplates_(opt_config) {
				var templates = ComponentRegistry.Templates[this.constructor.NAME] || {};
				var templateNames = Object.keys(templates);
				for (var i = 0; i < templateNames.length; i++) {
					var templateName = templateNames[i];
					var templateFn = SoyComponentAop.getOriginalFn(templates[templateName]);
					if (this.isSurfaceTemplate_(templateName, templateFn)) {
						var surface = this.getSurface(templateName);
						if (!surface) {
							this.addSurface(templateName, {
								renderAttrs: templateFn.params,
								templateComponentName: this.constructor.NAME,
								templateName: templateName
							}, opt_config);
						}
					} else if (templateName === 'content') {
						this.contentParams_ = templateFn.params;
					}
				}
			}

			/**
    * Builds the config data for a component from the data that was passed to its
    * soy template function.
    * @param {string} id The id of the component.
    * @param {!Object} templateData
    * @return {!Object} The component's config data.
    * @protected
    */
		}, {
			key: 'buildComponentConfigData_',
			value: function buildComponentConfigData_(id, templateData) {
				var config = {
					id: id
				};
				for (var key in templateData) {
					config[key] = templateData[key];
				}
				return config;
			}

			/**
    * Overrides the original method from `Component` to include renderAttrs extracted
    * from the sou template.
    * @return {!Object}
    */
		}, {
			key: 'buildElementSurfaceData_',
			value: function buildElementSurfaceData_() {
				var data = babelHelpers.get(Object.getPrototypeOf(SoyComponent.prototype), 'buildElementSurfaceData_', this).call(this);
				data.renderAttrs = this.contentParams_;
				this.contentParams_ = null;
				return data;
			}

			/**
    * Builds the data object that should be passed to a template from this component.
    * @return {!Object}
    * @protected
    */
		}, {
			key: 'buildTemplateData_',
			value: function buildTemplateData_() {
				var names = this.getAttrNames().filter(function (name) {
					// Get all attribute values except for "element", since it helps performance and this
					// attribute shouldn't be referenced inside a soy template anyway.
					return name !== 'element';
				});
				var surface = this.getSurface(this.id);
				var data = surface && surface.componentData ? surface.componentData : {};
				return object.mixin(data, this.getAttrs(names));
			}

			/**
    * Creates and instantiates a component that has the given soy template function as its
    * main content template. All keys present in the config object, if one is given, will be
    * attributes of this component, and the object itself will be passed to the constructor.
    * @param {!function()} templateFn
    * @param {(Element|string)=} opt_element The element that should be decorated. If none is given,
    *   one will be created and appended to the document body.
    * @param {Object=} opt_data Data to be passed to the soy template when it's called.
    * @return {!SoyComponent}
    * @static
    */
		}, {
			key: 'generateSurfaceElementId_',

			/**
    * Generates the id for a surface that was found by a soy template call.
    * @param {string?} parentSurfaceId The id of the parent surface, or undefined
    *   if there is none.
    * @param {!Object} data The placeholder data registered for this surface.
    * @return {string} The generated id.
    * @override
    */
			value: function generateSurfaceElementId_(parentSurfaceId, data) {
				if (data.templateName && !parentSurfaceId && !this.firstSurfaceFound_[data.templateName] && data.templateComponentName === this.constructor.NAME) {
					this.firstSurfaceFound_[data.templateName] = true;
					return this.prefixSurfaceId_(data.templateName);
				} else {
					return babelHelpers.get(Object.getPrototypeOf(SoyComponent.prototype), 'generateSurfaceElementId_', this).call(this, parentSurfaceId);
				}
			}

			/**
    * Gets the content that should be rendered in the component's main element by
    * rendering the `content` soy template.
    * @return {?string} The template's result content, or undefined if the
    *   template doesn't exist.
    */
		}, {
			key: 'getElementContent',
			value: function getElementContent() {
				this.surfaceBeingRendered_ = null;
				return this.renderTemplateByName_(this.constructor.NAME, 'content');
			}

			/**
    * Makes the default behavior of rendering surfaces automatically render the
    * appropriate soy template when one exists.
    * @param {string} surfaceId The surface id.
    * @param {string} surfaceElementId The surface element id.
    * @return {Object|string} The content to be rendered.
    * @override
    */
		}, {
			key: 'getSurfaceContent',
			value: function getSurfaceContent(surfaceId, surfaceElementId) {
				var surface = this.getSurface(surfaceId);
				var data = surface.templateData;
				surface.templateData = null;
				this.surfaceBeingRendered_ = surfaceElementId;
				return this.renderTemplateByName_(surface.templateComponentName, surface.templateName, data);
			}

			/**
    * Handles a call to the SoyComponent component template.
    * @param {string} componentName The component's name.
    * @param {Object} data The data the template was called with.
    * @return {string} A placeholder to be rendered instead of the content the template
    *   function would have returned.
    * @protected
    */
		}, {
			key: 'handleComponentCall_',
			value: function handleComponentCall_(componentName, data) {
				var surfaceData = {
					componentName: componentName
				};
				var id = (data || {}).id || this.generateSurfaceElementId_(this.surfaceBeingRendered_, surfaceData);
				surfaceData.componentData = this.buildComponentConfigData_(id, data);
				return this.buildPlaceholder(id, surfaceData);
			}

			/**
    * Handles a call to the soy function for getting delegate functions.
    * @param {string} templateComponentName The name of the component that this template was belongs to.
    * @param {string} templateName The name of this template.
    * @param {!function()} originalFn The original template function that was intercepted.
    * @param {!Object} data The data the template was called with.
    * @param {*} opt_ignored
    * @param {Object} opt_ijData Template injected data object.
    * @return {string}
    * @protected
    */
		}, {
			key: 'handleInterceptedCall_',
			value: function handleInterceptedCall_(templateComponentName, templateName, originalFn, data, opt_ignored, opt_ijData) {
				if (this.skipInnerCalls_) {
					return '';
				} else if (templateName === 'content') {
					return this.handleComponentCall_.call(this, templateComponentName, data);
				} else {
					return this.handleSurfaceCall_.call(this, templateComponentName, templateName, originalFn, data, opt_ignored, opt_ijData);
				}
			}

			/**
    * Handles a call to the SoyComponent surface template.
    * @param {string} templateComponentName The name of the component that this template was belongs to.
    * @param {string} templateName The name of this template.
    * @param {!function()} originalFn The original template function that was intercepted.
    * @param {!Object} data The data the template was called with.
    * @param {*} opt_ignored
    * @param {Object} opt_ijData Template injected data object.
    * @return {string} A placeholder to be rendered instead of the content the template
    *   function would have returned.
    * @protected
    */
		}, {
			key: 'handleSurfaceCall_',
			value: function handleSurfaceCall_(templateComponentName, templateName, originalFn, data, opt_ignored, opt_ijData) {
				var surfaceData = {
					templateComponentName: templateComponentName,
					templateData: data,
					templateName: templateName
				};
				var surfaceElementId;
				if (core.isDefAndNotNull(data.surfaceId)) {
					surfaceElementId = this.getSurfaceElementId_(data.surfaceId.toString());
				} else {
					if (originalFn['private']) {
						return originalFn.call(null, data, opt_ignored, opt_ijData);
					}
					surfaceElementId = this.generateSurfaceElementId_(this.surfaceBeingRendered_, surfaceData);
				}
				return this.buildPlaceholder(surfaceElementId, surfaceData);
			}

			/**
    * Checks if a template is a surface template.
    * @param {string} templateName
    * @param {!function()} templateFn
    * @return {boolean}
    * @protected
    */
		}, {
			key: 'isSurfaceTemplate_',
			value: function isSurfaceTemplate_(templateName, templateFn) {
				return templateName !== 'content' && templateName.substr(0, 13) !== '__deltemplate' && !templateFn['private'];
			}

			/**
    * Renders the given soy template function, instantiating any referenced components in it.
    * @param {!function()} templateFn
    * @param {(Element|string)=} opt_element The element that should be decorated. If none is given,
    *   one will be created and appended to the document body.
    * @param {Object=} opt_data Data to be passed to the soy template when it's called.
    * @return {!SoyComponent} The component that was created for this action. Contains
    *   references to components that were rendered by the given template function.
    * @static
    */
		}, {
			key: 'renderTemplate_',

			/**
    * Renders the specified template.
    * @param {!function()} templateFn
    * @param {Object=} opt_data
    * @return {string} The template's result content.
    */
			value: function renderTemplate_(templateFn, opt_data) {
				SoyComponentAop.startInterception(this.handleInterceptedCall_.bind(this));
				templateFn = SoyComponentAop.getOriginalFn(templateFn);
				var content = templateFn(opt_data || this.buildTemplateData_(), null, ijData).content;
				SoyComponentAop.stopInterception();
				return content;
			}

			/**
    * Renders the template with the specified name.
    * @param {string} templateComponentName
    * @param {string} templateName
    * @param {Object=} opt_data
    * @return {string} The template's result content.
    */
		}, {
			key: 'renderTemplateByName_',
			value: function renderTemplateByName_(templateComponentName, templateName, opt_data) {
				var elementTemplate;
				var componentTemplates = ComponentRegistry.Templates[templateComponentName];
				if (componentTemplates) {
					elementTemplate = componentTemplates[templateName];
				}

				if (core.isFunction(elementTemplate)) {
					return this.renderTemplate_(elementTemplate, opt_data);
				}
			}

			/**
    * Sanitizes the given html string, so it can skip escaping when passed to a
    * soy template.
    * @param {string} html
    * @return {soydata.SanitizedHtml}
    * @static
    */
		}, {
			key: 'valueElementFn_',

			/**
    * Overrides the original method from `Component` so only the outer soy
    * template returns content, as we only need to render the parent tag here.
    * @return {!Element}
    * @protected
    * @override
    */
			value: function valueElementFn_() {
				this.skipInnerCalls_ = true;
				var element = babelHelpers.get(Object.getPrototypeOf(SoyComponent.prototype), 'valueElementFn_', this).call(this);
				this.skipInnerCalls_ = false;
				return element;
			}
		}], [{
			key: 'createComponentFromTemplate',
			value: function createComponentFromTemplate(templateFn, opt_element, opt_data) {
				var name = 'TemplateComponent' + core.getUid();

				var TemplateComponent = (function (_SoyComponent) {
					babelHelpers.inherits(TemplateComponent, _SoyComponent);

					function TemplateComponent() {
						babelHelpers.classCallCheck(this, TemplateComponent);
						babelHelpers.get(Object.getPrototypeOf(TemplateComponent.prototype), 'constructor', this).apply(this, arguments);
					}

					return TemplateComponent;
				})(SoyComponent);

				ComponentRegistry.register(name, TemplateComponent);
				ComponentRegistry.Templates[name] = {
					content: function content(opt_attrs, opt_ignored, opt_ijData) {
						return SoyComponentAop.getOriginalFn(templateFn)(opt_data || {}, opt_ignored, opt_ijData);
					}
				};
				SoyComponentAop.registerTemplates(name);
				return new TemplateComponent({
					element: opt_element
				});
			}

			/**
    * Decorates html rendered by the given soy template function, instantiating any referenced
    * components in it.
    * @param {!function()} templateFn
    * @param {(Element|string)=} opt_element The element that should be decorated. If none is given,
    *   one will be created and appended to the document body.
    * @param {Object=} opt_data Data to be passed to the soy template when it's called.
    * @return {!SoyComponent} The component that was created for this action. Contains
    *   references to components that were rendered by the given template function.
    * @static
    */
		}, {
			key: 'decorateFromTemplate',
			value: function decorateFromTemplate(templateFn, opt_element, opt_data) {
				return SoyComponent.createComponentFromTemplate(templateFn, opt_element, opt_data).decorate();
			}
		}, {
			key: 'renderFromTemplate',
			value: function renderFromTemplate(templateFn, opt_element, opt_data) {
				return SoyComponent.createComponentFromTemplate(templateFn, opt_element, opt_data).render();
			}
		}, {
			key: 'sanitizeHtml',
			value: function sanitizeHtml(html) {
				return soydata.VERY_UNSAFE.ordainSanitizedHtml(html);
			}

			/**
    * Sets the injected data object that should be passed to templates.
    * @param {Object} data
    * @static
    */
		}, {
			key: 'setInjectedData',
			value: function setInjectedData(data) {
				ijData = data || {};
			}
		}]);
		return SoyComponent;
	})(Component);

	var originalSanitizedHtmlFromFn = soydata.SanitizedHtml.from;
	soydata.SanitizedHtml.from = function (value) {
		if (value && value.contentKind === 'HTML') {
			value = SoyComponent.sanitizeHtml(value.content);
		}
		return originalSanitizedHtmlFromFn(value);
	};

	this.steel.SoyComponent = SoyComponent;
}).call(this);
(function () {
	'use strict';

	var dom = this.steel.dom;
	var features = this.steel.features;

	var mouseEventMap = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	};
	Object.keys(mouseEventMap).forEach(function (eventName) {
		dom.registerCustomEvent(eventName, {
			delegate: true,
			handler: function handler(callback, event) {
				var related = event.relatedTarget;
				var target = event.delegateTarget;
				if (!related || related !== target && !target.contains(related)) {
					event.customType = eventName;
					return callback(event);
				}
			},
			originalEvent: mouseEventMap[eventName]
		});
	});

	var animationEventMap = {
		animation: 'animationend',
		transition: 'transitionend'
	};
	Object.keys(animationEventMap).forEach(function (eventType) {
		var eventName = animationEventMap[eventType];
		dom.registerCustomEvent(eventName, {
			event: true,
			delegate: true,
			handler: function handler(callback, event) {
				event.customType = eventName;
				return callback(event);
			},
			originalEvent: features.checkAnimationEventName()[eventType]
		});
	});
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var dom = this.steel.dom;
	var features = this.steel.features;

	var Anim = (function () {
		function Anim() {
			babelHelpers.classCallCheck(this, Anim);
		}

		babelHelpers.createClass(Anim, null, [{
			key: 'emulateEnd',

			/**
    * Emulates animation or transition end event, the end event with longer
    * duration will be used by the emulation. If they have the same value,
    * transitionend will be emulated.
    * @param {Element} element
    * @param {number} opt_durationMs
    * @return {object} Object containing `abort` function.
    */
			value: function emulateEnd(element, opt_durationMs) {
				if (this.getComputedDurationMs(element, 'animation') > this.getComputedDurationMs(element, 'transition')) {
					return this.emulateEnd_(element, 'animation', opt_durationMs);
				} else {
					return this.emulateEnd_(element, 'transition', opt_durationMs);
				}
			}

			/**
    * Emulates animation end event. If `opt_durationMs` not specified the value
    * will read from computed style for animation-duration.
    * @param {Element} element
    * @param {number} opt_durationMs
    * @return {object} Object containing `abort` function.
    */
		}, {
			key: 'emulateAnimationEnd',
			value: function emulateAnimationEnd(element, opt_durationMs) {
				return this.emulateEnd_(element, 'animation', opt_durationMs);
			}

			/**
    * Emulates transition end event. If `opt_durationMs` not specified the
    * value will read from computed style for transition-duration.
    * @param {Element} element
    * @param {number} opt_durationMs
    * @return {object} Object containing `abort` function.
    */
		}, {
			key: 'emulateTransitionEnd',
			value: function emulateTransitionEnd(element, opt_durationMs) {
				this.emulateEnd_(element, 'transition', opt_durationMs);
			}

			/**
    * Emulates transition or animation end.
    * @param {Element} element
    * @param {string} type
    * @param {number} opt_durationMs
    * @return {object} Object containing `abort` function.
    * @protected
    */
		}, {
			key: 'emulateEnd_',
			value: function emulateEnd_(element, type, opt_durationMs) {
				var duration = opt_durationMs;
				if (!core.isDef(opt_durationMs)) {
					duration = this.getComputedDurationMs(element, type);
				}

				var delayed = setTimeout(function () {
					dom.triggerEvent(element, features.checkAnimationEventName()[type]);
				}, duration);

				var abort = function abort() {
					clearTimeout(delayed);
					hoistedEvtHandler.removeListener();
				};
				var hoistedEvtHandler = dom.once(element, type + 'end', abort);

				return {
					abort: abort
				};
			}

			/**
    * Gets computed style duration for duration.
    * @param {Element} element
    * @param {string} type
    * @return {number} The computed duration in milliseconds.
    */
		}, {
			key: 'getComputedDurationMs',
			value: function getComputedDurationMs(element, type) {
				return (parseFloat(window.getComputedStyle(element, null).getPropertyValue(type + '-duration')) || 0) * 1000;
			}
		}]);
		return Anim;
	})();

	this.steel.Anim = Anim;
}).call(this);
(function () {
  /* jshint ignore:start */
  'use strict';

  var ComponentRegistry = this.steel.ComponentRegistry;

  var Templates = ComponentRegistry.Templates;
  // This file was automatically generated from Alert.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Alert.
   */

  if (typeof Templates.Alert == 'undefined') {
    Templates.Alert = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Alert.content = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="alert alert-dismissible component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="alert">' + Templates.Alert.dismiss(opt_data, null, opt_ijData) + Templates.Alert.body(opt_data, null, opt_ijData) + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Alert.content.soyTemplateName = 'Templates.Alert.content';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Alert.body = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body">' + (opt_data.body ? soy.$$escapeHtml(opt_data.body) : '') + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Alert.body.soyTemplateName = 'Templates.Alert.body';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Alert.dismiss = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-dismiss">' + (opt_data.dismissible ? '<button type="button" class="close" aria-label="Close" data-onclick="toggle"><span aria-hidden="true">×</span></button>' : '') + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Alert.dismiss.soyTemplateName = 'Templates.Alert.dismiss';
  }

  Templates.Alert.content.params = ["id"];
  Templates.Alert.body.params = ["body", "id"];
  Templates.Alert.dismiss.params = ["dismissible", "id"];
  this.steel.Alert = {};
  this.steel.Alert.soy = Templates.Alert;

  /* jshint ignore:end */
}).call(this);
(function () {
	'use strict';

	var core = this.steel.core;
	var dom = this.steel.dom;
	var SoyComponent = this.steel.SoyComponent;
	var ComponentRegistry = this.steel.ComponentRegistry;
	var Anim = this.steel.Anim;
	var EventHandler = this.steel.EventHandler;

	/**
  * Alert component.
  */

	var Alert = (function (_SoyComponent) {
		babelHelpers.inherits(Alert, _SoyComponent);

		function Alert(opt_config) {
			babelHelpers.classCallCheck(this, Alert);

			babelHelpers.get(Object.getPrototypeOf(Alert.prototype), 'constructor', this).call(this, opt_config);
			this.eventHandler_ = new EventHandler();
		}

		/**
   * Default alert elementClasses.
   * @default alert
   * @type {string}
   * @static
   */

		/**
   * @inheritDoc
   */
		babelHelpers.createClass(Alert, [{
			key: 'detached',
			value: function detached() {
				babelHelpers.get(Object.getPrototypeOf(Alert.prototype), 'detached', this).call(this);
				this.eventHandler_.removeAllListeners();
				clearTimeout(this.delay_);
			}

			/**
    * Closes the alert, disposing it once the animation ends.
    */
		}, {
			key: 'close',
			value: function close() {
				dom.once(this.element, 'animationend', this.dispose.bind(this));
				dom.once(this.element, 'transitionend', this.dispose.bind(this));
				this.eventHandler_.removeAllListeners();
				this.syncVisible(false);
			}

			/**
    * Handles document click in order to close the alert.
    * @param {!Event} event
    * @protected
    */
		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_(event) {
				if (!this.element.contains(event.target)) {
					this.hide();
				}
			}

			/**
    * Hide the alert.
    */
		}, {
			key: 'hide',
			value: function hide() {
				this.visible = false;
			}

			/**
    * Toggles the visibility of the alert.
    */
		}, {
			key: 'toggle',
			value: function toggle() {
				this.visible = !this.visible;
			}

			/**
    * Synchronization logic for `dismissible` attribute.
    * @param {boolean} dismissible
    */
		}, {
			key: 'syncDismissible',
			value: function syncDismissible(dismissible) {
				if (dismissible) {
					this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
				} else {
					this.eventHandler_.removeAllListeners();
				}

				dom[dismissible ? 'addClasses' : 'removeClasses'](this.element, 'alert-dismissible');
			}

			/**
    * Synchronization logic for `visible` attribute.
    * @param {boolean} visible
    */
		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				dom.removeClasses(this.element, this.animClasses[visible ? 'hide' : 'show']);
				dom.addClasses(this.element, this.animClasses[visible ? 'show' : 'hide']);
				// Some browsers do not fire transitionend events when running in background
				// tab, see https://bugzilla.mozilla.org/show_bug.cgi?id=683696.
				Anim.emulateEnd(this.element);

				if (visible && core.isNumber(this.hideDelay)) {
					this.syncHideDelay(this.hideDelay);
				}
			}

			/**
    * Synchronization logic for `hideDelay` attribute.
    * @param {?number} hideDelay
    */
		}, {
			key: 'syncHideDelay',
			value: function syncHideDelay(hideDelay) {
				if (core.isNumber(hideDelay) && this.visible) {
					clearTimeout(this.delay_);
					this.delay_ = setTimeout(this.hide.bind(this), hideDelay);
				}
			}
		}]);
		return Alert;
	})(SoyComponent);

	Alert.ELEMENT_CLASSES = 'alert';

	/**
  * Alert attributes definition.
  * @type {!Object}
  * @static
  */
	Alert.ATTRS = {
		/**
   * The CSS classes that should be added to the alert when being shown/hidden.
   * @type {!Object}
   */
		animClasses: {
			validator: core.isObject,
			value: {
				show: 'fade in',
				hide: 'fade'
			}
		},

		/**
   * The body content of the alert.
   * @type {string}
   */
		body: {
			value: ''
		},

		/**
   * Flag indicating if the alert should be dismissable (closeable).
   * @type {boolean}
   * @default true
   */
		dismissible: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * The CSS classes that should be added to the alert.
   * @type {string}
   * @default 'alert-success'
   */
		elementClasses: {
			value: 'alert-success'
		},

		/**
   * Delay hiding the alert (ms).
   * @type {?number}
   */
		hideDelay: {},

		/**
   * Flag indicating if the alert is visible or not.
   * @type {boolean}
   * @default false
   */
		visible: {
			value: false
		}
	};

	ComponentRegistry.register('Alert', Alert);

	this.steel.Alert = Alert;
}).call(this);
//# sourceMappingURL=alert.js.map