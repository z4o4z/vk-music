import React, {Component, PropTypes} from 'react';

import PlayerLeftControls from '../PlayerLeftControls/PlayerLeftControls';
import PlayerTrack from '../PlayerTrack/PlayerTrack';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './player.scss';

export default class Player extends Component {
	static propTypes = {
		audio: PropTypes.object.isRequired,
		playing: PropTypes.bool.isRequired,
		onPlay: PropTypes.func.isRequired,
		onNext: PropTypes.func.isRequired,
		onPrev: PropTypes.func.isRequired,
		hasNext: PropTypes.bool.isRequired,
		hasPrev: PropTypes.bool.isRequired
	};

	constructor(props) {
		super(props);

		this.onEnded = this.onEnded.bind(this);
	}

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
					disabled={!this.props.audio.aid}
				/>

				{this.getPlayerTrack()}

				<div className={classes.visualisationContent}>
					{this.getPlayerInfo()}
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.playing !== this.props.playing || nextProps.audio.aid !== this.props.audio.aid;
	}

	getPlayerTrack() {
		if (!this.props.audio.aid) {
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
		if (!this.props.audio.aid) {
			return null;
		}

		return (
			<AudioInfo title={this.props.audio.title} artist={this.props.audio.artist} playerStyle={true}/>
		);
	}

	onEnded() {
		if (this.props.hasNext) {
			this.props.onNext();
		} else {
			this.props.onPlay();
		}
	}
}
