import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ui from './ui';
import audio from './audios';
import player from './player';
import friends from './friends';
import authorize from './authorize';
import initialize from './initialize';

export default combineReducers({
  ui,
  audio,
  player,
  friends,
  authorize,
  initialized: initialize,
  routing: routerReducer
});
