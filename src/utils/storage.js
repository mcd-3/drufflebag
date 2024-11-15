const CACHED_DIRECTORY_KEY = "cachedSwfDirectory";
const GLOBAL_URL_SPOOF_KEY = "globalSpoofUrlJSON";

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

export {
  setCachedDirectory,
  getCachedDirectory,
  setGlobalSpoofUrl,
  getGlobalSpoofUrl,
};
