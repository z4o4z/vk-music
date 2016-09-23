import {
	AUDIOS_ERROR,
	AUDIOS_LOADING,
	AUDIOS_FETCHED
} from '../constants/audios';

import normalizeBy from '../helpers/normalizeBy';

function loading(offset, count, ownerId, albumId, audioIds) {
	return {
		type: AUDIOS_LOADING,
		payload: {
			ownerId,
			albumId,
			audioIds,
			offset,
			count
		}
	};
}

function error(id) {
	return {
		type: AUDIOS_ERROR,
		payload: id
	};
}

function fetchedAudio(audios, offset, id, albumId) {
	return {
		type: AUDIOS_FETCHED,
		payload: {
			id,
			albumId,
			offset,
			...normalizeBy(audios, 'aid')
		}
	};
}

function fetch(offset, count, ownerId, albumId, audioIds) {
	let params = {
		offset,
		count
	};

	if (ownerId) {
		params.owner_id = ownerId;
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

export const fetchAudio = (offset, count, ownerId, albumId) => dispatch => {
	dispatch(loading(offset, count, ownerId, albumId));

	fetch(offset, count, ownerId, albumId)
		.then(audios => dispatch(fetchedAudio(audios, offset, ownerId, albumId)))
		.catch(errorId => dispatch(error(errorId)));
};
