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
			<audio
				src={this.props.audioFile}
				onEnded={this.props.onEnded}
				ref={audio => this.audioNode = audio}
			/>
		);
	}

	componentDidMount() {
		if (this.props.playing) {
			this.audioNode.play();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	componentWillUpdate(prevProps) {
		if (prevProps.audioFile !== this.props.audioFile || !this.props.playing) {
			this.audioNode.pause();
		}
	}

	componentDidUpdate() {
		if (this.props.playing) {
			this.audioNode.play();
		}
	}
}
