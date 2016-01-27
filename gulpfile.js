'use strict';

var gulp = require('gulp');
var metal = require('gulp-metal');
var utils = require('./utils');

metal.registerTasks({
	buildSrc: utils.getComponentPaths('src'),
	bundleFileName: 'metal.js',
	cssSrc: 'node_modules/metal-*/src/**/*.css',
	scssSrc: 'node_modules/metal-*/src/**/*.scss'
});

gulp.task('soy:copy', function() {
	return gulp.src('node_modules/metal-*/src/**/*.soy')
		.pipe(gulp.dest('build/soy'));
});

gulp.task('default', ['css', 'build:globals', 'build:amd', 'build:amd:jquery', 'soy:copy']);
