import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducers from '../reducers/index.js';

let middlewares = [thunk];

if (!IS_PROD) {
  const createLogger = require('redux-logger');

  middlewares.push(createLogger());
}

const excludeFromMerge = ['ui.showLoader'];

const exclude = (rule, state, initialState) => {
  let newState = state;
  let initState = initialState;
  const keys = rule.split('.');

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      newState[key] = initState[key];
    } else {
      newState[key] = newState[key] || {};
      initState = initState[key] || {};
    }

    newState = newState[key];
  });
};

const merge = (initialState, persistedState) => {
  let newState = Object.assign({}, initialState, persistedState);

  excludeFromMerge.forEach(rule => {
    exclude(rule, newState, initialState);
  });

  return newState;
};

const createPersistentStore = compose(
  persistState('', {
    key: 'vk-music',
    merge
  }),
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default (initialState = {}) => createPersistentStore(reducers, initialState);
