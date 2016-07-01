import {connect} from 'react-redux';

import {FRIENDS_FETCH_COUNT} from '../../constants/friends';

import {fetchFriends, updateFriends} from '../../actions/friends';

import FriendsAndGroupsList from '../../components/FriendsAndGroupsList/FriendsAndGroupsList';

class Friends extends FriendsAndGroupsList {
  getName(item) {
    return `${item.first_name} ${item.last_name}`;
  }
}

const mapStateToProps = state => ({
  items: state.friends.all,
  ids: state.friends.ids,
  offset: state.friends.offset,
  fetchCount: FRIENDS_FETCH_COUNT,
  loading: state.friends.loading,
  allLoaded: state.friends.allLoaded,
  error: state.friends.error
});

const mapDispatchToProps = dispatch => ({
  fetch: (offset, count) => dispatch(fetchFriends(offset, count)),
  update: (offset, count) => dispatch(updateFriends(offset, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
