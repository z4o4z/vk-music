import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ui from './ui';
import vk from './vk';

export default combineReducers({
  ui,
  vk,
  routing: routerReducer
});
