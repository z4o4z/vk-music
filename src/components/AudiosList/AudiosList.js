import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {AUDIO_FETCH_COUNT} from '../../constants/audios';

import {getGenreById} from '../../helpers/genres';

import AudioItem from '../AudioItem/AudioItem';

import classes from './audiosList.scss';

export default class AudiosList extends Component {
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
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.props.fetchAudio(this.props.offset, AUDIO_FETCH_COUNT);
  }

  render() {
    return (
      <div className={classes.component} ref="scrollable" onScroll={this.onScroll}>
        <div className={classes.content}>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.props.ids.length}
            pageSize={AUDIO_FETCH_COUNT}
            type="uniform"
            useStaticSize={true}
            useTranslate3d={true}
            currentId={this.props.playerCurrentTrack}
            playerPlaying={this.props.playerPlaying}
          />
        </div>
      </div>
    );
  }

  shouldComponentUpdate(newProps) {
    const {audios, ids, offset, audiosLoading, audiosError, playerCurrentTrack, playerPlaying} = newProps;

    return this.props.audios !== audios || this.props.ids !== ids ||
      this.props.offset !== offset || this.props.audiosLoading !== audiosLoading ||
      this.props.audiosError !== audiosError || this.props.playerCurrentTrack !== playerCurrentTrack ||
      this.props.playerPlaying !== playerPlaying;
  }

  renderItem(index, key) {
    const audio = this.props.audios[this.props.ids[index]];

    return (
      <AudioItem
        key={key}
        id={audio.aid}
        title={audio.title}
        artist={audio.artist}
        genre={getGenreById(audio.genre)}
        onPlayClick={this.onPlayClick}
        playing={this.props.playerPlaying && audio.aid === this.props.playerCurrentTrack}
      />
    );
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
