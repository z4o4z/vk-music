import {
  AUDIOS_ERROR,
  AUDIOS_LOADED,
  AUDIOS_LOADING,
  AUDIOS_MY_FETCHED,
  AUDIOS_MY_UPDATED
} from '../constants/audios';

function audiosLoading(state) {
  return {
    ...state,
    loading: true
  };
}

function myAudiosFetched(state, action) {
  return {
    ...state,
    my: {
      offset: action.payload.offset,
      ids: action.payload.ids
    },
    all: {
      ...state.all,
      ...action.payload.normalized
    }
  };
}

function myAudiosUpdated(state, action) {
  return {
    ...state,
    my: {
      offset: action.payload.offset,
      ids: [...state.my.ids, ...action.payload.ids]
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
    case AUDIOS_ERROR:
      return audiosError(state, action);
    case AUDIOS_LOADED:
      return audiosLoaded(state);
    default: return state;
  }
};
