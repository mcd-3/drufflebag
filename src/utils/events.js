import { emit, listen } from '@tauri-apps/api/event';

const EVT_CLOSE_EMULATION = "close_emulation";
const EVT_UPDATE_PLAY_BUTTON = "update_play_button";

const emitEvtUpdatePlayButton = async () => {
  await emit(EVT_UPDATE_PLAY_BUTTON, {});
};

const emitEvtCloseEmulation = async () => {
  await emit(EVT_CLOSE_EMULATION, {});
};

const listenEvtUpdatePlayButton = (callback) => {
  return listen(EVT_UPDATE_PLAY_BUTTON, () => {
    callback();
  });
};

const listenEvtCloseEmulation = (callback) => {
  return listen(EVT_CLOSE_EMULATION, () => {
    callback();
  });
};

export {
  emitEvtCloseEmulation,
  emitEvtUpdatePlayButton,
  listenEvtCloseEmulation,
  listenEvtUpdatePlayButton,
};
