import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from '../reducers/index.js';

let middlewares = [thunk];

if (!IS_PROD) {
  middlewares.push(createLogger());
}

export default (initialState = {}) => createStore(reducers, initialState, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
