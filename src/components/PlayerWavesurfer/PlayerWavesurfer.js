import React, {Component, PropTypes} from 'react';

import Wavesurfer from 'react-wavesurfer';

import classes from './playerWavesurfer.scss';

export default class PlayerWavesurfer extends Component {
  static propTypes = {
    audioFile: PropTypes.string
  };

  getProxyUrl(url) {
    let urlArr = url.split('/');
    urlArr[0] = 'http:';
    urlArr.splice(2, 0, window.location.host, 'audio-proxy');

    return urlArr.join('/');
  }

  getOptions() {
    return {
      height: 48,
      barWidth: 2,
      skipLength: 0,
      waveColor: '#cfd8dc',
      progressColor: '#ffffff',
      cursorColor: '#009688',
      cursorWidth: 2,
      hideScrollbar: true
    };
  }

  render() {
    return (
      <div className={classes.component}>
        <Wavesurfer
          audioFile={this.getProxyUrl(this.props.audioFile)}
          playing={true}
          options={this.getOptions()}
          />
      </div>
    );
  }
}
