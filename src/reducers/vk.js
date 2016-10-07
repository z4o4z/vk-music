import {handleActions} from 'redux-actions';

import {vkInitialized} from '../actions/vk';
import defaultState from '../store/initialState';

export default handleActions({
	[vkInitialized]: state => ({...state, initialized: true})
}, defaultState.vk);
