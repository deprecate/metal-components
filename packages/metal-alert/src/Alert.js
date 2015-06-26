'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Anim from 'bower:metal-anim/src/Anim';
import 'bower:metal/src/dom/events';
import './Alert.soy.js';

/**
 * Alert component.
 */
class Alert extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}

	close() {
		dom.once(this.element, 'animationend', this.dispose.bind(this));
		dom.once(this.element, 'transitionend', this.dispose.bind(this));
		this.syncVisible(false);
	}

	toggle() {
		this.visible = !this.visible;
	}

	syncDismissible(dismissible) {
		dom[dismissible ? 'addClasses' : 'removeClasses'](this.element, 'alert-dismissible');
	}

	syncVisible(visible) {
		dom.removeClasses(this.element, this.animClasses[visible ? 'hide' : 'show']);
		dom.addClasses(this.element, this.animClasses[visible ? 'show' : 'hide']);
		// Some browsers do not fire transitionend events when running in background
		// tab, see https://bugzilla.mozilla.org/show_bug.cgi?id=683696.
		Anim.emulateEnd(this.element);
	}
}

/**
 * Default alert elementClasses.
 * @default alert
 * @type {String}
 * @static
 */
Alert.ELEMENT_CLASSES = 'alert';

/**
 * Alert attributes definition.
 * @type {Object}
 * @static
 */
Alert.ATTRS = {
	animClasses: {
		validator: core.isObject,
		value: {
			show: 'fade in',
			hide: 'fade'
		}
	},

	body: {
		value: ''
	},

	elementClasses: {
		value: 'alert-success'
	},

	dismissible: {
		validator: core.isBoolean,
		value: true
	},

	visible: {
		value: false
	}
};

ComponentRegistry.register('Alert', Alert);

export default Alert;
