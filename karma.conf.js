'use strict';

var utils = require('./utils');

var babelOptions = {
	presets: ['metal'],
	sourceMap: 'both'
};

var scssOptions = {
	includePaths: ['bower_components'],
	sourceMap: true
};

module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs', 'sinon'],

		files: [
			'bower_components/soyutils/soyutils.js',
			'bower_components/metal*/src/**/*.js',
			'bower_components/metal-drag-drop/test/fixtures/DragTestHelper.js',
			'bower_components/metal-*/src/**/*.scss'
		].concat(utils.getComponentPaths('test')),

		preprocessors: {
			'bower_components/metal*/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal-*/test/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal-*/src/**/*.scss': ['scss']
		},

		browsers: ['Chrome'],

		babelPreprocessor: {options: babelOptions},

		scssPreprocessor: {options: scssOptions}
	});
};
