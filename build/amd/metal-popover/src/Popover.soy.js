define(['exports', 'metal-component/src/Component', 'metal-soy/src/Soy'], function (exports, _Component2, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.Popover = undefined;

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

    // This file was automatically generated from Popover.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Popover.
     * @public
     */

    goog.module('Popover.incrementaldom');

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
      var positionClasses__soy3 = ['top', 'top', 'right', 'bottom', 'bottom', 'bottom', 'left', 'top'];
      var currentPosition__soy4 = opt_data.alignedPosition != null ? opt_data.alignedPosition : opt_data.position;
      var positionClass__soy5 = currentPosition__soy4 != null ? positionClasses__soy3[currentPosition__soy4] : 'bottom';
      ie_open('div', null, null, 'id', opt_data.id, 'class', 'popover ' + positionClass__soy5 + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'role', 'tooltip');
      ie_void('div', null, null, 'class', 'arrow');
      ie_open('h3', null, null, 'class', 'popover-title' + (opt_data.title ? '' : ' hidden'));
      itext((goog.asserts.assert((opt_data.title ? opt_data.title : '') != null), opt_data.title ? opt_data.title : ''));
      ie_close('h3');
      ie_open('div', null, null, 'class', 'popover-content');
      ie_open('p');
      itext((goog.asserts.assert((opt_data.content ? opt_data.content : '') != null), opt_data.content ? opt_data.content : ''));
      ie_close('p');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Popover.render';
    }

    exports.render.params = ["alignedPosition", "content", "elementClasses", "id", "position", "title"];
    exports.templates = templates = exports;
    return exports;
  });

  var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Popover;
  }(_Component3.default);

  Popover.prototype.registerMetalComponent && Popover.prototype.registerMetalComponent(Popover, 'Popover')

  _Soy2.default.register(Popover, templates);
  exports.default = templates;
  exports.Popover = Popover;
  exports.templates = templates;
});
//# sourceMappingURL=Popover.soy.js.map