import {UI_LEFT_MENU_OPEN} from '../constants/ui';

export default function ui(state = {}, action = {}) {
  switch (action.type) {
    case UI_LEFT_MENU_OPEN:
      return Object.assign({}, state, {leftMenuOpen: !state.leftMenuOpen});
    default: return state;
  }
}
