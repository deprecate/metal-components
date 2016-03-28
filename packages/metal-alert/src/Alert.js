'use strict';

import { core } from 'metal';
import dom from 'metal-dom';
import Anim from 'metal-anim';
import Component from 'metal-component';
import { EventHandler } from 'metal-events';
import Soy from 'metal-soy';

import templates from './Alert.soy';

/**
 * Alert component.
 */
class Alert extends Component {
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
	 * Show the alert.
	 */
	show() {
		this.visible = true;
	}

	/**
	 * Synchronization logic for `dismissible` state.
	 * @param {boolean} dismissible
	 */
	syncDismissible(dismissible) {
		if (dismissible) {
			this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
		} else {
			this.eventHandler_.removeAllListeners();
		}
	}

	/**
	 * Synchronization logic for `hideDelay` state.
	 * @param {?number} hideDelay
	 */
	syncHideDelay(hideDelay) {
		if (core.isNumber(hideDelay) && this.visible) {
			clearTimeout(this.delay_);
			this.delay_ = setTimeout(this.hide.bind(this), hideDelay);
		}
	}

	/**
	 * Synchronization logic for `visible` state.
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
}
Soy.register(Alert, templates);

/**
 * Alert state definition.
 * @type {!Object}
 * @static
 */
Alert.STATE = {
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
		isHtml: true
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
	 * Spinner indicating.
	 * @type {boolean}
	 * @default false
	 */
	spinner: {
		value: false
	},

	/**
	 * The CSS classes that should be added to the spinner.
	 * @type {string}
	 */
	spinnerClasses: {
	},

	/**
	 * Spinner is marked as done.
	 * @type {boolean}
	 * @default false
	 */
	spinnerDone: {
		value: false
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

export default Alert;
