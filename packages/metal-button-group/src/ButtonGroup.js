'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './ButtonGroup.soy';

class ButtonGroup extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

ButtonGroup.ELEMENT_CLASSES = 'buttonGroup';

ComponentRegistry.register('ButtonGroup', ButtonGroup);

export default ButtonGroup;
