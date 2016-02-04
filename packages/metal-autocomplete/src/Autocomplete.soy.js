/* jshint ignore:start */
import Component from 'metal/src/component/Component';
import SoyAop from 'metal/src/soy/SoyAop';
import SoyRenderer from 'metal/src/soy/SoyRenderer';
import SoyTemplates from 'metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from Autocomplete.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Autocomplete.
 */

if (typeof Templates.Autocomplete == 'undefined') { Templates.Autocomplete = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Autocomplete.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="autocomplete autocomplete-list component ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(Templates.List.render({events: {itemSelected: opt_data.id + ':onListItemSelected_'}, id: opt_data.id + '-list'}, null, opt_ijData)) + '</div>');
};
if (goog.DEBUG) {
  Templates.Autocomplete.render.soyTemplateName = 'Templates.Autocomplete.render';
}

Templates.Autocomplete.render.params = ["id"];

class Autocomplete extends Component {}
Autocomplete.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Autocomplete');
export default Autocomplete;
/* jshint ignore:end */
