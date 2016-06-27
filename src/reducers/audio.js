import {AUDIO_LOADING, AUDIO_MY_LOADED, AUDIO_ERROR} from '../constants/audio';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AUDIO_LOADING:
      return {...state, loading: true};
    case AUDIO_MY_LOADED:
      return {...state, loading: false, my: action.payload.ids, all: {...state.all, ...action.payload.normalized}};
    case AUDIO_ERROR:
      return {...state, loading: false, error: action.payload};
    default: return state;
  }
};
