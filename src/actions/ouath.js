import {OAUTH_URL, OAUTH_AUTHORISING, OAUTH_AUTHORISED, OAUTH_ERROR} from '../constants/ouath';

import {showLoader, hideLoader} from './ui';

function authorising() {
  return {type: OAUTH_AUTHORISING};
}

function authorised(data) {
  return {
    type: OAUTH_AUTHORISED,
    payload: {
      token: data.access_token,
      userId: data.user_id,
      initTime: Number(data.initTime),
      expiresIn: Number(data.expires_in) * 1000
    }
  };
}

function error() {
  return {type: OAUTH_ERROR};
}

export const authorization = () => dispatch => {
  dispatch(showLoader());
  dispatch(authorising());

  window.addEventListener('storage', storageCallback);

  window.open(OAUTH_URL, '', 'left=100px,top=100px,width=600,height=500,menubar=no,location=no,resizable=no,scrollbars=no,status=no');

  function storageCallback(event) {
    if (event.key === 'vk-music-auth') {
      try {
        dispatch(authorised(JSON.parse(event.newValue)));
      } catch (e) {
        dispatch(error());
      }

      dispatch(hideLoader());
      window.removeEventListener('storage', storageCallback);
    }
  }
};
