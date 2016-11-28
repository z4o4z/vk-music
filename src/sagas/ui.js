import {takeEvery} from 'redux-saga';
import {select, put} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

import {uiLeftMenuToggle} from '../actions/ui';

function* locationChange() {
	const {ui} = yield select();

	if (ui.isLeftMenuOpen) {
		yield put(uiLeftMenuToggle());
	}
}

export default function* () {
	yield takeEvery(LOCATION_CHANGE, locationChange);
}
