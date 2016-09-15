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

		function State(opt_config) {
			_classCallCheck(this, State);

			var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this));

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
				this.buildKeyInfo_(name, config, initialValue);
				Object.defineProperty(this, name, this.buildKeyPropertyDef_(name));
			}
		}, {
			key: 'addToState',
			value: function addToState(configsOrName, opt_initialValuesOrConfig, opt_contextOrInitialValue) {
				if (_metal.core.isString(configsOrName)) {
					return this.addKeyToState(configsOrName, opt_initialValuesOrConfig, opt_contextOrInitialValue);
				}

				var initialValues = opt_initialValuesOrConfig || {};
				var names = Object.keys(configsOrName);

				var props = {};
				for (var i = 0; i < names.length; i++) {
					var name = names[i];
					this.buildKeyInfo_(name, configsOrName[name], initialValues[name]);
					props[name] = this.buildKeyPropertyDef_(name);
				}

				if (opt_contextOrInitialValue !== false) {
					Object.defineProperties(opt_contextOrInitialValue || this, props);
				}
			}
		}, {
			key: 'addToStateFromStaticHint_',
			value: function addToStateFromStaticHint_(opt_config) {
				var ctor = this.constructor;
				var defineContext = false;
				if (State.mergeStateStatic(ctor)) {
					defineContext = ctor.prototype;
				}
				this.addToState(ctor.STATE_MERGED, opt_config, defineContext);
			}
		}, {
			key: 'assertValidStateKeyName_',
			value: function assertValidStateKeyName_(name) {
				if (this.constructor.INVALID_KEYS_MERGED[name]) {
					throw new Error('It\'s not allowed to create a state key with the name "' + name + '".');
				}
			}
		}, {
			key: 'buildKeyInfo_',
			value: function buildKeyInfo_(name, config, initialValue) {
				this.assertValidStateKeyName_(name);

				this.stateInfo_[name] = {
					config: config || {},
					initialValue: initialValue,
					state: State.KeyStates.UNINITIALIZED
				};
			}
		}, {
			key: 'buildKeyPropertyDef_',
			value: function buildKeyPropertyDef_(name) {
				return {
					configurable: true,
					enumerable: true,
					get: function get() {
						return this.getStateKeyValue_(name);
					},
					set: function set(val) {
						this.setStateKeyValue_(name, val);
					}
				};
			}
		}, {
			key: 'callFunction_',
			value: function callFunction_(fn, args) {
				if (_metal.core.isString(fn)) {
					return this[fn].apply(this, args);
				} else if (_metal.core.isFunction(fn)) {
					return fn.apply(this, args);
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
					var validatorReturn = this.callFunction_(config.validator, [value, name, this]);

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
				return this[name];
			}
		}, {
			key: 'getState',
			value: function getState(opt_names) {
				var state = {};
				var names = opt_names || this.getStateKeys();

				for (var i = 0; i < names.length; i++) {
					state[names[i]] = this[names[i]];
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
				return Object.keys(this.stateInfo_);
			}
		}, {
			key: 'getStateKeyValue_',
			value: function getStateKeyValue_(name) {
				this.initStateKey_(name);
				return this.stateInfo_[name].value;
			}
		}, {
			key: 'hasBeenSet',
			value: function hasBeenSet(name) {
				var info = this.stateInfo_[name];
				return info.state === State.KeyStates.INITIALIZED || info.initialValue;
			}
		}, {
			key: 'hasStateKey',
			value: function hasStateKey(key) {
				return !!this.stateInfo_[key];
			}
		}, {
			key: 'informChange_',
			value: function informChange_(name, prevVal) {
				if (this.shouldInformChange_(name, prevVal)) {
					var data = {
						key: name,
						newVal: this[name],
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
					info.state = State.KeyStates.INITIALIZING_DEFAULT;
					this.setDefaultValue_(name);
				}
				info.state = State.KeyStates.INITIALIZED;
			}
		}, {
			key: 'mergeInvalidKeys_',
			value: function mergeInvalidKeys_() {
				_metal.core.mergeSuperClassesProperty(this.constructor, 'INVALID_KEYS', function (values) {
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
				delete this[name];
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
					this[name] = value;
				}
			}
		}, {
			key: 'setDefaultValue_',
			value: function setDefaultValue_(name) {
				var config = this.stateInfo_[name].config;

				if (config.value !== undefined) {
					this[name] = config.value;
				} else {
					this[name] = this.callFunction_(config.valueFn);
				}
			}
		}, {
			key: 'setInitialValue_',
			value: function setInitialValue_(name) {
				var info = this.stateInfo_[name];
				if (info.initialValue !== undefined) {
					this[name] = info.initialValue;
					info.initialValue = undefined;
				}
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
				if (!this.canSetState(name) || !this.validateKeyValue_(name, value)) {
					return;
				}

				var info = this.stateInfo_[name];
				if (info.initialValue === undefined && info.state === State.KeyStates.UNINITIALIZED) {
					info.state = State.KeyStates.INITIALIZED;
				}

				var prevVal = this[name];
				info.value = this.callSetter_(name, value, prevVal);
				info.written = true;
				this.informChange_(name, prevVal);
			}
		}, {
			key: 'shouldInformChange_',
			value: function shouldInformChange_(name, prevVal) {
				var info = this.stateInfo_[name];
				return info.state === State.KeyStates.INITIALIZED && (_metal.core.isObject(prevVal) || prevVal !== this[name]);
			}
		}, {
			key: 'validateKeyValue_',
			value: function validateKeyValue_(name, value) {
				var info = this.stateInfo_[name];

				return info.state === State.KeyStates.INITIALIZING_DEFAULT || this.callValidator_(name, value);
			}
		}], [{
			key: 'mergeState_',
			value: function mergeState_(values) {
				return _metal.object.mixin.apply(null, [{}].concat(values.reverse()));
			}
		}, {
			key: 'mergeStateStatic',
			value: function mergeStateStatic(ctor) {
				return _metal.core.mergeSuperClassesProperty(ctor, 'STATE', State.mergeState_);
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
  * Constants that represent the states that an a state key can be in.
  * @type {!Object}
  */
	State.KeyStates = {
		UNINITIALIZED: 0,
		INITIALIZING: 1,
		INITIALIZING_DEFAULT: 2,
		INITIALIZED: 3
	};

	exports.default = State;
});
//# sourceMappingURL=State.js.map