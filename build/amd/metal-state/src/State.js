define(['exports', 'metal/src/metal', 'metal-events/src/events'], function (exports, _metal, _events) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var State = function (_EventEmitter) {
		_inherits(State, _EventEmitter);

		/**
   * Constructor function for `State`.
   * @param {Object=} opt_config Optional config object with initial values to
   *     set state properties to.
   * @param {Object=} opt_obj Optional object that should hold the state
   *     properties. If none is given, they will be added directly to `this`
   *     instead.
   * @param {Object=} opt_context Optional context to call functions (like
   *     validators and setters) on. Defaults to `this`.
   * @param {Object=} opt_commonOpts Optional common option values to be used
   *     by all this instance's state properties.
   */
		function State(opt_config, opt_obj, opt_context, opt_commonOpts) {
			_classCallCheck(this, State);

			var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this));

			/**
    * Common option values to be used by all this instance's state properties.
    * @type {Object}
    * @protected
    */
			_this.commonOpts_ = opt_commonOpts;

			/**
    * Context to call functions (like validators and setters) on.
    * @type {!Object}
    * @protected
    */
			_this.context_ = opt_context || _this;

			/**
    * Map of keys that can not be used as state keys.
    * @type {!Object<string, boolean>}
    * @protected
    */
			_this.keysBlacklist_ = {};

			/**
    * Object that should hold the state properties.
    * @type {!Object}
    * @protected
    */
			_this.obj_ = opt_obj || _this;

			/**
    * Object with information about the batch event that is currently
    * scheduled, or null if none is.
    * @type {Object}
    * @protected
    */
			_this.scheduledBatchData_ = null;

			/**
    * Object that contains information about all this instance's state keys.
    * @type {!Object<string, !Object>}
    * @protected
    */
			_this.stateInfo_ = {};

			_this.setShouldUseFacade(true);
			_this.mergeInvalidKeys_();
			_this.addToStateFromStaticHint_(opt_config);
			return _this;
		}

		/**
   * Adds the given key to the state.
   * @param {string} name The name of the new state key.
   * @param {Object.<string, *>=} config The configuration object for the new
   *     key. See `addToState` for supported settings.
   * @param {*} initialValue The initial value of the new key.
   */


		_createClass(State, [{
			key: 'addKeyToState',
			value: function addKeyToState(name, config, initialValue) {
				this.buildKeyInfo_(name, config, initialValue, arguments.length > 2);
				Object.defineProperty(this.obj_, name, this.buildKeyPropertyDef_(name));
				this.validateInitialValue_(name);
				this.assertGivenIfRequired_(name);
			}
		}, {
			key: 'addToState',
			value: function addToState(configsOrName, opt_initialValuesOrConfig, opt_contextOrInitialValue) {
				if ((0, _metal.isString)(configsOrName)) {
					return this.addKeyToState.apply(this, arguments);
				}

				var initialValues = opt_initialValuesOrConfig || {};
				var names = Object.keys(configsOrName);

				var props = {};
				for (var i = 0; i < names.length; i++) {
					var name = names[i];
					this.buildKeyInfo_(name, configsOrName[name], initialValues[name], initialValues.hasOwnProperty(name));
					props[name] = this.buildKeyPropertyDef_(name, opt_contextOrInitialValue);
					this.assertGivenIfRequired_(name);
				}

				if (opt_contextOrInitialValue !== false) {
					Object.defineProperties(opt_contextOrInitialValue || this.obj_, props);
				}

				// Validate initial values after all properties have been defined, otherwise
				// it won't be possible to access those properties within validators.
				for (var _i = 0; _i < names.length; _i++) {
					this.validateInitialValue_(names[_i]);
				}
			}
		}, {
			key: 'addToStateFromStaticHint_',
			value: function addToStateFromStaticHint_(opt_config) {
				var ctor = this.constructor;
				var defineContext;
				var merged = State.mergeStateStatic(ctor);
				if (this.obj_ === this) {
					defineContext = merged ? ctor.prototype : false;
				}
				this.addToState(ctor.STATE_MERGED, opt_config, defineContext);
			}
		}, {
			key: 'assertGivenIfRequired_',
			value: function assertGivenIfRequired_(name) {
				var info = this.stateInfo_[name];
				if (info.config.required) {
					var value = info.state === State.KeyStates.INITIALIZED ? this.get(name) : info.initialValue;
					if (!(0, _metal.isDefAndNotNull)(value)) {
						console.error('The property called "' + name + '" is required but didn\'t ' + 'receive a value.');
					}
				}
			}
		}, {
			key: 'assertValidStateKeyName_',
			value: function assertValidStateKeyName_(name) {
				if (this.constructor.INVALID_KEYS_MERGED[name] || this.keysBlacklist_[name]) {
					throw new Error('It\'s not allowed to create a state key with the name "' + name + '".');
				}
			}
		}, {
			key: 'buildKeyInfo_',
			value: function buildKeyInfo_(name, config, initialValue, hasInitialValue) {
				this.assertValidStateKeyName_(name);
				config = config && config.config ? config.config : config || {};
				if (this.commonOpts_) {
					config = _metal.object.mixin({}, config, this.commonOpts_);
				}
				this.stateInfo_[name] = {
					config: config,
					state: State.KeyStates.UNINITIALIZED
				};
				if (hasInitialValue) {
					this.stateInfo_[name].initialValue = initialValue;
				}
			}
		}, {
			key: 'buildKeyPropertyDef_',
			value: function buildKeyPropertyDef_(name, opt_context) {
				var stateObj = opt_context === this.constructor.prototype ? null : this;
				return {
					configurable: true,
					enumerable: true,
					get: function get() {
						return (stateObj || this).getStateKeyValue_(name);
					},
					set: function set(val) {
						(stateObj || this).setStateKeyValue_(name, val);
					}
				};
			}
		}, {
			key: 'callFunction_',
			value: function callFunction_(fn, args) {
				if ((0, _metal.isString)(fn)) {
					return this.context_[fn].apply(this.context_, args);
				} else if ((0, _metal.isFunction)(fn)) {
					return fn.apply(this.context_, args);
				}
			}
		}, {
			key: 'callSetter_',
			value: function callSetter_(name, value, currentValue) {
				var info = this.stateInfo_[name];
				var config = info.config;
				if (config.setter) {
					value = this.callFunction_(config.setter, [value, currentValue]);
				}
				return value;
			}
		}, {
			key: 'callValidator_',
			value: function callValidator_(name, value) {
				var info = this.stateInfo_[name];
				var config = info.config;
				if (config.validator) {
					var validatorReturn = this.callFunction_(config.validator, [value, name, this.context_]);

					if (validatorReturn instanceof Error) {
						console.error('Warning: ' + validatorReturn);
					}
					return validatorReturn;
				}
				return true;
			}
		}, {
			key: 'canSetState',
			value: function canSetState(name) {
				var info = this.stateInfo_[name];
				return !info.config.writeOnce || !info.written;
			}
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				_get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'disposeInternal', this).call(this);
				this.stateInfo_ = null;
				this.scheduledBatchData_ = null;
			}
		}, {
			key: 'emitBatchEvent_',
			value: function emitBatchEvent_() {
				if (!this.isDisposed()) {
					var data = this.scheduledBatchData_;
					this.scheduledBatchData_ = null;
					this.emit('stateChanged', data);
				}
			}
		}, {
			key: 'get',
			value: function get(name) {
				return this.obj_[name];
			}
		}, {
			key: 'getState',
			value: function getState(opt_names) {
				var state = {};
				var names = opt_names || this.getStateKeys();

				for (var i = 0; i < names.length; i++) {
					state[names[i]] = this.get(names[i]);
				}

				return state;
			}
		}, {
			key: 'getStateKeyConfig',
			value: function getStateKeyConfig(name) {
				return (this.stateInfo_[name] || {}).config;
			}
		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.stateInfo_ ? Object.keys(this.stateInfo_) : [];
			}
		}, {
			key: 'getStateKeyValue_',
			value: function getStateKeyValue_(name) {
				if (!this.warnIfDisposed_(name)) {
					this.initStateKey_(name);
					return this.stateInfo_[name].value;
				}
			}
		}, {
			key: 'hasBeenSet',
			value: function hasBeenSet(name) {
				var info = this.stateInfo_[name];
				return info.state === State.KeyStates.INITIALIZED || this.hasInitialValue_(name);
			}
		}, {
			key: 'hasInitialValue_',
			value: function hasInitialValue_(name) {
				return this.stateInfo_[name].hasOwnProperty('initialValue');
			}
		}, {
			key: 'hasStateKey',
			value: function hasStateKey(key) {
				if (!this.warnIfDisposed_(key)) {
					return !!this.stateInfo_[key];
				}
			}
		}, {
			key: 'informChange_',
			value: function informChange_(name, prevVal) {
				if (this.shouldInformChange_(name, prevVal)) {
					var data = {
						key: name,
						newVal: this.get(name),
						prevVal: prevVal
					};
					this.emit(name + 'Changed', data);
					this.emit('stateKeyChanged', data);
					this.scheduleBatchEvent_(data);
				}
			}
		}, {
			key: 'initStateKey_',
			value: function initStateKey_(name) {
				var info = this.stateInfo_[name];
				if (info.state !== State.KeyStates.UNINITIALIZED) {
					return;
				}

				info.state = State.KeyStates.INITIALIZING;
				this.setInitialValue_(name);
				if (!info.written) {
					this.setDefaultValue(name);
				}
				info.state = State.KeyStates.INITIALIZED;
			}
		}, {
			key: 'mergeInvalidKeys_',
			value: function mergeInvalidKeys_() {
				(0, _metal.mergeSuperClassesProperty)(this.constructor, 'INVALID_KEYS', function (values) {
					return _metal.array.flatten(values).reduce(function (merged, val) {
						if (val) {
							merged[val] = true;
						}
						return merged;
					}, {});
				});
			}
		}, {
			key: 'removeStateKey',
			value: function removeStateKey(name) {
				this.stateInfo_[name] = null;
				delete this.obj_[name];
			}
		}, {
			key: 'scheduleBatchEvent_',
			value: function scheduleBatchEvent_(changeData) {
				if (!this.scheduledBatchData_) {
					_metal.async.nextTick(this.emitBatchEvent_, this);
					this.scheduledBatchData_ = {
						changes: {}
					};
				}

				var name = changeData.key;
				var changes = this.scheduledBatchData_.changes;
				if (changes[name]) {
					changes[name].newVal = changeData.newVal;
				} else {
					changes[name] = changeData;
				}
			}
		}, {
			key: 'set',
			value: function set(name, value) {
				if (this.hasStateKey(name)) {
					this.obj_[name] = value;
				}
			}
		}, {
			key: 'setDefaultValue',
			value: function setDefaultValue(name) {
				var config = this.stateInfo_[name].config;

				if (config.value !== undefined) {
					this.set(name, config.value);
				} else {
					this.set(name, this.callFunction_(config.valueFn));
				}
			}
		}, {
			key: 'setInitialValue_',
			value: function setInitialValue_(name) {
				if (this.hasInitialValue_(name)) {
					var info = this.stateInfo_[name];
					this.set(name, info.initialValue);
					info.initialValue = undefined;
				}
			}
		}, {
			key: 'setKeysBlacklist_',
			value: function setKeysBlacklist_(blacklist) {
				this.keysBlacklist_ = blacklist;
			}
		}, {
			key: 'setState',
			value: function setState(values, opt_callback) {
				var _this2 = this;

				Object.keys(values).forEach(function (name) {
					return _this2.set(name, values[name]);
				});
				if (opt_callback && this.scheduledBatchData_) {
					this.once('stateChanged', opt_callback);
				}
			}
		}, {
			key: 'setStateKeyValue_',
			value: function setStateKeyValue_(name, value) {
				if (this.warnIfDisposed_(name) || !this.canSetState(name) || !this.validateKeyValue_(name, value)) {
					return;
				}

				var info = this.stateInfo_[name];
				if (!this.hasInitialValue_(name) && info.state === State.KeyStates.UNINITIALIZED) {
					info.state = State.KeyStates.INITIALIZED;
				}

				var prevVal = this.get(name);
				info.value = this.callSetter_(name, value, prevVal);
				this.assertGivenIfRequired_(name);
				info.written = true;
				this.informChange_(name, prevVal);
			}
		}, {
			key: 'shouldInformChange_',
			value: function shouldInformChange_(name, prevVal) {
				var info = this.stateInfo_[name];
				return info.state === State.KeyStates.INITIALIZED && ((0, _metal.isObject)(prevVal) || prevVal !== this.get(name));
			}
		}, {
			key: 'validateInitialValue_',
			value: function validateInitialValue_(name) {
				var info = this.stateInfo_[name];
				if (this.hasInitialValue_(name) && !this.callValidator_(name, info.initialValue)) {
					delete info.initialValue;
				}
			}
		}, {
			key: 'validateKeyValue_',
			value: function validateKeyValue_(name, value) {
				var info = this.stateInfo_[name];

				return info.state === State.KeyStates.INITIALIZING || this.callValidator_(name, value);
			}
		}, {
			key: 'warnIfDisposed_',
			value: function warnIfDisposed_(name) {
				var disposed = this.isDisposed();
				if (disposed) {
					console.warn('Error. Trying to access property "' + name + '" on disposed instance');
				}
				return disposed;
			}
		}], [{
			key: 'mergeState',
			value: function mergeState(values) {
				return _metal.object.mixin.apply(null, [{}].concat(values.reverse()));
			}
		}, {
			key: 'mergeStateStatic',
			value: function mergeStateStatic(ctor) {
				return (0, _metal.mergeSuperClassesProperty)(ctor, 'STATE', State.mergeState);
			}
		}]);

		return State;
	}(_events.EventEmitter);

	/**
  * A list with state key names that will automatically be rejected as invalid.
  * Subclasses can define their own invalid keys by setting this static on their
  * constructors, which will be merged together and handled automatically.
  * @type {!Array<string>}
  */
	State.INVALID_KEYS = ['state', 'stateKey'];

	/**
  * Constants that represent the states that a state key can be in.
  * @type {!Object}
  */
	State.KeyStates = {
		UNINITIALIZED: 0,
		INITIALIZING: 1,
		INITIALIZED: 2
	};

	exports.default = State;
});
//# sourceMappingURL=State.js.map