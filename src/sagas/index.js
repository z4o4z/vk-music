import {fork} from 'redux-saga/effects';

import vk from './vk';
import users from './users';

export default function* () {
	yield fork(vk);
	yield fork(users);
}
