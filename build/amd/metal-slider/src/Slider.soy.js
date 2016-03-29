define(['exports', 'metal-component/src/Component', 'metal-soy/src/Soy'], function (exports, _Component2, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.Slider = undefined;

  var _Component3 = _interopRequireDefault(_Component2);

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

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Slider.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Slider.
     * @public
     */

    goog.module('Slider.incrementaldom');

    var soy = goog.require('soy');
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', opt_data.id, 'class', 'slider component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      ie_open('input', null, null, 'name', opt_data.inputName ? opt_data.inputName : opt_data.id, 'type', 'hidden', 'value', opt_data.value);
      ie_close('input');
      ie_open('span');
      itext((goog.asserts.assert(opt_data.value != null), opt_data.value));
      ie_close('span');
      var percentage__soy14 = 100 * (opt_data.value - opt_data.min) / (opt_data.max - opt_data.min) + '%';
      ie_open('div', null, null, 'class', 'rail', 'data-onmousedown', 'onRailMouseDown_');
      ie_void('div', null, null, 'class', 'rail-active', 'style', 'width: ' + percentage__soy14);
      ie_open('div', null, null, 'class', 'rail-handle');
      ie_void('div', null, null, 'class', 'handle', 'tabindex', '0');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Slider.render';
    }

    exports.render.params = ["elementClasses", "id", "inputName", "max", "min", "value"];
    exports.templates = templates = exports;
    return exports;
  });

  var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider() {
      _classCallCheck(this, Slider);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Slider;
  }(_Component3.default);

  _Soy2.default.register(Slider, templates);
  exports.default = templates;
  exports.Slider = Slider;
  exports.templates = templates;
});
//# sourceMappingURL=Slider.soy.js.map