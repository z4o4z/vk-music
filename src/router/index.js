import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router, Route} from 'react-router';

import {redirectTo} from '../actions/authorize';

import App from '../containers/App/App';
import UserAudios from '../containers/UserAudios/UserAudios';
import Friends from '../containers/Friends/Friends';
import Albums from '../containers/Albums/Albums';
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
			component: UserAudios,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		},
		childRoutes: [{
			path: '/albums',
			component: Albums,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/album/:albumId',
			component: UserAudios,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/friends',
			component: Friends,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/friends/:ownerId',
			component: Friends,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/friend/:ownerId',
			component: UserAudios,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/friend/:ownerId/albums',
			component: Albums,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/friend/:ownerId/album/:albumId',
			component: UserAudios,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace)
		}, {
			path: '/authorise',
			component: Authorize
		}]
	};

	checkAuth(nextState, replace) {
		if (this.props && this.props.authorized) {
			return;
		}

		replace({
			pathname: '/authorise',
			state: nextState.location.pathname
		});
	}

	render() {
		return (
			<Router history={this.props.history} >
				<Route path="/" component={App}>
					<Route path="albums" component={Albums} onEnter={this.checkAuth} />
					<Route path="authorise" component={Authorize} />
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
