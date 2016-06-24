import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {getGenreById} from '../../helpers/genres';

import Loader from '../Loader/Loader';
import AudioItem from '../AudioItem/AudioItem';

export default class AudioList extends Component {
  static propTypes = {
    audios: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired,
    playerTrack: PropTypes.number.isRequired,
    playerPlaying: PropTypes.bool.isRequired,
    getAudio: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    setTrack: PropTypes.func.isRequired,
    playPlayPause: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
  }

  componentWillMount() {
    this.props.getAudio(0, 100);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.playerTrack && Object.keys(nextProps.audios).length) {
      this.props.setTrack(nextProps.ids[0]);
    }
  }

  onPlayClick(id) {
    if (id === this.props.playerTrack) {
      this.props.playPlayPause();
    } else {
      this.props.playTrack(id);
    }
  }

  renderItem(index, key) {
    const audio = this.props.audios[this.props.ids[index]];
    const id = audio.aid;

    return <AudioItem
      key={key}
      id={id}
      title={audio.title}
      artist={audio.artist}
      genre={getGenreById(audio.genre)}
      onPlayClick={this.onPlayClick}
      playing={this.props.playerPlaying && id === this.props.playerTrack}
      />;
  }

  getLoader() {
    if (!this.props.audiosLoading) {
      return null;
    }

    return <Loader />;
  }

  render() {
    return (
      <div>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.ids.length}
          type="uniform"
          threshold={200}
          useStaticSize={true}
          />
        {this.getLoader()}
        {this.getLoader()}
      </div>
    );
  }
}
