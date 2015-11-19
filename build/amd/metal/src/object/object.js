'use strict';

define(['exports', 'metal/src/core'], function (exports, _core) {
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

	var object = (function () {
		function object() {
			_classCallCheck(this, object);
		}

		_createClass(object, null, [{
			key: 'mixin',
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
		}, {
			key: 'getObjectByName',
			value: function getObjectByName(name, opt_obj) {
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
			}
		}]);

		return object;
	})();

	exports.default = object;
});
//# sourceMappingURL=object.js.map