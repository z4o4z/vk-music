import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {uiLeftMenuOpen} from '../../actions/ui';
import {playerPlayPause, playerNext, playerPrev} from '../../actions/player';

import Header from '../../components/Header/Header';
import LeftDrawer from '../../components/LeftDrawer/LeftDrawer';
// import Player from '../../components/Player/Player';

import classes from './app.scss';

class App extends Component {
	static propTypes = {
		userId: PropTypes.number.isRequired,
		leftMenuOpen: PropTypes.bool.isRequired,
		player: PropTypes.object.isRequired,
		audios: PropTypes.object.isRequired,
		uiLeftMenuOpen: PropTypes.func.isRequired,
		playPlayPause: PropTypes.func.isRequired,
		playerNext: PropTypes.func.isRequired,
		playerPrev: PropTypes.func.isRequired,
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

				{this.getPlayer()}
			</section>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getPlayer() {
		return null;

		/* return (
			<Player
				playing={this.props.player.playing}
				audio={this.props.audios[this.props.player.current]}
				hasNext={Boolean(this.props.player.next)}
				hasPrev={Boolean(this.props.player.prev)}
				onPlay={this.props.playPlayPause}
				onNext={this.props.playerNext}
				onPrev={this.props.playerPrev}
			/>
		); */
	}
}

const mapStateToProps = ({vk, ui, player}) => ({
	userId: vk.userId,
	leftMenuOpen: ui.leftMenuOpen,
	player: player,
	audios: {}
});

const mapDispatchToProps = dispatch => ({
	uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
	playPlayPause: () => dispatch(playerPlayPause()),
	playerNext: () => dispatch(playerNext()),
	playerPrev: () => dispatch(playerPrev())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
