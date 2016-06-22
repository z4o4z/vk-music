import React, {Component, PropTypes} from 'react';
import ReactList from 'react-list';

import {getGenreById} from '../../helpers/genres.js';

import Loader from '../Loader/Loader';
import AudioItem from '../AudioItem/AudioItem';

export default class AudioList extends Component {
  static propTypes = {
    audios: PropTypes.array.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(index, key) {
    return <AudioItem
      key={key}
      title={this.props.audios[index].title}
      artist={this.props.audios[index].artist}
      genre={getGenreById(this.props.audios[index].genre)}
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
          length={this.props.audios.length}
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
