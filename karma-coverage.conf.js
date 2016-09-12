'use strict';

var isparta = require('isparta');
var merge = require('merge');
var utils = require('./utils');

var babelOptions = {
	presets: ['metal-resolve-source', 'es2015'],
	sourceMap: 'both'
};

var scssOptions = {
	includePaths: ['node_modules'],
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
			'node_modules/metal-soy-bundle/build/bundle.js',
			'node_modules/html2incdom/src/*.js',
			'node_modules/metal*/src/**/*.js',
			'node_modules/metal-drag-drop/test/fixtures/DragTestHelper.js',
			'node_modules/metal-*/src/**/*.scss'
		].concat(utils.getComponentPaths('test')),

		preprocessors: merge(coveragePreprocessors, {
			'node_modules/html2incdom/src/*.js': ['babel', 'commonjs'],
			'node_modules/metal-soy-bundle/build/bundle.js': ['babel', 'commonjs'],
			'node_modules/metal*/src/**/*.js': ['babel', 'commonjs'],
			'node_modules/metal-*/test/**/*.js': ['babel', 'commonjs'],
			'node_modules/metal-*/src/**/*.scss': ['scss']
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
