'use strict';

import core from 'metal';
import { TooltipBase } from 'metal-tooltip';
import './Popover.soy';

/**
 * Popover component. Extends the behavior from `TooltipBase`, adding
 * just some UI to it.
 */
class Popover extends TooltipBase {
	syncAlignElement(alignElement) {
		super.syncAlignElement(alignElement);

		if (alignElement) {
			var dataContent = alignElement.getAttribute('data-content');
			if (dataContent) {
				this.content = dataContent;
			}
		}
	}

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
	content: {
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

export default Popover;
