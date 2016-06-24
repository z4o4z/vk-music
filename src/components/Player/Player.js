import React, {Component, PropTypes} from 'react';

import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerWavesurfer from '../PlayerWavesurfer/PlayerWavesurfer';

import classes from './player.scss';

export default class Player extends Component {
  static propTypes = {
    audioFile: PropTypes.string.isRequired,
    playing: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.playing !== this.props.playing && nextProps.audioFile !== this.props.audioFile;
  }

  render() {
    return (
      <div className={classes.component}>
        <PlayerControls play={this.props.playing}/>
        <PlayerWavesurfer audioFile={this.props.audioFile}/>
      </div>
    );
  }
}
