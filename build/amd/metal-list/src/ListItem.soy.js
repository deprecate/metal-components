define(['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.ListItem = undefined;

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

    // This file was automatically generated from ListItem.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace ListItem.
     * @public
     */

    goog.module('ListItem.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
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

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('li', null, null, 'class', 'listitem list-group-item ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix', 'data-index', opt_data.index);
      if (opt_data.item.avatar) {
        ie_open('span', null, null, 'class', 'list-image pull-left ' + opt_data.item.avatar['class']);
        var dyn0 = opt_data.item.avatar.content;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('span');
      }
      ie_open('div', null, null, 'class', 'list-main-content pull-left');
      ie_open('div', null, null, 'class', 'list-text-primary');
      var dyn1 = opt_data.item.textPrimary;
      if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      ie_close('div');
      if (opt_data.item.textSecondary) {
        ie_open('div', null, null, 'class', 'list-text-secondary');
        var dyn2 = opt_data.item.textSecondary;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        ie_close('div');
      }
      ie_close('div');
      if (opt_data.item.icons) {
        var iconList45 = opt_data.item.icons;
        var iconListLen45 = iconList45.length;
        for (var iconIndex45 = 0; iconIndex45 < iconListLen45; iconIndex45++) {
          var iconData45 = iconList45[iconIndex45];
          ie_void('span', null, null, 'class', 'btn-icon ' + iconData45 + ' pull-right');
        }
      }
      if (opt_data.item.iconsHtml) {
        ie_open('div', null, null, 'class', 'pull-right');
        var iconHtmlList51 = opt_data.item.iconsHtml;
        var iconHtmlListLen51 = iconHtmlList51.length;
        for (var iconHtmlIndex51 = 0; iconHtmlIndex51 < iconHtmlListLen51; iconHtmlIndex51++) {
          var iconHtmlData51 = iconHtmlList51[iconHtmlIndex51];
          var dyn3 = iconHtmlData51;
          if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
        }
        ie_close('div');
      }
      if (opt_data.item.label) {
        ie_open('span', null, null, 'class', 'label list-label pull-right ' + opt_data.item.label['class']);
        var dyn4 = opt_data.item.label.content;
        if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
        ie_close('span');
      }
      ie_close('li');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'ListItem.render';
    }

    exports.render.params = ["index", "item", "elementClasses"];
    exports.render.types = { "index": "any", "item": "any", "elementClasses": "any" };
    exports.templates = templates = exports;
    return exports;
  });

  var ListItem = function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
      _classCallCheck(this, ListItem);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return ListItem;
  }(_component2.default);

  _Soy2.default.register(ListItem, templates);
  exports.ListItem = ListItem;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=ListItem.soy.js.map