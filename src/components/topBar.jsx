import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getBroadcastChannel, injectOnEmulatorClose } from './../utils/broadcast.js';
import {
  setCachedDirectory,
  getCachedDirectory,
  setGlobalSpoofUrl,
  getGlobalSpoofUrl
} from './../utils/storage.js';
import { getAssetPath } from './../utils/assets.js';
import IconButton from './iconButton';
import styles from './../styles/components/topBar.module.css';

/**
 * Bar that display a list of controls and options
 *
 * @returns {}
 */
const TopBar = ({
  setSwfFiles,
  selectedSwfPath
}) => {
  const [globalSpoof, setGlobalSpoof] = useState({ isEnabled: false, url: '' });
  const [ruffleOpen, setRuffleOpen] = useState(false);

  injectOnEmulatorClose({
    broadcastChannel: getBroadcastChannel(),
    onEmulatorClose: () => {
      setRuffleOpen(false);
    }
  });

  useEffect(() => {
    const globalSpoofStored = getGlobalSpoofUrl();

    if (globalSpoofStored) {
      setGlobalSpoof({
        isEnabled: globalSpoofStored.isEnabled,
        url: globalSpoofStored.urlSpoof,
      });
    }
  }, [])

  const writeJsonCache = async (swfFiles) => {
    await invoke("cache_swfs", { swfs: swfFiles });
  }

  function launch_ruffle(swfName) {
    invoke("open_ruffle", { swfName });
    setRuffleOpen(true);
  }

  const openSettings = () => {
    invoke("open_settings");
  };

  return (
    <div className={styles["topBar-root"]}>
      <div className={styles["topBar-file-column"]}>
        <IconButton
          className={styles["topBar-open-button"]}
          text="Open"
          src={getAssetPath('folder.svg')}
          onClick={async () => {
            const files = await invoke("scan_directory", { cachedDirectoryPath: "" });
            if (files.swfs.length > 0) {
              setCachedDirectory(files.parent_dir);
            }
            setSwfFiles(files.swfs);
            writeJsonCache(files.swfs);
          }} />
        <IconButton
          className={styles["topBar-refresh-button"]}
          text="Refresh"
          src={getAssetPath('refresh-double.svg')}
          onClick={async () => {
            const directory = getCachedDirectory();
            if (!directory) {
              // TODO: Show a warning alert
              return;
            }
            const files = await invoke("scan_directory", { cachedDirectoryPath: directory });
            setSwfFiles(files.swfs);
            writeJsonCache(files.swfs);
          }} />
        <IconButton
          className={styles["topBar-settings-button"]}
          text="Settings"
          src={getAssetPath('settings.svg')}
          onClick={ () => { openSettings() }} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-control-column"]}>
        <IconButton
          className={styles["topBar-pause-button"]}
          text={ruffleOpen ? 'Stop' : 'Play'}
          src={ruffleOpen ? getAssetPath('square.svg') : getAssetPath('play.svg')}
          onClick={() => {
            if (ruffleOpen) {
              setRuffleOpen(false);
            } else {
              launch_ruffle(selectedSwfPath);
              setGlobalSpoofUrl({
                isEnabled: globalSpoof.isEnabled,
                urlSpoof: globalSpoof.url,
              });
            }
          }}
          disabled={selectedSwfPath == "" ? true : false} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-spoof-column"]}>
        <input
          className={styles["topBar-spoof-checkbox"]}
          type='checkbox'
          checked={globalSpoof.isEnabled}
          onChange={(e) => {
            setGlobalSpoof({ url: globalSpoof.url, isEnabled: e.target.checked});
          }}/>
        <img className={styles["topBar-spoof-icon"]} src={getAssetPath('globe.svg')}/>
        <input
          className={styles["topBar-spoof-url-textbox"]}
          type='text'
          placeholder='Global Spoof Url...'
          alt="Global Spoof Url"
          disabled={!globalSpoof.isEnabled}
          value={globalSpoof.url}
          onChange={(e) => {
            setGlobalSpoof({ url: e.target.value, isEnabled: globalSpoof.isEnabled })
          }}
        />
      </div>
    </div>
  );
}

export default TopBar;