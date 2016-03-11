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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="datatable component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.Datatable.render_(soy.$$augmentMap(opt_data.data, {renderingRoot: true, tableClasses: opt_data.tableClasses}), null, opt_ijData) + '</div>');
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
      output += (opt_data.columns) ? Templates.Datatable.renderTable_(opt_data, null, opt_ijData) : Templates.Datatable.renderArray_(opt_data, null, opt_ijData);
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
      output += Templates.Datatable.renderObjectLiteral_(opt_data, null, opt_ijData);
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
  var arrayItemValueList38 = opt_data.value;
  var arrayItemValueListLen38 = arrayItemValueList38.length;
  for (var arrayItemValueIndex38 = 0; arrayItemValueIndex38 < arrayItemValueListLen38; arrayItemValueIndex38++) {
    var arrayItemValueData38 = arrayItemValueList38[arrayItemValueIndex38];
    output += '<tr><td>' + Templates.Datatable.render_(arrayItemValueData38, null, opt_ijData) + '</td></tr>';
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
Templates.Datatable.renderObjectLiteral_ = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((opt_data.renderingColumn) ? Templates.Datatable.render_(soy.$$augmentMap(opt_data.value[opt_data.renderingColumn], {tableClasses: opt_data.tableClasses}), null, opt_ijData) : Templates.Datatable.render_({columns: soy.$$getMapKeys(opt_data.value), renderingNestedObject: true, tableClasses: opt_data.tableClasses, type: 'array', value: [{type: 'object', value: opt_data.value}]}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Datatable.renderObjectLiteral_.soyTemplateName = 'Templates.Datatable.renderObjectLiteral_';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Datatable.renderTable_ = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.renderingNestedObject) ? '<span class="datatable-object"><span class="datatable-label collapsed" data-onclick="toggleTableContents">Object, ' + soy.$$escapeHtml(soy.$$getMapKeys(opt_data.value).length) + ' items</span>' : (! opt_data.renderingRoot) ? '<span class="datatable-array"><span class="datatable-label collapsed" data-onclick="toggleTableContents">Array, ' + soy.$$escapeHtml(opt_data.value.length) + ' items</span>' : '') + '<table class="' + soy.$$escapeHtmlAttribute(opt_data.tableClasses ? opt_data.tableClasses : '') + soy.$$escapeHtmlAttribute(opt_data.renderingRoot ? '' : ' hidden') + '"><thead><tr>';
  var columnList82 = opt_data.columns;
  var columnListLen82 = columnList82.length;
  for (var columnIndex82 = 0; columnIndex82 < columnListLen82; columnIndex82++) {
    var columnData82 = columnList82[columnIndex82];
    output += '<th>' + soy.$$escapeHtml(columnData82) + ((opt_data.columnsType) ? '<span class="datatable-type">' + soy.$$escapeHtml(opt_data.columnsType[columnData82]) + '</span>' : '') + '</th>';
  }
  output += '</tr></thead><tbody>';
  var arrayItemValueList93 = opt_data.value;
  var arrayItemValueListLen93 = arrayItemValueList93.length;
  for (var arrayItemValueIndex93 = 0; arrayItemValueIndex93 < arrayItemValueListLen93; arrayItemValueIndex93++) {
    var arrayItemValueData93 = arrayItemValueList93[arrayItemValueIndex93];
    output += '<tr>';
    var columnList95 = opt_data.columns;
    var columnListLen95 = columnList95.length;
    for (var columnIndex95 = 0; columnIndex95 < columnListLen95; columnIndex95++) {
      var columnData95 = columnList95[columnIndex95];
      output += '<td>' + Templates.Datatable.render_(soy.$$augmentMap(arrayItemValueData93, {renderingColumn: columnData95, tableClasses: opt_data.tableClasses}), null, opt_ijData) + '</td>';
    }
    output += '</tr>';
  }
  output += '</tbody></table>' + ((opt_data.renderingNestedObject) ? '</span></span>' : (! opt_data.renderingRoot) ? '</span></span>' : '');
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Datatable.renderTable_.soyTemplateName = 'Templates.Datatable.renderTable_';
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

Templates.Datatable.render.params = ["data","id","elementClasses","tableClasses"];
Templates.Datatable.render_.private = true;
Templates.Datatable.renderArray_.private = true;
Templates.Datatable.renderBoolean_.private = true;
Templates.Datatable.renderNull_.private = true;
Templates.Datatable.renderNumber_.private = true;
Templates.Datatable.renderObjectLiteral_.private = true;
Templates.Datatable.renderTable_.private = true;
Templates.Datatable.renderUndefined_.private = true;
Templates.Datatable.renderString_.private = true;

class Datatable extends Component {}
Datatable.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Datatable');
export default Datatable;
/* jshint ignore:end */
