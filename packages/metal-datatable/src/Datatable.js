'use strict';

import core from 'metal';
import dom from 'metal-dom';
import templates from './Datatable.soy.js';
import Component from 'metal-component';
import KeyboardFocusManager from 'metal-keyboard-focus';
import Soy from 'metal-soy';

class Datatable extends Component {

	/**
	 * Visits array items and asserts that it only contains one literal type.
	 * @param {array} value
	 * @protected
	 * @throws {Error} If types are different.
	 */
	assertNoMixedTypesInArrays_(value) {
		var lastType;
		var acceptArray = (v) => {
			var type = this.getValueType_(v);
			this.assertSameTypes_(lastType, type);
			lastType = type;
			this.assertNoMixedTypesInArrays_(v);
		};
		var acceptObject = (v) => this.assertNoMixedTypesInArrays_(v);
		this.visit_(value, acceptArray, acceptObject);
	}

	/**
	 * Asserts literal types are not the same.
	 * @param {string} type1
	 * @param {string} type2
	 * @protected
	 * @throws {Error} If types are different.
	 */
	assertSameTypes_(type1, type2) {
		if (type1 && type2 && type1 !== type2) {
			throw new Error('Datatable does not support mixed types in arrays.');
		}
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		this.keyboardFocusManager_ = new KeyboardFocusManager(this, 'td,th')
			.setFocusHandler(this.handleNextFocus_.bind(this))
			.start();
	}

	/**
	 * Extract keys from an array of objects. Column values are aggregated from
	 * extracting 1-deep key values. For other array types keys are not
	 * extracted and values are plotted in one column vertically.
	 * @param {object} expandedValue
	 * @protected
	 */
	collectColumnsFromArrayValues_(expandedValue) {
		var value = expandedValue.value;
		var isFirstArrayItemObject = value[0] && value[0].type === Datatable.TYPES.OBJECT;
		if (isFirstArrayItemObject) {
			let columns = {};
			let columnsType = {};
			value.forEach((item) => Object.keys(item.value).forEach((key) => {
				columns[key] = true;
				columnsType[key] = item.value[key].type;
			}));
			expandedValue.columns = this.formatColumns(Object.keys(columns));
			expandedValue.columnsType = this.formatColumnsType(columnsType);
		}
	}

	/**
	 * Extract columns from object keys.
	 * @param {object} expandedValue
	 * @protected
	 */
	collectColumnsFromObjectKeys_(expandedValue) {
		var value = expandedValue.value;
		let columns = {};
		let columnsType = {};
		Object.keys(value).forEach((key) => {
			columns[key] = true;
			columnsType[key] = value[key].type;
		});
		expandedValue.columns = this.formatColumns(Object.keys(columns));
		expandedValue.columnsType = this.formatColumnsType(columnsType);
	}

	/**
	 * Analyzes the expanded object containing type and value and extracts an
	 * array of columns to be used for plotting.
	 * @param {object} expandedValue
	 * @protected
	 */
	collectColumnsFromValues_(expandedValue) {
		switch (expandedValue.type) {
			case Datatable.TYPES.ARRAY:
				this.collectColumnsFromArrayValues_(expandedValue);
				break;
			case Datatable.TYPES.OBJECT:
				this.collectColumnsFromObjectKeys_(expandedValue);
				break;
		}
	}

	/**
	 * @inheritDoc
	 */
	disposed() {
		if (this.keyboardFocusManager_) {
			this.keyboardFocusManager_.dispose();
			this.keyboardFocusManager_ = null;
		}
	}

	/**
	 * Internal helper to get literal JSON type of a value.
	 * @param {*} value
	 * @return {string} Type inferred from JSON value.
	 */
	getValueType_(value) {
		if (value === null) {
			return Datatable.TYPES.NULL;
		}
		if (value === undefined) {
			return Datatable.TYPES.UNDEFINED;
		}
		if (Array.isArray(value)) {
			return Datatable.TYPES.ARRAY;
		}
		if (core.isObject(value) && value.contentKind === 'HTML') {
			return Datatable.TYPES.STRING;
		}
		return typeof value;
	}

	/**
	 * Handles focus through keyboard.
	 * @param {!Event} event
	 * @return {boolean|string|Element}
	 * @protected
	 */
	handleNextFocus_() {
		event.stopPropagation();

		const ref = event.delegateTarget.getAttribute('ref');
		switch (event.keyCode) {
			case 38:
				event.preventDefault();
				return this.incrementRefRow_(ref, -1);
			case 40:
				event.preventDefault();
				return this.incrementRefRow_(ref, 1);
			default:
				// Use default behavior for other keys (like left/right arrows).
				return true;
		}
	}

	/**
	 * Increments the row position in the given ref.
	 * @param {string} ref
	 * @param {number} inc The amount the position should be incremented by.
	 * @return {string}
	 * @protected
	 */
	incrementRefRow_(ref, inc) {
		return ref.replace(Datatable.REF_REGEX, (match, row, column) => {
			return (parseInt(row, 10) + inc) + '-' + column;
		});
	}

	/**
	 * Returns true if data is already expanded, false otherwise.
	 * @param {*} data
	 * @return {boolean}
	 */
	isAlreadyExpanded(data) {
		return core.isObject(data) && 'columns' in data && 'type' in data;
	}

	/**
	 * Setter for the `data` state property.
	 * @param {!Object}
	 * @return {!Object}
	 * @protected
	 */
	setData_(data) {
		if (!this.isAlreadyExpanded(data)) {
			this.assertNoMixedTypesInArrays_(data);
			data = this.visitValuesAndExpandType_(data);
		}
		return this.visitValuesAndWrapStringValues_(data);
	}

	/**
	 * Toggles sibling table content of <code>event.delegateTarget</code>.
	 * @param {Event} event
	 */
	toggleTableContents(event) {
		var label = event.delegateTarget;
		dom.toggleClasses(label, this.labelClasses);
		dom.toggleClasses(dom.next(label, 'table'), this.hiddenClasses);
	}

	/**
	 * Internal non-recursive visitor helper to navigate over JSON values.
	 * @param {*} value The value to start the visit.
	 * @param {!function} acceptArray Accept logic for array items.
	 * @param {!function} acceptObject Accept logic for object keys and values.
	 * @protected
	 */
	visit_(value, acceptArray, acceptObject) {
		switch (this.getValueType_(value)) {
			case Datatable.TYPES.ARRAY:
				value.forEach((v, k) => acceptArray(v, k, value));
				break;
			case Datatable.TYPES.OBJECT:
				Object.keys(value).forEach((k) => acceptObject(value[k], k, value));
				break;
		}
	}

	/**
	 * Visits all json values and wraps it in object containing its type and
	 * value.
	 * @param {*} value The value to start the visit.
	 * @return {object} Wrapped object containing type and value.
	 * @protected
	 */
	visitValuesAndExpandType_(value) {
		var acceptArray = (val, key, reference) => reference[key] = this.visitValuesAndExpandType_(val);
		var acceptObject = (val, key, reference) => reference[key] = this.visitValuesAndExpandType_(val);
		this.visit_(value, acceptArray, acceptObject);
		var type = this.getValueType_(value);
		var expanded = {
			type: type,
			value: value
		};
		this.collectColumnsFromValues_(expanded);
		return expanded;
	}

	/**
	 * Visits all json values and wraps it in special `Soy.toIncDom` helper if
	 * it's string.
	 * @param {*} value The value to start the visit.
	 * @return {object} Wrapped string.
	 * @protected
	 */
	visitValuesAndWrapStringValues_(value) {
		var acceptArray = (val, key, reference) => reference[key] = this.visitValuesAndWrapStringValues_(val);
		var acceptObject = (val, key, reference) => reference[key] = this.visitValuesAndWrapStringValues_(val);
		this.visit_(value, acceptArray, acceptObject);
		if (core.isObject(value)) {
			var type = this.getValueType_(value.value);
			if (type === Datatable.TYPES.STRING) {
				value.value = Soy.toIncDom(value.value);
			}
		}
		return value;
	}

}
Soy.register(Datatable, templates);

Datatable.STATE = {
	/**
	 * Data to be plotted on datatable. Any JSON type is supported if it does
	 * not contain mixed types inside an array.
	 * @type {*}
	 */
	data: {
		setter: 'setData_'
	},

	/**
	 * If true displays types in column.
	 * @type {boolean}
	 * @default true
	 */
	displayColumnsType: {
		validator: core.isBoolean,
		value: true
	},

	/**
	 * Formats array of columns extracted from JSON data. Relevant for operates
	 * over column values, such as sorting and formatting.
	 * @type {function(array.<string>)}
	 */
	formatColumns: {
		validator: core.isFunction,
		value: function(columns) {
			return columns.sort();
		}
	},

	/**
	 * Formats map of columns type extracted from JSON data. Relevant for
	 * operates over column values, such as sorting and formatting.
	 * @type {function(map.<string,string>)}
	 */
	formatColumnsType: {
		validator: core.isFunction,
		value: function(columnstype) {
			return columnstype;
		}
	},

	/**
	 * Css classes to be used for hidden state.
	 * @type {string}
	 * @default 'hidden'
	 */
	hiddenClasses: {
		validator: core.isString,
		value: 'hidden'
	},

	/**
	 * Css classes to be used for labels.
	 * @type {string}
	 * @default 'collapsed expanded'
	 */
	labelClasses: {
		validator: core.isString,
		value: 'collapsed expanded'
	},

	/**
	 * Css classes to be used for tables.
	 * @type {string}
	 * @default 'table table-condensed table-hover'
	 */
	tableClasses: {
		validator: core.isString,
		value: 'table table-bordered table-condensed table-hover'
	}
};

// The regex used to extract the row/column positions from an element's ref.
Datatable.REF_REGEX = /(\d+)-(\d+)$/;

/**
 * Datatable supported types.
 * @type {object}
 * @static
 */
Datatable.TYPES = {
	ARRAY: 'array',
	BOOLEAN: 'boolean',
	NULL: 'null',
	NUMBER: 'number',
	OBJECT: 'object',
	STRING: 'string',
	UNDEFINED: 'undefined'
};

export default Datatable;
