import {handleActions} from 'redux-actions';

import {groupsAddMultiple} from '../actions/groups';

import defaultState from '../store/initialState';

export default handleActions({
	[groupsAddMultiple]: (state, {payload}) => ({
		...state,
		...addMultiple(state, payload)
	})
}, defaultState.groups);

function merge(oldGroup, group) {
	return {
		...(oldGroup || {}),
		...group,
		audiosEntityId: `${group.id}-audios`,
		albumsEntityId: `${group.id}-albums`,
		usersEntityId: `${group.id}-members`
	};
}

function addMultiple(state, users) {
	const mergedUsers = {};

	Object.keys(users).forEach(key => {
		mergedUsers[key] = merge(state[key], users[key]);
	});

	return mergedUsers;
}
