'use strict';

var components = [
	'metal-affix',
	'metal-alert',
	'metal-autocomplete',
	'metal-button-group',
	'metal-clipboard',
	'metal-dropdown',
	'metal-list',
	'metal-modal',
	'metal-popover',
	'metal-progressbar',
	'metal-scrollspy',
	'metal-select',
	'metal-slider',
	'metal-switcher',
	'metal-tooltip',
	'metal-treeview'
];

module.exports = {
	getComponentPaths: function(folder, ext) {
		ext = ext || '*.js';
		return components.map(function(name) {
			return 'node_modules/' + name + '/' + folder + '/**/' + ext;
		});
	}
};
