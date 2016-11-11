import {handleActions} from 'redux-actions';

import {
	playerPlayTrack,
	playerPlayPause,
	playerSetTrack,
	playerSetPlaylist,
	playerNext,
	playerPrev
} from '../actions/player';
import defaultState from '../store/initialState';

export default handleActions({
	[playerPlayTrack]: (state, {payload}) => ({
		...state,
		current: payload,
		next: getNext(state.playlist, payload),
		prev: getPrev(state.playlist, payload),
		playing: true
	}),
	[playerPlayPause]: state =>({
		...state,
		playing: !state.playing
	}),
	[playerSetTrack]: (state, {payload}) =>({
		...state,
		current: payload
	}),
	[playerSetPlaylist]: (state, {payload}) =>({
		...state,
		playlist: [...payload]
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
