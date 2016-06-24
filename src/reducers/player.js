import {PLAYER_PLAY_TRACK, PLAYER_PLAY_PAUSE, PLAYER_SET_TRACK} from '../constants/player';

export default function player(state = {}, action = {}) {
  switch (action.type) {
    case PLAYER_PLAY_TRACK:
      return {...state, current: action.payload, playing: true};
    case PLAYER_SET_TRACK:
      return {...state, current: action.payload};
    case PLAYER_PLAY_PAUSE:
      return {...state, playing: false};
    default: return state;
  }
}
