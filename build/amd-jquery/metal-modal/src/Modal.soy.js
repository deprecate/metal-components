define(['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.Modal = undefined;

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

    // This file was automatically generated from Modal.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Modal.
     * @public
     */

    goog.module('Modal.incrementaldom');

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

    /**
     * @param {{
     *    body: (?soydata.SanitizedHtml|string|undefined),
     *    bodyId: (null|string|undefined),
     *    elementClasses: (null|string|undefined),
     *    footer: (?soydata.SanitizedHtml|string|undefined),
     *    header: (?soydata.SanitizedHtml|string|undefined),
     *    headerId: (null|string|undefined),
     *    noCloseButton: (boolean|null|undefined),
     *    role: (null|string|undefined),
     *    visible: (boolean|null|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.body == null || opt_data.body instanceof Function || opt_data.body instanceof goog.soy.data.SanitizedContent || opt_data.body instanceof soydata.UnsanitizedText || goog.isString(opt_data.body), 'body', opt_data.body, '?soydata.SanitizedHtml|string|undefined');
      var body = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.body;
      soy.asserts.assertType(opt_data.bodyId == null || opt_data.bodyId instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.bodyId), 'bodyId', opt_data.bodyId, 'null|string|undefined');
      var bodyId = /** @type {null|string|undefined} */opt_data.bodyId;
      soy.asserts.assertType(opt_data.elementClasses == null || opt_data.elementClasses instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.elementClasses), 'elementClasses', opt_data.elementClasses, 'null|string|undefined');
      var elementClasses = /** @type {null|string|undefined} */opt_data.elementClasses;
      soy.asserts.assertType(opt_data.footer == null || opt_data.footer instanceof Function || opt_data.footer instanceof goog.soy.data.SanitizedContent || opt_data.footer instanceof soydata.UnsanitizedText || goog.isString(opt_data.footer), 'footer', opt_data.footer, '?soydata.SanitizedHtml|string|undefined');
      var footer = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.footer;
      soy.asserts.assertType(opt_data.header == null || opt_data.header instanceof Function || opt_data.header instanceof goog.soy.data.SanitizedContent || opt_data.header instanceof soydata.UnsanitizedText || goog.isString(opt_data.header), 'header', opt_data.header, '?soydata.SanitizedHtml|string|undefined');
      var header = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.header;
      soy.asserts.assertType(opt_data.headerId == null || opt_data.headerId instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.headerId), 'headerId', opt_data.headerId, 'null|string|undefined');
      var headerId = /** @type {null|string|undefined} */opt_data.headerId;
      soy.asserts.assertType(opt_data.noCloseButton == null || goog.isBoolean(opt_data.noCloseButton) || opt_data.noCloseButton === 1 || opt_data.noCloseButton === 0, 'noCloseButton', opt_data.noCloseButton, 'boolean|null|undefined');
      var noCloseButton = /** @type {boolean|null|undefined} */opt_data.noCloseButton;
      soy.asserts.assertType(opt_data.role == null || opt_data.role instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.role), 'role', opt_data.role, 'null|string|undefined');
      var role = /** @type {null|string|undefined} */opt_data.role;
      soy.asserts.assertType(opt_data.visible == null || goog.isBoolean(opt_data.visible) || opt_data.visible === 1 || opt_data.visible === 0, 'visible', opt_data.visible, 'boolean|null|undefined');
      var visible = /** @type {boolean|null|undefined} */opt_data.visible;
      ie_open('div', null, null, 'class', 'modal' + (elementClasses ? ' ' + elementClasses : ''), 'style', 'display: ' + (visible ? 'block' : 'none'));
      ie_open('div', null, null, 'class', 'modal-dialog', 'tabindex', '0', 'role', role ? role : 'dialog', 'aria-labelledby', headerId, 'aria-describedby', bodyId);
      ie_open('div', null, null, 'class', 'modal-content');
      ie_open('header', null, null, 'class', 'modal-header');
      if (header) {
        if (!noCloseButton) {
          ie_open('button', null, null, 'type', 'button', 'class', 'close', 'data-onclick', 'hide', 'aria-label', 'Close');
          ie_open('span', null, null, 'aria-hidden', 'true');
          itext('×');
          ie_close('span');
          ie_close('button');
        }
        ie_open('div', null, null, 'id', headerId);
        var dyn0 = header;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('div');
      }
      ie_close('header');
      ie_open('section', null, null, 'class', 'modal-body', 'id', bodyId, 'role', 'document', 'tabindex', '0');
      if (body) {
        var dyn1 = body;
        if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
      }
      ie_close('section');
      ie_open('footer', null, null, 'class', 'modal-footer');
      if (footer) {
        var dyn2 = footer;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
      }
      ie_close('footer');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'Modal.render';
    }

    exports.render.params = ["body", "bodyId", "elementClasses", "footer", "header", "headerId", "noCloseButton", "role", "visible"];
    exports.render.types = { "body": "html|string", "bodyId": "string", "elementClasses": "string", "footer": "html|string", "header": "html|string", "headerId": "string", "noCloseButton": "bool", "role": "string", "visible": "bool" };
    exports.templates = templates = exports;
    return exports;
  });

  var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal() {
      _classCallCheck(this, Modal);

      return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
    }

    return Modal;
  }(_component2.default);

  _Soy2.default.register(Modal, templates);
  exports.Modal = Modal;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=Modal.soy.js.map