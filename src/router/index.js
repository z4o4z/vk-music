import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';

import App from '../containers/App/App';
import Audios from '../containers/Audios/Audios';
import Friends from '../containers/Friends/Friends';
import Albums from '../containers/Albums/Albums';
import Groups from '../containers/Groups/Groups';
import Playlist from '../containers/Playlist/Playlist';
import Authorize from '../containers/Authorize/Authorize';

class MyRouter extends Component {
	static propTypes = {
		userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		history: PropTypes.object.isRequired,
		routing: PropTypes.object.isRequired,
		authorized: PropTypes.bool.isRequired
	};

	routes = {
		path: '/',
		indexRoute: {onEnter: (nextState, replace) => this.onEnter(nextState, replace)},
		childRoutes: [{
			path: 'authorise',
			component: Authorize,
			onEnter: (nextState, replace) => this.onEnter(nextState, replace)
		}, {
			path: ':ownerId',
			component: App,
			indexRoute: {component: Audios},
			onEnter: (nextState, replace) => this.onEnter(nextState, replace),
			childRoutes: [{
				path: 'albums',
				component: Albums
			}, {
				path: 'albums/:albumId',
				component: Audios
			}, {
				path: 'friends',
				component: Friends
			}, {
				path: 'groups',
				component: Groups
			}, {
				path: 'playlist',
				component: Playlist
			}]
		}]
	};

	onEnter(nextState, replace) {
		const nextPathName = nextState.location.pathname;

		if (!this.props.authorized && nextPathName !== '/authorise') {
			replace({
				pathname: '/authorise',
				state: nextPathName
			});
		} else if (this.props.authorized && (nextPathName === '/' || nextPathName === '/authorise')) {
			replace({
				pathname: `/${this.props.userId}`,
				state: nextPathName
			});
		}
	}

	render() {
		return (
			<Router history={this.props.history} routes={this.routes} />
		);
	}
}

const mapStateToProps = ({vk, routing}) => ({
	authorized: vk.authorized,
	userId: vk.userId,
	routing: routing.locationBeforeTransitions
});

export default connect(mapStateToProps)(MyRouter);
