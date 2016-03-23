/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from ButtonGroup.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ButtonGroup.
 * @public
 */

goog.module('ButtonGroup.incrementaldom');

var soy = goog.require('soy');
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
  ie_open('div', null, null,
      'id', opt_data.id,
      'class', 'btn-group component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    var buttonList28 = opt_data.buttons;
    var buttonListLen28 = buttonList28.length;
    for (var buttonIndex28 = 0; buttonIndex28 < buttonListLen28; buttonIndex28++) {
      var buttonData28 = buttonList28[buttonIndex28];
      var type__soy8 = buttonData28.type ? buttonData28.type : 'button';
      var cssClass__soy9 = buttonData28.cssClass ? buttonData28.cssClass : 'btn btn-default';
      ie_open('button', null, null,
          'type', type__soy8,
          'class', cssClass__soy9 + $selectedClass({label: buttonData28.label, selected: opt_data.selected}, null, opt_ijData),
          'data-index', buttonIndex28,
          'data-onclick', 'handleClick_');
        ie_open('span', null, null,
            'class', 'btn-group-label');
          itext((goog.asserts.assert((buttonData28.label ? buttonData28.label : '') != null), buttonData28.label ? buttonData28.label : ''));
        ie_close('span');
        if (buttonData28.icon) {
          ie_void('span', null, null,
              'class', buttonData28.icon);
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
    var selectedValueList37 = opt_data.selected;
    var selectedValueListLen37 = selectedValueList37.length;
    for (var selectedValueIndex37 = 0; selectedValueIndex37 < selectedValueListLen37; selectedValueIndex37++) {
      var selectedValueData37 = selectedValueList37[selectedValueIndex37];
      output += (selectedValueData37 == opt_data.label) ? ' btn-group-selected' : '';
    }
  }
  return output;
}
exports.selectedClass = $selectedClass;
if (goog.DEBUG) {
  $selectedClass.soyTemplateName = 'ButtonGroup.selectedClass';
}

exports.render.params = ["buttons","elementClasses","id","selected"];
exports.selectedClass.params = ["label","selected"];
templates = exports;
return exports;

});

class ButtonGroup extends Component {}
Soy.register(ButtonGroup, templates);
export default templates;
export { ButtonGroup, templates };
/* jshint ignore:end */
