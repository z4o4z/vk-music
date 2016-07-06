import {
  FRIENDS_ERROR,
  FRIENDS_LOADING,
  FRIENDS_FETCHED
} from '../constants/friends';

import normalizeBy from '../helpers/normalizeBy';

function loading(offset, count, userId) {
  return {
    type: FRIENDS_LOADING,
    payload: {
      offset,
      count,
      userId
    }
  };
}

function error(id) {
  return {
    type: FRIENDS_ERROR,
    payload: id
  };
}

function friendsFetched(friends, offset, id) {
  return {
    type: FRIENDS_FETCHED,
    payload: {
      offset,
      id,
      ...normalizeBy(friends, 'uid')
    }
  };
}

function fetch(offset, count, userId) {
  let params = {
    offset,
    count,
    fields: 'photo_100',
    order: 'hints'
  };

  if (userId) {
    params.user_id = userId;
  }

  return new Promise((resolve, reject) => {
    window.VK.api("friends.get", params, data => {
      if (data.error) {
        if (!IS_PROD) {
          console.error(data.error);
        }

        return reject(data.error.error_code);
      }

      return resolve(data.response);
    });
  });
}

export const fetchFriends = (offset, count, userId) => dispatch => {
  dispatch(loading(offset, count, userId));

  fetch(offset, count, userId)
    .then(friends => dispatch(friendsFetched(friends, offset, userId)))
    .catch(id => dispatch(error(id)));
};
