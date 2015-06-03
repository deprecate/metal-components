'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Modal.soy';

/**
 * Modal component.
 */
class Modal extends SoyComponent {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);
	}

	/**
	 * @inheritDoc
	 */
	disposeInternal() {
		dom.exitDocument(this.overlayElement);
		super.disposeInternal();
	}

	/**
	 * Hides the modal, setting its `visible` attribute to false.
	 */
	hide() {
		this.visible = false;
	}

	/**
	 * Shows the modal, setting its `visible` attribute to true.
	 */
	show() {
		this.visible = true;
	}

	/**
	 * @inheritDoc
	 */
	syncOverlay(overlay) {
		var willShowOverlay = overlay && this.visible;
		dom[willShowOverlay ? 'enterDocument' : 'exitDocument'](this.overlayElement);
	}

	/**
	 * @inheritDoc
	 */
	syncVisible(visible) {
		this.element.style.display = visible ? 'block' : '';
		this.syncOverlay(this.overlay);
	}

	/**
	 * @inheritDoc
	 */
	valueOverlayElementFn_() {
		return dom.buildFragment('<div class="modal-backdrop fade in"></div>').firstChild;
	}
}

/**
 * Default modal elementClasses.
 * @default modal
 * @type {String}
 * @static
 */
Modal.ELEMENT_CLASSES = 'modal';

Modal.ATTRS = {
	/**
	 * Content to be placed inside modal body.
	 * @type {string|SanitizedHtml}
	 */
	body: {
	},

	/**
	 * Content to be placed inside modal footer.
	 * @type {string|SanitizedHtml}
	 */
	footer: {
	},

	/**
	 * Content to be placed inside modal header.
	 * @type {string|SanitizedHtml}
	 */
	header: {
	},

	/**
	 * Whether overlay should be visible when modal is visible.
	 * @type {boolean}
	 * @default true
	 */
	overlay: {
		validator: core.isBoolean,
		value: true
	},

	/**
	 * Element to be used as overlay.
	 * @type {Element}
	 */
	overlayElement: {
		initOnly: true,
		valueFn: 'valueOverlayElementFn_'
	}
};

ComponentRegistry.register('Modal', Modal);

export default Modal;

