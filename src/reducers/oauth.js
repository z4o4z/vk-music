import {OAUTH_AUTHORISING, OAUTH_AUTHORISED} from '../constants/ouath';

export default function oauth(state = {}, action = {}) {
  switch (action.type) {
    case OAUTH_AUTHORISING:
      return Object.assign({}, state, {state: 'authorising'});
    case OAUTH_AUTHORISED:
      return Object.assign({}, state, {state: 'authorised'});
    default: return state;
  }
}
