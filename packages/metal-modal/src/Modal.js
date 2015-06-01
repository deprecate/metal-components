'use strict';

import core from 'bower:metaljs/src/core';
import dom from 'bower:metaljs/src/dom/dom';
import Component from 'bower:aui-component/src/Component';
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
import './Modal.soy';

/**
 * Modal component.
 */
class Modal extends Component {
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
    value: ''
  },

  /**
   * Content to be placed inside modal footer.
   * @type {string|SanitizedHtml}
   */
  footer: {
    value: ''
  },

  /**
   * Content to be placed inside modal header.
   * @type {string|SanitizedHtml}
   */
  header: {
    value: ''
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

