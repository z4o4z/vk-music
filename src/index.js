// Libs
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {whyDidYouUpdate} from 'why-did-you-update';

import configureStore from './store/configureStore.js';

import Root from './containers/Root/Root.js';

let initialState = {
  routing: {}
};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

if (!IS_PROD) {
  whyDidYouUpdate(React);
}

injectTapEventPlugin();

render(
  <Root store={store} history={history}/>,
  window.document.getElementById('root')
);
