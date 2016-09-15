define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-anim/src/Anim', 'metal-component/src/all/component', 'metal-events/src/events', 'metal-soy/src/Soy', './Alert.soy.js'], function (exports, _metal, _dom, _Anim, _component, _events, _Soy, _AlertSoy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _Anim2 = _interopRequireDefault(_Anim);

	var _component2 = _interopRequireDefault(_component);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _AlertSoy2 = _interopRequireDefault(_AlertSoy);

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

	var Alert = function (_Component) {
		_inherits(Alert, _Component);

		function Alert() {
			_classCallCheck(this, Alert);

			return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
		}

		_createClass(Alert, [{
			key: 'created',
			value: function created() {
				this.eventHandler_ = new _events.EventHandler();
			}
		}, {
			key: 'detached',
			value: function detached() {
				_get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'detached', this).call(this);
				this.eventHandler_.removeAllListeners();
				clearTimeout(this.delay_);
			}
		}, {
			key: 'close',
			value: function close() {
				_dom2.default.once(this.element, 'animationend', this.dispose.bind(this));
				_dom2.default.once(this.element, 'transitionend', this.dispose.bind(this));
				this.eventHandler_.removeAllListeners();
				this.syncVisible(false);
			}
		}, {
			key: 'handleDocClick_',
			value: function handleDocClick_(event) {
				if (!this.element.contains(event.target)) {
					this.hide();
				}
			}
		}, {
			key: 'hide',
			value: function hide() {
				this.visible = false;
			}
		}, {
			key: 'hideCompletely_',
			value: function hideCompletely_() {
				if (!this.isDisposed() && !this.visible) {
					_get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'syncVisible', this).call(this, false);
				}
			}
		}, {
			key: 'toggle',
			value: function toggle() {
				this.visible = !this.visible;
			}
		}, {
			key: 'show',
			value: function show() {
				this.visible = true;
			}
		}, {
			key: 'syncDismissible',
			value: function syncDismissible(dismissible) {
				if (dismissible) {
					this.eventHandler_.add(_dom2.default.on(document, 'click', this.handleDocClick_.bind(this)));
				} else {
					this.eventHandler_.removeAllListeners();
				}
			}
		}, {
			key: 'syncHideDelay',
			value: function syncHideDelay(hideDelay) {
				if (_metal.core.isNumber(hideDelay) && this.visible) {
					clearTimeout(this.delay_);
					this.delay_ = setTimeout(this.hide.bind(this), hideDelay);
				}
			}
		}, {
			key: 'syncVisible',
			value: function syncVisible(visible, prevVisible) {
				var _this2 = this;

				var shouldAsync = false;
				if (!visible) {
					_dom2.default.once(this.element, 'animationend', this.hideCompletely_.bind(this));
					_dom2.default.once(this.element, 'transitionend', this.hideCompletely_.bind(this));
				} else if (_metal.core.isDef(prevVisible)) {
					shouldAsync = true;
					_get(Alert.prototype.__proto__ || Object.getPrototypeOf(Alert.prototype), 'syncVisible', this).call(this, true);
				}

				var showOrHide = function showOrHide() {
					if (_this2.isDisposed()) {
						return;
					}

					_dom2.default.removeClasses(_this2.element, _this2.animClasses[visible ? 'hide' : 'show']);
					_dom2.default.addClasses(_this2.element, _this2.animClasses[visible ? 'show' : 'hide']);

					// Some browsers do not fire transitionend events when running in background
					// tab, see https://bugzilla.mozilla.org/show_bug.cgi?id=683696.
					_Anim2.default.emulateEnd(_this2.element);

					if (visible && _metal.core.isNumber(_this2.hideDelay)) {
						_this2.syncHideDelay(_this2.hideDelay);
					}
				};

				if (shouldAsync) {
					// We need to start the animation asynchronously because of the possible
					// previous call to `super.syncVisible`, which doesn't allow the show
					// animation to work as expected.
					setTimeout(showOrHide, 0);
				} else {
					showOrHide();
				}
			}
		}]);

		return Alert;
	}(_component2.default);

	_Soy2.default.register(Alert, _AlertSoy2.default);

	/**
  * Alert state definition.
  * @type {!Object}
  * @static
  */
	Alert.STATE = {
		/**
   * The CSS classes that should be added to the alert when being shown/hidden.
   * @type {!Object}
   */
		animClasses: {
			validator: _metal.core.isObject,
			value: {
				show: 'fade in',
				hide: 'fade'
			}
		},

		/**
   * The body content of the alert.
   * @type {string}
   */
		body: {
			isHtml: true
		},

		/**
   * Flag indicating if the alert should be dismissable (closeable).
   * @type {boolean}
   * @default true
   */
		dismissible: {
			validator: _metal.core.isBoolean,
			value: true
		},

		/**
   * The CSS classes that should be added to the alert.
   * @type {string}
   * @default 'alert-success'
   */
		elementClasses: {
			value: 'alert-success'
		},

		/**
   * Delay hiding the alert (ms).
   * @type {?number}
   */
		hideDelay: {},

		/**
   * Flag indicating if the alert is visible or not.
   * @type {boolean}
   * @default false
   */
		visible: {
			value: false
		}
	};

	exports.default = Alert;
});
//# sourceMappingURL=Alert.js.map