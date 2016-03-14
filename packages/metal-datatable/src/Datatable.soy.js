/* jshint ignore:start */
import Component from 'metal-component';
import { SoyAop, SoyRenderer, SoyTemplates } from 'metal-soy';
var Templates = SoyTemplates.get();
// This file was automatically generated from Datatable.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Datatable.
 */

if (typeof Templates.Datatable == 'undefined') { Templates.Datatable = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="datatable component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.Datatable.render_(soy.$$augmentMap(opt_data.data, {displayColumnsType: opt_data.displayColumnsType, tableClasses: opt_data.tableClasses}), null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.Datatable.render.soyTemplateName = 'Templates.Datatable.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.render_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  switch (opt_data.type) {
    case 'array':
      output += (opt_data.columns) ? Templates.Datatable.renderArrayOfObjects_(opt_data, null, opt_ijData) : Templates.Datatable.renderArray_(opt_data, null, opt_ijData);
      break;
    case 'boolean':
      output += Templates.Datatable.renderBoolean_(opt_data, null, opt_ijData);
      break;
    case 'null':
      output += Templates.Datatable.renderNull_(opt_data, null, opt_ijData);
      break;
    case 'number':
      output += Templates.Datatable.renderNumber_(opt_data, null, opt_ijData);
      break;
    case 'object':
      output += Templates.Datatable.renderObject_(opt_data, null, opt_ijData);
      break;
    case 'string':
      output += Templates.Datatable.renderString_(opt_data, null, opt_ijData);
      break;
    case 'undefined':
      output += Templates.Datatable.renderUndefined_(opt_data, null, opt_ijData);
      break;
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Datatable.render_.soyTemplateName = 'Templates.Datatable.render_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderArray_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<span class="datatable-array"><span class="datatable-label collapsed" data-onclick="toggleTableContents">Array, ' + soy.$$escapeHtml(opt_data.value.length) + ' items</span><table class="' + soy.$$escapeHtmlAttribute(opt_data.tableClasses ? opt_data.tableClasses + '' : '') + ' hidden"><tbody>';
  var itemValueList38 = opt_data.value;
  var itemValueListLen38 = itemValueList38.length;
  for (var itemValueIndex38 = 0; itemValueIndex38 < itemValueListLen38; itemValueIndex38++) {
    var itemValueData38 = itemValueList38[itemValueIndex38];
    output += '<tr><td>' + Templates.Datatable.render_(soy.$$augmentMap(itemValueData38, {tableClasses: opt_data.tableClasses, displayColumnsType: opt_data.displayColumnsType}), null, opt_ijData) + '</td></tr>';
  }
  output += '</tbody></table></span>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Datatable.renderArray_.soyTemplateName = 'Templates.Datatable.renderArray_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderArrayOfObjects_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<span class="datatable-array-object"><table class="' + soy.$$escapeHtmlAttribute(opt_data.tableClasses ? opt_data.tableClasses : '') + '"><thead><tr>';
  var columnList50 = opt_data.columns;
  var columnListLen50 = columnList50.length;
  for (var columnIndex50 = 0; columnIndex50 < columnListLen50; columnIndex50++) {
    var columnData50 = columnList50[columnIndex50];
    output += '<th>' + soy.$$escapeHtml(columnData50) + ((opt_data.displayColumnsType && opt_data.columnsType) ? '<span class="datatable-type">' + soy.$$escapeHtml(opt_data.columnsType[columnData50]) + '</span>' : '') + '</th>';
  }
  output += '</tr></thead><tbody>';
  var itemValueList61 = opt_data.value;
  var itemValueListLen61 = itemValueList61.length;
  for (var itemValueIndex61 = 0; itemValueIndex61 < itemValueListLen61; itemValueIndex61++) {
    var itemValueData61 = itemValueList61[itemValueIndex61];
    output += '<tr>';
    var columnList63 = opt_data.columns;
    var columnListLen63 = columnList63.length;
    for (var columnIndex63 = 0; columnIndex63 < columnListLen63; columnIndex63++) {
      var columnData63 = columnList63[columnIndex63];
      output += '<td>' + Templates.Datatable.render_(soy.$$augmentMap(itemValueData61.value[columnData63], {displayColumnsType: opt_data.displayColumnsType, tableClasses: opt_data.tableClasses}), null, opt_ijData) + '</td>';
    }
    output += '</tr>';
  }
  output += '</tbody></table></span>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Datatable.renderArrayOfObjects_.soyTemplateName = 'Templates.Datatable.renderArrayOfObjects_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderBoolean_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="datatable-boolean">' + soy.$$escapeHtml(opt_data.value) + '</span>');
};
if (goog.DEBUG) {
  Templates.Datatable.renderBoolean_.soyTemplateName = 'Templates.Datatable.renderBoolean_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderNull_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="datatable-null">' + soy.$$escapeHtml(opt_data.value) + '</span>');
};
if (goog.DEBUG) {
  Templates.Datatable.renderNull_.soyTemplateName = 'Templates.Datatable.renderNull_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderNumber_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="datatable-number">' + soy.$$escapeHtml(opt_data.value) + '</span>');
};
if (goog.DEBUG) {
  Templates.Datatable.renderNumber_.soyTemplateName = 'Templates.Datatable.renderNumber_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderObject_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<span class="datatable-object"><span class="datatable-label collapsed" data-onclick="toggleTableContents">Object, ' + soy.$$escapeHtml(soy.$$getMapKeys(opt_data.value).length) + ' items</span><table class="' + soy.$$escapeHtmlAttribute(opt_data.tableClasses ? opt_data.tableClasses : '') + ' hidden"><thead><tr>';
  var columnList91 = opt_data.columns;
  var columnListLen91 = columnList91.length;
  for (var columnIndex91 = 0; columnIndex91 < columnListLen91; columnIndex91++) {
    var columnData91 = columnList91[columnIndex91];
    output += '<th>' + soy.$$escapeHtml(columnData91) + ((opt_data.displayColumnsType && opt_data.columnsType) ? '<span class="datatable-type">' + soy.$$escapeHtml(opt_data.columnsType[columnData91]) + '</span>' : '') + '</th>';
  }
  output += '</tr></thead><tbody><tr>';
  var columnList102 = opt_data.columns;
  var columnListLen102 = columnList102.length;
  for (var columnIndex102 = 0; columnIndex102 < columnListLen102; columnIndex102++) {
    var columnData102 = columnList102[columnIndex102];
    output += '<td>' + Templates.Datatable.render_(soy.$$augmentMap(opt_data.value[columnData102], {displayColumnsType: opt_data.displayColumnsType, tableClasses: opt_data.tableClasses}), null, opt_ijData) + '</td>';
  }
  output += '</tr></tbody></table></span></span>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Datatable.renderObject_.soyTemplateName = 'Templates.Datatable.renderObject_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderUndefined_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="datatable-undefined">' + soy.$$escapeHtml(opt_data.value) + '</span>');
};
if (goog.DEBUG) {
  Templates.Datatable.renderUndefined_.soyTemplateName = 'Templates.Datatable.renderUndefined_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderString_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<span class="datatable-string">' + soy.$$escapeHtml(opt_data.value) + '</span>');
};
if (goog.DEBUG) {
  Templates.Datatable.renderString_.soyTemplateName = 'Templates.Datatable.renderString_';
}

Templates.Datatable.render.params = ["data","id","displayColumnsType","elementClasses","tableClasses"];
Templates.Datatable.render_.private = true;
Templates.Datatable.renderArray_.private = true;
Templates.Datatable.renderArrayOfObjects_.private = true;
Templates.Datatable.renderBoolean_.private = true;
Templates.Datatable.renderNull_.private = true;
Templates.Datatable.renderNumber_.private = true;
Templates.Datatable.renderObject_.private = true;
Templates.Datatable.renderUndefined_.private = true;
Templates.Datatable.renderString_.private = true;

class Datatable extends Component {}
Datatable.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Datatable');
export default Datatable;
/* jshint ignore:end */
