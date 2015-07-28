'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './Rating.soy';

class Rating extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

Rating.ELEMENT_CLASSES = 'rating';

ComponentRegistry.register('Rating', Rating);

export default Rating;
