'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'select.css',
	bundleFileName: 'select.js',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'metal-select',
	soyDeps: 'node_modules/metal-dropdown/src/Dropdown.soy'
});
