import {AUDIOS_FETCHED, AUDIOS_FETCH_COUNT} from '../constants/audios';
import {PLAYER_NEXT, PLAYER_UPDATE_PLAYLIST_COUNT} from '../constants/player';

import {fetchAudio} from '../actions/audios';
import {playerSetPlaylist, playerSetPageAlbumIdOwnerId, playerSetTrack, playerUpdatePlaylist} from '../actions/player';

function setTack(store, next, action, lastResult) {
	const state = store.getState();

	if (action.type !== AUDIOS_FETCHED || state.player.current) {
		return lastResult;
	}

	const page = window.location.pathname;
	const trackId = action.payload.ids[0];

	next(playerSetTrack(trackId));

	return next(playerSetPageAlbumIdOwnerId(page, action.payload.id, action.payload.albumId));
}

function setPlaylist(store, next, action, lastResult) {
	const state = store.getState();

	if (action.type !== AUDIOS_FETCHED || window.location.pathname !== state.player.page) {
		return lastResult;
	}

	const ownerId = action.payload.id;
	const albumId = action.payload.albumId;
	const playlist = albumId ? state.audio.albums[albumId].ids : state.audio.owners[ownerId].ids;

	return next(playerSetPlaylist(playlist));
}

function updatePlaylist(store, next, action, lastResult) {
	const state = store.getState();
	const player = state.player;
	const currentTrackPosition = player.playlist.length - player.playlist.indexOf(player.current);

	if (action.type !== PLAYER_NEXT || currentTrackPosition !== PLAYER_UPDATE_PLAYLIST_COUNT) {
		return lastResult;
	}

	const newFetchCount = AUDIOS_FETCH_COUNT + 1;
	const ownerId = player.ownerId;
	const albumId = player.albumId;
	const from = albumId ?
		state.audio.albums[albumId].offset + newFetchCount :
		state.audio.owners[ownerId].offset + newFetchCount;

	store.dispatch(fetchAudio(from, AUDIOS_FETCH_COUNT, ownerId, albumId));

	return next(playerUpdatePlaylist());
}

export default store => next => action => {
	let result = next(action);

	result = setTack(store, next, action, result);
	result = setPlaylist(store, next, action, result);
	result = updatePlaylist(store, next, action, result);

	return result;
};
