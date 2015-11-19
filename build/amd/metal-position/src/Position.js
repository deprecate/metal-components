'use strict';

define(['exports', 'metal/src/core', 'metal-position/src/Geometry'], function (exports, _core, _Geometry) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _Geometry2 = _interopRequireDefault(_Geometry);

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

	var Position = (function () {
		function Position() {
			_classCallCheck(this, Position);
		}

		_createClass(Position, null, [{
			key: 'getClientHeight',
			value: function getClientHeight(node) {
				return this.getClientSize_(node, 'Height');
			}
		}, {
			key: 'getClientSize_',
			value: function getClientSize_(node, prop) {
				var el = node;

				if (_core2.default.isWindow(node)) {
					el = node.document.documentElement;
				}

				if (_core2.default.isDocument(node)) {
					el = node.documentElement;
				}

				return el['client' + prop];
			}
		}, {
			key: 'getClientWidth',
			value: function getClientWidth(node) {
				return this.getClientSize_(node, 'Width');
			}
		}, {
			key: 'getDocumentRegion_',
			value: function getDocumentRegion_(opt_element) {
				var height = this.getHeight(opt_element);
				var width = this.getWidth(opt_element);
				return this.makeRegion(height, height, 0, width, 0, width);
			}
		}, {
			key: 'getHeight',
			value: function getHeight(node) {
				return this.getSize_(node, 'Height');
			}
		}, {
			key: 'getOffsetLeft',
			value: function getOffsetLeft(node, opt_ignoreTransform) {
				return node.offsetLeft + (opt_ignoreTransform ? 0 : Position.getTranslation(node).left);
			}
		}, {
			key: 'getOffsetTop',
			value: function getOffsetTop(node, opt_ignoreTransform) {
				return node.offsetTop + (opt_ignoreTransform ? 0 : Position.getTranslation(node).top);
			}
		}, {
			key: 'getRegion',
			value: function getRegion(node, opt_includeScroll) {
				if (_core2.default.isDocument(node) || _core2.default.isWindow(node)) {
					return this.getDocumentRegion_(node);
				}

				return this.makeRegionFromBoundingRect_(node.getBoundingClientRect(), opt_includeScroll);
			}
		}, {
			key: 'getScrollLeft',
			value: function getScrollLeft(node) {
				if (_core2.default.isWindow(node)) {
					return node.pageXOffset;
				}

				if (_core2.default.isDocument(node)) {
					return node.defaultView.pageXOffset;
				}

				return node.scrollLeft;
			}
		}, {
			key: 'getScrollTop',
			value: function getScrollTop(node) {
				if (_core2.default.isWindow(node)) {
					return node.pageYOffset;
				}

				if (_core2.default.isDocument(node)) {
					return node.defaultView.pageYOffset;
				}

				return node.scrollTop;
			}
		}, {
			key: 'getSize_',
			value: function getSize_(node, prop) {
				if (_core2.default.isWindow(node)) {
					return this.getClientSize_(node, prop);
				}

				if (_core2.default.isDocument(node)) {
					var docEl = node.documentElement;
					return Math.max(node.body['scroll' + prop], docEl['scroll' + prop], node.body['offset' + prop], docEl['offset' + prop], docEl['client' + prop]);
				}

				return Math.max(node['client' + prop], node['scroll' + prop], node['offset' + prop]);
			}
		}, {
			key: 'getTransformMatrixValues',
			value: function getTransformMatrixValues(node) {
				var style = getComputedStyle(node);
				var transform = style.msTransform || style.transform || style.webkitTransform || style.mozTransform;

				if (transform !== 'none') {
					var values = [];
					var regex = /([\d-\.\s]+)/g;
					var matches = regex.exec(transform);

					while (matches) {
						values.push(matches[1]);
						matches = regex.exec(transform);
					}

					return values;
				}
			}
		}, {
			key: 'getTranslation',
			value: function getTranslation(node) {
				var values = Position.getTransformMatrixValues(node);
				var translation = {
					left: 0,
					top: 0
				};

				if (values) {
					translation.left = parseFloat(values.length === 6 ? values[4] : values[13]);
					translation.top = parseFloat(values.length === 6 ? values[5] : values[14]);
				}

				return translation;
			}
		}, {
			key: 'getWidth',
			value: function getWidth(node) {
				return this.getSize_(node, 'Width');
			}
		}, {
			key: 'intersectRegion',
			value: function intersectRegion(r1, r2) {
				return _Geometry2.default.intersectRect(r1.top, r1.left, r1.bottom, r1.right, r2.top, r2.left, r2.bottom, r2.right);
			}
		}, {
			key: 'insideRegion',
			value: function insideRegion(r1, r2) {
				return r2.top >= r1.top && r2.bottom <= r1.bottom && r2.right <= r1.right && r2.left >= r1.left;
			}
		}, {
			key: 'insideViewport',
			value: function insideViewport(region) {
				return this.insideRegion(this.getRegion(window), region);
			}
		}, {
			key: 'intersection',
			value: function intersection(r1, r2) {
				if (!this.intersectRegion(r1, r2)) {
					return null;
				}

				var bottom = Math.min(r1.bottom, r2.bottom);
				var right = Math.min(r1.right, r2.right);
				var left = Math.max(r1.left, r2.left);
				var top = Math.max(r1.top, r2.top);
				return this.makeRegion(bottom, bottom - top, left, right, top, right - left);
			}
		}, {
			key: 'makeRegion',
			value: function makeRegion(bottom, height, left, right, top, width) {
				return {
					bottom: bottom,
					height: height,
					left: left,
					right: right,
					top: top,
					width: width
				};
			}
		}, {
			key: 'makeRegionFromBoundingRect_',
			value: function makeRegionFromBoundingRect_(rect, opt_includeScroll) {
				var deltaX = opt_includeScroll ? Position.getScrollLeft(document) : 0;
				var deltaY = opt_includeScroll ? Position.getScrollTop(document) : 0;
				return this.makeRegion(rect.bottom + deltaY, rect.height, rect.left + deltaX, rect.right + deltaX, rect.top + deltaY, rect.width);
			}
		}, {
			key: 'pointInsideRegion',
			value: function pointInsideRegion(x, y, region) {
				return Position.insideRegion(region, Position.makeRegion(y, 0, x, x, y, 0));
			}
		}]);

		return Position;
	})();

	exports.default = Position;
});
//# sourceMappingURL=Position.js.map