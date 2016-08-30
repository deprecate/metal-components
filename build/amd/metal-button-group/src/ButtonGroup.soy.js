define(['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.ButtonGroup = undefined;

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

    // This file was automatically generated from ButtonGroup.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ButtonGroup.
     * @public
     */

    goog.module('ButtonGroup.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
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
      ie_open('div', null, null, 'class', 'btn-group component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      var buttonList30 = opt_data.buttons;
      var buttonListLen30 = buttonList30.length;
      for (var buttonIndex30 = 0; buttonIndex30 < buttonListLen30; buttonIndex30++) {
        var buttonData30 = buttonList30[buttonIndex30];
        var type__soy6 = buttonData30.type ? buttonData30.type : 'button';
        var cssClass__soy7 = buttonData30.cssClass ? buttonData30.cssClass : 'btn btn-default';
        var selectedClass__soy8 = '';
        selectedClass__soy8 += $selectedClass({ label: buttonData30.label, selected: opt_data.selected }, null, opt_ijData);
        ie_open('button', null, null, 'type', type__soy6, 'class', cssClass__soy7 + selectedClass__soy8, 'data-index', buttonIndex30, 'data-onclick', 'handleClick_', 'role', 'checkbox', 'aria-checked', selectedClass__soy8 ? 'true' : 'false');
        ie_open('span', null, null, 'class', 'btn-group-label');
        itext((goog.asserts.assert((buttonData30.label ? buttonData30.label : '') != null), buttonData30.label ? buttonData30.label : ''));
        ie_close('span');
        if (buttonData30.icon) {
          ie_void('span', null, null, 'class', buttonData30.icon);
        }
        ie_close('button');
      }
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ButtonGroup.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {string}
     * @suppress {checkTypes}
     */
    function $selectedClass(opt_data, opt_ignored, opt_ijData) {
      var output = '';
      if (opt_data.selected) {
        var selectedValueList39 = opt_data.selected;
        var selectedValueListLen39 = selectedValueList39.length;
        for (var selectedValueIndex39 = 0; selectedValueIndex39 < selectedValueListLen39; selectedValueIndex39++) {
          var selectedValueData39 = selectedValueList39[selectedValueIndex39];
          output += selectedValueData39 == opt_data.label ? ' btn-group-selected' : '';
        }
      }
      return output;
    }
    exports.selectedClass = $selectedClass;
    if (goog.DEBUG) {
      $selectedClass.soyTemplateName = 'ButtonGroup.selectedClass';
    }

    exports.render.params = ["buttons", "elementClasses", "selected"];
    exports.render.types = { "buttons": "any", "elementClasses": "any", "selected": "any" };
    exports.selectedClass.params = ["label", "selected"];
    exports.selectedClass.types = { "label": "any", "selected": "any" };
    exports.templates = templates = exports;
    return exports;
  });

  var ButtonGroup = function (_Component) {
    _inherits(ButtonGroup, _Component);

    function ButtonGroup() {
      _classCallCheck(this, ButtonGroup);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return ButtonGroup;
  }(_component2.default);

  _Soy2.default.register(ButtonGroup, templates);
  exports.ButtonGroup = ButtonGroup;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=ButtonGroup.soy.js.map