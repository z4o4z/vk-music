import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import vk from './vk';
import users from './users';
import groups from './groups';
import ui from './ui';
import player from './player';
import entities from './entities';

export default combineReducers({
	vk,
	users,
	groups,
	ui,
	player,
	entities,
	routing: routerReducer
});
