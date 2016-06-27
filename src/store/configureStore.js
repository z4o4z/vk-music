import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducers from '../reducers/index.js';

import authorize from '../middlewares/authorize';
import player from '../middlewares/player';

let middlewares = [authorize, player, thunk];

if (!IS_PROD) {
  const createLogger = require('redux-logger');

  middlewares.push(createLogger());
}

const includeInLocalStorage = [
  'authorize.expire',
  'ui.leftMenuOpen'
];

const include = (rule, state, initialState) => {
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

const slicer = () => state => {
  let newState = {};

  includeInLocalStorage.forEach(rule => {
    include(rule, newState, state);
  });

  return newState;
};

const assignByRule = (rule, state, persistedState) => {
  let newState = state;
  let persistState = persistedState;
  const keys = rule.split('.').slice(0, -1);

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      newState[key] = Object.assign({}, newState[key], persistState[key]);
    } else {
      newState[key] = newState[key] || {};
      persistState = persistState[key] || {};
    }

    newState = newState[key];
  });
};

const merge = (initialState, persistedState) => {
  if (!persistedState) {
    return initialState;
  }

  let newState = Object.assign({}, initialState);

  includeInLocalStorage.forEach(rule => {
    assignByRule(rule, newState, persistedState);
  });

  return newState;
};

const createPersistentStore = compose(
  persistState('', {
    key: 'vk-music',
    slicer,
    merge
  }),
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default (initialState = {}) => createPersistentStore(reducers, initialState);
