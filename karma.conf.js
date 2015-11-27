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
			'bower_components/metal*/**/*.js': ['babel', 'commonjs'],
			'bower_components/crystal*/src/**/*.js': ['babel', 'commonjs'],
			'bower_components/crystal*/test/**/*.js': ['babel', 'commonjs'],
			'bower_components/crystal*/src/**/*.scss': ['scss']
		},

		browsers: ['Chrome'],

		babelPreprocessor: {options: babelOptions},

		scssPreprocessor: {options: scssOptions}
	});
}
