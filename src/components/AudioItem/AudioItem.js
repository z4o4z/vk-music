import React, {Component, PropTypes} from 'react';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import Pause from 'react-icons/lib/md/pause';

import RippleButton from '../RippleButton/RippleButton';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './audioItem.scss';

const PlayArrowIcon = <PlayArrow size={24} color="white"/>;
const PauseIcon = <Pause size={24} color="white"/>;

export default class AudioItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    genre: PropTypes.string,
    playing: PropTypes.bool.isRequired,
    onPlayClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onPlay = this.onPlay.bind(this);
  }

  render() {
    return (
      <li className={classes.component} onClick={this.onPlay}>
        <RippleButton rounded={true} className={classes.button}>
          {this.props.playing ? PauseIcon : PlayArrowIcon}
        </RippleButton>

        <AudioInfo title={this.props.title} artist={this.props.artist} genre={this.props.genre} />
      </li>
    );
  }

  shouldComponentUpdate(nextProps) {
    return !this.checkProps(nextProps);
  }

  checkProps(nextProps) {
    const {title, artist, genre, id, playing} = this.props;

    return title === nextProps.title && artist === nextProps.artist &&
      genre === nextProps.genre && id === nextProps.id && playing === nextProps.playing;
  }

  onPlay() {
    this.props.onPlayClick(this.props.id);
  }
}
