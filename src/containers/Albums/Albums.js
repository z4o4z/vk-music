import {connect} from 'react-redux';

import {ALBUMS_FETCH_COUNT} from '../../constants/albums';

import {fetchAlbums} from '../../actions/albums';

import EssenceList from '../../components/EssenceList/EssenceList';

import albumsLogo from './album.svg';

class Albums extends EssenceList {
	getItemProps(key, item) {
		const ownerId = this.props.params.ownerId || this.props.currentUserId;
		const albumId = item.album_id;
		const url = this.props.params.ownerId ? `/friend/${ownerId}/album/${albumId}` : `/album/${albumId}`;

		return {
			key,
			url,
			name: item.title,
			photo: albumsLogo,
			links: [{
				to: `//vk.com/audios${ownerId}?album_id=${albumId}`,
				blank: true,
				name: 'Открыть в VK'
			}]
		};
	}
}

const mapStateToProps = state => ({
	currentUserId: state.authorize.ownerId,
	all: state.albums.all,
	owners: state.albums.users,
	fetchCount: ALBUMS_FETCH_COUNT,
	loading: state.albums.loading,
	error: state.albums.error
});

const mapDispatchToProps = dispatch => ({
	fetch: (offset, count, ownerId) => dispatch(fetchAlbums(offset, count, ownerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
