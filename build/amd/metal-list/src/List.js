define(['exports', 'metal-dom/src/all/dom', 'metal-component/src/all/component', 'metal-soy/src/Soy', './List.soy.js', './ListItem'], function (exports, _dom, _component, _Soy, _ListSoy) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dom2 = _interopRequireDefault(_dom);

	var _component2 = _interopRequireDefault(_component);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _ListSoy2 = _interopRequireDefault(_ListSoy);

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

	var List = function (_Component) {
		_inherits(List, _Component);

		function List() {
			_classCallCheck(this, List);

			return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
		}

		_createClass(List, [{
			key: 'handleClick',
			value: function handleClick(event) {
				var target = event.target;
				while (target) {
					if (_dom2.default.match(target, '.listitem')) {
						break;
					}
					target = target.parentNode;
				}
				this.emit('itemSelected', target);
			}
		}]);

		return List;
	}(_component2.default);

	_Soy2.default.register(List, _ListSoy2.default);

	/**
  * List state definition.
  * @type {!Object}
  * @static
  */
	List.STATE = {
		/**
   * The list items. Each is represented by an object that can have the following keys:
   *   - textPrimary: The item's main content.
   *   - textSecondary: (Optional) The item's help content.
   *   - icons: (Optional) A list of icon css classes to render on the right side.
   *   - iconsHtml: (Optional) A list of icon css classes to render on the right side.
   *   - avatar: (Optional) An object that specifies the avatar's content and, optionally, a css
   *       class it should use.
   * @type {!Array<!Object>}
   * @default []
   */
		items: {
			validator: Array.isArray,
			valueFn: function valueFn() {
				return [];
			}
		},

		/**
   * The list items as HTML to be added directly to the list.
   * @type {string}
   */
		itemsHtml: {
			isHtml: true
		}
	};

	exports.default = List;
});
//# sourceMappingURL=List.js.map