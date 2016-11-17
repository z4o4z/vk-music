import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import {playerPlayPause, playerNext, playerPrev} from '../../actions/player';

import PlayerLeftControls from '../../components/PlayerLeftControls/PlayerLeftControls';
import PlayerTrack from '../../components/PlayerTrack/PlayerTrack';
import AudioInfo from '../../components/AudioInfo/AudioInfo';

import classes from './player.scss';

class Player extends Component {
	static propTypes = {
		audio: PropTypes.object,
		next: PropTypes.number,
		prev: PropTypes.number,
		playing: PropTypes.bool.isRequired,
		onPlay: PropTypes.func.isRequired,
		onNext: PropTypes.func.isRequired,
		onPrev: PropTypes.func.isRequired
	};

	render() {
		return (
			<div className={classes.component}>
				<PlayerLeftControls
					playing={this.props.playing}
					onPlay={this.props.onPlay}
					onNext={this.props.onNext}
					onPrev={this.props.onPrev}
					hasNext={Boolean(this.props.next)}
					hasPrev={Boolean(this.props.prev)}
					disabled={!this.props.audio}
				/>

				{this.getPlayerInfo()}

				{this.getPlayerTrack()}
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getPlayerInfo() {
		if (!this.props.audio) {
			return null;
		}

		return (
			<AudioInfo title={this.props.audio.title} artist={this.props.audio.artist} playerStyle={true} />
		);
	}

	getPlayerTrack() {
		if (!this.props.audio) {
			return null;
		}

		return (
			<PlayerTrack
				audioFile={this.props.audio.url}
				playing={this.props.playing}
				onEnded={this.onEnded}
			/>
		);
	}

	onEnded = () => {
		if (this.props.next) {
			this.props.onNext();
		} else {
			this.props.onPlay();
		}
	}
}

const mapStateToProps = ({player, entities}) => {
	const {playing, next, prev, current, entityId} = player;
	const entity = entities[entityId];

	return {
		playing,
		next,
		prev,
		audio: entity && entity.items && entity.items[current]
	};
};

const mapDispatchToProps = dispatch => ({
	uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
	onPlay: () => dispatch(playerPlayPause()),
	onNext: () => dispatch(playerNext()),
	onPrev: () => dispatch(playerPrev())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
