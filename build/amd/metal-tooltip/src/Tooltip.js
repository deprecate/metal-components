define(['exports', 'metal-dom/src/all/dom', 'metal-soy/src/Soy', './TooltipBase', './Tooltip.soy.js'], function (exports, _dom, _Soy, _TooltipBase2, _TooltipSoy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TooltipBase = exports.Tooltip = undefined;

	var _dom2 = _interopRequireDefault(_dom);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _TooltipBase3 = _interopRequireDefault(_TooltipBase2);

	var _TooltipSoy2 = _interopRequireDefault(_TooltipSoy);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

	var Tooltip = function (_TooltipBase) {
		_inherits(Tooltip, _TooltipBase);

		function Tooltip() {
			_classCallCheck(this, Tooltip);

			return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
		}

		_createClass(Tooltip, [{
			key: 'hideCompletely_',
			value: function hideCompletely_() {
				if (!this.visible) {
					this.element.style.display = 'none';
				}
			}
		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				if (!visible) {
					_dom2.default.once(this.element, 'animationend', this.hideCompletely_.bind(this));
					_dom2.default.once(this.element, 'transitionend', this.hideCompletely_.bind(this));
				} else {
					this.element.style.display = '';
				}

				this.element.style.opacity = visible ? 1 : '';
				_get(Tooltip.prototype.__proto__ || Object.getPrototypeOf(Tooltip.prototype), 'syncVisible', this).call(this, visible);
			}
		}]);

		return Tooltip;
	}(_TooltipBase3.default);

	_Soy2.default.register(Tooltip, _TooltipSoy2.default);

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */
	Tooltip.Align = _TooltipBase3.default.Align;

	exports.default = Tooltip;
	exports.Tooltip = Tooltip;
	exports.TooltipBase = _TooltipBase3.default;
});
//# sourceMappingURL=Tooltip.js.map