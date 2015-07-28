'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'rating.css',
	bundleFileName: 'rating.js',
	globalName: 'crystal',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'crystal-rating'
});
