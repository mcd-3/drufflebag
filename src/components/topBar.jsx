import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import {
  getBroadcastChannel,
  injectOnUpdatePlayButton,
  evtCloseEmulation,
} from './../utils/broadcast.js';
import {
  setCachedDirectory,
  getCachedDirectory,
  setGlobalSpoofUrl,
  getGlobalSpoofUrl
} from './../utils/storage.js';
import { insertSWF, getSWFByHash } from './../utils/database.js';
import { makeSwfJSON } from './../utils/swf.js';
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

  injectOnUpdatePlayButton({
    broadcastChannel: getBroadcastChannel(),
    onUpdatePlayButton: () => {
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

  const launch_ruffle = (swfName) => {
    invoke("copy_to_public", { swfAbsolutePath: swfName });
    invoke("open_ruffle", { swfName: swfName.split('/').pop() });
    setRuffleOpen(true);
  }

  const openSettings = () => {
    invoke("open_settings");
  };

  const scanDirectory = async (cachedDirectoryPath = "") => {
    const files = await invoke("scan_directory", { cachedDirectoryPath });
    if (files.swfs.length > 0) {
      const cacheToWrite = [];

      for await (const swf of files.swfs) {
        const swfResult = await getSWFByHash(`${swf['md5_hash']}`);
        let swfJSON;

        if (swfResult.length == 0) {
          swfJSON = makeSwfJSON({
            avm: 0,
            name: swf.path.split('/').pop(),
            path: swf.path,
            md5_hash: swf['md5_hash'],
            type: null,
            size: swf.size,
            lp: null,
            status: null,
            url: ''
          });

          await insertSWF(swfJSON);
        } else {
          const firstResult = swfResult[0];
          swfJSON = makeSwfJSON({
            avm: !firstResult['avm_id'] ? 0 : firstResult['avm_id'],
            name: firstResult.name,
            path: swf.path,
            md5_hash: firstResult['md5_hash'],
            type: !firstResult['type_id'] ? "" : firstResult['type_id'],
            size: firstResult['file_size_bytes'],
            lp: !firstResult['last_played_date'] ? "" : firstResult['last_played_date'],
            status: !firstResult['status_id'] ? "" : firstResult['status_id'],
            url: !firstResult['spoofed_url'] ? "" : firstResult['spoofed_url'],
          })
        }
        
        cacheToWrite.push(swfJSON);
      }

      setCachedDirectory(files.parent_dir);
      writeJsonCache(cacheToWrite);
    }
    setSwfFiles(files.swfs);
  }

  return (
    <div className={styles["topBar-root"]}>
      <div className={styles["topBar-file-column"]}>
        <IconButton
          className={styles["topBar-open-button"]}
          text="Open"
          src={getAssetPath('folder.svg')}
          onClick={async () => {
            scanDirectory();
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
            scanDirectory(directory);
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
              evtCloseEmulation({ broadcastChannel: getBroadcastChannel() })
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