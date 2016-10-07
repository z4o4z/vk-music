import React, {Component, PropTypes} from 'react';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import Pause from 'react-icons/lib/md/pause';

import RippleButton from '../RippleButton/RippleButton';

import classes from './playPauseButton.scss';

const PlayArrowIcon = <PlayArrow size={24} color="white"/>;
const PauseIcon = <Pause size={24} color="white"/>;
const PlayArrowIconBig = <PlayArrow size={28} color="white"/>;
const PauseIconBig = <Pause size={28} color="white"/>;

export default class PlayPauseButton extends Component {
	static propTypes = {
		className: PropTypes.string,
		playing: PropTypes.bool.isRequired,
		big: PropTypes.bool,
		disabled: PropTypes.bool,
		onClick: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	render() {
		return (
			<RippleButton
				className={this.getClassName()}
				disabled={this.props.disabled}
				rounded={true}
				onClick={this.onClick}
			>
				{this.getIcon()}
			</RippleButton>
		);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.playing !== nextProps.playing || this.props.disabled !== nextProps.disabled;
	}

	getClassName() {
		let _classes = [classes.component];

		if (this.props.className) {
			_classes.push(this.props.className);
		}

		if (this.props.big) {
			_classes.push(classes.big);
		}

		return _classes.join(' ');
	}

	getIcon() {
		if (this.props.playing) {
			return this.props.big ? PauseIconBig : PauseIcon;
		}

		return this.props.big ? PlayArrowIconBig : PlayArrowIcon;
	}

	onClick() {
		if (this.props.onClick) {
			this.props.onClick();
		}
	}
}
