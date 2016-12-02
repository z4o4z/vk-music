import {createActions} from 'redux-actions';

export const {
	usersAdd,
	usersAddMultiple,
	usersFetchWall,
	usersFetchNews,
	usersFetchAudios,
	usersFetchAlbums,
	usersFetchFriends,
	usersFetchGroups
} = createActions(
	'USERS_ADD',
	'USERS_ADD_MULTIPLE',
	'USERS_FETCH_WALL',
	'USERS_FETCH_NEWS',
	'USERS_FETCH_AUDIOS',
	'USERS_FETCH_ALBUMS',
	'USERS_FETCH_FRIENDS',
	'USERS_FETCH_GROUPS'
);
