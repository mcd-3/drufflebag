import { useState, useEffect } from "react";
import {
  getBroadcastChannel,
  injectOnUpdatePlayButton,
  evtCloseEmulation,
} from './../utils/broadcast.js';
import {
  setCachedDirectory,
  getCachedDirectory,
  setGlobalSpoofUrl,
  getGlobalSpoofUrl,
  setCurrentlyPlayingSwfPath,
} from './../utils/storage.js';
import {
  openSettings,
  openAbout,
  writeJsonCache,
  scanDirectory,
} from './../utils/invoker.js';
import { insertSWF, getSWFByHash } from './../utils/database.js';
import { getAsset } from './../utils/assets.js';
import Swf from "../models/swf.js";
import IconButton from './iconButton';
import styles from './../styles/components/topBar.module.css';
import { Locale } from "../locales/index.js";

const {
  ICON_BUTTON_ABOUT,
  ICON_BUTTON_OPEN,
  ICON_BUTTON_PLAY,
  ICON_BUTTON_REFRESH,
  ICON_BUTTON_SETTINGS,
  ICON_BUTTON_STOP,
} = Locale;

/**
 * Bar that display a list of controls and options
 *
 * @returns {}
 */
const TopBar = ({
  setSwfFiles,
  selectedSwfPath,
  ruffleOpen,
  setRuffleOpen,
  setCacheIsLoading,
  setSwfFilesScanned,
  playSwfEvt,
}) => {
  const [globalSpoof, setGlobalSpoof] = useState({ isEnabled: false, url: '' });

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
  }, []);

  const scanSwfDirectory = async (cachedDirectoryPath = "") => {
    setCacheIsLoading(true);
    setSwfFilesScanned(0);
    const files = await scanDirectory(cachedDirectoryPath);

    if (files.cancelled) {
      setCacheIsLoading(false);
      return;
    }

    const cacheToWrite = [];
    if (files.swfs.length > 0) {
      for await (const swf of files.swfs) {
        const swfResult = await getSWFByHash(`${swf['md5_hash']}`);
        let swfObj;

        if (swfResult === null) {
          swfObj = new Swf({
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

          await insertSWF(swfObj);
        } else {
          swfObj = swfResult;
          swfObj.path = swf.path;
        }

        cacheToWrite.push(swfObj);
      }

      setCachedDirectory(files.parent_dir);
      writeJsonCache(cacheToWrite);
    }
    setSwfFiles(cacheToWrite);
    setCacheIsLoading(false);
  }

  return (
    <div className={styles["topBar-root"]}>
      <div className={styles["topBar-file-column"]}>
        <IconButton
          className={styles["topBar-open-button"]}
          text={ ICON_BUTTON_OPEN }
          src={getAsset("ICN_FOLDER")}
          onClick={async () => {
            scanSwfDirectory();
          }} />
        <IconButton
          className={styles["topBar-refresh-button"]}
          text={ ICON_BUTTON_REFRESH }
          src={getAsset("ICN_REFRESH")}
          onClick={async () => {
            const directory = getCachedDirectory();
            if (!directory) {
              // TODO: Show a warning alert
              return;
            }
            scanSwfDirectory(directory);
          }} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-control-column"]}>
        <IconButton
          className={styles["topBar-pause-button"]}
          text={ruffleOpen ? ICON_BUTTON_STOP : ICON_BUTTON_PLAY}
          src={ruffleOpen ? getAsset("ICN_STOP") : getAsset("ICN_PLAY")}
          onClick={() => {
            if (ruffleOpen) {
              evtCloseEmulation({ broadcastChannel: getBroadcastChannel() })
            } else {
              setCurrentlyPlayingSwfPath(selectedSwfPath);
              playSwfEvt(selectedSwfPath, selectedSwfPath.split('/').pop())
              setGlobalSpoofUrl({
                isEnabled: globalSpoof.isEnabled,
                urlSpoof: globalSpoof.url,
              });
            }
          }}
          disabled={selectedSwfPath == "" ? true : false} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      <div className={styles["topBar-more-column"]}>
        <IconButton
            className={styles["topBar-settings-button"]}
            text={ ICON_BUTTON_SETTINGS }
            src={getAsset("ICN_SETTINGS")}
            onClick={ () => { openSettings() }} />
        <IconButton
          className={styles["topBar-about-button"]}
          text={ ICON_BUTTON_ABOUT }
          src={getAsset("ICN_ABOUT")}
          onClick={ () => { openAbout() }} />
      </div>
      <div className={styles["topBar-vertical-divider"]}></div>
      {/* <div className={styles["topBar-spoof-column"]}>
        <input
          className={styles["topBar-spoof-checkbox"]}
          type='checkbox'
          checked={globalSpoof.isEnabled}
          onChange={(e) => {
            setGlobalSpoof({ url: globalSpoof.url, isEnabled: e.target.checked});
          }}/>
        <img className={styles["topBar-spoof-icon"]} src={getAsset("ICN_GLOBE")}/>
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
      </div> */}
    </div>
  );
}

export default TopBar;