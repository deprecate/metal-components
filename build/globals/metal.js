(function() {
this.metal = this.metal || {};
this.metalNamed = this.metalNamed || {};
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;
'use strict';

/**
 * A collection of core utility functions.
 * @const
 */

(function () {
  var compatibilityModeData_ = void 0;

  /**
   * Counter for unique id.
   * @type {Number}
   * @private
   */
  var uniqueIdCounter_ = 1;

  /**
   * Unique id property prefix.
   * @type {String}
   * @protected
   */
  var UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

  this['metalNamed']['coreNamed'] = this['metalNamed']['coreNamed'] || {};
  this['metalNamed']['coreNamed']['UID_PROPERTY'] = UID_PROPERTY; /**
                                                                   * When defining a class Foo with an abstract method bar(), you can do:
                                                                   * Foo.prototype.bar = abstractMethod
                                                                   *
                                                                   * Now if a subclass of Foo fails to override bar(), an error will be thrown
                                                                   * when bar() is invoked.
                                                                   *
                                                                   * @type {!Function}
                                                                   * @throws {Error} when invoked to indicate the method should be overridden.
                                                                   */

  function abstractMethod() {
    throw Error('Unimplemented abstract method');
  }

  this['metalNamed']['coreNamed']['abstractMethod'] = abstractMethod; /**
                                                                       * Loops constructor super classes collecting its properties values. If
                                                                       * property is not available on the super class `undefined` will be
                                                                       * collected as value for the class hierarchy position.
                                                                       * @param {!function()} constructor Class constructor.
                                                                       * @param {string} propertyName Property name to be collected.
                                                                       * @return {Array.<*>} Array of collected values.
                                                                       * TODO(*): Rethink superclass loop.
                                                                       */

  function collectSuperClassesProperty(constructor, propertyName) {
    var propertyValues = [constructor[propertyName]];
    while (constructor.__proto__ && !constructor.__proto__.isPrototypeOf(Function)) {
      constructor = constructor.__proto__;
      propertyValues.push(constructor[propertyName]);
    }
    return propertyValues;
  }

  this['metalNamed']['coreNamed']['collectSuperClassesProperty'] = collectSuperClassesProperty; /**
                                                                                                 * Disables Metal.js's compatibility mode.
                                                                                                 */

  function disableCompatibilityMode() {
    compatibilityModeData_ = null;
  }

  this['metalNamed']['coreNamed']['disableCompatibilityMode'] = disableCompatibilityMode; /**
                                                                                           * Enables Metal.js's compatibility mode with the following features from rc
                                                                                           * and 1.x versions:
                                                                                           *     - Using "key" to reference component instances. In the current version
                                                                                           *       this should be done via "ref" instead. This allows old code still
                                                                                           *       using "key" to keep working like before. NOTE: this may cause
                                                                                           *       problems, since "key" is meant to be used differently. Only use this
                                                                                           *       if it's not possible to upgrade the code to use "ref" instead.
                                                                                           * @param {Object=} opt_data Optional object with data to specify more
                                                                                           *     details, such as:
                                                                                           *         - renderers {Array} the template renderers that should be in
                                                                                           *           compatibility mode, either their constructors or strings
                                                                                           *           representing them (e.g. 'soy' or 'jsx'). By default, all the ones
                                                                                           *           that extend from IncrementalDomRenderer.
                                                                                           * @type {Object}
                                                                                           */

  function enableCompatibilityMode() {
    var opt_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    compatibilityModeData_ = opt_data;
  }

  this['metalNamed']['coreNamed']['enableCompatibilityMode'] = enableCompatibilityMode; /**
                                                                                         * Returns the data used for compatibility mode, or nothing if it hasn't been
                                                                                         * enabled.
                                                                                         * @return {Object}
                                                                                         */

  function getCompatibilityModeData() {
    // Compatibility mode can be set via the __METAL_COMPATIBILITY__ global var.
    if (!compatibilityModeData_) {
      if (typeof window !== 'undefined' && window.__METAL_COMPATIBILITY__) {
        enableCompatibilityMode(window.__METAL_COMPATIBILITY__);
      }
    }
    return compatibilityModeData_;
  }

  this['metalNamed']['coreNamed']['getCompatibilityModeData'] = getCompatibilityModeData; /**
                                                                                           * Gets the name of the given function. If the current browser doesn't
                                                                                           * support the `name` property, this will calculate it from the function's
                                                                                           * content string.
                                                                                           * @param {!function()} fn
                                                                                           * @return {string}
                                                                                           */

  function getFunctionName(fn) {
    if (!fn.name) {
      var str = fn.toString();
      fn.name = str.substring(9, str.indexOf('('));
    }
    return fn.name;
  }

  this['metalNamed']['coreNamed']['getFunctionName'] = getFunctionName; /**
                                                                         * Gets an unique id. If `opt_object` argument is passed, the object is
                                                                         * mutated with an unique id. Consecutive calls with the same object
                                                                         * reference won't mutate the object again, instead the current object uid
                                                                         * returns. See {@link UID_PROPERTY}.
                                                                         * @param {Object=} opt_object Optional object to be mutated with the uid. If
                                                                         *     not specified this method only returns the uid.
                                                                         * @param {boolean=} opt_noInheritance Optional flag indicating if this
                                                                         *     object's uid property can be inherited from parents or not.
                                                                         * @throws {Error} when invoked to indicate the method should be overridden.
                                                                         */

  function getUid(opt_object, opt_noInheritance) {
    if (opt_object) {
      var id = opt_object[UID_PROPERTY];
      if (opt_noInheritance && !opt_object.hasOwnProperty(UID_PROPERTY)) {
        id = null;
      }
      return id || (opt_object[UID_PROPERTY] = uniqueIdCounter_++);
    }
    return uniqueIdCounter_++;
  }

  this['metalNamed']['coreNamed']['getUid'] = getUid; /**
                                                       * The identity function. Returns its first argument.
                                                       * @param {*=} opt_returnValue The single value that will be returned.
                                                       * @return {?} The first argument.
                                                       */

  function identityFunction(opt_returnValue) {
    return opt_returnValue;
  }

  this['metalNamed']['coreNamed']['identityFunction'] = identityFunction; /**
                                                                           * Returns true if the specified value is a boolean.
                                                                           * @param {?} val Variable to test.
                                                                           * @return {boolean} Whether variable is boolean.
                                                                           */

  function isBoolean(val) {
    return typeof val === 'boolean';
  }

  this['metalNamed']['coreNamed']['isBoolean'] = isBoolean; /**
                                                             * Returns true if the specified value is not undefined.
                                                             * @param {?} val Variable to test.
                                                             * @return {boolean} Whether variable is defined.
                                                             */

  function isDef(val) {
    return val !== undefined;
  }

  this['metalNamed']['coreNamed']['isDef'] = isDef; /**
                                                     * Returns true if value is not undefined or null.
                                                     * @param {*} val
                                                     * @return {boolean}
                                                     */

  function isDefAndNotNull(val) {
    return isDef(val) && !isNull(val);
  }

  this['metalNamed']['coreNamed']['isDefAndNotNull'] = isDefAndNotNull; /**
                                                                         * Returns true if value is a document.
                                                                         * @param {*} val
                                                                         * @return {boolean}
                                                                         */

  function isDocument(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 9;
  }

  this['metalNamed']['coreNamed']['isDocument'] = isDocument; /**
                                                               * Returns true if value is a dom element.
                                                               * @param {*} val
                                                               * @return {boolean}
                                                               */

  function isElement(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 1;
  }

  this['metalNamed']['coreNamed']['isElement'] = isElement; /**
                                                             * Returns true if the specified value is a function.
                                                             * @param {?} val Variable to test.
                                                             * @return {boolean} Whether variable is a function.
                                                             */

  function isFunction(val) {
    return typeof val === 'function';
  }

  this['metalNamed']['coreNamed']['isFunction'] = isFunction; /**
                                                               * Returns true if value is null.
                                                               * @param {*} val
                                                               * @return {boolean}
                                                               */

  function isNull(val) {
    return val === null;
  }

  this['metalNamed']['coreNamed']['isNull'] = isNull; /**
                                                       * Returns true if the specified value is a number.
                                                       * @param {?} val Variable to test.
                                                       * @return {boolean} Whether variable is a number.
                                                       */

  function isNumber(val) {
    return typeof val === 'number';
  }

  this['metalNamed']['coreNamed']['isNumber'] = isNumber; /**
                                                           * Returns true if value is a window.
                                                           * @param {*} val
                                                           * @return {boolean}
                                                           */

  function isWindow(val) {
    return val !== null && val === val.window;
  }

  this['metalNamed']['coreNamed']['isWindow'] = isWindow; /**
                                                           * Returns true if the specified value is an object. This includes arrays
                                                           * and functions.
                                                           * @param {?} val Variable to test.
                                                           * @return {boolean} Whether variable is an object.
                                                           */

  function isObject(val) {
    var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
    return type === 'object' && val !== null || type === 'function';
  }

  this['metalNamed']['coreNamed']['isObject'] = isObject; /**
                                                           * Returns true if value is a Promise.
                                                           * @param {*} val
                                                           * @return {boolean}
                                                           */

  function isPromise(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && typeof val.then === 'function';
  }

  this['metalNamed']['coreNamed']['isPromise'] = isPromise; /**
                                                             * Returns true if value is a string.
                                                             * @param {*} val
                                                             * @return {boolean}
                                                             */

  function isString(val) {
    return typeof val === 'string' || val instanceof String;
  }

  this['metalNamed']['coreNamed']['isString'] = isString; /**
                                                           * Merges the values of a export function property a class with the values of that
                                                           * property for all its super classes, and stores it as a new static
                                                           * property of that class. If the export function property already existed, it won't
                                                           * be recalculated.
                                                           * @param {!function()} constructor Class constructor.
                                                           * @param {string} propertyName Property name to be collected.
                                                           * @param {function(*, *):*=} opt_mergeFn Function that receives an array filled
                                                           *   with the values of the property for the current class and all its super classes.
                                                           *   Should return the merged value to be stored on the current class.
                                                           * @return {boolean} Returns true if merge happens, false otherwise.
                                                           */

  function mergeSuperClassesProperty(constructor, propertyName, opt_mergeFn) {
    var mergedName = propertyName + '_MERGED';
    if (constructor.hasOwnProperty(mergedName)) {
      return false;
    }

    var merged = collectSuperClassesProperty(constructor, propertyName);
    if (opt_mergeFn) {
      merged = opt_mergeFn(merged);
    }
    constructor[mergedName] = merged;
    return true;
  }

  this['metalNamed']['coreNamed']['mergeSuperClassesProperty'] = mergeSuperClassesProperty; /**
                                                                                             * Null function used for default values of callbacks, etc.
                                                                                             * @return {void} Nothing.
                                                                                             */

  function nullFunction() {}
  this['metalNamed']['coreNamed']['nullFunction'] = nullFunction;
}).call(this);
'use strict';

// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

(function () {
  var core = this['metalNamed']['coreNamed'];
  this['metal']['core'] = core;
  this['metalNamed']['core'] = this['metalNamed']['core'] || {};
  this['metalNamed']['core']['core'] = core;
  Object.keys(this['metalNamed']['coreNamed']).forEach(function (key) {
    this['metalNamed']['core'][key] = this['metalNamed']['coreNamed'][key];
  });
}).call(this);
'use strict';

(function () {
	var isDef = this['metalNamed']['core']['isDef'];

	var array = function () {
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
				if (arr1.length !== arr2.length) {
					return false;
				}
				for (var i = 0; i < arr1.length; i++) {
					if (arr1[i] !== arr2[i]) {
						return false;
					}
				}
				return true;
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

			/**
    * Slices the given array, just like Array.prototype.slice, but this
    * is faster and working on all array-like objects (like arguments).
    * @param {!Object} arr Array-like object to slice.
    * @param {number} start The index that should start the slice.
    * @param {number=} opt_end The index where the slice should end, not
    *   included in the final array. If not given, all elements after the
    *   start index will be included.
    * @return {!Array}
    */

		}, {
			key: 'slice',
			value: function slice(arr, start, opt_end) {
				var sliced = [];
				var end = isDef(opt_end) ? opt_end : arr.length;
				for (var i = start; i < end; i++) {
					sliced.push(arr[i]);
				}
				return sliced;
			}
		}]);
		return array;
	}();

	this['metal']['array'] = array;
}).call(this);
/*!
 * Polyfill from Google's Closure Library.
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 */

'use strict';

(function () {
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

	this['metal']['async'] = async;
}).call(this);
'use strict';

/**
 * Disposable utility. When inherited provides the `dispose` function to its
 * subclass, which is responsible for disposing of any object references
 * when an instance won't be used anymore. Subclasses should override
 * `disposeInternal` to implement any specific disposing logic.
 * @constructor
 */

(function () {
	var Disposable = function () {
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
	}();

	this['metal']['Disposable'] = Disposable;
}).call(this);
'use strict';

(function () {
	var object = function () {
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
    * @return {?} The value (object or primitive) or, if not found, undefined.
    */

		}, {
			key: 'getObjectByName',
			value: function getObjectByName(name, opt_obj) {
				var scope = opt_obj || window;
				var parts = name.split('.');
				return parts.reduce(function (part, key) {
					return part[key];
				}, scope);
			}

			/**
    * Returns a new object with the same keys as the given one, but with
    * their values set to the return values of the specified function.
    * @param {!Object} obj
    * @param {!function(string, *)} fn
    * @return {!Object}
    */

		}, {
			key: 'map',
			value: function map(obj, fn) {
				var mappedObj = {};
				var keys = Object.keys(obj);
				for (var i = 0; i < keys.length; i++) {
					mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
				}
				return mappedObj;
			}

			/**
    * Checks if the two given objects are equal. This is done via a shallow
    * check, including only the keys directly contained by the 2 objects.
    * @return {boolean}
    */

		}, {
			key: 'shallowEqual',
			value: function shallowEqual(obj1, obj2) {
				if (obj1 === obj2) {
					return true;
				}

				var keys1 = Object.keys(obj1);
				var keys2 = Object.keys(obj2);
				if (keys1.length !== keys2.length) {
					return false;
				}

				for (var i = 0; i < keys1.length; i++) {
					if (obj1[keys1[i]] !== obj2[keys1[i]]) {
						return false;
					}
				}
				return true;
			}
		}]);
		return object;
	}();

	this['metal']['object'] = object;
}).call(this);
'use strict';

(function () {
	var string = function () {
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
   * Escapes characters in the string that are not safe to use in a RegExp.
   * @param {*} str The string to escape. If not a string, it will be casted
   *     to one.
   * @return {string} A RegExp safe, escaped copy of {@code s}.
   */

		}, {
			key: 'escapeRegex',
			value: function escapeRegex(str) {
				return String(str).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
			}

			/**
   * Returns a string with at least 64-bits of randomness.
   * @return {string} A random string, e.g. sn1s7vb4gcic.
   */

		}, {
			key: 'getRandomString',
			value: function getRandomString() {
				var x = 2147483648;
				return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
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
	}();

	this['metal']['string'] = string;
}).call(this);
'use strict';

(function () {
  var core = this['metal']['core'];
  var array = this['metal']['array'];
  var async = this['metal']['async'];
  var Disposable = this['metal']['Disposable'];
  var object = this['metal']['object'];
  var string = this['metal']['string'];
  this['metalNamed']['metal'] = this['metalNamed']['metal'] || {};
  Object.keys(this['metalNamed']['core']).forEach(function (key) {
    this['metalNamed']['metal'][key] = this['metalNamed']['core'][key];
  });
  this['metalNamed']['metal']['array'] = array;
  this['metalNamed']['metal']['async'] = async;
  this['metalNamed']['metal']['Disposable'] = Disposable;
  this['metalNamed']['metal']['object'] = object;
  this['metalNamed']['metal']['string'] = string;
  this['metal']['metal'] = core;
}).call(this);
'use strict';

(function () {
	var METAL_DATA = '__metal_data__';

	var domData = function () {
		function domData() {
			babelHelpers.classCallCheck(this, domData);
		}

		babelHelpers.createClass(domData, null, [{
			key: 'get',

			/**
    * Gets Metal.js's data for the given element.
    * @param {!Element} element
    * @return {!Object}
    */
			value: function get(element) {
				if (!element[METAL_DATA]) {
					element[METAL_DATA] = {
						delegating: {},
						listeners: {}
					};
				}
				return element[METAL_DATA];
			}
		}]);
		return domData;
	}();

	this['metal']['domData'] = domData;
}).call(this);
'use strict';

(function () {
	var Disposable = this['metalNamed']['metal']['Disposable'];

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

	var EventHandle = function (_Disposable) {
		babelHelpers.inherits(EventHandle, _Disposable);

		function EventHandle(emitter, event, listener) {
			babelHelpers.classCallCheck(this, EventHandle);

			/**
    * The EventEmitter instance that the event was subscribed to.
    * @type {EventEmitter}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventHandle.__proto__ || Object.getPrototypeOf(EventHandle)).call(this));

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
	}(Disposable);

	this['metal']['EventHandle'] = EventHandle;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var Disposable = this['metalNamed']['metal']['Disposable'];
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isString = this['metalNamed']['metal']['isString'];
	var EventHandle = this['metal']['EventHandle'];

	/**
  * EventEmitter utility.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitter = function (_Disposable) {
		babelHelpers.inherits(EventEmitter, _Disposable);

		function EventEmitter() {
			babelHelpers.classCallCheck(this, EventEmitter);

			/**
    * Holds event listeners scoped by event type.
    * @type {!Object<string, !Array<!function()>>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).call(this));

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
					default: opt_default,
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
				var args = array.slice(arguments, 1);
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
				return isString(events) ? [events] : events;
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
				if (!isFunction(listener)) {
					throw new TypeError('Listener must be a function');
				}
			}
		}]);
		return EventEmitter;
	}(Disposable);

	this['metal']['EventEmitter'] = EventEmitter;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var object = this['metalNamed']['metal']['object'];
	var Disposable = this['metalNamed']['metal']['Disposable'];

	/**
  * EventEmitterProxy utility. It's responsible for linking two EventEmitter
  * instances together, emitting events from the first emitter through the
  * second one. That means that listening to a supported event on the target
  * emitter will mean listening to it on the origin emitter as well.
  * @param {EventEmitter} originEmitter Events originated on this emitter
  *   will be fired for the target emitter's listeners as well.
  * @param {EventEmitter} targetEmitter Event listeners attached to this emitter
  *   will also be triggered when the event is fired by the origin emitter.
  * @param {Object} opt_blacklist Optional blacklist of events that should not be
  *   proxied.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitterProxy = function (_Disposable) {
		babelHelpers.inherits(EventEmitterProxy, _Disposable);

		function EventEmitterProxy(originEmitter, targetEmitter, opt_blacklist, opt_whitelist) {
			babelHelpers.classCallCheck(this, EventEmitterProxy);

			/**
    * Map of events that should not be proxied.
    * @type {Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventEmitterProxy.__proto__ || Object.getPrototypeOf(EventEmitterProxy)).call(this));

			_this.blacklist_ = object.mixin({
				newListener: true
			}, opt_blacklist);

			/**
    * The origin emitter. This emitter's events will be proxied through the
    * target emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.originEmitter_ = originEmitter;

			/**
    * A list of events that are pending to be listened by an actual origin
    * emitter. Events are stored here when the origin doesn't exist, so they
    * can be set on a new origin when one is set.
    * @type {!Array}
    * @protected
    */
			_this.pendingEvents_ = [];

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


		babelHelpers.createClass(EventEmitterProxy, [{
			key: 'addListener_',
			value: function addListener_(event, listener) {
				return this.originEmitter_.on(event, listener);
			}

			/**
    * Adds the proxy listener for the given event.
    * @param {string} event
    * @return {!EventHandle} The listened event's handle.
    * @protected
    */

		}, {
			key: 'addListenerForEvent_',
			value: function addListenerForEvent_(event) {
				return this.addListener_(event, this.emitOnTarget_.bind(this, event));
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeListeners_();
				this.proxiedEvents_ = null;
				this.originEmitter_ = null;
				this.targetEmitter_ = null;
			}

			/**
    * Emits the specified event type on the target emitter.
    * @param {string} eventType
    * @protected
    */

		}, {
			key: 'emitOnTarget_',
			value: function emitOnTarget_(eventType) {
				var args = [eventType].concat(array.slice(arguments, 1));
				this.targetEmitter_.emit.apply(this.targetEmitter_, args);
			}

			/**
    * Proxies the given event from the origin to the target emitter.
    * @param {string} event
    */

		}, {
			key: 'proxyEvent',
			value: function proxyEvent(event) {
				if (this.shouldProxyEvent_(event)) {
					this.tryToAddListener_(event);
				}
			}

			/**
    * Removes the proxy listener for all events.
    * @protected
    */

		}, {
			key: 'removeListeners_',
			value: function removeListeners_() {
				var events = Object.keys(this.proxiedEvents_);
				for (var i = 0; i < events.length; i++) {
					this.proxiedEvents_[events[i]].removeListener();
				}
				this.proxiedEvents_ = {};
				this.pendingEvents_ = [];
			}

			/**
    * Changes the origin emitter. This automatically detaches any events that
    * were already being proxied from the previous emitter, and starts proxying
    * them on the new emitter instead.
    * @param {!EventEmitter} originEmitter
    */

		}, {
			key: 'setOriginEmitter',
			value: function setOriginEmitter(originEmitter) {
				var _this2 = this;

				var events = this.originEmitter_ ? Object.keys(this.proxiedEvents_) : this.pendingEvents_;
				this.removeListeners_();
				this.originEmitter_ = originEmitter;
				events.forEach(function (event) {
					return _this2.proxyEvent(event);
				});
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
				return !this.proxiedEvents_[event];
			}

			/**
    * Starts proxying all events from the origin to the target emitter.
    * @protected
    */

		}, {
			key: 'startProxy_',
			value: function startProxy_() {
				this.targetEmitter_.on('newListener', this.proxyEvent.bind(this));
			}

			/**
    * Adds a listener to the origin emitter, if it exists. Otherwise, stores
    * the pending listener so it can be used on a future origin emitter.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'tryToAddListener_',
			value: function tryToAddListener_(event) {
				if (this.originEmitter_) {
					this.proxiedEvents_[event] = this.addListenerForEvent_(event);
				} else {
					this.pendingEvents_.push(event);
				}
			}
		}]);
		return EventEmitterProxy;
	}(Disposable);

	this['metal']['EventEmitterProxy'] = EventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var Disposable = this['metalNamed']['metal']['Disposable'];

	/**
  * EventHandler utility. It's useful for easily removing a group of
  * listeners from different EventEmitter instances.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandler = function (_Disposable) {
		babelHelpers.inherits(EventHandler, _Disposable);

		function EventHandler() {
			babelHelpers.classCallCheck(this, EventHandler);

			/**
    * An array that holds the added event handles, so the listeners can be
    * removed later.
    * @type {Array.<EventHandle>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventHandler.__proto__ || Object.getPrototypeOf(EventHandler)).call(this));

			_this.eventHandles_ = [];
			return _this;
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
	}(Disposable);

	this['metal']['EventHandler'] = EventHandler;
}).call(this);
'use strict';

(function () {
  var EventEmitter = this['metal']['EventEmitter'];
  var EventEmitterProxy = this['metal']['EventEmitterProxy'];
  var EventHandle = this['metal']['EventHandle'];
  var EventHandler = this['metal']['EventHandler'];
  this['metal']['events'] = EventEmitter;
  this['metalNamed']['events'] = this['metalNamed']['events'] || {};
  this['metalNamed']['events']['EventEmitter'] = EventEmitter;
  this['metalNamed']['events']['EventEmitterProxy'] = EventEmitterProxy;
  this['metalNamed']['events']['EventHandle'] = EventHandle;
  this['metalNamed']['events']['EventHandler'] = EventHandler;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var isString = this['metalNamed']['metal']['isString'];
	var domData = this['metal']['domData'];
	var EventHandle = this['metalNamed']['events']['EventHandle'];

	/**
  * This is a special EventHandle, that is responsible for dom delegated events
  * (only the ones that receive a target element, not a selector string).
  * @extends {EventHandle}
  */

	var DomDelegatedEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomDelegatedEventHandle, _EventHandle);

		/**
   * The constructor for `DomDelegatedEventHandle`.
   * @param {!Event} emitter Element the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {string=} opt_selector An optional selector used when delegating
   *     the event.
   * @constructor
   */
		function DomDelegatedEventHandle(emitter, event, listener, opt_selector) {
			babelHelpers.classCallCheck(this, DomDelegatedEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, (DomDelegatedEventHandle.__proto__ || Object.getPrototypeOf(DomDelegatedEventHandle)).call(this, emitter, event, listener));

			_this.selector_ = opt_selector;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DomDelegatedEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				var data = domData.get(this.emitter_);
				var selector = this.selector_;
				var arr = isString(selector) ? data.delegating[this.event_].selectors : data.listeners;
				var key = isString(selector) ? selector : this.event_;

				array.remove(arr[key] || [], this.listener_);
				if (arr[key] && arr[key].length === 0) {
					delete arr[key];
				}
			}
		}]);
		return DomDelegatedEventHandle;
	}(EventHandle);

	this['metal']['DomDelegatedEventHandle'] = DomDelegatedEventHandle;
}).call(this);
'use strict';

(function () {
	var EventHandle = this['metalNamed']['events']['EventHandle'];

	/**
  * This is a special EventHandle, that is responsible for dom events, instead
  * of EventEmitter events.
  * @extends {EventHandle}
  */

	var DomEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomEventHandle, _EventHandle);

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
			babelHelpers.classCallCheck(this, DomEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, (DomEventHandle.__proto__ || Object.getPrototypeOf(DomEventHandle)).call(this, emitter, event, listener));

			_this.capture_ = opt_capture;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DomEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				this.emitter_.removeEventListener(this.event_, this.listener_, this.capture_);
			}
		}]);
		return DomEventHandle;
	}(EventHandle);

	this['metal']['DomEventHandle'] = DomEventHandle;
}).call(this);
'use strict';

(function () {
	var isDef = this['metalNamed']['metal']['isDef'];
	var isDocument = this['metalNamed']['metal']['isDocument'];
	var isElement = this['metalNamed']['metal']['isElement'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var domData = this['metal']['domData'];
	var DomDelegatedEventHandle = this['metal']['DomDelegatedEventHandle'];
	var DomEventHandle = this['metal']['DomEventHandle'];


	var elementsByTag_ = {};
	var customEvents = {};

	this['metalNamed']['domNamed'] = this['metalNamed']['domNamed'] || {};
	this['metalNamed']['domNamed']['customEvents'] = customEvents;
	var NEXT_TARGET = '__metal_next_target__';
	var USE_CAPTURE = {
		blur: true,
		error: true,
		focus: true,
		invalid: true,
		load: true,
		scroll: true
	};

	/**
  * Adds the requested CSS classes to an element.
  * @param {!Element|!Nodelist} elements The element or elements to add CSS classes to.
  * @param {string} classes CSS classes to add.
  */
	function addClasses(elements, classes) {
		if (!isObject(elements) || !isString(classes)) {
			return;
		}

		if (!elements.length) {
			elements = [elements];
		}

		for (var i = 0; i < elements.length; i++) {
			if ('classList' in elements[i]) {
				addClassesWithNative_(elements[i], classes);
			} else {
				addClassesWithoutNative_(elements[i], classes);
			}
		}
	}

	this['metalNamed']['domNamed']['addClasses'] = addClasses; /**
                                                             * Adds the requested CSS classes to an element using classList.
                                                             * @param {!Element} element The element to add CSS classes to.
                                                             * @param {string} classes CSS classes to add.
                                                             * @private
                                                             */

	function addClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			if (className) {
				element.classList.add(className);
			}
		});
	}

	/**
  * Adds the requested CSS classes to an element without using classList.
  * @param {!Element} element The element to add CSS classes to.
  * @param {string} classes CSS classes to add.
  * @private
  */
	function addClassesWithoutNative_(element, classes) {
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
  * Adds an event listener to the given element, to be triggered via delegate.
  * @param {!Element} element
  * @param {string} eventName
  * @param {!function()} listener
  * @private
  */
	function addElementListener_(element, eventName, listener) {
		var data = domData.get(element);
		addToArr_(data.listeners, eventName, listener);
	}

	/**
  * Adds an event listener to the given element, to be triggered via delegate
  * selectors.
  * @param {!Element} element
  * @param {string} eventName
  * @param {string} selector
  * @param {!function()} listener
  * @private
  */
	function addSelectorListener_(element, eventName, selector, listener) {
		var data = domData.get(element);
		addToArr_(data.delegating[eventName].selectors, selector, listener);
	}

	/**
  * Adds a value to an array inside an object, creating it first if it doesn't
  * yet exist.
  * @param {!Array} arr
  * @param {string} key
  * @param {*} value
  * @private
  */
	function addToArr_(arr, key, value) {
		if (!arr[key]) {
			arr[key] = [];
		}
		arr[key].push(value);
	}

	/**
  * Attaches a delegate listener, unless there's already one attached.
  * @param {!Element} element
  * @param {string} eventName
  * @private
  */
	function attachDelegateEvent_(element, eventName) {
		var data = domData.get(element);
		if (!data.delegating[eventName]) {
			data.delegating[eventName] = {
				handle: on(element, eventName, handleDelegateEvent_, !!USE_CAPTURE[eventName]),
				selectors: {}
			};
		}
	}

	/**
  * Gets the closest element up the tree from the given element (including
  * itself) that matches the specified selector, or null if none match.
  * @param {Element} element
  * @param {string} selector
  * @return {Element}
  */
	function closest(element, selector) {
		while (element && !match(element, selector)) {
			element = element.parentNode;
		}
		return element;
	}

	this['metalNamed']['domNamed']['closest'] = closest; /**
                                                       * Appends a child node with text or other nodes to a parent node. If
                                                       * child is a HTML string it will be automatically converted to a document
                                                       * fragment before appending it to the parent.
                                                       * @param {!Element} parent The node to append nodes to.
                                                       * @param {!(Element|NodeList|string)} child The thing to append to the parent.
                                                       * @return {!Element} The appended child.
                                                       */

	function append(parent, child) {
		if (isString(child)) {
			child = buildFragment(child);
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

	this['metalNamed']['domNamed']['append'] = append; /**
                                                     * Helper for converting a HTML string into a document fragment.
                                                     * @param {string} htmlString The HTML string to convert.
                                                     * @return {!Element} The resulting document fragment.
                                                     */

	function buildFragment(htmlString) {
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = '<br>' + htmlString;
		tempDiv.removeChild(tempDiv.firstChild);

		var fragment = document.createDocumentFragment();
		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		return fragment;
	}

	this['metalNamed']['domNamed']['buildFragment'] = buildFragment; /**
                                                                   * Checks if the first element contains the second one.
                                                                   * @param {!Element} element1
                                                                   * @param {!Element} element2
                                                                   * @return {boolean}
                                                                   */

	function contains(element1, element2) {
		if (isDocument(element1)) {
			// document.contains is not defined on IE9, so call it on documentElement instead.
			return element1.documentElement.contains(element2);
		} else {
			return element1.contains(element2);
		}
	}

	this['metalNamed']['domNamed']['contains'] = contains; /**
                                                         * Listens to the specified event on the given DOM element, but only calls the
                                                         * given callback listener when it's triggered by elements that match the
                                                         * given selector or target element.
                                                         * @param {!Element} element The DOM element the event should be listened on.
                                                         * @param {string} eventName The name of the event to listen to.
                                                         * @param {!Element|string} selectorOrTarget Either an element or css selector
                                                         *     that should match the event for the listener to be triggered.
                                                         * @param {!function(!Object)} callback Function to be called when the event
                                                         *     is triggered. It will receive the normalized event object.
                                                         * @param {boolean=} opt_default Optional flag indicating if this is a default
                                                         *     listener. That means that it would only be executed after all non
                                                         *     default listeners, and only if the event isn't prevented via
                                                         *     `preventDefault`.
                                                         * @return {!EventHandle} Can be used to remove the listener.
                                                         */

	function delegate(element, eventName, selectorOrTarget, callback, opt_default) {
		var customConfig = customEvents[eventName];
		if (customConfig && customConfig.delegate) {
			eventName = customConfig.originalEvent;
			callback = customConfig.handler.bind(customConfig, callback);
		}

		if (opt_default) {
			// Wrap callback so we don't set property directly on it.
			callback = callback.bind();
			callback.defaultListener_ = true;
		}

		attachDelegateEvent_(element, eventName);
		if (isString(selectorOrTarget)) {
			addSelectorListener_(element, eventName, selectorOrTarget, callback);
		} else {
			addElementListener_(selectorOrTarget, eventName, callback);
		}

		return new DomDelegatedEventHandle(isString(selectorOrTarget) ? element : selectorOrTarget, eventName, callback, isString(selectorOrTarget) ? selectorOrTarget : null);
	}

	this['metalNamed']['domNamed']['delegate'] = delegate; /**
                                                         * Verifies if the element is able to trigger the Click event,
                                                         * simulating browsers behaviour, avoiding event listeners to be called by triggerEvent method.
                                                         * @param {Element} node Element to be checked.
                                                         * @param {string} eventName The event name.
                                                         * @private
                                                         */

	function isAbleToInteractWith_(node, eventName, opt_eventObj) {
		if (opt_eventObj && eventName === 'click' && opt_eventObj.button === 2) {
			// Firefox triggers "click" events on the document for right clicks. This
			// causes our delegate logic to trigger it for regular elements too, which
			// shouldn't happen. Ignoring them here.
			return false;
		}

		var matchesSelector = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'FIELDSET'];
		if (eventName === 'click' && matchesSelector.indexOf(node.tagName) > -1) {
			return !(node.disabled || parent(node, 'fieldset[disabled]'));
		}
		return true;
	}

	/**
  * Inserts node in document as last element.
  * @param {Element} node Element to remove children from.
  */
	function enterDocument(node) {
		node && append(document.body, node);
	}

	this['metalNamed']['domNamed']['enterDocument'] = enterDocument; /**
                                                                   * Removes node from document.
                                                                   * @param {Element} node Element to remove children from.
                                                                   */

	function exitDocument(node) {
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	this['metalNamed']['domNamed']['exitDocument'] = exitDocument; /**
                                                                 * This is called when an event is triggered by a delegate listener. All
                                                                 * matching listeners of this event type from `target` to `currentTarget` will
                                                                 * be triggered.
                                                                 * @param {!Event} event The event payload.
                                                                 * @return {boolean} False if at least one of the triggered callbacks returns
                                                                 *     false, or true otherwise.
                                                                 * @private
                                                                 */

	function handleDelegateEvent_(event) {
		normalizeDelegateEvent_(event);
		var currElement = isDef(event[NEXT_TARGET]) ? event[NEXT_TARGET] : event.target;
		var ret = true;
		var container = event.currentTarget;
		var limit = event.currentTarget.parentNode;
		var defFns = [];

		ret &= triggerDelegatedListeners_(container, currElement, event, limit, defFns);
		ret &= triggerDefaultDelegatedListeners_(defFns, event);

		event.delegateTarget = null;
		event[NEXT_TARGET] = limit;
		return ret;
	}

	/**
  * Checks if the given element has the requested css class.
  * @param {!Element} element
  * @param {string} className
  * @return {boolean}
  */
	function hasClass(element, className) {
		if ('classList' in element) {
			return hasClassWithNative_(element, className);
		} else {
			return hasClassWithoutNative_(element, className);
		}
	}

	this['metalNamed']['domNamed']['hasClass'] = hasClass; /**
                                                         * Checks if the given element has the requested css class using classList.
                                                         * @param {!Element} element
                                                         * @param {string} className
                                                         * @return {boolean}
                                                         * @private
                                                         */

	function hasClassWithNative_(element, className) {
		return element.classList.contains(className);
	}

	/**
  * Checks if the given element has the requested css class without using classList.
  * @param {!Element} element
  * @param {string} className
  * @return {boolean}
  * @private
  */
	function hasClassWithoutNative_(element, className) {
		return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
	}

	/**
  * Checks if the given element is empty or not.
  * @param {!Element} element
  * @return {boolean}
  */
	function isEmpty(element) {
		return element.childNodes.length === 0;
	}

	this['metalNamed']['domNamed']['isEmpty'] = isEmpty; /**
                                                       * Check if an element matches a given selector.
                                                       * @param {Element} element
                                                       * @param {string} selector
                                                       * @return {boolean}
                                                       */

	function match(element, selector) {
		if (!element || element.nodeType !== 1) {
			return false;
		}

		var p = Element.prototype;
		var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
		if (m) {
			return m.call(element, selector);
		}

		return matchFallback_(element, selector);
	}

	this['metalNamed']['domNamed']['match'] = match; /**
                                                   * Check if an element matches a given selector, using an internal implementation
                                                   * instead of calling existing javascript functions.
                                                   * @param {Element} element
                                                   * @param {string} selector
                                                   * @return {boolean}
                                                   * @private
                                                   */

	function matchFallback_(element, selector) {
		var nodes = document.querySelectorAll(selector, element.parentNode);
		for (var i = 0; i < nodes.length; ++i) {
			if (nodes[i] === element) {
				return true;
			}
		}
		return false;
	}

	/**
  * Returns the next sibling of the given element that matches the specified
  * selector, or null if there is none.
  * @param {!Element} element
  * @param {?string} selector
  */
	function next(element, selector) {
		do {
			element = element.nextSibling;
			if (element && match(element, selector)) {
				return element;
			}
		} while (element);
		return null;
	}

	this['metalNamed']['domNamed']['next'] = next; /**
                                                 * Normalizes the event payload for delegate listeners.
                                                 * @param {!Event} event
                                                 * @private
                                                 */

	function normalizeDelegateEvent_(event) {
		event.stopPropagation = stopPropagation_;
		event.stopImmediatePropagation = stopImmediatePropagation_;
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
  * @param {boolean} opt_capture Flag indicating if listener should be triggered
  *   during capture phase, instead of during the bubbling phase. Defaults to false.
  * @return {!DomEventHandle} Can be used to remove the listener.
  */
	function on(element, eventName, callback, opt_capture) {
		if (isString(element)) {
			return delegate(document, eventName, element, callback);
		}
		var customConfig = customEvents[eventName];
		if (customConfig && customConfig.event) {
			eventName = customConfig.originalEvent;
			callback = customConfig.handler.bind(customConfig, callback);
		}
		element.addEventListener(eventName, callback, opt_capture);
		return new DomEventHandle(element, eventName, callback, opt_capture);
	}

	this['metalNamed']['domNamed']['on'] = on; /**
                                             * Listens to the specified event on the given DOM element once. This
                                             * function normalizes DOM event payloads and functions so they'll work the
                                             * same way on all supported browsers.
                                             * @param {!Element} element The DOM element to listen to the event on.
                                             * @param {string} eventName The name of the event to listen to.
                                             * @param {!function(!Object)} callback Function to be called when the event
                                             *   is triggered. It will receive the normalized event object.
                                             * @return {!DomEventHandle} Can be used to remove the listener.
                                             */

	function once(element, eventName, callback) {
		var domEventHandle = on(element, eventName, function () {
			domEventHandle.removeListener();
			return callback.apply(this, arguments);
		});
		return domEventHandle;
	}

	this['metalNamed']['domNamed']['once'] = once; /**
                                                 * Gets the first parent from the given element that matches the specified
                                                 * selector, or null if none match.
                                                 * @param {!Element} element
                                                 * @param {string} selector
                                                 * @return {Element}
                                                 */

	function parent(element, selector) {
		return closest(element.parentNode, selector);
	}

	this['metalNamed']['domNamed']['parent'] = parent; /**
                                                     * Registers a custom event.
                                                     * @param {string} eventName The name of the custom event.
                                                     * @param {!Object} customConfig An object with information about how the event
                                                     *   should be handled.
                                                     */

	function registerCustomEvent(eventName, customConfig) {
		customEvents[eventName] = customConfig;
	}

	this['metalNamed']['domNamed']['registerCustomEvent'] = registerCustomEvent; /**
                                                                               * Removes all the child nodes on a DOM node.
                                                                               * @param {Element} node Element to remove children from.
                                                                               */

	function removeChildren(node) {
		var child;
		while (child = node.firstChild) {
			node.removeChild(child);
		}
	}

	this['metalNamed']['domNamed']['removeChildren'] = removeChildren; /**
                                                                     * Removes the requested CSS classes from an element.
                                                                     * @param {!Element|!NodeList} elements The element or elements to remove CSS classes from.
                                                                     * @param {string} classes CSS classes to remove.
                                                                     */

	function removeClasses(elements, classes) {
		if (!isObject(elements) || !isString(classes)) {
			return;
		}

		if (!elements.length) {
			elements = [elements];
		}

		for (var i = 0; i < elements.length; i++) {
			if ('classList' in elements[i]) {
				removeClassesWithNative_(elements[i], classes);
			} else {
				removeClassesWithoutNative_(elements[i], classes);
			}
		}
	}

	this['metalNamed']['domNamed']['removeClasses'] = removeClasses; /**
                                                                   * Removes the requested CSS classes from an element using classList.
                                                                   * @param {!Element} element The element to remove CSS classes from.
                                                                   * @param {string} classes CSS classes to remove.
                                                                   * @private
                                                                   */

	function removeClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			if (className) {
				element.classList.remove(className);
			}
		});
	}

	/**
  * Removes the requested CSS classes from an element without using classList.
  * @param {!Element} element The element to remove CSS classes from.
  * @param {string} classes CSS classes to remove.
  * @private
  */
	function removeClassesWithoutNative_(element, classes) {
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
	function replace(element1, element2) {
		if (element1 && element2 && element1 !== element2 && element1.parentNode) {
			element1.parentNode.insertBefore(element2, element1);
			element1.parentNode.removeChild(element1);
		}
	}

	this['metalNamed']['domNamed']['replace'] = replace; /**
                                                       * The function that replaces `stopImmediatePropagation_` for events.
                                                       * @private
                                                       */

	function stopImmediatePropagation_() {
		var event = this; // jshint ignore:line
		event.stopped = true;
		event.stoppedImmediate = true;
		Event.prototype.stopImmediatePropagation.call(event);
	}

	/**
  * The function that replaces `stopPropagation` for events.
  * @private
  */
	function stopPropagation_() {
		var event = this; // jshint ignore:line
		event.stopped = true;
		Event.prototype.stopPropagation.call(event);
	}

	/**
  * Checks if the given element supports the given event type.
  * @param {!Element|string} element The DOM element or element tag name to check.
  * @param {string} eventName The name of the event to check.
  * @return {boolean}
  */
	function supportsEvent(element, eventName) {
		if (customEvents[eventName]) {
			return true;
		}

		if (isString(element)) {
			if (!elementsByTag_[element]) {
				elementsByTag_[element] = document.createElement(element);
			}
			element = elementsByTag_[element];
		}
		return 'on' + eventName in element;
	}

	this['metalNamed']['domNamed']['supportsEvent'] = supportsEvent; /**
                                                                   * This triggers all default matched delegated listeners of a given event type.
                                                                   * @param {!Array} defaultFns Array to collect default listeners in, instead
                                                                   * @param {!Event} event
                                                                   * @return {boolean} False if at least one of the triggered callbacks returns
                                                                   *     false, or true otherwise.
                                                                   * @private
                                                                   */

	function triggerDefaultDelegatedListeners_(defFns, event) {
		var ret = true;

		for (var i = 0; i < defFns.length && !event.defaultPrevented; i++) {
			event.delegateTarget = defFns[i].element;
			ret &= defFns[i].fn(event);
		}

		return ret;
	}

	/**
  * This triggers all matched delegated listeners of a given event type when its
  * delegated target is able to interact.
  * @param {!Element} container
  * @param {!Element} currElement
  * @param {!Event} event
  * @param {!Element} limit the fartest parent of the given element
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerDelegatedListeners_(container, currElement, event, limit, defaultFns) {
		var ret = true;

		while (currElement && currElement !== limit && !event.stopped) {
			if (isAbleToInteractWith_(currElement, event.type, event)) {
				event.delegateTarget = currElement;
				ret &= triggerMatchedListeners_(container, currElement, event, defaultFns);
			}
			currElement = currElement.parentNode;
		}

		return ret;
	}

	/**
  * Converts the given argument to a DOM element. Strings are assumed to
  * be selectors, and so a matched element will be returned. If the arg
  * is already a DOM element it will be the return value.
  * @param {string|Element|Document} selectorOrElement
  * @return {Element} The converted element, or null if none was found.
  */
	function toElement(selectorOrElement) {
		if (isElement(selectorOrElement) || isDocument(selectorOrElement)) {
			return selectorOrElement;
		} else if (isString(selectorOrElement)) {
			if (selectorOrElement[0] === '#' && selectorOrElement.indexOf(' ') === -1) {
				return document.getElementById(selectorOrElement.substr(1));
			} else {
				return document.querySelector(selectorOrElement);
			}
		} else {
			return null;
		}
	}

	this['metalNamed']['domNamed']['toElement'] = toElement; /**
                                                           * Adds or removes one or more classes from an element. If any of the classes
                                                           * is present, it will be removed from the element, or added otherwise.
                                                           * @param {!Element} element The element which classes will be toggled.
                                                           * @param {string} classes The classes which have to added or removed from the element.
                                                           */

	function toggleClasses(element, classes) {
		if (!isObject(element) || !isString(classes)) {
			return;
		}

		if ('classList' in element) {
			toggleClassesWithNative_(element, classes);
		} else {
			toggleClassesWithoutNative_(element, classes);
		}
	}

	this['metalNamed']['domNamed']['toggleClasses'] = toggleClasses; /**
                                                                   * Adds or removes one or more classes from an element using classList.
                                                                   * If any of the classes is present, it will be removed from the element,
                                                                   * or added otherwise.
                                                                   * @param {!Element} element The element which classes will be toggled.
                                                                   * @param {string} classes The classes which have to added or removed from the element.
                                                                   * @private
                                                                   */

	function toggleClassesWithNative_(element, classes) {
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
  * @private
  */
	function toggleClassesWithoutNative_(element, classes) {
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
	function triggerEvent(element, eventName, opt_eventObj) {
		if (isAbleToInteractWith_(element, eventName, opt_eventObj)) {
			var eventObj = document.createEvent('HTMLEvents');
			eventObj.initEvent(eventName, true, true);
			object.mixin(eventObj, opt_eventObj);
			element.dispatchEvent(eventObj);
		}
	}

	this['metalNamed']['domNamed']['triggerEvent'] = triggerEvent; /**
                                                                 * Triggers the given listeners array.
                                                                 * @param {Array<!function()>} listeners
                                                                 * @param {!Event} event
                                                                 * @param {!Element} element
                                                                 * @param {!Array} defaultFns Array to collect default listeners in, instead
                                                                 *     of running them.
                                                                 * @return {boolean} False if at least one of the triggered callbacks returns
                                                                 *     false, or true otherwise.
                                                                 * @private
                                                                 */

	function triggerListeners_(listeners, event, element, defaultFns) {
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

	/**
  * Triggers all listeners for the given event type that are stored in the
  * specified element.
  * @param {!Element} container
  * @param {!Element} element
  * @param {!Event} event
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerMatchedListeners_(container, element, event, defaultFns) {
		var data = domData.get(element);
		var listeners = data.listeners[event.type];
		var ret = triggerListeners_(listeners, event, element, defaultFns);

		var selectorsMap = domData.get(container).delegating[event.type].selectors;
		var selectors = Object.keys(selectorsMap);
		for (var i = 0; i < selectors.length && !event.stoppedImmediate; i++) {
			if (match(element, selectors[i])) {
				listeners = selectorsMap[selectors[i]];
				ret &= triggerListeners_(listeners, event, element, defaultFns);
			}
		}

		return ret;
	}
}).call(this);
'use strict';

// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

(function () {
  var dom = this['metalNamed']['domNamed'];
  this['metal']['dom'] = dom;
  this['metalNamed']['dom'] = this['metalNamed']['dom'] || {};
  this['metalNamed']['dom']['dom'] = dom;
  Object.keys(this['metalNamed']['domNamed']).forEach(function (key) {
    this['metalNamed']['dom'][key] = this['metalNamed']['domNamed'][key];
  });
}).call(this);
'use strict';

(function () {
	var delegate = this['metalNamed']['dom']['delegate'];
	var on = this['metalNamed']['dom']['on'];
	var supportsEvent = this['metalNamed']['dom']['supportsEvent'];
	var EventEmitterProxy = this['metalNamed']['events']['EventEmitterProxy'];

	/**
  * DomEventEmitterProxy utility. It extends `EventEmitterProxy` to also accept
  * dom elements as origin emitters.
  * @extends {EventEmitterProxy}
  */

	var DomEventEmitterProxy = function (_EventEmitterProxy) {
		babelHelpers.inherits(DomEventEmitterProxy, _EventEmitterProxy);

		function DomEventEmitterProxy() {
			babelHelpers.classCallCheck(this, DomEventEmitterProxy);
			return babelHelpers.possibleConstructorReturn(this, (DomEventEmitterProxy.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy)).apply(this, arguments));
		}

		babelHelpers.createClass(DomEventEmitterProxy, [{
			key: 'addListener_',

			/**
    * Adds the given listener for the given event.
    * @param {string} event
    * @param {!function()} listener
    * @return {!EventHandle} The listened event's handle.
    * @protected
    * @override
    */
			value: function addListener_(event, listener) {
				if (this.originEmitter_.addEventListener) {
					if (this.isDelegateEvent_(event)) {
						var index = event.indexOf(':', 9);
						var eventName = event.substring(9, index);
						var selector = event.substring(index + 1);
						return delegate(this.originEmitter_, eventName, selector, listener);
					} else {
						return on(this.originEmitter_, event, listener);
					}
				} else {
					return babelHelpers.get(DomEventEmitterProxy.prototype.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy.prototype), 'addListener_', this).call(this, event, listener);
				}
			}

			/**
    * Checks if the given event is of the delegate type.
    * @param {string} event
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'isDelegateEvent_',
			value: function isDelegateEvent_(event) {
				return event.substr(0, 9) === 'delegate:';
			}

			/**
    * Checks if the given event is supported by the origin element.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'isSupportedDomEvent_',
			value: function isSupportedDomEvent_(event) {
				if (!this.originEmitter_ || !this.originEmitter_.addEventListener) {
					return true;
				}
				return this.isDelegateEvent_(event) && event.indexOf(':', 9) !== -1 || supportsEvent(this.originEmitter_, event);
			}

			/**
    * Checks if the given event should be proxied.
    * @param {string} event
    * @return {boolean}
    * @protected
    * @override
    */

		}, {
			key: 'shouldProxyEvent_',
			value: function shouldProxyEvent_(event) {
				return babelHelpers.get(DomEventEmitterProxy.prototype.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy.prototype), 'shouldProxyEvent_', this).call(this, event) && this.isSupportedDomEvent_(event);
			}
		}]);
		return DomEventEmitterProxy;
	}(EventEmitterProxy);

	this['metal']['DomEventEmitterProxy'] = DomEventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var append = this['metalNamed']['dom']['append'];
	var string = this['metalNamed']['metal']['string'];

	/**
  * Class with static methods responsible for doing browser feature checks.
  */

	var features = function () {
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
					append(element, originalContent);
					features.attrOrderChange_ = originalContent !== element.innerHTML;
				}
				return features.attrOrderChange_;
			}
		}]);
		return features;
	}();

	features.animationElement_ = document.createElement('div');
	features.animationEventName_ = undefined;
	features.attrOrderChange_ = undefined;

	this['metal']['features'] = features;
}).call(this);
'use strict';

(function () {
	var async = this['metalNamed']['metal']['async'];
	var exitDocument = this['metalNamed']['dom']['exitDocument'];
	var once = this['metalNamed']['dom']['once'];

	/**
  * Utility functions for running javascript code in the global scope.
  */

	var globalEval = function () {
		function globalEval() {
			babelHelpers.classCallCheck(this, globalEval);
		}

		babelHelpers.createClass(globalEval, null, [{
			key: 'run',

			/**
    * Evaluates the given string in the global scope.
    * @param {string} text
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */
			value: function run(text, opt_appendFn) {
				var script = document.createElement('script');
				script.text = text;
				if (opt_appendFn) {
					opt_appendFn(script);
				} else {
					document.head.appendChild(script);
				}
				exitDocument(script);
				return script;
			}

			/**
    * Evaluates the given javascript file in the global scope.
    * @param {string} src The file's path.
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */

		}, {
			key: 'runFile',
			value: function runFile(src, opt_callback, opt_appendFn) {
				var script = document.createElement('script');
				script.src = src;

				var callback = function callback() {
					exitDocument(script);
					opt_callback && opt_callback();
				};
				once(script, 'load', callback);
				once(script, 'error', callback);

				if (opt_appendFn) {
					opt_appendFn(script);
				} else {
					document.head.appendChild(script);
				}

				return script;
			}

			/**
    * Evaluates the code referenced by the given script element.
    * @param {!Element} script
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */

		}, {
			key: 'runScript',
			value: function runScript(script, opt_callback, opt_appendFn) {
				var callback = function callback() {
					opt_callback && opt_callback();
				};
				if (script.type && script.type !== 'text/javascript') {
					async.nextTick(callback);
					return;
				}
				exitDocument(script);
				if (script.src) {
					return globalEval.runFile(script.src, opt_callback, opt_appendFn);
				} else {
					async.nextTick(callback);
					return globalEval.run(script.text, opt_appendFn);
				}
			}

			/**
    * Evaluates any script tags present in the given element.
    * @param {!Element} element
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runScriptsInElement',
			value: function runScriptsInElement(element, opt_callback, opt_appendFn) {
				var scripts = element.querySelectorAll('script');
				if (scripts.length) {
					globalEval.runScriptsInOrder(scripts, 0, opt_callback, opt_appendFn);
				} else if (opt_callback) {
					async.nextTick(opt_callback);
				}
			}

			/**
    * Runs the given scripts elements in the order that they appear.
    * @param {!NodeList} scripts
    * @param {number} index
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runScriptsInOrder',
			value: function runScriptsInOrder(scripts, index, opt_callback, opt_appendFn) {
				globalEval.runScript(scripts.item(index), function () {
					if (index < scripts.length - 1) {
						globalEval.runScriptsInOrder(scripts, index + 1, opt_callback, opt_appendFn);
					} else if (opt_callback) {
						async.nextTick(opt_callback);
					}
				}, opt_appendFn);
			}
		}]);
		return globalEval;
	}();

	this['metal']['globalEval'] = globalEval;
}).call(this);
'use strict';

(function () {
	var async = this['metalNamed']['metal']['async'];
	var once = this['metalNamed']['dom']['once'];

	/**
  * Utility functions for running styles.
  */

	var globalEvalStyles = function () {
		function globalEvalStyles() {
			babelHelpers.classCallCheck(this, globalEvalStyles);
		}

		babelHelpers.createClass(globalEvalStyles, null, [{
			key: 'run',

			/**
    * Evaluates the given style.
    * @param {string} text
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} style
    */
			value: function run(text, opt_appendFn) {
				var style = document.createElement('style');
				style.innerHTML = text;
				if (opt_appendFn) {
					opt_appendFn(style);
				} else {
					document.head.appendChild(style);
				}
				return style;
			}

			/**
    * Evaluates the given style file.
    * @param {string} href The file's path.
    * @param {function()=} opt_callback Optional function to be called
    *   when the styles has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} style
    */

		}, {
			key: 'runFile',
			value: function runFile(href, opt_callback, opt_appendFn) {
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = href;
				globalEvalStyles.runStyle(link, opt_callback, opt_appendFn);
				return link;
			}

			/**
    * Evaluates the code referenced by the given style/link element.
    * @param {!Element} style
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    *  @return {Element} style
    */

		}, {
			key: 'runStyle',
			value: function runStyle(style, opt_callback, opt_appendFn) {
				var callback = function callback() {
					opt_callback && opt_callback();
				};
				if (style.rel && style.rel !== 'stylesheet') {
					async.nextTick(callback);
					return;
				}

				if (style.tagName === 'STYLE') {
					async.nextTick(callback);
				} else {
					once(style, 'load', callback);
					once(style, 'error', callback);
				}

				if (opt_appendFn) {
					opt_appendFn(style);
				} else {
					document.head.appendChild(style);
				}

				return style;
			}

			/**
    * Evaluates any style present in the given element.
    * @param {!Element} element
    * @param {function()=} opt_callback Optional function to be called when the
    *   style has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runStylesInElement',
			value: function runStylesInElement(element, opt_callback, opt_appendFn) {
				var styles = element.querySelectorAll('style,link');
				if (styles.length === 0 && opt_callback) {
					async.nextTick(opt_callback);
					return;
				}

				var loadCount = 0;
				var callback = function callback() {
					if (opt_callback && ++loadCount === styles.length) {
						async.nextTick(opt_callback);
					}
				};
				for (var i = 0; i < styles.length; i++) {
					globalEvalStyles.runStyle(styles[i], callback, opt_appendFn);
				}
			}
		}]);
		return globalEvalStyles;
	}();

	this['metal']['globalEvalStyles'] = globalEvalStyles;
}).call(this);
'use strict';

(function () {
	var registerCustomEvent = this['metalNamed']['dom']['registerCustomEvent'];
	var features = this['metal']['features'];


	var mouseEventMap = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	};
	Object.keys(mouseEventMap).forEach(function (eventName) {
		registerCustomEvent(eventName, {
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
		registerCustomEvent(eventName, {
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
'use strict';

(function () {
  var dom = this['metal']['dom'];
  var domData = this['metal']['domData'];
  var DomEventEmitterProxy = this['metal']['DomEventEmitterProxy'];
  var DomEventHandle = this['metal']['DomEventHandle'];
  var features = this['metal']['features'];
  var globalEval = this['metal']['globalEval'];
  var globalEvalStyles = this['metal']['globalEvalStyles'];
  this['metalNamed']['dom'] = this['metalNamed']['dom'] || {};
  Object.keys(this['metalNamed']['dom']).forEach(function (key) {
    this['metalNamed']['dom'][key] = this['metalNamed']['dom'][key];
  });
  this['metalNamed']['dom']['domData'] = domData;
  this['metalNamed']['dom']['DomEventEmitterProxy'] = DomEventEmitterProxy;
  this['metalNamed']['dom']['DomEventHandle'] = DomEventHandle;
  this['metalNamed']['dom']['features'] = features;
  this['metalNamed']['dom']['globalEval'] = globalEval;
  this['metalNamed']['dom']['globalEvalStyles'] = globalEvalStyles;
  this['metal']['dom'] = dom;
}).call(this);
'use strict';

(function () {
	var getFunctionName = this['metalNamed']['metal']['getFunctionName'];
	var isDef = this['metalNamed']['metal']['isDef'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isNull = this['metalNamed']['metal']['isNull'];

	/**
  * Provides access to various type validators that will return an
  * instance of Error when validation fails. Note that all type validators
  * will also accept null or undefined values. To not accept these you should
  * instead make your state property required.
  */

	var validators = {
		any: function any() {
			return function () {
				return true;
			};
		},
		array: validateType('array'),
		bool: validateType('boolean'),
		func: validateType('function'),
		number: validateType('number'),
		object: validateType('object'),
		string: validateType('string'),

		/**
   * Creates a validator that checks the values of an array against a type.
   * @param {function()} validator Type validator to check each index against.
   * @return {function()} Validator.
   */
		arrayOf: function arrayOf(validator) {
			return maybe(function (value, name, context) {
				var result = validators.array(value, name, context);
				if (isInvalid(result)) {
					return result;
				}
				for (var i = 0; i < value.length; i++) {
					if (isInvalid(validator(value[i], name, context))) {
						return composeError('Expected an array of single type', name, context);
					}
				}
				return true;
			});
		},

		/**
   * Creates a validator that compares a value to a specific class.
   * @param {function()} expectedClass Class to check value against.
   * @return {function()} Validator.
   */
		instanceOf: function instanceOf(expectedClass) {
			return maybe(function (value, name, context) {
				if (!(value instanceof expectedClass)) {
					return composeError('Expected instance of ' + expectedClass, name, context);
				}
				return true;
			});
		},

		/**
   * Creates a validator that checks the values of an object against a type.
   * @param {function()} typeValidator Validator to check value against.
   * @return {function()} Validator.
   */
		objectOf: function objectOf(typeValidator) {
			return maybe(function (value, name, context) {
				for (var key in value) {
					if (isInvalid(typeValidator(value[key]))) {
						return composeError('Expected object of one type', name, context);
					}
				}
				return true;
			});
		},

		/**
   * Creates a validator that checks equality against specific values.
   * @param {!Array} arrayOfValues Array of values to check equality against.
   * @return {function()} Validator.
   */
		oneOf: function oneOf(arrayOfValues) {
			return maybe(function (value, name, context) {
				var result = validators.array(arrayOfValues, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var i = 0; i < arrayOfValues.length; i++) {
					var oneOfValue = arrayOfValues[i];
					if (value === oneOfValue) {
						return true;
					}
				}

				return composeError('Expected one of given values.', name, context);
			});
		},

		/**
   * Creates a validator that checks a value against multiple types and only has
   * to pass one.
   * @param {!Array} arrayOfTypeValidators Array of validators to check value
   *     against.
   * @return {function()} Validator.
   */
		oneOfType: function oneOfType(arrayOfTypeValidators) {
			return maybe(function (value, name, context) {
				var result = validators.array(arrayOfTypeValidators, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var i = 0; i < arrayOfTypeValidators.length; i++) {
					if (!isInvalid(arrayOfTypeValidators[i](value, name, context))) {
						return true;
					}
				}

				return composeError('Expected one of given types.', name, context);
			});
		},

		/**
   * Creates a validator that checks the shape of an object.
   * @param {!Object} shape An object containing type validators for each key.
   * @return {function()} Validator.
   */
		shapeOf: function shapeOf(shape) {
			return maybe(function (value, name, context) {
				var result = validators.object(shape, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var key in shape) {
					var required = false;
					var validator = shape[key];
					if (validator.config) {
						required = validator.config.required;
						validator = validator.config.validator;
					}
					if (required && !isDefAndNotNull(value[key]) || isInvalid(validator(value[key]))) {
						return composeError('Expected object with a specific shape', name, context);
					}
				}

				return true;
			});
		}
	};

	/**
  * Composes a warning a warning message.
  * @param {string} error Error message to display to console.
  * @param {?string} name Name of state property that is giving the error.
  * @param {Object} context
  * @return {!Error} Instance of Error class.
  */
	function composeError(error, name, context) {
		var compName = context ? getFunctionName(context.constructor) : null;
		var renderer = context && context.getRenderer && context.getRenderer();
		var parent = renderer && renderer.getParent ? context.getRenderer().getParent() : null;
		var parentName = parent ? getFunctionName(parent.constructor) : null;
		var location = parentName ? 'Check render method of \'' + parentName + '\'.' : '';
		return new Error('Warning: Invalid state passed to \'' + name + '\'. ' + (error + ' Passed to \'' + compName + '\'. ' + location));
	}

	/**
  * Returns the type of the given value.
  * @param {*} value Any value.
  * @return {string} Type of value.
  */
	function getType(value) {
		var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
		if (Array.isArray(value)) {
			return 'array';
		}
		return type;
	}

	/**
  * Checks if the given validator result says that the value is invalid.
  * @param {boolean|!Error} result
  * @return {boolean}
  */
	function isInvalid(result) {
		return result instanceof Error;
	}

	/**
  * Creates a validator that checks a value against a single type, null, or
  * undefined.
  * @param {function()} typeValidator Validator to check value against.
  * @return {function()} Validator.
  */
	function maybe(typeValidator) {
		return function (value, name, context) {
			if (!isDef(value) || isNull(value)) {
				return true;
			}
			return typeValidator(value, name, context);
		};
	}

	/**
  * Creates a validator that checks against a specific primitive type. If this
  * validator is called with no arguments, it will return the actual validator
  * function instead of running it. That's done to allow all validators to be
  * used consistently, since some (like `arrayOf`) always require that you call
  * the function before receiving the actual validator.
  * @param {string} expectedType Type to check against.
  * @return {function()} Validator if called with arguments, or wrapper function
  *     that returns the validator otherwise.
  */
	function validateType(expectedType) {
		var validatorFn = maybe(function (value, name, context) {
			var type = getType(value);
			if (type !== expectedType) {
				return composeError('Expected type \'' + expectedType + '\', but received type \'' + type + '\'.', name, context);
			}
			return true;
		});
		return function () {
			if (arguments.length === 0) {
				return validatorFn;
			} else {
				return validatorFn.apply(undefined, arguments);
			}
		};
	}

	this['metal']['validators'] = validators;
}).call(this);
'use strict';

(function () {
	var object = this['metalNamed']['metal']['object'];
	var validators = this['metal']['validators'];

	/**
  * Sugar api that can be used as an alternative for manually building `State`
  * configuration in the expected format. For example, instead of having
  * something like this:
  *
  * ```js
  * MyClass.STATE = {
  *   foo: {
  *     required: true,
  *     validator: validators.number,
  *     value: 13
  *   }
  * };
  * ```
  *
  * You could instead do:
  *
  * ```js
  * MyClass.STATE = {
  *   foo: Config.required().number().value(13)
  * };
  * ```
  */

	var Config = {
		/**
   * Adds the `required` flag to the `State` configuration.
   * @param {boolean} required Flag to set "required" to. True by default.
   * @return {!Object} `State` configuration object.
   */
		required: function required() {
			var _required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return mergeConfig(this, { required: _required });
		},


		/**
   * Adds a setter to the `State` configuration.
   * @param {!function()} setter
   * @return {!Object} `State` configuration object.
   */
		setter: function setter(_setter) {
			return mergeConfig(this, { setter: _setter });
		},


		/**
   * Adds a validator to the `State` configuration.
   * @param {!function()} validator
   * @return {!Object} `State` configuration object.
   */
		validator: function validator(_validator) {
			return mergeConfig(this, { validator: _validator });
		},


		/**
   * Adds a default value to the `State` configuration.
   * @param {*} value
   * @return {!Object} `State` configuration object.
   */
		value: function value(_value) {
			return mergeConfig(this, { value: _value });
		}
	};

	/**
  * Merges the given config object into the one that has been built so far.
  * @param {!Object} context The object calling this function.
  * @param {!Object} config The object to merge to the built config.
  * @return {!Object} The final object containing the built config.
  */
	function mergeConfig(context, config) {
		var obj = context;
		if (obj === Config) {
			obj = Object.create(Config);
			obj.config = {};
		}
		object.mixin(obj.config, config);
		return obj;
	}

	// Add all validators to `Config`.
	var fnNames = Object.keys(validators);
	fnNames.forEach(function (name) {
		return Config[name] = function () {
			return this.validator(validators[name]);
		};
	});

	this['metal']['Config'] = Config;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var async = this['metalNamed']['metal']['async'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var mergeSuperClassesProperty = this['metalNamed']['metal']['mergeSuperClassesProperty'];
	var object = this['metalNamed']['metal']['object'];
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];

	/**
  * State adds support for having object properties that can be watched for
  * changes, as well as configured with validators, setters and other options.
  * See the `addToState` method for a complete list of available configuration
  * options for each state key.
  * @extends {EventEmitter}
  */

	var State = function (_EventEmitter) {
		babelHelpers.inherits(State, _EventEmitter);

		/**
   * Constructor function for `State`.
   * @param {Object=} opt_config Optional config object with initial values to
   *     set state properties to.
   * @param {Object=} opt_obj Optional object that should hold the state
   *     properties. If none is given, they will be added directly to `this`
   *     instead.
   * @param {Object=} opt_context Optional context to call functions (like
   *     validators and setters) on. Defaults to `this`.
   * @param {Object=} opt_commonOpts Optional common option values to be used
   *     by all this instance's state properties.
   */
		function State(opt_config, opt_obj, opt_context, opt_commonOpts) {
			babelHelpers.classCallCheck(this, State);

			/**
    * Common option values to be used by all this instance's state properties.
    * @type {Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this));

			_this.commonOpts_ = opt_commonOpts;

			/**
    * Context to call functions (like validators and setters) on.
    * @type {!Object}
    * @protected
    */
			_this.context_ = opt_context || _this;

			/**
    * Map of keys that can not be used as state keys.
    * @type {!Object<string, boolean>}
    * @protected
    */
			_this.keysBlacklist_ = {};

			/**
    * Object that should hold the state properties.
    * @type {!Object}
    * @protected
    */
			_this.obj_ = opt_obj || _this;

			/**
    * Object with information about the batch event that is currently
    * scheduled, or null if none is.
    * @type {Object}
    * @protected
    */
			_this.scheduledBatchData_ = null;

			/**
    * Object that contains information about all this instance's state keys.
    * @type {!Object<string, !Object>}
    * @protected
    */
			_this.stateInfo_ = {};

			_this.setShouldUseFacade(true);
			_this.mergeInvalidKeys_();
			_this.addToStateFromStaticHint_(opt_config);
			return _this;
		}

		/**
   * Adds the given key to the state.
   * @param {string} name The name of the new state key.
   * @param {Object.<string, *>=} config The configuration object for the new
   *     key. See `addToState` for supported settings.
   * @param {*} initialValue The initial value of the new key.
   */


		babelHelpers.createClass(State, [{
			key: 'addKeyToState',
			value: function addKeyToState(name, config, initialValue) {
				this.buildKeyInfo_(name, config, initialValue, arguments.length > 2);
				Object.defineProperty(this.obj_, name, this.buildKeyPropertyDef_(name));
				this.validateInitialValue_(name);
				this.assertGivenIfRequired_(name);
			}

			/**
    * Adds the given key(s) to the state, together with its(their) configs.
    * Config objects support the given settings:
    *     required - When set to `true`, causes errors to be printed (via
    *     `console.error`) if no value is given for the property.
    *
    *     setter - Function for normalizing state key values. It receives the new
    *     value that was set, and returns the value that should be stored.
    *
    *     validator - Function that validates state key values. When it returns
    *     false, the new value is ignored. When it returns an instance of Error,
    *     it will emit the error to the console.
    *
    *     value - The default value for the state key. Note that setting this to
    *     an object will cause all class instances to use the same reference to
    *     the object. To have each instance use a different reference for objects,
    *     use the `valueFn` option instead.
    *
    *     valueFn - A function that returns the default value for a state key.
    *
    *     writeOnce - Ignores writes to the state key after it's been first
    *     written to. That is, allows writes only when setting the value for the
    *     first time.
    * @param {!Object.<string, !Object>|string} configsOrName An object that maps
    *     configuration options for keys to be added to the state or the name of
    *     a single key to be added.
    * @param {Object.<string, *>=} opt_initialValuesOrConfig An object that maps
    *     state keys to their initial values. These values have higher precedence
    *     than the default values specified in the configurations. If a single
    *     key name was passed as the first param instead though, then this should
    *     be the configuration object for that key.
    * @param {boolean|Object|*=} opt_contextOrInitialValue If the first
    *     param passed to this method was a config object, this should be the
    *     context where the added state keys will be defined (defaults to `this`),
    *     or false if they shouldn't be defined at all. If the first param was a
    *     single key name though, this should be its initial value.
    */

		}, {
			key: 'addToState',
			value: function addToState(configsOrName, opt_initialValuesOrConfig, opt_contextOrInitialValue) {
				if (isString(configsOrName)) {
					return this.addKeyToState.apply(this, arguments);
				}

				var initialValues = opt_initialValuesOrConfig || {};
				var names = Object.keys(configsOrName);

				var props = {};
				for (var i = 0; i < names.length; i++) {
					var name = names[i];
					this.buildKeyInfo_(name, configsOrName[name], initialValues[name], initialValues.hasOwnProperty(name));
					props[name] = this.buildKeyPropertyDef_(name, opt_contextOrInitialValue);
					this.assertGivenIfRequired_(name);
				}

				if (opt_contextOrInitialValue !== false) {
					Object.defineProperties(opt_contextOrInitialValue || this.obj_, props);
				}

				// Validate initial values after all properties have been defined, otherwise
				// it won't be possible to access those properties within validators.
				for (var _i = 0; _i < names.length; _i++) {
					this.validateInitialValue_(names[_i]);
				}
			}

			/**
    * Adds state keys from super classes static hint `MyClass.STATE = {};`.
    * @param {Object.<string, !Object>=} opt_config An object that maps all the
    *     configurations for state keys.
    * @protected
    */

		}, {
			key: 'addToStateFromStaticHint_',
			value: function addToStateFromStaticHint_(opt_config) {
				var ctor = this.constructor;
				var defineContext;
				var merged = State.mergeStateStatic(ctor);
				if (this.obj_ === this) {
					defineContext = merged ? ctor.prototype : false;
				}
				this.addToState(ctor.STATE_MERGED, opt_config, defineContext);
			}

			/**
    * Logs an error if the given property is required but wasn't given.
    * @param {string} name
    * @protected
    */

		}, {
			key: 'assertGivenIfRequired_',
			value: function assertGivenIfRequired_(name) {
				var info = this.stateInfo_[name];
				if (info.config.required) {
					var value = info.state === State.KeyStates.INITIALIZED ? this.get(name) : info.initialValue;
					if (!isDefAndNotNull(value)) {
						console.error('The property called "' + name + '" is required but didn\'t ' + 'receive a value.');
					}
				}
			}

			/**
    * Checks that the given name is a valid state key name. If it's not, an error
    * will be thrown.
    * @param {string} name The name to be validated.
    * @throws {Error}
    * @protected
    */

		}, {
			key: 'assertValidStateKeyName_',
			value: function assertValidStateKeyName_(name) {
				if (this.constructor.INVALID_KEYS_MERGED[name] || this.keysBlacklist_[name]) {
					throw new Error('It\'s not allowed to create a state key with the name "' + name + '".');
				}
			}

			/**
    * Builds the info object for the specified state key.
    * @param {string} name The name of the key.
    * @param {Object} config The config object for the key.
    * @param {*} initialValue The initial value of the key.
    * @param {boolean} hasInitialValue Flag indicating if an initial value was
    *     given or not (important since `initialValue` can also be `undefined`).
    * @protected
    */

		}, {
			key: 'buildKeyInfo_',
			value: function buildKeyInfo_(name, config, initialValue, hasInitialValue) {
				this.assertValidStateKeyName_(name);
				config = config && config.config ? config.config : config || {};
				if (this.commonOpts_) {
					config = object.mixin({}, config, this.commonOpts_);
				}
				this.stateInfo_[name] = {
					config: config,
					state: State.KeyStates.UNINITIALIZED
				};
				if (hasInitialValue) {
					this.stateInfo_[name].initialValue = initialValue;
				}
			}

			/**
    * Builds the property definition object for the specified state key.
    * @param {string} name The name of the key.
    * @param {Object=} opt_context The object where the property will be added.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'buildKeyPropertyDef_',
			value: function buildKeyPropertyDef_(name, opt_context) {
				var stateObj = opt_context === this.constructor.prototype ? null : this;
				return {
					configurable: true,
					enumerable: true,
					get: function get() {
						return (stateObj || this).getStateKeyValue_(name);
					},
					set: function set(val) {
						(stateObj || this).setStateKeyValue_(name, val);
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
				if (isString(fn)) {
					return this.context_[fn].apply(this.context_, args);
				} else if (isFunction(fn)) {
					return fn.apply(this.context_, args);
				}
			}

			/**
    * Calls the state key's setter, if there is one.
    * @param {string} name The name of the key.
    * @param {*} value The value to be set.
    * @param {*} currentValue The current value.
    * @return {*} The final value to be set.
    * @protected
    */

		}, {
			key: 'callSetter_',
			value: function callSetter_(name, value, currentValue) {
				var info = this.stateInfo_[name];
				var config = info.config;
				if (config.setter) {
					value = this.callFunction_(config.setter, [value, currentValue]);
				}
				return value;
			}

			/**
    * Calls the state key's validator, if there is one. Emits console
    * warning if validator returns a string.
    * @param {string} name The name of the key.
    * @param {*} value The value to be validated.
    * @return {boolean} Flag indicating if value is valid or not.
    * @protected
    */

		}, {
			key: 'callValidator_',
			value: function callValidator_(name, value) {
				var info = this.stateInfo_[name];
				var config = info.config;
				if (config.validator) {
					var validatorReturn = this.callFunction_(config.validator, [value, name, this.context_]);

					if (validatorReturn instanceof Error) {
						console.error('Warning: ' + validatorReturn);
					}
					return validatorReturn;
				}
				return true;
			}

			/**
    * Checks if the it's allowed to write on the requested state key.
    * @param {string} name The name of the key.
    * @return {boolean}
    */

		}, {
			key: 'canSetState',
			value: function canSetState(name) {
				var info = this.stateInfo_[name];
				return !info.config.writeOnce || !info.written;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'disposeInternal', this).call(this);
				this.stateInfo_ = null;
				this.scheduledBatchData_ = null;
			}

			/**
    * Emits the state change batch event.
    * @protected
    */

		}, {
			key: 'emitBatchEvent_',
			value: function emitBatchEvent_() {
				if (!this.isDisposed()) {
					var data = this.scheduledBatchData_;
					this.scheduledBatchData_ = null;
					this.emit('stateChanged', data);
				}
			}

			/**
    * Returns the value of the requested state key.
    * Note: this can and should be accomplished by accessing the value as a
    * regular property. This should only be used in cases where a function is
    * actually needed.
    * @param {string} name
    * @return {*}
    */

		}, {
			key: 'get',
			value: function get(name) {
				return this.obj_[name];
			}

			/**
    * Returns an object that maps state keys to their values.
    * @param {Array<string>=} opt_names A list of names of the keys that should
    *   be returned. If none is given, the whole state will be returned.
    * @return {Object.<string, *>}
    */

		}, {
			key: 'getState',
			value: function getState(opt_names) {
				var state = {};
				var names = opt_names || this.getStateKeys();

				for (var i = 0; i < names.length; i++) {
					state[names[i]] = this.get(names[i]);
				}

				return state;
			}

			/**
    * Gets the config object for the requested state key.
    * @param {string} name The key's name.
    * @return {Object}
    * @protected
    */

		}, {
			key: 'getStateKeyConfig',
			value: function getStateKeyConfig(name) {
				return (this.stateInfo_[name] || {}).config;
			}

			/**
    * Returns an array with all state keys.
    * @return {!Array.<string>}
    */

		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.stateInfo_ ? Object.keys(this.stateInfo_) : [];
			}

			/**
    * Gets the value of the specified state key. This is passed as that key's
    * getter to the `Object.defineProperty` call inside the `addKeyToState` method.
    * @param {string} name The name of the key.
    * @return {*}
    * @protected
    */

		}, {
			key: 'getStateKeyValue_',
			value: function getStateKeyValue_(name) {
				if (!this.warnIfDisposed_(name)) {
					this.initStateKey_(name);
					return this.stateInfo_[name].value;
				}
			}

			/**
    * Checks if the value of the state key with the given name has already been
    * set. Note that this doesn't run the key's getter.
    * @param {string} name The name of the key.
    * @return {boolean}
    */

		}, {
			key: 'hasBeenSet',
			value: function hasBeenSet(name) {
				var info = this.stateInfo_[name];
				return info.state === State.KeyStates.INITIALIZED || this.hasInitialValue_(name);
			}

			/**
    * Checks if an initial value was given to the specified state property.
    * @param {string} name The name of the key.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'hasInitialValue_',
			value: function hasInitialValue_(name) {
				return this.stateInfo_[name].hasOwnProperty('initialValue');
			}

			/**
    * Checks if the given key is present in this instance's state.
    * @param {string} key
    * @return {boolean}
    */

		}, {
			key: 'hasStateKey',
			value: function hasStateKey(key) {
				if (!this.warnIfDisposed_(key)) {
					return !!this.stateInfo_[key];
				}
			}

			/**
    * Informs of changes to a state key's value through an event. Won't trigger
    * the event if the value hasn't changed or if it's being initialized.
    * @param {string} name The name of the key.
    * @param {*} prevVal The previous value of the key.
    * @protected
    */

		}, {
			key: 'informChange_',
			value: function informChange_(name, prevVal) {
				if (this.shouldInformChange_(name, prevVal)) {
					var data = {
						key: name,
						newVal: this.get(name),
						prevVal: prevVal
					};
					this.emit(name + 'Changed', data);
					this.emit('stateKeyChanged', data);
					this.scheduleBatchEvent_(data);
				}
			}

			/**
    * Initializes the specified state key, giving it a first value.
    * @param {string} name The name of the key.
    * @protected
    */

		}, {
			key: 'initStateKey_',
			value: function initStateKey_(name) {
				var info = this.stateInfo_[name];
				if (info.state !== State.KeyStates.UNINITIALIZED) {
					return;
				}

				info.state = State.KeyStates.INITIALIZING;
				this.setInitialValue_(name);
				if (!info.written) {
					this.setDefaultValue(name);
				}
				info.state = State.KeyStates.INITIALIZED;
			}

			/**
    * Merges an array of values for the STATE property into a single object.
    * @param {!Array} values The values to be merged.
    * @return {!Object} The merged value.
    * @static
    */

		}, {
			key: 'mergeInvalidKeys_',


			/**
    * Merges the values of the `INVALID_KEYS` static for the whole hierarchy of
    * the current instance.
    * @protected
    */
			value: function mergeInvalidKeys_() {
				mergeSuperClassesProperty(this.constructor, 'INVALID_KEYS', function (values) {
					return array.flatten(values).reduce(function (merged, val) {
						if (val) {
							merged[val] = true;
						}
						return merged;
					}, {});
				});
			}

			/**
    * Removes the requested state key.
    * @param {string} name The name of the key.
    */

		}, {
			key: 'removeStateKey',
			value: function removeStateKey(name) {
				this.stateInfo_[name] = null;
				delete this.obj_[name];
			}

			/**
    * Schedules a state change batch event to be emitted asynchronously.
    * @param {!Object} changeData Information about a state key's update.
    * @protected
    */

		}, {
			key: 'scheduleBatchEvent_',
			value: function scheduleBatchEvent_(changeData) {
				if (!this.scheduledBatchData_) {
					async.nextTick(this.emitBatchEvent_, this);
					this.scheduledBatchData_ = {
						changes: {}
					};
				}

				var name = changeData.key;
				var changes = this.scheduledBatchData_.changes;
				if (changes[name]) {
					changes[name].newVal = changeData.newVal;
				} else {
					changes[name] = changeData;
				}
			}

			/**
    * Sets the value of the requested state key.
    * Note: this can and should be accomplished by setting the state key as a
    * regular property. This should only be used in cases where a function is
    * actually needed.
    * @param {string} name
    * @param {*} value
    * @return {*}
    */

		}, {
			key: 'set',
			value: function set(name, value) {
				if (this.hasStateKey(name)) {
					this.obj_[name] = value;
				}
			}

			/**
    * Sets the default value of the requested state key.
    * @param {string} name The name of the key.
    * @return {*}
    */

		}, {
			key: 'setDefaultValue',
			value: function setDefaultValue(name) {
				var config = this.stateInfo_[name].config;

				if (config.value !== undefined) {
					this.set(name, config.value);
				} else {
					this.set(name, this.callFunction_(config.valueFn));
				}
			}

			/**
    * Sets the initial value of the requested state key.
    * @param {string} name The name of the key.
    * @return {*}
    * @protected
    */

		}, {
			key: 'setInitialValue_',
			value: function setInitialValue_(name) {
				if (this.hasInitialValue_(name)) {
					var info = this.stateInfo_[name];
					this.set(name, info.initialValue);
					info.initialValue = undefined;
				}
			}

			/**
    * Sets a map of keys that are not valid state keys.
    * @param {!Object<string, boolean>}
    */

		}, {
			key: 'setKeysBlacklist_',
			value: function setKeysBlacklist_(blacklist) {
				this.keysBlacklist_ = blacklist;
			}

			/**
    * Sets the value of all the specified state keys.
    * @param {!Object.<string,*>} values A map of state keys to the values they
    *   should be set to.
    * @param {function()=} opt_callback An optional function that will be run
    *   after the next batched update is triggered.
    */

		}, {
			key: 'setState',
			value: function setState(values, opt_callback) {
				var _this2 = this;

				Object.keys(values).forEach(function (name) {
					return _this2.set(name, values[name]);
				});
				if (opt_callback && this.scheduledBatchData_) {
					this.once('stateChanged', opt_callback);
				}
			}

			/**
    * Sets the value of the specified state key. This is passed as that key's
    * setter to the `Object.defineProperty` call inside the `addKeyToState`
    * method.
    * @param {string} name The name of the key.
    * @param {*} value The new value of the key.
    * @protected
    */

		}, {
			key: 'setStateKeyValue_',
			value: function setStateKeyValue_(name, value) {
				if (this.warnIfDisposed_(name) || !this.canSetState(name) || !this.validateKeyValue_(name, value)) {
					return;
				}

				var info = this.stateInfo_[name];
				if (!this.hasInitialValue_(name) && info.state === State.KeyStates.UNINITIALIZED) {
					info.state = State.KeyStates.INITIALIZED;
				}

				var prevVal = this.get(name);
				info.value = this.callSetter_(name, value, prevVal);
				this.assertGivenIfRequired_(name);
				info.written = true;
				this.informChange_(name, prevVal);
			}

			/**
    * Checks if we should inform about a state update. Updates are ignored during
    * state initialization. Otherwise, updates to primitive values are only
    * informed when the new value is different from the previous one. Updates to
    * objects (which includes functions and arrays) are always informed outside
    * initialization though, since we can't be sure if all of the internal data
    * has stayed the same.
    * @param {string} name The name of the key.
    * @param {*} prevVal The previous value of the key.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'shouldInformChange_',
			value: function shouldInformChange_(name, prevVal) {
				var info = this.stateInfo_[name];
				return info.state === State.KeyStates.INITIALIZED && (isObject(prevVal) || prevVal !== this.get(name));
			}

			/**
    * Validates the initial value for the state property with the given name.
    * @param {string} name
    * @protected
    */

		}, {
			key: 'validateInitialValue_',
			value: function validateInitialValue_(name) {
				var info = this.stateInfo_[name];
				if (this.hasInitialValue_(name) && !this.callValidator_(name, info.initialValue)) {
					delete info.initialValue;
				}
			}

			/**
    * Validates the state key's value, which includes calling the validator
    * defined in the key's configuration object, if there is one.
    * @param {string} name The name of the key.
    * @param {*} value The value to be validated.
    * @return {boolean} Flag indicating if value is valid or not.
    * @protected
    */

		}, {
			key: 'validateKeyValue_',
			value: function validateKeyValue_(name, value) {
				var info = this.stateInfo_[name];

				return info.state === State.KeyStates.INITIALIZING || this.callValidator_(name, value);
			}

			/**
    * Warns if this instance has already been disposed.
    * @param {string} name Name of the property to be accessed if not disposed.
    * @return {boolean} True if disposed, or false otherwise.
    * @protected
    */

		}, {
			key: 'warnIfDisposed_',
			value: function warnIfDisposed_(name) {
				var disposed = this.isDisposed();
				if (disposed) {
					console.warn('Error. Trying to access property "' + name + '" on disposed instance');
				}
				return disposed;
			}
		}], [{
			key: 'mergeState',
			value: function mergeState(values) {
				return object.mixin.apply(null, [{}].concat(values.reverse()));
			}

			/**
    * Merges the STATE static variable for the given constructor function.
    * @param  {!Function} ctor Constructor function.
    * @return {boolean} Returns true if merge happens, false otherwise.
    * @static
    */

		}, {
			key: 'mergeStateStatic',
			value: function mergeStateStatic(ctor) {
				return mergeSuperClassesProperty(ctor, 'STATE', State.mergeState);
			}
		}]);
		return State;
	}(EventEmitter);

	/**
  * A list with state key names that will automatically be rejected as invalid.
  * Subclasses can define their own invalid keys by setting this static on their
  * constructors, which will be merged together and handled automatically.
  * @type {!Array<string>}
  */


	State.INVALID_KEYS = ['state', 'stateKey'];

	/**
  * Constants that represent the states that a state key can be in.
  * @type {!Object}
  */
	State.KeyStates = {
		UNINITIALIZED: 0,
		INITIALIZING: 1,
		INITIALIZED: 2
	};

	this['metal']['State'] = State;
}).call(this);
'use strict';

(function () {
  var validators = this['metal']['validators'];
  var Config = this['metal']['Config'];
  var State = this['metal']['State'];
  this['metal']['state'] = State;
  this['metalNamed']['state'] = this['metalNamed']['state'] || {};
  this['metalNamed']['state']['validators'] = validators;
  this['metalNamed']['state']['Config'] = Config;
  this['metalNamed']['state']['State'] = State;
}).call(this);
'use strict';

(function () {
	var Geometry = function () {
		function Geometry() {
			babelHelpers.classCallCheck(this, Geometry);
		}

		babelHelpers.createClass(Geometry, null, [{
			key: 'intersectRect',

			/**
      * Tests if a rectangle intersects with another.
      *
      * <pre>
      *  x0y0 --------       x2y2 --------
      *      |       |           |       |
      *      -------- x1y1       -------- x3y3
      * </pre>
      *
      * Note that coordinates starts from top to down (y), left to right (x):
      *
      * <pre>
      *      ------> (x)
      *      |
      *      |
      *     (y)
      * </pre>
      *
      * @param {number} x0 Horizontal coordinate of P0.
      * @param {number} y0 Vertical coordinate of P0.
      * @param {number} x1 Horizontal coordinate of P1.
      * @param {number} y1 Vertical coordinate of P1.
      * @param {number} x2 Horizontal coordinate of P2.
      * @param {number} y2 Vertical coordinate of P2.
      * @param {number} x3 Horizontal coordinate of P3.
      * @param {number} y3 Vertical coordinate of P3.
      * @return {boolean}
      */
			value: function intersectRect(x0, y0, x1, y1, x2, y2, x3, y3) {
				return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
			}
		}]);
		return Geometry;
	}();

	this['metal']['Geometry'] = Geometry;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Geometry = this['metal']['Geometry'];

	/**
  * Class with static methods responsible for doing browser position checks.
  */

	var Position = function () {
		function Position() {
			babelHelpers.classCallCheck(this, Position);
		}

		babelHelpers.createClass(Position, null, [{
			key: 'getClientHeight',

			/**
    * Gets the client height of the specified node. Scroll height is not
    * included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */
			value: function getClientHeight(node) {
				return this.getClientSize_(node, 'Height');
			}

			/**
    * Gets the client height or width of the specified node. Scroll height is
    * not included.
    * @param {Element|Document|Window=} node
    * @param {string} `Width` or `Height` property.
    * @return {number}
    * @protected
    */

		}, {
			key: 'getClientSize_',
			value: function getClientSize_(node, prop) {
				var el = node;
				if (core.isWindow(node)) {
					el = node.document.documentElement;
				}
				if (core.isDocument(node)) {
					el = node.documentElement;
				}
				return el['client' + prop];
			}

			/**
    * Gets the client width of the specified node. Scroll width is not
    * included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getClientWidth',
			value: function getClientWidth(node) {
				return this.getClientSize_(node, 'Width');
			}

			/**
    * Gets the region of the element, document or window.
    * @param {Element|Document|Window=} opt_element Optional element to test.
    * @return {!DOMRect} The returned value is a simulated DOMRect object which
    *     is the union of the rectangles returned by getClientRects() for the
    *     element, i.e., the CSS border-boxes associated with the element.
    * @protected
    */

		}, {
			key: 'getDocumentRegion_',
			value: function getDocumentRegion_(opt_element) {
				var height = this.getHeight(opt_element);
				var width = this.getWidth(opt_element);
				return this.makeRegion(height, height, 0, width, 0, width);
			}

			/**
    * Gets the height of the specified node. Scroll height is included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getHeight',
			value: function getHeight(node) {
				return this.getSize_(node, 'Height');
			}

			/**
    * Gets the top offset position of the given node. This fixes the `offsetLeft` value of
    * nodes that were translated, which don't take that into account at all. That makes
    * the calculation more expensive though, so if you don't want that to be considered
    * either pass `opt_ignoreTransform` as true or call `offsetLeft` directly on the node.
    * @param {!Element} node
    * @param {boolean=} opt_ignoreTransform When set to true will ignore transform css
    *   when calculating the position. Defaults to false.
    * @return {number}
    */

		}, {
			key: 'getOffsetLeft',
			value: function getOffsetLeft(node, opt_ignoreTransform) {
				return node.offsetLeft + (opt_ignoreTransform ? 0 : Position.getTranslation(node).left);
			}

			/**
    * Gets the top offset position of the given node. This fixes the `offsetTop` value of
    * nodes that were translated, which don't take that into account at all. That makes
    * the calculation more expensive though, so if you don't want that to be considered
    * either pass `opt_ignoreTransform` as true or call `offsetTop` directly on the node.
    * @param {!Element} node
    * @param {boolean=} opt_ignoreTransform When set to true will ignore transform css
    *   when calculating the position. Defaults to false.
    * @return {number}
    */

		}, {
			key: 'getOffsetTop',
			value: function getOffsetTop(node, opt_ignoreTransform) {
				return node.offsetTop + (opt_ignoreTransform ? 0 : Position.getTranslation(node).top);
			}

			/**
    * Gets the size of an element and its position relative to the viewport.
    * @param {!Document|Element|Window} node
    * @param {boolean=} opt_includeScroll Flag indicating if the document scroll
    *   position should be considered in the element's region coordinates. Defaults
    *   to false.
    * @return {!DOMRect} The returned value is a DOMRect object which is the
    *     union of the rectangles returned by getClientRects() for the element,
    *     i.e., the CSS border-boxes associated with the element.
    */

		}, {
			key: 'getRegion',
			value: function getRegion(node, opt_includeScroll) {
				if (core.isDocument(node) || core.isWindow(node)) {
					return this.getDocumentRegion_(node);
				}
				return this.makeRegionFromBoundingRect_(node.getBoundingClientRect(), opt_includeScroll);
			}

			/**
    * Gets the scroll left position of the specified node.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getScrollLeft',
			value: function getScrollLeft(node) {
				if (core.isWindow(node)) {
					return node.pageXOffset;
				}
				if (core.isDocument(node)) {
					return node.defaultView.pageXOffset;
				}
				return node.scrollLeft;
			}

			/**
    * Gets the scroll top position of the specified node.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getScrollTop',
			value: function getScrollTop(node) {
				if (core.isWindow(node)) {
					return node.pageYOffset;
				}
				if (core.isDocument(node)) {
					return node.defaultView.pageYOffset;
				}
				return node.scrollTop;
			}

			/**
    * Gets the height or width of the specified node. Scroll height is
    * included.
    * @param {Element|Document|Window=} node
    * @param {string} `Width` or `Height` property.
    * @return {number}
    * @protected
    */

		}, {
			key: 'getSize_',
			value: function getSize_(node, prop) {
				if (core.isWindow(node)) {
					return this.getClientSize_(node, prop);
				}
				if (core.isDocument(node)) {
					var docEl = node.documentElement;
					return Math.max(node.body['scroll' + prop], docEl['scroll' + prop], node.body['offset' + prop], docEl['offset' + prop], docEl['client' + prop]);
				}
				return Math.max(node['client' + prop], node['scroll' + prop], node['offset' + prop]);
			}

			/**
    * Gets the transform matrix values for the given node.
    * @param {!Element} node
    * @return {Array<number>}
    */

		}, {
			key: 'getTransformMatrixValues',
			value: function getTransformMatrixValues(node) {
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
			}

			/**
    * Gets the number of translated pixels for the given node, for both the top and
    * left positions.
    * @param {!Element} node
    * @return {number}
    */

		}, {
			key: 'getTranslation',
			value: function getTranslation(node) {
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
			}

			/**
    * Gets the width of the specified node. Scroll width is included.
    * @param {Element|Document|Window=} node
    * @return {number}
    */

		}, {
			key: 'getWidth',
			value: function getWidth(node) {
				return this.getSize_(node, 'Width');
			}

			/**
    * Tests if a region intersects with another.
    * @param {DOMRect} r1
    * @param {DOMRect} r2
    * @return {boolean}
    */

		}, {
			key: 'intersectRegion',
			value: function intersectRegion(r1, r2) {
				return Geometry.intersectRect(r1.top, r1.left, r1.bottom, r1.right, r2.top, r2.left, r2.bottom, r2.right);
			}

			/**
    * Tests if a region is inside another.
    * @param {DOMRect} r1
    * @param {DOMRect} r2
    * @return {boolean}
    */

		}, {
			key: 'insideRegion',
			value: function insideRegion(r1, r2) {
				return r2.top >= r1.top && r2.bottom <= r1.bottom && r2.right <= r1.right && r2.left >= r1.left;
			}

			/**
    * Tests if a region is inside viewport region.
    * @param {DOMRect} region
    * @return {boolean}
    */

		}, {
			key: 'insideViewport',
			value: function insideViewport(region) {
				return this.insideRegion(this.getRegion(window), region);
			}

			/**
    * Computes the intersection region between two regions.
    * @param {DOMRect} r1
    * @param {DOMRect} r2
    * @return {?DOMRect} Intersection region or null if regions doesn't
    *     intersects.
    */

		}, {
			key: 'intersection',
			value: function intersection(r1, r2) {
				if (!this.intersectRegion(r1, r2)) {
					return null;
				}
				var bottom = Math.min(r1.bottom, r2.bottom);
				var right = Math.min(r1.right, r2.right);
				var left = Math.max(r1.left, r2.left);
				var top = Math.max(r1.top, r2.top);
				return this.makeRegion(bottom, bottom - top, left, right, top, right - left);
			}

			/**
    * Makes a region object. It's a writable version of DOMRect.
    * @param {number} bottom
    * @param {number} height
    * @param {number} left
    * @param {number} right
    * @param {number} top
    * @param {number} width
    * @return {!DOMRect} The returned value is a DOMRect object which is the
    *     union of the rectangles returned by getClientRects() for the element,
    *     i.e., the CSS border-boxes associated with the element.
    */

		}, {
			key: 'makeRegion',
			value: function makeRegion(bottom, height, left, right, top, width) {
				return {
					bottom: bottom,
					height: height,
					left: left,
					right: right,
					top: top,
					width: width
				};
			}

			/**
    * Makes a region from a DOMRect result from `getBoundingClientRect`.
    * @param  {!DOMRect} The returned value is a DOMRect object which is the
    *     union of the rectangles returned by getClientRects() for the element,
    *     i.e., the CSS border-boxes associated with the element.
    * @param {boolean=} opt_includeScroll Flag indicating if the document scroll
    *   position should be considered in the element's region coordinates. Defaults
    *   to false.
    * @return {DOMRect} Writable version of DOMRect.
    * @protected
    */

		}, {
			key: 'makeRegionFromBoundingRect_',
			value: function makeRegionFromBoundingRect_(rect, opt_includeScroll) {
				var deltaX = opt_includeScroll ? Position.getScrollLeft(document) : 0;
				var deltaY = opt_includeScroll ? Position.getScrollTop(document) : 0;
				return this.makeRegion(rect.bottom + deltaY, rect.height, rect.left + deltaX, rect.right + deltaX, rect.top + deltaY, rect.width);
			}

			/**
    * Checks if the given point coordinates are inside a region.
    * @param {number} x
    * @param {number} y
    * @param {!Object} region
    * @return {boolean}
    */

		}, {
			key: 'pointInsideRegion',
			value: function pointInsideRegion(x, y, region) {
				return Position.insideRegion(region, Position.makeRegion(y, 0, x, x, y, 0));
			}
		}]);
		return Position;
	}();

	this['metal']['Position'] = Position;
}).call(this);
'use strict';

(function () {
	var Position = this['metal']['Position'];

	/**
  * Align utility. Computes region or best region to align an element with
  * another. Regions are relative to viewport, make sure to use element with
  * position fixed, or position absolute when the element first positioned
  * parent is the body element.
  */

	var Align = function () {
		function Align() {
			babelHelpers.classCallCheck(this, Align);
		}

		babelHelpers.createClass(Align, null, [{
			key: 'align',


			/**
    * Aligns the element with the best region around alignElement. The best
    * region is defined by clockwise rotation starting from the specified
    * `position`. The element is always aligned in the middle of alignElement
    * axis.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The initial position to try. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {string} The final chosen position for the aligned element.
    * @static
    */
			value: function align(element, alignElement, position) {
				var suggestion = this.suggestAlignBestRegion(element, alignElement, position);
				var bestRegion = suggestion.region;

				var computedStyle = window.getComputedStyle(element, null);
				if (computedStyle.getPropertyValue('position') !== 'fixed') {
					bestRegion.top += window.pageYOffset;
					bestRegion.left += window.pageXOffset;

					var offsetParent = element;
					while (offsetParent = offsetParent.offsetParent) {
						bestRegion.top -= Position.getOffsetTop(offsetParent);
						bestRegion.left -= Position.getOffsetLeft(offsetParent);
					}
				}

				element.style.top = bestRegion.top + 'px';
				element.style.left = bestRegion.left + 'px';
				return suggestion.position;
			}

			/**
    * Returns the best region to align element with alignElement. This is similar
    * to `Align.suggestAlignBestRegion`, but it only returns the region information,
    * while `Align.suggestAlignBestRegion` also returns the chosen position.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The initial position to try. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {DOMRect} Best region to align element.
    * @static
    */

		}, {
			key: 'getAlignBestRegion',
			value: function getAlignBestRegion(element, alignElement, position) {
				return Align.suggestAlignBestRegion(element, alignElement, position).region;
			}

			/**
    * Returns the region to align element with alignElement. The element is
    * always aligned in the middle of alignElement axis.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The position to align. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {DOMRect} Region to align element.
    * @static
    */

		}, {
			key: 'getAlignRegion',
			value: function getAlignRegion(element, alignElement, position) {
				var r1 = Position.getRegion(alignElement);
				var r2 = Position.getRegion(element);
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
			}

			/**
    * Checks if specified value is a valid position. Options `Align.Top`,
    *     `Align.Right`, `Align.Bottom`, `Align.Left`.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} val
    * @return {boolean} Returns true if value is a valid position.
    * @static
    */

		}, {
			key: 'isValidPosition',
			value: function isValidPosition(val) {
				return 0 <= val && val <= 8;
			}

			/**
    * Looks for the best region for aligning the given element. The best
    * region is defined by clockwise rotation starting from the specified
    * `position`. The element is always aligned in the middle of alignElement
    * axis.
    * @param {!Element} element Element to be aligned.
    * @param {!Element} alignElement Element to align with.
    * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} pos
    *     The initial position to try. Options `Align.Top`, `Align.Right`,
    *     `Align.Bottom`, `Align.Left`.
    * @return {{position: string, region: DOMRect}} Best region to align element.
    * @static
    */

		}, {
			key: 'suggestAlignBestRegion',
			value: function suggestAlignBestRegion(element, alignElement, position) {
				var bestArea = 0;
				var bestPosition = position;
				var bestRegion = this.getAlignRegion(element, alignElement, bestPosition);
				var tryPosition = bestPosition;
				var tryRegion = bestRegion;
				var viewportRegion = Position.getRegion(window);

				for (var i = 0; i < 8;) {
					if (Position.intersectRegion(viewportRegion, tryRegion)) {
						var visibleRegion = Position.intersection(viewportRegion, tryRegion);
						var area = visibleRegion.width * visibleRegion.height;
						if (area > bestArea) {
							bestArea = area;
							bestRegion = tryRegion;
							bestPosition = tryPosition;
						}
						if (Position.insideViewport(tryRegion)) {
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
			}
		}]);
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

	this['metal']['Align'] = Align;
}).call(this);
'use strict';

(function () {
  var Align = this['metal']['Align'];
  var Geometry = this['metal']['Geometry'];
  var Position = this['metal']['Position'];
  this['metal']['position'] = Position;
  this['metalNamed']['position'] = this['metalNamed']['position'] || {};
  this['metalNamed']['position']['Align'] = Align;
  this['metalNamed']['position']['Geometry'] = Geometry;
  this['metalNamed']['position']['Position'] = Position;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metalNamed']['dom']['dom'];
	var DomEventEmitterProxy = this['metalNamed']['dom']['DomEventEmitterProxy'];
	var State = this['metal']['state'];
	var EventEmitter = this['metal']['events'];
	var Position = this['metal']['position'];

	/**
  * Affix utility.
  */

	var Affix = function (_State) {
		babelHelpers.inherits(Affix, _State);

		/**
   * @inheritDoc
   */
		function Affix(opt_config) {
			babelHelpers.classCallCheck(this, Affix);

			var _this = babelHelpers.possibleConstructorReturn(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).call(this, opt_config));

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


		babelHelpers.createClass(Affix, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				dom.removeClasses(this.element, Affix.Position.Bottom + ' ' + Affix.Position.Default + ' ' + Affix.Position.Top);
				this.scrollHandle_.dispose();
				babelHelpers.get(Affix.prototype.__proto__ || Object.getPrototypeOf(Affix.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Synchronize bottom, top and element regions and checks if position has
    * changed. If position has changed syncs position.
    */

		}, {
			key: 'checkPosition',
			value: function checkPosition() {
				if (this.intersectTopRegion()) {
					this.syncPosition(Affix.Position.Top);
				} else if (this.intersectBottomRegion()) {
					this.syncPosition(Affix.Position.Bottom);
				} else {
					this.syncPosition(Affix.Position.Default);
				}
			}

			/**
    * Whether the element is intersecting with bottom region defined by
    * offsetBottom.
    * @return {boolean}
    */

		}, {
			key: 'intersectBottomRegion',
			value: function intersectBottomRegion() {
				if (!core.isDef(this.offsetBottom)) {
					return false;
				}
				var clientHeight = Position.getHeight(this.scrollElement);
				var scrollElementClientHeight = Position.getClientHeight(this.scrollElement);
				return Position.getScrollTop(this.scrollElement) + scrollElementClientHeight >= clientHeight - this.offsetBottom;
			}

			/**
    * Whether the element is intersecting with top region defined by
    * offsetTop.
    * @return {boolean}
    */

		}, {
			key: 'intersectTopRegion',
			value: function intersectTopRegion() {
				if (!core.isDef(this.offsetTop)) {
					return false;
				}
				return Position.getScrollTop(this.scrollElement) <= this.offsetTop;
			}

			/**
    * Synchronizes element css classes to match with the specified position.
    * @param {Position.Bottom|Position.Default|Position.Top} position
    */

		}, {
			key: 'syncPosition',
			value: function syncPosition(position) {
				if (this.lastPosition_ !== position) {
					dom.addClasses(this.element, position);
					dom.removeClasses(this.element, this.lastPosition_);
					this.lastPosition_ = position;
				}
			}
		}]);
		return Affix;
	}(State);

	/**
  * Holds positions enum.
  * @enum {string}
  */


	Affix.Position = {
		Top: 'affix-top',
		Bottom: 'affix-bottom',
		Default: 'affix'
	};

	Affix.STATE = {
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

	this['metal']['Affix'] = Affix;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metalNamed']['dom']['dom'];
	var features = this['metalNamed']['dom']['features'];

	var Anim = function () {
		function Anim() {
			babelHelpers.classCallCheck(this, Anim);
		}

		babelHelpers.createClass(Anim, null, [{
			key: 'emulateEnd',

			/**
    * Emulates animation or transition end event, the end event with longer
    * duration will be used by the emulation. If they have the same value,
    * transitionend will be emulated.
    * @param {!Element} element
    * @param {number=} opt_durationMs
    * @return {!Object} Object containing `abort` function.
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
    * @param {!Element} element
    * @param {number=} opt_durationMs
    * @return {!Object} Object containing `abort` function.
    */

		}, {
			key: 'emulateAnimationEnd',
			value: function emulateAnimationEnd(element, opt_durationMs) {
				return this.emulateEnd_(element, 'animation', opt_durationMs);
			}

			/**
    * Emulates transition end event. If `opt_durationMs` not specified the
    * value will read from computed style for transition-duration.
    * @param {!Element} element
    * @param {number=} opt_durationMs
    * @return {!Object} Object containing `abort` function.
    */

		}, {
			key: 'emulateTransitionEnd',
			value: function emulateTransitionEnd(element, opt_durationMs) {
				this.emulateEnd_(element, 'transition', opt_durationMs);
			}

			/**
    * Emulates transition or animation end.
    * @param {!Element} element
    * @param {string} type
    * @param {number=} opt_durationMs
    * @return {!Object} Object containing `abort` function.
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
    * @param {!Element} element
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
	}();

	this['metal']['Anim'] = Anim;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var mergeSuperClassesProperty = this['metalNamed']['metal']['mergeSuperClassesProperty'];
	var object = this['metalNamed']['metal']['object'];
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];
	var EventEmitterProxy = this['metalNamed']['events']['EventEmitterProxy'];
	var State = this['metal']['state'];

	var ComponentDataManager = function (_EventEmitter) {
		babelHelpers.inherits(ComponentDataManager, _EventEmitter);

		/**
   * Constructor for `ComponentDataManager`.
   * @param {!Component} component
   * @param {!Object} data
   */
		function ComponentDataManager(component, data) {
			babelHelpers.classCallCheck(this, ComponentDataManager);

			var _this = babelHelpers.possibleConstructorReturn(this, (ComponentDataManager.__proto__ || Object.getPrototypeOf(ComponentDataManager)).call(this));

			_this.component_ = component;

			mergeSuperClassesProperty(_this.constructor, 'BLACKLIST', array.firstDefinedValue);
			State.mergeStateStatic(_this.component_.constructor);

			_this.createState_(data, _this.component_);
			return _this;
		}

		/**
   * Adds a state property to the component.
   * @param {string} name
   * @param {!Object} config
   * @param {*} opt_initialValue
   */


		babelHelpers.createClass(ComponentDataManager, [{
			key: 'add',
			value: function add() {
				var _state_;

				(_state_ = this.state_).addToState.apply(_state_, arguments);
			}

			/**
    * Builds the configuration data that will be passed to the `State` instance.
    * @param {!Object} data
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'buildStateInstanceData_',
			value: function buildStateInstanceData_(data) {
				return object.mixin({}, data, this.component_.constructor.STATE_MERGED);
			}

			/**
    * Creates the `State` instance that will handle the main component data.
    * @param {!Object} data
    * @param {!Object} holder The object that should hold the data properties.
    * @protected
    */

		}, {
			key: 'createState_',
			value: function createState_(data, holder) {
				var state = new State({}, holder, this.component_);
				state.setKeysBlacklist_(this.constructor.BLACKLIST_MERGED);
				state.addToState(this.buildStateInstanceData_(data), this.component_.getInitialConfig());

				var listener = this.emit_.bind(this);
				state.on('stateChanged', listener);
				state.on('stateKeyChanged', listener);
				this.state_ = state;

				this.proxy_ = new EventEmitterProxy(state, this.component_);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(ComponentDataManager.prototype.__proto__ || Object.getPrototypeOf(ComponentDataManager.prototype), 'disposeInternal', this).call(this);

				this.state_.dispose();
				this.state_ = null;

				this.proxy_.dispose();
				this.proxy_ = null;
			}

			/**
    * Emits the specified event.
    * @param {!Object} data
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'emit_',
			value: function emit_(data, event) {
				var orig = event.type;
				var name = orig === 'stateChanged' ? 'dataChanged' : 'dataPropChanged';
				this.emit(name, data);
			}

			/**
    * Gets the data with the given name.
    * @param {string} name
    * @return {*}
    */

		}, {
			key: 'get',
			value: function get(name) {
				return this.state_.get(name);
			}

			/**
    * Gets the keys for state data that can be synced via `sync` functions.
    * @return {!Array<string>}
    */

		}, {
			key: 'getSyncKeys',
			value: function getSyncKeys() {
				return this.state_.getStateKeys();
			}

			/**
    * Gets the keys for state data.
    * @return {!Array<string>}
    */

		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.state_.getStateKeys();
			}

			/**
    * Gets the whole state data.
    * @return {!Object}
    */

		}, {
			key: 'getState',
			value: function getState() {
				return this.state_.getState();
			}

			/**
    * Gets the `State` instance being used.
    * @return {!Object}
    */

		}, {
			key: 'getStateInstance',
			value: function getStateInstance() {
				return this.state_;
			}

			/**
    * Updates all non internal data with the given values (or to the default
    * value if none is given).
    * @param {!Object} data
    */

		}, {
			key: 'replaceNonInternal',
			value: function replaceNonInternal(data) {
				ComponentDataManager.replaceNonInternal(data, this.state_);
			}

			/**
    * Updates all non internal data with the given values (or to the default
    * value if none is given).
    * @param {!Object} data
    * @param {!State} state
    */

		}, {
			key: 'setState',


			/**
    * Sets the value of all the specified state keys.
    * @param {!Object.<string,*>} values A map of state keys to the values they
    *   should be set to.
    * @param {function()=} opt_callback An optional function that will be run
    *   after the next batched update is triggered.
    */
			value: function setState(state, opt_callback) {
				this.state_.setState(state, opt_callback);
			}
		}], [{
			key: 'replaceNonInternal',
			value: function replaceNonInternal(data, state) {
				var keys = state.getStateKeys();
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					if (!state.getStateKeyConfig(key).internal) {
						if (data.hasOwnProperty(key)) {
							state.set(key, data[key]);
						} else {
							state.setDefaultValue(key);
						}
					}
				}
			}
		}]);
		return ComponentDataManager;
	}(EventEmitter);

	ComponentDataManager.BLACKLIST = {
		components: true,
		context: true,
		element: true,
		refs: true,
		wasRendered: true
	};

	this['metal']['ComponentDataManager'] = ComponentDataManager;
}).call(this);
'use strict';

(function () {
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];

	/**
  * Base class that component renderers should extend from. It defines the
  * required methods all renderers should have.
  */

	var ComponentRenderer = function (_EventEmitter) {
		babelHelpers.inherits(ComponentRenderer, _EventEmitter);

		/**
   * Constructor function for `ComponentRenderer`.
   * @param {!Component} component The component that this renderer is
   *     responsible for.
   */
		function ComponentRenderer(component) {
			babelHelpers.classCallCheck(this, ComponentRenderer);

			var _this = babelHelpers.possibleConstructorReturn(this, (ComponentRenderer.__proto__ || Object.getPrototypeOf(ComponentRenderer)).call(this));

			_this.component_ = component;

			_this.componentRendererEvents_ = new EventHandler();
			_this.componentRendererEvents_.add(_this.component_.once('render', _this.render.bind(_this)));
			_this.on('rendered', _this.handleRendered_);
			component.on('dataManagerCreated', _this.handleDataManagerCreated_.bind(_this));
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(ComponentRenderer, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.componentRendererEvents_.removeAllListeners();
				this.componentRendererEvents_ = null;
			}

			/**
    * Returns this renderer's component.
    * @return {!Component}
    */

		}, {
			key: 'getComponent',
			value: function getComponent() {
				return this.component_;
			}

			/**
    * Handles a `dataManagerCreated` event from the component. Listens to events
    * on the manager that has been created.
    * @protected
    */

		}, {
			key: 'handleDataManagerCreated_',
			value: function handleDataManagerCreated_() {
				var manager = this.component_.getDataManager();
				if (this.component_.constructor.SYNC_UPDATES_MERGED) {
					this.componentRendererEvents_.add(manager.on('dataPropChanged', this.handleManagerDataPropChanged_.bind(this)));
				} else {
					this.componentRendererEvents_.add(manager.on('dataChanged', this.handleManagerDataChanged_.bind(this)));
				}
			}

			/**
    * Handles a `dataChanged` event from the component's data manager. Calls the
    * `update` function if the component has already been rendered for the first
    * time.
    * @param {!Object<string, Object>} changes Object containing the names
    *     of all changed state keys, each mapped to an object with its new
    *     (newVal) and previous (prevVal) values.
    * @protected
    */

		}, {
			key: 'handleManagerDataChanged_',
			value: function handleManagerDataChanged_(changes) {
				if (this.shouldRerender_()) {
					this.update(changes);
				}
			}

			/**
    * Handles a `dataPropChanged` event from the component's data manager. This
    * is similar to `handleManagerDataChanged_`, but only called for
    * components that have requested updates to happen synchronously.
    * @param {!{key: string, newVal: *, prevVal: *}} data
    * @protected
    */

		}, {
			key: 'handleManagerDataPropChanged_',
			value: function handleManagerDataPropChanged_(data) {
				if (this.shouldRerender_()) {
					this.update({
						changes: babelHelpers.defineProperty({}, data.key, data)
					});
				}
			}

			/**
    * Handles the "rendered" event.
    * @protected
    */

		}, {
			key: 'handleRendered_',
			value: function handleRendered_() {
				this.isRendered_ = true;
			}

			/**
    * Renders the component's whole content (including its main element).
    */

		}, {
			key: 'render',
			value: function render() {
				if (!this.component_.element) {
					this.component_.element = document.createElement('div');
				}
				this.emit('rendered', !this.isRendered_);
			}

			/**
    * Checks if changes should cause a rerender right now.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'shouldRerender_',
			value: function shouldRerender_() {
				return this.isRendered_ && !this.skipUpdates_;
			}

			/**
    * Skips updates until `stopSkipUpdates` is called.
    */

		}, {
			key: 'startSkipUpdates',
			value: function startSkipUpdates() {
				this.skipUpdates_ = true;
			}

			/**
    * Stops skipping updates.
    */

		}, {
			key: 'stopSkipUpdates',
			value: function stopSkipUpdates() {
				this.skipUpdates_ = false;
			}

			/**
    * Updates the component's element html. This is automatically called when
    * the value of at least one of the component's state keys has changed.
    * @param {Object.<string, Object>} changes Object containing the names
    *     of all changed state keys, each mapped to an object with its new
    *     (newVal) and previous (prevVal) values.
    */

		}, {
			key: 'update',
			value: function update() {}
		}]);
		return ComponentRenderer;
	}(EventEmitter);

	this['metal']['ComponentRenderer'] = ComponentRenderer;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var getFunctionName = this['metalNamed']['metal']['getFunctionName'];
	var isBoolean = this['metalNamed']['metal']['isBoolean'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isElement = this['metalNamed']['metal']['isElement'];
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var mergeSuperClassesProperty = this['metalNamed']['metal']['mergeSuperClassesProperty'];
	var object = this['metalNamed']['metal']['object'];
	var DomEventEmitterProxy = this['metalNamed']['dom']['DomEventEmitterProxy'];
	var toElement = this['metalNamed']['dom']['toElement'];
	var ComponentDataManager = this['metal']['ComponentDataManager'];
	var ComponentRenderer = this['metal']['ComponentRenderer'];
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];

	/**
  * Component collects common behaviors to be followed by UI components, such
  * as Lifecycle, CSS classes management, events encapsulation and support for
  * different types of rendering.
  * Rendering logic can be done by either:
  *     - Listening to the `render` event inside the `created` lifecycle function
  *       and adding the rendering logic to the listener.
  *     - Using an existing implementation of `ComponentRenderer` like `Soy`,
  *       and following its patterns.
  *     - Building your own implementation of a `ComponentRenderer`.
  * Specifying the renderer that will be used can be done by setting the RENDERER
  * static variable to the renderer's constructor function.
  *
  * Example:
  *
  * <code>
  * class CustomComponent extends Component {
  *   constructor(config) {
  *     super(config);
  *   }
  *
  *   created() {
  *   }
  *
  *   rendered() {
  *   }
  *
  *   attached() {
  *   }
  *
  *   detached() {
  *   }
  * }
  *
  * CustomComponent.RENDERER = MyRenderer;
  *
  * CustomComponent.STATE = {
  *   title: { value: 'Title' },
  *   fontSize: { value: '10px' }
  * };
  * </code>
  *
  * @extends {State}
  */

	var Component = function (_EventEmitter) {
		babelHelpers.inherits(Component, _EventEmitter);

		/**
   * Constructor function for `Component`.
   * @param {Object=} opt_config An object with the initial values for this
   *     component's state.
   * @param {boolean|string|Element=} opt_parentElement The element where the
   *     component should be rendered. Can be given as a selector or an element.
   *     If `false` is passed, the component won't be rendered automatically
   *     after created.
   * @constructor
   */
		function Component(opt_config, opt_parentElement) {
			babelHelpers.classCallCheck(this, Component);

			/**
    * All listeners that were attached until the `DomEventEmitterProxy` instance
    * was created.
    * @type {!Object<string, bool>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

			_this.attachedListeners_ = {};

			/**
    * Gets all nested components.
    * @type {!Array<!Component>}
    */
			_this.components = {};

			/**
    * Instance of `DomEventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {DomEventEmitterProxy}
    * @protected
    */
			_this.elementEventProxy_ = null;

			/**
    * The `EventHandler` instance for events attached from the `events` state key.
    * @type {!EventHandler}
    * @protected
    */
			_this.eventsStateKeyHandler_ = new EventHandler();

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

			mergeSuperClassesProperty(_this.constructor, 'ELEMENT_CLASSES', _this.mergeElementClasses_);
			mergeSuperClassesProperty(_this.constructor, 'SYNC_UPDATES', array.firstDefinedValue);

			_this.element = _this.initialConfig_.element;

			_this.renderer_ = _this.createRenderer();
			_this.renderer_.on('rendered', _this.handleRendererRendered_.bind(_this));

			_this.dataManager_ = _this.createDataManager();
			_this.emit('dataManagerCreated');

			_this.on('stateChanged', _this.handleStateChanged_);
			_this.newListenerHandle_ = _this.on('newListener', _this.handleNewListener_);
			_this.on('eventsChanged', _this.onEventsChanged_);
			_this.addListenersFromObj_(_this.dataManager_.get('events'));

			_this.created();
			_this.componentCreated_ = true;
			if (opt_parentElement !== false) {
				_this.render_(opt_parentElement);
			}
			_this.on('elementChanged', _this.onElementChanged_);
			return _this;
		}

		/**
   * Getter logic for the element property.
   * @return {Element}
   */


		babelHelpers.createClass(Component, [{
			key: 'addListenersFromObj_',


			/**
    * Adds the listeners specified in the given object.
    * @param {Object} events
    * @protected
    */
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
						this.eventsStateKeyHandler_.add(handler);
					}
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
    *     to be rendered before an existing element in the DOM.
    * @protected
    * @chainable
    */

		}, {
			key: 'attach',
			value: function attach(opt_parentElement, opt_siblingElement) {
				if (!this.inDocument) {
					this.renderElement_(opt_parentElement, opt_siblingElement);
					this.inDocument = true;
					this.emit('attached', {
						parent: opt_parentElement,
						sibling: opt_siblingElement
					});
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
    * Adds the given sub component, replacing any existing one with the same ref.
    * @param {string} ref
    * @param {!Component} component
    */

		}, {
			key: 'addSubComponent',
			value: function addSubComponent(ref, component) {
				this.components[ref] = component;
			}

			/**
    * Lifecycle. This is called when the component has just been created, before
    * it's rendered.
    */

		}, {
			key: 'created',
			value: function created() {}

			/**
    * Creates the data manager for this component. Sub classes can override this
    * to return a custom manager as needed.
    * @return {!ComponentDataManager}
    */

		}, {
			key: 'createDataManager',
			value: function createDataManager() {
				mergeSuperClassesProperty(this.constructor, 'DATA_MANAGER', array.firstDefinedValue);
				return new this.constructor.DATA_MANAGER_MERGED(this, Component.DATA);
			}

			/**
    * Creates the renderer for this component. Sub classes can override this to
    * return a custom renderer as needed.
    * @return {!ComponentRenderer}
    */

		}, {
			key: 'createRenderer',
			value: function createRenderer() {
				mergeSuperClassesProperty(this.constructor, 'RENDERER', array.firstDefinedValue);
				return new this.constructor.RENDERER_MERGED(this);
			}

			/**
    * Listens to a delegate event on the component's element.
    * @param {string} eventName The name of the event to listen to.
    * @param {string} selector The selector that matches the child elements that
    *   the event should be triggered for.
    * @param {!function(!Object)} callback Function to be called when the event is
    *   triggered. It will receive the normalized event object.
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'delegate',
			value: function delegate(eventName, selector, callback) {
				return this.on('delegate:' + eventName + ':' + selector, callback);
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
					if (this.element && this.element.parentNode) {
						this.element.parentNode.removeChild(this.element);
					}
					this.inDocument = false;
					this.detached();
				}
				this.emit('detached');
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
    * Lifecycle. Called when the component is disposed. Should be overridden by
    * sub classes to dispose of any internal data or events.
    */

		}, {
			key: 'disposed',
			value: function disposed() {}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.disposed();

				this.detach();

				if (this.elementEventProxy_) {
					this.elementEventProxy_.dispose();
					this.elementEventProxy_ = null;
				}

				this.disposeSubComponents(Object.keys(this.components));
				this.components = null;

				this.dataManager_.dispose();
				this.dataManager_ = null;

				this.renderer_.dispose();
				this.renderer_ = null;

				babelHelpers.get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Calls `dispose` on all subcomponents.
    * @param {!Array<string>} keys
    */

		}, {
			key: 'disposeSubComponents',
			value: function disposeSubComponents(keys) {
				for (var i = 0; i < keys.length; i++) {
					var component = this.components[keys[i]];
					if (component && !component.isDisposed()) {
						component.element = null;
						component.dispose();
						delete this.components[keys[i]];
					}
				}
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
				if (isObject(value) && !isFunction(value)) {
					info.selector = value.selector;
					info.fn = value.fn;
				}
				if (isString(info.fn)) {
					info.fn = this.getListenerFn(info.fn);
				}
				return info;
			}

			/**
    * Gets the `ComponentDataManager` instance being used.
    * @return {!ComponentDataManager}
    */

		}, {
			key: 'getDataManager',
			value: function getDataManager() {
				return this.dataManager_;
			}

			/**
    * Gets the configuration object that was passed to this component's constructor.
    * @return {!Object}
    */

		}, {
			key: 'getInitialConfig',
			value: function getInitialConfig() {
				return this.initialConfig_;
			}

			/**
    * Gets the listener function from its name. If the name is prefixed with a
    * component id, the function will be called on that specified component. Otherwise
    * it will be called on this component instead.
    * @param {string} fnName
    * @return {function()}
    */

		}, {
			key: 'getListenerFn',
			value: function getListenerFn(fnName) {
				if (isFunction(this[fnName])) {
					return this[fnName].bind(this);
				} else {
					console.error('No function named "' + fnName + '" was found in the ' + 'component "' + getFunctionName(this.constructor) + '". Make ' + 'sure that you specify valid function names when adding inline listeners.');
				}
			}

			/**
    * Gets state data for this component.
    * @return {!Object}
    */

		}, {
			key: 'getState',
			value: function getState() {
				return this.dataManager_.getState();
			}

			/**
    * Gets the keys for the state data.
    * @return {!Array<string>}
    */

		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.dataManager_.getStateKeys();
			}

			/**
    * Calls the synchronization function for the state key.
    * @param {string} key
    * @param {Object.<string, Object>=} opt_change Object containing newVal and
    *     prevVal keys.
    * @protected
    */

		}, {
			key: 'fireStateKeyChange_',
			value: function fireStateKeyChange_(key, opt_change) {
				var fn = this['sync' + key.charAt(0).toUpperCase() + key.slice(1)];
				if (isFunction(fn)) {
					if (!opt_change) {
						var manager = this.getDataManager();
						opt_change = {
							newVal: manager.get(key),
							prevVal: undefined
						};
					}
					fn.call(this, opt_change.newVal, opt_change.prevVal);
				}
			}

			/**
    * Gets the `ComponentRenderer` instance being used.
    * @return {!ComponentRenderer}
    */

		}, {
			key: 'getRenderer',
			value: function getRenderer() {
				return this.renderer_;
			}

			/**
    * Handles a `rendered` event from the current renderer instance.
    * @param {!Object}
    * @protected
    */

		}, {
			key: 'handleRendererRendered_',
			value: function handleRendererRendered_(data) {
				this.rendered(data);
				this.emit('rendered', data);
			}

			/**
    * Handles state batch changes. Calls any existing `sync` functions that
    * match the changed state keys.
    * @param {Event} event
    * @protected
    */

		}, {
			key: 'handleStateChanged_',
			value: function handleStateChanged_(event) {
				this.syncStateFromChanges_(event.changes);
				this.emit('stateSynced', event);
			}

			/**
    * Handles the `newListener` event. Just flags that this event type has been
    * attached, so we can start proxying it when `DomEventEmitterProxy` is created.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'handleNewListener_',
			value: function handleNewListener_(event) {
				this.attachedListeners_[event] = true;
			}

			/**
    * Checks if the given function is a component constructor.
    * @param {!function()} fn Any function
    * @return {boolean}
    */

		}, {
			key: 'mergeElementClasses_',


			/**
    * Merges an array of values for the ELEMENT_CLASSES property into a single object.
    * @param {!Array.<string>} values The values to be merged.
    * @return {!string} The merged value.
    * @protected
    */
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
    * Fired when the `element` state value is changed.
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'onElementChanged_',
			value: function onElementChanged_(event) {
				this.setUpProxy_();
				this.elementEventProxy_.setOriginEmitter(event.newVal);
				if (event.newVal) {
					this.syncVisible(this.dataManager_.get('visible'));
				}
			}

			/**
    * Fired when the `events` state value is changed.
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'onEventsChanged_',
			value: function onEventsChanged_(event) {
				this.eventsStateKeyHandler_.removeAllListeners();
				this.addListenersFromObj_(event.newVal);
			}

			/**
    * Creates and renders a component for the given constructor function. This
    * will always make sure that the constructor runs without rendering the
    * component, having the `render` step happen only after it has finished.
    * @param {!function()} Ctor The component's constructor function.
    * @param {Object|Element=} opt_configOrElement Optional config data or parent
    *     for the component.
    * @param {Element=} opt_element Optional parent for the component.
    * @return {!Component} The rendered component's instance.
    */

		}, {
			key: 'render_',


			/**
    * Lifecycle. Renders the component into the DOM.
    *
    * Render Lifecycle:
    *   render event - The "render" event is emitted. Renderers act on this step.
    *   state synchronization - All synchronization methods are called.
    *   attach - Attach Lifecycle is called.
    *
    * @param {(string|Element|boolean)=} opt_parentElement Optional parent element
    *     to render the component. If set to `false`, the element won't be
    *     attached to any element after rendering. In this case, `attach` should
    *     be called manually later to actually attach it to the dom.
    * @param {boolean=} opt_skipRender Optional flag indicating that the actual
    *     rendering should be skipped. Only the other render lifecycle logic will
    *     be run, like syncing state and attaching the element. Should only
    *     be set if the component has already been rendered, like sub components.
    * @protected
    */
			value: function render_(opt_parentElement, opt_skipRender) {
				if (!opt_skipRender) {
					this.emit('render');
				}
				this.setUpProxy_();
				this.syncState_();
				this.attach(opt_parentElement);
				this.wasRendered = true;
			}

			/**
    * Renders this component as a subcomponent, meaning that no actual rendering is
    * needed since it was already rendered by the parent component. This just handles
    * other logics from the rendering lifecycle, like calling sync methods for the
    * state.
    */

		}, {
			key: 'renderAsSubComponent',
			value: function renderAsSubComponent() {
				this.render_(null, true);
			}

			/**
    * Renders the component element into the DOM.
    * @param {(string|Element)=} opt_parentElement Optional parent element
    *     to render the component.
    * @param {(string|Element)=} opt_siblingElement Optional sibling element
    *     to render the component before it. Relevant when the component needs
    *     to be rendered before an existing element in the DOM, e.g.
    *     `component.attach(null, existingElement)`.
    * @protected
    */

		}, {
			key: 'renderElement_',
			value: function renderElement_(opt_parentElement, opt_siblingElement) {
				var element = this.element;
				if (element && (opt_siblingElement || !element.parentNode)) {
					var parent = toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
					parent.insertBefore(element, toElement(opt_siblingElement));
				}
			}

			/**
    * Setter logic for the element property.
    * @param {?string|Element} val
    */

		}, {
			key: 'setState',


			/**
    * Sets the value of all the specified state keys.
    * @param {!Object.<string,*>} values A map of state keys to the values they
    *   should be set to.
    * @param {function()=} opt_callback An optional function that will be run
    *   after the next batched update is triggered.
    */
			value: function setState(state, opt_callback) {
				this.dataManager_.setState(state, opt_callback);
			}

			/**
    * Setter for the `elementClasses` data property. Appends given value with
    * the one specified in `ELEMENT_CLASSES`.
    * @param {string} val
    * @return {string}
    * @protected
    */

		}, {
			key: 'setterElementClassesFn_',
			value: function setterElementClassesFn_(val) {
				if (this.constructor.ELEMENT_CLASSES_MERGED) {
					val += ' ' + this.constructor.ELEMENT_CLASSES_MERGED;
				}
				return val.trim();
			}

			/**
    * Creates the `DomEventEmitterProxy` instance and has it start proxying any
    * listeners that have already been listened to.
    * @protected
    */

		}, {
			key: 'setUpProxy_',
			value: function setUpProxy_() {
				if (this.elementEventProxy_) {
					return;
				}

				var proxy = new DomEventEmitterProxy(this.element, this);
				this.elementEventProxy_ = proxy;

				object.map(this.attachedListeners_, proxy.proxyEvent.bind(proxy));
				this.attachedListeners_ = null;

				this.newListenerHandle_.removeListener();
				this.newListenerHandle_ = null;
			}

			/**
    * Fires state synchronization functions.
    * @protected
    */

		}, {
			key: 'syncState_',
			value: function syncState_() {
				var keys = this.dataManager_.getSyncKeys();
				for (var i = 0; i < keys.length; i++) {
					this.fireStateKeyChange_(keys[i]);
				}
			}

			/**
    * Fires synchronization changes for state keys.
    * @param {Object.<string, Object>} changes Object containing the state key
    *     name as key and an object with newVal and prevVal as value.
    * @protected
    */

		}, {
			key: 'syncStateFromChanges_',
			value: function syncStateFromChanges_(changes) {
				for (var key in changes) {
					this.fireStateKeyChange_(key, changes[key]);
				}
			}

			/**
    * State synchronization logic for `visible` state key.
    * Updates the element's display value according to its visibility.
    * @param {boolean} newVal
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(newVal) {
				if (this.element) {
					this.element.style.display = newVal ? '' : 'none';
				}
			}

			/**
    * Lifecycle. Called whenever the component has just been rendered.
    * @param {boolean} firstRender Flag indicating if this was the component's
    *     first render.
    */

		}, {
			key: 'rendered',
			value: function rendered() {}

			/**
    * Validator logic for the `events` state key.
    * @param {Object} val
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'validatorEventsFn_',
			value: function validatorEventsFn_(val) {
				return !isDefAndNotNull(val) || isObject(val);
			}
		}, {
			key: 'element',
			get: function get() {
				return this.elementVal_;
			},
			set: function set(val) {
				if (!isElement(val) && !isString(val) && isDefAndNotNull(val)) {
					return;
				}

				if (val) {
					val = toElement(val) || this.elementVal_;
				}

				if (this.elementVal_ !== val) {
					var prev = this.elementVal_;
					this.elementVal_ = val;
					if (this.componentCreated_) {
						this.emit('elementChanged', {
							prevVal: prev,
							newVal: val
						});
					}
				}
			}
		}], [{
			key: 'isComponentCtor',
			value: function isComponentCtor(fn) {
				return fn.prototype && fn.prototype[Component.COMPONENT_FLAG];
			}
		}, {
			key: 'render',
			value: function render(Ctor, opt_configOrElement, opt_element) {
				var config = opt_configOrElement;
				var element = opt_element;
				if (isElement(opt_configOrElement)) {
					config = null;
					element = opt_configOrElement;
				}
				var instance = new Ctor(config, false);
				instance.render_(element);
				return instance;
			}
		}]);
		return Component;
	}(EventEmitter);

	/**
  * Component data definition.
  * @type {Object}
  * @static
  */


	Component.DATA = {
		/**
   * CSS classes to be applied to the element.
   * @type {string}
   */
		elementClasses: {
			setter: 'setterElementClassesFn_',
			validator: isString,
			value: ''
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
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: isBoolean,
			value: true
		}
	};

	Component.COMPONENT_FLAG = '__metal_component__';

	/**
  * The `ComponentDataManager` class that should be used. This class will be
  * responsible for handling the component's data. Each component may have its
  * own implementation.
  */
	Component.DATA_MANAGER = ComponentDataManager;

	/**
  * CSS classes to be applied to the element.
  * @type {string}
  * @protected
  * @static
  */
	Component.ELEMENT_CLASSES = '';

	/**
  * The `ComponentRenderer` that should be used. Components need to set this
  * to a subclass of `ComponentRenderer` that has the rendering logic, like
  * `SoyRenderer`.
  * @type {!ComponentRenderer}
  * @static
  */
	Component.RENDERER = ComponentRenderer;

	/**
  * Flag indicating if component updates will happen synchronously. Updates are
  * done asynchronously by default, which allows changes to be batched and
  * applied together.
  * @type {boolean}
  */
	Component.SYNC_UPDATES = false;

	/**
  * Sets a prototype flag to easily determine if a given constructor is for
  * a component or not.
  */
	Component.prototype[Component.COMPONENT_FLAG] = true;

	this['metal']['Component'] = Component;
}).call(this);
'use strict';

(function () {
	var getFunctionName = this['metalNamed']['metal']['getFunctionName'];

	/**
  * The component registry is used to register components, so they can
  * be accessible by name.
  * @type {Object}
  */

	var ComponentRegistry = function () {
		function ComponentRegistry() {
			babelHelpers.classCallCheck(this, ComponentRegistry);
		}

		babelHelpers.createClass(ComponentRegistry, null, [{
			key: 'getConstructor',

			/**
    * Gets the constructor function for the given component name, or
    * undefined if it hasn't been registered yet.
    * @param {string} name The component's name.
    * @return {?function()}
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
    * Registers a component, so it can be found by its name.
    * @param {!Function} constructorFn The component's constructor function.
    * @param {string=} opt_name Name of the registered component. If none is given
    *   the name defined by the NAME static variable will be used instead. If that
    *   isn't set as well, the name of the constructor function will be used.
    * @static
    */

		}, {
			key: 'register',
			value: function register(constructorFn, opt_name) {
				var name = opt_name;
				if (!name) {
					if (constructorFn.hasOwnProperty('NAME')) {
						name = constructorFn.NAME;
					} else {
						name = getFunctionName(constructorFn);
					}
				}
				constructorFn.NAME = name;
				ComponentRegistry.components_[name] = constructorFn;
			}
		}]);
		return ComponentRegistry;
	}();

	/**
  * Holds all registered components, indexed by their names.
  * @type {!Object<string, function()>}
  * @protected
  * @static
  */


	ComponentRegistry.components_ = {};

	this['metal']['ComponentRegistry'] = ComponentRegistry;
}).call(this);
'use strict';

(function () {
  var Component = this['metal']['Component'];
  var ComponentDataManager = this['metal']['ComponentDataManager'];
  var ComponentRegistry = this['metal']['ComponentRegistry'];
  var ComponentRenderer = this['metal']['ComponentRenderer'];
  this['metal']['component'] = Component;
  this['metalNamed']['component'] = this['metalNamed']['component'] || {};
  this['metalNamed']['component']['Component'] = Component;
  this['metalNamed']['component']['ComponentDataManager'] = ComponentDataManager;
  this['metalNamed']['component']['ComponentRegistry'] = ComponentRegistry;
  this['metalNamed']['component']['ComponentRenderer'] = ComponentRenderer;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */

  /**
   * @license
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  (function (global, factory) {
    factory(global.IncrementalDOM = global.IncrementalDOM || {});
  })(window, function (exports) {
    'use strict';

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * A cached reference to the hasOwnProperty function.
     */

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * A constructor function that will create blank objects.
     * @constructor
     */
    function Blank() {}

    Blank.prototype = Object.create(null);

    /**
     * Used to prevent property collisions between our "map" and its prototype.
     * @param {!Object<string, *>} map The map to check.
     * @param {string} property The property to check.
     * @return {boolean} Whether map has property.
     */
    var has = function has(map, property) {
      return hasOwnProperty.call(map, property);
    };

    /**
     * Creates an map object without a prototype.
     * @return {!Object}
     */
    var createMap = function createMap() {
      return new Blank();
    };

    /**
     * The property name where we store Incremental DOM data.
     */
    var DATA_PROP = '__incrementalDOMData';

    /**
     * Keeps track of information needed to perform diffs for a given DOM node.
     * @param {!string} nodeName
     * @param {?string=} key
     * @constructor
     */
    function NodeData(nodeName, key) {
      /**
       * The attributes and their values.
       * @const {!Object<string, *>}
       */
      this.attrs = createMap();

      /**
       * An array of attribute name/value pairs, used for quickly diffing the
       * incomming attributes to see if the DOM node's attributes need to be
       * updated.
       * @const {Array<*>}
       */
      this.attrsArr = [];

      /**
       * The incoming attributes for this Node, before they are updated.
       * @const {!Object<string, *>}
       */
      this.newAttrs = createMap();

      /**
       * Whether or not the statics have been applied for the node yet.
       * {boolean}
       */
      this.staticsApplied = false;

      /**
       * The key used to identify this node, used to preserve DOM nodes when they
       * move within their parent.
       * @const
       */
      this.key = key;

      /**
       * Keeps track of children within this node by their key.
       * {!Object<string, !Element>}
       */
      this.keyMap = createMap();

      /**
       * Whether or not the keyMap is currently valid.
       * @type {boolean}
       */
      this.keyMapValid = true;

      /**
       * Whether or the associated node is, or contains, a focused Element.
       * @type {boolean}
       */
      this.focused = false;

      /**
       * The node name for this node.
       * @const {string}
       */
      this.nodeName = nodeName;

      /**
       * @type {?string}
       */
      this.text = null;
    }

    /**
     * Initializes a NodeData object for a Node.
     *
     * @param {Node} node The node to initialize data for.
     * @param {string} nodeName The node name of node.
     * @param {?string=} key The key that identifies the node.
     * @return {!NodeData} The newly initialized data object
     */
    var initData = function initData(node, nodeName, key) {
      var data = new NodeData(nodeName, key);
      node[DATA_PROP] = data;
      return data;
    };

    /**
     * Retrieves the NodeData object for a Node, creating it if necessary.
     *
     * @param {?Node} node The Node to retrieve the data for.
     * @return {!NodeData} The NodeData for this Node.
     */
    var getData = function getData(node) {
      importNode(node);
      return node[DATA_PROP];
    };

    /**
     * Imports node and its subtree, initializing caches.
     *
     * @param {?Node} node The Node to import.
     */
    var importNode = function importNode(node) {
      if (node[DATA_PROP]) {
        return;
      }

      var isElement = node instanceof Element;
      var nodeName = isElement ? node.localName : node.nodeName;
      var key = isElement ? node.getAttribute('key') : null;
      var data = initData(node, nodeName, key);

      if (key) {
        getData(node.parentNode).keyMap[key] = node;
      }

      if (isElement) {
        var attributes = node.attributes;
        var attrs = data.attrs;
        var newAttrs = data.newAttrs;
        var attrsArr = data.attrsArr;

        for (var i = 0; i < attributes.length; i += 1) {
          var attr = attributes[i];
          var name = attr.name;
          var value = attr.value;

          attrs[name] = value;
          newAttrs[name] = undefined;
          attrsArr.push(name);
          attrsArr.push(value);
        }
      }

      for (var child = node.firstChild; child; child = child.nextSibling) {
        importNode(child);
      }
    };

    /**
     * Gets the namespace to create an element (of a given tag) in.
     * @param {string} tag The tag to get the namespace for.
     * @param {?Node} parent
     * @return {?string} The namespace to create the tag in.
     */
    var getNamespaceForTag = function getNamespaceForTag(tag, parent) {
      if (tag === 'svg') {
        return 'http://www.w3.org/2000/svg';
      }

      if (getData(parent).nodeName === 'foreignObject') {
        return null;
      }

      return parent.namespaceURI;
    };

    /**
     * Creates an Element.
     * @param {Document} doc The document with which to create the Element.
     * @param {?Node} parent
     * @param {string} tag The tag for the Element.
     * @param {?string=} key A key to identify the Element.
     * @return {!Element}
     */
    var createElement = function createElement(doc, parent, tag, key) {
      var namespace = getNamespaceForTag(tag, parent);
      var el = undefined;

      if (namespace) {
        el = doc.createElementNS(namespace, tag);
      } else {
        el = doc.createElement(tag);
      }

      initData(el, tag, key);

      return el;
    };

    /**
     * Creates a Text Node.
     * @param {Document} doc The document with which to create the Element.
     * @return {!Text}
     */
    var createText = function createText(doc) {
      var node = doc.createTextNode('');
      initData(node, '#text', null);
      return node;
    };

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @const */
    var notifications = {
      /**
       * Called after patch has compleated with any Nodes that have been created
       * and added to the DOM.
       * @type {?function(Array<!Node>)}
       */
      nodesCreated: null,

      /**
       * Called after patch has compleated with any Nodes that have been removed
       * from the DOM.
       * Note it's an applications responsibility to handle any childNodes.
       * @type {?function(Array<!Node>)}
       */
      nodesDeleted: null
    };

    /**
     * Keeps track of the state of a patch.
     * @constructor
     */
    function Context() {
      /**
       * @type {(Array<!Node>|undefined)}
       */
      this.created = notifications.nodesCreated && [];

      /**
       * @type {(Array<!Node>|undefined)}
       */
      this.deleted = notifications.nodesDeleted && [];
    }

    /**
     * @param {!Node} node
     */
    Context.prototype.markCreated = function (node) {
      if (this.created) {
        this.created.push(node);
      }
    };

    /**
     * @param {!Node} node
     */
    Context.prototype.markDeleted = function (node) {
      if (this.deleted) {
        this.deleted.push(node);
      }
    };

    /**
     * Notifies about nodes that were created during the patch opearation.
     */
    Context.prototype.notifyChanges = function () {
      if (this.created && this.created.length > 0) {
        notifications.nodesCreated(this.created);
      }

      if (this.deleted && this.deleted.length > 0) {
        notifications.nodesDeleted(this.deleted);
      }
    };

    /**
     * Copyright 2016 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @param {!Node} node
     * @return {boolean} True if the node the root of a document, false otherwise.
     */
    var isDocumentRoot = function isDocumentRoot(node) {
      // For ShadowRoots, check if they are a DocumentFragment instead of if they
      // are a ShadowRoot so that this can work in 'use strict' if ShadowRoots are
      // not supported.
      return node instanceof Document || node instanceof DocumentFragment;
    };

    /**
     * @param {!Node} node The node to start at, inclusive.
     * @param {?Node} root The root ancestor to get until, exclusive.
     * @return {!Array<!Node>} The ancestry of DOM nodes.
     */
    var getAncestry = function getAncestry(node, root) {
      var ancestry = [];
      var cur = node;

      while (cur !== root) {
        ancestry.push(cur);
        cur = cur.parentNode;
      }

      return ancestry;
    };

    /**
     * @param {!Node} node
     * @return {!Node} The root node of the DOM tree that contains node.
     */
    var getRoot = function getRoot(node) {
      var cur = node;
      var prev = cur;

      while (cur) {
        prev = cur;
        cur = cur.parentNode;
      }

      return prev;
    };

    /**
     * @param {!Node} node The node to get the activeElement for.
     * @return {?Element} The activeElement in the Document or ShadowRoot
     *     corresponding to node, if present.
     */
    var getActiveElement = function getActiveElement(node) {
      var root = getRoot(node);
      return isDocumentRoot(root) ? root.activeElement : null;
    };

    /**
     * Gets the path of nodes that contain the focused node in the same document as
     * a reference node, up until the root.
     * @param {!Node} node The reference node to get the activeElement for.
     * @param {?Node} root The root to get the focused path until.
     * @return {!Array<Node>}
     */
    var getFocusedPath = function getFocusedPath(node, root) {
      var activeElement = getActiveElement(node);

      if (!activeElement || !node.contains(activeElement)) {
        return [];
      }

      return getAncestry(activeElement, root);
    };

    /**
     * Like insertBefore, but instead instead of moving the desired node, instead
     * moves all the other nodes after.
     * @param {?Node} parentNode
     * @param {!Node} node
     * @param {?Node} referenceNode
     */
    var moveBefore = function moveBefore(parentNode, node, referenceNode) {
      var insertReferenceNode = node.nextSibling;
      var cur = referenceNode;

      while (cur !== node) {
        var next = cur.nextSibling;
        parentNode.insertBefore(cur, insertReferenceNode);
        cur = next;
      }
    };

    /** @type {?Context} */
    var context = null;

    /** @type {?Node} */
    var currentNode = null;

    /** @type {?Node} */
    var currentParent = null;

    /** @type {?Document} */
    var doc = null;

    /**
     * @param {!Array<Node>} focusPath The nodes to mark.
     * @param {boolean} focused Whether or not they are focused.
     */
    var markFocused = function markFocused(focusPath, focused) {
      for (var i = 0; i < focusPath.length; i += 1) {
        getData(focusPath[i]).focused = focused;
      }
    };

    /**
     * Returns a patcher function that sets up and restores a patch context,
     * running the run function with the provided data.
     * @param {function((!Element|!DocumentFragment),!function(T),T=): ?Node} run
     * @return {function((!Element|!DocumentFragment),!function(T),T=): ?Node}
     * @template T
     */
    var patchFactory = function patchFactory(run) {
      /**
       * TODO(moz): These annotations won't be necessary once we switch to Closure
       * Compiler's new type inference. Remove these once the switch is done.
       *
       * @param {(!Element|!DocumentFragment)} node
       * @param {!function(T)} fn
       * @param {T=} data
       * @return {?Node} node
       * @template T
       */
      var f = function f(node, fn, data) {
        var prevContext = context;
        var prevDoc = doc;
        var prevCurrentNode = currentNode;
        var prevCurrentParent = currentParent;
        var previousInAttributes = false;
        var previousInSkip = false;

        context = new Context();
        doc = node.ownerDocument;
        currentParent = node.parentNode;

        if ('production' !== 'production') {}

        var focusPath = getFocusedPath(node, currentParent);
        markFocused(focusPath, true);
        var retVal = run(node, fn, data);
        markFocused(focusPath, false);

        if ('production' !== 'production') {}

        context.notifyChanges();

        context = prevContext;
        doc = prevDoc;
        currentNode = prevCurrentNode;
        currentParent = prevCurrentParent;

        return retVal;
      };
      return f;
    };

    /**
     * Patches the document starting at node with the provided function. This
     * function may be called during an existing patch operation.
     * @param {!Element|!DocumentFragment} node The Element or Document
     *     to patch.
     * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
     *     calls that describe the DOM.
     * @param {T=} data An argument passed to fn to represent DOM state.
     * @return {!Node} The patched node.
     * @template T
     */
    var patchInner = patchFactory(function (node, fn, data) {
      currentNode = node;

      enterNode();
      fn(data);
      exitNode();

      if ('production' !== 'production') {}

      return node;
    });

    /**
     * Patches an Element with the the provided function. Exactly one top level
     * element call should be made corresponding to `node`.
     * @param {!Element} node The Element where the patch should start.
     * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
     *     calls that describe the DOM. This should have at most one top level
     *     element call.
     * @param {T=} data An argument passed to fn to represent DOM state.
     * @return {?Node} The node if it was updated, its replacedment or null if it
     *     was removed.
     * @template T
     */
    var patchOuter = patchFactory(function (node, fn, data) {
      var startNode = /** @type {!Element} */{ nextSibling: node };
      var expectedNextNode = null;
      var expectedPrevNode = null;

      if ('production' !== 'production') {}

      currentNode = startNode;
      fn(data);

      if ('production' !== 'production') {}

      if (node !== currentNode && node.parentNode) {
        removeChild(currentParent, node, getData(currentParent).keyMap);
      }

      return startNode === currentNode ? null : currentNode;
    });

    /**
     * Checks whether or not the current node matches the specified nodeName and
     * key.
     *
     * @param {!Node} matchNode A node to match the data to.
     * @param {?string} nodeName The nodeName for this node.
     * @param {?string=} key An optional key that identifies a node.
     * @return {boolean} True if the node matches, false otherwise.
     */
    var matches = function matches(matchNode, nodeName, key) {
      var data = getData(matchNode);

      // Key check is done using double equals as we want to treat a null key the
      // same as undefined. This should be okay as the only values allowed are
      // strings, null and undefined so the == semantics are not too weird.
      return nodeName === data.nodeName && key == data.key;
    };

    /**
     * Aligns the virtual Element definition with the actual DOM, moving the
     * corresponding DOM node to the correct location or creating it if necessary.
     * @param {string} nodeName For an Element, this should be a valid tag string.
     *     For a Text, this should be #text.
     * @param {?string=} key The key used to identify this element.
     */
    var alignWithDOM = function alignWithDOM(nodeName, key) {
      if (currentNode && matches(currentNode, nodeName, key)) {
        return;
      }

      var parentData = getData(currentParent);
      var currentNodeData = currentNode && getData(currentNode);
      var keyMap = parentData.keyMap;
      var node = undefined;

      // Check to see if the node has moved within the parent.
      if (key) {
        var keyNode = keyMap[key];
        if (keyNode) {
          if (matches(keyNode, nodeName, key)) {
            node = keyNode;
          } else if (keyNode === currentNode) {
            context.markDeleted(keyNode);
          } else {
            removeChild(currentParent, keyNode, keyMap);
          }
        }
      }

      // Create the node if it doesn't exist.
      if (!node) {
        if (nodeName === '#text') {
          node = createText(doc);
        } else {
          node = createElement(doc, currentParent, nodeName, key);
        }

        if (key) {
          keyMap[key] = node;
        }

        context.markCreated(node);
      }

      // Re-order the node into the right position, preserving focus if either
      // node or currentNode are focused by making sure that they are not detached
      // from the DOM.
      if (getData(node).focused) {
        // Move everything else before the node.
        moveBefore(currentParent, node, currentNode);
      } else if (currentNodeData && currentNodeData.key && !currentNodeData.focused) {
        // Remove the currentNode, which can always be added back since we hold a
        // reference through the keyMap. This prevents a large number of moves when
        // a keyed item is removed or moved backwards in the DOM.
        currentParent.replaceChild(node, currentNode);
        parentData.keyMapValid = false;
      } else {
        currentParent.insertBefore(node, currentNode);
      }

      currentNode = node;
    };

    /**
     * @param {?Node} node
     * @param {?Node} child
     * @param {?Object<string, !Element>} keyMap
     */
    var removeChild = function removeChild(node, child, keyMap) {
      node.removeChild(child);
      context.markDeleted( /** @type {!Node}*/child);

      var key = getData(child).key;
      if (key) {
        delete keyMap[key];
      }
    };

    /**
     * Clears out any unvisited Nodes, as the corresponding virtual element
     * functions were never called for them.
     */
    var clearUnvisitedDOM = function clearUnvisitedDOM() {
      var node = currentParent;
      var data = getData(node);
      var keyMap = data.keyMap;
      var keyMapValid = data.keyMapValid;
      var child = node.lastChild;
      var key = undefined;

      if (child === currentNode && keyMapValid) {
        return;
      }

      while (child !== currentNode) {
        removeChild(node, child, keyMap);
        child = node.lastChild;
      }

      // Clean the keyMap, removing any unusued keys.
      if (!keyMapValid) {
        for (key in keyMap) {
          child = keyMap[key];
          if (child.parentNode !== node) {
            context.markDeleted(child);
            delete keyMap[key];
          }
        }

        data.keyMapValid = true;
      }
    };

    /**
     * Changes to the first child of the current node.
     */
    var enterNode = function enterNode() {
      currentParent = currentNode;
      currentNode = null;
    };

    /**
     * @return {?Node} The next Node to be patched.
     */
    var getNextNode = function getNextNode() {
      if (currentNode) {
        return currentNode.nextSibling;
      } else {
        return currentParent.firstChild;
      }
    };

    /**
     * Changes to the next sibling of the current node.
     */
    var nextNode = function nextNode() {
      currentNode = getNextNode();
    };

    /**
     * Changes to the parent of the current node, removing any unvisited children.
     */
    var exitNode = function exitNode() {
      clearUnvisitedDOM();

      currentNode = currentParent;
      currentParent = currentParent.parentNode;
    };

    /**
     * Makes sure that the current node is an Element with a matching tagName and
     * key.
     *
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @return {!Element} The corresponding Element.
     */
    var coreElementOpen = function coreElementOpen(tag, key) {
      nextNode();
      alignWithDOM(tag, key);
      enterNode();
      return (/** @type {!Element} */currentParent
      );
    };

    /**
     * Closes the currently open Element, removing any unvisited children if
     * necessary.
     *
     * @return {!Element} The corresponding Element.
     */
    var coreElementClose = function coreElementClose() {
      if ('production' !== 'production') {}

      exitNode();
      return (/** @type {!Element} */currentNode
      );
    };

    /**
     * Makes sure the current node is a Text node and creates a Text node if it is
     * not.
     *
     * @return {!Text} The corresponding Text Node.
     */
    var coreText = function coreText() {
      nextNode();
      alignWithDOM('#text', null);
      return (/** @type {!Text} */currentNode
      );
    };

    /**
     * Gets the current Element being patched.
     * @return {!Element}
     */
    var currentElement = function currentElement() {
      if ('production' !== 'production') {}
      return (/** @type {!Element} */currentParent
      );
    };

    /**
     * @return {Node} The Node that will be evaluated for the next instruction.
     */
    var currentPointer = function currentPointer() {
      if ('production' !== 'production') {}
      return getNextNode();
    };

    /**
     * Skips the children in a subtree, allowing an Element to be closed without
     * clearing out the children.
     */
    var skip = function skip() {
      if ('production' !== 'production') {}
      currentNode = currentParent.lastChild;
    };

    /**
     * Skips the next Node to be patched, moving the pointer forward to the next
     * sibling of the current pointer.
     */
    var skipNode = nextNode;

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @const */
    var symbols = {
      default: '__default'
    };

    /**
     * @param {string} name
     * @return {string|undefined} The namespace to use for the attribute.
     */
    var getNamespace = function getNamespace(name) {
      if (name.lastIndexOf('xml:', 0) === 0) {
        return 'http://www.w3.org/XML/1998/namespace';
      }

      if (name.lastIndexOf('xlink:', 0) === 0) {
        return 'http://www.w3.org/1999/xlink';
      }
    };

    /**
     * Applies an attribute or property to a given Element. If the value is null
     * or undefined, it is removed from the Element. Otherwise, the value is set
     * as an attribute.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {?(boolean|number|string)=} value The attribute's value.
     */
    var applyAttr = function applyAttr(el, name, value) {
      if (value == null) {
        el.removeAttribute(name);
      } else {
        var attrNS = getNamespace(name);
        if (attrNS) {
          el.setAttributeNS(attrNS, name, value);
        } else {
          el.setAttribute(name, value);
        }
      }
    };

    /**
     * Applies a property to a given Element.
     * @param {!Element} el
     * @param {string} name The property's name.
     * @param {*} value The property's value.
     */
    var applyProp = function applyProp(el, name, value) {
      el[name] = value;
    };

    /**
     * Applies a value to a style declaration. Supports CSS custom properties by
     * setting properties containing a dash using CSSStyleDeclaration.setProperty.
     * @param {CSSStyleDeclaration} style
     * @param {!string} prop
     * @param {*} value
     */
    var setStyleValue = function setStyleValue(style, prop, value) {
      if (prop.indexOf('-') >= 0) {
        style.setProperty(prop, /** @type {string} */value);
      } else {
        style[prop] = value;
      }
    };

    /**
     * Applies a style to an Element. No vendor prefix expansion is done for
     * property names/values.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} style The style to set. Either a string of css or an object
     *     containing property-value pairs.
     */
    var applyStyle = function applyStyle(el, name, style) {
      if (typeof style === 'string') {
        el.style.cssText = style;
      } else {
        el.style.cssText = '';
        var elStyle = el.style;
        var obj = /** @type {!Object<string,string>} */style;

        for (var prop in obj) {
          if (has(obj, prop)) {
            setStyleValue(elStyle, prop, obj[prop]);
          }
        }
      }
    };

    /**
     * Updates a single attribute on an Element.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} value The attribute's value. If the value is an object or
     *     function it is set on the Element, otherwise, it is set as an HTML
     *     attribute.
     */
    var applyAttributeTyped = function applyAttributeTyped(el, name, value) {
      var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);

      if (type === 'object' || type === 'function') {
        applyProp(el, name, value);
      } else {
        applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
      }
    };

    /**
     * Calls the appropriate attribute mutator for this attribute.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} value The attribute's value.
     */
    var updateAttribute = function updateAttribute(el, name, value) {
      var data = getData(el);
      var attrs = data.attrs;

      if (attrs[name] === value) {
        return;
      }

      var mutator = attributes[name] || attributes[symbols.default];
      mutator(el, name, value);

      attrs[name] = value;
    };

    /**
     * A publicly mutable object to provide custom mutators for attributes.
     * @const {!Object<string, function(!Element, string, *)>}
     */
    var attributes = createMap();

    // Special generic mutator that's called for any attribute that does not
    // have a specific mutator.
    attributes[symbols.default] = applyAttributeTyped;

    attributes['style'] = applyStyle;

    /**
     * The offset in the virtual element declaration where the attributes are
     * specified.
     * @const
     */
    var ATTRIBUTES_OFFSET = 3;

    /**
     * Builds an array of arguments for use with elementOpenStart, attr and
     * elementOpenEnd.
     * @const {Array<*>}
     */
    var argsBuilder = [];

    /**
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     * @param {...*} var_args, Attribute name/value pairs of the dynamic attributes
     *     for the Element.
     * @return {!Element} The corresponding Element.
     */
    var elementOpen = function elementOpen(tag, key, statics, var_args) {
      if ('production' !== 'production') {}

      var node = coreElementOpen(tag, key);
      var data = getData(node);

      if (!data.staticsApplied) {
        if (statics) {
          for (var _i = 0; _i < statics.length; _i += 2) {
            var name = /** @type {string} */statics[_i];
            var value = statics[_i + 1];
            updateAttribute(node, name, value);
          }
        }
        // Down the road, we may want to keep track of the statics array to use it
        // as an additional signal about whether a node matches or not. For now,
        // just use a marker so that we do not reapply statics.
        data.staticsApplied = true;
      }

      /*
       * Checks to see if one or more attributes have changed for a given Element.
       * When no attributes have changed, this is much faster than checking each
       * individual argument. When attributes have changed, the overhead of this is
       * minimal.
       */
      var attrsArr = data.attrsArr;
      var newAttrs = data.newAttrs;
      var isNew = !attrsArr.length;
      var i = ATTRIBUTES_OFFSET;
      var j = 0;

      for (; i < arguments.length; i += 2, j += 2) {
        var _attr = arguments[i];
        if (isNew) {
          attrsArr[j] = _attr;
          newAttrs[_attr] = undefined;
        } else if (attrsArr[j] !== _attr) {
          break;
        }

        var value = arguments[i + 1];
        if (isNew || attrsArr[j + 1] !== value) {
          attrsArr[j + 1] = value;
          updateAttribute(node, _attr, value);
        }
      }

      if (i < arguments.length || j < attrsArr.length) {
        for (; i < arguments.length; i += 1, j += 1) {
          attrsArr[j] = arguments[i];
        }

        if (j < attrsArr.length) {
          attrsArr.length = j;
        }

        /*
         * Actually perform the attribute update.
         */
        for (i = 0; i < attrsArr.length; i += 2) {
          var name = /** @type {string} */attrsArr[i];
          var value = attrsArr[i + 1];
          newAttrs[name] = value;
        }

        for (var _attr2 in newAttrs) {
          updateAttribute(node, _attr2, newAttrs[_attr2]);
          newAttrs[_attr2] = undefined;
        }
      }

      return node;
    };

    /**
     * Declares a virtual Element at the current location in the document. This
     * corresponds to an opening tag and a elementClose tag is required. This is
     * like elementOpen, but the attributes are defined using the attr function
     * rather than being passed as arguments. Must be folllowed by 0 or more calls
     * to attr, then a call to elementOpenEnd.
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     */
    var elementOpenStart = function elementOpenStart(tag, key, statics) {
      if ('production' !== 'production') {}

      argsBuilder[0] = tag;
      argsBuilder[1] = key;
      argsBuilder[2] = statics;
    };

    /***
     * Defines a virtual attribute at this point of the DOM. This is only valid
     * when called between elementOpenStart and elementOpenEnd.
     *
     * @param {string} name
     * @param {*} value
     */
    var attr = function attr(name, value) {
      if ('production' !== 'production') {}

      argsBuilder.push(name);
      argsBuilder.push(value);
    };

    /**
     * Closes an open tag started with elementOpenStart.
     * @return {!Element} The corresponding Element.
     */
    var elementOpenEnd = function elementOpenEnd() {
      if ('production' !== 'production') {}

      var node = elementOpen.apply(null, argsBuilder);
      argsBuilder.length = 0;
      return node;
    };

    /**
     * Closes an open virtual Element.
     *
     * @param {string} tag The element's tag.
     * @return {!Element} The corresponding Element.
     */
    var elementClose = function elementClose(tag) {
      if ('production' !== 'production') {}

      var node = coreElementClose();

      if ('production' !== 'production') {}

      return node;
    };

    /**
     * Declares a virtual Element at the current location in the document that has
     * no children.
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
     *     for the Element.
     * @return {!Element} The corresponding Element.
     */
    var elementVoid = function elementVoid(tag, key, statics, var_args) {
      elementOpen.apply(null, arguments);
      return elementClose(tag);
    };

    /**
     * Declares a virtual Text at this point in the document.
     *
     * @param {string|number|boolean} value The value of the Text.
     * @param {...(function((string|number|boolean)):string)} var_args
     *     Functions to format the value which are called only when the value has
     *     changed.
     * @return {!Text} The corresponding text node.
     */
    var text = function text(value, var_args) {
      if ('production' !== 'production') {}

      var node = coreText();
      var data = getData(node);

      if (data.text !== value) {
        data.text = /** @type {string} */value;

        var formatted = value;
        for (var i = 1; i < arguments.length; i += 1) {
          /*
           * Call the formatter function directly to prevent leaking arguments.
           * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
           */
          var fn = arguments[i];
          formatted = fn(formatted);
        }

        node.data = formatted;
      }

      return node;
    };

    exports.patch = patchInner;
    exports.patchInner = patchInner;
    exports.patchOuter = patchOuter;
    exports.currentElement = currentElement;
    exports.currentPointer = currentPointer;
    exports.skip = skip;
    exports.skipNode = skipNode;
    exports.elementVoid = elementVoid;
    exports.elementOpenStart = elementOpenStart;
    exports.elementOpenEnd = elementOpenEnd;
    exports.elementOpen = elementOpen;
    exports.elementClose = elementClose;
    exports.text = text;
    exports.attr = attr;
    exports.symbols = symbols;
    exports.attributes = attributes;
    exports.applyAttr = applyAttr;
    exports.applyProp = applyProp;
    exports.notifications = notifications;
    exports.importNode = importNode;
  });

  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var object = this['metalNamed']['metal']['object'];

	/**
  * Class responsible for intercepting incremental dom functions through AOP.
  */

	var IncrementalDomAop = function () {
		function IncrementalDomAop() {
			babelHelpers.classCallCheck(this, IncrementalDomAop);
		}

		babelHelpers.createClass(IncrementalDomAop, null, [{
			key: 'getOriginalFns',

			/**
    * Gets the original functions that are intercepted by `IncrementalDomAop`.
    * @return {!Object}
    */
			value: function getOriginalFns() {
				return fnStack[0];
			}

			/**
    * Starts intercepting calls to incremental dom, replacing them with the given
    * functions. Note that `elementVoid`, `elementOpenStart`, `elementOpenEnd`
    * and `attr` are the only ones that can't be intercepted, since they'll
    * automatically be converted into equivalent calls to `elementOpen` and
    * `elementClose`.
    * @param {!Object} fns Functions to be called instead of the original ones
    *     from incremental DOM. Should be given as a map from the function name
    *     to the function that should intercept it. All interceptors will receive
    *     the original function as the first argument, the actual arguments from
    *     from the original call following it.
    */

		}, {
			key: 'startInterception',
			value: function startInterception(fns) {
				var originals = IncrementalDomAop.getOriginalFns();
				fns = object.map(fns, function (name, value) {
					return value.bind(null, originals[name]);
				});
				fnStack.push(object.mixin({}, originals, fns, {
					attr: fnAttr,
					elementOpenEnd: fnOpenEnd,
					elementOpenStart: fnOpenStart,
					elementVoid: fnVoid
				}));
			}

			/**
    * Restores the original `elementOpen` function from incremental dom to the
    * implementation it used before the last call to `startInterception`.
    */

		}, {
			key: 'stopInterception',
			value: function stopInterception() {
				if (fnStack.length > 1) {
					fnStack.pop();
				}
			}
		}]);
		return IncrementalDomAop;
	}();

	var fnStack = [{
		attr: IncrementalDOM.attr,
		attributes: IncrementalDOM.attributes[IncrementalDOM.symbols.default],
		elementClose: IncrementalDOM.elementClose,
		elementOpen: IncrementalDOM.elementOpen,
		elementOpenEnd: IncrementalDOM.elementOpenEnd,
		elementOpenStart: IncrementalDOM.elementOpenStart,
		elementVoid: IncrementalDOM.elementVoid,
		text: IncrementalDOM.text
	}];

	var collectedArgs = [];

	function fnAttr(name, value) {
		collectedArgs.push(name, value);
	}

	function fnOpenStart(tag, key, statics) {
		collectedArgs = [tag, key, statics];
	}

	function fnOpenEnd() {
		return getFn('elementOpen').apply(null, collectedArgs);
	}

	function fnVoid(tag) {
		getFn('elementOpen').apply(null, arguments);
		return getFn('elementClose')(tag);
	}

	function getFn(name) {
		return fnStack[fnStack.length - 1][name];
	}

	function handleCall(name) {
		return getFn(name).apply(null, array.slice(arguments, 1));
	}

	IncrementalDOM.attr = handleCall.bind(null, 'attr');
	IncrementalDOM.elementClose = handleCall.bind(null, 'elementClose');
	IncrementalDOM.elementOpen = handleCall.bind(null, 'elementOpen');
	IncrementalDOM.elementOpenEnd = handleCall.bind(null, 'elementOpenEnd');
	IncrementalDOM.elementOpenStart = handleCall.bind(null, 'elementOpenStart');
	IncrementalDOM.elementVoid = handleCall.bind(null, 'elementVoid');
	IncrementalDOM.text = handleCall.bind(null, 'text');

	IncrementalDOM.attributes[IncrementalDOM.symbols.default] = handleCall.bind(null, 'attributes');

	this['metal']['IncrementalDomAop'] = IncrementalDomAop;
}).call(this);
'use strict';

(function () {
	var isString = this['metalNamed']['metal']['isString'];

	/**
  * Utility functions used to handle incremental dom calls.
  */

	var IncrementalDomUtils = function () {
		function IncrementalDomUtils() {
			babelHelpers.classCallCheck(this, IncrementalDomUtils);
		}

		babelHelpers.createClass(IncrementalDomUtils, null, [{
			key: 'buildConfigFromCall',

			/**
    * Builds the component config object from its incremental dom call's
    * arguments.
    * @param {!Array} args
    * @return {!Object}
    */
			value: function buildConfigFromCall(args) {
				var config = {};
				if (args[1]) {
					config.key = args[1];
				}
				var attrsArr = (args[2] || []).concat(args.slice(3));
				for (var i = 0; i < attrsArr.length; i += 2) {
					config[attrsArr[i]] = attrsArr[i + 1];
				}
				return config;
			}

			/**
    * Builds an incremental dom call array from the given tag and config object.
    * @param {string} tag
    * @param {!Object} config
    * @return {!Array}
    */

		}, {
			key: 'buildCallFromConfig',
			value: function buildCallFromConfig(tag, config) {
				var call = [tag, config.key, []];
				var keys = Object.keys(config);
				for (var i = 0; i < keys.length; i++) {
					if (keys[i] !== 'children') {
						call.push(keys[i], config[keys[i]]);
					}
				}
				return call;
			}

			/**
    * Checks if the given tag represents a metal component.
    * @param {string} tag
    * @return {boolean}
    */

		}, {
			key: 'isComponentTag',
			value: function isComponentTag(tag) {
				return !isString(tag) || tag[0] === tag[0].toUpperCase();
			}
		}]);
		return IncrementalDomUtils;
	}();

	this['metal']['IncrementalDomUtils'] = IncrementalDomUtils;
}).call(this);
'use strict';

(function () {
	var isDef = this['metalNamed']['metal']['isDef'];
	var IncrementalDomAop = this['metal']['IncrementalDomAop'];
	var IncrementalDomUtils = this['metal']['IncrementalDomUtils'];

	/**
  * Provides helpers for capturing children elements from incremental dom calls,
  * as well as actually rendering those captured children via incremental dom
  * later.
  */

	var IncrementalDomChildren = function () {
		function IncrementalDomChildren() {
			babelHelpers.classCallCheck(this, IncrementalDomChildren);
		}

		babelHelpers.createClass(IncrementalDomChildren, null, [{
			key: 'capture',

			/**
    * Captures all child elements from incremental dom calls.
    * @param {!IncrementalDomRenderer} renderer The renderer that is capturing
    *   children.
    * @param {!function()} callback Function to be called when children have all
    *     been captured.
   	 */
			value: function capture(renderer, callback) {
				renderer_ = renderer;
				callback_ = callback;
				tree_ = {
					props: {
						children: []
					}
				};
				tree_.config = tree_.props;
				currentParent_ = tree_;
				isCapturing_ = true;
				IncrementalDomAop.startInterception({
					elementClose: handleInterceptedCloseCall_,
					elementOpen: handleInterceptedOpenCall_,
					text: handleInterceptedTextCall_
				});
			}

			/**
    * Returns the owner of the current child node being rendered (or nothing
    * if there's no child being rendered).
    * @return {ComponentRenderer}
    */

		}, {
			key: 'getCurrentOwner',
			value: function getCurrentOwner() {
				return currNodeOwner_;
			}

			/**
    * Gets the node's original owner's renderer.
    * @param {!Object} node
    * @return {ComponentRenderer}
    */

		}, {
			key: 'getOwner',
			value: function getOwner(node) {
				return node[IncrementalDomChildren.CHILD_OWNER];
			}

			/**
    * Renders a children tree through incremental dom.
    * @param {!{args: Array, children: !Array, isText: ?boolean}}
    * @param {function()=} opt_skipNode Optional function that is called for
    *     each node to be rendered. If it returns true, the node will be skipped.
    * @protected
    */

		}, {
			key: 'render',
			value: function render(tree, opt_skipNode) {
				if (isCapturing_) {
					// If capturing, just add the node directly to the captured tree.
					addChildToTree(tree);
					return;
				}

				currNodeOwner_ = IncrementalDomChildren.getOwner(tree);
				if (opt_skipNode && opt_skipNode(tree)) {
					currNodeOwner_ = null;
					return;
				}

				if (isDef(tree.text)) {
					var args = tree.args ? tree.args : [];
					args[0] = tree.text;
					IncrementalDOM.text.apply(null, args);
				} else {
					var _args = IncrementalDomUtils.buildCallFromConfig(tree.tag, tree.props);
					IncrementalDOM.elementOpen.apply(null, _args);
					if (tree.props.children) {
						for (var i = 0; i < tree.props.children.length; i++) {
							IncrementalDomChildren.render(tree.props.children[i], opt_skipNode);
						}
					}
					IncrementalDOM.elementClose(tree.tag);
				}
				currNodeOwner_ = null;
			}
		}]);
		return IncrementalDomChildren;
	}();

	var callback_;
	var currNodeOwner_;
	var currentParent_;
	var isCapturing_ = false;
	var renderer_;
	var tree_;

	/**
  * Adds a child element to the tree.
  * @param {!Array} args The arguments passed to the incremental dom call.
  * @param {boolean=} opt_isText Optional flag indicating if the child is a
  *     text element.
  * @protected
  */
	function addChildCallToTree_(args, opt_isText) {
		var child = babelHelpers.defineProperty({
			parent: currentParent_
		}, IncrementalDomChildren.CHILD_OWNER, renderer_);

		if (opt_isText) {
			child.text = args[0];
			if (args.length > 1) {
				child.args = args;
			}
		} else {
			child.tag = args[0];
			child.props = IncrementalDomUtils.buildConfigFromCall(args);
			child.props.children = [];
			child.config = child.props;
		}

		addChildToTree(child);
		return child;
	}

	function addChildToTree(child) {
		currentParent_.props.children.push(child);
	}

	/**
  * Handles an intercepted call to the `elementClose` function from incremental
  * dom.
  * @protected
  */
	function handleInterceptedCloseCall_() {
		if (currentParent_ === tree_) {
			IncrementalDomAop.stopInterception();
			isCapturing_ = false;
			callback_(tree_);
			callback_ = null;
			currentParent_ = null;
			renderer_ = null;
			tree_ = null;
		} else {
			currentParent_ = currentParent_.parent;
		}
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedOpenCall_(originalFn) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		currentParent_ = addChildCallToTree_(args);
	}

	/**
  * Handles an intercepted call to the `text` function from incremental dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedTextCall_(originalFn) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		addChildCallToTree_(args, true);
	}

	/**
  * Property identifying a specific object as a Metal.js child node, and
  * pointing to the renderer instance that created it.
  * @type {string}
  * @static
  */
	IncrementalDomChildren.CHILD_OWNER = '__metalChildOwner';

	this['metal']['IncrementalDomChildren'] = IncrementalDomChildren;
}).call(this);
'use strict';

(function () {
	var comps_ = [];
	var disposing_ = false;

	var IncrementalDomUnusedComponents = function () {
		function IncrementalDomUnusedComponents() {
			babelHelpers.classCallCheck(this, IncrementalDomUnusedComponents);
		}

		babelHelpers.createClass(IncrementalDomUnusedComponents, null, [{
			key: 'disposeUnused',

			/**
    * Disposes all sub components that were not rerendered since the last
    * time this function was scheduled.
    */
			value: function disposeUnused() {
				if (disposing_) {
					return;
				}
				disposing_ = true;

				for (var i = 0; i < comps_.length; i++) {
					var comp = comps_[i];
					if (!comp.isDisposed() && !comp.getRenderer().getParent()) {
						// Don't let disposing cause the element to be removed, since it may
						// be currently being reused by another component.
						comp.element = null;
						comp.dispose();
					}
				}
				comps_ = [];
				disposing_ = false;
			}

			/**
    * Schedules the given components to be checked and disposed if not used
    * anymore, when `IncrementalDomUnusedComponents.disposeUnused` is called.
    * @param {!Array<!Component>} comps
    */

		}, {
			key: 'schedule',
			value: function schedule(comps) {
				for (var i = 0; i < comps.length; i++) {
					if (!comps[i].isDisposed()) {
						comps[i].getRenderer().parent_ = null;
						comps_.push(comps[i]);
					}
				}
			}
		}]);
		return IncrementalDomUnusedComponents;
	}();

	this['metal']['IncrementalDomUnusedComponents'] = IncrementalDomUnusedComponents;
}).call(this);
'use strict';

(function () {
	var getCompatibilityModeData = this['metalNamed']['metal']['getCompatibilityModeData'];
	var getUid = this['metalNamed']['metal']['getUid'];
	var isBoolean = this['metalNamed']['metal']['isBoolean'];
	var isDef = this['metalNamed']['metal']['isDef'];
	var isDefAndNotNull = this['metalNamed']['metal']['isDefAndNotNull'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var append = this['metalNamed']['dom']['append'];
	var delegate = this['metalNamed']['dom']['delegate'];
	var domData = this['metalNamed']['dom']['domData'];
	var exitDocument = this['metalNamed']['dom']['exitDocument'];
	var Component = this['metalNamed']['component']['Component'];
	var ComponentRegistry = this['metalNamed']['component']['ComponentRegistry'];
	var ComponentRenderer = this['metalNamed']['component']['ComponentRenderer'];
	var IncrementalDomAop = this['metal']['IncrementalDomAop'];
	var IncrementalDomChildren = this['metal']['IncrementalDomChildren'];
	var IncrementalDomUnusedComponents = this['metal']['IncrementalDomUnusedComponents'];
	var IncrementalDomUtils = this['metal']['IncrementalDomUtils'];

	/**
  * Class responsible for rendering components via incremental dom.
  */

	var IncrementalDomRenderer = function (_ComponentRenderer) {
		babelHelpers.inherits(IncrementalDomRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */
		function IncrementalDomRenderer(comp) {
			babelHelpers.classCallCheck(this, IncrementalDomRenderer);

			var _this = babelHelpers.possibleConstructorReturn(this, (IncrementalDomRenderer.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer)).call(this, comp));

			comp.context = {};
			comp.refs = {};
			_this.config_ = comp.getInitialConfig();
			_this.childComponents_ = [];
			_this.clearChanges_();
			comp.on('attached', _this.handleAttached_.bind(_this));

			// Binds functions that will be used many times, to avoid creating new
			// functions each time.
			_this.handleInterceptedAttributesCall_ = _this.handleInterceptedAttributesCall_.bind(_this);
			_this.handleInterceptedCloseCall_ = _this.handleInterceptedCloseCall_.bind(_this);
			_this.handleInterceptedOpenCall_ = _this.handleInterceptedOpenCall_.bind(_this);
			_this.handleChildrenCaptured_ = _this.handleChildrenCaptured_.bind(_this);
			_this.handleChildRender_ = _this.handleChildRender_.bind(_this);
			_this.renderInsidePatchDontSkip_ = _this.renderInsidePatchDontSkip_.bind(_this);
			return _this;
		}

		/**
   * Adds the given css classes to the specified arguments for an incremental
   * dom call, merging with the existing value if there is one.
   * @param {string} elementClasses
   * @param {!Array} args
   * @protected
   */


		babelHelpers.createClass(IncrementalDomRenderer, [{
			key: 'addElementClasses_',
			value: function addElementClasses_(elementClasses, args) {
				for (var i = 3; i < args.length; i += 2) {
					if (args[i] === 'class') {
						args[i + 1] = this.removeDuplicateClasses_(args[i + 1] + ' ' + elementClasses);
						return;
					}
				}
				while (args.length < 3) {
					args.push(null);
				}
				args.push('class', elementClasses);
			}

			/**
    * Attaches inline listeners found on the first component render, since those
    * may come from existing elements on the page that already have
    * data-on[eventname] attributes set to its final value. This won't trigger
    * `handleInterceptedAttributesCall_`, so we need manual work to guarantee
    * that projects using progressive enhancement like this will still work.
    * @param {!Element} node
    * @param {!Array} args
    * @protected
    */

		}, {
			key: 'attachDecoratedListeners_',
			value: function attachDecoratedListeners_(node, args) {
				if (!this.component_.wasRendered) {
					var attrs = (args[2] || []).concat(args.slice(3));
					for (var i = 0; i < attrs.length; i += 2) {
						var eventName = this.getEventFromListenerAttr_(attrs[i]);
						if (eventName && !node[eventName + '__handle__']) {
							this.attachEvent_(node, attrs[i], eventName, attrs[i + 1]);
						}
					}
				}
			}

			/**
    * Listens to the specified event, attached via incremental dom calls.
    * @param {!Element} element
    * @param {string} key
    * @param {string} eventName
    * @param {function()|string} fn
    * @protected
    */

		}, {
			key: 'attachEvent_',
			value: function attachEvent_(element, key, eventName, fn) {
				var handleKey = eventName + '__handle__';
				if (element[handleKey]) {
					element[handleKey].removeListener();
					element[handleKey] = null;
				}

				element[key] = fn;
				if (fn) {
					if (isString(fn)) {
						if (key[0] === 'd') {
							// Allow data-on[eventkey] listeners to stay in the dom, as they
							// won't cause conflicts.
							element.setAttribute(key, fn);
						}
						fn = this.component_.getListenerFn(fn);
					}
					element[handleKey] = delegate(document, eventName, element, fn);
				} else {
					element.removeAttribute(key);
				}
			}

			/**
    * Builds the "children" array to be passed to the current component.
    * @param {!Array<!Object>} children
    * @return {!Array<!Object>}
    * @protected
    */

		}, {
			key: 'buildChildren_',
			value: function buildChildren_(children) {
				return children.length === 0 ? emptyChildren_ : children;
			}

			/**
    * Returns an array with the args that should be passed to the component's
    * `shouldUpdate` method. This can be overridden by sub classes to change
    * what the method should receive.
    * @return {!Array}
    * @protected
    */

		}, {
			key: 'buildShouldUpdateArgs_',
			value: function buildShouldUpdateArgs_() {
				return [this.changes_];
			}

			/**
    * Clears the changes object.
    * @protected;
    */

		}, {
			key: 'clearChanges_',
			value: function clearChanges_() {
				this.changes_ = {};
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'disposeInternal', this).call(this);

				var comp = this.component_;
				var ref = this.config_.ref;
				var owner = this.getOwner();
				if (owner && owner.components && owner.components[ref] === comp) {
					delete owner.components[ref];
				}

				for (var i = 0; i < this.childComponents_.length; i++) {
					var child = this.childComponents_[i];
					if (!child.isDisposed()) {
						child.element = null;
						child.dispose();
					}
				}
				this.childComponents_ = null;
			}

			/**
    * Removes the most recent component from the queue of rendering components.
    */

		}, {
			key: 'getEventFromListenerAttr_',


			/**
    * Returns the event name if the given attribute is a listener (of the form
    * "on<EventName>"), or null if it isn't.
    * @param {string} attr
    * @return {?string}
    * @protected
    */
			value: function getEventFromListenerAttr_(attr) {
				var matches = IncrementalDomRenderer.LISTENER_REGEX.exec(attr);
				var eventName = matches ? matches[1] ? matches[1] : matches[2] : null;
				return eventName ? eventName.toLowerCase() : null;
			}

			/**
    * Gets the component that is this component's owner (that is, the one that
    * passed its data and holds its ref), or null if there's none.
    * @return {Component}
    */

		}, {
			key: 'getOwner',
			value: function getOwner() {
				return this.owner_;
			}

			/**
    * Gets the component that is this component's parent (that is, the one that
    * actually rendered it), or null if there's no parent.
    * @return {Component}
    */

		}, {
			key: 'getParent',
			value: function getParent() {
				return this.parent_;
			}

			/**
    * Returns the "ref" to be used for a component. Uses "key" as "ref" when
    * compatibility mode is on for the current renderer.
    * @param {!Object} config
    * @param {?string} ref
    * @protected
    */

		}, {
			key: 'getRef_',
			value: function getRef_(config) {
				var compatData = getCompatibilityModeData();
				if (compatData) {
					var renderers = compatData.renderers;
					var useKey = !renderers || renderers.indexOf(this.constructor) !== -1 || renderers.indexOf(this.constructor.RENDERER_NAME) !== -1;
					if (useKey && config.key && !config.ref) {
						return config.key;
					}
				}
				return config.ref;
			}

			/**
    * Gets the sub component referenced by the given tag and config data,
    * creating it if it doesn't yet exist.
    * @param {string|!Function} tagOrCtor The tag name.
    * @param {!Object} config The config object for the sub component.
    * @param {!Component} owner
    * @return {!Component} The sub component.
    * @protected
    */

		}, {
			key: 'getSubComponent_',
			value: function getSubComponent_(tagOrCtor, config, owner) {
				var Ctor = tagOrCtor;
				if (isString(Ctor)) {
					Ctor = ComponentRegistry.getConstructor(tagOrCtor);
				}

				var ref = this.getRef_(config);
				var data = IncrementalDomRenderer.getCurrentData();
				var comp;
				if (isDef(ref)) {
					comp = this.match_(owner.components[ref], Ctor, config);
					owner.addSubComponent(ref, comp);
					owner.refs[ref] = comp;
				} else if (isDef(config.key)) {
					comp = this.match_(data.prevComps.keys[config.key], Ctor, config);
					data.currComps.keys[config.key] = comp;
				} else {
					var type = getUid(Ctor, true);
					data.currComps.order[type] = data.currComps.order[type] || [];
					var order = data.currComps.order[type];
					comp = this.match_((data.prevComps.order[type] || [])[order.length], Ctor, config);
					order.push(comp);
				}

				return comp;
			}

			/**
    * Guarantees that the component's element has a parent. That's necessary
    * when calling incremental dom's `patchOuter` for now, as otherwise it will
    * throw an error if the element needs to be replaced.
    * @return {Element} The parent, in case it was added.
    * @protected
    */

		}, {
			key: 'guaranteeParent_',
			value: function guaranteeParent_() {
				var element = this.component_.element;
				if (!element || !element.parentNode) {
					var parent = document.createElement('div');
					if (element) {
						append(parent, element);
					}
					return parent;
				}
			}

			/**
    * Handles the `attached` listener. Stores attach data.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'handleAttached_',
			value: function handleAttached_(data) {
				this.attachData_ = data;
			}

			/**
    * Handles the event of children having finished being captured.
    * @param {!Object} The captured children in tree format.
    * @protected
    */

		}, {
			key: 'handleChildrenCaptured_',
			value: function handleChildrenCaptured_(tree) {
				var _componentToRender_ = this.componentToRender_;
				var props = _componentToRender_.props;
				var tag = _componentToRender_.tag;

				props.children = this.buildChildren_(tree.props.children);
				this.componentToRender_ = null;
				this.renderFromTag_(tag, props);
			}

			/**
    * Handles a child being rendered via `IncrementalDomChildren.render`. Skips
    * component nodes so that they can be rendered the correct way without
    * having to recapture both them and their children via incremental dom.
    * @param {!Object} node
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'handleChildRender_',
			value: function handleChildRender_(node) {
				if (node.tag && IncrementalDomUtils.isComponentTag(node.tag)) {
					node.props.children = this.buildChildren_(node.props.children);
					this.renderFromTag_(node.tag, node.props);
					return true;
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'handleDataManagerCreated_',
			value: function handleDataManagerCreated_() {
				babelHelpers.get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'handleDataManagerCreated_', this).call(this);

				var manager = this.component_.getDataManager();
				if (!this.component_.constructor.SYNC_UPDATES_MERGED) {
					// If the component is being updated synchronously we'll just reuse the
					// `handleComponentRendererStateKeyChanged_` function from
					// `ComponentRenderer`.
					manager.on('dataPropChanged', this.handleDataPropChanged_.bind(this));
				}

				manager.add('children', {
					validator: Array.isArray,
					value: emptyChildren_
				}, this.config_.children || emptyChildren_);
			}

			/**
    * Handles the `dataPropChanged` event. Stores data that has changed since the
    * last render.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'handleDataPropChanged_',
			value: function handleDataPropChanged_(data) {
				this.changes_[data.key] = data;
			}

			/**
    * Handles an intercepted call to the attributes default handler from
    * incremental dom.
    * @param {!function()} originalFn The original function before interception.
    * @param {!Element} element
    * @param {string} name
    * @param {*} value
    * @protected
    */

		}, {
			key: 'handleInterceptedAttributesCall_',
			value: function handleInterceptedAttributesCall_(originalFn, element, name, value) {
				var eventName = this.getEventFromListenerAttr_(name);
				if (eventName) {
					this.attachEvent_(element, name, eventName, value);
					return;
				}

				if (name === 'checked') {
					// This is a temporary fix to account for incremental dom setting
					// "checked" as an attribute only, which can cause bugs since that won't
					// necessarily check/uncheck the element it's set on. See
					// https://github.com/google/incremental-dom/issues/198 for more details.
					value = isDefAndNotNull(value) && value !== false;
				}

				if (name === 'value' && element.value !== value) {
					// This is a temporary fix to account for incremental dom setting
					// "value" as an attribute only, which can cause bugs since that won't
					// necessarily update the input's content it's set on. See
					// https://github.com/google/incremental-dom/issues/239 for more details.
					// We only do this if the new value is different though, as otherwise the
					// browser will automatically move the typing cursor to the end of the
					// field.
					element[name] = value;
				}

				if (isBoolean(value)) {
					// Incremental dom sets boolean values as string data attributes, which
					// is counter intuitive. This changes the behavior to use the actual
					// boolean value.
					element[name] = value;
					if (value) {
						element.setAttribute(name, '');
					} else {
						element.removeAttribute(name);
					}
				} else {
					originalFn(element, name, value);
				}
			}

			/**
    * Handles an intercepted call to the `elementClose` function from incremental
    * dom.
    * @param {!function()} originalFn The original function before interception.
    * @param {string} tag
    * @protected
    */

		}, {
			key: 'handleInterceptedCloseCall_',
			value: function handleInterceptedCloseCall_(originalFn, tag) {
				this.emit(IncrementalDomRenderer.ELEMENT_CLOSED, { tag: tag });
				var element = originalFn(tag);
				this.resetData_(domData.get(element).incDomData_);
				return element;
			}

			/**
    * Handles an intercepted call to the `elementOpen` function from incremental
    * dom.
    * @param {!function()} originalFn The original function before interception.
    * @param {string} tag
    * @protected
    */

		}, {
			key: 'handleInterceptedOpenCall_',
			value: function handleInterceptedOpenCall_(originalFn, tag) {
				if (IncrementalDomUtils.isComponentTag(tag)) {
					return this.handleSubComponentCall_.apply(this, arguments);
				} else {
					return this.handleRegularCall_.apply(this, arguments);
				}
			}

			/**
    * Handles the `dataPropChanged` event. Overrides original method from
    * `ComponentRenderer` to guarantee that `IncrementalDomRenderer`'s logic
    * will run first.
    * @param {!Object} data
    * @override
    * @protected
    */

		}, {
			key: 'handleManagerDataPropChanged_',
			value: function handleManagerDataPropChanged_(data) {
				this.handleDataPropChanged_(data);
				babelHelpers.get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'handleManagerDataPropChanged_', this).call(this, data);
			}

			/**
    * Handles an intercepted call to the `elementOpen` function from incremental
    * dom, done for a regular element. Adds any inline listeners found on the
    * first render and makes sure that component root elements are always reused.
    * @param {!function()} originalFn The original function before interception.
    * @protected
    */

		}, {
			key: 'handleRegularCall_',
			value: function handleRegularCall_(originalFn) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				this.emit(IncrementalDomRenderer.ELEMENT_OPENED, { args: args });
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_) {
					if (currRenderer.config_.key) {
						args[1] = currRenderer.config_.key;
					}
					var elementClasses = currComp.getDataManager().get('elementClasses');
					if (elementClasses) {
						this.addElementClasses_(elementClasses, args);
					}
				}

				var node = originalFn.apply(null, args);
				this.attachDecoratedListeners_(node, args);
				this.updateElementIfNotReached_(node);

				var config = IncrementalDomUtils.buildConfigFromCall(args);
				if (isDefAndNotNull(config.ref)) {
					var owner = IncrementalDomChildren.getCurrentOwner() || this;
					owner.getComponent().refs[config.ref] = node;
				}
				return node;
			}

			/**
    * Handles an intercepted call to the `elementOpen` function from incremental
    * dom, done for a sub component element. Creates and updates the appropriate
    * sub component.
    * @param {!function()} originalFn The original function before interception.
    * @protected
    */

		}, {
			key: 'handleSubComponentCall_',
			value: function handleSubComponentCall_(originalFn) {
				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					args[_key2 - 1] = arguments[_key2];
				}

				var props = IncrementalDomUtils.buildConfigFromCall(args);
				this.componentToRender_ = {
					props: props,
					tag: args[0]
				};
				IncrementalDomChildren.capture(this, this.handleChildrenCaptured_);
			}

			/**
    * Checks if the component's data has changed.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'hasDataChanged_',
			value: function hasDataChanged_() {
				return Object.keys(this.changes_).length > 0;
			}

			/**
    * Intercepts incremental dom calls from this component.
    * @protected
    */

		}, {
			key: 'intercept_',
			value: function intercept_() {
				IncrementalDomAop.startInterception({
					attributes: this.handleInterceptedAttributesCall_,
					elementClose: this.handleInterceptedCloseCall_,
					elementOpen: this.handleInterceptedOpenCall_
				});
			}

			/**
    * Checks if the given object is an incremental dom node.
    * @param {!Object} node
    * @return {boolean}
    */

		}, {
			key: 'isMatch_',


			/**
    * Checks if the given component can be a match for a constructor.
    * @param {!Component} comp
    * @param {!function()} Ctor
    * @return {boolean}
    * @protected
    */
			value: function isMatch_(comp, Ctor) {
				if (!comp || comp.constructor !== Ctor || comp.isDisposed()) {
					return false;
				}
				return comp.getRenderer().getOwner() === this.component_;
			}

			/**
    * Returns the given component if it matches the specified constructor
    * function. Otherwise, returns a new instance of the given constructor. On
    * both cases the component's state and config will be updated.
    * @param {Component} comp
    * @param {!function()} Ctor
    * @param {!Object} config
    * @return {!Component}
    * @protected
    */

		}, {
			key: 'match_',
			value: function match_(comp, Ctor, config) {
				if (!this.isMatch_(comp, Ctor)) {
					comp = new Ctor(config, false);
				}
				if (comp.wasRendered) {
					comp.getRenderer().startSkipUpdates();
					comp.getDataManager().replaceNonInternal(config);
					comp.getRenderer().stopSkipUpdates();
				}
				comp.getRenderer().config_ = config;
				return comp;
			}

			/**
    * Patches the component's element with the incremental dom function calls
    * done by `renderInsidePatchDontSkip_`.
    */

		}, {
			key: 'patch',
			value: function patch() {
				if (!this.component_.element && this.parent_) {
					// If the component has no content but was rendered from another component,
					// we'll need to patch this parent to make sure that any new content will
					// be added in the right place.
					this.parent_.getRenderer().patch();
					return;
				}

				var tempParent = this.guaranteeParent_();
				if (tempParent) {
					IncrementalDOM.patch(tempParent, this.renderInsidePatchDontSkip_);
					exitDocument(this.component_.element);
					if (this.component_.element && this.component_.inDocument) {
						this.component_.renderElement_(this.attachData_.parent, this.attachData_.sibling);
					}
				} else {
					var element = this.component_.element;
					IncrementalDOM.patchOuter(element, this.renderInsidePatchDontSkip_);
				}
			}

			/**
    * Removes duplicate css classes from the given string.
    * @param {string} cssClasses
    * @return {string}
    * @protected
    */

		}, {
			key: 'removeDuplicateClasses_',
			value: function removeDuplicateClasses_(cssClasses) {
				var noDuplicates = [];
				var all = cssClasses.split(/\s+/);
				var used = {};
				for (var i = 0; i < all.length; i++) {
					if (!used[all[i]]) {
						used[all[i]] = true;
						noDuplicates.push(all[i]);
					}
				}
				return noDuplicates.join(' ');
			}

			/**
    * Creates and renders the given function, which can either be a simple
    * incremental dom function or a component constructor.
    * @param {!function()} fnOrCtor Either be a simple incremental dom function
    or a component constructor.
    * @param {Object|Element=} opt_dataOrElement Optional config data for the
    *     function or parent for the rendered content.
    * @param {Element=} opt_parent Optional parent for the rendered content.
    * @return {!Component} The rendered component's instance.
    */

		}, {
			key: 'render',


			/**
    * Renders the renderer's component for the first time, patching its element
    * through the incremental dom function calls done by `renderIncDom`.
    */
			value: function render() {
				this.patch();
			}

			/**
    * Renders the given child node via its owner renderer.
    * @param {!Object} child
    */

		}, {
			key: 'renderChild',


			/**
    * Renders the given child node.
    * @param {!Object} child
    */
			value: function renderChild(child) {
				this.intercept_();
				IncrementalDomChildren.render(child, this.handleChildRender_);
				IncrementalDomAop.stopInterception();
			}

			/**
    * Renders the contents for the given tag.
    * @param {!function()|string} tag
    * @param {!Object} config
    * @protected
    */

		}, {
			key: 'renderFromTag_',
			value: function renderFromTag_(tag, config) {
				if (isString(tag) || tag.prototype.getRenderer) {
					var comp = this.renderSubComponent_(tag, config);
					this.updateElementIfNotReached_(comp.element);
					return comp.element;
				} else {
					return tag(config);
				}
			}

			/**
    * Calls functions from `IncrementalDOM` to build the component element's
    * content. Can be overriden by subclasses (for integration with template
    * engines for example).
    */

		}, {
			key: 'renderIncDom',
			value: function renderIncDom() {
				if (this.component_.render) {
					this.component_.render();
				} else {
					IncrementalDOM.elementVoid('div');
				}
			}

			/**
    * Runs the incremental dom functions for rendering this component, but
    * doesn't call `patch` yet. Rather, this will be the function that should be
    * called by `patch`.
    */

		}, {
			key: 'renderInsidePatch',
			value: function renderInsidePatch() {
				if (this.component_.wasRendered && !this.shouldUpdate() && IncrementalDOM.currentPointer() === this.component_.element) {
					if (this.component_.element) {
						IncrementalDOM.skipNode();
					}
					return;
				}
				this.renderInsidePatchDontSkip_();
			}

			/**
    * The same as `renderInsidePatch`, but without the check that may skip the
    * render action.
    * @protected
    */

		}, {
			key: 'renderInsidePatchDontSkip_',
			value: function renderInsidePatchDontSkip_() {
				IncrementalDomRenderer.startedRenderingComponent(this.component_);
				this.clearChanges_();
				this.rootElementReached_ = false;
				IncrementalDomUnusedComponents.schedule(this.childComponents_);
				this.childComponents_ = [];
				this.component_.refs = {};
				this.intercept_();
				this.renderIncDom();
				IncrementalDomAop.stopInterception();
				if (!this.rootElementReached_) {
					this.component_.element = null;
				}
				this.emit('rendered', !this.isRendered_);
				IncrementalDomRenderer.finishedRenderingComponent();
				this.resetData_(this.incDomData_);
			}

			/**
    * This updates the sub component that is represented by the given data.
    * The sub component is created, added to its parent and rendered. If it
    * had already been rendered before though, it will only have its state
    * updated instead.
    * @param {string|!function()} tagOrCtor The tag name or constructor function.
    * @param {!Object} config The config object for the sub component.
    * @return {!Component} The updated sub component.
    * @protected
    */

		}, {
			key: 'renderSubComponent_',
			value: function renderSubComponent_(tagOrCtor, config) {
				var ownerRenderer = IncrementalDomChildren.getCurrentOwner() || this;
				var owner = ownerRenderer.getComponent();
				var comp = this.getSubComponent_(tagOrCtor, config, owner);
				this.updateContext_(comp);
				var renderer = comp.getRenderer();
				if (renderer instanceof IncrementalDomRenderer) {
					var parentComp = IncrementalDomRenderer.getComponentBeingRendered();
					var parentRenderer = parentComp.getRenderer();
					parentRenderer.childComponents_.push(comp);
					renderer.parent_ = parentComp;
					renderer.owner_ = owner;
					if (!config.key && !parentRenderer.rootElementReached_) {
						config.key = parentRenderer.config_.key;
					}
					renderer.renderInsidePatch();
				} else {
					console.warn('IncrementalDomRenderer doesn\'t support rendering sub components ' + 'that don\'t use IncrementalDomRenderer as well, like:', comp);
				}
				if (!comp.wasRendered) {
					comp.renderAsSubComponent();
				}
				return comp;
			}

			/**
    * Resets the given incremental dom data object, preparing it for the next
    * pass.
    * @param {Object} data
    * @protected
    */

		}, {
			key: 'resetData_',
			value: function resetData_(data) {
				if (data) {
					data.prevComps.keys = data.currComps.keys;
					data.prevComps.order = data.currComps.order;
					data.currComps.keys = {};
					data.currComps.order = {};
				}
			}

			/**
    * Checks if the component should be updated with the current state changes.
    * Can be overridden by subclasses or implemented by components to provide
    * customized behavior (only updating when a state property used by the
    * template changes, for example).
    * @return {boolean}
    */

		}, {
			key: 'shouldUpdate',
			value: function shouldUpdate() {
				if (!this.hasDataChanged_()) {
					return false;
				}
				if (this.component_.shouldUpdate) {
					var _component_;

					return (_component_ = this.component_).shouldUpdate.apply(_component_, babelHelpers.toConsumableArray(this.buildShouldUpdateArgs_()));
				}
				return true;
			}

			/**
    * Skips the next disposal of children components, by clearing the array as
    * if there were no children rendered the last time. This can be useful for
    * allowing components to be reused by other parent components in separate
    * render update cycles.
    */

		}, {
			key: 'skipNextChildrenDisposal',
			value: function skipNextChildrenDisposal() {
				this.childComponents_ = [];
			}

			/**
    * Stores the component that has just started being rendered.
    * @param {!Component} comp
    */

		}, {
			key: 'update',


			/**
    * Updates the renderer's component when state changes, patching its element
    * through the incremental dom function calls done by `renderIncDom`. Makes
    * sure that it won't cause a rerender if the only change was for the
    * "element" property.
    */
			value: function update() {
				if (this.shouldUpdate()) {
					this.patch();
				}
			}

			/**
    * Updates this renderer's component's element with the given values, unless
    * it has already been reached by an earlier call.
    * @param {!Element} node
    * @protected
    */

		}, {
			key: 'updateElementIfNotReached_',
			value: function updateElementIfNotReached_(node) {
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_) {
					currRenderer.rootElementReached_ = true;
					if (currComp.element !== node) {
						currComp.element = node;
					}
				}
			}

			/**
    * Updates the given component's context according to the data from the
    * component that is currently being rendered.
    * @param {!Component} comp
    * @protected
    */

		}, {
			key: 'updateContext_',
			value: function updateContext_(comp) {
				var context = comp.context;
				var parent = IncrementalDomRenderer.getComponentBeingRendered();
				var childContext = parent.getChildContext ? parent.getChildContext() : {};
				object.mixin(context, parent.context, childContext);
				comp.context = context;
			}
		}], [{
			key: 'finishedRenderingComponent',
			value: function finishedRenderingComponent() {
				renderingComponents_.pop();
				if (renderingComponents_.length === 0) {
					IncrementalDomUnusedComponents.disposeUnused();
				}
			}

			/**
    * Gets the component being currently rendered via `IncrementalDomRenderer`.
    * @return {Component}
    */

		}, {
			key: 'getComponentBeingRendered',
			value: function getComponentBeingRendered() {
				return renderingComponents_[renderingComponents_.length - 1];
			}

			/**
    * Gets the data object that should be currently used. This object will either
    * come from the current element being rendered by incremental dom or from
    * the component instance being rendered (only when the current element is the
    * component's direct parent).
    * @return {!Object}
    */

		}, {
			key: 'getCurrentData',
			value: function getCurrentData() {
				var element = IncrementalDOM.currentElement();
				var comp = IncrementalDomRenderer.getComponentBeingRendered();
				var renderer = comp.getRenderer();
				var obj = renderer;
				if (renderer.rootElementReached_ && element !== comp.element.parentNode) {
					obj = domData.get(element);
				}
				obj.incDomData_ = obj.incDomData_ || {
					currComps: {
						keys: {},
						order: {}
					},
					prevComps: {
						keys: {},
						order: {}
					}
				};
				return obj.incDomData_;
			}
		}, {
			key: 'isIncDomNode',
			value: function isIncDomNode(node) {
				return !!node[IncrementalDomChildren.CHILD_OWNER];
			}
		}, {
			key: 'render',
			value: function render(fnOrCtor, opt_dataOrElement, opt_parent) {
				if (!Component.isComponentCtor(fnOrCtor)) {
					var fn = fnOrCtor;

					var TempComponent = function (_Component) {
						babelHelpers.inherits(TempComponent, _Component);

						function TempComponent() {
							babelHelpers.classCallCheck(this, TempComponent);
							return babelHelpers.possibleConstructorReturn(this, (TempComponent.__proto__ || Object.getPrototypeOf(TempComponent)).apply(this, arguments));
						}

						babelHelpers.createClass(TempComponent, [{
							key: 'created',
							value: function created() {
								if (IncrementalDomRenderer.getComponentBeingRendered()) {
									this.getRenderer().updateContext_(this);
								}
							}
						}, {
							key: 'render',
							value: function render() {
								fn(this.getRenderer().config_);
							}
						}]);
						return TempComponent;
					}(Component);

					TempComponent.RENDERER = IncrementalDomRenderer;
					fnOrCtor = TempComponent;
				}
				return Component.render(fnOrCtor, opt_dataOrElement, opt_parent);
			}
		}, {
			key: 'renderChild',
			value: function renderChild(child) {
				child[IncrementalDomChildren.CHILD_OWNER].renderChild(child);
			}
		}, {
			key: 'startedRenderingComponent',
			value: function startedRenderingComponent(comp) {
				renderingComponents_.push(comp);
			}
		}]);
		return IncrementalDomRenderer;
	}(ComponentRenderer);

	var renderingComponents_ = [];
	var emptyChildren_ = [];

	// Constants used as event names.
	IncrementalDomRenderer.ELEMENT_OPENED = 'elementOpened';
	IncrementalDomRenderer.ELEMENT_CLOSED = 'elementClosed';

	// Regex pattern used to find inline listeners.
	IncrementalDomRenderer.LISTENER_REGEX = /^(?:on([A-Z]\w+))|(?:data-on(\w+))$/;

	// Name of this renderer. Renderers should provide this as a way to identify
	// them via a simple string (when calling enableCompatibilityMode to add
	// support to old features for specific renderers for example).
	IncrementalDomRenderer.RENDERER_NAME = 'incremental-dom';

	this['metal']['IncrementalDomRenderer'] = IncrementalDomRenderer;
}).call(this);
'use strict';

(function () {

  (function () {
    this.CLOSURE_NO_DEPS = true;
    this.goog = this.goog || {};

    // Copyright 2006 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Bootstrap for the Google JS Library (Closure).
     *
     * In uncompiled mode base.js will write out Closure's deps file, unless the
     * global <code>CLOSURE_NO_DEPS</code> is set to true.  This allows projects to
     * include their own deps file(s) from different locations.
     *
     * @author arv@google.com (Erik Arvidsson)
     *
     * @provideGoog
     */

    /**
     * @define {boolean} Overridden to true by the compiler when
     *     --process_closure_primitives is specified.
     */
    var COMPILED = false;

    /**
     * Base namespace for the Closure library.  Checks to see goog is already
     * defined in the current scope before assigning to prevent clobbering if
     * base.js is loaded more than once.
     *
     * @const
     */
    var goog = this.goog || {};

    /**
     * Reference to the global context.  In most cases this will be 'window'.
     */
    goog.global = this;

    /**
     * A hook for overriding the define values in uncompiled mode.
     *
     * In uncompiled mode, {@code CLOSURE_UNCOMPILED_DEFINES} may be defined before
     * loading base.js.  If a key is defined in {@code CLOSURE_UNCOMPILED_DEFINES},
     * {@code goog.define} will use the value instead of the default value.  This
     * allows flags to be overwritten without compilation (this is normally
     * accomplished with the compiler's "define" flag).
     *
     * Example:
     * <pre>
     *   var CLOSURE_UNCOMPILED_DEFINES = {'goog.DEBUG': false};
     * </pre>
     *
     * @type {Object<string, (string|number|boolean)>|undefined}
     */
    goog.global.CLOSURE_UNCOMPILED_DEFINES;

    /**
     * A hook for overriding the define values in uncompiled or compiled mode,
     * like CLOSURE_UNCOMPILED_DEFINES but effective in compiled code.  In
     * uncompiled code CLOSURE_UNCOMPILED_DEFINES takes precedence.
     *
     * Also unlike CLOSURE_UNCOMPILED_DEFINES the values must be number, boolean or
     * string literals or the compiler will emit an error.
     *
     * While any @define value may be set, only those set with goog.define will be
     * effective for uncompiled code.
     *
     * Example:
     * <pre>
     *   var CLOSURE_DEFINES = {'goog.DEBUG': false} ;
     * </pre>
     *
     * @type {Object<string, (string|number|boolean)>|undefined}
     */
    goog.global.CLOSURE_DEFINES;

    /**
     * Returns true if the specified value is not undefined.
     * WARNING: Do not use this to test if an object has a property. Use the in
     * operator instead.
     *
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined.
     */
    goog.isDef = function (val) {
      // void 0 always evaluates to undefined and hence we do not need to depend on
      // the definition of the global variable named 'undefined'.
      return val !== void 0;
    };

    /**
     * Builds an object structure for the provided namespace path, ensuring that
     * names that already exist are not overwritten. For example:
     * "a.b.c" -> a = {};a.b={};a.b.c={};
     * Used by goog.provide and goog.exportSymbol.
     * @param {string} name name of the object that this file defines.
     * @param {*=} opt_object the object to expose at the end of the path.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is |goog.global|.
     * @private
     */
    goog.exportPath_ = function (name, opt_object, opt_objectToExportTo) {
      var parts = name.split('.');
      var cur = opt_objectToExportTo || goog.global;

      // Internet Explorer exhibits strange behavior when throwing errors from
      // methods externed in this manner.  See the testExportSymbolExceptions in
      // base_test.html for an example.
      if (!(parts[0] in cur) && cur.execScript) {
        cur.execScript('var ' + parts[0]);
      }

      // Certain browsers cannot parse code in the form for((a in b); c;);
      // This pattern is produced by the JSCompiler when it collapses the
      // statement above into the conditional loop below. To prevent this from
      // happening, use a for-loop and reserve the init logic as below.

      // Parentheses added to eliminate strict JS warning in Firefox.
      for (var part; parts.length && (part = parts.shift());) {
        if (!parts.length && goog.isDef(opt_object)) {
          // last part and we have an object; use it
          cur[part] = opt_object;
        } else if (cur[part]) {
          cur = cur[part];
        } else {
          cur = cur[part] = {};
        }
      }
    };

    /**
     * Defines a named value. In uncompiled mode, the value is retrieved from
     * CLOSURE_DEFINES or CLOSURE_UNCOMPILED_DEFINES if the object is defined and
     * has the property specified, and otherwise used the defined defaultValue.
     * When compiled the default can be overridden using the compiler
     * options or the value set in the CLOSURE_DEFINES object.
     *
     * @param {string} name The distinguished name to provide.
     * @param {string|number|boolean} defaultValue
     */
    goog.define = function (name, defaultValue) {
      var value = defaultValue;
      if (!COMPILED) {
        if (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, name)) {
          value = goog.global.CLOSURE_UNCOMPILED_DEFINES[name];
        } else if (goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
          value = goog.global.CLOSURE_DEFINES[name];
        }
      }
      goog.exportPath_(name, value);
    };

    /**
     * @define {boolean} DEBUG is provided as a convenience so that debugging code
     * that should not be included in a production js_binary can be easily stripped
     * by specifying --define goog.DEBUG=false to the JSCompiler. For example, most
     * toString() methods should be declared inside an "if (goog.DEBUG)" conditional
     * because they are generally used for debugging purposes and it is difficult
     * for the JSCompiler to statically determine whether they are used.
     */
    goog.define('goog.DEBUG', true);

    /**
     * @define {string} LOCALE defines the locale being used for compilation. It is
     * used to select locale specific data to be compiled in js binary. BUILD rule
     * can specify this value by "--define goog.LOCALE=<locale_name>" as JSCompiler
     * option.
     *
     * Take into account that the locale code format is important. You should use
     * the canonical Unicode format with hyphen as a delimiter. Language must be
     * lowercase, Language Script - Capitalized, Region - UPPERCASE.
     * There are few examples: pt-BR, en, en-US, sr-Latin-BO, zh-Hans-CN.
     *
     * See more info about locale codes here:
     * http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers
     *
     * For language codes you should use values defined by ISO 693-1. See it here
     * http://www.w3.org/WAI/ER/IG/ert/iso639.htm. There is only one exception from
     * this rule: the Hebrew language. For legacy reasons the old code (iw) should
     * be used instead of the new code (he), see http://wiki/Main/IIISynonyms.
     */
    goog.define('goog.LOCALE', 'en'); // default to en


    /**
     * @define {boolean} Whether this code is running on trusted sites.
     *
     * On untrusted sites, several native functions can be defined or overridden by
     * external libraries like Prototype, Datejs, and JQuery and setting this flag
     * to false forces closure to use its own implementations when possible.
     *
     * If your JavaScript can be loaded by a third party site and you are wary about
     * relying on non-standard implementations, specify
     * "--define goog.TRUSTED_SITE=false" to the JSCompiler.
     */
    goog.define('goog.TRUSTED_SITE', true);

    /**
     * @define {boolean} Whether a project is expected to be running in strict mode.
     *
     * This define can be used to trigger alternate implementations compatible with
     * running in EcmaScript Strict mode or warn about unavailable functionality.
     * @see https://goo.gl/g5EoHI
     *
     */
    goog.define('goog.STRICT_MODE_COMPATIBLE', false);

    /**
     * @define {boolean} Whether code that calls {@link goog.setTestOnly} should
     *     be disallowed in the compilation unit.
     */
    goog.define('goog.DISALLOW_TEST_ONLY_CODE', COMPILED && !goog.DEBUG);

    /**
     * @define {boolean} Whether to use a Chrome app CSP-compliant method for
     *     loading scripts via goog.require. @see appendScriptSrcNode_.
     */
    goog.define('goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING', false);

    /**
     * Defines a namespace in Closure.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * The presence of one or more goog.provide() calls in a file indicates
     * that the file defines the given objects/namespaces.
     * Provided symbols must not be null or undefined.
     *
     * In addition, goog.provide() creates the object stubs for a namespace
     * (for example, goog.provide("goog.foo.bar") will create the object
     * goog.foo.bar if it does not already exist).
     *
     * Build tools also scan for provide/require/module statements
     * to discern dependencies, build dependency files (see deps.js), etc.
     *
     * @see goog.require
     * @see goog.module
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     */
    goog.provide = function (name) {
      if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice.
        // A goog.module/goog.provide maps a goog.require to a specific file
        if (goog.isProvided_(name)) {
          throw Error('Namespace "' + name + '" already declared.');
        }
      }

      goog.constructNamespace_(name);
    };

    /**
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     * @param {Object=} opt_obj The object to embed in the namespace.
     * @private
     */
    goog.constructNamespace_ = function (name, opt_obj) {
      if (!COMPILED) {
        delete goog.implicitNamespaces_[name];

        var namespace = name;
        while (namespace = namespace.substring(0, namespace.lastIndexOf('.'))) {
          if (goog.getObjectByName(namespace)) {
            break;
          }
          goog.implicitNamespaces_[namespace] = true;
        }
      }

      goog.exportPath_(name, opt_obj);
    };

    /**
     * Module identifier validation regexp.
     * Note: This is a conservative check, it is very possible to be more lenient,
     *   the primary exclusion here is "/" and "\" and a leading ".", these
     *   restrictions are intended to leave the door open for using goog.require
     *   with relative file paths rather than module identifiers.
     * @private
     */
    goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;

    /**
     * Defines a module in Closure.
     *
     * Marks that this file must be loaded as a module and claims the namespace.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * goog.module() has three requirements:
     * - goog.module may not be used in the same file as goog.provide.
     * - goog.module must be the first statement in the file.
     * - only one goog.module is allowed per file.
     *
     * When a goog.module annotated file is loaded, it is enclosed in
     * a strict function closure. This means that:
     * - any variables declared in a goog.module file are private to the file
     * (not global), though the compiler is expected to inline the module.
     * - The code must obey all the rules of "strict" JavaScript.
     * - the file will be marked as "use strict"
     *
     * NOTE: unlike goog.provide, goog.module does not declare any symbols by
     * itself. If declared symbols are desired, use
     * goog.module.declareLegacyNamespace().
     *
     *
     * See the public goog.module proposal: http://goo.gl/Va1hin
     *
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part", is expected but not required.
     */
    goog.module = function (name) {
      if (!goog.isString(name) || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
        throw Error('Invalid module identifier');
      }
      if (!goog.isInModuleLoader_()) {
        throw Error('Module ' + name + ' has been loaded incorrectly.');
      }
      if (goog.moduleLoaderState_.moduleName) {
        throw Error('goog.module may only be called once per module.');
      }

      // Store the module name for the loader.
      goog.moduleLoaderState_.moduleName = name;
      if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice.
        // A goog.module/goog.provide maps a goog.require to a specific file
        if (goog.isProvided_(name)) {
          throw Error('Namespace "' + name + '" already declared.');
        }
        delete goog.implicitNamespaces_[name];
      }
    };

    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     *
     * Note: This is not an alternative to goog.require, it does not
     * indicate a hard dependency, instead it is used to indicate
     * an optional dependency or to access the exports of a module
     * that has already been loaded.
     * @suppress {missingProvide}
     */
    goog.module.get = function (name) {
      return goog.module.getInternal_(name);
    };

    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     * @private
     */
    goog.module.getInternal_ = function (name) {
      if (!COMPILED) {
        if (goog.isProvided_(name)) {
          // goog.require only return a value with-in goog.module files.
          return name in goog.loadedModules_ ? goog.loadedModules_[name] : goog.getObjectByName(name);
        } else {
          return null;
        }
      }
    };

    /**
     * @private {?{moduleName: (string|undefined), declareLegacyNamespace:boolean}}
     */
    goog.moduleLoaderState_ = null;

    /**
     * @private
     * @return {boolean} Whether a goog.module is currently being initialized.
     */
    goog.isInModuleLoader_ = function () {
      return goog.moduleLoaderState_ != null;
    };

    /**
     * Provide the module's exports as a globally accessible object under the
     * module's declared name.  This is intended to ease migration to goog.module
     * for files that have existing usages.
     * @suppress {missingProvide}
     */
    goog.module.declareLegacyNamespace = function () {
      if (!COMPILED && !goog.isInModuleLoader_()) {
        throw new Error('goog.module.declareLegacyNamespace must be called from ' + 'within a goog.module');
      }
      if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
        throw Error('goog.module must be called prior to ' + 'goog.module.declareLegacyNamespace.');
      }
      goog.moduleLoaderState_.declareLegacyNamespace = true;
    };

    /**
     * Marks that the current file should only be used for testing, and never for
     * live code in production.
     *
     * In the case of unit tests, the message may optionally be an exact namespace
     * for the test (e.g. 'goog.stringTest'). The linter will then ignore the extra
     * provide (if not explicitly defined in the code).
     *
     * @param {string=} opt_message Optional message to add to the error that's
     *     raised when used in production code.
     */
    goog.setTestOnly = function (opt_message) {
      if (goog.DISALLOW_TEST_ONLY_CODE) {
        opt_message = opt_message || '';
        throw Error('Importing test-only code into non-debug environment' + (opt_message ? ': ' + opt_message : '.'));
      }
    };

    if (!COMPILED) {
      /**
       * Check if the given name has been goog.provided. This will return false for
       * names that are available only as implicit namespaces.
       * @param {string} name name of the object to look for.
       * @return {boolean} Whether the name has been provided.
       * @private
       */
      goog.isProvided_ = function (name) {
        return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.isDefAndNotNull(goog.getObjectByName(name));
      };

      /**
       * Namespaces implicitly defined by goog.provide. For example,
       * goog.provide('goog.events.Event') implicitly declares that 'goog' and
       * 'goog.events' must be namespaces.
       *
       * @type {!Object<string, (boolean|undefined)>}
       * @private
       */
      goog.implicitNamespaces_ = { 'goog.module': true };

      // NOTE: We add goog.module as an implicit namespace as goog.module is defined
      // here and because the existing module package has not been moved yet out of
      // the goog.module namespace. This satisifies both the debug loader and
      // ahead-of-time dependency management.
    }

    /**
     * Returns an object based on its fully qualified external name.  The object
     * is not found if null or undefined.  If you are using a compilation pass that
     * renames property names beware that using this function will not find renamed
     * properties.
     *
     * @param {string} name The fully qualified name.
     * @param {Object=} opt_obj The object within which to look; default is
     *     |goog.global|.
     * @return {?} The value (object or primitive) or, if not found, null.
     */
    goog.getObjectByName = function (name, opt_obj) {
      var parts = name.split('.');
      var cur = opt_obj || goog.global;
      for (var part; part = parts.shift();) {
        if (goog.isDefAndNotNull(cur[part])) {
          cur = cur[part];
        } else {
          return null;
        }
      }
      return cur;
    };

    /**
     * Globalizes a whole namespace, such as goog or goog.lang.
     *
     * @param {!Object} obj The namespace to globalize.
     * @param {Object=} opt_global The object to add the properties to.
     * @deprecated Properties may be explicitly exported to the global scope, but
     *     this should no longer be done in bulk.
     */
    goog.globalize = function (obj, opt_global) {
      var global = opt_global || goog.global;
      for (var x in obj) {
        global[x] = obj[x];
      }
    };

    /**
     * Adds a dependency from a file to the files it requires.
     * @param {string} relPath The path to the js file.
     * @param {!Array<string>} provides An array of strings with
     *     the names of the objects this file provides.
     * @param {!Array<string>} requires An array of strings with
     *     the names of the objects this file requires.
     * @param {boolean|!Object<string>=} opt_loadFlags Parameters indicating
     *     how the file must be loaded.  The boolean 'true' is equivalent
     *     to {'module': 'goog'} for backwards-compatibility.  Valid properties
     *     and values include {'module': 'goog'} and {'lang': 'es6'}.
     */
    goog.addDependency = function (relPath, provides, requires, opt_loadFlags) {
      if (goog.DEPENDENCIES_ENABLED) {
        var provide, require;
        var path = relPath.replace(/\\/g, '/');
        var deps = goog.dependencies_;
        if (!opt_loadFlags || typeof opt_loadFlags === 'boolean') {
          opt_loadFlags = opt_loadFlags ? { 'module': 'goog' } : {};
        }
        for (var i = 0; provide = provides[i]; i++) {
          deps.nameToPath[provide] = path;
          deps.pathIsModule[path] = opt_loadFlags['module'] == 'goog';
        }
        for (var j = 0; require = requires[j]; j++) {
          if (!(path in deps.requires)) {
            deps.requires[path] = {};
          }
          deps.requires[path][require] = true;
        }
      }
    };

    // NOTE(nnaze): The debug DOM loader was included in base.js as an original way
    // to do "debug-mode" development.  The dependency system can sometimes be
    // confusing, as can the debug DOM loader's asynchronous nature.
    //
    // With the DOM loader, a call to goog.require() is not blocking -- the script
    // will not load until some point after the current script.  If a namespace is
    // needed at runtime, it needs to be defined in a previous script, or loaded via
    // require() with its registered dependencies.
    //
    // User-defined namespaces may need their own deps file. For a reference on
    // creating a deps file, see:
    // Externally: https://developers.google.com/closure/library/docs/depswriter
    //
    // Because of legacy clients, the DOM loader can't be easily removed from
    // base.js.  Work is being done to make it disableable or replaceable for
    // different environments (DOM-less JavaScript interpreters like Rhino or V8,
    // for example). See bootstrap/ for more information.


    /**
     * @define {boolean} Whether to enable the debug loader.
     *
     * If enabled, a call to goog.require() will attempt to load the namespace by
     * appending a script tag to the DOM (if the namespace has been registered).
     *
     * If disabled, goog.require() will simply assert that the namespace has been
     * provided (and depend on the fact that some outside tool correctly ordered
     * the script).
     */
    goog.define('goog.ENABLE_DEBUG_LOADER', true);

    /**
     * @param {string} msg
     * @private
     */
    goog.logToConsole_ = function (msg) {
      if (goog.global.console) {
        goog.global.console['error'](msg);
      }
    };

    /**
     * Implements a system for the dynamic resolution of dependencies that works in
     * parallel with the BUILD system. Note that all calls to goog.require will be
     * stripped by the JSCompiler when the --process_closure_primitives option is
     * used.
     * @see goog.provide
     * @param {string} name Namespace to include (as was given in goog.provide()) in
     *     the form "goog.package.part".
     * @return {?} If called within a goog.module file, the associated namespace or
     *     module otherwise null.
     */
    goog.require = function (name) {
      // If the object already exists we do not need do do anything.
      if (!COMPILED) {
        if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_) {
          goog.maybeProcessDeferredDep_(name);
        }

        if (goog.isProvided_(name)) {
          if (goog.isInModuleLoader_()) {
            return goog.module.getInternal_(name);
          } else {
            return null;
          }
        }

        if (goog.ENABLE_DEBUG_LOADER) {
          var path = goog.getPathFromDeps_(name);
          if (path) {
            goog.writeScripts_(path);
            return null;
          }
        }

        var errorMessage = 'goog.require could not find: ' + name;
        goog.logToConsole_(errorMessage);

        throw Error(errorMessage);
      }
    };

    /**
     * Path for included scripts.
     * @type {string}
     */
    goog.basePath = '';

    /**
     * A hook for overriding the base path.
     * @type {string|undefined}
     */
    goog.global.CLOSURE_BASE_PATH;

    /**
     * Whether to write out Closure's deps file. By default, the deps are written.
     * @type {boolean|undefined}
     */
    goog.global.CLOSURE_NO_DEPS;

    /**
     * A function to import a single script. This is meant to be overridden when
     * Closure is being run in non-HTML contexts, such as web workers. It's defined
     * in the global scope so that it can be set before base.js is loaded, which
     * allows deps.js to be imported properly.
     *
     * The function is passed the script source, which is a relative URI. It should
     * return true if the script was imported, false otherwise.
     * @type {(function(string): boolean)|undefined}
     */
    goog.global.CLOSURE_IMPORT_SCRIPT;

    /**
     * Null function used for default values of callbacks, etc.
     * @return {void} Nothing.
     */
    goog.nullFunction = function () {};

    /**
     * When defining a class Foo with an abstract method bar(), you can do:
     * Foo.prototype.bar = goog.abstractMethod
     *
     * Now if a subclass of Foo fails to override bar(), an error will be thrown
     * when bar() is invoked.
     *
     * Note: This does not take the name of the function to override as an argument
     * because that would make it more difficult to obfuscate our JavaScript code.
     *
     * @type {!Function}
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    goog.abstractMethod = function () {
      throw Error('unimplemented abstract method');
    };

    /**
     * Adds a {@code getInstance} static method that always returns the same
     * instance object.
     * @param {!Function} ctor The constructor for the class to add the static
     *     method to.
     */
    goog.addSingletonGetter = function (ctor) {
      ctor.getInstance = function () {
        if (ctor.instance_) {
          return ctor.instance_;
        }
        if (goog.DEBUG) {
          // NOTE: JSCompiler can't optimize away Array#push.
          goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
        }
        return ctor.instance_ = new ctor();
      };
    };

    /**
     * All singleton classes that have been instantiated, for testing. Don't read
     * it directly, use the {@code goog.testing.singleton} module. The compiler
     * removes this variable if unused.
     * @type {!Array<!Function>}
     * @private
     */
    goog.instantiatedSingletons_ = [];

    /**
     * @define {boolean} Whether to load goog.modules using {@code eval} when using
     * the debug loader.  This provides a better debugging experience as the
     * source is unmodified and can be edited using Chrome Workspaces or similar.
     * However in some environments the use of {@code eval} is banned
     * so we provide an alternative.
     */
    goog.define('goog.LOAD_MODULE_USING_EVAL', true);

    /**
     * @define {boolean} Whether the exports of goog.modules should be sealed when
     * possible.
     */
    goog.define('goog.SEAL_MODULE_EXPORTS', goog.DEBUG);

    /**
     * The registry of initialized modules:
     * the module identifier to module exports map.
     * @private @const {!Object<string, ?>}
     */
    goog.loadedModules_ = {};

    /**
     * True if goog.dependencies_ is available.
     * @const {boolean}
     */
    goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;

    if (goog.DEPENDENCIES_ENABLED) {
      /**
       * This object is used to keep track of dependencies and other data that is
       * used for loading scripts.
       * @private
       * @type {{
       *   pathIsModule: !Object<string, boolean>,
       *   nameToPath: !Object<string, string>,
       *   requires: !Object<string, !Object<string, boolean>>,
       *   visited: !Object<string, boolean>,
       *   written: !Object<string, boolean>,
       *   deferred: !Object<string, string>
       * }}
       */
      goog.dependencies_ = {
        pathIsModule: {}, // 1 to 1

        nameToPath: {}, // 1 to 1

        requires: {}, // 1 to many

        // Used when resolving dependencies to prevent us from visiting file twice.
        visited: {},

        written: {}, // Used to keep track of script files we have written.

        deferred: {} // Used to track deferred module evaluations in old IEs
      };

      /**
       * Tries to detect whether is in the context of an HTML document.
       * @return {boolean} True if it looks like HTML document.
       * @private
       */
      goog.inHtmlDocument_ = function () {
        /** @type {Document} */
        var doc = goog.global.document;
        return doc != null && 'write' in doc; // XULDocument misses write.
      };

      /**
       * Tries to detect the base path of base.js script that bootstraps Closure.
       * @private
       */
      goog.findBasePath_ = function () {
        if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
          goog.basePath = goog.global.CLOSURE_BASE_PATH;
          return;
        } else if (!goog.inHtmlDocument_()) {
          return;
        }
        /** @type {Document} */
        var doc = goog.global.document;
        var scripts = doc.getElementsByTagName('SCRIPT');
        // Search backwards since the current script is in almost all cases the one
        // that has base.js.
        for (var i = scripts.length - 1; i >= 0; --i) {
          var script = /** @type {!HTMLScriptElement} */scripts[i];
          var src = script.src;
          var qmark = src.lastIndexOf('?');
          var l = qmark == -1 ? src.length : qmark;
          if (src.substr(l - 7, 7) == 'base.js') {
            goog.basePath = src.substr(0, l - 7);
            return;
          }
        }
      };

      /**
       * Imports a script if, and only if, that script hasn't already been imported.
       * (Must be called at execution time)
       * @param {string} src Script source.
       * @param {string=} opt_sourceText The optionally source text to evaluate
       * @private
       */
      goog.importScript_ = function (src, opt_sourceText) {
        var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
        if (importScript(src, opt_sourceText)) {
          goog.dependencies_.written[src] = true;
        }
      };

      /** @const @private {boolean} */
      goog.IS_OLD_IE_ = !!(!goog.global.atob && goog.global.document && goog.global.document.all);

      /**
       * Given a URL initiate retrieval and execution of the module.
       * @param {string} src Script source URL.
       * @private
       */
      goog.importModule_ = function (src) {
        // In an attempt to keep browsers from timing out loading scripts using
        // synchronous XHRs, put each load in its own script block.
        var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';

        if (goog.importScript_('', bootstrap)) {
          goog.dependencies_.written[src] = true;
        }
      };

      /** @private {!Array<string>} */
      goog.queuedModules_ = [];

      /**
       * Return an appropriate module text. Suitable to insert into
       * a script tag (that is unescaped).
       * @param {string} srcUrl
       * @param {string} scriptText
       * @return {string}
       * @private
       */
      goog.wrapModule_ = function (srcUrl, scriptText) {
        if (!goog.LOAD_MODULE_USING_EVAL || !goog.isDef(goog.global.JSON)) {
          return '' + 'goog.loadModule(function(exports) {' + '"use strict";' + scriptText + '\n' + // terminate any trailing single line comment.
          ';return exports' + '});' + '\n//# sourceURL=' + srcUrl + '\n';
        } else {
          return '' + 'goog.loadModule(' + goog.global.JSON.stringify(scriptText + '\n//# sourceURL=' + srcUrl + '\n') + ');';
        }
      };

      // On IE9 and earlier, it is necessary to handle
      // deferred module loads. In later browsers, the
      // code to be evaluated is simply inserted as a script
      // block in the correct order. To eval deferred
      // code at the right time, we piggy back on goog.require to call
      // goog.maybeProcessDeferredDep_.
      //
      // The goog.requires are used both to bootstrap
      // the loading process (when no deps are available) and
      // declare that they should be available.
      //
      // Here we eval the sources, if all the deps are available
      // either already eval'd or goog.require'd.  This will
      // be the case when all the dependencies have already
      // been loaded, and the dependent module is loaded.
      //
      // But this alone isn't sufficient because it is also
      // necessary to handle the case where there is no root
      // that is not deferred.  For that there we register for an event
      // and trigger goog.loadQueuedModules_ handle any remaining deferred
      // evaluations.

      /**
       * Handle any remaining deferred goog.module evals.
       * @private
       */
      goog.loadQueuedModules_ = function () {
        var count = goog.queuedModules_.length;
        if (count > 0) {
          var queue = goog.queuedModules_;
          goog.queuedModules_ = [];
          for (var i = 0; i < count; i++) {
            var path = queue[i];
            goog.maybeProcessDeferredPath_(path);
          }
        }
      };

      /**
       * Eval the named module if its dependencies are
       * available.
       * @param {string} name The module to load.
       * @private
       */
      goog.maybeProcessDeferredDep_ = function (name) {
        if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
          var path = goog.getPathFromDeps_(name);
          goog.maybeProcessDeferredPath_(goog.basePath + path);
        }
      };

      /**
       * @param {string} name The module to check.
       * @return {boolean} Whether the name represents a
       *     module whose evaluation has been deferred.
       * @private
       */
      goog.isDeferredModule_ = function (name) {
        var path = goog.getPathFromDeps_(name);
        if (path && goog.dependencies_.pathIsModule[path]) {
          var abspath = goog.basePath + path;
          return abspath in goog.dependencies_.deferred;
        }
        return false;
      };

      /**
       * @param {string} name The module to check.
       * @return {boolean} Whether the name represents a
       *     module whose declared dependencies have all been loaded
       *     (eval'd or a deferred module load)
       * @private
       */
      goog.allDepsAreAvailable_ = function (name) {
        var path = goog.getPathFromDeps_(name);
        if (path && path in goog.dependencies_.requires) {
          for (var requireName in goog.dependencies_.requires[path]) {
            if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
              return false;
            }
          }
        }
        return true;
      };

      /**
       * @param {string} abspath
       * @private
       */
      goog.maybeProcessDeferredPath_ = function (abspath) {
        if (abspath in goog.dependencies_.deferred) {
          var src = goog.dependencies_.deferred[abspath];
          delete goog.dependencies_.deferred[abspath];
          goog.globalEval(src);
        }
      };

      /**
       * Load a goog.module from the provided URL.  This is not a general purpose
       * code loader and does not support late loading code, that is it should only
       * be used during page load. This method exists to support unit tests and
       * "debug" loaders that would otherwise have inserted script tags. Under the
       * hood this needs to use a synchronous XHR and is not recommeneded for
       * production code.
       *
       * The module's goog.requires must have already been satisified; an exception
       * will be thrown if this is not the case. This assumption is that no
       * "deps.js" file exists, so there is no way to discover and locate the
       * module-to-be-loaded's dependencies and no attempt is made to do so.
       *
       * There should only be one attempt to load a module.  If
       * "goog.loadModuleFromUrl" is called for an already loaded module, an
       * exception will be throw.
       *
       * @param {string} url The URL from which to attempt to load the goog.module.
       */
      goog.loadModuleFromUrl = function (url) {
        // Because this executes synchronously, we don't need to do any additional
        // bookkeeping. When "goog.loadModule" the namespace will be marked as
        // having been provided which is sufficient.
        goog.retrieveAndExecModule_(url);
      };

      /**
       * @param {function(?):?|string} moduleDef The module definition.
       */
      goog.loadModule = function (moduleDef) {
        // NOTE: we allow function definitions to be either in the from
        // of a string to eval (which keeps the original source intact) or
        // in a eval forbidden environment (CSP) we allow a function definition
        // which in its body must call {@code goog.module}, and return the exports
        // of the module.
        var previousState = goog.moduleLoaderState_;
        try {
          goog.moduleLoaderState_ = {
            moduleName: undefined,
            declareLegacyNamespace: false
          };
          var exports;
          if (goog.isFunction(moduleDef)) {
            exports = moduleDef.call(goog.global, {});
          } else if (goog.isString(moduleDef)) {
            exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
          } else {
            throw Error('Invalid module definition');
          }

          var moduleName = goog.moduleLoaderState_.moduleName;
          if (!goog.isString(moduleName) || !moduleName) {
            throw Error('Invalid module name \"' + moduleName + '\"');
          }

          // Don't seal legacy namespaces as they may be uses as a parent of
          // another namespace
          if (goog.moduleLoaderState_.declareLegacyNamespace) {
            goog.constructNamespace_(moduleName, exports);
          } else if (goog.SEAL_MODULE_EXPORTS && Object.seal) {
            Object.seal(exports);
          }

          goog.loadedModules_[moduleName] = exports;
        } finally {
          goog.moduleLoaderState_ = previousState;
        }
      };

      /**
       * @private @const {function(string):?}
       *
       * The new type inference warns because this function has no formal
       * parameters, but its jsdoc says that it takes one argument.
       * (The argument is used via arguments[0], but NTI does not detect this.)
       * @suppress {newCheckTypes}
       */
      goog.loadModuleFromSource_ = function () {
        // NOTE: we avoid declaring parameters or local variables here to avoid
        // masking globals or leaking values into the module definition.
        'use strict';

        var exports = {};
        eval(arguments[0]);
        return exports;
      };

      /**
       * Writes a new script pointing to {@code src} directly into the DOM.
       *
       * NOTE: This method is not CSP-compliant. @see goog.appendScriptSrcNode_ for
       * the fallback mechanism.
       *
       * @param {string} src The script URL.
       * @private
       */
      goog.writeScriptSrcNode_ = function (src) {
        goog.global.document.write('<script type="text/javascript" src="' + src + '"></' + 'script>');
      };

      /**
       * Appends a new script node to the DOM using a CSP-compliant mechanism. This
       * method exists as a fallback for document.write (which is not allowed in a
       * strict CSP context, e.g., Chrome apps).
       *
       * NOTE: This method is not analogous to using document.write to insert a
       * <script> tag; specifically, the user agent will execute a script added by
       * document.write immediately after the current script block finishes
       * executing, whereas the DOM-appended script node will not be executed until
       * the entire document is parsed and executed. That is to say, this script is
       * added to the end of the script execution queue.
       *
       * The page must not attempt to call goog.required entities until after the
       * document has loaded, e.g., in or after the window.onload callback.
       *
       * @param {string} src The script URL.
       * @private
       */
      goog.appendScriptSrcNode_ = function (src) {
        /** @type {Document} */
        var doc = goog.global.document;
        var scriptEl =
        /** @type {HTMLScriptElement} */doc.createElement('script');
        scriptEl.type = 'text/javascript';
        scriptEl.src = src;
        scriptEl.defer = false;
        scriptEl.async = false;
        doc.head.appendChild(scriptEl);
      };

      /**
       * The default implementation of the import function. Writes a script tag to
       * import the script.
       *
       * @param {string} src The script url.
       * @param {string=} opt_sourceText The optionally source text to evaluate
       * @return {boolean} True if the script was imported, false otherwise.
       * @private
       */
      goog.writeScriptTag_ = function (src, opt_sourceText) {
        if (goog.inHtmlDocument_()) {
          /** @type {!HTMLDocument} */
          var doc = goog.global.document;

          // If the user tries to require a new symbol after document load,
          // something has gone terribly wrong. Doing a document.write would
          // wipe out the page. This does not apply to the CSP-compliant method
          // of writing script tags.
          if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && doc.readyState == 'complete') {
            // Certain test frameworks load base.js multiple times, which tries
            // to write deps.js each time. If that happens, just fail silently.
            // These frameworks wipe the page between each load of base.js, so this
            // is OK.
            var isDeps = /\bdeps.js$/.test(src);
            if (isDeps) {
              return false;
            } else {
              throw Error('Cannot write "' + src + '" after document load');
            }
          }

          var isOldIE = goog.IS_OLD_IE_;

          if (opt_sourceText === undefined) {
            if (!isOldIE) {
              if (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
                goog.appendScriptSrcNode_(src);
              } else {
                goog.writeScriptSrcNode_(src);
              }
            } else {
              var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
              doc.write('<script type="text/javascript" src="' + src + '"' + state + '></' + 'script>');
            }
          } else {
            doc.write('<script type="text/javascript">' + opt_sourceText + '</' + 'script>');
          }
          return true;
        } else {
          return false;
        }
      };

      /** @private {number} */
      goog.lastNonModuleScriptIndex_ = 0;

      /**
       * A readystatechange handler for legacy IE
       * @param {!HTMLScriptElement} script
       * @param {number} scriptIndex
       * @return {boolean}
       * @private
       */
      goog.onScriptLoad_ = function (script, scriptIndex) {
        // for now load the modules when we reach the last script,
        // later allow more inter-mingling.
        if (script.readyState == 'complete' && goog.lastNonModuleScriptIndex_ == scriptIndex) {
          goog.loadQueuedModules_();
        }
        return true;
      };

      /**
       * Resolves dependencies based on the dependencies added using addDependency
       * and calls importScript_ in the correct order.
       * @param {string} pathToLoad The path from which to start discovering
       *     dependencies.
       * @private
       */
      goog.writeScripts_ = function (pathToLoad) {
        /** @type {!Array<string>} The scripts we need to write this time. */
        var scripts = [];
        var seenScript = {};
        var deps = goog.dependencies_;

        /** @param {string} path */
        function visitNode(path) {
          if (path in deps.written) {
            return;
          }

          // We have already visited this one. We can get here if we have cyclic
          // dependencies.
          if (path in deps.visited) {
            return;
          }

          deps.visited[path] = true;

          if (path in deps.requires) {
            for (var requireName in deps.requires[path]) {
              // If the required name is defined, we assume that it was already
              // bootstrapped by other means.
              if (!goog.isProvided_(requireName)) {
                if (requireName in deps.nameToPath) {
                  visitNode(deps.nameToPath[requireName]);
                } else {
                  throw Error('Undefined nameToPath for ' + requireName);
                }
              }
            }
          }

          if (!(path in seenScript)) {
            seenScript[path] = true;
            scripts.push(path);
          }
        }

        visitNode(pathToLoad);

        // record that we are going to load all these scripts.
        for (var i = 0; i < scripts.length; i++) {
          var path = scripts[i];
          goog.dependencies_.written[path] = true;
        }

        // If a module is loaded synchronously then we need to
        // clear the current inModuleLoader value, and restore it when we are
        // done loading the current "requires".
        var moduleState = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;

        for (var i = 0; i < scripts.length; i++) {
          var path = scripts[i];
          if (path) {
            if (!deps.pathIsModule[path]) {
              goog.importScript_(goog.basePath + path);
            } else {
              goog.importModule_(goog.basePath + path);
            }
          } else {
            goog.moduleLoaderState_ = moduleState;
            throw Error('Undefined script input');
          }
        }

        // restore the current "module loading state"
        goog.moduleLoaderState_ = moduleState;
      };

      /**
       * Looks at the dependency rules and tries to determine the script file that
       * fulfills a particular rule.
       * @param {string} rule In the form goog.namespace.Class or project.script.
       * @return {?string} Url corresponding to the rule, or null.
       * @private
       */
      goog.getPathFromDeps_ = function (rule) {
        if (rule in goog.dependencies_.nameToPath) {
          return goog.dependencies_.nameToPath[rule];
        } else {
          return null;
        }
      };

      goog.findBasePath_();

      // Allow projects to manage the deps files themselves.
      if (!goog.global.CLOSURE_NO_DEPS) {
        goog.importScript_(goog.basePath + 'deps.js');
      }
    }

    /**
     * Normalize a file path by removing redundant ".." and extraneous "." file
     * path components.
     * @param {string} path
     * @return {string}
     * @private
     */
    goog.normalizePath_ = function (path) {
      var components = path.split('/');
      var i = 0;
      while (i < components.length) {
        if (components[i] == '.') {
          components.splice(i, 1);
        } else if (i && components[i] == '..' && components[i - 1] && components[i - 1] != '..') {
          components.splice(--i, 2);
        } else {
          i++;
        }
      }
      return components.join('/');
    };

    /**
     * Loads file by synchronous XHR. Should not be used in production environments.
     * @param {string} src Source URL.
     * @return {string} File contents.
     * @private
     */
    goog.loadFileSync_ = function (src) {
      if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
        return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
      } else {
        /** @type {XMLHttpRequest} */
        var xhr = new goog.global['XMLHttpRequest']();
        xhr.open('get', src, false);
        xhr.send();
        return xhr.responseText;
      }
    };

    /**
     * Retrieve and execute a module.
     * @param {string} src Script source URL.
     * @private
     */
    goog.retrieveAndExecModule_ = function (src) {
      if (!COMPILED) {
        // The full but non-canonicalized URL for later use.
        var originalPath = src;
        // Canonicalize the path, removing any /./ or /../ since Chrome's debugging
        // console doesn't auto-canonicalize XHR loads as it does <script> srcs.
        src = goog.normalizePath_(src);

        var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;

        var scriptText = goog.loadFileSync_(src);

        if (scriptText != null) {
          var execModuleScript = goog.wrapModule_(src, scriptText);
          var isOldIE = goog.IS_OLD_IE_;
          if (isOldIE) {
            goog.dependencies_.deferred[originalPath] = execModuleScript;
            goog.queuedModules_.push(originalPath);
          } else {
            importScript(src, execModuleScript);
          }
        } else {
          throw new Error('load of ' + src + 'failed');
        }
      }
    };

    //==============================================================================
    // Language Enhancements
    //==============================================================================


    /**
     * This is a "fixed" version of the typeof operator.  It differs from the typeof
     * operator in such a way that null returns 'null' and arrays return 'array'.
     * @param {?} value The value to get the type of.
     * @return {string} The name of the type.
     */
    goog.typeOf = function (value) {
      var s = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      if (s == 'object') {
        if (value) {
          // Check these first, so we can avoid calling Object.prototype.toString if
          // possible.
          //
          // IE improperly marshals typeof across execution contexts, but a
          // cross-context object will still return false for "instanceof Object".
          if (value instanceof Array) {
            return 'array';
          } else if (value instanceof Object) {
            return s;
          }

          // HACK: In order to use an Object prototype method on the arbitrary
          //   value, the compiler requires the value be cast to type Object,
          //   even though the ECMA spec explicitly allows it.
          var className = Object.prototype.toString.call(
          /** @type {!Object} */value);
          // In Firefox 3.6, attempting to access iframe window objects' length
          // property throws an NS_ERROR_FAILURE, so we need to special-case it
          // here.
          if (className == '[object Window]') {
            return 'object';
          }

          // We cannot always use constructor == Array or instanceof Array because
          // different frames have different Array objects. In IE6, if the iframe
          // where the array was created is destroyed, the array loses its
          // prototype. Then dereferencing val.splice here throws an exception, so
          // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
          // so that will work. In this case, this function will return false and
          // most array functions will still work because the array is still
          // array-like (supports length and []) even though it has lost its
          // prototype.
          // Mark Miller noticed that Object.prototype.toString
          // allows access to the unforgeable [[Class]] property.
          //  15.2.4.2 Object.prototype.toString ( )
          //  When the toString method is called, the following steps are taken:
          //      1. Get the [[Class]] property of this object.
          //      2. Compute a string value by concatenating the three strings
          //         "[object ", Result(1), and "]".
          //      3. Return Result(2).
          // and this behavior survives the destruction of the execution context.
          if (className == '[object Array]' ||
          // In IE all non value types are wrapped as objects across window
          // boundaries (not iframe though) so we have to do object detection
          // for this edge case.
          typeof value.length == 'number' && typeof value.splice != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice')) {
            return 'array';
          }
          // HACK: There is still an array case that fails.
          //     function ArrayImpostor() {}
          //     ArrayImpostor.prototype = [];
          //     var impostor = new ArrayImpostor;
          // this can be fixed by getting rid of the fast path
          // (value instanceof Array) and solely relying on
          // (value && Object.prototype.toString.vall(value) === '[object Array]')
          // but that would require many more function calls and is not warranted
          // unless closure code is receiving objects from untrusted sources.

          // IE in cross-window calls does not correctly marshal the function type
          // (it appears just as an object) so we cannot use just typeof val ==
          // 'function'. However, if the object has a call property, it is a
          // function.
          if (className == '[object Function]' || typeof value.call != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('call')) {
            return 'function';
          }
        } else {
          return 'null';
        }
      } else if (s == 'function' && typeof value.call == 'undefined') {
        // In Safari typeof nodeList returns 'function', and on Firefox typeof
        // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
        // would like to return object for those and we can detect an invalid
        // function by making sure that the function object has a call method.
        return 'object';
      }
      return s;
    };

    /**
     * Returns true if the specified value is null.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is null.
     */
    goog.isNull = function (val) {
      return val === null;
    };

    /**
     * Returns true if the specified value is defined and not null.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined and not null.
     */
    goog.isDefAndNotNull = function (val) {
      // Note that undefined == null.
      return val != null;
    };

    /**
     * Returns true if the specified value is an array.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    goog.isArray = function (val) {
      return goog.typeOf(val) == 'array';
    };

    /**
     * Returns true if the object looks like an array. To qualify as array like
     * the value needs to be either a NodeList or an object with a Number length
     * property. As a special case, a function value is not array like, because its
     * length property is fixed to correspond to the number of expected arguments.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    goog.isArrayLike = function (val) {
      var type = goog.typeOf(val);
      // We do not use goog.isObject here in order to exclude function values.
      return type == 'array' || type == 'object' && typeof val.length == 'number';
    };

    /**
     * Returns true if the object looks like a Date. To qualify as Date-like the
     * value needs to be an object and have a getFullYear() function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a like a Date.
     */
    goog.isDateLike = function (val) {
      return goog.isObject(val) && typeof val.getFullYear == 'function';
    };

    /**
     * Returns true if the specified value is a string.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a string.
     */
    goog.isString = function (val) {
      return typeof val == 'string';
    };

    /**
     * Returns true if the specified value is a boolean.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is boolean.
     */
    goog.isBoolean = function (val) {
      return typeof val == 'boolean';
    };

    /**
     * Returns true if the specified value is a number.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a number.
     */
    goog.isNumber = function (val) {
      return typeof val == 'number';
    };

    /**
     * Returns true if the specified value is a function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a function.
     */
    goog.isFunction = function (val) {
      return goog.typeOf(val) == 'function';
    };

    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an object.
     */
    goog.isObject = function (val) {
      var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
      return type == 'object' && val != null || type == 'function';
      // return Object(val) === val also works, but is slower, especially if val is
      // not an object.
    };

    /**
     * Gets a unique ID for an object. This mutates the object so that further calls
     * with the same object as a parameter returns the same value. The unique ID is
     * guaranteed to be unique across the current session amongst objects that are
     * passed into {@code getUid}. There is no guarantee that the ID is unique or
     * consistent across sessions. It is unsafe to generate unique ID for function
     * prototypes.
     *
     * @param {Object} obj The object to get the unique ID for.
     * @return {number} The unique ID for the object.
     */
    goog.getUid = function (obj) {
      // TODO(arv): Make the type stricter, do not accept null.

      // In Opera window.hasOwnProperty exists but always returns false so we avoid
      // using it. As a consequence the unique ID generated for BaseClass.prototype
      // and SubClass.prototype will be the same.
      return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
    };

    /**
     * Whether the given object is already assigned a unique ID.
     *
     * This does not modify the object.
     *
     * @param {!Object} obj The object to check.
     * @return {boolean} Whether there is an assigned unique id for the object.
     */
    goog.hasUid = function (obj) {
      return !!obj[goog.UID_PROPERTY_];
    };

    /**
     * Removes the unique ID from an object. This is useful if the object was
     * previously mutated using {@code goog.getUid} in which case the mutation is
     * undone.
     * @param {Object} obj The object to remove the unique ID field from.
     */
    goog.removeUid = function (obj) {
      // TODO(arv): Make the type stricter, do not accept null.

      // In IE, DOM nodes are not instances of Object and throw an exception if we
      // try to delete.  Instead we try to use removeAttribute.
      if (obj !== null && 'removeAttribute' in obj) {
        obj.removeAttribute(goog.UID_PROPERTY_);
      }
      /** @preserveTry */
      try {
        delete obj[goog.UID_PROPERTY_];
      } catch (ex) {}
    };

    /**
     * Name for unique ID property. Initialized in a way to help avoid collisions
     * with other closure JavaScript on the same page.
     * @type {string}
     * @private
     */
    goog.UID_PROPERTY_ = 'closure_uid_' + (Math.random() * 1e9 >>> 0);

    /**
     * Counter for UID.
     * @type {number}
     * @private
     */
    goog.uidCounter_ = 0;

    /**
     * Adds a hash code field to an object. The hash code is unique for the
     * given object.
     * @param {Object} obj The object to get the hash code for.
     * @return {number} The hash code for the object.
     * @deprecated Use goog.getUid instead.
     */
    goog.getHashCode = goog.getUid;

    /**
     * Removes the hash code field from an object.
     * @param {Object} obj The object to remove the field from.
     * @deprecated Use goog.removeUid instead.
     */
    goog.removeHashCode = goog.removeUid;

    /**
     * Clones a value. The input may be an Object, Array, or basic type. Objects and
     * arrays will be cloned recursively.
     *
     * WARNINGS:
     * <code>goog.cloneObject</code> does not detect reference loops. Objects that
     * refer to themselves will cause infinite recursion.
     *
     * <code>goog.cloneObject</code> is unaware of unique identifiers, and copies
     * UIDs created by <code>getUid</code> into cloned results.
     *
     * @param {*} obj The value to clone.
     * @return {*} A clone of the input value.
     * @deprecated goog.cloneObject is unsafe. Prefer the goog.object methods.
     */
    goog.cloneObject = function (obj) {
      var type = goog.typeOf(obj);
      if (type == 'object' || type == 'array') {
        if (obj.clone) {
          return obj.clone();
        }
        var clone = type == 'array' ? [] : {};
        for (var key in obj) {
          clone[key] = goog.cloneObject(obj[key]);
        }
        return clone;
      }

      return obj;
    };

    /**
     * A native implementation of goog.bind.
     * @param {Function} fn A function to partially apply.
     * @param {Object|undefined} selfObj Specifies the object which this should
     *     point to when the function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @private
     * @suppress {deprecated} The compiler thinks that Function.prototype.bind is
     *     deprecated because some people have declared a pure-JS version.
     *     Only the pure-JS version is truly deprecated.
     */
    goog.bindNative_ = function (fn, selfObj, var_args) {
      return (/** @type {!Function} */fn.call.apply(fn.bind, arguments)
      );
    };

    /**
     * A pure-JS implementation of goog.bind.
     * @param {Function} fn A function to partially apply.
     * @param {Object|undefined} selfObj Specifies the object which this should
     *     point to when the function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @private
     */
    goog.bindJs_ = function (fn, selfObj, var_args) {
      if (!fn) {
        throw new Error();
      }

      if (arguments.length > 2) {
        var boundArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
          // Prepend the bound arguments to the current arguments.
          var newArgs = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(newArgs, boundArgs);
          return fn.apply(selfObj, newArgs);
        };
      } else {
        return function () {
          return fn.apply(selfObj, arguments);
        };
      }
    };

    /**
     * Partially applies this function to a particular 'this object' and zero or
     * more arguments. The result is a new function with some arguments of the first
     * function pre-filled and the value of this 'pre-specified'.
     *
     * Remaining arguments specified at call-time are appended to the pre-specified
     * ones.
     *
     * Also see: {@link #partial}.
     *
     * Usage:
     * <pre>var barMethBound = goog.bind(myFunction, myObj, 'arg1', 'arg2');
     * barMethBound('arg3', 'arg4');</pre>
     *
     * @param {?function(this:T, ...)} fn A function to partially apply.
     * @param {T} selfObj Specifies the object which this should point to when the
     *     function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function goog.bind() was
     *     invoked as a method of.
     * @template T
     * @suppress {deprecated} See above.
     */
    goog.bind = function (fn, selfObj, var_args) {
      // TODO(nicksantos): narrow the type signature.
      if (Function.prototype.bind &&
      // NOTE(nicksantos): Somebody pulled base.js into the default Chrome
      // extension environment. This means that for Chrome extensions, they get
      // the implementation of Function.prototype.bind that calls goog.bind
      // instead of the native one. Even worse, we don't want to introduce a
      // circular dependency between goog.bind and Function.prototype.bind, so
      // we have to hack this to make sure it works correctly.
      Function.prototype.bind.toString().indexOf('native code') != -1) {
        goog.bind = goog.bindNative_;
      } else {
        goog.bind = goog.bindJs_;
      }
      return goog.bind.apply(null, arguments);
    };

    /**
     * Like goog.bind(), except that a 'this object' is not required. Useful when
     * the target function is already bound.
     *
     * Usage:
     * var g = goog.partial(f, arg1, arg2);
     * g(arg3, arg4);
     *
     * @param {Function} fn A function to partially apply.
     * @param {...*} var_args Additional arguments that are partially applied to fn.
     * @return {!Function} A partially-applied form of the function goog.partial()
     *     was invoked as a method of.
     */
    goog.partial = function (fn, var_args) {
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
     * Copies all the members of a source object to a target object. This method
     * does not work on all browsers for all objects that contain keys such as
     * toString or hasOwnProperty. Use goog.object.extend for this purpose.
     * @param {Object} target Target.
     * @param {Object} source Source.
     */
    goog.mixin = function (target, source) {
      for (var x in source) {
        target[x] = source[x];
      }

      // For IE7 or lower, the for-in-loop does not contain any properties that are
      // not enumerable on the prototype object (for example, isPrototypeOf from
      // Object.prototype) but also it will not include 'replace' on objects that
      // extend String and change 'replace' (not that it is common for anyone to
      // extend anything except Object).
    };

    /**
     * @return {number} An integer value representing the number of milliseconds
     *     between midnight, January 1, 1970 and the current time.
     */
    goog.now = goog.TRUSTED_SITE && Date.now || function () {
      // Unary plus operator converts its operand to a number which in
      // the case of
      // a date is done by calling getTime().
      return +new Date();
    };

    /**
     * Evals JavaScript in the global scope.  In IE this uses execScript, other
     * browsers use goog.global.eval. If goog.global.eval does not evaluate in the
     * global scope (for example, in Safari), appends a script tag instead.
     * Throws an exception if neither execScript or eval is defined.
     * @param {string} script JavaScript string.
     */
    goog.globalEval = function (script) {
      if (goog.global.execScript) {
        goog.global.execScript(script, 'JavaScript');
      } else if (goog.global.eval) {
        // Test to see if eval works
        if (goog.evalWorksForGlobals_ == null) {
          goog.global.eval('var _evalTest_ = 1;');
          if (typeof goog.global['_evalTest_'] != 'undefined') {
            try {
              delete goog.global['_evalTest_'];
            } catch (ignore) {
              // Microsoft edge fails the deletion above in strict mode.
            }
            goog.evalWorksForGlobals_ = true;
          } else {
            goog.evalWorksForGlobals_ = false;
          }
        }

        if (goog.evalWorksForGlobals_) {
          goog.global.eval(script);
        } else {
          /** @type {Document} */
          var doc = goog.global.document;
          var scriptElt =
          /** @type {!HTMLScriptElement} */doc.createElement('SCRIPT');
          scriptElt.type = 'text/javascript';
          scriptElt.defer = false;
          // Note(user): can't use .innerHTML since "t('<test>')" will fail and
          // .text doesn't work in Safari 2.  Therefore we append a text node.
          scriptElt.appendChild(doc.createTextNode(script));
          doc.body.appendChild(scriptElt);
          doc.body.removeChild(scriptElt);
        }
      } else {
        throw Error('goog.globalEval not available');
      }
    };

    /**
     * Indicates whether or not we can call 'eval' directly to eval code in the
     * global scope. Set to a Boolean by the first call to goog.globalEval (which
     * empirically tests whether eval works for globals). @see goog.globalEval
     * @type {?boolean}
     * @private
     */
    goog.evalWorksForGlobals_ = null;

    /**
     * Optional map of CSS class names to obfuscated names used with
     * goog.getCssName().
     * @private {!Object<string, string>|undefined}
     * @see goog.setCssNameMapping
     */
    goog.cssNameMapping_;

    /**
     * Optional obfuscation style for CSS class names. Should be set to either
     * 'BY_WHOLE' or 'BY_PART' if defined.
     * @type {string|undefined}
     * @private
     * @see goog.setCssNameMapping
     */
    goog.cssNameMappingStyle_;

    /**
     * Handles strings that are intended to be used as CSS class names.
     *
     * This function works in tandem with @see goog.setCssNameMapping.
     *
     * Without any mapping set, the arguments are simple joined with a hyphen and
     * passed through unaltered.
     *
     * When there is a mapping, there are two possible styles in which these
     * mappings are used. In the BY_PART style, each part (i.e. in between hyphens)
     * of the passed in css name is rewritten according to the map. In the BY_WHOLE
     * style, the full css name is looked up in the map directly. If a rewrite is
     * not specified by the map, the compiler will output a warning.
     *
     * When the mapping is passed to the compiler, it will replace calls to
     * goog.getCssName with the strings from the mapping, e.g.
     *     var x = goog.getCssName('foo');
     *     var y = goog.getCssName(this.baseClass, 'active');
     *  becomes:
     *     var x = 'foo';
     *     var y = this.baseClass + '-active';
     *
     * If one argument is passed it will be processed, if two are passed only the
     * modifier will be processed, as it is assumed the first argument was generated
     * as a result of calling goog.getCssName.
     *
     * @param {string} className The class name.
     * @param {string=} opt_modifier A modifier to be appended to the class name.
     * @return {string} The class name or the concatenation of the class name and
     *     the modifier.
     */
    goog.getCssName = function (className, opt_modifier) {
      var getMapping = function getMapping(cssName) {
        return goog.cssNameMapping_[cssName] || cssName;
      };

      var renameByParts = function renameByParts(cssName) {
        // Remap all the parts individually.
        var parts = cssName.split('-');
        var mapped = [];
        for (var i = 0; i < parts.length; i++) {
          mapped.push(getMapping(parts[i]));
        }
        return mapped.join('-');
      };

      var rename;
      if (goog.cssNameMapping_) {
        rename = goog.cssNameMappingStyle_ == 'BY_WHOLE' ? getMapping : renameByParts;
      } else {
        rename = function rename(a) {
          return a;
        };
      }

      if (opt_modifier) {
        return className + '-' + rename(opt_modifier);
      } else {
        return rename(className);
      }
    };

    /**
     * Sets the map to check when returning a value from goog.getCssName(). Example:
     * <pre>
     * goog.setCssNameMapping({
     *   "goog": "a",
     *   "disabled": "b",
     * });
     *
     * var x = goog.getCssName('goog');
     * // The following evaluates to: "a a-b".
     * goog.getCssName('goog') + ' ' + goog.getCssName(x, 'disabled')
     * </pre>
     * When declared as a map of string literals to string literals, the JSCompiler
     * will replace all calls to goog.getCssName() using the supplied map if the
     * --process_closure_primitives flag is set.
     *
     * @param {!Object} mapping A map of strings to strings where keys are possible
     *     arguments to goog.getCssName() and values are the corresponding values
     *     that should be returned.
     * @param {string=} opt_style The style of css name mapping. There are two valid
     *     options: 'BY_PART', and 'BY_WHOLE'.
     * @see goog.getCssName for a description.
     */
    goog.setCssNameMapping = function (mapping, opt_style) {
      goog.cssNameMapping_ = mapping;
      goog.cssNameMappingStyle_ = opt_style;
    };

    /**
     * To use CSS renaming in compiled mode, one of the input files should have a
     * call to goog.setCssNameMapping() with an object literal that the JSCompiler
     * can extract and use to replace all calls to goog.getCssName(). In uncompiled
     * mode, JavaScript code should be loaded before this base.js file that declares
     * a global variable, CLOSURE_CSS_NAME_MAPPING, which is used below. This is
     * to ensure that the mapping is loaded before any calls to goog.getCssName()
     * are made in uncompiled mode.
     *
     * A hook for overriding the CSS name mapping.
     * @type {!Object<string, string>|undefined}
     */
    goog.global.CLOSURE_CSS_NAME_MAPPING;

    if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
      // This does not call goog.setCssNameMapping() because the JSCompiler
      // requires that goog.setCssNameMapping() be called with an object literal.
      goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
    }

    /**
     * Gets a localized message.
     *
     * This function is a compiler primitive. If you give the compiler a localized
     * message bundle, it will replace the string at compile-time with a localized
     * version, and expand goog.getMsg call to a concatenated string.
     *
     * Messages must be initialized in the form:
     * <code>
     * var MSG_NAME = goog.getMsg('Hello {$placeholder}', {'placeholder': 'world'});
     * </code>
     *
     * @param {string} str Translatable string, places holders in the form {$foo}.
     * @param {Object<string, string>=} opt_values Maps place holder name to value.
     * @return {string} message with placeholders filled.
     */
    goog.getMsg = function (str, opt_values) {
      if (opt_values) {
        str = str.replace(/\{\$([^}]+)}/g, function (match, key) {
          return opt_values != null && key in opt_values ? opt_values[key] : match;
        });
      }
      return str;
    };

    /**
     * Gets a localized message. If the message does not have a translation, gives a
     * fallback message.
     *
     * This is useful when introducing a new message that has not yet been
     * translated into all languages.
     *
     * This function is a compiler primitive. Must be used in the form:
     * <code>var x = goog.getMsgWithFallback(MSG_A, MSG_B);</code>
     * where MSG_A and MSG_B were initialized with goog.getMsg.
     *
     * @param {string} a The preferred message.
     * @param {string} b The fallback message.
     * @return {string} The best translated message.
     */
    goog.getMsgWithFallback = function (a, b) {
      return a;
    };

    /**
     * Exposes an unobfuscated global namespace path for the given object.
     * Note that fields of the exported object *will* be obfuscated, unless they are
     * exported in turn via this function or goog.exportProperty.
     *
     * Also handy for making public items that are defined in anonymous closures.
     *
     * ex. goog.exportSymbol('public.path.Foo', Foo);
     *
     * ex. goog.exportSymbol('public.path.Foo.staticFunction', Foo.staticFunction);
     *     public.path.Foo.staticFunction();
     *
     * ex. goog.exportSymbol('public.path.Foo.prototype.myMethod',
     *                       Foo.prototype.myMethod);
     *     new public.path.Foo().myMethod();
     *
     * @param {string} publicPath Unobfuscated name to export.
     * @param {*} object Object the name should point to.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is goog.global.
     */
    goog.exportSymbol = function (publicPath, object, opt_objectToExportTo) {
      goog.exportPath_(publicPath, object, opt_objectToExportTo);
    };

    /**
     * Exports a property unobfuscated into the object's namespace.
     * ex. goog.exportProperty(Foo, 'staticFunction', Foo.staticFunction);
     * ex. goog.exportProperty(Foo.prototype, 'myMethod', Foo.prototype.myMethod);
     * @param {Object} object Object whose static property is being exported.
     * @param {string} publicName Unobfuscated name to export.
     * @param {*} symbol Object the name should point to.
     */
    goog.exportProperty = function (object, publicName, symbol) {
      object[publicName] = symbol;
    };

    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * Usage:
     * <pre>
     * function ParentClass(a, b) { }
     * ParentClass.prototype.foo = function(a) { };
     *
     * function ChildClass(a, b, c) {
     *   ChildClass.base(this, 'constructor', a, b);
     * }
     * goog.inherits(ChildClass, ParentClass);
     *
     * var child = new ChildClass('a', 'b', 'see');
     * child.foo(); // This works.
     * </pre>
     *
     * @param {!Function} childCtor Child class.
     * @param {!Function} parentCtor Parent class.
     */
    goog.inherits = function (childCtor, parentCtor) {
      /** @constructor */
      function tempCtor() {}
      tempCtor.prototype = parentCtor.prototype;
      childCtor.superClass_ = parentCtor.prototype;
      childCtor.prototype = new tempCtor();
      /** @override */
      childCtor.prototype.constructor = childCtor;

      /**
       * Calls superclass constructor/method.
       *
       * This function is only available if you use goog.inherits to
       * express inheritance relationships between classes.
       *
       * NOTE: This is a replacement for goog.base and for superClass_
       * property defined in childCtor.
       *
       * @param {!Object} me Should always be "this".
       * @param {string} methodName The method name to call. Calling
       *     superclass constructor can be done with the special string
       *     'constructor'.
       * @param {...*} var_args The arguments to pass to superclass
       *     method/constructor.
       * @return {*} The return value of the superclass method/constructor.
       */
      childCtor.base = function (me, methodName, var_args) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var args = new Array(arguments.length - 2);
        for (var i = 2; i < arguments.length; i++) {
          args[i - 2] = arguments[i];
        }
        return parentCtor.prototype[methodName].apply(me, args);
      };
    };

    /**
     * Call up to the superclass.
     *
     * If this is called from a constructor, then this calls the superclass
     * constructor with arguments 1-N.
     *
     * If this is called from a prototype method, then you must pass the name of the
     * method as the second argument to this function. If you do not, you will get a
     * runtime error. This calls the superclass' method with arguments 2-N.
     *
     * This function only works if you use goog.inherits to express inheritance
     * relationships between your classes.
     *
     * This function is a compiler primitive. At compile-time, the compiler will do
     * macro expansion to remove a lot of the extra overhead that this function
     * introduces. The compiler will also enforce a lot of the assumptions that this
     * function makes, and treat it as a compiler error if you break them.
     *
     * @param {!Object} me Should always be "this".
     * @param {*=} opt_methodName The method name if calling a super method.
     * @param {...*} var_args The rest of the arguments.
     * @return {*} The return value of the superclass method.
     * @suppress {es5Strict} This method can not be used in strict mode, but
     *     all Closure Library consumers must depend on this file.
     */
    goog.base = function (me, opt_methodName, var_args) {
      var caller = arguments.callee.caller;

      if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
        throw Error('arguments.caller not defined.  goog.base() cannot be used ' + 'with strict mode code. See ' + 'http://www.ecma-international.org/ecma-262/5.1/#sec-C');
      }

      if (caller.superClass_) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var ctorArgs = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++) {
          ctorArgs[i - 1] = arguments[i];
        }
        // This is a constructor. Call the superclass constructor.
        return caller.superClass_.constructor.apply(me, ctorArgs);
      }

      // Copying using loop to avoid deop due to passing arguments object to
      // function. This is faster in many JS engines as of late 2014.
      var args = new Array(arguments.length - 2);
      for (var i = 2; i < arguments.length; i++) {
        args[i - 2] = arguments[i];
      }
      var foundCaller = false;
      for (var ctor = me.constructor; ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
          foundCaller = true;
        } else if (foundCaller) {
          return ctor.prototype[opt_methodName].apply(me, args);
        }
      }

      // If we did not find the caller in the prototype chain, then one of two
      // things happened:
      // 1) The caller is an instance method.
      // 2) This method was not called by the right caller.
      if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
      } else {
        throw Error('goog.base called from a method of one name ' + 'to a method of a different name');
      }
    };

    /**
     * Allow for aliasing within scope functions.  This function exists for
     * uncompiled code - in compiled code the calls will be inlined and the aliases
     * applied.  In uncompiled code the function is simply run since the aliases as
     * written are valid JavaScript.
     *
     *
     * @param {function()} fn Function to call.  This function can contain aliases
     *     to namespaces (e.g. "var dom = goog.dom") or classes
     *     (e.g. "var Timer = goog.Timer").
     */
    goog.scope = function (fn) {
      fn.call(goog.global);
    };

    /*
     * To support uncompiled, strict mode bundles that use eval to divide source
     * like so:
     *    eval('someSource;//# sourceUrl sourcefile.js');
     * We need to export the globally defined symbols "goog" and "COMPILED".
     * Exporting "goog" breaks the compiler optimizations, so we required that
     * be defined externally.
     * NOTE: We don't use goog.exportSymbol here because we don't want to trigger
     * extern generation when that compiler option is enabled.
     */
    if (!COMPILED) {
      goog.global['COMPILED'] = COMPILED;
    }

    goog.provide('goog.string');

    /**
     * Does simple python-style string substitution.
     * subs("foo%s hot%s", "bar", "dog") becomes "foobar hotdog".
     * @param {string} str The string containing the pattern.
     * @param {...*} var_args The items to substitute into the pattern.
     * @return {string} A copy of {@code str} in which each occurrence of
     *     {@code %s} has been replaced an argument from {@code var_args}.
     */
    goog.string.subs = function (str, var_args) {
      var splitParts = str.split('%s');
      var returnString = '';

      var subsArguments = Array.prototype.slice.call(arguments, 1);
      while (subsArguments.length &&
      // Replace up to the last split part. We are inserting in the
      // positions between split parts.
      splitParts.length > 1) {
        returnString += splitParts.shift() + subsArguments.shift();
      }

      return returnString + splitParts.join('%s'); // Join unused '%s'
    };

    /**
     * Regular expression that matches an ampersand, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.AMP_RE_ = /&/g;

    /**
     * Regular expression that matches a less than sign, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.LT_RE_ = /</g;

    /**
     * Regular expression that matches a greater than sign, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.GT_RE_ = />/g;

    /**
     * Regular expression that matches a double quote, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.QUOT_RE_ = /"/g;

    /**
     * Regular expression that matches a single quote, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.SINGLE_QUOTE_RE_ = /'/g;

    /**
     * Regular expression that matches null character, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.NULL_RE_ = /\x00/g;

    /**
     * Regular expression that matches a lowercase letter "e", for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.E_RE_ = /e/g;

    /**
     * Regular expression that matches any character that needs to be escaped.
     * @const {!RegExp}
     * @private
     */
    goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;

    /**
     * Unescapes an HTML string.
     *
     * @param {string} str The string to unescape.
     * @return {string} An unescaped copy of {@code str}.
     */
    goog.string.unescapeEntities = function (str) {
      if (goog.string.contains(str, '&')) {
        // We are careful not to use a DOM if we do not have one or we explicitly
        // requested non-DOM html unescaping.
        if (!goog.string.FORCE_NON_DOM_HTML_UNESCAPING && 'document' in goog.global) {
          return goog.string.unescapeEntitiesUsingDom_(str);
        } else {
          // Fall back on pure XML entities
          return goog.string.unescapePureXmlEntities_(str);
        }
      }
      return str;
    };

    /**
     * Unescapes an HTML string using a DOM to resolve non-XML, non-numeric
     * entities. This function is XSS-safe and whitespace-preserving.
     * @private
     * @param {string} str The string to unescape.
     * @param {Document=} opt_document An optional document to use for creating
     *     elements. If this is not specified then the default window.document
     *     will be used.
     * @return {string} The unescaped {@code str} string.
     */
    goog.string.unescapeEntitiesUsingDom_ = function (str, opt_document) {
      /** @type {!Object<string, string>} */
      var seen = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' };
      var div;
      if (opt_document) {
        div = opt_document.createElement('div');
      } else {
        div = goog.global.document.createElement('div');
      }
      // Match as many valid entity characters as possible. If the actual entity
      // happens to be shorter, it will still work as innerHTML will return the
      // trailing characters unchanged. Since the entity characters do not include
      // open angle bracket, there is no chance of XSS from the innerHTML use.
      // Since no whitespace is passed to innerHTML, whitespace is preserved.
      return str.replace(goog.string.HTML_ENTITY_PATTERN_, function (s, entity) {
        // Check for cached entity.
        var value = seen[s];
        if (value) {
          return value;
        }
        // Check for numeric entity.
        if (entity.charAt(0) == '#') {
          // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex numbers.
          var n = Number('0' + entity.substr(1));
          if (!isNaN(n)) {
            value = String.fromCharCode(n);
          }
        }
        // Fall back to innerHTML otherwise.
        if (!value) {
          // Append a non-entity character to avoid a bug in Webkit that parses
          // an invalid entity at the end of innerHTML text as the empty string.
          div.innerHTML = s + ' ';
          // Then remove the trailing character from the result.
          value = div.firstChild.nodeValue.slice(0, -1);
        }
        // Cache and return.
        return seen[s] = value;
      });
    };

    /**
     * Unescapes XML entities.
     * @private
     * @param {string} str The string to unescape.
     * @return {string} An unescaped copy of {@code str}.
     */
    goog.string.unescapePureXmlEntities_ = function (str) {
      return str.replace(/&([^;]+);/g, function (s, entity) {
        switch (entity) {
          case 'amp':
            return '&';
          case 'lt':
            return '<';
          case 'gt':
            return '>';
          case 'quot':
            return '"';
          default:
            if (entity.charAt(0) == '#') {
              // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex.
              var n = Number('0' + entity.substr(1));
              if (!isNaN(n)) {
                return String.fromCharCode(n);
              }
            }
            // For invalid entities we just return the entity
            return s;
        }
      });
    };

    /**
     * Regular expression that matches an HTML entity.
     * See also HTML5: Tokenization / Tokenizing character references.
     * @private
     * @type {!RegExp}
     */
    goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;

    /**
     * Determines whether a string contains a substring.
     * @param {string} str The string to search.
     * @param {string} subString The substring to search for.
     * @return {boolean} Whether {@code str} contains {@code subString}.
     */
    goog.string.contains = function (str, subString) {
      return str.indexOf(subString) != -1;
    };

    /**
     * Escapes double quote '"' and single quote '\'' characters in addition to
     * '&', '<', and '>' so that a string can be included in an HTML tag attribute
     * value within double or single quotes.
     *
     * It should be noted that > doesn't need to be escaped for the HTML or XML to
     * be valid, but it has been decided to escape it for consistency with other
     * implementations.
     *
     * With goog.string.DETECT_DOUBLE_ESCAPING, this function escapes also the
     * lowercase letter "e".
     *
     * NOTE(user):
     * HtmlEscape is often called during the generation of large blocks of HTML.
     * Using statics for the regular expressions and strings is an optimization
     * that can more than half the amount of time IE spends in this function for
     * large apps, since strings and regexes both contribute to GC allocations.
     *
     * Testing for the presence of a character before escaping increases the number
     * of function calls, but actually provides a speed increase for the average
     * case -- since the average case often doesn't require the escaping of all 4
     * characters and indexOf() is much cheaper than replace().
     * The worst case does suffer slightly from the additional calls, therefore the
     * opt_isLikelyToContainHtmlChars option has been included for situations
     * where all 4 HTML entities are very likely to be present and need escaping.
     *
     * Some benchmarks (times tended to fluctuate +-0.05ms):
     *                                     FireFox                     IE6
     * (no chars / average (mix of cases) / all 4 chars)
     * no checks                     0.13 / 0.22 / 0.22         0.23 / 0.53 / 0.80
     * indexOf                       0.08 / 0.17 / 0.26         0.22 / 0.54 / 0.84
     * indexOf + re test             0.07 / 0.17 / 0.28         0.19 / 0.50 / 0.85
     *
     * An additional advantage of checking if replace actually needs to be called
     * is a reduction in the number of object allocations, so as the size of the
     * application grows the difference between the various methods would increase.
     *
     * @param {string} str string to be escaped.
     * @param {boolean=} opt_isLikelyToContainHtmlChars Don't perform a check to see
     *     if the character needs replacing - use this option if you expect each of
     *     the characters to appear often. Leave false if you expect few html
     *     characters to occur in your strings, such as if you are escaping HTML.
     * @return {string} An escaped copy of {@code str}.
     */
    goog.string.htmlEscape = function (str, opt_isLikelyToContainHtmlChars) {

      if (opt_isLikelyToContainHtmlChars) {
        str = str.replace(goog.string.AMP_RE_, '&amp;').replace(goog.string.LT_RE_, '&lt;').replace(goog.string.GT_RE_, '&gt;').replace(goog.string.QUOT_RE_, '&quot;').replace(goog.string.SINGLE_QUOTE_RE_, '&#39;').replace(goog.string.NULL_RE_, '&#0;');
        if (goog.string.DETECT_DOUBLE_ESCAPING) {
          str = str.replace(goog.string.E_RE_, '&#101;');
        }
        return str;
      } else {
        // quick test helps in the case when there are no chars to replace, in
        // worst case this makes barely a difference to the time taken
        if (!goog.string.ALL_RE_.test(str)) return str;

        // str.indexOf is faster than regex.test in this case
        if (str.indexOf('&') != -1) {
          str = str.replace(goog.string.AMP_RE_, '&amp;');
        }
        if (str.indexOf('<') != -1) {
          str = str.replace(goog.string.LT_RE_, '&lt;');
        }
        if (str.indexOf('>') != -1) {
          str = str.replace(goog.string.GT_RE_, '&gt;');
        }
        if (str.indexOf('"') != -1) {
          str = str.replace(goog.string.QUOT_RE_, '&quot;');
        }
        if (str.indexOf('\'') != -1) {
          str = str.replace(goog.string.SINGLE_QUOTE_RE_, '&#39;');
        }
        if (str.indexOf('\x00') != -1) {
          str = str.replace(goog.string.NULL_RE_, '&#0;');
        }
        if (goog.string.DETECT_DOUBLE_ESCAPING && str.indexOf('e') != -1) {
          str = str.replace(goog.string.E_RE_, '&#101;');
        }
        return str;
      }
    };

    goog.debug = {};

    /**
     * Returns the type of a value. If a constructor is passed, and a suitable
     * string cannot be found, 'unknown type name' will be returned.
     *
     * <p>Forked rather than moved from {@link goog.asserts.getType_}
     * to avoid adding a dependency to goog.asserts.
     * @param {*} value A constructor, object, or primitive.
     * @return {string} The best display name for the value, or 'unknown type name'.
     */
    goog.debug.runtimeType = function (value) {
      if (value instanceof Function) {
        return value.displayName || value.name || 'unknown type name';
      } else if (value instanceof Object) {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } else {
        return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      }
    };

    // Copyright 2009 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Provides a base class for custom Error objects such that the
     * stack is correctly maintained.
     *
     * You should never need to throw goog.debug.Error(msg) directly, Error(msg) is
     * sufficient.
     *
     */

    /**
     * Base class for custom error objects.
     * @param {*=} opt_msg The message associated with the error.
     * @constructor
     * @extends {Error}
     */
    goog.debug.Error = function (opt_msg) {

      // Attempt to ensure there is a stack trace.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, goog.debug.Error);
      } else {
        var stack = new Error().stack;
        if (stack) {
          this.stack = stack;
        }
      }

      if (opt_msg) {
        this.message = String(opt_msg);
      }

      /**
       * Whether to report this error to the server. Setting this to false will
       * cause the error reporter to not report the error back to the server,
       * which can be useful if the client knows that the error has already been
       * logged on the server.
       * @type {boolean}
       */
      this.reportErrorToServer = true;
    };
    goog.inherits(goog.debug.Error, Error);

    /** @override */
    goog.debug.Error.prototype.name = 'CustomError';

    /**
     * @fileoverview Definition of goog.dom.NodeType.
     */

    goog.dom = {};

    /**
     * Constants for the nodeType attribute in the Node interface.
     *
     * These constants match those specified in the Node interface. These are
     * usually present on the Node object in recent browsers, but not in older
     * browsers (specifically, early IEs) and thus are given here.
     *
     * In some browsers (early IEs), these are not defined on the Node object,
     * so they are provided here.
     *
     * See http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1950641247
     * @enum {number}
     */
    goog.dom.NodeType = {
      ELEMENT: 1,
      ATTRIBUTE: 2,
      TEXT: 3,
      CDATA_SECTION: 4,
      ENTITY_REFERENCE: 5,
      ENTITY: 6,
      PROCESSING_INSTRUCTION: 7,
      COMMENT: 8,
      DOCUMENT: 9,
      DOCUMENT_TYPE: 10,
      DOCUMENT_FRAGMENT: 11,
      NOTATION: 12
    };

    // Copyright 2007 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Utility functions for supporting Bidi issues.
     */

    /**
     * Namespace for bidi supporting functions.
     */
    goog.provide('goog.i18n.bidi');
    goog.provide('goog.i18n.bidi.Dir');
    goog.provide('goog.i18n.bidi.DirectionalString');
    goog.provide('goog.i18n.bidi.Format');

    /**
     * @define {boolean} FORCE_RTL forces the {@link goog.i18n.bidi.IS_RTL} constant
     * to say that the current locale is a RTL locale.  This should only be used
     * if you want to override the default behavior for deciding whether the
     * current locale is RTL or not.
     *
     * {@see goog.i18n.bidi.IS_RTL}
     */
    goog.define('goog.i18n.bidi.FORCE_RTL', false);

    /**
     * Constant that defines whether or not the current locale is a RTL locale.
     * If {@link goog.i18n.bidi.FORCE_RTL} is not true, this constant will default
     * to check that {@link goog.LOCALE} is one of a few major RTL locales.
     *
     * <p>This is designed to be a maximally efficient compile-time constant. For
     * example, for the default goog.LOCALE, compiling
     * "if (goog.i18n.bidi.IS_RTL) alert('rtl') else {}" should produce no code. It
     * is this design consideration that limits the implementation to only
     * supporting a few major RTL locales, as opposed to the broader repertoire of
     * something like goog.i18n.bidi.isRtlLanguage.
     *
     * <p>Since this constant refers to the directionality of the locale, it is up
     * to the caller to determine if this constant should also be used for the
     * direction of the UI.
     *
     * {@see goog.LOCALE}
     *
     * @type {boolean}
     *
     * TODO(user): write a test that checks that this is a compile-time constant.
     */
    goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || (goog.LOCALE.substring(0, 2).toLowerCase() == 'ar' || goog.LOCALE.substring(0, 2).toLowerCase() == 'fa' || goog.LOCALE.substring(0, 2).toLowerCase() == 'he' || goog.LOCALE.substring(0, 2).toLowerCase() == 'iw' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ps' || goog.LOCALE.substring(0, 2).toLowerCase() == 'sd' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ug' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ur' || goog.LOCALE.substring(0, 2).toLowerCase() == 'yi') && (goog.LOCALE.length == 2 || goog.LOCALE.substring(2, 3) == '-' || goog.LOCALE.substring(2, 3) == '_') || goog.LOCALE.length >= 3 && goog.LOCALE.substring(0, 3).toLowerCase() == 'ckb' && (goog.LOCALE.length == 3 || goog.LOCALE.substring(3, 4) == '-' || goog.LOCALE.substring(3, 4) == '_');

    /**
     * Unicode formatting characters and directionality string constants.
     * @enum {string}
     */
    goog.i18n.bidi.Format = {
      /** Unicode "Left-To-Right Embedding" (LRE) character. */
      LRE: '\u202A',
      /** Unicode "Right-To-Left Embedding" (RLE) character. */
      RLE: '\u202B',
      /** Unicode "Pop Directional Formatting" (PDF) character. */
      PDF: '\u202C',
      /** Unicode "Left-To-Right Mark" (LRM) character. */
      LRM: '\u200E',
      /** Unicode "Right-To-Left Mark" (RLM) character. */
      RLM: '\u200F'
    };

    /**
     * Directionality enum.
     * @enum {number}
     */
    goog.i18n.bidi.Dir = {
      /**
       * Left-to-right.
       */
      LTR: 1,

      /**
       * Right-to-left.
       */
      RTL: -1,

      /**
       * Neither left-to-right nor right-to-left.
       */
      NEUTRAL: 0
    };

    /**
     * 'right' string constant.
     * @type {string}
     */
    goog.i18n.bidi.RIGHT = 'right';

    /**
     * 'left' string constant.
     * @type {string}
     */
    goog.i18n.bidi.LEFT = 'left';

    /**
     * 'left' if locale is RTL, 'right' if not.
     * @type {string}
     */
    goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;

    /**
     * 'right' if locale is RTL, 'left' if not.
     * @type {string}
     */
    goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;

    /**
     * Convert a directionality given in various formats to a goog.i18n.bidi.Dir
     * constant. Useful for interaction with different standards of directionality
     * representation.
     *
     * @param {goog.i18n.bidi.Dir|number|boolean|null} givenDir Directionality given
     *     in one of the following formats:
     *     1. A goog.i18n.bidi.Dir constant.
     *     2. A number (positive = LTR, negative = RTL, 0 = neutral).
     *     3. A boolean (true = RTL, false = LTR).
     *     4. A null for unknown directionality.
     * @param {boolean=} opt_noNeutral Whether a givenDir of zero or
     *     goog.i18n.bidi.Dir.NEUTRAL should be treated as null, i.e. unknown, in
     *     order to preserve legacy behavior.
     * @return {?goog.i18n.bidi.Dir} A goog.i18n.bidi.Dir constant matching the
     *     given directionality. If given null, returns null (i.e. unknown).
     */
    goog.i18n.bidi.toDir = function (givenDir, opt_noNeutral) {
      if (typeof givenDir == 'number') {
        // This includes the non-null goog.i18n.bidi.Dir case.
        return givenDir > 0 ? goog.i18n.bidi.Dir.LTR : givenDir < 0 ? goog.i18n.bidi.Dir.RTL : opt_noNeutral ? null : goog.i18n.bidi.Dir.NEUTRAL;
      } else if (givenDir == null) {
        return null;
      } else {
        // Must be typeof givenDir == 'boolean'.
        return givenDir ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
      }
    };

    /**
     * A practical pattern to identify strong LTR characters. This pattern is not
     * theoretically correct according to the Unicode standard. It is simplified for
     * performance and small code size.
     * @type {string}
     * @private
     */
    goog.i18n.bidi.ltrChars_ = 'A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u200E\u2C00-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF';

    /**
     * A practical pattern to identify strong RTL character. This pattern is not
     * theoretically correct according to the Unicode standard. It is simplified
     * for performance and small code size.
     * @type {string}
     * @private
     */
    goog.i18n.bidi.rtlChars_ = '\u0591-\u06EF\u06FA-\u07FF\u200F\uFB1D-\uFDFF\uFE70-\uFEFC';

    /**
     * Simplified regular expression for an HTML tag (opening or closing) or an HTML
     * escape. We might want to skip over such expressions when estimating the text
     * directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;

    /**
     * Returns the input text with spaces instead of HTML tags or HTML escapes, if
     * opt_isStripNeeded is true. Else returns the input as is.
     * Useful for text directionality estimation.
     * Note: the function should not be used in other contexts; it is not 100%
     * correct, but rather a good-enough implementation for directionality
     * estimation purposes.
     * @param {string} str The given string.
     * @param {boolean=} opt_isStripNeeded Whether to perform the stripping.
     *     Default: false (to retain consistency with calling functions).
     * @return {string} The given string cleaned of HTML tags / escapes.
     * @private
     */
    goog.i18n.bidi.stripHtmlIfNeeded_ = function (str, opt_isStripNeeded) {
      return opt_isStripNeeded ? str.replace(goog.i18n.bidi.htmlSkipReg_, '') : str;
    };

    /**
     * Regular expression to check for RTL characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlCharReg_ = new RegExp('[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Regular expression to check for LTR characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrCharReg_ = new RegExp('[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Test whether the given string has any RTL characters in it.
     * @param {string} str The given string that need to be tested.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether the string contains RTL characters.
     */
    goog.i18n.bidi.hasAnyRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Test whether the given string has any RTL characters in it.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the string contains RTL characters.
     * @deprecated Use hasAnyRtl.
     */
    goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;

    /**
     * Test whether the given string has any LTR characters in it.
     * @param {string} str The given string that need to be tested.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether the string contains LTR characters.
     */
    goog.i18n.bidi.hasAnyLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Regular expression pattern to check if the first character in the string
     * is LTR.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrRe_ = new RegExp('^[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Regular expression pattern to check if the first character in the string
     * is RTL.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlRe_ = new RegExp('^[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Check if the first character in the string is RTL or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is an RTL char.
     */
    goog.i18n.bidi.isRtlChar = function (str) {
      return goog.i18n.bidi.rtlRe_.test(str);
    };

    /**
     * Check if the first character in the string is LTR or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is an LTR char.
     */
    goog.i18n.bidi.isLtrChar = function (str) {
      return goog.i18n.bidi.ltrRe_.test(str);
    };

    /**
     * Check if the first character in the string is neutral or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is a neutral char.
     */
    goog.i18n.bidi.isNeutralChar = function (str) {
      return !goog.i18n.bidi.isLtrChar(str) && !goog.i18n.bidi.isRtlChar(str);
    };

    /**
     * Regular expressions to check if a piece of text is of LTR directionality
     * on first character with strong directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrDirCheckRe_ = new RegExp('^[^' + goog.i18n.bidi.rtlChars_ + ']*[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Regular expressions to check if a piece of text is of RTL directionality
     * on first character with strong directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlDirCheckRe_ = new RegExp('^[^' + goog.i18n.bidi.ltrChars_ + ']*[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Check whether the first strongly directional character (if any) is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL directionality is detected using the first
     *     strongly-directional character method.
     */
    goog.i18n.bidi.startsWithRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check whether the first strongly directional character (if any) is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL directionality is detected using the first
     *     strongly-directional character method.
     * @deprecated Use startsWithRtl.
     */
    goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;

    /**
     * Check whether the first strongly directional character (if any) is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR directionality is detected using the first
     *     strongly-directional character method.
     */
    goog.i18n.bidi.startsWithLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check whether the first strongly directional character (if any) is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR directionality is detected using the first
     *     strongly-directional character method.
     * @deprecated Use startsWithLtr.
     */
    goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;

    /**
     * Regular expression to check if a string looks like something that must
     * always be LTR even in RTL text, e.g. a URL. When estimating the
     * directionality of text containing these, we treat these as weakly LTR,
     * like numbers.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;

    /**
     * Check whether the input string either contains no strongly directional
     * characters or looks like a url.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether neutral directionality is detected.
     */
    goog.i18n.bidi.isNeutralText = function (str, opt_isHtml) {
      str = goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml);
      return goog.i18n.bidi.isRequiredLtrRe_.test(str) || !goog.i18n.bidi.hasAnyLtr(str) && !goog.i18n.bidi.hasAnyRtl(str);
    };

    /**
     * Regular expressions to check if the last strongly-directional character in a
     * piece of text is LTR.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp('[' + goog.i18n.bidi.ltrChars_ + '][^' + goog.i18n.bidi.rtlChars_ + ']*$');

    /**
     * Regular expressions to check if the last strongly-directional character in a
     * piece of text is RTL.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp('[' + goog.i18n.bidi.rtlChars_ + '][^' + goog.i18n.bidi.ltrChars_ + ']*$');

    /**
     * Check if the exit directionality a piece of text is LTR, i.e. if the last
     * strongly-directional character in the string is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR exit directionality was detected.
     */
    goog.i18n.bidi.endsWithLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check if the exit directionality a piece of text is LTR, i.e. if the last
     * strongly-directional character in the string is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR exit directionality was detected.
     * @deprecated Use endsWithLtr.
     */
    goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;

    /**
     * Check if the exit directionality a piece of text is RTL, i.e. if the last
     * strongly-directional character in the string is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL exit directionality was detected.
     */
    goog.i18n.bidi.endsWithRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check if the exit directionality a piece of text is RTL, i.e. if the last
     * strongly-directional character in the string is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL exit directionality was detected.
     * @deprecated Use endsWithRtl.
     */
    goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;

    /**
     * A regular expression for matching right-to-left language codes.
     * See {@link #isRtlLanguage} for the design.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlLocalesRe_ = new RegExp('^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|' + '.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))' + '(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)', 'i');

    /**
     * Check if a BCP 47 / III language code indicates an RTL language, i.e. either:
     * - a language code explicitly specifying one of the right-to-left scripts,
     *   e.g. "az-Arab", or<p>
     * - a language code specifying one of the languages normally written in a
     *   right-to-left script, e.g. "fa" (Farsi), except ones explicitly specifying
     *   Latin or Cyrillic script (which are the usual LTR alternatives).<p>
     * The list of right-to-left scripts appears in the 100-199 range in
     * http://www.unicode.org/iso15924/iso15924-num.html, of which Arabic and
     * Hebrew are by far the most widely used. We also recognize Thaana, N'Ko, and
     * Tifinagh, which also have significant modern usage. The rest (Syriac,
     * Samaritan, Mandaic, etc.) seem to have extremely limited or no modern usage
     * and are not recognized to save on code size.
     * The languages usually written in a right-to-left script are taken as those
     * with Suppress-Script: Hebr|Arab|Thaa|Nkoo|Tfng  in
     * http://www.iana.org/assignments/language-subtag-registry,
     * as well as Central (or Sorani) Kurdish (ckb), Sindhi (sd) and Uyghur (ug).
     * Other subtags of the language code, e.g. regions like EG (Egypt), are
     * ignored.
     * @param {string} lang BCP 47 (a.k.a III) language code.
     * @return {boolean} Whether the language code is an RTL language.
     */
    goog.i18n.bidi.isRtlLanguage = function (lang) {
      return goog.i18n.bidi.rtlLocalesRe_.test(lang);
    };

    /**
     * Regular expression for bracket guard replacement in text.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;

    /**
     * Apply bracket guard using LRM and RLM. This is to address the problem of
     * messy bracket display frequently happens in RTL layout.
     * This function works for plain text, not for HTML. In HTML, the opening
     * bracket might be in a different context than the closing bracket (such as
     * an attribute value).
     * @param {string} s The string that need to be processed.
     * @param {boolean=} opt_isRtlContext specifies default direction (usually
     *     direction of the UI).
     * @return {string} The processed string, with all bracket guarded.
     */
    goog.i18n.bidi.guardBracketInText = function (s, opt_isRtlContext) {
      var useRtl = opt_isRtlContext === undefined ? goog.i18n.bidi.hasAnyRtl(s) : opt_isRtlContext;
      var mark = useRtl ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
      return s.replace(goog.i18n.bidi.bracketGuardTextRe_, mark + '$&' + mark);
    };

    /**
     * Enforce the html snippet in RTL directionality regardless overall context.
     * If the html piece was enclosed by tag, dir will be applied to existing
     * tag, otherwise a span tag will be added as wrapper. For this reason, if
     * html snippet start with with tag, this tag must enclose the whole piece. If
     * the tag already has a dir specified, this new one will override existing
     * one in behavior (tested on FF and IE).
     * @param {string} html The string that need to be processed.
     * @return {string} The processed string, with directionality enforced to RTL.
     */
    goog.i18n.bidi.enforceRtlInHtml = function (html) {
      if (html.charAt(0) == '<') {
        return html.replace(/<\w+/, '$& dir=rtl');
      }
      // '\n' is important for FF so that it won't incorrectly merge span groups
      return '\n<span dir=rtl>' + html + '</span>';
    };

    /**
     * Enforce RTL on both end of the given text piece using unicode BiDi formatting
     * characters RLE and PDF.
     * @param {string} text The piece of text that need to be wrapped.
     * @return {string} The wrapped string after process.
     */
    goog.i18n.bidi.enforceRtlInText = function (text) {
      return goog.i18n.bidi.Format.RLE + text + goog.i18n.bidi.Format.PDF;
    };

    /**
     * Enforce the html snippet in RTL directionality regardless overall context.
     * If the html piece was enclosed by tag, dir will be applied to existing
     * tag, otherwise a span tag will be added as wrapper. For this reason, if
     * html snippet start with with tag, this tag must enclose the whole piece. If
     * the tag already has a dir specified, this new one will override existing
     * one in behavior (tested on FF and IE).
     * @param {string} html The string that need to be processed.
     * @return {string} The processed string, with directionality enforced to RTL.
     */
    goog.i18n.bidi.enforceLtrInHtml = function (html) {
      if (html.charAt(0) == '<') {
        return html.replace(/<\w+/, '$& dir=ltr');
      }
      // '\n' is important for FF so that it won't incorrectly merge span groups
      return '\n<span dir=ltr>' + html + '</span>';
    };

    /**
     * Enforce LTR on both end of the given text piece using unicode BiDi formatting
     * characters LRE and PDF.
     * @param {string} text The piece of text that need to be wrapped.
     * @return {string} The wrapped string after process.
     */
    goog.i18n.bidi.enforceLtrInText = function (text) {
      return goog.i18n.bidi.Format.LRE + text + goog.i18n.bidi.Format.PDF;
    };

    /**
     * Regular expression to find dimensions such as "padding: .3 0.4ex 5px 6;"
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;

    /**
     * Regular expression for left.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.leftRe_ = /left/gi;

    /**
     * Regular expression for right.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rightRe_ = /right/gi;

    /**
     * Placeholder regular expression for swapping.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.tempRe_ = /%%%%/g;

    /**
     * Swap location parameters and 'left'/'right' in CSS specification. The
     * processed string will be suited for RTL layout. Though this function can
     * cover most cases, there are always exceptions. It is suggested to put
     * those exceptions in separate group of CSS string.
     * @param {string} cssStr CSS spefication string.
     * @return {string} Processed CSS specification string.
     */
    goog.i18n.bidi.mirrorCSS = function (cssStr) {
      return cssStr.
      // reverse dimensions
      replace(goog.i18n.bidi.dimensionsRe_, ':$1 $4 $3 $2').replace(goog.i18n.bidi.leftRe_, '%%%%'). // swap left and right
      replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
    };

    /**
     * Regular expression for hebrew double quote substitution, finding quote
     * directly after hebrew characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;

    /**
     * Regular expression for hebrew single quote substitution, finding quote
     * directly after hebrew characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;

    /**
     * Replace the double and single quote directly after a Hebrew character with
     * GERESH and GERSHAYIM. In such case, most likely that's user intention.
     * @param {string} str String that need to be processed.
     * @return {string} Processed string with double/single quote replaced.
     */
    goog.i18n.bidi.normalizeHebrewQuote = function (str) {
      return str.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, '$1\u05F4').replace(goog.i18n.bidi.singleQuoteSubstituteRe_, '$1\u05F3');
    };

    /**
     * Regular expression to split a string into "words" for directionality
     * estimation based on relative word counts.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.wordSeparatorRe_ = /\s+/;

    /**
     * Regular expression to check if a string contains any numerals. Used to
     * differentiate between completely neutral strings and those containing
     * numbers, which are weakly LTR.
     *
     * Native Arabic digits (\u0660 - \u0669) are not included because although they
     * do flow left-to-right inside a number, this is the case even if the  overall
     * directionality is RTL, and a mathematical expression using these digits is
     * supposed to flow right-to-left overall, including unary plus and minus
     * appearing to the right of a number, and this does depend on the overall
     * directionality being RTL. The digits used in Farsi (\u06F0 - \u06F9), on the
     * other hand, are included, since Farsi math (including unary plus and minus)
     * does flow left-to-right.
     *
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;

    /**
     * This constant controls threshold of RTL directionality.
     * @type {number}
     * @private
     */
    goog.i18n.bidi.rtlDetectionThreshold_ = 0.40;

    /**
     * Estimates the directionality of a string based on relative word counts.
     * If the number of RTL words is above a certain percentage of the total number
     * of strongly directional words, returns RTL.
     * Otherwise, if any words are strongly or weakly LTR, returns LTR.
     * Otherwise, returns UNKNOWN, which is used to mean "neutral".
     * Numbers are counted as weakly LTR.
     * @param {string} str The string to be checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {goog.i18n.bidi.Dir} Estimated overall directionality of {@code str}.
     */
    goog.i18n.bidi.estimateDirection = function (str, opt_isHtml) {
      var rtlCount = 0;
      var totalCount = 0;
      var hasWeaklyLtr = false;
      var tokens = goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml).split(goog.i18n.bidi.wordSeparatorRe_);
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (goog.i18n.bidi.startsWithRtl(token)) {
          rtlCount++;
          totalCount++;
        } else if (goog.i18n.bidi.isRequiredLtrRe_.test(token)) {
          hasWeaklyLtr = true;
        } else if (goog.i18n.bidi.hasAnyLtr(token)) {
          totalCount++;
        } else if (goog.i18n.bidi.hasNumeralsRe_.test(token)) {
          hasWeaklyLtr = true;
        }
      }

      return totalCount == 0 ? hasWeaklyLtr ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : rtlCount / totalCount > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
    };

    /**
     * Check the directionality of a piece of text, return true if the piece of
     * text should be laid out in RTL direction.
     * @param {string} str The piece of text that need to be detected.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether this piece of text should be laid out in RTL.
     */
    goog.i18n.bidi.detectRtlDirectionality = function (str, opt_isHtml) {
      return goog.i18n.bidi.estimateDirection(str, opt_isHtml) == goog.i18n.bidi.Dir.RTL;
    };

    /**
     * Sets text input element's directionality and text alignment based on a
     * given directionality. Does nothing if the given directionality is unknown or
     * neutral.
     * @param {Element} element Input field element to set directionality to.
     * @param {goog.i18n.bidi.Dir|number|boolean|null} dir Desired directionality,
     *     given in one of the following formats:
     *     1. A goog.i18n.bidi.Dir constant.
     *     2. A number (positive = LRT, negative = RTL, 0 = neutral).
     *     3. A boolean (true = RTL, false = LTR).
     *     4. A null for unknown directionality.
     */
    goog.i18n.bidi.setElementDirAndAlign = function (element, dir) {
      if (element) {
        dir = goog.i18n.bidi.toDir(dir);
        if (dir) {
          element.style.textAlign = dir == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
          element.dir = dir == goog.i18n.bidi.Dir.RTL ? 'rtl' : 'ltr';
        }
      }
    };

    /**
     * Sets element dir based on estimated directionality of the given text.
     * @param {!Element} element
     * @param {string} text
     */
    goog.i18n.bidi.setElementDirByTextDirectionality = function (element, text) {
      switch (goog.i18n.bidi.estimateDirection(text)) {
        case goog.i18n.bidi.Dir.LTR:
          element.dir = 'ltr';
          break;
        case goog.i18n.bidi.Dir.RTL:
          element.dir = 'rtl';
          break;
        default:
          // Default for no direction, inherit from document.
          element.removeAttribute('dir');
      }
    };

    /**
     * Strings that have an (optional) known direction.
     *
     * Implementations of this interface are string-like objects that carry an
     * attached direction, if known.
     * @interface
     */
    goog.i18n.bidi.DirectionalString = function () {};

    /**
     * Interface marker of the DirectionalString interface.
     *
     * This property can be used to determine at runtime whether or not an object
     * implements this interface.  All implementations of this interface set this
     * property to {@code true}.
     * @type {boolean}
     */
    goog.i18n.bidi.DirectionalString.prototype.implementsGoogI18nBidiDirectionalString;

    /**
     * Retrieves this object's known direction (if any).
     * @return {?goog.i18n.bidi.Dir} The known direction. Null if unknown.
     */
    goog.i18n.bidi.DirectionalString.prototype.getDirection;

    /* jshint ignore:start */

    // Copyright 2008 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Utilities to check the preconditions, postconditions and
     * invariants runtime.
     *
     * Methods in this package should be given special treatment by the compiler
     * for type-inference. For example, <code>goog.asserts.assert(foo)</code>
     * will restrict <code>foo</code> to a truthy value.
     *
     * The compiler has an option to disable asserts. So code like:
     * <code>
     * var x = goog.asserts.assert(foo()); goog.asserts.assert(bar());
     * </code>
     * will be transformed into:
     * <code>
     * var x = foo();
     * </code>
     * The compiler will leave in foo() (because its return value is used),
     * but it will remove bar() because it assumes it does not have side-effects.
     *
     * @author agrieve@google.com (Andrew Grieve)
     */

    goog.provide('goog.asserts');

    /**
     * @define {boolean} Whether to strip out asserts or to leave them in.
     */
    goog.define('goog.asserts.ENABLE_ASSERTS', goog.DEBUG);

    /**
     * Error object for failed assertions.
     * @param {string} messagePattern The pattern that was used to form message.
     * @param {!Array<*>} messageArgs The items to substitute into the pattern.
     * @constructor
     * @extends {goog.debug.Error}
     * @final
     */
    goog.asserts.AssertionError = function (messagePattern, messageArgs) {
      messageArgs.unshift(messagePattern);
      goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
      // Remove the messagePattern afterwards to avoid permanently modifying the
      // passed in array.
      messageArgs.shift();

      /**
       * The message pattern used to format the error message. Error handlers can
       * use this to uniquely identify the assertion.
       * @type {string}
       */
      this.messagePattern = messagePattern;
    };
    goog.inherits(goog.asserts.AssertionError, goog.debug.Error);

    /** @override */
    goog.asserts.AssertionError.prototype.name = 'AssertionError';

    /**
     * The default error handler.
     * @param {!goog.asserts.AssertionError} e The exception to be handled.
     */
    goog.asserts.DEFAULT_ERROR_HANDLER = function (e) {
      throw e;
    };

    /**
     * The handler responsible for throwing or logging assertion errors.
     * @private {function(!goog.asserts.AssertionError)}
     */
    goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;

    /**
     * Throws an exception with the given message and "Assertion failed" prefixed
     * onto it.
     * @param {string} defaultMessage The message to use if givenMessage is empty.
     * @param {Array<*>} defaultArgs The substitution arguments for defaultMessage.
     * @param {string|undefined} givenMessage Message supplied by the caller.
     * @param {Array<*>} givenArgs The substitution arguments for givenMessage.
     * @throws {goog.asserts.AssertionError} When the value is not a number.
     * @private
     */
    goog.asserts.doAssertFailure_ = function (defaultMessage, defaultArgs, givenMessage, givenArgs) {
      var message = 'Assertion failed';
      if (givenMessage) {
        message += ': ' + givenMessage;
        var args = givenArgs;
      } else if (defaultMessage) {
        message += ': ' + defaultMessage;
        args = defaultArgs;
      }
      // The '' + works around an Opera 10 bug in the unit tests. Without it,
      // a stack trace is added to var message above. With this, a stack trace is
      // not added until this line (it causes the extra garbage to be added after
      // the assertion message instead of in the middle of it).
      var e = new goog.asserts.AssertionError('' + message, args || []);
      goog.asserts.errorHandler_(e);
    };

    /**
     * Sets a custom error handler that can be used to customize the behavior of
     * assertion failures, for example by turning all assertion failures into log
     * messages.
     * @param {function(!goog.asserts.AssertionError)} errorHandler
     */
    goog.asserts.setErrorHandler = function (errorHandler) {
      if (goog.asserts.ENABLE_ASSERTS) {
        goog.asserts.errorHandler_ = errorHandler;
      }
    };

    /**
     * Checks if the condition evaluates to true if goog.asserts.ENABLE_ASSERTS is
     * true.
     * @template T
     * @param {T} condition The condition to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {T} The value of the condition.
     * @throws {goog.asserts.AssertionError} When the condition evaluates to false.
     */
    goog.asserts.assert = function (condition, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !condition) {
        goog.asserts.doAssertFailure_('', null, opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return condition;
    };

    /**
     * Fails if goog.asserts.ENABLE_ASSERTS is true. This function is useful in case
     * when we want to add a check in the unreachable area like switch-case
     * statement:
     *
     * <pre>
     *  switch(type) {
     *    case FOO: doSomething(); break;
     *    case BAR: doSomethingElse(); break;
     *    default: goog.assert.fail('Unrecognized type: ' + type);
     *      // We have only 2 types - "default:" section is unreachable code.
     *  }
     * </pre>
     *
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @throws {goog.asserts.AssertionError} Failure.
     */
    goog.asserts.fail = function (opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS) {
        goog.asserts.errorHandler_(new goog.asserts.AssertionError('Failure' + (opt_message ? ': ' + opt_message : ''), Array.prototype.slice.call(arguments, 1)));
      }
    };

    /**
     * Checks if the value is a number if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {number} The value, guaranteed to be a number when asserts enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a number.
     */
    goog.asserts.assertNumber = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
        goog.asserts.doAssertFailure_('Expected number but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {number} */value
      );
    };

    /**
     * Checks if the value is a string if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {string} The value, guaranteed to be a string when asserts enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a string.
     */
    goog.asserts.assertString = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
        goog.asserts.doAssertFailure_('Expected string but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {string} */value
      );
    };

    /**
     * Checks if the value is a function if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Function} The value, guaranteed to be a function when asserts
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a function.
     */
    goog.asserts.assertFunction = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
        goog.asserts.doAssertFailure_('Expected function but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Function} */value
      );
    };

    /**
     * Checks if the value is an Object if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Object} The value, guaranteed to be a non-null object.
     * @throws {goog.asserts.AssertionError} When the value is not an object.
     */
    goog.asserts.assertObject = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
        goog.asserts.doAssertFailure_('Expected object but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Object} */value
      );
    };

    /**
     * Checks if the value is an Array if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Array<?>} The value, guaranteed to be a non-null array.
     * @throws {goog.asserts.AssertionError} When the value is not an array.
     */
    goog.asserts.assertArray = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
        goog.asserts.doAssertFailure_('Expected array but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Array<?>} */value
      );
    };

    /**
     * Checks if the value is a boolean if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {boolean} The value, guaranteed to be a boolean when asserts are
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a boolean.
     */
    goog.asserts.assertBoolean = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
        goog.asserts.doAssertFailure_('Expected boolean but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {boolean} */value
      );
    };

    /**
     * Checks if the value is a DOM Element if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Element} The value, likely to be a DOM Element when asserts are
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not an Element.
     */
    goog.asserts.assertElement = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != goog.dom.NodeType.ELEMENT)) {
        goog.asserts.doAssertFailure_('Expected Element but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Element} */value
      );
    };

    /**
     * Checks if the value is an instance of the user-defined type if
     * goog.asserts.ENABLE_ASSERTS is true.
     *
     * The compiler may tighten the type returned by this function.
     *
     * @param {?} value The value to check.
     * @param {function(new: T, ...)} type A user-defined constructor.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @throws {goog.asserts.AssertionError} When the value is not an instance of
     *     type.
     * @return {T}
     * @template T
     */
    goog.asserts.assertInstanceof = function (value, type, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
        goog.asserts.doAssertFailure_('Expected instanceof %s but got %s.', [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
      }
      return value;
    };

    /**
     * Checks that no enumerable keys are present in Object.prototype. Such keys
     * would break most code that use {@code for (var ... in ...)} loops.
     */
    goog.asserts.assertObjectPrototypeIsIntact = function () {
      for (var key in Object.prototype) {
        goog.asserts.fail(key + ' should not be enumerable in Object.prototype.');
      }
    };

    /**
     * Returns the type of a value. If a constructor is passed, and a suitable
     * string cannot be found, 'unknown type name' will be returned.
     * @param {*} value A constructor, object, or primitive.
     * @return {string} The best display name for the value, or 'unknown type name'.
     * @private
     */
    goog.asserts.getType_ = function (value) {
      if (value instanceof Function) {
        return value.displayName || value.name || 'unknown type name';
      } else if (value instanceof Object) {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } else {
        return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      }
    };

    /**
     * @fileoverview Utility for fast string concatenation.
     */

    /**
     * Utility class to facilitate string concatenation.
     *
     * @param {*=} opt_a1 Optional first initial item to append.
     * @param {...*} var_args Other initial items to
     *     append, e.g., new goog.string.StringBuffer('foo', 'bar').
     * @constructor
     */
    goog.string.StringBuffer = function (opt_a1, var_args) {
      if (opt_a1 != null) {
        this.append.apply(this, arguments);
      }
    };

    /**
     * Internal buffer for the string to be concatenated.
     * @type {string}
     * @private
     */
    goog.string.StringBuffer.prototype.buffer_ = '';

    /**
     * Sets the contents of the string buffer object, replacing what's currently
     * there.
     *
     * @param {*} s String to set.
     */
    goog.string.StringBuffer.prototype.set = function (s) {
      this.buffer_ = '' + s;
    };

    /**
     * Appends one or more items to the buffer.
     *
     * Calling this with null, undefined, or empty arguments is an error.
     *
     * @param {*} a1 Required first string.
     * @param {*=} opt_a2 Optional second string.
     * @param {...?} var_args Other items to append,
     *     e.g., sb.append('foo', 'bar', 'baz').
     * @return {!goog.string.StringBuffer} This same StringBuffer object.
     * @suppress {duplicate}
     */
    goog.string.StringBuffer.prototype.append = function (a1, opt_a2, var_args) {
      // Use a1 directly to avoid arguments instantiation for single-arg case.
      this.buffer_ += String(a1);
      if (opt_a2 != null) {
        // second argument is undefined (null == undefined)
        for (var i = 1; i < arguments.length; i++) {
          this.buffer_ += arguments[i];
        }
      }
      return this;
    };

    /**
     * Clears the internal buffer.
     */
    goog.string.StringBuffer.prototype.clear = function () {
      this.buffer_ = '';
    };

    /**
     * @return {number} the length of the current contents of the buffer.
     */
    goog.string.StringBuffer.prototype.getLength = function () {
      return this.buffer_.length;
    };

    /**
     * @return {string} The concatenated string.
     * @override
     */
    goog.string.StringBuffer.prototype.toString = function () {
      return this.buffer_;
    };

    // Copyright 2012 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Soy data primitives.
     *
     * The goal is to encompass data types used by Soy, especially to mark content
     * as known to be "safe".
     *
     * @author gboyer@google.com (Garrett Boyer)
     */

    goog.soy = {};
    goog.soy.data = {};

    /**
     * A type of textual content.
     *
     * This is an enum of type Object so that these values are unforgeable.
     *
     * @enum {!Object}
     */
    goog.soy.data.SanitizedContentKind = {

      /**
       * A snippet of HTML that does not start or end inside a tag, comment, entity,
       * or DOCTYPE; and that does not contain any executable code
       * (JS, {@code <object>}s, etc.) from a different trust domain.
       */
      HTML: goog.DEBUG ? { sanitizedContentKindHtml: true } : {},

      /**
       * Executable Javascript code or expression, safe for insertion in a
       * script-tag or event handler context, known to be free of any
       * attacker-controlled scripts. This can either be side-effect-free
       * Javascript (such as JSON) or Javascript that's entirely under Google's
       * control.
       */
      JS: goog.DEBUG ? { sanitizedContentJsChars: true } : {},

      /** A properly encoded portion of a URI. */
      URI: goog.DEBUG ? { sanitizedContentUri: true } : {},

      /** A resource URI not under attacker control. */
      TRUSTED_RESOURCE_URI: goog.DEBUG ? { sanitizedContentTrustedResourceUri: true } : {},

      /**
       * Repeated attribute names and values. For example,
       * {@code dir="ltr" foo="bar" onclick="trustedFunction()" checked}.
       */
      ATTRIBUTES: goog.DEBUG ? { sanitizedContentHtmlAttribute: true } : {},

      // TODO: Consider separating rules, declarations, and values into
      // separate types, but for simplicity, we'll treat explicitly blessed
      // SanitizedContent as allowed in all of these contexts.
      /**
       * A CSS3 declaration, property, value or group of semicolon separated
       * declarations.
       */
      CSS: goog.DEBUG ? { sanitizedContentCss: true } : {},

      /**
       * Unsanitized plain-text content.
       *
       * This is effectively the "null" entry of this enum, and is sometimes used
       * to explicitly mark content that should never be used unescaped. Since any
       * string is safe to use as text, being of ContentKind.TEXT makes no
       * guarantees about its safety in any other context such as HTML.
       */
      TEXT: goog.DEBUG ? { sanitizedContentKindText: true } : {}
    };

    /**
     * A string-like object that carries a content-type and a content direction.
     *
     * IMPORTANT! Do not create these directly, nor instantiate the subclasses.
     * Instead, use a trusted, centrally reviewed library as endorsed by your team
     * to generate these objects. Otherwise, you risk accidentally creating
     * SanitizedContent that is attacker-controlled and gets evaluated unescaped in
     * templates.
     *
     * @constructor
     */
    goog.soy.data.SanitizedContent = function () {
      throw Error('Do not instantiate directly');
    };

    /**
     * The context in which this content is safe from XSS attacks.
     * @type {goog.soy.data.SanitizedContentKind}
     */
    goog.soy.data.SanitizedContent.prototype.contentKind;

    /**
     * The content's direction; null if unknown and thus to be estimated when
     * necessary.
     * @type {?goog.i18n.bidi.Dir}
     */
    goog.soy.data.SanitizedContent.prototype.contentDir = null;

    /**
     * The already-safe content.
     * @protected {string}
     */
    goog.soy.data.SanitizedContent.prototype.content;

    /**
     * Gets the already-safe content.
     * @return {string}
     */
    goog.soy.data.SanitizedContent.prototype.getContent = function () {
      return this.content;
    };

    /** @override */
    goog.soy.data.SanitizedContent.prototype.toString = function () {
      return this.content;
    };

    /**
     * An intermediary base class to allow the type system to sepcify text templates
     * without referencing the soydata package.
     * @extends {goog.soy.data.SanitizedContent}
     * @constructor
     */
    goog.soy.data.UnsanitizedText = function () {
      // TODO(gboyer): Delete this class after moving soydata to Closure.
      goog.soy.data.UnsanitizedText.base(this, 'constructor');
    };
    goog.inherits(goog.soy.data.UnsanitizedText, goog.soy.data.SanitizedContent);

    /*
     * Copyright 2008 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @fileoverview
     * Utility functions and classes for Soy.
     *
     * <p>
     * The top portion of this file contains utilities for Soy users:<ul>
     *   <li> soy.StringBuilder: Compatible with the 'stringbuilder' code style.
     * </ul>
     *
     * <p>
     * The bottom portion of this file contains utilities that should only be called
     * by Soy-generated JS code. Please do not use these functions directly from
     * your hand-writen code. Their names all start with '$$'.
     *
     */

    // -----------------------------------------------------------------------------
    // StringBuilder (compatible with the 'stringbuilder' code style).

    (function () {
      var soy = {};
      soy.asserts = {};
      soy.esc = {};
      var soydata = {};

      /**
       * Utility class to facilitate much faster string concatenation in IE,
       * using Array.join() rather than the '+' operator. For other browsers
       * we simply use the '+' operator.
       *
       * @param {Object} var_args Initial items to append,
       *     e.g., new soy.StringBuilder('foo', 'bar').
       * @constructor
       */
      soy.StringBuilder = goog.string.StringBuffer;

      // -----------------------------------------------------------------------------
      // soydata: Defines typed strings, e.g. an HTML string {@code "a<b>c"} is
      // semantically distinct from the plain text string {@code "a<b>c"} and smart
      // templates can take that distinction into account.

      /**
       * A type of textual content.
       *
       * This is an enum of type Object so that these values are unforgeable.
       *
       * @enum {!Object}
       */
      soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;

      /**
       * Checks whether a given value is of a given content kind.
       *
       * @param {*} value The value to be examined.
       * @param {soydata.SanitizedContentKind} contentKind The desired content
       *     kind.
       * @return {boolean} Whether the given value is of the given kind.
       * @private
       */
      soydata.isContentKind = function (value, contentKind) {
        // TODO(user): This function should really include the assert on
        // value.constructor that is currently sprinkled at most of the call sites.
        // Unfortunately, that would require a (debug-mode-only) switch statement.
        // TODO(user): Perhaps we should get rid of the contentKind property
        // altogether and only at the constructor.
        return value != null && value.contentKind === contentKind;
      };

      /**
       * Content of type {@link soydata.SanitizedContentKind.URI}.
       *
       * The content is a URI chunk that the caller knows is safe to emit in a
       * template. The content direction is LTR.
       *
       * @constructor
       * @extends {goog.soy.data.SanitizedContent}
       */
      soydata.SanitizedUri = function () {
        goog.soy.data.SanitizedContent.call(this); // Throws an exception.
      };
      goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent);

      /** @override */
      soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;

      /** @override */
      soydata.SanitizedUri.prototype.contentDir = goog.i18n.bidi.Dir.LTR;

      /**
       * Unsanitized plain text string.
       *
       * While all strings are effectively safe to use as a plain text, there are no
       * guarantees about safety in any other context such as HTML. This is
       * sometimes used to mark that should never be used unescaped.
       *
       * @param {*} content Plain text with no guarantees.
       * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
       *     unknown and thus to be estimated when necessary. Default: null.
       * @constructor
       * @extends {goog.soy.data.UnsanitizedText}
       */
      soydata.UnsanitizedText = function (content, opt_contentDir) {
        /** @override */
        this.content = String(content);
        this.contentDir = opt_contentDir != null ? opt_contentDir : null;
      };
      goog.inherits(soydata.UnsanitizedText, goog.soy.data.UnsanitizedText);

      /** @override */
      soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;

      /**
       * Empty string, used as a type in Soy templates.
       * @enum {string}
       * @private
       */
      soydata.$$EMPTY_STRING_ = {
        VALUE: ''
      };

      /**
       * Creates a factory for SanitizedContent types.
       *
       * This is a hack so that the soydata.VERY_UNSAFE.ordainSanitized* can
       * instantiate Sanitized* classes, without making the Sanitized* constructors
       * publicly usable. Requiring all construction to use the VERY_UNSAFE names
       * helps callers and their reviewers easily tell that creating SanitizedContent
       * is not always safe and calls for careful review.
       *
       * @param {function(new: T)} ctor A constructor.
       * @return {!function(*, ?goog.i18n.bidi.Dir=): T} A factory that takes
       *     content and an optional content direction and returns a new instance. If
       *     the content direction is undefined, ctor.prototype.contentDir is used.
       * @template T
       * @private
       */
      soydata.$$makeSanitizedContentFactory_ = function (ctor) {
        /**
         * @param {string} content
         * @constructor
         * @extends {goog.soy.data.SanitizedContent}
         */
        function InstantiableCtor(content) {
          /** @override */
          this.content = content;
        }
        InstantiableCtor.prototype = ctor.prototype;
        /**
         * Creates a ctor-type SanitizedContent instance.
         *
         * @param {*} content The content to put in the instance.
         * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction. If
         *     undefined, ctor.prototype.contentDir is used.
         * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
         *     of type T above (ctor's type, a descendant of SanitizedContent), but
         *     there is no way to express that here.
         */
        function sanitizedContentFactory(content, opt_contentDir) {
          var result = new InstantiableCtor(String(content));
          if (opt_contentDir !== undefined) {
            result.contentDir = opt_contentDir;
          }
          return result;
        }
        return sanitizedContentFactory;
      };

      /**
       * Creates a factory for SanitizedContent types that should always have their
       * default directionality.
       *
       * This is a hack so that the soydata.VERY_UNSAFE.ordainSanitized* can
       * instantiate Sanitized* classes, without making the Sanitized* constructors
       * publicly usable. Requiring all construction to use the VERY_UNSAFE names
       * helps callers and their reviewers easily tell that creating SanitizedContent
       * is not always safe and calls for careful review.
       *
       * @param {function(new: T, string)} ctor A constructor.
       * @return {!function(*): T} A factory that takes content and returns a new
       *     instance (with default directionality, i.e. ctor.prototype.contentDir).
       * @template T
       * @private
       */
      soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_ = function (ctor) {
        /**
         * @param {string} content
         * @constructor
         * @extends {goog.soy.data.SanitizedContent}
         */
        function InstantiableCtor(content) {
          /** @override */
          this.content = content;
        }
        InstantiableCtor.prototype = ctor.prototype;
        /**
         * Creates a ctor-type SanitizedContent instance.
         *
         * @param {*} content The content to put in the instance.
         * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
         *     of type T above (ctor's type, a descendant of SanitizedContent), but
         *     there is no way to express that here.
         */
        function sanitizedContentFactory(content) {
          var result = new InstantiableCtor(String(content));
          return result;
        }
        return sanitizedContentFactory;
      };

      // -----------------------------------------------------------------------------
      // Sanitized content ordainers. Please use these with extreme caution (with the
      // exception of markUnsanitizedText). A good recommendation is to limit usage
      // of these to just a handful of files in your source tree where usages can be
      // carefully audited.


      /**
       * Protects a string from being used in an noAutoescaped context.
       *
       * This is useful for content where there is significant risk of accidental
       * unescaped usage in a Soy template. A great case is for user-controlled
       * data that has historically been a source of vulernabilities.
       *
       * @param {*} content Text to protect.
       * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
       *     unknown and thus to be estimated when necessary. Default: null.
       * @return {!soydata.UnsanitizedText} A wrapper that is rejected by the
       *     Soy noAutoescape print directive.
       */
      soydata.markUnsanitizedText = function (content, opt_contentDir) {
        return new soydata.UnsanitizedText(content, opt_contentDir);
      };

      soydata.VERY_UNSAFE = {};

      /**
      * Takes a leap of faith that the provided content is "safe" to use as a URI
      * in a Soy template.
      *
      * This creates a Soy SanitizedContent object which indicates to Soy there is
      * no need to escape it when printed as a URI (e.g. in an href or src
      * attribute), such as if it's already been encoded or  if it's a Javascript:
      * URI.
      *
      * @param {*} content A chunk of URI that the caller knows is safe to
      *     emit in a template.
      * @return {!soydata.SanitizedUri} Sanitized content wrapper that indicates to
      *     Soy not to escape or filter when printed in URI context.
      */
      soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedUri);

      // -----------------------------------------------------------------------------
      // Below are private utilities to be used by Soy-generated code only.

      /**
       * Builds an augmented map. The returned map will contain mappings from both
       * the base map and the additional map. If the same key appears in both, then
       * the value from the additional map will be visible, while the value from the
       * base map will be hidden. The base map will be used, but not modified.
       *
       * @param {!Object} baseMap The original map to augment.
       * @param {!Object} additionalMap A map containing the additional mappings.
       * @return {!Object} An augmented map containing both the original and
       *     additional mappings.
       */
      soy.$$augmentMap = function (baseMap, additionalMap) {
        return soy.$$assignDefaults(soy.$$assignDefaults({}, additionalMap), baseMap);
      };

      /**
       * Copies extra properties into an object if they do not already exist. The
       * destination object is mutated in the process.
       *
       * @param {!Object} obj The destination object to update.
       * @param {!Object} defaults An object with default properties to apply.
       * @return {!Object} The destination object for convenience.
       */
      soy.$$assignDefaults = function (obj, defaults) {
        for (var key in defaults) {
          if (!(key in obj)) {
            obj[key] = defaults[key];
          }
        }

        return obj;
      };

      /**
       * Checks that the given map key is a string.
       * @param {*} key Key to check.
       * @return {string} The given key.
       */
      soy.$$checkMapKey = function (key) {
        // TODO: Support map literal with nonstring key.
        if (typeof key != 'string') {
          throw Error('Map literal\'s key expression must evaluate to string' + ' (encountered type "' + (typeof key === 'undefined' ? 'undefined' : babelHelpers.typeof(key)) + '").');
        }
        return key;
      };

      /**
       * Gets the keys in a map as an array. There are no guarantees on the order.
       * @param {Object} map The map to get the keys of.
       * @return {!Array<string>} The array of keys in the given map.
       */
      soy.$$getMapKeys = function (map) {
        var mapKeys = [];
        for (var key in map) {
          mapKeys.push(key);
        }
        return mapKeys;
      };

      /**
       * Returns the argument if it is not null.
       *
       * @param {T} val The value to check
       * @return {T} val if is isn't null
       * @template T
       */
      soy.$$checkNotNull = function (val) {
        if (val == null) {
          throw Error('unexpected null value');
        }
        return val;
      };

      /**
       * Gets a consistent unique id for the given delegate template name. Two calls
       * to this function will return the same id if and only if the input names are
       * the same.
       *
       * <p> Important: This function must always be called with a string constant.
       *
       * <p> If Closure Compiler is not being used, then this is just this identity
       * function. If Closure Compiler is being used, then each call to this function
       * will be replaced with a short string constant, which will be consistent per
       * input name.
       *
       * @param {string} delTemplateName The delegate template name for which to get a
       *     consistent unique id.
       * @return {string} A unique id that is consistent per input name.
       *
       * @consistentIdGenerator
       */
      soy.$$getDelTemplateId = function (delTemplateName) {
        return delTemplateName;
      };

      /**
       * Map from registered delegate template key to the priority of the
       * implementation.
       * @type {Object}
       * @private
       */
      soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};

      /**
       * Map from registered delegate template key to the implementation function.
       * @type {Object}
       * @private
       */
      soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};

      /**
       * Registers a delegate implementation. If the same delegate template key (id
       * and variant) has been registered previously, then priority values are
       * compared and only the higher priority implementation is stored (if
       * priorities are equal, an error is thrown).
       *
       * @param {string} delTemplateId The delegate template id.
       * @param {string} delTemplateVariant The delegate template variant (can be
       *     empty string).
       * @param {number} delPriority The implementation's priority value.
       * @param {Function} delFn The implementation function.
       */
      soy.$$registerDelegateFn = function (delTemplateId, delTemplateVariant, delPriority, delFn) {

        var mapKey = 'key_' + delTemplateId + ':' + delTemplateVariant;
        var currPriority = soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey];
        if (currPriority === undefined || delPriority > currPriority) {
          // Registering new or higher-priority function: replace registry entry.
          soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey] = delPriority;
          soy.$$DELEGATE_REGISTRY_FUNCTIONS_[mapKey] = delFn;
        } else if (delPriority == currPriority) {
          // Registering same-priority function: error.
          throw Error('Encountered two active delegates with the same priority ("' + delTemplateId + ':' + delTemplateVariant + '").');
        } else {
          // Registering lower-priority function: do nothing.
        }
      };

      /**
       * Retrieves the (highest-priority) implementation that has been registered for
       * a given delegate template key (id and variant). If no implementation has
       * been registered for the key, then the fallback is the same id with empty
       * variant. If the fallback is also not registered, and allowsEmptyDefault is
       * true, then returns an implementation that is equivalent to an empty template
       * (i.e. rendered output would be empty string).
       *
       * @param {string} delTemplateId The delegate template id.
       * @param {string} delTemplateVariant The delegate template variant (can be
       *     empty string).
       * @param {boolean} allowsEmptyDefault Whether to default to the empty template
       *     function if there's no active implementation.
       * @return {Function} The retrieved implementation function.
       */
      soy.$$getDelegateFn = function (delTemplateId, delTemplateVariant, allowsEmptyDefault) {

        var delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId + ':' + delTemplateVariant];
        if (!delFn && delTemplateVariant != '') {
          // Fallback to empty variant.
          delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId + ':'];
        }

        if (delFn) {
          return delFn;
        } else if (allowsEmptyDefault) {
          return soy.$$EMPTY_TEMPLATE_FN_;
        } else {
          throw Error('Found no active impl for delegate call to "' + delTemplateId + ':' + delTemplateVariant + '" (and not allowemptydefault="true").');
        }
      };

      /**
       * Private helper soy.$$getDelegateFn(). This is the empty template function
       * that is returned whenever there's no delegate implementation found.
       *
       * @param {Object<string, *>=} opt_data
       * @param {soy.StringBuilder=} opt_sb
       * @param {Object<string, *>=} opt_ijData
       * @return {string}
       * @private
       */
      soy.$$EMPTY_TEMPLATE_FN_ = function (opt_data, opt_sb, opt_ijData) {
        return '';
      };

      // -----------------------------------------------------------------------------
      // Basic directives/functions.


      /**
       * Truncates a string to a given max length (if it's currently longer),
       * optionally adding ellipsis at the end.
       *
       * @param {*} str The string to truncate. Can be other types, but the value will
       *     be coerced to a string.
       * @param {number} maxLen The maximum length of the string after truncation
       *     (including ellipsis, if applicable).
       * @param {boolean} doAddEllipsis Whether to add ellipsis if the string needs
       *     truncation.
       * @return {string} The string after truncation.
       */
      soy.$$truncate = function (str, maxLen, doAddEllipsis) {

        str = String(str);
        if (str.length <= maxLen) {
          return str; // no need to truncate
        }

        // If doAddEllipsis, either reduce maxLen to compensate, or else if maxLen is
        // too small, just turn off doAddEllipsis.
        if (doAddEllipsis) {
          if (maxLen > 3) {
            maxLen -= 3;
          } else {
            doAddEllipsis = false;
          }
        }

        // Make sure truncating at maxLen doesn't cut up a unicode surrogate pair.
        if (soy.$$isHighSurrogate_(str.charAt(maxLen - 1)) && soy.$$isLowSurrogate_(str.charAt(maxLen))) {
          maxLen -= 1;
        }

        // Truncate.
        str = str.substring(0, maxLen);

        // Add ellipsis.
        if (doAddEllipsis) {
          str += '...';
        }

        return str;
      };

      /**
       * Private helper for $$truncate() to check whether a char is a high surrogate.
       * @param {string} ch The char to check.
       * @return {boolean} Whether the given char is a unicode high surrogate.
       * @private
       */
      soy.$$isHighSurrogate_ = function (ch) {
        return 0xD800 <= ch && ch <= 0xDBFF;
      };

      /**
       * Private helper for $$truncate() to check whether a char is a low surrogate.
       * @param {string} ch The char to check.
       * @return {boolean} Whether the given char is a unicode low surrogate.
       * @private
       */
      soy.$$isLowSurrogate_ = function (ch) {
        return 0xDC00 <= ch && ch <= 0xDFFF;
      };

      // -----------------------------------------------------------------------------
      // Assertion methods used by runtime.

      /**
       * Checks if the type assertion is true if goog.asserts.ENABLE_ASSERTS is
       * true. Report errors on runtime types if goog.DEBUG is true.
       * @template T
       * @param {T} typeCheck An condition for type checks.
       * @param {string} paramName The Soy name of the parameter.
       * @param {?Object} param The resolved JS object for the parameter.
       * @param {!string} jsDocTypeStr JSDoc type str to cast the value to if the
       *     type test succeeds
       * @param {...*} var_args The items to substitute into the failure message.
       * @return {T} The value of the condition.
       * @throws {goog.asserts.AssertionError} When the condition evaluates to false.
       */
      soy.asserts.assertType = function (typeCheck, paramName, param, jsDocTypeStr, var_args) {
        var msg = 'expected param ' + paramName + ' of type ' + jsDocTypeStr + (goog.DEBUG ? ', but got ' + goog.debug.runtimeType(param) : '') + '.';
        return goog.asserts.assert(typeCheck, msg, var_args);
      };

      // -----------------------------------------------------------------------------
      // Generated code.


      // START GENERATED CODE FOR ESCAPERS.

      /**
       * @type {function (*) : string}
       */
      soy.esc.$$escapeHtmlHelper = function (v) {
        return goog.string.htmlEscape(String(v));
      };

      /**
       * Allows only data-protocol image URI's.
       *
       * @param {*} value The value to process. May not be a string, but the value
       *     will be coerced to a string.
       * @return {!soydata.SanitizedUri} An escaped version of value.
       */
      soy.$$filterImageDataUri = function (value) {
        // NOTE: Even if it's a SanitizedUri, we will still filter it.
        return soydata.VERY_UNSAFE.ordainSanitizedUri(soy.esc.$$filterImageDataUriHelper(value));
      };

      /**
       * A pattern that vets values produced by the named directives.
       * @private {!RegExp}
       */
      soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_ = /^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i;

      /**
       * A helper for the Soy directive |filterImageDataUri
       * @param {*} value Can be of any type but will be coerced to a string.
       * @return {string} The escaped text.
       */
      soy.esc.$$filterImageDataUriHelper = function (value) {
        var str = String(value);
        if (!soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(str)) {
          goog.asserts.fail('Bad value `%s` for |filterImageDataUri', [str]);
          return 'data:image/gif;base64,zSoyz';
        }
        return str;
      };

      // END GENERATED CODE

      goog.loadModule(function () {
        goog.module('soy');
        return soy;
      });

      goog.loadModule(function () {
        goog.module('soydata');
        return soydata;
      });

      goog.loadModule(function () {
        goog.module('soy.asserts');
        return soy;
      });
    })();

    /* jshint ignore:end */

    goog.loadModule(function () {
      goog.module('incrementaldom');
      return IncrementalDOM;
    });
  }).call(window);
}).call(this);
"use strict";

(function () {
	/* jshint ignore:start */

	/*
  * HTML5 Parser By Sam Blowes
  *
  * Designed for HTML5 documents
  *
  * Original code by John Resig (ejohn.org)
  * http://ejohn.org/blog/pure-javascript-html-parser/
  * Original code by Erik Arvidsson, Mozilla Public License
  * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
  *
  * ----------------------------------------------------------------------------
  * License
  * ----------------------------------------------------------------------------
  *
  * This code is triple licensed using Apache Software License 2.0,
  * Mozilla Public License or GNU Public License
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
  * use this file except in compliance with the License.  You may obtain a copy
  * of the License at http://www.apache.org/licenses/LICENSE-2.0
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * The contents of this file are subject to the Mozilla Public License
  * Version 1.1 (the "License"); you may not use this file except in
  * compliance with the License. You may obtain a copy of the License at
  * http://www.mozilla.org/MPL/
  *
  * Software distributed under the License is distributed on an "AS IS"
  * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
  * License for the specific language governing rights and limitations
  * under the License.
  *
  * The Original Code is Simple HTML Parser.
  *
  * The Initial Developer of the Original Code is Erik Arvidsson.
  * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
  * Reserved.
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * This program is free software; you can redistribute it and/or
  * modify it under the terms of the GNU General Public License
  * as published by the Free Software Foundation; either version 2
  * of the License, or (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program; if not, write to the Free Software
  * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
  * @license
  */

	/*
  *
  * ----------------------------------------------------------------------------
  * Usage
  * ----------------------------------------------------------------------------
  *
  * // Use like so:
  * HTMLParser(htmlString, {
  *     start: function(tag, attrs, unary) {},
  *     end: function(tag) {},
  *     chars: function(text) {},
  *     comment: function(text) {}
  * });
  *
  * // or to get an XML string:
  * HTMLtoXML(htmlString);
  *
  * // or to get an XML DOM Document
  * HTMLtoDOM(htmlString);
  *
  * // or to inject into an existing document/DOM node
  * HTMLtoDOM(htmlString, document);
  * HTMLtoDOM(htmlString, document.body);
  *
  */

	(function () {
		// Regular Expressions for parsing tags and attributes
		var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
		    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

		// Empty Elements - HTML 5
		var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

		// Block Elements - HTML 5
		var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

		// Inline Elements - HTML 5
		var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

		// Elements that you can, intentionally, leave open
		// (and which close themselves)
		var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

		// Attributes that have their values filled in disabled="disabled"
		var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

		// Special Elements (can contain anything)
		var special = makeMap("script,style");

		var HTMLParser = window.HTMLParser = function (html, handler) {
			var index,
			    chars,
			    match,
			    stack = [],
			    last = html;
			stack.last = function () {
				return this[this.length - 1];
			};

			while (html) {
				chars = true;

				// Make sure we're not in a script or style element
				if (!stack.last() || !special[stack.last()]) {

					// Comment
					if (html.indexOf("<!--") == 0) {
						index = html.indexOf("-->");

						if (index >= 0) {
							if (handler.comment) handler.comment(html.substring(4, index));
							html = html.substring(index + 3);
							chars = false;
						}

						// end tag
					} else if (html.indexOf("</") == 0) {
						match = html.match(endTag);

						if (match) {
							html = html.substring(match[0].length);
							match[0].replace(endTag, parseEndTag);
							chars = false;
						}

						// start tag
					} else if (html.indexOf("<") == 0) {
						match = html.match(startTag);

						if (match) {
							html = html.substring(match[0].length);
							match[0].replace(startTag, parseStartTag);
							chars = false;
						}
					}

					if (chars) {
						index = html.indexOf("<");

						var text = index < 0 ? html : html.substring(0, index);
						html = index < 0 ? "" : html.substring(index);

						if (handler.chars) handler.chars(text);
					}
				} else {
					html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
						text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
						if (handler.chars) handler.chars(text);

						return "";
					});

					parseEndTag("", stack.last());
				}

				if (html == last) throw "Parse Error: " + html;
				last = html;
			}

			// Clean up any remaining tags
			parseEndTag();

			function parseStartTag(tag, tagName, rest, unary) {
				tagName = tagName.toLowerCase();

				if (block[tagName]) {
					while (stack.last() && inline[stack.last()]) {
						parseEndTag("", stack.last());
					}
				}

				if (closeSelf[tagName] && stack.last() == tagName) {
					parseEndTag("", tagName);
				}

				unary = empty[tagName] || !!unary;

				if (!unary) stack.push(tagName);

				if (handler.start) {
					var attrs = [];

					rest.replace(attr, function (match, name) {
						var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

						attrs.push({
							name: name,
							value: value,
							escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
						});
					});

					if (handler.start) handler.start(tagName, attrs, unary);
				}
			}

			function parseEndTag(tag, tagName) {
				// If no tag name is provided, clean shop
				if (!tagName) var pos = 0;

				// Find the closest opened tag of the same type
				else for (var pos = stack.length - 1; pos >= 0; pos--) {
						if (stack[pos] == tagName) break;
					}if (pos >= 0) {
					// Close all the open elements, up the stack
					for (var i = stack.length - 1; i >= pos; i--) {
						if (handler.end) handler.end(stack[i]);
					} // Remove the open elements from the stack
					stack.length = pos;
				}
			}
		};

		function makeMap(str) {
			var obj = {},
			    items = str.split(",");
			for (var i = 0; i < items.length; i++) {
				obj[items[i]] = true;
			}return obj;
		}
	}).call(this);

	/* jshint ignore:end */
}).call(this);
'use strict';

// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Unescapes an HTML string using a DOM to resolve non-XML, non-numeric
 * entities. This function is XSS-safe and whitespace-preserving.
 * @private
 * @param {string} str The string to unescape.
 * @return {string} The unescaped {@code str} string.
 */

(function () {
  function unescape(str) {
    /** @type {!Object<string, string>} */
    var seen = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' };
    var div = document.createElement('div');

    // Match as many valid entity characters as possible. If the actual entity
    // happens to be shorter, it will still work as innerHTML will return the
    // trailing characters unchanged. Since the entity characters do not include
    // open angle bracket, there is no chance of XSS from the innerHTML use.
    // Since no whitespace is passed to innerHTML, whitespace is preserved.
    return str.replace(HTML_ENTITY_PATTERN_, function (s, entity) {
      // Check for cached entity.
      var value = seen[s];
      if (value) {
        return value;
      }
      // Check for numeric entity.
      if (entity.charAt(0) === '#') {
        // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex numbers.
        var n = Number('0' + entity.substr(1));
        if (!isNaN(n)) {
          value = String.fromCharCode(n);
        }
      }
      // Fall back to innerHTML otherwise.
      if (!value) {
        // Append a non-entity character to avoid a bug in Webkit that parses
        // an invalid entity at the end of innerHTML text as the empty string.
        div.innerHTML = s + ' ';
        // Then remove the trailing character from the result.
        value = div.firstChild.nodeValue.slice(0, -1);
      }
      // Cache and return.
      seen[s] = value;
      return value;
    });
  }

  this['metal']['unescape'] = unescape;

  /**
   * Regular expression that matches an HTML entity.
   * @type {!RegExp}
   */

  var HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
}).call(this);
'use strict';

(function () {
	var unescape = this['metal']['unescape'];


	var parser_;

	var HTML2IncDom = function () {
		function HTML2IncDom() {
			babelHelpers.classCallCheck(this, HTML2IncDom);
		}

		babelHelpers.createClass(HTML2IncDom, null, [{
			key: 'buildFn',

			/**
    * Should convert the given html string to a function with calls to
    * incremental dom methods.
    * @param {string} html
    * @return {!function()} Function with incremental dom calls for building
    *     the given html string.
    */
			value: function buildFn(html) {
				return function () {
					return HTML2IncDom.run(html);
				};
			}

			/**
    * Gets the html parser being currently used.
    * @return {!function()}
    */

		}, {
			key: 'getParser',
			value: function getParser() {
				return parser_ || window.HTMLParser;
			}

			/**
    * Should convert the given html string to calls to incremental dom methods.
    * @param {string} html
    */

		}, {
			key: 'run',
			value: function run(html) {
				HTML2IncDom.getParser()(html, {
					start: function start(tag, attrs, unary) {
						var fn = unary ? IncrementalDOM.elementVoid : IncrementalDOM.elementOpen;
						var args = [tag, null, []];
						for (var i = 0; i < attrs.length; i++) {
							args.push(attrs[i].name, attrs[i].value);
						}
						fn.apply(null, args);
					},

					end: function end(tag) {
						IncrementalDOM.elementClose(tag);
					},

					chars: function chars(text) {
						IncrementalDOM.text(text, unescape);
					}
				});
			}

			/**
    * Changes the function that will be used to parse html strings. By default
    * this will use the `HTMLParser` function from
    * https://github.com/blowsie/Pure-JavaScript-HTML5-Parser. This will accept
    * any function that follows that same api, basically accepting the html
    * string and an object with `start`, `end` and `chars` functions to be called
    * during the parsing.
    * @param {!function(string, !Object} newParser
    */

		}, {
			key: 'setParser',
			value: function setParser(newParser) {
				parser_ = newParser;
			}
		}]);
		return HTML2IncDom;
	}();

	this['metal']['HTML2IncDom'] = HTML2IncDom;
}).call(this);
'use strict';

(function () {
  var HTML2IncDom = this['metal']['HTML2IncDom'];
  this['metal']['withParser'] = HTML2IncDom;
}).call(this);
'use strict';

(function () {
	var SoyAop = {
		/**
   * The functions that should be called instead of a template call. The last
   * function in the array is the one that is intercepting at the moment. If the
   * array is empty, the original function will be called instead.
   * @type {!Array<function()>}
   * @protected
   */
		interceptFns_: [],

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
   * Handles a template call, calling the current interception function if one
   * is set, or otherwise just calling the original function instead.
   * @param {!function()} originalFn The original template function that was
   *     intercepted.
   * @param {Object} opt_data Template data object.
   * @param {*} opt_ignored
   * @param {Object} opt_ijData Template injected data object.
   * @return {*} The return value of the function that is called to handle this
   *     interception.
   */
		handleTemplateCall_: function handleTemplateCall_(originalFn, opt_data, opt_ignored, opt_ijData) {
			var interceptFn = SoyAop.interceptFns_[SoyAop.interceptFns_.length - 1];
			if (interceptFn) {
				return interceptFn.call(null, originalFn, opt_data, opt_ignored, opt_ijData);
			} else {
				return originalFn.call(null, opt_data, opt_ignored, opt_ijData);
			}
		},

		/**
   * Registers a template function that should be intercepted.
   * @param {!Object} templates The original templates object containing the
   *     function to be intercepted.
   * @param {string} name The name of the template function to intercept.
   */
		registerForInterception: function registerForInterception(templates, name) {
			var originalFn = templates[name];
			if (!originalFn.originalFn) {
				templates[name] = SoyAop.handleTemplateCall_.bind(null, originalFn);
				templates[name].originalFn = originalFn;
			}
		},

		/**
   * Starts intercepting all template calls, replacing them with a call to the
   * given function instead.
   * @param {!function()} fn
   */
		startInterception: function startInterception(fn) {
			SoyAop.interceptFns_.push(fn);
		},

		/**
   * Stops intercepting template calls.
   */
		stopAllInterceptions: function stopAllInterceptions() {
			SoyAop.interceptFns_ = [];
		},

		/**
   * Stops intercepting template calls with the last registered function.
   */
		stopInterception: function stopInterception() {
			SoyAop.interceptFns_.pop();
		}
	};

	this['metal']['SoyAop'] = SoyAop;
}).call(this);
'use strict';

(function () {
	var isFunction = this['metalNamed']['metal']['isFunction'];
	var isObject = this['metalNamed']['metal']['isObject'];
	var isString = this['metalNamed']['metal']['isString'];
	var object = this['metalNamed']['metal']['object'];
	var ComponentRegistry = this['metalNamed']['component']['ComponentRegistry'];
	var HTML2IncDom = this['metal']['withParser'];
	var IncrementalDomRenderer = this['metal']['IncrementalDomRenderer'];
	var SoyAop = this['metal']['SoyAop'];

	// The injected data that will be passed to soy templates.

	var ijData = {};

	var Soy = function (_IncrementalDomRender) {
		babelHelpers.inherits(Soy, _IncrementalDomRender);

		function Soy() {
			babelHelpers.classCallCheck(this, Soy);
			return babelHelpers.possibleConstructorReturn(this, (Soy.__proto__ || Object.getPrototypeOf(Soy)).apply(this, arguments));
		}

		babelHelpers.createClass(Soy, [{
			key: 'addMissingStateKeys_',

			/**
    * Adds the template params to the component's state, if they don't exist yet.
    * @protected
    */
			value: function addMissingStateKeys_() {
				var elementTemplate = this.component_.constructor.TEMPLATE;
				if (!isFunction(elementTemplate)) {
					return;
				}

				elementTemplate = SoyAop.getOriginalFn(elementTemplate);
				this.soyParamTypes_ = elementTemplate.types || {};

				var keys = elementTemplate.params || [];
				var component = this.component_;
				var state = component.getDataManager().getStateInstance();
				for (var i = 0; i < keys.length; i++) {
					if (!state.hasStateKey(keys[i]) && !component[keys[i]]) {
						state.addToState(keys[i], {}, component.getInitialConfig()[keys[i]]);
					}
				}
			}

			/**
    * Copies the component's state to an object so it can be passed as it's
    * template call's data. The copying needs to be done because, if the component
    * itself is passed directly, some problems occur when soy tries to merge it
    * with other data, due to property getters and setters. This is safer.
    * @param {!Array<string>} params The params used by this template.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'buildTemplateData_',
			value: function buildTemplateData_(params) {
				var _this2 = this;

				var component = this.component_;
				var data = object.mixin({}, this.config_);
				component.getStateKeys().forEach(function (key) {
					var value = component[key];
					if (_this2.isHtmlParam_(key)) {
						value = Soy.toIncDom(value);
					}
					data[key] = value;
				});
				for (var i = 0; i < params.length; i++) {
					if (!data[params[i]] && isFunction(component[params[i]])) {
						data[params[i]] = component[params[i]].bind(component);
					}
				}
				return data;
			}

			/**
    * Returns the requested template function. This function will be wrapped in
    * another though, just to defer the requirement of the template's module
    * being ready until the function is actually called.
    * @param {string} namespace The soy template's namespace.
    * @param {string} templateName The name of the template function.
    * @return {!function()}
    */

		}, {
			key: 'handleDataManagerCreated_',


			/**
    * @inheritDoc
    */
			value: function handleDataManagerCreated_() {
				babelHelpers.get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'handleDataManagerCreated_', this).call(this);
				this.addMissingStateKeys_();
			}

			/**
    * Handles an intercepted soy template call. If the call is for a component's
    * main template, then it will be replaced with a call that incremental dom
    * can use for both handling an instance of that component and rendering it.
    * @param {!function()} originalFn The original template function that was
    *     intercepted.
    * @param {Object} data The data the template was called with.
    * @protected
    */

		}, {
			key: 'isHtmlParam_',


			/**
    * Checks if the given param type is html.
    * @param {string} name
    * @protected
    */
			value: function isHtmlParam_(name) {
				var state = this.component_.getDataManager().getStateInstance();
				if (state.getStateKeyConfig(name).isHtml) {
					return true;
				}
				var type = this.soyParamTypes_[name] || '';
				return type.split('|').indexOf('html') !== -1;
			}

			/**
    * Registers the given templates to be used by `Soy` for the specified
    * component constructor.
    * @param {!Function} componentCtor The constructor of the component that
    *     should use the given templates.
    * @param {!Object} templates Object containing soy template functions.
    * @param {string=} mainTemplate The name of the main template that should be
    *     used to render the component. Defaults to "render".
    */

		}, {
			key: 'renderIncDom',


			/**
    * Overrides the default method from `IncrementalDomRenderer` so the component's
    * soy template can be used for rendering.
    * @param {!Object} data Data passed to the component when rendering it.
    * @override
    */
			value: function renderIncDom() {
				var elementTemplate = this.component_.constructor.TEMPLATE;
				if (isFunction(elementTemplate) && !this.component_.render) {
					elementTemplate = SoyAop.getOriginalFn(elementTemplate);
					SoyAop.startInterception(Soy.handleInterceptedCall_);
					elementTemplate(this.buildTemplateData_(elementTemplate.params || []), null, ijData);
					SoyAop.stopInterception();
				} else {
					babelHelpers.get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'renderIncDom', this).call(this);
				}
			}

			/**
    * Sets the injected data object that should be passed to templates.
    * @param {Object} data
    */

		}, {
			key: 'shouldUpdate',


			/**
    * Overrides the original `IncrementalDomRenderer` method so that only
    * state keys used by the main template can cause updates.
    * @return {boolean}
    */
			value: function shouldUpdate() {
				var should = babelHelpers.get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'shouldUpdate', this).call(this);
				if (!should || this.component_.shouldUpdate) {
					return should;
				}

				var fn = this.component_.constructor.TEMPLATE;
				var params = fn ? SoyAop.getOriginalFn(fn).params : [];
				for (var i = 0; i < params.length; i++) {
					if (this.changes_[params[i]]) {
						return true;
					}
				}
				return false;
			}

			/**
    * Converts the given incremental dom function into an html string.
    * @param {!function()} incDomFn
    * @return {string}
    */

		}], [{
			key: 'getTemplate',
			value: function getTemplate(namespace, templateName) {
				return function (opt_data, opt_ignored, opt_ijData) {
					if (!goog.loadedModules_[namespace]) {
						throw new Error('No template with namespace "' + namespace + '" has been loaded yet.');
					}
					return goog.loadedModules_[namespace][templateName](opt_data, opt_ignored, opt_ijData);
				};
			}
		}, {
			key: 'handleInterceptedCall_',
			value: function handleInterceptedCall_(originalFn) {
				var opt_data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var args = [originalFn.componentCtor, null, []];
				for (var key in opt_data) {
					args.push(key, opt_data[key]);
				}
				IncrementalDOM.elementVoid.apply(null, args);
			}
		}, {
			key: 'register',
			value: function register(componentCtor, templates) {
				var mainTemplate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'render';

				componentCtor.RENDERER = Soy;
				componentCtor.TEMPLATE = SoyAop.getOriginalFn(templates[mainTemplate]);
				componentCtor.TEMPLATE.componentCtor = componentCtor;
				SoyAop.registerForInterception(templates, mainTemplate);
				ComponentRegistry.register(componentCtor);
			}
		}, {
			key: 'setInjectedData',
			value: function setInjectedData(data) {
				ijData = data || {};
			}
		}, {
			key: 'toHtmlString',
			value: function toHtmlString(incDomFn) {
				var element = document.createElement('div');
				IncrementalDOM.patch(element, incDomFn);
				return element.innerHTML;
			}

			/**
    * Converts the given html string into an incremental dom function.
    * @param {string|{contentKind: string, content: string}} value
    * @return {!function()}
    */

		}, {
			key: 'toIncDom',
			value: function toIncDom(value) {
				if (isObject(value) && isString(value.content) && value.contentKind === 'HTML') {
					value = value.content;
				}
				if (isString(value)) {
					value = HTML2IncDom.buildFn(value);
				}
				return value;
			}
		}]);
		return Soy;
	}(IncrementalDomRenderer);

	Soy.RENDERER_NAME = 'soy';

	this['metal']['Soy'] = Soy;
	this['metalNamed']['Soy'] = this['metalNamed']['Soy'] || {};
	this['metalNamed']['Soy']['Soy'] = Soy;
	this['metalNamed']['Soy']['SoyAop'] = SoyAop;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Alert.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Alert.
     * @public
     */

    goog.module('Alert.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    dismissible: (?),
     *    elementClasses: (?),
     *    body: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.body == null || opt_data.body instanceof Function || opt_data.body instanceof goog.soy.data.SanitizedContent || opt_data.body instanceof soydata.UnsanitizedText || goog.isString(opt_data.body), 'body', opt_data.body, '?soydata.SanitizedHtml|string|undefined');
      var body = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.body;
      ie_open('div', null, null, 'class', 'alert' + (opt_data.dismissible ? ' alert-dismissible' : '') + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'role', 'alert');
      if (body) {
        var dyn0 = body;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      }
      if (opt_data.dismissible) {
        ie_open('button', null, null, 'type', 'button', 'class', 'close', 'aria-label', 'Close', 'data-onclick', 'toggle');
        ie_open('span', null, null, 'aria-hidden', 'true');
        itext('\xD7');
        ie_close('span');
        ie_close('button');
      }
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Alert.render';
    }

    exports.render.params = ["body", "dismissible", "elementClasses"];
    exports.render.types = { "body": "html|string", "dismissible": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var Alert = function (_Component) {
    babelHelpers.inherits(Alert, _Component);

    function Alert() {
      babelHelpers.classCallCheck(this, Alert);
      return babelHelpers.possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
    }

    return Alert;
  }(Component);

  Soy.register(Alert, templates);
  this['metalNamed']['Alert'] = this['metalNamed']['Alert'] || {};
  this['metalNamed']['Alert']['Alert'] = Alert;
  this['metalNamed']['Alert']['templates'] = templates;
  this['metal']['Alert'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metalNamed']['metal']['core'];
	var dom = this['metal']['dom'];
	var Anim = this['metal']['Anim'];
	var Component = this['metal']['component'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['Alert'];

	/**
  * Alert component.
  */

	var Alert = function (_Component) {
		babelHelpers.inherits(Alert, _Component);

		function Alert() {
			babelHelpers.classCallCheck(this, Alert);
			return babelHelpers.possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
		}

		babelHelpers.createClass(Alert, [{
			key: 'created',
			value: function created() {
				this.eventHandler_ = new EventHandler();
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'detached',
			value: function detached() {
				babelHelpers.get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'detached', this).call(this);
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
    * Hides the alert completely (with display "none"). This is called after the
    * hiding animation is done.
    * @protected
    */

		}, {
			key: 'hideCompletely_',
			value: function hideCompletely_() {
				if (!this.isDisposed() && !this.visible) {
					babelHelpers.get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'syncVisible', this).call(this, false);
				}
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
    * Show the alert.
    */

		}, {
			key: 'show',
			value: function show() {
				this.visible = true;
			}

			/**
    * Synchronization logic for `dismissible` state.
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
			}

			/**
    * Synchronization logic for `hideDelay` state.
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

			/**
    * Synchronization logic for `visible` state.
    * @param {boolean} visible
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(visible, prevVisible) {
				var _this2 = this;

				var shouldAsync = false;
				if (!visible) {
					dom.once(this.element, 'animationend', this.hideCompletely_.bind(this));
					dom.once(this.element, 'transitionend', this.hideCompletely_.bind(this));
				} else if (core.isDef(prevVisible)) {
					shouldAsync = true;
					babelHelpers.get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'syncVisible', this).call(this, true);
				}

				var showOrHide = function showOrHide() {
					if (_this2.isDisposed()) {
						return;
					}

					dom.removeClasses(_this2.element, _this2.animClasses[visible ? 'hide' : 'show']);
					dom.addClasses(_this2.element, _this2.animClasses[visible ? 'show' : 'hide']);

					// Some browsers do not fire transitionend events when running in background
					// tab, see https://bugzilla.mozilla.org/show_bug.cgi?id=683696.
					Anim.emulateEnd(_this2.element);

					if (visible && core.isNumber(_this2.hideDelay)) {
						_this2.syncHideDelay(_this2.hideDelay);
					}
				};

				if (shouldAsync) {
					// We need to start the animation asynchronously because of the possible
					// previous call to `super.syncVisible`, which doesn't allow the show
					// animation to work as expected.
					setTimeout(showOrHide, 0);
				} else {
					showOrHide();
				}
			}
		}]);
		return Alert;
	}(Component);

	Soy.register(Alert, templates);

	/**
  * Alert state definition.
  * @type {!Object}
  * @static
  */
	Alert.STATE = {
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
		body: {},

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

	this['metal']['Alert'] = Alert;
}).call(this);
'use strict';

/**
  * Debounces function execution.
  * @param {!function()} fn
  * @param {number} delay
  * @return {!function()}
  */

(function () {
	function debounce(fn, delay) {
		return function debounced() {
			var args = arguments;
			cancelDebounce(debounced);
			debounced.id = setTimeout(function () {
				fn.apply(null, args);
			}, delay);
		};
	}

	/**
  * Cancels the scheduled debounced function.
  */
	function cancelDebounce(debounced) {
		clearTimeout(debounced.id);
	}

	this['metal']['debounce'] = debounce;
	this['metalNamed']['debounce'] = this['metalNamed']['debounce'] || {};
	this['metalNamed']['debounce']['cancelDebounce'] = cancelDebounce;
	this['metalNamed']['debounce']['debounce'] = debounce;
}).call(this);
/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore metal-promise is temporarily using Google's promises as polyfill.
 * It supports cancellable promises and has clean and fast implementation.
 */

'use strict';

(function () {
  var isDef = this['metalNamed']['metal']['isDef'];
  var isFunction = this['metalNamed']['metal']['isFunction'];
  var isObject = this['metalNamed']['metal']['isObject'];
  var async = this['metalNamed']['metal']['async'];

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
    return this.addChildPromise_(isFunction(opt_onFulfilled) ? opt_onFulfilled : null, isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
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
      async.run(function () {
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
          if (!isDef(result) && reason.IS_CANCELLATION_ERROR) {
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
    } else if (isObject(x)) {
      try {
        var then = x.then;
        if (isFunction(then)) {
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
      async.run(this.executeCallbacks_, this);
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
      async.run(function () {
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
  CancellablePromise.handleRejection_ = async.throwException;

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
    babelHelpers.inherits(_class, _Error);

    function _class(opt_message) {
      babelHelpers.classCallCheck(this, _class);

      var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, opt_message));

      if (opt_message) {
        _this.message = opt_message;
      }
      return _this;
    }

    return _class;
  }(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  this['metalNamed']['Promise'] = this['metalNamed']['Promise'] || {};
  this['metalNamed']['Promise']['CancellablePromise'] = CancellablePromise;
  this['metal']['Promise'] = CancellablePromise;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var CancellablePromise = this['metal']['Promise'];
	var Component = this['metal']['component'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];

	/*
  * AutocompleteBase component.
  */

	var AutocompleteBase = function (_Component) {
		babelHelpers.inherits(AutocompleteBase, _Component);

		function AutocompleteBase() {
			babelHelpers.classCallCheck(this, AutocompleteBase);
			return babelHelpers.possibleConstructorReturn(this, (AutocompleteBase.__proto__ || Object.getPrototypeOf(AutocompleteBase)).apply(this, arguments));
		}

		babelHelpers.createClass(AutocompleteBase, [{
			key: 'created',

			/**
    * @inheritDoc
    */
			value: function created() {
				this.eventHandler_ = new EventHandler();
				this.on('select', this.select);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'attached',
			value: function attached() {
				if (this.inputElement) {
					this.eventHandler_.add(dom.on(this.inputElement, 'input', this.handleUserInput_.bind(this)));
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'detached',
			value: function detached() {
				this.eventHandler_.removeAllListeners();
			}

			/**
    * Handles the user input.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleUserInput_',
			value: function handleUserInput_() {
				this.request(this.inputElement.value);
			}

			/**
    * Cancels pending request and starts a request for the user input.
    * @param {string} query
    * @return {!CancellablePromise} Deferred request.
    */

		}, {
			key: 'request',
			value: function request(query) {
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
			}

			/**
    * Normalizes the provided data value. If the value is not a function, the
    * value will be wrapped in a function which returns the provided value.
    * @param {Array.<object>|Promise|function} val The provided value which
    *     have to be normalized.
    * @protected
    */

		}, {
			key: 'setData_',
			value: function setData_(val) {
				if (!core.isFunction(val)) {
					return function () {
						return val;
					};
				}
				return val;
			}
		}]);
		return AutocompleteBase;
	}(Component);

	/**
  * AutocompleteBase state definition.
  * @type {!Object}
  * @static
  */


	AutocompleteBase.STATE = {
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
				this.inputElement.value = selectedValue.text;
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

	this['metal']['AutocompleteBase'] = AutocompleteBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from ListItem.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ListItem.
     * @public
     */

    goog.module('ListItem.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('li', null, null, 'class', 'listitem list-group-item ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix', 'data-index', opt_data.index);
      if (opt_data.item.avatar) {
        ie_open('span', null, null, 'class', 'list-image pull-left ' + opt_data.item.avatar['class']);
        var dyn0 = opt_data.item.avatar.content;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('span');
      }
      ie_open('div', null, null, 'class', 'list-main-content pull-left');
      ie_open('div', null, null, 'class', 'list-text-primary');
      var dyn1 = opt_data.item.textPrimary;
      if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      ie_close('div');
      if (opt_data.item.textSecondary) {
        ie_open('div', null, null, 'class', 'list-text-secondary');
        var dyn2 = opt_data.item.textSecondary;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        ie_close('div');
      }
      ie_close('div');
      if (opt_data.item.icons) {
        var iconList45 = opt_data.item.icons;
        var iconListLen45 = iconList45.length;
        for (var iconIndex45 = 0; iconIndex45 < iconListLen45; iconIndex45++) {
          var iconData45 = iconList45[iconIndex45];
          ie_void('span', null, null, 'class', 'btn-icon ' + iconData45 + ' pull-right');
        }
      }
      if (opt_data.item.iconsHtml) {
        ie_open('div', null, null, 'class', 'pull-right');
        var iconHtmlList51 = opt_data.item.iconsHtml;
        var iconHtmlListLen51 = iconHtmlList51.length;
        for (var iconHtmlIndex51 = 0; iconHtmlIndex51 < iconHtmlListLen51; iconHtmlIndex51++) {
          var iconHtmlData51 = iconHtmlList51[iconHtmlIndex51];
          var dyn3 = iconHtmlData51;
          if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
        }
        ie_close('div');
      }
      if (opt_data.item.label) {
        ie_open('span', null, null, 'class', 'label list-label pull-right ' + opt_data.item.label['class']);
        var dyn4 = opt_data.item.label.content;
        if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
        ie_close('span');
      }
      ie_close('li');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ListItem.render';
    }

    exports.render.params = ["index", "item", "elementClasses"];
    exports.render.types = { "index": "any", "item": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var ListItem = function (_Component) {
    babelHelpers.inherits(ListItem, _Component);

    function ListItem() {
      babelHelpers.classCallCheck(this, ListItem);
      return babelHelpers.possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
    }

    return ListItem;
  }(Component);

  Soy.register(ListItem, templates);
  this['metalNamed']['ListItem'] = this['metalNamed']['ListItem'] || {};
  this['metalNamed']['ListItem']['ListItem'] = ListItem;
  this['metalNamed']['ListItem']['templates'] = templates;
  this['metal']['ListItem'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['ListItem'];

	/**
  * List component.
  */

	var ListItem = function (_Component) {
		babelHelpers.inherits(ListItem, _Component);

		function ListItem() {
			babelHelpers.classCallCheck(this, ListItem);
			return babelHelpers.possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
		}

		babelHelpers.createClass(ListItem, [{
			key: 'setterItemFn_',

			/**
    * Setter function for the `item` state key.
    * @param {!Object} item
    * @protected
    */
			value: function setterItemFn_(item) {
				if (item.textPrimary && core.isString(item.textPrimary)) {
					item.textPrimary = Soy.toIncDom(item.textPrimary);
				}
				if (item.textSecondary && core.isString(item.textSecondary)) {
					item.textSecondary = Soy.toIncDom(item.textSecondary);
				}
				if (item.avatar && item.avatar.content && core.isString(item.avatar.content)) {
					item.avatar.content = Soy.toIncDom(item.avatar.content);
				}
				if (Array.isArray(item.iconsHtml)) {
					item.iconsHtml = item.iconsHtml.map(Soy.toIncDom);
				}
				return item;
			}
		}]);
		return ListItem;
	}(Component);

	Soy.register(ListItem, templates);

	/**
  * List state definition.
  * @type {Object}
  * @static
  */
	ListItem.STATE = {
		/**
   * The item to be rendered.
   * @type {!Object}
   */
		item: {
			validator: core.isObject,
			setter: 'setterItemFn_'
		},

		/**
   * The index of the item in the list.
   * @type {number}
   */
		index: {
			value: -1
		}
	};

	this['metal']['ListItem'] = ListItem;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from List.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace List.
     * @public
     */

    goog.module('List.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('ListItem.incrementaldom', 'render');

    /**
     * @param {{
     *    elementClasses: (?),
     *    items: (?),
     *    itemsHtml: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.itemsHtml == null || opt_data.itemsHtml instanceof Function || opt_data.itemsHtml instanceof soydata.UnsanitizedText || goog.isString(opt_data.itemsHtml), 'itemsHtml', opt_data.itemsHtml, '?soydata.SanitizedHtml|string|undefined');
      var itemsHtml = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.itemsHtml;
      ie_open('div', null, null, 'class', 'list' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      ie_open('ul', null, null, 'class', 'list-group', 'data-onclick', 'handleClick');
      if (itemsHtml != null) {
        itemsHtml();
      } else {
        var itemList14 = opt_data.items;
        var itemListLen14 = itemList14.length;
        for (var itemIndex14 = 0; itemIndex14 < itemListLen14; itemIndex14++) {
          var itemData14 = itemList14[itemIndex14];
          $templateAlias1({ index: itemIndex14, item: itemData14, key: '-items-' + itemIndex14 }, null, opt_ijData);
        }
      }
      ie_close('ul');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'List.render';
    }

    exports.render.params = ["itemsHtml", "elementClasses", "items"];
    exports.render.types = { "itemsHtml": "html", "elementClasses": "any", "items": "any" };
    templates = exports;
    return exports;
  });

  var List = function (_Component) {
    babelHelpers.inherits(List, _Component);

    function List() {
      babelHelpers.classCallCheck(this, List);
      return babelHelpers.possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    return List;
  }(Component);

  Soy.register(List, templates);
  this['metalNamed']['List'] = this['metalNamed']['List'] || {};
  this['metalNamed']['List']['List'] = List;
  this['metalNamed']['List']['templates'] = templates;
  this['metal']['List'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var dom = this['metal']['dom'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['List'];

	/**
  * List component.
  */

	var List = function (_Component) {
		babelHelpers.inherits(List, _Component);

		function List() {
			babelHelpers.classCallCheck(this, List);
			return babelHelpers.possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
		}

		babelHelpers.createClass(List, [{
			key: 'handleClick',

			/**
    * Handles click event on the list. The function fires an
    * {@code itemSelected} event.
    * @param {!Event} event The native click event
    */
			value: function handleClick(event) {
				var target = event.target;
				while (target) {
					if (dom.match(target, '.listitem')) {
						break;
					}
					target = target.parentNode;
				}
				this.emit('itemSelected', target);
			}
		}]);
		return List;
	}(Component);

	Soy.register(List, templates);

	/**
  * List state definition.
  * @type {!Object}
  * @static
  */
	List.STATE = {
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
		itemsHtml: {
			isHtml: true
		}
	};

	this['metal']['List'] = List;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Autocomplete.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Autocomplete.
     * @public
     */

    goog.module('Autocomplete.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('List.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'autocomplete autocomplete-list component ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'data-onclick', 'handleClick_');
      $templateAlias1({ events: { itemSelected: opt_data.onListItemSelected_ }, ref: 'list' }, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Autocomplete.render';
    }

    exports.render.params = ["elementClasses", "onListItemSelected_"];
    exports.render.types = { "elementClasses": "any", "onListItemSelected_": "any" };
    templates = exports;
    return exports;
  });

  var Autocomplete = function (_Component) {
    babelHelpers.inherits(Autocomplete, _Component);

    function Autocomplete() {
      babelHelpers.classCallCheck(this, Autocomplete);
      return babelHelpers.possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).apply(this, arguments));
    }

    return Autocomplete;
  }(Component);

  Soy.register(Autocomplete, templates);
  this['metalNamed']['Autocomplete'] = this['metalNamed']['Autocomplete'] || {};
  this['metalNamed']['Autocomplete']['Autocomplete'] = Autocomplete;
  this['metalNamed']['Autocomplete']['templates'] = templates;
  this['metal']['Autocomplete'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var debounce = this['metal']['debounce'];
	var dom = this['metal']['dom'];
	var Promise = this['metalNamed']['Promise']['CancellablePromise'];
	var Align = this['metalNamed']['position']['Align'];
	var AutocompleteBase = this['metal']['AutocompleteBase'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['Autocomplete'];

	/*
  * Autocomplete component.
  */

	var Autocomplete = function (_AutocompleteBase) {
		babelHelpers.inherits(Autocomplete, _AutocompleteBase);

		function Autocomplete() {
			babelHelpers.classCallCheck(this, Autocomplete);
			return babelHelpers.possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).apply(this, arguments));
		}

		babelHelpers.createClass(Autocomplete, [{
			key: 'attached',

			/**
    * @inheritDoc
    */
			value: function attached() {
				babelHelpers.get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'attached', this).call(this);
				this.eventHandler_.add(dom.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
				this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
				this.eventHandler_.add(dom.on(window, 'resize', debounce(this.handleWindowResize_.bind(this), 100)));
				if (this.visible) {
					this.align();
				}
			}

			/**
    * Aligns main element to the input element.
    */

		}, {
			key: 'align',
			value: function align() {
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
			}

			/**
    * Returns the `List` component being used to render the matched items.
    * @return {!List}
    */

		}, {
			key: 'getList',
			value: function getList() {
				return this.components.list;
			}

			/**
    * Handles `click` events, stopping their propagation.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleClick_',
			value: function handleClick_(event) {
				event.stopPropagation();
			}

			/**
    * Handles document click in order to hide autocomplete. If input element is
    * focused autocomplete will not hide.
    * @param {!Event} event
    */

		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_() {
				if (document.activeElement === this.inputElement) {
					return;
				}
				this.visible = false;
			}

			/**
    * Handles input focus.
    * @param {!Event} event
    */

		}, {
			key: 'handleInputFocus_',
			value: function handleInputFocus_() {
				this.request(this.inputElement.value);
			}

			/**
    * Handles window resize events. Realigns the autocomplete results list to
    * the input field.
    */

		}, {
			key: 'handleWindowResize_',
			value: function handleWindowResize_() {
				if (this.visible) {
					this.align();
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'request',
			value: function request(query) {
				if (this.autocompleteClosing_) {
					// While closing the input element will be focused, causing another
					// request. This request should be ignored though, since we wish to close
					// the dropdown list, not open it again.
					return;
				}

				var self = this;
				return babelHelpers.get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'request', this).call(this, query).then(function (data) {
					if (data) {
						data.forEach(self.assertItemObjectStructure_);
						self.getList().items = data;
					}
					self.visible = !!(data && data.length > 0);
				});
			}

			/**
    * Emits a `select` event with the information about the selected item and
    * hides the element.
    * @param {!Element} item The list selected item.
    * @protected
    */

		}, {
			key: 'onListItemSelected_',
			value: function onListItemSelected_(item) {
				var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
				this.autocompleteClosing_ = true;
				this.emit('select', this.getList().items[selectedIndex]);
				this.visible = false;
				this.autocompleteClosing_ = false;
			}

			/**
    * Synchronization logic for `visible` state.
    * @param {boolean} visible
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				babelHelpers.get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'syncVisible', this).call(this, visible);

				if (visible) {
					this.align();
				}
			}

			/**
    * Asserts that formatted data is valid. Throws error if item is not in the
    * valid syntax.
    * @param {*} item
    * @protected
    */

		}, {
			key: 'assertItemObjectStructure_',
			value: function assertItemObjectStructure_(item) {
				if (!core.isObject(item)) {
					throw new Promise.CancellationError('Autocomplete item must be an object');
				}
				if (!item.hasOwnProperty('textPrimary')) {
					throw new Promise.CancellationError('Autocomplete item must be an object with \'textPrimary\' key');
				}
			}
		}]);
		return Autocomplete;
	}(AutocompleteBase);

	Soy.register(Autocomplete, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Autocomplete.STATE = {
		/**
   * Function that converts a given item to the format that should be used by
   * the autocomplete.
   * @type {!function()}
   */
		format: {
			value: function value(item) {
				if (core.isString(item)) {
					item = {
						textPrimary: item
					};
				}
				if (core.isObject(item) && !item.text) {
					item.text = item.textPrimary;
				}
				return item;
			}
		}
	};

	this['metal']['Autocomplete'] = Autocomplete;
}).call(this);
'use strict';

(function () {
  var Autocomplete = this['metal']['Autocomplete'];
  var AutocompleteBase = this['metal']['AutocompleteBase'];
  this['metal']['autocomplete'] = Autocomplete;
  this['metalNamed']['autocomplete'] = this['metalNamed']['autocomplete'] || {};
  this['metalNamed']['autocomplete']['Autocomplete'] = Autocomplete;
  this['metalNamed']['autocomplete']['AutocompleteBase'] = AutocompleteBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from ButtonGroup.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ButtonGroup.
     * @public
     */

    goog.module('ButtonGroup.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'btn-group component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      var buttonList30 = opt_data.buttons;
      var buttonListLen30 = buttonList30.length;
      for (var buttonIndex30 = 0; buttonIndex30 < buttonListLen30; buttonIndex30++) {
        var buttonData30 = buttonList30[buttonIndex30];
        var type__soy6 = buttonData30.type ? buttonData30.type : 'button';
        var cssClass__soy7 = buttonData30.cssClass ? buttonData30.cssClass : 'btn btn-default';
        var selectedClass__soy8 = '';
        selectedClass__soy8 += $selectedClass({ label: buttonData30.label, selected: opt_data.selected }, null, opt_ijData);
        ie_open('button', null, null, 'type', type__soy6, 'class', cssClass__soy7 + selectedClass__soy8, 'data-index', buttonIndex30, 'data-onclick', 'handleClick_', 'role', 'checkbox', 'aria-checked', selectedClass__soy8 ? 'true' : 'false');
        ie_open('span', null, null, 'class', 'btn-group-label');
        itext((goog.asserts.assert((buttonData30.label ? buttonData30.label : '') != null), buttonData30.label ? buttonData30.label : ''));
        ie_close('span');
        if (buttonData30.icon) {
          ie_void('span', null, null, 'class', buttonData30.icon);
        }
        ie_close('button');
      }
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ButtonGroup.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {string}
     * @suppress {checkTypes}
     */
    function $selectedClass(opt_data, opt_ignored, opt_ijData) {
      var output = '';
      if (opt_data.selected) {
        var selectedValueList39 = opt_data.selected;
        var selectedValueListLen39 = selectedValueList39.length;
        for (var selectedValueIndex39 = 0; selectedValueIndex39 < selectedValueListLen39; selectedValueIndex39++) {
          var selectedValueData39 = selectedValueList39[selectedValueIndex39];
          output += selectedValueData39 == opt_data.label ? ' btn-group-selected' : '';
        }
      }
      return output;
    }
    exports.selectedClass = $selectedClass;
    if (goog.DEBUG) {
      $selectedClass.soyTemplateName = 'ButtonGroup.selectedClass';
    }

    exports.render.params = ["buttons", "elementClasses", "selected"];
    exports.render.types = { "buttons": "any", "elementClasses": "any", "selected": "any" };
    exports.selectedClass.params = ["label", "selected"];
    exports.selectedClass.types = { "label": "any", "selected": "any" };
    templates = exports;
    return exports;
  });

  var ButtonGroup = function (_Component) {
    babelHelpers.inherits(ButtonGroup, _Component);

    function ButtonGroup() {
      babelHelpers.classCallCheck(this, ButtonGroup);
      return babelHelpers.possibleConstructorReturn(this, (ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).apply(this, arguments));
    }

    return ButtonGroup;
  }(Component);

  Soy.register(ButtonGroup, templates);
  this['metalNamed']['ButtonGroup'] = this['metalNamed']['ButtonGroup'] || {};
  this['metalNamed']['ButtonGroup']['ButtonGroup'] = ButtonGroup;
  this['metalNamed']['ButtonGroup']['templates'] = templates;
  this['metal']['ButtonGroup'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['ButtonGroup'];

	/**
  * Responsible for handling groups of buttons.
  */

	var ButtonGroup = function (_Component) {
		babelHelpers.inherits(ButtonGroup, _Component);

		function ButtonGroup() {
			babelHelpers.classCallCheck(this, ButtonGroup);
			return babelHelpers.possibleConstructorReturn(this, (ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).apply(this, arguments));
		}

		babelHelpers.createClass(ButtonGroup, [{
			key: 'handleClick_',

			/**
    * Handles a `click` event fired on one of the buttons. Appropriately selects
    * or deselects the clicked button.
    * @param {!Event} event
    * @protected
    */
			value: function handleClick_(event) {
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
			}

			/**
    * Setter function for the `selected` state. Checks if the minimum number
    * of buttons is selected. If not, the remaining number of buttons needed to
    * reach the minimum will be selected.
    * @param {!Object<number, boolean>|!Array<string>} selected
    * @return {!Object<number, boolean>}
    * @protected
    */

		}, {
			key: 'setterSelectedFn_',
			value: function setterSelectedFn_(selected) {
				var minSelected = Math.min(this.minSelected, this.buttons.length);
				var i = 0;
				while (selected.length < minSelected) {
					if (selected.indexOf(this.buttons[i].label) === -1) {
						selected.push(this.buttons[i].label);
					}
					i++;
				}
				return selected;
			}
		}]);
		return ButtonGroup;
	}(Component);

	Soy.register(ButtonGroup, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	ButtonGroup.STATE = {
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
  * The CSS class added to selected buttons.
  * @type {string}
  * @static
  */
	ButtonGroup.SELECTED_CLASS = 'btn-group-selected';

	this['metal']['ButtonGroup'] = ButtonGroup;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var State = this['metal']['state'];

	/**
  * Clipboard component.
  */

	var Clipboard = function (_State) {
		babelHelpers.inherits(Clipboard, _State);

		/**
   * Delegates a click event to the passed selector.
   */
		function Clipboard(opt_config) {
			babelHelpers.classCallCheck(this, Clipboard);

			var _this = babelHelpers.possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this, opt_config));

			_this.listener_ = dom.on(_this.selector, 'click', function (e) {
				return _this.initialize(e);
			});
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(Clipboard, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.listener_.dispose();
				this.listener_ = null;
				if (this.clipboardAction_) {
					this.clipboardAction_.dispose();
					this.clipboardAction_ = null;
				}
			}

			/**
    * Defines a new `ClipboardAction` on each click event.
    * @param {!Event} e
    */

		}, {
			key: 'initialize',
			value: function initialize(e) {
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
			}
		}]);
		return Clipboard;
	}(State);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */


	Clipboard.STATE = {
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

	var ClipboardAction = function (_State2) {
		babelHelpers.inherits(ClipboardAction, _State2);

		/**
   * Initializes selection either from a `text` or `target` state.
   */
		function ClipboardAction(opt_config) {
			babelHelpers.classCallCheck(this, ClipboardAction);

			var _this2 = babelHelpers.possibleConstructorReturn(this, (ClipboardAction.__proto__ || Object.getPrototypeOf(ClipboardAction)).call(this, opt_config));

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


		babelHelpers.createClass(ClipboardAction, [{
			key: 'clearSelection',
			value: function clearSelection() {
				if (this.target) {
					this.target.blur();
				}

				window.getSelection().removeAllRanges();
			}

			/**
    * Executes the copy operation based on the current selection.
    */

		}, {
			key: 'copyText',
			value: function copyText() {
				var succeeded = void 0;

				try {
					succeeded = document.execCommand(this.action);
				} catch (err) {
					succeeded = false;
				}

				this.handleResult(succeeded);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeFakeElement();
				babelHelpers.get(ClipboardAction.prototype.__proto__ || Object.getPrototypeOf(ClipboardAction.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Emits an event based on the copy operation result.
    * @param {boolean} succeeded
    */

		}, {
			key: 'handleResult',
			value: function handleResult(succeeded) {
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
			}

			/**
    * Removes the fake element that was added to the document, as well as its
    * listener.
    */

		}, {
			key: 'removeFakeElement',
			value: function removeFakeElement() {
				if (this.fake) {
					dom.exitDocument(this.fake);
				}

				if (this.removeFakeHandler) {
					this.removeFakeHandler.removeListener();
				}
			}

			/**
    * Selects the content from element passed on `target` state.
    */

		}, {
			key: 'selectTarget',
			value: function selectTarget() {
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
			}

			/**
    * Selects the content from value passed on `text` state.
    */

		}, {
			key: 'selectValue',
			value: function selectValue() {
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
			}
		}]);
		return ClipboardAction;
	}(State);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */


	ClipboardAction.STATE = {
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

	this['metal']['Clipboard'] = Clipboard;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Datatable.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Datatable.
     * @public
     */

    goog.module('Datatable.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'datatable' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      $render_(soy.$$assignDefaults({ displayColumnsType: opt_data.displayColumnsType, path: 'table', tableClasses: opt_data.tableClasses }, opt_data.data), null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Datatable.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render_(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      switch (goog.isObject($$temp = opt_data.type) ? $$temp.toString() : $$temp) {
        case 'array':
          if (opt_data.columns) {
            $renderArrayOfObjects_(opt_data, null, opt_ijData);
          } else {
            $renderArray_(opt_data, null, opt_ijData);
          }
          break;
        case 'boolean':
          $renderBoolean_(opt_data, null, opt_ijData);
          break;
        case 'null':
          $renderNull_(opt_data, null, opt_ijData);
          break;
        case 'number':
          $renderNumber_(opt_data, null, opt_ijData);
          break;
        case 'object':
          $renderObject_(opt_data, null, opt_ijData);
          break;
        case 'string':
          $renderString_(opt_data, null, opt_ijData);
          break;
        case 'undefined':
          $renderUndefined_(opt_data, null, opt_ijData);
          break;
      }
    }
    exports.render_ = $render_;
    if (goog.DEBUG) {
      $render_.soyTemplateName = 'Datatable.render_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderArray_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-array');
      $tableLabel({ number: opt_data.value.length, path: opt_data.path, type: 'Array' }, null, opt_ijData);
      ie_open('table', null, null, 'class', (opt_data.tableClasses ? opt_data.tableClasses + '' : '') + ' hidden', 'role', 'grid');
      ie_open('tbody');
      var itemValueList48 = opt_data.value;
      var itemValueListLen48 = itemValueList48.length;
      for (var itemValueIndex48 = 0; itemValueIndex48 < itemValueListLen48; itemValueIndex48++) {
        var itemValueData48 = itemValueList48[itemValueIndex48];
        $renderObjectRow_({ columns: [0], displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-' + itemValueIndex48, rowIndex: itemValueIndex48, rowLength: opt_data.value.length, tableClasses: opt_data.tableClasses, value: [itemValueData48] }, null, opt_ijData);
      }
      ie_close('tbody');
      ie_close('table');
      ie_close('span');
    }
    exports.renderArray_ = $renderArray_;
    if (goog.DEBUG) {
      $renderArray_.soyTemplateName = 'Datatable.renderArray_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderArrayOfObjects_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-array-object');
      ie_open('table', null, null, 'class', opt_data.tableClasses ? opt_data.tableClasses : '', 'role', 'grid');
      $renderObjectHeaders_({ columns: opt_data.columns, columnsType: opt_data.columnsType, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-0', rowLength: opt_data.value.length + 1 }, null, opt_ijData);
      ie_open('tbody');
      var itemValueList70 = opt_data.value;
      var itemValueListLen70 = itemValueList70.length;
      for (var itemValueIndex70 = 0; itemValueIndex70 < itemValueListLen70; itemValueIndex70++) {
        var itemValueData70 = itemValueList70[itemValueIndex70];
        $renderObjectRow_({ columns: opt_data.columns, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-' + (itemValueIndex70 + 1), rowIndex: itemValueIndex70 + 1, rowLength: opt_data.value.length + 1, tableClasses: opt_data.tableClasses, value: itemValueData70.value }, null, opt_ijData);
      }
      ie_close('tbody');
      ie_close('table');
      ie_close('span');
    }
    exports.renderArrayOfObjects_ = $renderArrayOfObjects_;
    if (goog.DEBUG) {
      $renderArrayOfObjects_.soyTemplateName = 'Datatable.renderArrayOfObjects_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderBoolean_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-boolean');
      var dyn0 = opt_data.value;
      if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      ie_close('span');
    }
    exports.renderBoolean_ = $renderBoolean_;
    if (goog.DEBUG) {
      $renderBoolean_.soyTemplateName = 'Datatable.renderBoolean_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderNull_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-null');
      itext('null');
      ie_close('span');
    }
    exports.renderNull_ = $renderNull_;
    if (goog.DEBUG) {
      $renderNull_.soyTemplateName = 'Datatable.renderNull_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderNumber_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-number');
      var dyn1 = opt_data.value;
      if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      ie_close('span');
    }
    exports.renderNumber_ = $renderNumber_;
    if (goog.DEBUG) {
      $renderNumber_.soyTemplateName = 'Datatable.renderNumber_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderObject_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-object');
      $tableLabel({ number: soy.$$getMapKeys(opt_data.value).length, path: opt_data.path, type: 'Object' }, null, opt_ijData);
      ie_open('table', null, null, 'class', (opt_data.tableClasses ? opt_data.tableClasses : '') + ' hidden', 'role', 'grid');
      $renderObjectHeaders_({ columns: opt_data.columns, columnsType: opt_data.columnsType, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-0', rowLength: 2 }, null, opt_ijData);
      ie_open('tbody');
      $renderObjectRow_({ columns: opt_data.columns, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-1', rowIndex: 1, rowLength: 2, tableClasses: opt_data.tableClasses, value: opt_data.value }, null, opt_ijData);
      ie_close('tbody');
      ie_close('table');
      ie_close('span');
    }
    exports.renderObject_ = $renderObject_;
    if (goog.DEBUG) {
      $renderObject_.soyTemplateName = 'Datatable.renderObject_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderObjectHeaders_(opt_data, opt_ignored, opt_ijData) {
      ie_open('thead');
      ie_open('tr', null, null, 'data-rows', opt_data.rowLength);
      var columnList127 = opt_data.columns;
      var columnListLen127 = columnList127.length;
      for (var columnIndex127 = 0; columnIndex127 < columnListLen127; columnIndex127++) {
        var columnData127 = columnList127[columnIndex127];
        var currPath__soy112 = opt_data.path + '-' + columnIndex127;
        ie_open('th', null, null, 'role', 'columnheader', 'scope', 'col', 'ref', currPath__soy112, 'tabindex', columnIndex127 == 0 ? '0' : '-1', 'data-cols', opt_data.columns.length);
        var dyn2 = columnData127;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        if (opt_data.displayColumnsType && opt_data.columnsType) {
          ie_open('span', null, null, 'class', 'datatable-type');
          var dyn3 = opt_data.columnsType[columnData127];
          if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
          ie_close('span');
        }
        ie_close('th');
      }
      ie_close('tr');
      ie_close('thead');
    }
    exports.renderObjectHeaders_ = $renderObjectHeaders_;
    if (goog.DEBUG) {
      $renderObjectHeaders_.soyTemplateName = 'Datatable.renderObjectHeaders_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderObjectRow_(opt_data, opt_ignored, opt_ijData) {
      ie_open('tr', null, null, 'data-rows', opt_data.rowLength);
      var columnList147 = opt_data.columns;
      var columnListLen147 = columnList147.length;
      for (var columnIndex147 = 0; columnIndex147 < columnListLen147; columnIndex147++) {
        var columnData147 = columnList147[columnIndex147];
        var currPath__soy134 = opt_data.path + '-' + columnIndex147;
        ie_open('td', null, null, 'role', 'gridcell', 'ref', currPath__soy134, 'tabindex', opt_data.rowIndex == 0 && columnIndex147 == 0 ? '0' : '-1', 'data-cols', opt_data.columns.length);
        $render_(soy.$$assignDefaults({ displayColumnsType: opt_data.displayColumnsType, path: currPath__soy134, tableClasses: opt_data.tableClasses }, opt_data.value[columnData147]), null, opt_ijData);
        ie_close('td');
      }
      ie_close('tr');
    }
    exports.renderObjectRow_ = $renderObjectRow_;
    if (goog.DEBUG) {
      $renderObjectRow_.soyTemplateName = 'Datatable.renderObjectRow_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderUndefined_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-undefined');
      itext('undefined');
      ie_close('span');
    }
    exports.renderUndefined_ = $renderUndefined_;
    if (goog.DEBUG) {
      $renderUndefined_.soyTemplateName = 'Datatable.renderUndefined_';
    }

    /**
     * @param {{
     *    value: (!soydata.SanitizedHtml|string)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderString_(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.value instanceof Function || opt_data.value instanceof soydata.UnsanitizedText || goog.isString(opt_data.value), 'value', opt_data.value, 'Function');
      var value = /** @type {Function} */opt_data.value;
      ie_open('span', null, null, 'class', 'datatable-string');
      value();
      ie_close('span');
    }
    exports.renderString_ = $renderString_;
    if (goog.DEBUG) {
      $renderString_.soyTemplateName = 'Datatable.renderString_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $tableLabel(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-label collapsed', 'data-onkeydown', 'handleKeydownToggle_', 'data-onclick', 'handleClickToggle_', 'ref', opt_data.path + '-label', 'tabindex', opt_data.path == 'table' ? 0 : -1);
      var dyn4 = opt_data.type;
      if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
      itext(', ');
      var dyn5 = opt_data.number;
      if (typeof dyn5 == 'function') dyn5();else if (dyn5 != null) itext(dyn5);
      itext(' items');
      ie_close('span');
    }
    exports.tableLabel = $tableLabel;
    if (goog.DEBUG) {
      $tableLabel.soyTemplateName = 'Datatable.tableLabel';
    }

    exports.render.params = ["data", "displayColumnsType", "elementClasses", "tableClasses"];
    exports.render.types = { "data": "any", "displayColumnsType": "any", "elementClasses": "any", "tableClasses": "any" };
    exports.render_.params = ["path", "type", "columns"];
    exports.render_.types = { "path": "any", "type": "any", "columns": "any" };
    exports.renderArray_.params = ["path", "value", "displayColumnsType", "tableClasses"];
    exports.renderArray_.types = { "path": "any", "value": "any", "displayColumnsType": "any", "tableClasses": "any" };
    exports.renderArrayOfObjects_.params = ["columns", "value", "columnsType", "displayColumnsType", "path", "tableClasses"];
    exports.renderArrayOfObjects_.types = { "columns": "any", "value": "any", "columnsType": "any", "displayColumnsType": "any", "path": "any", "tableClasses": "any" };
    exports.renderBoolean_.params = ["value"];
    exports.renderBoolean_.types = { "value": "any" };
    exports.renderNull_.params = [];
    exports.renderNull_.types = {};
    exports.renderNumber_.params = ["value"];
    exports.renderNumber_.types = { "value": "any" };
    exports.renderObject_.params = ["columns", "value", "columnsType", "displayColumnsType", "path", "tableClasses"];
    exports.renderObject_.types = { "columns": "any", "value": "any", "columnsType": "any", "displayColumnsType": "any", "path": "any", "tableClasses": "any" };
    exports.renderObjectHeaders_.params = ["columns", "columnsType", "displayColumnsType", "path", "rowLength"];
    exports.renderObjectHeaders_.types = { "columns": "any", "columnsType": "any", "displayColumnsType": "any", "path": "any", "rowLength": "any" };
    exports.renderObjectRow_.params = ["columns", "value", "displayColumnsType", "path", "rowIndex", "rowLength", "tableClasses"];
    exports.renderObjectRow_.types = { "columns": "any", "value": "any", "displayColumnsType": "any", "path": "any", "rowIndex": "any", "rowLength": "any", "tableClasses": "any" };
    exports.renderUndefined_.params = [];
    exports.renderUndefined_.types = {};
    exports.renderString_.params = ["value"];
    exports.renderString_.types = { "value": "html" };
    exports.tableLabel.params = ["number", "path", "type"];
    exports.tableLabel.types = { "number": "any", "path": "any", "type": "any" };
    templates = exports;
    return exports;
  });

  var Datatable = function (_Component) {
    babelHelpers.inherits(Datatable, _Component);

    function Datatable() {
      babelHelpers.classCallCheck(this, Datatable);
      return babelHelpers.possibleConstructorReturn(this, (Datatable.__proto__ || Object.getPrototypeOf(Datatable)).apply(this, arguments));
    }

    return Datatable;
  }(Component);

  Soy.register(Datatable, templates);
  this['metalNamed']['Datatable'] = this['metalNamed']['Datatable'] || {};
  this['metalNamed']['Datatable']['Datatable'] = Datatable;
  this['metalNamed']['Datatable']['templates'] = templates;
  this['metal']['Datatable'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var EventEmitter = this['metal']['events'];

	/**
  * Listens to keyboard events and uses them to move focus between different
  * elements from a component (via the arrow keys for example).
  * By default `KeyboardFocusManager` will assume that all focusable elements
  * in the component will have refs that follow the pattern in
  * KeyboardFocusManager.REF_REGEX, which includes a position number. The arrow
  * keys will then automatically move between elements by
  * incrementing/decrementing this position.
  * It's possible to fully customize this behavior by passing a function to
  * `setFocusHandler`. For more details check this function's docs.
  */

	var KeyboardFocusManager = function (_EventEmitter) {
		babelHelpers.inherits(KeyboardFocusManager, _EventEmitter);

		/**
   * Constructor for `KeyboardFocusManager`.
   * @param {!Component} component
   * @param {string=} opt_selector
   */
		function KeyboardFocusManager(component, opt_selector) {
			babelHelpers.classCallCheck(this, KeyboardFocusManager);

			var _this = babelHelpers.possibleConstructorReturn(this, (KeyboardFocusManager.__proto__ || Object.getPrototypeOf(KeyboardFocusManager)).call(this));

			_this.component_ = component;
			_this.selector_ = opt_selector || '*';
			_this.handleKey_ = _this.handleKey_.bind(_this);
			return _this;
		}

		/**
   * Builds a ref string for the given position.
   * @param {string} prefix
   * @param {number|string} position
   * @return {string}
   * @protected
   */


		babelHelpers.createClass(KeyboardFocusManager, [{
			key: 'buildRef_',
			value: function buildRef_(prefix, position) {
				return prefix + position;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(KeyboardFocusManager.prototype.__proto__ || Object.getPrototypeOf(KeyboardFocusManager.prototype), 'disposeInternal', this).call(this);
				this.stop();
				this.component_ = null;
				this.selector_ = null;
			}

			/**
    * Gets the next focusable element, that is, the next element that doesn't
    * have the `data-unfocusable` attribute set to `true`.
    * @param {string} prefix
    * @param {number} position
    * @param {number} increment
    * @return {string}
    * @protected
    */

		}, {
			key: 'getNextFocusable_',
			value: function getNextFocusable_(prefix, position, increment) {
				var initialPosition = position;
				var element = void 0;
				var ref = void 0;
				do {
					position = this.increment_(position, increment);
					ref = this.buildRef_(prefix, position);
					element = this.component_.refs[ref];
				} while (this.isFocusable_(element) && position !== initialPosition);
				return element ? ref : null;
			}

			/**
    * Handles a `keydown` event. Decides if a new element should be focused
    * according to the key that was pressed.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKey_',
			value: function handleKey_(event) {
				var element = this.focusHandler_ && this.focusHandler_(event);
				if (!this.focusHandler_ || element === true) {
					element = this.handleKeyDefault_(event);
				}

				var originalValue = element;
				if (!core.isElement(element)) {
					element = this.component_.refs[element];
				}
				if (element) {
					element.focus();
					this.emit(KeyboardFocusManager.EVENT_FOCUSED, {
						element: element,
						ref: core.isString(originalValue) ? originalValue : null
					});
				}
			}

			/**
    * Handles a key press according to the default behavior. Assumes that all
    * focusable elements in the component will have refs that follow the pattern
    * in KeyboardFocusManager.REF_REGEX, which includes a position number. The
    * arrow keys will then automatically move between elements by
    * incrementing/decrementing the position.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeyDefault_',
			value: function handleKeyDefault_(event) {
				var ref = event.delegateTarget.getAttribute('ref');
				var matches = KeyboardFocusManager.REF_REGEX.exec(ref);
				if (!matches) {
					return;
				}

				var position = parseInt(matches[1], 10);
				var prefix = ref.substr(0, ref.length - matches[1].length);
				switch (event.keyCode) {
					case 37:
					case 38:
						// Left/up arrow keys will focus the previous element.
						return this.getNextFocusable_(prefix, position, -1);
					case 39:
					case 40:
						// Right/down arrow keys will focus the next element.
						return this.getNextFocusable_(prefix, position, 1);
				}
			}

			/**
    * Increments the given position, making sure to follow circular rules if
    * enabled.
    * @param {number} position
    * @param {number} increment
    * @return {number}
    * @protected
    */

		}, {
			key: 'increment_',
			value: function increment_(position, increment) {
				var size = this.circularLength_;
				position += increment;
				if (core.isNumber(size)) {
					if (position < 0) {
						position = size - 1;
					} else if (position >= size) {
						position = 0;
					}
				}
				return position;
			}

			/**
    * Checks if the given element is focusable.
    * @param {Element} element
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'isFocusable_',
			value: function isFocusable_(element) {
				return element && element.getAttribute('data-unfocusable') === 'true';
			}

			/**
    * Sets the length of the focusable elements. If a number is passed, the
    * default focusing behavior will follow a circular pattern, going from the
    * last to the first element, and vice versa.
    * @param {?number} circularLength
    * @chainable
    */

		}, {
			key: 'setCircularLength',
			value: function setCircularLength(circularLength) {
				this.circularLength_ = circularLength;
				return this;
			}

			/**
    * Sets a handler function that will be called to decide which element should
    * be focused according to the key that was pressed. It will receive the key
    * event and should return one of the following:
    *   - `true`, if the default behavior should be triggered instead.
    *   - A string, representing a `ref` to the component element that should be
    *       focused.
    *   - The element itself that should be focused.
    *   - Anything else, if nothing should be focused (skipping default behavior
    *       too).
    * @param {function(key: string)} focusHandler
    * @chainable
    */

		}, {
			key: 'setFocusHandler',
			value: function setFocusHandler(focusHandler) {
				this.focusHandler_ = focusHandler;
				return this;
			}

			/**
    * Starts listening to keyboard events and handling element focus.
    * @chainable
    */

		}, {
			key: 'start',
			value: function start() {
				if (!this.handle_) {
					this.handle_ = this.component_.delegate('keydown', this.selector_, this.handleKey_);
				}
				return this;
			}

			/**
    * Stops listening to keyboard events and handling element focus.
    * @chainable
    */

		}, {
			key: 'stop',
			value: function stop() {
				if (this.handle_) {
					this.handle_.removeListener();
					this.handle_ = null;
				}
				return this;
			}
		}]);
		return KeyboardFocusManager;
	}(EventEmitter);

	// Event emitted when a selected element was focused via the keyboard.


	KeyboardFocusManager.EVENT_FOCUSED = 'focused';

	// The regex used to extract the position from an element's ref.
	KeyboardFocusManager.REF_REGEX = /.+-(\d+)$/;

	this['metal']['KeyboardFocusManager'] = KeyboardFocusManager;
}).call(this);
'use strict';

/**
 * Metal.js browser user agent detection. It's extremely recommended the usage
 * of feature checking over browser user agent sniffing. Unfortunately, in some
 * situations feature checking can be slow or even impossible, therefore use
 * this utility with caution.
 * @see <a href="http://www.useragentstring.com/">User agent strings</a>.
 */

(function () {
	var UA = function () {
		function UA() {
			babelHelpers.classCallCheck(this, UA);
		}

		babelHelpers.createClass(UA, null, [{
			key: 'getNativeUserAgent',

			/**
    * Gets the native userAgent string from navigator if it exists. If
    * navigator or navigator.userAgent string is missing, returns an empty
    * string.
    * @return {string}
    * @private
    * @static
    */
			value: function getNativeUserAgent() {
				var navigator = UA.globals.window.navigator;
				if (navigator) {
					var userAgent = navigator.userAgent;
					if (userAgent) {
						return userAgent;
					}
				}
				return '';
			}

			/**
    * Gets the native platform string from navigator if it exists. If
    * navigator or navigator.platform string is missing, returns an empty
    * string.
    * @return {string}
    * @private
    * @static
    */

		}, {
			key: 'getNativePlatform',
			value: function getNativePlatform() {
				var navigator = UA.globals.window.navigator;
				if (navigator) {
					var platform = navigator.platform;
					if (platform) {
						return platform;
					}
				}
				return '';
			}

			/**
    * Whether the platform contains the given string, ignoring case.
    * @param {string} str
    * @return {boolean}
    * @private
    * @static
   */

		}, {
			key: 'matchPlatform',
			value: function matchPlatform(str) {
				return UA.platform.indexOf(str) !== -1;
			}

			/**
    * Whether the user agent contains the given string, ignoring case.
    * @param {string} str
    * @return {boolean}
    * @private
    * @static
   */

		}, {
			key: 'matchUserAgent',
			value: function matchUserAgent(str) {
				return UA.userAgent.indexOf(str) !== -1;
			}

			/**
    * Tests the user agent.
    * @param {string} userAgent The user agent string.
    * @static
    */

		}, {
			key: 'testUserAgent',
			value: function testUserAgent() {
				var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

				/**
     * Holds the user agent value extracted from browser native user agent.
     * @type {string}
     * @static
     */
				UA.userAgent = userAgent;

				/**
     * Holds the platform value extracted from browser native platform.
     * @type {string}
     * @static
     */
				UA.platform = platform;

				/**
     * Whether the user's OS is Mac.
     * @type {boolean}
     * @static
     */
				UA.isMac = UA.matchPlatform('Mac');

				/**
     * Whether the user's OS is Win.
     * @type {boolean}
     * @static
     */
				UA.isWin = UA.matchPlatform('Win');

				/**
     * Whether the user's browser is Opera.
     * @type {boolean}
     * @static
     */
				UA.isOpera = UA.matchUserAgent('Opera') || UA.matchUserAgent('OPR');

				/**
     * Whether the user's browser is IE.
     * @type {boolean}
     * @static
     */
				UA.isIe = UA.matchUserAgent('Trident') || UA.matchUserAgent('MSIE');

				/**
     * Whether the user's browser is Edge.
     * @type {boolean}
     * @static
     */
				UA.isEdge = UA.matchUserAgent('Edge');

				/**
     * Whether the user's browser is IE or Edge.
     * @type {boolean}
     * @static
     */
				UA.isIeOrEdge = UA.isIe || UA.isEdge;

				/**
     * Whether the user's browser is Chrome.
     * @type {boolean}
     * @static
     */
				UA.isChrome = (UA.matchUserAgent('Chrome') || UA.matchUserAgent('CriOS')) && !UA.isOpera && !UA.isEdge;

				/**
     * Whether the user's browser is Safari.
     * @type {boolean}
     * @static
     */
				UA.isSafari = UA.matchUserAgent('Safari') && !(UA.isChrome || UA.isOpera || UA.isEdge);

				/**
     * Whether the user's browser is Firefox.
     * @type {boolean}
     * @static
     */
				UA.isFirefox = UA.matchUserAgent('Firefox');
			}
		}]);
		return UA;
	}();

	/**
  * Exposes global references.
  * @type {object}
  * @static
  */


	UA.globals = {
		window: window
	};

	UA.testUserAgent(UA.getNativeUserAgent(), UA.getNativePlatform());

	this['metal']['UA'] = UA;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var templates = this['metal']['Datatable'];
	var Component = this['metal']['component'];
	var KeyboardFocusManager = this['metal']['KeyboardFocusManager'];
	var Soy = this['metal']['Soy'];
	var UA = this['metal']['UA'];

	var Datatable = function (_Component) {
		babelHelpers.inherits(Datatable, _Component);

		function Datatable() {
			babelHelpers.classCallCheck(this, Datatable);
			return babelHelpers.possibleConstructorReturn(this, (Datatable.__proto__ || Object.getPrototypeOf(Datatable)).apply(this, arguments));
		}

		babelHelpers.createClass(Datatable, [{
			key: 'assertNoMixedTypesInArrays_',


			/**
    * Visits array items and asserts that it only contains one literal type.
    * @param {array} value
    * @protected
    * @throws {Error} If types are different.
    */
			value: function assertNoMixedTypesInArrays_(value) {
				var _this2 = this;

				var lastType;
				var acceptArray = function acceptArray(v) {
					var type = _this2.getValueType_(v);
					_this2.assertSameTypes_(lastType, type);
					lastType = type;
					_this2.assertNoMixedTypesInArrays_(v);
				};
				var acceptObject = function acceptObject(v) {
					return _this2.assertNoMixedTypesInArrays_(v);
				};
				this.visit_(value, acceptArray, acceptObject);
			}

			/**
    * Asserts literal types are not the same.
    * @param {string} type1
    * @param {string} type2
    * @protected
    * @throws {Error} If types are different.
    */

		}, {
			key: 'assertSameTypes_',
			value: function assertSameTypes_(type1, type2) {
				if (type1 && type2 && type1 !== type2) {
					throw new Error('Datatable does not support mixed types in arrays.');
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'attached',
			value: function attached() {
				this.keyboardFocusManager_ = new KeyboardFocusManager(this, 'td,th').setFocusHandler(this.handleNextFocus_.bind(this)).start();
			}

			/**
    * Builds a ref with for the given row and column positions.
    * @param {string} prefix
    * @param {number} row
    * @param {number} col
    * @return {string}
    * @protected
    */

		}, {
			key: 'buildRef_',
			value: function buildRef_(prefix, row, col) {
				return prefix + row + '-' + col;
			}

			/**
    * Builds a ref string pointing to the last column.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {string}
    * @protected
    */

		}, {
			key: 'buildRefLastColumn_',
			value: function buildRefLastColumn_(event, data) {
				var element = event.delegateTarget;
				var cellLength = parseInt(element.getAttribute('data-cols'), 10);
				return this.buildRef_(data.prefix, data.row, cellLength - 1);
			}

			/**
    * Builds a ref string pointing to the last row.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {string}
    * @protected
    */

		}, {
			key: 'buildRefLastRow_',
			value: function buildRefLastRow_(event, data) {
				var element = event.delegateTarget.parentNode;
				var rowLength = parseInt(element.getAttribute('data-rows'), 10);
				return this.buildRef_(data.prefix, rowLength - 1, data.col);
			}

			/**
    * Extract keys from an array of objects. Column values are aggregated from
    * extracting 1-deep key values. For other array types keys are not
    * extracted and values are plotted in one column vertically.
    * @param {object} expandedValue
    * @protected
    */

		}, {
			key: 'collectColumnsFromArrayValues_',
			value: function collectColumnsFromArrayValues_(expandedValue) {
				var _this3 = this;

				var value = expandedValue.value;
				var isFirstArrayItemObject = value[0] && value[0].type === Datatable.TYPES.OBJECT;
				if (isFirstArrayItemObject) {
					(function () {
						var columns = {};
						var columnsType = {};
						value.forEach(function (item) {
							return Object.keys(item.value).forEach(function (key) {
								columns[key] = true;
								columnsType[key] = item.value[key].type;
							});
						});
						expandedValue.columns = _this3.formatColumns(Object.keys(columns));
						expandedValue.columnsType = _this3.formatColumnsType(columnsType);
					})();
				}
			}

			/**
    * Extract columns from object keys.
    * @param {object} expandedValue
    * @protected
    */

		}, {
			key: 'collectColumnsFromObjectKeys_',
			value: function collectColumnsFromObjectKeys_(expandedValue) {
				var value = expandedValue.value;
				var columns = {};
				var columnsType = {};
				Object.keys(value).forEach(function (key) {
					columns[key] = true;
					columnsType[key] = value[key].type;
				});
				expandedValue.columns = this.formatColumns(Object.keys(columns));
				expandedValue.columnsType = this.formatColumnsType(columnsType);
			}

			/**
    * Analyzes the expanded object containing type and value and extracts an
    * array of columns to be used for plotting.
    * @param {object} expandedValue
    * @protected
    */

		}, {
			key: 'collectColumnsFromValues_',
			value: function collectColumnsFromValues_(expandedValue) {
				switch (expandedValue.type) {
					case Datatable.TYPES.ARRAY:
						this.collectColumnsFromArrayValues_(expandedValue);
						break;
					case Datatable.TYPES.OBJECT:
						this.collectColumnsFromObjectKeys_(expandedValue);
						break;
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposed',
			value: function disposed() {
				if (this.keyboardFocusManager_) {
					this.keyboardFocusManager_.dispose();
					this.keyboardFocusManager_ = null;
				}
			}

			/**
    * Gets data (prefix, row and column) from the given ref.
    * @param {string} ref
    * @return {!{col: number, prefix: string, row: number}}
    * @protected
    */

		}, {
			key: 'extractDataFromRef_',
			value: function extractDataFromRef_(ref) {
				var matches = Datatable.REF_REGEX.exec(ref);
				return {
					col: parseInt(matches[2], 10),
					prefix: ref.substr(0, ref.length - matches[0].length),
					row: parseInt(matches[1], 10)
				};
			}

			/**
    * Internal helper to get literal JSON type of a value.
    * @param {*} value
    * @return {string} Type inferred from JSON value.
    */

		}, {
			key: 'getValueType_',
			value: function getValueType_(value) {
				if (value === null) {
					return Datatable.TYPES.NULL;
				}
				if (value === undefined) {
					return Datatable.TYPES.UNDEFINED;
				}
				if (Array.isArray(value)) {
					return Datatable.TYPES.ARRAY;
				}
				if (core.isObject(value) && value.contentKind === 'HTML') {
					return Datatable.TYPES.STRING;
				}
				return typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
			}

			/**
    * Handles a 'click' event on a table label. Shows/hides the table.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleClickToggle_',
			value: function handleClickToggle_(event) {
				this.toggleTableContents(event.delegateTarget);
			}

			/**
    * Handles pressing the down arrow key inside a datatable grid.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {string|boolean}
    * @protected
    */

		}, {
			key: 'handleDownArrowKey_',
			value: function handleDownArrowKey_(event, data) {
				if (event.metaKey && UA.isMac) {
					return this.buildRefLastRow_(event, data);
				} else {
					return this.buildRef_(data.prefix, data.row + 1, data.col);
				}
			}

			/**
    * Handles pressing the enter key inside a datatable grid. Shows/hides the
    * datatable inside the columns, if there is one.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @protected
    */

		}, {
			key: 'handleEnterKey_',
			value: function handleEnterKey_(event, data) {
				var ref = this.buildRef_(data.prefix, data.row, data.col) + '-label';
				if (this.refs[ref]) {
					this.toggleTableContents(this.refs[ref]);
				}
				event.stopPropagation();
			}

			/**
    * Handles a 'keydown' event on a table label. Shows/hides the table if the
    * pressed key was either ENTER or SPACE.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeydownToggle_',
			value: function handleKeydownToggle_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.toggleTableContents(event.delegateTarget);
				}
			}

			/**
    * Handles pressing the left arrow key inside a datatable grid.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {string|boolean}
    * @protected
    */

		}, {
			key: 'handleLeftArrowKey_',
			value: function handleLeftArrowKey_(event, data) {
				if (event.metaKey && UA.isMac) {
					return this.buildRef_(data.prefix, data.row, 0);
				}
				return true;
			}

			/**
    * Handles pressing the right arrow key inside a datatable grid.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {string|boolean}
    * @protected
    */

		}, {
			key: 'handleRightArrowKey_',
			value: function handleRightArrowKey_(event, data) {
				if (event.metaKey && UA.isMac) {
					return this.buildRefLastColumn_(event, data);
				}
				return true;
			}

			/**
    * Handles pressing the up arrow key inside a datatable grid.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {string|boolean}
    * @protected
    */

		}, {
			key: 'handleUpArrowKey_',
			value: function handleUpArrowKey_(event, data) {
				if (event.metaKey && UA.isMac) {
					return this.buildRef_(data.prefix, 0, data.col);
				} else {
					return this.buildRef_(data.prefix, data.row - 1, data.col);
				}
			}

			/**
    * Handles focus through keyboard, given the extracted ref data.
    * @param {!Event} event
    * @param {!Object} data Data extracted from the current cell's ref.
    * @return {boolean|string|Element}
    * @protected
    */

		}, {
			key: 'handleNextFocusData_',
			value: function handleNextFocusData_(event, data) {
				switch (event.keyCode) {
					case 13:
					case 32:
						return this.handleEnterKey_(event, data);
					case 33:
						return this.buildRef_(data.prefix, 0, data.col);
					case 34:
						return this.buildRefLastRow_(event, data);
					case 35:
						return this.buildRefLastColumn_(event, data);
					case 36:
						return this.buildRef_(data.prefix, data.row, 0);
					case 37:
						return this.handleLeftArrowKey_(event, data);
					case 38:
						return this.handleUpArrowKey_(event, data);
					case 39:
						return this.handleRightArrowKey_(event, data);
					case 40:
						return this.handleDownArrowKey_(event, data);
				}
			}

			/**
    * Handles focus through keyboard.
    * @param {!Event} event
    * @return {boolean|string|Element}
    * @protected
    */

		}, {
			key: 'handleNextFocus_',
			value: function handleNextFocus_(event) {
				var ref = event.delegateTarget.getAttribute('ref');
				var data = this.extractDataFromRef_(ref);
				var returnValue = this.handleNextFocusData_(event, data);
				if (returnValue) {
					event.preventDefault();
					event.stopPropagation();
				}
				return returnValue;
			}

			/**
    * Returns true if data is already expanded, false otherwise.
    * @param {*} data
    * @return {boolean}
    */

		}, {
			key: 'isAlreadyExpanded',
			value: function isAlreadyExpanded(data) {
				return core.isObject(data) && 'columns' in data && 'type' in data;
			}

			/**
    * Setter for the `data` state property.
    * @param {!Object}
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'setData_',
			value: function setData_(data) {
				if (!this.isAlreadyExpanded(data)) {
					this.assertNoMixedTypesInArrays_(data);
					data = this.visitValuesAndExpandType_(data);
				}
				return this.visitValuesAndWrapStringValues_(data);
			}

			/**
    * Toggles sibling table content related to given label.
    * @param {!Element} label
    */

		}, {
			key: 'toggleTableContents',
			value: function toggleTableContents(label) {
				dom.toggleClasses(label, this.labelClasses);
				dom.toggleClasses(dom.next(label, 'table'), this.hiddenClasses);
			}

			/**
    * Internal non-recursive visitor helper to navigate over JSON values.
    * @param {*} value The value to start the visit.
    * @param {!function} acceptArray Accept logic for array items.
    * @param {!function} acceptObject Accept logic for object keys and values.
    * @protected
    */

		}, {
			key: 'visit_',
			value: function visit_(value, acceptArray, acceptObject) {
				switch (this.getValueType_(value)) {
					case Datatable.TYPES.ARRAY:
						value.forEach(function (v, k) {
							return acceptArray(v, k, value);
						});
						break;
					case Datatable.TYPES.OBJECT:
						Object.keys(value).forEach(function (k) {
							return acceptObject(value[k], k, value);
						});
						break;
				}
			}

			/**
    * Visits all json values and wraps it in object containing its type and
    * value.
    * @param {*} value The value to start the visit.
    * @return {object} Wrapped object containing type and value.
    * @protected
    */

		}, {
			key: 'visitValuesAndExpandType_',
			value: function visitValuesAndExpandType_(value) {
				var _this4 = this;

				var acceptArray = function acceptArray(val, key, reference) {
					return reference[key] = _this4.visitValuesAndExpandType_(val);
				};
				var acceptObject = function acceptObject(val, key, reference) {
					return reference[key] = _this4.visitValuesAndExpandType_(val);
				};
				this.visit_(value, acceptArray, acceptObject);
				var type = this.getValueType_(value);
				var expanded = {
					type: type,
					value: value
				};
				this.collectColumnsFromValues_(expanded);
				return expanded;
			}

			/**
    * Visits all json values and wraps it in special `Soy.toIncDom` helper if
    * it's string.
    * @param {*} value The value to start the visit.
    * @return {object} Wrapped string.
    * @protected
    */

		}, {
			key: 'visitValuesAndWrapStringValues_',
			value: function visitValuesAndWrapStringValues_(value) {
				var _this5 = this;

				var acceptArray = function acceptArray(val, key, reference) {
					return reference[key] = _this5.visitValuesAndWrapStringValues_(val);
				};
				var acceptObject = function acceptObject(val, key, reference) {
					return reference[key] = _this5.visitValuesAndWrapStringValues_(val);
				};
				this.visit_(value, acceptArray, acceptObject);
				if (core.isObject(value)) {
					var type = this.getValueType_(value.value);
					if (type === Datatable.TYPES.STRING) {
						value.value = Soy.toIncDom(value.value);
					}
				}
				return value;
			}
		}]);
		return Datatable;
	}(Component);

	Soy.register(Datatable, templates);

	Datatable.STATE = {
		/**
   * Data to be plotted on datatable. Any JSON type is supported if it does
   * not contain mixed types inside an array.
   * @type {*}
   */
		data: {
			setter: 'setData_'
		},

		/**
   * If true displays types in column.
   * @type {boolean}
   * @default true
   */
		displayColumnsType: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * Formats array of columns extracted from JSON data. Relevant for operates
   * over column values, such as sorting and formatting.
   * @type {function(array.<string>)}
   */
		formatColumns: {
			validator: core.isFunction,
			value: function value(columns) {
				return columns.sort();
			}
		},

		/**
   * Formats map of columns type extracted from JSON data. Relevant for
   * operates over column values, such as sorting and formatting.
   * @type {function(map.<string,string>)}
   */
		formatColumnsType: {
			validator: core.isFunction,
			value: function value(columnstype) {
				return columnstype;
			}
		},

		/**
   * Css classes to be used for hidden state.
   * @type {string}
   * @default 'hidden'
   */
		hiddenClasses: {
			validator: core.isString,
			value: 'hidden'
		},

		/**
   * Css classes to be used for labels.
   * @type {string}
   * @default 'collapsed expanded'
   */
		labelClasses: {
			validator: core.isString,
			value: 'collapsed expanded'
		},

		/**
   * Css classes to be used for tables.
   * @type {string}
   * @default 'table table-condensed table-hover'
   */
		tableClasses: {
			validator: core.isString,
			value: 'table table-bordered table-condensed table-hover'
		}
	};

	// The regex used to extract the row/column positions from an element's ref.
	Datatable.REF_REGEX = /(\d+)-(\d+)$/;

	/**
  * Datatable supported types.
  * @type {object}
  * @static
  */
	Datatable.TYPES = {
		ARRAY: 'array',
		BOOLEAN: 'boolean',
		NULL: 'null',
		NUMBER: 'number',
		OBJECT: 'object',
		STRING: 'string',
		UNDEFINED: 'undefined'
	};

	this['metal']['Datatable'] = Datatable;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Dropdown.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Dropdown.
     * @public
     */

    goog.module('Dropdown.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    alignedPosition: (?),
     *    classMap: (?),
     *    elementClasses: (?),
     *    expanded: (?),
     *    position: (?),
     *    positionClassOnMenu: (?),
     *    body: (?soydata.SanitizedHtml|string|undefined),
     *    header: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.body == null || opt_data.body instanceof Function || opt_data.body instanceof soydata.UnsanitizedText || goog.isString(opt_data.body), 'body', opt_data.body, '?soydata.SanitizedHtml|string|undefined');
      var body = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.body;
      soy.asserts.assertType(opt_data.header == null || opt_data.header instanceof Function || opt_data.header instanceof soydata.UnsanitizedText || goog.isString(opt_data.header), 'header', opt_data.header, '?soydata.SanitizedHtml|string|undefined');
      var header = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.header;
      var classes__soy3 = opt_data.classMap ? opt_data.classMap : ['dropup', 'dropup', 'dropright', 'dropdown', 'dropdown', 'dropdown', 'dropleft', 'dropup'];
      var currentPosition__soy4 = opt_data.alignedPosition != null ? opt_data.alignedPosition : opt_data.position;
      var positionClass__soy5 = currentPosition__soy4 != null ? classes__soy3[currentPosition__soy4] : 'dropdown';
      ie_open('div', null, null, 'class', (opt_data.positionClassOnMenu ? 'dropdown' : positionClass__soy5) + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + (opt_data.expanded ? ' open' : ''));
      if (header) {
        header();
      }
      ie_open('ul', null, null, 'class', 'dropdown-menu' + (opt_data.positionClassOnMenu ? ' ' + positionClass__soy5 : ''));
      if (body) {
        body();
      }
      ie_close('ul');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Dropdown.render';
    }

    exports.render.params = ["body", "header", "alignedPosition", "classMap", "elementClasses", "expanded", "position", "positionClassOnMenu"];
    exports.render.types = { "body": "html", "header": "html", "alignedPosition": "any", "classMap": "any", "elementClasses": "any", "expanded": "any", "position": "any", "positionClassOnMenu": "any" };
    templates = exports;
    return exports;
  });

  var Dropdown = function (_Component) {
    babelHelpers.inherits(Dropdown, _Component);

    function Dropdown() {
      babelHelpers.classCallCheck(this, Dropdown);
      return babelHelpers.possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
    }

    return Dropdown;
  }(Component);

  Soy.register(Dropdown, templates);
  this['metalNamed']['Dropdown'] = this['metalNamed']['Dropdown'] || {};
  this['metalNamed']['Dropdown']['Dropdown'] = Dropdown;
  this['metalNamed']['Dropdown']['templates'] = templates;
  this['metal']['Dropdown'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metalNamed']['metal']['core'];
	var object = this['metalNamed']['metal']['object'];
	var dom = this['metal']['dom'];
	var Align = this['metalNamed']['position']['Align'];
	var Component = this['metal']['component'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['Dropdown'];

	/**
  * Dropdown component.
  */

	var Dropdown = function (_Component) {
		babelHelpers.inherits(Dropdown, _Component);

		function Dropdown() {
			babelHelpers.classCallCheck(this, Dropdown);
			return babelHelpers.possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
		}

		babelHelpers.createClass(Dropdown, [{
			key: 'attached',

			/**
    * @inheritDoc
    */
			value: function attached() {
				babelHelpers.get(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), 'attached', this).call(this);
				this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'created',
			value: function created() {
				this.eventHandler_ = new EventHandler();
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'detached',
			value: function detached() {
				babelHelpers.get(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), 'detached', this).call(this);
				this.eventHandler_.removeAllListeners();
			}

			/**
    * Closes the dropdown.
    */

		}, {
			key: 'close',
			value: function close() {
				this.expanded = false;
			}

			/**
    * Checks if the dropdown is currently open.
    * @return {boolean}
    */

		}, {
			key: 'isOpen',
			value: function isOpen() {
				return this.expanded;
			}

			/**
    * Handles document click in order to hide menu.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_(event) {
				if (this.element.contains(event.target)) {
					return;
				}
				this.close();
			}

			/**
    * Opens the dropdown.
    */

		}, {
			key: 'open',
			value: function open() {
				this.expanded = true;
			}

			/**
    * The setter function for the `classMap` staet.
    * @param {Object} val
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'setterClassMapFn_',
			value: function setterClassMapFn_(val) {
				return object.mixin(this.valueClassMapFn_(), val);
			}

			/**
    * The setter function for the `position` state. Converts the supported
    * string positions into the appropriate `Align` position constants.
    * @param {string|number} val
    * @return {number}
    * @protected
    */

		}, {
			key: 'setterPositionFn_',
			value: function setterPositionFn_(val) {
				if (core.isNumber(val)) {
					return val;
				}
				return val.toLowerCase() === 'up' ? Align.TopLeft : Align.BottomLeft;
			}

			/**
    * Synchronization logic for `expanded` state.
    * @param {boolean} expanded
    */

		}, {
			key: 'syncExpanded',
			value: function syncExpanded(expanded) {
				if (expanded && this.alignElementSelector) {
					var alignElement = this.element.querySelector(this.alignElementSelector);
					if (alignElement) {
						var bodyElement = this.element.querySelector('.dropdown-menu');
						this.alignedPosition = Align.align(bodyElement, alignElement, this.position);
					}
				}
			}

			/**
    * Toggles the dropdown, closing it when open or opening it when closed.
    */

		}, {
			key: 'toggle',
			value: function toggle() {
				this.expanded = !this.expanded;
			}

			/**
    * Validator for the `position` state.
    * @param {string|number} position
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'validatePosition_',
			value: function validatePosition_(position) {
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
			}

			/**
    * Gets the default value for the `body` state. Retrieves existing
    * html for the body from the element, if there is any.
    * @return {?string}
    * @protected
    */

		}, {
			key: 'valueBodyFn_',
			value: function valueBodyFn_() {
				var dropdownMenu = this.element && this.element.querySelector('.dropdown-menu');
				return dropdownMenu ? dropdownMenu.innerHTML : '';
			}

			/**
    * Gets the default value for the `classMap` state.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'valueClassMapFn_',
			value: function valueClassMapFn_() {
				var _ref;

				return _ref = {}, babelHelpers.defineProperty(_ref, Align.TopLeft, 'dropup'), babelHelpers.defineProperty(_ref, Align.TopCenter, 'dropup'), babelHelpers.defineProperty(_ref, Align.TopRight, 'dropup'), babelHelpers.defineProperty(_ref, Align.BottomLeft, 'dropdown'), babelHelpers.defineProperty(_ref, Align.BottomCenter, 'dropdown'), babelHelpers.defineProperty(_ref, Align.BottomRight, 'dropdown'), babelHelpers.defineProperty(_ref, Align.RightCenter, 'dropright'), babelHelpers.defineProperty(_ref, Align.LeftCenter, 'dropleft'), _ref;
			}

			/**
    * Gets the default value for the `header` state. Retrieves existing
    * html for the header from the element, if there is any.
    * @return {?string}
    * @protected
    */

		}, {
			key: 'valueHeaderFn_',
			value: function valueHeaderFn_() {
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
			}
		}]);
		return Dropdown;
	}(Component);

	Soy.register(Dropdown, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Dropdown.STATE = {
		/**
   * The current position of the tooltip after being aligned via `Align.align`.
   * @type {number}
   */
		alignedPosition: {
			validator: Align.isValidPosition
		},

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
   * Flag indicating if the position class (specified by `classMap` state)
   * should be added on the "dropdown-menu" element, instead of the main element.
   * @type {boolean}
   */
		positionClassOnMenu: {
			value: false
		}
	};

	this['metal']['Dropdown'] = Dropdown;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Modal.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Modal.
     * @public
     */

    goog.module('Modal.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    body: (?soydata.SanitizedHtml|string|undefined),
     *    bodyId: (null|string|undefined),
     *    elementClasses: (null|string|undefined),
     *    footer: (?soydata.SanitizedHtml|string|undefined),
     *    header: (?soydata.SanitizedHtml|string|undefined),
     *    headerId: (null|string|undefined),
     *    noCloseButton: (boolean|null|undefined),
     *    role: (null|string|undefined),
     *    visible: (boolean|null|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.body == null || opt_data.body instanceof Function || opt_data.body instanceof goog.soy.data.SanitizedContent || opt_data.body instanceof soydata.UnsanitizedText || goog.isString(opt_data.body), 'body', opt_data.body, '?soydata.SanitizedHtml|string|undefined');
      var body = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.body;
      soy.asserts.assertType(opt_data.bodyId == null || opt_data.bodyId instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.bodyId), 'bodyId', opt_data.bodyId, 'null|string|undefined');
      var bodyId = /** @type {null|string|undefined} */opt_data.bodyId;
      soy.asserts.assertType(opt_data.elementClasses == null || opt_data.elementClasses instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.elementClasses), 'elementClasses', opt_data.elementClasses, 'null|string|undefined');
      var elementClasses = /** @type {null|string|undefined} */opt_data.elementClasses;
      soy.asserts.assertType(opt_data.footer == null || opt_data.footer instanceof Function || opt_data.footer instanceof goog.soy.data.SanitizedContent || opt_data.footer instanceof soydata.UnsanitizedText || goog.isString(opt_data.footer), 'footer', opt_data.footer, '?soydata.SanitizedHtml|string|undefined');
      var footer = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.footer;
      soy.asserts.assertType(opt_data.header == null || opt_data.header instanceof Function || opt_data.header instanceof goog.soy.data.SanitizedContent || opt_data.header instanceof soydata.UnsanitizedText || goog.isString(opt_data.header), 'header', opt_data.header, '?soydata.SanitizedHtml|string|undefined');
      var header = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.header;
      soy.asserts.assertType(opt_data.headerId == null || opt_data.headerId instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.headerId), 'headerId', opt_data.headerId, 'null|string|undefined');
      var headerId = /** @type {null|string|undefined} */opt_data.headerId;
      soy.asserts.assertType(opt_data.noCloseButton == null || goog.isBoolean(opt_data.noCloseButton) || opt_data.noCloseButton === 1 || opt_data.noCloseButton === 0, 'noCloseButton', opt_data.noCloseButton, 'boolean|null|undefined');
      var noCloseButton = /** @type {boolean|null|undefined} */opt_data.noCloseButton;
      soy.asserts.assertType(opt_data.role == null || opt_data.role instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.role), 'role', opt_data.role, 'null|string|undefined');
      var role = /** @type {null|string|undefined} */opt_data.role;
      soy.asserts.assertType(opt_data.visible == null || goog.isBoolean(opt_data.visible) || opt_data.visible === 1 || opt_data.visible === 0, 'visible', opt_data.visible, 'boolean|null|undefined');
      var visible = /** @type {boolean|null|undefined} */opt_data.visible;
      ie_open('div', null, null, 'class', 'modal' + (elementClasses ? ' ' + elementClasses : ''), 'style', 'display: ' + (visible ? 'block' : 'none'));
      ie_open('div', null, null, 'class', 'modal-dialog', 'tabindex', '0', 'role', role ? role : 'dialog', 'aria-labelledby', headerId, 'aria-describedby', bodyId);
      ie_open('div', null, null, 'class', 'modal-content');
      ie_open('header', null, null, 'class', 'modal-header');
      if (header) {
        if (!noCloseButton) {
          ie_open('button', null, null, 'type', 'button', 'class', 'close', 'data-onclick', 'hide', 'aria-label', 'Close');
          ie_open('span', null, null, 'aria-hidden', 'true');
          itext('\xD7');
          ie_close('span');
          ie_close('button');
        }
        ie_open('div', null, null, 'id', headerId);
        var dyn0 = header;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('div');
      }
      ie_close('header');
      ie_open('section', null, null, 'class', 'modal-body', 'id', bodyId, 'role', 'document', 'tabindex', '0');
      if (body) {
        var dyn1 = body;
        if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      }
      ie_close('section');
      ie_open('footer', null, null, 'class', 'modal-footer');
      if (footer) {
        var dyn2 = footer;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
      }
      ie_close('footer');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Modal.render';
    }

    exports.render.params = ["body", "bodyId", "elementClasses", "footer", "header", "headerId", "noCloseButton", "role", "visible"];
    exports.render.types = { "body": "html|string", "bodyId": "string", "elementClasses": "string", "footer": "html|string", "header": "html|string", "headerId": "string", "noCloseButton": "bool", "role": "string", "visible": "bool" };
    templates = exports;
    return exports;
  });

  var Modal = function (_Component) {
    babelHelpers.inherits(Modal, _Component);

    function Modal() {
      babelHelpers.classCallCheck(this, Modal);
      return babelHelpers.possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
    }

    return Modal;
  }(Component);

  Soy.register(Modal, templates);
  this['metalNamed']['Modal'] = this['metalNamed']['Modal'] || {};
  this['metalNamed']['Modal']['Modal'] = Modal;
  this['metalNamed']['Modal']['templates'] = templates;
  this['metal']['Modal'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];
	var templates = this['metal']['Modal'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];

	/**
  * Modal component.
  */

	var Modal = function (_Component) {
		babelHelpers.inherits(Modal, _Component);

		function Modal() {
			babelHelpers.classCallCheck(this, Modal);
			return babelHelpers.possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
		}

		babelHelpers.createClass(Modal, [{
			key: 'created',

			/**
    * @inheritDoc
    */
			value: function created() {
				this.eventHandler_ = new EventHandler();
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'attached',
			value: function attached() {
				this.autoFocus_(this.autoFocus);
			}

			/**
    * Automatically focuses the element specified by the given selector.
    * @param {boolean|string} autoFocusSelector The selector, or false if no
    *   element should be automatically focused.
    * @protected
    */

		}, {
			key: 'autoFocus_',
			value: function autoFocus_(autoFocusSelector) {
				if (this.inDocument && this.visible && autoFocusSelector) {
					var element = this.element.querySelector(autoFocusSelector);
					if (element) {
						element.focus();
					}
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'detached',
			value: function detached() {
				babelHelpers.get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'detached', this).call(this);
				this.eventHandler_.removeAllListeners();
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				dom.exitDocument(this.overlayElement);
				this.unrestrictFocus_();
				babelHelpers.get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Handles a `focus` event on the document. If the focused element is
    * outside the modal and an overlay is being used, focuses the modal back.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleDocumentFocus_',
			value: function handleDocumentFocus_(event) {
				if (this.overlay && !this.element.contains(event.target)) {
					this.autoFocus_('.modal-dialog');
				}
			}

			/**
    * Handles document click in order to close the alert.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeyup_',
			value: function handleKeyup_(event) {
				if (event.keyCode === 27) {
					this.hide();
				}
			}

			/**
    * Hides the modal, setting its `visible` state key to false.
    */

		}, {
			key: 'hide',
			value: function hide() {
				this.visible = false;
			}

			/**
    * Restricts focus to the modal while it's visible.
    * @protected
    */

		}, {
			key: 'restrictFocus_',
			value: function restrictFocus_() {
				if (!this.restrictFocusHandle_) {
					this.restrictFocusHandle_ = dom.on(document, 'focus', this.handleDocumentFocus_.bind(this), true);
				}
			}

			/**
    * Shifts the focus back to the last element that had been focused before the
    * modal was shown.
    * @protected
    */

		}, {
			key: 'shiftFocusBack_',
			value: function shiftFocusBack_() {
				if (this.lastFocusedElement_) {
					this.lastFocusedElement_.focus();
					this.lastFocusedElement_ = null;
				}
			}

			/**
    * Shows the modal, setting its `visible` state key to true.
    */

		}, {
			key: 'show',
			value: function show() {
				this.visible = true;
			}

			/**
    * Syncs the component according to the value of the `hideOnEscape` state key.
    * @param {boolean} hideOnEscape
    */

		}, {
			key: 'syncHideOnEscape',
			value: function syncHideOnEscape(hideOnEscape) {
				if (hideOnEscape) {
					this.eventHandler_.add(dom.on(document, 'keyup', this.handleKeyup_.bind(this)));
				} else {
					this.eventHandler_.removeAllListeners();
				}
			}

			/**
    * Syncs the component according to the value of the `overlay` state key.
    * @param {boolean} overlay
    */

		}, {
			key: 'syncOverlay',
			value: function syncOverlay(overlay) {
				var willShowOverlay = overlay && this.visible;
				dom[willShowOverlay ? 'enterDocument' : 'exitDocument'](this.overlayElement);
			}

			/**
    * Syncs the component according to the value of the `visible` state key.
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible() {
				this.syncOverlay(this.overlay);
				if (this.visible) {
					this.lastFocusedElement_ = this.lastFocusedElement_ || document.activeElement;
					this.autoFocus_(this.autoFocus);
					this.restrictFocus_();
				} else {
					this.unrestrictFocus_();
					this.shiftFocusBack_();
				}
			}

			/**
    * Removes the handler that restricts focus to elements inside the modal.
    * @protected
    */

		}, {
			key: 'unrestrictFocus_',
			value: function unrestrictFocus_() {
				if (this.restrictFocusHandle_) {
					this.restrictFocusHandle_.removeListener();
					this.restrictFocusHandle_ = null;
				}
			}

			/**
    * Defines the default value for the `overlayElement` state key.
    * @protected
    */

		}, {
			key: 'valueOverlayElementFn_',
			value: function valueOverlayElementFn_() {
				return dom.buildFragment('<div class="modal-backdrop fade in"></div>').firstChild;
			}
		}]);
		return Modal;
	}(Component);

	Modal.STATE = {
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
   * Content to be placed inside modal body. Can be either an html string or
   * a function that calls incremental dom for rendeirng the body.
   * @type {string|function()}
   */
		body: {},

		/**
   * The id used by the body element.
   * @type {string}
   */
		bodyId: {
			valueFn: function valueFn() {
				return 'modal-body-' + core.getUid();
			}
		},

		/**
   * Content to be placed inside modal footer. Can be either an html string or
   * a function that calls incremental dom for rendeirng the footer.
   * @type {string|function()}
   */
		footer: {},

		/**
   * The id used by the header element.
   * @type {string}
   */
		headerId: {
			valueFn: function valueFn() {
				return 'modal-header-' + core.getUid();
			}
		},

		/**
   * Content to be placed inside modal header. Can be either an html string or
   * a function that calls incremental dom for rendeirng the header.
   * @type {string|function()}
   */
		header: {},

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
   * Flag indicating if the default "x" button for closing the modal should be
   * added or not.
   * @type {boolean}
   * @default false
   */
		noCloseButton: {
			value: false
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

	Soy.register(Modal, templates);

	this['metal']['Modal'] = Modal;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Pagination.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Pagination.
     * @public
     */

    goog.module('Pagination.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('ul', null, null, 'class', 'pagination' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      if (opt_data.showControls == true) {
        var disabled__soy8 = !opt_data.circular && opt_data.page == 0 ? true : false;
        $renderControlElement_({ ariaLabel: opt_data.strings.prevAriaLabel, content: opt_data.strings.prev, disabled: disabled__soy8, index: 0 }, null, opt_ijData);
      }
      var iLimit14 = opt_data.total;
      for (var i14 = 0; i14 < iLimit14; i14++) {
        var active__soy15 = opt_data.page == i14 ? true : false;
        $renderElement_({ active: active__soy15, content: opt_data.offset + i14, index: i14 }, null, opt_ijData);
      }
      if (opt_data.showControls == true) {
        var disabled__soy22 = !opt_data.circular && opt_data.page == opt_data.total - 1 ? true : false;
        $renderControlElement_({ ariaLabel: opt_data.strings.nextAriaLabel, content: opt_data.strings.next, disabled: disabled__soy22, index: 1 }, null, opt_ijData);
      }
      ie_close('ul');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Pagination.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderElement_(opt_data, opt_ignored, opt_ijData) {
      ie_open_start('li');
      iattr('class', 'pagination-item' + (opt_data.active ? ' active' : ''));
      if (!opt_data.active) {
        iattr('data-onclick', 'onClickItem');
      }
      iattr('data-index', opt_data.index);
      ie_open_end();
      ie_open('a', null, null, 'href', '#');
      itext((goog.asserts.assert(opt_data.content != null), opt_data.content));
      ie_close('a');
      ie_close('li');
    }
    exports.renderElement_ = $renderElement_;
    if (goog.DEBUG) {
      $renderElement_.soyTemplateName = 'Pagination.renderElement_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderControlElement_(opt_data, opt_ignored, opt_ijData) {
      ie_open_start('li');
      iattr('class', 'pagination-control' + (opt_data.disabled ? ' disabled' : ''));
      if (!opt_data.disabled) {
        iattr('data-onclick', 'onClickControls');
      }
      iattr('data-control-index', opt_data.index);
      ie_open_end();
      ie_open('a', null, null, 'href', '#', 'aria-label', opt_data.ariaLabel);
      itext((goog.asserts.assert(opt_data.content != null), opt_data.content));
      ie_close('a');
      ie_close('li');
    }
    exports.renderControlElement_ = $renderControlElement_;
    if (goog.DEBUG) {
      $renderControlElement_.soyTemplateName = 'Pagination.renderControlElement_';
    }

    exports.render.params = ["circular", "elementClasses", "offset", "page", "strings", "showControls", "total"];
    exports.render.types = { "circular": "any", "elementClasses": "any", "offset": "any", "page": "any", "strings": "any", "showControls": "any", "total": "any" };
    exports.renderElement_.params = ["active", "content", "index"];
    exports.renderElement_.types = { "active": "any", "content": "any", "index": "any" };
    exports.renderControlElement_.params = ["ariaLabel", "content", "disabled", "index"];
    exports.renderControlElement_.types = { "ariaLabel": "any", "content": "any", "disabled": "any", "index": "any" };
    templates = exports;
    return exports;
  });

  var Pagination = function (_Component) {
    babelHelpers.inherits(Pagination, _Component);

    function Pagination() {
      babelHelpers.classCallCheck(this, Pagination);
      return babelHelpers.possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
    }

    return Pagination;
  }(Component);

  Soy.register(Pagination, templates);
  this['metalNamed']['Pagination'] = this['metalNamed']['Pagination'] || {};
  this['metalNamed']['Pagination']['Pagination'] = Pagination;
  this['metalNamed']['Pagination']['templates'] = templates;
  this['metal']['Pagination'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metalNamed']['metal']['core'];
	var object = this['metalNamed']['metal']['object'];
	var templates = this['metal']['Pagination'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];

	/**
  * UI Component that navigate through paged data.
  */

	var Pagination = function (_Component) {
		babelHelpers.inherits(Pagination, _Component);

		function Pagination() {
			babelHelpers.classCallCheck(this, Pagination);
			return babelHelpers.possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
		}

		babelHelpers.createClass(Pagination, [{
			key: 'created',

			/**
    * @inheritDoc
    */
			value: function created() {
				/**
     * Contains the previous page value
     * @type {Object}
     * @default {page: this.page}
     */
				this.lastState_ = {
					page: this.page
				};

				this.on(Pagination.Events.CHANGE_REQUEST, this.defaultChangeRequestFn_, true);
			}

			/**
    * Default `changeRequest` function, sets new state of pagination.
    * @param {EventFacade} event
    * @protected
    */

		}, {
			key: 'defaultChangeRequestFn_',
			value: function defaultChangeRequestFn_(event) {
				this.setState_(event.state);
			}

			/**
    * Fires `changeRequest` event.
    * @param {Object} state
    * @protected
    */

		}, {
			key: 'dispatchRequest_',
			value: function dispatchRequest_(state) {
				this.emit(Pagination.Events.CHANGE_REQUEST, {
					lastState: this.lastState_,
					offset: this.offset,
					state: state,
					total: this.total
				});
			}

			/**
    * Retrieve page number including offset e.g., if offset is 100 and
    * active page is 5, this method returns 105.
    * @return {number} current page number plus offset
    */

		}, {
			key: 'getOffsetPageNumber',
			value: function getOffsetPageNumber() {
				return this.offset + this.page;
			}

			/**
    * Retrieve total number of pages including offset e.g., if offset is
    * 100 and total 10, this method returns 110.
    * @return {number} total page number plus offset
    */

		}, {
			key: 'getOffsetTotalPages',
			value: function getOffsetTotalPages() {
				return this.offset + this.total;
			}

			/**
   * Navigate to the next page.
   */

		}, {
			key: 'next',
			value: function next() {
				var page = this.page,
				    total = this.total;

				this.dispatchRequest_({
					page: this.circular && page === total - 1 ? 0 : Math.min(total, ++page)
				});
			}

			/**
    * `onClick` handler for pagination items.
    * @param {EventFacade} event
    */

		}, {
			key: 'onClickItem',
			value: function onClickItem(event) {
				var item = event.delegateTarget;

				event.preventDefault();

				var index = parseInt(item.getAttribute('data-index'));

				this.dispatchRequest_({
					page: index
				});
			}

			/**
    * `onClick` handler for pagination items.
    * @param {EventFacade} event
    */

		}, {
			key: 'onClickControls',
			value: function onClickControls(event) {
				var control = event.delegateTarget;

				event.preventDefault();

				var index = parseInt(control.getAttribute('data-control-index'));

				switch (index) {
					case 0:
						this.prev();
						break;
					case 1:
						this.next();
						break;
				}
			}

			/**
    * Navigate to the previous page.
    */

		}, {
			key: 'prev',
			value: function prev() {
				var page = this.page,
				    total = this.total;

				this.dispatchRequest_({
					page: this.circular && page === 0 ? total - 1 : Math.max(0, --page)
				});
			}

			/**
    * Set the new pagination state. The state is a payload object
    * containing the page number, e.g. `{page:1}`.
    * @param {Object} state
    * @return {Object}
    * @protected
    */

		}, {
			key: 'setState_',
			value: function setState_(state) {
				this.page = state.page;

				this.lastState_ = state;
			}
		}]);
		return Pagination;
	}(Component);

	Soy.register(Pagination, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Pagination.STATE = {
		/**
   * When enabled this property allows the navigation to go back to
   * the beggining when it reaches the last page, the opposite behavior
   * is also true. Incremental page navigation could happen clicking the
   * control arrows or invoking <code>.next()</code> and
   * <code>.prev()</code> methods.
   * @type {boolean}
   * @default true
   */
		circular: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * Initial page offset.
   * @type {number}
   * @default 1
   */
		offset: {
			validator: core.isNumber,
			value: 1
		},

		/**
   * Page to display on initial paint.
   * @type {number}
   * @default 0
   */
		page: {
			validator: core.isNumber,
			value: 0
		},

		/**
   * Determines if pagination controls (Next and Prev) are rendered.
   * @type {boolean}
   * @default true
   */
		showControls: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * Collection of strings used to label elements of the UI.
   * @type {Object}
   * @default {next: 'Next', prev: 'Prev'}
   */
		strings: {
			validator: core.isObject,
			setter: function setter(val) {
				return object.mixin({
					next: 'Next',
					nextAriaLabel: 'Next',
					prev: 'Prev',
					prevAriaLabel: 'Previous'
				}, val);
			},
			valueFn: function valueFn() {}
		},

		/**
   * Total number of page links available. If set, the new
   * <a href="Pagination.html#config_items">items</a> node list will
   * be rendered.
   * @type {number}
   * @default 0
   */
		total: {
			validator: core.isNumber,
			value: 0
		}
	};

	Pagination.Events = {
		CHANGE_REQUEST: 'changeRequest'
	};

	this['metal']['Pagination'] = Pagination;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Align = this['metalNamed']['position']['Align'];
	var Component = this['metal']['component'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];

	/**
  * The base class to be shared between components that have tooltip behavior.
  * This helps decouple this behavior logic from the UI, which may be different
  * between components. The Tooltip component itself extends from this, as does
  * the crystal Popover component, which can be accessed at metal/crystal-popover.
  */

	var TooltipBase = function (_Component) {
		babelHelpers.inherits(TooltipBase, _Component);

		function TooltipBase() {
			babelHelpers.classCallCheck(this, TooltipBase);
			return babelHelpers.possibleConstructorReturn(this, (TooltipBase.__proto__ || Object.getPrototypeOf(TooltipBase)).apply(this, arguments));
		}

		babelHelpers.createClass(TooltipBase, [{
			key: 'attached',

			/**
    * @inheritDoc
    */
			value: function attached() {
				this.align();
				this.syncTriggerEvents(this.triggerEvents);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'created',
			value: function created() {
				this.eventHandler_ = new EventHandler();
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'detached',
			value: function detached() {
				this.eventHandler_.removeAllListeners();
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(TooltipBase.prototype.__proto__ || Object.getPrototypeOf(TooltipBase.prototype), 'disposeInternal', this).call(this);
				clearTimeout(this.delay_);
			}

			/**
    * Aligns the tooltip with the best region around alignElement. The best
    * region is defined by clockwise rotation starting from the specified
    * `position`. The element is always aligned in the middle of alignElement
    * axis.
    * @param {Element=} opt_alignElement Optional element to align with.
    */

		}, {
			key: 'align',
			value: function align(opt_alignElement) {
				this.syncAlignElement(opt_alignElement || this.alignElement);
			}

			/**
    * @param {!function()} fn
    * @param {number} delay
    * @private
    */

		}, {
			key: 'callAsync_',
			value: function callAsync_(fn, delay) {
				clearTimeout(this.delay_);
				this.delay_ = setTimeout(fn.bind(this), delay);
			}

			/**
    * Handles hide event triggered by `events`.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleHide',
			value: function handleHide(event) {
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
			}

			/**
    * Handles show event triggered by `events`.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleShow',
			value: function handleShow(event) {
				var delegateTarget = event.delegateTarget;
				babelHelpers.get(TooltipBase.prototype.__proto__ || Object.getPrototypeOf(TooltipBase.prototype), 'syncVisible', this).call(this, true);
				this.callAsync_(function () {
					this.alignElement = delegateTarget;
					this.visible = true;
				}, this.delay[0]);
			}

			/**
    * Handles toggle event triggered by `events`.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleToggle',
			value: function handleToggle(event) {
				if (this.visible) {
					this.handleHide(event);
				} else {
					this.handleShow(event);
				}
			}

			/**
    * Locks tooltip visibility.
    * @param {!Event} event
    */

		}, {
			key: 'lock',
			value: function lock() {
				this.locked_ = true;
			}

			/**
    * Unlocks tooltip visibility.
    * @param {!Event} event
    */

		}, {
			key: 'unlock',
			value: function unlock(event) {
				this.locked_ = false;
				this.handleHide(event);
			}

			/**
    * State synchronization logic for `alignElement`.
    * @param {Element} alignElement
    * @param {Element} prevAlignElement
    */

		}, {
			key: 'syncAlignElement',
			value: function syncAlignElement(alignElement, prevAlignElement) {
				if (prevAlignElement) {
					alignElement.removeAttribute('aria-describedby');
				}
				if (alignElement) {
					var dataTitle = alignElement.getAttribute('data-title');
					if (dataTitle) {
						this.title = dataTitle;
					}
					if (this.inDocument) {
						this.alignedPosition = TooltipBase.Align.align(this.element, alignElement, this.position);
					}
				}
			}

			/**
    * State synchronization logic for `position`.
    */

		}, {
			key: 'syncPosition',
			value: function syncPosition() {
				this.syncAlignElement(this.alignElement);
			}

			/**
    * State synchronization logic for `selector`.
    */

		}, {
			key: 'syncSelector',
			value: function syncSelector() {
				this.syncTriggerEvents(this.triggerEvents);
			}

			/**
    * State synchronization logic for `triggerEvents`.
    * @param {!Array<string>} triggerEvents
    */

		}, {
			key: 'syncTriggerEvents',
			value: function syncTriggerEvents(triggerEvents) {
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
			}

			/**
    * State synchronization logic for `visible`. Realigns the tooltip.
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible() {
				this.align();
			}
		}]);
		return TooltipBase;
	}(Component);

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */


	TooltipBase.Align = Align;

	/**
  * TooltipBase state definition.
  * @type {!Object}
  * @static
  */
	TooltipBase.STATE = {
		/**
   * The current position of the tooltip after being aligned via `Align.align`.
   * @type {number}
   */
		alignedPosition: {
			validator: TooltipBase.Align.isValidPosition
		},

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
   * @type {number}
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

	this['metal']['TooltipBase'] = TooltipBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Tooltip.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Tooltip.
     * @public
     */

    goog.module('Tooltip.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    alignedPosition: (?),
     *    elementClasses: (?),
     *    position: (?),
     *    title: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.title == null || opt_data.title instanceof Function || opt_data.title instanceof goog.soy.data.SanitizedContent || opt_data.title instanceof soydata.UnsanitizedText || goog.isString(opt_data.title), 'title', opt_data.title, '?soydata.SanitizedHtml|string|undefined');
      var title = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.title;
      var positionClasses__soy3 = ['top', 'top', 'right', 'bottom', 'bottom', 'bottom', 'left', 'top'];
      var currentPosition__soy4 = opt_data.alignedPosition != null ? opt_data.alignedPosition : opt_data.position;
      var positionClass__soy5 = currentPosition__soy4 != null ? positionClasses__soy3[currentPosition__soy4] : 'bottom';
      ie_open('div', null, null, 'class', 'tooltip ' + positionClass__soy5 + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'role', 'tooltip');
      ie_void('div', null, null, 'class', 'tooltip-arrow');
      ie_open('section', null, null, 'class', 'tooltip-inner');
      if (title) {
        var dyn0 = title;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      }
      ie_close('section');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Tooltip.render';
    }

    exports.render.params = ["title", "alignedPosition", "elementClasses", "position"];
    exports.render.types = { "title": "html|string", "alignedPosition": "any", "elementClasses": "any", "position": "any" };
    templates = exports;
    return exports;
  });

  var Tooltip = function (_Component) {
    babelHelpers.inherits(Tooltip, _Component);

    function Tooltip() {
      babelHelpers.classCallCheck(this, Tooltip);
      return babelHelpers.possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
    }

    return Tooltip;
  }(Component);

  Soy.register(Tooltip, templates);
  this['metalNamed']['Tooltip'] = this['metalNamed']['Tooltip'] || {};
  this['metalNamed']['Tooltip']['Tooltip'] = Tooltip;
  this['metalNamed']['Tooltip']['templates'] = templates;
  this['metal']['Tooltip'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var dom = this['metal']['dom'];
	var Soy = this['metal']['Soy'];
	var TooltipBase = this['metal']['TooltipBase'];
	var templates = this['metal']['Tooltip'];

	/**
  * Tooltip component.
  */

	var Tooltip = function (_TooltipBase) {
		babelHelpers.inherits(Tooltip, _TooltipBase);

		function Tooltip() {
			babelHelpers.classCallCheck(this, Tooltip);
			return babelHelpers.possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
		}

		babelHelpers.createClass(Tooltip, [{
			key: 'hideCompletely_',

			/**
    * Hides the alert completely (with display "none"). This is called after the
    * hiding animation is done.
    * @protected
    */
			value: function hideCompletely_() {
				if (!this.visible) {
					this.element.style.display = 'none';
				}
			}

			/**
    * State synchronization logic for `visible`. Updates the element's opacity,
    * since bootstrap uses opacity instead of display for tooltip visibility.
    * @param {boolean} visible
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				if (!visible) {
					dom.once(this.element, 'animationend', this.hideCompletely_.bind(this));
					dom.once(this.element, 'transitionend', this.hideCompletely_.bind(this));
				} else {
					this.element.style.display = '';
				}

				this.element.style.opacity = visible ? 1 : '';
				babelHelpers.get(Tooltip.prototype.__proto__ || Object.getPrototypeOf(Tooltip.prototype), 'syncVisible', this).call(this, visible);
			}
		}]);
		return Tooltip;
	}(TooltipBase);

	Soy.register(Tooltip, templates);

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */
	Tooltip.Align = TooltipBase.Align;

	this['metal']['Tooltip'] = Tooltip;
	this['metalNamed']['Tooltip'] = this['metalNamed']['Tooltip'] || {};
	this['metalNamed']['Tooltip']['Tooltip'] = Tooltip;
	this['metalNamed']['Tooltip']['TooltipBase'] = TooltipBase;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Popover.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Popover.
     * @public
     */

    goog.module('Popover.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    alignedPosition: (?),
     *    elementClasses: (?),
     *    position: (?),
     *    withArrow: (?),
     *    content: (?soydata.SanitizedHtml|string|undefined),
     *    title: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.content == null || opt_data.content instanceof Function || opt_data.content instanceof goog.soy.data.SanitizedContent || opt_data.content instanceof soydata.UnsanitizedText || goog.isString(opt_data.content), 'content', opt_data.content, '?soydata.SanitizedHtml|string|undefined');
      var content = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.content;
      soy.asserts.assertType(opt_data.title == null || opt_data.title instanceof Function || opt_data.title instanceof goog.soy.data.SanitizedContent || opt_data.title instanceof soydata.UnsanitizedText || goog.isString(opt_data.title), 'title', opt_data.title, '?soydata.SanitizedHtml|string|undefined');
      var title = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.title;
      var positionClasses__soy3 = ['top', 'top', 'right', 'bottom', 'bottom', 'bottom', 'left', 'top'];
      var currentPosition__soy4 = opt_data.alignedPosition != null ? opt_data.alignedPosition : opt_data.position;
      var positionClass__soy5 = currentPosition__soy4 != null ? positionClasses__soy3[currentPosition__soy4] : 'bottom';
      ie_open('div', null, null, 'class', 'popover ' + positionClass__soy5 + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'role', 'tooltip');
      if (opt_data.withArrow || !(opt_data.withArrow != null)) {
        ie_void('div', null, null, 'class', 'arrow');
      }
      ie_open('h3', null, null, 'class', 'popover-title' + (title ? '' : ' hidden'));
      if (title) {
        var dyn0 = title;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      }
      ie_close('h3');
      ie_open('div', null, null, 'class', 'popover-content');
      ie_open('p');
      if (content) {
        var dyn1 = content;
        if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      }
      ie_close('p');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Popover.render';
    }

    exports.render.params = ["content", "title", "alignedPosition", "elementClasses", "position", "withArrow"];
    exports.render.types = { "content": "html|string", "title": "html|string", "alignedPosition": "any", "elementClasses": "any", "position": "any", "withArrow": "any" };
    templates = exports;
    return exports;
  });

  var Popover = function (_Component) {
    babelHelpers.inherits(Popover, _Component);

    function Popover() {
      babelHelpers.classCallCheck(this, Popover);
      return babelHelpers.possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));
    }

    return Popover;
  }(Component);

  Soy.register(Popover, templates);
  this['metalNamed']['Popover'] = this['metalNamed']['Popover'] || {};
  this['metalNamed']['Popover']['Popover'] = Popover;
  this['metalNamed']['Popover']['templates'] = templates;
  this['metal']['Popover'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Soy = this['metal']['Soy'];
	var TooltipBase = this['metalNamed']['Tooltip']['TooltipBase'];
	var templates = this['metal']['Popover'];

	/**
  * Popover component. Extends the behavior from `TooltipBase`, adding
  * just some UI to it.
  */

	var Popover = function (_TooltipBase) {
		babelHelpers.inherits(Popover, _TooltipBase);

		function Popover() {
			babelHelpers.classCallCheck(this, Popover);
			return babelHelpers.possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));
		}

		babelHelpers.createClass(Popover, [{
			key: 'syncAlignElement',

			/**
    * State synchronization logic for `alignElement`. Overrides the original
    * method from `TooltipBase` so the `content` state can be retrived from
    * the new aligned element.
    * @param {Element} alignElement
    * @param {Element} prevAlignElement
    * @override
    */
			value: function syncAlignElement(alignElement) {
				babelHelpers.get(Popover.prototype.__proto__ || Object.getPrototypeOf(Popover.prototype), 'syncAlignElement', this).call(this, alignElement);

				if (alignElement) {
					var dataContent = alignElement.getAttribute('data-content');
					if (dataContent) {
						this.content = dataContent;
					}
				}
			}

			/**
    * State synchronization logic for `visible`. Updates the element's display,
    * since bootstrap makes it 'none' by default, so we need to change it to
    * 'block' when the popover becomes visible.
    * @param {boolean} visible
    * @override
    */

		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				this.element.style.display = visible ? 'block' : '';
				babelHelpers.get(Popover.prototype.__proto__ || Object.getPrototypeOf(Popover.prototype), 'syncVisible', this).call(this, visible);
			}
		}]);
		return Popover;
	}(TooltipBase);

	Soy.register(Popover, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Popover.STATE = {
		/**
   * The popover's content.
   * @type {string}
   */
		content: {
			validator: function validator(val) {
				return core.isString(val) || core.isFunction(val);
			}
		},

		/**
   * Trigger events used to bind handlers to show and hide popover.
   * @type {!Array<string>}
   * @default ['click', 'click']
   */
		triggerEvents: {
			validator: Array.isArray,
			value: ['click', 'click']
		},

		/**
   * Flag indicating if an arrow should be rendered for the popover.
   * @type {boolean}
   * @default true
   */
		withArrow: {
			value: true
		}
	};

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */
	Popover.Align = TooltipBase.Align;

	this['metal']['Popover'] = Popover;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from ProgressBar.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ProgressBar.
     * @public
     */

    goog.module('ProgressBar.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    barClass: (?),
     *    elementClasses: (?),
     *    max: (?),
     *    min: (?),
     *    value: (?),
     *    label: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.label == null || opt_data.label instanceof Function || opt_data.label instanceof goog.soy.data.SanitizedContent || opt_data.label instanceof soydata.UnsanitizedText || goog.isString(opt_data.label), 'label', opt_data.label, '?soydata.SanitizedHtml|string|undefined');
      var label = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.label;
      var curMax__soy3 = opt_data.max ? opt_data.max : 100;
      var curMin__soy4 = opt_data.min ? opt_data.min : 0;
      var curValue__soy5 = opt_data.value ? opt_data.value : 0;
      ie_open('div', null, null, 'class', 'progress ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'role', 'progressbar', 'aria-valuemax', curMax__soy3, 'aria-valuemin', curMin__soy4, 'aria-valuenow', curValue__soy5, 'tabindex', '0');
      var percentage__soy15 = Math.floor((curValue__soy5 - curMin__soy4) * 100 / (curMax__soy3 - curMin__soy4));
      ie_open('div', null, null, 'class', 'progress-bar' + (opt_data.barClass ? ' ' + opt_data.barClass : ''), 'style', 'width: ' + percentage__soy15 + '%');
      var dyn0 = label ? label : '';
      if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ProgressBar.render';
    }

    exports.render.params = ["label", "barClass", "elementClasses", "max", "min", "value"];
    exports.render.types = { "label": "html|string", "barClass": "any", "elementClasses": "any", "max": "any", "min": "any", "value": "any" };
    templates = exports;
    return exports;
  });

  var ProgressBar = function (_Component) {
    babelHelpers.inherits(ProgressBar, _Component);

    function ProgressBar() {
      babelHelpers.classCallCheck(this, ProgressBar);
      return babelHelpers.possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
    }

    return ProgressBar;
  }(Component);

  Soy.register(ProgressBar, templates);
  this['metalNamed']['ProgressBar'] = this['metalNamed']['ProgressBar'] || {};
  this['metalNamed']['ProgressBar']['ProgressBar'] = ProgressBar;
  this['metalNamed']['ProgressBar']['templates'] = templates;
  this['metal']['ProgressBar'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['ProgressBar'];

	/**
  * UI Component that renders a progress bar.
  */

	var ProgressBar = function (_Component) {
		babelHelpers.inherits(ProgressBar, _Component);

		function ProgressBar() {
			babelHelpers.classCallCheck(this, ProgressBar);
			return babelHelpers.possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
		}

		babelHelpers.createClass(ProgressBar, [{
			key: 'setterValueFn_',

			/**
    * Setter function for the `value` state key. Makes sure the value
    * is between the current `min` and `max` state keys.
    * @param {number} value
    * @return {number}
    * @protected
    */
			value: function setterValueFn_(value) {
				if (value < this.min) {
					value = this.min;
				}
				if (value > this.max) {
					value = this.max;
				}
				return value;
			}

			/**
    * Synchronization logic for the `max` state.
    * @param {number} max
    */

		}, {
			key: 'syncMax',
			value: function syncMax(max) {
				if (max < this.value) {
					this.value = max;
				}
			}

			/**
    * Synchronization logic for the `min` state.
    * @param {number} min
    */

		}, {
			key: 'syncMin',
			value: function syncMin(min) {
				if (min > this.value) {
					this.value = min;
				}
			}
		}]);
		return ProgressBar;
	}(Component);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */


	ProgressBar.STATE = {
		/**
   * Optional CSS classes to be added to the inner progress bar element,
   * like 'progress-bar-danger'.
   * @type {string}
   */
		barClass: {
			validator: core.isString
		},

		/**
   * An optional label to be rendered inside the progress bar. Can be either
   * a string (with raw text or html) or an incremental dom function.
   * @type {function()|string?}
   */
		label: {
			validator: function validator(label) {
				return !core.isDefAndNotNull(label) || core.isString(label) || core.isFunction(label);
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
	Soy.register(ProgressBar, templates);

	this['metal']['ProgressBar'] = ProgressBar;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Rating.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Rating.
     * @public
     */

    goog.module('Rating.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    cssClasses: (?),
     *    disabled: (?),
     *    inputHiddenName: (?),
     *    options: (?),
     *    value: (?),
     *    label: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.label == null || opt_data.label instanceof Function || opt_data.label instanceof goog.soy.data.SanitizedContent || opt_data.label instanceof soydata.UnsanitizedText || goog.isString(opt_data.label), 'label', opt_data.label, '?soydata.SanitizedHtml|string|undefined');
      var label = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.label;
      ie_open('div', null, null, 'aria-valuemin', opt_data.options[0].value, 'aria-valuemax', opt_data.options[opt_data.options.length - 1].value, 'aria-valuenow', opt_data.options[opt_data.value] ? opt_data.options[opt_data.value].value : '', 'aria-valuetext', opt_data.options[opt_data.value] ? opt_data.options[opt_data.value].title : '', 'class', 'rating', 'data-onmouseleave', 'handleMouseLeaveEvent');
      if (label) {
        ie_open('label', null, null, 'class', 'rate-label');
        var dyn0 = label;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('label');
      }
      ie_open('div', null, null, 'class', 'rating-items');
      var optionLimit18 = opt_data.options.length;
      for (var option18 = 0; option18 < optionLimit18; option18++) {
        ie_void('button', null, null, 'aria-disabled', opt_data.disabled, 'aria-pressed', option18 <= opt_data.value ? 'true' : 'false', 'aria-label', opt_data.options[option18].title ? opt_data.options[option18].title : option18, 'class', 'btn rating-item ' + (option18 <= opt_data.value ? opt_data.cssClasses.on : opt_data.cssClasses.off), 'data-index', option18, 'data-onclick', 'handleClickEvent', 'data-onmouseover', 'handleMouseOverEvent', 'disabled', opt_data.disabled, 'title', opt_data.options[option18].title, 'type', 'button');
      }
      ie_close('div');
      ie_open('input', null, null, 'type', 'hidden', 'aria-hidden', 'true', 'name', opt_data.inputHiddenName, 'value', opt_data.options[opt_data.value] ? opt_data.options[opt_data.value].value : opt_data.value);
      ie_close('input');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Rating.render';
    }

    exports.render.params = ["label", "cssClasses", "disabled", "inputHiddenName", "options", "value"];
    exports.render.types = { "label": "html|string", "cssClasses": "any", "disabled": "any", "inputHiddenName": "any", "options": "any", "value": "any" };
    templates = exports;
    return exports;
  });

  var Rating = function (_Component) {
    babelHelpers.inherits(Rating, _Component);

    function Rating() {
      babelHelpers.classCallCheck(this, Rating);
      return babelHelpers.possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).apply(this, arguments));
    }

    return Rating;
  }(Component);

  Soy.register(Rating, templates);
  this['metalNamed']['Rating'] = this['metalNamed']['Rating'] || {};
  this['metalNamed']['Rating']['Rating'] = Rating;
  this['metalNamed']['Rating']['templates'] = templates;
  this['metal']['Rating'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
    var core = this['metal']['metal'];
    var Component = this['metal']['component'];
    var Soy = this['metal']['Soy'];
    var templates = this['metal']['Rating'];

    var Rating = function (_Component) {
        babelHelpers.inherits(Rating, _Component);

        function Rating() {
            babelHelpers.classCallCheck(this, Rating);
            return babelHelpers.possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).apply(this, arguments));
        }

        babelHelpers.createClass(Rating, [{
            key: 'created',

            /**
             * @inheritDoc
             */
            value: function created() {
                this.ratingClicked_ = this.value;
            }

            /**
             * Handles click event
             * @param {Event} event
             * @protected
             */

        }, {
            key: 'handleClickEvent',
            value: function handleClickEvent(event) {
                if (!this.disabled) {
                    var index = parseInt(event.delegateTarget.getAttribute('data-index'), 10);

                    if (index === this.ratingClicked_ && this.canReset) {
                        this.reset();
                    } else {
                        this.value = index;
                    }

                    this.ratingClicked_ = this.value;
                }
            }

            /**
             * Handles mouseleave event
             * @protected
             */

        }, {
            key: 'handleMouseLeaveEvent',
            value: function handleMouseLeaveEvent() {
                this.setPreviousRate_();
            }

            /**
             * Handles mouseover event
             * @param {event} event
             * @protected
             */

        }, {
            key: 'handleMouseOverEvent',
            value: function handleMouseOverEvent(event) {
                if (!this.disabled) {
                    var index = Number.parseInt(event.delegateTarget.getAttribute('data-index'), 10);

                    this.value = index;
                }
            }

            /**
             * Reset rating attributes to its initial value
             * @protected
             */

        }, {
            key: 'reset',
            value: function reset() {
                this.value = -1;
                this.ratingClicked_ = -1;
            }

            /**
             * Set value attribute with the previous rating selected
             * @protected
             */

        }, {
            key: 'setPreviousRate_',
            value: function setPreviousRate_() {
                this.value = this.ratingClicked_;
            }
        }]);
        return Rating;
    }(Component);

    Rating.STATE = {

        /**
         * Flag indicating if this component can be reset or not
         * @type {boolean}
         * @default true
         */
        canReset: {
            value: true,
            validator: core.isBoolean
        },

        /**
         * Optional CSS classes to be added to the inner rating element.
         * @type {string}
         */
        cssClasses: {
            value: {
                off: 'glyphicon glyphicon-star-empty',
                on: 'glyphicon glyphicon-star'
            }
        },

        /**
         * Block or unblock rating functionality.
         * @type {?boolean}
         * @default false
         */
        disabled: {
            value: false,
            validator: core.isBoolean
        },

        /**
         * Name of the hidden input. It can be used to send
         * current option value as a form data.
         *
         * @attribute inputHiddenName
         * @type {string}
         * @default 'rate'
         */
        inputHiddenName: {
            value: 'rate',
            validator: core.isString
        },

        /**
         * Label to be displayed with the Rating elements. Can be either a string
         * or an incremental dom function.
         * @attribute label
         * @type {string}
         * @default ''
         */
        label: {
            value: '',
            validator: function validator(val) {
                return core.isString(val) || core.isFunction(val);
            }
        },

        /**
         * List of rate options.
         * @type {array}
         */
        options: {
            validator: Array.isArray,
            value: [{
                value: 1,
                title: ''
            }, {
                value: 2,
                title: ''
            }, {
                value: 3,
                title: ''
            }, {
                value: 4,
                title: ''
            }, {
                value: 5,
                title: ''
            }]
        },

        /**
         * Rating current index value.
         * @type {?number}
         * @default null
         */
        value: {
            validator: core.isNumber,
            value: -1
        }
    };
    Soy.register(Rating, templates);

    this['metal']['Rating'] = Rating;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Position = this['metal']['position'];
	var State = this['metal']['state'];

	/**
  * Scrollspy utility.
  */

	var Scrollspy = function (_State) {
		babelHelpers.inherits(Scrollspy, _State);

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
			var _this = babelHelpers.possibleConstructorReturn(this, (Scrollspy.__proto__ || Object.getPrototypeOf(Scrollspy)).call(this, opt_config));

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


		babelHelpers.createClass(Scrollspy, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.deactivateAll();
				this.scrollHandle_.dispose();
				babelHelpers.get(Scrollspy.prototype.__proto__ || Object.getPrototypeOf(Scrollspy.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Activates index matching element.
    * @param {number} index
    */

		}, {
			key: 'activate',
			value: function activate(index) {
				if (this.activeIndex >= 0) {
					this.deactivate(this.activeIndex);
				}
				this.activeIndex = index;
				dom.addClasses(this.getElementForIndex(index), this.activeClass);
			}

			/**
    * Checks position of elements and activate the one in region.
    */

		}, {
			key: 'checkPosition',
			value: function checkPosition() {
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
			}

			/**
    * Deactivates index matching element.
    * @param {number} index
    */

		}, {
			key: 'deactivate',
			value: function deactivate(index) {
				dom.removeClasses(this.getElementForIndex(index), this.activeClass);
			}

			/**
    * Deactivates all elements.
    */

		}, {
			key: 'deactivateAll',
			value: function deactivateAll() {
				for (var i = 0; i < this.regions.length; i++) {
					this.deactivate(i);
				}
				this.activeIndex = -1;
			}

			/**
    * Finds best region to activate.
    * @return {number} The index of best region found.
    */

		}, {
			key: 'findBestRegionAt_',
			value: function findBestRegionAt_() {
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
			}

			/**
    * Gets the current position in the page.
    * @return {number}
    */

		}, {
			key: 'getCurrentPosition',
			value: function getCurrentPosition() {
				var scrollTop = Position.getScrollTop(this.scrollElement);
				return scrollTop + this.offset + this.scrollElementRegion_.top;
			}

			/**
    * Returns the element that should be used for the link at the given index.
    * @param {number} index
    * @return {!Element}
    */

		}, {
			key: 'getElementForIndex',
			value: function getElementForIndex(index) {
				return this.resolveElement(this.regions[index].link);
			}

			/**
    * Gets the scroll height of `scrollElement`.
    * @return {number}
    * @protected
    */

		}, {
			key: 'getScrollHeight_',
			value: function getScrollHeight_() {
				var scrollHeight = Position.getHeight(this.scrollElement);
				scrollHeight += this.scrollElementRegion_.top;
				scrollHeight -= Position.getClientHeight(this.scrollElement);
				return scrollHeight;
			}

			/**
    * Initializes the behavior of scrollspy. It's important to have this as a
    * separate function so subclasses can override it (babel doesn't allow using
    * `this` on constructors before calling `super()`).
    */

		}, {
			key: 'init',
			value: function init() {
				this.refresh();
				this.on('elementChanged', this.refresh);
				this.on('offsetChanged', this.checkPosition);
				this.on('scrollElementChanged', this.onScrollElementChanged_);
				this.on('selectorChanged', this.refresh);
			}

			/**
    * Fired when the value of the `scrollElement` state changes.
    * Refreshes the spy and updates the event handler to listen to the new scroll element.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'onScrollElementChanged_',
			value: function onScrollElementChanged_(event) {
				this.refresh();

				this.scrollHandle_.dispose();
				this.scrollHandle_ = dom.on(event.newVal, 'scroll', this.checkPosition.bind(this));
			}

			/**
    * Refreshes all regions from document. Relevant when spying elements that
    * nodes can be added and removed.
    */

		}, {
			key: 'refresh',
			value: function refresh() {
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
			}

			/**
    * Sorts regions from lower to higher on y-axis.
    * @protected
    */

		}, {
			key: 'sortRegions_',
			value: function sortRegions_() {
				this.regions.sort(function (a, b) {
					return a.top - b.top;
				});
			}
		}]);
		return Scrollspy;
	}(State);

	Scrollspy.STATE = {
		/**
   * Class to be used as active class.
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

	this['metal']['Scrollspy'] = Scrollspy;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Select.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Select.
     * @public
     */

    goog.module('Select.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('Dropdown.incrementaldom', 'render');

    /**
     * @param {{
     *    arrowClass: (?),
     *    disabled: (?),
     *    buttonClass: (?),
     *    elementClasses: (?),
     *    expanded_: (?),
     *    handleDropdownStateSynced_: (?),
     *    handleItemClick_: (?),
     *    handleItemKeyDown_: (?),
     *    hiddenInputName: (?),
     *    items: (?),
     *    values: (?),
     *    selectedIndex: (?),
     *    label: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      soy.asserts.assertType(opt_data.label == null || opt_data.label instanceof Function || opt_data.label instanceof goog.soy.data.SanitizedContent || opt_data.label instanceof soydata.UnsanitizedText || goog.isString(opt_data.label), 'label', opt_data.label, '?soydata.SanitizedHtml|string|undefined');
      var label = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.label;
      ie_open('div', null, null, 'class', 'select' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'data-onkeydown', 'handleKeyDown_');
      var currSelectedIndex__soy6 = opt_data.selectedIndex != null ? opt_data.selectedIndex : label || opt_data.items.length == 0 ? -1 : 0;
      ie_open('input', null, null, 'disabled', opt_data.disabled, 'type', 'hidden', 'name', opt_data.hiddenInputName ? opt_data.hiddenInputName : '', 'value', currSelectedIndex__soy6 == -1 ? '' : opt_data.values ? opt_data.values[currSelectedIndex__soy6] : '');
      ie_close('input');
      var param14 = function param14() {
        var itemList24 = opt_data.items;
        var itemListLen24 = itemList24.length;
        for (var itemIndex24 = 0; itemIndex24 < itemListLen24; itemIndex24++) {
          var itemData24 = itemList24[itemIndex24];
          ie_open('li', null, null, 'data-onclick', ($$temp = opt_data.handleItemClick_) == null ? '' : $$temp, 'data-onkeydown', ($$temp = opt_data.handleItemKeyDown_) == null ? '' : $$temp, 'class', 'select-option' + (currSelectedIndex__soy6 == itemIndex24 ? ' selected' : ''));
          ie_open('a', null, null, 'href', 'javascript:;');
          var dyn0 = itemData24;
          if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
          ie_close('a');
          ie_close('li');
        }
      };
      var param28 = function param28() {
        ie_open('button', null, null, 'class', (opt_data.buttonClass ? opt_data.buttonClass : '') + ' dropdown-select', 'disabled', opt_data.disabled, 'type', 'button', 'data-onclick', 'toggle', 'aria-haspopup', 'true', 'aria-expanded', opt_data.expanded_ ? 'true' : 'false');
        if (currSelectedIndex__soy6 == -1) {
          var dyn1 = label;
          if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
        } else {
          var dyn2 = opt_data.items[currSelectedIndex__soy6];
          if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        }
        itext(' ');
        ie_void('span', null, null, 'class', opt_data.arrowClass ? opt_data.arrowClass : 'caret');
        ie_close('button');
      };
      $templateAlias1({ body: param14, events: { stateSynced: opt_data.handleDropdownStateSynced_ }, expanded: opt_data.disabled ? false : opt_data.expanded_, header: param28, ref: 'dropdown' }, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Select.render';
    }

    exports.render.params = ["label", "arrowClass", "disabled", "buttonClass", "elementClasses", "expanded_", "handleDropdownStateSynced_", "handleItemClick_", "handleItemKeyDown_", "hiddenInputName", "items", "values", "selectedIndex"];
    exports.render.types = { "label": "html|string", "arrowClass": "any", "disabled": "any", "buttonClass": "any", "elementClasses": "any", "expanded_": "any", "handleDropdownStateSynced_": "any", "handleItemClick_": "any", "handleItemKeyDown_": "any", "hiddenInputName": "any", "items": "any", "values": "any", "selectedIndex": "any" };
    templates = exports;
    return exports;
  });

  var Select = function (_Component) {
    babelHelpers.inherits(Select, _Component);

    function Select() {
      babelHelpers.classCallCheck(this, Select);
      return babelHelpers.possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
    }

    return Select;
  }(Component);

  Soy.register(Select, templates);
  this['metalNamed']['Select'] = this['metalNamed']['Select'] || {};
  this['metalNamed']['Select']['Select'] = Select;
  this['metalNamed']['Select']['templates'] = templates;
  this['metal']['Select'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['Select'];

	/**
  * Responsible for rendering and handling a custom select component, based
  * on `Dropdown`.
  */

	var Select = function (_Component) {
		babelHelpers.inherits(Select, _Component);

		function Select() {
			babelHelpers.classCallCheck(this, Select);
			return babelHelpers.possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
		}

		babelHelpers.createClass(Select, [{
			key: 'findItemIndex_',

			/**
    * Finds the index of the given element in the items array.
    * @param {!Element} element
    * @return {number}
    * @protected
    */
			value: function findItemIndex_(element) {
				var items = this.element.querySelectorAll('li');
				for (var i = 0; i < items.length; i++) {
					if (items.item(i) === element) {
						return i;
					}
				}
			}

			/**
    * Focuses the option at the given index.
    * @param {number} index
    * @protected
    */

		}, {
			key: 'focusIndex_',
			value: function focusIndex_(index) {
				var option = this.element.querySelector('.select-option:nth-child(' + (index + 1) + ') a');
				if (option) {
					this.focusedIndex_ = index;
					option.focus();
				}
			}

			/**
    * Gets the `Dropdown` instance used by this `Select`.
    * @return {!Dropdown}
    */

		}, {
			key: 'getDropdown',
			value: function getDropdown() {
				return this.components.dropdown;
			}

			/**
    * Handles a `stateSynced` event for the dropdown.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'handleDropdownStateSynced_',
			value: function handleDropdownStateSynced_(data) {
				if (this.openedWithKeyboard_) {
					// This is done on `stateSynced` because the items need to have already
					// been made visible before we try focusing them.
					this.focusIndex_(0);
					this.openedWithKeyboard_ = false;
				} else if (this.closedWithKeyboard_) {
					this.element.querySelector('.dropdown-select').focus();
					this.closedWithKeyboard_ = false;
				} else if (data.changes.expanded) {
					this.focusedIndex_ = null;
				}

				this.expanded_ = this.getDropdown().expanded;
			}

			/**
    * Handles a `click` event on one of the items. Updates `selectedIndex`
    * accordingly.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleItemClick_',
			value: function handleItemClick_(event) {
				this.selectItem_(event.delegateTarget);
				event.preventDefault();
			}

			/**
    * Handles a `keydown` event on one of the items. Updates `selectedIndex`
    * accordingly.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleItemKeyDown_',
			value: function handleItemKeyDown_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.closedWithKeyboard_ = true;
					this.selectItem_(event.delegateTarget);
					event.preventDefault();
				}
			}

			/**
    * Handles a `keydown` event on this component. Handles keyboard controls.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeyDown_',
			value: function handleKeyDown_(event) {
				if (this.expanded_) {
					switch (event.keyCode) {
						case 27:
							this.closedWithKeyboard_ = true;
							this.expanded_ = false;
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
					this.expanded_ = true;
					event.preventDefault();
					return;
				}
			}

			/**
    * Selects the item for the given element, and closes the dropdown.
    * @param {!Element} itemElement
    * @protected
    */

		}, {
			key: 'selectItem_',
			value: function selectItem_(itemElement) {
				this.selectedIndex = this.findItemIndex_(itemElement);
				this.expanded_ = false;
			}

			/**
    * Setter for items attribute.
    * @param {!Array<string>} items
    * @protected
    */

		}, {
			key: 'setItems_',
			value: function setItems_(items) {
				return items.map(function (item) {
					return Soy.toIncDom(item);
				});
			}
		}]);
		return Select;
	}(Component);

	Soy.register(Select, templates);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Select.STATE = {
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
   * Block or unblock the component behaviours.
   * @type {boolean}
   * @default false
   */
		disabled: {
			validator: core.isBoolean,
			value: false
		},

		/**
   * Flag indicating if the select dropdown is currently expanded.
   * @type {boolean}
   */
		expanded_: {
			setter: function setter(value) {
				return !this.disabled ? value : false;
			},
			validator: core.isBoolean,
			value: false,
			internal: true
		},

		/**
   * The name of the hidden input field
   * @type {string}
   */
		hiddenInputName: {
			validator: core.isString
		},

		/**
   * A list representing the select dropdown items.
   * @type {!Array<string>}
   * @default []
   */
		items: {
			setter: 'setItems_',
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
		},

		/**
   * A list representing the select dropdown values.
   * @type {Array<string>=}
   */
		values: {
			validator: function validator(val) {
				return val instanceof Array;
			}
		}
	};

	/**
  * Default element classes.
  * @type {string}
  * @static
  */
	Select.ELEMENT_CLASSES = 'select';

	this['metal']['Select'] = Select;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var State = this['metal']['state'];
	var Position = this['metal']['position'];

	/**
  * Helper called by the `Drag` instance that scrolls elements when the
  * mouse is near their boundaries.
  */

	var DragAutoScroll = function (_State) {
		babelHelpers.inherits(DragAutoScroll, _State);

		/**
   * @inheritDoc
   */
		function DragAutoScroll(opt_config) {
			babelHelpers.classCallCheck(this, DragAutoScroll);

			/**
    * The handler for the current call to `setTimeout`.
    * @type {?number}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (DragAutoScroll.__proto__ || Object.getPrototypeOf(DragAutoScroll)).call(this, opt_config));

			_this.scrollTimeout_ = null;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DragAutoScroll, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(DragAutoScroll.prototype.__proto__ || Object.getPrototypeOf(DragAutoScroll.prototype), 'disposeInternal', this).call(this);
				this.stop();
			}

			/**
    * Gets the region for the given scroll container, without including scroll.
    * @param {!Element} scrollContainer
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'getRegionWithoutScroll_',
			value: function getRegionWithoutScroll_(scrollContainer) {
				if (core.isDocument(scrollContainer)) {
					var height = window.innerHeight;
					var width = window.innerWidth;
					return Position.makeRegion(height, height, 0, width, 0, width);
				} else {
					return Position.getRegion(scrollContainer);
				}
			}

			/**
    * Schedules a function to scroll the given containers.
    * @param {!Array<!Element>} scrollContainers
    * @param {number} mouseX
    * @param {number} mouseY
    */

		}, {
			key: 'scroll',
			value: function scroll(scrollContainers, mouseX, mouseY) {
				this.stop();
				this.scrollTimeout_ = setTimeout(this.scrollInternal_.bind(this, scrollContainers, mouseX, mouseY), this.delay);
			}

			/**
    * Adds the given deltas to the given element's scroll position.
    * @param {!Element} element
    * @param {number} deltaX
    * @param {number} deltaY
    * @protected
    */

		}, {
			key: 'scrollElement_',
			value: function scrollElement_(element, deltaX, deltaY) {
				if (core.isDocument(element)) {
					window.scrollBy(deltaX, deltaY);
				} else {
					element.scrollTop += deltaY;
					element.scrollLeft += deltaX;
				}
			}

			/**
    * Scrolls the given containers if the mouse is near their boundaries.
    * @param {!Array<!Element>} scrollContainers
    * @param {number} mouseX
    * @param {number} mouseY
    * @protected
    */

		}, {
			key: 'scrollInternal_',
			value: function scrollInternal_(scrollContainers, mouseX, mouseY) {
				for (var i = 0; i < scrollContainers.length; i++) {
					var scrollRegion = this.getRegionWithoutScroll_(scrollContainers[i]);
					if (!Position.pointInsideRegion(mouseX, mouseY, scrollRegion)) {
						continue;
					}

					var deltaX = 0;
					var deltaY = 0;
					var scrollTop = Position.getScrollTop(scrollContainers[i]);
					var scrollLeft = Position.getScrollLeft(scrollContainers[i]);
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
			}

			/**
    * Stops any auto scrolling that was scheduled to happen in the future.
    */

		}, {
			key: 'stop',
			value: function stop() {
				clearTimeout(this.scrollTimeout_);
			}
		}]);
		return DragAutoScroll;
	}(State);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */


	DragAutoScroll.STATE = {
		/**
   * The delay in ms before an element is scrolled automatically.
   * @type {number}
   * @default 200
   */
		delay: {
			validator: core.isNumber,
			value: 50
		},

		/**
   * The maximum distance the mouse needs to be from an element before
   * it will be scrolled automatically.
   * @type {number}
   * @default 10
   */
		maxDistance: {
			validator: core.isNumber,
			value: 20
		},

		/**
   * The number of pixels that will be scrolled each time.
   * @type {number}
   * @default 10
   */
		speed: {
			validator: core.isNumber,
			value: 20
		}
	};

	this['metal']['DragAutoScroll'] = DragAutoScroll;
}).call(this);
'use strict';

(function () {
	var dom = this['metal']['dom'];
	var EventEmitter = this['metalNamed']['events']['EventEmitter'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];
	var Position = this['metal']['position'];

	/**
  * Helper called by the `Drag` instance that emits an event whenever
  * the scroll position of the given containers change.
  */

	var DragScrollDelta = function (_EventEmitter) {
		babelHelpers.inherits(DragScrollDelta, _EventEmitter);

		/**
   * @inheritDoc
   */
		function DragScrollDelta() {
			babelHelpers.classCallCheck(this, DragScrollDelta);

			/**
    * `EventHandler` for the scroll events.
    * @type {EventHandler}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (DragScrollDelta.__proto__ || Object.getPrototypeOf(DragScrollDelta)).call(this));

			_this.handler_ = new EventHandler();

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


		babelHelpers.createClass(DragScrollDelta, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(DragScrollDelta.prototype.__proto__ || Object.getPrototypeOf(DragScrollDelta.prototype), 'disposeInternal', this).call(this);
				this.stop();
				this.handler_ = null;
			}

			/**
    * Handles a "scroll" event, emitting a "scrollDelta" event with the
    * difference between the previous and new values.
    * @param {number} index
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleScroll_',
			value: function handleScroll_(index, event) {
				var newPosition = {
					scrollLeft: Position.getScrollLeft(event.currentTarget),
					scrollTop: Position.getScrollTop(event.currentTarget)
				};
				var position = this.scrollPositions_[index];
				this.scrollPositions_[index] = newPosition;

				this.emit('scrollDelta', {
					deltaX: newPosition.scrollLeft - position.scrollLeft,
					deltaY: newPosition.scrollTop - position.scrollTop
				});
			}

			/**
    * Starts listening to scroll changes on the given elements that contain
    * the current drag node.
    * @param {!Element} dragNode
    * @param {!Array<!Element>} scrollContainers
    */

		}, {
			key: 'start',
			value: function start(dragNode, scrollContainers) {
				if (getComputedStyle(dragNode).position === 'fixed') {
					// If the drag node's position is "fixed", then its coordinates don't need to
					// be updated when parents are scrolled.
					return;
				}

				for (var i = 0; i < scrollContainers.length; i++) {
					if (dom.contains(scrollContainers[i], dragNode)) {
						this.scrollPositions_.push({
							scrollLeft: Position.getScrollLeft(scrollContainers[i]),
							scrollTop: Position.getScrollTop(scrollContainers[i])
						});

						var index = this.scrollPositions_.length - 1;
						this.handler_.add(dom.on(scrollContainers[i], 'scroll', this.handleScroll_.bind(this, index)));
					}
				}
			}

			/**
    * Stops listening to scroll changes.
    */

		}, {
			key: 'stop',
			value: function stop() {
				this.handler_.removeAllListeners();
				this.scrollPositions_ = [];
			}
		}]);
		return DragScrollDelta;
	}(EventEmitter);

	this['metal']['DragScrollDelta'] = DragScrollDelta;
}).call(this);
'use strict';

(function () {
	var dom = this['metal']['dom'];

	/**
  * Helper called by the `Drag` instance that creates a shim element
  * for attaching event listeners instead of attaching them to the
  * document. Helpful when dragging over iframes.
  */

	var DragShim = function () {
		function DragShim() {
			babelHelpers.classCallCheck(this, DragShim);
		}

		babelHelpers.createClass(DragShim, null, [{
			key: 'attachDocListeners',

			/**
    * Attaches a listener for the document. If `useShim` is true, a
    * shim element covering the whole document will be created and
    * the listener will be attached to it instead.
    * @param {boolean} useShim
    * @param {!Object<string, !function()>} listeners
    * @return {!Array<!EventHandle>}
    * @static
    */
			value: function attachDocListeners(useShim, listeners) {
				var element = document;
				if (useShim) {
					element = DragShim.getDocShim();
					element.style.display = 'block';
				}
				var eventTypes = Object.keys(listeners);
				return eventTypes.map(function (type) {
					var isTouch = type.substr(0, 5) === 'touch';
					return dom.on(isTouch ? document : element, type, listeners[type]);
				});
			}

			/**
    * Gets the document's shim element, creating it when called for the first time.
    * @return {!Element}
    * @static
    */

		}, {
			key: 'getDocShim',
			value: function getDocShim() {
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
					dom.enterDocument(DragShim.docShim_);
				}
				return DragShim.docShim_;
			}

			/**
    * Hides the document's shim element.
    * @static
    */

		}, {
			key: 'hideDocShim',
			value: function hideDocShim() {
				DragShim.getDocShim().style.display = 'none';
			}

			/**
    * Resets `DragShim`, removing the shim element from the document
    * and clearing its variable so it can be created again.
    * @static
    */

		}, {
			key: 'reset',
			value: function reset() {
				if (DragShim.docShim_) {
					dom.exitDocument(DragShim.docShim_);
					DragShim.docShim_ = null;
				}
			}
		}]);
		return DragShim;
	}();

	/**
  * The shim element. This is only created when necessary.
  * @type {Element}
  * @protected
  * @static
  */


	DragShim.docShim_ = null;

	this['metal']['DragShim'] = DragShim;
}).call(this);
'use strict';

(function () {
	var core = this['metalNamed']['metal']['core'];
	var object = this['metalNamed']['metal']['object'];
	var dom = this['metal']['dom'];
	var DragAutoScroll = this['metal']['DragAutoScroll'];
	var DragScrollDelta = this['metal']['DragScrollDelta'];
	var DragShim = this['metal']['DragShim'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];
	var Position = this['metal']['position'];
	var State = this['metal']['state'];

	/**
  * Responsible for making elements draggable. Handles all the logic
  * for dragging elements. Dropping is handled by `DragDrop`.
  * @extends {State}
  */

	var Drag = function (_State) {
		babelHelpers.inherits(Drag, _State);

		/**
   * @inheritDoc
   */
		function Drag(opt_config) {
			babelHelpers.classCallCheck(this, Drag);

			/**
    * The drag placeholder that is active at the moment.
    * @type {Element}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (Drag.__proto__ || Object.getPrototypeOf(Drag)).call(this, opt_config));

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
			_this.dragHandler_ = new EventHandler();

			/**
    * `DragScrollDelta` instance.
    * @type {!DragScrollDelta}
    * @protected
    */
			_this.dragScrollDelta_ = new DragScrollDelta();

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
			_this.sourceHandler_ = new EventHandler();

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
			_this.on('containerChanged', _this.handleContainerChanged_.bind(_this));
			_this.dragScrollDelta_.on('scrollDelta', _this.handleScrollDelta_.bind(_this));
			dom.on(document, 'keydown', _this.handleKeyDown_.bind(_this));
			return _this;
		}

		/**
   * Attaches the necessary events to the source (or sources).
   * @protected
   */


		babelHelpers.createClass(Drag, [{
			key: 'attachSourceEvents_',
			value: function attachSourceEvents_() {
				var toAttach = {
					keydown: this.handleSourceKeyDown_.bind(this),
					mousedown: this.handleDragStartEvent_.bind(this),
					touchstart: this.handleDragStartEvent_.bind(this)
				};
				var eventTypes = Object.keys(toAttach);
				for (var i = 0; i < eventTypes.length; i++) {
					var listenerFn = toAttach[eventTypes[i]];
					if (core.isString(this.sources)) {
						this.sourceHandler_.add(dom.delegate(this.container, eventTypes[i], this.sources, listenerFn));
					} else {
						this.sourceHandler_.add(dom.on(this.sources, eventTypes[i], listenerFn));
					}
				}
			}

			/**
    * Builds the object with data to be passed to a drag event.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'buildEventObject_',
			value: function buildEventObject_() {
				return {
					placeholder: this.activeDragPlaceholder_,
					source: this.activeDragSource_,
					relativeX: this.sourceRelativePos_.x,
					relativeY: this.sourceRelativePos_.y,
					x: this.sourceRegion_.left,
					y: this.sourceRegion_.top
				};
			}

			/**
    * Calculates the initial positions for the drag action.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'calculateInitialPosition_',
			value: function calculateInitialPosition_(event) {
				this.sourceRegion_ = object.mixin({}, Position.getRegion(this.activeDragSource_, true));
				this.sourceRelativePos_ = {
					x: this.activeDragSource_.offsetLeft,
					y: this.activeDragSource_.offsetTop
				};
				if (core.isDef(event.clientX)) {
					this.mousePos_ = {
						x: event.clientX,
						y: event.clientY
					};
					this.mouseSourceDelta_ = {
						x: this.sourceRegion_.left - this.mousePos_.x,
						y: this.sourceRegion_.top - this.mousePos_.y
					};
				}
			}

			/**
    * Checks if the given event can start a drag operation.
    * @param {!Event} event
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'canStartDrag_',
			value: function canStartDrag_(event) {
				return !this.disabled && (!core.isDef(event.button) || event.button === 0) && !this.isDragging() && this.isWithinHandle_(event.target);
			}

			/**
    * Resets all variables to their initial values and detaches drag listeners.
    * @protected
    */

		}, {
			key: 'cleanUpAfterDragging_',
			value: function cleanUpAfterDragging_() {
				if (this.activeDragPlaceholder_) {
					this.activeDragPlaceholder_.setAttribute('aria-grabbed', 'false');
					dom.removeClasses(this.activeDragPlaceholder_, this.draggingClass);
					if (this.dragPlaceholder === Drag.Placeholder.CLONE) {
						dom.exitDocument(this.activeDragPlaceholder_);
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
			}

			/**
    * Clones the active drag source and adds the clone to the document.
    * @return {!Element}
    * @protected
    */

		}, {
			key: 'cloneActiveDrag_',
			value: function cloneActiveDrag_() {
				var placeholder = this.activeDragSource_.cloneNode(true);
				placeholder.style.position = 'absolute';
				placeholder.style.left = this.sourceRelativePos_.x + 'px';
				placeholder.style.top = this.sourceRelativePos_.y + 'px';
				dom.append(this.activeDragSource_.parentNode, placeholder);
				return placeholder;
			}

			/**
    * Constrains the given region according to the current state configuration.
    * @param {!Object} region
    * @protected
    */

		}, {
			key: 'constrain_',
			value: function constrain_(region) {
				this.constrainToSteps_(region);
				this.constrainToRegion_(region);
				this.constrainToAxis_(region);
			}

			/**
    * Constrains the given region according to the chosen drag axis, if any.
    * @param {!Object} region
    * @protected
    */

		}, {
			key: 'constrainToAxis_',
			value: function constrainToAxis_(region) {
				if (this.axis === 'x') {
					region.top = this.sourceRegion_.top;
					region.bottom = this.sourceRegion_.bottom;
				} else if (this.axis === 'y') {
					region.left = this.sourceRegion_.left;
					region.right = this.sourceRegion_.right;
				}
			}

			/**
    * Constrains the given region within the region defined by the `constrain` state.
    * @param {!Object} region
    * @protected
    */

		}, {
			key: 'constrainToRegion_',
			value: function constrainToRegion_(region) {
				var constrain = this.constrain;
				if (!constrain) {
					return;
				}

				if (core.isFunction(constrain)) {
					object.mixin(region, constrain(region));
				} else {
					if (core.isElement(constrain)) {
						constrain = Position.getRegion(constrain, true);
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
			}

			/**
    * Constrains the given region to change according to the `steps` state.
    * @param {!Object} region
    * @protected
    */

		}, {
			key: 'constrainToSteps_',
			value: function constrainToSteps_(region) {
				var deltaX = region.left - this.sourceRegion_.left;
				var deltaY = region.top - this.sourceRegion_.top;
				region.left -= deltaX % this.steps.x;
				region.right = region.left + region.width;
				region.top -= deltaY % this.steps.y;
				region.bottom = region.top + region.height;
			}

			/**
    * Creates the active drag placeholder, unless it already exists.
    * @protected
    */

		}, {
			key: 'createActiveDragPlaceholder_',
			value: function createActiveDragPlaceholder_() {
				var dragPlaceholder = this.dragPlaceholder;
				if (dragPlaceholder === Drag.Placeholder.CLONE) {
					this.activeDragPlaceholder_ = this.cloneActiveDrag_();
				} else if (core.isElement(dragPlaceholder)) {
					this.activeDragPlaceholder_ = dragPlaceholder;
				} else {
					this.activeDragPlaceholder_ = this.activeDragSource_;
				}
			}

			/**
    * The default behavior for the `Drag.Events.DRAG` event. Can be prevented
    * by calling the `preventDefault` function on the event's facade. Moves
    * the placeholder to the new calculated source position.
    * @protected
    */

		}, {
			key: 'defaultDragFn_',
			value: function defaultDragFn_() {
				this.moveToPosition_(this.activeDragPlaceholder_);
			}

			/**
    * The default behavior for the `Drag.Events.END` event. Can be prevented
    * by calling the `preventDefault` function on the event's facade. Moves
    * the source element to the final calculated position.
    * @protected
    */

		}, {
			key: 'defaultEndFn_',
			value: function defaultEndFn_() {
				this.moveToPosition_(this.activeDragSource_);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.cleanUpAfterDragging_();
				this.dragHandler_ = null;
				this.dragScrollDelta_.dispose();
				this.dragScrollDelta_ = null;
				this.sourceHandler_.removeAllListeners();
				this.sourceHandler_ = null;
				babelHelpers.get(Drag.prototype.__proto__ || Object.getPrototypeOf(Drag.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Gets the active drag source.
    * @return {Element}
    */

		}, {
			key: 'getActiveDrag',
			value: function getActiveDrag() {
				return this.activeDragSource_;
			}

			/**
    * Handles events that can end a drag action, like "mouseup" and "touchend".
    * Triggered when the mouse drag action ends.
    * @protected
    */

		}, {
			key: 'handleDragEndEvent_',
			value: function handleDragEndEvent_() {
				if (this.autoScroll) {
					this.autoScroll.stop();
				}
				this.dragScrollDelta_.stop();
				DragShim.hideDocShim();
				this.emit(Drag.Events.END, this.buildEventObject_());
				this.cleanUpAfterDragging_();
			}

			/**
    * Handles events that can move a draggable element, like "mousemove" and "touchmove".
    * Tracks the movement on the screen to update the drag action.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleDragMoveEvent_',
			value: function handleDragMoveEvent_(event) {
				var position = event.targetTouches ? event.targetTouches[0] : event;
				var distanceX = position.clientX - this.mousePos_.x;
				var distanceY = position.clientY - this.mousePos_.y;
				this.mousePos_.x = position.clientX;
				this.mousePos_.y = position.clientY;
				if (!this.isDragging() && !this.hasReachedMinimumDistance_(distanceX, distanceY)) {
					return;
				}

				if (!this.isDragging()) {
					this.startDragging_(event);
					this.dragScrollDelta_.start(this.activeDragPlaceholder_, this.scrollContainers);
				}
				if (this.autoScroll) {
					this.autoScroll.scroll(this.scrollContainers, this.mousePos_.x, this.mousePos_.y);
				}
				this.updatePositionFromMouse();
			}

			/**
    * Handles events that can start a drag action, like "mousedown" and "touchstart".
    * When this is triggered and the sources were not already being dragged, more
    * listeners will be attached to keep track of the drag action.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleDragStartEvent_',
			value: function handleDragStartEvent_(event) {
				this.activeDragSource_ = event.delegateTarget || event.currentTarget;

				if (this.canStartDrag_(event)) {
					this.calculateInitialPosition_(event.targetTouches ? event.targetTouches[0] : event);
					event.preventDefault();
					if (event.type === 'keydown') {
						this.startDragging_(event);
					} else {
						this.dragHandler_.add.apply(this.dragHandler_, DragShim.attachDocListeners(this.useShim, {
							mousemove: this.handleDragMoveEvent_.bind(this),
							touchmove: this.handleDragMoveEvent_.bind(this),
							mouseup: this.handleDragEndEvent_.bind(this),
							touchend: this.handleDragEndEvent_.bind(this)
						}));
						this.distanceDragged_ = 0;
					}
				}
			}

			/**
    * Handles a `keydown` event on the document. Ends the drag if ESC was the pressed key.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeyDown_',
			value: function handleKeyDown_(event) {
				if (event.keyCode === 27 && this.isDragging()) {
					this.handleDragEndEvent_();
				}
			}

			/**
    * Handles a "scrollDelta" event. Updates the position data for the source,
    * as well as the placeholder's position on the screen when "move" is set to true.
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'handleScrollDelta_',
			value: function handleScrollDelta_(event) {
				this.mouseSourceDelta_.x += event.deltaX;
				this.mouseSourceDelta_.y += event.deltaY;
				this.updatePositionFromMouse();
			}

			/**
    * Handles a `keydown` event from `KeyboardDrag`. Does the appropriate drag action
    * for the pressed key.
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'handleSourceKeyDown_',
			value: function handleSourceKeyDown_(event) {
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
			}

			/**
    * Triggers when the `container` state changes. Detaches events attached to the
    * previous container and attaches them to the new value instead.
    * @protected
    */

		}, {
			key: 'handleContainerChanged_',
			value: function handleContainerChanged_() {
				if (core.isString(this.sources)) {
					this.sourceHandler_.removeAllListeners();
					this.attachSourceEvents_();
				}
				if (this.prevScrollContainersSelector_) {
					this.scrollContainers = this.prevScrollContainersSelector_;
				}
			}

			/**
    * Triggers when the `sources` state changes. Detaches events attached to the
    * previous sources and attaches them to the new value instead.
    * @protected
    */

		}, {
			key: 'handleSourcesChanged_',
			value: function handleSourcesChanged_() {
				this.sourceHandler_.removeAllListeners();
				this.attachSourceEvents_();
			}

			/**
    * Checks if the minimum distance for dragging has been reached after
    * adding the given values.
    * @param {number} distanceX
    * @param {number} distanceY
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'hasReachedMinimumDistance_',
			value: function hasReachedMinimumDistance_(distanceX, distanceY) {
				this.distanceDragged_ += Math.abs(distanceX) + Math.abs(distanceY);
				return this.distanceDragged_ >= this.minimumDragDistance;
			}

			/**
    * Checks if one of the sources are being dragged.
    * @return {boolean}
    */

		}, {
			key: 'isDragging',
			value: function isDragging() {
				return this.dragging_;
			}

			/**
    * Checks if the given element is within a valid handle.
    * @param {!Element} element
    * @protected
    */

		}, {
			key: 'isWithinHandle_',
			value: function isWithinHandle_(element) {
				var handles = this.handles;
				if (!handles) {
					return true;
				} else if (core.isString(handles)) {
					return dom.match(element, handles + ', ' + handles + ' *');
				} else {
					return dom.contains(handles, element);
				}
			}

			/**
    * Moves the given element to the current source coordinates.
    * @param {!Element} element
    * @protected
    */

		}, {
			key: 'moveToPosition_',
			value: function moveToPosition_(element) {
				element.style.left = this.sourceRelativePos_.x + 'px';
				element.style.top = this.sourceRelativePos_.y + 'px';
			}

			/**
    * Setter for the `autoScroll` state key.
    * @param {*} val
    * @return {!DragAutoScroll}
    */

		}, {
			key: 'setterAutoScrollFn_',
			value: function setterAutoScrollFn_(val) {
				if (val !== false) {
					return new DragAutoScroll(val);
				}
			}

			/**
    * Setter for the `constrain` state key.
    * @param {!Element|Object|string} val
    * @return {!Element|Object}
    * @protected
    */

		}, {
			key: 'setterConstrainFn',
			value: function setterConstrainFn(val) {
				if (core.isString(val)) {
					val = dom.toElement(val);
				}
				return val;
			}

			/**
    * Sets the `scrollContainers` state key.
    * @param {Element|string} val
    * @return {!Array<!Element>}
    * @protected
    */

		}, {
			key: 'setterScrollContainersFn_',
			value: function setterScrollContainersFn_(val) {
				this.prevScrollContainersSelector_ = core.isString(val) ? val : null;
				var elements = this.toElements_(val);
				elements.push(document);
				return elements;
			}

			/**
    * Starts dragging the selected source.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'startDragging_',
			value: function startDragging_(event) {
				this.dragging_ = true;
				this.createActiveDragPlaceholder_();
				dom.addClasses(this.activeDragPlaceholder_, this.draggingClass);
				this.activeDragPlaceholder_.setAttribute('aria-grabbed', 'true');
				this.emit(Drag.Events.START, {
					originalEvent: event
				});
			}

			/**
    * Converts the given element or selector into an array of elements.
    * @param {Element|string} elementOrSelector
    * @return {!Array<!Element>}
    * @protected
    */

		}, {
			key: 'toElements_',
			value: function toElements_(elementOrSelector) {
				if (core.isString(elementOrSelector)) {
					var matched = this.container.querySelectorAll(elementOrSelector);
					return Array.prototype.slice.call(matched, 0);
				} else if (elementOrSelector) {
					return [elementOrSelector];
				} else {
					return [];
				}
			}

			/**
    * Updates the dragged element's position using the given calculated region.
    * @param {!Object} newRegion
    */

		}, {
			key: 'updatePosition',
			value: function updatePosition(newRegion) {
				this.constrain_(newRegion);
				var deltaX = newRegion.left - this.sourceRegion_.left;
				var deltaY = newRegion.top - this.sourceRegion_.top;
				if (deltaX !== 0 || deltaY !== 0) {
					this.sourceRegion_ = newRegion;
					this.sourceRelativePos_.x += deltaX;
					this.sourceRelativePos_.y += deltaY;
					this.emit(Drag.Events.DRAG, this.buildEventObject_());
				}
			}

			/**
    * Updates the dragged element's position, moving its placeholder if `move`
    * is set to true.
    * @param {number} deltaX
    * @param {number} deltaY
    */

		}, {
			key: 'updatePositionFromDelta',
			value: function updatePositionFromDelta(deltaX, deltaY) {
				var newRegion = object.mixin({}, this.sourceRegion_);
				newRegion.left += deltaX;
				newRegion.right += deltaX;
				newRegion.top += deltaY;
				newRegion.bottom += deltaY;
				this.updatePosition(newRegion);
			}

			/**
    * Updates the dragged element's position, according to the current mouse position.
    */

		}, {
			key: 'updatePositionFromMouse',
			value: function updatePositionFromMouse() {
				var newRegion = {
					height: this.sourceRegion_.height,
					left: this.mousePos_.x + this.mouseSourceDelta_.x,
					top: this.mousePos_.y + this.mouseSourceDelta_.y,
					width: this.sourceRegion_.width
				};
				newRegion.right = newRegion.left + newRegion.width;
				newRegion.bottom = newRegion.top + newRegion.height;
				this.updatePosition(newRegion);
			}

			/**
    * Validates the given value, making sure that it's either an element or a string.
    * @param {*} val
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'validateElementOrString_',
			value: function validateElementOrString_(val) {
				return core.isString(val) || core.isElement(val);
			}

			/**
    * Validates the value of the `constrain` state.
    * @param {*} val
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'validatorConstrainFn',
			value: function validatorConstrainFn(val) {
				return core.isString(val) || core.isObject(val);
			}
		}]);
		return Drag;
	}(State);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */


	Drag.STATE = {
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
			validator: core.isString
		},

		/**
   * Object with the boundaries, that the dragged element should not leave
   * while being dragged. If not set, the element is free to be dragged
   * to anywhere on the page. Can be either already an object with the
   * boundaries relative to the document, or an element to use the boundaries
   * from, or even a selector for finding that element.
   * @type {!Element|Object|function()|string}
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
			setter: dom.toElement,
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
			validator: core.isBoolean,
			value: false
		},

		/**
   * The CSS class that should be added to the node being dragged.
   * @type {string}
   * @default 'dragging'
   */
		draggingClass: {
			validator: core.isString,
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
			validator: core.isNumber,
			value: 10
		},

		/**
   * The minimum distance, in pixels, that the mouse needs to move before
   * the action is considered a drag.
   * @type {number}
   * @default 5
   */
		minimumDragDistance: {
			validator: core.isNumber,
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
			validator: core.isObject,
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
		END: 'end',
		START: 'start'
	};

	/**
  * Holds the values that can be passed to the `dragPlaceholder` state key.
  * @type {!Object}
  * @static
  */
	Drag.Placeholder = {
		CLONE: 'clone'
	};

	this['metal']['Drag'] = Drag;
}).call(this);
'use strict';

(function () {
	var array = this['metalNamed']['metal']['array'];
	var core = this['metalNamed']['metal']['core'];
	var object = this['metalNamed']['metal']['object'];
	var dom = this['metal']['dom'];
	var Drag = this['metal']['Drag'];
	var Position = this['metal']['position'];

	/**
  * Adds the functionality of dropping dragged elements to specific
  * targets to the `Drag` class.
  * @extends {Drag}
  */
	var DragDrop = function (_Drag) {
		babelHelpers.inherits(DragDrop, _Drag);

		/**
   * @inheritDoc
   */
		function DragDrop(opt_config) {
			babelHelpers.classCallCheck(this, DragDrop);

			/**
    * The currently active targets, that is, the ones that the dragged source is over.
    * @type {!Array<!Element>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (DragDrop.__proto__ || Object.getPrototypeOf(DragDrop)).call(this, opt_config));

			_this.activeTargets_ = [];
			return _this;
		}

		/**
   * Adds a target to this `DragDrop` instance.
   * @param {!Element} target
   */


		babelHelpers.createClass(DragDrop, [{
			key: 'addTarget',
			value: function addTarget(target) {
				this.targets.push(target);
				this.targets = this.targets;
			}

			/**
    * Overrides the original method from `Drag` to include the target on the event object.
    * @return {!Object}
    * @protected
    * @override
    */

		}, {
			key: 'buildEventObject_',
			value: function buildEventObject_() {
				var obj = babelHelpers.get(DragDrop.prototype.__proto__ || Object.getPrototypeOf(DragDrop.prototype), 'buildEventObject_', this).call(this);
				obj.target = this.activeTargets_[0];
				obj.allActiveTargets = this.activeTargets_;
				return obj;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'cleanUpAfterDragging_',
			value: function cleanUpAfterDragging_() {
				babelHelpers.get(DragDrop.prototype.__proto__ || Object.getPrototypeOf(DragDrop.prototype), 'cleanUpAfterDragging_', this).call(this);
				this.targets.forEach(function (target) {
					return target.removeAttribute('aria-dropeffect');
				});
				if (this.activeTargets_.length) {
					dom.removeClasses(this.activeTargets_[0], this.targetOverClass);
				}
				this.activeTargets_ = [];
			}

			/**
    * Finds all targets that the dragged element is currently over.
    * @return {!Array<!Element>} The current active targets.
    * @protected
    */

		}, {
			key: 'findAllActiveTargets_',
			value: function findAllActiveTargets_() {
				var activeTargets = [];
				var mainRegion;
				var sourceRegion = this.getSourceRegion_();
				var targets = this.targets;
				targets.forEach(function (target, index) {
					var region = Position.getRegion(target);
					if (targets[index] !== this.activeDragPlaceholder_ && Position.intersectRegion(region, sourceRegion)) {
						if (!mainRegion || Position.insideRegion(mainRegion, region)) {
							activeTargets = [targets[index]].concat(activeTargets);
							mainRegion = region;
						} else {
							activeTargets.push(targets[index]);
						}
					}
				}.bind(this));
				return activeTargets;
			}

			/**
    * Gets the active source's region, to be used when calculating which targets are active.
    * @return {!Object}
    * @protected
    */

		}, {
			key: 'getSourceRegion_',
			value: function getSourceRegion_() {
				if (core.isDefAndNotNull(this.mousePos_)) {
					var x = this.mousePos_.x;
					var y = this.mousePos_.y;
					return Position.makeRegion(y, 0, x, x, y, 0);
				} else {
					// We need to remove the scroll data from the region, since the other regions we'll
					// be comparing to won't take that information into account.
					var region = object.mixin({}, this.sourceRegion_);
					region.left -= document.body.scrollLeft;
					region.right -= document.body.scrollLeft;
					region.top -= document.body.scrollTop;
					region.bottom -= document.body.scrollTop;
					return region;
				}
			}

			/**
    * Triggers when the `container` state changes. Overrides default method so
    * it will also update `targets` when container changes.
    * @param {!Object} data
    * @param {!Object} event
    * @protected
    */

		}, {
			key: 'handleContainerChanged_',
			value: function handleContainerChanged_(data, event) {
				babelHelpers.get(DragDrop.prototype.__proto__ || Object.getPrototypeOf(DragDrop.prototype), 'handleContainerChanged_', this).call(this, data, event);
				if (this.prevTargetsSelector_) {
					this.targets = this.prevTargetsSelector_;
				}
			}

			/**
    * Removes a target from this `DragDrop` instance.
    * @param {!Element} target
    */

		}, {
			key: 'removeTarget',
			value: function removeTarget(target) {
				array.remove(this.targets, target);
				this.targets = this.targets;
			}

			/**
    * Sets the `targets` state property.
    * @param {Element|string} val
    * @return {!Array<!Element>}
    * @protected
    */

		}, {
			key: 'setterTargetsFn_',
			value: function setterTargetsFn_(val) {
				this.prevTargetsSelector_ = core.isString(val) ? val : null;
				return this.toElements_(val);
			}

			/**
    * Overrides the original method from `Drag` to also set the "aria-dropeffect"
    * attribute, if set, for all targets.
    * @return {[type]} [description]
    */

		}, {
			key: 'startDragging_',
			value: function startDragging_() {
				var _this2 = this;

				if (this.ariaDropEffect) {
					this.targets.forEach(function (target) {
						return target.setAttribute('aria-dropeffect', _this2.ariaDropEffect);
					});
				}
				babelHelpers.get(DragDrop.prototype.__proto__ || Object.getPrototypeOf(DragDrop.prototype), 'startDragging_', this).call(this);
			}

			/**
    * Overrides original method from `Drag` to also be enable finding the target
    * the dragged element is over at the new position.
    * @param {number} deltaX
    * @param {number} deltaY
    * @override
    */

		}, {
			key: 'updatePosition',
			value: function updatePosition(deltaX, deltaY) {
				babelHelpers.get(DragDrop.prototype.__proto__ || Object.getPrototypeOf(DragDrop.prototype), 'updatePosition', this).call(this, deltaX, deltaY);

				var newTargets = this.findAllActiveTargets_();
				if (newTargets[0] !== this.activeTargets_[0]) {
					if (this.activeTargets_[0]) {
						dom.removeClasses(this.activeTargets_[0], this.targetOverClass);
						this.emit(DragDrop.Events.TARGET_LEAVE, this.buildEventObject_());
					}

					this.activeTargets_ = newTargets;
					if (this.activeTargets_[0]) {
						dom.addClasses(this.activeTargets_[0], this.targetOverClass);
						this.emit(DragDrop.Events.TARGET_ENTER, this.buildEventObject_());
					}
				}
			}
		}]);
		return DragDrop;
	}(Drag);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */


	DragDrop.STATE = {
		/**
   * The "aria-dropeffect" value to be set for all targets. If not set,
   * this html attribute will have to be set manually on the targets.
   * @type {string}
   */
		ariaDropEffect: {
			validator: core.isString
		},

		/**
   * The CSS class that should be added to drop targets when a source
   * is being dragged over them.
   * @type {string}
   * @default 'dropOver'
   */
		targetOverClass: {
			validator: core.isString,
			value: 'targetOver'
		},

		/**
   * Elements that the sources can be dropped on. Can be either a single
   * element or a selector for multiple elements.
   * @type {!Element|string}
   */
		targets: {
			setter: 'setterTargetsFn_',
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

	this['metal']['DragDrop'] = DragDrop;
}).call(this);
'use strict';

(function () {
  var Drag = this['metal']['Drag'];
  var DragDrop = this['metal']['DragDrop'];
  this['metalNamed']['drag'] = this['metalNamed']['drag'] || {};
  this['metalNamed']['drag']['Drag'] = Drag;
  this['metalNamed']['drag']['DragDrop'] = DragDrop;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Slider.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Slider.
     * @public
     */

    goog.module('Slider.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      opt_data = opt_data || {};
      var maxNumber__soy3 = ($$temp = opt_data.max) == null ? 100 : $$temp;
      var minNumber__soy4 = ($$temp = opt_data.min) == null ? 0 : $$temp;
      var valueNumber__soy5 = ($$temp = opt_data.value) == null ? 0 : $$temp;
      ie_open('div', null, null, 'class', 'slider ' + (($$temp = opt_data.elementClasses) == null ? '' : $$temp));
      ie_open('input', null, null, 'name', ($$temp = opt_data.inputName) == null ? '' : $$temp, 'type', 'hidden', 'value', valueNumber__soy5);
      ie_close('input');
      ie_open('span');
      var dyn0 = valueNumber__soy5;
      if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
      ie_close('span');
      var percentage__soy15 = 100 * (valueNumber__soy5 - minNumber__soy4) / (maxNumber__soy3 - minNumber__soy4) + '%';
      ie_open('div', null, null, 'class', 'rail', 'data-onclick', 'onRailClick_');
      ie_void('div', null, null, 'class', 'rail-active', 'style', 'width: ' + percentage__soy15);
      ie_open('div', null, null, 'class', 'rail-handle', 'style', 'left: ' + percentage__soy15);
      ie_void('div', null, null, 'class', 'handle', 'tabindex', '0', 'role', 'slider', 'aria-valuemin', minNumber__soy4, 'aria-valuemax', maxNumber__soy3, 'aria-valuenow', valueNumber__soy5);
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Slider.render';
    }

    exports.render.params = ["elementClasses", "inputName", "max", "min", "value"];
    exports.render.types = { "elementClasses": "any", "inputName": "any", "max": "any", "min": "any", "value": "any" };
    templates = exports;
    return exports;
  });

  var Slider = function (_Component) {
    babelHelpers.inherits(Slider, _Component);

    function Slider() {
      babelHelpers.classCallCheck(this, Slider);
      return babelHelpers.possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
    }

    return Slider;
  }(Component);

  Soy.register(Slider, templates);
  this['metalNamed']['Slider'] = this['metalNamed']['Slider'] || {};
  this['metalNamed']['Slider']['Slider'] = Slider;
  this['metalNamed']['Slider']['templates'] = templates;
  this['metal']['Slider'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var Component = this['metal']['component'];
	var Drag = this['metalNamed']['drag']['Drag'];
	var Position = this['metal']['position'];
	var Soy = this['metal']['Soy'];
	var templates = this['metal']['Slider'];

	/**
  * Slider component.
  */

	var Slider = function (_Component) {
		babelHelpers.inherits(Slider, _Component);

		function Slider() {
			babelHelpers.classCallCheck(this, Slider);
			return babelHelpers.possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
		}

		babelHelpers.createClass(Slider, [{
			key: 'attached',

			/**
    * @inheritDoc
    */
			value: function attached() {
				/**
     * Manages dragging the rail handle to update the slider value.
     * @type {Drag}
     * @protected
     */
				this.drag_ = new Drag({
					axis: 'x',
					constrain: this.constrainToRail_.bind(this),
					container: this.element,
					handles: '.handle',
					sources: '.rail-handle'
				});
				this.on('elementChanged', this.handleElementChanged_);

				this.attachDragEvents_();
			}

			/**
    * Attaches the drag events to handle value updates when dragging the rail handle.
    * protected
    */

		}, {
			key: 'attachDragEvents_',
			value: function attachDragEvents_() {
				this.drag_.on(Drag.Events.DRAG, this.updateValueFromDragData_.bind(this));
				this.drag_.on(Drag.Events.END, this.updateValueFromDragData_.bind(this));
			}

			/**
    * Constrains the given region to be inside the rail. This is being used
    * instead of `Drag`'s default behavior, because `Drag` would require the
    * whole handle to be inside the rail element, while we just want to make sure
    * that the left side of the handle is inside it.
    * @param {!Object} region
    * @protected
    */

		}, {
			key: 'constrainToRail_',
			value: function constrainToRail_(region) {
				var rail = this.element.querySelector('.rail');
				var constrain = Position.getRegion(rail, true);
				if (region.left < constrain.left) {
					region.left = constrain.left;
				} else if (region.left > constrain.right) {
					region.left -= region.left - constrain.right;
				}
				region.right = region.left + region.width;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(Slider.prototype.__proto__ || Object.getPrototypeOf(Slider.prototype), 'disposeInternal', this).call(this);
				this.drag_.dispose();
			}

			/**
    * Returns the `Drag` instance being used.
    * @return {!Drag}
    */

		}, {
			key: 'getDrag',
			value: function getDrag() {
				return this.drag_;
			}

			/**
    * Handles the `elementChanged` event. Updates the drag container to the new
    * element, and also updates the constrain element.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'handleElementChanged_',
			value: function handleElementChanged_(data) {
				if (data.newVal) {
					this.drag_.container = data.newVal;
				}
			}

			/**
    * Handles mouse down actions on the slider rail and updates the slider value accordingly.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'onRailClick_',
			value: function onRailClick_(event) {
				if (dom.hasClass(event.target, 'rail') || dom.hasClass(event.target, 'rail-active')) {
					var prevValue = this.value;
					this.updateValue_(event.offsetX, 0, true);
					if (prevValue === this.value) {
						var handleRegion = Position.getRegion(this.element.querySelector('.handle'));
						if (event.offsetX < handleRegion.left) {
							this.value -= 1;
						} else {
							this.value += 1;
						}
					}
				}
			}

			/**
    * Synchronizes the slider UI with the `max` state key.
    * @param {number} newVal The new value of the state key.
    */

		}, {
			key: 'syncMax',
			value: function syncMax(newVal) {
				if (newVal < this.value) {
					this.value = newVal;
				}
			}

			/**
    * Synchronizes the slider UI with the `min` state key.
    * @param {number} newVal The new value of the state key.
    */

		}, {
			key: 'syncMin',
			value: function syncMin(newVal) {
				if (newVal > this.value) {
					this.value = newVal;
				}
			}

			/**
    * Updates the slider value based on the UI state of the handle element.
    * @param {number} handlePosition Position of the handle in px.
    * @param {number} offset Offset to be added to normalize relative inputs.
    * @param {boolean=} opt_relative If the given position is relative to the
    *     rail or not.
    * @protected
    */

		}, {
			key: 'updateValue_',
			value: function updateValue_(handlePosition, offset, opt_relative) {
				var region = Position.getRegion(this.element);
				if (!opt_relative) {
					handlePosition -= region.left;
				}
				this.value = Math.round(offset + handlePosition / region.width * (this.max - this.min));
			}

			/**
    * Handles Drag events from the rail handle and updates the slider value accordingly.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'updateValueFromDragData_',
			value: function updateValueFromDragData_(data, event) {
				this.updateValue_(data.x, this.min);
				event.preventDefault();
			}
		}]);
		return Slider;
	}(Component);

	Soy.register(Slider, templates);

	/**
  * `Slider`'s state definition.
  */
	Slider.STATE = {
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
   * @default 0
   */
		value: {
			validator: function validator(val) {
				return core.isNumber(val) && this.min <= val && val <= this.max;
			},
			value: 0
		}
	};

	this['metal']['Slider'] = Slider;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Switcher.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Switcher.
     * @public
     */

    goog.module('Switcher.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      ie_open('div', null, null, 'class', 'switcher' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + (opt_data.checked ? ' switcher-on' : ''), 'data-onclick', 'handleClick', 'data-onkeyup', 'handleKeyUp', 'role', 'checkbox', 'aria-checked', opt_data.checked ? 'true' : 'false', 'tabindex', '0');
      ie_open('div', null, null, 'class', 'switcher-control');
      ie_void('div', null, null, 'class', 'switcher-control-icon');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Switcher.render';
    }

    exports.render.params = ["checked", "elementClasses"];
    exports.render.types = { "checked": "any", "elementClasses": "any" };
    templates = exports;
    return exports;
  });

  var Switcher = function (_Component) {
    babelHelpers.inherits(Switcher, _Component);

    function Switcher() {
      babelHelpers.classCallCheck(this, Switcher);
      return babelHelpers.possibleConstructorReturn(this, (Switcher.__proto__ || Object.getPrototypeOf(Switcher)).apply(this, arguments));
    }

    return Switcher;
  }(Component);

  Soy.register(Switcher, templates);
  this['metalNamed']['Switcher'] = this['metalNamed']['Switcher'] || {};
  this['metalNamed']['Switcher']['Switcher'] = Switcher;
  this['metalNamed']['Switcher']['templates'] = templates;
  this['metal']['Switcher'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var templates = this['metal']['Switcher'];
	var Component = this['metal']['component'];
	var Soy = this['metal']['Soy'];

	/**
  * Switcher component.
  */

	var Switcher = function (_Component) {
		babelHelpers.inherits(Switcher, _Component);

		function Switcher() {
			babelHelpers.classCallCheck(this, Switcher);
			return babelHelpers.possibleConstructorReturn(this, (Switcher.__proto__ || Object.getPrototypeOf(Switcher)).apply(this, arguments));
		}

		babelHelpers.createClass(Switcher, [{
			key: 'handleClick',

			/**
    * Handles switcher click.
    */
			value: function handleClick() {
				this.checked = !this.checked;
			}

			/**
    * Handles switcher keyboard press.
    */

		}, {
			key: 'handleKeyUp',
			value: function handleKeyUp() {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.checked = !this.checked;
				}
			}
		}]);
		return Switcher;
	}(Component);

	/**
  * Switcher state definition.
  * @type {!Object}
  * @static
  */


	Switcher.STATE = {
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
	Soy.register(Switcher, templates);

	this['metal']['Switcher'] = Switcher;
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var dom = this['metal']['dom'];
	var EventHandler = this['metalNamed']['events']['EventHandler'];
	var State = this['metal']['state'];

	/**
  * Toggler component.
  */

	var Toggler = function (_State) {
		babelHelpers.inherits(Toggler, _State);

		/**
   * @inheritDoc
   */
		function Toggler(opt_config) {
			babelHelpers.classCallCheck(this, Toggler);

			var _this = babelHelpers.possibleConstructorReturn(this, (Toggler.__proto__ || Object.getPrototypeOf(Toggler)).call(this, opt_config));

			_this.headerEventHandler_ = new EventHandler();

			_this.on('headerChanged', _this.syncHeader);
			_this.syncHeader();
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(Toggler, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(Toggler.prototype.__proto__ || Object.getPrototypeOf(Toggler.prototype), 'disposeInternal', this).call(this);
				this.headerEventHandler_.removeAllListeners();
			}

			/**
    * Gets the content to be toggled by the given header element.
    * @param {!Element} header
    * @protected
    */

		}, {
			key: 'getContentElement_',
			value: function getContentElement_(header) {
				if (core.isElement(this.content)) {
					return this.content;
				}

				var content = dom.next(header, this.content);
				if (content) {
					return content;
				}

				content = header.querySelector(this.content);
				if (content) {
					return content;
				}

				return this.container.querySelector(this.content);
			}

			/**
    * Handles a `click` event on the header.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleClick_',
			value: function handleClick_(event) {
				this.toggle(event.delegateTarget || event.currentTarget);
			}

			/**
    * Handles a `keydown` event on the header.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleKeydown_',
			value: function handleKeydown_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.toggle(event.delegateTarget || event.currentTarget);
					event.preventDefault();
				}
			}

			/**
    * Syncs the component according to the value of the `header` state,
    * attaching events to the new element and detaching from any previous one.
    */

		}, {
			key: 'syncHeader',
			value: function syncHeader() {
				this.headerEventHandler_.removeAllListeners();
				if (this.header) {
					if (core.isString(this.header)) {
						this.headerEventHandler_.add(dom.delegate(this.container, 'click', this.header, this.handleClick_.bind(this)), dom.delegate(this.container, 'keydown', this.header, this.handleKeydown_.bind(this)));
					} else {
						this.headerEventHandler_.add(dom.on(this.header, 'click', this.handleClick_.bind(this)), dom.on(this.header, 'keydown', this.handleKeydown_.bind(this)));
					}
				}
			}

			/**
    * Toggles the content's visibility.
    */

		}, {
			key: 'toggle',
			value: function toggle(header) {
				var content = this.getContentElement_(header);
				dom.toggleClasses(content, Toggler.CSS_EXPANDED);
				dom.toggleClasses(content, Toggler.CSS_COLLAPSED);

				if (dom.hasClass(content, Toggler.CSS_EXPANDED)) {
					dom.addClasses(header, Toggler.CSS_HEADER_EXPANDED);
					dom.removeClasses(header, Toggler.CSS_HEADER_COLLAPSED);
				} else {
					dom.removeClasses(header, Toggler.CSS_HEADER_EXPANDED);
					dom.addClasses(header, Toggler.CSS_HEADER_COLLAPSED);
				}
			}
		}]);
		return Toggler;
	}(State);

	/**
  * State configuration.
  */


	Toggler.STATE = {
		/**
   * The element where the header/content selectors will be looked for.
   * @type {string|!Element}
   */
		container: {
			setter: dom.toElement,
			validator: function validator(value) {
				return core.isString(value) || core.isElement(value);
			},
			value: document
		},

		/**
   * The element that should be expanded/collapsed by this toggler.
   * @type {string|!Element}
   */
		content: {
			validator: function validator(value) {
				return core.isString(value) || core.isElement(value);
			}
		},

		/**
   * The element that should be trigger toggling.
   * @type {string|!Element}
   */
		header: {
			validator: function validator(value) {
				return core.isString(value) || core.isElement(value);
			}
		}
	};

	/**
  * The CSS class added to the content when it's collapsed.
  */
	Toggler.CSS_COLLAPSED = 'toggler-collapsed';

	/**
  * The CSS class added to the content when it's expanded.
  */
	Toggler.CSS_EXPANDED = 'toggler-expanded';

	/**
  * The CSS class added to the header when the content is collapsed.
  */
	Toggler.CSS_HEADER_COLLAPSED = 'toggler-header-collapsed';

	/**
  * The CSS class added to the header when the content is expanded.
  */
	Toggler.CSS_HEADER_EXPANDED = 'toggler-header-expanded';

	this['metal']['Toggler'] = Toggler;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this['metal']['component'];
  var Soy = this['metal']['Soy'];

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Treeview.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Treeview.
     * @public
     */

    goog.module('Treeview.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'treeview' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      $nodes(opt_data, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Treeview.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $nodes(opt_data, opt_ignored, opt_ijData) {
      if (opt_data.nodes) {
        ie_open('ul', null, null, 'class', 'treeview-nodes', 'role', 'tree');
        var nodeList19 = opt_data.nodes;
        var nodeListLen19 = nodeList19.length;
        for (var nodeIndex19 = 0; nodeIndex19 < nodeListLen19; nodeIndex19++) {
          var nodeData19 = nodeList19[nodeIndex19];
          var index__soy14 = nodeIndex19;
          $node({ lastFocusedRef_: opt_data.lastFocusedRef_, node: nodeData19, path: opt_data.parentPath != null ? opt_data.parentPath + '-' + index__soy14 : index__soy14 }, null, opt_ijData);
        }
        ie_close('ul');
      }
    }
    exports.nodes = $nodes;
    if (goog.DEBUG) {
      $nodes.soyTemplateName = 'Treeview.nodes';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $node(opt_data, opt_ignored, opt_ijData) {
      var focusRef__soy23 = opt_data.lastFocusedRef_ ? opt_data.lastFocusedRef_ : 'node-0';
      var ref__soy24 = 'node-' + opt_data.path;
      ie_open_start('li');
      iattr('class', 'treeview-node');
      iattr('data-treeview-path', opt_data.path);
      iattr('data-onkeyup', 'handleNodeKeyUp_');
      $ariaExpanded(opt_data, null, opt_ijData);
      iattr('role', 'treeitem');
      iattr('tabindex', focusRef__soy23 == ref__soy24 ? '0' : '-1');
      iattr('ref', ref__soy24);
      ie_open_end();
      if (opt_data.node) {
        ie_open('div', null, null, 'class', 'treeview-node-wrapper' + (opt_data.node.expanded ? ' expanded' : ''));
        ie_open('div', null, null, 'class', 'treeview-node-main clearfix' + (opt_data.node.children ? ' hasChildren' : ''), 'data-onclick', 'handleNodeClicked_');
        if (opt_data.node.children) {
          ie_void('div', null, null, 'class', 'treeview-node-toggler');
        }
        ie_open('span', null, null, 'class', 'treeview-node-name');
        var dyn0 = opt_data.node.name;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('span');
        ie_close('div');
        $nodes({ lastFocusedRef_: opt_data.lastFocusedRef_, nodes: opt_data.node.children, parentPath: opt_data.path }, null, opt_ijData);
        ie_close('div');
      }
      ie_close('li');
    }
    exports.node = $node;
    if (goog.DEBUG) {
      $node.soyTemplateName = 'Treeview.node';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $ariaExpanded(opt_data, opt_ignored, opt_ijData) {
      if (opt_data.node.children) {
        iattr('aria-expanded', opt_data.node.expanded ? 'true' : 'false');
      }
    }
    exports.ariaExpanded = $ariaExpanded;
    if (goog.DEBUG) {
      $ariaExpanded.soyTemplateName = 'Treeview.ariaExpanded';
    }

    exports.render.params = ["elementClasses", "lastFocusedRef_", "nodes"];
    exports.render.types = { "elementClasses": "any", "lastFocusedRef_": "any", "nodes": "any" };
    exports.nodes.params = ["lastFocusedRef_", "nodes", "parentPath"];
    exports.nodes.types = { "lastFocusedRef_": "any", "nodes": "any", "parentPath": "any" };
    exports.node.params = ["lastFocusedRef_", "node", "path"];
    exports.node.types = { "lastFocusedRef_": "any", "node": "any", "path": "any" };
    exports.ariaExpanded.params = ["node"];
    exports.ariaExpanded.types = { "node": "any" };
    templates = exports;
    return exports;
  });

  var Treeview = function (_Component) {
    babelHelpers.inherits(Treeview, _Component);

    function Treeview() {
      babelHelpers.classCallCheck(this, Treeview);
      return babelHelpers.possibleConstructorReturn(this, (Treeview.__proto__ || Object.getPrototypeOf(Treeview)).apply(this, arguments));
    }

    return Treeview;
  }(Component);

  Soy.register(Treeview, templates);
  this['metalNamed']['Treeview'] = this['metalNamed']['Treeview'] || {};
  this['metalNamed']['Treeview']['Treeview'] = Treeview;
  this['metalNamed']['Treeview']['templates'] = templates;
  this['metal']['Treeview'] = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var core = this['metal']['metal'];
	var templates = this['metal']['Treeview'];
	var Component = this['metal']['component'];
	var KeyboardFocusManager = this['metal']['KeyboardFocusManager'];
	var Soy = this['metal']['Soy'];

	/**
  * Treeview component.
  */

	var Treeview = function (_Component) {
		babelHelpers.inherits(Treeview, _Component);

		function Treeview() {
			babelHelpers.classCallCheck(this, Treeview);
			return babelHelpers.possibleConstructorReturn(this, (Treeview.__proto__ || Object.getPrototypeOf(Treeview)).apply(this, arguments));
		}

		babelHelpers.createClass(Treeview, [{
			key: 'attached',

			/**
    * @inheritDoc
    */
			value: function attached() {
				this.keyboardFocusManager_ = new KeyboardFocusManager(this, 'li').setFocusHandler(this.handleNextFocus_.bind(this)).start();
				this.keyboardFocusManager_.on(KeyboardFocusManager.EVENT_FOCUSED, this.handleKeyboardFocused_.bind(this));
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposed',
			value: function disposed() {
				this.keyboardFocusManager_.dispose();
				this.keyboardFocusManager_ = null;
			}

			/**
    * Gets the node object from the `nodes` state that is located at the given
    * index path.
    * @param {!Array<number>} path An array of indexes indicating where the
    *   searched node is located inside the `nodes` state.
    * @return {!Object}
    */

		}, {
			key: 'getNodeObj',
			value: function getNodeObj(path) {
				var obj = this.nodes[path[0]];
				for (var i = 1; i < path.length; i++) {
					obj = obj.children[path[i]];
				}
				return obj;
			}

			/**
    * Gets the treeview path for a given node.
    * @param {!Element} node
    * @return {!Array<string>}
    * @protected
    */

		}, {
			key: 'getPath_',
			value: function getPath_(node) {
				return node.getAttribute('data-treeview-path').split('-');
			}

			/**
    * Handles the `focused` event from `KeyboardFocusManager`. Stores the ref
    * of the last focused tree item so that we can retain it in the tab order
    * when the user leaves the tree.
    * @param {!Object} data
    * @protected
    */

		}, {
			key: 'handleKeyboardFocused_',
			value: function handleKeyboardFocused_(data) {
				this.lastFocusedRef_ = data.ref;
			}

			/**
    * Handles the left arrow being pressed. If the node is expanded, it will be
    * closed. If it's closed, its parent's ref will be returned so it can be
    * focused by `KeyboardFocusManager`.
    * @param {!Array<string>} path
    * @param {!Object} obj
    * @return {?string}
    * @protected
    */

		}, {
			key: 'handleLeftArrow_',
			value: function handleLeftArrow_(path, obj) {
				if (obj.expanded) {
					obj.expanded = false;
					this.nodes = this.nodes;
				} else if (path.length > 1) {
					path.pop();
					return Treeview.NODE_REF_PREFIX + path.join('-');
				}
			}

			/**
    * Handles focus through keyboard.
    * @param {!Event} event
    * @return {boolean|string|Element}
    * @protected
    */

		}, {
			key: 'handleNextFocus_',
			value: function handleNextFocus_(event) {
				event.stopPropagation();

				var path = this.getPath_(event.delegateTarget);
				var obj = this.getNodeObj(path);
				switch (event.keyCode) {
					case 37:
						return this.handleLeftArrow_(path, obj);
					case 39:
						return this.handleRightArrow_(path, obj);
					default:
						// Use default behavior for other keys (like up/down arrows).
						return true;
				}
			}

			/**
    * This is called when one of this tree view's nodes is clicked.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleNodeClicked_',
			value: function handleNodeClicked_(event) {
				this.toggleExpandedState_(event.delegateTarget.parentNode.parentNode);
			}

			/**
    * This is called when one of this tree view's nodes receives a keypress.
    * If the pressed key is ENTER or SPACE, the node's expanded state will be toggled.
    * @param {!Event} event
    * @protected
    */

		}, {
			key: 'handleNodeKeyUp_',
			value: function handleNodeKeyUp_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.toggleExpandedState_(event.delegateTarget);
					event.stopPropagation();
				}
			}

			/**
    * Handles the right arrow being pressed. If the node is closed, it will be
    * expanded. If it's already expanded, the ref of its first child will be
    * returned so it can be focused by `KeyboardFocusManager`.
    * @param {!Array<string>} path
    * @param {!Object} obj
    * @return {?string}
    * @protected
    */

		}, {
			key: 'handleRightArrow_',
			value: function handleRightArrow_(path, obj) {
				if (obj.expanded) {
					path.push(0);
					return Treeview.NODE_REF_PREFIX + path.join('-');
				} else if (obj.children) {
					obj.expanded = true;
					this.nodes = this.nodes;
				}
			}

			/**
    * Toggles the expanded state for the given tree node.
    * @param {!Element} node
    * @protected
    */

		}, {
			key: 'toggleExpandedState_',
			value: function toggleExpandedState_(node) {
				var nodeObj = this.getNodeObj(this.getPath_(node));
				nodeObj.expanded = !nodeObj.expanded;
				this.nodes = this.nodes;
			}
		}]);
		return Treeview;
	}(Component);

	Soy.register(Treeview, templates);

	// The prefix used for tree item nodes' refs.
	Treeview.NODE_REF_PREFIX = 'node-';

	/**
  * Treeview state definition.
  * @type {!Object}
  * @static
  */
	Treeview.STATE = {
		/**
   * The ref of the last item that has been focused, so that we can retain only
   * that node in the tab order.
   * @type {string}
   */
		lastFocusedRef_: {
			internal: true,
			validator: core.isString
		},

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

	this['metal']['Treeview'] = Treeview;
}).call(this);
}).call(this);
//# sourceMappingURL=metal.js.map
