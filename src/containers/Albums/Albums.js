import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {ALBUMS_FETCH_COUNT} from '../../constants/albums';

import {usersFetchAlbums} from '../../actions/users';

import Essences from '../../components/Essences/Essences';

import albumsLogo from './album.svg';

class Albums extends Component {
	static propTypes = {
		userId: PropTypes.number.isRequired
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

	getItemProps = (key, item) => {
		return {
			key,
			url: `/${this.props.userId}/albums/${item.id}`,
			name: item.title,
			photo: albumsLogo,
			links: [{
				to: `//vk.com/audios${this.props.userId}?album_id=${item.id}`,
				blank: true,
				name: 'Открыть в VK'
			}]
		};
	}
}

const mapStateToProps = ({entities}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const entityId = `${userId}-albums`;
	const {ids, items, fetching, error, offset, count} = entities[entityId] || {};

	return ({
		ids,
		items,
		fetching,
		error,
		offset,
		count,
		userId: userId
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchAlbums(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
