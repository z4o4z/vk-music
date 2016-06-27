import {VK_INITIALIZED} from '../constants/initialize';

import {authorize as authorizeAction} from '../actions/authorize';

export const authorize = store => next => action => {
  let result = next(action);
  const state = store.getState();

  if (action.type === VK_INITIALIZED) {
    store.dispatch(authorizeAction(state.authorize.expire));
  }

  return result;
};
