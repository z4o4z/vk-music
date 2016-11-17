import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class PlayerTrack extends Component {
	static propTypes = {
		audioFile: PropTypes.string,
		playing: PropTypes.bool.isRequired,
		onEnded: PropTypes.func.isRequired
	};

	render() {
		return (
			<audio src={this.props.audioFile} ref="audio" onEnded={this.props.onEnded} />
		);
	}

	componentDidMount() {
		if (this.props.playing) {
			this.refs.audio.play();
		}
	}

	componentDidUpdate() {
		if (this.props.playing) {
			this.refs.audio.play();
		} else {
			this.refs.audio.pause();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
}
