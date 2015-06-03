'use strict';

var metalTasks = require('metal-tasks');

metalTasks({
	buildSrc: 'bower_components/alloy-*/src/**/*.js',
	bundleFileName: 'alloy.js',
	globalName: 'alloy',
	scssSrc: 'bower_components/alloy-*/src/**/*.scss',
	registerTestTasks: false
});
