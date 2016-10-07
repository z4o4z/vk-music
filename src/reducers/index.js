import {combineReducers} from 'redux';

import vk from './vk';
import ui from './ui';
import audio from './audios';
import albums from './albums';
import player from './player';
import friends from './friends';
import authorize from './authorize';

export default combineReducers({
	vk,
	ui,
	audio,
	player,
	albums,
	friends,
	authorize
});
