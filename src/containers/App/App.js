import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {uiLeftMenuOpen} from '../../actions/ui';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Player from '../Player/Player';

import classes from './app.scss';

class App extends Component {
	static propTypes = {
		userId: PropTypes.number.isRequired,
		leftMenuOpen: PropTypes.bool.isRequired,
		uiLeftMenuOpen: PropTypes.func.isRequired,
		children: PropTypes.element.isRequired
	};

	static childContextTypes = {
		routerPush: PropTypes.func.isRequired
	};

	getChildContext() {
		return {
			routerPush: browserHistory.push
		};
	}

	render() {
		return (
			<section className={classes.component}>
				<Header onMenuClick={this.props.uiLeftMenuOpen} open={this.props.leftMenuOpen}/>

				<LeftDrawer open={this.props.leftMenuOpen} urlPrefix={String(this.props.userId)} />

				<main className={classes.content}>
					{this.props.children}
				</main>

				<Player />
			</section>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
}

const mapStateToProps = ({vk, ui, player}) => ({
	userId: vk.userId,
	leftMenuOpen: ui.leftMenuOpen
});

const mapDispatchToProps = dispatch => ({
	uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
