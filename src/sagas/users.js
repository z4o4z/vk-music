import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import normalizeBy from '../helpers/normalizeBy';
import vk from '../helpers/vk';

import {audiosAdd} from '../actions/audios';
import {usersFetchAudios, usersSetAudios, usersAddAudios} from '../actions/users';

function* fetchAudio({payload}) {
	const userId = payload.userId;
	const data = yield call(vk.fetchAudio, payload);
	const audios = normalizeBy(data.items, 'id');

	yield put(audiosAdd(audios.normalized));

	if (payload.offset === 0) {
		yield put(usersSetAudios({
			userId,
			audios: audios.ids,
			count: data.count,
			offset: payload.offset + payload.count
		}));
	} else {
		yield put(usersAddAudios({
			userId,
			audios: audios.ids,
			offset: payload.offset + payload.count
		}));
	}
}

export default function* () {
	yield takeEvery(usersFetchAudios.toString(), fetchAudio);
}
