import {AUDIOS_USER_FETCHED, AUDIOS_FETCH_COUNT} from '../constants/audios';
import {PLAYER_NEXT, PLAYER_UPDATE_PLAYLIST_COUNT} from '../constants/player';

import {fetchUserAudio} from '../actions/audios';
import {playerSetPlaylist, playerSetPlaylistPage, playerSetTrack, playerUpdatePlaylist} from '../actions/player';

function getIdFromUrl(url) {
  const matches = url.match("/friend/(.*)");

  return Number(matches[1]);
}

function checkPage(pageUrl) {
  return Boolean(pageUrl.search('/friend/') + 1);
}

function setTack(store, next, action, lastResult) {
  const state = store.getState();

  if (action.type !== AUDIOS_USER_FETCHED || state.player.current) {
    return lastResult;
  }

  const playlistPage = window.location.pathname;
  const currentUserId = state.authorize.userId;
  const userId = getIdFromUrl(playlistPage);
  let trackId;

  if (checkPage(playlistPage)) {
    trackId = state.audio.users[userId].ids[0];
  } else {
    trackId = state.audio.users[currentUserId].ids[0];
  }

  next(playerSetTrack(trackId));

  return next(playerSetPlaylistPage(playlistPage));
}

function setPlaylist(store, next, action, lastResult) {
  const state = store.getState();

  if (action.type !== AUDIOS_USER_FETCHED || window.location.pathname !== state.player.playlistPage) {
    return lastResult;
  }

  const currentUserId = state.authorize.userId;
  const userId = getIdFromUrl(state.player.playlistPage);
  let playlist;

  if (checkPage(state.player.playlistPage)) {
    playlist = state.audio.users[userId].ids;
  } else {
    playlist = state.audio.users[currentUserId].ids;
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

  const userId = getIdFromUrl(state.player.playlistPage);
  const from = (state.audio.users[userId] || {}).offset + AUDIOS_FETCH_COUNT + 1;

  if (checkPage(state.player.playlistPage)) {
    store.dispatch(fetchUserAudio(from, AUDIOS_FETCH_COUNT, userId));
  } else {
    const currentUserId = state.authorize.userId;
    const currentFrom = state.audio.users[currentUserId].offset + AUDIOS_FETCH_COUNT + 1;

    store.dispatch(fetchUserAudio(currentFrom, AUDIOS_FETCH_COUNT, currentUserId));
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
