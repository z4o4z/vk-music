import {createActions} from 'redux-actions';

export const {
	entitiesSet,
	entitiesReset,
	entitiesFetch,
	entitiesError
} = createActions(
	'ENTITIES_SET',
	'ENTITIES_RESET',
	'ENTITIES_FETCH',
	'ENTITIES_ERROR'
);
