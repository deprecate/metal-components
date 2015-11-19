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

	var templates = {};

	var SoyTemplates = (function () {
		function SoyTemplates() {
			_classCallCheck(this, SoyTemplates);
		}

		_createClass(SoyTemplates, null, [{
			key: 'get',
			value: function get(opt_componentName, opt_templateName) {
				if (!opt_componentName) {
					return templates;
				} else if (!opt_templateName) {
					return templates[opt_componentName] || {};
				} else {
					return SoyTemplates.get(opt_componentName)[opt_templateName];
				}
			}
		}, {
			key: 'set',
			value: function set(componentName, componentTemplates) {
				templates[componentName] = componentTemplates;
			}
		}]);

		return SoyTemplates;
	})();

	exports.default = SoyTemplates;
});
//# sourceMappingURL=SoyTemplates.js.map