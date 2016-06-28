import {
  AUDIO_ERROR,
  AUDIO_LOADED,
  AUDIO_LOADING,
  AUDIO_MY_FETCHED,
  AUDIO_MY_UPDATED
} from '../constants/audio';

function audioLoading(state) {
  return {
    ...state,
    loading: true
  };
}

function myAudioFetched(state, action) {
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

function myAudioUpdated(state, action) {
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

function audioError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload
  };
}

function audioLoaded(state) {
  return {
    ...state,
    loading: false
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AUDIO_LOADING:
      return audioLoading(state);
    case AUDIO_MY_FETCHED:
      return myAudioFetched(state, action);
    case AUDIO_MY_UPDATED:
      return myAudioUpdated(state, action);
    case AUDIO_ERROR:
      return audioError(state, action);
    case AUDIO_LOADED:
      return audioLoaded(state);
    default: return state;
  }
};
