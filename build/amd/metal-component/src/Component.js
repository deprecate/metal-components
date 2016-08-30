define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', './ComponentDataManager', './ComponentRenderer', 'metal-events/src/events'], function (exports, _metal, _dom, _ComponentDataManager, _ComponentRenderer, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ComponentDataManager2 = _interopRequireDefault(_ComponentDataManager);

	var _ComponentRenderer2 = _interopRequireDefault(_ComponentRenderer);

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

	var Component = function (_EventEmitter) {
		_inherits(Component, _EventEmitter);

		/**
   * Constructor function for `Component`.
   * @param {Object=} opt_config An object with the initial values for this
   *     component's state.
   * @param {boolean|string|Element=} opt_parentElement The element where the
   *     component should be rendered. Can be given as a selector or an element.
   *     If `false` is passed, the component won't be rendered automatically
   *     after created.
   * @constructor
   */
		function Component(opt_config, opt_parentElement) {
			_classCallCheck(this, Component);

			var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

			/**
    * All listeners that were attached until the `DomEventEmitterProxy` instance
    * was created.
    * @type {!Object<string, bool>}
    * @protected
    */
			_this.attachedListeners_ = {};

			/**
    * Gets all nested components.
    * @type {!Array<!Component>}
    */
			_this.components = {};

			/**
    * Instance of `DomEventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {DomEventEmitterProxy}
    * @protected
    */
			_this.elementEventProxy_ = null;

			/**
    * The `EventHandler` instance for events attached from the `events` state key.
    * @type {!EventHandler}
    * @protected
    */
			_this.eventsStateKeyHandler_ = new _events.EventHandler();

			/**
    * Whether the element is in document.
    * @type {boolean}
    */
			_this.inDocument = false;

			/**
    * The initial config option passed to this constructor.
    * @type {!Object}
    * @protected
    */
			_this.initialConfig_ = opt_config || {};

			/**
    * Whether the element was rendered.
    * @type {boolean}
    */
			_this.wasRendered = false;

			/**
    * The component's element will be appended to the element this variable is
    * set to, unless the user specifies another parent when calling `render` or
    * `attach`.
    * @type {!Element}
    */
			_this.DEFAULT_ELEMENT_PARENT = document.body;

			_metal.core.mergeSuperClassesProperty(_this.constructor, 'ELEMENT_CLASSES', _this.mergeElementClasses_);
			_metal.core.mergeSuperClassesProperty(_this.constructor, 'SYNC_UPDATES', _metal.array.firstDefinedValue);

			_this.element = _this.initialConfig_.element;

			_this.renderer_ = _this.createRenderer();
			_this.renderer_.on('rendered', _this.handleRendererRendered_.bind(_this));

			_this.dataManager_ = _this.createDataManager();
			_this.emit('dataManagerCreated');

			_this.on('stateChanged', _this.handleStateChanged_);
			_this.newListenerHandle_ = _this.on('newListener', _this.handleNewListener_);
			_this.on('eventsChanged', _this.onEventsChanged_);
			_this.addListenersFromObj_(_this.dataManager_.get('events'));

			_this.created();
			_this.componentCreated_ = true;
			if (opt_parentElement !== false) {
				_this.render_(opt_parentElement);
			}
			_this.on('elementChanged', _this.onElementChanged_);
			return _this;
		}

		/**
   * Getter logic for the element property.
   * @return {Element}
   */


		Component.prototype.addListenersFromObj_ = function addListenersFromObj_(events) {
			var eventNames = Object.keys(events || {});
			for (var i = 0; i < eventNames.length; i++) {
				var info = this.extractListenerInfo_(events[eventNames[i]]);
				if (info.fn) {
					var handler;
					if (info.selector) {
						handler = this.delegate(eventNames[i], info.selector, info.fn);
					} else {
						handler = this.on(eventNames[i], info.fn);
					}
					this.eventsStateKeyHandler_.add(handler);
				}
			}
		};

		Component.prototype.attach = function attach(opt_parentElement, opt_siblingElement) {
			if (!this.inDocument) {
				this.renderElement_(opt_parentElement, opt_siblingElement);
				this.inDocument = true;
				this.emit('attached', {
					parent: opt_parentElement,
					sibling: opt_siblingElement
				});
				this.attached();
			}
			return this;
		};

		Component.prototype.attached = function attached() {};

		Component.prototype.addSubComponent = function addSubComponent(ref, component) {
			this.components[ref] = component;
		};

		Component.prototype.created = function created() {};

		Component.prototype.createDataManager = function createDataManager() {
			_metal.core.mergeSuperClassesProperty(this.constructor, 'DATA_MANAGER', _metal.array.firstDefinedValue);
			return new this.constructor.DATA_MANAGER_MERGED(this, Component.DATA);
		};

		Component.prototype.createRenderer = function createRenderer() {
			_metal.core.mergeSuperClassesProperty(this.constructor, 'RENDERER', _metal.array.firstDefinedValue);
			return new this.constructor.RENDERER_MERGED(this);
		};

		Component.prototype.delegate = function delegate(eventName, selector, callback) {
			return this.on('delegate:' + eventName + ':' + selector, callback);
		};

		Component.prototype.detach = function detach() {
			if (this.inDocument) {
				if (this.element && this.element.parentNode) {
					this.element.parentNode.removeChild(this.element);
				}
				this.inDocument = false;
				this.detached();
			}
			this.emit('detached');
			return this;
		};

		Component.prototype.detached = function detached() {};

		Component.prototype.disposed = function disposed() {};

		Component.prototype.disposeInternal = function disposeInternal() {
			this.disposed();

			this.detach();

			if (this.elementEventProxy_) {
				this.elementEventProxy_.dispose();
				this.elementEventProxy_ = null;
			}

			this.disposeSubComponents(Object.keys(this.components));
			this.components = null;

			this.dataManager_.dispose();
			this.dataManager_ = null;

			this.renderer_.dispose();
			this.renderer_ = null;

			_EventEmitter.prototype.disposeInternal.call(this);
		};

		Component.prototype.disposeSubComponents = function disposeSubComponents(keys) {
			for (var i = 0; i < keys.length; i++) {
				var component = this.components[keys[i]];
				if (component && !component.isDisposed()) {
					component.element = null;
					component.dispose();
					delete this.components[keys[i]];
				}
			}
		};

		Component.prototype.extractListenerInfo_ = function extractListenerInfo_(value) {
			var info = {
				fn: value
			};
			if (_metal.core.isObject(value) && !_metal.core.isFunction(value)) {
				info.selector = value.selector;
				info.fn = value.fn;
			}
			if (_metal.core.isString(info.fn)) {
				info.fn = this.getListenerFn(info.fn);
			}
			return info;
		};

		Component.prototype.getDataManager = function getDataManager() {
			return this.dataManager_;
		};

		Component.prototype.getInitialConfig = function getInitialConfig() {
			return this.initialConfig_;
		};

		Component.prototype.getListenerFn = function getListenerFn(fnName) {
			if (_metal.core.isFunction(this[fnName])) {
				return this[fnName].bind(this);
			} else {
				console.error('No function named "' + fnName + '" was found in the ' + 'component "' + _metal.core.getFunctionName(this.constructor) + '". Make ' + 'sure that you specify valid function names when adding inline listeners.');
			}
		};

		Component.prototype.getState = function getState() {
			return this.dataManager_.getState();
		};

		Component.prototype.getStateKeys = function getStateKeys() {
			return this.dataManager_.getStateKeys();
		};

		Component.prototype.fireStateKeyChange_ = function fireStateKeyChange_(key, opt_change) {
			var fn = this['sync' + key.charAt(0).toUpperCase() + key.slice(1)];
			if (_metal.core.isFunction(fn)) {
				if (!opt_change) {
					var manager = this.getDataManager();
					opt_change = {
						newVal: manager.get(key),
						prevVal: undefined
					};
				}
				fn.call(this, opt_change.newVal, opt_change.prevVal);
			}
		};

		Component.prototype.getRenderer = function getRenderer() {
			return this.renderer_;
		};

		Component.prototype.handleRendererRendered_ = function handleRendererRendered_(data) {
			this.rendered(data);
			this.emit('rendered', data);
		};

		Component.prototype.handleStateChanged_ = function handleStateChanged_(event) {
			this.syncStateFromChanges_(event.changes);
			this.emit('stateSynced', event);
		};

		Component.prototype.handleNewListener_ = function handleNewListener_(event) {
			this.attachedListeners_[event] = true;
		};

		Component.isComponentCtor = function isComponentCtor(fn) {
			return fn.prototype && fn.prototype[Component.COMPONENT_FLAG];
		};

		Component.prototype.mergeElementClasses_ = function mergeElementClasses_(values) {
			var marked = {};
			return values.filter(function (val) {
				if (!val || marked[val]) {
					return false;
				} else {
					marked[val] = true;
					return true;
				}
			}).join(' ');
		};

		Component.prototype.onElementChanged_ = function onElementChanged_(event) {
			this.setUpProxy_();
			this.elementEventProxy_.setOriginEmitter(event.newVal);
			if (event.newVal) {
				this.syncVisible(this.dataManager_.get('visible'));
			}
		};

		Component.prototype.onEventsChanged_ = function onEventsChanged_(event) {
			this.eventsStateKeyHandler_.removeAllListeners();
			this.addListenersFromObj_(event.newVal);
		};

		Component.render = function render(Ctor, opt_configOrElement, opt_element) {
			var config = opt_configOrElement;
			var element = opt_element;
			if (_metal.core.isElement(opt_configOrElement)) {
				config = null;
				element = opt_configOrElement;
			}
			var instance = new Ctor(config, false);
			instance.render_(element);
			return instance;
		};

		Component.prototype.render_ = function render_(opt_parentElement, opt_skipRender) {
			if (!opt_skipRender) {
				this.emit('render');
			}
			this.setUpProxy_();
			this.syncState_();
			this.attach(opt_parentElement);
			this.wasRendered = true;
		};

		Component.prototype.renderAsSubComponent = function renderAsSubComponent() {
			this.render_(null, true);
		};

		Component.prototype.renderElement_ = function renderElement_(opt_parentElement, opt_siblingElement) {
			var element = this.element;
			if (element && (opt_siblingElement || !element.parentNode)) {
				var parent = _dom.dom.toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
				parent.insertBefore(element, _dom.dom.toElement(opt_siblingElement));
			}
		};

		Component.prototype.setState = function setState(state, opt_callback) {
			this.dataManager_.setState(state, opt_callback);
		};

		Component.prototype.setterElementClassesFn_ = function setterElementClassesFn_(val) {
			if (this.constructor.ELEMENT_CLASSES_MERGED) {
				val += ' ' + this.constructor.ELEMENT_CLASSES_MERGED;
			}
			return val.trim();
		};

		Component.prototype.setUpProxy_ = function setUpProxy_() {
			if (this.elementEventProxy_) {
				return;
			}

			var proxy = new _dom.DomEventEmitterProxy(this.element, this);
			this.elementEventProxy_ = proxy;

			_metal.object.map(this.attachedListeners_, proxy.proxyEvent.bind(proxy));
			this.attachedListeners_ = null;

			this.newListenerHandle_.removeListener();
			this.newListenerHandle_ = null;
		};

		Component.prototype.syncState_ = function syncState_() {
			var keys = this.dataManager_.getSyncKeys();
			for (var i = 0; i < keys.length; i++) {
				this.fireStateKeyChange_(keys[i]);
			}
		};

		Component.prototype.syncStateFromChanges_ = function syncStateFromChanges_(changes) {
			for (var key in changes) {
				this.fireStateKeyChange_(key, changes[key]);
			}
		};

		Component.prototype.syncVisible = function syncVisible(newVal) {
			if (this.element) {
				this.element.style.display = newVal ? '' : 'none';
			}
		};

		Component.prototype.rendered = function rendered() {};

		Component.prototype.validatorEventsFn_ = function validatorEventsFn_(val) {
			return !_metal.core.isDefAndNotNull(val) || _metal.core.isObject(val);
		};

		_createClass(Component, [{
			key: 'element',
			get: function get() {
				return this.elementVal_;
			},
			set: function set(val) {
				if (!_metal.core.isElement(val) && !_metal.core.isString(val) && _metal.core.isDefAndNotNull(val)) {
					return;
				}

				if (val) {
					val = _dom.dom.toElement(val) || this.elementVal_;
				}

				if (this.elementVal_ !== val) {
					var prev = this.elementVal_;
					this.elementVal_ = val;
					if (this.componentCreated_) {
						this.emit('elementChanged', {
							prevVal: prev,
							newVal: val
						});
					}
				}
			}
		}]);

		return Component;
	}(_events.EventEmitter);

	/**
  * Component data definition.
  * @type {Object}
  * @static
  */
	Component.DATA = {
		/**
   * CSS classes to be applied to the element.
   * @type {string}
   */
		elementClasses: {
			setter: 'setterElementClassesFn_',
			validator: _metal.core.isString,
			value: ''
		},

		/**
   * Listeners that should be attached to this component. Should be provided as an object,
   * where the keys are event names and the values are the listener functions (or function
   * names).
   * @type {Object<string, (function()|string|{selector: string, fn: function()|string})>}
   */
		events: {
			validator: 'validatorEventsFn_',
			value: null
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: _metal.core.isBoolean,
			value: true
		}
	};

	Component.COMPONENT_FLAG = '__metal_component__';

	/**
  * The `ComponentDataManager` class that should be used. This class will be
  * responsible for handling the component's data. Each component may have its
  * own implementation.
  */
	Component.DATA_MANAGER = _ComponentDataManager2.default;

	/**
  * CSS classes to be applied to the element.
  * @type {string}
  * @protected
  * @static
  */
	Component.ELEMENT_CLASSES = '';

	/**
  * The `ComponentRenderer` that should be used. Components need to set this
  * to a subclass of `ComponentRenderer` that has the rendering logic, like
  * `SoyRenderer`.
  * @type {!ComponentRenderer}
  * @static
  */
	Component.RENDERER = _ComponentRenderer2.default;

	/**
  * Flag indicating if component updates will happen synchronously. Updates are
  * done asynchronously by default, which allows changes to be batched and
  * applied together.
  * @type {boolean}
  */
	Component.SYNC_UPDATES = false;

	/**
  * Sets a prototype flag to easily determine if a given constructor is for
  * a component or not.
  */
	Component.prototype[Component.COMPONENT_FLAG] = true;

	exports.default = Component;
});
//# sourceMappingURL=Component.js.map