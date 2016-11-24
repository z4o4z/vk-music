import {handleActions} from 'redux-actions';

import {usersAdd, usersAddMultiple} from '../actions/users';

import defaultState from '../store/initialState';

export default handleActions({
	[usersAdd]: (state, {payload}) => ({
		...state,
		[payload.id]: merge(state[payload.id], payload)
	}),
	[usersAddMultiple]: (state, {payload}) => ({
		...state,
		...addMultiple(state, payload)
	})
}, defaultState.users);

function merge(oldUser, user) {
	return {
		...(oldUser || {}),
		...user,
		audiosEntityId: `${user.id}-audios`,
		albumsEntityId: `${user.id}-albums`,
		friendsEntityId: `${user.id}-friends`,
		groupsEntityId: `${user.id}-groups`
	};
}

function addMultiple(state, users) {
	const mergedUsers = {};

	Object.keys(users).forEach(key => {
		mergedUsers[key] = merge(state[key], users[key]);
	});

	return mergedUsers;
}
