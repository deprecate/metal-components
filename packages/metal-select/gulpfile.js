'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'select.css',
	bundleFileName: 'select.js',
	globalName: 'steel',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'steel-select'
});
