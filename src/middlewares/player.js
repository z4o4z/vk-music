import {AUDIOS_USER_FETCHED, AUDIOS_FETCH_COUNT} from '../constants/audios';
import {PLAYER_NEXT, PLAYER_UPDATE_PLAYLIST_COUNT} from '../constants/player';

import {fetchUserAudio} from '../actions/audios';
import {playerSetPlaylist, playerSetPlaylistPage, playerSetTrack, playerUpdatePlaylist} from '../actions/player';

function setTack(store, next, action, lastResult) {
  const state = store.getState();

  if (action.type !== AUDIOS_USER_FETCHED || state.player.current) {
    return lastResult;
  }

  const playlistPage = window.location.pathname;
  const userId = state.authorize.userId;
  let trackId;

  switch (playlistPage) {
    default: trackId = state.audio.users[userId].ids[0];
  }

  next(playerSetTrack(trackId));

  return next(playerSetPlaylistPage(playlistPage));
}

function setPlaylist(store, next, action, lastResult) {
  const state = store.getState();

  if (action.type !== AUDIOS_USER_FETCHED || window.location.pathname !== state.player.playlistPage) {
    return lastResult;
  }

  const userId = state.authorize.userId;
  let playlist;

  switch (state.player.page) {
    default: playlist = state.audio.users[userId].ids;
  }

  return next(playerSetPlaylist(playlist));
}

function updatePlaylist(store, next, action, lastResult) {
  const state = store.getState();
  const player = state.player;
  const currentTrackPosition = player.playlist.length - player.playlist.indexOf(player.current);

  if (action.type !== PLAYER_NEXT || currentTrackPosition !== PLAYER_UPDATE_PLAYLIST_COUNT) {
    return lastResult;
  }

  const userId = state.authorize.userId;
  const from = state.audio.users[userId].offset + AUDIOS_FETCH_COUNT + 1;

  switch (state.player.page) {
    default: store.dispatch(fetchUserAudio(from, AUDIOS_FETCH_COUNT, userId));
  }

  return next(playerUpdatePlaylist());
}

export default store => next => action => {
  let result = next(action);

  result = setTack(store, next, action, result);
  result = setPlaylist(store, next, action, result);
  result = updatePlaylist(store, next, action, result);

  return result;
};
