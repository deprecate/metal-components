/* jshint ignore:start */
import Component from 'metal/src/component/Component';
import SoyAop from 'metal/src/soy/SoyAop';
import SoyRenderer from 'metal/src/soy/SoyRenderer';
import SoyTemplates from 'metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from Slider.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Slider.
 */

if (typeof Templates.Slider == 'undefined') { Templates.Slider = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="slider component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.Slider.input(opt_data, null, opt_ijData) + Templates.Slider.label(opt_data, null, opt_ijData) + Templates.Slider.rail(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.Slider.render.soyTemplateName = 'Templates.Slider.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.input = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-input"><input name="' + soy.$$escapeHtmlAttribute(opt_data.inputName ? opt_data.inputName : opt_data.id) + '" type="hidden" value="' + soy.$$escapeHtmlAttribute(opt_data.value) + '"></div>');
};
if (goog.DEBUG) {
  Templates.Slider.input.soyTemplateName = 'Templates.Slider.input';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.label = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-label"><span>' + soy.$$escapeHtml(opt_data.value) + '</span></div>');
};
if (goog.DEBUG) {
  Templates.Slider.label.soyTemplateName = 'Templates.Slider.label';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.rail = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-rail"><div class="rail" data-onmousedown="onRailMouseDown_"><div class="rail-active"></div><div class="rail-handle"><div class="handle" tabindex="0"></div></div></div></div>');
};
if (goog.DEBUG) {
  Templates.Slider.rail.soyTemplateName = 'Templates.Slider.rail';
}

Templates.Slider.render.params = ["id"];
Templates.Slider.input.params = ["id","inputName","value"];
Templates.Slider.label.params = ["id","value"];
Templates.Slider.rail.params = ["id"];

class Slider extends Component {}
Slider.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Slider');
export default Slider;
/* jshint ignore:end */
