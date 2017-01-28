import React, {PropTypes} from 'react';
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

export default function PlayPauseButton(props) {
	const Icon = props.isPlaying ? Pause : PlayArrow;
	const size = props.big ? UI_SIZE_ICON_BIG : UI_SIZE_ICON;
	const color = props.disabled ? UI_COLOR_ACCENT : UI_COLOR_DEFAULT;

	return (
		<Button
			className={cns(classes.component, props.className, {[classes.big]: props.big})}
			disabled={props.disabled}
			rounded={true}
			ripple={true}
			onClick={props.onClick}
		>
			<Icon size={size} color={color} />
		</Button>
	);
}

PlayPauseButton.propTypes = {
	className: PropTypes.string,
	isPlaying: PropTypes.bool.isRequired,
	big: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func
};
