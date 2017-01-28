import React, {PropTypes} from 'react';

import Close from 'react-icons/lib/md/close';
import Menu from 'react-icons/lib/md/menu';

import Button from '../Button/Button';

import classes from './header.scss';

const CloseIcon = <Close size={24} color="white" name="close"/>;
const MenuIcon = <Menu size={24} color="white" name="menu"/>;

export default function Header(props) {
	return (
		<header className={classes.component}>
			<Button
				className={classes.button}
				rounded={true}
				ripple={true}
				onClick={props.onMenuClick}
			>
				{props.open ? CloseIcon : MenuIcon}
			</Button>
			<h1 className={classes.title}>VK Music</h1>
		</header>
	);
}

Header.propTypes = {
	onMenuClick: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};
