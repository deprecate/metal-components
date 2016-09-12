define(['exports', 'metal/src/metal', 'metal-events/src/events'], function (exports, _metal, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _events2 = _interopRequireDefault(_events);

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

	var KeyboardFocusManager = function (_EventEmitter) {
		_inherits(KeyboardFocusManager, _EventEmitter);

		/**
   * Constructor for `KeyboardFocusManager`.
   * @param {!Component} component
   * @param {string=} opt_selector
   */
		function KeyboardFocusManager(component, opt_selector) {
			_classCallCheck(this, KeyboardFocusManager);

			var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

			_this.component_ = component;
			_this.selector_ = opt_selector || '*';
			_this.handleKey_ = _this.handleKey_.bind(_this);
			return _this;
		}

		/**
   * Builds a ref string for the given position.
   * @param {string} prefix
   * @param {number|string} position
   * @return {string}
   * @protected
   */


		KeyboardFocusManager.prototype.buildRef_ = function buildRef_(prefix, position) {
			return prefix + position;
		};

		KeyboardFocusManager.prototype.disposeInternal = function disposeInternal() {
			_EventEmitter.prototype.disposeInternal.call(this);
			this.stop();
			this.component_ = null;
			this.selector_ = null;
		};

		KeyboardFocusManager.prototype.getNextFocusable_ = function getNextFocusable_(prefix, position, increment) {
			var initialPosition = position;
			var element = void 0;
			var ref = void 0;
			do {
				position = this.increment_(position, increment);
				ref = this.buildRef_(prefix, position);
				element = this.component_.refs[ref];
			} while (this.isFocusable_(element) && position !== initialPosition);
			return element ? ref : null;
		};

		KeyboardFocusManager.prototype.handleKey_ = function handleKey_(event) {
			var element = this.focusHandler_ && this.focusHandler_(event);
			if (!this.focusHandler_ || element === true) {
				element = this.handleKeyDefault_(event);
			}

			var originalValue = element;
			if (!_metal2.default.isElement(element)) {
				element = this.component_.refs[element];
			}
			if (element) {
				element.focus();
				this.emit(KeyboardFocusManager.EVENT_FOCUSED, {
					element: element,
					ref: _metal2.default.isString(originalValue) ? originalValue : null
				});
			}
		};

		KeyboardFocusManager.prototype.handleKeyDefault_ = function handleKeyDefault_(event) {
			var ref = event.delegateTarget.getAttribute('ref');
			var matches = KeyboardFocusManager.REF_REGEX.exec(ref);
			if (!matches) {
				return;
			}

			var position = parseInt(matches[1], 10);
			var prefix = ref.substr(0, ref.length - matches[1].length);
			switch (event.keyCode) {
				case 37:
				case 38:
					// Left/up arrow keys will focus the previous element.
					return this.getNextFocusable_(prefix, position, -1);
				case 39:
				case 40:
					// Right/down arrow keys will focus the next element.
					return this.getNextFocusable_(prefix, position, 1);
			}
		};

		KeyboardFocusManager.prototype.increment_ = function increment_(position, increment) {
			var size = this.circularLength_;
			position += increment;
			if (_metal2.default.isNumber(size)) {
				if (position < 0) {
					position = size - 1;
				} else if (position >= size) {
					position = 0;
				}
			}
			return position;
		};

		KeyboardFocusManager.prototype.isFocusable_ = function isFocusable_(element) {
			return element && element.getAttribute('data-unfocusable') === 'true';
		};

		KeyboardFocusManager.prototype.setCircularLength = function setCircularLength(circularLength) {
			this.circularLength_ = circularLength;
			return this;
		};

		KeyboardFocusManager.prototype.setFocusHandler = function setFocusHandler(focusHandler) {
			this.focusHandler_ = focusHandler;
			return this;
		};

		KeyboardFocusManager.prototype.start = function start() {
			if (!this.handle_) {
				this.handle_ = this.component_.delegate('keydown', this.selector_, this.handleKey_);
			}
			return this;
		};

		KeyboardFocusManager.prototype.stop = function stop() {
			if (this.handle_) {
				this.handle_.removeListener();
				this.handle_ = null;
			}
			return this;
		};

		return KeyboardFocusManager;
	}(_events2.default);

	// Event emitted when a selected element was focused via the keyboard.
	KeyboardFocusManager.EVENT_FOCUSED = 'focused';

	// The regex used to extract the position from an element's ref.
	KeyboardFocusManager.REF_REGEX = /.+-(\d+)$/;

	exports.default = KeyboardFocusManager;
});
//# sourceMappingURL=KeyboardFocusManager.js.map