import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ui from './ui';
import vk from './vk';
import audio from './audio';

export default combineReducers({
  ui,
  vk,
  audio,
  routing: routerReducer
});
