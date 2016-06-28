import {VK_AUTHORIZED, VK_AUTHORIZE_ERROR} from '../constants/authorize';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case VK_AUTHORIZED:
      return {...state, authorized: true, authError: false, expire: action.payload};
    case VK_AUTHORIZE_ERROR:
      return {...state, authorized: false, authError: true, expire: 0};
    default: return state;
  }
};
