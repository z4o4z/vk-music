import {VK_INITIALIZED} from '../constants/initialize';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case VK_INITIALIZED:
			return true;
		default: return state;
	}
};
