import {createActions} from 'redux-actions';

export const {
	usersAdd,

	usersFetchAudiosError,
	usersFetchAudios,
	usersSetAudios,
	usersAddAudios
} = createActions(
	'USERS_ADD',

	'USERS_FETCH_AUDIOS_ERROR',
	'USERS_FETCH_AUDIOS',
	'USERS_SET_AUDIOS',
	'USERS_ADD_AUDIOS'
);
