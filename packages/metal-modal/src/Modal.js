'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import EventHandler from 'bower:metal/src/events/EventHandler';
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
		this.eventHandler_ = new EventHandler();
	}

	/**
	 * @inheritDoc
	 */
	detached() {
		super.detached();
		this.eventHandler_.removeAllListeners();
	}

	/**
	 * @inheritDoc
	 */
	disposeInternal() {
		dom.exitDocument(this.overlayElement);
		super.disposeInternal();
	}

	/**
	 * Handles document click in order to close the alert.
	 * @param {!Event} event
	 * @protected
	 */
	handleKeyup_(event) {
		if (event.keyCode === 27) {
			this.hide();
		}
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
	syncHideOnEscape(hideOnEscape) {
		if (hideOnEscape) {
			this.eventHandler_.add(dom.on(document, 'keyup', this.handleKeyup_.bind(this)));
		} else {
			this.eventHandler_.removeAllListeners();
		}
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
	 * Whether modal should hide on esc.
	 * @type {boolean}
	 * @default true
	 */
	hideOnEscape: {
		validator: core.isBoolean,
		value: true
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

