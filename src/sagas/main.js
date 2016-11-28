import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import normalizeBy, {normalizeByAndMakeCID} from '../helpers/normalizeBy';
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
import {audiosAddMultiple} from '../actions/audios';
import {albumsAddMultiple} from '../actions/albums';
import {groupsAddMultiple} from '../actions/groups';
import {groupsFetchMembers} from '../actions/groups';

export default function* () {
	yield takeEvery([
		usersFetchAudios.toString(),
		usersFetchAlbums.toString(),
		usersFetchFriends.toString(),
		usersFetchGroups.toString(),
		groupsFetchMembers.toString()
	], fetchByType);
}

function* fetchByType({payload}) {
	const entityId = payload.entityId;
	const type = entityId.split('--')[1];
	const fetchMethod = getMethodNameByType(type);

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk[fetchMethod], payload);
		const newData = getNewDataByType(type, data.items);
		const newPayload = getNewPayloadByType(type, data.count, payload, newData.ids);

		yield makeSomeThinkBeforePutByType(type, newData.normalized);

		if (payload.offset === 0) {
			yield put(entitiesReset(newPayload));
		} else {
			yield put(entitiesSet(newPayload));
		}
	} catch (e) {
		yield put(entitiesError(e));
	}
}

function getMethodNameByType(type) {
	return switcher(type, {
		audios: 'fetchAudio',
		albums: 'fetchAlbums',
		groups: 'fetchGroups',
		friends: 'fetchFriends',
		members: 'fetchMembers',
		recommendations: 'fetchRecommendations'
	});
}

function getNewDataByType(type, data) {
	return switcher(type, {
		albums: normalizeByAndMakeCID(data, 'id', 'owner_id'),
		audios: normalizeByAndMakeCID(data, 'id', 'owner_id'),
		recommendations: normalizeByAndMakeCID(data, 'id', 'owner_id'),
		default: normalizeBy(data, 'id')
	});
}

function getNewPayloadByType(type, dataCount, payload, ids) {
	const {ownerId, albumId} = payload;
	const newPayload = {
		ids,
		id: payload.entityId,
		count: dataCount,
		offset: payload.offset + payload.count
	};

	return switcher(type, {
		albums: {...newPayload, ownerId},
		audios: {...newPayload, ownerId, albumId},
		recommendations: {...newPayload, ownerId, albumId},
		default: newPayload
	});
}

function makeSomeThinkBeforePutByType(type, normalized) {
	return switcher(type, {
		albums: put(albumsAddMultiple(normalized)),
		audios: put(audiosAddMultiple(normalized)),
		groups: put(groupsAddMultiple(normalized)),
		friends: put(usersAddMultiple(normalized)),
		members: put(usersAddMultiple(normalized)),
		recommendations: put(audiosAddMultiple(normalized)),
		default: () => {}
	});
}

function switcher(type, options) {
	return options[type] || options['default'];
}
