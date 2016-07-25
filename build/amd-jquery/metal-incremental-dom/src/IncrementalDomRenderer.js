define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-component/src/all/component', './IncrementalDomAop', './children/IncrementalDomChildren', './cleanup/IncrementalDomUnusedComponents', './utils/IncrementalDomUtils', './incremental-dom'], function (exports, _metal, _dom, _component, _IncrementalDomAop, _IncrementalDomChildren, _IncrementalDomUnusedComponents, _IncrementalDomUtils) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

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

	var IncrementalDomRenderer = function (_ComponentRenderer) {
		_inherits(IncrementalDomRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */
		function IncrementalDomRenderer(comp) {
			_classCallCheck(this, IncrementalDomRenderer);

			var _this = _possibleConstructorReturn(this, _ComponentRenderer.call(this, comp));

			comp.context = {};
			_this.config_ = comp.getInitialConfig();
			_this.clearChanges_();
			comp.on('attached', _this.handleAttached_.bind(_this));

			var manager = comp.getDataManager();
			if (!_this.component_.constructor.SYNC_UPDATES_MERGED) {
				// If the component is being updated synchronously we'll just reuse the
				// `handleComponentRendererStateKeyChanged_` function from
				// `ComponentRenderer`.
				manager.on('dataPropChanged', _this.handleDataPropChanged_.bind(_this));
			}

			manager.add('children', {
				validator: Array.isArray,
				value: emptyChildren_
			}, _this.config_.children || emptyChildren_);

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
   * Attaches inline listeners found on the first component render, since those
   * may come from existing elements on the page that already have
   * data-on[eventname] attributes set to its final value. This won't trigger
   * `handleInterceptedAttributesCall_`, so we need manual work to guarantee
   * that projects using progressive enhancement like this will still work.
   * @param {!Element} node
   * @param {!Array} args
   * @protected
   */


		IncrementalDomRenderer.prototype.attachDecoratedListeners_ = function attachDecoratedListeners_(node, args) {
			if (!this.component_.wasRendered) {
				var attrs = (args[2] || []).concat(args.slice(3));
				for (var i = 0; i < attrs.length; i += 2) {
					var eventName = this.getEventFromListenerAttr_(attrs[i]);
					if (eventName && !node[eventName + '__handle__']) {
						this.attachEvent_(node, attrs[i], eventName, attrs[i + 1]);
					}
				}
			}
		};

		IncrementalDomRenderer.prototype.attachEvent_ = function attachEvent_(element, key, eventName, fn) {
			var handleKey = eventName + '__handle__';
			if (element[handleKey]) {
				element[handleKey].removeListener();
				element[handleKey] = null;
			}

			element[key] = fn;
			if (fn) {
				if (_metal.core.isString(fn)) {
					if (key[0] === 'd') {
						// Allow data-on[eventkey] listeners to stay in the dom, as they
						// won't cause conflicts.
						element.setAttribute(key, fn);
					}
					fn = this.component_.getListenerFn(fn);
				}
				element[handleKey] = _dom2.default.delegate(document, eventName, element, fn);
			} else {
				element.removeAttribute(key);
			}
		};

		IncrementalDomRenderer.prototype.buildChildren_ = function buildChildren_(children) {
			return children.length === 0 ? emptyChildren_ : children;
		};

		IncrementalDomRenderer.prototype.buildShouldUpdateArgs_ = function buildShouldUpdateArgs_() {
			return [this.changes_];
		};

		IncrementalDomRenderer.prototype.clearChanges_ = function clearChanges_() {
			this.changes_ = {};
		};

		IncrementalDomRenderer.finishedRenderingComponent = function finishedRenderingComponent() {
			renderingComponents_.pop();
			if (renderingComponents_.length === 0) {
				_IncrementalDomUnusedComponents2.default.disposeUnused();
			}
		};

		IncrementalDomRenderer.getComponentBeingRendered = function getComponentBeingRendered() {
			return renderingComponents_[renderingComponents_.length - 1];
		};

		IncrementalDomRenderer.getCurrentData = function getCurrentData() {
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
		};

		IncrementalDomRenderer.prototype.getEventFromListenerAttr_ = function getEventFromListenerAttr_(attr) {
			var matches = IncrementalDomRenderer.LISTENER_REGEX.exec(attr);
			var eventName = matches ? matches[1] ? matches[1] : matches[2] : null;
			return eventName ? eventName.toLowerCase() : null;
		};

		IncrementalDomRenderer.prototype.getOwner = function getOwner() {
			return this.owner_;
		};

		IncrementalDomRenderer.prototype.getParent = function getParent() {
			return this.parent_;
		};

		IncrementalDomRenderer.prototype.getSubComponent_ = function getSubComponent_(tagOrCtor, config) {
			var Ctor = tagOrCtor;
			if (_metal.core.isString(Ctor)) {
				Ctor = _component.ComponentRegistry.getConstructor(tagOrCtor);
			}

			var data = IncrementalDomRenderer.getCurrentData();
			var comp;
			if (_metal.core.isDef(config.ref)) {
				comp = this.match_(this.component_.components[config.ref], Ctor, config);
				this.component_.addSubComponent(config.ref, comp);
			} else if (_metal.core.isDef(config.key)) {
				comp = this.match_(data.prevComps.keys[config.key], Ctor, config);
				data.currComps.keys[config.key] = comp;
			} else {
				var type = _metal.core.getUid(Ctor, true);
				data.currComps.order[type] = data.currComps.order[type] || [];
				var order = data.currComps.order[type];
				comp = this.match_((data.prevComps.order[type] || [])[order.length], Ctor, config);
				order.push(comp);
			}

			return comp;
		};

		IncrementalDomRenderer.prototype.guaranteeParent_ = function guaranteeParent_() {
			var element = this.component_.element;
			if (!element || !element.parentNode) {
				var parent = document.createElement('div');
				if (element) {
					_dom2.default.append(parent, element);
				}
				return parent;
			}
		};

		IncrementalDomRenderer.prototype.handleAttached_ = function handleAttached_(data) {
			this.attachData_ = data;
		};

		IncrementalDomRenderer.prototype.handleChildrenCaptured_ = function handleChildrenCaptured_(tree) {
			var _componentToRender_ = this.componentToRender_;
			var config = _componentToRender_.config;
			var tag = _componentToRender_.tag;

			config.children = this.buildChildren_(tree.config.children);
			this.componentToRender_ = null;
			this.renderFromTag_(tag, config);
		};

		IncrementalDomRenderer.prototype.handleChildRender_ = function handleChildRender_(node) {
			if (node.tag && _IncrementalDomUtils2.default.isComponentTag(node.tag)) {
				node.config.children = this.buildChildren_(node.config.children);
				this.renderFromTag_(node.tag, node.config);
				return true;
			}
		};

		IncrementalDomRenderer.prototype.handleDataPropChanged_ = function handleDataPropChanged_(data) {
			this.changes_[data.key] = data;
		};

		IncrementalDomRenderer.prototype.handleInterceptedAttributesCall_ = function handleInterceptedAttributesCall_(originalFn, element, name, value) {
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
				value = _metal.core.isDefAndNotNull(value) && value !== false;
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

			if (_metal.core.isBoolean(value)) {
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
		};

		IncrementalDomRenderer.prototype.handleInterceptedCloseCall_ = function handleInterceptedCloseCall_(originalFn, tag) {
			var element = originalFn(tag);
			this.resetData_(_dom.domData.get(element).incDomData_);
			return element;
		};

		IncrementalDomRenderer.prototype.handleInterceptedOpenCall_ = function handleInterceptedOpenCall_(originalFn, tag) {
			if (_IncrementalDomUtils2.default.isComponentTag(tag)) {
				return this.handleSubComponentCall_.apply(this, arguments);
			} else {
				return this.handleRegularCall_.apply(this, arguments);
			}
		};

		IncrementalDomRenderer.prototype.handleManagerDataPropChanged_ = function handleManagerDataPropChanged_(data) {
			this.handleDataPropChanged_(data);
			_ComponentRenderer.prototype.handleManagerDataPropChanged_.call(this, data);
		};

		IncrementalDomRenderer.prototype.handleRegularCall_ = function handleRegularCall_(originalFn) {
			var currComp = IncrementalDomRenderer.getComponentBeingRendered();
			var currRenderer = currComp.getRenderer();

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (!currRenderer.rootElementReached_ && currRenderer.config_.key) {
				args[1] = currRenderer.config_.key;
			}

			var node = originalFn.apply(null, args);
			this.attachDecoratedListeners_(node, args);
			this.updateElementIfNotReached_(node);
			return node;
		};

		IncrementalDomRenderer.prototype.handleSubComponentCall_ = function handleSubComponentCall_(originalFn) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			var config = _IncrementalDomUtils2.default.buildConfigFromCall(args);
			this.componentToRender_ = {
				config: config,
				tag: args[0]
			};
			_IncrementalDomChildren2.default.capture(this, this.handleChildrenCaptured_);
		};

		IncrementalDomRenderer.prototype.hasDataChanged_ = function hasDataChanged_() {
			return Object.keys(this.changes_).length > 0;
		};

		IncrementalDomRenderer.prototype.intercept_ = function intercept_() {
			_IncrementalDomAop2.default.startInterception({
				attributes: this.handleInterceptedAttributesCall_,
				elementClose: this.handleInterceptedCloseCall_,
				elementOpen: this.handleInterceptedOpenCall_
			});
		};

		IncrementalDomRenderer.isIncDomNode = function isIncDomNode(node) {
			return !!node[_IncrementalDomChildren2.default.CHILD_OWNER];
		};

		IncrementalDomRenderer.prototype.match_ = function match_(comp, Ctor, config) {
			if (!comp || comp.constructor !== Ctor) {
				comp = new Ctor(config, false);
			}
			if (comp.wasRendered) {
				comp.getRenderer().startSkipUpdates();
				comp.getDataManager().replaceNonInternal(config);
				comp.getRenderer().stopSkipUpdates();
			}
			comp.getRenderer().config_ = config;
			return comp;
		};

		IncrementalDomRenderer.prototype.patch = function patch() {
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
				_dom2.default.exitDocument(this.component_.element);
				if (this.component_.element && this.component_.inDocument) {
					this.component_.renderElement_(this.attachData_.parent, this.attachData_.sibling);
				}
			} else {
				var element = this.component_.element;
				IncrementalDOM.patchOuter(element, this.renderInsidePatchDontSkip_);
				if (!this.component_.element) {
					_dom2.default.exitDocument(element);
				}
			}
		};

		IncrementalDomRenderer.render = function render(fnOrCtor, opt_dataOrElement, opt_parent) {
			if (!_component.Component.isComponentCtor(fnOrCtor)) {
				var fn = fnOrCtor;

				var TempComponent = function (_Component) {
					_inherits(TempComponent, _Component);

					function TempComponent() {
						_classCallCheck(this, TempComponent);

						return _possibleConstructorReturn(this, _Component.apply(this, arguments));
					}

					TempComponent.prototype.created = function created() {
						if (IncrementalDomRenderer.getComponentBeingRendered()) {
							this.getRenderer().updateContext_(this);
						}
					};

					TempComponent.prototype.render = function render() {
						fn(this.getRenderer().config_);
					};

					return TempComponent;
				}(_component.Component);

				TempComponent.RENDERER = IncrementalDomRenderer;
				fnOrCtor = TempComponent;
			}
			return _component.Component.render(fnOrCtor, opt_dataOrElement, opt_parent);
		};

		IncrementalDomRenderer.prototype.render = function render() {
			this.patch();
		};

		IncrementalDomRenderer.renderChild = function renderChild(child) {
			child[_IncrementalDomChildren2.default.CHILD_OWNER].renderChild(child);
		};

		IncrementalDomRenderer.prototype.renderChild = function renderChild(child) {
			this.intercept_();
			_IncrementalDomChildren2.default.render(child, this.handleChildRender_);
			_IncrementalDomAop2.default.stopInterception();
		};

		IncrementalDomRenderer.prototype.renderFromTag_ = function renderFromTag_(tag, config) {
			if (_metal.core.isString(tag) || tag.prototype.getRenderer) {
				var comp = this.renderSubComponent_(tag, config);
				this.updateElementIfNotReached_(comp.element);
				return comp.element;
			} else {
				return tag(config);
			}
		};

		IncrementalDomRenderer.prototype.renderIncDom = function renderIncDom() {
			if (this.component_.render) {
				this.component_.render();
			} else {
				IncrementalDOM.elementVoid('div');
			}
		};

		IncrementalDomRenderer.prototype.renderInsidePatch = function renderInsidePatch() {
			if (this.component_.wasRendered && !this.shouldUpdate() && IncrementalDOM.currentPointer() === this.component_.element) {
				if (this.component_.element) {
					IncrementalDOM.skipNode();
				}
				return;
			}
			this.renderInsidePatchDontSkip_();
		};

		IncrementalDomRenderer.prototype.renderInsidePatchDontSkip_ = function renderInsidePatchDontSkip_() {
			IncrementalDomRenderer.startedRenderingComponent(this.component_);
			this.clearChanges_();
			this.rootElementReached_ = false;
			_IncrementalDomUnusedComponents2.default.schedule(this.childComponents_ || []);
			this.childComponents_ = [];
			this.intercept_();
			this.renderIncDom();
			_IncrementalDomAop2.default.stopInterception();
			if (!this.rootElementReached_) {
				this.component_.element = null;
			} else {
				this.component_.addElementClasses();
			}
			this.emit('rendered', !this.isRendered_);
			IncrementalDomRenderer.finishedRenderingComponent();
			this.resetData_(this.incDomData_);
		};

		IncrementalDomRenderer.prototype.renderSubComponent_ = function renderSubComponent_(tagOrCtor, config) {
			var comp = this.getSubComponent_(tagOrCtor, config);
			this.updateContext_(comp);
			var renderer = comp.getRenderer();
			if (renderer instanceof IncrementalDomRenderer) {
				var parentComp = IncrementalDomRenderer.getComponentBeingRendered();
				parentComp.getRenderer().childComponents_.push(comp);
				renderer.parent_ = parentComp;
				renderer.owner_ = this.component_;
				renderer.renderInsidePatch();
			} else {
				console.warn('IncrementalDomRenderer doesn\'t support rendering sub components ' + 'that don\'t use IncrementalDomRenderer as well, like:', comp);
			}
			if (!comp.wasRendered) {
				comp.renderAsSubComponent();
			}
			return comp;
		};

		IncrementalDomRenderer.prototype.resetData_ = function resetData_(data) {
			if (data) {
				data.prevComps.keys = data.currComps.keys;
				data.prevComps.order = data.currComps.order;
				data.currComps.keys = {};
				data.currComps.order = {};
			}
		};

		IncrementalDomRenderer.prototype.shouldUpdate = function shouldUpdate() {
			if (!this.hasDataChanged_()) {
				return false;
			}
			if (this.component_.shouldUpdate) {
				var _component_;

				return (_component_ = this.component_).shouldUpdate.apply(_component_, _toConsumableArray(this.buildShouldUpdateArgs_()));
			}
			return true;
		};

		IncrementalDomRenderer.startedRenderingComponent = function startedRenderingComponent(comp) {
			renderingComponents_.push(comp);
		};

		IncrementalDomRenderer.prototype.update = function update() {
			if (this.shouldUpdate()) {
				this.patch();
			}
		};

		IncrementalDomRenderer.prototype.updateElementIfNotReached_ = function updateElementIfNotReached_(node) {
			var currComp = IncrementalDomRenderer.getComponentBeingRendered();
			var currRenderer = currComp.getRenderer();
			if (!currRenderer.rootElementReached_) {
				currRenderer.rootElementReached_ = true;
				if (currComp.element !== node) {
					currComp.element = node;
				}
			}
		};

		IncrementalDomRenderer.prototype.updateContext_ = function updateContext_(comp) {
			var context = comp.context;
			var parent = IncrementalDomRenderer.getComponentBeingRendered();
			var childContext = parent.getChildContext ? parent.getChildContext() : {};
			_metal.object.mixin(context, parent.context, childContext);
			comp.context = context;
		};

		return IncrementalDomRenderer;
	}(_component.ComponentRenderer);

	var renderingComponents_ = [];
	var emptyChildren_ = [];

	IncrementalDomRenderer.LISTENER_REGEX = /^(?:on([A-Z]\w+))|(?:data-on(\w+))$/;

	exports.default = IncrementalDomRenderer;
});
//# sourceMappingURL=IncrementalDomRenderer.js.map