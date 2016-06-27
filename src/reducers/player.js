import {
  PLAYER_PLAY_TRACK,
  PLAYER_PLAY_PAUSE,
  PLAYER_SET_TRACK,
  PLAYER_SET_PLAYLIST,
  PLAYER_SET_PLAYLIST_PAGE
} from '../constants/player';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case PLAYER_PLAY_TRACK:
      return {...state, current: action.payload, playing: true};
    case PLAYER_SET_TRACK:
      return {...state, current: action.payload};
    case PLAYER_PLAY_PAUSE:
      return {...state, playing: !state.playing};
    case PLAYER_SET_PLAYLIST:
      return {...state, playlist: [...action.payload]};
    case PLAYER_SET_PLAYLIST_PAGE:
      return {...state, playlistPage: action.payload};
    default: return state;
  }
};
