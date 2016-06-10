// Libs
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore.js';

import Root from './containers/Root/Root.js';

import classes from './index.scss';

let initialState = {
  routing: {},
  oauth: {
    state: ''
  },
  ui: {
    leftMenuOpen: true
  }
};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const root = window.document.createElement('div');

if (!IS_PROD) {
 /* const whyDidYouUpdate = require('why-did-you-update').whyDidYouUpdate;
  whyDidYouUpdate(React); */
}

injectTapEventPlugin();

root.classList.add(classes.root);

window.document.body.appendChild(root);

render(
  <Root store={store} history={history}/>,
  root
);
