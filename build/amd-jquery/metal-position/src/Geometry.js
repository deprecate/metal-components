'use strict';

define(['exports'], function (exports) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var Geometry = (function () {
		function Geometry() {
			_classCallCheck(this, Geometry);
		}

		_createClass(Geometry, null, [{
			key: 'intersectRect',
			value: function intersectRect(x0, y0, x1, y1, x2, y2, x3, y3) {
				return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
			}
		}]);

		return Geometry;
	})();

	exports.default = Geometry;
});
//# sourceMappingURL=Geometry.js.map