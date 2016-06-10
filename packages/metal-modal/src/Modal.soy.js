/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

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
 *    elementClasses: (null|string|undefined),
 *    footer: (?soydata.SanitizedHtml|string|undefined),
 *    header: (?soydata.SanitizedHtml|string|undefined),
 *    noCloseButton: (boolean|null|undefined),
 *    role: (null|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  soy.asserts.assertType(opt_data.body == null || (opt_data.body instanceof Function) || (opt_data.body instanceof soydata.UnsanitizedText) || goog.isString(opt_data.body), 'body', opt_data.body, '?soydata.SanitizedHtml|string|undefined');
  var body = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.body);
  soy.asserts.assertType(opt_data.elementClasses == null || (opt_data.elementClasses instanceof goog.soy.data.SanitizedContent) || goog.isString(opt_data.elementClasses), 'elementClasses', opt_data.elementClasses, 'null|string|undefined');
  var elementClasses = /** @type {null|string|undefined} */ (opt_data.elementClasses);
  soy.asserts.assertType(opt_data.footer == null || (opt_data.footer instanceof Function) || (opt_data.footer instanceof soydata.UnsanitizedText) || goog.isString(opt_data.footer), 'footer', opt_data.footer, '?soydata.SanitizedHtml|string|undefined');
  var footer = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.footer);
  soy.asserts.assertType(opt_data.header == null || (opt_data.header instanceof Function) || (opt_data.header instanceof soydata.UnsanitizedText) || goog.isString(opt_data.header), 'header', opt_data.header, '?soydata.SanitizedHtml|string|undefined');
  var header = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.header);
  soy.asserts.assertType(opt_data.noCloseButton == null || goog.isBoolean(opt_data.noCloseButton) || opt_data.noCloseButton === 1 || opt_data.noCloseButton === 0, 'noCloseButton', opt_data.noCloseButton, 'boolean|null|undefined');
  var noCloseButton = /** @type {boolean|null|undefined} */ (opt_data.noCloseButton);
  soy.asserts.assertType(opt_data.role == null || (opt_data.role instanceof goog.soy.data.SanitizedContent) || goog.isString(opt_data.role), 'role', opt_data.role, 'null|string|undefined');
  var role = /** @type {null|string|undefined} */ (opt_data.role);
  ie_open('div', null, null,
      'class', 'modal' + (elementClasses ? ' ' + elementClasses : ''),
      'role', role ? role : 'dialog');
    ie_open('div', null, null,
        'class', 'modal-dialog',
        'tabindex', '0');
      ie_open('div', null, null,
          'class', 'modal-content');
        ie_open('header', null, null,
            'class', 'modal-header');
          if (header) {
            if (! noCloseButton) {
              ie_open('button', null, null,
                  'type', 'button',
                  'class', 'close',
                  'onClick', 'hide',
                  'aria-label', 'Close');
                ie_open('span', null, null,
                    'aria-hidden', 'true');
                  itext('\u00D7');
                ie_close('span');
              ie_close('button');
            }
            header();
          }
        ie_close('header');
        ie_open('section', null, null,
            'class', 'modal-body');
          if (body) {
            body();
          }
        ie_close('section');
        ie_open('footer', null, null,
            'class', 'modal-footer');
          if (footer) {
            footer();
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

exports.render.params = ["body","elementClasses","footer","header","noCloseButton","role"];
exports.render.types = {"body":"html","elementClasses":"string","footer":"html","header":"html","noCloseButton":"bool","role":"string"};
templates = exports;
return exports;

});

class Modal extends Component {}
Soy.register(Modal, templates);
export { Modal, templates };
export default templates;
/* jshint ignore:end */
