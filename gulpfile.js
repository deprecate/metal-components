'use strict';

var karma = require('karma');
var gulp = require('liferay-gulp-tasks')(require('gulp'));
var metal = require('gulp-metal');
var runSequence = require('run-sequence');
var utils = require('./utils');

metal.registerTasks({
	buildSrc: utils.getComponentPaths('src'),
	bundleFileName: 'metal.js',
	cssSrc: 'node_modules/metal-*/src/**/*.css',
	karma: karma,
	scssSrc: 'node_modules/metal-*/src/**/*.scss'
});

gulp.task('soy:copy', function() {
	return gulp.src('node_modules/metal-*/src/**/*.soy')
		.pipe(gulp.dest('build/soy'));
});

gulp.task('default', function(done) {
	runSequence(
		'clean',
		['css', 'build:globals', 'build:amd', 'build:amd:jquery', 'soy:copy'],
		'uglify',
		done
	);
});
