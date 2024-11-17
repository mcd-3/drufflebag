import { BroadcastChannel } from 'broadcast-channel';

const GLOBAL_BC = "drufflebag_channel";
const EVENT_CLOSE_EMULATION = "close_emulation";

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

export {
  getBroadcastChannel,
  closeBroadcastChanel,
  evtCloseEmulation,
  injectOnEmulatorClose,
};
