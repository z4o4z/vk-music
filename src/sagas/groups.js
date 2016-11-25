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
import {groupsFetchMembers} from '../actions/groups';
import {usersAddMultiple} from '../actions/users';

function* fetchsMembers({payload}) {
	const {ownerId, offset, count} = payload;
	const entityId = `${ownerId}-members`;

	yield put(entitiesFetch(entityId));

	try {
		console.log(payload);

		const data = yield call(vk.fetchMembers, {...payload, ownerId: payload.ownerId.substr(1)});
		const members = normalizeBy(data.items, 'id');

		yield put(usersAddMultiple(members.normalized));

		const newPayload = {
			id: entityId,
			ids: members.ids,
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
	yield takeEvery(groupsFetchMembers.toString(), fetchsMembers);
}
