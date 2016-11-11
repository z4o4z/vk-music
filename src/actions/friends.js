import {
	FRIENDS_ERROR,
	FRIENDS_LOADING,
	FRIENDS_FETCHED
} from '../constants/friends';

import normalizeBy from '../helpers/normalizeBy';

function loading(offset, count, ownerId) {
	return {
		type: FRIENDS_LOADING,
		payload: {
			offset,
			count,
			ownerId
		}
	};
}

function error(id) {
	return {
		type: FRIENDS_ERROR,
		payload: id
	};
}

function friendsFetched(friends, offset, id) {
	return {
		type: FRIENDS_FETCHED,
		payload: {
			offset,
			id,
			...normalizeBy(friends, 'uid')
		}
	};
}

function fetch(offset, count, ownerId) {
	let params = {
		offset,
		count,
		fields: 'photo_100',
		order: 'hints'
	};

	if (ownerId) {
		params.user_id = ownerId;
	}

	return new Promise((resolve, reject) => {
		window.VK.api('friends.get', params, data => {
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

export const fetchFriends = (offset, count, ownerId) => dispatch => {
	dispatch(loading(offset, count, ownerId));

	fetch(offset, count, ownerId)
		.then(friends => dispatch(friendsFetched(friends, offset, ownerId)))
		.catch(id => dispatch(error(id)));
};
