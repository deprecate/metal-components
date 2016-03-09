(function() {
this.metal = this.metal || {};
this.metalNamed = this.metalNamed || {};
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

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

babelHelpers.interopRequireDefault = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;
define(['exports'], function (exports) {
	'use strict';

	/**
  * A collection of core utility functions.
  * @const
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var core = function () {
		function core() {
			_classCallCheck(this, core);
		}

		core.abstractMethod = function abstractMethod() {
			throw Error('Unimplemented abstract method');
		};

		core.collectSuperClassesProperty = function collectSuperClassesProperty(constructor, propertyName) {
			var propertyValues = [constructor[propertyName]];
			while (constructor.__proto__ && !constructor.__proto__.isPrototypeOf(Function)) {
				constructor = constructor.__proto__;
				propertyValues.push(constructor[propertyName]);
			}
			return propertyValues;
		};

		core.getFunctionName = function getFunctionName(fn) {
			if (!fn.name) {
				var str = fn.toString();
				fn.name = str.substring(9, str.indexOf('('));
			}
			return fn.name;
		};

		core.getUid = function getUid(opt_object) {
			if (opt_object) {
				return opt_object[core.UID_PROPERTY] || (opt_object[core.UID_PROPERTY] = core.uniqueIdCounter_++);
			}
			return core.uniqueIdCounter_++;
		};

		core.identityFunction = function identityFunction(opt_returnValue) {
			return opt_returnValue;
		};

		core.isBoolean = function isBoolean(val) {
			return typeof val === 'boolean';
		};

		core.isDef = function isDef(val) {
			return val !== undefined;
		};

		core.isDefAndNotNull = function isDefAndNotNull(val) {
			return core.isDef(val) && !core.isNull(val);
		};

		core.isDocument = function isDocument(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 9;
		};

		core.isElement = function isElement(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 1;
		};

		core.isFunction = function isFunction(val) {
			return typeof val === 'function';
		};

		core.isNull = function isNull(val) {
			return val === null;
		};

		core.isNumber = function isNumber(val) {
			return typeof val === 'number';
		};

		core.isWindow = function isWindow(val) {
			return val !== null && val === val.window;
		};

		core.isObject = function isObject(val) {
			var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
			return type === 'object' && val !== null || type === 'function';
		};

		core.isPromise = function isPromise(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && typeof val.then === 'function';
		};

		core.isString = function isString(val) {
			return typeof val === 'string';
		};

		core.mergeSuperClassesProperty = function mergeSuperClassesProperty(constructor, propertyName, opt_mergeFn) {
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
		};

		core.nullFunction = function nullFunction() {};

		return core;
	}();

	/**
  * Unique id property prefix.
  * @type {String}
  * @protected
  */
	core.UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

	/**
  * Counter for unique id.
  * @type {Number}
  * @private
  */
	core.uniqueIdCounter_ = 1;

	exports.default = core;
});
define(['exports', '../core'], function (exports, _core) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

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

	var array = function () {
		function array() {
			_classCallCheck(this, array);
		}

		array.equal = function equal(arr1, arr2) {
			for (var i = 0; i < arr1.length; i++) {
				if (arr1[i] !== arr2[i]) {
					return false;
				}
			}
			return arr1.length === arr2.length;
		};

		array.firstDefinedValue = function firstDefinedValue(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] !== undefined) {
					return arr[i];
				}
			}
		};

		array.flatten = function flatten(arr, opt_output) {
			var output = opt_output || [];
			for (var i = 0; i < arr.length; i++) {
				if (Array.isArray(arr[i])) {
					array.flatten(arr[i], output);
				} else {
					output.push(arr[i]);
				}
			}
			return output;
		};

		array.remove = function remove(arr, obj) {
			var i = arr.indexOf(obj);
			var rv;
			if (rv = i >= 0) {
				array.removeAt(arr, i);
			}
			return rv;
		};

		array.removeAt = function removeAt(arr, i) {
			return Array.prototype.splice.call(arr, i, 1).length === 1;
		};

		array.slice = function slice(arr, start, opt_end) {
			var sliced = [];
			var end = _core2.default.isDef(opt_end) ? opt_end : arr.length;
			for (var i = start; i < end; i++) {
				sliced.push(arr[i]);
			}
			return sliced;
		};

		return array;
	}();

	exports.default = array;
});
define(['exports'], function (exports) {
	/*!
  * Polyfill from Google's Closure Library.
  * Copyright 2013 The Closure Library Authors. All Rights Reserved.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof setImmediate === 'function') {
			setImmediate(cb);
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
		var Channel;

		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof MessageChannel === 'function') {
			Channel = MessageChannel;
		}

		// If MessageChannel is not available and we are in a browser, implement
		// an iframe based polyfill in browsers that have postMessage and
		// document.addEventListener. The latter excludes IE8 because it has a
		// synchronous postMessage implementation.
		if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
			/** @constructor */
			Channel = function Channel() {
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
				var onmessage = function (e) {
					// Validate origin and message to make sure that this message was
					// intended for us.
					if (e.origin !== origin && e.data !== message) {
						return;
					}
					this.port1.onmessage();
				}.bind(this);
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

	exports.default = async;
});
define(['exports'], function (exports) {
	'use strict';

	/**
  * Disposable utility. When inherited provides the `dispose` function to its
  * subclass, which is responsible for disposing of any object references
  * when an instance won't be used anymore. Subclasses should override
  * `disposeInternal` to implement any specific disposing logic.
  * @constructor
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var Disposable = function () {
		function Disposable() {
			_classCallCheck(this, Disposable);

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


		Disposable.prototype.dispose = function dispose() {
			if (!this.disposed_) {
				this.disposeInternal();
				this.disposed_ = true;
			}
		};

		Disposable.prototype.disposeInternal = function disposeInternal() {};

		Disposable.prototype.isDisposed = function isDisposed() {
			return this.disposed_;
		};

		return Disposable;
	}();

	exports.default = Disposable;
});
define(['exports', '../core'], function (exports, _core) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

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

	var object = function () {
		function object() {
			_classCallCheck(this, object);
		}

		object.mixin = function mixin(target) {
			var key, source;
			for (var i = 1; i < arguments.length; i++) {
				source = arguments[i];
				for (key in source) {
					target[key] = source[key];
				}
			}
			return target;
		};

		object.getObjectByName = function getObjectByName(name, opt_obj) {
			var parts = name.split('.');
			var cur = opt_obj || window;
			var part;
			while (part = parts.shift()) {
				if (_core2.default.isDefAndNotNull(cur[part])) {
					cur = cur[part];
				} else {
					return null;
				}
			}
			return cur;
		};

		object.map = function map(obj, fn) {
			var mappedObj = {};
			var keys = Object.keys(obj);
			for (var i = 0; i < keys.length; i++) {
				mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
			}
			return mappedObj;
		};

		return object;
	}();

	exports.default = object;
});
define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var string = function () {
		function string() {
			_classCallCheck(this, string);
		}

		string.collapseBreakingSpaces = function collapseBreakingSpaces(str) {
			return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
		};

		string.getRandomString = function getRandomString() {
			var x = 2147483648;
			return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
		};

		string.hashCode = function hashCode(val) {
			var hash = 0;
			for (var i = 0, len = val.length; i < len; i++) {
				hash = 31 * hash + val.charCodeAt(i);
				hash %= 0x100000000;
			}
			return hash;
		};

		string.replaceInterval = function replaceInterval(str, start, end, value) {
			return str.substring(0, start) + value + str.substring(end);
		};

		return string;
	}();

	exports.default = string;
});
define(['exports', './core', './array/array', './async/async', './disposable/Disposable', './object/object', './string/string'], function (exports, _core, _array, _async, _Disposable, _object, _string) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.string = exports.object = exports.Disposable = exports.async = exports.array = exports.core = undefined;

  var _core2 = _interopRequireDefault(_core);

  var _array2 = _interopRequireDefault(_array);

  var _async2 = _interopRequireDefault(_async);

  var _Disposable2 = _interopRequireDefault(_Disposable);

  var _object2 = _interopRequireDefault(_object);

  var _string2 = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _core2.default;
  exports.core = _core2.default;
  exports.array = _array2.default;
  exports.async = _async2.default;
  exports.Disposable = _Disposable2.default;
  exports.object = _object2.default;
  exports.string = _string2.default;
});
define(['exports', 'metal-events/src/events'], function (exports, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var DomEventHandle = function (_EventHandle) {
		_inherits(DomEventHandle, _EventHandle);

		/**
   * The constructor for `DomEventHandle`.
   * @param {!EventEmitter} emitter Emitter the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {boolean} opt_capture Flag indicating if listener should be triggered
   *   during capture phase, instead of during the bubbling phase. Defaults to false.
   * @constructor
   */

		function DomEventHandle(emitter, event, listener, opt_capture) {
			_classCallCheck(this, DomEventHandle);

			var _this = _possibleConstructorReturn(this, _EventHandle.call(this, emitter, event, listener));

			_this.capture_ = opt_capture;
			return _this;
		}

		/**
   * @inheritDoc
   */


		DomEventHandle.prototype.removeListener = function removeListener() {
			this.emitter_.removeEventListener(this.event_, this.listener_, this.capture_);
		};

		return DomEventHandle;
	}(_events.EventHandle);

	DomEventHandle.prototype.registerMetalComponent && DomEventHandle.prototype.registerMetalComponent(DomEventHandle, 'DomEventHandle')
	exports.default = DomEventHandle;
});
define(['exports', 'metal/src/metal', './DomEventHandle'], function (exports, _metal, _DomEventHandle) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var dom = function () {
		function dom() {
			_classCallCheck(this, dom);
		}

		dom.addClasses = function addClasses(element, classes) {
			if (!_metal.core.isObject(element) || !_metal.core.isString(classes)) {
				return;
			}

			if ('classList' in element) {
				dom.addClassesWithNative_(element, classes);
			} else {
				dom.addClassesWithoutNative_(element, classes);
			}
		};

		dom.addClassesWithNative_ = function addClassesWithNative_(element, classes) {
			classes.split(' ').forEach(function (className) {
				element.classList.add(className);
			});
		};

		dom.addClassesWithoutNative_ = function addClassesWithoutNative_(element, classes) {
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
		};

		dom.closest = function closest(element, selector) {
			while (element && !dom.match(element, selector)) {
				element = element.parentNode;
			}
			return element;
		};

		dom.append = function append(parent, child) {
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
		};

		dom.buildFragment = function buildFragment(htmlString) {
			var tempDiv = document.createElement('div');
			tempDiv.innerHTML = '<br>' + htmlString;
			tempDiv.removeChild(tempDiv.firstChild);

			var fragment = document.createDocumentFragment();
			while (tempDiv.firstChild) {
				fragment.appendChild(tempDiv.firstChild);
			}
			return fragment;
		};

		dom.contains = function contains(element1, element2) {
			if (_metal.core.isDocument(element1)) {
				// document.contains is not defined on IE9, so call it on documentElement instead.
				return element1.documentElement.contains(element2);
			} else {
				return element1.contains(element2);
			}
		};

		dom.delegate = function delegate(element, eventName, selector, callback) {
			var customConfig = dom.customEvents[eventName];
			if (customConfig && customConfig.delegate) {
				eventName = customConfig.originalEvent;
				callback = customConfig.handler.bind(customConfig, callback);
			}
			return dom.on(element, eventName, dom.handleDelegateEvent_.bind(null, selector, callback));
		};

		dom.enterDocument = function enterDocument(node) {
			dom.append(document.body, node);
		};

		dom.exitDocument = function exitDocument(node) {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		};

		dom.handleDelegateEvent_ = function handleDelegateEvent_(selector, callback, event) {
			dom.normalizeDelegateEvent_(event);

			var currentElement = event.target;
			var returnValue = true;

			while (currentElement && !event.stopped) {
				if (_metal.core.isString(selector) && dom.match(currentElement, selector)) {
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
		};

		dom.hasClass = function hasClass(element, className) {
			if ('classList' in element) {
				return dom.hasClassWithNative_(element, className);
			} else {
				return dom.hasClassWithoutNative_(element, className);
			}
		};

		dom.hasClassWithNative_ = function hasClassWithNative_(element, className) {
			return element.classList.contains(className);
		};

		dom.hasClassWithoutNative_ = function hasClassWithoutNative_(element, className) {
			return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
		};

		dom.isEmpty = function isEmpty(element) {
			return element.childNodes.length === 0;
		};

		dom.match = function match(element, selector) {
			if (!element || element.nodeType !== 1) {
				return false;
			}

			var p = Element.prototype;
			var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
			if (m) {
				return m.call(element, selector);
			}

			return dom.matchFallback_(element, selector);
		};

		dom.matchFallback_ = function matchFallback_(element, selector) {
			var nodes = document.querySelectorAll(selector, element.parentNode);
			for (var i = 0; i < nodes.length; ++i) {
				if (nodes[i] === element) {
					return true;
				}
			}
			return false;
		};

		dom.next = function next(element, selector) {
			do {
				element = element.nextSibling;
				if (element && dom.match(element, selector)) {
					return element;
				}
			} while (element);
			return null;
		};

		dom.normalizeDelegateEvent_ = function normalizeDelegateEvent_(event) {
			event.stopPropagation = dom.stopPropagation_;
			event.stopImmediatePropagation = dom.stopImmediatePropagation_;
		};

		dom.on = function on(element, eventName, callback, opt_capture) {
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
		};

		dom.once = function once(element, eventName, callback) {
			var domEventHandle = this.on(element, eventName, function () {
				domEventHandle.removeListener();
				return callback.apply(this, arguments);
			});
			return domEventHandle;
		};

		dom.parent = function parent(element, selector) {
			return dom.closest(element.parentNode, selector);
		};

		dom.registerCustomEvent = function registerCustomEvent(eventName, customConfig) {
			dom.customEvents[eventName] = customConfig;
		};

		dom.removeChildren = function removeChildren(node) {
			var child;
			while (child = node.firstChild) {
				node.removeChild(child);
			}
		};

		dom.removeClasses = function removeClasses(element, classes) {
			if (!_metal.core.isObject(element) || !_metal.core.isString(classes)) {
				return;
			}

			if ('classList' in element) {
				dom.removeClassesWithNative_(element, classes);
			} else {
				dom.removeClassesWithoutNative_(element, classes);
			}
		};

		dom.removeClassesWithNative_ = function removeClassesWithNative_(element, classes) {
			classes.split(' ').forEach(function (className) {
				element.classList.remove(className);
			});
		};

		dom.removeClassesWithoutNative_ = function removeClassesWithoutNative_(element, classes) {
			var elementClassName = ' ' + element.className + ' ';

			classes = classes.split(' ');

			for (var i = 0; i < classes.length; i++) {
				elementClassName = elementClassName.replace(' ' + classes[i] + ' ', ' ');
			}

			element.className = elementClassName.trim();
		};

		dom.replace = function replace(element1, element2) {
			if (element1 && element2 && element1 !== element2 && element1.parentNode) {
				element1.parentNode.insertBefore(element2, element1);
				element1.parentNode.removeChild(element1);
			}
		};

		dom.stopImmediatePropagation_ = function stopImmediatePropagation_() {
			this.stopped = true;
			Event.prototype.stopImmediatePropagation.call(this);
		};

		dom.stopPropagation_ = function stopPropagation_() {
			this.stopped = true;
			Event.prototype.stopPropagation.call(this);
		};

		dom.supportsEvent = function supportsEvent(element, eventName) {
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
		};

		dom.toElement = function toElement(selectorOrElement) {
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
		};

		dom.toggleClasses = function toggleClasses(element, classes) {
			if (!_metal.core.isObject(element) || !_metal.core.isString(classes)) {
				return;
			}

			if ('classList' in element) {
				dom.toggleClassesWithNative_(element, classes);
			} else {
				dom.toggleClassesWithoutNative_(element, classes);
			}
		};

		dom.toggleClassesWithNative_ = function toggleClassesWithNative_(element, classes) {
			classes.split(' ').forEach(function (className) {
				element.classList.toggle(className);
			});
		};

		dom.toggleClassesWithoutNative_ = function toggleClassesWithoutNative_(element, classes) {
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
		};

		dom.triggerEvent = function triggerEvent(element, eventName, opt_eventObj) {
			var eventObj = document.createEvent('HTMLEvents');
			eventObj.initEvent(eventName, true, true);
			_metal.object.mixin(eventObj, opt_eventObj);
			element.dispatchEvent(eventObj);
		};

		return dom;
	}();

	var elementsByTag = {};
	dom.customEvents = {};

	exports.default = dom;
});
define(['exports', './dom', 'metal-events/src/events'], function (exports, _dom, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var DomEventEmitterProxy = function (_EventEmitterProxy) {
		_inherits(DomEventEmitterProxy, _EventEmitterProxy);

		function DomEventEmitterProxy() {
			_classCallCheck(this, DomEventEmitterProxy);

			return _possibleConstructorReturn(this, _EventEmitterProxy.apply(this, arguments));
		}

		DomEventEmitterProxy.prototype.addListener_ = function addListener_(event, listener) {
			if (this.originEmitter_.addEventListener) {
				if (event.startsWith('delegate:')) {
					var index = event.indexOf(':', 9);
					var eventName = event.substring(9, index);
					var selector = event.substring(index + 1);
					return _dom2.default.delegate(this.originEmitter_, eventName, selector, listener);
				} else {
					return _dom2.default.on(this.originEmitter_, event, listener);
				}
			} else {
				return _EventEmitterProxy.prototype.addListener_.call(this, event, listener);
			}
		};

		DomEventEmitterProxy.prototype.isSupportedDomEvent_ = function isSupportedDomEvent_(event) {
			return event.startsWith('delegate:') && event.indexOf(':', 9) !== -1 || _dom2.default.supportsEvent(this.originEmitter_, event);
		};

		DomEventEmitterProxy.prototype.shouldProxyEvent_ = function shouldProxyEvent_(event) {
			return _EventEmitterProxy.prototype.shouldProxyEvent_.call(this, event) && (!this.originEmitter_.addEventListener || this.isSupportedDomEvent_(event));
		};

		return DomEventEmitterProxy;
	}(_events.EventEmitterProxy);

	DomEventEmitterProxy.prototype.registerMetalComponent && DomEventEmitterProxy.prototype.registerMetalComponent(DomEventEmitterProxy, 'DomEventEmitterProxy')
	exports.default = DomEventEmitterProxy;
});
define(['exports', './dom', 'metal/src/metal'], function (exports, _dom, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	var features = function () {
		function features() {
			_classCallCheck(this, features);
		}

		features.checkAnimationEventName = function checkAnimationEventName() {
			if (features.animationEventName_ === undefined) {
				features.animationEventName_ = {
					animation: features.checkAnimationEventName_('animation'),
					transition: features.checkAnimationEventName_('transition')
				};
			}
			return features.animationEventName_;
		};

		features.checkAnimationEventName_ = function checkAnimationEventName_(type) {
			var prefixes = ['Webkit', 'MS', 'O', ''];
			var typeTitleCase = _metal.string.replaceInterval(type, 0, 1, type.substring(0, 1).toUpperCase());
			var suffixes = [typeTitleCase + 'End', typeTitleCase + 'End', typeTitleCase + 'End', type + 'end'];
			for (var i = 0; i < prefixes.length; i++) {
				if (features.animationElement_.style[prefixes[i] + typeTitleCase] !== undefined) {
					return prefixes[i].toLowerCase() + suffixes[i];
				}
			}
			return type + 'end';
		};

		features.checkAttrOrderChange = function checkAttrOrderChange() {
			if (features.attrOrderChange_ === undefined) {
				var originalContent = '<div data-component="" data-ref=""></div>';
				var element = document.createElement('div');
				_dom2.default.append(element, originalContent);
				features.attrOrderChange_ = originalContent !== element.innerHTML;
			}
			return features.attrOrderChange_;
		};

		return features;
	}();

	features.animationElement_ = document.createElement('div');
	features.animationEventName_ = undefined;
	features.attrOrderChange_ = undefined;

	exports.default = features;
});
define(['exports', 'metal/src/metal', './dom'], function (exports, _metal, _dom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	var globalEval = function () {
		function globalEval() {
			_classCallCheck(this, globalEval);
		}

		globalEval.run = function run(text, opt_appendFn) {
			var script = document.createElement('script');
			script.text = text;
			if (opt_appendFn) {
				opt_appendFn(script);
			} else {
				document.head.appendChild(script);
			}
			_dom2.default.exitDocument(script);
			return script;
		};

		globalEval.runFile = function runFile(src, opt_callback, opt_appendFn) {
			var script = document.createElement('script');
			script.src = src;

			var callback = function callback() {
				_dom2.default.exitDocument(script);
				opt_callback && opt_callback();
			};
			_dom2.default.on(script, 'load', callback);
			_dom2.default.on(script, 'error', callback);

			if (opt_appendFn) {
				opt_appendFn(script);
			} else {
				document.head.appendChild(script);
			}

			return script;
		};

		globalEval.runScript = function runScript(script, opt_callback, opt_appendFn) {
			var callback = function callback() {
				opt_callback && opt_callback();
			};
			if (script.type && script.type !== 'text/javascript') {
				_metal.async.nextTick(callback);
				return;
			}
			_dom2.default.exitDocument(script);
			if (script.src) {
				return globalEval.runFile(script.src, opt_callback, opt_appendFn);
			} else {
				_metal.async.nextTick(callback);
				return globalEval.run(script.text, opt_appendFn);
			}
		};

		globalEval.runScriptsInElement = function runScriptsInElement(element, opt_callback, opt_appendFn) {
			var scripts = element.querySelectorAll('script');
			if (scripts.length) {
				globalEval.runScriptsInOrder(scripts, 0, opt_callback, opt_appendFn);
			} else if (opt_callback) {
				_metal.async.nextTick(opt_callback);
			}
		};

		globalEval.runScriptsInOrder = function runScriptsInOrder(scripts, index, opt_callback, opt_appendFn) {
			globalEval.runScript(scripts.item(index), function () {
				if (index < scripts.length - 1) {
					globalEval.runScriptsInOrder(scripts, index + 1, opt_callback, opt_appendFn);
				} else if (opt_callback) {
					_metal.async.nextTick(opt_callback);
				}
			}, opt_appendFn);
		};

		return globalEval;
	}();

	exports.default = globalEval;
});
define(['exports', 'metal/src/metal', './dom'], function (exports, _metal, _dom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	var globalEvalStyles = function () {
		function globalEvalStyles() {
			_classCallCheck(this, globalEvalStyles);
		}

		globalEvalStyles.run = function run(text, opt_appendFn) {
			var style = document.createElement('style');
			style.innerHTML = text;
			if (opt_appendFn) {
				opt_appendFn(style);
			} else {
				document.head.appendChild(style);
			}
			return style;
		};

		globalEvalStyles.runFile = function runFile(href, opt_callback, opt_appendFn) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = href;
			globalEvalStyles.runStyle(link, opt_callback, opt_appendFn);
			return link;
		};

		globalEvalStyles.runStyle = function runStyle(style, opt_callback, opt_appendFn) {
			var callback = function callback() {
				opt_callback && opt_callback();
			};
			if (style.rel && style.rel !== 'stylesheet') {
				_metal.async.nextTick(callback);
				return;
			}

			if (style.tagName === 'STYLE') {
				_metal.async.nextTick(callback);
			} else {
				_dom2.default.on(style, 'load', callback);
				_dom2.default.on(style, 'error', callback);
			}

			if (opt_appendFn) {
				opt_appendFn(style);
			} else {
				document.head.appendChild(style);
			}

			return style;
		};

		globalEvalStyles.runStylesInElement = function runStylesInElement(element, opt_callback, opt_appendFn) {
			var styles = element.querySelectorAll('style,link');
			if (styles.length === 0 && opt_callback) {
				_metal.async.nextTick(opt_callback);
				return;
			}

			var loadCount = 0;
			var callback = function callback() {
				if (opt_callback && ++loadCount === styles.length) {
					_metal.async.nextTick(opt_callback);
				}
			};
			for (var i = 0; i < styles.length; i++) {
				globalEvalStyles.runStyle(styles[i], callback, opt_appendFn);
			}
		};

		return globalEvalStyles;
	}();

	exports.default = globalEvalStyles;
});
define(['./dom', './features'], function (_dom, _features) {
	'use strict';

	var _dom2 = _interopRequireDefault(_dom);

	var _features2 = _interopRequireDefault(_features);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var mouseEventMap = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	};
	Object.keys(mouseEventMap).forEach(function (eventName) {
		_dom2.default.registerCustomEvent(eventName, {
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
		_dom2.default.registerCustomEvent(eventName, {
			event: true,
			delegate: true,
			handler: function handler(callback, event) {
				event.customType = eventName;
				return callback(event);
			},
			originalEvent: _features2.default.checkAnimationEventName()[eventType]
		});
	});
});
define(['exports', '../dom', '../DomEventEmitterProxy', '../DomEventHandle', '../features', '../globalEval', '../globalEvalStyles', '../events'], function (exports, _dom, _DomEventEmitterProxy, _DomEventHandle, _features, _globalEval, _globalEvalStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.globalEvalStyles = exports.globalEval = exports.features = exports.DomEventHandle = exports.DomEventEmitterProxy = exports.dom = undefined;

  var _dom2 = _interopRequireDefault(_dom);

  var _DomEventEmitterProxy2 = _interopRequireDefault(_DomEventEmitterProxy);

  var _DomEventHandle2 = _interopRequireDefault(_DomEventHandle);

  var _features2 = _interopRequireDefault(_features);

  var _globalEval2 = _interopRequireDefault(_globalEval);

  var _globalEvalStyles2 = _interopRequireDefault(_globalEvalStyles);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _dom2.default;
  exports.dom = _dom2.default;
  exports.DomEventEmitterProxy = _DomEventEmitterProxy2.default;
  exports.DomEventHandle = _DomEventHandle2.default;
  exports.features = _features2.default;
  exports.globalEval = _globalEval2.default;
  exports.globalEvalStyles = _globalEvalStyles2.default;
});
define(['exports', 'metal/src/metal', 'metal-events/src/events'], function (exports, _metal, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var Attribute = function (_EventEmitter) {
		_inherits(Attribute, _EventEmitter);

		function Attribute(opt_config) {
			_classCallCheck(this, Attribute);

			var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

			/**
    * Object with information about the batch event that is currently
    * scheduled, or null if none is.
    * @type {Object}
    * @protected
    */
			_this.scheduledBatchData_ = null;

			/**
    * Object that contains information about all this instance's attributes.
    * @type {!Object<string, !Object>}
    * @protected
    */
			_this.attrsInfo_ = {};

			_this.setShouldUseFacade(true);
			_this.mergeInvalidAttrs_();
			_this.addAttrsFromStaticHint_(opt_config);
			return _this;
		}

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


		Attribute.prototype.addAttr = function addAttr(name, config, initialValue) {
			this.buildAttrInfo_(name, config, initialValue);
			Object.defineProperty(this, name, this.buildAttrPropertyDef_(name));
		};

		Attribute.prototype.addAttrs = function addAttrs(configs, initialValues, opt_defineContext) {
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
		};

		Attribute.prototype.addAttrsFromStaticHint_ = function addAttrsFromStaticHint_(config) {
			var ctor = this.constructor;
			var defineContext = false;
			if (Attribute.mergeAttrsStatic(ctor)) {
				defineContext = ctor.prototype;
			}
			this.addAttrs(ctor.ATTRS_MERGED, config, defineContext);
		};

		Attribute.prototype.assertValidAttrName_ = function assertValidAttrName_(name) {
			if (this.constructor.INVALID_ATTRS_MERGED[name]) {
				throw new Error('It\'s not allowed to create an attribute with the name "' + name + '".');
			}
		};

		Attribute.prototype.buildAttrInfo_ = function buildAttrInfo_(name, config, initialValue) {
			this.assertValidAttrName_(name);

			this.attrsInfo_[name] = {
				config: config || {},
				initialValue: initialValue,
				state: Attribute.States.UNINITIALIZED
			};
		};

		Attribute.prototype.buildAttrPropertyDef_ = function buildAttrPropertyDef_(name) {
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
		};

		Attribute.prototype.callFunction_ = function callFunction_(fn, args) {
			if (_metal.core.isString(fn)) {
				return this[fn].apply(this, args);
			} else if (_metal.core.isFunction(fn)) {
				return fn.apply(this, args);
			}
		};

		Attribute.prototype.callSetter_ = function callSetter_(name, value, currentValue) {
			var info = this.attrsInfo_[name];
			var config = info.config;
			if (config.setter) {
				value = this.callFunction_(config.setter, [value, currentValue]);
			}
			return value;
		};

		Attribute.prototype.callValidator_ = function callValidator_(name, value) {
			var info = this.attrsInfo_[name];
			var config = info.config;
			if (config.validator) {
				return this.callFunction_(config.validator, [value]);
			}
			return true;
		};

		Attribute.prototype.canSetAttribute = function canSetAttribute(name) {
			var info = this.attrsInfo_[name];
			return !info.config.writeOnce || !info.written;
		};

		Attribute.prototype.disposeInternal = function disposeInternal() {
			_EventEmitter.prototype.disposeInternal.call(this);
			this.attrsInfo_ = null;
			this.scheduledBatchData_ = null;
		};

		Attribute.prototype.emitBatchEvent_ = function emitBatchEvent_() {
			if (!this.isDisposed()) {
				var data = this.scheduledBatchData_;
				this.scheduledBatchData_ = null;
				this.emit('attrsChanged', data);
			}
		};

		Attribute.prototype.get = function get(name) {
			return this[name];
		};

		Attribute.prototype.getAttrConfig = function getAttrConfig(name) {
			return (this.attrsInfo_[name] || {}).config;
		};

		Attribute.prototype.getAttrs = function getAttrs(opt_names) {
			var attrsMap = {};
			var names = opt_names || this.getAttrNames();

			for (var i = 0; i < names.length; i++) {
				attrsMap[names[i]] = this[names[i]];
			}

			return attrsMap;
		};

		Attribute.prototype.getAttrNames = function getAttrNames() {
			return Object.keys(this.attrsInfo_);
		};

		Attribute.prototype.getAttrValue_ = function getAttrValue_(name) {
			this.initAttr_(name);

			return this.attrsInfo_[name].value;
		};

		Attribute.prototype.hasBeenSet = function hasBeenSet(name) {
			var info = this.attrsInfo_[name];
			return info.state === Attribute.States.INITIALIZED || info.initialValue;
		};

		Attribute.prototype.informChange_ = function informChange_(name, prevVal) {
			if (this.shouldInformChange_(name, prevVal)) {
				var data = {
					attrName: name,
					newVal: this[name],
					prevVal: prevVal
				};
				this.emit(name + 'Changed', data);
				this.emit('attrChanged', data);
				this.scheduleBatchEvent_(data);
			}
		};

		Attribute.prototype.initAttr_ = function initAttr_(name) {
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
		};

		Attribute.mergeAttrs_ = function mergeAttrs_(values) {
			return _metal.object.mixin.apply(null, [{}].concat(values.reverse()));
		};

		Attribute.mergeAttrsStatic = function mergeAttrsStatic(ctor) {
			return _metal.core.mergeSuperClassesProperty(ctor, 'ATTRS', Attribute.mergeAttrs_);
		};

		Attribute.prototype.mergeInvalidAttrs_ = function mergeInvalidAttrs_() {
			_metal.core.mergeSuperClassesProperty(this.constructor, 'INVALID_ATTRS', function (values) {
				return _metal.array.flatten(values).reduce(function (merged, val) {
					if (val) {
						merged[val] = true;
					}
					return merged;
				}, {});
			});
		};

		Attribute.prototype.removeAttr = function removeAttr(name) {
			this.attrsInfo_[name] = null;
			delete this[name];
		};

		Attribute.prototype.scheduleBatchEvent_ = function scheduleBatchEvent_(attrChangeData) {
			if (!this.scheduledBatchData_) {
				_metal.async.nextTick(this.emitBatchEvent_, this);
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
		};

		Attribute.prototype.set = function set(name, value) {
			this[name] = value;
		};

		Attribute.prototype.setAttrs = function setAttrs(values) {
			var names = Object.keys(values);

			for (var i = 0; i < names.length; i++) {
				this[names[i]] = values[names[i]];
			}
		};

		Attribute.prototype.setAttrValue_ = function setAttrValue_(name, value) {
			if (!this.canSetAttribute(name) || !this.validateAttrValue_(name, value)) {
				return;
			}

			var info = this.attrsInfo_[name];
			if (info.initialValue === undefined && info.state === Attribute.States.UNINITIALIZED) {
				info.state = Attribute.States.INITIALIZED;
			}

			var prevVal = this[name];
			info.value = this.callSetter_(name, value, prevVal);
			info.written = true;
			this.informChange_(name, prevVal);
		};

		Attribute.prototype.setDefaultValue_ = function setDefaultValue_(name) {
			var config = this.attrsInfo_[name].config;

			if (config.value !== undefined) {
				this[name] = config.value;
			} else {
				this[name] = this.callFunction_(config.valueFn);
			}
		};

		Attribute.prototype.setInitialValue_ = function setInitialValue_(name) {
			var info = this.attrsInfo_[name];
			if (info.initialValue !== undefined) {
				this[name] = info.initialValue;
				info.initialValue = undefined;
			}
		};

		Attribute.prototype.shouldInformChange_ = function shouldInformChange_(name, prevVal) {
			var info = this.attrsInfo_[name];
			return info.state === Attribute.States.INITIALIZED && (_metal.core.isObject(prevVal) || prevVal !== this[name]);
		};

		Attribute.prototype.validateAttrValue_ = function validateAttrValue_(name, value) {
			var info = this.attrsInfo_[name];

			return info.state === Attribute.States.INITIALIZING_DEFAULT || this.callValidator_(name, value);
		};

		return Attribute;
	}(_events.EventEmitter);

	Attribute.prototype.registerMetalComponent && Attribute.prototype.registerMetalComponent(Attribute, 'Attribute')


	/**
  * A list with attribute names that will automatically be rejected as invalid.
  * Subclasses can define their own invalid attributes by setting this static
  * on their constructors, which will be merged together and handled automatically.
  * @type {!Array<string>}
  */
	Attribute.INVALID_ATTRS = ['attr', 'attrs'];

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

	exports.default = Attribute;
});
define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var EventHandle = function (_Disposable) {
		_inherits(EventHandle, _Disposable);

		function EventHandle(emitter, event, listener) {
			_classCallCheck(this, EventHandle);

			var _this = _possibleConstructorReturn(this, _Disposable.call(this));

			/**
    * The EventEmitter instance that the event was subscribed to.
    * @type {EventEmitter}
    * @protected
    */
			_this.emitter_ = emitter;

			/**
    * The name of the event that was subscribed to.
    * @type {string}
    * @protected
    */
			_this.event_ = event;

			/**
    * The listener subscribed to the event.
    * @type {Function}
    * @protected
    */
			_this.listener_ = listener;
			return _this;
		}

		/**
   * Disposes of this instance's object references.
   * @override
   */


		EventHandle.prototype.disposeInternal = function disposeInternal() {
			this.removeListener();
			this.emitter_ = null;
			this.listener_ = null;
		};

		EventHandle.prototype.removeListener = function removeListener() {
			if (!this.emitter_.isDisposed()) {
				this.emitter_.removeListener(this.event_, this.listener_);
			}
		};

		return EventHandle;
	}(_metal.Disposable);

	EventHandle.prototype.registerMetalComponent && EventHandle.prototype.registerMetalComponent(EventHandle, 'EventHandle')
	exports.default = EventHandle;
});
define(['exports', 'metal/src/metal', './EventHandle'], function (exports, _metal, _EventHandle) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _EventHandle2 = _interopRequireDefault(_EventHandle);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var EventEmitter = function (_Disposable) {
		_inherits(EventEmitter, _Disposable);

		function EventEmitter() {
			_classCallCheck(this, EventEmitter);

			var _this = _possibleConstructorReturn(this, _Disposable.call(this));

			/**
    * Holds event listeners scoped by event type.
    * @type {!Object<string, !Array<!function()>>}
    * @protected
    */
			_this.events_ = [];

			/**
    * The maximum number of listeners allowed for each event type. If the number
    * becomes higher than the max, a warning will be issued.
    * @type {number}
    * @protected
    */
			_this.maxListeners_ = 10;

			/**
    * Configuration option which determines if an event facade should be sent
    * as a param of listeners when emitting events. If set to true, the facade
    * will be passed as the first argument of the listener.
    * @type {boolean}
    * @protected
    */
			_this.shouldUseFacade_ = false;
			return _this;
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


		EventEmitter.prototype.addListener = function addListener(events, listener, opt_default) {
			this.validateListener_(listener);

			events = this.normalizeEvents_(events);
			for (var i = 0; i < events.length; i++) {
				this.addSingleListener_(events[i], listener, opt_default);
			}

			return new _EventHandle2.default(this, events, listener);
		};

		EventEmitter.prototype.addSingleListener_ = function addSingleListener_(event, listener, opt_default, opt_origin) {
			this.emit('newListener', event, listener);

			if (!this.events_[event]) {
				this.events_[event] = [];
			}
			this.events_[event].push({
				default: opt_default,
				fn: listener,
				origin: opt_origin
			});

			var listeners = this.events_[event];
			if (listeners.length > this.maxListeners_ && !listeners.warned) {
				console.warn('Possible EventEmitter memory leak detected. %d listeners added ' + 'for event %s. Use emitter.setMaxListeners() to increase limit.', listeners.length, event);
				listeners.warned = true;
			}
		};

		EventEmitter.prototype.disposeInternal = function disposeInternal() {
			this.events_ = [];
		};

		EventEmitter.prototype.emit = function emit(event) {
			var args = _metal.array.slice(arguments, 1);
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
				if (listeners[i].default) {
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
		};

		EventEmitter.prototype.getShouldUseFacade = function getShouldUseFacade() {
			return this.shouldUseFacade_;
		};

		EventEmitter.prototype.listeners = function listeners(event) {
			return (this.events_[event] || []).map(function (listener) {
				return listener.fn;
			});
		};

		EventEmitter.prototype.many = function many(events, amount, listener) {
			events = this.normalizeEvents_(events);
			for (var i = 0; i < events.length; i++) {
				this.many_(events[i], amount, listener);
			}

			return new _EventHandle2.default(this, events, listener);
		};

		EventEmitter.prototype.many_ = function many_(event, amount, listener) {
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
		};

		EventEmitter.prototype.matchesListener_ = function matchesListener_(listenerObj, listener) {
			return listenerObj.fn === listener || listenerObj.origin && listenerObj.origin === listener;
		};

		EventEmitter.prototype.normalizeEvents_ = function normalizeEvents_(events) {
			return _metal.core.isString(events) ? [events] : events;
		};

		EventEmitter.prototype.off = function off(events, listener) {
			this.validateListener_(listener);

			events = this.normalizeEvents_(events);
			for (var i = 0; i < events.length; i++) {
				var listenerObjs = this.events_[events[i]] || [];
				this.removeMatchingListenerObjs_(listenerObjs, listener);
			}

			return this;
		};

		EventEmitter.prototype.on = function on() {
			return this.addListener.apply(this, arguments);
		};

		EventEmitter.prototype.once = function once(events, listener) {
			return this.many(events, 1, listener);
		};

		EventEmitter.prototype.removeAllListeners = function removeAllListeners(opt_events) {
			if (opt_events) {
				var events = this.normalizeEvents_(opt_events);
				for (var i = 0; i < events.length; i++) {
					this.events_[events[i]] = null;
				}
			} else {
				this.events_ = {};
			}
			return this;
		};

		EventEmitter.prototype.removeMatchingListenerObjs_ = function removeMatchingListenerObjs_(listenerObjs, listener) {
			for (var i = listenerObjs.length - 1; i >= 0; i--) {
				if (this.matchesListener_(listenerObjs[i], listener)) {
					listenerObjs.splice(i, 1);
				}
			}
		};

		EventEmitter.prototype.removeListener = function removeListener() {
			return this.off.apply(this, arguments);
		};

		EventEmitter.prototype.setMaxListeners = function setMaxListeners(max) {
			this.maxListeners_ = max;
			return this;
		};

		EventEmitter.prototype.setShouldUseFacade = function setShouldUseFacade(shouldUseFacade) {
			this.shouldUseFacade_ = shouldUseFacade;
			return this;
		};

		EventEmitter.prototype.validateListener_ = function validateListener_(listener) {
			if (!_metal.core.isFunction(listener)) {
				throw new TypeError('Listener must be a function');
			}
		};

		return EventEmitter;
	}(_metal.Disposable);

	EventEmitter.prototype.registerMetalComponent && EventEmitter.prototype.registerMetalComponent(EventEmitter, 'EventEmitter')
	exports.default = EventEmitter;
});
define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var EventEmitterProxy = function (_Disposable) {
		_inherits(EventEmitterProxy, _Disposable);

		function EventEmitterProxy(originEmitter, targetEmitter, opt_blacklist, opt_whitelist) {
			_classCallCheck(this, EventEmitterProxy);

			var _this = _possibleConstructorReturn(this, _Disposable.call(this));

			/**
    * Map of events that should not be proxied.
    * @type {Object}
    * @protected
    */
			_this.blacklist_ = opt_blacklist || {};

			/**
    * The origin emitter. This emitter's events will be proxied through the
    * target emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.originEmitter_ = originEmitter;

			/**
    * Holds a map of events from the origin emitter that are already being proxied.
    * @type {Object<string, !EventHandle>}
    * @protected
    */
			_this.proxiedEvents_ = {};

			/**
    * The target emitter. This emitter will emit all events that come from
    * the origin emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.targetEmitter_ = targetEmitter;

			/**
    * Map of events that should be proxied. If whitelist is set blacklist is ignored.
    * @type {Object}
    * @protected
    */
			_this.whitelist_ = opt_whitelist;

			_this.startProxy_();
			return _this;
		}

		/**
   * Adds the given listener for the given event.
   * @param {string} event
   * @param {!function()} listener
   * @return {!EventHandle} The listened event's handle.
   * @protected
   */


		EventEmitterProxy.prototype.addListener_ = function addListener_(event, listener) {
			return this.originEmitter_.on(event, listener);
		};

		EventEmitterProxy.prototype.addListenerForEvent_ = function addListenerForEvent_(event) {
			return this.addListener_(event, this.emitOnTarget_.bind(this, event));
		};

		EventEmitterProxy.prototype.disposeInternal = function disposeInternal() {
			this.removeListeners_();
			this.proxiedEvents_ = null;
			this.originEmitter_ = null;
			this.targetEmitter_ = null;
		};

		EventEmitterProxy.prototype.emitOnTarget_ = function emitOnTarget_(eventType) {
			var args = [eventType].concat(_metal.array.slice(arguments, 1));
			this.targetEmitter_.emit.apply(this.targetEmitter_, args);
		};

		EventEmitterProxy.prototype.proxyEvent = function proxyEvent(event) {
			if (this.shouldProxyEvent_(event)) {
				this.proxiedEvents_[event] = this.addListenerForEvent_(event);
			}
		};

		EventEmitterProxy.prototype.removeListeners_ = function removeListeners_() {
			var events = Object.keys(this.proxiedEvents_);
			for (var i = 0; i < events.length; i++) {
				this.proxiedEvents_[events[i]].removeListener();
			}
			this.proxiedEvents_ = {};
		};

		EventEmitterProxy.prototype.setOriginEmitter = function setOriginEmitter(originEmitter) {
			var handles = this.proxiedEvents_;
			this.removeListeners_();
			this.originEmitter_ = originEmitter;

			var events = Object.keys(handles);
			for (var i = 0; i < events.length; i++) {
				this.proxiedEvents_[events[i]] = this.addListenerForEvent_(events[i]);
			}
		};

		EventEmitterProxy.prototype.shouldProxyEvent_ = function shouldProxyEvent_(event) {
			if (this.whitelist_ && !this.whitelist_[event]) {
				return false;
			}
			if (this.blacklist_[event]) {
				return false;
			}
			return !this.proxiedEvents_[event];
		};

		EventEmitterProxy.prototype.startProxy_ = function startProxy_() {
			this.targetEmitter_.on('newListener', this.proxyEvent.bind(this));
		};

		return EventEmitterProxy;
	}(_metal.Disposable);

	EventEmitterProxy.prototype.registerMetalComponent && EventEmitterProxy.prototype.registerMetalComponent(EventEmitterProxy, 'EventEmitterProxy')
	exports.default = EventEmitterProxy;
});
define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var EventHandler = function (_Disposable) {
		_inherits(EventHandler, _Disposable);

		function EventHandler() {
			_classCallCheck(this, EventHandler);

			var _this = _possibleConstructorReturn(this, _Disposable.call(this));

			/**
    * An array that holds the added event handles, so the listeners can be
    * removed later.
    * @type {Array.<EventHandle>}
    * @protected
    */
			_this.eventHandles_ = [];
			return _this;
		}

		/**
   * Adds event handles to be removed later through the `removeAllListeners`
   * method.
   * @param {...(!EventHandle)} var_args
   */


		EventHandler.prototype.add = function add() {
			for (var i = 0; i < arguments.length; i++) {
				this.eventHandles_.push(arguments[i]);
			}
		};

		EventHandler.prototype.disposeInternal = function disposeInternal() {
			this.eventHandles_ = null;
		};

		EventHandler.prototype.removeAllListeners = function removeAllListeners() {
			for (var i = 0; i < this.eventHandles_.length; i++) {
				this.eventHandles_[i].removeListener();
			}

			this.eventHandles_ = [];
		};

		return EventHandler;
	}(_metal.Disposable);

	EventHandler.prototype.registerMetalComponent && EventHandler.prototype.registerMetalComponent(EventHandler, 'EventHandler')
	exports.default = EventHandler;
});
define(['exports', './EventEmitter', './EventEmitterProxy', './EventHandle', './EventHandler'], function (exports, _EventEmitter, _EventEmitterProxy, _EventHandle, _EventHandler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EventHandler = exports.EventHandle = exports.EventEmitterProxy = exports.EventEmitter = undefined;

  var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

  var _EventEmitterProxy2 = _interopRequireDefault(_EventEmitterProxy);

  var _EventHandle2 = _interopRequireDefault(_EventHandle);

  var _EventHandler2 = _interopRequireDefault(_EventHandler);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _EventEmitter2.default;
  exports.EventEmitter = _EventEmitter2.default;
  exports.EventEmitterProxy = _EventEmitterProxy2.default;
  exports.EventHandle = _EventHandle2.default;
  exports.EventHandler = _EventHandler2.default;
});
define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var Geometry = function () {
		function Geometry() {
			_classCallCheck(this, Geometry);
		}

		Geometry.intersectRect = function intersectRect(x0, y0, x1, y1, x2, y2, x3, y3) {
			return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
		};

		return Geometry;
	}();

	exports.default = Geometry;
});
define(['exports', 'metal/src/metal', './Geometry'], function (exports, _metal, _Geometry) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _Geometry2 = _interopRequireDefault(_Geometry);

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

	var Position = function () {
		function Position() {
			_classCallCheck(this, Position);
		}

		Position.getClientHeight = function getClientHeight(node) {
			return this.getClientSize_(node, 'Height');
		};

		Position.getClientSize_ = function getClientSize_(node, prop) {
			var el = node;
			if (_metal2.default.isWindow(node)) {
				el = node.document.documentElement;
			}
			if (_metal2.default.isDocument(node)) {
				el = node.documentElement;
			}
			return el['client' + prop];
		};

		Position.getClientWidth = function getClientWidth(node) {
			return this.getClientSize_(node, 'Width');
		};

		Position.getDocumentRegion_ = function getDocumentRegion_(opt_element) {
			var height = this.getHeight(opt_element);
			var width = this.getWidth(opt_element);
			return this.makeRegion(height, height, 0, width, 0, width);
		};

		Position.getHeight = function getHeight(node) {
			return this.getSize_(node, 'Height');
		};

		Position.getOffsetLeft = function getOffsetLeft(node, opt_ignoreTransform) {
			return node.offsetLeft + (opt_ignoreTransform ? 0 : Position.getTranslation(node).left);
		};

		Position.getOffsetTop = function getOffsetTop(node, opt_ignoreTransform) {
			return node.offsetTop + (opt_ignoreTransform ? 0 : Position.getTranslation(node).top);
		};

		Position.getRegion = function getRegion(node, opt_includeScroll) {
			if (_metal2.default.isDocument(node) || _metal2.default.isWindow(node)) {
				return this.getDocumentRegion_(node);
			}
			return this.makeRegionFromBoundingRect_(node.getBoundingClientRect(), opt_includeScroll);
		};

		Position.getScrollLeft = function getScrollLeft(node) {
			if (_metal2.default.isWindow(node)) {
				return node.pageXOffset;
			}
			if (_metal2.default.isDocument(node)) {
				return node.defaultView.pageXOffset;
			}
			return node.scrollLeft;
		};

		Position.getScrollTop = function getScrollTop(node) {
			if (_metal2.default.isWindow(node)) {
				return node.pageYOffset;
			}
			if (_metal2.default.isDocument(node)) {
				return node.defaultView.pageYOffset;
			}
			return node.scrollTop;
		};

		Position.getSize_ = function getSize_(node, prop) {
			if (_metal2.default.isWindow(node)) {
				return this.getClientSize_(node, prop);
			}
			if (_metal2.default.isDocument(node)) {
				var docEl = node.documentElement;
				return Math.max(node.body['scroll' + prop], docEl['scroll' + prop], node.body['offset' + prop], docEl['offset' + prop], docEl['client' + prop]);
			}
			return Math.max(node['client' + prop], node['scroll' + prop], node['offset' + prop]);
		};

		Position.getTransformMatrixValues = function getTransformMatrixValues(node) {
			var style = getComputedStyle(node);
			var transform = style.msTransform || style.transform || style.webkitTransform || style.mozTransform;
			if (transform !== 'none') {
				var values = [];
				var regex = /([\d-\.\s]+)/g;
				var matches = regex.exec(transform);
				while (matches) {
					values.push(matches[1]);
					matches = regex.exec(transform);
				}
				return values;
			}
		};

		Position.getTranslation = function getTranslation(node) {
			var values = Position.getTransformMatrixValues(node);
			var translation = {
				left: 0,
				top: 0
			};
			if (values) {
				translation.left = parseFloat(values.length === 6 ? values[4] : values[13]);
				translation.top = parseFloat(values.length === 6 ? values[5] : values[14]);
			}
			return translation;
		};

		Position.getWidth = function getWidth(node) {
			return this.getSize_(node, 'Width');
		};

		Position.intersectRegion = function intersectRegion(r1, r2) {
			return _Geometry2.default.intersectRect(r1.top, r1.left, r1.bottom, r1.right, r2.top, r2.left, r2.bottom, r2.right);
		};

		Position.insideRegion = function insideRegion(r1, r2) {
			return r2.top >= r1.top && r2.bottom <= r1.bottom && r2.right <= r1.right && r2.left >= r1.left;
		};

		Position.insideViewport = function insideViewport(region) {
			return this.insideRegion(this.getRegion(window), region);
		};

		Position.intersection = function intersection(r1, r2) {
			if (!this.intersectRegion(r1, r2)) {
				return null;
			}
			var bottom = Math.min(r1.bottom, r2.bottom);
			var right = Math.min(r1.right, r2.right);
			var left = Math.max(r1.left, r2.left);
			var top = Math.max(r1.top, r2.top);
			return this.makeRegion(bottom, bottom - top, left, right, top, right - left);
		};

		Position.makeRegion = function makeRegion(bottom, height, left, right, top, width) {
			return {
				bottom: bottom,
				height: height,
				left: left,
				right: right,
				top: top,
				width: width
			};
		};

		Position.makeRegionFromBoundingRect_ = function makeRegionFromBoundingRect_(rect, opt_includeScroll) {
			var deltaX = opt_includeScroll ? Position.getScrollLeft(document) : 0;
			var deltaY = opt_includeScroll ? Position.getScrollTop(document) : 0;
			return this.makeRegion(rect.bottom + deltaY, rect.height, rect.left + deltaX, rect.right + deltaX, rect.top + deltaY, rect.width);
		};

		Position.pointInsideRegion = function pointInsideRegion(x, y, region) {
			return Position.insideRegion(region, Position.makeRegion(y, 0, x, x, y, 0));
		};

		return Position;
	}();

	exports.default = Position;
});
define(['exports', './Position'], function (exports, _Position) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Position2 = _interopRequireDefault(_Position);

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

	var Align = function () {
		function Align() {
			_classCallCheck(this, Align);
		}

		Align.align = function align(element, alignElement, position) {
			var suggestion = this.suggestAlignBestRegion(element, alignElement, position);
			var bestRegion = suggestion.region;

			var computedStyle = window.getComputedStyle(element, null);
			if (computedStyle.getPropertyValue('position') !== 'fixed') {
				bestRegion.top += window.pageYOffset;
				bestRegion.left += window.pageXOffset;

				var offsetParent = element;
				while (offsetParent = offsetParent.offsetParent) {
					bestRegion.top -= _Position2.default.getOffsetTop(offsetParent);
					bestRegion.left -= _Position2.default.getOffsetLeft(offsetParent);
				}
			}

			element.style.top = bestRegion.top + 'px';
			element.style.left = bestRegion.left + 'px';
			return suggestion.position;
		};

		Align.getAlignBestRegion = function getAlignBestRegion(element, alignElement, position) {
			return Align.suggestAlignBestRegion(element, alignElement, position).region;
		};

		Align.getAlignRegion = function getAlignRegion(element, alignElement, position) {
			var r1 = _Position2.default.getRegion(alignElement);
			var r2 = _Position2.default.getRegion(element);
			var top = 0;
			var left = 0;

			switch (position) {
				case Align.TopCenter:
					top = r1.top - r2.height;
					left = r1.left + r1.width / 2 - r2.width / 2;
					break;
				case Align.RightCenter:
					top = r1.top + r1.height / 2 - r2.height / 2;
					left = r1.left + r1.width;
					break;
				case Align.BottomCenter:
					top = r1.bottom;
					left = r1.left + r1.width / 2 - r2.width / 2;
					break;
				case Align.LeftCenter:
					top = r1.top + r1.height / 2 - r2.height / 2;
					left = r1.left - r2.width;
					break;
				case Align.TopRight:
					top = r1.top - r2.height;
					left = r1.right - r2.width;
					break;
				case Align.BottomRight:
					top = r1.bottom;
					left = r1.right - r2.width;
					break;
				case Align.BottomLeft:
					top = r1.bottom;
					left = r1.left;
					break;
				case Align.TopLeft:
					top = r1.top - r2.height;
					left = r1.left;
					break;
			}

			return {
				bottom: top + r2.height,
				height: r2.height,
				left: left,
				right: left + r2.width,
				top: top,
				width: r2.width
			};
		};

		Align.isValidPosition = function isValidPosition(val) {
			return 0 <= val && val <= 8;
		};

		Align.suggestAlignBestRegion = function suggestAlignBestRegion(element, alignElement, position) {
			var bestArea = 0;
			var bestPosition = position;
			var bestRegion = this.getAlignRegion(element, alignElement, bestPosition);
			var tryPosition = bestPosition;
			var tryRegion = bestRegion;
			var viewportRegion = _Position2.default.getRegion(window);

			for (var i = 0; i < 8;) {
				if (_Position2.default.intersectRegion(viewportRegion, tryRegion)) {
					var visibleRegion = _Position2.default.intersection(viewportRegion, tryRegion);
					var area = visibleRegion.width * visibleRegion.height;
					if (area > bestArea) {
						bestArea = area;
						bestRegion = tryRegion;
						bestPosition = tryPosition;
					}
					if (_Position2.default.insideViewport(tryRegion)) {
						break;
					}
				}
				tryPosition = (position + ++i) % 8;
				tryRegion = this.getAlignRegion(element, alignElement, tryPosition);
			}

			return {
				position: bestPosition,
				region: bestRegion
			};
		};

		return Align;
	}();

	/**
  * Constants that represent the supported positions for `Align`.
  * @type {number}
  * @static
  */

	Align.TopCenter = 0;
	Align.TopRight = 1;
	Align.RightCenter = 2;
	Align.BottomRight = 3;
	Align.BottomCenter = 4;
	Align.BottomLeft = 5;
	Align.LeftCenter = 6;
	Align.TopLeft = 7;

	/**
  * Aliases for position constants.
  * @type {number}
  * @static
  */
	Align.Top = Align.TopCenter;
	Align.Right = Align.RightCenter;
	Align.Bottom = Align.BottomCenter;
	Align.Left = Align.LeftCenter;

	exports.default = Align;
});
define(['exports', '../Align', '../Geometry', '../Position'], function (exports, _Align, _Geometry, _Position) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Position = exports.Geometry = exports.Align = undefined;

  var _Align2 = _interopRequireDefault(_Align);

  var _Geometry2 = _interopRequireDefault(_Geometry);

  var _Position2 = _interopRequireDefault(_Position);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Position2.default;
  exports.Align = _Align2.default;
  exports.Geometry = _Geometry2.default;
  exports.Position = _Position2.default;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metalNamed.dom.dom;
	var DomEventEmitterProxy = this.metalNamed.dom.DomEventEmitterProxy;
	var Attribute = this.metal.Attribute;
	var EventEmitter = this.metal.events;
	var Position = this.metal.position;

	/**
  * Affix utility.
  */

	var Affix = function (_Attribute) {
		babelHelpers.inherits(Affix, _Attribute);

		/**
   * @inheritDoc
   */

		function Affix(opt_config) {
			babelHelpers.classCallCheck(this, Affix);

			var _this = babelHelpers.possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			if (!Affix.emitter_) {
				Affix.emitter_ = new EventEmitter();
				Affix.proxy_ = new DomEventEmitterProxy(document, Affix.emitter_, null, {
					scroll: true
				});
			}

			/**
    * Holds the last position.
    * @type {Position.Bottom|Position.Default|Position.Top}
    * @private
    */
			_this.lastPosition_ = null;

			/**
    * Holds event handle that listens scroll shared event emitter proxy.
    * @type {EventHandle}
    * @protected
    */
			_this.scrollHandle_ = Affix.emitter_.on('scroll', _this.checkPosition.bind(_this));

			_this.on('elementChanged', _this.checkPosition);
			_this.on('offsetTopChanged', _this.checkPosition);
			_this.on('offsetBottomChanged', _this.checkPosition);
			_this.checkPosition();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Affix.prototype.disposeInternal = function disposeInternal() {
			dom.removeClasses(this.element, Affix.Position.Bottom + ' ' + Affix.Position.Default + ' ' + Affix.Position.Top);
			this.scrollHandle_.dispose();
			_Attribute.prototype.disposeInternal.call(this);
		};

		/**
   * Synchronize bottom, top and element regions and checks if position has
   * changed. If position has changed syncs position.
   */


		Affix.prototype.checkPosition = function checkPosition() {
			if (this.intersectTopRegion()) {
				this.syncPosition(Affix.Position.Top);
			} else if (this.intersectBottomRegion()) {
				this.syncPosition(Affix.Position.Bottom);
			} else {
				this.syncPosition(Affix.Position.Default);
			}
		};

		/**
   * Whether the element is intersecting with bottom region defined by
   * offsetBottom.
   * @return {boolean}
   */


		Affix.prototype.intersectBottomRegion = function intersectBottomRegion() {
			if (!core.isDef(this.offsetBottom)) {
				return false;
			}
			var clientHeight = Position.getHeight(this.scrollElement);
			var scrollElementClientHeight = Position.getClientHeight(this.scrollElement);
			return Position.getScrollTop(this.scrollElement) + scrollElementClientHeight >= clientHeight - this.offsetBottom;
		};

		/**
   * Whether the element is intersecting with top region defined by
   * offsetTop.
   * @return {boolean}
   */


		Affix.prototype.intersectTopRegion = function intersectTopRegion() {
			if (!core.isDef(this.offsetTop)) {
				return false;
			}
			return Position.getScrollTop(this.scrollElement) <= this.offsetTop;
		};

		/**
   * Synchronizes element css classes to match with the specified position.
   * @param {Position.Bottom|Position.Default|Position.Top} position
   */


		Affix.prototype.syncPosition = function syncPosition(position) {
			if (this.lastPosition_ !== position) {
				dom.addClasses(this.element, position);
				dom.removeClasses(this.element, this.lastPosition_);
				this.lastPosition_ = position;
			}
		};

		return Affix;
	}(Attribute);

	/**
  * Holds positions enum.
  * @enum {string}
  */


	Affix.prototype.registerMetalComponent && Affix.prototype.registerMetalComponent(Affix, 'Affix')
	Affix.Position = {
		Top: 'affix-top',
		Bottom: 'affix-bottom',
		Default: 'affix'
	};

	Affix.ATTRS = {
		/**
   * The scrollElement element to be used as scrollElement area for affix. The scrollElement is
   * where the scroll event is listened from.
   * @type {Element|Window}
   */
		scrollElement: {
			setter: dom.toElement,
			value: document
		},

		/**
   * Defines the offset bottom that triggers affix.
   * @type {number}
   */
		offsetTop: {
			validator: core.isNumber
		},

		/**
   * Defines the offset top that triggers affix.
   * @type {number}
   */
		offsetBottom: {
			validator: core.isNumber
		},

		/**
   * Element to be used as alignment reference of affix.
   * @type {Element}
   */
		element: {
			setter: dom.toElement
		}
	};

	this.metal.Affix = Affix;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
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
  Templates.Alert.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="alert alert-dismissible component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="alert">' + (opt_data.spinner ? '<span class="alert-spinner' + soy.$$escapeHtmlAttribute(opt_data.spinnerClasses ? ' ' + opt_data.spinnerClasses : '') + '"></span>' : '') + '<span class="alert-body">' + (opt_data.body ? soy.$$escapeHtml(opt_data.body) : '') + '</span>' + (opt_data.dismissible ? '<button type="button" class="close" aria-label="Close" data-onclick="toggle"><span aria-hidden="true">×</span></button>' : '') + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Alert.render.soyTemplateName = 'Templates.Alert.render';
  }

  Templates.Alert.render.params = ["body", "dismissible", "id", "spinner", "spinnerClasses"];

  var Alert = function (_Component) {
    _inherits(Alert, _Component);

    function Alert() {
      _classCallCheck(this, Alert);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Alert;
  }(_component2.default);

  Alert.prototype.registerMetalComponent && Alert.prototype.registerMetalComponent(Alert, 'Alert')

  Alert.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Alert');
  exports.default = Alert;
});
define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom'], function (exports, _metal, _dom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

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

	var Anim = function () {
		function Anim() {
			_classCallCheck(this, Anim);
		}

		Anim.emulateEnd = function emulateEnd(element, opt_durationMs) {
			if (this.getComputedDurationMs(element, 'animation') > this.getComputedDurationMs(element, 'transition')) {
				return this.emulateEnd_(element, 'animation', opt_durationMs);
			} else {
				return this.emulateEnd_(element, 'transition', opt_durationMs);
			}
		};

		Anim.emulateAnimationEnd = function emulateAnimationEnd(element, opt_durationMs) {
			return this.emulateEnd_(element, 'animation', opt_durationMs);
		};

		Anim.emulateTransitionEnd = function emulateTransitionEnd(element, opt_durationMs) {
			this.emulateEnd_(element, 'transition', opt_durationMs);
		};

		Anim.emulateEnd_ = function emulateEnd_(element, type, opt_durationMs) {
			var duration = opt_durationMs;
			if (!_metal2.default.isDef(opt_durationMs)) {
				duration = this.getComputedDurationMs(element, type);
			}

			var delayed = setTimeout(function () {
				_dom.dom.triggerEvent(element, _dom.features.checkAnimationEventName()[type]);
			}, duration);

			var abort = function abort() {
				clearTimeout(delayed);
				hoistedEvtHandler.removeListener();
			};
			var hoistedEvtHandler = _dom.dom.once(element, type + 'end', abort);

			return {
				abort: abort
			};
		};

		Anim.getComputedDurationMs = function getComputedDurationMs(element, type) {
			return (parseFloat(window.getComputedStyle(element, null).getPropertyValue(type + '-duration')) || 0) * 1000;
		};

		return Anim;
	}();

	exports.default = Anim;
});
'use strict';

(function () {
	var core = this.metalNamed.metal.core;
	var dom = this.metal.dom;
	var AlertBase = this.metal.Alert;
	var Anim = this.metal.Anim;
	var EventHandler = this.metalNamed.events.EventHandler;

	/**
  * Alert component.
  */

	var Alert = function (_AlertBase) {
		babelHelpers.inherits(Alert, _AlertBase);

		function Alert(opt_config) {
			babelHelpers.classCallCheck(this, Alert);

			var _this = babelHelpers.possibleConstructorReturn(this, _AlertBase.call(this, opt_config));

			_this.eventHandler_ = new EventHandler();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Alert.prototype.detached = function detached() {
			_AlertBase.prototype.detached.call(this);
			this.eventHandler_.removeAllListeners();
			clearTimeout(this.delay_);
		};

		/**
   * Closes the alert, disposing it once the animation ends.
   */


		Alert.prototype.close = function close() {
			dom.once(this.element, 'animationend', this.dispose.bind(this));
			dom.once(this.element, 'transitionend', this.dispose.bind(this));
			this.eventHandler_.removeAllListeners();
			this.syncVisible(false);
		};

		/**
   * Handles document click in order to close the alert.
   * @param {!Event} event
   * @protected
   */


		Alert.prototype.handleDocClick_ = function handleDocClick_(event) {
			if (!this.element.contains(event.target)) {
				this.hide();
			}
		};

		/**
   * Hide the alert.
   */


		Alert.prototype.hide = function hide() {
			this.visible = false;
		};

		/**
   * Toggles the visibility of the alert.
   */


		Alert.prototype.toggle = function toggle() {
			this.visible = !this.visible;
		};

		/**
   * Synchronization logic for `dismissible` attribute.
   * @param {boolean} dismissible
   */


		Alert.prototype.syncDismissible = function syncDismissible(dismissible) {
			if (dismissible) {
				this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
			} else {
				this.eventHandler_.removeAllListeners();
			}

			dom[dismissible ? 'addClasses' : 'removeClasses'](this.element, 'alert-dismissible');
		};

		/**
   * Synchronization logic for `visible` attribute.
   * @param {boolean} visible
   */


		Alert.prototype.syncVisible = function syncVisible(visible) {
			dom.removeClasses(this.element, this.animClasses[visible ? 'hide' : 'show']);
			dom.addClasses(this.element, this.animClasses[visible ? 'show' : 'hide']);
			// Some browsers do not fire transitionend events when running in background
			// tab, see https://bugzilla.mozilla.org/show_bug.cgi?id=683696.
			Anim.emulateEnd(this.element);

			if (visible && core.isNumber(this.hideDelay)) {
				this.syncHideDelay(this.hideDelay);
			}
		};

		/**
   * Synchronization logic for `hideDelay` attribute.
   * @param {?number} hideDelay
   */


		Alert.prototype.syncHideDelay = function syncHideDelay(hideDelay) {
			if (core.isNumber(hideDelay) && this.visible) {
				clearTimeout(this.delay_);
				this.delay_ = setTimeout(this.hide.bind(this), hideDelay);
			}
		};

		/**
   * Synchronization logic for `spinnerDone` attribute.
   * @param {boolean} spinnerDone
   */


		Alert.prototype.syncSpinnerDone = function syncSpinnerDone(spinnerDone) {
			if (this.spinner) {
				var spinnerElement = this.element.querySelector('.alert-spinner');
				dom.removeClasses(spinnerElement, 'alert-spinner-done');
				if (spinnerDone) {
					dom.addClasses(spinnerElement, 'alert-spinner-done');
				}
			}
		};

		return Alert;
	}(AlertBase);

	/**
  * Default alert elementClasses.
  * @default alert
  * @type {string}
  * @static
  */


	Alert.prototype.registerMetalComponent && Alert.prototype.registerMetalComponent(Alert, 'Alert')
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
   * Spinner indicating.
   * @type {boolean}
   * @default false
   */
		spinner: {
			value: false
		},

		/**
   * The CSS classes that should be added to the spinner.
   * @type {string}
   */
		spinnerClasses: {},

		/**
   * Spinner is marked as done.
   * @type {boolean}
   * @default false
   */
		spinnerDone: {
			value: false
		},

		/**
   * Flag indicating if the alert is visible or not.
   * @type {boolean}
   * @default false
   */
		visible: {
			value: false
		}
	};

	this.metal.Alert = Alert;
}).call(this);
define(['exports'], function (exports) {
	'use strict';

	/**
   * Debounces function execution.
   * @param {!function()} fn
   * @param {number} delay
   * @return {!function()}
   */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function debounce(fn, delay) {
		var id;
		return function () {
			var args = arguments;
			clearTimeout(id);
			id = setTimeout(function () {
				fn.apply(null, args);
			}, delay);
		};
	}

	exports.default = debounce;
});
define(['exports', 'metal/src/metal'], function (exports, _metal) {
  /*!
   * Promises polyfill from Google's Closure Library.
   *
   *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
   *
   * NOTE(eduardo): Promise support is not ready on all supported browsers,
   * therefore core.js is temporarily using Google's promises as polyfill. It
   * supports cancellable promises and has clean and fast implementation.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CancellablePromise = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see CancellablePromise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */
  var Thenable = function Thenable() {};

  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
   *     result of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  Thenable.prototype.then = function () {};

  /**
   * An expando property to indicate that an object implements
   * {@code Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  Thenable.addImplementation = function (ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };

  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  Thenable.isImplementedBy = function (object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };

  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  var partial = function partial(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };

  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  var CancellablePromise = function CancellablePromise(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {CancellablePromise.State_}
     */
    this.state_ = CancellablePromise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {CancellablePromise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<CancellablePromise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(opt_context, function (value) {
        self.resolve_(CancellablePromise.State_.FULFILLED, value);
      }, function (reason) {
        self.resolve_(CancellablePromise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(CancellablePromise.State_.REJECTED, e);
    }
  };

  /**
   * The delay in milliseconds before a rejected Promise's reason is passed to
   * the rejection handler. By default, the rejection handler rethrows the
   * rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   * @type {number}
   */
  CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  CancellablePromise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };

  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: CancellablePromise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  CancellablePromise.CallbackEntry_ = null;

  /**
   * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  CancellablePromise.resolve = function (opt_value) {
    return new CancellablePromise(function (resolve) {
      resolve(opt_value);
    });
  };

  /**
   * @param {*=} opt_reason
   * @return {!CancellablePromise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  CancellablePromise.reject = function (opt_reason) {
    return new CancellablePromise(function (resolve, reject) {
      reject(opt_reason);
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  CancellablePromise.race = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      if (!promises.length) {
        resolve(undefined);
      }
      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(resolve, reject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  CancellablePromise.all = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toFulfill = promises.length;
      var values = [];

      if (!toFulfill) {
        resolve(values);
        return;
      }

      var onFulfill = function onFulfill(index, value) {
        toFulfill--;
        values[index] = value;
        if (toFulfill === 0) {
          resolve(values);
        }
      };

      var onReject = function onReject(reason) {
        reject(reason);
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(partial(onFulfill, i), onReject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
   *     the first input to be fulfilled, or is rejected with a list of every
   *     rejection reason if all inputs are rejected.
   * @template TYPE
   */
  CancellablePromise.firstFulfilled = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toReject = promises.length;
      var reasons = [];

      if (!toReject) {
        resolve(undefined);
        return;
      }

      var onFulfill = function onFulfill(value) {
        resolve(value);
      };

      var onReject = function onReject(index, reason) {
        toReject--;
        reasons[index] = reason;
        if (toReject === 0) {
          reject(reasons);
        }
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(onFulfill, partial(onReject, i));
      }
    });
  };

  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
    return this.addChildPromise_(_metal.core.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, _metal.core.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
  };
  Thenable.addImplementation(CancellablePromise);

  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
    var callback = function callback() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        CancellablePromise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };

  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };

  /**
   * Alias of {@link CancellablePromise.prototype.thenCatch}
   */
  CancellablePromise.prototype.catch = CancellablePromise.prototype.thenCatch;

  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  CancellablePromise.prototype.cancel = function (opt_message) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      _metal.async.run(function () {
        var err = new CancellablePromise.CancellationError(opt_message);
        err.IS_CANCELLATION_ERROR = true;
        this.cancelInternal_(err);
      }, this);
    }
  };

  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  CancellablePromise.prototype.cancelInternal_ = function (err) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!CancellablePromise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };

  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!CancellablePromise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new CancellablePromise(function (resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function (value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function (reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!_metal.core.isDef(result) && reason.IS_CANCELLATION_ERROR) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
    /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
    return callbackEntry.child;
  };

  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.FULFILLED, value);
  };

  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  CancellablePromise.prototype.unblockAndReject_ = function (reason) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.REJECTED, reason);
  };

  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {CancellablePromise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  CancellablePromise.prototype.resolve_ = function (state, x) {
    if (this.state_ !== CancellablePromise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = CancellablePromise.State_.REJECTED;
      x = new TypeError('CancellablePromise cannot resolve to itself');
    } else if (Thenable.isImplementedBy(x)) {
      x = /** @type {!Thenable} */x;
      this.state_ = CancellablePromise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else if (_metal.core.isObject(x)) {
      try {
        var then = x.then;
        if (_metal.core.isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = CancellablePromise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === CancellablePromise.State_.REJECTED && !x.IS_CANCELLATION_ERROR) {
      CancellablePromise.addUnhandledRejection_(this, x);
    }
  };

  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  CancellablePromise.prototype.tryThen_ = function (thenable, then) {
    this.state_ = CancellablePromise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function resolve(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function reject(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  CancellablePromise.prototype.scheduleCallbacks_ = function () {
    if (!this.executing_) {
      this.executing_ = true;
      _metal.async.run(this.executeCallbacks_, this);
    }
  };

  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  CancellablePromise.prototype.executeCallbacks_ = function () {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };

  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {CancellablePromise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
    if (state === CancellablePromise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };

  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  CancellablePromise.prototype.removeUnhandledRejection_ = function () {
    var p;
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };

  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!CancellablePromise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function () {
        CancellablePromise.handleRejection_.call(null, reason);
      }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      _metal.async.run(function () {
        if (promise.hadUnhandledRejection_) {
          CancellablePromise.handleRejection_.call(null, reason);
        }
      });
    }
  };

  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  CancellablePromise.handleRejection_ = _metal.async.throwException;

  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code async.throwException}.
   */
  CancellablePromise.setUnhandledRejectionHandler = function (handler) {
    CancellablePromise.handleRejection_ = handler;
  };

  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {Error}
   * @final
   */
  CancellablePromise.CancellationError = function (_Error) {
    _inherits(_class, _Error);

    function _class(opt_message) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, _Error.call(this, opt_message));

      if (opt_message) {
        _this.message = opt_message;
      }
      return _this;
    }

    return _class;
  }(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  exports.CancellablePromise = CancellablePromise;
  exports.default = CancellablePromise;
});
define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ComponentRegistry = function () {
		function ComponentRegistry() {
			_classCallCheck(this, ComponentRegistry);
		}

		ComponentRegistry.getConstructor = function getConstructor(name) {
			var constructorFn = ComponentRegistry.components_[name];
			if (!constructorFn) {
				console.error('There\'s no constructor registered for the component ' + 'named ' + name + '. Components need to be registered via ' + 'ComponentRegistry.register.');
			}
			return constructorFn;
		};

		ComponentRegistry.register = function register(constructorFn, opt_name) {
			var name = opt_name;
			if (!name) {
				if (constructorFn.hasOwnProperty('NAME')) {
					name = constructorFn.NAME;
				} else {
					name = _metal.core.getFunctionName(constructorFn);
				}
			}
			constructorFn.NAME = name;
			ComponentRegistry.components_[name] = constructorFn;
		};

		return ComponentRegistry;
	}();

	/**
  * Holds all registered components, indexed by their names.
  * @type {!Object<string, function()>}
  * @protected
  * @static
  */
	ComponentRegistry.components_ = {};

	exports.default = ComponentRegistry;
});
define(['exports', './ComponentRegistry', 'metal/src/metal'], function (exports, _ComponentRegistry, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var ComponentCollector = function (_Disposable) {
		_inherits(ComponentCollector, _Disposable);

		function ComponentCollector() {
			_classCallCheck(this, ComponentCollector);

			return _possibleConstructorReturn(this, _Disposable.apply(this, arguments));
		}

		ComponentCollector.prototype.addComponent = function addComponent(component) {
			ComponentCollector.components[component.id] = component;
		};

		ComponentCollector.prototype.createComponent = function createComponent(componentName, opt_data) {
			var component = ComponentCollector.components[(opt_data || {}).id];
			if (!component) {
				var ConstructorFn = _ComponentRegistry2.default.getConstructor(componentName);
				component = new ConstructorFn(opt_data);
			}
			return component;
		};

		ComponentCollector.prototype.removeComponent = function removeComponent(component) {
			delete ComponentCollector.components[component.id];
		};

		ComponentCollector.prototype.updateComponent = function updateComponent(id, opt_data) {
			var component = ComponentCollector.components[id];
			if (component && opt_data) {
				component.setAttrs(opt_data);
			}
			return component;
		};

		return ComponentCollector;
	}(_metal.Disposable);

	ComponentCollector.prototype.registerMetalComponent && ComponentCollector.prototype.registerMetalComponent(ComponentCollector, 'ComponentCollector')


	/**
  * Holds all collected components, indexed by their id.
  * @type {!Object<string, !Component>}
  */
	ComponentCollector.components = {};

	exports.default = ComponentCollector;
});
define(['exports', 'metal-events/src/events'], function (exports, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var ComponentRenderer = function (_EventEmitter) {
		_inherits(ComponentRenderer, _EventEmitter);

		/**
   * Constructor function for `ComponentRenderer`.
   * @param {!Component} component The component that this renderer is
   *     responsible for.
   */

		function ComponentRenderer(component) {
			_classCallCheck(this, ComponentRenderer);

			var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

			_this.component_ = component;
			_this.componentRendererEvents_ = new _events.EventHandler();
			_this.componentRendererEvents_.add(_this.component_.on('attrsChanged', _this.handleComponentRendererAttrsChanged_.bind(_this)), _this.component_.once('render', _this.render.bind(_this)));
			return _this;
		}

		/**
   * Builds and returns the component's main element, without any content. This
   * is used by Component when building the element attribute from scratch,
   * which can happen before the first render, whenever the attribute is first
   * accessed.
   * Subclasses should override this to customize the creation of the default
   * component element.
   * @return {!Element}
   */


		ComponentRenderer.prototype.buildElement = function buildElement() {
			return document.createElement('div');
		};

		ComponentRenderer.prototype.disposeInternal = function disposeInternal() {
			this.componentRendererEvents_.removeAllListeners();
			this.componentRendererEvents_ = null;
		};

		ComponentRenderer.prototype.handleComponentRendererAttrsChanged_ = function handleComponentRendererAttrsChanged_(changes) {
			if (this.component_.wasRendered) {
				this.update(changes);
			}
		};

		ComponentRenderer.prototype.render = function render() {};

		ComponentRenderer.prototype.update = function update() {};

		return ComponentRenderer;
	}(_events.EventEmitter);

	ComponentRenderer.prototype.registerMetalComponent && ComponentRenderer.prototype.registerMetalComponent(ComponentRenderer, 'ComponentRenderer')
	exports.default = ComponentRenderer;
});
define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-attribute/src/Attribute', './ComponentCollector', './ComponentRegistry', './ComponentRenderer', 'metal-events/src/events'], function (exports, _metal, _dom, _Attribute2, _ComponentCollector, _ComponentRegistry, _ComponentRenderer, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Attribute3 = _interopRequireDefault(_Attribute2);

	var _ComponentCollector2 = _interopRequireDefault(_ComponentCollector);

	var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

	var _ComponentRenderer2 = _interopRequireDefault(_ComponentRenderer);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var Component = function (_Attribute) {
		_inherits(Component, _Attribute);

		function Component(opt_config) {
			_classCallCheck(this, Component);

			var _this = _possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			/**
    * Gets all nested components.
    * @type {!Array<!Component>}
    */
			_this.components = {};

			/**
    * Whether the element is being decorated.
    * @type {boolean}
    * @protected
    */
			_this.decorating_ = false;

			/**
    * Holds events that were listened through the `delegate` Component function.
    * @type {EventHandler}
    * @protected
    */
			_this.delegateEventHandler_ = null;

			/**
    * Instance of `DomEventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {DomEventEmitterProxy}
    * @protected
    */
			_this.elementEventProxy_ = null;

			/**
    * The `EventHandler` instance for events attached from the `events` attribute.
    * @type {!EventHandler}
    * @protected
    */
			_this.eventsAttrHandler_ = new _events.EventHandler();

			/**
    * Whether the element is in document.
    * @type {boolean}
    */
			_this.inDocument = false;

			/**
    * The initial config option passed to this constructor.
    * @type {!Object}
    * @protected
    */
			_this.initialConfig_ = opt_config || {};

			/**
    * Whether the element was rendered.
    * @type {boolean}
    */
			_this.wasRendered = false;

			/**
    * The component's element will be appended to the element this variable is
    * set to, unless the user specifies another parent when calling `render` or
    * `attach`.
    * @type {!Element}
    */
			_this.DEFAULT_ELEMENT_PARENT = document.body;

			_metal.core.mergeSuperClassesProperty(_this.constructor, 'ELEMENT_CLASSES', _this.mergeElementClasses_);
			_metal.core.mergeSuperClassesProperty(_this.constructor, 'ELEMENT_TAG_NAME', _metal.array.firstDefinedValue);
			_metal.core.mergeSuperClassesProperty(_this.constructor, 'RENDERER', _metal.array.firstDefinedValue);

			_this.renderer_ = new _this.constructor.RENDERER_MERGED(_this);
			_this.delegateEventHandler_ = new _events.EventHandler();

			_this.created_();
			return _this;
		}

		/**
   * Adds the listeners specified in the given object.
   * @param {Object} events
   * @protected
   */


		Component.prototype.addListenersFromObj_ = function addListenersFromObj_(events) {
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
		};

		Component.prototype.addSingleListener_ = function addSingleListener_(event, listener, opt_default, opt_origin) {
			if (!this.elementEventProxy_ && _dom.dom.supportsEvent(this.constructor.ELEMENT_TAG_NAME_MERGED, event)) {
				this.elementEventProxy_ = new _dom.DomEventEmitterProxy(this.element, this);
			}
			_Attribute.prototype.addSingleListener_.call(this, event, listener, opt_default, opt_origin);
		};

		Component.prototype.attach = function attach(opt_parentElement, opt_siblingElement) {
			if (!this.inDocument) {
				this.renderElement_(opt_parentElement, opt_siblingElement);
				this.inDocument = true;
				this.emit('attached');
				this.attached();
			}
			return this;
		};

		Component.prototype.attached = function attached() {};

		Component.prototype.created_ = function created_() {
			this.on('eventsChanged', this.onEventsChanged_);
			this.addListenersFromObj_(this.events);

			this.on('attrsChanged', this.handleAttributesChanges_);
			Component.componentsCollector.addComponent(this);
		};

		Component.prototype.addSubComponent = function addSubComponent(componentName, opt_componentData) {
			// Avoid accessing id from component if possible, since that may cause
			// the lookup of the component's element in the dom unnecessarily, which is
			// bad for performance.
			var id = (opt_componentData || {}).id;
			var component = Component.componentsCollector.createComponent(componentName, opt_componentData);
			this.components[id || component.id] = component;
			return component;
		};

		Component.prototype.decorate = function decorate() {
			this.decorating_ = true;
			this.render();
			this.decorating_ = false;
			return this;
		};

		Component.prototype.delegate = function delegate(eventName, selector, callback) {
			var handle = _dom.dom.delegate(this.element, eventName, selector, callback);
			this.delegateEventHandler_.add(handle);
			return handle;
		};

		Component.prototype.detach = function detach() {
			if (this.inDocument) {
				if (this.element.parentNode) {
					this.element.parentNode.removeChild(this.element);
				}
				this.inDocument = false;
				this.detached();
			}
			this.emit('detached');
			return this;
		};

		Component.prototype.detached = function detached() {};

		Component.prototype.disposeInternal = function disposeInternal() {
			this.detach();

			if (this.elementEventProxy_) {
				this.elementEventProxy_.dispose();
				this.elementEventProxy_ = null;
			}

			this.delegateEventHandler_.removeAllListeners();
			this.delegateEventHandler_ = null;

			this.disposeSubComponents(Object.keys(this.components));
			this.components = null;

			this.renderer_.dispose();
			this.renderer_ = null;

			_Attribute.prototype.disposeInternal.call(this);
		};

		Component.prototype.disposeSubComponents = function disposeSubComponents(ids) {
			for (var i = 0; i < ids.length; i++) {
				var component = this.components[ids[i]];
				if (!component.isDisposed()) {
					Component.componentsCollector.removeComponent(component);
					component.dispose();
					delete this.components[ids[i]];
				}
			}
		};

		Component.prototype.extractListenerInfo_ = function extractListenerInfo_(value) {
			var info = {
				fn: value
			};
			if (_metal.core.isObject(value) && !_metal.core.isFunction(value)) {
				info.selector = value.selector;
				info.fn = value.fn;
			}
			if (_metal.core.isString(info.fn)) {
				info.fn = this.getListenerFn(info.fn);
			}
			return info;
		};

		Component.prototype.getInitialConfig = function getInitialConfig() {
			return this.initialConfig_;
		};

		Component.prototype.getListenerFn = function getListenerFn(fnName) {
			var fnComponent;
			var split = fnName.split(':');
			if (split.length === 2) {
				fnName = split[1];
				fnComponent = _ComponentCollector2.default.components[split[0]];
				if (!fnComponent) {
					console.error('No component with the id "' + split[0] + '" has been collected' + 'yet. Make sure that you specify an id for an existing component when ' + 'adding inline listeners.');
				}
			}
			fnComponent = fnComponent || this;
			if (_metal.core.isFunction(fnComponent[fnName])) {
				return fnComponent[fnName].bind(fnComponent);
			} else {
				console.error('No function named "' + fnName + '" was found in the component with id "' + fnComponent.id + '". Make sure that you specify valid function names when adding ' + 'inline listeners.');
			}
		};

		Component.prototype.findElementById = function findElementById(id) {
			return document.getElementById(id) || this.element && this.element.querySelector('#' + id);
		};

		Component.prototype.fireAttrChange_ = function fireAttrChange_(attr, opt_change) {
			var fn = this['sync' + attr.charAt(0).toUpperCase() + attr.slice(1)];
			if (_metal.core.isFunction(fn)) {
				if (!opt_change) {
					opt_change = {
						newVal: this[attr],
						prevVal: undefined
					};
				}
				fn.call(this, opt_change.newVal, opt_change.prevVal);
			}
		};

		Component.prototype.getComponentsWithPrefix = function getComponentsWithPrefix(prefix) {
			var _this2 = this;

			var ids = Object.keys(this.components).filter(function (id) {
				return id.indexOf(prefix) === 0;
			});
			var map = {};
			ids.forEach(function (id) {
				return map[id] = _this2.components[id];
			});
			return map;
		};

		Component.prototype.getName = function getName() {
			return this.constructor.NAME || _metal.core.getFunctionName(this.constructor);
		};

		Component.prototype.getRenderer = function getRenderer() {
			return this.renderer_;
		};

		Component.prototype.handleAttributesChanges_ = function handleAttributesChanges_(event) {
			this.syncAttrsFromChanges_(event.changes);
			this.emit('attrsSynced', event);
		};

		Component.prototype.makeId_ = function makeId_() {
			return 'metal_c_' + _metal.core.getUid(this);
		};

		Component.prototype.mergeElementClasses_ = function mergeElementClasses_(values) {
			var marked = {};
			return values.filter(function (val) {
				if (!val || marked[val]) {
					return false;
				} else {
					marked[val] = true;
					return true;
				}
			}).join(' ');
		};

		Component.prototype.onEventsChanged_ = function onEventsChanged_(event) {
			this.eventsAttrHandler_.removeAllListeners();
			this.addListenersFromObj_(event.newVal);
		};

		Component.prototype.registerMetalComponent = function registerMetalComponent(constructorFn, opt_name) {
			_ComponentRegistry2.default.register(constructorFn, opt_name);
		};

		Component.prototype.render = function render(opt_parentElement, opt_siblingElement) {
			if (this.wasRendered) {
				throw new Error(Component.Error.ALREADY_RENDERED);
			}

			this.emit('render', {
				decorating: this.decorating_
			});
			this.syncAttrs_();
			if (opt_parentElement !== false) {
				this.attach(opt_parentElement, opt_siblingElement);
			}
			this.wasRendered = true;
			return this;
		};

		Component.prototype.renderAsSubComponent = function renderAsSubComponent() {
			this.syncAttrs_();
			this.attach();
			this.wasRendered = true;
		};

		Component.prototype.renderElement_ = function renderElement_(opt_parentElement, opt_siblingElement) {
			var element = this.element;
			element.id = this.id;
			if (opt_siblingElement || !element.parentNode) {
				var parent = _dom.dom.toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
				parent.insertBefore(element, _dom.dom.toElement(opt_siblingElement));
			}
		};

		Component.prototype.setterElementFn_ = function setterElementFn_(val) {
			var element = _dom.dom.toElement(val);
			if (!element) {
				element = this.valueElementFn_();
			}
			return element;
		};

		Component.prototype.syncAttrs_ = function syncAttrs_() {
			var attrNames = this.getAttrNames();
			for (var i = 0; i < attrNames.length; i++) {
				this.fireAttrChange_(attrNames[i]);
			}
		};

		Component.prototype.syncAttrsFromChanges_ = function syncAttrsFromChanges_(changes) {
			for (var attr in changes) {
				this.fireAttrChange_(attr, changes[attr]);
			}
		};

		Component.prototype.syncElementClasses = function syncElementClasses(newVal, prevVal) {
			var classesToAdd = this.constructor.ELEMENT_CLASSES_MERGED;
			if (newVal) {
				classesToAdd = classesToAdd + ' ' + newVal;
			}
			if (prevVal) {
				_dom.dom.removeClasses(this.element, prevVal);
			}
			_dom.dom.addClasses(this.element, classesToAdd);
		};

		Component.prototype.syncVisible = function syncVisible(newVal) {
			this.element.style.display = newVal ? '' : 'none';
		};

		Component.prototype.validatorElementClassesFn_ = function validatorElementClassesFn_(val) {
			return _metal.core.isString(val);
		};

		Component.prototype.validatorElementFn_ = function validatorElementFn_(val) {
			return _metal.core.isElement(val) || _metal.core.isString(val);
		};

		Component.prototype.validatorEventsFn_ = function validatorEventsFn_(val) {
			return !_metal.core.isDefAndNotNull(val) || _metal.core.isObject(val);
		};

		Component.prototype.validatorIdFn_ = function validatorIdFn_(val) {
			return _metal.core.isString(val);
		};

		Component.prototype.valueElementFn_ = function valueElementFn_() {
			if (!this.id) {
				// This may happen because the default value of "id" depends on "element",
				// and the default value of "element" depends on "id".
				this.id = this.makeId_();
			}
			return this.renderer_.buildElement();
		};

		Component.prototype.valueIdFn_ = function valueIdFn_() {
			return this.hasBeenSet('element') && this.element.id ? this.element.id : this.makeId_();
		};

		return Component;
	}(_Attribute3.default);

	Component.prototype.registerMetalComponent && Component.prototype.registerMetalComponent(Component, 'Component')


	/**
  * Helper responsible for extracting components from strings and config data.
  * @type {!ComponentCollector}
  * @protected
  * @static
  */
	Component.componentsCollector = new _ComponentCollector2.default();

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
			validator: _metal.core.isBoolean,
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
  * The `ComponentRenderer` that should be used. Components need to set this
  * to a subclass of `ComponentRenderer` that has the rendering logic, like
  * `SoyRenderer`.
  * @type {!ComponentRenderer}
  * @static
  */
	Component.RENDERER = _ComponentRenderer2.default;

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
	Component.INVALID_ATTRS = ['components'];

	exports.default = Component;
});
define(['exports', 'metal/src/metal', 'metal-events/src/events'], function (exports, _metal, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var EventsCollector = function (_Disposable) {
		_inherits(EventsCollector, _Disposable);

		function EventsCollector(component) {
			_classCallCheck(this, EventsCollector);

			var _this = _possibleConstructorReturn(this, _Disposable.call(this));

			if (!component) {
				throw new Error('The component instance is mandatory');
			}

			/**
    * Holds the component intance.
    * @type {!Component}
    * @protected
    */
			_this.component_ = component;

			/**
    * Holds the attached delegate event handles, indexed by the css selector.
    * @type {!Object<string, EventHandler>}
    * @protected
    */
			_this.eventHandles_ = {};

			/**
    * Holds flags indicating which selectors a group has listeners for.
    * @type {!Object<string, !Object<string, boolean>>}
    * @protected
    */
			_this.groupHasListener_ = {};
			return _this;
		}

		/**
   * Attaches the listener described by the given params, unless it has already
   * been attached.
   * @param {string} eventType
   * @param {string} fnNamesString
   * @param {string=} groupName
   */


		EventsCollector.prototype.attachListener = function attachListener(eventType, fnNamesString) {
			var groupName = arguments.length <= 2 || arguments[2] === undefined ? 'element' : arguments[2];

			var selector = '[data-on' + eventType + '="' + fnNamesString + '"]';

			this.groupHasListener_[groupName][selector] = true;

			if (!this.eventHandles_[selector]) {
				this.eventHandles_[selector] = new _events.EventHandler();
				var fnNames = fnNamesString.split(',');
				for (var i = 0; i < fnNames.length; i++) {
					var fn = this.component_.getListenerFn(fnNames[i]);
					if (fn) {
						this.eventHandles_[selector].add(this.component_.delegate(eventType, selector, this.onEvent_.bind(this, fn)));
					}
				}
			}
		};

		EventsCollector.prototype.attachListenersFromHtml = function attachListenersFromHtml(content) {
			var groupName = arguments.length <= 1 || arguments[1] === undefined ? 'element' : arguments[1];

			this.startCollecting(groupName);
			if (content.indexOf('data-on') === -1) {
				return;
			}
			var regex = /data-on([a-z]+)=['"]([^'"]+)['"]/g;
			var match = regex.exec(content);
			while (match) {
				this.attachListener(match[1], match[2], groupName);
				match = regex.exec(content);
			}
		};

		EventsCollector.prototype.detachAllListeners = function detachAllListeners() {
			for (var selector in this.eventHandles_) {
				if (this.eventHandles_[selector]) {
					this.eventHandles_[selector].removeAllListeners();
				}
			}
			this.eventHandles_ = {};
			this.listenerCounts_ = {};
		};

		EventsCollector.prototype.detachUnusedListeners = function detachUnusedListeners() {
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
		};

		EventsCollector.prototype.disposeInternal = function disposeInternal() {
			this.detachAllListeners();
			this.component_ = null;
		};

		EventsCollector.prototype.hasAttachedForGroup = function hasAttachedForGroup(group) {
			return !!this.groupHasListener_.hasOwnProperty(group);
		};

		EventsCollector.prototype.onEvent_ = function onEvent_(fn, event) {
			// This check prevents parent components from handling their child inline listeners.
			var eventComp = event.handledByComponent;
			if (!eventComp || eventComp === this.component_ || event.delegateTarget.contains(eventComp.element)) {
				event.handledByComponent = this.component_;
				return fn(event);
			}
		};

		EventsCollector.prototype.startCollecting = function startCollecting() {
			var groupName = arguments.length <= 0 || arguments[0] === undefined ? 'element' : arguments[0];

			this.groupHasListener_[groupName] = {};
		};

		return EventsCollector;
	}(_metal.Disposable);

	EventsCollector.prototype.registerMetalComponent && EventsCollector.prototype.registerMetalComponent(EventsCollector, 'EventsCollector')
	exports.default = EventsCollector;
});
define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var SurfaceCollector = function (_Disposable) {
		_inherits(SurfaceCollector, _Disposable);

		function SurfaceCollector() {
			_classCallCheck(this, SurfaceCollector);

			var _this = _possibleConstructorReturn(this, _Disposable.call(this));

			/**
    * Holds all registered surfaces, mapped by their element ids.
    * @type {!Array<!Object>}
    * @protected
    */
			_this.surfaces_ = {};
			return _this;
		}

		/**
   * Adds a surface to this collector.
   * @param {string} surfaceElementId
   * @param {Object=} opt_data Surface data to be stored.
   */


		SurfaceCollector.prototype.addSurface = function addSurface(surfaceElementId, opt_data) {
			if (this.surfaces_[surfaceElementId]) {
				this.updateSurface(surfaceElementId, opt_data);
			} else {
				this.surfaces_[surfaceElementId] = opt_data || {};
				this.surfaces_[surfaceElementId].surfaceElementId = surfaceElementId;
			}
		};

		SurfaceCollector.prototype.disposeInternal = function disposeInternal() {
			this.surfaces_ = null;
		};

		SurfaceCollector.prototype.getSurface = function getSurface(surfaceElementId) {
			return this.surfaces_[surfaceElementId] ? this.surfaces_[surfaceElementId] : null;
		};

		SurfaceCollector.prototype.removeAllSurfaces = function removeAllSurfaces() {
			this.surfaces_ = [];
		};

		SurfaceCollector.prototype.removeSurface = function removeSurface(surfaceElementId) {
			this.surfaces_[surfaceElementId] = null;
		};

		SurfaceCollector.prototype.updateSurface = function updateSurface(surfaceElementId, opt_data) {
			_metal.object.mixin(this.surfaces_[surfaceElementId], opt_data);
		};

		return SurfaceCollector;
	}(_metal.Disposable);

	SurfaceCollector.prototype.registerMetalComponent && SurfaceCollector.prototype.registerMetalComponent(SurfaceCollector, 'SurfaceCollector')
	exports.default = SurfaceCollector;
});
define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-html/src/html', '../Component', '../ComponentCollector', '../ComponentRenderer', '../EventsCollector', './SurfaceCollector'], function (exports, _metal, _dom, _html, _Component, _ComponentCollector, _ComponentRenderer2, _EventsCollector, _SurfaceCollector) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _html2 = _interopRequireDefault(_html);

	var _Component2 = _interopRequireDefault(_Component);

	var _ComponentCollector2 = _interopRequireDefault(_ComponentCollector);

	var _ComponentRenderer3 = _interopRequireDefault(_ComponentRenderer2);

	var _EventsCollector2 = _interopRequireDefault(_EventsCollector);

	var _SurfaceCollector2 = _interopRequireDefault(_SurfaceCollector);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var SurfaceRenderer = function (_ComponentRenderer) {
		_inherits(SurfaceRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */

		function SurfaceRenderer(component) {
			_classCallCheck(this, SurfaceRenderer);

			var _this = _possibleConstructorReturn(this, _ComponentRenderer.call(this, component));

			/**
    * Holds data about all surfaces that were collected through the
    * `replaceSurfacePlaceholders_` method.
    * @type {!Array}
    * @protected
    */
			_this.collectedSurfaces_ = [];

			/**
    * Holds the number of generated ids for each surface's contents.
    * @type {!Object}
    * @protected
    */
			_this.generatedIdCount_ = {};

			/**
    * The element ids of all surfaces that were removed on a repaint.
    * @type {!Array<string>}
    * @protected
    */
			_this.removedSurfaces_ = [];

			/**
    * The ids of the surfaces registered for this renderer's component.
    * @type {!Object<string, boolean>}
    * @protected
    */
			_this.surfaceIds_ = {};

			/**
    * Collects inline events from html contents.
    * @type {!EventsCollector}
    * @protected
    */
			_this.eventsCollector_ = new _EventsCollector2.default(_this.component_);

			_metal.core.mergeSuperClassesProperty(_this.component_.constructor, 'SURFACE_TAG_NAME', _metal.array.firstDefinedValue);
			_this.component_.constructor.SURFACE_TAG_NAME_MERGED = _this.component_.constructor.SURFACE_TAG_NAME_MERGED || 'div';

			_this.setShouldUseFacade(true);
			_this.addSurfacesFromStaticHint_();
			_this.addSurface(_this.component_.id, {
				componentName: _this.component_.getName()
			});

			_this.component_.once('attached', _this.handleComponentAttachedOnce_.bind(_this));
			_this.component_.on('detached', _this.handleComponentDetached_.bind(_this));
			_this.on('renderSurface', _this.defaultRenderSurfaceFn_, true);
			return _this;
		}

		/**
   * Adds a simple attribute with the given name to the component, if it doesn't
   * exist yet.
   * @param {string} attrName
   * @param {Object=} opt_initialValue Optional initial value for the new attr.
   * @protected
   */


		SurfaceRenderer.prototype.addMissingAttr_ = function addMissingAttr_(attrName, opt_initialValue) {
			if (!this.component_.getAttrConfig(attrName)) {
				this.component_.addAttr(attrName, {}, opt_initialValue);
			}
		};

		SurfaceRenderer.prototype.addSurface = function addSurface(surfaceId, opt_surfaceConfig) {
			var config = opt_surfaceConfig || {};
			var surfaceElementId = this.getSurfaceElementId(surfaceId, config);
			if (this.surfaceIds_[surfaceElementId]) {
				SurfaceRenderer.surfacesCollector.updateSurface(surfaceElementId, config);
			} else {
				this.surfaceIds_[surfaceElementId] = true;
				config.cacheState = config.cacheState || SurfaceRenderer.Cache.NOT_INITIALIZED;
				SurfaceRenderer.surfacesCollector.addSurface(surfaceElementId, config);
				if (config.componentName && surfaceId !== this.component_.id) {
					this.addSubComponent(config.componentName, surfaceElementId);
				}
			}
			this.cacheSurfaceRenderAttrs_(surfaceElementId, config.renderAttrs);

			return this;
		};

		SurfaceRenderer.prototype.addSurfaces = function addSurfaces(configs) {
			for (var surfaceId in configs) {
				this.addSurface(surfaceId, configs[surfaceId]);
			}
			return this;
		};

		SurfaceRenderer.prototype.addSurfacesFromStaticHint_ = function addSurfacesFromStaticHint_() {
			_metal.core.mergeSuperClassesProperty(this.component_.constructor, 'SURFACES', this.mergeObjects_);
			this.surfacesRenderAttrs_ = {};

			var configs = this.component_.constructor.SURFACES_MERGED;
			for (var surfaceId in configs) {
				this.addSurface(surfaceId, _metal.object.mixin({}, configs[surfaceId]));
			}
		};

		SurfaceRenderer.prototype.addToRemovedSurfaces_ = function addToRemovedSurfaces_(surfaceElementIds) {
			for (var i = 0; i < surfaceElementIds.length; i++) {
				var surface = this.getSurface(surfaceElementIds[i]);
				this.removedSurfaces_.push(surface);
				surface.parent = null;
			}
		};

		SurfaceRenderer.prototype.buildElement = function buildElement() {
			var compId = this.component_.id;
			var element = this.findElementInContent_(compId, this.getElementContent_(true) || '');
			if (!element) {
				element = this.findElementInContent_(compId, this.getComponentHtml(''));
			}
			_dom.dom.removeChildren(element);
			_dom.dom.exitDocument(element);
			return element;
		};

		SurfaceRenderer.prototype.buildFragment_ = function buildFragment_(content) {
			var frag = _dom.dom.buildFragment(content);
			if (content.indexOf('<script') !== -1) {
				_dom.globalEval.runScriptsInElement(frag);
			}
			return frag;
		};

		SurfaceRenderer.prototype.buildPlaceholder = function buildPlaceholder(surfaceElementId, opt_data) {
			if (surfaceElementId && opt_data) {
				opt_data.surfaceElementId = surfaceElementId;
				this.addSurface(surfaceElementId, opt_data);
			}
			return '%%%%~s' + (surfaceElementId ? '-' + surfaceElementId : '') + '~%%%%';
		};

		SurfaceRenderer.prototype.cacheSurfaceContent = function cacheSurfaceContent(surfaceElementId, content) {
			var cacheState = this.computeSurfaceCacheState_(content);
			var surface = this.getSurfaceFromElementId(surfaceElementId);
			surface.cacheState = cacheState;
		};

		SurfaceRenderer.prototype.cacheSurfaceRenderAttrs_ = function cacheSurfaceRenderAttrs_(surfaceElementId, renderAttrs) {
			var attrs = renderAttrs || [];
			for (var i = 0; i < attrs.length; i++) {
				if (!this.surfacesRenderAttrs_[attrs[i]]) {
					this.surfacesRenderAttrs_[attrs[i]] = {};
					this.addMissingAttr_(attrs[i], this.component_.getInitialConfig()[attrs[i]]);
				}
				this.surfacesRenderAttrs_[attrs[i]][surfaceElementId] = true;
			}
		};

		SurfaceRenderer.prototype.checkHasElementTag_ = function checkHasElementTag_(content, id) {
			return content.indexOf(' id="' + id + '"') !== -1;
		};

		SurfaceRenderer.prototype.clearSurfaceCache = function clearSurfaceCache(surfaceId) {
			this.getSurface(surfaceId).cacheState = SurfaceRenderer.Cache.NOT_INITIALIZED;
		};

		SurfaceRenderer.prototype.compareCacheStates_ = function compareCacheStates_(currentCacheState, previousCacheState) {
			return currentCacheState !== SurfaceRenderer.Cache.NOT_INITIALIZED && currentCacheState === previousCacheState;
		};

		SurfaceRenderer.prototype.computeSurfaceCacheState_ = function computeSurfaceCacheState_(value) {
			value = value || '';
			if (_dom.features.checkAttrOrderChange()) {
				value = this.convertHtmlToBrowserFormat_(value);
			}
			return _metal.string.hashCode(value);
		};

		SurfaceRenderer.prototype.convertHtmlToBrowserFormat_ = function convertHtmlToBrowserFormat_(htmlString) {
			var element = document.createElement('div');
			_dom.dom.append(element, htmlString);
			return element.innerHTML;
		};

		SurfaceRenderer.prototype.createPlaceholderSurface_ = function createPlaceholderSurface_(parentSurfaceElementId, opt_surfaceElementId) {
			var surfaceElementId = opt_surfaceElementId;
			if (!_metal.core.isDefAndNotNull(surfaceElementId)) {
				surfaceElementId = this.generateSurfaceElementId(parentSurfaceElementId);
			}
			var surface = this.getSurfaceFromElementId(surfaceElementId);
			if (!surface) {
				surface = {
					surfaceElementId: surfaceElementId
				};
				this.addSurface(surfaceElementId, surface);
			}
			return surface;
		};

		SurfaceRenderer.prototype.addSubComponent = function addSubComponent(componentName, componentId) {
			var data = this.getSurfaceFromElementId(componentId).componentData || {};
			data.id = componentId;
			data.element = '#' + componentId;
			return this.component_.addSubComponent(componentName, data);
		};

		SurfaceRenderer.prototype.createSurfaceElement_ = function createSurfaceElement_(surfaceElementId) {
			var el = document.createElement(this.component_.constructor.SURFACE_TAG_NAME_MERGED);
			el.id = surfaceElementId;
			return el;
		};

		SurfaceRenderer.prototype.defaultRenderSurfaceFn_ = function defaultRenderSurfaceFn_(data) {
			var surfaceElementId = data.surfaceElementId;
			var surface = this.getSurfaceFromElementId(surfaceElementId);
			if (surface.componentName && surfaceElementId !== this.component_.id) {
				this.renderComponentSurface_(surfaceElementId, data.content);
				return;
			}

			var content = data.content || this.getSurfaceContent_(surfaceElementId);
			var cacheContent = data.cacheContent || content;
			var cacheHit = surface.static;
			if (!surface.static) {
				var previousCacheState = surface.cacheState;
				this.cacheSurfaceContent(surfaceElementId, cacheContent);
				cacheHit = this.compareCacheStates_(surface.cacheState, previousCacheState);
			}

			if (cacheHit) {
				this.renderPlaceholderSurfaceContents_(cacheContent, surfaceElementId);
			} else {
				this.eventsCollector_.attachListenersFromHtml(cacheContent, surfaceElementId);
				this.replaceSurfaceContent_(surfaceElementId, surface, content);
			}
		};

		SurfaceRenderer.prototype.disposeInternal = function disposeInternal() {
			var _this2 = this;

			_ComponentRenderer.prototype.disposeInternal.call(this);

			this.eventsCollector_.dispose();
			this.eventsCollector_ = null;

			this.surfacesRenderAttrs_ = null;

			Object.keys(this.surfaceIds_).forEach(function (surfaceId) {
				return _this2.removeSurface(surfaceId, true);
			});
			this.surfaceIds_ = null;
		};

		SurfaceRenderer.prototype.emitRenderSurfaceEvent_ = function emitRenderSurfaceEvent_(surfaceElementId, opt_content, opt_cacheContent, opt_renderAttrs) {
			this.emit('renderSurface', {
				cacheContent: opt_cacheContent,
				content: opt_content,
				renderAttrs: opt_renderAttrs || [],
				surfaceElementId: surfaceElementId,
				surfaceId: this.getSurfaceId(this.getSurfaceFromElementId(surfaceElementId))
			});
		};

		SurfaceRenderer.prototype.findElementInContent_ = function findElementInContent_(id, content) {
			content = _metal.core.isString(content) ? _dom.dom.buildFragment(content) : content;
			var firstChild = content.childNodes[0];
			if (firstChild && firstChild.id === id) {
				return firstChild;
			}
		};

		SurfaceRenderer.prototype.generateSurfaceElementId = function generateSurfaceElementId(parentSurfaceElementId) {
			this.generatedIdCount_[parentSurfaceElementId] = (this.generatedIdCount_[parentSurfaceElementId] || 0) + 1;
			return parentSurfaceElementId + '-s' + this.generatedIdCount_[parentSurfaceElementId];
		};

		SurfaceRenderer.prototype.getComponentHtml = function getComponentHtml(content) {
			return this.wrapContentIfNecessary(content, this.component_.id, this.component_.constructor.ELEMENT_TAG_NAME_MERGED);
		};

		SurfaceRenderer.prototype.getElementContent_ = function getElementContent_(opt_skipContents) {
			return this.getSurfaceContent(this.getSurface(this.component_.id), opt_skipContents);
		};

		SurfaceRenderer.prototype.getElementExtendedContent = function getElementExtendedContent() {
			var content = this.getElementContent_() || '';
			this.eventsCollector_.attachListenersFromHtml(content, this.component_.id);
			this.cacheSurfaceContent(this.component_.id, content);
			return this.replaceSurfacePlaceholders_(content, this.component_.id, this.getSurface(this.component_.id));
		};

		SurfaceRenderer.prototype.getModifiedSurfacesFromChanges_ = function getModifiedSurfacesFromChanges_(changes) {
			var surfaces = {};
			for (var attr in changes) {
				var surfaceNames = Object.keys(this.surfacesRenderAttrs_[attr] || {});
				for (var i = 0; i < surfaceNames.length; i++) {
					if (!surfaces[surfaceNames[i]]) {
						surfaces[surfaceNames[i]] = [];
					}
					surfaces[surfaceNames[i]].push(attr);
				}
			}
			return surfaces;
		};

		SurfaceRenderer.prototype.getNonComponentSurfaceHtml = function getNonComponentSurfaceHtml(surfaceElementId, content) {
			return this.wrapContentIfNecessary(content, surfaceElementId, this.component_.constructor.SURFACE_TAG_NAME_MERGED);
		};

		SurfaceRenderer.prototype.getSurface = function getSurface(surfaceId) {
			var surface = this.getSurfaceFromElementId(this.getSurfaceElementId(surfaceId));
			return surface ? surface : this.getSurfaceFromElementId(surfaceId);
		};

		SurfaceRenderer.prototype.getSurfaceContent = function getSurfaceContent() {
			_metal.core.abstractMethod();
		};

		SurfaceRenderer.prototype.getSurfaceContent_ = function getSurfaceContent_(surfaceElementId) {
			var surface = this.getSurfaceFromElementId(surfaceElementId);
			if (surface.componentName && surfaceElementId !== this.component_.id) {
				var component = _ComponentCollector2.default.components[surfaceElementId];
				if (component.wasRendered) {
					return '';
				} else {
					return component.getRenderer().getElementExtendedContent();
				}
			} else {
				return this.getSurfaceContent(surface) || '';
			}
		};

		SurfaceRenderer.prototype.getSurfaceElement = function getSurfaceElement(surfaceId, opt_surface) {
			var surface = opt_surface || this.getSurface(surfaceId);
			if (!surface) {
				return null;
			}
			if (!surface.element) {
				if (surface.componentName) {
					var component = _ComponentCollector2.default.components[surfaceId];
					if (component) {
						surface.element = component.element;
					}
				} else {
					var surfaceElementId = this.getSurfaceElementId(surfaceId, surface);
					surface.element = this.component_.findElementById(surfaceElementId) || this.createSurfaceElement_(surfaceElementId);
				}
			}
			return surface.element;
		};

		SurfaceRenderer.prototype.getSurfaceElementId = function getSurfaceElementId(surfaceId, opt_surface) {
			var surface = opt_surface || {};
			if (surface.surfaceElementId) {
				return surface.surfaceElementId;
			} else if (surface.componentName || this.hasComponentPrefix_(surfaceId)) {
				return surfaceId;
			} else {
				return this.prefixSurfaceId(surfaceId);
			}
		};

		SurfaceRenderer.prototype.getSurfaceFromElementId = function getSurfaceFromElementId(surfaceElementId) {
			return SurfaceRenderer.surfacesCollector.getSurface(surfaceElementId);
		};

		SurfaceRenderer.prototype.getSurfaceHtml_ = function getSurfaceHtml_(surface, content) {
			var surfaceElementId = surface.surfaceElementId;
			if (surface.componentName) {
				var component = _ComponentCollector2.default.components[surfaceElementId];
				return component.getRenderer().getComponentHtml(content);
			} else {
				return this.getNonComponentSurfaceHtml(surfaceElementId, content);
			}
		};

		SurfaceRenderer.prototype.getSurfaceId = function getSurfaceId(surface) {
			if (surface.componentName || !this.hasComponentPrefix_(surface.surfaceElementId)) {
				return surface.surfaceElementId;
			} else {
				return surface.surfaceElementId.substr(this.component_.id.length + 1);
			}
		};

		SurfaceRenderer.prototype.getSurfaces = function getSurfaces() {
			var surfaces = {};
			Object.keys(this.surfaceIds_).forEach(function (surfaceElementId) {
				var surface = this.getSurfaceFromElementId(surfaceElementId);
				surfaces[this.getSurfaceId(surface)] = surface;
			}.bind(this));
			return surfaces;
		};

		SurfaceRenderer.prototype.handleComponentAttachedOnce_ = function handleComponentAttachedOnce_() {
			this.updatePlaceholderSurfaces_();
		};

		SurfaceRenderer.prototype.handleComponentDetached_ = function handleComponentDetached_() {
			this.eventsCollector_.detachAllListeners();
		};

		SurfaceRenderer.prototype.hasComponentPrefix_ = function hasComponentPrefix_(surfaceId) {
			var compId = this.component_.id;
			return surfaceId.substr(0, compId.length) === compId && (surfaceId.length === compId.length || surfaceId[compId.length] === '-');
		};

		SurfaceRenderer.prototype.mergeObjects_ = function mergeObjects_(values) {
			return _metal.object.mixin.apply(null, [{}].concat(values.reverse()));
		};

		SurfaceRenderer.prototype.prefixSurfaceId = function prefixSurfaceId(surfaceId) {
			return this.component_.id + '-' + surfaceId;
		};

		SurfaceRenderer.prototype.removeSurface = function removeSurface(surfaceId, opt_skipDomRemoval) {
			if (!opt_skipDomRemoval) {
				var el = this.getSurfaceElement(surfaceId);
				if (el && el.parentNode) {
					el.parentNode.removeChild(el);
				}
			}
			var surfaceElementId = this.getSurfaceElementId(surfaceId, this.getSurface(surfaceId));
			SurfaceRenderer.surfacesCollector.removeSurface(surfaceElementId);
			this.surfaceIds_[surfaceElementId] = false;
			return this;
		};

		SurfaceRenderer.prototype.removeUnusedSurfaces_ = function removeUnusedSurfaces_() {
			var compIds = [];
			for (var i = 0; i < this.removedSurfaces_.length; i++) {
				var surface = this.removedSurfaces_[i];
				if (!surface.parent) {
					this.removeSurface(surface.surfaceElementId);
					if (surface.componentName) {
						compIds.push(surface.surfaceElementId);
					}
				}
			}
			this.component_.disposeSubComponents(compIds);
		};

		SurfaceRenderer.prototype.render = function render(data) {
			var id = this.component_.id;
			if (data.decorating) {
				var extendedContent = this.getElementExtendedContent();
				var extendedCacheState = this.computeSurfaceCacheState_(extendedContent);
				var originalContent = _html2.default.compress(this.component_.element.outerHTML);
				var htmlCacheState = this.computeSurfaceCacheState_(originalContent);
				if (!this.compareCacheStates_(htmlCacheState, extendedCacheState)) {
					this.replaceElementContent(extendedContent);
				}
			} else {
				this.emitRenderSurfaceEvent_(id);
			}
		};

		SurfaceRenderer.prototype.renderComponentSurface_ = function renderComponentSurface_(surfaceElementId, opt_content) {
			var component = _ComponentCollector2.default.components[surfaceElementId];
			if (component.wasRendered) {
				var surface = this.getSurfaceFromElementId(surfaceElementId);
				_Component2.default.componentsCollector.updateComponent(surfaceElementId, surface.componentData);
			} else {
				if (opt_content && _dom.dom.isEmpty(component.element)) {
					// If we have the rendered content for this component, but it hasn't
					// been rendered in its element yet, we render it manually here. That
					// can happen if the subcomponent's element is set before the parent
					// element renders its content, making originally rendered content be
					// set on the wrong place.
					component.getRenderer().replaceElementContent(opt_content);
				}
				component.renderAsSubComponent();
			}
		};

		SurfaceRenderer.prototype.renderPlaceholderSurfaceContents_ = function renderPlaceholderSurfaceContents_(content, surfaceElementId) {
			var instance = this;
			content.replace(SurfaceRenderer.SURFACE_REGEX, function (match, id) {
				var surface = instance.createPlaceholderSurface_(surfaceElementId, id);
				instance.emitRenderSurfaceEvent_(surface.surfaceElementId);
				return match;
			});
		};

		SurfaceRenderer.prototype.renderSurfacesContent_ = function renderSurfacesContent_(surfaces) {
			this.generatedIdCount_ = {};
			this.removedSurfaces_ = [];

			var compId = this.component_.id;
			var surfaceElementIds = Object.keys(surfaces);
			var idIndex = surfaceElementIds.indexOf(compId);
			if (idIndex !== -1) {
				// Always render the main content surface first, for performance reasons.
				surfaceElementIds.splice(idIndex, 1);
				surfaceElementIds = [compId].concat(surfaceElementIds);
			}

			for (var i = 0; i < surfaceElementIds.length; i++) {
				var surface = this.getSurfaceFromElementId(surfaceElementIds[i]);
				if (!surface.handled && (surface.parent || surfaceElementIds[i] === compId)) {
					this.emitRenderSurfaceEvent_(surfaceElementIds[i], null, null, surfaces[surfaceElementIds[i]]);
				}
			}
			this.updatePlaceholderSurfaces_();
			this.eventsCollector_.detachUnusedListeners();
			this.removeUnusedSurfaces_();
		};

		SurfaceRenderer.prototype.replaceElementContent = function replaceElementContent(content) {
			var element = this.component_.element;
			var newContent = this.buildFragment_(content);
			var newElement = this.findElementInContent_(this.component_.id, newContent);
			if (newElement) {
				this.updateElementAttributes_(element, newElement);
				newContent = newElement.childNodes;
			}
			_dom.dom.removeChildren(element);
			_dom.dom.append(element, newContent);
		};

		SurfaceRenderer.prototype.replaceSurfaceContent_ = function replaceSurfaceContent_(surfaceElementId, surface, content) {
			content = this.replaceSurfacePlaceholders_(content, surfaceElementId, surface);
			if (surfaceElementId === this.component_.id) {
				this.replaceElementContent(content);
				return;
			}

			var el = this.getSurfaceElement(surfaceElementId);
			var frag = this.buildFragment_(content);
			var element = this.findElementInContent_(surfaceElementId, frag);
			if (element) {
				surface.element = element;
				_dom.dom.replace(el, surface.element);
			} else {
				_dom.dom.removeChildren(el);
				_dom.dom.append(el, frag);
			}
		};

		SurfaceRenderer.prototype.replaceSurfacePlaceholders_ = function replaceSurfacePlaceholders_(content, surfaceElementId, surface) {
			if (!surface.componentName || surfaceElementId === this.component_.id) {
				this.addToRemovedSurfaces_(surface.children || []);
				surface.children = [];
			}

			var instance = this;
			return content.replace(SurfaceRenderer.SURFACE_REGEX, function (match, id) {
				// Surfaces should already have been created before being rendered so they can be
				// accessed from their getSurfaceContent calls.
				var placeholderSurface = instance.createPlaceholderSurface_(surfaceElementId, id);
				id = placeholderSurface.surfaceElementId;
				placeholderSurface.handled = true;
				placeholderSurface.parent = surfaceElementId;
				surface.children.push(id);

				var surfaceContent = instance.getSurfaceContent_(id);
				var surfaceHtml = instance.getSurfaceHtml_(placeholderSurface, surfaceContent);
				var expandedHtml = instance.replaceSurfacePlaceholders_(surfaceHtml, id, placeholderSurface);
				instance.collectedSurfaces_.push({
					cacheContent: surfaceContent,
					content: expandedHtml,
					surface: placeholderSurface
				});

				return expandedHtml;
			});
		};

		SurfaceRenderer.prototype.update = function update(data) {
			this.renderSurfacesContent_(this.getModifiedSurfacesFromChanges_(data.changes));
		};

		SurfaceRenderer.prototype.updateElementAttributes_ = function updateElementAttributes_(element, newElement) {
			var attrs = newElement.attributes;
			for (var i = 0; i < attrs.length; i++) {
				// The "id" and "class" html attributes are already synced via the "id"
				// and "elementClasses" component attributes, respectively.
				if (attrs[i].name !== 'id' && attrs[i].name !== 'class') {
					element.setAttribute(attrs[i].name, attrs[i].value);
				}
			}

			if (element.tagName !== newElement.tagName) {
				console.error('The component named "' + this.component_.getName() + '" tried to change the component ' + 'element\'s tag name, which is not allowed. Make sure to always return the same tag ' + 'name for the component element on the renderer\'s getSurfaceContent. This may also ' + 'have been caused by passing an element to this component with a different tag name ' + 'from the one it uses.');
			}
		};

		SurfaceRenderer.prototype.updatePlaceholderSurface_ = function updatePlaceholderSurface_(collectedData) {
			var surface = collectedData.surface;
			var surfaceElementId = surface.surfaceElementId;
			if (surface.componentName) {
				// Elements of component surfaces are unchangeable, so we need to replace the
				// rendered element with the component's.
				_dom.dom.replace(this.component_.findElementById(surfaceElementId), this.getSurfaceElement(surfaceElementId, surface));

				// Component surfaces need to be handled in case some internal details have changed.
				this.emitRenderSurfaceEvent_(surfaceElementId, collectedData.content, collectedData.cacheContent);
			} else {
				// This surface's element has either changed or never been created yet. Let's just
				// reset it to null, so it can be fetched from the dom again when necessary. Also,
				// since there's no need to do cache checks or rerender, let's just attach its
				// listeners and cache its content manually.
				surface.element = null;
				this.cacheSurfaceContent(surfaceElementId, collectedData.cacheContent);
				this.eventsCollector_.attachListenersFromHtml(collectedData.cacheContent, surfaceElementId);
			}
		};

		SurfaceRenderer.prototype.updatePlaceholderSurfaces_ = function updatePlaceholderSurfaces_() {
			for (var i = this.collectedSurfaces_.length - 1; i >= 0; i--) {
				this.updatePlaceholderSurface_(this.collectedSurfaces_[i]);
				this.collectedSurfaces_[i].surface.handled = false;
			}
			this.collectedSurfaces_ = [];
		};

		SurfaceRenderer.prototype.wrapContentIfNecessary = function wrapContentIfNecessary(content, id, tag) {
			if (!this.checkHasElementTag_(content, id)) {
				content = '<' + tag + ' id="' + id + '">' + content + '</' + tag + '>';
			}
			return content;
		};

		return SurfaceRenderer;
	}(_ComponentRenderer3.default);

	SurfaceRenderer.prototype.registerMetalComponent && SurfaceRenderer.prototype.registerMetalComponent(SurfaceRenderer, 'SurfaceRenderer')


	/**
  * Cache states for the surfaces.
  * @enum {string}
  */
	SurfaceRenderer.Cache = {
		/**
   * Cache not initialized.
   */
		NOT_INITIALIZED: -2
	};

	/**
  * The regex used to search for surface placeholders.
  * @type {RegExp}
  * @static
  */
	SurfaceRenderer.SURFACE_REGEX = /\%\%\%\%~s(?:-([^~:]+))?~\%\%\%\%/g;

	/**
  * Helper responsible for temporarily holding surface data.
  * @type {!SurfaceCollector}
  * @protected
  * @static
  */
	SurfaceRenderer.surfacesCollector = new _SurfaceCollector2.default();

	exports.default = SurfaceRenderer;
});
define(['exports', '../Component', '../ComponentCollector', '../ComponentRegistry', '../ComponentRenderer', '../EventsCollector', '../surfaces/SurfaceCollector', '../surfaces/SurfaceRenderer'], function (exports, _Component, _ComponentCollector, _ComponentRegistry, _ComponentRenderer, _EventsCollector, _SurfaceCollector, _SurfaceRenderer) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SurfaceRenderer = exports.SurfaceCollector = exports.EventsCollector = exports.ComponentRenderer = exports.ComponentRegistry = exports.ComponentCollector = exports.Component = undefined;

	var _Component2 = _interopRequireDefault(_Component);

	var _ComponentCollector2 = _interopRequireDefault(_ComponentCollector);

	var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

	var _ComponentRenderer2 = _interopRequireDefault(_ComponentRenderer);

	var _EventsCollector2 = _interopRequireDefault(_EventsCollector);

	var _SurfaceCollector2 = _interopRequireDefault(_SurfaceCollector);

	var _SurfaceRenderer2 = _interopRequireDefault(_SurfaceRenderer);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = _Component2.default;
	exports.Component = _Component2.default;
	exports.ComponentCollector = _ComponentCollector2.default;
	exports.ComponentRegistry = _ComponentRegistry2.default;
	exports.ComponentRenderer = _ComponentRenderer2.default;
	exports.EventsCollector = _EventsCollector2.default;
	exports.SurfaceCollector = _SurfaceCollector2.default;
	exports.SurfaceRenderer = _SurfaceRenderer2.default;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var CancellablePromise = this.metal.Promise;
	var Component = this.metal.component;
	var EventHandler = this.metalNamed.events.EventHandler;

	/*
  * AutocompleteBase component.
  */

	var AutocompleteBase = function (_Component) {
		babelHelpers.inherits(AutocompleteBase, _Component);

		/**
   * @inheritDoc
   */

		function AutocompleteBase(opt_config) {
			babelHelpers.classCallCheck(this, AutocompleteBase);

			var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, opt_config));

			_this.eventHandler_ = new EventHandler();
			_this.on('select', _this.select);
			return _this;
		}

		/**
   * @inheritDoc
   */


		AutocompleteBase.prototype.attached = function attached() {
			if (this.inputElement) {
				this.eventHandler_.add(dom.on(this.inputElement, 'input', this.handleUserInput_.bind(this)));
			}
		};

		/**
   * @inheritDoc
   */


		AutocompleteBase.prototype.detached = function detached() {
			this.eventHandler_.removeAllListeners();
		};

		/**
   * Handles the user input.
   * @param {!Event} event
   * @protected
   */


		AutocompleteBase.prototype.handleUserInput_ = function handleUserInput_() {
			this.request(this.inputElement.value);
		};

		/**
   * Cancels pending request and starts a request for the user input.
   * @param {string} query
   * @return {!CancellablePromise} Deferred request.
   */


		AutocompleteBase.prototype.request = function request(query) {
			var self = this;

			if (this.pendingRequest) {
				this.pendingRequest.cancel('Cancelled by another request');
			}

			var deferredData = self.data(query);
			if (!core.isPromise(deferredData)) {
				deferredData = CancellablePromise.resolve(deferredData);
			}

			this.pendingRequest = deferredData.then(function (data) {
				if (Array.isArray(data)) {
					return data.map(self.format.bind(self)).filter(function (val) {
						return core.isDefAndNotNull(val);
					});
				}
			});

			return this.pendingRequest;
		};

		/**
   * Normalizes the provided data value. If the value is not a function, the
   * value will be wrapped in a function which returns the provided value.
   * @param {Array.<object>|Promise|function} val The provided value which
   *     have to be normalized.
   * @protected
   */


		AutocompleteBase.prototype.setData_ = function setData_(val) {
			if (!core.isFunction(val)) {
				return function () {
					return val;
				};
			}
			return val;
		};

		return AutocompleteBase;
	}(Component);

	/**
  * AutocompleteBase attributes definition.
  * @type {!Object}
  * @static
  */


	AutocompleteBase.prototype.registerMetalComponent && AutocompleteBase.prototype.registerMetalComponent(AutocompleteBase, 'AutocompleteBase')
	AutocompleteBase.ATTRS = {
		/**
   * Function or array, which have to return the results from the query.
   * If function, it should return an `array` or a `Promise`. In case of
   * Promise, it should be resolved with an array containing the results.
   * @type {Array.<object>|function}
   */
		data: {
			setter: 'setData_'
		},

		/**
   * Function that formats each item of the data.
   * @type {function}
   * @default Identity function.
   */
		format: {
			value: core.identityFunction,
			validator: core.isFunction
		},

		/**
   * The element which will be used source for the data queries.
   * @type {DOMElement|string}
   */
		inputElement: {
			setter: dom.toElement
		},

		/**
   * Handles item selection. It will receive two parameters - the selected
   * value from the user and the current value from the input element.
   * @type {function}
   * @default
   *   function(selectedValue) {
   *	   this.inputElement.value = selectedValue;
   *	   this.inputElement.focus();
   *   }
   */
		select: {
			value: function value(selectedValue) {
				this.inputElement.value = selectedValue.textPrimary;
				this.inputElement.focus();
			},
			validator: core.isFunction
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: core.isBoolean,
			value: false
		}
	};

	this.metal.AutocompleteBase = AutocompleteBase;
}).call(this);
define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var templates = {};

	/**
  * Stores soy templates from components that use `SoyRenderer`. Soy files
  * compiled with gulp-metal automatically add their templates here when
  * imported.
  */

	var SoyTemplates = function () {
		function SoyTemplates() {
			_classCallCheck(this, SoyTemplates);
		}

		SoyTemplates.get = function get(opt_componentName, opt_templateName) {
			if (!opt_componentName) {
				return templates;
			} else if (!opt_templateName) {
				return templates[opt_componentName] || {};
			} else {
				return SoyTemplates.get(opt_componentName)[opt_templateName];
			}
		};

		SoyTemplates.set = function set(componentName, componentTemplates) {
			templates[componentName] = componentTemplates;
		};

		return SoyTemplates;
	}();

	exports.default = SoyTemplates;
});
define(['exports', './SoyTemplates'], function (exports, _SoyTemplates) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _SoyTemplates2 = _interopRequireDefault(_SoyTemplates);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var SoyAop = {
		/**
   * The function that should be called instead of a template call. If null, the original function
   * will be called instead.
   * @type {function()}
   * @protected
   */
		interceptFn_: null,

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
			if (SoyAop.interceptFn_) {
				return SoyAop.interceptFn_.call(null, compName, templateName, originalFn, opt_data, opt_ignored, opt_ijData);
			} else {
				return originalFn.call(null, opt_data, opt_ignored, opt_ijData);
			}
		},

		/**
   * Registers the templates for the requested component so they can be intercepted.
   * @param {string} compName
   */
		registerTemplates: function registerTemplates(compName) {
			var compTemplates = _SoyTemplates2.default.get(compName);
			Object.keys(compTemplates).forEach(function (templateName) {
				var originalFn = compTemplates[templateName];
				if (!originalFn.originalFn) {
					compTemplates[templateName] = SoyAop.handleTemplateCall_.bind(null, compName, templateName, originalFn);
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
			SoyAop.interceptFn_ = fn;
		},

		/**
   * Stops intercepting template calls.
   */
		stopInterception: function stopInterception() {
			SoyAop.interceptFn_ = null;
		}
	};

	exports.default = SoyAop;
});
define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-component/src/all/component', './SoyAop', './SoyTemplates'], function (exports, _metal, _dom, _component, _SoyAop, _SoyTemplates) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _SoyAop2 = _interopRequireDefault(_SoyAop);

	var _SoyTemplates2 = _interopRequireDefault(_SoyTemplates);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	// The injected data that will be passed to soy templates.
	var ijData = {};

	/**
  * A `SurfaceRenderer` that enables components to be rendered via soy templates. It
  * automatically creates surfaces named after each template and uses template params
  * as render attributes. That means that when an attribute value changes, the templates
  * that have a parameter with the same name will be automatically rendered again.
  * @extends {SurfaceRenderer}
  */

	var SoyRenderer = function (_SurfaceRenderer) {
		_inherits(SoyRenderer, _SurfaceRenderer);

		function SoyRenderer() {
			_classCallCheck(this, SoyRenderer);

			return _possibleConstructorReturn(this, _SurfaceRenderer.apply(this, arguments));
		}

		SoyRenderer.prototype.addSurfacesFromTemplates_ = function addSurfacesFromTemplates_() {
			var name = this.component_.getName();
			var templates = _SoyTemplates2.default.get(name);
			var templateNames = Object.keys(templates);
			for (var i = 0; i < templateNames.length; i++) {
				var templateName = templateNames[i];
				var templateFn = _SoyAop2.default.getOriginalFn(templates[templateName]);
				if (SoyRenderer.isSurfaceTemplate_(templateName, templateFn)) {
					var surfaceId = templateName === 'render' ? this.component_.id : templateName;
					this.addSurface(surfaceId, {
						renderAttrs: templateFn.params,
						templateComponentName: name,
						templateName: templateName
					});
				}
			}
		};

		SoyRenderer.buildComponentConfigData_ = function buildComponentConfigData_(id, templateData) {
			var config = {
				id: id
			};
			for (var key in templateData) {
				config[key] = templateData[key];
			}
			return config;
		};

		SoyRenderer.prototype.buildTemplateData_ = function buildTemplateData_() {
			var component = this.component_;
			var names = component.getAttrNames().filter(function (name) {
				// Get all attribute values except for "element", since it helps performance and this
				// attribute shouldn't be referenced inside a soy template anyway.
				return name !== 'element';
			});
			var surface = this.getSurface(component.id);
			var data = surface && surface.componentData ? surface.componentData : {};
			var attrs = _metal.object.map(component.getAttrs(names), function (key, value) {
				if (component.getAttrConfig(key).isHtml && _metal.core.isString(value)) {
					return SoyRenderer.sanitizeHtml(value);
				} else {
					return value;
				}
			});
			return _metal.object.mixin(data, attrs);
		};

		SoyRenderer.createComponentFromTemplate = function createComponentFromTemplate(templateFn, opt_element, opt_data) {
			var element = opt_element ? _dom2.default.toElement(opt_element) : null;
			var data = _metal.object.mixin({
				id: element ? element.id : null
			}, opt_data, {
				element: element
			});

			var name = 'TemplateComponent' + _metal.core.getUid();

			var TemplateComponent = function (_Component) {
				_inherits(TemplateComponent, _Component);

				function TemplateComponent() {
					_classCallCheck(this, TemplateComponent);

					return _possibleConstructorReturn(this, _Component.apply(this, arguments));
				}

				return TemplateComponent;
			}(_component.Component);

			TemplateComponent.prototype.registerMetalComponent && TemplateComponent.prototype.registerMetalComponent(TemplateComponent, 'TemplateComponent')

			TemplateComponent.RENDERER = SoyRenderer;
			_component.ComponentRegistry.register(TemplateComponent, name);
			_SoyTemplates2.default.set(name, {
				render: function render(opt_attrs, opt_ignored, opt_ijData) {
					return _SoyAop2.default.getOriginalFn(templateFn)(data, opt_ignored, opt_ijData);
				}
			});
			_SoyAop2.default.registerTemplates(name);
			return new TemplateComponent(data);
		};

		SoyRenderer.decorateFromTemplate = function decorateFromTemplate(templateFn, opt_element, opt_data) {
			return SoyRenderer.createComponentFromTemplate(templateFn, opt_element, opt_data).decorate();
		};

		SoyRenderer.prototype.generateSurfaceElementId = function generateSurfaceElementId(parentSurfaceId, data) {
			if (data.templateName && parentSurfaceId === this.component_.id && !this.firstSurfaceFound_[data.templateName]) {
				this.firstSurfaceFound_[data.templateName] = true;
				return this.prefixSurfaceId(data.templateName);
			} else {
				return _SurfaceRenderer.prototype.generateSurfaceElementId.call(this, parentSurfaceId);
			}
		};

		SoyRenderer.prototype.getSurfaceContent = function getSurfaceContent(surface, opt_skipContents) {
			if (surface.surfaceElementId === this.component_.id) {
				if (!surface.renderAttrs) {
					this.addSurfacesFromTemplates_();
				}
				this.firstSurfaceFound_ = {};
			}

			this.surfaceBeingRendered_ = surface.surfaceElementId;
			this.skipInnerCalls_ = this.skipInnerCalls_ || opt_skipContents;

			var data = surface.templateData;
			surface.templateData = null;
			var content = this.renderTemplateByName_(surface.templateComponentName, surface.templateName, data);

			this.surfaceBeingRendered_ = null;
			this.skipInnerCalls_ = false;
			return content;
		};

		SoyRenderer.prototype.handleComponentCall_ = function handleComponentCall_(componentName, data) {
			var surfaceData = {
				componentName: componentName
			};
			var id = (data || {}).id;
			if (!id) {
				id = this.generateSurfaceElementId(this.surfaceBeingRendered_, surfaceData);
			}
			surfaceData.componentData = SoyRenderer.buildComponentConfigData_(id, data);
			return this.buildPlaceholder(id, surfaceData);
		};

		SoyRenderer.prototype.handleInterceptedCall_ = function handleInterceptedCall_(templateComponentName, templateName, originalFn, data, opt_ignored, opt_ijData) {
			if (this.skipInnerCalls_) {
				return '';
			} else if (templateName === 'render') {
				return this.handleComponentCall_.call(this, templateComponentName, data);
			} else {
				return this.handleSurfaceCall_.call(this, templateComponentName, templateName, originalFn, data, opt_ignored, opt_ijData);
			}
		};

		SoyRenderer.prototype.handleSurfaceCall_ = function handleSurfaceCall_(templateComponentName, templateName, originalFn, data, opt_ignored, opt_ijData) {
			var surfaceData = {
				static: originalFn.static,
				templateComponentName: templateComponentName,
				templateData: data,
				templateName: templateName
			};
			var surfaceElementId;
			if (_metal.core.isDefAndNotNull(data.surfaceElementId)) {
				surfaceElementId = data.surfaceElementId;
			} else if (_metal.core.isDefAndNotNull(data.surfaceId)) {
				surfaceElementId = this.getSurfaceElementId(data.surfaceId.toString());
			} else {
				if (originalFn.private) {
					return originalFn.call(null, data, opt_ignored, opt_ijData);
				}
				surfaceElementId = this.generateSurfaceElementId(this.surfaceBeingRendered_, surfaceData);
			}
			return this.buildPlaceholder(surfaceElementId, surfaceData);
		};

		SoyRenderer.isSurfaceTemplate_ = function isSurfaceTemplate_(templateName, templateFn) {
			return templateName.substr(0, 13) !== '__deltemplate' && !templateFn.private;
		};

		SoyRenderer.renderFromTemplate = function renderFromTemplate(templateFn, opt_element, opt_data) {
			return SoyRenderer.createComponentFromTemplate(templateFn, opt_element, opt_data).render();
		};

		SoyRenderer.prototype.renderTemplate_ = function renderTemplate_(templateFn, opt_data) {
			_SoyAop2.default.startInterception(this.handleInterceptedCall_.bind(this));
			templateFn = _SoyAop2.default.getOriginalFn(templateFn);
			var content = templateFn(opt_data || this.buildTemplateData_(), null, ijData).content;
			_SoyAop2.default.stopInterception();
			return content;
		};

		SoyRenderer.prototype.renderTemplateByName_ = function renderTemplateByName_(templateComponentName, templateName, opt_data) {
			var elementTemplate = _SoyTemplates2.default.get(templateComponentName, templateName);
			if (_metal.core.isFunction(elementTemplate)) {
				return this.renderTemplate_(elementTemplate, opt_data);
			}
		};

		SoyRenderer.sanitizeHtml = function sanitizeHtml(html) {
			return soydata.VERY_UNSAFE.ordainSanitizedHtml(html);
		};

		SoyRenderer.setInjectedData = function setInjectedData(data) {
			ijData = data || {};
		};

		return SoyRenderer;
	}(_component.SurfaceRenderer);

	SoyRenderer.prototype.registerMetalComponent && SoyRenderer.prototype.registerMetalComponent(SoyRenderer, 'SoyRenderer')


	var originalSanitizedHtmlFromFn = soydata.SanitizedHtml.from;
	soydata.SanitizedHtml.from = function (value) {
		if (value && value.contentKind === 'HTML') {
			value = SoyRenderer.sanitizeHtml(value.content);
		}
		return originalSanitizedHtmlFromFn(value);
	};

	exports.default = SoyRenderer;
});
define(['exports', './SoyAop', './SoyRenderer', './SoyTemplates'], function (exports, _SoyAop, _SoyRenderer, _SoyTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SoyTemplates = exports.SoyRenderer = exports.SoyAop = undefined;

  var _SoyAop2 = _interopRequireDefault(_SoyAop);

  var _SoyRenderer2 = _interopRequireDefault(_SoyRenderer);

  var _SoyTemplates2 = _interopRequireDefault(_SoyTemplates);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _SoyRenderer2.default;
  exports.SoyAop = _SoyAop2.default;
  exports.SoyRenderer = _SoyRenderer2.default;
  exports.SoyTemplates = _SoyTemplates2.default;
});
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Autocomplete.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Autocomplete.
   */

  if (typeof Templates.Autocomplete == 'undefined') {
    Templates.Autocomplete = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Autocomplete.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="autocomplete autocomplete-list component ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(Templates.List.render({ events: { itemSelected: opt_data.id + ':onListItemSelected_' }, id: opt_data.id + '-list' }, null, opt_ijData)) + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Autocomplete.render.soyTemplateName = 'Templates.Autocomplete.render';
  }

  Templates.Autocomplete.render.params = ["id"];

  var Autocomplete = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete() {
      _classCallCheck(this, Autocomplete);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Autocomplete;
  }(_component2.default);

  Autocomplete.prototype.registerMetalComponent && Autocomplete.prototype.registerMetalComponent(Autocomplete, 'Autocomplete')

  Autocomplete.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Autocomplete');
  exports.default = Autocomplete;
});
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from List.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.List.
   */

  if (typeof Templates.List == 'undefined') {
    Templates.List = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.List.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="list component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.List.items(opt_data, null, opt_ijData) + '</div>');
  };
  if (goog.DEBUG) {
    Templates.List.render.soyTemplateName = 'Templates.List.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.List.items = function (opt_data, opt_ignored, opt_ijData) {
    var output = '<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-items" class="list-group" data-onclick="handleClick">';
    if (opt_data.itemsHtml != null) {
      output += soy.$$escapeHtml(opt_data.itemsHtml);
    } else {
      var itemList18 = opt_data.items;
      var itemListLen18 = itemList18.length;
      for (var itemIndex18 = 0; itemIndex18 < itemListLen18; itemIndex18++) {
        var itemData18 = itemList18[itemIndex18];
        output += Templates.ListItem.render({ id: opt_data.id + '-items-' + itemIndex18, index: itemIndex18, item: itemData18 }, null, opt_ijData);
      }
    }
    output += '</ul>';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.List.items.soyTemplateName = 'Templates.List.items';
  }

  Templates.List.render.params = ["id"];
  Templates.List.items.params = ["id", "items", "itemsHtml"];

  var List = function (_Component) {
    _inherits(List, _Component);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return List;
  }(_component2.default);

  List.prototype.registerMetalComponent && List.prototype.registerMetalComponent(List, 'List')

  List.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('List');
  exports.default = List;
});
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from ListItem.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.ListItem.
   */

  if (typeof Templates.ListItem == 'undefined') {
    Templates.ListItem = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.ListItem.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="listitem list-group-item component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '">' + Templates.ListItem.item(opt_data, null, opt_ijData) + '</li>');
  };
  if (goog.DEBUG) {
    Templates.ListItem.render.soyTemplateName = 'Templates.ListItem.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.ListItem.item = function (opt_data, opt_ignored, opt_ijData) {
    var output = (opt_data.item.avatar ? '<span class="list-image pull-left ' + soy.$$escapeHtmlAttribute(opt_data.item.avatar['class']) + '">' + soy.$$escapeHtml(opt_data.item.avatar.content) + '</span>' : '') + '<div class="list-main-content pull-left"><div class="list-text-primary">' + soy.$$escapeHtml(opt_data.item.textPrimary) + '</div>' + (opt_data.item.textSecondary ? '<div class="list-text-secondary">' + soy.$$escapeHtml(opt_data.item.textSecondary) + '</div>' : '') + '</div>';
    if (opt_data.item.icons) {
      var iconList55 = opt_data.item.icons;
      var iconListLen55 = iconList55.length;
      for (var iconIndex55 = 0; iconIndex55 < iconListLen55; iconIndex55++) {
        var iconData55 = iconList55[iconIndex55];
        output += '<span class="btn-icon ' + soy.$$escapeHtmlAttribute(iconData55) + ' pull-right"></span>';
      }
    }
    if (opt_data.item.iconsHtml) {
      output += '<div class="pull-right">';
      var iconHtmlList63 = opt_data.item.iconsHtml;
      var iconHtmlListLen63 = iconHtmlList63.length;
      for (var iconHtmlIndex63 = 0; iconHtmlIndex63 < iconHtmlListLen63; iconHtmlIndex63++) {
        var iconHtmlData63 = iconHtmlList63[iconHtmlIndex63];
        output += soy.$$escapeHtml(iconHtmlData63);
      }
      output += '</div>';
    }
    output += opt_data.item.label ? '<span class="label list-label pull-right ' + soy.$$escapeHtmlAttribute(opt_data.item.label['class']) + '">' + soy.$$escapeHtml(opt_data.item.label.content) + '</span>' : '';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.ListItem.item.soyTemplateName = 'Templates.ListItem.item';
  }

  Templates.ListItem.render.params = ["id", "index", "item"];
  Templates.ListItem.item.params = ["item"];

  var ListItem = function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
      _classCallCheck(this, ListItem);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return ListItem;
  }(_component2.default);

  ListItem.prototype.registerMetalComponent && ListItem.prototype.registerMetalComponent(ListItem, 'ListItem')

  ListItem.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('ListItem');
  exports.default = ListItem;
});
'use strict';

(function () {
  var ListItemBase = this.metal.ListItem;

  /**
   * List component.
   */

  var ListItem = function (_ListItemBase) {
    babelHelpers.inherits(ListItem, _ListItemBase);

    function ListItem(opt_config) {
      babelHelpers.classCallCheck(this, ListItem);
      return babelHelpers.possibleConstructorReturn(this, _ListItemBase.call(this, opt_config));
    }

    return ListItem;
  }(ListItemBase);

  /**
   * Default list elementClasses.
   * @default list
   * @type {String}
   * @static
   */


  ListItem.prototype.registerMetalComponent && ListItem.prototype.registerMetalComponent(ListItem, 'ListItem')
  ListItem.ELEMENT_CLASSES = 'listitem';

  /**
   * List attributes definition.
   * @type {Object}
   * @static
   */
  ListItem.ATTRS = {
    item: {},

    index: {
      value: -1
    }
  };

  this.metal.ListItem = ListItem;
}).call(this);
'use strict';

(function () {
	var dom = this.metal.dom;
	var ListBase = this.metal.List;


	/**
  * List component.
  */

	var List = function (_ListBase) {
		babelHelpers.inherits(List, _ListBase);

		/**
   * @inheritDoc
   */

		function List(opt_config) {
			babelHelpers.classCallCheck(this, List);
			return babelHelpers.possibleConstructorReturn(this, _ListBase.call(this, opt_config));
		}

		/**
   * Handles click event on the list. The function fires an
   * {@code itemSelected} event.
   * @param {!Event} event The native click event
   */


		List.prototype.handleClick = function handleClick(event) {
			var target = event.target;
			while (target) {
				if (dom.match(target, '.listitem')) {
					break;
				}
				target = target.parentNode;
			}
			this.emit('itemSelected', target);
		};

		return List;
	}(ListBase);

	/**
  * Default list elementClasses.
  * @default list
  * @type {string}
  * @static
  */


	List.prototype.registerMetalComponent && List.prototype.registerMetalComponent(List, 'List')
	List.ELEMENT_CLASSES = 'list';

	/**
  * List attributes definition.
  * @type {!Object}
  * @static
  */
	List.ATTRS = {
		/**
   * The list items. Each is represented by an object that can have the following keys:
   *   - textPrimary: The item's main content.
   *   - textSecondary: (Optional) The item's help content.
   *   - icons: (Optional) A list of icon css classes to render on the right side.
   *   - iconsHtml: (Optional) A list of icon css classes to render on the right side.
   *   - avatar: (Optional) An object that specifies the avatar's content and, optionally, a css
   *       class it should use.
   * @type {!Array<!Object>}
   * @default []
   */
		items: {
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		},

		/**
   * The list items as HTML to be added directly to the list.
   * @type {string}
   */
		itemsHtml: {}
	};

	this.metal.List = List;
}).call(this);
'use strict';

(function () {
	var core = this.metal.metal;
	var debounce = this.metal.debounce;
	var dom = this.metal.dom;
	var Promise = this.metalNamed.Promise.CancellablePromise;
	var Align = this.metalNamed.position.Align;
	var AutocompleteBase = this.metal.AutocompleteBase;
	var SoyRenderer = this.metalNamed.soy.SoyRenderer;


	/*
  * Autocomplete component.
  */

	var Autocomplete = function (_AutocompleteBase) {
		babelHelpers.inherits(Autocomplete, _AutocompleteBase);

		function Autocomplete() {
			babelHelpers.classCallCheck(this, Autocomplete);
			return babelHelpers.possibleConstructorReturn(this, _AutocompleteBase.apply(this, arguments));
		}

		/**
   * @inheritDoc
   */

		Autocomplete.prototype.attached = function attached() {
			_AutocompleteBase.prototype.attached.call(this);
			this.on('click', function (event) {
				return event.stopPropagation();
			});
			this.eventHandler_.add(dom.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
			this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
			this.eventHandler_.add(dom.on(window, 'resize', debounce(this.handleWindowResize_.bind(this), 100)));
			if (this.visible) {
				this.align();
			}
		};

		/**
   * Aligns main element to the input element.
   */


		Autocomplete.prototype.align = function align() {
			this.element.style.width = this.inputElement.offsetWidth + 'px';
			var position = Align.align(this.element, this.inputElement, Align.Bottom);

			dom.removeClasses(this.element, this.positionCss_);
			switch (position) {
				case Align.Top:
				case Align.TopLeft:
				case Align.TopRight:
					this.positionCss_ = 'autocomplete-top';
					break;
				case Align.Bottom:
				case Align.BottomLeft:
				case Align.BottomRight:
					this.positionCss_ = 'autocomplete-bottom';
					break;
				default:
					this.positionCss_ = null;

			}
			dom.addClasses(this.element, this.positionCss_);
		};

		/**
   * Returns the `List` component being used to render the matched items.
   * @return {!List}
   */


		Autocomplete.prototype.getList = function getList() {
			return this.components[this.id + '-list'];
		};

		/**
   * Handles document click in order to hide autocomplete. If input element is
   * focused autocomplete will not hide.
   * @param {!Event} event
   */


		Autocomplete.prototype.handleDocClick_ = function handleDocClick_() {
			if (document.activeElement === this.inputElement) {
				return;
			}
			this.visible = false;
		};

		/**
   * Handles input focus.
   * @param {!Event} event
   */


		Autocomplete.prototype.handleInputFocus_ = function handleInputFocus_() {
			this.request(this.inputElement.value);
		};

		/**
   * Handles window resize events. Realigns the autocomplete results list to
   * the input field.
   */


		Autocomplete.prototype.handleWindowResize_ = function handleWindowResize_() {
			if (this.visible) {
				this.align();
			}
		};

		/**
   * @inheritDoc
   */


		Autocomplete.prototype.request = function request(query) {
			var self = this;
			return _AutocompleteBase.prototype.request.call(this, query).then(function (data) {
				if (data) {
					data.forEach(self.assertItemObjectStructure_);
					self.getList().items = data;
				}
				self.visible = !!(data && data.length > 0);
			});
		};

		/**
   * Emits a `select` event with the information about the selected item and
   * hides the element.
   * @param {!Element} item The list selected item.
   * @protected
   */


		Autocomplete.prototype.onListItemSelected_ = function onListItemSelected_(item) {
			var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
			this.emit('select', this.getList().items[selectedIndex]);
			this.visible = false;
		};

		/**
   * Synchronization logic for `visible` attribute.
   * @param {boolean} visible
   */


		Autocomplete.prototype.syncVisible = function syncVisible(visible) {
			_AutocompleteBase.prototype.syncVisible.call(this, visible);

			if (visible) {
				this.align();
			}
		};

		/**
   * Asserts that formatted data is valid. Throws error if item is not in the
   * valid syntax.
   * @param {*} item
   * @protected
   */


		Autocomplete.prototype.assertItemObjectStructure_ = function assertItemObjectStructure_(item) {
			if (!core.isObject(item)) {
				throw new Promise.CancellationError('Autocomplete item must be an object');
			}
			if (!item.hasOwnProperty('textPrimary')) {
				throw new Promise.CancellationError('Autocomplete item must be an object with \'textPrimary\' key');
			}
		};

		return Autocomplete;
	}(AutocompleteBase);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	Autocomplete.prototype.registerMetalComponent && Autocomplete.prototype.registerMetalComponent(Autocomplete, 'Autocomplete')
	Autocomplete.ATTRS = {
		/**
   * Function that converts a given item to the format that should be used by
   * the autocomplete.
   * @type {!function()}
   */
		format: {
			value: function value(item) {
				return core.isString(item) ? {
					textPrimary: item
				} : item;
			}
		}
	};

	/**
  * The class that will be used as this component's renderer.
  * @type {!Function}
  * @static
  */
	Autocomplete.RENDERER = SoyRenderer;

	this.metal.Autocomplete = Autocomplete;
}).call(this);
'use strict';

(function () {
  var Autocomplete = this.metal.Autocomplete;
  var AutocompleteBase = this.metal.AutocompleteBase;
  this.metal.autocomplete = Autocomplete;
  this.metalNamed.autocomplete = {};
  this.metalNamed.autocomplete.Autocomplete = Autocomplete;
  this.metalNamed.autocomplete.AutocompleteBase = AutocompleteBase;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from ButtonGroup.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.ButtonGroup.
   */

  if (typeof Templates.ButtonGroup == 'undefined') {
    Templates.ButtonGroup = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.ButtonGroup.render = function (opt_data, opt_ignored, opt_ijData) {
    var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="btn-group component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">';
    var buttonList8 = opt_data.buttons;
    var buttonListLen8 = buttonList8.length;
    for (var buttonIndex8 = 0; buttonIndex8 < buttonListLen8; buttonIndex8++) {
      var buttonData8 = buttonList8[buttonIndex8];
      var type__soy9 = buttonData8.type ? buttonData8.type : 'button';
      var cssClass__soy10 = buttonData8.cssClass ? buttonData8.cssClass : 'btn btn-default';
      output += '<button type="' + soy.$$escapeHtmlAttribute(type__soy9) + '" class="' + soy.$$escapeHtmlAttribute(cssClass__soy10) + soy.$$escapeHtmlAttribute(Templates.ButtonGroup.selectedClass({ label: buttonData8.label, selected: opt_data.selected }, null, opt_ijData)) + '" data-index="' + soy.$$escapeHtmlAttribute(buttonIndex8) + '" data-onclick="handleClick_"><span class="btn-group-label">' + soy.$$escapeHtml(buttonData8.label ? buttonData8.label : '') + '</span>' + (buttonData8.icon ? '<span class="' + soy.$$escapeHtmlAttribute(buttonData8.icon) + '"></span>' : '') + '</button>';
    }
    output += '</div>';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.ButtonGroup.render.soyTemplateName = 'Templates.ButtonGroup.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.ButtonGroup.selectedClass = function (opt_data, opt_ignored, opt_ijData) {
    var output = '';
    if (opt_data.selected) {
      var selectedValueList34 = opt_data.selected;
      var selectedValueListLen34 = selectedValueList34.length;
      for (var selectedValueIndex34 = 0; selectedValueIndex34 < selectedValueListLen34; selectedValueIndex34++) {
        var selectedValueData34 = selectedValueList34[selectedValueIndex34];
        output += selectedValueData34 == opt_data.label ? ' btn-group-selected' : '';
      }
    }
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.ButtonGroup.selectedClass.soyTemplateName = 'Templates.ButtonGroup.selectedClass';
  }

  Templates.ButtonGroup.render.params = ["buttons", "id"];
  Templates.ButtonGroup.selectedClass.private = true;

  var ButtonGroup = function (_Component) {
    _inherits(ButtonGroup, _Component);

    function ButtonGroup() {
      _classCallCheck(this, ButtonGroup);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return ButtonGroup;
  }(_component2.default);

  ButtonGroup.prototype.registerMetalComponent && ButtonGroup.prototype.registerMetalComponent(ButtonGroup, 'ButtonGroup')

  ButtonGroup.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('ButtonGroup');
  exports.default = ButtonGroup;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var ButtonGroupBase = this.metal.ButtonGroup;

	/**
  * Responsible for handling groups of buttons.
  */

	var ButtonGroup = function (_ButtonGroupBase) {
		babelHelpers.inherits(ButtonGroup, _ButtonGroupBase);

		/**
   * @inheritDoc
   */

		function ButtonGroup(opt_config) {
			babelHelpers.classCallCheck(this, ButtonGroup);

			var _this = babelHelpers.possibleConstructorReturn(this, _ButtonGroupBase.call(this, opt_config));

			_this.buttonElements_ = null;

			_this.on('selectedChanged', _this.defaultSelectedChanged_, true);
			return _this;
		}

		/**
   * The default behavior of the `selectedChanged` event. Adds or removes the CSS
   * class defined by `ButtonGroup.SELECTED_CLASS` to each button.
   * @param {!Object} event
   * @protected
   */


		ButtonGroup.prototype.defaultSelectedChanged_ = function defaultSelectedChanged_(event) {
			for (var i = 0; i < this.buttonElements_.length; i++) {
				if (event.newVal.indexOf(this.buttons[i].label) !== -1) {
					dom.addClasses(this.buttonElements_[i], ButtonGroup.SELECTED_CLASS);
				} else {
					dom.removeClasses(this.buttonElements_[i], ButtonGroup.SELECTED_CLASS);
				}
			}
		};

		/**
   * Handles a `click` event fired on one of the buttons. Appropriately selects
   * or deselects the clicked button.
   * @param {!Event} event
   * @protected
   */


		ButtonGroup.prototype.handleClick_ = function handleClick_(event) {
			var button = event.delegateTarget;
			var index = button.getAttribute('data-index');
			var selectedIndex = this.selected.indexOf(this.buttons[index].label);
			if (selectedIndex === -1) {
				this.selected.push(this.buttons[index].label);
				this.selected = this.selected;
			} else if (this.selected.length > this.minSelected) {
				this.selected.splice(selectedIndex, 1);
				this.selected = this.selected;
			}
		};

		/**
   * Setter function for the `selected` attribute. Checks if the minimum number
   * of buttons is selected. If not, the remaining number of buttons needed to
   * reach the minimum will be selected.
   * @param {!Object<number, boolean>|!Array<string>} selected
   * @return {!Object<number, boolean>}
   * @protected
   */


		ButtonGroup.prototype.setterSelectedFn_ = function setterSelectedFn_(selected) {
			var minSelected = Math.min(this.minSelected, this.buttons.length);
			var i = 0;
			while (selected.length < minSelected) {
				if (selected.indexOf(this.buttons[i].label) === -1) {
					selected.push(this.buttons[i].label);
				}
				i++;
			}
			return selected;
		};

		/**
   * Called whenever the `buttons` attr changes, as well as on the first
   * render. This just stores the new button elements for later use.
   */


		ButtonGroup.prototype.syncButtons = function syncButtons() {
			this.buttonElements_ = this.element.querySelectorAll('button');
		};

		return ButtonGroup;
	}(ButtonGroupBase);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	ButtonGroup.prototype.registerMetalComponent && ButtonGroup.prototype.registerMetalComponent(ButtonGroup, 'ButtonGroup')
	ButtonGroup.ATTRS = {
		/**
   * Configuration for the buttons that should be rendered in this group.
   * Each button config should be given as an object. Supported options are:
   * label, type and cssClass.
   * @type {!Array<!Object>}
   * @default []
   */
		buttons: {
			validator: function validator(val) {
				return val instanceof Array;
			},
			valueFn: function valueFn() {
				return [];
			}
		},

		/**
   * The minimum number of buttons that need to be selected at a time. If the
   * minimum number of buttons is not already initially selected, this will
   * automaticaly select the first `minSelected` buttons.
   * @type {number}
   * @default 0
   */
		minSelected: {
			validator: core.isNumber,
			value: 0,
			writeOnce: true
		},

		/**
   * An array with the labels of the buttons that should be selected.
   * @type {!Array<string>}
   */
		selected: {
			setter: 'setterSelectedFn_',
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		}
	};

	/**
  * Default element classes.
  * @type {string}
  * @static
  */
	ButtonGroup.ELEMENT_CLASSES = 'btn-group';

	/**
  * The CSS class added to selected buttons.
  * @type {string}
  * @static
  */
	ButtonGroup.SELECTED_CLASS = 'btn-group-selected';

	this.metal.ButtonGroup = ButtonGroup;
}).call(this);
'use strict';

(function () {
	var Attribute = this.metal.Attribute;
	var core = this.metal.metal;
	var dom = this.metal.dom;

	/**
  * Clipboard component.
  */

	var Clipboard = function (_Attribute) {
		babelHelpers.inherits(Clipboard, _Attribute);

		/**
   * Delegates a click event to the passed selector.
   */

		function Clipboard(opt_config) {
			babelHelpers.classCallCheck(this, Clipboard);

			var _this = babelHelpers.possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			_this.listener_ = dom.on(_this.selector, 'click', function (e) {
				return _this.initialize(e);
			});
			return _this;
		}

		/**
   * @inheritDoc
   */


		Clipboard.prototype.disposeInternal = function disposeInternal() {
			this.listener_.dispose();
			this.listener_ = null;
			if (this.clipboardAction_) {
				this.clipboardAction_.dispose();
				this.clipboardAction_ = null;
			}
		};

		/**
   * Defines a new `ClipboardAction` on each click event.
   * @param {!Event} e
   */


		Clipboard.prototype.initialize = function initialize(e) {
			if (this.clipboardAction_) {
				this.clipboardAction_ = null;
			}

			this.clipboardAction_ = new ClipboardAction({
				host: this,
				action: this.action(e.delegateTarget),
				target: this.target(e.delegateTarget),
				text: this.text(e.delegateTarget),
				trigger: e.delegateTarget
			});
		};

		return Clipboard;
	}(Attribute);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	Clipboard.prototype.registerMetalComponent && Clipboard.prototype.registerMetalComponent(Clipboard, 'Clipboard')
	Clipboard.ATTRS = {
		/**
   * A function that returns the name of the clipboard action that should be done
   * when for the given element (either 'copy' or 'cut').
   * @type {!function(!Element)}
   */
		action: {
			validator: core.isFunction,
			value: function value(delegateTarget) {
				return delegateTarget.getAttribute('data-action');
			}
		},

		/**
   * The selector for all elements that should be listened for clipboard actions.
   * @type {string}
   */
		selector: {
			value: '[data-clipboard]',
			validator: core.isString
		},

		/**
   * A function that returns an element that has the content to be copied to the
   * clipboard.
   * @type {!function(!Element)}
   */
		target: {
			validator: core.isFunction,
			value: function value(delegateTarget) {
				return document.querySelector(delegateTarget.getAttribute('data-target'));
			}
		},

		/**
   * A function that returns the text to be copied to the clipboard.
   * @type {!function(!Element)}
   */
		text: {
			validator: core.isFunction,
			value: function value(delegateTarget) {
				return delegateTarget.getAttribute('data-text');
			}
		}
	};

	/**
  * ClipboardAction component.
  */

	var ClipboardAction = function (_Attribute2) {
		babelHelpers.inherits(ClipboardAction, _Attribute2);

		/**
   * Initializes selection either from a `text` or `target` attribute.
   */

		function ClipboardAction(opt_config) {
			babelHelpers.classCallCheck(this, ClipboardAction);

			var _this2 = babelHelpers.possibleConstructorReturn(this, _Attribute2.call(this, opt_config));

			if (_this2.text) {
				_this2.selectValue();
			} else if (_this2.target) {
				_this2.selectTarget();
			}
			return _this2;
		}

		/**
   * Removes current selection and focus from `target` element.
   */


		ClipboardAction.prototype.clearSelection = function clearSelection() {
			if (this.target) {
				this.target.blur();
			}

			window.getSelection().removeAllRanges();
		};

		/**
   * Executes the copy operation based on the current selection.
   */


		ClipboardAction.prototype.copyText = function copyText() {
			var succeeded = void 0;

			try {
				succeeded = document.execCommand(this.action);
			} catch (err) {
				succeeded = false;
			}

			this.handleResult(succeeded);
		};

		/**
   * @inheritDoc
   */


		ClipboardAction.prototype.disposeInternal = function disposeInternal() {
			this.removeFakeElement();
			_Attribute2.prototype.disposeInternal.call(this);
		};

		/**
   * Emits an event based on the copy operation result.
   * @param {boolean} succeeded
   */


		ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
			if (succeeded) {
				this.host.emit('success', {
					action: this.action,
					text: this.selectedText,
					trigger: this.trigger,
					clearSelection: this.clearSelection.bind(this)
				});
			} else {
				this.host.emit('error', {
					action: this.action,
					trigger: this.trigger,
					clearSelection: this.clearSelection.bind(this)
				});
			}
		};

		/**
   * Removes the fake element that was added to the document, as well as its
   * listener.
   */


		ClipboardAction.prototype.removeFakeElement = function removeFakeElement() {
			if (this.fake) {
				dom.exitDocument(this.fake);
			}

			if (this.removeFakeHandler) {
				this.removeFakeHandler.removeListener();
			}
		};

		/**
   * Selects the content from element passed on `target` attribute.
   */


		ClipboardAction.prototype.selectTarget = function selectTarget() {
			if (this.target.nodeName === 'INPUT' || this.target.nodeName === 'TEXTAREA') {
				this.target.select();
				this.selectedText = this.target.value;
			} else {
				var range = document.createRange();
				var selection = window.getSelection();

				range.selectNodeContents(this.target);
				selection.addRange(range);
				this.selectedText = selection.toString();
			}

			this.copyText();
		};

		/**
   * Selects the content from value passed on `text` attribute.
   */


		ClipboardAction.prototype.selectValue = function selectValue() {
			this.removeFakeElement();
			this.removeFakeHandler = dom.once(document, 'click', this.removeFakeElement.bind(this));

			this.fake = document.createElement('textarea');
			this.fake.style.position = 'fixed';
			this.fake.style.left = '-9999px';
			this.fake.setAttribute('readonly', '');
			this.fake.value = this.text;
			this.selectedText = this.text;

			dom.enterDocument(this.fake);

			this.fake.select();
			this.copyText();
		};

		return ClipboardAction;
	}(Attribute);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	ClipboardAction.prototype.registerMetalComponent && ClipboardAction.prototype.registerMetalComponent(ClipboardAction, 'ClipboardAction')
	ClipboardAction.ATTRS = {
		/**
   * The action to be performed (either 'copy' or 'cut').
   * @type {string}
   * @default 'copy'
   */
		action: {
			value: 'copy',
			validator: function validator(val) {
				return val === 'copy' || val === 'cut';
			}
		},

		/**
   * A reference to the `Clipboard` base class.
   * @type {!Clipboard}
   */
		host: {
			validator: function validator(val) {
				return val instanceof Clipboard;
			}
		},

		/**
   * The text that is current selected.
   * @type {string}
   */
		selectedText: {
			validator: core.isString
		},

		/**
   * The ID of an element that will be have its content copied.
   * @type {Element}
   */
		target: {
			validator: core.isElement
		},

		/**
   * The text to be copied.
   * @type {string}
   */
		text: {
			validator: core.isString
		},

		/**
   * The element that when clicked initiates a clipboard action.
   * @type {!Element}
   */
		trigger: {
			validator: core.isElement
		}
	};

	this.metal.Clipboard = Clipboard;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Dropdown.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Dropdown.
   */

  if (typeof Templates.Dropdown == 'undefined') {
    Templates.Dropdown = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Dropdown.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="dropdown component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + soy.$$escapeHtmlAttribute(opt_data.expanded ? ' open' : '') + '">' + (opt_data.header ? soy.$$escapeHtml(opt_data.header) : '') + Templates.Dropdown.body(opt_data, null, opt_ijData) + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Dropdown.render.soyTemplateName = 'Templates.Dropdown.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Dropdown.body = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="dropdown-menu">' + (opt_data.body ? soy.$$escapeHtml(opt_data.body) : '') + '</ul>');
  };
  if (goog.DEBUG) {
    Templates.Dropdown.body.soyTemplateName = 'Templates.Dropdown.body';
  }

  Templates.Dropdown.render.params = ["header", "id"];
  Templates.Dropdown.body.params = ["body", "id"];

  var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
      _classCallCheck(this, Dropdown);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Dropdown;
  }(_component2.default);

  Dropdown.prototype.registerMetalComponent && Dropdown.prototype.registerMetalComponent(Dropdown, 'Dropdown')

  Dropdown.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Dropdown');
  exports.default = Dropdown;
});
'use strict';

(function () {
	var core = this.metalNamed.metal.core;
	var object = this.metalNamed.metal.object;
	var dom = this.metal.dom;
	var Align = this.metalNamed.position.Align;
	var DropdownBase = this.metal.Dropdown;
	var EventHandler = this.metalNamed.events.EventHandler;

	/**
  * Dropdown component.
  */

	var Dropdown = function (_DropdownBase) {
		babelHelpers.inherits(Dropdown, _DropdownBase);

		/**
   * @inheritDoc
   */

		function Dropdown(opt_config) {
			babelHelpers.classCallCheck(this, Dropdown);

			var _this = babelHelpers.possibleConstructorReturn(this, _DropdownBase.call(this, opt_config));

			_this.eventHandler_ = new EventHandler();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Dropdown.prototype.attached = function attached() {
			_DropdownBase.prototype.attached.call(this);
			this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
		};

		/**
   * @inheritDoc
   */


		Dropdown.prototype.detached = function detached() {
			_DropdownBase.prototype.detached.call(this);
			this.eventHandler_.removeAllListeners();
		};

		/**
   * Closes the dropdown.
   */


		Dropdown.prototype.close = function close() {
			this.expanded = false;
		};

		/**
   * Checks if the dropdown is currently open.
   * @return {boolean}
   */


		Dropdown.prototype.isOpen = function isOpen() {
			return this.expanded;
		};

		/**
   * Handles document click in order to hide menu.
   * @param {!Event} event
   * @protected
   */


		Dropdown.prototype.handleDocClick_ = function handleDocClick_(event) {
			if (this.element.contains(event.target)) {
				return;
			}
			this.close();
		};

		/**
   * Opens the dropdown.
   */


		Dropdown.prototype.open = function open() {
			this.expanded = true;
		};

		/**
   * The setter function for the `classMap` attribute.
   * @param {Object} val
   * @return {!Object}
   * @protected
   */


		Dropdown.prototype.setterClassMapFn_ = function setterClassMapFn_(val) {
			return object.mixin(this.valueClassMapFn_(), val);
		};

		/**
   * The setter function for the `position` attribute. Converts the supported
   * string positions into the appropriate `Align` position constants.
   * @param {string|number} val
   * @return {number}
   * @protected
   */


		Dropdown.prototype.setterPositionFn_ = function setterPositionFn_(val) {
			if (core.isNumber(val)) {
				return val;
			}
			return val.toLowerCase() === 'up' ? Align.TopLeft : Align.BottomLeft;
		};

		/**
   * Synchronization logic for `expanded` attribute.
   * @param {boolean} expanded
   */


		Dropdown.prototype.syncExpanded = function syncExpanded(expanded) {
			if (expanded) {
				dom.addClasses(this.element, 'open');
				if (this.alignElementSelector) {
					var alignElement = this.element.querySelector(this.alignElementSelector);
					if (alignElement) {
						var bodyElement = this.getRenderer().getSurfaceElement('body');
						var position = Align.align(bodyElement, alignElement, this.position);
						this.updatePositionCss_(position);
					}
				}
			} else {
				dom.removeClasses(this.element, 'open');
			}
		};

		/**
   * Synchronization logic for `position` attribute.
   * @param {string} position
   */


		Dropdown.prototype.syncPosition = function syncPosition(position) {
			this.updatePositionCss_(position);
		};

		/**
   * Toggles the dropdown, closing it when open or opening it when closed.
   */


		Dropdown.prototype.toggle = function toggle() {
			this.expanded = !this.expanded;
		};

		/**
   * Updates the component's css class according to the position it's aligned to.
   * @param {string} position
   * @protected
   */


		Dropdown.prototype.updatePositionCss_ = function updatePositionCss_(position) {
			var element = this.element;
			if (this.positionClassOnMenu) {
				element = element.querySelector('.dropdown-menu');
			}
			if (this.alignedPosition_) {
				dom.removeClasses(element, this.classMap[this.alignedPosition_]);
			}
			dom.addClasses(element, this.classMap[position]);
			this.alignedPosition_ = position;
		};

		/**
   * Validator for the `position` attribute.
   * @param {string|number} position
   * @return {boolean}
   * @protected
   */


		Dropdown.prototype.validatePosition_ = function validatePosition_(position) {
			if (Align.isValidPosition(position)) {
				return true;
			}
			switch (position.toLowerCase()) {
				case 'up':
				case 'down':
					return true;
				default:
					return false;
			}
		};

		/**
   * Gets the default value for the `body` attribute. Retrieves existing
   * html for the body from the element, if there is any.
   * @return {?string}
   * @protected
   */


		Dropdown.prototype.valueBodyFn_ = function valueBodyFn_() {
			var dropdownMenu = this.element && this.element.querySelector('.dropdown-menu');
			return dropdownMenu ? dropdownMenu.innerHTML : '';
		};

		/**
   * Gets the default value for the `classMap` attribute.
   * @return {!Object}
   * @protected
   */


		Dropdown.prototype.valueClassMapFn_ = function valueClassMapFn_() {
			var _ref;

			return _ref = {}, babelHelpers.defineProperty(_ref, Align.TopLeft, 'dropup'), babelHelpers.defineProperty(_ref, Align.TopCenter, 'dropup'), babelHelpers.defineProperty(_ref, Align.TopRight, 'dropup'), babelHelpers.defineProperty(_ref, Align.BottomLeft, 'dropdown'), babelHelpers.defineProperty(_ref, Align.BottomCenter, 'dropdown'), babelHelpers.defineProperty(_ref, Align.BottomRight, 'dropdown'), babelHelpers.defineProperty(_ref, Align.RightCenter, 'dropright'), babelHelpers.defineProperty(_ref, Align.LeftCenter, 'dropleft'), _ref;
		};

		/**
   * Gets the default value for the `header` attribute. Retrieves existing
   * html for the header from the element, if there is any.
   * @return {?string}
   * @protected
   */


		Dropdown.prototype.valueHeaderFn_ = function valueHeaderFn_() {
			if (this.element) {
				var wrapper = document.createElement('div');
				for (var i = 0; i < this.element.childNodes.length; i++) {
					if (dom.hasClass(this.element.childNodes[i], 'dropdown-menu')) {
						break;
					}
					wrapper.appendChild(this.element.childNodes[i].cloneNode(true));
				}
				return wrapper.innerHTML;
			}
			return '';
		};

		return Dropdown;
	}(DropdownBase);

	/**
  * Attrbutes definition.
  * @type {!Object}
  * @static
  */


	Dropdown.prototype.registerMetalComponent && Dropdown.prototype.registerMetalComponent(Dropdown, 'Dropdown')
	Dropdown.ATTRS = {
		/**
   * Optional selector for finding the element that the dropdown should be
   * aligned to. If given, the dropdown will automatically find the best position
   * to align, when the specified position doesn't work. Otherwise it will
   * always just follow the given position, even if it's not ideal.
   * @type {string}
   */
		alignElementSelector: {
			validator: core.isString
		},

		/**
   * The dropdown's body content.
   * @type {string}
   */
		body: {
			isHtml: true,
			valueFn: 'valueBodyFn_'
		},

		/**
   * A map from `Align` position constants to the CSS class that should be
   * added to the dropdown when it's aligned in that position.
   * @type {!Object}
   */
		classMap: {
			setter: 'setterClassMapFn_',
			validator: core.isObject,
			valueFn: 'valueClassMapFn_'
		},

		/**
   * The dropdown's header content.
   * @type {string}
   */
		header: {
			isHtml: true,
			valueFn: 'valueHeaderFn_'
		},

		/**
   * Flag indicating if the dropdown is expanded (open) or not.
   * @type {boolean}
   * @default false
   */
		expanded: {
			value: false
		},

		/**
   * The position of the dropdown (either 'up', 'down' or any of the position
   * constants available in `Align`).
   * @type {string|number}
   * @default Align.BottomLeft
   */
		position: {
			setter: 'setterPositionFn_',
			value: Align.BottomLeft,
			validator: 'validatePosition_'
		},

		/**
   * Flag indicating if the position class (specified by `classMap` attribute)
   * should be added on the "dropdown-menu" element, instead of the main element.
   * @type {boolean}
   */
		positionClassOnMenu: {
			value: false
		}
	};

	/**
  * Default dropdown elementClasses.
  * @default dropdown
  * @type {string}
  * @static
  */
	Dropdown.ELEMENT_CLASSES = 'dropdown';

	this.metal.Dropdown = Dropdown;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Modal.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Modal.
   */

  if (typeof Templates.Modal == 'undefined') {
    Templates.Modal = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Modal.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="modal component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="' + soy.$$escapeHtmlAttribute(opt_data.role ? opt_data.role : 'dialog') + '" aria-labelledby="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header"><div class="modal-dialog" tabindex="0"><div class="modal-content">' + Templates.Modal.header(opt_data, null, opt_ijData) + Templates.Modal.body(opt_data, null, opt_ijData) + Templates.Modal.footer(opt_data, null, opt_ijData) + '</div></div></div>');
  };
  if (goog.DEBUG) {
    Templates.Modal.render.soyTemplateName = 'Templates.Modal.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Modal.body = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<section id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body">' + (opt_data.body ? soy.$$escapeHtml(opt_data.body) : '') + '</section>');
  };
  if (goog.DEBUG) {
    Templates.Modal.body.soyTemplateName = 'Templates.Modal.body';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Modal.footer = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<footer id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer" class="modal-footer">' + (opt_data.footer ? soy.$$escapeHtml(opt_data.footer) : '') + '</footer>');
  };
  if (goog.DEBUG) {
    Templates.Modal.footer.soyTemplateName = 'Templates.Modal.footer';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Modal.header = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<header id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header" class="modal-header">' + (opt_data.header ? '<button type="button" class="close" data-onclick="hide" aria-label="Close"><span aria-hidden="true">×</span></button>' + soy.$$escapeHtml(opt_data.header) : '') + '</header>');
  };
  if (goog.DEBUG) {
    Templates.Modal.header.soyTemplateName = 'Templates.Modal.header';
  }

  Templates.Modal.render.params = ["id", "role"];
  Templates.Modal.body.params = ["id", "body"];
  Templates.Modal.footer.params = ["footer", "id"];
  Templates.Modal.header.params = ["header", "id"];

  var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal() {
      _classCallCheck(this, Modal);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Modal;
  }(_component2.default);

  Modal.prototype.registerMetalComponent && Modal.prototype.registerMetalComponent(Modal, 'Modal')

  Modal.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Modal');
  exports.default = Modal;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var EventHandler = this.metalNamed.events.EventHandler;
	var ModalBase = this.metal.Modal;

	/**
  * Modal component.
  */

	var Modal = function (_ModalBase) {
		babelHelpers.inherits(Modal, _ModalBase);

		/**
   * @inheritDoc
   */

		function Modal(opt_config) {
			babelHelpers.classCallCheck(this, Modal);

			var _this = babelHelpers.possibleConstructorReturn(this, _ModalBase.call(this, opt_config));

			_this.eventHandler_ = new EventHandler();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Modal.prototype.attached = function attached() {
			this.autoFocus_(this.autoFocus);
		};

		/**
   * Automatically focuses the element specified by the given selector.
   * @param {boolean|string} autoFocusSelector The selector, or false if no
   *   element should be automatically focused.
   * @protected
   */


		Modal.prototype.autoFocus_ = function autoFocus_(autoFocusSelector) {
			if (this.inDocument && this.visible && autoFocusSelector) {
				var element = this.element.querySelector(autoFocusSelector);
				if (element) {
					element.focus();
				}
			}
		};

		/**
   * @inheritDoc
   */


		Modal.prototype.detached = function detached() {
			_ModalBase.prototype.detached.call(this);
			this.eventHandler_.removeAllListeners();
		};

		/**
   * @inheritDoc
   */


		Modal.prototype.disposeInternal = function disposeInternal() {
			dom.exitDocument(this.overlayElement);
			this.unrestrictFocus_();
			_ModalBase.prototype.disposeInternal.call(this);
		};

		/**
   * Handles a `focus` event on the document. If the focused element is
   * outside the modal and an overlay is being used, focuses the modal back.
   * @param {!Event} event
   * @protected
   */


		Modal.prototype.handleDocumentFocus_ = function handleDocumentFocus_(event) {
			if (this.overlay && !this.element.contains(event.target)) {
				this.autoFocus_('.modal-dialog');
			}
		};

		/**
   * Handles document click in order to close the alert.
   * @param {!Event} event
   * @protected
   */


		Modal.prototype.handleKeyup_ = function handleKeyup_(event) {
			if (event.keyCode === 27) {
				this.hide();
			}
		};

		/**
   * Hides the modal, setting its `visible` attribute to false.
   */


		Modal.prototype.hide = function hide() {
			this.visible = false;
		};

		/**
   * Restricts focus to the modal while it's visible.
   * @protected
   */


		Modal.prototype.restrictFocus_ = function restrictFocus_() {
			this.restrictFocusHandle_ = dom.on(document, 'focus', this.handleDocumentFocus_.bind(this), true);
		};

		/**
   * Shifts the focus back to the last element that had been focused before the
   * modal was shown.
   * @protected
   */


		Modal.prototype.shiftFocusBack_ = function shiftFocusBack_() {
			if (this.lastFocusedElement_) {
				this.lastFocusedElement_.focus();
				this.lastFocusedElement_ = null;
			}
		};

		/**
   * Shows the modal, setting its `visible` attribute to true.
   */


		Modal.prototype.show = function show() {
			this.visible = true;
		};

		/**
   * Syncs the component according to the value of the `hideOnEscape` attribute.
   * @param {boolean} hideOnEscape
   */


		Modal.prototype.syncHideOnEscape = function syncHideOnEscape(hideOnEscape) {
			if (hideOnEscape) {
				this.eventHandler_.add(dom.on(document, 'keyup', this.handleKeyup_.bind(this)));
			} else {
				this.eventHandler_.removeAllListeners();
			}
		};

		/**
   * Syncs the component according to the value of the `overlay` attribute.
   * @param {boolean} overlay
   */


		Modal.prototype.syncOverlay = function syncOverlay(overlay) {
			var willShowOverlay = overlay && this.visible;
			dom[willShowOverlay ? 'enterDocument' : 'exitDocument'](this.overlayElement);
		};

		/**
   * Syncs the component according to the value of the `visible` attribute.
   * @param {boolean} visible
   */


		Modal.prototype.syncVisible = function syncVisible(visible) {
			this.element.style.display = visible ? 'block' : '';
			this.syncOverlay(this.overlay);
			if (this.visible) {
				this.lastFocusedElement_ = document.activeElement;
				this.autoFocus_(this.autoFocus);
				this.restrictFocus_();
			} else {
				this.unrestrictFocus_();
				this.shiftFocusBack_();
			}
		};

		/**
   * Removes the handler that restricts focus to elements inside the modal.
   * @protected
   */


		Modal.prototype.unrestrictFocus_ = function unrestrictFocus_() {
			if (this.restrictFocusHandle_) {
				this.restrictFocusHandle_.removeListener();
			}
		};

		/**
   * Defines the default value for the `overlayElement` attribute.
   * @protected
   */


		Modal.prototype.valueOverlayElementFn_ = function valueOverlayElementFn_() {
			return dom.buildFragment('<div class="modal-backdrop fade in"></div>').firstChild;
		};

		return Modal;
	}(ModalBase);

	/**
  * Default modal elementClasses.
  * @default modal
  * @type {string}
  * @static
  */


	Modal.prototype.registerMetalComponent && Modal.prototype.registerMetalComponent(Modal, 'Modal')
	Modal.ELEMENT_CLASSES = 'modal';

	Modal.ATTRS = {
		/**
   * A selector for the element that should be automatically focused when the modal
   * becomes visible, or `false` if no auto focus should happen. Defaults to the
   * modal's close button.
   * @type {boolean|string}
   */
		autoFocus: {
			validator: function validator(val) {
				return val === false || core.isString(val);
			},
			value: '.close'
		},

		/**
   * Content to be placed inside modal body.
   * @type {string|SanitizedHtml}
   */
		body: {
			isHtml: true
		},

		/**
   * Content to be placed inside modal footer.
   * @type {string|SanitizedHtml}
   */
		footer: {
			isHtml: true
		},

		/**
   * Content to be placed inside modal header.
   * @type {string|SanitizedHtml}
   */
		header: {
			isHtml: true
		},

		/**
   * Whether modal should hide on esc.
   * @type {boolean}
   * @default true
   */
		hideOnEscape: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * Whether overlay should be visible when modal is visible.
   * @type {boolean}
   * @default true
   */
		overlay: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * Element to be used as overlay.
   * @type {Element}
   */
		overlayElement: {
			initOnly: true,
			valueFn: 'valueOverlayElementFn_'
		},

		/**
   * The ARIA role to be used for this modal.
   * @type {string}
   * @default 'dialog'
   */
		role: {
			validator: core.isString,
			value: 'dialog'
		}
	};

	this.metal.Modal = Modal;
}).call(this);
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var Align = this.metalNamed.position.Align;
	var Component = this.metal.component;
	var EventHandler = this.metalNamed.events.EventHandler;
	var SoyRenderer = this.metalNamed.soy.SoyRenderer;

	/**
  * The base class to be shared between components that have tooltip behavior.
  * This helps decouple this behavior logic from the UI, which may be different
  * between components. The Tooltip component itself extends from this, as does
  * the crystal Popover component, which can be accessed at metal/crystal-popover.
  */

	var TooltipBase = function (_Component) {
		babelHelpers.inherits(TooltipBase, _Component);

		/**
   * @inheritDoc
   */

		function TooltipBase(opt_config) {
			babelHelpers.classCallCheck(this, TooltipBase);

			var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, opt_config));

			_this.eventHandler_ = new EventHandler();
			return _this;
		}

		/**
   * @inheritDoc
   */


		TooltipBase.prototype.attached = function attached() {
			this.align();
			this.syncTriggerEvents(this.triggerEvents);
		};

		/**
   * @inheritDoc
   */


		TooltipBase.prototype.detached = function detached() {
			this.eventHandler_.removeAllListeners();
		};

		/**
   * @inheritDoc
   */


		TooltipBase.prototype.disposeInternal = function disposeInternal() {
			_Component.prototype.disposeInternal.call(this);
			clearTimeout(this.delay_);
		};

		/**
   * Aligns the tooltip with the best region around alignElement. The best
   * region is defined by clockwise rotation starting from the specified
   * `position`. The element is always aligned in the middle of alignElement
   * axis.
   * @param {Element=} opt_alignElement Optional element to align with.
   */


		TooltipBase.prototype.align = function align(opt_alignElement) {
			this.syncAlignElement(opt_alignElement || this.alignElement);
		};

		/**
   * @param {!function()} fn
   * @param {number} delay
   * @private
   */


		TooltipBase.prototype.callAsync_ = function callAsync_(fn, delay) {
			clearTimeout(this.delay_);
			this.delay_ = setTimeout(fn.bind(this), delay);
		};

		/**
   * Handles hide event triggered by `events`.
   * @param {!Event} event
   * @protected
   */


		TooltipBase.prototype.handleHide = function handleHide(event) {
			var delegateTarget = event.delegateTarget;
			var interactingWithDifferentTarget = delegateTarget && delegateTarget !== this.alignElement;
			this.callAsync_(function () {
				if (this.locked_) {
					return;
				}
				if (interactingWithDifferentTarget) {
					this.alignElement = delegateTarget;
				} else {
					this.visible = false;
					this.syncVisible(false);
				}
			}, this.delay[1]);
		};

		/**
   * Handles show event triggered by `events`.
   * @param {!Event} event
   * @protected
   */


		TooltipBase.prototype.handleShow = function handleShow(event) {
			var delegateTarget = event.delegateTarget;
			_Component.prototype.syncVisible.call(this, true);
			this.callAsync_(function () {
				this.alignElement = delegateTarget;
				this.visible = true;
			}, this.delay[0]);
		};

		/**
   * Handles toggle event triggered by `events`.
   * @param {!Event} event
   * @protected
   */


		TooltipBase.prototype.handleToggle = function handleToggle(event) {
			if (this.visible) {
				this.handleHide(event);
			} else {
				this.handleShow(event);
			}
		};

		/**
   * Locks tooltip visibility.
   * @param {!Event} event
   */


		TooltipBase.prototype.lock = function lock() {
			this.locked_ = true;
		};

		/**
   * Unlocks tooltip visibility.
   * @param {!Event} event
   */


		TooltipBase.prototype.unlock = function unlock(event) {
			this.locked_ = false;
			this.handleHide(event);
		};

		/**
   * Attribute synchronization logic for `alignElement` attribute.
   * @param {Element} alignElement
   * @param {Element} prevAlignElement
   */


		TooltipBase.prototype.syncAlignElement = function syncAlignElement(alignElement, prevAlignElement) {
			if (prevAlignElement) {
				alignElement.removeAttribute('aria-describedby');
			}
			if (alignElement) {
				var dataTitle = alignElement.getAttribute('data-title');
				if (dataTitle) {
					this.title = dataTitle;
				}
				if (this.visible) {
					alignElement.setAttribute('aria-describedby', this.id);
				} else {
					alignElement.removeAttribute('aria-describedby');
				}
				if (this.inDocument) {
					var finalPosition = TooltipBase.Align.align(this.element, alignElement, this.position);
					this.updatePositionCSS(finalPosition);
				}
			}
		};

		/**
   * Attribute synchronization logic for `position` attribute.
   */


		TooltipBase.prototype.syncPosition = function syncPosition() {
			this.syncAlignElement(this.alignElement);
		};

		/**
   * Attribute synchronization logic for `selector` attribute.
   */


		TooltipBase.prototype.syncSelector = function syncSelector() {
			this.syncTriggerEvents(this.triggerEvents);
		};

		/**
   * Attribute synchronization logic for `triggerEvents` attribute.
   * @param {!Array<string>} triggerEvents
   */


		TooltipBase.prototype.syncTriggerEvents = function syncTriggerEvents(triggerEvents) {
			if (!this.inDocument) {
				return;
			}
			this.eventHandler_.removeAllListeners();
			var selector = this.selector;
			if (!selector) {
				return;
			}

			this.eventHandler_.add(this.on('mouseenter', this.lock), this.on('mouseleave', this.unlock));

			if (triggerEvents[0] === triggerEvents[1]) {
				this.eventHandler_.add(dom.delegate(document, triggerEvents[0], selector, this.handleToggle.bind(this)));
			} else {
				this.eventHandler_.add(dom.delegate(document, triggerEvents[0], selector, this.handleShow.bind(this)), dom.delegate(document, triggerEvents[1], selector, this.handleHide.bind(this)));
			}
		};

		/**
   * Attribute synchronization logic for `visible` attribute. Realigns the tooltip.
   */


		TooltipBase.prototype.syncVisible = function syncVisible() {
			this.align();
		};

		/**
   * Updates the css class for the current position.
   * @param {number} position
   */


		TooltipBase.prototype.updatePositionCSS = function updatePositionCSS(position) {
			dom.removeClasses(this.element, TooltipBase.PositionClasses.join(' '));
			dom.addClasses(this.element, TooltipBase.PositionToClass[position]);
		};

		return TooltipBase;
	}(Component);

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */


	TooltipBase.prototype.registerMetalComponent && TooltipBase.prototype.registerMetalComponent(TooltipBase, 'TooltipBase')
	TooltipBase.Align = Align;

	/**
  * TooltipBase attrbutes definition.
  * @type {!Object}
  * @static
  */
	TooltipBase.ATTRS = {
		/**
   * Element to align tooltip with.
   * @type {Element}
   */
		alignElement: {
			setter: dom.toElement
		},

		/**
   * Delay showing and hiding the tooltip (ms).
   * @type {!Array<number>}
   * @default [ 500, 250 ]
   */
		delay: {
			validator: Array.isArray,
			value: [500, 250]
		},

		/**
   * Trigger events used to bind handlers to show and hide tooltip.
   * @type {!Array<string>}
   * @default ['mouseenter', 'mouseleave']
   */
		triggerEvents: {
			validator: Array.isArray,
			value: ['mouseenter', 'mouseleave']
		},

		/**
   * If a selector is provided, tooltip objects will be delegated to the
   * specified targets by setting the `alignElement`.
   * @type {?string}
   */
		selector: {
			validator: core.isString
		},

		/**
   * The position to try alignment. If not possible the best position will be
   * found.
   * @type {Align.Top|Align.Right|Align.Bottom|Align.Left}
   * @default Align.Bottom
   */
		position: {
			validator: TooltipBase.Align.isValidPosition,
			value: TooltipBase.Align.Bottom
		},

		/**
   * Content to be placed inside tooltip.
   * @type {string}
   */
		title: {}
	};

	/**
  * CSS classes used for each align position.
  * @type {!Array}
  * @static
  */
	TooltipBase.PositionClasses = ['top', 'right', 'bottom', 'left'];

	/**
  * A map from each `Align` position to the appropriate tooltip class.
  * @type {!Array}
  * @static
  */
	TooltipBase.PositionToClass = ['top', 'top', 'right', 'bottom', 'bottom', 'bottom', 'left', 'top'];

	TooltipBase.RENDERER = SoyRenderer;

	this.metal.TooltipBase = TooltipBase;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Tooltip.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Tooltip.
   */

  if (typeof Templates.Tooltip == 'undefined') {
    Templates.Tooltip = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Tooltip.render = function (opt_data, opt_ignored, opt_ijData) {
    var output = '';
    var positionClasses__soy3 = ['top', 'right', 'bottom', 'left'];
    var positionClass__soy4 = opt_data.position != null ? positionClasses__soy3[opt_data.position] : 'bottom';
    output += '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="tooltip component ' + soy.$$escapeHtmlAttribute(positionClass__soy4) + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="tooltip"><div class="tooltip-arrow"></div>' + Templates.Tooltip.inner(opt_data, null, opt_ijData) + '</div>';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.Tooltip.render.soyTemplateName = 'Templates.Tooltip.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Tooltip.inner = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<section id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-inner" class="tooltip-inner">' + soy.$$escapeHtml(opt_data.title ? opt_data.title : '') + '</section>');
  };
  if (goog.DEBUG) {
    Templates.Tooltip.inner.soyTemplateName = 'Templates.Tooltip.inner';
  }

  Templates.Tooltip.render.params = ["id"];
  Templates.Tooltip.inner.params = ["title", "id"];

  var Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip() {
      _classCallCheck(this, Tooltip);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Tooltip;
  }(_component2.default);

  Tooltip.prototype.registerMetalComponent && Tooltip.prototype.registerMetalComponent(Tooltip, 'Tooltip')

  Tooltip.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Tooltip');
  exports.default = Tooltip;
});
'use strict';

(function () {
  var TooltipBase = this.metal.TooltipBase;


  /**
   * Tooltip component.
   */

  var Tooltip = function (_TooltipBase) {
    babelHelpers.inherits(Tooltip, _TooltipBase);

    function Tooltip() {
      babelHelpers.classCallCheck(this, Tooltip);
      return babelHelpers.possibleConstructorReturn(this, _TooltipBase.apply(this, arguments));
    }

    /**
     * Attribute synchronization logic for `visible` attribute. Updates the
     * element's opacity, since bootstrap uses opacity instead of display
     * for tooltip visibility.
     * @param {boolean} visible
     */

    Tooltip.prototype.syncVisible = function syncVisible(visible) {
      this.element.style.opacity = visible ? 1 : '';
      _TooltipBase.prototype.syncVisible.call(this, visible);
    };

    return Tooltip;
  }(TooltipBase);

  /**
   * @inheritDoc
   * @see `Align` class.
   * @static
   */


  Tooltip.prototype.registerMetalComponent && Tooltip.prototype.registerMetalComponent(Tooltip, 'Tooltip')
  Tooltip.Align = TooltipBase.Align;

  /**
   * Default tooltip elementClasses.
   * @default tooltip
   * @type {string}
   * @static
   */
  Tooltip.ELEMENT_CLASSES = 'tooltip';

  this.metal.Tooltip = Tooltip;
  this.metalNamed.Tooltip = {};
  this.metalNamed.Tooltip.Tooltip = Tooltip;
  this.metalNamed.Tooltip.TooltipBase = TooltipBase;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Popover.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Popover.
   */

  if (typeof Templates.Popover == 'undefined') {
    Templates.Popover = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Popover.render = function (opt_data, opt_ignored, opt_ijData) {
    var output = '';
    var positionClasses__soy3 = ['top', 'right', 'bottom', 'left'];
    var positionClass__soy4 = opt_data.position != null ? positionClasses__soy3[opt_data.position] : 'bottom';
    output += '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="popover component ' + soy.$$escapeHtmlAttribute(positionClass__soy4) + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="tooltip"><div class="arrow"></div>' + Templates.Popover.title(opt_data, null, opt_ijData) + Templates.Popover.innerContent(opt_data, null, opt_ijData) + '</div>';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.Popover.render.soyTemplateName = 'Templates.Popover.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Popover.title = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h3 id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="popover-title' + soy.$$escapeHtmlAttribute(opt_data.title ? '' : ' hidden') + '">' + soy.$$escapeHtml(opt_data.title) + '</h3>');
  };
  if (goog.DEBUG) {
    Templates.Popover.title.soyTemplateName = 'Templates.Popover.title';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Popover.innerContent = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-innerContent" class="popover-content"><p>' + soy.$$escapeHtml(opt_data.content ? opt_data.content : '') + '</p></div>');
  };
  if (goog.DEBUG) {
    Templates.Popover.innerContent.soyTemplateName = 'Templates.Popover.innerContent';
  }

  Templates.Popover.render.params = ["id"];
  Templates.Popover.title.params = ["id", "title"];
  Templates.Popover.innerContent.params = ["content", "id"];

  var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Popover;
  }(_component2.default);

  Popover.prototype.registerMetalComponent && Popover.prototype.registerMetalComponent(Popover, 'Popover')

  Popover.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Popover');
  exports.default = Popover;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var TooltipBase = this.metalNamed.Tooltip.TooltipBase;


	/**
  * Popover component. Extends the behavior from `TooltipBase`, adding
  * just some UI to it.
  */

	var Popover = function (_TooltipBase) {
		babelHelpers.inherits(Popover, _TooltipBase);

		function Popover() {
			babelHelpers.classCallCheck(this, Popover);
			return babelHelpers.possibleConstructorReturn(this, _TooltipBase.apply(this, arguments));
		}

		Popover.prototype.syncAlignElement = function syncAlignElement(alignElement) {
			_TooltipBase.prototype.syncAlignElement.call(this, alignElement);

			if (alignElement) {
				var dataContent = alignElement.getAttribute('data-content');
				if (dataContent) {
					this.content = dataContent;
				}
			}
		};

		/**
   * Attribute synchronization logic for `visible` attribute. Updates the
   * element's display, since bootstrap makes it 'none' by default, so we
   * need to change it to 'block' when the popover becomes visible.
   * @param {boolean} visible
   */


		Popover.prototype.syncVisible = function syncVisible(visible) {
			this.element.style.display = visible ? 'block' : '';
			_TooltipBase.prototype.syncVisible.call(this, visible);
		};

		return Popover;
	}(TooltipBase);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	Popover.prototype.registerMetalComponent && Popover.prototype.registerMetalComponent(Popover, 'Popover')
	Popover.ATTRS = {
		content: {
			validator: core.isString
		},

		/**
   * Trigger events used to bind handlers to show and hide popover.
   * @type {!Array<string>}
   * @default ['click', 'click']
   */
		triggerEvents: {
			validator: Array.isArray,
			value: ['click', 'click']
		}
	};

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */
	Popover.Align = TooltipBase.Align;

	Popover.ELEMENT_CLASSES = 'popover';

	this.metal.Popover = Popover;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from ProgressBar.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.ProgressBar.
   */

  if (typeof Templates.ProgressBar == 'undefined') {
    Templates.ProgressBar = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.ProgressBar.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="progress component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="progressbar" tabindex="0"><div class="progress-bar"></div></div>');
  };
  if (goog.DEBUG) {
    Templates.ProgressBar.render.soyTemplateName = 'Templates.ProgressBar.render';
  }

  Templates.ProgressBar.render.params = ["id"];

  var ProgressBar = function (_Component) {
    _inherits(ProgressBar, _Component);

    function ProgressBar() {
      _classCallCheck(this, ProgressBar);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return ProgressBar;
  }(_component2.default);

  ProgressBar.prototype.registerMetalComponent && ProgressBar.prototype.registerMetalComponent(ProgressBar, 'ProgressBar')

  ProgressBar.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('ProgressBar');
  exports.default = ProgressBar;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var ProgressBarBase = this.metal.ProgressBar;

	/**
  * UI Component that renders a progress bar.
  */

	var ProgressBar = function (_ProgressBarBase) {
		babelHelpers.inherits(ProgressBar, _ProgressBarBase);

		function ProgressBar() {
			babelHelpers.classCallCheck(this, ProgressBar);
			return babelHelpers.possibleConstructorReturn(this, _ProgressBarBase.apply(this, arguments));
		}

		/**
   * Get the inner element that represents the bar.
   * @return {!Element}
   */

		ProgressBar.prototype.getBarElement = function getBarElement() {
			if (!this.barElement_) {
				this.barElement_ = this.element.childNodes[0];
			}
			return this.barElement_;
		};

		/**
   * Setter function for the `value` attribute. Makes sure the value
   * is between the current `min` and `max` attributes.
   * @param {number} value
   * @return {number}
   * @protected
   */


		ProgressBar.prototype.setterValueFn_ = function setterValueFn_(value) {
			if (value < this.min) {
				value = this.min;
			}
			if (value > this.max) {
				value = this.max;
			}
			return value;
		};

		/**
   * Synchronization logic for the `barClass` attribute.
   * @param {string} barClass
   * @param {string} prevBarClass
   */


		ProgressBar.prototype.syncBarClass = function syncBarClass(barClass, prevBarClass) {
			var barElement = this.getBarElement();
			dom.removeClasses(barElement, prevBarClass);
			dom.addClasses(barElement, barClass);
		};

		/**
   * Synchronization logic for the `label` attribute.
   */


		ProgressBar.prototype.syncLabel = function syncLabel() {
			var barElement = this.getBarElement();
			dom.removeChildren(barElement);
			if (this.label) {
				dom.append(barElement, this.label);
			}
		};

		/**
   * Synchronization logic for the `max` attribute.
   * @param {number} max
   */


		ProgressBar.prototype.syncMax = function syncMax(max) {
			if (max < this.value) {
				this.value = max;
			} else {
				this.updateBar_();
			}
			this.element.setAttribute('aria-valuemax', this.max);
		};

		/**
   * Synchronization logic for the `min` attribute.
   * @param {number} min
   */


		ProgressBar.prototype.syncMin = function syncMin(min) {
			if (min > this.value) {
				this.value = min;
			} else {
				this.updateBar_();
			}
			this.element.setAttribute('aria-valuemin', this.min);
		};

		/**
   * Synchronization logic for the `value` attribute.
   * @param {number} value
   */


		ProgressBar.prototype.syncValue = function syncValue() {
			this.updateBar_();
			this.element.setAttribute('aria-valuenow', this.value);
		};

		/**
   * Updates the bar according to the `min`, `max` and `value` attributes.
   * @protected
   */


		ProgressBar.prototype.updateBar_ = function updateBar_() {
			var barElement = this.getBarElement();
			var percentage = Math.floor((this.value - this.min) * 100 / (this.max - this.min));
			barElement.style.width = percentage + '%';
		};

		return ProgressBar;
	}(ProgressBarBase);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	ProgressBar.prototype.registerMetalComponent && ProgressBar.prototype.registerMetalComponent(ProgressBar, 'ProgressBar')
	ProgressBar.ATTRS = {
		/**
   * Optional CSS classes to be added to the inner progress bar element,
   * like 'progress-bar-danger'.
   * @type {string}
   */
		barClass: {
			validator: core.isString
		},

		/**
   * An optional label to be rendered inside the progress bar.
   * @type {string}
   */
		label: {
			validator: function validator(label) {
				return !core.isDefAndNotNull(label) || core.isString(label);
			}
		},

		/**
   * The maximum value of the progress bar. When the value is at its
   * max, the bar will be fully extended.
   * @type {number}
   */
		max: {
			validator: core.isNumber,
			value: 100
		},

		/**
   * The minimum value of the progress bar. When the value is at its
   * max, the bar will be fully collapsed.
   * @type {number}
   */
		min: {
			validator: core.isNumber,
			value: 0
		},

		/**
   * The current value of the progress bar.
   * @type {number}
   */
		value: {
			setter: 'setterValueFn_',
			validator: core.isNumber,
			value: 0
		}
	};

	/**
  * Default modal elementClasses.
  * @type {string}
  * @static
  */
	ProgressBar.ELEMENT_CLASSES = 'progress';

	this.metal.ProgressBar = ProgressBar;
}).call(this);
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var Attribute = this.metal.Attribute;
	var Position = this.metal.position;

	/**
  * Scrollspy utility.
  */

	var Scrollspy = function (_Attribute) {
		babelHelpers.inherits(Scrollspy, _Attribute);

		/**
   * @inheritDoc
   */

		function Scrollspy(opt_config) {
			babelHelpers.classCallCheck(this, Scrollspy);


			/**
    * Holds the regions cache.
    * @type {!Array}
    * @private
    * @default []
    */

			var _this = babelHelpers.possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			_this.regions = [];

			/**
    * Holds event handle that listens scroll shared event emitter proxy.
    * @type {!EventHandle}
    * @protected
    */
			_this.scrollHandle_ = dom.on(_this.scrollElement, 'scroll', _this.checkPosition.bind(_this));

			_this.init();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Scrollspy.prototype.disposeInternal = function disposeInternal() {
			this.deactivateAll();
			this.scrollHandle_.dispose();
			_Attribute.prototype.disposeInternal.call(this);
		};

		/**
   * Activates index matching element.
   * @param {number} index
   */


		Scrollspy.prototype.activate = function activate(index) {
			if (this.activeIndex >= 0) {
				this.deactivate(this.activeIndex);
			}
			this.activeIndex = index;
			dom.addClasses(this.getElementForIndex(index), this.activeClass);
		};

		/**
   * Checks position of elements and activate the one in region.
   */


		Scrollspy.prototype.checkPosition = function checkPosition() {
			var scrollHeight = this.getScrollHeight_();
			var scrollTop = Position.getScrollTop(this.scrollElement);

			if (scrollHeight < scrollTop + this.offset) {
				this.activate(this.regions.length - 1);
				return;
			}

			var index = this.findBestRegionAt_();
			if (index !== this.activeIndex) {
				if (index === -1) {
					this.deactivateAll();
				} else {
					this.activate(index);
				}
			}
		};

		/**
   * Deactivates index matching element.
   * @param {number} index
   */


		Scrollspy.prototype.deactivate = function deactivate(index) {
			dom.removeClasses(this.getElementForIndex(index), this.activeClass);
		};

		/**
   * Deactivates all elements.
   */


		Scrollspy.prototype.deactivateAll = function deactivateAll() {
			for (var i = 0; i < this.regions.length; i++) {
				this.deactivate(i);
			}
			this.activeIndex = -1;
		};

		/**
   * Finds best region to activate.
   * @return {number} The index of best region found.
   */


		Scrollspy.prototype.findBestRegionAt_ = function findBestRegionAt_() {
			var index = -1;
			var origin = this.getCurrentPosition();
			if (this.regions.length > 0 && origin >= this.regions[0].top) {
				for (var i = 0; i < this.regions.length; i++) {
					var region = this.regions[i];
					var lastRegion = i === this.regions.length - 1;
					if (origin >= region.top && (lastRegion || origin < this.regions[i + 1].top)) {
						index = i;
						break;
					}
				}
			}
			return index;
		};

		/**
   * Gets the current position in the page.
   * @return {number}
   */


		Scrollspy.prototype.getCurrentPosition = function getCurrentPosition() {
			var scrollTop = Position.getScrollTop(this.scrollElement);
			return scrollTop + this.offset + this.scrollElementRegion_.top;
		};

		/**
   * Returns the element that should be used for the link at the given index.
   * @param {number} index
   * @return {!Element}
   */


		Scrollspy.prototype.getElementForIndex = function getElementForIndex(index) {
			return this.resolveElement(this.regions[index].link);
		};

		/**
   * Gets the scroll height of `scrollElement`.
   * @return {number}
   * @protected
   */


		Scrollspy.prototype.getScrollHeight_ = function getScrollHeight_() {
			var scrollHeight = Position.getHeight(this.scrollElement);
			scrollHeight += this.scrollElementRegion_.top;
			scrollHeight -= Position.getClientHeight(this.scrollElement);
			return scrollHeight;
		};

		/**
   * Initializes the behavior of scrollspy. It's important to have this as a
   * separate function so subclasses can override it (babel doesn't allow using
   * `this` on constructors before calling `super()`).
   */


		Scrollspy.prototype.init = function init() {
			this.refresh();
			this.on('elementChanged', this.refresh);
			this.on('offsetChanged', this.checkPosition);
			this.on('scrollElementChanged', this.onScrollElementChanged_);
			this.on('selectorChanged', this.refresh);
		};

		/**
   * Fired when the value of the `scrollElement` attribute changes.
   * Refreshes the spy and updates the event handler to listen to the new scroll element.
   * @param {!Event} event
   * @protected
   */


		Scrollspy.prototype.onScrollElementChanged_ = function onScrollElementChanged_(event) {
			this.refresh();

			this.scrollHandle_.dispose();
			this.scrollHandle_ = dom.on(event.newVal, 'scroll', this.checkPosition.bind(this));
		};

		/**
   * Refreshes all regions from document. Relevant when spying elements that
   * nodes can be added and removed.
   */


		Scrollspy.prototype.refresh = function refresh() {
			// Removes the "active" class from all current regions.
			this.deactivateAll();

			this.scrollElementRegion_ = Position.getRegion(this.scrollElement);
			this.scrollHeight_ = this.getScrollHeight_();

			this.regions = [];
			var links = this.element.querySelectorAll(this.selector);
			var scrollTop = Position.getScrollTop(this.scrollElement);
			for (var i = 0; i < links.length; ++i) {
				var link = links[i];
				if (link.hash && link.hash.length > 1) {
					var element = document.getElementById(link.hash.substring(1));
					if (element) {
						var region = Position.getRegion(element);
						this.regions.push({
							link: link,
							top: region.top + scrollTop,
							bottom: region.bottom + scrollTop
						});
					}
				}
			}
			this.sortRegions_();

			// Removes the "active" class from all new regions and then activate the right one for
			// the current position.
			this.deactivateAll();
			this.checkPosition();
		};

		/**
   * Sorts regions from lower to higher on y-axis.
   * @protected
   */


		Scrollspy.prototype.sortRegions_ = function sortRegions_() {
			this.regions.sort(function (a, b) {
				return a.top - b.top;
			});
		};

		return Scrollspy;
	}(Attribute);

	Scrollspy.prototype.registerMetalComponent && Scrollspy.prototype.registerMetalComponent(Scrollspy, 'Scrollspy')


	Scrollspy.ATTRS = {
		/**
   * Class to be used as active class.
   * @attribute activeClass
   * @type {string}
   */
		activeClass: {
			validator: core.isString,
			value: 'active'
		},

		/**
   * The index of the currently active link.
   * @type {number}
   */
		activeIndex: {
			validator: core.isNumber,
			value: -1
		},

		/**
   * Function that receives the matching element as argument and return
   * itself. Relevant when the `activeClass` must be applied to a different
   * element, e.g. a parentNode.
   * @type {function}
   * @default core.identityFunction
   */
		resolveElement: {
			validator: core.isFunction,
			value: core.identityFunction
		},

		/**
   * The scrollElement element to be used as scrollElement area for scrollspy.
   * The scrollElement is where the scroll event is listened from.
   * @type {Element|Window}
   */
		scrollElement: {
			setter: dom.toElement,
			value: document
		},

		/**
   * Defines the offset that triggers scrollspy.
   * @type {number}
   * @default 0
   */
		offset: {
			validator: core.isNumber,
			value: 0
		},

		/**
   * Element to be used as alignment reference of scrollspy.
   * @type {Element}
   */
		element: {
			setter: dom.toElement
		},

		/**
   * Selector to query elements inside `element` to be activated.
   * @type {Element}
   * @default 'a'
   */
		selector: {
			validator: core.isString,
			value: 'a'
		}
	};

	this.metal.Scrollspy = Scrollspy;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Select.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Select.
   */

  if (typeof Templates.Select == 'undefined') {
    Templates.Select = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Select.render = function (opt_data, opt_ignored, opt_ijData) {
    var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="select component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" data-onkeydown="handleKeyDown_">';
    var currSelectedIndex__soy8 = opt_data.selectedIndex != null ? opt_data.selectedIndex : opt_data.label || opt_data.items.length == 0 ? -1 : 0;
    output += '<input type="hidden" name="' + soy.$$escapeHtmlAttribute(opt_data.hiddenInputName ? opt_data.hiddenInputName : '') + '" value="' + soy.$$escapeHtmlAttribute(currSelectedIndex__soy8 == -1 ? '' : opt_data.items[currSelectedIndex__soy8]) + '" />';
    var param14 = '';
    var itemList15 = opt_data.items;
    var itemListLen15 = itemList15.length;
    for (var itemIndex15 = 0; itemIndex15 < itemListLen15; itemIndex15++) {
      var itemData15 = itemList15[itemIndex15];
      param14 += '<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleItemClick_" class="select-option' + soy.$$escapeHtmlAttribute(currSelectedIndex__soy8 == itemIndex15 ? ' selected' : '') + '"><a href="javascript:;">' + soy.$$escapeHtml(itemData15) + '</a></li>';
    }
    output += soy.$$escapeHtml(Templates.Dropdown.render({ body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(param14), events: { attrsSynced: opt_data.id + ':handleDropdownAttrsSynced_' }, header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="' + soy.$$escapeHtmlAttribute(opt_data.buttonClass) + ' dropdown-select" type="button" data-onclick="toggle">' + soy.$$escapeHtml(currSelectedIndex__soy8 == -1 ? opt_data.label : opt_data.items[currSelectedIndex__soy8]) + ' <span class="' + soy.$$escapeHtmlAttribute(opt_data.arrowClass ? opt_data.arrowClass : 'caret') + '"></span></button>'), id: opt_data.id + '-dropdown' }, null, opt_ijData));
    output += '</div>';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.Select.render.soyTemplateName = 'Templates.Select.render';
  }

  Templates.Select.render.params = ["arrowClass", "buttonClass", "hiddenInputName", "id", "items", "label", "selectedIndex"];

  var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Select;
  }(_component2.default);

  Select.prototype.registerMetalComponent && Select.prototype.registerMetalComponent(Select, 'Select')

  Select.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Select');
  exports.default = Select;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var SelectBase = this.metal.Select;


	/**
  * Responsible for rendering and handling a custom select component, based
  * on `Dropdown`.
  */

	var Select = function (_SelectBase) {
		babelHelpers.inherits(Select, _SelectBase);

		function Select() {
			babelHelpers.classCallCheck(this, Select);
			return babelHelpers.possibleConstructorReturn(this, _SelectBase.apply(this, arguments));
		}

		/**
   * Finds the index of the given element in the items array.
   * @param {!Element} element
   * @return {number}
   * @protected
   */

		Select.prototype.findItemIndex_ = function findItemIndex_(element) {
			var items = this.element.querySelectorAll('li');
			for (var i = 0; i < items.length; i++) {
				if (items.item(i) === element) {
					return i;
				}
			}
		};

		/**
   * Focuses the option at the given index.
   * @param {number} index
   * @protected
   */


		Select.prototype.focusIndex_ = function focusIndex_(index) {
			var option = this.element.querySelector('.select-option:nth-child(' + (index + 1) + ') a');
			if (option) {
				this.focusedIndex_ = index;
				option.focus();
			}
		};

		/**
   * Gets the `Dropdown` instance used by this `Select`.
   * @return {!Dropdown}
   */


		Select.prototype.getDropdown = function getDropdown() {
			return this.components[this.id + '-dropdown'];
		};

		/**
   * Handles a `attrsSynced` event for the dropdown.
   * @param {!Object} data
   * @protected
   */


		Select.prototype.handleDropdownAttrsSynced_ = function handleDropdownAttrsSynced_(data) {
			if (this.openedWithKeyboard_) {
				// This is done on `attrsSynced` because the items need to have already
				// been made visible before we try focusing them.
				this.focusIndex_(0);
				this.openedWithKeyboard_ = false;
			} else if (data.changes.expanded) {
				this.focusedIndex_ = null;
			}
		};

		/**
   * Handles a `click` event on one of the items. Updates `selectedIndex`
   * accordingly.
   * @param {!Event} event
   * @protected
   */


		Select.prototype.handleItemClick_ = function handleItemClick_(event) {
			this.selectedIndex = this.findItemIndex_(event.delegateTarget);
			this.getDropdown().close();
			event.preventDefault();
		};

		/**
   * Handles a `keydown` event on this component. Handles keyboard controls.
   * @param {!Event} event
   * @protected
   */


		Select.prototype.handleKeyDown_ = function handleKeyDown_(event) {
			if (this.getDropdown().expanded) {
				switch (event.keyCode) {
					case 27:
						this.getDropdown().close();
						break;
					case 38:
						this.focusedIndex_ = core.isDefAndNotNull(this.focusedIndex_) ? this.focusedIndex_ : 1;
						this.focusIndex_(this.focusedIndex_ === 0 ? this.items.length - 1 : this.focusedIndex_ - 1);
						event.preventDefault();
						break;
					case 40:
						this.focusedIndex_ = core.isDefAndNotNull(this.focusedIndex_) ? this.focusedIndex_ : -1;
						this.focusIndex_(this.focusedIndex_ === this.items.length - 1 ? 0 : this.focusedIndex_ + 1);
						event.preventDefault();
						break;
				}
			} else if ((event.keyCode === 13 || event.keyCode === 32) && dom.hasClass(event.target, 'dropdown-select')) {
				this.openedWithKeyboard_ = true;
				this.getDropdown().open();
				event.preventDefault();
				return;
			}
		};

		return Select;
	}(SelectBase);

	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */


	Select.prototype.registerMetalComponent && Select.prototype.registerMetalComponent(Select, 'Select')
	Select.ATTRS = {
		/**
   * The CSS class used by the select menu arrow.
   * @type {string}
   * @default 'caret'
   */
		arrowClass: {
			value: 'caret'
		},

		/**
   * The CSS class used by the select menu button.
   * @type {string}
   * @default 'btn btn-default'
   */
		buttonClass: {
			validator: core.isString,
			value: 'btn btn-default'
		},

		/**
   * The name of the hidden input field
   * @type {string}
   */
		hiddenInputName: {
			validator: core.isString
		},

		/**
   * A list representing the select dropdown items. Can be either already a list
   * of objects specifying both name and value for each item, or just a list of
   * names, in which case the values will be the indexes where the names show up
   * on the list.
   * @type {!Array<string>|!Array<!{name: string, value: string}>}
   * @default []
   */
		items: {
			validator: function validator(val) {
				return val instanceof Array;
			},
			valueFn: function valueFn() {
				return [];
			}
		},

		/**
   * The label that should be used for the select menu when no item is
   * selected. If not set, the first item will be selected automatically.
   * @type {string}
   */
		label: {
			validator: core.isString
		},

		/**
   * The index of the currently selected item, or -1 if none is selected.
   * @type {number}
   */
		selectedIndex: {
			validator: core.isNumber,
			valueFn: function valueFn() {
				return this.label || !this.items.length ? -1 : 0;
			}
		}
	};

	/**
  * Default element classes.
  * @type {string}
  * @static
  */
	Select.ELEMENT_CLASSES = 'select';

	this.metal.Select = Select;
}).call(this);
define(['exports', 'metal/src/metal', 'metal-attribute/src/Attribute', 'metal-position/src/all/position'], function (exports, _metal, _Attribute2, _position) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _Attribute3 = _interopRequireDefault(_Attribute2);

	var _position2 = _interopRequireDefault(_position);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var DragAutoScroll = function (_Attribute) {
		_inherits(DragAutoScroll, _Attribute);

		/**
   * @inheritDoc
   */

		function DragAutoScroll(opt_config) {
			_classCallCheck(this, DragAutoScroll);

			var _this = _possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			/**
    * The handler for the current call to `setTimeout`.
    * @type {?number}
    * @protected
    */
			_this.scrollTimeout_ = null;
			return _this;
		}

		/**
   * @inheritDoc
   */


		DragAutoScroll.prototype.disposeInternal = function disposeInternal() {
			_Attribute.prototype.disposeInternal.call(this);
			this.stop();
		};

		DragAutoScroll.prototype.getRegionWithoutScroll_ = function getRegionWithoutScroll_(scrollContainer) {
			if (_metal2.default.isDocument(scrollContainer)) {
				var height = window.innerHeight;
				var width = window.innerWidth;
				return _position2.default.makeRegion(height, height, 0, width, 0, width);
			} else {
				return _position2.default.getRegion(scrollContainer);
			}
		};

		DragAutoScroll.prototype.scroll = function scroll(scrollContainers, mouseX, mouseY) {
			this.stop();
			this.scrollTimeout_ = setTimeout(this.scrollInternal_.bind(this, scrollContainers, mouseX, mouseY), this.delay);
		};

		DragAutoScroll.prototype.scrollElement_ = function scrollElement_(element, deltaX, deltaY) {
			if (_metal2.default.isDocument(element)) {
				window.scrollBy(deltaX, deltaY);
			} else {
				element.scrollTop += deltaY;
				element.scrollLeft += deltaX;
			}
		};

		DragAutoScroll.prototype.scrollInternal_ = function scrollInternal_(scrollContainers, mouseX, mouseY) {
			for (var i = 0; i < scrollContainers.length; i++) {
				var scrollRegion = this.getRegionWithoutScroll_(scrollContainers[i]);
				if (!_position2.default.pointInsideRegion(mouseX, mouseY, scrollRegion)) {
					continue;
				}

				var deltaX = 0;
				var deltaY = 0;
				var scrollTop = _position2.default.getScrollTop(scrollContainers[i]);
				var scrollLeft = _position2.default.getScrollLeft(scrollContainers[i]);
				if (scrollLeft > 0 && Math.abs(mouseX - scrollRegion.left) <= this.maxDistance) {
					deltaX -= this.speed;
				} else if (Math.abs(mouseX - scrollRegion.right) <= this.maxDistance) {
					deltaX += this.speed;
				}
				if (scrollTop > 0 && Math.abs(mouseY - scrollRegion.top) <= this.maxDistance) {
					deltaY -= this.speed;
				} else if (Math.abs(mouseY - scrollRegion.bottom) <= this.maxDistance) {
					deltaY += this.speed;
				}

				if (deltaX || deltaY) {
					this.scrollElement_(scrollContainers[i], deltaX, deltaY);
					this.scroll(scrollContainers, mouseX, mouseY);
					break;
				}
			}
		};

		DragAutoScroll.prototype.stop = function stop() {
			clearTimeout(this.scrollTimeout_);
		};

		return DragAutoScroll;
	}(_Attribute3.default);

	DragAutoScroll.prototype.registerMetalComponent && DragAutoScroll.prototype.registerMetalComponent(DragAutoScroll, 'DragAutoScroll')


	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */
	DragAutoScroll.ATTRS = {
		/**
   * The delay in ms before an element is scrolled automatically.
   * @type {number}
   * @default 200
   */
		delay: {
			validator: _metal2.default.isNumber,
			value: 50
		},

		/**
   * The maximum distance the mouse needs to be from an element before
   * it will be scrolled automatically.
   * @type {number}
   * @default 10
   */
		maxDistance: {
			validator: _metal2.default.isNumber,
			value: 20
		},

		/**
   * The number of pixels that will be scrolled each time.
   * @type {number}
   * @default 10
   */
		speed: {
			validator: _metal2.default.isNumber,
			value: 20
		}
	};

	exports.default = DragAutoScroll;
});
define(['exports', 'metal-dom/src/all/dom', 'metal-events/src/events', 'metal-position/src/all/position'], function (exports, _dom, _events, _position) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _position2 = _interopRequireDefault(_position);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var DragScrollDelta = function (_EventEmitter) {
		_inherits(DragScrollDelta, _EventEmitter);

		/**
   * @inheritDoc
   */

		function DragScrollDelta() {
			_classCallCheck(this, DragScrollDelta);

			var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

			/**
    * `EventHandler` for the scroll events.
    * @type {EventHandler}
    * @protected
    */
			_this.handler_ = new _events.EventHandler();

			/**
    * The scroll positions for the scroll elements that are being listened to.
    * @type {Array}
    * @protected
    */
			_this.scrollPositions_ = [];
			return _this;
		}

		/**
   * @inheritDoc
   */


		DragScrollDelta.prototype.disposeInternal = function disposeInternal() {
			_EventEmitter.prototype.disposeInternal.call(this);
			this.stop();
			this.handler_ = null;
		};

		DragScrollDelta.prototype.handleScroll_ = function handleScroll_(index, event) {
			var newPosition = {
				scrollLeft: _position2.default.getScrollLeft(event.currentTarget),
				scrollTop: _position2.default.getScrollTop(event.currentTarget)
			};
			var position = this.scrollPositions_[index];
			this.scrollPositions_[index] = newPosition;

			this.emit('scrollDelta', {
				deltaX: newPosition.scrollLeft - position.scrollLeft,
				deltaY: newPosition.scrollTop - position.scrollTop
			});
		};

		DragScrollDelta.prototype.start = function start(dragNode, scrollContainers) {
			if (getComputedStyle(dragNode).position === 'fixed') {
				// If the drag node's position is "fixed", then its coordinates don't need to
				// be updated when parents are scrolled.
				return;
			}

			for (var i = 0; i < scrollContainers.length; i++) {
				if (_dom2.default.contains(scrollContainers[i], dragNode)) {
					this.scrollPositions_.push({
						scrollLeft: _position2.default.getScrollLeft(scrollContainers[i]),
						scrollTop: _position2.default.getScrollTop(scrollContainers[i])
					});

					var index = this.scrollPositions_.length - 1;
					this.handler_.add(_dom2.default.on(scrollContainers[i], 'scroll', this.handleScroll_.bind(this, index)));
				}
			}
		};

		DragScrollDelta.prototype.stop = function stop() {
			this.handler_.removeAllListeners();
			this.scrollPositions_ = [];
		};

		return DragScrollDelta;
	}(_events.EventEmitter);

	DragScrollDelta.prototype.registerMetalComponent && DragScrollDelta.prototype.registerMetalComponent(DragScrollDelta, 'DragScrollDelta')
	exports.default = DragScrollDelta;
});
define(['exports', 'metal-dom/src/all/dom'], function (exports, _dom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	var DragShim = function () {
		function DragShim() {
			_classCallCheck(this, DragShim);
		}

		DragShim.attachDocListeners = function attachDocListeners(useShim, listeners) {
			var element = document;
			if (useShim) {
				element = DragShim.getDocShim();
				element.style.display = 'block';
			}
			var eventTypes = Object.keys(listeners);
			return eventTypes.map(function (type) {
				var isTouch = type.substr(0, 5) === 'touch';
				return _dom2.default.on(isTouch ? document : element, type, listeners[type]);
			});
		};

		DragShim.getDocShim = function getDocShim() {
			if (!DragShim.docShim_) {
				DragShim.docShim_ = document.createElement('div');
				DragShim.docShim_.className = 'shim';
				DragShim.docShim_.style.position = 'fixed';
				DragShim.docShim_.style.top = 0;
				DragShim.docShim_.style.left = 0;
				DragShim.docShim_.style.width = '100%';
				DragShim.docShim_.style.height = '100%';
				DragShim.docShim_.style.display = 'none';
				DragShim.docShim_.style.opacity = 0;
				DragShim.docShim_.style.zIndex = 9999;
				_dom2.default.enterDocument(DragShim.docShim_);
			}
			return DragShim.docShim_;
		};

		DragShim.hideDocShim = function hideDocShim() {
			DragShim.getDocShim().style.display = 'none';
		};

		DragShim.reset = function reset() {
			if (DragShim.docShim_) {
				_dom2.default.exitDocument(DragShim.docShim_);
				DragShim.docShim_ = null;
			}
		};

		return DragShim;
	}();

	/**
  * The shim element. This is only created when necessary.
  * @type {Element}
  * @protected
  * @static
  */
	DragShim.docShim_ = null;

	exports.default = DragShim;
});
define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-attribute/src/Attribute', './helpers/DragAutoScroll', './helpers/DragScrollDelta', './helpers/DragShim', 'metal-events/src/events', 'metal-position/src/all/position'], function (exports, _metal, _dom, _Attribute2, _DragAutoScroll, _DragScrollDelta, _DragShim, _events, _position) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _Attribute3 = _interopRequireDefault(_Attribute2);

	var _DragAutoScroll2 = _interopRequireDefault(_DragAutoScroll);

	var _DragScrollDelta2 = _interopRequireDefault(_DragScrollDelta);

	var _DragShim2 = _interopRequireDefault(_DragShim);

	var _position2 = _interopRequireDefault(_position);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var Drag = function (_Attribute) {
		_inherits(Drag, _Attribute);

		/**
   * @inheritDoc
   */

		function Drag(opt_config) {
			_classCallCheck(this, Drag);

			var _this = _possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			/**
    * The drag placeholder that is active at the moment.
    * @type {Element}
    * @protected
    */
			_this.activeDragPlaceholder_ = null;

			/**
    * The drag source that is active at the moment.
    * @type {Element}
    * @protected
    */
			_this.activeDragSource_ = null;

			/**
    * The distance that has been dragged.
    * @type {number}
    * @protected
    */
			_this.distanceDragged_ = 0;

			/**
    * Flag indicating if one of the sources are being dragged.
    * @type {boolean}
    * @protected
    */
			_this.dragging_ = false;

			/**
    * The `EventHandler` instance that holds events that keep track of the drag action.
    * @type {!EventHandler}
    * @protected
    */
			_this.dragHandler_ = new _events.EventHandler();

			/**
    * `DragScrollDelta` instance.
    * @type {!DragScrollDelta}
    * @protected
    */
			_this.dragScrollDelta_ = new _DragScrollDelta2.default();

			/**
    * The current x and y positions of the mouse (or null if not dragging).
    * @type {{x: number, y: number}}
    * @protected
    */
			_this.mousePos_ = null;

			/**
    * The distance between the mouse position and the dragged source position
    * (or null if not dragging).
    * @type {{x: number, y: number}}
    * @protected
    */
			_this.mouseSourceDelta_ = null;

			/**
    * The `EventHandler` instance that holds events for the source (or sources).
    * @type {!EventHandler}
    * @protected
    */
			_this.sourceHandler_ = new _events.EventHandler();

			/**
    * The current region values of the element being dragged, relative to
    * the document (or null if not dragging).
    * @type {Object}
    * @protected
    */
			_this.sourceRegion_ = null;

			/**
    * The current x and y positions of the element being dragged relative to its
    * `offsetParent`, or to the viewport if there's no `offsetParent`
    * (or null if not dragging).
    * @type {{x: number, y: number}}
    * @protected
    */
			_this.sourceRelativePos_ = null;

			_this.attachSourceEvents_();
			_this.on(Drag.Events.DRAG, _this.defaultDragFn_, true);
			_this.on(Drag.Events.END, _this.defaultEndFn_, true);
			_this.on('sourcesChanged', _this.handleSourcesChanged_.bind(_this));
			_this.dragScrollDelta_.on('scrollDelta', _this.handleScrollDelta_.bind(_this));
			_dom2.default.on(document, 'keydown', _this.handleKeyDown_.bind(_this));
			return _this;
		}

		/**
   * Attaches the necessary events to the source (or sources).
   * @protected
   */


		Drag.prototype.attachSourceEvents_ = function attachSourceEvents_() {
			var toAttach = {
				keydown: this.handleSourceKeyDown_.bind(this),
				mousedown: this.handleDragStartEvent_.bind(this),
				touchstart: this.handleDragStartEvent_.bind(this)
			};
			var eventTypes = Object.keys(toAttach);
			for (var i = 0; i < eventTypes.length; i++) {
				var listenerFn = toAttach[eventTypes[i]];
				if (_metal.core.isString(this.sources)) {
					this.sourceHandler_.add(_dom2.default.delegate(this.container, eventTypes[i], this.sources, listenerFn));
				} else {
					this.sourceHandler_.add(_dom2.default.on(this.sources, eventTypes[i], listenerFn));
				}
			}
		};

		Drag.prototype.buildEventObject_ = function buildEventObject_() {
			return {
				placeholder: this.activeDragPlaceholder_,
				source: this.activeDragSource_,
				relativeX: this.sourceRelativePos_.x,
				relativeY: this.sourceRelativePos_.y,
				x: this.sourceRegion_.left,
				y: this.sourceRegion_.top
			};
		};

		Drag.prototype.calculateInitialPosition_ = function calculateInitialPosition_(event) {
			this.sourceRegion_ = _metal.object.mixin({}, _position2.default.getRegion(this.activeDragSource_, true));
			this.sourceRelativePos_ = {
				x: this.activeDragSource_.offsetLeft,
				y: this.activeDragSource_.offsetTop
			};
			if (_metal.core.isDef(event.clientX)) {
				this.mousePos_ = {
					x: event.clientX,
					y: event.clientY
				};
				this.mouseSourceDelta_ = {
					x: this.sourceRegion_.left - this.mousePos_.x,
					y: this.sourceRegion_.top - this.mousePos_.y
				};
			}
		};

		Drag.prototype.canStartDrag_ = function canStartDrag_(event) {
			return !this.disabled && (!_metal.core.isDef(event.button) || event.button === 0) && !this.isDragging() && this.isWithinHandle_(event.target);
		};

		Drag.prototype.cleanUpAfterDragging_ = function cleanUpAfterDragging_() {
			if (this.activeDragPlaceholder_) {
				this.activeDragPlaceholder_.setAttribute('aria-grabbed', 'false');
				_dom2.default.removeClasses(this.activeDragPlaceholder_, this.draggingClass);
				if (this.dragPlaceholder === Drag.Placeholder.CLONE) {
					_dom2.default.exitDocument(this.activeDragPlaceholder_);
				}
			}
			this.activeDragPlaceholder_ = null;
			this.activeDragSource_ = null;
			this.sourceRegion_ = null;
			this.sourceRelativePos_ = null;
			this.mousePos_ = null;
			this.mouseSourceDelta_ = null;
			this.dragging_ = false;
			this.dragHandler_.removeAllListeners();
		};

		Drag.prototype.cloneActiveDrag_ = function cloneActiveDrag_() {
			var placeholder = this.activeDragSource_.cloneNode(true);
			placeholder.style.position = 'absolute';
			placeholder.style.left = this.sourceRelativePos_.x + 'px';
			placeholder.style.top = this.sourceRelativePos_.y + 'px';
			_dom2.default.append(this.activeDragSource_.parentNode, placeholder);
			return placeholder;
		};

		Drag.prototype.constrain_ = function constrain_(region) {
			this.constrainToAxis_(region);
			this.constrainToSteps_(region);
			this.constrainToRegion_(region);
		};

		Drag.prototype.constrainToAxis_ = function constrainToAxis_(region) {
			if (this.axis === 'x') {
				region.top = this.sourceRegion_.top;
				region.bottom = this.sourceRegion_.bottom;
			} else if (this.axis === 'y') {
				region.left = this.sourceRegion_.left;
				region.right = this.sourceRegion_.right;
			}
		};

		Drag.prototype.constrainToRegion_ = function constrainToRegion_(region) {
			var constrain = this.constrain;
			if (constrain) {
				if (_metal.core.isElement(constrain)) {
					constrain = _position2.default.getRegion(constrain, true);
				}
				if (region.left < constrain.left) {
					region.left = constrain.left;
				} else if (region.right > constrain.right) {
					region.left -= region.right - constrain.right;
				}
				if (region.top < constrain.top) {
					region.top = constrain.top;
				} else if (region.bottom > constrain.bottom) {
					region.top -= region.bottom - constrain.bottom;
				}
				region.right = region.left + region.width;
				region.bottom = region.top + region.height;
			}
		};

		Drag.prototype.constrainToSteps_ = function constrainToSteps_(region) {
			var deltaX = region.left - this.sourceRegion_.left;
			var deltaY = region.top - this.sourceRegion_.top;
			region.left -= deltaX % this.steps.x;
			region.right = region.left + region.width;
			region.top -= deltaY % this.steps.y;
			region.bottom = region.top + region.height;
		};

		Drag.prototype.createActiveDragPlaceholder_ = function createActiveDragPlaceholder_() {
			var dragPlaceholder = this.dragPlaceholder;
			if (dragPlaceholder === Drag.Placeholder.CLONE) {
				this.activeDragPlaceholder_ = this.cloneActiveDrag_();
			} else if (_metal.core.isElement(dragPlaceholder)) {
				this.activeDragPlaceholder_ = dragPlaceholder;
			} else {
				this.activeDragPlaceholder_ = this.activeDragSource_;
			}
		};

		Drag.prototype.defaultDragFn_ = function defaultDragFn_() {
			this.moveToPosition_(this.activeDragPlaceholder_);
		};

		Drag.prototype.defaultEndFn_ = function defaultEndFn_() {
			this.moveToPosition_(this.activeDragSource_);
		};

		Drag.prototype.disposeInternal = function disposeInternal() {
			this.cleanUpAfterDragging_();
			this.dragHandler_ = null;
			this.dragScrollDelta_.dispose();
			this.dragScrollDelta_ = null;
			this.sourceHandler_.removeAllListeners();
			this.sourceHandler_ = null;
			_Attribute.prototype.disposeInternal.call(this);
		};

		Drag.prototype.getActiveDrag = function getActiveDrag() {
			return this.activeDragSource_;
		};

		Drag.prototype.handleDragEndEvent_ = function handleDragEndEvent_() {
			if (this.autoScroll) {
				this.autoScroll.stop();
			}
			this.dragScrollDelta_.stop();
			_DragShim2.default.hideDocShim();
			this.emit(Drag.Events.END, this.buildEventObject_());
			this.cleanUpAfterDragging_();
		};

		Drag.prototype.handleDragMoveEvent_ = function handleDragMoveEvent_(event) {
			var position = event.targetTouches ? event.targetTouches[0] : event;
			var distanceX = position.clientX - this.mousePos_.x;
			var distanceY = position.clientY - this.mousePos_.y;
			this.mousePos_.x = position.clientX;
			this.mousePos_.y = position.clientY;
			if (!this.isDragging() && !this.hasReachedMinimumDistance_(distanceX, distanceY)) {
				return;
			}

			if (!this.isDragging()) {
				this.startDragging_();
				this.dragScrollDelta_.start(this.activeDragPlaceholder_, this.scrollContainers);
			}
			if (this.autoScroll) {
				this.autoScroll.scroll(this.scrollContainers, this.mousePos_.x, this.mousePos_.y);
			}
			this.updatePositionFromMouse();
		};

		Drag.prototype.handleDragStartEvent_ = function handleDragStartEvent_(event) {
			this.activeDragSource_ = event.delegateTarget || event.currentTarget;

			if (this.canStartDrag_(event)) {
				this.calculateInitialPosition_(event.targetTouches ? event.targetTouches[0] : event);
				event.preventDefault();
				if (event.type === 'keydown') {
					this.startDragging_();
				} else {
					this.dragHandler_.add.apply(this.dragHandler_, _DragShim2.default.attachDocListeners(this.useShim, {
						mousemove: this.handleDragMoveEvent_.bind(this),
						touchmove: this.handleDragMoveEvent_.bind(this),
						mouseup: this.handleDragEndEvent_.bind(this),
						touchend: this.handleDragEndEvent_.bind(this)
					}));
					this.distanceDragged_ = 0;
				}
			}
		};

		Drag.prototype.handleKeyDown_ = function handleKeyDown_(event) {
			if (event.keyCode === 27 && this.isDragging()) {
				this.handleDragEndEvent_();
			}
		};

		Drag.prototype.handleScrollDelta_ = function handleScrollDelta_(event) {
			this.mouseSourceDelta_.x += event.deltaX;
			this.mouseSourceDelta_.y += event.deltaY;
			this.updatePositionFromMouse();
		};

		Drag.prototype.handleSourceKeyDown_ = function handleSourceKeyDown_(event) {
			if (this.isDragging()) {
				var currentTarget = event.delegateTarget || event.currentTarget;
				if (currentTarget !== this.activeDragSource_) {
					return;
				}
				if (event.keyCode >= 37 && event.keyCode <= 40) {
					// Arrow keys during drag move the source.
					var deltaX = 0;
					var deltaY = 0;
					var speedX = this.keyboardSpeed >= this.steps.x ? this.keyboardSpeed : this.steps.x;
					var speedY = this.keyboardSpeed >= this.steps.y ? this.keyboardSpeed : this.steps.y;
					if (event.keyCode === 37) {
						deltaX -= speedX;
					} else if (event.keyCode === 38) {
						deltaY -= speedY;
					} else if (event.keyCode === 39) {
						deltaX += speedX;
					} else {
						deltaY += speedY;
					}
					this.updatePositionFromDelta(deltaX, deltaY);
					event.preventDefault();
				} else if (event.keyCode === 13 || event.keyCode === 32 || event.keyCode === 27) {
					// Enter, space or esc during drag will end it.
					this.handleDragEndEvent_();
				}
			} else if (event.keyCode === 13 || event.keyCode === 32) {
				// Enter or space will start the drag action.
				this.handleDragStartEvent_(event);
			}
		};

		Drag.prototype.handleSourcesChanged_ = function handleSourcesChanged_() {
			this.sourceHandler_.removeAllListeners();
			this.attachSourceEvents_();
		};

		Drag.prototype.hasReachedMinimumDistance_ = function hasReachedMinimumDistance_(distanceX, distanceY) {
			this.distanceDragged_ += Math.abs(distanceX) + Math.abs(distanceY);
			return this.distanceDragged_ >= this.minimumDragDistance;
		};

		Drag.prototype.isDragging = function isDragging() {
			return this.dragging_;
		};

		Drag.prototype.isWithinHandle_ = function isWithinHandle_(element) {
			var handles = this.handles;
			if (!handles) {
				return true;
			} else if (_metal.core.isString(handles)) {
				return _dom2.default.match(element, handles + ', ' + handles + ' *');
			} else {
				return _dom2.default.contains(handles, element);
			}
		};

		Drag.prototype.moveToPosition_ = function moveToPosition_(element) {
			element.style.left = this.sourceRelativePos_.x + 'px';
			element.style.top = this.sourceRelativePos_.y + 'px';
		};

		Drag.prototype.setterAutoScrollFn_ = function setterAutoScrollFn_(val) {
			if (val !== false) {
				return new _DragAutoScroll2.default(val);
			}
		};

		Drag.prototype.setterConstrainFn = function setterConstrainFn(val) {
			if (_metal.core.isString(val)) {
				val = _dom2.default.toElement(val);
			}
			return val;
		};

		Drag.prototype.setterScrollContainersFn_ = function setterScrollContainersFn_(scrollContainers) {
			var elements = this.toElements_(scrollContainers);
			elements.push(document);
			return elements;
		};

		Drag.prototype.startDragging_ = function startDragging_() {
			this.dragging_ = true;
			this.createActiveDragPlaceholder_();
			_dom2.default.addClasses(this.activeDragPlaceholder_, this.draggingClass);
			this.activeDragPlaceholder_.setAttribute('aria-grabbed', 'true');
		};

		Drag.prototype.toElements_ = function toElements_(elementOrSelector) {
			if (_metal.core.isString(elementOrSelector)) {
				var matched = this.container.querySelectorAll(elementOrSelector);
				return Array.prototype.slice.call(matched, 0);
			} else if (elementOrSelector) {
				return [elementOrSelector];
			} else {
				return [];
			}
		};

		Drag.prototype.updatePosition = function updatePosition(newRegion) {
			this.constrain_(newRegion);
			var deltaX = newRegion.left - this.sourceRegion_.left;
			var deltaY = newRegion.top - this.sourceRegion_.top;
			if (deltaX !== 0 || deltaY !== 0) {
				this.sourceRegion_ = newRegion;
				this.sourceRelativePos_.x += deltaX;
				this.sourceRelativePos_.y += deltaY;
				this.emit(Drag.Events.DRAG, this.buildEventObject_());
			}
		};

		Drag.prototype.updatePositionFromDelta = function updatePositionFromDelta(deltaX, deltaY) {
			var newRegion = _metal.object.mixin({}, this.sourceRegion_);
			newRegion.left += deltaX;
			newRegion.right += deltaX;
			newRegion.top += deltaY;
			newRegion.bottom += deltaY;
			this.updatePosition(newRegion);
		};

		Drag.prototype.updatePositionFromMouse = function updatePositionFromMouse() {
			var newRegion = {
				height: this.sourceRegion_.height,
				left: this.mousePos_.x + this.mouseSourceDelta_.x,
				top: this.mousePos_.y + this.mouseSourceDelta_.y,
				width: this.sourceRegion_.width
			};
			newRegion.right = newRegion.left + newRegion.width;
			newRegion.bottom = newRegion.top + newRegion.height;
			this.updatePosition(newRegion);
		};

		Drag.prototype.validateElementOrString_ = function validateElementOrString_(val) {
			return _metal.core.isString(val) || _metal.core.isElement(val);
		};

		Drag.prototype.validatorConstrainFn = function validatorConstrainFn(val) {
			return _metal.core.isString(val) || _metal.core.isObject(val);
		};

		return Drag;
	}(_Attribute3.default);

	Drag.prototype.registerMetalComponent && Drag.prototype.registerMetalComponent(Drag, 'Drag')


	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */
	Drag.ATTRS = {
		/**
   * Configuration object for the `DragAutoScroll` instance that will be used for
   * automatically scrolling the elements in `scrollContainers` during drag when
   * the mouse is near their boundaries. If set to `false`, auto scrolling will be
   * disabled (default).
   * @type {!Object|boolean}
   * @default false
   */
		autoScroll: {
			setter: 'setterAutoScrollFn_',
			value: false,
			writeOnce: true
		},

		/**
   * The axis that allows dragging. Can be set to just x, just y or both (default).
   * @type {string}
   */
		axis: {
			validator: _metal.core.isString
		},

		/**
   * Object with the boundaries, that the dragged element should not leave
   * while being dragged. If not set, the element is free to be dragged
   * to anywhere on the page. Can be either already an object with the
   * boundaries relative to the document, or an element to use the boundaries
   * from, or even a selector for finding that element.
   * @type {!Element|Object|string}
   */
		constrain: {
			setter: 'setterConstrainFn',
			validator: 'validatorConstrainFn'
		},

		/**
   * An element that contains all sources, targets and scroll containers. This
   * will be used when delegate events are attached or when looking for elements
   * by selector. Defaults to `document`.
   * @type {!Element|string}
   * @default document
   */
		container: {
			setter: _dom2.default.toElement,
			validator: 'validateElementOrString_',
			value: document
		},

		/**
   * Flag indicating if drag operations are disabled. When set to true, it
   * dragging won't work.
   * @type {boolean}
   * @default false
   */
		disabled: {
			validator: _metal.core.isBoolean,
			value: false
		},

		/**
   * The CSS class that should be added to the node being dragged.
   * @type {string}
   * @default 'dragging'
   */
		draggingClass: {
			validator: _metal.core.isString,
			value: 'dragging'
		},

		/**
   * The placeholder element that should be moved during drag. Can be either
   * an element or the "clone" string, indicating that a clone of the source
   * being dragged should be used. If nothing is set, the original source element
   * will be used.
   * @type {Element|?string}
   */
		dragPlaceholder: {
			validator: 'validateElementOrString_'
		},

		/**
   * Elements inside the source that should be the drag handles. Can be
   * either a single element or a selector for multiple elements.
   * @type {Element|?string}
   */
		handles: {
			validator: 'validateElementOrString_'
		},

		/**
   * The number of pixels that the source should move when dragged via
   * the keyboard controls.
   * @default 10
   */
		keyboardSpeed: {
			validator: _metal.core.isNumber,
			value: 10
		},

		/**
   * The minimum distance, in pixels, that the mouse needs to move before
   * the action is considered a drag.
   * @type {number}
   * @default 5
   */
		minimumDragDistance: {
			validator: _metal.core.isNumber,
			value: 5,
			writeOnce: true
		},

		/**
   * Elements with scroll, besides the document, that contain any of the given
   * sources. Can be either a single element or a selector for multiple elements.
   * @type {Element|string}
   */
		scrollContainers: {
			setter: 'setterScrollContainersFn_',
			validator: 'validateElementOrString_'
		},

		/**
   * Elements that should be draggable. Can be either a single element
   * or a selector for multiple elements.
   * @type {!Element|string}
   */
		sources: {
			validator: 'validateElementOrString_'
		},

		/**
   * The number of pixels that the source element should move at a time,
   * for each axis. When set to a value higher than 1, dragging won't be
   * a continuous movement, since the source element will move by multiple
   * pixels on each step.
   * @type {!{x: number, y: number}}
   */
		steps: {
			validator: _metal.core.isObject,
			valueFn: function valueFn() {
				return {
					x: 1,
					y: 1
				};
			}
		},

		/**
   * Flag indicating if a shim should be used for capturing document events.
   * This is important for allowing dragging nodes over iframes. If false,
   * events will be listened in the document itself instead.
   * @type {boolean}
   * @default true
   */
		useShim: {
			value: true
		}
	};

	/**
  * Holds the names of events that can be emitted by `Drag`.
  * @type {!Object}
  * @static
  */
	Drag.Events = {
		DRAG: 'drag',
		END: 'end'
	};

	/**
  * Holds the values that can be passed to the `dragPlaceholder` attribute.
  * @type {!Object}
  * @static
  */
	Drag.Placeholder = {
		CLONE: 'clone'
	};

	exports.default = Drag;
});
define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', './Drag', 'metal-position/src/all/position', 'metal-events/src/events'], function (exports, _metal, _dom, _Drag2, _position) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _Drag3 = _interopRequireDefault(_Drag2);

	var _position2 = _interopRequireDefault(_position);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
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
	}

	var DragDrop = function (_Drag) {
		_inherits(DragDrop, _Drag);

		/**
   * @inheritDoc
   */

		function DragDrop(opt_config) {
			_classCallCheck(this, DragDrop);

			var _this = _possibleConstructorReturn(this, _Drag.call(this, opt_config));

			/**
    * The currently active targets, that is, the ones that the dragged source is over.
    * @type {!Array<!Element>}
    * @protected
    */
			_this.activeTargets_ = [];
			return _this;
		}

		/**
   * Adds a target to this `DragDrop` instance.
   * @param {!Element} target
   */


		DragDrop.prototype.addTarget = function addTarget(target) {
			this.targets.push(target);
			this.targets = this.targets;
		};

		DragDrop.prototype.buildEventObject_ = function buildEventObject_() {
			var obj = _Drag.prototype.buildEventObject_.call(this);
			obj.target = this.activeTargets_[0];
			obj.allActiveTargets = this.activeTargets_;
			return obj;
		};

		DragDrop.prototype.cleanUpAfterDragging_ = function cleanUpAfterDragging_() {
			_Drag.prototype.cleanUpAfterDragging_.call(this);
			this.targets.forEach(function (target) {
				return target.removeAttribute('aria-dropeffect');
			});
			if (this.activeTargets_.length) {
				_dom2.default.removeClasses(this.activeTargets_[0], this.targetOverClass);
			}
			this.activeTargets_ = [];
		};

		DragDrop.prototype.findAllActiveTargets_ = function findAllActiveTargets_() {
			var activeTargets = [];
			var mainRegion;
			var sourceRegion = this.getSourceRegion_();
			var targets = this.targets;
			targets.forEach(function (target, index) {
				var region = _position2.default.getRegion(target);
				if (targets[index] !== this.activeDragPlaceholder_ && _position2.default.intersectRegion(region, sourceRegion)) {
					if (!mainRegion || _position2.default.insideRegion(mainRegion, region)) {
						activeTargets = [targets[index]].concat(activeTargets);
						mainRegion = region;
					} else {
						activeTargets.push(targets[index]);
					}
				}
			}.bind(this));
			return activeTargets;
		};

		DragDrop.prototype.getSourceRegion_ = function getSourceRegion_() {
			if (_metal.core.isDefAndNotNull(this.mousePos_)) {
				var x = this.mousePos_.x;
				var y = this.mousePos_.y;
				return _position2.default.makeRegion(y, 0, x, x, y, 0);
			} else {
				// We need to remove the scroll data from the region, since the other regions we'll
				// be comparing to won't take that information into account.
				var region = _metal.object.mixin({}, this.sourceRegion_);
				region.left -= document.body.scrollLeft;
				region.right -= document.body.scrollLeft;
				region.top -= document.body.scrollTop;
				region.bottom -= document.body.scrollTop;
				return region;
			}
		};

		DragDrop.prototype.removeTarget = function removeTarget(target) {
			_metal.array.remove(this.targets, target);
			this.targets = this.targets;
		};

		DragDrop.prototype.startDragging_ = function startDragging_() {
			var _this2 = this;

			if (this.ariaDropEffect) {
				this.targets.forEach(function (target) {
					return target.setAttribute('aria-dropeffect', _this2.ariaDropEffect);
				});
			}
			_Drag.prototype.startDragging_.call(this);
		};

		DragDrop.prototype.updatePosition = function updatePosition(deltaX, deltaY) {
			_Drag.prototype.updatePosition.call(this, deltaX, deltaY);

			var newTargets = this.findAllActiveTargets_();
			if (newTargets[0] !== this.activeTargets_[0]) {
				if (this.activeTargets_[0]) {
					_dom2.default.removeClasses(this.activeTargets_[0], this.targetOverClass);
					this.emit(DragDrop.Events.TARGET_LEAVE, this.buildEventObject_());
				}

				this.activeTargets_ = newTargets;
				if (this.activeTargets_[0]) {
					_dom2.default.addClasses(this.activeTargets_[0], this.targetOverClass);
					this.emit(DragDrop.Events.TARGET_ENTER, this.buildEventObject_());
				}
			}
		};

		return DragDrop;
	}(_Drag3.default);

	DragDrop.prototype.registerMetalComponent && DragDrop.prototype.registerMetalComponent(DragDrop, 'DragDrop')


	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */
	DragDrop.ATTRS = {
		/**
   * The "aria-dropeffect" value to be set for all targets. If not set,
   * this html attribute will have to be set manually on the targets.
   * @type {string}
   */
		ariaDropEffect: {
			validator: _metal.core.isString
		},

		/**
   * The CSS class that should be added to drop targets when a source
   * is being dragged over them.
   * @type {string}
   * @default 'dropOver'
   */
		targetOverClass: {
			validator: _metal.core.isString,
			value: 'targetOver'
		},

		/**
   * Elements that the sources can be dropped on. Can be either a single
   * element or a selector for multiple elements.
   * @type {!Element|string}
   */
		targets: {
			setter: 'toElements_',
			validator: 'validateElementOrString_'
		}
	};

	/**
  * Holds the names of events that can be emitted by `DragDrop`.
  * @type {!Object}
  * @static
  */
	DragDrop.Events = {
		DRAG: 'drag',
		END: 'end',
		TARGET_ENTER: 'targetEnter',
		TARGET_LEAVE: 'targetLeave'
	};

	exports.default = DragDrop;
});
define(['exports', '../Drag', '../DragDrop'], function (exports, _Drag, _DragDrop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DragDrop = exports.Drag = undefined;

  var _Drag2 = _interopRequireDefault(_Drag);

  var _DragDrop2 = _interopRequireDefault(_DragDrop);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Drag = _Drag2.default;
  exports.DragDrop = _DragDrop2.default;
});
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Slider.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Slider.
   */

  if (typeof Templates.Slider == 'undefined') {
    Templates.Slider = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Slider.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="slider component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.Slider.input(opt_data, null, opt_ijData) + Templates.Slider.label(opt_data, null, opt_ijData) + Templates.Slider.rail(opt_data, null, opt_ijData) + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Slider.render.soyTemplateName = 'Templates.Slider.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Slider.input = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-input"><input name="' + soy.$$escapeHtmlAttribute(opt_data.inputName ? opt_data.inputName : opt_data.id) + '" type="hidden" value="' + soy.$$escapeHtmlAttribute(opt_data.value) + '"></div>');
  };
  if (goog.DEBUG) {
    Templates.Slider.input.soyTemplateName = 'Templates.Slider.input';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Slider.label = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-label"><span>' + soy.$$escapeHtml(opt_data.value) + '</span></div>');
  };
  if (goog.DEBUG) {
    Templates.Slider.label.soyTemplateName = 'Templates.Slider.label';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Slider.rail = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-rail"><div class="rail" data-onmousedown="onRailMouseDown_"><div class="rail-active"></div><div class="rail-handle"><div class="handle" tabindex="0"></div></div></div></div>');
  };
  if (goog.DEBUG) {
    Templates.Slider.rail.soyTemplateName = 'Templates.Slider.rail';
  }

  Templates.Slider.render.params = ["id"];
  Templates.Slider.input.params = ["id", "inputName", "value"];
  Templates.Slider.label.params = ["id", "value"];
  Templates.Slider.rail.params = ["id"];

  var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider() {
      _classCallCheck(this, Slider);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Slider;
  }(_component2.default);

  Slider.prototype.registerMetalComponent && Slider.prototype.registerMetalComponent(Slider, 'Slider')

  Slider.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Slider');
  exports.default = Slider;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var Drag = this.metalNamed.drag.Drag;
	var Position = this.metal.position;
	var SliderBase = this.metal.Slider;

	/**
  * Slider component.
  */

	var Slider = function (_SliderBase) {
		babelHelpers.inherits(Slider, _SliderBase);

		/**
   * @inheritDoc
   */

		function Slider(opt_config) {
			babelHelpers.classCallCheck(this, Slider);


			/**
    * Map of different slider DOM elements. Used as a cache to prevent unnecessary dom lookups
    * on succesive queries.
    * @type {Map}
    * @protected
    */

			var _this = babelHelpers.possibleConstructorReturn(this, _SliderBase.call(this, opt_config));

			_this.elements_ = new Map();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Slider.prototype.attached = function attached() {
			/**
    * Manages dragging the rail handle to update the slider value.
    * @type {Drag}
    * @protected
    */
			this.drag_ = new Drag({
				constrain: this.getElement_('.rail'),
				handles: this.getElement_('.handle'),
				sources: this.getElement_('.rail-handle')
			});

			/**
    * Position and dimensions of the slider element.
    * @type {DOMRect}
    * @protected
    */
			this.elementRegion_ = Position.getRegion(this.element);

			this.attachDragEvents_();
		};

		/**
   * Attaches the drag events to handle value updates when dragging the rail handle.
   * protected
   */


		Slider.prototype.attachDragEvents_ = function attachDragEvents_() {
			this.drag_.on(Drag.Events.DRAG, this.updateValueFromDragData_.bind(this));
			this.drag_.on(Drag.Events.END, this.updateValueFromDragData_.bind(this));
		};

		/**
   * @inheritDoc
   */


		Slider.prototype.disposeInternal = function disposeInternal() {
			_SliderBase.prototype.disposeInternal.call(this);

			this.drag_.dispose();
			this.elements_ = null;
			this.elementRegion_ = null;
		};

		/**
   * Returns a DOM element inside the slider component based on a selector query.
   * @param {string} query Query selector matching the desired element inside the Slider.
   * @return {Element} The slider element, or null if none was found.
   * @protected
   */


		Slider.prototype.getElement_ = function getElement_(query) {
			var element = this.elements_.get(query);

			if (!element) {
				element = this.element.querySelector(query);

				this.elements_.set(query, element);
			}

			return element;
		};

		/**
   * Handles mouse down actions on the slider rail and updates the slider value accordingly.
   * @param {!Event} event
   * @protected
   */


		Slider.prototype.onRailMouseDown_ = function onRailMouseDown_(event) {
			if (event.target === this.getElement_('.rail') || event.target === this.getElement_('.rail-active')) {
				this.updateValue_(event.offsetX, 0);
			}
		};

		/**
   * Synchronizes the slider UI with the max attribute.
   * @param {number} newVal The new value of the attribute.
   */


		Slider.prototype.syncMax = function syncMax(newVal) {
			if (newVal < this.value) {
				this.value = newVal;
			} else {
				this.updateHandlePosition_();
			}
		};

		/**
   * Synchronizes the slider UI with the min attribute.
   * @param {number} newVal The new value of the attribute.
   */


		Slider.prototype.syncMin = function syncMin(newVal) {
			if (newVal > this.value) {
				this.value = newVal;
			} else {
				this.updateHandlePosition_();
			}
		};

		/**
   * Synchronizes the slider UI with the value attribute.
   * @param {number} newVal The new value of the attribute.
   */


		Slider.prototype.syncValue = function syncValue() {
			this.updateHandlePosition_();
		};

		/**
   * Updates the handle position and active region to reflect the current slider value.
   * @protected
   */


		Slider.prototype.updateHandlePosition_ = function updateHandlePosition_() {
			var positionValue = 100 * (this.value - this.min) / (this.max - this.min) + '%';

			if (!(this.drag_ && this.drag_.isDragging())) {
				this.getElement_('.rail-handle').style.left = positionValue;
			}

			this.getElement_('.rail-active').style.width = positionValue;
		};

		/**
   * Updates the slider value based on the UI state of the handle element.
   * @param {number} handlePosition Position of the handle in px.
   * @param {number} offset Offset to be added to normalize relative inputs.
   * @protected
   */


		Slider.prototype.updateValue_ = function updateValue_(handlePosition, offset) {
			this.value = Math.round(offset + handlePosition / this.elementRegion_.width * (this.max - this.min));
		};

		/**
   * Handles Drag events from the rail handle and updates the slider value accordingly.
   * @param {!Object} data
   * @protected
   */


		Slider.prototype.updateValueFromDragData_ = function updateValueFromDragData_(data) {
			this.updateValue_(data.relativeX, this.min);
		};

		return Slider;
	}(SliderBase);

	Slider.prototype.registerMetalComponent && Slider.prototype.registerMetalComponent(Slider, 'Slider')


	Slider.ATTRS = {
		/**
   * Name of the hidden input field that holds the slider value. Useful when slider is embedded
   * inside a form so it can automatically send its value.
   * @type {string}
   */
		inputName: {
			validator: core.isString
		},

		/**
   * Defines the maximum value handled by the slider.
   * @type {number}
   * @default 100
   */
		max: {
			value: 100
		},

		/**
   * Defines the minimum value handled by the slider.
   * @type {number}
   * @default 0
   */
		min: {
			value: 0
		},

		/**
   * Defines the currently selected value on the slider.
   * @type {number}
   * @default 50
   */
		value: {
			validator: function validator(val) {
				return core.isNumber(val) && this.min <= val && val <= this.max;
			},
			value: 80
		}
	};

	/**
  * Default slider elementClasses.
  * @default slider
  * @type {string}
  * @static
  */
	Slider.ELEMENT_CLASSES = 'slider';

	this.metal.Slider = Slider;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Switcher.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Switcher.
   */

  if (typeof Templates.Switcher == 'undefined') {
    Templates.Switcher = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Switcher.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="switcher component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + soy.$$escapeHtmlAttribute(opt_data.checked ? ' switcher-on' : '') + '"><div class="switcher-control"><div class="switcher-control-icon"></div></div></div>');
  };
  if (goog.DEBUG) {
    Templates.Switcher.render.soyTemplateName = 'Templates.Switcher.render';
  }

  Templates.Switcher.render.params = ["id"];

  var Switcher = function (_Component) {
    _inherits(Switcher, _Component);

    function Switcher() {
      _classCallCheck(this, Switcher);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Switcher;
  }(_component2.default);

  Switcher.prototype.registerMetalComponent && Switcher.prototype.registerMetalComponent(Switcher, 'Switcher')

  Switcher.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Switcher');
  exports.default = Switcher;
});
'use strict';

(function () {
	var core = this.metal.metal;
	var dom = this.metal.dom;
	var SwitcherBase = this.metal.Switcher;

	/**
  * Switcher component.
  */

	var Switcher = function (_SwitcherBase) {
		babelHelpers.inherits(Switcher, _SwitcherBase);

		function Switcher() {
			babelHelpers.classCallCheck(this, Switcher);
			return babelHelpers.possibleConstructorReturn(this, _SwitcherBase.apply(this, arguments));
		}

		/**
   * @inheritDoc
   */

		Switcher.prototype.attached = function attached() {
			this.on('click', this.handleClick);
		};

		/**
   * Handles switcher click.
   */


		Switcher.prototype.handleClick = function handleClick() {
			this.checked = !this.checked;
		};

		/**
   * Synchronization logic for the `checked` attribute.
   * @param {boolean} checked
   */


		Switcher.prototype.syncChecked = function syncChecked(checked) {
			dom[checked ? 'addClasses' : 'removeClasses'](this.element, 'switcher-on');
		};

		return Switcher;
	}(SwitcherBase);

	/**
  * Default switcher elementClasses.
  * @default list
  * @type {string}
  * @static
  */


	Switcher.prototype.registerMetalComponent && Switcher.prototype.registerMetalComponent(Switcher, 'Switcher')
	Switcher.ELEMENT_CLASSES = 'switcher';

	/**
  * Switcher attributes definition.
  * @type {!Object}
  * @static
  */
	Switcher.ATTRS = {
		/**
   * Flag indicating if the switcher is currently checked or not.
   * @type {boolean}
   * @default false
   */
		checked: {
			validator: core.isBoolean,
			value: false
		}
	};

	this.metal.Switcher = Switcher;
}).call(this);
define(['exports', 'metal-component/src/all/component', 'metal-soy/src/soy'], function (exports, _component, _soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
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
  }

  var Templates = _soy.SoyTemplates.get();
  // This file was automatically generated from Treeview.soy.
  // Please don't edit this file by hand.

  /**
   * @fileoverview Templates in namespace Templates.Treeview.
   */

  if (typeof Templates.Treeview == 'undefined') {
    Templates.Treeview = {};
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Treeview.render = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="treeview component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="tree">' + Templates.Treeview.nodes(opt_data, null, opt_ijData) + '</div>');
  };
  if (goog.DEBUG) {
    Templates.Treeview.render.soyTemplateName = 'Templates.Treeview.render';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Treeview.nodes = function (opt_data, opt_ignored, opt_ijData) {
    var output = '';
    var elementId__soy11 = opt_data.id + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'nodes');
    output += '<ul id="' + soy.$$escapeHtmlAttribute(elementId__soy11) + '" class="treeview-nodes">';
    var nodeList15 = opt_data.nodes;
    var nodeListLen15 = nodeList15.length;
    for (var nodeIndex15 = 0; nodeIndex15 < nodeListLen15; nodeIndex15++) {
      var nodeData15 = nodeList15[nodeIndex15];
      var index__soy16 = nodeIndex15;
      output += Templates.Treeview.node({ id: opt_data.id, node: nodeData15, surfaceId: opt_data.parentSurfaceId != null ? opt_data.parentSurfaceId + '-' + index__soy16 : index__soy16 }, null, opt_ijData);
    }
    output += '</ul>';
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
  };
  if (goog.DEBUG) {
    Templates.Treeview.nodes.soyTemplateName = 'Templates.Treeview.nodes';
  }

  /**
   * @param {Object.<string, *>=} opt_data
   * @param {(null|undefined)=} opt_ignored
   * @param {Object.<string, *>=} opt_ijData
   * @return {!soydata.SanitizedHtml}
   * @suppress {checkTypes}
   */
  Templates.Treeview.node = function (opt_data, opt_ignored, opt_ijData) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '" class="treeview-node">' + (opt_data.node ? '<div class="treeview-node-wrapper' + soy.$$escapeHtmlAttribute(opt_data.node.expanded ? ' expanded' : '') + '"><div class="treeview-node-main clearfix' + soy.$$escapeHtmlAttribute(opt_data.node.children ? ' hasChildren' : '') + '" data-onclick="handleNodeClicked_" data-onkeyup="handleNodeKeyUp_" aria-expanded="' + soy.$$escapeHtmlAttribute(opt_data.node.expanded ? 'true' : 'false') + '" role="treeitem" tabindex="0">' + (opt_data.node.children ? '<div class="treeview-node-toggler"></div>' : '') + '<span class="treeview-node-name">' + soy.$$escapeHtml(opt_data.node.name) + '</span></div>' + (opt_data.node.children ? Templates.Treeview.nodes({ id: opt_data.id, nodes: opt_data.node.children, parentSurfaceId: opt_data.surfaceId, surfaceId: opt_data.surfaceId + '-nodes' }, null, opt_ijData) : '') + '</div>' : '') + '</li>');
  };
  if (goog.DEBUG) {
    Templates.Treeview.node.soyTemplateName = 'Templates.Treeview.node';
  }

  Templates.Treeview.render.params = ["id"];
  Templates.Treeview.nodes.params = ["id", "nodes", "parentSurfaceId", "surfaceId"];
  Templates.Treeview.node.private = true;

  var Treeview = function (_Component) {
    _inherits(Treeview, _Component);

    function Treeview() {
      _classCallCheck(this, Treeview);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Treeview;
  }(_component2.default);

  Treeview.prototype.registerMetalComponent && Treeview.prototype.registerMetalComponent(Treeview, 'Treeview')

  Treeview.RENDERER = _soy.SoyRenderer;
  _soy.SoyAop.registerTemplates('Treeview');
  exports.default = Treeview;
});
'use strict';

(function () {
	var dom = this.metal.dom;
	var TreeviewBase = this.metal.Treeview;

	/**
  * Treeview component.
  */

	var Treeview = function (_TreeviewBase) {
		babelHelpers.inherits(Treeview, _TreeviewBase);

		function Treeview() {
			babelHelpers.classCallCheck(this, Treeview);
			return babelHelpers.possibleConstructorReturn(this, _TreeviewBase.apply(this, arguments));
		}

		/**
   * Called after this component has been attached to the dom.
   */

		Treeview.prototype.attached = function attached() {
			this.on('nodesChanged', this.onNodesChanged_);
			this.getRenderer().on('renderSurface', this.handleRenderSurface_.bind(this));
		};

		/**
   * Gets the node object from the nodes attribute that is located at the given
   * index path.
   * @param {!Array<number>} path An array of indexes indicating where the searched
   *   node is located inside the nodes attribute.
   * @return {!Object}
   */


		Treeview.prototype.getNodeObj = function getNodeObj(path) {
			var obj = this.nodes[path[0]];
			for (var i = 1; i < path.length; i++) {
				obj = obj.children[path[i]];
			}
			return obj;
		};

		/**
   * Gets the node object that the given element id represents from the nodes
   * attribute
   * @param {string} id
   * @return {!Object}
   */


		Treeview.prototype.getNodeObjFromId_ = function getNodeObjFromId_(id) {
			var path = id.substr(this.id.length + 1).split('-');
			return this.getNodeObj(path);
		};

		/**
   * This is called when one of this tree view's nodes is clicked.
   * @param {!Event} event
   * @protected
   */


		Treeview.prototype.handleNodeClicked_ = function handleNodeClicked_(event) {
			this.toggleExpandedState_(event.delegateTarget);
		};

		/**
   * This is called when one of this tree view's nodes receives a keypress.
   * If the pressed key is ENTER or SPACE, the node's expanded state will be toggled.
   * @param {!Event} event
   * @protected
   */


		Treeview.prototype.handleNodeKeyUp_ = function handleNodeKeyUp_(event) {
			if (event.keyCode === 13 || event.keyCode === 32) {
				this.toggleExpandedState_(event.delegateTarget);
			}
		};

		/**
   * Handles a `renderSurface` event. Prevents rerendering surfaces when the changes
   * the surface was caused by a ui event that has already updated the screen.
   * @param {!Object} data
   * @param {!Object} event
   * @protected
   */


		Treeview.prototype.handleRenderSurface_ = function handleRenderSurface_(data, event) {
			if (this.ignoreSurfaceUpdate_) {
				event.preventDefault();
				this.ignoreSurfaceUpdate_ = false;
			}
		};

		/**
   * Fired when the `nodes` attribute changes. Make sure that any other
   * updates to the `nodes` attribute made after ignoreSurfaceUpdate_ is
   * set to true, cause surfaces to update again.
   * @protected
   */


		Treeview.prototype.onNodesChanged_ = function onNodesChanged_() {
			this.ignoreSurfaceUpdate_ = false;
		};

		/**
   * Toggles the expanded state for the given tree node.
   * @param {!Element} node
   * @protected
   */


		Treeview.prototype.toggleExpandedState_ = function toggleExpandedState_(node) {
			var nodeObj = this.getNodeObjFromId_(node.parentNode.parentNode.id);
			nodeObj.expanded = !nodeObj.expanded;
			if (nodeObj.expanded) {
				dom.addClasses(node.parentNode, 'expanded');
				node.setAttribute('aria-expanded', 'true');
			} else {
				dom.removeClasses(node.parentNode, 'expanded');
				node.setAttribute('aria-expanded', 'false');
			}

			this.nodes = this.nodes;
			this.ignoreSurfaceUpdate_ = true;
		};

		return Treeview;
	}(TreeviewBase);

	/**
  * Default tree view elementClasses.
  * @default treeView
  * @type {string}
  * @static
  */


	Treeview.prototype.registerMetalComponent && Treeview.prototype.registerMetalComponent(Treeview, 'Treeview')
	Treeview.ELEMENT_CLASSES = 'treeview';

	/**
  * Treeview attributes definition.
  * @type {!Object}
  * @static
  */
	Treeview.ATTRS = {
		/**
   * This tree view's nodes. Each node should have a name, and can optionally
   * have nested children nodes. It should also indicate if its children are
   * expanded or not.
   * @type {Array<!{children: Array, expanded: boolean?, name: string}>}
   * @default []
   */
		nodes: {
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		}
	};

	this.metal.Treeview = Treeview;
}).call(this);
}).call(this);
//# sourceMappingURL=metal.js.map
