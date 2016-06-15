import {UI_LEFT_MENU_OPEN, UI_SHOW_LOADER, UI_HIDE_LOADER} from '../constants/ui';

export default function ui(state = {}, action = {}) {
  switch (action.type) {
    case UI_LEFT_MENU_OPEN:
      return {...state, leftMenuOpen: !state.leftMenuOpen};
    case UI_SHOW_LOADER:
      return {...state, showLoader: true};
    case UI_HIDE_LOADER:
      return {...state, showLoader: false};
    default: return state;
  }
}
