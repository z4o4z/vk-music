import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {AUDIOS_FETCH_COUNT} from '../../constants/audios';

import {getGenreById} from '../../helpers/genres';

import Scrollable from '../Scrollable/Scrollable';
import AudioItem from '../AudioItem/AudioItem';

export default class AudiosList extends Component {
  static propTypes = {
    audios: PropTypes.object.isRequired,
    owners: PropTypes.object.isRequired,
    albums: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.number.isRequired,
    playerCurrentTrack: PropTypes.number.isRequired,
    playerPlaying: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired,
    fetch: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    setTrack: PropTypes.func.isRequired,
    playPlayPause: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.getUserData(this.props);

    this.renderItem = this.renderItem.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);

    this.fetch(AUDIOS_FETCH_COUNT);
  }

  render() {
    return (
    <Scrollable onScroll={this.onScroll}>
      <ReactList
        itemRenderer={this.renderItem}
        length={this.state.ids.length}
        pageSize={AUDIOS_FETCH_COUNT}
        type="uniform"
        useStaticSize={true}
        useTranslate3d={true}
        currentId={this.props.playerCurrentTrack}
        playerPlaying={this.props.playerPlaying}
      />
    </Scrollable>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getUserData(nextProps));
  }

  shouldComponentUpdate(newProps, nextState) {
    const {audios, owners, loading, error, playerCurrentTrack, playerPlaying} = newProps;

    return this.props.audios !== audios || this.props.owners !== owners ||
      this.props.loading !== loading || this.props.error !== error ||
      this.props.playerCurrentTrack !== playerCurrentTrack ||
      this.props.playerPlaying !== playerPlaying || this.state !== nextState;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.id !== nextState.id || this.state.albumId !== nextState.albumId) {
      this.fetch(AUDIOS_FETCH_COUNT);
    }
  }

  getUserData(props) {
    const id = Number(props.params.ownerId) || props.currentUserId;
    const albumId = Number(props.params.albumId) || 0;
    const owner = props.owners[id] || {};
    const album = props.albums[albumId] || {};

    if (albumId) {
      return {
        id,
        albumId,
        ids: album.ids || [],
        offset: album.offset || 0,
        allLoaded: album.allLoaded || false
      };
    }

    return {
      id,
      albumId,
      ids: owner.ids || [],
      offset: owner.offset || 0,
      allLoaded: owner.allLoaded || false
    };
  }

  renderItem(index, key) {
    const audio = this.props.audios[this.state.ids[index]];

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

  fetch(count) {
    return this.props.fetch(0, count, this.state.id, this.state.albumId);
  }

  update(count) {
    const from = this.state.offset + count + 1;

    return this.props.fetch(from, count, this.state.id, this.state.albumId);
  }

  onPlayClick(id) {
    if (id === this.props.playerCurrentTrack) {
      this.props.playPlayPause();
    } else {
      this.props.playTrack(id);
    }
  }

  onScroll(scrollTop, height, childHeight) {
    const updateHeight = childHeight - height - UI_SCROLL_UPDATE_HEIGHT;

    if (scrollTop >= updateHeight && !this.props.loading && !this.state.allLoaded) {
      this.update(AUDIOS_FETCH_COUNT);
    }
  }
}

