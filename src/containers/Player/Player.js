import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import ReactSlider from 'react-slider';

import {playerPlayPause, playerNext, playerPrev} from '../../actions/player';

import PlayerLeftControls from '../../components/PlayerLeftControls/PlayerLeftControls';
import Audio from '../../components/Audio/Audio';
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

	state = {
		currentTime: 0
	};

	render() {
		const audio = this.props.audio;

		return (
			<div className={classes.component}>
				<PlayerLeftControls
					playing={this.props.playing}
					onPlay={this.props.onPlay}
					onNext={this.props.onNext}
					onPrev={this.props.onPrev}
					hasNext={Boolean(this.props.next)}
					hasPrev={Boolean(this.props.prev)}
					disabled={!audio}
				/>

				{this.getSlider(audio)}

				{this.getPlayerInfo(audio)}

				{this.getAudio(audio)}
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getSlider(audio) {
		return (
			<div className={classes.sliderWrapper}>
				<ReactSlider
					className={classes.slider}
					handleClassName={classes.handle}
					handleActiveClassName ={classes.handleActive}
					barClassName ={classes.bar}
					value={this.state.currentTime}
					withBars={true}
					max={audio ? audio.duration : 0}
					onChange={this.onTimeUpdate}
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
