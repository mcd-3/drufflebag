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
  setSwfFiles
}) => {
  const [globalSpoofEnabled, setGlobalSpoofEnabled] = useState(false);

  // TODO: Move this function
  const getAssetPath = assetFileName => {
    return `src/assets/${assetFileName}`;
  };

  return (
    <div className={styles["topBar-root"]}>
      <div className={styles["topBar-file-column"]}>
        <IconButton
          className={styles["topBar-open-button"]}
          text="Open"
          src={getAssetPath('folder.svg')}
          onClick={async () => {
            const files = await invoke("scan_directory");
            setSwfFiles(files);
          }} />
        <IconButton
          className={styles["topBar-refresh-button"]}
          text="Refresh"
          src={getAssetPath('refresh-double.svg')}
          onClick={() => { console.error('dfg'); }} />
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
          text="Play"
          src={getAssetPath('play.svg')} />
        <IconButton
          className={styles["topBar-stop-button"]}
          text="Stop"
          src={getAssetPath('square.svg')} />
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