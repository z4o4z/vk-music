import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

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
				className={cns(classes.component, this.props.className, {[classes.big]: this.props.big})}
				disabled={this.props.disabled}
				rounded={true}
				onClick={this.onClick}
			>
				{this.getIcon()}
			</RippleButton>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
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
