import {UI_LEFT_MENU_OPEN} from '../constants/ui';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case UI_LEFT_MENU_OPEN:
      return {...state, leftMenuOpen: !state.leftMenuOpen};
    default: return state;
  }
};
