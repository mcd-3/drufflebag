import { invoke } from "@tauri-apps/api/core";
import { appDataDir } from '@tauri-apps/api/path';

/**
 * Open the About window
 */
const openAbout = () => {
  invoke("open_about");
};

/**
 * Open the settings window
 */
const openSettings = () => {
  invoke("open_settings");
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
 * Exits the application and closes all windows
 */
const exitApp = () => {
  invoke("exit_app");
}

/**
 * Writes an array of swf files to the cache
 *
 * @param {array} swfFiles - Array of swf files 
 */
const writeJsonCache = async (swfFiles) => {
  const appDataDirPath = await appDataDir();
  await invoke(
    "cache_swfs",
    { swfs: swfFiles, appDataDir: appDataDirPath }
  );
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
  exitApp,
  openAbout,
  openRuffle,
  openSettings,
  scanDirectory,
  writeJsonCache,
};
