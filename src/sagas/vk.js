import {call, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import vk from '../helpers/vk';

import {VK_APP_ID} from '../constants/vk';
import {vkInitialized, vkAuthorize, vkAuthorized, vkAuthorizeError} from '../actions/vk';
import {usersAdd} from '../actions/users';

function* initialize() {
	yield call(vk.initialize, VK_APP_ID);

	yield put(vkInitialized());
}

function* tryToLogin() {
	yield put(vkAuthorize());

	try {
		const data = yield call(vk.getLoginStatus);
		yield put(vkAuthorized(data));

		const users = yield call(vk.getUsers, [data.userId]);
		yield put(usersAdd({
			userId: data.userId,
			info: users[0]
		}));

		yield put(push(`/${data.userId}`));
	} catch (e) {
		yield put(vkAuthorizeError(e));
	}
}

export default function* () {
	yield initialize();

	yield tryToLogin();
}
