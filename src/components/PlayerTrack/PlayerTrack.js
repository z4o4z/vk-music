import React, {Component, PropTypes} from 'react';

export default class PlayerTrack extends Component {
  static propTypes = {
    audioFile: PropTypes.string,
    playing: PropTypes.bool.isRequired,
    onEnded: PropTypes.func.isRequired
  };

  render() {
    return (
      <audio src={this.getProxyUrl(this.props.audioFile)} ref="audio" onEnded={this.props.onEnded} crossOrigin="anonymous"/>
    );
  }

  componentDidUpdate() {
    if (this.props.playing) {
      this.refs.audio.play();
    } else {
      this.refs.audio.pause();
    }
  }

  getProxyUrl(url) {
    if (url.search('psv4.vk.me/') + 1) {
      return url;
    }

    let urlArr = url.split('/');
    urlArr[0] = 'http:';
    urlArr.splice(2, 0, window.location.host, 'audio-proxy');

    return urlArr.join('/');
  }
}
