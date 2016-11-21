import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Repeat from 'react-icons/lib/md/repeat';
import Shuffle from 'react-icons/lib/md/shuffle';

import {UI_SIZE_ICON, UI_COLOR_DEFAULT, UI_COLOR_ACCENT} from '../../constants/ui';

import RippleButton from '../RippleButton/RippleButton';

import classes from './playerRightControls.scss';

export default class PlayerRightControls extends Component {
	static propTypes = {
		isRepeating: PropTypes.bool.isRequired,
		isShuffling: PropTypes.bool.isRequired,
		onRepeatClick: PropTypes.func.isRequired,
		onShuffleClick: PropTypes.func.isRequired
	};

	render() {
		return (
			<div className={classes.component}>

				<RippleButton
					className={classes.btn}
					rounded={true}
					onClick={this.props.onRepeatClick}>
					<Repeat size={UI_SIZE_ICON} color={this.props.isRepeating ? UI_COLOR_DEFAULT : UI_COLOR_ACCENT} />
				</RippleButton>

				<RippleButton
					className={classes.btn}
					rounded={true}
					onClick={this.props.onShuffleClick}>
					<Shuffle size={UI_SIZE_ICON} color={this.props.isShuffling ? UI_COLOR_DEFAULT : UI_COLOR_ACCENT} />
				</RippleButton>

			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
}
