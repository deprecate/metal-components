define(['exports', 'metal/src/metal', './Treeview.soy.js', 'metal-component/src/all/component', 'metal-keyboard-focus/src/KeyboardFocusManager', 'metal-soy/src/Soy', 'metal-jquery-adapter/src/JQueryAdapter'], function (exports, _metal, _TreeviewSoy, _component, _KeyboardFocusManager, _Soy, _JQueryAdapter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _metal2 = _interopRequireDefault(_metal);

	var _TreeviewSoy2 = _interopRequireDefault(_TreeviewSoy);

	var _component2 = _interopRequireDefault(_component);

	var _KeyboardFocusManager2 = _interopRequireDefault(_KeyboardFocusManager);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _JQueryAdapter2 = _interopRequireDefault(_JQueryAdapter);

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

	var Treeview = function (_Component) {
		_inherits(Treeview, _Component);

		function Treeview() {
			_classCallCheck(this, Treeview);

			return _possibleConstructorReturn(this, _Component.apply(this, arguments));
		}

		Treeview.prototype.attached = function attached() {
			this.keyboardFocusManager_ = new _KeyboardFocusManager2.default(this, 'li').setFocusHandler(this.handleNextFocus_.bind(this)).start();
			this.keyboardFocusManager_.on(_KeyboardFocusManager2.default.EVENT_FOCUSED, this.handleKeyboardFocused_.bind(this));
		};

		Treeview.prototype.disposed = function disposed() {
			this.keyboardFocusManager_.dispose();
			this.keyboardFocusManager_ = null;
		};

		Treeview.prototype.getNodeObj = function getNodeObj(path) {
			var obj = this.nodes[path[0]];
			for (var i = 1; i < path.length; i++) {
				obj = obj.children[path[i]];
			}
			return obj;
		};

		Treeview.prototype.getPath_ = function getPath_(node) {
			return node.getAttribute('data-treeview-path').split('-');
		};

		Treeview.prototype.handleKeyboardFocused_ = function handleKeyboardFocused_(data) {
			this.lastFocusedRef_ = data.ref;
		};

		Treeview.prototype.handleLeftArrow_ = function handleLeftArrow_(path, obj) {
			if (obj.expanded) {
				obj.expanded = false;
				this.nodes = this.nodes;
			} else if (path.length > 1) {
				path.pop();
				return Treeview.NODE_REF_PREFIX + path.join('-');
			}
		};

		Treeview.prototype.handleNextFocus_ = function handleNextFocus_(event) {
			event.stopPropagation();

			var path = this.getPath_(event.delegateTarget);
			var obj = this.getNodeObj(path);
			switch (event.keyCode) {
				case 37:
					return this.handleLeftArrow_(path, obj);
				case 39:
					return this.handleRightArrow_(path, obj);
				default:
					// Use default behavior for other keys (like up/down arrows).
					return true;
			}
		};

		Treeview.prototype.handleNodeClicked_ = function handleNodeClicked_(event) {
			this.toggleExpandedState_(event.delegateTarget.parentNode.parentNode);
		};

		Treeview.prototype.handleNodeKeyUp_ = function handleNodeKeyUp_(event) {
			if (event.keyCode === 13 || event.keyCode === 32) {
				this.toggleExpandedState_(event.delegateTarget);
				event.stopPropagation();
			}
		};

		Treeview.prototype.handleRightArrow_ = function handleRightArrow_(path, obj) {
			if (obj.expanded) {
				path.push(0);
				return Treeview.NODE_REF_PREFIX + path.join('-');
			} else if (obj.children) {
				obj.expanded = true;
				this.nodes = this.nodes;
			}
		};

		Treeview.prototype.toggleExpandedState_ = function toggleExpandedState_(node) {
			var nodeObj = this.getNodeObj(this.getPath_(node));
			nodeObj.expanded = !nodeObj.expanded;
			this.nodes = this.nodes;
		};

		return Treeview;
	}(_component2.default);

	_Soy2.default.register(Treeview, _TreeviewSoy2.default);

	// The prefix used for tree item nodes' refs.
	Treeview.NODE_REF_PREFIX = 'node-';

	/**
  * Treeview state definition.
  * @type {!Object}
  * @static
  */
	Treeview.STATE = {
		/**
   * The ref of the last item that has been focused, so that we can retain only
   * that node in the tab order.
   * @type {string}
   */
		lastFocusedRef_: {
			internal: true,
			validator: _metal2.default.isString
		},

		/**
   * This tree view's nodes. Each node should have a name, and can optionally
   * have nested children nodes. It should also indicate if its children are
   * expanded or not.
   * @type {Array<!{children: Array, expanded: boolean?, name: string}>}
   * @default []
   */
		nodes: {
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		}
	};

	exports.default = Treeview;
	_JQueryAdapter2.default.register('treeview', Treeview);
});
//# sourceMappingURL=Treeview.js.map