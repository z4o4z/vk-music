import React, {PropTypes} from 'react';

import Repeat from 'react-icons/lib/md/repeat';
import Shuffle from 'react-icons/lib/md/shuffle';

import {UI_SIZE_ICON, UI_COLOR_DEFAULT, UI_COLOR_ACCENT} from '../../constants/ui';

import Button from '../Button/Button';

import classes from './playerRightControls.scss';

export default function PlayerRightControls(props) {
	return (
		<div className={classes.component}>

			<Button
				className={classes.btn}
				rounded={true}
				onClick={props.onRepeatClick}
			>
				<Repeat size={UI_SIZE_ICON} color={props.isRepeating ? UI_COLOR_DEFAULT : UI_COLOR_ACCENT} />
			</Button>

			<Button
				className={classes.btn}
				rounded={true}
				onClick={props.onShuffleClick}
			>
				<Shuffle size={UI_SIZE_ICON} color={props.isShuffling ? UI_COLOR_DEFAULT : UI_COLOR_ACCENT} />
			</Button>

		</div>
	);
}

PlayerRightControls.propTypes = {
	isRepeating: PropTypes.bool.isRequired,
	isShuffling: PropTypes.bool.isRequired,
	onRepeatClick: PropTypes.func.isRequired,
	onShuffleClick: PropTypes.func.isRequired
};
