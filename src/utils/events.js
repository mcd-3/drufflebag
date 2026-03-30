import { emit, listen } from '@tauri-apps/api/event';

const EVT_CLOSE_EMULATION = "close_emulation";
const EVT_UPDATE_PLAY_BUTTON = "update_play_button";
const EVT_UPDATE_SWF_BY_HASH = "update_swf_by_hash"

const emitEvtUpdatePlayButton = async () => {
  await emit(EVT_UPDATE_PLAY_BUTTON, {});
};

const emitEvtCloseEmulation = async () => {
  await emit(EVT_CLOSE_EMULATION, {});
};

const emitEvtUpdateSwfByHash = async ({ hash, avm, date }) => {
  await emit(EVT_UPDATE_SWF_BY_HASH, { hash, avm, date });
}

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

const listenEvtUpdateSwfByHash = (callback) => {
  return listen(EVT_UPDATE_SWF_BY_HASH, (event) => {
    callback(event.payload);
  });
};

export {
  emitEvtCloseEmulation,
  emitEvtUpdatePlayButton,
  emitEvtUpdateSwfByHash,
  listenEvtCloseEmulation,
  listenEvtUpdatePlayButton,
  listenEvtUpdateSwfByHash,
};
