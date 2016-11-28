import {fork} from 'redux-saga/effects';

import vk from './vk';
import ui from './ui';
import player from './player';
import main from './main';

export default function* () {
	yield fork(vk);
	yield fork(ui);
	yield fork(player);
	yield fork(main);
}
