'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/dom/dom', 'crystal-treeview/src/Treeview.soy'], function (exports, _dom, _Treeview) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _Treeview2 = _interopRequireDefault(_Treeview);

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

	var _createClass = (function () {
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
	})();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

	var Treeview = (function (_TreeviewBase) {
		_inherits(Treeview, _TreeviewBase);

		function Treeview() {
			_classCallCheck(this, Treeview);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Treeview).apply(this, arguments));
		}

		_createClass(Treeview, [{
			key: 'attached',
			value: function attached() {
				this.on('nodesChanged', this.onNodesChanged_);
				this.on('renderSurface', this.handleRenderSurface_);
			}
		}, {
			key: 'getNodeObj',
			value: function getNodeObj(path) {
				var obj = this.nodes[path[0]];

				for (var i = 1; i < path.length; i++) {
					obj = obj.children[path[i]];
				}

				return obj;
			}
		}, {
			key: 'getNodeObjFromId_',
			value: function getNodeObjFromId_(id) {
				var path = id.substr(this.id.length + 1).split('-');
				return this.getNodeObj(path);
			}
		}, {
			key: 'handleNodeClicked_',
			value: function handleNodeClicked_(event) {
				this.toggleExpandedState_(event.delegateTarget);
			}
		}, {
			key: 'handleNodeKeyUp_',
			value: function handleNodeKeyUp_(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					this.toggleExpandedState_(event.delegateTarget);
				}
			}
		}, {
			key: 'handleRenderSurface_',
			value: function handleRenderSurface_(data, event) {
				if (this.ignoreSurfaceUpdate_) {
					event.preventDefault();
					this.ignoreSurfaceUpdate_ = false;
				}
			}
		}, {
			key: 'onNodesChanged_',
			value: function onNodesChanged_() {
				this.ignoreSurfaceUpdate_ = false;
			}
		}, {
			key: 'toggleExpandedState_',
			value: function toggleExpandedState_(node) {
				var nodeObj = this.getNodeObjFromId_(node.parentNode.parentNode.id);
				nodeObj.expanded = !nodeObj.expanded;

				if (nodeObj.expanded) {
					_dom2.default.addClasses(node.parentNode, 'expanded');

					node.setAttribute('aria-expanded', 'true');
				} else {
					_dom2.default.removeClasses(node.parentNode, 'expanded');

					node.setAttribute('aria-expanded', 'false');
				}

				this.nodes = this.nodes;
				this.ignoreSurfaceUpdate_ = true;
			}
		}]);

		return Treeview;
	})(_Treeview2.default);

	Treeview.ELEMENT_CLASSES = 'treeview';
	Treeview.ATTRS = {
		nodes: {
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		}
	};

	_Treeview2.default.setImpl(Treeview);

	exports.default = Treeview;
});
//# sourceMappingURL=Treeview.js.map