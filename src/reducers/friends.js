import {
	FRIENDS_ERROR,
	FRIENDS_LOADING,
	FRIENDS_FETCHED
} from '../constants/friends';

import isArrayStartFrom from '../helpers/isArrayStartFrom';
import getDifferencesByKeys from '../helpers/getDifferencesByKeys';

function getAllFriends(allFriends, newFriends) {
	let differentAudios = getDifferencesByKeys(allFriends, newFriends, 'first_name', 'last_name', 'photo_100');

	if (differentAudios) {
		return {...allFriends, ...differentAudios};
	}

	return allFriends;
}

function loading(state) {
	return {
		...state,
		loading: true
	};
}

function fetched(state, action) {
	let user = state.users[action.payload.id] || {};
	let ids = user.ids || [];
	let newIds = action.payload.ids;
	let allLoaded = ids.length === ids.length + action.payload.ids.length;

	return {
		...state,
		users: {
			[action.payload.id]: {
				offset: action.payload.offset,
				ids: isArrayStartFrom(ids, newIds) ? ids : [...ids, ...newIds],
				allLoaded
			}
		},
		all: getAllFriends(state.all, action.payload.normalized),
		loading: false,
		error: 0
	};
}

function error(state, action) {
	return {
		...state,
		loading: false,
		error: action.payload
	};
}

export default (state = {}, action = {}) => {
	switch (action.type) {
		case FRIENDS_LOADING:
			return loading(state);
		case FRIENDS_FETCHED:
			return fetched(state, action);
		case FRIENDS_ERROR:
			return error(state, action);
		default: return state;
	}
};
