import {
  AUDIOS_ERROR,
  AUDIOS_LOADED,
  AUDIOS_LOADING,
  AUDIOS_MY_FETCHED,
  AUDIOS_MY_UPDATED,
  AUDIOS_FRIEND_FETCHED,
  AUDIOS_FRIEND_UPDATED
} from '../constants/audios';

import normalizeBy from '../helpers/normalizeBy';

function loading(ownerIs, albumId, audioIds, offset, count) {
  return {
    type: AUDIOS_LOADING,
    payload: {
      ownerIs,
      albumId,
      audioIds,
      offset,
      count
    }
  };
}

function loaded() {
  return {
    type: AUDIOS_LOADED
  };
}

function error(id) {
  return {
    type: AUDIOS_ERROR,
    payload: id
  };
}

function myAudiosFetched(offset, audios) {
  return {
    type: AUDIOS_MY_FETCHED,
    payload: {
      offset,
      ...normalizeBy(audios, 'aid')
    }
  };
}

function myAudiosUpdated(offset, audios) {
  return {
    type: AUDIOS_MY_UPDATED,
    payload: {
      offset,
      ...normalizeBy(audios, 'aid')
    }
  };
}

function friendAudiosFetched(id, offset, audios) {
  return {
    type: AUDIOS_FRIEND_FETCHED,
    payload: {
      id,
      offset,
      ...normalizeBy(audios, 'aid')
    }
  };
}

function friendAudiosUpdated(id, offset, audios) {
  return {
    type: AUDIOS_FRIEND_UPDATED,
    payload: {
      id,
      offset,
      ...normalizeBy(audios, 'aid')
    }
  };
}

function fetchAudios(ownerIs, albumId, audioIds, offset, count) {
  let params = {
    offset,
    count
  };

  if (ownerIs) {
    params.owner_id = ownerIs;
  }

  if (albumId) {
    params.album_id = albumId;
  }

  if (audioIds) {
    params.audio_ids = audioIds;
  }

  return new Promise((resolve, reject) => {
    window.VK.api("audio.get", params, data => {
      if (data.error) {
        if (!IS_PROD) {
          console.error(data.error);
        }

        return reject(data.error.error_code);
      }

      return resolve(data.response);
    });
  });
}

export const fetchMyAudio = (offset, count) => dispatch => {
  dispatch(loading(undefined, undefined, undefined, offset, count));

  fetchAudios(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudiosFetched(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};

export const updateMyAudio = (offset, count) => dispatch => {
  dispatch(loading(undefined, undefined, undefined, offset, count));

  fetchAudios(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudiosUpdated(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};

export const fetchFriendAudio = (id, offset, count) => dispatch => {
  dispatch(loading(id, undefined, undefined, offset, count));

  fetchAudios(id, undefined, undefined, offset, count)
    .then(audios => dispatch(friendAudiosFetched(id, offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};

export const updateFriendAudio = (id, offset, count) => dispatch => {
  dispatch(loading(id, undefined, undefined, offset, count));

  fetchAudios(id, undefined, undefined, offset, count)
    .then(audios => dispatch(friendAudiosUpdated(id, offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};
