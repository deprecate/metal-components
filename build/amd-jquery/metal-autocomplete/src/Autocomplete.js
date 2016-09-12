define(['exports', 'metal/src/metal', 'metal-debounce/src/debounce', 'metal-dom/src/all/dom', 'metal-promise/src/promise/Promise', 'metal-position/src/all/position', './AutocompleteBase', 'metal-soy/src/Soy', './Autocomplete.soy.js', 'metal-jquery-adapter/src/JQueryAdapter', 'metal-list/src/List'], function (exports, _metal, _debounce, _dom, _Promise, _position, _AutocompleteBase2, _Soy, _AutocompleteSoy, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _dom2 = _interopRequireDefault(_dom);

	var _AutocompleteBase3 = _interopRequireDefault(_AutocompleteBase2);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _AutocompleteSoy2 = _interopRequireDefault(_AutocompleteSoy);

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

	var Autocomplete = function (_AutocompleteBase) {
		_inherits(Autocomplete, _AutocompleteBase);

		function Autocomplete() {
			_classCallCheck(this, Autocomplete);

			return _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).apply(this, arguments));
		}

		_createClass(Autocomplete, [{
			key: 'attached',
			value: function attached() {
				_get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'attached', this).call(this);
				this.eventHandler_.add(_dom2.default.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
				this.eventHandler_.add(_dom2.default.on(document, 'click', this.handleDocClick_.bind(this)));
				this.eventHandler_.add(_dom2.default.on(window, 'resize', (0, _debounce2.default)(this.handleWindowResize_.bind(this), 100)));
				if (this.visible) {
					this.align();
				}
			}
		}, {
			key: 'align',
			value: function align() {
				this.element.style.width = this.inputElement.offsetWidth + 'px';
				var position = _position.Align.align(this.element, this.inputElement, _position.Align.Bottom);

				_dom2.default.removeClasses(this.element, this.positionCss_);
				switch (position) {
					case _position.Align.Top:
					case _position.Align.TopLeft:
					case _position.Align.TopRight:
						this.positionCss_ = 'autocomplete-top';
						break;
					case _position.Align.Bottom:
					case _position.Align.BottomLeft:
					case _position.Align.BottomRight:
						this.positionCss_ = 'autocomplete-bottom';
						break;
					default:
						this.positionCss_ = null;

				}
				_dom2.default.addClasses(this.element, this.positionCss_);
			}
		}, {
			key: 'getList',
			value: function getList() {
				return this.components.list;
			}
		}, {
			key: 'handleClick_',
			value: function handleClick_(event) {
				event.stopPropagation();
			}
		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_() {
				if (document.activeElement === this.inputElement) {
					return;
				}
				this.visible = false;
			}
		}, {
			key: 'handleInputFocus_',
			value: function handleInputFocus_() {
				this.request(this.inputElement.value);
			}
		}, {
			key: 'handleWindowResize_',
			value: function handleWindowResize_() {
				if (this.visible) {
					this.align();
				}
			}
		}, {
			key: 'request',
			value: function request(query) {
				if (this.autocompleteClosing_) {
					// While closing the input element will be focused, causing another
					// request. This request should be ignored though, since we wish to close
					// the dropdown list, not open it again.
					return;
				}

				var self = this;
				return _get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'request', this).call(this, query).then(function (data) {
					if (data) {
						data.forEach(self.assertItemObjectStructure_);
						self.getList().items = data;
					}
					self.visible = !!(data && data.length > 0);
				});
			}
		}, {
			key: 'onListItemSelected_',
			value: function onListItemSelected_(item) {
				var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
				this.autocompleteClosing_ = true;
				this.emit('select', this.getList().items[selectedIndex]);
				this.visible = false;
				this.autocompleteClosing_ = false;
			}
		}, {
			key: 'syncVisible',
			value: function syncVisible(visible) {
				_get(Autocomplete.prototype.__proto__ || Object.getPrototypeOf(Autocomplete.prototype), 'syncVisible', this).call(this, visible);

				if (visible) {
					this.align();
				}
			}
		}, {
			key: 'assertItemObjectStructure_',
			value: function assertItemObjectStructure_(item) {
				if (!_metal2.default.isObject(item)) {
					throw new _Promise.CancellablePromise.CancellationError('Autocomplete item must be an object');
				}
				if (!item.hasOwnProperty('textPrimary')) {
					throw new _Promise.CancellablePromise.CancellationError('Autocomplete item must be an object with \'textPrimary\' key');
				}
			}
		}]);

		return Autocomplete;
	}(_AutocompleteBase3.default);

	_Soy2.default.register(Autocomplete, _AutocompleteSoy2.default);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Autocomplete.STATE = {
		/**
   * Function that converts a given item to the format that should be used by
   * the autocomplete.
   * @type {!function()}
   */
		format: {
			value: function value(item) {
				if (_metal2.default.isString(item)) {
					item = {
						textPrimary: item
					};
				}
				if (_metal2.default.isObject(item) && !item.text) {
					item.text = item.textPrimary;
				}
				return item;
			}
		}
	};

	exports.default = Autocomplete;
	_JQueryAdapter2.default.register('autocomplete', Autocomplete);
});
//# sourceMappingURL=Autocomplete.js.map