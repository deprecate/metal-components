/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from ProgressBar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.ProgressBar.
 */

if (typeof Templates.ProgressBar == 'undefined') { Templates.ProgressBar = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ProgressBar.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="progress component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="progressbar" tabindex="0"><div class="progress-bar"></div></div>');
};
if (goog.DEBUG) {
  Templates.ProgressBar.content.soyTemplateName = 'Templates.ProgressBar.content';
}

Templates.ProgressBar.content.params = ["id"];

class ProgressBar extends Component {}
ProgressBar.RENDERER = SoyRenderer;
SoyAop.registerTemplates('ProgressBar');
export default ProgressBar;
/* jshint ignore:end */
