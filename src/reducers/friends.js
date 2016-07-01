import {
  FRIENDS_ERROR,
  FRIENDS_LOADED,
  FRIENDS_LOADING,
  FRIENDS_FETCHED,
  FRIENDS_UPDATED
} from '../constants/friends';

function loading(state) {
  return {
    ...state,
    loading: true
  };
}

function fetched(state, action) {
  return {
    ...state,
    offset: action.payload.offset,
    ids: action.payload.ids,
    all: action.payload.normalized,
    allLoaded: false
  };
}

function updated(state, action) {
  return {
    ...state,
    offset: action.payload.offset,
    allLoaded: state.ids.length === state.ids.length + action.payload.ids.length,
    ids: [...state.ids, ...action.payload.ids],
    all: {
      ...state.all,
      ...action.payload.normalized
    }
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
