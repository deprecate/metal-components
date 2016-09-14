'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'autocompleteBadges.css',
	bundleFileName: 'autocompleteBadges.js',
	moduleName: 'metal-autocomplete-badges',
	testNodeSrc: [		
		'test/**/*.js'
	]
});
