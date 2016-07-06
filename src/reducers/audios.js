import {
  AUDIOS_ERROR,
  AUDIOS_LOADING,
  AUDIOS_USER_FETCHED
} from '../constants/audios';

import isArrayStartFrom from '../helpers/isArrayStartFrom';
import getDifferencesByKeys from '../helpers/getDifferencesByKeys';

function getAllAudios(allAudios, newAudios) {
  let differentAudios = getDifferencesByKeys(allAudios, newAudios, 'title', 'artist', 'genre');

  if (differentAudios) {
    return {...allAudios, ...differentAudios};
  }

  return allAudios;
}

function loading(state) {
  return {
    ...state,
    loading: true
  };
}

function fetchedUserAudio(state, action) {
  let user = state.users[action.payload.id] || {};
  let ids = user.ids || [];
  let newIds = action.payload.ids;
  let allLoaded = ids.length === ids.length + action.payload.ids.length;

  return {
    ...state,
    users: {
      [action.payload.id]: {
        offset: action.payload.offset,
        ids: isArrayStartFrom(ids, newIds) ? ids : [...ids, ...newIds],
        allLoaded
      }
    },
    all: getAllAudios(state.all, action.payload.normalized),
    loading: false,
    error: 0
  };
}

function error(state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AUDIOS_LOADING:
      return loading(state);
    case AUDIOS_USER_FETCHED:
      return fetchedUserAudio(state, action);
    case AUDIOS_ERROR:
      return error(state, action);
    default: return state;
  }
};
