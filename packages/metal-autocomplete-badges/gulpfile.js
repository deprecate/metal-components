'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'autocompleteBadges.css',
	bundleFileName: 'autocompleteBadges.js',
	moduleName: 'metal-autocompleteBadges',
	testNodeSrc: [
		'env/test/node.js',
		'test/**/*.js'
	]
});
