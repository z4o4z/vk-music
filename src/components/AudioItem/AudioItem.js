import React, {Component, PropTypes} from 'react';

import PlayArrow from 'react-icons/lib/md/play-arrow';
import Pause from 'react-icons/lib/md/pause';

import RippleButton from '../RippleButton/RippleButton';

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

  checkProps(nextProps) {
    const {title, artist, genre} = this.props;

    return title === nextProps.title && artist === nextProps.artist && genre === nextProps.genre;
  }

  shouldComponentUpdate(nextProps) {
    return !this.checkProps(nextProps);
  }

  onPlay() {
    this.props.onPlayClick(this.props.id);
  }

  render() {
    return (
      <div className={classes.component} onClick={this.onPlay}>
        <RippleButton rounded={true} className={classes.button}>
          {this.props.playing ? PauseIcon : PlayArrowIcon}
        </RippleButton>
        <div className={classes.info}>
          <span className={classes.title}>{this.props.title}</span>
          <div className={classes.infoFooter}>
            <span className={classes.artist}>{this.props.artist}</span>
            <span className={classes.genre}>{this.props.genre}</span>
          </div>
        </div>
      </div>
    );
  }
}
