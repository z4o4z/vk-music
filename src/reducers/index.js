import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import vk from './vk';
import ui from './ui';
import users from './users';
import groups from './groups';
import audios from './audios';
import albums from './albums';
import player from './player';
import entities from './entities';

export default combineReducers({
	vk,
	ui,
	users,
	groups,
	audios,
	albums,
	player,
	entities,
	routing: routerReducer
});
