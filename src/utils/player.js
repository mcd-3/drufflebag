const getPlayerConfig = (settings) => {
  return {
    autoplay: settings.autoplayEnabled ? "on" : "off",
    splashScreen: settings.splashscreenEnabled,
    openUrlMode: settings.openUrls ? "allow" : "deny",
    contextMenu: settings.contextMenuEnabled,
    letterbox: settings.letterboxEnabled ? "on" : "off",
  };
};

const createPlayer = (settings) => {
  window.RufflePlayer = window.RufflePlayer || {};
  const ruffle = window.RufflePlayer.newest();
  const player = ruffle.createPlayer();

  player.config = getPlayerConfig(settings);

  return player;
};

export {
  getPlayerConfig,
  createPlayer,
}