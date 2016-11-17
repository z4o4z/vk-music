import {handleActions} from 'redux-actions';

import {
	vkInitialized,

	vkAuthorize,
	vkAuthorized,
	vkAuthorizeError
} from '../actions/vk';
import defaultState from '../store/initialState';

export default handleActions({
	[vkInitialized]: state => ({
		...state,
		initialized: true
	}),
	[vkAuthorize]: state =>({
		...state,
		authorizing: true,
		authorized: false,
		authorizeError: null
	}),
	[vkAuthorized]: (state, {payload}) =>({
		...state,
		...payload,
		authorizing: false,
		authorized: true,
		authorizeError: null
	}),
	[vkAuthorizeError]: (state, {payload}) =>({
		...state,
		authorizing: false,
		authorized: false,
		authorizeError: payload
	})
}, defaultState.vk);
