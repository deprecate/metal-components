'use strict';

import core from 'bower:metal/src/core';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import TooltipBase from 'bower:crystal-tooltip/src/TooltipBase';
import './Popover.soy';

/**
 * Popover component. Extends the behavior from `TooltipBase`, adding
 * just some UI to it.
 */
class Popover extends TooltipBase {
	/**
	 * Attribute synchronization logic for `visible` attribute. Updates the
	 * element's display, since bootstrap makes it 'none' by default, so we
	 * need to change it to 'block' when the popover becomes visible.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		this.element.style.display = visible ? 'block' : '';
		super.syncVisible(visible);
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
Popover.ATTRS = {
	title: {
		validator: core.isString
	},

	/**
	 * Trigger events used to bind handlers to show and hide popover.
	 * @type {!Array<string>}
	 * @default ['click', 'click']
	 */
	triggerEvents: {
		validator: Array.isArray,
		value: ['click', 'click']
	}
};

/**
 * @inheritDoc
 * @see `Align` class.
 * @static
 */
Popover.Align = TooltipBase.Align;

Popover.ELEMENT_CLASSES = 'popover';

ComponentRegistry.register('Popover', Popover);

export default Popover;
