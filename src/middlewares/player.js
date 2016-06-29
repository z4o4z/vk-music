import {AUDIO_LOADED, AUDIO_FETCH_COUNT} from '../constants/audios';
import {PLAYER_NEXT, PLAYER_UPDATE_PLAYLIST_COUNT} from '../constants/player';

import {updateMyAudio} from '../actions/audios';
import {playerSetPlaylist, playerSetPlaylistPage, playerSetTrack, playerUpdatePlaylist} from '../actions/player';

function setTack(store, next, action, lastResult) {
  let state = store.getState();
  const playlistPage = state.routing.locationBeforeTransitions.pathname;
  let trackId;

  if (action.type !== AUDIO_LOADED || state.player.current) {
    return lastResult;
  }

  switch (playlistPage) {
    default: trackId = state.audio.my.ids[0];
  }

  next(playerSetTrack(trackId));

  return next(playerSetPlaylistPage(playlistPage));
}

function setPlaylist(store, next, action, lastResult) {
  let state = store.getState();
  let playlist;

  if (action.type !== AUDIO_LOADED || state.routing.locationBeforeTransitions.pathname !== state.player.playlistPage) {
    return lastResult;
  }

  switch (state.player.page) {
    default: playlist = state.audio.my.ids;
  }

  return next(playerSetPlaylist(playlist));
}

function updatePlaylist(store, next, action, lastResult) {
  let state = store.getState();
  let player = state.player;

  if (action.type !== PLAYER_NEXT || player.playlist.length - player.playlist.indexOf(player.current) !== PLAYER_UPDATE_PLAYLIST_COUNT) {
    return lastResult;
  }

  switch (state.player.page) {
    default: store.dispatch(updateMyAudio(state.audio.my.offset + AUDIO_FETCH_COUNT + 1, AUDIO_FETCH_COUNT));
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
