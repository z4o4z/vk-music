import {
	PLAYER_PLAY_TRACK,
	PLAYER_PLAY_PAUSE,
	PLAYER_SET_TRACK,
	PLAYER_SET_PLAYLIST,
	PLAYER_SET_PAGE_ALBUM_ID_OWNER_ID,
	PLAYER_NEXT,
	PLAYER_PREV
} from '../constants/player';

import isArrayStartFrom from '../helpers/isArrayStartFrom';

function getNext(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex + 1] || 0;
}

function getPrev(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex - 1] || 0;
}

function playTrack(state, action) {
	const current = action.payload;

	return {
		...state,
		current: current,
		next: getNext(state.playlist, current),
		prev: getPrev(state.playlist, current),
		playing: true
	};
}

function setTrack(state, action) {
	return {
		...state,
		current: action.payload
	};
}

function playPause(state) {
	return {
		...state,
		playing: !state.playing
	};
}

function setPlaylist(state, action) {
	if (isArrayStartFrom(state.playlist, action.payload)) {
		return state;
	}

	return {
		...state,
		next: getNext(action.payload, state.current),
		prev: getPrev(action.payload, state.current),
		playlist: [...action.payload]
	};
}

function setPageAlbumIdOwnerId(state, action) {
	return {
		...state,
		page: action.payload.page,
		ownerId: action.payload.ownerId,
		albumId: action.payload.albumId
	};
}

function next(state) {
	const current = state.next;

	return {
		...state,
		current,
		next: getNext(state.playlist, current),
		prev: getPrev(state.playlist, current)
	};
}

function prev(state) {
	const current = state.prev;

	return {
		...state,
		current,
		next: getNext(state.playlist, current),
		prev: getPrev(state.playlist, current)
	};
}

export default (state = {}, action = {}) => {
	switch (action.type) {
		case PLAYER_PLAY_TRACK:
			return playTrack(state, action);
		case PLAYER_SET_TRACK:
			return setTrack(state, action);
		case PLAYER_PLAY_PAUSE:
			return playPause(state);
		case PLAYER_SET_PLAYLIST:
			return setPlaylist(state, action);
		case PLAYER_SET_PAGE_ALBUM_ID_OWNER_ID:
			return setPageAlbumIdOwnerId(state, action);
		case PLAYER_NEXT:
			return next(state);
		case PLAYER_PREV:
			return prev(state);
		default: return state;
	}
};
