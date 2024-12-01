import { BroadcastChannel } from 'broadcast-channel';

const GLOBAL_BC = "drufflebag_channel";
const EVENT_CLOSE_EMULATION = "close_emulation";
const EVENT_PLAY_BUTTON_CHANGE = "update_play_button";
const EVENT_CACHE_REFRESH = "cache_refresh";
const EVENT_UPDATE_SWF_BY_HASH = "update_swf_by_hash";

/**
 * Gets the global BroadcastChannel used within the application
 *
 * @returns {BroadcastChannel} Global BroadcastChannel 
 */
const getBroadcastChannel = () => {
  return new BroadcastChannel(GLOBAL_BC);
};

/**
 * Closes a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to close
 */
const closeBroadcastChanel = ({ broadcastChannel }) => {
  broadcastChannel.close();
};

/**
 * Posts the "close emulation" event
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to post event to
 */
const evtCloseEmulation = ({ broadcastChannel }) => {
  broadcastChannel.postMessage(EVENT_CLOSE_EMULATION);
};

/**
 * Posts the "update play button" event
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to post event to
 */
const evtUpdatePlayButton = ({ broadcastChannel }) => {
  broadcastChannel.postMessage(EVENT_PLAY_BUTTON_CHANGE);
};

/**
 * Posts the "cache refresh" event
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to post event to
 */
const evtCacheRefresh = ({ broadcastChannel }) => {
  broadcastChannel.postMessage(EVENT_CACHE_REFRESH);
};

/**
 * Posts the "update swf by hash" event
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to post event to
 * @param {string} hash - Swf hash
 */
const evtUpdateSwfByHash = ({broadcastChannel, hash, avm, date}) => {
  broadcastChannel.postMessage(`${EVENT_UPDATE_SWF_BY_HASH}:::${hash}:::${avm}:::${date}`);
};

/**
 * Set a listener and callback for the "emulator close" event on a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to listen on
 * @param {callback} onEmulatorClose - Callback function to execute when emulator is closed
 */
const injectOnEmulatorClose = ({ broadcastChannel, onEmulatorClose }) => {
  broadcastChannel.onmessage = (event) => {
    if (event == EVENT_CLOSE_EMULATION) {
      onEmulatorClose();
    }
  };
};

/**
 * Set a listener and callback for the "update play button" event on a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to listen on
 * @param {callback} onUpdatePlayButton - Callback function to execute when the update button needs to be updated
 */
const injectOnUpdatePlayButton = ({ broadcastChannel, onUpdatePlayButton }) => {
  broadcastChannel.onmessage = (event) => {
    if (event == EVENT_PLAY_BUTTON_CHANGE) {
      onUpdatePlayButton();
    }
  };
};

/**
 * Set a listener and callback for the "cache refresh" event on a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to listen on
 * @param {callback} onCacheRefresh - Callback function to execute when cache needs to be refreshed
 */
const injectOnCacheRefresh = ({ broadcastChannel, onCacheRefresh }) => {
  broadcastChannel.onmessage = (event) => {
    if (event == EVENT_CACHE_REFRESH) {
      onCacheRefresh();
    }
  };
};

/**
 * Set a listener and callback for the "update swf by hash" event on a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to listen on
 * @param {callback} onUpdateSwfByHash - Callback function to execute when swf in cache needs to be updated
 */
const injectOnUpdateSwfByHash = ({ broadcastChannel, onUpdateSwfByHash }) => {
  broadcastChannel.onmessage = (event) => {
    if (event.startsWith(EVENT_UPDATE_SWF_BY_HASH)) {
      const paramArray = event.split(':::');
      paramArray.shift();
      onUpdateSwfByHash(paramArray);
    }
  };
};

export {
  getBroadcastChannel,
  closeBroadcastChanel,
  evtCloseEmulation,
  evtUpdatePlayButton,
  evtCacheRefresh,
  evtUpdateSwfByHash,
  injectOnEmulatorClose,
  injectOnUpdatePlayButton,
  injectOnCacheRefresh,
  injectOnUpdateSwfByHash,
};
