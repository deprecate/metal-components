define(['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.Select = undefined;

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

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = _Soy2.default.getTemplate('Dropdown.incrementaldom', 'render');

    /**
     * @param {{
     *    arrowClass: (?),
     *    buttonClass: (?),
     *    elementClasses: (?),
     *    expanded_: (?),
     *    handleDropdownStateSynced_: (?),
     *    handleItemClick_: (?),
     *    handleItemKeyDown_: (?),
     *    hiddenInputName: (?),
     *    items: (?),
     *    values: (?),
     *    selectedIndex: (?),
     *    label: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      var $$temp;
      soy.asserts.assertType(opt_data.label == null || opt_data.label instanceof Function || opt_data.label instanceof goog.soy.data.SanitizedContent || opt_data.label instanceof soydata.UnsanitizedText || goog.isString(opt_data.label), 'label', opt_data.label, '?soydata.SanitizedHtml|string|undefined');
      var label = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.label;
      ie_open('div', null, null, 'class', 'select' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''), 'data-onkeydown', 'handleKeyDown_');
      var currSelectedIndex__soy6 = opt_data.selectedIndex != null ? opt_data.selectedIndex : label || opt_data.items.length == 0 ? -1 : 0;
      ie_open('input', null, null, 'type', 'hidden', 'name', opt_data.hiddenInputName ? opt_data.hiddenInputName : '', 'value', currSelectedIndex__soy6 == -1 ? '' : opt_data.values ? opt_data.values[currSelectedIndex__soy6] : '');
      ie_close('input');
      var param12 = function param12() {
        var itemList22 = opt_data.items;
        var itemListLen22 = itemList22.length;
        for (var itemIndex22 = 0; itemIndex22 < itemListLen22; itemIndex22++) {
          var itemData22 = itemList22[itemIndex22];
          ie_open('li', null, null, 'data-onclick', ($$temp = opt_data.handleItemClick_) == null ? '' : $$temp, 'data-onkeydown', ($$temp = opt_data.handleItemKeyDown_) == null ? '' : $$temp, 'class', 'select-option' + (currSelectedIndex__soy6 == itemIndex22 ? ' selected' : ''));
          ie_open('a', null, null, 'href', 'javascript:;');
          var dyn0 = itemData22;
          if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
          ie_close('a');
          ie_close('li');
        }
      };
      var param26 = function param26() {
        ie_open('button', null, null, 'class', (opt_data.buttonClass ? opt_data.buttonClass : '') + ' dropdown-select', 'type', 'button', 'data-onclick', 'toggle', 'aria-haspopup', 'true', 'aria-expanded', opt_data.expanded_ ? 'true' : 'false');
        if (currSelectedIndex__soy6 == -1) {
          var dyn1 = label;
          if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
        } else {
          var dyn2 = opt_data.items[currSelectedIndex__soy6];
          if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        }
        itext(' ');
        ie_void('span', null, null, 'class', opt_data.arrowClass ? opt_data.arrowClass : 'caret');
        ie_close('button');
      };
      $templateAlias1({ body: param12, events: { stateSynced: opt_data.handleDropdownStateSynced_ }, expanded: opt_data.expanded_, header: param26, ref: 'dropdown' }, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Select.render';
    }

    exports.render.params = ["label", "arrowClass", "buttonClass", "elementClasses", "expanded_", "handleDropdownStateSynced_", "handleItemClick_", "handleItemKeyDown_", "hiddenInputName", "items", "values", "selectedIndex"];
    exports.render.types = { "label": "html|string", "arrowClass": "any", "buttonClass": "any", "elementClasses": "any", "expanded_": "any", "handleDropdownStateSynced_": "any", "handleItemClick_": "any", "handleItemKeyDown_": "any", "hiddenInputName": "any", "items": "any", "values": "any", "selectedIndex": "any" };
    exports.templates = templates = exports;
    return exports;
  });

  var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
    }

    return Select;
  }(_component2.default);

  _Soy2.default.register(Select, templates);
  exports.Select = Select;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=Select.soy.js.map