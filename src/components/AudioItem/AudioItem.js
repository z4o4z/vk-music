import React, {Component, PropTypes} from 'react';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';
import AudioInfo from '../AudioInfo/AudioInfo';

import classes from './audioItem.scss';

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
      <div className={this.getClassName()} onClick={this.onPlay}>
        <PlayPauseButton playing={this.props.playing}/>

        <AudioInfo title={this.props.title} artist={this.props.artist} genre={this.props.genre} />
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return !this.checkProps(nextProps);
  }

  getClassName() {
    let _classes = [classes.component];

    if (this.props.playing) {
      _classes.push(classes.active);
    }

    return _classes.join(' ');
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
