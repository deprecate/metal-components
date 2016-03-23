define(['exports', 'metal-soy/src/Soy', './TooltipBase', './Tooltip.soy', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _Soy, _TooltipBase2, _Tooltip, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TooltipBase = exports.Tooltip = undefined;

	var _Soy2 = _interopRequireDefault(_Soy);

	var _TooltipBase3 = _interopRequireDefault(_TooltipBase2);

	var _Tooltip2 = _interopRequireDefault(_Tooltip);

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

	var Tooltip = function (_TooltipBase) {
		_inherits(Tooltip, _TooltipBase);

		function Tooltip() {
			_classCallCheck(this, Tooltip);

			return _possibleConstructorReturn(this, _TooltipBase.apply(this, arguments));
		}

		Tooltip.prototype.syncVisible = function syncVisible(visible) {
			this.element.style.opacity = visible ? 1 : '';
			_TooltipBase.prototype.syncVisible.call(this, visible);
		};

		return Tooltip;
	}(_TooltipBase3.default);

	Tooltip.prototype.registerMetalComponent && Tooltip.prototype.registerMetalComponent(Tooltip, 'Tooltip')

	_Soy2.default.register(Tooltip, _Tooltip2.default);

	/**
  * @inheritDoc
  * @see `Align` class.
  * @static
  */
	Tooltip.Align = _TooltipBase3.default.Align;

	exports.default = Tooltip;
	exports.Tooltip = Tooltip;
	exports.TooltipBase = _TooltipBase3.default;
	_JQueryAdapter2.default.register('tooltip', Tooltip);
});
//# sourceMappingURL=Tooltip.js.map