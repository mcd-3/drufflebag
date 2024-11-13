import { BroadcastChannel } from 'broadcast-channel';

/**
 * Gets the global BroadcastChannel used within the application
 *
 * @returns {BroadcastChannel} Global BroadcastChannel 
 */
const getBroadcastChannel = () => {
  return new BroadcastChannel("drufflebag_channel");
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
 * Set a listener and callback for the "emulator close" event on a BroadcastChannel
 *
 * @param {BroadcastChannel} broadcastChannel - BroadcastChannel to listen on
 * @param {callback} onEmulatorClose - Callback function to execute when emulator is closed
 */
const injectOnEmulatorClose = ({ broadcastChannel, onEmulatorClose }) => {
  broadcastChannel.onmessage = (event) => {
    if (event == "close_ruffle") {
      onEmulatorClose();
    }
  };
}

export {
  getBroadcastChannel,
  closeBroadcastChanel,
  injectOnEmulatorClose,
};
