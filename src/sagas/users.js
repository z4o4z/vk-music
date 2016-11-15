import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import normalizeBy from '../helpers/normalizeBy';
import vk from '../helpers/vk';

import {usersAddMultiple} from '../actions/users';
import {entitiesSet, entitiesReset, entitiesFetch, entitiesError} from '../actions/entities';
import {usersFetchAudios, usersFetchAlbums, usersFetchFriends} from '../actions/users';

function* fetchAudios({payload}) {
	const {userId, albumId} = payload;
	const entityId = `${albumId || userId}-audios`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchAudio, payload);
		const newPayload = {
			userId,
			albumId,
			id: entityId,
			items: data.items,
			count: data.count,
			offset: payload.offset + payload.count
		};

		if (payload.offset === 0) {
			yield put(entitiesReset(newPayload));
		} else {
			yield put(entitiesSet(newPayload));
		}
	} catch (e) {
		yield put(entitiesError(e));
	}
}

function* fetchAlbums({payload}) {
	const userId = payload.userId;
	const entityId = `${userId}-albums`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchAlbums, payload);

		const newPayload = {
			userId,
			id: entityId,
			items: data.items,
			count: data.count,
			offset: payload.offset + payload.count
		};

		if (payload.offset === 0) {
			yield put(entitiesReset(newPayload));
		} else {
			yield put(entitiesSet(newPayload));
		}
	} catch (e) {
		yield put(entitiesError(e));
	}
}

function* fetchFriends({payload}) {
	const userId = payload.userId;
	const entityId = `${userId}-friends`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchFriends, payload);
		const friends = normalizeBy(data.items, 'id');

		yield put(usersAddMultiple(friends.normalized));

		const newPayload = {
			id: entityId,
			items: friends.ids,
			count: data.count,
			offset: payload.offset + payload.count
		};

		if (payload.offset === 0) {
			yield put(entitiesReset(newPayload));
		} else {
			yield put(entitiesSet(newPayload));
		}
	} catch (e) {
		yield put(entitiesError(e));
	}
}

export default function* () {
	yield takeEvery(usersFetchAudios.toString(), fetchAudios);
	yield takeEvery(usersFetchAlbums.toString(), fetchAlbums);
	yield takeEvery(usersFetchFriends.toString(), fetchFriends);
}
