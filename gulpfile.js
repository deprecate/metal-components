'use strict';

var auiTasks = require('aui-tasks');

auiTasks({
	buildSrc: 'bower_components/aui-*/src/**/*.js',
	bundleFileName: 'aui.js',
	scssSrc: 'bower_components/aui-*/src/**/*.scss',
	registerTestTasks: false
});
