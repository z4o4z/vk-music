import {combineReducers} from 'redux';

import ui from './ui';
import audio from './audios';
import albums from './albums';
import player from './player';
import friends from './friends';
import authorize from './authorize';
import initialize from './initialize';

export default combineReducers({
  ui,
  audio,
  player,
  albums,
  friends,
  authorize,
  initialized: initialize
});
