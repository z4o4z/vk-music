import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {FRIENDS_FETCH_COUNT} from '../../constants/friends';

import {usersFetchFriends} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

class Friends extends Component {
	static propTypes = {
		userId: PropTypes.number.isRequired
	};

	render() {
		return (
			<Essences
				{...this.props}
				updateHeight={UI_SCROLL_UPDATE_HEIGHT}
				fetchCount={FRIENDS_FETCH_COUNT}
				getItemProps={this.getItemProps}
			/>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getItemProps = (key, item) => {
		const id = item.id;

		return {
			key,
			name: `${item.first_name} ${item.last_name}`,
			photo: item.photo_100,
			url: `/${id}`,
			links: [{
				to: `/${id}/friends`,
				blank: false,
				name: 'Друзья'
			}, {
				to: `/${id}/albums`,
				blank: false,
				name: 'Альбомы'
			}, {
				to: `//vk.com/id${id}`,
				blank: true,
				name: 'Профиль в VK'
			}]
		};
	}
}

const mapStateToProps = ({users, entities}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const {ids, fetching, error, offset, count} = entities[`${userId}-friends`] || {};

	return ({
		ids,
		fetching,
		error,
		offset,
		count,
		userId,
		items: users
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchFriends(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
