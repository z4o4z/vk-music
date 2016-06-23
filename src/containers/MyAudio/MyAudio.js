import {PropTypes} from 'react';
import {connect} from 'react-redux';

import {getMyAudio} from '../../actions/audio';

import AudioList from '../../components/AudioList/AudioList';

class MyAudio extends AudioList {
  static propTypes = {
    audios: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired,
    getMyAudio: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.getMyAudio(0, 100);
  }
}

const mapStateToProps = state => ({
  audios: state.audio.all,
  ids: state.audio.my,
  audiosLoading: state.audio.loading,
  audiosError: state.audio.error
});

const mapDispatchToProps = dispatch => ({
  getMyAudio: (offset, count) => dispatch(getMyAudio(offset, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAudio);
