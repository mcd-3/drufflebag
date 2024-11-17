import { BroadcastChannel } from 'broadcast-channel';

const GLOBAL_BC = "drufflebag_channel";
const EVENT_CLOSE_EMULATION = "close_emulation";
const EVENT_PLAY_BUTTON_CHANGE = "update_play_button";

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
}

/**
 * Posts the "close emulation" event
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to post event to
 */
const evtCloseEmulation = ({ broadcastChannel }) => {
  broadcastChannel.postMessage(EVENT_CLOSE_EMULATION);
};

const evtUpdatePlayButton = ({ broadcastChannel }) => {
  broadcastChannel.postMessage(EVENT_PLAY_BUTTON_CHANGE);
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
}

/**
 * Set a listener and callback for the "update play button" event on a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to listen on
 * @param {callback} onEmulatorClose - Callback function to execute when the update button needs to be updated
 */
const injectOnUpdatePlayButton = ({ broadcastChannel, onUpdatePlayButton }) => {
  broadcastChannel.onmessage = (event) => {
    if (event == EVENT_PLAY_BUTTON_CHANGE) {
      onUpdatePlayButton();
    }
  };
}

export {
  getBroadcastChannel,
  closeBroadcastChanel,
  evtCloseEmulation,
  evtUpdatePlayButton,
  injectOnEmulatorClose,
  injectOnUpdatePlayButton,
};
