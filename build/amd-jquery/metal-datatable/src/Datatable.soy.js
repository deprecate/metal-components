define(['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.Datatable = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _Soy2 = _interopRequireDefault(_Soy);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from Datatable.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace Datatable.
     * @public
     */

    goog.module('Datatable.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
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
      ie_open('div', null, null, 'class', 'datatable' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
      $render_(soy.$$assignDefaults({ displayColumnsType: opt_data.displayColumnsType, path: 'table', tableClasses: opt_data.tableClasses }, opt_data.data), null, opt_ijData);
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
      switch (goog.isObject($$temp = opt_data.type) ? $$temp.toString() : $$temp) {
        case 'array':
          if (opt_data.columns) {
            $renderArrayOfObjects_(opt_data, null, opt_ijData);
          } else {
            $renderArray_(opt_data, null, opt_ijData);
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
      ie_open('span', null, null, 'class', 'datatable-array');
      $tableLabel({ number: opt_data.value.length, path: opt_data.path, type: 'Array' }, null, opt_ijData);
      ie_open('table', null, null, 'class', (opt_data.tableClasses ? opt_data.tableClasses + '' : '') + ' hidden', 'role', 'grid');
      ie_open('tbody');
      var itemValueList48 = opt_data.value;
      var itemValueListLen48 = itemValueList48.length;
      for (var itemValueIndex48 = 0; itemValueIndex48 < itemValueListLen48; itemValueIndex48++) {
        var itemValueData48 = itemValueList48[itemValueIndex48];
        $renderObjectRow_({ columns: [0], displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-' + itemValueIndex48, rowIndex: itemValueIndex48, rowLength: opt_data.value.length, tableClasses: opt_data.tableClasses, value: [itemValueData48] }, null, opt_ijData);
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
      ie_open('span', null, null, 'class', 'datatable-array-object');
      ie_open('table', null, null, 'class', opt_data.tableClasses ? opt_data.tableClasses : '', 'role', 'grid');
      $renderObjectHeaders_({ columns: opt_data.columns, columnsType: opt_data.columnsType, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-0', rowLength: opt_data.value.length + 1 }, null, opt_ijData);
      ie_open('tbody');
      var itemValueList70 = opt_data.value;
      var itemValueListLen70 = itemValueList70.length;
      for (var itemValueIndex70 = 0; itemValueIndex70 < itemValueListLen70; itemValueIndex70++) {
        var itemValueData70 = itemValueList70[itemValueIndex70];
        $renderObjectRow_({ columns: opt_data.columns, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-' + (itemValueIndex70 + 1), rowIndex: itemValueIndex70 + 1, rowLength: opt_data.value.length + 1, tableClasses: opt_data.tableClasses, value: itemValueData70.value }, null, opt_ijData);
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
      ie_open('span', null, null, 'class', 'datatable-boolean');
      var dyn0 = opt_data.value;
      if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
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
      ie_open('span', null, null, 'class', 'datatable-null');
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
      ie_open('span', null, null, 'class', 'datatable-number');
      var dyn1 = opt_data.value;
      if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
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
      ie_open('span', null, null, 'class', 'datatable-object');
      $tableLabel({ number: soy.$$getMapKeys(opt_data.value).length, path: opt_data.path, type: 'Object' }, null, opt_ijData);
      ie_open('table', null, null, 'class', (opt_data.tableClasses ? opt_data.tableClasses : '') + ' hidden', 'role', 'grid');
      $renderObjectHeaders_({ columns: opt_data.columns, columnsType: opt_data.columnsType, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-0', rowLength: 2 }, null, opt_ijData);
      ie_open('tbody');
      $renderObjectRow_({ columns: opt_data.columns, displayColumnsType: opt_data.displayColumnsType, path: opt_data.path + '-1', rowIndex: 1, rowLength: 2, tableClasses: opt_data.tableClasses, value: opt_data.value }, null, opt_ijData);
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
    function $renderObjectHeaders_(opt_data, opt_ignored, opt_ijData) {
      ie_open('thead');
      ie_open('tr', null, null, 'data-rows', opt_data.rowLength);
      var columnList127 = opt_data.columns;
      var columnListLen127 = columnList127.length;
      for (var columnIndex127 = 0; columnIndex127 < columnListLen127; columnIndex127++) {
        var columnData127 = columnList127[columnIndex127];
        var currPath__soy112 = opt_data.path + '-' + columnIndex127;
        ie_open('th', null, null, 'role', 'columnheader', 'scope', 'col', 'ref', currPath__soy112, 'tabindex', columnIndex127 == 0 ? '0' : '-1', 'data-cols', opt_data.columns.length);
        var dyn2 = columnData127;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        if (opt_data.displayColumnsType && opt_data.columnsType) {
          ie_open('span', null, null, 'class', 'datatable-type');
          var dyn3 = opt_data.columnsType[columnData127];
          if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
          ie_close('span');
        }
        ie_close('th');
      }
      ie_close('tr');
      ie_close('thead');
    }
    exports.renderObjectHeaders_ = $renderObjectHeaders_;
    if (goog.DEBUG) {
      $renderObjectHeaders_.soyTemplateName = 'Datatable.renderObjectHeaders_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderObjectRow_(opt_data, opt_ignored, opt_ijData) {
      ie_open('tr', null, null, 'data-rows', opt_data.rowLength);
      var columnList147 = opt_data.columns;
      var columnListLen147 = columnList147.length;
      for (var columnIndex147 = 0; columnIndex147 < columnListLen147; columnIndex147++) {
        var columnData147 = columnList147[columnIndex147];
        var currPath__soy134 = opt_data.path + '-' + columnIndex147;
        ie_open('td', null, null, 'role', 'gridcell', 'ref', currPath__soy134, 'tabindex', opt_data.rowIndex == 0 && columnIndex147 == 0 ? '0' : '-1', 'data-cols', opt_data.columns.length);
        $render_(soy.$$assignDefaults({ displayColumnsType: opt_data.displayColumnsType, path: currPath__soy134, tableClasses: opt_data.tableClasses }, opt_data.value[columnData147]), null, opt_ijData);
        ie_close('td');
      }
      ie_close('tr');
    }
    exports.renderObjectRow_ = $renderObjectRow_;
    if (goog.DEBUG) {
      $renderObjectRow_.soyTemplateName = 'Datatable.renderObjectRow_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $renderUndefined_(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-undefined');
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
      soy.asserts.assertType(opt_data.value instanceof Function || opt_data.value instanceof soydata.UnsanitizedText || goog.isString(opt_data.value), 'value', opt_data.value, 'Function');
      var value = /** @type {Function} */opt_data.value;
      ie_open('span', null, null, 'class', 'datatable-string');
      value();
      ie_close('span');
    }
    exports.renderString_ = $renderString_;
    if (goog.DEBUG) {
      $renderString_.soyTemplateName = 'Datatable.renderString_';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $tableLabel(opt_data, opt_ignored, opt_ijData) {
      ie_open('span', null, null, 'class', 'datatable-label collapsed', 'data-onkeydown', 'handleKeydownToggle_', 'data-onclick', 'handleClickToggle_', 'ref', opt_data.path + '-label', 'tabindex', opt_data.path == 'table' ? 0 : -1);
      var dyn4 = opt_data.type;
      if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
      itext(', ');
      var dyn5 = opt_data.number;
      if (typeof dyn5 == 'function') dyn5();else if (dyn5 != null) itext(dyn5);
      itext(' items');
      ie_close('span');
    }
    exports.tableLabel = $tableLabel;
    if (goog.DEBUG) {
      $tableLabel.soyTemplateName = 'Datatable.tableLabel';
    }

    exports.render.params = ["data", "displayColumnsType", "elementClasses", "tableClasses"];
    exports.render.types = { "data": "any", "displayColumnsType": "any", "elementClasses": "any", "tableClasses": "any" };
    exports.render_.params = ["path", "type", "columns"];
    exports.render_.types = { "path": "any", "type": "any", "columns": "any" };
    exports.renderArray_.params = ["path", "value", "displayColumnsType", "tableClasses"];
    exports.renderArray_.types = { "path": "any", "value": "any", "displayColumnsType": "any", "tableClasses": "any" };
    exports.renderArrayOfObjects_.params = ["columns", "value", "columnsType", "displayColumnsType", "path", "tableClasses"];
    exports.renderArrayOfObjects_.types = { "columns": "any", "value": "any", "columnsType": "any", "displayColumnsType": "any", "path": "any", "tableClasses": "any" };
    exports.renderBoolean_.params = ["value"];
    exports.renderBoolean_.types = { "value": "any" };
    exports.renderNull_.params = [];
    exports.renderNull_.types = {};
    exports.renderNumber_.params = ["value"];
    exports.renderNumber_.types = { "value": "any" };
    exports.renderObject_.params = ["columns", "value", "columnsType", "displayColumnsType", "path", "tableClasses"];
    exports.renderObject_.types = { "columns": "any", "value": "any", "columnsType": "any", "displayColumnsType": "any", "path": "any", "tableClasses": "any" };
    exports.renderObjectHeaders_.params = ["columns", "columnsType", "displayColumnsType", "path", "rowLength"];
    exports.renderObjectHeaders_.types = { "columns": "any", "columnsType": "any", "displayColumnsType": "any", "path": "any", "rowLength": "any" };
    exports.renderObjectRow_.params = ["columns", "value", "displayColumnsType", "path", "rowIndex", "rowLength", "tableClasses"];
    exports.renderObjectRow_.types = { "columns": "any", "value": "any", "displayColumnsType": "any", "path": "any", "rowIndex": "any", "rowLength": "any", "tableClasses": "any" };
    exports.renderUndefined_.params = [];
    exports.renderUndefined_.types = {};
    exports.renderString_.params = ["value"];
    exports.renderString_.types = { "value": "html" };
    exports.tableLabel.params = ["number", "path", "type"];
    exports.tableLabel.types = { "number": "any", "path": "any", "type": "any" };
    exports.templates = templates = exports;
    return exports;
  });

  var Datatable = function (_Component) {
    _inherits(Datatable, _Component);

    function Datatable() {
      _classCallCheck(this, Datatable);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Datatable;
  }(_component2.default);

  _Soy2.default.register(Datatable, templates);
  exports.Datatable = Datatable;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=Datatable.soy.js.map