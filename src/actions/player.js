import {createActions} from 'redux-actions';

export const {
	playerPlayTrack,
	playerPlayPause,
	playerPlaylistFetched,
	playerRepeat,
	playerShuffle,
	playerNext,
	playerPrev
} = createActions(
	'PLAYER_PLAY_TRACK',
	'PLAYER_PLAY_PAUSE',
	'PLAYER_PLAYLIST_FETCHED',
	'PLAYER_REPEAT',
	'PLAYER_SHUFFLE',
	'PLAYER_NEXT',
	'PLAYER_PREV'
);
