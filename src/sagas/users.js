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

function* fetchByType({payload}) {
	const entityId = payload.entityId;
	const type = entityId.split('-')[1];
	const fetchMethod = getMethodNameByType(type);

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk[fetchMethod], payload);
		const newData = normalizeBy(data.items, 'id');
		const newPayload = getNewPayloadByType(type, data.count, payload, newData);

		yield makeSomeThinkBeforePutByType(type, payload, newData);

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
	yield takeEvery([
		usersFetchAudios.toString(),
		usersFetchAlbums.toString(),
		usersFetchFriends.toString(),
		usersFetchGroups.toString()
	], fetchByType);
}

function getMethodNameByType(type) {
	return switcher(type, {
		audios: 'fetchAudio',
		albums: 'fetchAlbums',
		groups: 'fetchGroups',
		friends: 'fetchFriends',
		recommendations: 'fetchRecommendations'
	});
}

function getNewPayloadByType(type, dataCount, payload, {ids, normalized}) {
	const {ownerId, albumId} = payload;
	const newPayload = {
		ids,
		id: payload.entityId,
		count: dataCount,
		offset: payload.offset + payload.count
	};

	return switcher(type, {
		albums: {...newPayload, ownerId, items: normalized},
		groups: newPayload,
		friends: newPayload,
		default: {...newPayload, ownerId, albumId, items: normalized}
	});
}

function makeSomeThinkBeforePutByType(type, {entityId}, {normalized}) {
	return switcher(type, {
		albums: put(entitiesFetch(entityId)),
		groups: put(groupsAddMultiple(normalized)),
		friends: put(usersAddMultiple(normalized)),
		default: () => {}
	});
}

function switcher(type, options) {
	return options[type] || options['default'];
}
