import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';

import App from '../containers/App/App';
import Audios from '../containers/Audios/Audios';
import Friends from '../containers/Friends/Friends';
import Albums from '../containers/Albums/Albums';
import Authorize from '../containers/Authorize/Authorize';

class MyRouter extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		authorized: PropTypes.bool.isRequired
	};

	routes = {
		path: '/',
		childRoutes: [{
			path: 'authorise',
			component: Authorize
		}, {
			path: ':userId',
			component: App,
			onEnter: (nextState, replace) => this.checkAuth(nextState, replace),
			indexRoute: {
				component: Audios
			},
			childRoutes: [{
				path: 'albums',
				component: Albums
			}, {
				path: 'albums/:albumId',
				component: Audios
			}, {
				path: 'friends',
				component: Friends
			}]
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
			<Router history={this.props.history} routes={this.routes} />
		);
	}
}

const mapStateToProps = state => ({
	authorized: state.vk.authorized
});

export default connect(mapStateToProps)(MyRouter);
