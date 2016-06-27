import {VK_INITIALIZED} from '../constants/initialize';

import {authorize} from '../actions/authorize';

export default store => next => action => {
  const state = store.getState();
  let result = next(action);

  if (action.type === VK_INITIALIZED) {
    store.dispatch(authorize(state.authorize.expire));
  }

  return result;
};
