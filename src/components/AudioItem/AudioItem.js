import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './audioItem.scss';

export default class AudioItem extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		url: PropTypes.string,
		genre: PropTypes.string,
		isPlaying: PropTypes.bool.isRequired,
		onPlayClick: PropTypes.func.isRequired
	};

	render() {
		const clsName = cns(classes.content, {[classes.active]: this.props.isPlaying, [classes.disable]: !this.props.url});

		return (
			<div className={classes.component} onClick={this.onPlay}>
				<div className={clsName}>
					<PlayPauseButton isPlaying={this.props.isPlaying} disabled={!this.props.url} />

					<AudioInfo title={this.props.title} artist={this.props.artist} genre={this.props.genre} />
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	onPlay = () => {
		if (this.props.url) {
			this.props.onPlayClick(this.props.id);
		}
	}
}
