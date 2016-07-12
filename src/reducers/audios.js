import {
  AUDIOS_ERROR,
  AUDIOS_LOADING,
  AUDIOS_FETCHED
} from '../constants/audios';

import isArrayStartFrom from '../helpers/isArrayStartFrom';
import getDifferencesByKeys from '../helpers/getDifferencesByKeys';

function getAllAudios(allAudios, newAudios) {
  const differentAudios = getDifferencesByKeys(allAudios, newAudios, 'title', 'artist', 'genre');

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

function fetchedAudio(state, action) {
  const ownerId = action.payload.id;
  const albumId = action.payload.albumId;
  const owner = state.owners[ownerId] || {};
  const newIds = action.payload.ids;
  const ids = owner.ids || [];

  if (albumId) {
    const albumIds = owner.albums && owner.albums[albumId] && owner.albums[albumId].ids || [];
    const albumAllLoaded = albumIds.length === albumIds.length + action.payload.ids.length;

    return {
      ...state,
      owners: {
        [ownerId]: {
          offset: owner.offset || 0,
          ids: ids,
          allLoaded: false,
          albums: {
            [albumId]: {
              offset: action.payload.offset,
              ids: isArrayStartFrom(albumIds, newIds) ? albumIds : [...albumIds, ...newIds],
              allLoaded: albumAllLoaded
            }
          }
        }
      },
      all: getAllAudios(state.all, action.payload.normalized),
      loading: false,
      error: 0
    };
  }

  const allLoaded = ids.length === ids.length + action.payload.ids.length;

  return {
    ...state,
    owners: {
      [ownerId]: {
        offset: action.payload.offset,
        ids: isArrayStartFrom(ids, newIds) ? ids : [...ids, ...newIds],
        allLoaded,
        albums: {}
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
    case AUDIOS_FETCHED:
      return fetchedAudio(state, action);
    case AUDIOS_ERROR:
      return error(state, action);
    default: return state;
  }
};
