import React, {Component, PropTypes} from 'react';

import {getGenreById} from '../../helpers/genres';

import Loader from '../Loader/Loader';
import AudioItem from '../AudioItem/AudioItem';

export default class AudioList extends Component {
  static propTypes = {
    audios: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired,
    playerCurrentTrack: PropTypes.number.isRequired,
    playerPlaying: PropTypes.bool.isRequired,
    getAudio: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    setTrack: PropTypes.func.isRequired,
    playPlayPause: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onPlayClick = this.onPlayClick.bind(this);
  }

  componentWillMount() {
    this.props.getAudio(0, 100);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.playerCurrentTrack && Object.keys(nextProps.audios).length) {
      this.props.setTrack(nextProps.ids[0]);
    }
  }

  onPlayClick(id) {
    if (id === this.props.playerCurrentTrack) {
      this.props.playPlayPause();
    } else {
      this.props.playTrack(id);
    }
  }

  renderItems() {
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

  getLoader() {
    if (!this.props.audiosLoading) {
      return null;
    }

    return <Loader />;
  }

  render() {
    return (
      <div>
        {this.renderItems()}
        {this.getLoader()}
      </div>
    );
  }
}
