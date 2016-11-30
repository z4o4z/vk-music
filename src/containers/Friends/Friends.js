import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import Home from 'react-icons/lib/md/home';
import AvAlbum from 'react-icons/lib/md/album';
import SocialPerson from 'react-icons/lib/md/person';
import SocialPeople from 'react-icons/lib/md/people';
import ExitToApp from 'react-icons/lib/md/exit-to-app';
import Notifications from 'react-icons/lib/md/notifications';

import {UI_SIZE_ICON, UI_COLOR_ACCENT, UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {FRIENDS_FETCH_COUNT} from '../../constants/general';

import {usersFetchFriends} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

export class Friends extends Component {
	static propTypes = {
		ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
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

	getItemProps = item => {
		const id = item.id;

		return {
			key: id,
			name: `${item.first_name} ${item.last_name}`,
			photo: item.photo_100,
			url: `/${id}`,
			links: [{
				href: `/${id}/albums`,
				title: 'Альбомы',
				blank: false,
				icon: <AvAlbum size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}, {
				href: `/${id}/wall`,
				title: 'Стена',
				blank: false,
				icon: <Home size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}, {
				href: `/${id}/friends`,
				title: 'Друзья',
				blank: false,
				icon: <SocialPerson size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}, {
				href: `/${id}/groups`,
				title: 'Группы',
				blank: false,
				icon: <SocialPeople size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}, {
				href: `/${id}/recommendations`,
				title: 'Рекомендации',
				blank: false,
				icon: <Notifications size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}, {
				href: `https://vk.com/id${id}`,
				title: 'VK',
				blank: true,
				icon: <ExitToApp size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}]
		};
	}
}

const mapStateToProps = ({users, entities}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}--friends`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		fetching,
		error,
		offset,
		count,
		ownerId,
		entityId,
		items: users
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchFriends(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
