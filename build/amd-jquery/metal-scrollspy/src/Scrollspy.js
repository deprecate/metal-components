define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-position/src/all/position', 'metal-state/src/State', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _metal, _dom, _position, _State2, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _dom2 = _interopRequireDefault(_dom);

	var _position2 = _interopRequireDefault(_position);

	var _State3 = _interopRequireDefault(_State2);

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

	var Scrollspy = function (_State) {
		_inherits(Scrollspy, _State);

		/**
   * @inheritDoc
   */
		function Scrollspy(opt_config) {
			_classCallCheck(this, Scrollspy);

			var _this = _possibleConstructorReturn(this, (Scrollspy.__proto__ || Object.getPrototypeOf(Scrollspy)).call(this, opt_config));

			/**
    * Holds the regions cache.
    * @type {!Array}
    * @private
    * @default []
    */
			_this.regions = [];

			/**
    * Holds event handle that listens scroll shared event emitter proxy.
    * @type {!EventHandle}
    * @protected
    */
			_this.scrollHandle_ = _dom2.default.on(_this.scrollElement, 'scroll', _this.checkPosition.bind(_this));

			_this.init();
			return _this;
		}

		/**
   * @inheritDoc
   */


		_createClass(Scrollspy, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.deactivateAll();
				this.scrollHandle_.dispose();
				_get(Scrollspy.prototype.__proto__ || Object.getPrototypeOf(Scrollspy.prototype), 'disposeInternal', this).call(this);
			}
		}, {
			key: 'activate',
			value: function activate(index) {
				if (this.activeIndex >= 0) {
					this.deactivate(this.activeIndex);
				}
				this.activeIndex = index;
				_dom2.default.addClasses(this.getElementForIndex(index), this.activeClass);
			}
		}, {
			key: 'checkPosition',
			value: function checkPosition() {
				var scrollHeight = this.getScrollHeight_();
				var scrollTop = _position2.default.getScrollTop(this.scrollElement);

				if (scrollHeight < scrollTop + this.offset) {
					this.activate(this.regions.length - 1);
					return;
				}

				var index = this.findBestRegionAt_();
				if (index !== this.activeIndex) {
					if (index === -1) {
						this.deactivateAll();
					} else {
						this.activate(index);
					}
				}
			}
		}, {
			key: 'deactivate',
			value: function deactivate(index) {
				_dom2.default.removeClasses(this.getElementForIndex(index), this.activeClass);
			}
		}, {
			key: 'deactivateAll',
			value: function deactivateAll() {
				for (var i = 0; i < this.regions.length; i++) {
					this.deactivate(i);
				}
				this.activeIndex = -1;
			}
		}, {
			key: 'findBestRegionAt_',
			value: function findBestRegionAt_() {
				var index = -1;
				var origin = this.getCurrentPosition();
				if (this.regions.length > 0 && origin >= this.regions[0].top) {
					for (var i = 0; i < this.regions.length; i++) {
						var region = this.regions[i];
						var lastRegion = i === this.regions.length - 1;
						if (origin >= region.top && (lastRegion || origin < this.regions[i + 1].top)) {
							index = i;
							break;
						}
					}
				}
				return index;
			}
		}, {
			key: 'getCurrentPosition',
			value: function getCurrentPosition() {
				var scrollTop = _position2.default.getScrollTop(this.scrollElement);
				return scrollTop + this.offset + this.scrollElementRegion_.top;
			}
		}, {
			key: 'getElementForIndex',
			value: function getElementForIndex(index) {
				return this.resolveElement(this.regions[index].link);
			}
		}, {
			key: 'getScrollHeight_',
			value: function getScrollHeight_() {
				var scrollHeight = _position2.default.getHeight(this.scrollElement);
				scrollHeight += this.scrollElementRegion_.top;
				scrollHeight -= _position2.default.getClientHeight(this.scrollElement);
				return scrollHeight;
			}
		}, {
			key: 'init',
			value: function init() {
				this.refresh();
				this.on('elementChanged', this.refresh);
				this.on('offsetChanged', this.checkPosition);
				this.on('scrollElementChanged', this.onScrollElementChanged_);
				this.on('selectorChanged', this.refresh);
			}
		}, {
			key: 'onScrollElementChanged_',
			value: function onScrollElementChanged_(event) {
				this.refresh();

				this.scrollHandle_.dispose();
				this.scrollHandle_ = _dom2.default.on(event.newVal, 'scroll', this.checkPosition.bind(this));
			}
		}, {
			key: 'refresh',
			value: function refresh() {
				// Removes the "active" class from all current regions.
				this.deactivateAll();

				this.scrollElementRegion_ = _position2.default.getRegion(this.scrollElement);
				this.scrollHeight_ = this.getScrollHeight_();

				this.regions = [];
				var links = this.element.querySelectorAll(this.selector);
				var scrollTop = _position2.default.getScrollTop(this.scrollElement);
				for (var i = 0; i < links.length; ++i) {
					var link = links[i];
					if (link.hash && link.hash.length > 1) {
						var element = document.getElementById(link.hash.substring(1));
						if (element) {
							var region = _position2.default.getRegion(element);
							this.regions.push({
								link: link,
								top: region.top + scrollTop,
								bottom: region.bottom + scrollTop
							});
						}
					}
				}
				this.sortRegions_();

				// Removes the "active" class from all new regions and then activate the right one for
				// the current position.
				this.deactivateAll();
				this.checkPosition();
			}
		}, {
			key: 'sortRegions_',
			value: function sortRegions_() {
				this.regions.sort(function (a, b) {
					return a.top - b.top;
				});
			}
		}]);

		return Scrollspy;
	}(_State3.default);

	Scrollspy.STATE = {
		/**
   * Class to be used as active class.
   * @type {string}
   */
		activeClass: {
			validator: _metal2.default.isString,
			value: 'active'
		},

		/**
   * The index of the currently active link.
   * @type {number}
   */
		activeIndex: {
			validator: _metal2.default.isNumber,
			value: -1
		},

		/**
   * Function that receives the matching element as argument and return
   * itself. Relevant when the `activeClass` must be applied to a different
   * element, e.g. a parentNode.
   * @type {function}
   * @default core.identityFunction
   */
		resolveElement: {
			validator: _metal2.default.isFunction,
			value: _metal2.default.identityFunction
		},

		/**
   * The scrollElement element to be used as scrollElement area for scrollspy.
   * The scrollElement is where the scroll event is listened from.
   * @type {Element|Window}
   */
		scrollElement: {
			setter: _dom2.default.toElement,
			value: document
		},

		/**
   * Defines the offset that triggers scrollspy.
   * @type {number}
   * @default 0
   */
		offset: {
			validator: _metal2.default.isNumber,
			value: 0
		},

		/**
   * Element to be used as alignment reference of scrollspy.
   * @type {Element}
   */
		element: {
			setter: _dom2.default.toElement
		},

		/**
   * Selector to query elements inside `element` to be activated.
   * @type {Element}
   * @default 'a'
   */
		selector: {
			validator: _metal2.default.isString,
			value: 'a'
		}
	};

	exports.default = Scrollspy;
	_JQueryAdapter2.default.register('scrollspy', Scrollspy);
});
//# sourceMappingURL=Scrollspy.js.map