'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './ProgressBar.soy';

class ProgressBar extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

ProgressBar.ELEMENT_CLASSES = 'progress';

ComponentRegistry.register('ProgressBar', ProgressBar);

export default ProgressBar;
