define(['exports', 'metal-component/src/Component', 'metal-soy/src/Soy'], function (exports, _Component2, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.Select = undefined;

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

    // This file was automatically generated from Select.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Select.
     * @public
     */

    goog.module('Select.incrementaldom');

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
    var $import1 = goog.require('Dropdown.incrementaldom');
    var $templateAlias1 = $import1.render;

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'id', opt_data.id, 'class', 'select component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'data-onkeydown', 'handleKeyDown_');
      var currSelectedIndex__soy8 = opt_data.selectedIndex != null ? opt_data.selectedIndex : opt_data.label || opt_data.items.length == 0 ? -1 : 0;
      ie_open('input', null, null, 'type', 'hidden', 'name', opt_data.hiddenInputName ? opt_data.hiddenInputName : '', 'value', currSelectedIndex__soy8 == -1 ? '' : opt_data.items[currSelectedIndex__soy8]);
      ie_close('input');
      var param14 = function param14() {
        var itemList22 = opt_data.items;
        var itemListLen22 = itemList22.length;
        for (var itemIndex22 = 0; itemIndex22 < itemListLen22; itemIndex22++) {
          var itemData22 = itemList22[itemIndex22];
          ie_open('li', null, null, 'data-onclick', opt_data.id + ':handleItemClick_', 'class', 'select-option' + (currSelectedIndex__soy8 == itemIndex22 ? ' selected' : ''));
          ie_open('a', null, null, 'href', 'javascript:;');
          itext((goog.asserts.assert(itemData22 != null), itemData22));
          ie_close('a');
          ie_close('li');
        }
      };
      var param25 = function param25() {
        ie_open('button', null, null, 'class', opt_data.buttonClass + ' dropdown-select', 'type', 'button', 'data-onclick', 'toggle');
        var buttonLabel__soy29 = currSelectedIndex__soy8 == -1 ? opt_data.label : opt_data.items[currSelectedIndex__soy8];
        itext((goog.asserts.assert((buttonLabel__soy29 ? buttonLabel__soy29 : '') != null), buttonLabel__soy29 ? buttonLabel__soy29 : ''));
        itext(' ');
        ie_void('span', null, null, 'class', opt_data.arrowClass ? opt_data.arrowClass : 'caret');
        ie_close('button');
      };
      $templateAlias1({ body: param14, events: { stateSynced: opt_data.id + ':handleDropdownStateSynced_' }, header: param25, id: opt_data.id + '-dropdown' }, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Select.render';
    }

    exports.render.params = ["arrowClass", "buttonClass", "elementClasses", "hiddenInputName", "id", "items", "label", "selectedIndex"];
    exports.templates = templates = exports;
    return exports;
  });

  var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Select;
  }(_Component3.default);

  Select.prototype.registerMetalComponent && Select.prototype.registerMetalComponent(Select, 'Select')

  _Soy2.default.register(Select, templates);
  exports.default = templates;
  exports.Select = Select;
  exports.templates = templates;
});
//# sourceMappingURL=Select.soy.js.map