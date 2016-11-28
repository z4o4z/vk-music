import {handleActions} from 'redux-actions';

import getStateItems from '../helpers/getStateItems';
import {audiosAddMultiple} from '../actions/audios';
import defaultState from '../store/initialState';

export default handleActions({
	[audiosAddMultiple]: (state, {payload}) => ({
		...state,
		...getStateItems(state, payload)
	})
}, defaultState.audios);
