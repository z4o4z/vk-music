import {connect} from 'react-redux';

import {fetchUserAudio} from '../../actions/audios';
import {playerPlayTrack, playerPlayPause, playerSetTrack} from '../../actions/player';

import AudiosList from '../../components/AudiosList/AudiosList';

class UserAudios extends AudiosList {}

const mapStateToProps = state => {
  return ({
    audios: state.audio.all,
    users: state.audio.users,
    currentUserId: state.authorize.userId,
    loading: state.audio.loading,
    error: state.audio.error,
    playerCurrentTrack: state.player.current,
    playerPlaying: state.player.playing
  });
};

const mapDispatchToProps = dispatch => ({
  fetch: (offset, count, userId) => dispatch(fetchUserAudio(offset, count, userId)),
  playTrack: id => dispatch(playerPlayTrack(id)),
  setTrack: id => dispatch(playerSetTrack(id)),
  playPlayPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAudios);
