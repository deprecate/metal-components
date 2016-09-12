define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-component/src/all/component', 'metal-soy/src/Soy', './Select.soy.js', 'metal-dropdown/src/Dropdown'], function (exports, _metal, _dom, _component, _Soy, _SelectSoy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _dom2 = _interopRequireDefault(_dom);

	var _component2 = _interopRequireDefault(_component);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _SelectSoy2 = _interopRequireDefault(_SelectSoy);

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

	var Select = function (_Component) {
		_inherits(Select, _Component);

		function Select() {
			_classCallCheck(this, Select);

			return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
		}

		_createClass(Select, [{
			key: 'findItemIndex_',
			value: function findItemIndex_(element) {
				var items = this.element.querySelectorAll('li');
				for (var i = 0; i < items.length; i++) {
					if (items.item(i) === element) {
						return i;
					}
				}
			}
		}, {
			key: 'focusIndex_',
			value: function focusIndex_(index) {
				var option = this.element.querySelector('.select-option:nth-child(' + (index + 1) + ') a');
				if (option) {
					this.focusedIndex_ = index;
					option.focus();
				}
			}
		}, {
			key: 'getDropdown',
			value: function getDropdown() {
				return this.components.dropdown;
			}
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
		}, {
			key: 'handleItemClick_',
			value: function handleItemClick_(event) {
				this.selectItem_(event.delegateTarget);
				event.preventDefault();
			}
		}, {
			key: 'handleItemKeyDown_',
			value: function handleItemKeyDown_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.closedWithKeyboard_ = true;
					this.selectItem_(event.delegateTarget);
					event.preventDefault();
				}
			}
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
							this.focusedIndex_ = _metal2.default.isDefAndNotNull(this.focusedIndex_) ? this.focusedIndex_ : 1;
							this.focusIndex_(this.focusedIndex_ === 0 ? this.items.length - 1 : this.focusedIndex_ - 1);
							event.preventDefault();
							break;
						case 40:
							this.focusedIndex_ = _metal2.default.isDefAndNotNull(this.focusedIndex_) ? this.focusedIndex_ : -1;
							this.focusIndex_(this.focusedIndex_ === this.items.length - 1 ? 0 : this.focusedIndex_ + 1);
							event.preventDefault();
							break;
					}
				} else if ((event.keyCode === 13 || event.keyCode === 32) && _dom2.default.hasClass(event.target, 'dropdown-select')) {
					this.openedWithKeyboard_ = true;
					this.expanded_ = true;
					event.preventDefault();
					return;
				}
			}
		}, {
			key: 'selectItem_',
			value: function selectItem_(itemElement) {
				this.selectedIndex = this.findItemIndex_(itemElement);
				this.expanded_ = false;
			}
		}, {
			key: 'setItems_',
			value: function setItems_(items) {
				return items.map(function (item) {
					return _Soy2.default.toIncDom(item);
				});
			}
		}]);

		return Select;
	}(_component2.default);

	_Soy2.default.register(Select, _SelectSoy2.default);

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
			validator: _metal2.default.isString,
			value: 'btn btn-default'
		},

		/**
   * Flag indicating if the select dropdown is currently expanded.
   * @type {boolean}
   */
		expanded_: {
			validator: _metal2.default.isBoolean,
			value: false,
			internal: true
		},

		/**
   * The name of the hidden input field
   * @type {string}
   */
		hiddenInputName: {
			validator: _metal2.default.isString
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
			validator: _metal2.default.isString
		},

		/**
   * The index of the currently selected item, or -1 if none is selected.
   * @type {number}
   */
		selectedIndex: {
			validator: _metal2.default.isNumber,
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

	exports.default = Select;
});
//# sourceMappingURL=Select.js.map