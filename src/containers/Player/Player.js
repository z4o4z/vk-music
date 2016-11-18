import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import {playerPlayPause, playerNext, playerPrev} from '../../actions/player';

import PlayerLeftControls from '../../components/PlayerLeftControls/PlayerLeftControls';
import Audio from '../../components/Audio/Audio';
import AudioInfo from '../../components/AudioInfo/AudioInfo';
import Slider from '../../components/Slider/Slider';

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

	state = {
		currentTime: 0,
		volume: 1
	};

	render() {
		const audio = this.props.audio;

		return (
			<div className={classes.component}>
				<div className={classes.box}>
					{this.getControls(audio)}

					{this.getPlayerInfo(audio)}
				</div>

				<div className={classes.box}>
					{this.getTimeLine(audio)}

					{this.getAudio(audio)}
				</div>

				<div className={classes.box} style={{justifyContent: 'flex-end'}}>
					{this.getVolume(audio)}
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getControls(audio) {
		return (
			<PlayerLeftControls
				playing={this.props.playing}
				onPlay={this.props.onPlay}
				onNext={this.props.onNext}
				onPrev={this.props.onPrev}
				hasNext={Boolean(this.props.next)}
				hasPrev={Boolean(this.props.prev)}
				disabled={!audio}
			/>
		);
	}

	getTimeLine(audio) {
		return (
			<div className={classes.timeLineWrapper}>
				<Slider
					className={classes.timeLine}
					value={this.state.currentTime}
					max={audio ? audio.duration : 0}
					onChange={this.onTimeUpdate}
				/>
			</div>
		);
	}

	getVolume() {
		return (
			<div className={classes.volumeWrapper}>
				<Slider
					className={classes.volume}
					orientation="vertical"
					value={this.state.volume}
					max={1}
					step={0.01}
					invert={true}
					onChange={this.onVolumeChange}
				/>
			</div>
		);
	}

	getPlayerInfo(audio) {
		if (!audio) {
			return null;
		}

		return (
			<AudioInfo
				title={audio.title}
				artist={audio.artist}
				playerStyle={true}
			/>
		);
	}

	getAudio(audio) {
		if (!audio) {
			return null;
		}

		return (
			<Audio
				source={audio.url}
				isPlaying={this.props.playing}
				currentTime={this.state.currentTime}
				volume={this.state.volume}
				onTimeUpdate={this.onTimeUpdate}
				onEnd={this.onEnded}
			/>
		);
	}

	onEnded = () => {
		if (this.props.next) {
			this.props.onNext();
		} else {
			this.props.onPlay();
		}
	};

	onTimeUpdate = currentTime => {
		this.setState({
			currentTime: currentTime
		});
	};

	onVolumeChange = volume => {
		this.setState({
			volume: volume
		});
	};
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
