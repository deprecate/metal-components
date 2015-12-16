'use strict';

var isparta = require('isparta');
var merge = require('merge');
var utils = require('./utils');

var babelOptions = {
	presets: ['metal'],
	sourceMap: 'both'
};

var scssOptions = {
	includePaths: ['bower_components'],
	sourceMap: true
};

var coveragePreprocessors = {};
utils.getComponentPaths('src', '!(*.soy).js').forEach(function(filepath) {
	coveragePreprocessors[filepath] = ['coverage'];
});

module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs', 'sinon'],

		files: [
			'bower_components/soyutils/soyutils.js',
			'bower_components/metal*/src/**/*.js',
			'bower_components/metal-drag-drop/test/fixtures/DragTestHelper.js',
			'bower_components/metal-*/src/**/*.scss'
		].concat(utils.getComponentPaths('test')),

		preprocessors: merge(coveragePreprocessors, {
			'bower_components/metal*/src/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal-*/test/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal-*/src/**/*.scss': ['scss']
		}),

		browsers: ['Chrome'],

		reporters: ['coverage', 'progress'],

		babelPreprocessor: {options: babelOptions},

		scssPreprocessor: {options: scssOptions},

		coverageReporter: {
			instrumenters: {isparta : isparta},
			instrumenter: {'**/*.js': 'isparta'},
			instrumenterOptions: {isparta: {babel: babelOptions}},
			reporters: [
				{type: 'html'},
				{type: 'lcov', subdir: 'lcov'},
				{type: 'text-summary'}
			]
		}
	});
};
