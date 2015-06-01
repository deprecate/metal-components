'use strict';

import Component from 'bower:aui-component/src/Component';
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';

class Modal extends Component {
  constructor(opt_config) {
    super(opt_config);
  }
}

ComponentRegistry.register('Modal', Modal);

export default Modal;
