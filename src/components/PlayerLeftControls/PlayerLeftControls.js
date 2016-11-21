import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import FastForward from 'react-icons/lib/md/fast-forward';
import FastRewind from 'react-icons/lib/md/fast-rewind';

import {UI_SIZE_ICON, UI_COLOR_DEFAULT} from '../../constants/ui';

import RippleButton from '../RippleButton/RippleButton';
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';

import classes from './playerLeftControls.scss';

const FastForwardIcon = <FastForward size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />;
const FastRewindIcon = <FastRewind size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />;

export default class PlayerLeftControls extends Component {
	static propTypes = {
		isPlaying: PropTypes.bool.isRequired,
		onPlay: PropTypes.func.isRequired,
		onNext: PropTypes.func.isRequired,
		onPrev: PropTypes.func.isRequired,
		hasNext: PropTypes.bool.isRequired,
		hasPrev: PropTypes.bool.isRequired,
		disabled: PropTypes.bool.isRequired
	};

	render() {
		return (
			<div className={classes.component}>

				<RippleButton
					className={classes.prev}
					rounded={true}
					disabled={!this.props.hasPrev}
					onClick={this.props.onPrev}>
					{FastRewindIcon}
				</RippleButton>

				<PlayPauseButton
					className={classes.play}
					isPlaying={this.props.isPlaying}
					big={true}
					onClick={this.props.onPlay}
					disabled={this.props.disabled}
				/>

				<RippleButton
					className={classes.next}
					rounded={true}
					disabled={!this.props.hasNext}
					onClick={this.props.onNext}>
					{FastForwardIcon}
				</RippleButton>

			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
}
