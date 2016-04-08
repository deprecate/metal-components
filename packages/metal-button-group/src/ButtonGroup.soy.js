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

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
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
      'class', 'btn-group component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    var buttonList26 = opt_data.buttons;
    var buttonListLen26 = buttonList26.length;
    for (var buttonIndex26 = 0; buttonIndex26 < buttonListLen26; buttonIndex26++) {
      var buttonData26 = buttonList26[buttonIndex26];
      var type__soy6 = buttonData26.type ? buttonData26.type : 'button';
      var cssClass__soy7 = buttonData26.cssClass ? buttonData26.cssClass : 'btn btn-default';
      ie_open('button', null, null,
          'type', type__soy6,
          'class', cssClass__soy7 + $selectedClass({label: buttonData26.label, selected: opt_data.selected}, null, opt_ijData),
          'data-index', buttonIndex26,
          'data-onclick', 'handleClick_');
        ie_open('span', null, null,
            'class', 'btn-group-label');
          itext((goog.asserts.assert((buttonData26.label ? buttonData26.label : '') != null), buttonData26.label ? buttonData26.label : ''));
        ie_close('span');
        if (buttonData26.icon) {
          ie_void('span', null, null,
              'class', buttonData26.icon);
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
    var selectedValueList35 = opt_data.selected;
    var selectedValueListLen35 = selectedValueList35.length;
    for (var selectedValueIndex35 = 0; selectedValueIndex35 < selectedValueListLen35; selectedValueIndex35++) {
      var selectedValueData35 = selectedValueList35[selectedValueIndex35];
      output += (selectedValueData35 == opt_data.label) ? ' btn-group-selected' : '';
    }
  }
  return output;
}
exports.selectedClass = $selectedClass;
if (goog.DEBUG) {
  $selectedClass.soyTemplateName = 'ButtonGroup.selectedClass';
}

exports.render.params = ["buttons","elementClasses","selected"];
exports.selectedClass.params = ["label","selected"];
templates = exports;
return exports;

});

class ButtonGroup extends Component {}
Soy.register(ButtonGroup, templates);
export default templates;
export { ButtonGroup, templates };
/* jshint ignore:end */
