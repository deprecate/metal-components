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

gulp.task('soy', function() {
	return gulp.src('bower_components/crystal-*/src/**/*.soy')
		.pipe(metal.soy.generateSoy()())
		.pipe(gulp.dest(function(file) {
			var index = file.relative.indexOf(path.sep + 'src' + path.sep);
			file.base = path.join(file.base, file.relative.substr(0, index + 5));
			return 'build/soy';
		}));
});

gulp.task('default', ['build:globals', 'build:amd', 'build:jquery']);
