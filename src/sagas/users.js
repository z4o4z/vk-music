import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import normalizeBy from '../helpers/normalizeBy';
import vk from '../helpers/vk';

import {usersAddMultiple} from '../actions/users';
import {entitiesSet, entitiesReset, entitiesFetch, entitiesError} from '../actions/entities';
import {usersFetchAudios, usersFetchAlbums, usersFetchFriends} from '../actions/users';

function* fetchAudios({payload}) {
	const {userId, albumId, offset, count} = payload;
	const entityId = `${albumId || userId}-audios`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchAudio, payload);
		const audios = normalizeBy(data.items, 'id');

		const newPayload = {
			userId,
			albumId,
			id: entityId,
			ids: audios.ids,
			items: audios.normalized,
			count: data.count,
			offset: offset + count
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
	const {userId, offset, count} = payload;
	const entityId = `${userId}-albums`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchAlbums, payload);
		const albums = normalizeBy(data.items, 'id');

		const newPayload = {
			userId,
			id: entityId,
			ids: albums.ids,
			items: albums.normalized,
			count: data.count,
			offset: offset + count
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
	const {userId, offset, count} = payload;
	const entityId = `${userId}-friends`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchFriends, payload);
		const friends = normalizeBy(data.items, 'id');

		yield put(usersAddMultiple(friends.normalized));

		const newPayload = {
			id: entityId,
			ids: friends.ids,
			count: data.count,
			offset: offset + count
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
