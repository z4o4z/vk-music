import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {uiLeftMenuToggle} from '../../actions/ui';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Player from '../Player/Player';

import classes from './app.scss';

function App(props) {
	return (
		<section className={classes.component}>
			<Header onMenuClick={props.uiLeftMenuToggle} open={props.isLeftMenuOpen}/>

			<LeftDrawer open={props.isLeftMenuOpen} urlPrefix={String(props.userId)} />

			<main className={classes.content}>
				{props.children}
			</main>

			<Player />
		</section>
	);
}

App.propTypes = {
	userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	isLeftMenuOpen: PropTypes.bool.isRequired,
	uiLeftMenuToggle: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired
};

const mapStateToProps = ({vk, ui, player}) => ({
	userId: vk.userId,
	isLeftMenuOpen: ui.isLeftMenuOpen
});

const mapDispatchToProps = dispatch => ({
	uiLeftMenuToggle: () => dispatch(uiLeftMenuToggle())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
