define(['exports', 'metal-events/src/events'], function (exports, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
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

	var ComponentRenderer = function (_EventEmitter) {
		_inherits(ComponentRenderer, _EventEmitter);

		/**
   * Constructor function for `ComponentRenderer`.
   * @param {!Component} component The component that this renderer is
   *     responsible for.
   */
		function ComponentRenderer(component) {
			_classCallCheck(this, ComponentRenderer);

			var _this = _possibleConstructorReturn(this, (ComponentRenderer.__proto__ || Object.getPrototypeOf(ComponentRenderer)).call(this));

			_this.component_ = component;

			_this.componentRendererEvents_ = new _events.EventHandler();
			_this.componentRendererEvents_.add(_this.component_.once('render', _this.render.bind(_this)));
			_this.on('rendered', _this.handleRendered_);
			component.on('dataManagerCreated', _this.handleDataManagerCreated_.bind(_this));
			return _this;
		}

		/**
   * @inheritDoc
   */


		_createClass(ComponentRenderer, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.componentRendererEvents_.removeAllListeners();
				this.componentRendererEvents_ = null;
			}
		}, {
			key: 'getComponent',
			value: function getComponent() {
				return this.component_;
			}
		}, {
			key: 'handleDataManagerCreated_',
			value: function handleDataManagerCreated_() {
				var manager = this.component_.getDataManager();
				if (this.component_.constructor.SYNC_UPDATES_MERGED) {
					this.componentRendererEvents_.add(manager.on('dataPropChanged', this.handleManagerDataPropChanged_.bind(this)));
				} else {
					this.componentRendererEvents_.add(manager.on('dataChanged', this.handleManagerDataChanged_.bind(this)));
				}
			}
		}, {
			key: 'handleManagerDataChanged_',
			value: function handleManagerDataChanged_(changes) {
				if (this.shouldRerender_()) {
					this.update(changes);
				}
			}
		}, {
			key: 'handleManagerDataPropChanged_',
			value: function handleManagerDataPropChanged_(data) {
				if (this.shouldRerender_()) {
					this.update({
						changes: _defineProperty({}, data.key, data)
					});
				}
			}
		}, {
			key: 'handleRendered_',
			value: function handleRendered_() {
				this.isRendered_ = true;
			}
		}, {
			key: 'render',
			value: function render() {
				if (!this.component_.element) {
					this.component_.element = document.createElement('div');
				}
				this.emit('rendered', !this.isRendered_);
			}
		}, {
			key: 'shouldRerender_',
			value: function shouldRerender_() {
				return this.isRendered_ && !this.skipUpdates_;
			}
		}, {
			key: 'startSkipUpdates',
			value: function startSkipUpdates() {
				this.skipUpdates_ = true;
			}
		}, {
			key: 'stopSkipUpdates',
			value: function stopSkipUpdates() {
				this.skipUpdates_ = false;
			}
		}, {
			key: 'update',
			value: function update() {}
		}]);

		return ComponentRenderer;
	}(_events.EventEmitter);

	exports.default = ComponentRenderer;
});
//# sourceMappingURL=ComponentRenderer.js.map