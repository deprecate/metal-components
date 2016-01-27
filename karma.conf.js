'use strict';

var utils = require('./utils');

var babelOptions = {
	presets: ['metal'],
	sourceMap: 'both'
};

var scssOptions = {
	includePaths: ['node_modules'],
	sourceMap: true
};

module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs', 'sinon'],

		files: [
			'node_modules/closure-templates/soyutils.js',
			'node_modules/metal*/src/**/*.js',
			'node_modules/metal-drag-drop/test/fixtures/DragTestHelper.js',
			'node_modules/metal-*/src/**/*.scss'
		].concat(utils.getComponentPaths('test')),

		preprocessors: {
			'node_modules/metal*/**/*.js': ['babel', 'commonjs'],
			'node_modules/metal-*/test/**/*.js': ['babel', 'commonjs'],
			'node_modules/metal-*/src/**/*.scss': ['scss']
		},

		browsers: ['Chrome'],

		babelPreprocessor: {options: babelOptions},

		scssPreprocessor: {options: scssOptions}
	});
};
