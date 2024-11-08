import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
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
  const [globalSpoofEnabled, setGlobalSpoofEnabled] = useState(false);
  const [ruffleOpen, setRuffleOpen] = useState(false);

  // TODO: Move this function
  const getAssetPath = assetFileName => {
    return `src/assets/${assetFileName}`;
  };

  function launch_ruffle(swfName) {
    invoke("open_ruffle", { swfName });
    setRuffleOpen(true);
  }

  return (
    <div className={styles["topBar-root"]}>
      <div className={styles["topBar-file-column"]}>
        <IconButton
          className={styles["topBar-open-button"]}
          text="Open"
          src={getAssetPath('folder.svg')}
          onClick={async () => {
            const files = await invoke("scan_directory", { cachedDirectoryPath: "" });
            setSwfFiles(files);
          }} />
        <IconButton
          className={styles["topBar-refresh-button"]}
          text="Refresh"
          src={getAssetPath('refresh-double.svg')}
          onClick={async () => {
            const files = await invoke("scan_directory", { cachedDirectoryPath: "" });
            setSwfFiles(files);
          }} />
        <IconButton
          className={styles["topBar-settings-button"]}
          text="Settings"
          src={getAssetPath('settings.svg')}
          onClick={ () => { console.error('dfg'); }} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-control-column"]}>
        <IconButton
          className={styles["topBar-pause-button"]}
          text={ruffleOpen ? 'Stop' : 'Play'}
          src={ruffleOpen ? getAssetPath('square.svg') : getAssetPath('play.svg')}
          onClick={() => { launch_ruffle(selectedSwfPath) }}
          disabled={selectedSwfPath == "" ? true : false} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-spoof-column"]}>
        <input className={styles["topBar-spoof-checkbox"]} type='checkbox' onChange={(e) => { setGlobalSpoofEnabled(e.target.checked)}}/>
        <img className={styles["topBar-spoof-icon"]} src={getAssetPath('globe.svg')}/>
        <input
          className={styles["topBar-spoof-url-textbox"]}
          type='text'
          placeholder='Global Spoof Url...'
          alt="Global Spoof Url"
          disabled={!globalSpoofEnabled}
        />
      </div>
    </div>
  );
}

export default TopBar;