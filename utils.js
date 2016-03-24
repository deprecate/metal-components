'use strict';

var packageJson = require('./package.json');

var components = Object.keys(packageJson.dependencies).filter(function(key) {
	return key.startsWith('metal-');
});

module.exports = {
	getComponentPaths: function(folder, ext) {
		ext = ext || '*.js';
		return components.map(function(name) {
			return 'node_modules/' + name + '/' + folder + '/**/' + ext;
		});
	}
};
