'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/core', 'crystal-tooltip/src/TooltipBase', 'crystal-popover/src/Popover.soy', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _core, _TooltipBase2, _Popover, _JQueryAdapter) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _TooltipBase3 = _interopRequireDefault(_TooltipBase2);

	var _Popover2 = _interopRequireDefault(_Popover);

	var _JQueryAdapter2 = _interopRequireDefault(_JQueryAdapter);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	var _get = function get(object, property, receiver) {
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

	var Popover = (function (_TooltipBase) {
		_inherits(Popover, _TooltipBase);

		function Popover() {
			_classCallCheck(this, Popover);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Popover).apply(this, arguments));
		}

		_createClass(Popover, [{
			key: 'syncVisible',
			value: function syncVisible(visible) {
				this.element.style.display = visible ? 'block' : '';

				_get(Object.getPrototypeOf(Popover.prototype), 'syncVisible', this).call(this, visible);
			}
		}]);

		return Popover;
	})(_TooltipBase3.default);

	Popover.ATTRS = {
		title: {
			validator: _core2.default.isString
		},
		triggerEvents: {
			validator: Array.isArray,
			value: ['click', 'click']
		}
	};
	Popover.Align = _TooltipBase3.default.Align;
	Popover.ELEMENT_CLASSES = 'popover';

	_Popover2.default.setImpl(Popover);

	exports.default = Popover;

	_JQueryAdapter2.default.register('popover', Popover);
});
//# sourceMappingURL=Popover.js.map