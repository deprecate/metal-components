'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Popover.soy';

class Popover extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

Popover.ELEMENT_CLASSES = 'popover';

ComponentRegistry.register('Popover', Popover);

export default Popover;
