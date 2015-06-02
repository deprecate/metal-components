'use strict';

import Component from 'bower:aui-component/src/Component';
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
import './TreeView.soy';

class TreeView extends Component {
  constructor(opt_config) {
    super(opt_config);
  }
}

ComponentRegistry.register('TreeView', TreeView);

export default TreeView;
