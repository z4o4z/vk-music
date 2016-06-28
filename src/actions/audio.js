import {AUDIO_MY_LOADED, AUDIO_LOADING, AUDIO_ERROR} from '../constants/audio';

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

function loading() {
  return {type: AUDIO_LOADING};
}

function myAudioLoaded(audios) {
  return {
    type: AUDIO_MY_LOADED,
    payload: normalizeAudios(audios)
  };
}

function error(id) {
  return {
    type: AUDIO_ERROR,
    payload: id
  };
}

function getAudio(ownerIs, albumId, audioIds, offset, count) {
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

export const getMyAudio = (offset, count) => dispatch => {
  dispatch(loading());

  getAudio(undefined, undefined, undefined, offset, count)
    .then(audios => dispatch(myAudioLoaded(audios)))
    .catch(id => dispatch(error(id)));
};
