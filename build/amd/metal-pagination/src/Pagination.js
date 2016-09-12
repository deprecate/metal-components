define(['exports', 'metal/src/metal', './Pagination.soy.js', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _metal, _PaginationSoy, _component, _Soy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _PaginationSoy2 = _interopRequireDefault(_PaginationSoy);

	var _component2 = _interopRequireDefault(_component);

	var _Soy2 = _interopRequireDefault(_Soy);

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

	var Pagination = function (_Component) {
		_inherits(Pagination, _Component);

		function Pagination() {
			_classCallCheck(this, Pagination);

			return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
		}

		_createClass(Pagination, [{
			key: 'created',
			value: function created() {
				/**
     * Contains the previous page value
     * @type {Object}
     * @default {page: this.page}
     */
				this.lastState_ = {
					page: this.page
				};

				this.on(Pagination.Events.CHANGE_REQUEST, this.defaultChangeRequestFn_, true);
			}
		}, {
			key: 'defaultChangeRequestFn_',
			value: function defaultChangeRequestFn_(event) {
				this.setState_(event.state);
			}
		}, {
			key: 'dispatchRequest_',
			value: function dispatchRequest_(state) {
				this.emit(Pagination.Events.CHANGE_REQUEST, {
					lastState: this.lastState_,
					offset: this.offset,
					state: state,
					total: this.total
				});
			}
		}, {
			key: 'getOffsetPageNumber',
			value: function getOffsetPageNumber() {
				return this.offset + this.page;
			}
		}, {
			key: 'getOffsetTotalPages',
			value: function getOffsetTotalPages() {
				return this.offset + this.total;
			}
		}, {
			key: 'next',
			value: function next() {
				var page = this.page,
				    total = this.total;

				this.dispatchRequest_({
					page: this.circular && page === total - 1 ? 0 : Math.min(total, ++page)
				});
			}
		}, {
			key: 'onClickItem',
			value: function onClickItem(event) {
				var item = event.delegateTarget;

				event.preventDefault();

				var index = parseInt(item.getAttribute('data-index'));

				this.dispatchRequest_({
					page: index
				});
			}
		}, {
			key: 'onClickControls',
			value: function onClickControls(event) {
				var control = event.delegateTarget;

				event.preventDefault();

				var index = parseInt(control.getAttribute('data-control-index'));

				switch (index) {
					case 0:
						this.prev();
						break;
					case 1:
						this.next();
						break;
				}
			}
		}, {
			key: 'prev',
			value: function prev() {
				var page = this.page,
				    total = this.total;

				this.dispatchRequest_({
					page: this.circular && page === 0 ? total - 1 : Math.max(0, --page)
				});
			}
		}, {
			key: 'setState_',
			value: function setState_(state) {
				this.page = state.page;

				this.lastState_ = state;
			}
		}]);

		return Pagination;
	}(_component2.default);

	_Soy2.default.register(Pagination, _PaginationSoy2.default);

	/**
  * State definition.
  * @type {!Object}
  * @static
  */
	Pagination.STATE = {
		/**
   * When enabled this property allows the navigation to go back to
   * the beggining when it reaches the last page, the opposite behavior
   * is also true. Incremental page navigation could happen clicking the
   * control arrows or invoking <code>.next()</code> and
   * <code>.prev()</code> methods.
   * @type {boolean}
   * @default true
   */
		circular: {
			validator: _metal.core.isBoolean,
			value: true
		},

		/**
   * Initial page offset.
   * @type {number}
   * @default 1
   */
		offset: {
			validator: _metal.core.isNumber,
			value: 1
		},

		/**
   * Page to display on initial paint.
   * @type {number}
   * @default 0
   */
		page: {
			validator: _metal.core.isNumber,
			value: 0
		},

		/**
   * Determines if pagination controls (Next and Prev) are rendered.
   * @type {boolean}
   * @default true
   */
		showControls: {
			validator: _metal.core.isBoolean,
			value: true
		},

		/**
   * Collection of strings used to label elements of the UI.
   * @type {Object}
   * @default {next: 'Next', prev: 'Prev'}
   */
		strings: {
			validator: _metal.core.isObject,
			setter: function setter(val) {
				return _metal.object.mixin({
					next: 'Next',
					nextAriaLabel: 'Next',
					prev: 'Prev',
					prevAriaLabel: 'Previous'
				}, val);
			},
			valueFn: function valueFn() {}
		},

		/**
   * Total number of page links available. If set, the new
   * <a href="Pagination.html#config_items">items</a> node list will
   * be rendered.
   * @type {number}
   * @default 0
   */
		total: {
			validator: _metal.core.isNumber,
			value: 0
		}
	};

	Pagination.Events = {
		CHANGE_REQUEST: 'changeRequest'
	};

	exports.default = Pagination;
});
//# sourceMappingURL=Pagination.js.map