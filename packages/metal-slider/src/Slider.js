'use strict';

import core from 'metal';
import dom from 'metal-dom';
import Component from 'metal-component';
import { Drag } from 'metal-drag-drop';
import Position from 'metal-position';
import Soy from 'metal-soy';

import templates from './Slider.soy';

/**
 * Slider component.
 */
class Slider extends Component {
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
			constrain: this.element.querySelector('.rail'),
			handles: this.element.querySelector('.handle'),
			sources: this.element.querySelector('.rail-handle')
		});

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
	}

	/**
	 * Handles mouse down actions on the slider rail and updates the slider value accordingly.
	 * @param {!Event} event
	 * @protected
	 */
	onRailMouseDown_(event) {
		if (dom.hasClass(event.target, 'rail') || dom.hasClass(event.target, 'rail-active')) {
			this.updateValue_(event.offsetX, 0);
		}
	}

	/**
	 * Synchronizes the slider UI with the `max` state key.
	 * @param {number} newVal The new value of the state key.
	 */
	syncMax(newVal) {
		if (newVal < this.value) {
			this.value = newVal;
		} else {
			this.updateHandlePosition_();
		}
	}

	/**
	 * Synchronizes the slider UI with the `min` state key.
	 * @param {number} newVal The new value of the state key.
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
		if (!this.drag_ || !this.drag_.isDragging()) {
			let positionValue = (100 * (this.value - this.min) / (this.max - this.min)) + '%';
			this.element.querySelector('.rail-handle').style.left = positionValue;
		}
	}

	/**
	 * Updates the slider value based on the UI state of the handle element.
	 * @param {number} handlePosition Position of the handle in px.
	 * @param {number} offset Offset to be added to normalize relative inputs.
	 * @protected
	 */
	updateValue_(handlePosition, offset) {
		var region = Position.getRegion(this.element);
		this.value = Math.round(offset + (handlePosition / region.width) * (this.max - this.min));
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
Soy.register(Slider, templates);

/**
 * `Slider`'s state definition.
 */
Slider.STATE = {
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

export default Slider;
