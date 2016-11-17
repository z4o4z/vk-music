import {handleActions} from 'redux-actions';

import {
	uiLeftMenuOpen
} from '../actions/ui';
import defaultState from '../store/initialState';

export default handleActions({
	[uiLeftMenuOpen]: state => ({...state, leftMenuOpen: !state.leftMenuOpen})
}, defaultState.ui);
