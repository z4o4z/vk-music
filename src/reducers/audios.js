import {
  AUDIOS_ERROR,
  AUDIOS_LOADED,
  AUDIOS_LOADING,
  AUDIOS_MY_FETCHED,
  AUDIOS_MY_UPDATED,
  AUDIOS_FRIEND_FETCHED,
  AUDIOS_FRIEND_UPDATED
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

function audiosLoading(state) {
  return {
    ...state,
    loading: true
  };
}

function myAudiosFetched(state, action) {
  let ids = state.my.ids;
  let newIds = action.payload.ids;

  return {
    ...state,
    my: {
      offset: action.payload.offset,
      ids: isArrayStartFrom(ids, newIds) ? ids : newIds,
      allLoaded: false
    },
    all: getAllAudios(state.all, action.payload.normalized)
  };
}

function myAudiosUpdated(state, action) {
  let isAllLoaded = state.my.ids.length === state.my.ids.length + action.payload.ids;

  return {
    ...state,
    my: {
      offset: action.payload.offset,
      ids: isAllLoaded ? state.my.ids : [...state.my.ids, ...action.payload.ids],
      allLoaded: isAllLoaded
    },
    all: getAllAudios(state.all, action.payload.normalized)
  };
}

function friendAudiosFetched(state, action) {
  let friend = state.friends[action.payload.id] || {};
  let ids = friend.ids || [];
  let newIds = action.payload.ids;

  return {
    ...state,
    friends: {
      [action.payload.id]: {
        offset: action.payload.offset,
        ids: isArrayStartFrom(ids, newIds) ? ids : newIds,
        allLoaded: false
      }
    },
    all: getAllAudios(state.all, action.payload.normalized)
  };
}

function friendAudiosUpdated(state, action) {
  let friend = state.friends[action.payload.id] || {};
  let isAllLoaded = friend.ids === friend.ids.length + action.payload.ids;

  return {
    ...state,
    friends: {
      [action.payload.id]: {
        offset: action.payload.offset,
        ids: isAllLoaded ? friend.ids : [...friend.ids, ...action.payload.ids],
        allLoaded: isAllLoaded
      }
    },
    all: {
      ...state.all,
      ...action.payload.normalized
    }
  };
}

function audiosError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload
  };
}

function audiosLoaded(state) {
  return {
    ...state,
    loading: false
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AUDIOS_LOADING:
      return audiosLoading(state);
    case AUDIOS_MY_FETCHED:
      return myAudiosFetched(state, action);
    case AUDIOS_MY_UPDATED:
      return myAudiosUpdated(state, action);
    case AUDIOS_FRIEND_FETCHED:
      return friendAudiosFetched(state, action);
    case AUDIOS_FRIEND_UPDATED:
      return friendAudiosUpdated(state, action);
    case AUDIOS_ERROR:
      return audiosError(state, action);
    case AUDIOS_LOADED:
      return audiosLoaded(state);
    default: return state;
  }
};
