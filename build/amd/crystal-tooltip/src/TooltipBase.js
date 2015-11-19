'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/core', 'metal/src/dom/dom', 'metal-position/src/Align', 'metal/src/component/Component', 'metal/src/events/EventHandler', 'metal/src/soy/SoyRenderer', 'metal/src/dom/events'], function (exports, _core, _dom, _Align, _Component2, _EventHandler, _SoyRenderer) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _dom2 = _interopRequireDefault(_dom);

	var _Align2 = _interopRequireDefault(_Align);

	var _Component3 = _interopRequireDefault(_Component2);

	var _EventHandler2 = _interopRequireDefault(_EventHandler);

	var _SoyRenderer2 = _interopRequireDefault(_SoyRenderer);

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

	var TooltipBase = (function (_Component) {
		_inherits(TooltipBase, _Component);

		function TooltipBase(opt_config) {
			_classCallCheck(this, TooltipBase);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TooltipBase).call(this, opt_config));

			_this.eventHandler_ = new _EventHandler2.default();
			return _this;
		}

		_createClass(TooltipBase, [{
			key: 'attached',
			value: function attached() {
				this.align();
				this.syncTriggerEvents(this.triggerEvents);
			}
		}, {
			key: 'detached',
			value: function detached() {
				this.eventHandler_.removeAllListeners();
			}
		}, {
			key: 'align',
			value: function align(opt_alignElement) {
				this.syncAlignElement(opt_alignElement || this.alignElement);
			}
		}, {
			key: 'callAsync_',
			value: function callAsync_(fn, delay) {
				clearTimeout(this.delay_);
				this.delay_ = setTimeout(fn.bind(this), delay);
			}
		}, {
			key: 'handleHide',
			value: function handleHide(event) {
				var delegateTarget = event.delegateTarget;
				var interactingWithDifferentTarget = delegateTarget && delegateTarget !== this.alignElement;
				this.callAsync_(function () {
					if (this.locked_) {
						return;
					}

					if (interactingWithDifferentTarget) {
						this.alignElement = delegateTarget;
					} else {
						this.visible = false;
						this.syncVisible(false);
					}
				}, this.delay[1]);
			}
		}, {
			key: 'handleShow',
			value: function handleShow(event) {
				var delegateTarget = event.delegateTarget;

				_get(Object.getPrototypeOf(TooltipBase.prototype), 'syncVisible', this).call(this, true);

				this.callAsync_(function () {
					this.alignElement = delegateTarget;
					this.visible = true;
				}, this.delay[0]);
			}
		}, {
			key: 'handleToggle',
			value: function handleToggle(event) {
				if (this.visible) {
					this.handleHide(event);
				} else {
					this.handleShow(event);
				}
			}
		}, {
			key: 'lock',
			value: function lock() {
				this.locked_ = true;
			}
		}, {
			key: 'unlock',
			value: function unlock(event) {
				this.locked_ = false;
				this.handleHide(event);
			}
		}, {
			key: 'syncAlignElement',
			value: function syncAlignElement(alignElement, prevAlignElement) {
				if (prevAlignElement) {
					alignElement.removeAttribute('aria-describedby');
				}

				if (alignElement) {
					if (this.visible) {
						alignElement.setAttribute('aria-describedby', this.id);
					} else {
						alignElement.removeAttribute('aria-describedby');
					}

					if (this.inDocument) {
						var finalPosition = TooltipBase.Align.align(this.element, alignElement, this.position);
						this.updatePositionCSS(finalPosition);
					}
				}
			}
		}, {
			key: 'syncPosition',
			value: function syncPosition() {
				this.syncAlignElement(this.alignElement);
			}
		}, {
			key: 'syncSelector',
			value: function syncSelector() {
				this.syncTriggerEvents(this.triggerEvents);
			}
		}, {
			key: 'syncTriggerEvents',
			value: function syncTriggerEvents(triggerEvents) {
				if (!this.inDocument) {
					return;
				}

				this.eventHandler_.removeAllListeners();
				var selector = this.selector;

				if (!selector) {
					return;
				}

				this.eventHandler_.add(this.on('mouseenter', this.lock), this.on('mouseleave', this.unlock));

				if (triggerEvents[0] === triggerEvents[1]) {
					this.eventHandler_.add(_dom2.default.delegate(document, triggerEvents[0], selector, this.handleToggle.bind(this)));
				} else {
					this.eventHandler_.add(_dom2.default.delegate(document, triggerEvents[0], selector, this.handleShow.bind(this)), _dom2.default.delegate(document, triggerEvents[1], selector, this.handleHide.bind(this)));
				}
			}
		}, {
			key: 'syncVisible',
			value: function syncVisible() {
				this.align();
			}
		}, {
			key: 'updatePositionCSS',
			value: function updatePositionCSS(position) {
				_dom2.default.removeClasses(this.element, TooltipBase.PositionClasses.join(' '));

				_dom2.default.addClasses(this.element, TooltipBase.PositionClasses[position]);
			}
		}]);

		return TooltipBase;
	})(_Component3.default);

	TooltipBase.Align = _Align2.default;
	TooltipBase.ATTRS = {
		alignElement: {
			setter: _dom2.default.toElement
		},
		delay: {
			validator: Array.isArray,
			value: [500, 250]
		},
		triggerEvents: {
			validator: Array.isArray,
			value: ['mouseenter', 'mouseleave']
		},
		selector: {
			validator: _core2.default.isString
		},
		content: {},
		position: {
			validator: TooltipBase.Align.isValidPosition,
			value: TooltipBase.Align.Bottom
		}
	};
	TooltipBase.PositionClasses = ['top', 'right', 'bottom', 'left'];
	TooltipBase.RENDERER = _SoyRenderer2.default;
	exports.default = TooltipBase;
});
//# sourceMappingURL=TooltipBase.js.map