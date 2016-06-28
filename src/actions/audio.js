import {
  AUDIO_ERROR,
  AUDIO_LOADED,
  AUDIO_LOADING,
  AUDIO_MY_FETCHED,
  AUDIO_MY_UPDATED
} from '../constants/audio';

function normalizeAudios(audios) {
  let normalized = {};
  let ids = [];

  audios.forEach(audio => {
    ids.push(audio.aid);
    normalized[audio.aid] = audio;
  });

  return {
    normalized,
    ids
  };
}

function loading(ownerIs, albumId, audioIds, offset, count) {
  return {
    type: AUDIO_LOADING,
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
    type: AUDIO_LOADED
  };
}

function error(id) {
  return {
    type: AUDIO_ERROR,
    payload: id
  };
}

function myAudioFetched(offset, audios) {
  return {
    type: AUDIO_MY_FETCHED,
    payload: {
      offset,
      ...normalizeAudios(audios)
    }
  };
}

function myAudioUpdated(offset, audios) {
  return {
    type: AUDIO_MY_UPDATED,
    payload: {
      offset,
      ...normalizeAudios(audios)
    }
  };
}

function fetchAudio(ownerIs, albumId, audioIds, offset, count) {
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

  fetchAudio(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudioFetched(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};

export const updateMyAudio = (offset, count) => dispatch => {
  dispatch(loading());

  fetchAudio(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudioUpdated(offset, audios)))
    .then(() => dispatch(loaded()))
    .catch(id => dispatch(error(id)));
};
