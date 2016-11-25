import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import {
	playerPlayPause,
	playerNext,
	playerPrev,
	playerRepeat,
	playerShuffle
} from '../../actions/player';

import PlayerLeftControls from '../../components/PlayerLeftControls/PlayerLeftControls';
import PlayerRightControls from '../../components/PlayerRightControls/PlayerRightControls';
import Audio from '../../components/Audio/Audio';
import AudioInfo from '../../components/AudioInfo/AudioInfo';
import Slider from '../../components/Slider/Slider';

import classes from './player.scss';

class Player extends Component {
	static propTypes = {
		audio: PropTypes.object,
		next: PropTypes.number,
		prev: PropTypes.number,
		isPlaying: PropTypes.bool.isRequired,
		isRepeating: PropTypes.bool.isRequired,
		isShuffling: PropTypes.bool.isRequired,
		onPlay: PropTypes.func.isRequired,
		onNext: PropTypes.func.isRequired,
		onPrev: PropTypes.func.isRequired,
		onRepeat: PropTypes.func.isRequired,
		onShuffle: PropTypes.func.isRequired
	};

	state = {
		currentTime: 0,
		volume: 1,
		showDurationLeft: false
	};

	render() {
		const audio = this.props.audio;

		return (
			<div className={classes.component}>
				<div className={classes.box}>
					{this.getLeftControls(audio)}

					{this.getPlayerInfo(audio)}
				</div>

				<div className={classes.box}>
					{this.getTimeLine(audio)}

					{this.getAudio(audio)}
				</div>

				<div className={classes.box} style={{justifyContent: 'flex-end'}}>
					{this.getTimeLeft(audio)}
					{this.getRightControls(audio)}
					{this.getVolume(audio)}
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getLeftControls(audio) {
		return (
			<PlayerLeftControls
				isPlaying={this.props.isPlaying}
				onPlay={this.props.onPlay}
				onNext={this.props.onNext}
				onPrev={this.props.onPrev}
				hasNext={Boolean(this.props.next)}
				hasPrev={Boolean(this.props.prev)}
				disabled={!audio}
			/>
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

	getAudio(audio) {
		if (!audio) {
			return null;
		}

		return (
			<Audio
				source={audio.url}
				isPlaying={this.props.isPlaying}
				currentTime={this.state.currentTime}
				volume={this.state.volume}
				onTimeUpdate={this.onTimeUpdate}
				onEnd={this.onEnded}
			/>
		);
	}

	getTimeLeft(audio) {
		if (!audio) {
			return null;
		}

		const currentTime = this.state.currentTime;
		let time = Math.floor(currentTime);

		if (this.state.showDurationLeft) {
			time = Math.floor(audio.duration - currentTime);
		}

		const hours = Math.floor(time / 3600);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = time % 60;

		return (
			<div className={classes.timeLeft} onClick={this.onTimeLeftClick}>
				{this.state.showDurationLeft && '-'}
				{hours ? hours + ':' : null}
				{minutes || 0}:
				{seconds > 9 ? seconds : '0' + seconds}
			</div>
		);
	}

	getRightControls(audio) {
		if (!audio) {
			return null;
		}

		return (
			<PlayerRightControls
				isRepeating={this.props.isRepeating}
				isShuffling={this.props.isShuffling}
				onRepeatClick={this.props.onRepeat}
				onShuffleClick={this.props.onShuffle}
			/>
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

	onEnded = () => {
		if (this.props.isRepeating) {
			this.props.onPlay();
			this.props.onPlay();
		} else if (this.props.next) {
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

	onTimeLeftClick = () => {
		this.setState({
			showDurationLeft: !this.state.showDurationLeft
		});
	}
}

const mapStateToProps = ({player, entities}) => {
	const {isPlaying, isRepeating, isShuffling, next, prev, current, entityId} = player;
	const entity = entities[entityId];

	return {
		isPlaying,
		isRepeating,
		isShuffling,
		next,
		prev,
		audio: entity && entity.items && entity.items[current]
	};
};

const mapDispatchToProps = dispatch => ({
	uiLeftMenuOpen: () => dispatch(uiLeftMenuOpen()),
	onPlay: () => dispatch(playerPlayPause()),
	onNext: () => dispatch(playerNext()),
	onPrev: () => dispatch(playerPrev()),
	onRepeat: () => dispatch(playerRepeat()),
	onShuffle: () => dispatch(playerShuffle())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
