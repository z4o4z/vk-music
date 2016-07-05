import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';

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

  routes = {
    path: '/',
    component: App,
    indexRoute: {
      component: MyAudios,
      onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
    },
    childRoutes: [{
      path: '/friends',
      component: Friends,
      onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
    }, {
      path: '/friend/:friendId',
      component: FriendAudios,
      onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
    }, {
      path: '/authorise',
      component: Authorize
    }]
  };

  checkAuth(nextState, replace) {
    if (this.props.authorized) {
      return nextState;
    }

    this.props.redirectTo(nextState.location.pathname);

    replace('/authorise');
  }

  render() {
    return (
      <Router history={this.props.history} routes={this.routes} />
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
