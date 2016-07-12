import {connect} from 'react-redux';

import {fetchAudio} from '../../actions/audios';
import {playerPlayTrack, playerPlayPause, playerSetTrack} from '../../actions/player';

import AudiosList from '../../components/AudiosList/AudiosList';

class UserAudios extends AudiosList {}

const mapStateToProps = state => {
  return ({
    audios: state.audio.all,
    owners: state.audio.owners,
    currentUserId: state.authorize.ownerId,
    loading: state.audio.loading,
    error: state.audio.error,
    playerCurrentTrack: state.player.current || 0,
    playerPlaying: state.player.playing
  });
};

const mapDispatchToProps = dispatch => ({
  fetch: (offset, count, ownerId, albumId) => dispatch(fetchAudio(offset, count, ownerId, albumId)),
  playTrack: id => dispatch(playerPlayTrack(id)),
  setTrack: id => dispatch(playerSetTrack(id)),
  playPlayPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAudios);
