import {
  FRIENDS_ERROR,
  FRIENDS_LOADED,
  FRIENDS_LOADING,
  FRIENDS_FETCHED,
  FRIENDS_UPDATED
} from '../constants/friends';

import isArrayStartFrom from '../helpers/isArrayStartFrom';
import getDifferencesByKeys from '../helpers/getDifferencesByKeys';

function getAllFriends(allFriends, newFriends) {
  let differentAudios = getDifferencesByKeys(allFriends, newFriends, 'first_name', 'last_name', 'photo_100');

  if (differentAudios) {
    return {...allFriends, ...differentAudios};
  }

  return allFriends;
}

function loading(state) {
  return {
    ...state,
    loading: true
  };
}

function fetched(state, action) {
  let ids = state.ids;
  let newIds = action.payload.ids;

  return {
    ...state,
    offset: action.payload.offset,
    ids: isArrayStartFrom(ids, newIds) ? ids : newIds,
    all: getAllFriends(state.all, action.payload.normalized),
    allLoaded: false
  };
}

function updated(state, action) {
  let isAllLoaded = state.ids.length === state.ids.length + action.payload.ids.length;

  return {
    ...state,
    offset: action.payload.offset,
    allLoaded: isAllLoaded,
    ids: isAllLoaded ? state.ids : [...state.ids, ...action.payload.ids],
    all: getAllFriends(state.all, action.payload.normalized)
  };
}

function error(state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload
  };
}

function loaded(state) {
  return {
    ...state,
    loading: false
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case FRIENDS_LOADING:
      return loading(state);
    case FRIENDS_FETCHED:
      return fetched(state, action);
    case FRIENDS_UPDATED:
      return updated(state, action);
    case FRIENDS_ERROR:
      return error(state, action);
    case FRIENDS_LOADED:
      return loaded(state);
    default: return state;
  }
};
