import React, {PureComponent, PropTypes} from 'react';

export default class Audio extends PureComponent {
	static propTypes = {
		source: PropTypes.string.isRequired,
		isPlaying: PropTypes.bool.isRequired,
		currentTime: PropTypes.number,
		volume: PropTypes.number,
		onProgress: React.PropTypes.func,
		onTimeUpdate: React.PropTypes.func,
		onEnd: React.PropTypes.func
	};

	render() {
		return (
			<audio preload='none' src={this.props.source} ref={node => this.audioNode = node}/>
		);
	}

	componentDidMount() {
		this.audioNode.addEventListener('progress', this.handleProgress);
		this.audioNode.addEventListener('timeupdate', this.handleTimeUpdate);
		this.audioNode.addEventListener('ended', this.handleMediaEnd);
		this.audioNode.addEventListener('error', this.handleMediaEnd);

		this.updateIsPlaying();
	}

	componentDidUpdate(prevProps) {
		if (!this.props.source) {
			return;
		}

		if (prevProps.source !== this.props.source) {
			this.updateSource();
		}

		if (prevProps.isPlaying !== this.props.isPlaying) {
			this.updateIsPlaying();
		}

		if (prevProps.currentTime !== this.props.currentTime) {
			this.updateCurrentTime();
		}

		if (prevProps.volume !== this.props.volume) {
			this.updateVolume();
		}
	}

	componentWillUnmount() {
		this.audioNode.removeEventListener('progress', this.handleProgress);
		this.audioNode.removeEventListener('timeupdate', this.handleTimeUpdate);
		this.audioNode.removeEventListener('ended', this.handleMediaEnd);
		this.audioNode.removeEventListener('error', this.handleMediaEnd);
	}

	handleTimeUpdate = () => {
		this.currentTime = this.audioNode.currentTime;

		this.props.onTimeUpdate(this.currentTime);
	};

	handleMediaEnd = () => {
		this.currentTime = 0;
		this.audioNode.currentTime = this.currentTime;

		if (this.props.onEnd) {
			this.props.onEnd();
		}
	};

	handleProgress = () => {
		if (this.props.onProgress) {
			this.props.onProgress(this.audioNode.duration);
		}
	};

	updateCurrentTime() {
		if (this.audioNode.readyState && this.currentTime !== this.props.currentTime) {
			this.audioNode.currentTime = this.props.currentTime;
		}
	}

	updateIsPlaying() {
		if (this.props.isPlaying) {
			this.audioNode.play();
		} else {
			this.audioNode.pause();
		}
	}

	updateSource() {
		this.audioNode.pause();

		if (this.props.onTimeUpdate) {
			this.props.onTimeUpdate(0);
		}

		this.audioNode.load();

		if (this.props.isPlaying) {
			this.audioNode.play();
		}
	}

	updateVolume() {
		this.audioNode.volume = this.props.volume;
	}
}
