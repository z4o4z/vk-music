import {
  ALBUMS_ERROR,
  ALBUMS_LOADING,
  ALBUMS_FETCHED
} from '../constants/albums';

import isArrayStartFrom from '../helpers/isArrayStartFrom';
import getDifferencesByKeys from '../helpers/getDifferencesByKeys';

function getAllAlbums(allAlbums, newAlbums) {
  let differentAlbums = getDifferencesByKeys(allAlbums, newAlbums, 'id', 'owner_id', 'title');

  if (differentAlbums) {
    return {...allAlbums, ...differentAlbums};
  }

  return allAlbums;
}

function loading(state) {
  return {
    ...state,
    loading: true
  };
}

function fetched(state, action) {
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
    all: getAllAlbums(state.all, action.payload.normalized),
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
    case ALBUMS_LOADING:
      return loading(state);
    case ALBUMS_FETCHED:
      return fetched(state, action);
    case ALBUMS_ERROR:
      return error(state, action);
    default: return state;
  }
};
