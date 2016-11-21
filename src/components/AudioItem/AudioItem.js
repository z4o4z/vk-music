import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './audioItem.scss';

export default class AudioItem extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		genre: PropTypes.string,
		isPlaying: PropTypes.bool.isRequired,
		onPlayClick: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.onPlay = this.onPlay.bind(this);
	}

	render() {
		return (
			<div className={classes.component} onClick={this.onPlay}>
				<div className={cns(classes.content, {[classes.active]: this.props.isPlaying})}>
					<PlayPauseButton isPlaying={this.props.isPlaying}/>

					<AudioInfo title={this.props.title} artist={this.props.artist} genre={this.props.genre} />
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	onPlay() {
		this.props.onPlayClick(this.props.id);
	}
}
