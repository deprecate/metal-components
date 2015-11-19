'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/dom/dom', 'metal/src/events/EventEmitter', 'metal/src/events/EventHandler', 'metal-position/src/Position'], function (exports, _dom, _EventEmitter2, _EventHandler, _Position) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

	var _EventHandler2 = _interopRequireDefault(_EventHandler);

	var _Position2 = _interopRequireDefault(_Position);

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

	var DragScrollDelta = (function (_EventEmitter) {
		_inherits(DragScrollDelta, _EventEmitter);

		function DragScrollDelta() {
			_classCallCheck(this, DragScrollDelta);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DragScrollDelta).call(this));

			_this.handler_ = new _EventHandler2.default();
			_this.scrollPositions_ = [];
			return _this;
		}

		_createClass(DragScrollDelta, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				_get(Object.getPrototypeOf(DragScrollDelta.prototype), 'disposeInternal', this).call(this);

				this.stop();
				this.handler_ = null;
			}
		}, {
			key: 'handleScroll_',
			value: function handleScroll_(index, event) {
				var newPosition = {
					scrollLeft: _Position2.default.getScrollLeft(event.currentTarget),
					scrollTop: _Position2.default.getScrollTop(event.currentTarget)
				};
				var position = this.scrollPositions_[index];
				this.scrollPositions_[index] = newPosition;
				this.emit('scrollDelta', {
					deltaX: newPosition.scrollLeft - position.scrollLeft,
					deltaY: newPosition.scrollTop - position.scrollTop
				});
			}
		}, {
			key: 'start',
			value: function start(dragNode, scrollContainers) {
				if (getComputedStyle(dragNode).position === 'fixed') {
					return;
				}

				for (var i = 0; i < scrollContainers.length; i++) {
					if (_dom2.default.contains(scrollContainers[i], dragNode)) {
						this.scrollPositions_.push({
							scrollLeft: _Position2.default.getScrollLeft(scrollContainers[i]),
							scrollTop: _Position2.default.getScrollTop(scrollContainers[i])
						});
						var index = this.scrollPositions_.length - 1;
						this.handler_.add(_dom2.default.on(scrollContainers[i], 'scroll', this.handleScroll_.bind(this, index)));
					}
				}
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.handler_.removeAllListeners();
				this.scrollPositions_ = [];
			}
		}]);

		return DragScrollDelta;
	})(_EventEmitter3.default);

	exports.default = DragScrollDelta;
});
//# sourceMappingURL=DragScrollDelta.js.map