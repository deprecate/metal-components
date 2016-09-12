define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var comps_ = [];
	var disposing_ = false;

	var IncrementalDomUnusedComponents = function () {
		function IncrementalDomUnusedComponents() {
			_classCallCheck(this, IncrementalDomUnusedComponents);
		}

		_createClass(IncrementalDomUnusedComponents, null, [{
			key: 'disposeUnused',
			value: function disposeUnused() {
				if (disposing_) {
					return;
				}
				disposing_ = true;

				for (var i = 0; i < comps_.length; i++) {
					var comp = comps_[i];
					if (!comp.isDisposed() && !comp.getRenderer().getParent()) {
						// Don't let disposing cause the element to be removed, since it may
						// be currently being reused by another component.
						comp.element = null;
						comp.dispose();
					}
				}
				comps_ = [];
				disposing_ = false;
			}
		}, {
			key: 'schedule',
			value: function schedule(comps) {
				for (var i = 0; i < comps.length; i++) {
					if (!comps[i].isDisposed()) {
						comps[i].getRenderer().parent_ = null;
						comps_.push(comps[i]);
					}
				}
			}
		}]);

		return IncrementalDomUnusedComponents;
	}();

	exports.default = IncrementalDomUnusedComponents;
});
//# sourceMappingURL=IncrementalDomUnusedComponents.js.map