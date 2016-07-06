import {connect} from 'react-redux';

import {FRIENDS_FETCH_COUNT} from '../../constants/friends';

import {fetchFriends} from '../../actions/friends';

import FriendsAndGroupsList from '../../components/FriendsAndGroupsList/FriendsAndGroupsList';

class Friends extends FriendsAndGroupsList {
  getName(item) {
    return `${item.first_name} ${item.last_name}`;
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
