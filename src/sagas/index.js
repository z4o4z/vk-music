import {fork} from 'redux-saga/effects';

import vk from './vk';

export default function * () {
	yield fork(vk);
}
