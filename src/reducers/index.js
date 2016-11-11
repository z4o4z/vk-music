import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import vk from './vk';
import users from './users';
import audios from './audios';
import ui from './ui';
import albums from './albums';
import player from './player';
import friends from './friends';

export default combineReducers({
	vk,
	users,
	audios,
	ui,
	player,
	albums,
	friends,
	routing: routerReducer
});
