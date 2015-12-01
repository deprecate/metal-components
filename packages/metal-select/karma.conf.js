'use strict';

var metalKarmaConfig = require('metal-karma-config');

module.exports = function (config) {
	metalKarmaConfig(config);

	config.files.push(
		'bower_components/crystal*/src/**/*.js',
		'bower_components/steel*/src/**/*.js'
	);
	config.preprocessors['bower_components/crystal*/src/**/*.js'] = ['babel', 'commonjs'];
	config.preprocessors['bower_components/steel*/src/**/*.js'] = ['babel', 'commonjs'];
};
