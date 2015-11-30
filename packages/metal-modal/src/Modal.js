'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import EventHandler from 'bower:metal/src/events/EventHandler';
import ModalBase from './Modal.soy';

/**
 * Modal component.
 */
class Modal extends ModalBase {
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
	attached() {
		this.autoFocus_(this.autoFocus);
	}

	/**
	 * Automatically focuses the element specified by the given selector.
	 * @param {boolean|string} autoFocusSelector The selector, or false if no
	 *   element should be automatically focused.
	 * @protected
	 */
	autoFocus_(autoFocusSelector) {
		if (this.inDocument && this.visible && autoFocusSelector) {
			var element = this.element.querySelector(autoFocusSelector);
			if (element) {
				element.focus();
			}
		}
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
		this.unrestrictFocus_();
		super.disposeInternal();
	}

	/**
	 * Handles a `focus` event on the document. If the focused element is
	 * outside the modal and an overlay is being used, focuses the modal back.
	 * @param {!Event} event
	 * @protected
	 */
	handleDocumentFocus_(event) {
		if (this.overlay && !this.element.contains(event.target)) {
			this.autoFocus_('.modal-dialog');
		}
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
	 * Restricts focus to the modal while it's visible.
	 * @protected
	 */
	restrictFocus_() {
		this.restrictFocusHandle_ = dom.on(document, 'focus', this.handleDocumentFocus_.bind(this), true);
	}

	/**
	 * Shifts the focus back to the last element that had been focused before the
	 * modal was shown.
	 * @protected
	 */
	shiftFocusBack_() {
		if (this.lastFocusedElement_) {
			this.lastFocusedElement_.focus();
			this.lastFocusedElement_ = null;
		}
	}

	/**
	 * Shows the modal, setting its `visible` attribute to true.
	 */
	show() {
		this.visible = true;
	}

	/**
	 * Syncs the component according to the value of the `hideOnEscape` attribute.
	 * @param {boolean} hideOnEscape
	 */
	syncHideOnEscape(hideOnEscape) {
		if (hideOnEscape) {
			this.eventHandler_.add(dom.on(document, 'keyup', this.handleKeyup_.bind(this)));
		} else {
			this.eventHandler_.removeAllListeners();
		}
	}

	/**
	 * Syncs the component according to the value of the `overlay` attribute.
	 * @param {boolean} overlay
	 */
	syncOverlay(overlay) {
		var willShowOverlay = overlay && this.visible;
		dom[willShowOverlay ? 'enterDocument' : 'exitDocument'](this.overlayElement);
	}

	/**
	 * Syncs the component according to the value of the `visible` attribute.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		this.element.style.display = visible ? 'block' : '';
		this.syncOverlay(this.overlay);
		if (this.visible) {
			this.lastFocusedElement_ = document.activeElement;
			this.autoFocus_(this.autoFocus);
			this.restrictFocus_();
		} else {
			this.unrestrictFocus_();
			this.shiftFocusBack_();
		}
	}

	/**
	 * Removes the handler that restricts focus to elements inside the modal.
	 * @protected
	 */
	unrestrictFocus_() {
		if (this.restrictFocusHandle_) {
			this.restrictFocusHandle_.removeListener();
		}
	}

	/**
	 * Defines the default value for the `overlayElement` attribute.
	 * @protected
	 */
	valueOverlayElementFn_() {
		return dom.buildFragment('<div class="modal-backdrop fade in"></div>').firstChild;
	}
}

/**
 * Default modal elementClasses.
 * @default modal
 * @type {string}
 * @static
 */
Modal.ELEMENT_CLASSES = 'modal';

Modal.ATTRS = {
	/**
	 * A selector for the element that should be automatically focused when the modal
	 * becomes visible, or `false` if no auto focus should happen. Defaults to the
	 * modal's close button.
	 * @type {boolean|string}
	 */
	autoFocus: {
		validator: val => val === false || core.isString(val),
		value: '.close'
	},

	/**
	 * Content to be placed inside modal body.
	 * @type {string|SanitizedHtml}
	 */
	body: {
		isHtml: true
	},

	/**
	 * Content to be placed inside modal footer.
	 * @type {string|SanitizedHtml}
	 */
	footer: {
		isHtml: true
	},

	/**
	 * Content to be placed inside modal header.
	 * @type {string|SanitizedHtml}
	 */
	header: {
		isHtml: true
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
	},

	/**
	 * The ARIA role to be used for this modal.
	 * @type {string}
	 * @default 'dialog'
	 */
	role: {
		validator: core.isString,
		value: 'dialog'
	}
};

export default Modal;
