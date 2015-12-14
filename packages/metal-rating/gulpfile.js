'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'rating.css',
	bundleFileName: 'rating.js',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'metal-rating'
});
