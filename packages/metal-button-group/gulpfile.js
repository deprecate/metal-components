'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'buttonGroup.css',
	bundleFileName: 'buttonGroup.js',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'metal-button-group'
});
