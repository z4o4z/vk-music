// Libs
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

import configureStore from './store/configureStore.js';

import Root from './containers/Root/Root.js';

import classes from './index.scss';

let initialState = {
  initialized: false,
  authorize: {
    authorized: false,
    authError: false,
    ownerId: 0,
    expire: 0,
    redirectPage: '/'
  },
  ui: {
    leftMenuOpen: false,
    showLoader: false
  },
  audio: {
    all: {},
    owners: {},
    albums: {},
    loading: false,
    error: 0
  },
  friends: {
    all: {},
    users: {},
    loading: false,
    error: 0
  },
  albums: {
    all: {},
    users: {},
    loading: false,
    error: 0
  },
  player: {
    playlist: [],
    page: '',
    albumId: 0,
    ownerId: 0,
    current: 0,
    next: 0,
    prev: 0,
    playing: false
  }
};

const store = configureStore(initialState);
const root = window.document.createElement('div');

/*
if (!IS_PROD) {
  const whyDidYouUpdate = require('why-did-you-update').whyDidYouUpdate;
  whyDidYouUpdate(React);
}
*/

root.classList.add(classes.root);

window.document.body.insertBefore(root, window.document.body.firstChild);

render(
  <Root store={store} history={browserHistory}/>,
  root
);
