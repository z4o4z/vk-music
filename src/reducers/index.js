import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ui from './ui';
import oauth from './oauth';

export default combineReducers({
  ui,
  oauth,
  routing: routerReducer
});
