import {createActions} from 'redux-actions';

export const {
	playerPlayTrack,
	playerPlayPause,
	playerFetchPlaylist,
	playerPlaylistFetched,
	playerResetPlaylist,
	playerSetFetching,
	playerRepeat,
	playerShuffle,
	playerNext,
	playerPrev
} = createActions(
	'PLAYER_PLAY_TRACK',
	'PLAYER_PLAY_PAUSE',
	'PLAYER_FETCH_PLAYLIST',
	'PLAYER_PLAYLIST_FETCHED',
	'PLAYER_RESET_PLAYLIST',
	'PLAYER_SET_FETCHING',
	'PLAYER_REPEAT',
	'PLAYER_SHUFFLE',
	'PLAYER_NEXT',
	'PLAYER_PREV'
);
