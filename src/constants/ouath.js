export const OAUTH_APP_ID = '5502321';

export const OAUTH_URL = `https://oauth.vk.com/authorize?client_id=${OAUTH_APP_ID}&display=popup&redirect_uri=${window.location.href}&scope=friends,audio,groups,wall&response_type=token&v=5.52`;

export const OAUTH_AUTHORISING = 'OAUTH_AUTHORISING';

export const OAUTH_AUTHORISED = 'OAUTH_AUTHORISED';

export const OAUTH_ERROR = 'OAUTH_ERROR';

export const STATE_AUTHORISING = 'authorising';

export const STATE_AUTHORISED = 'authorised';

export const STATE_ERROR = 'error';
