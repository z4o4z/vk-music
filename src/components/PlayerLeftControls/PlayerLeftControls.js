import React, {Component, PropTypes} from 'react';

import FastForward from 'react-icons/lib/md/fast-forward';
import FastRewind from 'react-icons/lib/md/fast-rewind';

import RippleButton from '../RippleButton/RippleButton';
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';

import classes from './playerLeftControls.scss';

const FastForwardIcon = <FastForward size={22} color="white"/>;
const FastRewindIcon = <FastRewind size={22} color="white"/>;

export default class PlayerLeftControls extends Component {
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

        <PlayPauseButton
          className={classes.play}
          playing={this.props.playing}
          big={true}
          onClick={this.props.onPlay}
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
}
