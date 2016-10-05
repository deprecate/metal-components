define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', './Datatable.soy.js', 'metal-component/src/all/component', 'metal-keyboard-focus/src/KeyboardFocusManager', 'metal-soy/src/Soy', 'metal-useragent/src/UA', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _metal, _dom, _DatatableSoy, _component, _KeyboardFocusManager, _Soy, _UA, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _dom2 = _interopRequireDefault(_dom);

	var _DatatableSoy2 = _interopRequireDefault(_DatatableSoy);

	var _component2 = _interopRequireDefault(_component);

	var _KeyboardFocusManager2 = _interopRequireDefault(_KeyboardFocusManager);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _UA2 = _interopRequireDefault(_UA);

	var _JQueryAdapter2 = _interopRequireDefault(_JQueryAdapter);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

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

	var Datatable = function (_Component) {
		_inherits(Datatable, _Component);

		function Datatable() {
			_classCallCheck(this, Datatable);

			return _possibleConstructorReturn(this, (Datatable.__proto__ || Object.getPrototypeOf(Datatable)).apply(this, arguments));
		}

		_createClass(Datatable, [{
			key: 'assertNoMixedTypesInArrays_',
			value: function assertNoMixedTypesInArrays_(value) {
				var _this2 = this;

				var lastType;
				var acceptArray = function acceptArray(v) {
					var type = _this2.getValueType_(v);
					_this2.assertSameTypes_(lastType, type);
					lastType = type;
					_this2.assertNoMixedTypesInArrays_(v);
				};
				var acceptObject = function acceptObject(v) {
					return _this2.assertNoMixedTypesInArrays_(v);
				};
				this.visit_(value, acceptArray, acceptObject);
			}
		}, {
			key: 'assertSameTypes_',
			value: function assertSameTypes_(type1, type2) {
				if (type1 && type2 && type1 !== type2) {
					throw new Error('Datatable does not support mixed types in arrays.');
				}
			}
		}, {
			key: 'attached',
			value: function attached() {
				this.keyboardFocusManager_ = new _KeyboardFocusManager2.default(this, 'td,th').setFocusHandler(this.handleNextFocus_.bind(this)).start();
			}
		}, {
			key: 'buildRef_',
			value: function buildRef_(prefix, row, col) {
				return prefix + row + '-' + col;
			}
		}, {
			key: 'buildRefLastColumn_',
			value: function buildRefLastColumn_(event, data) {
				var element = event.delegateTarget;
				var cellLength = parseInt(element.getAttribute('data-cols'), 10);
				return this.buildRef_(data.prefix, data.row, cellLength - 1);
			}
		}, {
			key: 'buildRefLastRow_',
			value: function buildRefLastRow_(event, data) {
				var element = event.delegateTarget.parentNode;
				var rowLength = parseInt(element.getAttribute('data-rows'), 10);
				return this.buildRef_(data.prefix, rowLength - 1, data.col);
			}
		}, {
			key: 'collectColumnsFromArrayValues_',
			value: function collectColumnsFromArrayValues_(expandedValue) {
				var _this3 = this;

				var value = expandedValue.value;
				var isFirstArrayItemObject = value[0] && value[0].type === Datatable.TYPES.OBJECT;
				if (isFirstArrayItemObject) {
					(function () {
						var columns = {};
						var columnsType = {};
						value.forEach(function (item) {
							return Object.keys(item.value).forEach(function (key) {
								columns[key] = true;
								columnsType[key] = item.value[key].type;
							});
						});
						expandedValue.columns = _this3.formatColumns(Object.keys(columns));
						expandedValue.columnsType = _this3.formatColumnsType(columnsType);
					})();
				}
			}
		}, {
			key: 'collectColumnsFromObjectKeys_',
			value: function collectColumnsFromObjectKeys_(expandedValue) {
				var value = expandedValue.value;
				var columns = {};
				var columnsType = {};
				Object.keys(value).forEach(function (key) {
					columns[key] = true;
					columnsType[key] = value[key].type;
				});
				expandedValue.columns = this.formatColumns(Object.keys(columns));
				expandedValue.columnsType = this.formatColumnsType(columnsType);
			}
		}, {
			key: 'collectColumnsFromValues_',
			value: function collectColumnsFromValues_(expandedValue) {
				switch (expandedValue.type) {
					case Datatable.TYPES.ARRAY:
						this.collectColumnsFromArrayValues_(expandedValue);
						break;
					case Datatable.TYPES.OBJECT:
						this.collectColumnsFromObjectKeys_(expandedValue);
						break;
				}
			}
		}, {
			key: 'disposed',
			value: function disposed() {
				if (this.keyboardFocusManager_) {
					this.keyboardFocusManager_.dispose();
					this.keyboardFocusManager_ = null;
				}
			}
		}, {
			key: 'extractDataFromRef_',
			value: function extractDataFromRef_(ref) {
				var matches = Datatable.REF_REGEX.exec(ref);
				return {
					col: parseInt(matches[2], 10),
					prefix: ref.substr(0, ref.length - matches[0].length),
					row: parseInt(matches[1], 10)
				};
			}
		}, {
			key: 'getValueType_',
			value: function getValueType_(value) {
				if (value === null) {
					return Datatable.TYPES.NULL;
				}
				if (value === undefined) {
					return Datatable.TYPES.UNDEFINED;
				}
				if (Array.isArray(value)) {
					return Datatable.TYPES.ARRAY;
				}
				if (_metal2.default.isObject(value) && value.contentKind === 'HTML') {
					return Datatable.TYPES.STRING;
				}
				return typeof value === 'undefined' ? 'undefined' : _typeof(value);
			}
		}, {
			key: 'handleClickToggle_',
			value: function handleClickToggle_(event) {
				this.toggleTableContents(event.delegateTarget);
			}
		}, {
			key: 'handleDownArrowKey_',
			value: function handleDownArrowKey_(event, data) {
				if (event.metaKey && _UA2.default.isMac) {
					return this.buildRefLastRow_(event, data);
				} else {
					return this.buildRef_(data.prefix, data.row + 1, data.col);
				}
			}
		}, {
			key: 'handleEnterKey_',
			value: function handleEnterKey_(event, data) {
				var ref = this.buildRef_(data.prefix, data.row, data.col) + '-label';
				if (this.refs[ref]) {
					this.toggleTableContents(this.refs[ref]);
				}
				event.stopPropagation();
			}
		}, {
			key: 'handleKeydownToggle_',
			value: function handleKeydownToggle_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.toggleTableContents(event.delegateTarget);
				}
			}
		}, {
			key: 'handleLeftArrowKey_',
			value: function handleLeftArrowKey_(event, data) {
				if (event.metaKey && _UA2.default.isMac) {
					return this.buildRef_(data.prefix, data.row, 0);
				}
				return true;
			}
		}, {
			key: 'handleRightArrowKey_',
			value: function handleRightArrowKey_(event, data) {
				if (event.metaKey && _UA2.default.isMac) {
					return this.buildRefLastColumn_(event, data);
				}
				return true;
			}
		}, {
			key: 'handleUpArrowKey_',
			value: function handleUpArrowKey_(event, data) {
				if (event.metaKey && _UA2.default.isMac) {
					return this.buildRef_(data.prefix, 0, data.col);
				} else {
					return this.buildRef_(data.prefix, data.row - 1, data.col);
				}
			}
		}, {
			key: 'handleNextFocusData_',
			value: function handleNextFocusData_(event, data) {
				switch (event.keyCode) {
					case 13:
					case 32:
						return this.handleEnterKey_(event, data);
					case 33:
						return this.buildRef_(data.prefix, 0, data.col);
					case 34:
						return this.buildRefLastRow_(event, data);
					case 35:
						return this.buildRefLastColumn_(event, data);
					case 36:
						return this.buildRef_(data.prefix, data.row, 0);
					case 37:
						return this.handleLeftArrowKey_(event, data);
					case 38:
						return this.handleUpArrowKey_(event, data);
					case 39:
						return this.handleRightArrowKey_(event, data);
					case 40:
						return this.handleDownArrowKey_(event, data);
				}
			}
		}, {
			key: 'handleNextFocus_',
			value: function handleNextFocus_(event) {
				var ref = event.delegateTarget.getAttribute('ref');
				var data = this.extractDataFromRef_(ref);
				var returnValue = this.handleNextFocusData_(event, data);
				if (returnValue) {
					event.preventDefault();
					event.stopPropagation();
				}
				return returnValue;
			}
		}, {
			key: 'isAlreadyExpanded',
			value: function isAlreadyExpanded(data) {
				return _metal2.default.isObject(data) && 'columns' in data && 'type' in data;
			}
		}, {
			key: 'setData_',
			value: function setData_(data) {
				if (!this.isAlreadyExpanded(data)) {
					this.assertNoMixedTypesInArrays_(data);
					data = this.visitValuesAndExpandType_(data);
				}
				return this.visitValuesAndWrapStringValues_(data);
			}
		}, {
			key: 'toggleTableContents',
			value: function toggleTableContents(label) {
				_dom2.default.toggleClasses(label, this.labelClasses);
				_dom2.default.toggleClasses(_dom2.default.next(label, 'table'), this.hiddenClasses);
			}
		}, {
			key: 'visit_',
			value: function visit_(value, acceptArray, acceptObject) {
				switch (this.getValueType_(value)) {
					case Datatable.TYPES.ARRAY:
						value.forEach(function (v, k) {
							return acceptArray(v, k, value);
						});
						break;
					case Datatable.TYPES.OBJECT:
						Object.keys(value).forEach(function (k) {
							return acceptObject(value[k], k, value);
						});
						break;
				}
			}
		}, {
			key: 'visitValuesAndExpandType_',
			value: function visitValuesAndExpandType_(value) {
				var _this4 = this;

				var acceptArray = function acceptArray(val, key, reference) {
					return reference[key] = _this4.visitValuesAndExpandType_(val);
				};
				var acceptObject = function acceptObject(val, key, reference) {
					return reference[key] = _this4.visitValuesAndExpandType_(val);
				};
				this.visit_(value, acceptArray, acceptObject);
				var type = this.getValueType_(value);
				var expanded = {
					type: type,
					value: value
				};
				this.collectColumnsFromValues_(expanded);
				return expanded;
			}
		}, {
			key: 'visitValuesAndWrapStringValues_',
			value: function visitValuesAndWrapStringValues_(value) {
				var _this5 = this;

				var acceptArray = function acceptArray(val, key, reference) {
					return reference[key] = _this5.visitValuesAndWrapStringValues_(val);
				};
				var acceptObject = function acceptObject(val, key, reference) {
					return reference[key] = _this5.visitValuesAndWrapStringValues_(val);
				};
				this.visit_(value, acceptArray, acceptObject);
				if (_metal2.default.isObject(value)) {
					var type = this.getValueType_(value.value);
					if (type === Datatable.TYPES.STRING) {
						value.value = _Soy2.default.toIncDom(value.value);
					}
				}
				return value;
			}
		}]);

		return Datatable;
	}(_component2.default);

	_Soy2.default.register(Datatable, _DatatableSoy2.default);

	Datatable.STATE = {
		/**
   * Data to be plotted on datatable. Any JSON type is supported if it does
   * not contain mixed types inside an array.
   * @type {*}
   */
		data: {
			setter: 'setData_'
		},

		/**
   * If true displays types in column.
   * @type {boolean}
   * @default true
   */
		displayColumnsType: {
			validator: _metal2.default.isBoolean,
			value: true
		},

		/**
   * Formats array of columns extracted from JSON data. Relevant for operates
   * over column values, such as sorting and formatting.
   * @type {function(array.<string>)}
   */
		formatColumns: {
			validator: _metal2.default.isFunction,
			value: function value(columns) {
				return columns.sort();
			}
		},

		/**
   * Formats map of columns type extracted from JSON data. Relevant for
   * operates over column values, such as sorting and formatting.
   * @type {function(map.<string,string>)}
   */
		formatColumnsType: {
			validator: _metal2.default.isFunction,
			value: function value(columnstype) {
				return columnstype;
			}
		},

		/**
   * Css classes to be used for hidden state.
   * @type {string}
   * @default 'hidden'
   */
		hiddenClasses: {
			validator: _metal2.default.isString,
			value: 'hidden'
		},

		/**
   * Css classes to be used for labels.
   * @type {string}
   * @default 'collapsed expanded'
   */
		labelClasses: {
			validator: _metal2.default.isString,
			value: 'collapsed expanded'
		},

		/**
   * Css classes to be used for tables.
   * @type {string}
   * @default 'table table-condensed table-hover'
   */
		tableClasses: {
			validator: _metal2.default.isString,
			value: 'table table-bordered table-condensed table-hover'
		}
	};

	// The regex used to extract the row/column positions from an element's ref.
	Datatable.REF_REGEX = /(\d+)-(\d+)$/;

	/**
  * Datatable supported types.
  * @type {object}
  * @static
  */
	Datatable.TYPES = {
		ARRAY: 'array',
		BOOLEAN: 'boolean',
		NULL: 'null',
		NUMBER: 'number',
		OBJECT: 'object',
		STRING: 'string',
		UNDEFINED: 'undefined'
	};

	exports.default = Datatable;
	_JQueryAdapter2.default.register('datatable', Datatable);
});
//# sourceMappingURL=Datatable.js.map