import {fork} from 'redux-saga/effects';

import vk from './vk';
import ui from './ui';
import users from './users';
import groups from './groups';
import player from './player';

export default function* () {
	yield fork(vk);
	yield fork(ui);
	yield fork(users);
	yield fork(groups);
	yield fork(player);
}
