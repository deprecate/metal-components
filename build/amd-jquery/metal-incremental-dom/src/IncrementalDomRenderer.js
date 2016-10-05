define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-component/src/all/component', './IncrementalDomAop', './children/IncrementalDomChildren', './cleanup/IncrementalDomUnusedComponents', './utils/IncrementalDomUtils', './incremental-dom'], function (exports, _metal, _dom, _component, _IncrementalDomAop, _IncrementalDomChildren, _IncrementalDomUnusedComponents, _IncrementalDomUtils) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _IncrementalDomAop2 = _interopRequireDefault(_IncrementalDomAop);

	var _IncrementalDomChildren2 = _interopRequireDefault(_IncrementalDomChildren);

	var _IncrementalDomUnusedComponents2 = _interopRequireDefault(_IncrementalDomUnusedComponents);

	var _IncrementalDomUtils2 = _interopRequireDefault(_IncrementalDomUtils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
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

	var IncrementalDomRenderer = function (_ComponentRenderer) {
		_inherits(IncrementalDomRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */
		function IncrementalDomRenderer(comp) {
			_classCallCheck(this, IncrementalDomRenderer);

			var _this = _possibleConstructorReturn(this, (IncrementalDomRenderer.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer)).call(this, comp));

			comp.context = {};
			comp.refs = {};
			_this.config_ = comp.getInitialConfig();
			_this.childComponents_ = [];
			_this.clearChanges_();
			comp.on('attached', _this.handleAttached_.bind(_this));

			// Binds functions that will be used many times, to avoid creating new
			// functions each time.
			_this.handleInterceptedAttributesCall_ = _this.handleInterceptedAttributesCall_.bind(_this);
			_this.handleInterceptedCloseCall_ = _this.handleInterceptedCloseCall_.bind(_this);
			_this.handleInterceptedOpenCall_ = _this.handleInterceptedOpenCall_.bind(_this);
			_this.handleChildrenCaptured_ = _this.handleChildrenCaptured_.bind(_this);
			_this.handleChildRender_ = _this.handleChildRender_.bind(_this);
			_this.renderInsidePatchDontSkip_ = _this.renderInsidePatchDontSkip_.bind(_this);
			return _this;
		}

		/**
   * Adds the given css classes to the specified arguments for an incremental
   * dom call, merging with the existing value if there is one.
   * @param {string} elementClasses
   * @param {!Array} args
   * @protected
   */


		_createClass(IncrementalDomRenderer, [{
			key: 'addElementClasses_',
			value: function addElementClasses_(elementClasses, args) {
				for (var i = 3; i < args.length; i += 2) {
					if (args[i] === 'class') {
						args[i + 1] = this.removeDuplicateClasses_(args[i + 1] + ' ' + elementClasses);
						return;
					}
				}
				while (args.length < 3) {
					args.push(null);
				}
				args.push('class', elementClasses);
			}
		}, {
			key: 'attachDecoratedListeners_',
			value: function attachDecoratedListeners_(node, args) {
				if (!this.component_.wasRendered) {
					var attrs = (args[2] || []).concat(args.slice(3));
					for (var i = 0; i < attrs.length; i += 2) {
						var eventName = this.getEventFromListenerAttr_(attrs[i]);
						if (eventName && !node[eventName + '__handle__']) {
							this.attachEvent_(node, attrs[i], eventName, attrs[i + 1]);
						}
					}
				}
			}
		}, {
			key: 'attachEvent_',
			value: function attachEvent_(element, key, eventName, fn) {
				var handleKey = eventName + '__handle__';
				if (element[handleKey]) {
					element[handleKey].removeListener();
					element[handleKey] = null;
				}

				element[key] = fn;
				if (fn) {
					if ((0, _metal.isString)(fn)) {
						if (key[0] === 'd') {
							// Allow data-on[eventkey] listeners to stay in the dom, as they
							// won't cause conflicts.
							element.setAttribute(key, fn);
						}
						fn = this.component_.getListenerFn(fn);
					}
					element[handleKey] = (0, _dom.delegate)(document, eventName, element, fn);
				} else {
					element.removeAttribute(key);
				}
			}
		}, {
			key: 'buildChildren_',
			value: function buildChildren_(children) {
				return children.length === 0 ? emptyChildren_ : children;
			}
		}, {
			key: 'buildShouldUpdateArgs_',
			value: function buildShouldUpdateArgs_() {
				return [this.changes_];
			}
		}, {
			key: 'clearChanges_',
			value: function clearChanges_() {
				this.changes_ = {};
			}
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				_get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'disposeInternal', this).call(this);

				var comp = this.component_;
				var ref = this.config_.ref;
				var owner = this.getOwner();
				if (owner && owner.components && owner.components[ref] === comp) {
					delete owner.components[ref];
				}

				for (var i = 0; i < this.childComponents_.length; i++) {
					var child = this.childComponents_[i];
					if (!child.isDisposed()) {
						child.element = null;
						child.dispose();
					}
				}
				this.childComponents_ = null;
			}
		}, {
			key: 'getEventFromListenerAttr_',
			value: function getEventFromListenerAttr_(attr) {
				var matches = IncrementalDomRenderer.LISTENER_REGEX.exec(attr);
				var eventName = matches ? matches[1] ? matches[1] : matches[2] : null;
				return eventName ? eventName.toLowerCase() : null;
			}
		}, {
			key: 'getOwner',
			value: function getOwner() {
				return this.owner_;
			}
		}, {
			key: 'getParent',
			value: function getParent() {
				return this.parent_;
			}
		}, {
			key: 'getRef_',
			value: function getRef_(config) {
				var compatData = (0, _metal.getCompatibilityModeData)();
				if (compatData) {
					var renderers = compatData.renderers;
					var useKey = !renderers || renderers.indexOf(this.constructor) !== -1 || renderers.indexOf(this.constructor.RENDERER_NAME) !== -1;
					if (useKey && config.key && !config.ref) {
						return config.key;
					}
				}
				return config.ref;
			}
		}, {
			key: 'getSubComponent_',
			value: function getSubComponent_(tagOrCtor, config, owner) {
				var Ctor = tagOrCtor;
				if ((0, _metal.isString)(Ctor)) {
					Ctor = _component.ComponentRegistry.getConstructor(tagOrCtor);
				}

				var ref = this.getRef_(config);
				var data = IncrementalDomRenderer.getCurrentData();
				var comp;
				if ((0, _metal.isDef)(ref)) {
					comp = this.match_(owner.components[ref], Ctor, config);
					owner.addSubComponent(ref, comp);
					owner.refs[ref] = comp;
				} else if ((0, _metal.isDef)(config.key)) {
					comp = this.match_(data.prevComps.keys[config.key], Ctor, config);
					data.currComps.keys[config.key] = comp;
				} else {
					var type = (0, _metal.getUid)(Ctor, true);
					data.currComps.order[type] = data.currComps.order[type] || [];
					var order = data.currComps.order[type];
					comp = this.match_((data.prevComps.order[type] || [])[order.length], Ctor, config);
					order.push(comp);
				}

				return comp;
			}
		}, {
			key: 'guaranteeParent_',
			value: function guaranteeParent_() {
				var element = this.component_.element;
				if (!element || !element.parentNode) {
					var parent = document.createElement('div');
					if (element) {
						(0, _dom.append)(parent, element);
					}
					return parent;
				}
			}
		}, {
			key: 'handleAttached_',
			value: function handleAttached_(data) {
				this.attachData_ = data;
			}
		}, {
			key: 'handleChildrenCaptured_',
			value: function handleChildrenCaptured_(tree) {
				var _componentToRender_ = this.componentToRender_;
				var props = _componentToRender_.props;
				var tag = _componentToRender_.tag;

				props.children = this.buildChildren_(tree.props.children);
				this.componentToRender_ = null;
				this.renderFromTag_(tag, props);
			}
		}, {
			key: 'handleChildRender_',
			value: function handleChildRender_(node) {
				if (node.tag && _IncrementalDomUtils2.default.isComponentTag(node.tag)) {
					node.props.children = this.buildChildren_(node.props.children);
					this.renderFromTag_(node.tag, node.props);
					return true;
				}
			}
		}, {
			key: 'handleDataManagerCreated_',
			value: function handleDataManagerCreated_() {
				_get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'handleDataManagerCreated_', this).call(this);

				var manager = this.component_.getDataManager();
				if (!this.component_.constructor.SYNC_UPDATES_MERGED) {
					// If the component is being updated synchronously we'll just reuse the
					// `handleComponentRendererStateKeyChanged_` function from
					// `ComponentRenderer`.
					manager.on('dataPropChanged', this.handleDataPropChanged_.bind(this));
				}

				manager.add('children', {
					validator: Array.isArray,
					value: emptyChildren_
				}, this.config_.children || emptyChildren_);
			}
		}, {
			key: 'handleDataPropChanged_',
			value: function handleDataPropChanged_(data) {
				this.changes_[data.key] = data;
			}
		}, {
			key: 'handleInterceptedAttributesCall_',
			value: function handleInterceptedAttributesCall_(originalFn, element, name, value) {
				var eventName = this.getEventFromListenerAttr_(name);
				if (eventName) {
					this.attachEvent_(element, name, eventName, value);
					return;
				}

				if (name === 'checked') {
					// This is a temporary fix to account for incremental dom setting
					// "checked" as an attribute only, which can cause bugs since that won't
					// necessarily check/uncheck the element it's set on. See
					// https://github.com/google/incremental-dom/issues/198 for more details.
					value = (0, _metal.isDefAndNotNull)(value) && value !== false;
				}

				if (name === 'value' && element.value !== value) {
					// This is a temporary fix to account for incremental dom setting
					// "value" as an attribute only, which can cause bugs since that won't
					// necessarily update the input's content it's set on. See
					// https://github.com/google/incremental-dom/issues/239 for more details.
					// We only do this if the new value is different though, as otherwise the
					// browser will automatically move the typing cursor to the end of the
					// field.
					element[name] = value;
				}

				if ((0, _metal.isBoolean)(value)) {
					// Incremental dom sets boolean values as string data attributes, which
					// is counter intuitive. This changes the behavior to use the actual
					// boolean value.
					element[name] = value;
					if (value) {
						element.setAttribute(name, '');
					} else {
						element.removeAttribute(name);
					}
				} else {
					originalFn(element, name, value);
				}
			}
		}, {
			key: 'handleInterceptedCloseCall_',
			value: function handleInterceptedCloseCall_(originalFn, tag) {
				this.emit(IncrementalDomRenderer.ELEMENT_CLOSED, { tag: tag });
				var element = originalFn(tag);
				this.resetData_(_dom.domData.get(element).incDomData_);
				return element;
			}
		}, {
			key: 'handleInterceptedOpenCall_',
			value: function handleInterceptedOpenCall_(originalFn, tag) {
				if (_IncrementalDomUtils2.default.isComponentTag(tag)) {
					return this.handleSubComponentCall_.apply(this, arguments);
				} else {
					return this.handleRegularCall_.apply(this, arguments);
				}
			}
		}, {
			key: 'handleManagerDataPropChanged_',
			value: function handleManagerDataPropChanged_(data) {
				this.handleDataPropChanged_(data);
				_get(IncrementalDomRenderer.prototype.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer.prototype), 'handleManagerDataPropChanged_', this).call(this, data);
			}
		}, {
			key: 'handleRegularCall_',
			value: function handleRegularCall_(originalFn) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				this.emit(IncrementalDomRenderer.ELEMENT_OPENED, { args: args });
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_) {
					if (currRenderer.config_.key) {
						args[1] = currRenderer.config_.key;
					}
					var elementClasses = currComp.getDataManager().get('elementClasses');
					if (elementClasses) {
						this.addElementClasses_(elementClasses, args);
					}
				}

				var node = originalFn.apply(null, args);
				this.attachDecoratedListeners_(node, args);
				this.updateElementIfNotReached_(node);

				var config = _IncrementalDomUtils2.default.buildConfigFromCall(args);
				if ((0, _metal.isDefAndNotNull)(config.ref)) {
					var owner = _IncrementalDomChildren2.default.getCurrentOwner() || this;
					owner.getComponent().refs[config.ref] = node;
				}
				return node;
			}
		}, {
			key: 'handleSubComponentCall_',
			value: function handleSubComponentCall_(originalFn) {
				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					args[_key2 - 1] = arguments[_key2];
				}

				var props = _IncrementalDomUtils2.default.buildConfigFromCall(args);
				this.componentToRender_ = {
					props: props,
					tag: args[0]
				};
				_IncrementalDomChildren2.default.capture(this, this.handleChildrenCaptured_);
			}
		}, {
			key: 'hasDataChanged_',
			value: function hasDataChanged_() {
				return Object.keys(this.changes_).length > 0;
			}
		}, {
			key: 'intercept_',
			value: function intercept_() {
				_IncrementalDomAop2.default.startInterception({
					attributes: this.handleInterceptedAttributesCall_,
					elementClose: this.handleInterceptedCloseCall_,
					elementOpen: this.handleInterceptedOpenCall_
				});
			}
		}, {
			key: 'isMatch_',
			value: function isMatch_(comp, Ctor) {
				if (!comp || comp.constructor !== Ctor || comp.isDisposed()) {
					return false;
				}
				return comp.getRenderer().getOwner() === this.component_;
			}
		}, {
			key: 'match_',
			value: function match_(comp, Ctor, config) {
				if (!this.isMatch_(comp, Ctor)) {
					comp = new Ctor(config, false);
				}
				if (comp.wasRendered) {
					comp.getRenderer().startSkipUpdates();
					comp.getDataManager().replaceNonInternal(config);
					comp.getRenderer().stopSkipUpdates();
				}
				comp.getRenderer().config_ = config;
				return comp;
			}
		}, {
			key: 'patch',
			value: function patch() {
				if (!this.component_.element && this.parent_) {
					// If the component has no content but was rendered from another component,
					// we'll need to patch this parent to make sure that any new content will
					// be added in the right place.
					this.parent_.getRenderer().patch();
					return;
				}

				var tempParent = this.guaranteeParent_();
				if (tempParent) {
					IncrementalDOM.patch(tempParent, this.renderInsidePatchDontSkip_);
					(0, _dom.exitDocument)(this.component_.element);
					if (this.component_.element && this.component_.inDocument) {
						this.component_.renderElement_(this.attachData_.parent, this.attachData_.sibling);
					}
				} else {
					var element = this.component_.element;
					IncrementalDOM.patchOuter(element, this.renderInsidePatchDontSkip_);
				}
			}
		}, {
			key: 'removeDuplicateClasses_',
			value: function removeDuplicateClasses_(cssClasses) {
				var noDuplicates = [];
				var all = cssClasses.split(/\s+/);
				var used = {};
				for (var i = 0; i < all.length; i++) {
					if (!used[all[i]]) {
						used[all[i]] = true;
						noDuplicates.push(all[i]);
					}
				}
				return noDuplicates.join(' ');
			}
		}, {
			key: 'render',
			value: function render() {
				this.patch();
			}
		}, {
			key: 'renderChild',
			value: function renderChild(child) {
				this.intercept_();
				_IncrementalDomChildren2.default.render(child, this.handleChildRender_);
				_IncrementalDomAop2.default.stopInterception();
			}
		}, {
			key: 'renderFromTag_',
			value: function renderFromTag_(tag, config) {
				if ((0, _metal.isString)(tag) || tag.prototype.getRenderer) {
					var comp = this.renderSubComponent_(tag, config);
					this.updateElementIfNotReached_(comp.element);
					return comp.element;
				} else {
					return tag(config);
				}
			}
		}, {
			key: 'renderIncDom',
			value: function renderIncDom() {
				if (this.component_.render) {
					this.component_.render();
				} else {
					IncrementalDOM.elementVoid('div');
				}
			}
		}, {
			key: 'renderInsidePatch',
			value: function renderInsidePatch() {
				if (this.component_.wasRendered && !this.shouldUpdate() && IncrementalDOM.currentPointer() === this.component_.element) {
					if (this.component_.element) {
						IncrementalDOM.skipNode();
					}
					return;
				}
				this.renderInsidePatchDontSkip_();
			}
		}, {
			key: 'renderInsidePatchDontSkip_',
			value: function renderInsidePatchDontSkip_() {
				IncrementalDomRenderer.startedRenderingComponent(this.component_);
				this.clearChanges_();
				this.rootElementReached_ = false;
				_IncrementalDomUnusedComponents2.default.schedule(this.childComponents_);
				this.childComponents_ = [];
				this.component_.refs = {};
				this.intercept_();
				this.renderIncDom();
				_IncrementalDomAop2.default.stopInterception();
				if (!this.rootElementReached_) {
					this.component_.element = null;
				}
				this.emit('rendered', !this.isRendered_);
				IncrementalDomRenderer.finishedRenderingComponent();
				this.resetData_(this.incDomData_);
			}
		}, {
			key: 'renderSubComponent_',
			value: function renderSubComponent_(tagOrCtor, config) {
				var ownerRenderer = _IncrementalDomChildren2.default.getCurrentOwner() || this;
				var owner = ownerRenderer.getComponent();
				var comp = this.getSubComponent_(tagOrCtor, config, owner);
				this.updateContext_(comp);
				var renderer = comp.getRenderer();
				if (renderer instanceof IncrementalDomRenderer) {
					var parentComp = IncrementalDomRenderer.getComponentBeingRendered();
					var parentRenderer = parentComp.getRenderer();
					parentRenderer.childComponents_.push(comp);
					renderer.parent_ = parentComp;
					renderer.owner_ = owner;
					if (!config.key && !parentRenderer.rootElementReached_) {
						config.key = parentRenderer.config_.key;
					}
					renderer.renderInsidePatch();
				} else {
					console.warn('IncrementalDomRenderer doesn\'t support rendering sub components ' + 'that don\'t use IncrementalDomRenderer as well, like:', comp);
				}
				if (!comp.wasRendered) {
					comp.renderAsSubComponent();
				}
				return comp;
			}
		}, {
			key: 'resetData_',
			value: function resetData_(data) {
				if (data) {
					data.prevComps.keys = data.currComps.keys;
					data.prevComps.order = data.currComps.order;
					data.currComps.keys = {};
					data.currComps.order = {};
				}
			}
		}, {
			key: 'shouldUpdate',
			value: function shouldUpdate() {
				if (!this.hasDataChanged_()) {
					return false;
				}
				if (this.component_.shouldUpdate) {
					var _component_;

					return (_component_ = this.component_).shouldUpdate.apply(_component_, _toConsumableArray(this.buildShouldUpdateArgs_()));
				}
				return true;
			}
		}, {
			key: 'skipNextChildrenDisposal',
			value: function skipNextChildrenDisposal() {
				this.childComponents_ = [];
			}
		}, {
			key: 'update',
			value: function update() {
				if (this.shouldUpdate()) {
					this.patch();
				}
			}
		}, {
			key: 'updateElementIfNotReached_',
			value: function updateElementIfNotReached_(node) {
				var currComp = IncrementalDomRenderer.getComponentBeingRendered();
				var currRenderer = currComp.getRenderer();
				if (!currRenderer.rootElementReached_) {
					currRenderer.rootElementReached_ = true;
					if (currComp.element !== node) {
						currComp.element = node;
					}
				}
			}
		}, {
			key: 'updateContext_',
			value: function updateContext_(comp) {
				var context = comp.context;
				var parent = IncrementalDomRenderer.getComponentBeingRendered();
				var childContext = parent.getChildContext ? parent.getChildContext() : {};
				_metal.object.mixin(context, parent.context, childContext);
				comp.context = context;
			}
		}], [{
			key: 'finishedRenderingComponent',
			value: function finishedRenderingComponent() {
				renderingComponents_.pop();
				if (renderingComponents_.length === 0) {
					_IncrementalDomUnusedComponents2.default.disposeUnused();
				}
			}
		}, {
			key: 'getComponentBeingRendered',
			value: function getComponentBeingRendered() {
				return renderingComponents_[renderingComponents_.length - 1];
			}
		}, {
			key: 'getCurrentData',
			value: function getCurrentData() {
				var element = IncrementalDOM.currentElement();
				var comp = IncrementalDomRenderer.getComponentBeingRendered();
				var renderer = comp.getRenderer();
				var obj = renderer;
				if (renderer.rootElementReached_ && element !== comp.element.parentNode) {
					obj = _dom.domData.get(element);
				}
				obj.incDomData_ = obj.incDomData_ || {
					currComps: {
						keys: {},
						order: {}
					},
					prevComps: {
						keys: {},
						order: {}
					}
				};
				return obj.incDomData_;
			}
		}, {
			key: 'isIncDomNode',
			value: function isIncDomNode(node) {
				return !!node[_IncrementalDomChildren2.default.CHILD_OWNER];
			}
		}, {
			key: 'render',
			value: function render(fnOrCtor, opt_dataOrElement, opt_parent) {
				if (!_component.Component.isComponentCtor(fnOrCtor)) {
					var fn = fnOrCtor;

					var TempComponent = function (_Component) {
						_inherits(TempComponent, _Component);

						function TempComponent() {
							_classCallCheck(this, TempComponent);

							return _possibleConstructorReturn(this, (TempComponent.__proto__ || Object.getPrototypeOf(TempComponent)).apply(this, arguments));
						}

						_createClass(TempComponent, [{
							key: 'created',
							value: function created() {
								if (IncrementalDomRenderer.getComponentBeingRendered()) {
									this.getRenderer().updateContext_(this);
								}
							}
						}, {
							key: 'render',
							value: function render() {
								fn(this.getRenderer().config_);
							}
						}]);

						return TempComponent;
					}(_component.Component);

					TempComponent.RENDERER = IncrementalDomRenderer;
					fnOrCtor = TempComponent;
				}
				return _component.Component.render(fnOrCtor, opt_dataOrElement, opt_parent);
			}
		}, {
			key: 'renderChild',
			value: function renderChild(child) {
				child[_IncrementalDomChildren2.default.CHILD_OWNER].renderChild(child);
			}
		}, {
			key: 'startedRenderingComponent',
			value: function startedRenderingComponent(comp) {
				renderingComponents_.push(comp);
			}
		}]);

		return IncrementalDomRenderer;
	}(_component.ComponentRenderer);

	var renderingComponents_ = [];
	var emptyChildren_ = [];

	// Constants used as event names.
	IncrementalDomRenderer.ELEMENT_OPENED = 'elementOpened';
	IncrementalDomRenderer.ELEMENT_CLOSED = 'elementClosed';

	// Regex pattern used to find inline listeners.
	IncrementalDomRenderer.LISTENER_REGEX = /^(?:on([A-Z]\w+))|(?:data-on(\w+))$/;

	// Name of this renderer. Renderers should provide this as a way to identify
	// them via a simple string (when calling enableCompatibilityMode to add
	// support to old features for specific renderers for example).
	IncrementalDomRenderer.RENDERER_NAME = 'incremental-dom';

	exports.default = IncrementalDomRenderer;
});
//# sourceMappingURL=IncrementalDomRenderer.js.map