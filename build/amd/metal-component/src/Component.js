define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', './ComponentCollector', './ComponentRegistry', './ComponentRenderer', 'metal-events/src/events', 'metal-state/src/State'], function (exports, _metal, _dom, _ComponentCollector, _ComponentRegistry, _ComponentRenderer, _events, _State2) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ComponentCollector2 = _interopRequireDefault(_ComponentCollector);

	var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

	var _ComponentRenderer2 = _interopRequireDefault(_ComponentRenderer);

	var _State3 = _interopRequireDefault(_State2);

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

	var Component = function (_State) {
		_inherits(Component, _State);

		/**
   * Constructor function for `Component`.
   * @param {Object=} opt_config An object with the initial values for this
   *     component's state.
   * @constructor
   */

		function Component(opt_config) {
			_classCallCheck(this, Component);

			var _this = _possibleConstructorReturn(this, _State.call(this, opt_config));

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
    * Whether the element is being decorated.
    * @type {boolean}
    * @protected
    */
			_this.decorating_ = false;

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
			_metal.core.mergeSuperClassesProperty(_this.constructor, 'RENDERER', _metal.array.firstDefinedValue);

			_this.renderer_ = new _this.constructor.RENDERER_MERGED(_this);

			_this.created_();
			return _this;
		}

		/**
   * Adds the necessary classes to the component's element.
   * @protected
   */


		Component.prototype.addElementClasses_ = function addElementClasses_() {
			var classesToAdd = this.constructor.ELEMENT_CLASSES_MERGED;
			if (this.elementClasses) {
				classesToAdd = classesToAdd + ' ' + this.elementClasses;
			}
			_dom.dom.addClasses(this.element, classesToAdd);
		};

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
			if (!this.element) {
				throw new Error(Component.Error.ELEMENT_NOT_CREATED);
			}
			if (!this.inDocument) {
				this.renderElement_(opt_parentElement, opt_siblingElement);
				this.inDocument = true;
				this.emit('attached');
				this.attached();
			}
			return this;
		};

		Component.prototype.attached = function attached() {};

		Component.prototype.created_ = function created_() {
			this.on('stateChanged', this.handleStateChanged_);
			Component.componentsCollector.addComponent(this);

			this.newListenerHandle_ = this.on('newListener', this.handleNewListener_);

			this.on('eventsChanged', this.onEventsChanged_);
			this.addListenersFromObj_(this.events);
		};

		Component.prototype.addSubComponent = function addSubComponent(componentNameOrCtor, opt_componentData) {
			// Avoid accessing id from component if possible, since that may cause
			// the lookup of the component's element in the dom unnecessarily, which is
			// bad for performance.
			var id = (opt_componentData || {}).id;
			var component = Component.componentsCollector.createComponent(componentNameOrCtor, opt_componentData);
			this.components[id || component.id] = component;
			return component;
		};

		Component.prototype.decorate = function decorate() {
			this.decorating_ = true;
			this.render();
			this.decorating_ = false;
			return this;
		};

		Component.prototype.delegate = function delegate(eventName, selector, callback) {
			return this.on('delegate:' + eventName + ':' + selector, callback);
		};

		Component.prototype.detach = function detach() {
			if (this.inDocument) {
				if (this.element.parentNode) {
					this.element.parentNode.removeChild(this.element);
				}
				this.inDocument = false;
				this.detached();
			}
			this.emit('detached');
			return this;
		};

		Component.prototype.detached = function detached() {};

		Component.prototype.disposeInternal = function disposeInternal() {
			this.detach();

			if (this.elementEventProxy_) {
				this.elementEventProxy_.dispose();
				this.elementEventProxy_ = null;
			}

			this.disposeSubComponents(Object.keys(this.components));
			this.components = null;

			this.renderer_.dispose();
			this.renderer_ = null;

			_State.prototype.disposeInternal.call(this);
		};

		Component.prototype.disposeSubComponents = function disposeSubComponents(ids) {
			for (var i = 0; i < ids.length; i++) {
				var component = this.components[ids[i]];
				if (!component.isDisposed()) {
					Component.componentsCollector.removeComponent(component);
					component.dispose();
					delete this.components[ids[i]];
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

		Component.prototype.getInitialConfig = function getInitialConfig() {
			return this.initialConfig_;
		};

		Component.prototype.getListenerFn = function getListenerFn(fnName) {
			var fnComponent;
			var split = fnName.split(':');
			if (split.length === 2) {
				fnName = split[1];
				fnComponent = _ComponentCollector2.default.components[split[0]];
				if (!fnComponent) {
					console.error('No component with the id "' + split[0] + '" has been collected' + 'yet. Make sure that you specify an id for an existing component when ' + 'adding inline listeners.');
				}
			}
			fnComponent = fnComponent || this;
			if (_metal.core.isFunction(fnComponent[fnName])) {
				return fnComponent[fnName].bind(fnComponent);
			} else {
				console.error('No function named "' + fnName + '" was found in the component with id "' + fnComponent.id + '". Make sure that you specify valid function names when adding ' + 'inline listeners.');
			}
		};

		Component.prototype.findElementById = function findElementById(id) {
			return document.getElementById(id) || this.element && this.element.querySelector('#' + id);
		};

		Component.prototype.fireStateKeyChange_ = function fireStateKeyChange_(key, opt_change) {
			var fn = this['sync' + key.charAt(0).toUpperCase() + key.slice(1)];
			if (_metal.core.isFunction(fn)) {
				if (!opt_change) {
					opt_change = {
						newVal: this[key],
						prevVal: undefined
					};
				}
				fn.call(this, opt_change.newVal, opt_change.prevVal);
			}
		};

		Component.prototype.getComponentsWithPrefix = function getComponentsWithPrefix(prefix) {
			var _this2 = this;

			var ids = Object.keys(this.components).filter(function (id) {
				return id.indexOf(prefix) === 0;
			});
			var map = {};
			ids.forEach(function (id) {
				return map[id] = _this2.components[id];
			});
			return map;
		};

		Component.prototype.getName = function getName() {
			return this.constructor.NAME || _metal.core.getFunctionName(this.constructor);
		};

		Component.prototype.getRenderer = function getRenderer() {
			return this.renderer_;
		};

		Component.prototype.handleStateChanged_ = function handleStateChanged_(event) {
			this.syncStateFromChanges_(event.changes);
			this.emit('stateSynced', event);
		};

		Component.prototype.handleNewListener_ = function handleNewListener_(event) {
			this.attachedListeners_[event] = true;
		};

		Component.prototype.makeId_ = function makeId_() {
			return 'metal_c_' + _metal.core.getUid(this);
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
			if (event.prevVal === event.newVal) {
				// The `elementChanged` event will be fired whenever the element is set,
				// even if its value hasn't actually changed, since that's how State
				// handles objects. We need to check manually here.
				return;
			}

			this.elementEventProxy_.setOriginEmitter(event.newVal);
			event.newVal.id = this.id;
			this.addElementClasses_();
			this.syncVisible(this.visible);
		};

		Component.prototype.onEventsChanged_ = function onEventsChanged_(event) {
			this.eventsStateKeyHandler_.removeAllListeners();
			this.addListenersFromObj_(event.newVal);
		};

		Component.prototype.registerMetalComponent = function registerMetalComponent(constructorFn, opt_name) {
			_ComponentRegistry2.default.register(constructorFn, opt_name);
		};

		Component.prototype.render = function render(opt_parentElement, opt_siblingElement, opt_skipRender) {
			if (this.wasRendered) {
				throw new Error(Component.Error.ALREADY_RENDERED);
			}

			if (!opt_skipRender) {
				this.emit('render', {
					decorating: this.decorating_
				});
			}
			this.setUpProxy_();
			this.syncState_();
			if (opt_parentElement !== false) {
				this.attach(opt_parentElement, opt_siblingElement);
			}
			this.wasRendered = true;
			return this;
		};

		Component.prototype.renderAsSubComponent = function renderAsSubComponent() {
			this.render(null, null, true);
		};

		Component.prototype.renderElement_ = function renderElement_(opt_parentElement, opt_siblingElement) {
			var element = this.element;
			element.id = this.id;
			if (opt_siblingElement || !element.parentNode) {
				var parent = _dom.dom.toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
				parent.insertBefore(element, _dom.dom.toElement(opt_siblingElement));
			}
		};

		Component.prototype.setterElementFn_ = function setterElementFn_(newVal, currentVal) {
			return _dom.dom.toElement(newVal) || currentVal;
		};

		Component.prototype.setUpProxy_ = function setUpProxy_() {
			var proxy = new _dom.DomEventEmitterProxy(this.element, this);
			this.elementEventProxy_ = proxy;

			_metal.object.map(this.attachedListeners_, proxy.proxyEvent.bind(proxy));
			this.attachedListeners_ = null;

			this.newListenerHandle_.removeListener();
			this.newListenerHandle_ = null;

			this.on('elementChanged', this.onElementChanged_);
		};

		Component.prototype.syncState_ = function syncState_() {
			var keys = this.getStateKeys();
			for (var i = 0; i < keys.length; i++) {
				this.fireStateKeyChange_(keys[i]);
			}
		};

		Component.prototype.syncStateFromChanges_ = function syncStateFromChanges_(changes) {
			for (var key in changes) {
				this.fireStateKeyChange_(key, changes[key]);
			}
		};

		Component.prototype.syncElementClasses = function syncElementClasses(newVal, prevVal) {
			if (this.element && prevVal) {
				_dom.dom.removeClasses(this.element, prevVal);
			}
			this.addElementClasses_();
		};

		Component.prototype.syncVisible = function syncVisible(newVal) {
			if (this.element) {
				this.element.style.display = newVal ? '' : 'none';
			}
		};

		Component.prototype.validatorElementClassesFn_ = function validatorElementClassesFn_(val) {
			return _metal.core.isString(val);
		};

		Component.prototype.validatorElementFn_ = function validatorElementFn_(val) {
			return _metal.core.isElement(val) || _metal.core.isString(val);
		};

		Component.prototype.validatorEventsFn_ = function validatorEventsFn_(val) {
			return !_metal.core.isDefAndNotNull(val) || _metal.core.isObject(val);
		};

		Component.prototype.validatorIdFn_ = function validatorIdFn_(val) {
			return _metal.core.isString(val);
		};

		Component.prototype.valueIdFn_ = function valueIdFn_() {
			var hasElement = this.hasBeenSet('element') && this.element;
			return hasElement && this.element.id ? this.element.id : this.makeId_();
		};

		return Component;
	}(_State3.default);

	Component.prototype.registerMetalComponent && Component.prototype.registerMetalComponent(Component, 'Component')


	/**
  * Helper responsible for extracting components from strings and config data.
  * @type {!ComponentCollector}
  * @protected
  * @static
  */
	Component.componentsCollector = new _ComponentCollector2.default();

	/**
  * Component state definition.
  * @type {Object}
  * @static
  */
	Component.STATE = {
		/**
   * Component element bounding box.
   * @type {Element}
   * @writeOnce
   */
		element: {
			setter: 'setterElementFn_',
			validator: 'validatorElementFn_'
		},

		/**
   * CSS classes to be applied to the element.
   * @type {Array.<string>}
   */
		elementClasses: {
			validator: 'validatorElementClassesFn_'
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
   * Component element id. If not specified will be generated.
   * @type {string}
   * @writeOnce
   */
		id: {
			validator: 'validatorIdFn_',
			valueFn: 'valueIdFn_',
			writeOnce: true
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
  * Errors thrown by the component.
  * @enum {string}
  */
	Component.Error = {
		/**
   * Error when the component is already rendered and another render attempt
   * is made.
   */
		ALREADY_RENDERED: 'Component already rendered.',

		/**
   * Error when the component is attached but its element hasn't been created yet.
   */
		ELEMENT_NOT_CREATED: 'Can\'t attach component element. It hasn\'t been created yet.'
	};

	/**
  * A list with state key names that will automatically be rejected as invalid.
  * @type {!Array<string>}
  */
	Component.INVALID_KEYS = ['components'];

	exports.default = Component;
});
//# sourceMappingURL=Component.js.map