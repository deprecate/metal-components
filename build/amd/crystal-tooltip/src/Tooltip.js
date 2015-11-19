'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/component/ComponentRegistry', 'crystal-tooltip/src/TooltipBase', 'crystal-tooltip/src/Tooltip.soy'], function (exports, _ComponentRegistry, _TooltipBase2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

  var _TooltipBase3 = _interopRequireDefault(_TooltipBase2);

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

  var Tooltip = (function (_TooltipBase) {
    _inherits(Tooltip, _TooltipBase);

    function Tooltip() {
      _classCallCheck(this, Tooltip);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).apply(this, arguments));
    }

    _createClass(Tooltip, [{
      key: 'syncVisible',
      value: function syncVisible(visible) {
        this.element.style.opacity = visible ? 1 : '';

        _get(Object.getPrototypeOf(Tooltip.prototype), 'syncVisible', this).call(this, visible);
      }
    }]);

    return Tooltip;
  })(_TooltipBase3.default);

  Tooltip.Align = _TooltipBase3.default.Align;
  Tooltip.ELEMENT_CLASSES = 'tooltip';

  _ComponentRegistry2.default.register(Tooltip);

  exports.default = Tooltip;
});
//# sourceMappingURL=Tooltip.js.map