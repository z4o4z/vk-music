import {VK_APP_ID, VK_INITIALIZED} from '../constants/initialize';

function initialized() {
  return {type: VK_INITIALIZED};
}

export const initialize = () => dispatch => {
  window.vkAsyncInit = () => {
    window.VK.init({
      apiId: VK_APP_ID
    });

    dispatch(initialized());
  };

  if (window.VK) {
    window.vkAsyncInit();
  }
};
