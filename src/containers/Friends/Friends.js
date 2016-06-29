import React, {Component} from 'react';
import {connect} from 'react-redux';

class Friends extends Component {
  render() {
    return (
      <div>Друзья</div>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
