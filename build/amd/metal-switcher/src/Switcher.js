define(['exports', 'metal/src/metal', './Switcher.soy.js', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _metal, _SwitcherSoy, _component, _Soy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _SwitcherSoy2 = _interopRequireDefault(_SwitcherSoy);

	var _component2 = _interopRequireDefault(_component);

	var _Soy2 = _interopRequireDefault(_Soy);

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

	var Switcher = function (_Component) {
		_inherits(Switcher, _Component);

		function Switcher() {
			_classCallCheck(this, Switcher);

			return _possibleConstructorReturn(this, (Switcher.__proto__ || Object.getPrototypeOf(Switcher)).apply(this, arguments));
		}

		_createClass(Switcher, [{
			key: 'handleClick',
			value: function handleClick() {
				this.checked = !this.checked;
			}
		}]);

		return Switcher;
	}(_component2.default);

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
			validator: _metal2.default.isBoolean,
			value: false
		}
	};
	_Soy2.default.register(Switcher, _SwitcherSoy2.default);

	exports.default = Switcher;
});
//# sourceMappingURL=Switcher.js.map