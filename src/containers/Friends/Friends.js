import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
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
				blank: false,
				name: 'Альбомы'
			}, {
				href: `/${id}/friends`,
				blank: false,
				name: 'Друзья'
			}, {
				href: `/${id}/groups`,
				blank: false,
				name: 'Группы'
			}, {
				href: `https://vk.com/id${id}`,
				blank: true,
				name: 'VK'
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
