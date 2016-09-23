import React, {Component, PropTypes} from 'react';

export default class PlayerTrack extends Component {
	static propTypes = {
		audioFile: PropTypes.string,
		playing: PropTypes.bool.isRequired,
		onEnded: PropTypes.func.isRequired
	};

	render() {
		return (
			<audio src={this.props.audioFile} ref="audio" onEnded={this.props.onEnded} crossOrigin="anonymous"/>
		);
	}

	componentDidUpdate() {
		if (this.props.playing) {
			this.refs.audio.play();
		} else {
			this.refs.audio.pause();
		}
	}
}
