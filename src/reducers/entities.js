import {handleActions} from 'redux-actions';

import {
	entitiesSet,
	entitiesReset,
	entitiesFetch,
	entitiesError
} from '../actions/entities';
import defaultState from '../store/initialState';

export default handleActions({
	[entitiesSet]: (state, {payload}) => ({
		...state,
		[payload.id]: {
			...state[payload.id],
			count: payload.count,
			offset: payload.offset,
			ids: [...(state[payload.id] && state[payload.id].ids || []), ...(payload.ids || [])],
			fetching: false,
			error: null
		}
	}),
	[entitiesReset]: (state, {payload}) => ({
		...state,
		[payload.id]: {
			...state[payload.id],
			...payload,
			fetching: false,
			error: null
		}
	}),
	[entitiesFetch]: (state, {payload}) => ({
		...state,
		[payload]: {
			...state[payload],
			fetching: true,
			error: null
		}
	}),
	[entitiesError]: (state, {payload}) => ({
		...state,
		[payload.id]: {
			...state[payload.id],
			...payload,
			fetching: false
		}
	})
}, defaultState.entities);
