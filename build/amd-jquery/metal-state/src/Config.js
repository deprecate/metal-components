define(['exports', 'metal/src/metal', './validators'], function (exports, _metal, _validators) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _validators2 = _interopRequireDefault(_validators);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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
		required: function required() {
			var _required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return mergeConfig(this, { required: _required });
		},
		setter: function setter(_setter) {
			return mergeConfig(this, { setter: _setter });
		},
		validator: function validator(_validator) {
			return mergeConfig(this, { validator: _validator });
		},
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
		_metal.object.mixin(obj.config, config);
		return obj;
	}

	// Add all validators to `Config`.
	var fnNames = Object.keys(_validators2.default);
	fnNames.forEach(function (name) {
		return Config[name] = function () {
			return this.validator(_validators2.default[name]);
		};
	});

	exports.default = Config;
});
//# sourceMappingURL=Config.js.map