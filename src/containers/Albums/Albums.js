import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';

import ExitToApp from 'react-icons/lib/md/exit-to-app';

import {UI_SIZE_ICON, UI_COLOR_ACCENT, UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {ALBUMS_FETCH_COUNT} from '../../constants/general';

import {usersFetchAlbums} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

import albumsLogo from './album.svg';

class Albums extends PureComponent {
	static propTypes = {
		ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	};

	render() {
		return (
			<Essences
				{...this.props}
				updateHeight={UI_SCROLL_UPDATE_HEIGHT}
				fetchCount={ALBUMS_FETCH_COUNT}
				getItemProps={this.getItemProps}
			/>
		);
	}

	getItemProps = item => {
		const id = item.cid;

		return {
			key: id,
			url: `/${this.props.ownerId}/albums/${item.id}`,
			name: item.title,
			photo: albumsLogo,
			links: [, {
				href: `https://vk.com/${item.screen_name}`,
				title: 'VK',
				blank: true,
				icon: <ExitToApp size={UI_SIZE_ICON} color={UI_COLOR_ACCENT} />
			}]
		};
	}
}

const mapStateToProps = ({entities, albums}, ownProps) => {
	const ownerId = ownProps.params.ownerId;
	const entityId = `${ownerId}--albums`;
	const {ids, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		fetching,
		error,
		offset,
		count,
		entityId,
		items: albums,
		ownerId: ownerId
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAlbums(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
