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
      url: `/frined/${item.uid}`,
      links: [{
        to: `/friends/${item.uid}`,
        blank: false,
        name: 'Друзья'
      }, {
        to: `//vk.com/id${item.uid}`,
        blank: true,
        name: 'Профиль в VK'
      }]
    };
  }
}

const mapStateToProps = state => ({
  currentUserId: state.authorize.userId,
  all: state.friends.all,
  owners: state.friends.users,
  fetchCount: FRIENDS_FETCH_COUNT,
  loading: state.friends.loading,
  error: state.friends.error
});

const mapDispatchToProps = dispatch => ({
  fetch: (offset, count, userId) => dispatch(fetchFriends(offset, count, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
