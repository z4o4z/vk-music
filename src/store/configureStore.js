import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import assignIn from 'lodash/assignIn';
import isObject from 'lodash/isObject';

import reducers from '../reducers/index';

import authorize from '../middlewares/authorize';
import player from '../middlewares/player';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [
	sagaMiddleware,
	authorize,
	player,
	thunk
];

if (!IS_PROD) {
	const createLogger = require('redux-logger');

	middlewares.push(createLogger());
}

const includeInLocalStorage = [
	'authorize.expire'
];

export default initialState => {
	const store = createStore(reducers, initialState, getEnhancer());

	store.runSaga = sagaMiddleware.run;

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers').default)
		);
	}

	return store;
};

function getEnhancer() {
	let devTools = f => f;

	if (!IS_PROD && window.devToolsExtension) {
		devTools = window.devToolsExtension();
	}

	return compose(
		applyMiddleware(...middlewares),
		persistState('', {
			key: 'vk-music',
			slicer,
			merge
		}),
		devTools
	);
}

function include(rule, state, initialState) {
	let newState = state;
	let initState = initialState;
	let keys = rule.split('.');

	keys.forEach((key, index) => {
		if (index === keys.length - 1) {
			newState[key] = initState[key];
		} else {
			newState[key] = newState[key] || {};
			initState = initState[key] || {};
		}

		newState = newState[key];
	});
}

function slicer() {
	return state => {
		let newState = {};

		includeInLocalStorage.forEach(rule => {
			include(rule, newState, state);
		});

		return newState;
	};
}

function assignByRule(rule, state, persistedState) {
	let newState = state;
	let persistState = persistedState;
	let keys = rule.split('.');

	keys.forEach((key, index) => {
		if (index === keys.length - 1) {
			if (isObject(newState[key])) {
				newState[key] = assignIn({}, newState[key], persistState[key]);
			} else {
				newState[key] = persistState[key];
			}
		} else {
			newState[key] = newState[key] || {};
			persistState = persistState[key] || {};
		}

		newState = newState[key];
	});
}

function merge(initialState, persistedState) {
	if (!persistedState) {
		return initialState;
	}

	let newState = assignIn({}, initialState);

	includeInLocalStorage.forEach(rule => {
		assignByRule(rule, newState, persistedState);
	});

	return newState;
}
