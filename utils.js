'use strict';

var components = [
	'metal-affix',
	'metal-dropdown',
	'metal-modal',
	'metal-popover',
	'metal-progressbar',
	'metal-scrollspy',
	'metal-slider',
	'metal-tooltip',
	'metal-treeview'
];

module.exports = {
	getComponentPaths: function(folder, ext) {
		ext = ext || '*.js';
		return components.map(function(name) {
			return 'bower_components/' + name + '/' + folder + '/**/' + ext;
		});
	}
};
