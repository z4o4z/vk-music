import React, {Component, PropTypes} from 'react';

import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVisualization from '../PlayerVisualization/PlayerVisualization';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './player.scss';

export default class Player extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    playing: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.onEnded = this.onEnded.bind(this);
  }

  render() {
    const audio = this.props.audio;

    return (
      <div className={classes.component}>
        <PlayerControls
          playing={this.props.playing}
          onPlay={this.props.onPlay}
          onNext={this.props.onNext}
          onPrev={this.props.onPrev}
          hasNext={this.props.hasNext}
          hasPrev={this.props.hasPrev}
        />

        <PlayerVisualization
          audioFile={audio.url}
          playing={this.props.playing}
          onEnded={this.onEnded}>
          <div className={classes.visualisationContent}>
            <AudioInfo title={audio.title} artist={audio.artist} genre={audio.genre} />
          </div>
        </PlayerVisualization>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.playing !== this.props.playing || nextProps.audio !== this.props.audio;
  }

  onEnded() {
    if (this.props.hasNext) {
      this.props.onNext();
    } else {
      this.props.onPlay();
    }
  }
}
