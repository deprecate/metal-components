'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'progressBar.css',
	bundleFileName: 'progressBar.js',
	globalName: 'crystal',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'crystal-progressBar'
});
