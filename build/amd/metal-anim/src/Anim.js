define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom'], function (exports, _metal, _dom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

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

	var Anim = function () {
		function Anim() {
			_classCallCheck(this, Anim);
		}

		_createClass(Anim, null, [{
			key: 'emulateEnd',
			value: function emulateEnd(element, opt_durationMs) {
				if (this.getComputedDurationMs(element, 'animation') > this.getComputedDurationMs(element, 'transition')) {
					return this.emulateEnd_(element, 'animation', opt_durationMs);
				} else {
					return this.emulateEnd_(element, 'transition', opt_durationMs);
				}
			}
		}, {
			key: 'emulateAnimationEnd',
			value: function emulateAnimationEnd(element, opt_durationMs) {
				return this.emulateEnd_(element, 'animation', opt_durationMs);
			}
		}, {
			key: 'emulateTransitionEnd',
			value: function emulateTransitionEnd(element, opt_durationMs) {
				this.emulateEnd_(element, 'transition', opt_durationMs);
			}
		}, {
			key: 'emulateEnd_',
			value: function emulateEnd_(element, type, opt_durationMs) {
				var duration = opt_durationMs;
				if (!_metal2.default.isDef(opt_durationMs)) {
					duration = this.getComputedDurationMs(element, type);
				}

				var delayed = setTimeout(function () {
					_dom.dom.triggerEvent(element, _dom.features.checkAnimationEventName()[type]);
				}, duration);

				var abort = function abort() {
					clearTimeout(delayed);
					hoistedEvtHandler.removeListener();
				};
				var hoistedEvtHandler = _dom.dom.once(element, type + 'end', abort);

				return {
					abort: abort
				};
			}
		}, {
			key: 'getComputedDurationMs',
			value: function getComputedDurationMs(element, type) {
				return (parseFloat(window.getComputedStyle(element, null).getPropertyValue(type + '-duration')) || 0) * 1000;
			}
		}]);

		return Anim;
	}();

	exports.default = Anim;
});
//# sourceMappingURL=Anim.js.map