import {createActions} from 'redux-actions';

export const {
	playerPlayTrack,
	playerPlayPause,
	playerSetTrack,
	playerSetPlaylist,
	playerNext,
	playerPrev
} = createActions(
	'PLAYER_PLAY_TRACK',
	'PLAYER_PLAY_PAUSE',
	'PLAYER_SET_TRACK',
	'PLAYER_SET_PLAYLIST',
	'PLAYER_NEXT',
	'PLAYER_PREV'
);
