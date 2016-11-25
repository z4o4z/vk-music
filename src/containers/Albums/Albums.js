import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {ALBUMS_FETCH_COUNT} from '../../constants/general';

import {usersFetchAlbums} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

import albumsLogo from './album.svg';

class Albums extends Component {
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

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getItemProps = item => {
		const id = item.id;

		return {
			key: id,
			url: `/${this.props.ownerId}/albums/${item.id}`,
			name: item.title,
			photo: albumsLogo,
			links: [{
				href: `https://vk.com/audios${this.props.ownerId}?album_id=${item.id}`,
				blank: true,
				name: 'VK'
			}]
		};
	}
}

const mapStateToProps = ({entities}, ownProps) => {
	const ownerId = Number(ownProps.params.ownerId);
	const entityId = `${ownerId}-albums`;
	const {ids, items, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		items,
		fetching,
		error,
		offset,
		count,
		ownerId: ownerId
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAlbums(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
