define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-component/src/all/component', './IncrementalDomAop'], function (exports, _metal, _dom, _component, _IncrementalDomAop) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _IncrementalDomAop2 = _interopRequireDefault(_IncrementalDomAop);

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

	var IncrementalDomRenderer = function (_ComponentRenderer) {
		_inherits(IncrementalDomRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */

		function IncrementalDomRenderer(comp) {
			_classCallCheck(this, IncrementalDomRenderer);

			var _this = _possibleConstructorReturn(this, _ComponentRenderer.call(this, comp));

			_this.changes_ = {};
			_this.eventsCollector_ = new _component.EventsCollector(comp);
			comp.on('stateKeyChanged', _this.handleStateKeyChanged_.bind(_this));
			comp.on('detached', _this.handleDetached_.bind(_this));
			return _this;
		}

		/**
   * Adds all inline listener attributes included in the given config.
   * @param {!Array} listeners
   * @protected
   */


		IncrementalDomRenderer.prototype.addInlineListeners_ = function addInlineListeners_(listeners) {
			for (var i = 0; i < listeners.length; i += 2) {
				var name = listeners[i];
				if (name.startsWith('data-on')) {
					this.listenersToAttach_.push({
						eventName: name.substr(7),
						fn: listeners[i + 1]
					});
				}
			}
		};

		IncrementalDomRenderer.prototype.attachInlineListeners_ = function attachInlineListeners_() {
			this.eventsCollector_.startCollecting();
			for (var i = 0; i < this.listenersToAttach_.length; i++) {
				var listener = this.listenersToAttach_[i];
				this.eventsCollector_.attachListener(listener.eventName, listener.fn);
			}
		};

		IncrementalDomRenderer.prototype.disposeUnusedSubComponents_ = function disposeUnusedSubComponents_() {
			var ids = Object.keys(this.component_.components);
			var unused = [];
			for (var i = 0; i < ids.length; i++) {
				if (!this.subComponentsFound_[ids[i]]) {
					unused.push(ids[i]);
				}
			}
			this.component_.disposeSubComponents(unused);
		};

		IncrementalDomRenderer.prototype.getSubComponent_ = function getSubComponent_(tag, config) {
			var tagOrCtor = tag;
			if (tag === 'Component' && config.ctor) {
				tagOrCtor = config.ctor;
				config = config.data;
			}
			var comp = this.component_.addSubComponent(tagOrCtor, config);

			if (comp.wasRendered) {
				comp.setState(config);
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

		IncrementalDomRenderer.prototype.handleDetached_ = function handleDetached_() {
			this.eventsCollector_.detachAllListeners();
		};

		IncrementalDomRenderer.prototype.handleInterceptedCloseCall_ = function handleInterceptedCloseCall_(originalFn, tag) {
			if (!this.isComponentTag_(tag)) {
				originalFn(tag);
			}
		};

		IncrementalDomRenderer.prototype.handleInterceptedOpenCall_ = function handleInterceptedOpenCall_(originalFn, tag) {
			var node;
			if (this.isComponentTag_(tag)) {
				node = this.handleSubComponentCall_.apply(this, arguments);
			} else {
				node = this.handleRegularCall_.apply(this, arguments);
			}
			return node;
		};

		IncrementalDomRenderer.prototype.handleRegularCall_ = function handleRegularCall_(originalFn, tag, key, statics) {
			var attrsArr = _metal.array.slice(arguments, 4);
			this.addInlineListeners_((statics || []).concat(attrsArr));
			var node = originalFn.apply(null, _metal.array.slice(arguments, 1));
			if (!this.rootElementReached_) {
				this.rootElementReached_ = true;
				if (this.component_.element !== node) {
					this.component_.element = node;
				}
			}
			return node;
		};

		IncrementalDomRenderer.prototype.handleStateKeyChanged_ = function handleStateKeyChanged_(data) {
			if (data.key !== 'element') {
				this.changes_[data.key] = data;
			}
		};

		IncrementalDomRenderer.prototype.handleSubComponentCall_ = function handleSubComponentCall_(originalFn, tag, key, statics) {
			var config = {};
			var attrsArr = (statics || []).concat(_metal.array.slice(arguments, 4));
			for (var i = 0; i < attrsArr.length; i += 2) {
				config[attrsArr[i]] = attrsArr[i + 1];
			}
			var comp = this.renderSubComponent_(tag, config);
			return comp.element;
		};

		IncrementalDomRenderer.prototype.isComponentTag_ = function isComponentTag_(tag) {
			return tag[0] === tag[0].toUpperCase();
		};

		IncrementalDomRenderer.prototype.render = function render() {
			this.patch();
		};

		IncrementalDomRenderer.prototype.renderIncDom = function renderIncDom() {
			IncrementalDOM.elementVoid('div', null, ['id', this.component_.id]);
		};

		IncrementalDomRenderer.prototype.renderWithoutPatch = function renderWithoutPatch() {
			// Mark that there shouldn't be an update for state changes so far, since
			// render has already been called.
			this.changes_ = {};

			this.rootElementReached_ = false;
			this.subComponentsFound_ = {};
			this.listenersToAttach_ = [];
			_IncrementalDomAop2.default.startInterception(this.handleInterceptedOpenCall_.bind(this), this.handleInterceptedCloseCall_.bind(this));
			this.renderIncDom();
			_IncrementalDomAop2.default.stopInterception();
			this.attachInlineListeners_();
		};

		IncrementalDomRenderer.prototype.shouldUpdate = function shouldUpdate() {
			return true;
		};

		IncrementalDomRenderer.prototype.patch = function patch() {
			var tempParent = this.guaranteeParent_();
			if (tempParent) {
				IncrementalDOM.patch(tempParent, this.renderWithoutPatch.bind(this));
				_dom2.default.exitDocument(this.component_.element);
			} else {
				IncrementalDOM.patchOuter(this.component_.element, this.renderWithoutPatch.bind(this));
			}
		};

		IncrementalDomRenderer.prototype.update = function update() {
			var changedKeys = Object.keys(this.changes_);
			if (changedKeys.length > 0 && this.shouldUpdate(this.changes_)) {
				this.patch();
				this.eventsCollector_.detachUnusedListeners();
				this.disposeUnusedSubComponents_();
			}
		};

		IncrementalDomRenderer.prototype.renderSubComponent_ = function renderSubComponent_(tag, config) {
			var comp = this.getSubComponent_(tag, config);
			comp.getRenderer().renderWithoutPatch();
			if (!comp.wasRendered) {
				comp.renderAsSubComponent();
			}
			this.subComponentsFound_[comp.id] = true;
			return comp;
		};

		return IncrementalDomRenderer;
	}(_component.ComponentRenderer);

	IncrementalDomRenderer.prototype.registerMetalComponent && IncrementalDomRenderer.prototype.registerMetalComponent(IncrementalDomRenderer, 'IncrementalDomRenderer')
	exports.default = IncrementalDomRenderer;
});
//# sourceMappingURL=IncrementalDomRenderer.js.map