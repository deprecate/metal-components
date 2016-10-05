define(['exports', 'metal/src/metal', 'metal-component/src/all/component', 'html2incdom/src/withParser', 'metal-incremental-dom/src/IncrementalDomRenderer', './SoyAop', 'metal-soy-bundle/build/bundle'], function (exports, _metal, _component, _withParser, _IncrementalDomRenderer, _SoyAop) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SoyAop = exports.Soy = undefined;

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

	// The injected data that will be passed to soy templates.
	var ijData = {};

	var Soy = function (_IncrementalDomRender) {
		_inherits(Soy, _IncrementalDomRender);

		function Soy() {
			_classCallCheck(this, Soy);

			return _possibleConstructorReturn(this, (Soy.__proto__ || Object.getPrototypeOf(Soy)).apply(this, arguments));
		}

		_createClass(Soy, [{
			key: 'addMissingStateKeys_',
			value: function addMissingStateKeys_() {
				var elementTemplate = this.component_.constructor.TEMPLATE;
				if (!(0, _metal.isFunction)(elementTemplate)) {
					return;
				}

				elementTemplate = _SoyAop2.default.getOriginalFn(elementTemplate);
				this.soyParamTypes_ = elementTemplate.types || {};

				var keys = elementTemplate.params || [];
				var component = this.component_;
				var state = component.getDataManager().getStateInstance();
				for (var i = 0; i < keys.length; i++) {
					if (!state.hasStateKey(keys[i]) && !component[keys[i]]) {
						state.addToState(keys[i], {}, component.getInitialConfig()[keys[i]]);
					}
				}
			}
		}, {
			key: 'buildTemplateData_',
			value: function buildTemplateData_(params) {
				var _this2 = this;

				var component = this.component_;
				var data = _metal.object.mixin({}, this.config_);
				component.getStateKeys().forEach(function (key) {
					var value = component[key];
					if (_this2.isHtmlParam_(key)) {
						value = Soy.toIncDom(value);
					}
					data[key] = value;
				});
				for (var i = 0; i < params.length; i++) {
					if (!data[params[i]] && (0, _metal.isFunction)(component[params[i]])) {
						data[params[i]] = component[params[i]].bind(component);
					}
				}
				return data;
			}
		}, {
			key: 'handleDataManagerCreated_',
			value: function handleDataManagerCreated_() {
				_get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'handleDataManagerCreated_', this).call(this);
				this.addMissingStateKeys_();
			}
		}, {
			key: 'isHtmlParam_',
			value: function isHtmlParam_(name) {
				var state = this.component_.getDataManager().getStateInstance();
				if (state.getStateKeyConfig(name).isHtml) {
					return true;
				}
				var type = this.soyParamTypes_[name] || '';
				return type.split('|').indexOf('html') !== -1;
			}
		}, {
			key: 'renderIncDom',
			value: function renderIncDom() {
				var elementTemplate = this.component_.constructor.TEMPLATE;
				if ((0, _metal.isFunction)(elementTemplate) && !this.component_.render) {
					elementTemplate = _SoyAop2.default.getOriginalFn(elementTemplate);
					_SoyAop2.default.startInterception(Soy.handleInterceptedCall_);
					elementTemplate(this.buildTemplateData_(elementTemplate.params || []), null, ijData);
					_SoyAop2.default.stopInterception();
				} else {
					_get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'renderIncDom', this).call(this);
				}
			}
		}, {
			key: 'shouldUpdate',
			value: function shouldUpdate() {
				var should = _get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'shouldUpdate', this).call(this);
				if (!should || this.component_.shouldUpdate) {
					return should;
				}

				var fn = this.component_.constructor.TEMPLATE;
				var params = fn ? _SoyAop2.default.getOriginalFn(fn).params : [];
				for (var i = 0; i < params.length; i++) {
					if (this.changes_[params[i]]) {
						return true;
					}
				}
				return false;
			}
		}], [{
			key: 'getTemplate',
			value: function getTemplate(namespace, templateName) {
				return function (opt_data, opt_ignored, opt_ijData) {
					if (!goog.loadedModules_[namespace]) {
						throw new Error('No template with namespace "' + namespace + '" has been loaded yet.');
					}
					return goog.loadedModules_[namespace][templateName](opt_data, opt_ignored, opt_ijData);
				};
			}
		}, {
			key: 'handleInterceptedCall_',
			value: function handleInterceptedCall_(originalFn) {
				var opt_data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var args = [originalFn.componentCtor, null, []];
				for (var key in opt_data) {
					args.push(key, opt_data[key]);
				}
				IncrementalDOM.elementVoid.apply(null, args);
			}
		}, {
			key: 'register',
			value: function register(componentCtor, templates) {
				var mainTemplate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'render';

				componentCtor.RENDERER = Soy;
				componentCtor.TEMPLATE = _SoyAop2.default.getOriginalFn(templates[mainTemplate]);
				componentCtor.TEMPLATE.componentCtor = componentCtor;
				_SoyAop2.default.registerForInterception(templates, mainTemplate);
				_component.ComponentRegistry.register(componentCtor);
			}
		}, {
			key: 'setInjectedData',
			value: function setInjectedData(data) {
				ijData = data || {};
			}
		}, {
			key: 'toHtmlString',
			value: function toHtmlString(incDomFn) {
				var element = document.createElement('div');
				IncrementalDOM.patch(element, incDomFn);
				return element.innerHTML;
			}
		}, {
			key: 'toIncDom',
			value: function toIncDom(value) {
				if ((0, _metal.isObject)(value) && (0, _metal.isString)(value.content) && value.contentKind === 'HTML') {
					value = value.content;
				}
				if ((0, _metal.isString)(value)) {
					value = _withParser2.default.buildFn(value);
				}
				return value;
			}
		}]);

		return Soy;
	}(_IncrementalDomRenderer2.default);

	Soy.RENDERER_NAME = 'soy';

	exports.default = Soy;
	exports.Soy = Soy;
	exports.SoyAop = _SoyAop2.default;
});
//# sourceMappingURL=Soy.js.map