import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import Pause from 'react-icons/lib/md/pause';

import {UI_SIZE_ICON, UI_SIZE_ICON_BIG, UI_COLOR_DEFAULT} from '../../constants/ui';

import RippleButton from '../RippleButton/RippleButton';

import classes from './playPauseButton.scss';

const PlayArrowIcon = <PlayArrow size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />;
const PauseIcon = <Pause size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />;
const PlayArrowIconBig = <PlayArrow size={UI_SIZE_ICON_BIG} color={UI_COLOR_DEFAULT} />;
const PauseIconBig = <Pause size={UI_SIZE_ICON_BIG} color={UI_COLOR_DEFAULT} />;

export default class PlayPauseButton extends Component {
	static propTypes = {
		className: PropTypes.string,
		isPlaying: PropTypes.bool.isRequired,
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
		if (this.props.isPlaying) {
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
