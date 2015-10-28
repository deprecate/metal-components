/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Popover.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Popover.
 */

if (typeof Templates.Popover == 'undefined') { Templates.Popover = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Popover.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var positionClasses__soy3 = ['top', 'right', 'bottom', 'left'];
  var positionClass__soy4 = opt_data.position != null ? positionClasses__soy3[opt_data.position] : 'bottom';
  output += '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="popover component ' + soy.$$escapeHtmlAttribute(positionClass__soy4) + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="tooltip"><div class="arrow"></div>' + Templates.Popover.title(opt_data, null, opt_ijData) + Templates.Popover.innerContent(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Popover.content.soyTemplateName = 'Templates.Popover.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Popover.title = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h3 id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-title" class="popover-title' + soy.$$escapeHtmlAttribute(opt_data.title ? '' : ' hidden') + '">' + soy.$$escapeHtml(opt_data.title) + '</h3>');
};
if (goog.DEBUG) {
  Templates.Popover.title.soyTemplateName = 'Templates.Popover.title';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Popover.innerContent = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-innerContent" class="popover-content"><p>' + soy.$$escapeHtml(opt_data.content ? opt_data.content : '') + '</p></div>');
};
if (goog.DEBUG) {
  Templates.Popover.innerContent.soyTemplateName = 'Templates.Popover.innerContent';
}

Templates.Popover.content.params = ["id"];
Templates.Popover.title.params = ["id","title"];
Templates.Popover.innerContent.params = ["content","id"];
export default Templates.Popover;
/* jshint ignore:end */
