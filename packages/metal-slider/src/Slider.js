'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Slider.soy';

class Slider extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

Slider.ELEMENT_CLASSES = 'slider';

ComponentRegistry.register('Slider', Slider);

export default Slider;
