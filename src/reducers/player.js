import {handleActions} from 'redux-actions';

import {
	playerPlayTrack,
	playerPlayPause,
	playerSetFetching,
	playerPlaylistFetched,
	playerResetPlaylist,
	playerRepeat,
	playerShuffle,
	playerNext,
	playerPrev
} from '../actions/player';
import defaultState from '../store/initialState';

export default handleActions({
	[playerPlayTrack]: (state, {payload}) => ({
		...state,
		current: payload.id,
		playlist: payload.playlist,
		entityId: payload.entityId,
		offset: payload.offset,
		count: payload.count,
		next: getNext(payload.playlist, payload.id),
		prev: getPrev(payload.playlist, payload.id),
		isPlaying: true
	}),
	[playerPlayPause]: state => ({
		...state,
		isPlaying: !state.isPlaying
	}),
	[playerSetFetching]: state => ({
		...state,
		fetching: true,
		error: 0
	}),
	[playerPlaylistFetched]: (state, {payload}) => ({
		...state,
		playlist: [...state.playlist, ...payload.ids],
		offset: payload.offset,
		count: payload.count,
		fetching: false,
		error: 0
	}),
	[playerResetPlaylist]: (state, {payload}) => ({
		...state,
		playlist: payload,
		next: getNext(payload, state.current),
		prev: getPrev(payload, state.current),
		fetching: false,
		error: 0
	}),
	[playerRepeat]: state => ({
		...state,
		isRepeating: !state.isRepeating
	}),
	[playerShuffle]: state =>({
		...state,
		isShuffling: !state.isShuffling
	}),
	[playerNext]: state => ({
		...state,
		current: state.next,
		next: getNext(state.playlist, state.next),
		prev: getPrev(state.playlist, state.next)
	}),
	[playerPrev]: state =>({
		...state,
		current: state.prev,
		next: getNext(state.playlist, state.prev),
		prev: getPrev(state.playlist, state.prev)
	})
}, defaultState.player);

function getNext(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex + 1] || '';
}

function getPrev(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex - 1] || '';
}
