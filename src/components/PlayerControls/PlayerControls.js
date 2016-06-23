import React, {Component, PropTypes} from 'react';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import FastForward from 'react-icons/lib/md/fast-forward';
import FastRewind from 'react-icons/lib/md/fast-rewind';

import RippleButton from '../RippleButton/RippleButton';

import classes from './playerControls.scss';

const PlayArrowIcon = <PlayArrow size={28} color="white"/>;
const FastForwardIcon = <FastForward size={22} color="white"/>;
const FastRewindIcon = <FastRewind size={22} color="white"/>;

export default class PlayerControls extends Component {
  static propTypes = {
    play: PropTypes.boll
  };

  render() {
    return (
      <div className={classes.component}>
        <RippleButton rounded={true} className={classes.prev}>
          {FastRewindIcon}
        </RippleButton>
        <RippleButton rounded={true} className={classes.play}>
          {PlayArrowIcon}
        </RippleButton>
        <RippleButton rounded={true} className={classes.next}>
          {FastForwardIcon}
        </RippleButton>
      </div>
    );
  }
}
