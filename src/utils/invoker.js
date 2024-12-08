import { invoke } from "@tauri-apps/api/core";

/**
 * Open the settings window
 */
const openSettings = () => {
  invoke("open_settings");
};

/**
 * Writes an array of swf files to the cache
 *
 * @param {array} swfFiles - Array of swf files 
 */
const writeJsonCache = async (swfFiles) => {
  await invoke("cache_swfs", { swfs: swfFiles });
};

/**
 * Copies a swf file to this application's 'public' directory
 *
 * @param {string} swfPath - Absolute path to the swf file
 */
const copyToPublic = (swfPath) => {
  invoke("copy_to_public", { swfAbsolutePath: swfPath });
};

/**
 * Opens the Ruffle window
 *
 * @param {string} swfName - Name of SWF file to display on title bar
 */
const openRuffle = (swfName) => {
  invoke("open_ruffle", { swfName });  
};

/**
 * Scans a directory for swf files
 *
 * @param {string} directoryPath - Directory path to search
 * @returns {object} - Object containing swf files and path searched
 */
const scanDirectory = async (directoryPath) => {
  return await invoke("scan_directory", { cachedDirectoryPath: directoryPath });
};


export {
  copyToPublic,
  openRuffle,
  openSettings,
  scanDirectory,
  writeJsonCache,
};
