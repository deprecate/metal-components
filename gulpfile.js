'use strict';

var gulp = require('gulp');
var metal = require('gulp-metal');
var path = require('path');

metal.registerTasks({
	buildSrc: 'bower_components/alloy-*/src/**/*.js',
	bundleFileName: 'alloy.js',
	cssSrc: 'bower_components/alloy-*/src/**/*.css',
	globalName: 'alloy',
	scssSrc: 'bower_components/alloy-*/src/**/*.scss'
});

gulp.task('soy', function() {
	return gulp.src('bower_components/alloy-*/src/**/*.soy')
		.pipe(metal.soy.generateSoy()())
		.pipe(gulp.dest(function(file) {
			var index = file.relative.indexOf(path.sep + 'src' + path.sep);
			file.base = path.join(file.base, file.relative.substr(0, index + 5));
			return 'build/soy';
		}));
});
