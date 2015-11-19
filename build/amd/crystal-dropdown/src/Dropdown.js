'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/dom/dom', 'metal/src/events/EventHandler', 'crystal-dropdown/src/Dropdown.soy'], function (exports, _dom, _EventHandler, _Dropdown) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _EventHandler2 = _interopRequireDefault(_EventHandler);

	var _Dropdown2 = _interopRequireDefault(_Dropdown);

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

	var Dropdown = (function (_DropdownBase) {
		_inherits(Dropdown, _DropdownBase);

		function Dropdown(opt_config) {
			_classCallCheck(this, Dropdown);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, opt_config));

			_this.eventHandler_ = new _EventHandler2.default();
			return _this;
		}

		_createClass(Dropdown, [{
			key: 'attached',
			value: function attached() {
				_get(Object.getPrototypeOf(Dropdown.prototype), 'attached', this).call(this);

				this.eventHandler_.add(_dom2.default.on(document, 'click', this.handleDocClick_.bind(this)));
			}
		}, {
			key: 'detached',
			value: function detached() {
				_get(Object.getPrototypeOf(Dropdown.prototype), 'detached', this).call(this);

				this.eventHandler_.removeAllListeners();
			}
		}, {
			key: 'close',
			value: function close() {
				this.expanded = false;
			}
		}, {
			key: 'isOpen',
			value: function isOpen() {
				return this.expanded;
			}
		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_(event) {
				if (this.element.contains(event.target)) {
					return;
				}

				this.close();
			}
		}, {
			key: 'open',
			value: function open() {
				this.expanded = true;
			}
		}, {
			key: 'syncExpanded',
			value: function syncExpanded(expanded) {
				if (expanded) {
					_dom2.default.addClasses(this.element, 'open');
				} else {
					_dom2.default.removeClasses(this.element, 'open');
				}
			}
		}, {
			key: 'syncPosition',
			value: function syncPosition(position, oldPosition) {
				if (oldPosition) {
					_dom2.default.removeClasses(this.element, 'drop' + oldPosition.toLowerCase());
				}

				_dom2.default.addClasses(this.element, 'drop' + position.toLowerCase());
			}
		}, {
			key: 'toggle',
			value: function toggle() {
				this.expanded = !this.expanded;
			}
		}, {
			key: 'validatePosition_',
			value: function validatePosition_(position) {
				switch (position.toLowerCase()) {
					case 'up':
					case 'down':
						return true;

					default:
						return false;
				}
			}
		}]);

		return Dropdown;
	})(_Dropdown2.default);

	Dropdown.ATTRS = {
		body: {},
		header: {},
		expanded: {
			value: false
		},
		position: {
			value: 'down',
			validator: 'validatePosition_'
		}
	};
	Dropdown.ELEMENT_CLASSES = 'dropdown';

	_Dropdown2.default.setImpl(Dropdown);

	exports.default = Dropdown;
});
//# sourceMappingURL=Dropdown.js.map