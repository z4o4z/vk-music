import {handleActions} from 'redux-actions';

import getStateItems from '../helpers/getStateItems';
import {groupsAddMultiple} from '../actions/groups';
import defaultState from '../store/initialState';

export default handleActions({
	[groupsAddMultiple]: (state, {payload}) => ({
		...state,
		...getStateItems(state, payload)
	})
}, defaultState.groups);
