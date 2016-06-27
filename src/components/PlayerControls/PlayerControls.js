import React, {Component, PropTypes} from 'react';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import Pause from 'react-icons/lib/md/pause';
import FastForward from 'react-icons/lib/md/fast-forward';
import FastRewind from 'react-icons/lib/md/fast-rewind';

import RippleButton from '../RippleButton/RippleButton';

import classes from './playerControls.scss';

const PlayArrowIcon = <PlayArrow size={28} color="white"/>;
const PauseIcon = <Pause size={28} color="white"/>;
const FastForwardIcon = <FastForward size={22} color="white"/>;
const FastRewindIcon = <FastRewind size={22} color="white"/>;

export default class PlayerControls extends Component {
  static propTypes = {
    playing: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool.isRequired
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

        <RippleButton
          className={classes.play}
          rounded={true}
          onClick={this.props.onPlay}>
          {this.props.playing ? PauseIcon : PlayArrowIcon}
        </RippleButton>

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
}
