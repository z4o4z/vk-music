import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {getGenreById} from '../../helpers/genres.js';

import Loader from '../Loader/Loader';
import AudioItem from '../AudioItem/AudioItem';

export default class AudioList extends Component {
  static propTypes = {
    audios: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(index, key) {
    const audio = this.props.audios[this.props.ids[index]];

    return <AudioItem
      key={key}
      title={audio.title}
      artist={audio.artist}
      genre={getGenreById(audio.genre)}
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
