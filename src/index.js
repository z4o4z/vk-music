// Libs
import React from 'react';
import {render} from 'react-dom';
import {hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import initialState from './store/initialState';
import configureStore from './store/configureStore';

import rootSaga from './sagas/index';

import Root from './containers/Root/Root.js';

import classes from './index.scss';

const store = configureStore(initialState, hashHistory);
const history = syncHistoryWithStore(hashHistory, store);
const root = window.document.createElement('div');

if (process.env.NODE_ENV !== 'production') {
	const {whyDidYouUpdate} = require('why-did-you-update');

	whyDidYouUpdate(React);
}

store.runSaga(rootSaga);

root.classList.add(classes.root);

window.document.body.insertBefore(root, window.document.body.firstChild);

render(
	<Root store={store} history={history}/>,
	root
);
