import {
	ALBUMS_ERROR,
	ALBUMS_LOADING,
	ALBUMS_FETCHED
} from '../constants/albums';

import normalizeBy from '../helpers/normalizeBy';

function loading(offset, count, ownerId) {
	return {
		type: ALBUMS_LOADING,
		payload: {
			offset,
			count,
			ownerId
		}
	};
}

function error(id) {
	return {
		type: ALBUMS_ERROR,
		payload: id
	};
}

function albumsFetched(albums, offset, id) {
	return {
		type: ALBUMS_FETCHED,
		payload: {
			offset,
			id,
			...normalizeBy(albums, 'album_id')
		}
	};
}

function fetch(offset, count, ownerId) {
	let params = {
		offset,
		count
	};

	if (ownerId) {
		params.owner_id = ownerId;
	}

	return new Promise((resolve, reject) => {
		window.VK.api('audio.getAlbums', params, data => {
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

export const fetchAlbums = (offset, count, ownerId) => dispatch => {
	dispatch(loading(offset, count, ownerId));

	fetch(offset, count, ownerId)
		.then(albums => dispatch(albumsFetched(albums, offset, ownerId)))
		.catch(id => dispatch(error(id)));
};
