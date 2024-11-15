const CACHED_DIRECTORY_KEY = "cachedSwfDirectory";


const setCachedDirectory = (cachedDirectory) => {
  localStorage.setItem(CACHED_DIRECTORY_KEY, cachedDirectory);
}

const getCachedDirectory = () => {
  return localStorage.getItem(CACHED_DIRECTORY_KEY);
}

export { setCachedDirectory, getCachedDirectory };
