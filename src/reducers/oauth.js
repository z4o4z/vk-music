import {
  OAUTH_AUTHORISING,
  OAUTH_AUTHORISED,
  OAUTH_ERROR,
  STATE_AUTHORISING,
  STATE_AUTHORISED,
  STATE_ERROR
} from '../constants/ouath';

export default function oauth(state = {}, action = {}) {
  switch (action.type) {
    case OAUTH_AUTHORISING:
      return {...state, state: STATE_AUTHORISING};
    case OAUTH_AUTHORISED:
      return {...state, ...action.payload, state: STATE_AUTHORISED};
    case OAUTH_ERROR:
      return {...state, state: STATE_ERROR};
    default: return state;
  }
}
