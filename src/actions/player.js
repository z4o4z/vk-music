import {createActions} from 'redux-actions';

export const {
	playerPlayTrack,
	playerPlayPause,
	playerNext,
	playerPrev
} = createActions(
	'PLAYER_PLAY_TRACK',
	'PLAYER_PLAY_PAUSE',
	'PLAYER_NEXT',
	'PLAYER_PREV'
);
