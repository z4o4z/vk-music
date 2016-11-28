import {handleActions} from 'redux-actions';

import getStateItems from '../helpers/getStateItems';
import {albumsAddMultiple} from '../actions/albums';
import defaultState from '../store/initialState';

export default handleActions({
	[albumsAddMultiple]: (state, {payload}) => ({
		...state,
		...getStateItems(state, payload)
	})
}, defaultState.audios);

