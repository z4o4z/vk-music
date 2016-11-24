import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import Pause from 'react-icons/lib/md/pause';

import {
	UI_SIZE_ICON,
	UI_SIZE_ICON_BIG,
	UI_COLOR_DEFAULT,
	UI_COLOR_ACCENT
} from '../../constants/ui';

import Button from '../Button/Button';

import classes from './playPauseButton.scss';

export default class PlayPauseButton extends Component {
	static propTypes = {
		className: PropTypes.string,
		isPlaying: PropTypes.bool.isRequired,
		big: PropTypes.bool,
		disabled: PropTypes.bool,
		onClick: PropTypes.func
	};

	render() {
		return (
			<Button
				className={cns(classes.component, this.props.className, {[classes.big]: this.props.big})}
				disabled={this.props.disabled}
				rounded={true}
				ripple={true}
				onClick={this.props.onClick}
			>
				{this.getIcon()}
			</Button>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getIcon() {
		const {disabled, big, isPlaying} = this.props;

		if (isPlaying) {
			return <Pause
				size={big ? UI_SIZE_ICON_BIG : UI_SIZE_ICON}
				color={disabled ? UI_COLOR_ACCENT : UI_COLOR_DEFAULT}
			/>;
		}

		return <PlayArrow
			size={big ? UI_SIZE_ICON_BIG : UI_SIZE_ICON}
			color={disabled ? UI_COLOR_ACCENT : UI_COLOR_DEFAULT}
		/>;
	}
}
