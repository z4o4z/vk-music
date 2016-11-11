import {handleActions} from 'redux-actions';

import {audiosAdd} from '../actions/audios';
import defaultState from '../store/initialState';

export default handleActions({
	[audiosAdd]: (state, {payload}) => ({...state, ...payload})
}, defaultState.audios);
