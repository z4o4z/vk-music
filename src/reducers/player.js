import {handleActions} from 'redux-actions';

import {
	playerPlayTrack,
	playerPlayPause,
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
		next: getNext(payload.playlist, payload.id),
		prev: getPrev(payload.playlist, payload.id),
		playing: true
	}),
	[playerPlayPause]: state =>({
		...state,
		playing: !state.playing
	}),
	[playerNext]: state =>({
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

	return playlist[currentIndex + 1] || 0;
}

function getPrev(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex - 1] || 0;
}
