import {PLAYER_SET_TRACK} from '../constants/player';

import {playerSetPlaylist, playerSetPlaylistPage} from '../actions/player';

function isSetNewPlayList(type, playlistPage, currentPage) {
  return type === PLAYER_SET_TRACK && playlistPage !== currentPage;
}

export const playerSetPlaylistAndPage = store => next => action => {
  const state = store.getState();
  const currentPage = state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions.pathname : '';
  let result = next(action);

  if (isSetNewPlayList(action.type, state.player.playlistPage, currentPage)) {
    let playlist = [];

    switch (currentPage) {
      default: playlist = state.audio.my;
    }

    result = next(playerSetPlaylist(playlist));
    result = next(playerSetPlaylistPage(currentPage));
  }

  return result;
};
