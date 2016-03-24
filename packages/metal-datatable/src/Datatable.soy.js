/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Datatable.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Datatable.
 * @public
 */

goog.module('Datatable.incrementaldom');

var soy = goog.require('soy');
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
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
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'id', opt_data.id,
      'class', 'datatable' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    $render_(soy.$$augmentMap(opt_data.data, {displayColumnsType: opt_data.displayColumnsType, tableClasses: opt_data.tableClasses}), null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Datatable.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render_(opt_data, opt_ignored, opt_ijData) {
  var $$temp;
  switch ((goog.isObject($$temp = opt_data.type)) ? $$temp.toString() : $$temp) {
    case 'array':
      if (opt_data.columns) {
        ie_open('span');
          $renderArrayOfObjects_(opt_data, null, opt_ijData);
        ie_close('span');
      } else {
        ie_open('span');
          $renderArray_(opt_data, null, opt_ijData);
        ie_close('span');
      }
      break;
    case 'boolean':
      $renderBoolean_(opt_data, null, opt_ijData);
      break;
    case 'null':
      $renderNull_(opt_data, null, opt_ijData);
      break;
    case 'number':
      $renderNumber_(opt_data, null, opt_ijData);
      break;
    case 'object':
      $renderObject_(opt_data, null, opt_ijData);
      break;
    case 'string':
      $renderString_(opt_data, null, opt_ijData);
      break;
    case 'undefined':
      $renderUndefined_(opt_data, null, opt_ijData);
      break;
  }
}
exports.render_ = $render_;
if (goog.DEBUG) {
  $render_.soyTemplateName = 'Datatable.render_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderArray_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-array');
    ie_open('span', null, null,
        'class', 'datatable-label collapsed',
        'data-onclick', 'toggleTableContents');
      itext('Array, ');
      itext((goog.asserts.assert((opt_data.value.length) != null), opt_data.value.length));
      itext(' items');
    ie_close('span');
    ie_open('table', null, null,
        'class', (opt_data.tableClasses ? opt_data.tableClasses + '' : '') + ' hidden');
      ie_open('tbody');
        var itemValueList47 = opt_data.value;
        var itemValueListLen47 = itemValueList47.length;
        for (var itemValueIndex47 = 0; itemValueIndex47 < itemValueListLen47; itemValueIndex47++) {
          var itemValueData47 = itemValueList47[itemValueIndex47];
          ie_open('tr');
            ie_open('td');
              $render_(soy.$$augmentMap(itemValueData47, {tableClasses: opt_data.tableClasses, displayColumnsType: opt_data.displayColumnsType}), null, opt_ijData);
            ie_close('td');
          ie_close('tr');
        }
      ie_close('tbody');
    ie_close('table');
  ie_close('span');
}
exports.renderArray_ = $renderArray_;
if (goog.DEBUG) {
  $renderArray_.soyTemplateName = 'Datatable.renderArray_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderArrayOfObjects_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-array-object');
    ie_open('table', null, null,
        'class', opt_data.tableClasses ? opt_data.tableClasses : '');
      ie_open('thead');
        ie_open('tr');
          var columnList62 = opt_data.columns;
          var columnListLen62 = columnList62.length;
          for (var columnIndex62 = 0; columnIndex62 < columnListLen62; columnIndex62++) {
            var columnData62 = columnList62[columnIndex62];
            ie_open('th');
              itext((goog.asserts.assert((columnData62) != null), columnData62));
              if (opt_data.displayColumnsType && opt_data.columnsType) {
                ie_open('span', null, null,
                    'class', 'datatable-type');
                  itext((goog.asserts.assert((opt_data.columnsType[columnData62]) != null), opt_data.columnsType[columnData62]));
                ie_close('span');
              }
            ie_close('th');
          }
        ie_close('tr');
      ie_close('thead');
      ie_open('tbody');
        var itemValueList74 = opt_data.value;
        var itemValueListLen74 = itemValueList74.length;
        for (var itemValueIndex74 = 0; itemValueIndex74 < itemValueListLen74; itemValueIndex74++) {
          var itemValueData74 = itemValueList74[itemValueIndex74];
          ie_open('tr');
            var columnList71 = opt_data.columns;
            var columnListLen71 = columnList71.length;
            for (var columnIndex71 = 0; columnIndex71 < columnListLen71; columnIndex71++) {
              var columnData71 = columnList71[columnIndex71];
              ie_open('td');
                $render_(soy.$$augmentMap(itemValueData74.value[columnData71], {displayColumnsType: opt_data.displayColumnsType, tableClasses: opt_data.tableClasses}), null, opt_ijData);
              ie_close('td');
            }
          ie_close('tr');
        }
      ie_close('tbody');
    ie_close('table');
  ie_close('span');
}
exports.renderArrayOfObjects_ = $renderArrayOfObjects_;
if (goog.DEBUG) {
  $renderArrayOfObjects_.soyTemplateName = 'Datatable.renderArrayOfObjects_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderBoolean_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-boolean');
    itext((goog.asserts.assert((opt_data.value) != null), opt_data.value));
  ie_close('span');
}
exports.renderBoolean_ = $renderBoolean_;
if (goog.DEBUG) {
  $renderBoolean_.soyTemplateName = 'Datatable.renderBoolean_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderNull_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-null');
    itext('null');
  ie_close('span');
}
exports.renderNull_ = $renderNull_;
if (goog.DEBUG) {
  $renderNull_.soyTemplateName = 'Datatable.renderNull_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderNumber_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-number');
    itext((goog.asserts.assert((opt_data.value) != null), opt_data.value));
  ie_close('span');
}
exports.renderNumber_ = $renderNumber_;
if (goog.DEBUG) {
  $renderNumber_.soyTemplateName = 'Datatable.renderNumber_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderObject_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-object');
    ie_open('span', null, null,
        'class', 'datatable-label collapsed',
        'data-onclick', 'toggleTableContents');
      itext('Object, ');
      itext((goog.asserts.assert((soy.$$getMapKeys(opt_data.value).length) != null), soy.$$getMapKeys(opt_data.value).length));
      itext(' items');
    ie_close('span');
    ie_open('table', null, null,
        'class', (opt_data.tableClasses ? opt_data.tableClasses : '') + ' hidden');
      ie_open('thead');
        ie_open('tr');
          var columnList101 = opt_data.columns;
          var columnListLen101 = columnList101.length;
          for (var columnIndex101 = 0; columnIndex101 < columnListLen101; columnIndex101++) {
            var columnData101 = columnList101[columnIndex101];
            ie_open('th');
              itext((goog.asserts.assert((columnData101) != null), columnData101));
              if (opt_data.displayColumnsType && opt_data.columnsType) {
                ie_open('span', null, null,
                    'class', 'datatable-type');
                  itext((goog.asserts.assert((opt_data.columnsType[columnData101]) != null), opt_data.columnsType[columnData101]));
                ie_close('span');
              }
            ie_close('th');
          }
        ie_close('tr');
      ie_close('thead');
      ie_open('tbody');
        ie_open('tr');
          var columnList109 = opt_data.columns;
          var columnListLen109 = columnList109.length;
          for (var columnIndex109 = 0; columnIndex109 < columnListLen109; columnIndex109++) {
            var columnData109 = columnList109[columnIndex109];
            ie_open('td');
              $render_(soy.$$augmentMap(opt_data.value[columnData109], {displayColumnsType: opt_data.displayColumnsType, tableClasses: opt_data.tableClasses}), null, opt_ijData);
            ie_close('td');
          }
        ie_close('tr');
      ie_close('tbody');
    ie_close('table');
  ie_close('span');
}
exports.renderObject_ = $renderObject_;
if (goog.DEBUG) {
  $renderObject_.soyTemplateName = 'Datatable.renderObject_';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderUndefined_(opt_data, opt_ignored, opt_ijData) {
  ie_open('span', null, null,
      'class', 'datatable-undefined');
    itext('undefined');
  ie_close('span');
}
exports.renderUndefined_ = $renderUndefined_;
if (goog.DEBUG) {
  $renderUndefined_.soyTemplateName = 'Datatable.renderUndefined_';
}


/**
 * @param {{
 *    value: (!soydata.SanitizedHtml|string)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderString_(opt_data, opt_ignored, opt_ijData) {
  soy.asserts.assertType((opt_data.value instanceof Function) || (opt_data.value instanceof soydata.UnsanitizedText) || goog.isString(opt_data.value), 'value', opt_data.value, 'Function');
  var value = /** @type {Function} */ (opt_data.value);
  ie_open('span', null, null,
      'class', 'datatable-string');
    value();
  ie_close('span');
}
exports.renderString_ = $renderString_;
if (goog.DEBUG) {
  $renderString_.soyTemplateName = 'Datatable.renderString_';
}

exports.render.params = ["data","id","displayColumnsType","elementClasses","tableClasses"];
exports.render_.params = ["type","columns"];
exports.renderArray_.params = ["value","displayColumnsType","tableClasses"];
exports.renderArrayOfObjects_.params = ["columns","value","columnsType","displayColumnsType","tableClasses"];
exports.renderBoolean_.params = ["value"];
exports.renderNull_.params = [];
exports.renderNumber_.params = ["value"];
exports.renderObject_.params = ["columns","value","columnsType","displayColumnsType","tableClasses"];
exports.renderUndefined_.params = [];
exports.renderString_.params = ["value"];
templates = exports;
return exports;

});

class Datatable extends Component {}
Soy.register(Datatable, templates);
export default templates;
export { Datatable, templates };
/* jshint ignore:end */
