import React, {Component, PropTypes} from 'react';

import Close from 'react-icons/lib/md/close';
import Menu from 'react-icons/lib/md/menu';

import RippleButton from '../RippleButton/RippleButton';

import classes from './header.scss';

const CloseIcon = <Close size={24} color="white" name="close"/>;
const MenuIcon = <Menu size={24} color="white" name="menu"/>;

export default class Header extends Component {
  static propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };

  render() {
    return (
      <header className={classes.component}>
       <RippleButton className={classes.button} rounded={true} onClick={this.props.onMenuClick}>
          {this.getIcon()}
        </RippleButton>
        <h1 className={classes.title}>VK Music</h1>
      </header>
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.open !== nextProps.open;
  }

  getIcon() {
    return this.props.open ? CloseIcon : MenuIcon;
  }
}
