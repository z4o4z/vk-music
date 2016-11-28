import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {GROUPS_FETCH_COUNT} from '../../constants/general';

import {usersFetchGroups} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

class Groups extends Component {
	static propTypes = {
		ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	};

	render() {
		return (
			<Essences
				{...this.props}
				updateHeight={UI_SCROLL_UPDATE_HEIGHT}
				fetchCount={GROUPS_FETCH_COUNT}
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
			name: item.name,
			photo: item.photo_100,
			url: `/-${id}`,
			links: [{
				href: `/-${id}/albums`,
				blank: false,
				name: 'Альбомы'
			}, {
				href: `/-${id}/members`,
				blank: false,
				name: 'Подписчики'
			}, {
				href: `https://vk.com/${item.screen_name}`,
				blank: true,
				name: 'VK'
			}]
		};
	}
}

const mapStateToProps = ({groups, entities}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}--groups`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		fetching,
		error,
		offset,
		count,
		ownerId,
		entityId,
		items: groups
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchGroups(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
