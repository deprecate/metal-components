'use strict';

define(['exports', 'metal/src/dom/dom'], function (exports, _dom) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	var globalEval = (function () {
		function globalEval() {
			_classCallCheck(this, globalEval);
		}

		_createClass(globalEval, null, [{
			key: 'run',
			value: function run(text) {
				var script = document.createElement('script');
				script.text = text;
				document.head.appendChild(script).parentNode.removeChild(script);
			}
		}, {
			key: 'runFile',
			value: function runFile(src) {
				var script = document.createElement('script');
				script.src = src;

				_dom2.default.on(script, 'load', function () {
					script.parentNode.removeChild(script);
				});

				_dom2.default.on(script, 'error', function () {
					script.parentNode.removeChild(script);
				});

				document.head.appendChild(script);
			}
		}, {
			key: 'runScript',
			value: function runScript(script) {
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}

				if (script.src) {
					globalEval.runFile(script.src);
				} else {
					globalEval.run(script.text);
				}
			}
		}]);

		return globalEval;
	})();

	exports.default = globalEval;
});
//# sourceMappingURL=globalEval.js.map