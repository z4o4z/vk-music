import React, {Component, PropTypes} from 'react';

import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerWavesurfer from '../PlayerWavesurfer/PlayerWavesurfer';

import classes from './player.scss';

export default class Player extends Component {
  static propTypes = {
    height: PropTypes.number
  };

  render() {
    return (
      <div className={classes.component}>
        <PlayerControls play={true}/>
        <PlayerWavesurfer audioFile={'http://cs6-12v4.vk-cdn.net/p11/9758346801e22d.mp3'}/>
      </div>
    );
  }
}
