import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducers from '../reducers/index.js';

let middlewares = [thunk];

if (!IS_PROD) {
  const createLogger = require('redux-logger');

  middlewares.push(createLogger());
}

const createPersistentStore = compose(
  persistState('', {
    key: 'vk-music',
    merge: (initialState, persistedState) => Object.assign({}, initialState, persistedState)
  }),
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default (initialState = {}) => createPersistentStore(reducers, initialState);
