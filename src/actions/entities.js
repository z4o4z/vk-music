import {createActions} from 'redux-actions';

export const {
	entitiesSet,
	entitiesSetItems,
	entitiesReset,
	entitiesFetch,
	entitiesError
} = createActions(
	'ENTITIES_SET',
	'ENTITIES_SET_ITEMS',
	'ENTITIES_RESET',
	'ENTITIES_FETCH',
	'ENTITIES_ERROR'
);
