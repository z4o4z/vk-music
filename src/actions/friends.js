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
      ...normalizeBy(friends, 'id')
    }
  };
}

function friendsUpdated(offset, friends) {
  return {
    type: FRIENDS_UPDATED,
    payload: {
      offset,
      ...normalizeBy(friends, 'id')
    }
  };
}

function fetch(offset, count) {
  let params = {
    offset,
    count
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

export const fetchMyAudio = (offset, count) => dispatch => {
  dispatch(loading(undefined, undefined, undefined, offset, count));

  fetchAudio(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudioFetched(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};

export const updateMyAudio = (offset, count) => dispatch => {
  dispatch(loading());

  fetchAudio(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudioUpdated(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};
