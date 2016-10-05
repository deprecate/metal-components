define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

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
					if (required && !(0, _metal.isDefAndNotNull)(value[key]) || isInvalid(validator(value[key]))) {
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
		var compName = context ? (0, _metal.getFunctionName)(context.constructor) : null;
		var renderer = context && context.getRenderer && context.getRenderer();
		var parent = renderer && renderer.getParent ? context.getRenderer().getParent() : null;
		var parentName = parent ? (0, _metal.getFunctionName)(parent.constructor) : null;
		var location = parentName ? 'Check render method of \'' + parentName + '\'.' : '';
		return new Error('Warning: Invalid state passed to \'' + name + '\'. ' + (error + ' Passed to \'' + compName + '\'. ' + location));
	}

	/**
  * Returns the type of the given value.
  * @param {*} value Any value.
  * @return {string} Type of value.
  */
	function getType(value) {
		var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
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
			if (!(0, _metal.isDef)(value) || (0, _metal.isNull)(value)) {
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

	exports.default = validators;
});
//# sourceMappingURL=validators.js.map