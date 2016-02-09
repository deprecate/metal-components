define(['exports', 'metal/src/core', 'metal-debounce/src/debounce', 'metal/metal/src/dom/dom', 'metal-promise/src/promise/Promise', 'metal-position/src/Align', './AutocompleteBase', 'metal/metal/src/soy/SoyRenderer', 'metal-jquery-adapter/src/JQueryAdapter', './Autocomplete.soy', 'metal-list/src/List'], function (exports, _core, _debounce, _dom, _Promise, _Align, _AutocompleteBase2, _SoyRenderer, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _dom2 = _interopRequireDefault(_dom);

	var _Align2 = _interopRequireDefault(_Align);

	var _AutocompleteBase3 = _interopRequireDefault(_AutocompleteBase2);

	var _SoyRenderer2 = _interopRequireDefault(_SoyRenderer);

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

	var Autocomplete = function (_AutocompleteBase) {
		_inherits(Autocomplete, _AutocompleteBase);

		function Autocomplete() {
			_classCallCheck(this, Autocomplete);

			return _possibleConstructorReturn(this, _AutocompleteBase.apply(this, arguments));
		}

		Autocomplete.prototype.attached = function attached() {
			_AutocompleteBase.prototype.attached.call(this);
			this.on('click', function (event) {
				return event.stopPropagation();
			});
			this.eventHandler_.add(_dom2.default.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
			this.eventHandler_.add(_dom2.default.on(document, 'click', this.handleDocClick_.bind(this)));
			this.eventHandler_.add(_dom2.default.on(window, 'resize', (0, _debounce2.default)(this.handleWindowResize_.bind(this), 100)));
			if (this.visible) {
				this.align();
			}
		};

		Autocomplete.prototype.align = function align() {
			this.element.style.width = this.inputElement.offsetWidth + 'px';
			var position = _Align2.default.align(this.element, this.inputElement, _Align2.default.Bottom);

			_dom2.default.removeClasses(this.element, this.positionCss_);
			switch (position) {
				case _Align2.default.Top:
				case _Align2.default.TopLeft:
				case _Align2.default.TopRight:
					this.positionCss_ = 'autocomplete-top';
					break;
				case _Align2.default.Bottom:
				case _Align2.default.BottomLeft:
				case _Align2.default.BottomRight:
					this.positionCss_ = 'autocomplete-bottom';
					break;
				default:
					this.positionCss_ = null;

			}
			_dom2.default.addClasses(this.element, this.positionCss_);
		};

		Autocomplete.prototype.getList = function getList() {
			return this.components[this.id + '-list'];
		};

		Autocomplete.prototype.handleDocClick_ = function handleDocClick_() {
			if (document.activeElement === this.inputElement) {
				return;
			}
			this.visible = false;
		};

		Autocomplete.prototype.handleInputFocus_ = function handleInputFocus_() {
			this.request(this.inputElement.value);
		};

		Autocomplete.prototype.handleWindowResize_ = function handleWindowResize_() {
			if (this.visible) {
				this.align();
			}
		};

		Autocomplete.prototype.request = function request(query) {
			var self = this;
			return _AutocompleteBase.prototype.request.call(this, query).then(function (data) {
				if (data) {
					data.forEach(self.assertItemObjectStructure_);
					self.getList().items = data;
				}
				self.visible = !!(data && data.length > 0);
			});
		};

		Autocomplete.prototype.onListItemSelected_ = function onListItemSelected_(item) {
			var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
			this.emit('select', this.getList().items[selectedIndex]);
			this.visible = false;
		};

		Autocomplete.prototype.syncVisible = function syncVisible(visible) {
			_AutocompleteBase.prototype.syncVisible.call(this, visible);

			if (visible) {
				this.align();
			}
		};

		Autocomplete.prototype.assertItemObjectStructure_ = function assertItemObjectStructure_(item) {
			if (!_core2.default.isObject(item)) {
				throw new _Promise.CancellablePromise.CancellationError('Autocomplete item must be an object');
			}
			if (!item.hasOwnProperty('textPrimary')) {
				throw new _Promise.CancellablePromise.CancellationError('Autocomplete item must be an object with \'textPrimary\' key');
			}
		};

		return Autocomplete;
	}(_AutocompleteBase3.default);

	Autocomplete.prototype.registerMetalComponent && Autocomplete.prototype.registerMetalComponent(Autocomplete, 'Autocomplete')


	/**
  * Attributes definition.
  * @type {!Object}
  * @static
  */
	Autocomplete.ATTRS = {
		/**
   * Function that converts a given item to the format that should be used by
   * the autocomplete.
   * @type {!function()}
   */
		format: {
			value: function value(item) {
				return _core2.default.isString(item) ? {
					textPrimary: item
				} : item;
			}
		}
	};

	/**
  * The class that will be used as this component's renderer.
  * @type {!Function}
  * @static
  */
	Autocomplete.RENDERER = _SoyRenderer2.default;

	exports.default = Autocomplete;
	_JQueryAdapter2.default.register('autocomplete', Autocomplete);
});
//# sourceMappingURL=Autocomplete.js.map