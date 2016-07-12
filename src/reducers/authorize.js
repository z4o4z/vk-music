import {AUTHORIZED, AUTHORIZE_ERROR, SET_REDIRECT_PAGE} from '../constants/authorize';

function authorized(state, action) {
  return {
    ...state,
    authorized: true,
    authError: false,
    expire: action.payload.expire,
    ownerId: action.payload.ownerId
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case AUTHORIZED:
      return authorized(state, action);
    case AUTHORIZE_ERROR:
      return {...state, authorized: false, authError: true, expire: 0};
    case SET_REDIRECT_PAGE:
      return {...state, redirectPage: action.payload};
    default: return state;
  }
};
