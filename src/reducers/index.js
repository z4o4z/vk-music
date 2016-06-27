import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ui from './ui';
import audio from './audio';
import player from './player';
import authorize from './authorize';
import initialize from './initialize';

export default combineReducers({
  ui,
  audio,
  player,
  authorize,
  initialized: initialize,
  routing: routerReducer
});
