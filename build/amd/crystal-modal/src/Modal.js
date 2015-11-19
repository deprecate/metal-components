'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/core', 'metal/src/dom/dom', 'metal/src/events/EventHandler', 'crystal-modal/src/Modal.soy'], function (exports, _core, _dom, _EventHandler, _Modal) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _dom2 = _interopRequireDefault(_dom);

	var _EventHandler2 = _interopRequireDefault(_EventHandler);

	var _Modal2 = _interopRequireDefault(_Modal);

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

	var Modal = (function (_ModalBase) {
		_inherits(Modal, _ModalBase);

		function Modal(opt_config) {
			_classCallCheck(this, Modal);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this, opt_config));

			_this.eventHandler_ = new _EventHandler2.default();
			return _this;
		}

		_createClass(Modal, [{
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
				_get(Object.getPrototypeOf(Modal.prototype), 'detached', this).call(this);

				this.eventHandler_.removeAllListeners();
			}
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				_dom2.default.exitDocument(this.overlayElement);

				this.unrestrictFocus_();

				_get(Object.getPrototypeOf(Modal.prototype), 'disposeInternal', this).call(this);
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
				this.restrictFocusHandle_ = _dom2.default.on(document, 'focus', this.handleDocumentFocus_.bind(this), true);
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
			value: function syncVisible(visible) {
				this.element.style.display = visible ? 'block' : '';
				this.syncOverlay(this.overlay);

				if (this.visible) {
					this.lastFocusedElement_ = document.activeElement;
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
				}
			}
		}, {
			key: 'valueOverlayElementFn_',
			value: function valueOverlayElementFn_() {
				return _dom2.default.buildFragment('<div class="modal-backdrop fade in"></div>').firstChild;
			}
		}]);

		return Modal;
	})(_Modal2.default);

	Modal.ELEMENT_CLASSES = 'modal';
	Modal.ATTRS = {
		autoFocus: {
			validator: function validator(val) {
				return val === false || _core2.default.isString(val);
			},
			value: '.close'
		},
		body: {},
		footer: {},
		header: {},
		hideOnEscape: {
			validator: _core2.default.isBoolean,
			value: true
		},
		overlay: {
			validator: _core2.default.isBoolean,
			value: true
		},
		overlayElement: {
			initOnly: true,
			valueFn: 'valueOverlayElementFn_'
		},
		role: {
			validator: _core2.default.isString,
			value: 'dialog'
		}
	};

	_Modal2.default.setImpl(Modal);

	exports.default = Modal;
});
//# sourceMappingURL=Modal.js.map