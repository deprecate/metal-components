var metalKarmaConfig = require('metal-karma-config');

module.exports = function (config) {
	metalKarmaConfig(config);

	config.plugins.push('karma-scss-preprocessor');
	config.files.push(
		'bower_components/metal-drag-drop/test/fixtures/DragTestHelper.js',
		'src/**/*.scss'
	);
	config.preprocessors['src/**/*.scss'] = ['scss'];
	config.scssPreprocessor = {
		options: {
			sourceMap: true
		}
	};
}
