import {connect} from 'react-redux';

import {getMyAudio} from '../../actions/audio';
import {playerPlayTrack, playerPlayPause, playerSetTrack} from '../../actions/player';

import AudioList from '../../components/AudioList/AudioList';

class MyAudio extends AudioList {}

const mapStateToProps = state => ({
  audios: state.audio.all,
  ids: state.audio.my,
  audiosLoading: state.audio.loading,
  audiosError: state.audio.error,
  playerCurrentTrack: state.player.current,
  playerPlaying: state.player.playing
});

const mapDispatchToProps = dispatch => ({
  getAudio: (offset, count) => dispatch(getMyAudio(offset, count)),
  playTrack: id => dispatch(playerPlayTrack(id)),
  setTrack: id => dispatch(playerSetTrack(id)),
  playPlayPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAudio);
