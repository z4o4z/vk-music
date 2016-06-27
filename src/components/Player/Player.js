import React, {Component, PropTypes} from 'react';

import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVisualization from '../PlayerVisualization/PlayerVisualization';

import classes from './player.scss';

export default class Player extends Component {
  static propTypes = {
    audioFile: PropTypes.string.isRequired,
    playing: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className={classes.component}>
        <PlayerControls playing={this.props.playing}/>
        <PlayerVisualization audioFile={this.props.audioFile} playing={this.props.playing}/>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.playing !== this.props.playing || nextProps.audioFile !== this.props.audioFile;
  }
}
