import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {uiLeftMenuToggle} from '../../actions/ui';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
import Player from '../Player/Player';

import classes from './app.scss';

class App extends Component {
	static propTypes = {
		userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		isLeftMenuOpen: PropTypes.bool.isRequired,
		uiLeftMenuToggle: PropTypes.func.isRequired,
		children: PropTypes.element.isRequired
	};

	render() {
		return (
			<section className={classes.component}>
				<Header onMenuClick={this.props.uiLeftMenuToggle} open={this.props.isLeftMenuOpen}/>

				<LeftDrawer open={this.props.isLeftMenuOpen} urlPrefix={String(this.props.userId)} />

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
	isLeftMenuOpen: ui.isLeftMenuOpen
});

const mapDispatchToProps = dispatch => ({
	uiLeftMenuToggle: () => dispatch(uiLeftMenuToggle())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
