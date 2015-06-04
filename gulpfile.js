'use strict';

var metalTasks = require('metal-tasks');
var path = require('path');

metalTasks({
	buildSrc: 'bower_components/alloy-*/src/**/*.js',
	bundleFileName: 'alloy.js',
	globalName: 'alloy',
	registerTestTasks: false,
	scssSrc: 'bower_components/alloy-*/src/**/*.scss',
	soyGeneratedDest: function(file) {
		var index = file.relative.indexOf(path.sep + 'src' + path.sep);
		file.base = path.join(file.base, file.relative.substr(0, index + 5));
		return 'build/soy';
	},
	soySkipCompilation: true,
	soySrc: 'bower_components/alloy-*/src/**/*.soy'
});
