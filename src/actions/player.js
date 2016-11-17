import {createActions} from 'redux-actions';

export const {
	playerPlayTrack,
	playerPlayPause,
	playerPlaylistFetched,
	playerNext,
	playerPrev
} = createActions(
	'PLAYER_PLAY_TRACK',
	'PLAYER_PLAY_PAUSE',
	'PLAYER_PLAYLIST_FETCHED',
	'PLAYER_NEXT',
	'PLAYER_PREV'
);
