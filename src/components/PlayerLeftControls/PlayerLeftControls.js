import React, {PropTypes} from 'react';

import FastForward from 'react-icons/lib/md/fast-forward';
import FastRewind from 'react-icons/lib/md/fast-rewind';

import {UI_SIZE_ICON, UI_COLOR_DEFAULT, UI_COLOR_ACCENT} from '../../constants/ui';

import Button from '../Button/Button';
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';

import classes from './playerLeftControls.scss';

export default function PlayerLeftControls(props) {
	return (
		<div className={classes.component}>

			<Button
				className={classes.prev}
				rounded={true}
				ripple={true}
				disabled={!props.hasPrev}
				onClick={props.onPrev}
			>
				<FastRewind size={UI_SIZE_ICON} color={props.hasPrev? UI_COLOR_DEFAULT: UI_COLOR_ACCENT} />
			</Button>

			<PlayPauseButton
				className={classes.play}
				isPlaying={props.isPlaying}
				big={true}
				onClick={props.onPlay}
				disabled={props.disabled}
			/>

			<Button
				className={classes.next}
				rounded={true}
				ripple={true}
				disabled={!props.hasNext}
				onClick={props.onNext}
			>
				<FastForward size={UI_SIZE_ICON} color={props.hasNext? UI_COLOR_DEFAULT: UI_COLOR_ACCENT} />
			</Button>

		</div>
	);
}

PlayerLeftControls.propTypes = {
	isPlaying: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onNext: PropTypes.func.isRequired,
	onPrev: PropTypes.func.isRequired,
	hasNext: PropTypes.bool.isRequired,
	hasPrev: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired
};
