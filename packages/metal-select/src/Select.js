'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Select.soy';

class Select extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

Select.ELEMENT_CLASSES = 'select';

ComponentRegistry.register('Select', Select);

export default Select;
