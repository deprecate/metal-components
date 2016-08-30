define(['exports', 'metal/src/metal', 'metal-events/src/events', 'metal-state/src/all/state'], function (exports, _metal, _events, _state) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _state2 = _interopRequireDefault(_state);

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

	var ComponentDataManager = function (_EventEmitter) {
		_inherits(ComponentDataManager, _EventEmitter);

		/**
   * Constructor for `ComponentDataManager`.
   * @param {!Component} component
   * @param {!Object} data
   */
		function ComponentDataManager(component, data) {
			_classCallCheck(this, ComponentDataManager);

			var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

			_this.component_ = component;

			_metal.core.mergeSuperClassesProperty(_this.constructor, 'BLACKLIST', _metal.array.firstDefinedValue);
			_state2.default.mergeStateStatic(_this.component_.constructor);

			_this.createState_(data, _this.component_);
			return _this;
		}

		/**
   * Adds a state property to the component.
   * @param {string} name
   * @param {!Object} config
   * @param {*} opt_initialValue
   */


		ComponentDataManager.prototype.add = function add() {
			var _state_;

			(_state_ = this.state_).addToState.apply(_state_, arguments);
		};

		ComponentDataManager.prototype.buildStateInstanceData_ = function buildStateInstanceData_(data) {
			return _metal.object.mixin({}, data, this.component_.constructor.STATE_MERGED);
		};

		ComponentDataManager.prototype.createState_ = function createState_(data, holder) {
			var state = new _state2.default({}, holder, this.component_);
			state.setKeysBlacklist_(this.constructor.BLACKLIST_MERGED);
			state.addToState(this.buildStateInstanceData_(data), this.component_.getInitialConfig());

			var listener = this.emit_.bind(this);
			state.on('stateChanged', listener);
			state.on('stateKeyChanged', listener);
			this.state_ = state;

			this.proxy_ = new _events.EventEmitterProxy(state, this.component_);
		};

		ComponentDataManager.prototype.disposeInternal = function disposeInternal() {
			_EventEmitter.prototype.disposeInternal.call(this);

			this.state_.dispose();
			this.state_ = null;

			this.proxy_.dispose();
			this.proxy_ = null;
		};

		ComponentDataManager.prototype.emit_ = function emit_(data, event) {
			var orig = event.type;
			var name = orig === 'stateChanged' ? 'dataChanged' : 'dataPropChanged';
			this.emit(name, data);
		};

		ComponentDataManager.prototype.get = function get(name) {
			return this.state_.get(name);
		};

		ComponentDataManager.prototype.getSyncKeys = function getSyncKeys() {
			return this.state_.getStateKeys();
		};

		ComponentDataManager.prototype.getStateKeys = function getStateKeys() {
			return this.state_.getStateKeys();
		};

		ComponentDataManager.prototype.getState = function getState() {
			return this.state_.getState();
		};

		ComponentDataManager.prototype.getStateInstance = function getStateInstance() {
			return this.state_;
		};

		ComponentDataManager.prototype.replaceNonInternal = function replaceNonInternal(data) {
			ComponentDataManager.replaceNonInternal(data, this.state_);
		};

		ComponentDataManager.replaceNonInternal = function replaceNonInternal(data, state) {
			var keys = state.getStateKeys();
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (!state.getStateKeyConfig(key).internal) {
					if (data.hasOwnProperty(key)) {
						state.set(key, data[key]);
					} else {
						state.setDefaultValue(key);
					}
				}
			}
		};

		ComponentDataManager.prototype.setState = function setState(state, opt_callback) {
			this.state_.setState(state, opt_callback);
		};

		return ComponentDataManager;
	}(_events.EventEmitter);

	ComponentDataManager.BLACKLIST = {
		components: true,
		element: true,
		wasRendered: true
	};

	exports.default = ComponentDataManager;
});
//# sourceMappingURL=ComponentDataManager.js.map