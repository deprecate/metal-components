'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'buttonGroup.css',
	bundleFileName: 'buttonGroup.js',
	globalName: 'steel',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'steel-buttonGroup'
});
