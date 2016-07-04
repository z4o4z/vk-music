import {AUTHORIZING, AUTHORIZED, AUTHORIZE_ERROR, STATUS_CONNECTED, SET_REDIRECT_PAGE} from '../constants/authorize';

function authorizing() {
  return {
    type: AUTHORIZING
  };
}

function authorized(expire) {
  return {
    type: AUTHORIZED,
    payload: expire
  };
}

function error() {
  return {type: AUTHORIZE_ERROR};
}

const login = () => dispatch => {
  window.VK.Auth.login(data => {
    if (data.status === STATUS_CONNECTED) {
      return dispatch(authorized(data.session.expire * 1000));
    }

    return dispatch(error());
  }, 270346);
};

export const getLoginStatus = () => dispatch => {
  window.VK.Auth.getLoginStatus(data => {
    if (data.status === STATUS_CONNECTED) {
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

export function redirectTo(page) {
  return {
    type: SET_REDIRECT_PAGE,
    payload: page
  };
}
