var isparta = require('isparta');

var babelOptions = {
	presets: ['metal'],
	sourceMap: 'both'
};

var scssOptions = {
	sourceMap: true
};

module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs'],

		files: [
			'bower_components/soyutils/soyutils.js',
			'bower_components/metal*/src/**/*.js',
			'bower_components/metal-drag-drop/test/fixtures/DragTestHelper.js',
			'bower_components/crystal*/src/**/*.js',
			'bower_components/crystal*/test/**/*.js',
			'bower_components/crystal*/src/**/*.scss'
		],

		preprocessors: {
			'bower_components/crystal*/src/**/!(*.soy).js': ['coverage', 'commonjs'],
			'bower_components/crystal*/src/**/*.soy.js': ['babel', 'commonjs'],
			'bower_components/metal*/**/*.js': ['babel', 'commonjs'],
			'bower_components/crystal*/test/**/*.js': ['babel', 'commonjs'],
			'bower_components/crystal*/src/**/*.scss': ['scss']
		},

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
}
