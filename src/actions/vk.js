import {
  VK_APP_ID,
  VK_INITIALIZED,
  VK_AUTHORIZING,
  VK_AUTHORIZED,
  VK_AUTHORIZE_ERROR,
  STATUS_CONNECTED
} from '../constants/vk';

function initialized() {
  return {type: VK_INITIALIZED};
}

function authorizing() {
  return {
    type: VK_AUTHORIZING
  };
}

function authorized(expire) {
  return {
    type: VK_AUTHORIZED,
    payload: {
      expire
    }
  };
}

function error() {
  return {type: VK_AUTHORIZE_ERROR};
}

const login = dispatch => () => {
  window.VK.Auth.login(data => {
    if (data.status === STATUS_CONNECTED) {
      dispatch(authorized(data.session.expire * 1000));
    } else {
      dispatch(error());
    }
  });
};

const getLoginStatus = dispatch => () => {
  window.VK.Auth.getLoginStatus(data => {
    console.log(data);
    if (data.status === STATUS_CONNECTED) {
      dispatch(authorized(data.session.expire * 1000));
    } else {
      dispatch(login(dispatch)());
    }
  });
};

export const authorize = expire => dispatch => {
  const now = Date.now();

  dispatch(authorizing());

  if (now + 3600000 >= expire) {
    login(dispatch)();
  } else {
    getLoginStatus(dispatch)();
  }
};

export const initAndAuth = expire => dispatch => {
  window.vkAsyncInit = () => {
    window.VK.init({
      apiId: VK_APP_ID
    });

    dispatch(initialized());
    dispatch(authorize(expire));
  };

  if (window.VK) {
    window.vkAsyncInit();
  }
};
