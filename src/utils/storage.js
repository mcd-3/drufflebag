const CACHED_DIRECTORY_KEY = "cachedSwfDirectory";
const GLOBAL_URL_SPOOF_KEY = "globalSpoofUrlJSON";
const CURRENTLY_PLAYING_SWF = "currentlyPlayingSwf";
const APPLICATION_SETTINGS_KEY = "applicationSettings";

const setCachedDirectory = (cachedDirectory) => {
  localStorage.setItem(CACHED_DIRECTORY_KEY, cachedDirectory);
};

const getCachedDirectory = () => {
  return localStorage.getItem(CACHED_DIRECTORY_KEY);
};

const setGlobalSpoofUrl = ({ isEnabled, urlSpoof }) => {
  localStorage.setItem(
    GLOBAL_URL_SPOOF_KEY,
    JSON.stringify({ isEnabled, urlSpoof })
  );
};

const getGlobalSpoofUrl = () => {
  return JSON.parse(
    localStorage.getItem(GLOBAL_URL_SPOOF_KEY)
  );
};

const setCurrentlyPlayingSwfPath = (path) => {
  localStorage.setItem(CURRENTLY_PLAYING_SWF, path);
};

const getCurrentlyPlayingSwfPath = () => {
  return localStorage.getItem(CURRENTLY_PLAYING_SWF);
};

const setSettings = (settings) => {
  localStorage.setItem(
    APPLICATION_SETTINGS_KEY,
    JSON.stringify(settings)
  );
};

const getSettings = () => {
  return JSON.parse(
    localStorage.getItem(APPLICATION_SETTINGS_KEY)
  );
};

export {
  setCachedDirectory,
  getCachedDirectory,
  setGlobalSpoofUrl,
  getGlobalSpoofUrl,
  setCurrentlyPlayingSwfPath,
  getCurrentlyPlayingSwfPath,
  setSettings,
  getSettings,
};
