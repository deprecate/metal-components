'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'slider.css',
	bundleFileName: 'slider.js',
	globalName: 'crystal',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'crystal-slider'
});
