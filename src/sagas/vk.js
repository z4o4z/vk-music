import {takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import vk from '../helpers/vk';

import {VK_APP_ID, VK_PERMISSION_KEY} from '../constants/vk';
import {vkInitialized, vkAuthorize, vkAuthorized, vkAuthorizeError} from '../actions/vk';
import {usersAdd} from '../actions/users';

export default function* () {
	yield initialize();
	yield tryToLogin();
	yield takeEvery(vkAuthorize.toString(), login);
}

function* initialize() {
	yield call(vk.initialize, VK_APP_ID);

	yield put(vkInitialized());
}

function* tryToLogin() {
	try {
		const data = yield call(vk.getLoginStatus);
		const {userId} = data;

		// vk.startTrack();
		yield put(vkAuthorized(data));

		const users = yield call(vk.getUsers, [userId]);
		yield put(usersAdd({
			id: userId,
			...users[0]
		}));

		yield put(push(`/${userId}`));
	} catch (e) {
		yield put(vkAuthorizeError(e));
	}
}

function* login() {
	try {
		const data = yield call(vk.login, VK_PERMISSION_KEY);
		const {userId} = data;

		// yield call(vk.startTrack);
		yield put(vkAuthorized(data));

		const users = yield call(vk.getUsers, [userId]);
		yield put(usersAdd({
			id: userId,
			...users[0]
		}));

		yield put(push(`/${userId}`));
	} catch (e) {
		yield put(vkAuthorizeError(e));
	}
}
