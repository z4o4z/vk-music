import {connect} from 'react-redux';

import {FRIENDS_FETCH_COUNT} from '../../constants/friends';

import {fetchFriends} from '../../actions/friends';

import EssenceList from '../../components/EssenceList/EssenceList';

class Friends extends EssenceList {
	getItemProps(key, item) {
		return {
			key,
			name: `${item.first_name} ${item.last_name}`,
			photo: item.photo_100,
			url: `/friend/${item.uid}`,
			links: [{
				to: `/friends/${item.uid}`,
				blank: false,
				name: 'Друзья'
			}, {
				to: `/friend/${item.uid}/albums`,
				blank: false,
				name: 'Альбомы'
			}, {
				to: `//vk.com/id${item.uid}`,
				blank: true,
				name: 'Профиль в VK'
			}]
		};
	}
}

const mapStateToProps = state => ({
	currentUserId: state.authorize.ownerId,
	all: state.friends.all,
	owners: state.friends.users,
	fetchCount: FRIENDS_FETCH_COUNT,
	loading: state.friends.loading,
	error: state.friends.error
});

const mapDispatchToProps = dispatch => ({
	fetch: (offset, count, ownerId) => dispatch(fetchFriends(offset, count, ownerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
