import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {GROUPS_FETCH_COUNT} from '../../constants/general';

import {usersFetchGroups} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

class Groups extends Component {
	static propTypes = {
		userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
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

	getItemProps = (key, item) => {
		const id = item.id;

		return {
			key,
			name: item.name,
			photo: item.photo_100,
			url: `/-${id}`,
			links: [{
				href: `/-${id}/albums`,
				blank: false,
				name: 'Альбомы'
			}, {
				href: `https://vk.com/${item.screen_name}`,
				blank: true,
				name: 'VK'
			}]
		};
	}
}

const mapStateToProps = ({users, entities}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const {ids, fetching, error, offset, count} = entities[`${userId}-groups`] || {};

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
	fetch: params => dispatch(usersFetchGroups(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
