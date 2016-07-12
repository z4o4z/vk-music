import {connect} from 'react-redux';

import {ALBUMS_FETCH_COUNT} from '../../constants/albums';

import {fetchAlbums} from '../../actions/albums';

import EssenceList from '../../components/EssenceList/EssenceList';

import albumsLogo from './album.svg';

class Albums extends EssenceList {
  getItemProps(key, item) {
    return {
      key,
      name: item.title,
      photo: albumsLogo,
      url: `/album/${item.album_id}`,
      links: [{
        to: `//vk.com/audios${this.props.params.ownerId || this.props.currentUserId}?album_id=${item.album_id}`,
        blank: true,
        name: 'Открыть в VK'
      }]
    };
  }
}

const mapStateToProps = state => ({
  currentUserId: state.authorize.userId,
  all: state.albums.all,
  owners: state.albums.users,
  fetchCount: ALBUMS_FETCH_COUNT,
  loading: state.albums.loading,
  error: state.albums.error
});

const mapDispatchToProps = dispatch => ({
  fetch: (offset, count, userId) => dispatch(fetchAlbums(offset, count, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
