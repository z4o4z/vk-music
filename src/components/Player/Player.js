import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import PlayerLeftControls from '../PlayerLeftControls/PlayerLeftControls';
import PlayerTrack from '../PlayerTrack/PlayerTrack';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './player.scss';

export default class Player extends Component {
	static propTypes = {
		audio: PropTypes.object,
		playing: PropTypes.bool.isRequired,
		onPlay: PropTypes.func.isRequired,
		onNext: PropTypes.func.isRequired,
		onPrev: PropTypes.func.isRequired,
		hasNext: PropTypes.bool.isRequired,
		hasPrev: PropTypes.bool.isRequired
	};

	render() {
		return (
			<div className={classes.component}>
				<PlayerLeftControls
					playing={this.props.playing}
					onPlay={this.props.onPlay}
					onNext={this.props.onNext}
					onPrev={this.props.onPrev}
					hasNext={this.props.hasNext}
					hasPrev={this.props.hasPrev}
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

	getPlayerTrack() {
		if (!this.props.audio) {
			return null;
		}

		return (
			<PlayerTrack
				audioFile={this.props.audio.url}
				playing={this.props.playing}
				onEnded={this.onEnded}
				ref="audio"
			/>
		);
	}

	getPlayerInfo() {
		if (!this.props.audio) {
			return null;
		}

		return (
			<AudioInfo title={this.props.audio.title} artist={this.props.audio.artist} playerStyle={true} />
		);
	}

	onEnded = () => {
		if (this.props.hasNext) {
			this.props.onNext();
		} else {
			this.props.onPlay();
		}
	}
}
