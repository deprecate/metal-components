'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'popover.css',
	bundleFileName: 'popover.js',
	globalName: 'crystal',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'crystal-popover'
});
