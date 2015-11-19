'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/core', 'metal-drag-drop/src/Drag', 'metal-position/src/Position', 'crystal-slider/src/Slider.soy', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _core, _Drag, _Position, _Slider, _JQueryAdapter) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _Drag2 = _interopRequireDefault(_Drag);

	var _Position2 = _interopRequireDefault(_Position);

	var _Slider2 = _interopRequireDefault(_Slider);

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

	var Slider = (function (_SliderBase) {
		_inherits(Slider, _SliderBase);

		function Slider(opt_config) {
			_classCallCheck(this, Slider);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, opt_config));

			_this.elements_ = new Map();
			return _this;
		}

		_createClass(Slider, [{
			key: 'attached',
			value: function attached() {
				this.drag_ = new _Drag2.default({
					constrain: this.getElement_('.rail'),
					handles: this.getElement_('.handle'),
					sources: this.getElement_('.rail-handle')
				});
				this.elementRegion_ = _Position2.default.getRegion(this.element);
				this.attachDragEvents_();
			}
		}, {
			key: 'attachDragEvents_',
			value: function attachDragEvents_() {
				this.drag_.on(_Drag2.default.Events.DRAG, this.updateValueFromDragData_.bind(this));
				this.drag_.on(_Drag2.default.Events.END, this.updateValueFromDragData_.bind(this));
			}
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				_get(Object.getPrototypeOf(Slider.prototype), 'disposeInternal', this).call(this);

				this.drag_.dispose();
				this.elements_ = null;
				this.elementRegion_ = null;
			}
		}, {
			key: 'getElement_',
			value: function getElement_(query) {
				var element = this.elements_.get(query);

				if (!element) {
					element = this.element.querySelector(query);
					this.elements_.set(query, element);
				}

				return element;
			}
		}, {
			key: 'onRailMouseDown_',
			value: function onRailMouseDown_(event) {
				if (event.target === this.getElement_('.rail') || event.target === this.getElement_('.rail-active')) {
					this.updateValue_(event.offsetX, 0);
				}
			}
		}, {
			key: 'syncMax',
			value: function syncMax(newVal) {
				if (newVal < this.value) {
					this.value = newVal;
				} else {
					this.updateHandlePosition_();
				}
			}
		}, {
			key: 'syncMin',
			value: function syncMin(newVal) {
				if (newVal > this.value) {
					this.value = newVal;
				} else {
					this.updateHandlePosition_();
				}
			}
		}, {
			key: 'syncValue',
			value: function syncValue() {
				this.updateHandlePosition_();
			}
		}, {
			key: 'updateHandlePosition_',
			value: function updateHandlePosition_() {
				var positionValue = 100 * (this.value - this.min) / (this.max - this.min) + '%';

				if (!(this.drag_ && this.drag_.isDragging())) {
					this.getElement_('.rail-handle').style.left = positionValue;
				}

				this.getElement_('.rail-active').style.width = positionValue;
			}
		}, {
			key: 'updateValue_',
			value: function updateValue_(handlePosition, offset) {
				this.value = Math.round(offset + handlePosition / this.elementRegion_.width * (this.max - this.min));
			}
		}, {
			key: 'updateValueFromDragData_',
			value: function updateValueFromDragData_(data) {
				this.updateValue_(data.relativeX, this.min);
			}
		}]);

		return Slider;
	})(_Slider2.default);

	Slider.ATTRS = {
		inputName: {
			validator: _core2.default.isString
		},
		max: {
			value: 100
		},
		min: {
			value: 0
		},
		value: {
			validator: function validator(val) {
				return _core2.default.isNumber(val) && this.min <= val && val <= this.max;
			},
			value: 80
		}
	};
	Slider.ELEMENT_CLASSES = 'slider';

	_Slider2.default.setImpl(Slider);

	exports.default = Slider;

	_JQueryAdapter2.default.register('slider', Slider);
});
//# sourceMappingURL=Slider.js.map