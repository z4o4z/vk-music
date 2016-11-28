import {handleActions} from 'redux-actions';

import {uiLeftMenuToggle} from '../actions/ui';
import defaultState from '../store/initialState';

export default handleActions({
	[uiLeftMenuToggle]: state => ({...state, isLeftMenuOpen: !state.isLeftMenuOpen})
}, defaultState.ui);
