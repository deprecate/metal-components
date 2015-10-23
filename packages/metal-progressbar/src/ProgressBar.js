'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './ProgressBar.soy';

/**
 * UI Component that renders a progress bar.
 */
class ProgressBar extends SoyComponent {
	/**
	 * Get the inner element that represents the bar.
	 * @return {!Element}
	 */
	getBarElement() {
		if (!this.barElement_) {
			this.barElement_ = this.element.childNodes[0];
		}
		return this.barElement_;
	}

	/**
	 * Setter function for the `value` attribute. Makes sure the value
	 * is between the current `min` and `max` attributes.
	 * @param {number} value
	 * @return {number}
	 * @protected
	 */
	setterValueFn_(value) {
		if (value < this.min) {
			value = this.min;
		}
		if (value > this.max) {
			value = this.max;
		}
		return value;
	}

	/**
	 * Synchronization logic for the `barClass` attribute.
	 * @param {string} barClass
	 * @param {string} prevBarClass
	 */
	syncBarClass(barClass, prevBarClass) {
		var barElement = this.getBarElement();
		dom.removeClasses(barElement, prevBarClass);
		dom.addClasses(barElement, barClass);
	}

	/**
	 * Synchronization logic for the `label` attribute.
	 */
	syncLabel() {
		var barElement = this.getBarElement();
		dom.removeChildren(barElement);
		if (this.label) {
			dom.append(barElement, this.label);
		}
	}

	/**
	 * Synchronization logic for the `max` attribute.
	 * @param {number} max
	 */
	syncMax(max) {
		if (max < this.value) {
			this.value = max;
		} else {
			this.updateBar_();
		}
	}

	/**
	 * Synchronization logic for the `min` attribute.
	 * @param {number} min
	 */
	syncMin(min) {
		if (min > this.value) {
			this.value = min;
		} else {
			this.updateBar_();
		}
	}

	/**
	 * Synchronization logic for the `value` attribute.
	 * @param {number} value
	 */
	syncValue() {
		this.updateBar_();
	}

	/**
	 * Updates the bar according to the `min`, `max` and `value` attributes.
	 * @protected
	 */
	updateBar_() {
		var barElement = this.getBarElement();
		var percentage = Math.floor(((this.value - this.min) * 100) / (this.max - this.min));
		barElement.style.width = percentage + '%';
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ProgressBar.ATTRS = {
	/**
	 * Optional CSS classes to be added to the inner progress bar element,
	 * like 'progress-bar-danger'.
	 * @type {string}
	 */
	barClass: {
		validator: core.isString
	},

	/**
	 * An optional label to be rendered inside the progress bar.
	 * @type {string}
	 */
	label: {
		validator: label => {
			return !core.isDefAndNotNull(label) || core.isString(label);
		}
	},

	/**
	 * The maximum value of the progress bar. When the value is at its
	 * max, the bar will be fully extended.
	 * @type {number}
	 */
	max: {
		validator: core.isNumber,
		value: 100
	},

	/**
	 * The minimum value of the progress bar. When the value is at its
	 * max, the bar will be fully collapsed.
	 * @type {number}
	 */
	min: {
		validator: core.isNumber,
		value: 0
	},

	/**
	 * The current value of the progress bar.
	 * @type {number}
	 */
	value: {
		setter: 'setterValueFn_',
		validator: core.isNumber,
		value: 0
	}
};

/**
 * Default modal elementClasses.
 * @type {string}
 * @static
 */
ProgressBar.ELEMENT_CLASSES = 'progress';

ComponentRegistry.register('ProgressBar', ProgressBar);

export default ProgressBar;
