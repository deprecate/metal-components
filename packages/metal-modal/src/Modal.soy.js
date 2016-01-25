/* jshint ignore:start */
import Component from 'npm:metal/src/component/Component';
import SoyAop from 'npm:metal/src/soy/SoyAop';
import SoyRenderer from 'npm:metal/src/soy/SoyRenderer';
import SoyTemplates from 'npm:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from Modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Modal.
 */

if (typeof Templates.Modal == 'undefined') { Templates.Modal = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="modal component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="' + soy.$$escapeHtmlAttribute(opt_data.role ? opt_data.role : 'dialog') + '" aria-labelledby="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header"><div class="modal-dialog" tabindex="0"><div class="modal-content">' + Templates.Modal.header(opt_data, null, opt_ijData) + Templates.Modal.body(opt_data, null, opt_ijData) + Templates.Modal.footer(opt_data, null, opt_ijData) + '</div></div></div>');
};
if (goog.DEBUG) {
  Templates.Modal.render.soyTemplateName = 'Templates.Modal.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<section id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body">' + ((opt_data.body) ? soy.$$escapeHtml(opt_data.body) : '') + '</section>');
};
if (goog.DEBUG) {
  Templates.Modal.body.soyTemplateName = 'Templates.Modal.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.footer = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<footer id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer" class="modal-footer">' + ((opt_data.footer) ? soy.$$escapeHtml(opt_data.footer) : '') + '</footer>');
};
if (goog.DEBUG) {
  Templates.Modal.footer.soyTemplateName = 'Templates.Modal.footer';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<header id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header" class="modal-header">' + ((opt_data.header) ? '<button type="button" class="close" data-onclick="hide" aria-label="Close"><span aria-hidden="true">\u00D7</span></button>' + soy.$$escapeHtml(opt_data.header) : '') + '</header>');
};
if (goog.DEBUG) {
  Templates.Modal.header.soyTemplateName = 'Templates.Modal.header';
}

Templates.Modal.render.params = ["id","role"];
Templates.Modal.body.params = ["id","body"];
Templates.Modal.footer.params = ["footer","id"];
Templates.Modal.header.params = ["header","id"];

class Modal extends Component {}
Modal.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Modal');
export default Modal;
/* jshint ignore:end */
