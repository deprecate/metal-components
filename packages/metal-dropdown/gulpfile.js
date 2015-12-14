'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'dropdown.css',
	bundleFileName: 'dropdown.js',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'metal-dropdown'
});
