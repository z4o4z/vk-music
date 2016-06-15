import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactList from 'react-list';

import {getMyAudio} from '../../actions/audio';

import Loader from '../../components/Loader/Loader';

class MyAudio extends Component {
  static propTypes = {
    audios: PropTypes.array.isRequired,
    audiosLoading: PropTypes.bool.isRequired,
    audiosError: PropTypes.number.isRequired,
    getMyAudio: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.props.getMyAudio(0, 100);
  }

  renderItem(index, key) {
    return <div key={key}>{this.props.audios[index].title}</div>;
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
          />
        {this.getLoader()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  audios: state.audio.my,
  audiosLoading: state.audio.loading,
  audiosError: state.audio.error
});

const mapDispatchToProps = dispatch => ({
  getMyAudio: (offset, count) => dispatch(getMyAudio(offset, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAudio);
