import {createActions} from 'redux-actions';

export const {
	vkInitialized,

	vkAuthorize,
	vkAuthorized,
	vkAuthorizeError
} = createActions(
	'VK_INITIALIZED',

	'VK_AUTHORIZE',
	'VK_AUTHORIZED',
	'VK_AUTHORIZE_ERROR'
);
