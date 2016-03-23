define(['exports', 'metal-component/src/Component', 'metal-soy/src/Soy'], function (exports, _Component2, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.List = undefined;

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

    // This file was automatically generated from List.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace List.
     * @public
     */

    goog.module('List.incrementaldom');

    var soy = goog.require('soy');
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;
    var $import1 = goog.require('ListItem.incrementaldom');
    var $templateAlias1 = $import1.render;

    /**
     * @param {{
     *    elementClasses: (?),
     *    id: (?),
     *    items: (?),
     *    itemsHtml: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.itemsHtml == null || opt_data.itemsHtml instanceof Function || opt_data.itemsHtml instanceof soydata.UnsanitizedText || goog.isString(opt_data.itemsHtml), 'itemsHtml', opt_data.itemsHtml, '?soydata.SanitizedHtml|string|undefined');
      var itemsHtml = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.itemsHtml;
      ie_open('div', null, null, 'id', opt_data.id, 'class', 'list' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      ie_open('ul', null, null, 'class', 'list-group', 'data-onclick', 'handleClick');
      if (itemsHtml != null) {
        itemsHtml();
      } else {
        var itemList16 = opt_data.items;
        var itemListLen16 = itemList16.length;
        for (var itemIndex16 = 0; itemIndex16 < itemListLen16; itemIndex16++) {
          var itemData16 = itemList16[itemIndex16];
          $templateAlias1({ id: opt_data.id + '-items-' + itemIndex16, index: itemIndex16, item: itemData16 }, null, opt_ijData);
        }
      }
      ie_close('ul');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'List.render';
    }

    exports.render.params = ["itemsHtml", "elementClasses", "id", "items"];
    exports.templates = templates = exports;
    return exports;
  });

  var List = function (_Component) {
    _inherits(List, _Component);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return List;
  }(_Component3.default);

  List.prototype.registerMetalComponent && List.prototype.registerMetalComponent(List, 'List')

  _Soy2.default.register(List, templates);
  exports.default = templates;
  exports.List = List;
  exports.templates = templates;
});
//# sourceMappingURL=List.soy.js.map