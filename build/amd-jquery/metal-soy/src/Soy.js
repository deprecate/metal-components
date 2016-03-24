define(['exports', 'metal/src/metal', 'html2incdom/src/withParser', 'metal-incremental-dom/src/IncrementalDomRenderer', './SoyAop', 'metal-soy-bundle/build/bundle', './requireWarning'], function (exports, _metal, _withParser, _IncrementalDomRenderer, _SoyAop) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SoyAop = exports.Soy = undefined;

	var _metal2 = _interopRequireDefault(_metal);

	var _withParser2 = _interopRequireDefault(_withParser);

	var _IncrementalDomRenderer2 = _interopRequireDefault(_IncrementalDomRenderer);

	var _SoyAop2 = _interopRequireDefault(_SoyAop);

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

	// The injected data that will be passed to soy templates.
	var ijData = {};

	var Soy = function (_IncrementalDomRender) {
		_inherits(Soy, _IncrementalDomRender);

		function Soy() {
			_classCallCheck(this, Soy);

			return _possibleConstructorReturn(this, _IncrementalDomRender.apply(this, arguments));
		}

		Soy.prototype.addMissingStateKeys_ = function addMissingStateKeys_(keys) {
			if (this.addedMissingStateKeys_) {
				return;
			}

			this.addedMissingStateKeys_ = true;
			var component = this.component_;
			for (var i = 0; i < keys.length; i++) {
				if (!component.getStateKeyConfig(keys[i])) {
					component.addToState(keys[i], {}, component.getInitialConfig()[keys[i]]);
				}
			}
		};

		Soy.prototype.buildTemplateData_ = function buildTemplateData_() {
			var component = this.component_;
			var data = {};
			component.getStateKeys().forEach(function (key) {
				// Get all state values except "element", since it helps performance
				// and the element shouldn't be referenced inside a soy template anyway.
				if (key === 'element') {
					return;
				}

				var value = component[key];
				if (component.getStateKeyConfig(key).isHtml && _metal2.default.isString(value)) {
					value = Soy.toIncDom(value);
				}
				data[key] = value;
			});
			return data;
		};

		Soy.handleInterceptedCall_ = function handleInterceptedCall_(originalFn, opt_data) {
			var ctor = originalFn.componentCtor;
			var data = opt_data;
			IncrementalDOM.elementVoid('Component', null, [], 'ctor', ctor, 'data', data);
		};

		Soy.toIncDom = function toIncDom(value) {
			return _withParser2.default.buildFn(value);
		};

		Soy.prototype.shouldUpdate = function shouldUpdate(changes) {
			var fn = this.component_.constructor.TEMPLATE;
			var params = fn ? _SoyAop2.default.getOriginalFn(fn).params : [];
			for (var i = 0; i < params.length; i++) {
				if (changes[params[i]]) {
					return true;
				}
			}
			return false;
		};

		Soy.register = function register(componentCtor, templates) {
			var mainTemplate = arguments.length <= 2 || arguments[2] === undefined ? 'render' : arguments[2];

			componentCtor.RENDERER = Soy;
			componentCtor.TEMPLATE = _SoyAop2.default.getOriginalFn(templates[mainTemplate]);
			componentCtor.TEMPLATE.componentCtor = componentCtor;
			_SoyAop2.default.registerForInterception(templates, mainTemplate);
		};

		Soy.prototype.renderIncDom = function renderIncDom() {
			var elementTemplate = this.component_.constructor.TEMPLATE;
			if (_metal2.default.isFunction(elementTemplate)) {
				elementTemplate = _SoyAop2.default.getOriginalFn(elementTemplate);
				this.addMissingStateKeys_(elementTemplate.params);

				_SoyAop2.default.startInterception(Soy.handleInterceptedCall_);
				elementTemplate(this.buildTemplateData_(), null, ijData);
				_SoyAop2.default.stopInterception();
			} else {
				_IncrementalDomRender.prototype.renderIncDom.call(this);
			}
		};

		Soy.setInjectedData = function setInjectedData(data) {
			ijData = data || {};
		};

		return Soy;
	}(_IncrementalDomRenderer2.default);

	Soy.prototype.registerMetalComponent && Soy.prototype.registerMetalComponent(Soy, 'Soy')
	exports.default = Soy;
	exports.Soy = Soy;
	exports.SoyAop = _SoyAop2.default;
});
//# sourceMappingURL=Soy.js.map