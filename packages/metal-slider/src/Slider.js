'use strict';

import core from 'metal/src/core';
import Drag from 'metal-drag-drop/src/Drag';
import Position from 'metal-position/src/Position';
import SliderBase from './Slider.soy';

/**
 * Slider component.
 */
class Slider extends SliderBase {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);

		/**
		 * Map of different slider DOM elements. Used as a cache to prevent unnecessary dom lookups
		 * on succesive queries.
		 * @type {Map}
		 * @protected
		 */
		this.elements_ = new Map();
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		/**
		 * Manages dragging the rail handle to update the slider value.
		 * @type {Drag}
		 * @protected
		 */
		this.drag_ = new Drag({
			constrain: this.getElement_('.rail'),
			handles: this.getElement_('.handle'),
			sources: this.getElement_('.rail-handle')
		});

		/**
		 * Position and dimensions of the slider element.
		 * @type {DOMRect}
		 * @protected
		 */
		this.elementRegion_ = Position.getRegion(this.element);

		this.attachDragEvents_();
	}

	/**
	 * Attaches the drag events to handle value updates when dragging the rail handle.
	 * protected
	 */
	attachDragEvents_() {
		this.drag_.on(Drag.Events.DRAG, this.updateValueFromDragData_.bind(this));
		this.drag_.on(Drag.Events.END, this.updateValueFromDragData_.bind(this));
	}

	/**
	 * @inheritDoc
	 */
	disposeInternal() {
		super.disposeInternal();

		this.drag_.dispose();
		this.elements_ = null;
		this.elementRegion_ = null;
	}

	/**
	 * Returns a DOM element inside the slider component based on a selector query.
	 * @param {string} query Query selector matching the desired element inside the Slider.
	 * @return {Element} The slider element, or null if none was found.
	 * @protected
	 */
	getElement_(query) {
		let element = this.elements_.get(query);

		if (!element) {
			element = this.element.querySelector(query);

			this.elements_.set(query, element);
		}

		return element;
	}

	/**
	 * Handles mouse down actions on the slider rail and updates the slider value accordingly.
	 * @param {!Event} event
	 * @protected
	 */
	onRailMouseDown_(event) {
		if (event.target === this.getElement_('.rail') || event.target === this.getElement_('.rail-active')) {
			this.updateValue_(event.offsetX, 0);
		}
	}

	/**
	 * Synchronizes the slider UI with the max attribute.
	 * @param {number} newVal The new value of the attribute.
	 */
	syncMax(newVal) {
		if (newVal < this.value) {
			this.value = newVal;
		} else {
			this.updateHandlePosition_();
		}
	}

	/**
	 * Synchronizes the slider UI with the min attribute.
	 * @param {number} newVal The new value of the attribute.
	 */
	syncMin(newVal) {
		if (newVal > this.value) {
			this.value = newVal;
		} else {
			this.updateHandlePosition_();
		}
	}

	/**
	 * Synchronizes the slider UI with the value attribute.
	 * @param {number} newVal The new value of the attribute.
	 */
	syncValue() {
		this.updateHandlePosition_();
	}

	/**
	 * Updates the handle position and active region to reflect the current slider value.
	 * @protected
	 */
	updateHandlePosition_() {
		let positionValue = (100 * (this.value - this.min) / (this.max - this.min)) + '%';

		if (!(this.drag_ && this.drag_.isDragging())) {
			this.getElement_('.rail-handle').style.left = positionValue;
		}

		this.getElement_('.rail-active').style.width = positionValue;
	}

	/**
	 * Updates the slider value based on the UI state of the handle element.
	 * @param {number} handlePosition Position of the handle in px.
	 * @param {number} offset Offset to be added to normalize relative inputs.
	 * @protected
	 */
	updateValue_(handlePosition, offset) {
		this.value = Math.round(offset + (handlePosition / this.elementRegion_.width) * (this.max - this.min));
	}

	/**
	 * Handles Drag events from the rail handle and updates the slider value accordingly.
	 * @param {!Object} data
	 * @protected
	 */
	updateValueFromDragData_(data) {
		this.updateValue_(data.relativeX, this.min);
	}
}

Slider.ATTRS = {
	/**
	 * Name of the hidden input field that holds the slider value. Useful when slider is embedded
	 * inside a form so it can automatically send its value.
	 * @type {string}
	 */
	inputName: {
		validator: core.isString
	},

	/**
	 * Defines the maximum value handled by the slider.
	 * @type {number}
	 * @default 100
	 */
	max: {
		value: 100
	},

	/**
	 * Defines the minimum value handled by the slider.
	 * @type {number}
	 * @default 0
	 */
	min: {
		value: 0
	},

	/**
	 * Defines the currently selected value on the slider.
	 * @type {number}
	 * @default 50
	 */
	value: {
		validator: function(val) {
			return core.isNumber(val) && this.min <= val && val <= this.max;
		},
		value: 80
	}
};

/**
 * Default slider elementClasses.
 * @default slider
 * @type {string}
 * @static
 */
Slider.ELEMENT_CLASSES = 'slider';

export default Slider;
