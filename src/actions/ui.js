import {UI_LEFT_MENU_OPEN, UI_SHOW_LOADER, UI_HIDE_LOADER} from '../constants/ui';

export function uiLeftMenuOpen() {
  return {type: UI_LEFT_MENU_OPEN};
}

export function showLoader() {
  return {type: UI_SHOW_LOADER};
}

export function hideLoader() {
  return {type: UI_HIDE_LOADER};
}
