import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';

import {redirectTo} from '../actions/authorize';

import App from '../containers/App/App';
import MyAudios from '../containers/MyAudios/MyAudios';
import Friends from '../containers/Friends/Friends';
import FriendAudios from '../containers/FriendAudios/FriendAudios';
import Authorize from '../containers/Authorize/Authorize';

class MyRouter extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
    redirectTo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.checkAuth = this.checkAuth.bind(this);
  }

  checkAuth(nextState, replace) {
    if (this.props.authorized) {
      return;
    }

    this.props.redirectTo(nextState.location.pathname);

    replace('/authorise');
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRoute component={MyAudios} onEnter={this.checkAuth}/>
          <Route path="friends" component={Friends} onEnter={this.checkAuth}/>
          <Route path="/friend/:friendId" component={FriendAudios} onEnter={this.checkAuth}/>
          <Route path="/authorise" component={Authorize}/>
        </Route>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.authorize.authorized
});

const mapDispatchToProps = dispatch => ({
  redirectTo: page => dispatch(redirectTo(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRouter);
