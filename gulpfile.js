'use strict';

var gulp = require('gulp');
var metal = require('gulp-metal');
var path = require('path');

metal.registerTasks({
	buildSrc: 'bower_components/crystal-*/src/**/*.js',
	bundleFileName: 'crystal.js',
	cssSrc: 'bower_components/crystal-*/src/**/*.css',
	globalName: 'crystal',
	scssSrc: 'bower_components/crystal-*/src/**/*.scss'
});

gulp.task('default', ['build:globals', 'build:amd', 'build:amd:jquery']);
