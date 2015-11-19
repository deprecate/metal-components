'use strict';

define(['exports', 'metal-position/src/Position'], function (exports, _Position) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var Align = (function () {
		function Align() {
			_classCallCheck(this, Align);
		}

		_createClass(Align, null, [{
			key: 'align',
			value: function align(element, alignElement, position) {
				var suggestion = this.suggestAlignBestRegion(element, alignElement, position);
				var bestRegion = suggestion.region;
				var computedStyle = window.getComputedStyle(element, null);

				if (computedStyle.getPropertyValue('position') !== 'fixed') {
					bestRegion.top += window.pageYOffset;
					bestRegion.left += window.pageXOffset;
					var offsetParent = element;

					while (offsetParent = offsetParent.offsetParent) {
						bestRegion.top -= _Position2.default.getOffsetTop(offsetParent);
						bestRegion.left -= _Position2.default.getOffsetLeft(offsetParent);
					}
				}

				element.style.top = bestRegion.top + 'px';
				element.style.left = bestRegion.left + 'px';
				return suggestion.position;
			}
		}, {
			key: 'getAlignBestRegion',
			value: function getAlignBestRegion(element, alignElement, position) {
				return Align.suggestAlignBestRegion(element, alignElement, position).region;
			}
		}, {
			key: 'getAlignRegion',
			value: function getAlignRegion(element, alignElement, position) {
				var r1 = _Position2.default.getRegion(alignElement);

				var r2 = _Position2.default.getRegion(element);

				var top = 0;
				var left = 0;

				switch (position) {
					case Align.Top:
						top = r1.top - r2.height;
						left = r1.left + r1.width / 2 - r2.width / 2;
						break;

					case Align.Right:
						top = r1.top + r1.height / 2 - r2.height / 2;
						left = r1.left + r1.width;
						break;

					case Align.Bottom:
						top = r1.bottom;
						left = r1.left + r1.width / 2 - r2.width / 2;
						break;

					case Align.Left:
						top = r1.top + r1.height / 2 - r2.height / 2;
						left = r1.left - r2.width;
						break;
				}

				return {
					bottom: top + r2.height,
					height: r2.height,
					left: left,
					right: left + r2.width,
					top: top,
					width: r2.width
				};
			}
		}, {
			key: 'isValidPosition',
			value: function isValidPosition(val) {
				return 0 <= val && val <= 3;
			}
		}, {
			key: 'suggestAlignBestRegion',
			value: function suggestAlignBestRegion(element, alignElement, position) {
				var bestArea = 0;
				var bestPosition = position;
				var bestRegion = this.getAlignRegion(element, alignElement, bestPosition);
				var tryPosition = bestPosition;
				var tryRegion = bestRegion;

				var viewportRegion = _Position2.default.getRegion(window);

				for (var i = 0; i < 4;) {
					if (_Position2.default.intersectRegion(viewportRegion, tryRegion)) {
						var visibleRegion = _Position2.default.intersection(viewportRegion, tryRegion);

						var area = visibleRegion.width * visibleRegion.height;

						if (area > bestArea) {
							bestArea = area;
							bestRegion = tryRegion;
							bestPosition = tryPosition;
						}

						if (_Position2.default.insideViewport(tryRegion)) {
							break;
						}
					}

					tryPosition = (position + ++i) % 4;
					tryRegion = this.getAlignRegion(element, alignElement, tryPosition);
				}

				return {
					position: bestPosition,
					region: bestRegion
				};
			}
		}]);

		return Align;
	})();

	Align.Top = 0;
	Align.Right = 1;
	Align.Bottom = 2;
	Align.Left = 3;
	exports.default = Align;
});
//# sourceMappingURL=Align.js.map