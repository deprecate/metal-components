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

	var core = function () {
		function core() {
			_classCallCheck(this, core);
		}

		_createClass(core, null, [{
			key: 'abstractMethod',
			value: function abstractMethod() {
				throw Error('Unimplemented abstract method');
			}
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
		}, {
			key: 'getFunctionName',
			value: function getFunctionName(fn) {
				if (!fn.name) {
					var str = fn.toString();
					fn.name = str.substring(9, str.indexOf('('));
				}
				return fn.name;
			}
		}, {
			key: 'getUid',
			value: function getUid(opt_object, opt_noInheritance) {
				if (opt_object) {
					var id = opt_object[core.UID_PROPERTY];
					if (opt_noInheritance && !opt_object.hasOwnProperty(core.UID_PROPERTY)) {
						id = null;
					}
					return id || (opt_object[core.UID_PROPERTY] = core.uniqueIdCounter_++);
				}
				return core.uniqueIdCounter_++;
			}
		}, {
			key: 'identityFunction',
			value: function identityFunction(opt_returnValue) {
				return opt_returnValue;
			}
		}, {
			key: 'isBoolean',
			value: function isBoolean(val) {
				return typeof val === 'boolean';
			}
		}, {
			key: 'isDef',
			value: function isDef(val) {
				return val !== undefined;
			}
		}, {
			key: 'isDefAndNotNull',
			value: function isDefAndNotNull(val) {
				return core.isDef(val) && !core.isNull(val);
			}
		}, {
			key: 'isDocument',
			value: function isDocument(val) {
				return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 9;
			}
		}, {
			key: 'isElement',
			value: function isElement(val) {
				return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 1;
			}
		}, {
			key: 'isFunction',
			value: function isFunction(val) {
				return typeof val === 'function';
			}
		}, {
			key: 'isNull',
			value: function isNull(val) {
				return val === null;
			}
		}, {
			key: 'isNumber',
			value: function isNumber(val) {
				return typeof val === 'number';
			}
		}, {
			key: 'isWindow',
			value: function isWindow(val) {
				return val !== null && val === val.window;
			}
		}, {
			key: 'isObject',
			value: function isObject(val) {
				var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
				return type === 'object' && val !== null || type === 'function';
			}
		}, {
			key: 'isPromise',
			value: function isPromise(val) {
				return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && typeof val.then === 'function';
			}
		}, {
			key: 'isString',
			value: function isString(val) {
				return typeof val === 'string' || val instanceof String;
			}
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
		}, {
			key: 'nullFunction',
			value: function nullFunction() {}
		}]);

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
//# sourceMappingURL=core.js.map