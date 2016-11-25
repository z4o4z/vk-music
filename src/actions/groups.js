import {createActions} from 'redux-actions';

export const {
	groupsAddMultiple,
	groupsFetchMembers
} = createActions(
	'GROUPS_ADD_MULTIPLE',
	'GROUPS_FETCH_MEMBERS'
);
