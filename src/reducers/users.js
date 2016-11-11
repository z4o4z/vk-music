import {handleActions} from 'redux-actions';

import {
	usersAdd,

	usersFetchAudiosError,
	usersFetchAudios,
	usersSetAudios,
	usersAddAudios
} from '../actions/users';

import defaultState from '../store/initialState';

export default handleActions({
	[usersAdd]: (state, {payload}) => ({
		...state,
		[payload.userId]: {
			info: payload.info,
			audios: state[payload.userId] && state[payload.userId].audios || [],
			albums: state[payload.userId] && state[payload.userId].albums || [],
			friends: state[payload.userId] && state[payload.userId].friends || [],
			audiosCount: state[payload.userId] && state[payload.userId].audiosCount || 0,
			audiosFetching: false,
			audiosFetchError: null,
			audiosOffset: 0
		}
	}),

	[usersFetchAudiosError]: (state, {payload}) => ({
		...state,
		[payload.userId]: {
			...state[payload.userId],
			audiosFetching: false,
			audiosFetchError: payload
		}
	}),
	[usersFetchAudios]: (state, {payload}) => ({
		...state,
		[payload.userId]: {
			...state[payload.userId],
			audiosFetching: true,
			audiosFetchError: null
		}
	}),
	[usersSetAudios]: (state, {payload}) =>({
		...state,
		[payload.userId]: {
			...state[payload.userId],
			audios: payload.audios,
			audiosFetching: false,
			audiosFetchError: null,
			audiosCount: payload.count,
			audiosOffset: payload.offset
		}
	}),
	[usersAddAudios]: (state, {payload}) =>({
		...state,
		[payload.userId]: {
			...state[payload.userId],
			audios: [...state[payload.userId].audios, ...payload.audios],
			audiosFetching: false,
			audiosFetchError: null,
			audiosOffset: payload.offset
		}
	})
}, defaultState.users);
