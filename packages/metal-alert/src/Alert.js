'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Anim from 'bower:metal-anim/src/Anim';
import EventHandler from 'bower:metal/src/events/EventHandler';
import 'bower:metal/src/dom/events';
import './Alert.soy.js';

/**
 * Alert component.
 */
class Alert extends SoyComponent {
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
		clearTimeout(this.delay_);
	}

	/**
	 * Closes the alert, disposing it once the animation ends.
	 */
	close() {
		dom.once(this.element, 'animationend', this.dispose.bind(this));
		dom.once(this.element, 'transitionend', this.dispose.bind(this));
		this.eventHandler_.removeAllListeners();
		this.syncVisible(false);
	}

	/**
	 * Handles document click in order to close the alert.
	 * @param {!Event} event
	 * @protected
	 */
	handleDocClick_(event) {
		if (!this.element.contains(event.target)) {
			this.hide();
		}
	}

	/**
	 * Hide the alert.
	 */
	hide() {
		this.visible = false;
	}

	/**
	 * Toggles the visibility of the alert.
	 */
	toggle() {
		this.visible = !this.visible;
	}

	/**
	 * Synchronization logic for `dismissible` attribute.
	 * @param {boolean} dismissible
	 */
	syncDismissible(dismissible) {
		if (dismissible) {
			this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
		} else {
			this.eventHandler_.removeAllListeners();
		}

		dom[dismissible ? 'addClasses' : 'removeClasses'](this.element, 'alert-dismissible');
	}

	/**
	 * Synchronization logic for `visible` attribute.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		dom.removeClasses(this.element, this.animClasses[visible ? 'hide' : 'show']);
		dom.addClasses(this.element, this.animClasses[visible ? 'show' : 'hide']);
		// Some browsers do not fire transitionend events when running in background
		// tab, see https://bugzilla.mozilla.org/show_bug.cgi?id=683696.
		Anim.emulateEnd(this.element);

		if (visible && core.isNumber(this.hideDelay)) {
			this.syncHideDelay(this.hideDelay);
		}
	}

	/**
	 * Synchronization logic for `hideDelay` attribute.
	 * @param {?number} hideDelay
	 */
	syncHideDelay(hideDelay) {
		if (core.isNumber(hideDelay) && this.visible) {
			clearTimeout(this.delay_);
			this.delay_ = setTimeout(this.hide.bind(this), hideDelay);
		}
	}
}

/**
 * Default alert elementClasses.
 * @default alert
 * @type {string}
 * @static
 */
Alert.ELEMENT_CLASSES = 'alert';

/**
 * Alert attributes definition.
 * @type {!Object}
 * @static
 */
Alert.ATTRS = {
	/**
	 * The CSS classes that should be added to the alert when being shown/hidden.
	 * @type {!Object}
	 */
	animClasses: {
		validator: core.isObject,
		value: {
			show: 'fade in',
			hide: 'fade'
		}
	},

	/**
	 * The body content of the alert.
	 * @type {string}
	 */
	body: {
		value: ''
	},

	/**
	 * Flag indicating if the alert should be dismissable (closeable).
	 * @type {boolean}
	 * @default true
	 */
	dismissible: {
		validator: core.isBoolean,
		value: true
	},

	/**
	 * The CSS classes that should be added to the alert.
	 * @type {string}
	 * @default 'alert-success'
	 */
	elementClasses: {
		value: 'alert-success'
	},

	/**
	 * Delay hiding the alert (ms).
	 * @type {?number}
	 */
	hideDelay: {
	},

	/**
	 * Flag indicating if the alert is visible or not.
	 * @type {boolean}
	 * @default false
	 */
	visible: {
		value: false
	}
};

ComponentRegistry.register('Alert', Alert);

export default Alert;
