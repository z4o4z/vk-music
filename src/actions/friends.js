import {
  FRIENDS_ERROR,
  FRIENDS_LOADED,
  FRIENDS_LOADING,
  FRIENDS_FETCHED,
  FRIENDS_UPDATED
} from '../constants/friends';

import normalizeBy from '../helpers/normalizeBy';

function loading(offset, count) {
  return {
    type: FRIENDS_LOADING,
    payload: {
      offset,
      count
    }
  };
}

function loaded() {
  return {
    type: FRIENDS_LOADED
  };
}

function error(id) {
  return {
    type: FRIENDS_ERROR,
    payload: id
  };
}

function friendsFetched(offset, friends) {
  return {
    type: FRIENDS_FETCHED,
    payload: {
      offset,
      ...normalizeBy(friends, 'uid')
    }
  };
}

function friendsUpdated(offset, friends) {
  return {
    type: FRIENDS_UPDATED,
    payload: {
      offset,
      ...normalizeBy(friends, 'uid')
    }
  };
}

function fetch(offset, count) {
  let params = {
    offset,
    count,
    fields: 'photo_100',
    order: 'hints'
  };

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

export const fetchFriends = (offset, count) => dispatch => {
  dispatch(loading(offset, count));

  fetch(offset, count)
    .then(audios => dispatch(friendsFetched(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};

export const updateFriends = (offset, count) => dispatch => {
  dispatch(loading(offset, count));

  fetch(offset, count)
    .then(audios => dispatch(friendsUpdated(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};
