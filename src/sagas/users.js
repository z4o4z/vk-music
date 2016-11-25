import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import normalizeBy from '../helpers/normalizeBy';
import vk from '../helpers/vk';

import {
	entitiesSet,
	entitiesReset,
	entitiesFetch,
	entitiesError
} from '../actions/entities';
import {
	usersAddMultiple,
	usersFetchAudios,
	usersFetchAlbums,
	usersFetchFriends,
	usersFetchGroups
} from '../actions/users';
import {groupsAddMultiple} from '../actions/groups';

function* fetchAudios({payload}) {
	const {ownerId, albumId, offset, count} = payload;
	const entityId = `${albumId || ownerId}-audios`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchAudio, payload);
		const audios = normalizeBy(data.items, 'id');

		const newPayload = {
			ownerId,
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
	const {ownerId, offset, count} = payload;
	const entityId = `${ownerId}-albums`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchAlbums, payload);
		const albums = normalizeBy(data.items, 'id');

		const newPayload = {
			ownerId,
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
	const {ownerId, offset, count} = payload;
	const entityId = `${ownerId}-friends`;

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

function* fetchGroups({payload}) {
	const {ownerId, offset, count} = payload;
	const entityId = `${ownerId}-groups`;

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk.fetchGroups, payload);
		const groups = normalizeBy(data.items, 'id');

		yield put(groupsAddMultiple(groups.normalized));

		const newPayload = {
			id: entityId,
			ids: groups.ids,
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
	yield takeEvery(usersFetchGroups.toString(), fetchGroups);
}
