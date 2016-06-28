// Libs
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store/configureStore.js';

import Root from './containers/Root/Root.js';

import classes from './index.scss';

let initialState = {
  routing: {},
  initialized: false,
  authorize: {
    authorized: false,
    authError: false,
    expire: 0
  },
  ui: {
    leftMenuOpen: false,
    showLoader: false
  },
  audio: {
    all: {},
    my: [],
    loading: false,
    error: 0
  },
  player: {
    playlist: [],
    playlistPage: '',
    current: 0,
    next: 0,
    prev: 0,
    playing: false
  }
};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const root = window.document.createElement('div');

if (!IS_PROD) {
  const whyDidYouUpdate = require('why-did-you-update').whyDidYouUpdate;
  whyDidYouUpdate(React);
}

root.classList.add(classes.root);

window.document.body.insertBefore(root, window.document.body.firstChild);

render(
  <Root store={store} history={history}/>,
  root
);
