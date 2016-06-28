import React, {Component, PropTypes} from 'react';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {AUDIO_FETCH_COUNT} from '../../constants/audio';

import {getGenreById} from '../../helpers/genres';

import AudioItem from '../AudioItem/AudioItem';

import classes from './audioList.scss';

export default class AudioList extends Component {
  static propTypes = {
    audios: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired,
    playerCurrentTrack: PropTypes.number.isRequired,
    playerPlaying: PropTypes.bool.isRequired,
    fetchAudio: PropTypes.func.isRequired,
    updateAudio: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    setTrack: PropTypes.func.isRequired,
    playPlayPause: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onPlayClick = this.onPlayClick.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentWillMount() {
    this.props.fetchAudio(this.props.offset, AUDIO_FETCH_COUNT);
  }

  render() {
    return (
      <div className={classes.component} onScroll={this.onScroll} ref="scrollable">
        <ul className={classes.content}>
          {this.getItems()}
        </ul>
      </div>
    );
  }

  getItems() {
    return this.props.ids.map(id => {
      const audio = this.props.audios[id];

      return <AudioItem
        key={id}
        id={id}
        title={audio.title}
        artist={audio.artist}
        genre={getGenreById(audio.genre)}
        onPlayClick={this.onPlayClick}
        playing={this.props.playerPlaying && id === this.props.playerCurrentTrack}
      />;
    });
  }

  onPlayClick(id) {
    if (id === this.props.playerCurrentTrack) {
      this.props.playPlayPause();
    } else {
      this.props.playTrack(id);
    }
  }

  onScroll() {
    const scrollable = this.refs.scrollable;
    const scrollTop = scrollable.scrollTop;
    const height = scrollable.offsetHeight;
    const childHeight = scrollable.firstChild.offsetHeight;

    if (scrollTop >= childHeight - height - UI_SCROLL_UPDATE_HEIGHT && !this.props.audiosLoading) {
      this.props.updateAudio(this.props.offset + AUDIO_FETCH_COUNT + 1, AUDIO_FETCH_COUNT);
    }
  }
}
