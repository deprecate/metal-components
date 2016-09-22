define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-events/src/events', './Modal.soy.js', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _metal, _dom, _events, _ModalSoy, _component, _Soy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _dom2 = _interopRequireDefault(_dom);

	var _ModalSoy2 = _interopRequireDefault(_ModalSoy);

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

	var Modal = function (_Component) {
		_inherits(Modal, _Component);

		function Modal() {
			_classCallCheck(this, Modal);

			return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
		}

		_createClass(Modal, [{
			key: 'created',
			value: function created() {
				this.eventHandler_ = new _events.EventHandler();
			}
		}, {
			key: 'attached',
			value: function attached() {
				this.autoFocus_(this.autoFocus);
			}
		}, {
			key: 'autoFocus_',
			value: function autoFocus_(autoFocusSelector) {
				if (this.inDocument && this.visible && autoFocusSelector) {
					var element = this.element.querySelector(autoFocusSelector);
					if (element) {
						element.focus();
					}
				}
			}
		}, {
			key: 'detached',
			value: function detached() {
				_get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'detached', this).call(this);
				this.eventHandler_.removeAllListeners();
			}
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				_dom2.default.exitDocument(this.overlayElement);
				this.unrestrictFocus_();
				_get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'disposeInternal', this).call(this);
			}
		}, {
			key: 'handleDocumentFocus_',
			value: function handleDocumentFocus_(event) {
				if (this.overlay && !this.element.contains(event.target)) {
					this.autoFocus_('.modal-dialog');
				}
			}
		}, {
			key: 'handleKeyup_',
			value: function handleKeyup_(event) {
				if (event.keyCode === 27) {
					this.hide();
				}
			}
		}, {
			key: 'hide',
			value: function hide() {
				this.visible = false;
			}
		}, {
			key: 'restrictFocus_',
			value: function restrictFocus_() {
				if (!this.restrictFocusHandle_) {
					this.restrictFocusHandle_ = _dom2.default.on(document, 'focus', this.handleDocumentFocus_.bind(this), true);
				}
			}
		}, {
			key: 'shiftFocusBack_',
			value: function shiftFocusBack_() {
				if (this.lastFocusedElement_) {
					this.lastFocusedElement_.focus();
					this.lastFocusedElement_ = null;
				}
			}
		}, {
			key: 'show',
			value: function show() {
				this.visible = true;
			}
		}, {
			key: 'syncHideOnEscape',
			value: function syncHideOnEscape(hideOnEscape) {
				if (hideOnEscape) {
					this.eventHandler_.add(_dom2.default.on(document, 'keyup', this.handleKeyup_.bind(this)));
				} else {
					this.eventHandler_.removeAllListeners();
				}
			}
		}, {
			key: 'syncOverlay',
			value: function syncOverlay(overlay) {
				var willShowOverlay = overlay && this.visible;
				_dom2.default[willShowOverlay ? 'enterDocument' : 'exitDocument'](this.overlayElement);
			}
		}, {
			key: 'syncVisible',
			value: function syncVisible() {
				this.syncOverlay(this.overlay);
				if (this.visible) {
					this.lastFocusedElement_ = this.lastFocusedElement_ || document.activeElement;
					this.autoFocus_(this.autoFocus);
					this.restrictFocus_();
				} else {
					this.unrestrictFocus_();
					this.shiftFocusBack_();
				}
			}
		}, {
			key: 'unrestrictFocus_',
			value: function unrestrictFocus_() {
				if (this.restrictFocusHandle_) {
					this.restrictFocusHandle_.removeListener();
					this.restrictFocusHandle_ = null;
				}
			}
		}, {
			key: 'valueOverlayElementFn_',
			value: function valueOverlayElementFn_() {
				return _dom2.default.buildFragment('<div class="modal-backdrop fade in"></div>').firstChild;
			}
		}]);

		return Modal;
	}(_component2.default);

	Modal.STATE = {
		/**
   * A selector for the element that should be automatically focused when the modal
   * becomes visible, or `false` if no auto focus should happen. Defaults to the
   * modal's close button.
   * @type {boolean|string}
   */
		autoFocus: {
			validator: function validator(val) {
				return val === false || _metal2.default.isString(val);
			},
			value: '.close'
		},

		/**
   * Content to be placed inside modal body. Can be either an html string or
   * a function that calls incremental dom for rendeirng the body.
   * @type {string|function()}
   */
		body: {},

		/**
   * The id used by the body element.
   * @type {string}
   */
		bodyId: {
			valueFn: function valueFn() {
				return 'modal-body-' + _metal2.default.getUid();
			}
		},

		/**
   * Content to be placed inside modal footer. Can be either an html string or
   * a function that calls incremental dom for rendeirng the footer.
   * @type {string|function()}
   */
		footer: {},

		/**
   * The id used by the header element.
   * @type {string}
   */
		headerId: {
			valueFn: function valueFn() {
				return 'modal-header-' + _metal2.default.getUid();
			}
		},

		/**
   * Content to be placed inside modal header. Can be either an html string or
   * a function that calls incremental dom for rendeirng the header.
   * @type {string|function()}
   */
		header: {},

		/**
   * Whether modal should hide on esc.
   * @type {boolean}
   * @default true
   */
		hideOnEscape: {
			validator: _metal2.default.isBoolean,
			value: true
		},

		/**
   * Flag indicating if the default "x" button for closing the modal should be
   * added or not.
   * @type {boolean}
   * @default false
   */
		noCloseButton: {
			value: false
		},

		/**
   * Whether overlay should be visible when modal is visible.
   * @type {boolean}
   * @default true
   */
		overlay: {
			validator: _metal2.default.isBoolean,
			value: true
		},

		/**
   * Element to be used as overlay.
   * @type {Element}
   */
		overlayElement: {
			initOnly: true,
			valueFn: 'valueOverlayElementFn_'
		},

		/**
   * The ARIA role to be used for this modal.
   * @type {string}
   * @default 'dialog'
   */
		role: {
			validator: _metal2.default.isString,
			value: 'dialog'
		}
	};

	_Soy2.default.register(Modal, _ModalSoy2.default);

	exports.default = Modal;
});
//# sourceMappingURL=Modal.js.map