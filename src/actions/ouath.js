import {OAUTH_URL, OAUTH_AUTHORISING} from '../constants/ouath';

const authorising = () => ({type: OAUTH_AUTHORISING});

export const authorization = () => dispatch => {
  dispatch(authorising());

  const VK_WINDOW = window.open(OAUTH_URL, '', 'left=100px,top=100px,width=600,height=500,menubar=no,location=no,resizable=no,scrollbars=no,status=no');

  console.log(VK_WINDOW);
};
