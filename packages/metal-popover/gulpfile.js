'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'popover.css',
	bundleFileName: 'popover.js',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'metal-popover'
});
