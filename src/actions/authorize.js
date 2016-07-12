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

export const getLoginStatus = () => dispatch => {
  window.VK.Auth.getLoginStatus(data => {
    if (data.status === STATUS_CONNECTED) {
      console.log(data.session);
      return dispatch(authorized({
        expire: data.session.expire * 1000,
        ownerId: Number(data.session.mid)
      }));
    }
  });
};

export const authorize = () => dispatch => {
  dispatch(authorizing());

  window.VK.Auth.login(data => {
    if (data.status === STATUS_CONNECTED) {
      console.log(data.session);
      return dispatch(authorized({
        expire: data.session.expire * 1000,
        ownerId: Number(data.session.mid)
      }));
    }

    return dispatch(error());
  }, 270346);
};

export function redirectTo(page) {
  return {
    type: SET_REDIRECT_PAGE,
    payload: page
  };
}
