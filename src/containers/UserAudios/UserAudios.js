import {connect} from 'react-redux';

import {fetchUserAudio} from '../../actions/audios';
import {playerPlayTrack, playerPlayPause, playerSetTrack} from '../../actions/player';

import AudiosList from '../../components/AudiosList/AudiosList';

class UserAudios extends AudiosList {}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.params.userId) || state.authorize.userId;
  const user = state.audio.users[id] || {};

  return ({
    audios: state.audio.all,
    currentUserId: state.authorize.userId,
    ids: user.ids || [],
    offset: user.offset || 0,
    audiosLoading: state.audio.loading,
    audiosError: state.audio.error,
    allLoaded: user.allLoaded || false,
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
