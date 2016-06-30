import {VK_AUTHORIZING, VK_AUTHORIZED, VK_AUTHORIZE_ERROR, VK_STATUS_CONNECTED} from '../constants/authorize';

function authorizing() {
  return {
    type: VK_AUTHORIZING
  };
}

function authorized(expire) {
  return {
    type: VK_AUTHORIZED,
    payload: expire
  };
}

function error() {
  return {type: VK_AUTHORIZE_ERROR};
}

const login = () => dispatch => {
  window.VK.Auth.login(data => {
    if (data.status === VK_STATUS_CONNECTED) {
      return dispatch(authorized(data.session.expire * 1000));
    }

    return dispatch(error());
  }, 270346);
};

const getLoginStatus = () => dispatch => {
  window.VK.Auth.getLoginStatus(data => {
    if (data.status === VK_STATUS_CONNECTED) {
      return dispatch(authorized(data.session.expire * 1000));
    }

    return dispatch(login());
  });
};

export const authorize = expire => dispatch => {
  const now = Date.now();

  dispatch(authorizing());

  if (now + 3600000 >= expire) {
    return dispatch(login());
  }

  return dispatch(getLoginStatus());
};
