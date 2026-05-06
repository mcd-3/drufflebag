import { emit, listen } from '@tauri-apps/api/event';

const EVT_CLOSE_EMULATION = "close_emulation";
const EVT_UPDATE_PLAY_BUTTON = "update_play_button";
const EVT_UPDATE_SWF_BY_HASH = "update_swf_by_hash"
const EVT_UPDATE_SWF_COUNT = "update_swf_count";

const emitEvtUpdatePlayButton = async () => {
  await emit(EVT_UPDATE_PLAY_BUTTON, {});
};

const emitEvtCloseEmulation = async () => {
  await emit(EVT_CLOSE_EMULATION, {});
};

/**
 * @param {string} hash - SWF file MD5 hash
 * @param {number} avm - Flash AVM version
 * @param {number} date - Date that the SWF file is launches
 */
const emitEvtUpdateSwfByHash = async ({ hash, avm, date }) => {
  await emit(EVT_UPDATE_SWF_BY_HASH, { hash, avm, date });
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

const listenEvtUpdateSwfByHash = (callback) => {
  return listen(EVT_UPDATE_SWF_BY_HASH, (event) => {
    callback(event.payload);
  });
};

const listenEvtUpdateSwfCount = (callback) => {
  return listen(EVT_UPDATE_SWF_COUNT, (event) => {
    callback(event.payload);
  });
};

const listenSingleInstance = (callback) => {
  return listen('single-instance', (payload) => {
    callback(payload);
  });
};

export {
  emitEvtCloseEmulation,
  emitEvtUpdatePlayButton,
  emitEvtUpdateSwfByHash,
  listenEvtCloseEmulation,
  listenEvtUpdatePlayButton,
  listenEvtUpdateSwfByHash,
  listenEvtUpdateSwfCount,
  listenSingleInstance,
};
