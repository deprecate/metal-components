/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Tabs.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Tabs.
 * @public
 */

goog.module('Tabs.incrementaldom');

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
  var $$temp;
  if (opt_data.tabs.length > 0) {
    ie_open('ul', null, null,
        'class', 'nav ' + (opt_data.type != 'none' ? 'nav-' + opt_data.type : '') + ' ' + (($$temp = opt_data.elementClasses) == null ? '' : $$temp),
        'role', 'tablist');
      var current_tabList29 = opt_data.tabs;
      var current_tabListLen29 = current_tabList29.length;
      for (var current_tabIndex29 = 0; current_tabIndex29 < current_tabListLen29; current_tabIndex29++) {
        var current_tabData29 = current_tabList29[current_tabIndex29];
        var isDisabled__soy10 = opt_data.disabled || current_tabData29.disabled;
        var isCurrentTab__soy11 = opt_data.tab == current_tabIndex29;
        ie_open_start('li');
            iattr('class', (isDisabled__soy10 ? 'disabled' : '') + ' ' + (isCurrentTab__soy11 ? 'active' : ''));
            iattr('data-index', current_tabIndex29);
            if (! isDisabled__soy10 && ! isCurrentTab__soy11) {
              iattr('data-onclick', 'onClickItem');
            }
            iattr('role', 'presentation');
        ie_open_end();
          ie_open_start('a');
              if (! isDisabled__soy10) {
                iattr('href', '#');
              }
              iattr('role', 'tab');
              iattr('data-toggle', 'tab');
          ie_open_end();
            itext((goog.asserts.assert((current_tabData29.label) != null), current_tabData29.label));
          ie_close('a');
        ie_close('li');
      }
    ie_close('ul');
  }
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Tabs.render';
}

exports.render.params = ["disabled","elementClasses","tab","tabs","type"];
exports.render.types = {"disabled":"any","elementClasses":"any","tab":"any","tabs":"any","type":"any"};
templates = exports;
return exports;

});

class Tabs extends Component {}
Soy.register(Tabs, templates);
export { Tabs, templates };
export default templates;
/* jshint ignore:end */
