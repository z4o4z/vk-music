import {handleActions} from 'redux-actions';

import {
	entitiesSet,
	entitiesSetItems,
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
			items: {...(state[payload.id] && state[payload.id].items || {}), ...(payload.items || {})},
			fetching: false,
			error: null
		}
	}),
	[entitiesSetItems]: (state, {payload}) => ({
		...state,
		[payload.id]: {
			...state[payload.id],
			items: {...(state[payload.id] && state[payload.id].items || {}), ...(payload.items || {})}
		}
	}),
	[entitiesReset]: (state, {payload}) => ({
		...state,
		[payload.id]: {
			...state[payload.id],
			...payload,
			items: {...(state[payload.id] && state[payload.id].items || {}), ...(payload.items || {})},
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
