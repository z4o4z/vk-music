import {connect} from 'react-redux';

import {fetchFriendAudio, updateFriendAudio} from '../../actions/audios';
import {playerPlayTrack, playerPlayPause, playerSetTrack} from '../../actions/player';

import AudiosList from '../../components/AudiosList/AudiosList';

class FriendAudios extends AudiosList {

  fetch(count) {
    this.props.fetchAudio(Number(this.props.params.friendId), 0, count);
  }

  update(count) {
    this.props.updateAudio(Number(this.props.params.friendId), this.props.offset + count + 1, count);
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.params.friendId);
  const friend = state.audio.friends[id] || {};

  return ({
    audios: state.audio.all,
    ids: friend.ids || [],
    offset: friend.offset || 0,
    audiosLoading: state.audio.loading,
    audiosError: state.audio.error,
    allLoaded: friend.allLoaded || false,
    playerCurrentTrack: state.player.current,
    playerPlaying: state.player.playing
  });
};

const mapDispatchToProps = dispatch => ({
  fetchAudio: (id, offset, count) => dispatch(fetchFriendAudio(id, offset, count)),
  updateAudio: (id, offset, count) => dispatch(updateFriendAudio(id, offset, count)),
  playTrack: id => dispatch(playerPlayTrack(id)),
  setTrack: id => dispatch(playerSetTrack(id)),
  playPlayPause: () => dispatch(playerPlayPause())
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendAudios);
