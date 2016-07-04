import {AUTHORIZED, AUTHORIZE_ERROR, SET_REDIRECT_PAGE} from '../constants/authorize';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AUTHORIZED:
      return {...state, authorized: true, authError: false, expire: action.payload};
    case AUTHORIZE_ERROR:
      return {...state, authorized: false, authError: true, expire: 0};
    case SET_REDIRECT_PAGE:
      return {...state, redirectPage: action.payload};
    default: return state;
  }
};
