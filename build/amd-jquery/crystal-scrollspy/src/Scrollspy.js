'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/core', 'metal/src/dom/dom', 'metal/src/attribute/Attribute', 'metal-position/src/Position', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _core, _dom, _Attribute2, _Position, _JQueryAdapter) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _dom2 = _interopRequireDefault(_dom);

	var _Attribute3 = _interopRequireDefault(_Attribute2);

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

	var Scrollspy = (function (_Attribute) {
		_inherits(Scrollspy, _Attribute);

		function Scrollspy(opt_config) {
			_classCallCheck(this, Scrollspy);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scrollspy).call(this, opt_config));

			_this.activeIndex = -1;
			_this.regions = [];
			_this.scrollHandle_ = _dom2.default.on(_this.scrollElement, 'scroll', _this.checkPosition.bind(_this));

			_this.refresh();

			_this.on('elementChanged', _this.refresh);

			_this.on('offsetChanged', _this.checkPosition);

			_this.on('scrollElementChanged', _this.onScrollElementChanged_);

			_this.on('selectorChanged', _this.refresh);

			return _this;
		}

		_createClass(Scrollspy, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.deactivateAll();
				this.scrollHandle_.dispose();

				_get(Object.getPrototypeOf(Scrollspy.prototype), 'disposeInternal', this).call(this);
			}
		}, {
			key: 'activate',
			value: function activate(index) {
				if (this.activeIndex >= 0) {
					this.deactivate(this.activeIndex);
				}

				this.activeIndex = index;

				_dom2.default.addClasses(this.resolveElement(this.regions[index].link), this.activeClass);
			}
		}, {
			key: 'checkPosition',
			value: function checkPosition() {
				var scrollHeight = this.getScrollHeight_();

				var scrollTop = _Position2.default.getScrollTop(this.scrollElement);

				if (scrollHeight < scrollTop + this.offset) {
					this.activate(this.regions.length - 1);
					return;
				}

				var index = this.findBestRegionAt_(scrollTop);

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
				_dom2.default.removeClasses(this.resolveElement(this.regions[index].link), this.activeClass);
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
			value: function findBestRegionAt_(scrollTop) {
				var index = -1;
				var origin = scrollTop + this.offset + this.scrollElementRegion_.top;

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
			key: 'getScrollHeight_',
			value: function getScrollHeight_() {
				var scrollHeight = _Position2.default.getHeight(this.scrollElement);

				scrollHeight += this.scrollElementRegion_.top;
				scrollHeight -= _Position2.default.getClientHeight(this.scrollElement);
				return scrollHeight;
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
				this.deactivateAll();
				this.scrollElementRegion_ = _Position2.default.getRegion(this.scrollElement);
				this.scrollHeight_ = this.getScrollHeight_();
				this.regions = [];
				var links = this.element.querySelectorAll(this.selector);

				var scrollTop = _Position2.default.getScrollTop(this.scrollElement);

				for (var i = 0; i < links.length; ++i) {
					var link = links[i];

					if (link.hash && link.hash.length > 1) {
						var element = document.getElementById(link.hash.substring(1));

						if (element) {
							var region = _Position2.default.getRegion(element);

							this.regions.push({
								link: link,
								top: region.top + scrollTop,
								bottom: region.bottom + scrollTop
							});
						}
					}
				}

				this.sortRegions_();
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
	})(_Attribute3.default);

	Scrollspy.ATTRS = {
		activeClass: {
			validator: _core2.default.isString,
			value: 'active'
		},
		resolveElement: {
			validator: _core2.default.isFunction,
			value: _core2.default.identityFunction
		},
		scrollElement: {
			setter: _dom2.default.toElement,
			value: document
		},
		offset: {
			validator: _core2.default.isNumber,
			value: 0
		},
		element: {
			setter: _dom2.default.toElement
		},
		selector: {
			validator: _core2.default.isString,
			value: 'a'
		}
	};
	exports.default = Scrollspy;

	_JQueryAdapter2.default.register('scrollspy', Scrollspy);
});
//# sourceMappingURL=Scrollspy.js.map