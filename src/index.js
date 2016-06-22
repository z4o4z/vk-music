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
  vk: {
    initialized: false,
    authorized: false,
    authError: false,
    expire: 0
  },
  ui: {
    leftMenuOpen: true,
    showLoader: false
  },
  audio: {
    my: [],
    loading: false,
    error: 0
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
