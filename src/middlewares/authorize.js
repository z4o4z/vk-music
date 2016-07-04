import {VK_INITIALIZED} from '../constants/initialize';

import {getLoginStatus} from '../actions/authorize';

export default store => next => action => {
  let result = next(action);
  let state = store.getState();
  let now = Date.now();
  let expire = state.authorize.expire;

  if (action.type === VK_INITIALIZED && now + 3600000 < expire) {
    store.dispatch(getLoginStatus(expire));
  }

  return result;
};
