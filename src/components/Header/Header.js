import React, {Component, PropTypes} from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

export default class Header extends Component {
  static propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };

  getIcon() {
    return this.props.open ? <NavigationClose /> : <NavigationMenu />;
  }

  render() {
    return (
      <AppBar
        title="VK Music"
        iconElementLeft={<IconButton onClick={this.props.onMenuClick}>{this.getIcon()}</IconButton>}
        />
    );
  }
}
