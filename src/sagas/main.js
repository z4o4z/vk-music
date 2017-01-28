import {takeEvery, call, put} from 'redux-saga/effects';

import vk from '../helpers/vk';
import switcher from '../helpers/switcher';
import normalizeBy, {normalizeByAndMakeCID} from '../helpers/normalizeBy';

import {
	entitiesSet,
	entitiesReset,
	entitiesFetch,
	entitiesError
} from '../actions/entities';
import {
	usersAddMultiple,
	usersFetchWall,
	usersFetchNews,
	usersFetchAudios,
	usersFetchAlbums,
	usersFetchFriends,
	usersFetchGroups
} from '../actions/users';
import {
	groupsFetchMembers,
	groupsAddMultiple
} from '../actions/groups';
import {audiosAddMultiple} from '../actions/audios';
import {albumsAddMultiple} from '../actions/albums';

export default function* () {
	yield takeEvery([
		usersFetchAudios.toString(),
		usersFetchAlbums.toString(),
		usersFetchFriends.toString(),
		usersFetchGroups.toString(),
		groupsFetchMembers.toString(),
		usersFetchWall.toString(),
		usersFetchNews.toString()
	], fetchByType);
}

function* fetchByType({payload}) {
	const entityId = payload.entityId;
	const type = entityId.split('--')[1];
	const fetchMethod = getMethodNameByType(type);

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk[fetchMethod], payload);
		const newData = getNewDataByType(type, data);
		const newPayload = getNewPayloadByType(type, data, payload, newData.ids);

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
		wall: 'fetchAudioFromWall',
		news: 'fetchAudioFromNews',
		audios: 'fetchAudio',
		albums: 'fetchAlbums',
		groups: 'fetchGroups',
		friends: 'fetchFriends',
		members: 'fetchMembers',
		popular: 'fetchPopular',
		recommendations: 'fetchRecommendations'
	});
}

function getNewDataByType(type, data) {
	return switcher(type, {
		wall: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		news: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		albums: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		audios: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		popular: () => normalizeByAndMakeCID(data, 'id', 'owner_id'),
		recommendations: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		default: () => normalizeBy(data.items, 'id')
	});
}

function getNewPayloadByType(type, {count, offset, next_from}, payload, ids) {
	const {ownerId, albumId} = payload;
	const newPayload = {
		ids,
		id: payload.entityId,
		count: count,
		offset: payload.offset + payload.count
	};

	return switcher(type, {
		wall: ({...newPayload, ownerId, albumId, offset}),
		news: ({ids, id: payload.entityId, nextFrom: next_from}),
		albums: ({...newPayload, ownerId}),
		audios: ({...newPayload, ownerId, albumId}),
		popular: ({...newPayload, ownerId, albumId}),
		recommendations: ({...newPayload, ownerId, albumId}),
		default: newPayload
	});
}

function makeSomeThinkBeforePutByType(type, normalized) {
	return switcher(type, {
		wall: () => put(audiosAddMultiple(normalized)),
		news: () => put(audiosAddMultiple(normalized)),
		albums: () => put(albumsAddMultiple(normalized)),
		audios: () => put(audiosAddMultiple(normalized)),
		groups: () => put(groupsAddMultiple(normalized)),
		friends: () => put(usersAddMultiple(normalized)),
		members: () => put(usersAddMultiple(normalized)),
		popular: () => put(audiosAddMultiple(normalized)),
		recommendations: () => put(audiosAddMultiple(normalized))
	});
}
