define(['exports', 'metal/src/core', 'metal/metal/src/dom/dom', 'metal/metal/src/attribute/Attribute', 'metal/metal/src/events/EventEmitter', 'metal/metal/src/events/EventEmitterProxy', 'metal-position/src/Position', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _core, _dom, _Attribute2, _EventEmitter, _EventEmitterProxy, _Position, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _dom2 = _interopRequireDefault(_dom);

	var _Attribute3 = _interopRequireDefault(_Attribute2);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _EventEmitterProxy2 = _interopRequireDefault(_EventEmitterProxy);

	var _Position2 = _interopRequireDefault(_Position);

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

	var Affix = function (_Attribute) {
		_inherits(Affix, _Attribute);

		/**
   * @inheritDoc
   */

		function Affix(opt_config) {
			_classCallCheck(this, Affix);

			var _this = _possibleConstructorReturn(this, _Attribute.call(this, opt_config));

			if (!Affix.emitter_) {
				Affix.emitter_ = new _EventEmitter2.default();
				Affix.proxy_ = new _EventEmitterProxy2.default(document, Affix.emitter_, null, {
					scroll: true
				});
			}

			/**
    * Holds the last position.
    * @type {Position.Bottom|Position.Default|Position.Top}
    * @private
    */
			_this.lastPosition_ = null;

			/**
    * Holds event handle that listens scroll shared event emitter proxy.
    * @type {EventHandle}
    * @protected
    */
			_this.scrollHandle_ = Affix.emitter_.on('scroll', _this.checkPosition.bind(_this));

			_this.on('elementChanged', _this.checkPosition);
			_this.on('offsetTopChanged', _this.checkPosition);
			_this.on('offsetBottomChanged', _this.checkPosition);
			_this.checkPosition();
			return _this;
		}

		/**
   * @inheritDoc
   */


		Affix.prototype.disposeInternal = function disposeInternal() {
			_dom2.default.removeClasses(this.element, Affix.Position.Bottom + ' ' + Affix.Position.Default + ' ' + Affix.Position.Top);
			this.scrollHandle_.dispose();
			_Attribute.prototype.disposeInternal.call(this);
		};

		Affix.prototype.checkPosition = function checkPosition() {
			if (this.intersectTopRegion()) {
				this.syncPosition(Affix.Position.Top);
			} else if (this.intersectBottomRegion()) {
				this.syncPosition(Affix.Position.Bottom);
			} else {
				this.syncPosition(Affix.Position.Default);
			}
		};

		Affix.prototype.intersectBottomRegion = function intersectBottomRegion() {
			if (!_core2.default.isDef(this.offsetBottom)) {
				return false;
			}
			var clientHeight = _Position2.default.getHeight(this.scrollElement);
			var scrollElementClientHeight = _Position2.default.getClientHeight(this.scrollElement);
			return _Position2.default.getScrollTop(this.scrollElement) + scrollElementClientHeight >= clientHeight - this.offsetBottom;
		};

		Affix.prototype.intersectTopRegion = function intersectTopRegion() {
			if (!_core2.default.isDef(this.offsetTop)) {
				return false;
			}
			return _Position2.default.getScrollTop(this.scrollElement) <= this.offsetTop;
		};

		Affix.prototype.syncPosition = function syncPosition(position) {
			if (this.lastPosition_ !== position) {
				_dom2.default.addClasses(this.element, position);
				_dom2.default.removeClasses(this.element, this.lastPosition_);
				this.lastPosition_ = position;
			}
		};

		return Affix;
	}(_Attribute3.default);

	Affix.prototype.registerMetalComponent && Affix.prototype.registerMetalComponent(Affix, 'Affix')


	/**
  * Holds positions enum.
  * @enum {string}
  */
	Affix.Position = {
		Top: 'affix-top',
		Bottom: 'affix-bottom',
		Default: 'affix'
	};

	Affix.ATTRS = {
		/**
   * The scrollElement element to be used as scrollElement area for affix. The scrollElement is
   * where the scroll event is listened from.
   * @type {Element|Window}
   */
		scrollElement: {
			setter: _dom2.default.toElement,
			value: document
		},

		/**
   * Defines the offset bottom that triggers affix.
   * @type {number}
   */
		offsetTop: {
			validator: _core2.default.isNumber
		},

		/**
   * Defines the offset top that triggers affix.
   * @type {number}
   */
		offsetBottom: {
			validator: _core2.default.isNumber
		},

		/**
   * Element to be used as alignment reference of affix.
   * @type {Element}
   */
		element: {
			setter: _dom2.default.toElement
		}
	};

	exports.default = Affix;
	_JQueryAdapter2.default.register('affix', Affix);
});
//# sourceMappingURL=Affix.js.map