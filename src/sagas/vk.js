import {call, put} from 'redux-saga/effects';

import vk from '../helpers/vk';

import {VK_APP_ID} from '../constants/vk';
import {vkInitialized} from '../actions/vk';

function * initializeVk() {
	yield call(vk.initialize, VK_APP_ID);

	yield put(vkInitialized());
}

export default function * () {
	yield initializeVk();
}
