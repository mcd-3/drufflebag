import { useState, useEffect } from "react";
import { topBar } from './../styles';
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
  getDirectorySwfCount,
} from './../utils/invoker.js';
import { insertSWF, getSWFByHash } from './../utils/database.js';
import { getAsset } from './../utils/assets.js';
import Swf from "../models/swf.js";
import IconButton from './iconButton';
import { Locale } from "../locales/index.js";
import { listenEvtUpdatePlayButton, emitEvtCloseEmulation } from "../utils/events.js";

const {
  ICON_BUTTON_ABOUT,
  ICON_BUTTON_OPEN,
  ICON_BUTTON_PLAY,
  ICON_BUTTON_REFRESH,
  ICON_BUTTON_SETTINGS,
  ICON_BUTTON_STOP,
  TITLE_BUTTON_PLAY,
  TITLE_BUTTON_REFRESH,
  TITLE_BUTTON_SCAN_DIRECTORY,
  TITLE_BUTTON_STOP,
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
  setSwfFilesFound,
  playSwfEvt,
}) => {
  const [globalSpoof, setGlobalSpoof] = useState({ isEnabled: false, url: '' });

  const unlistenUpdatePlayButton = listenEvtUpdatePlayButton(() => setRuffleOpen(false));

  useEffect(() => {
    const globalSpoofStored = getGlobalSpoofUrl();

    if (globalSpoofStored) {
      setGlobalSpoof({
        isEnabled: globalSpoofStored.isEnabled,
        url: globalSpoofStored.urlSpoof,
      });
    }

    return () => {
      unlistenUpdatePlayButton.then(f => f());
    }
  }, [
    setSwfFiles,
    selectedSwfPath,
    ruffleOpen,
    setRuffleOpen,
    setCacheIsLoading,
    setSwfFilesScanned,
    setSwfFilesFound,
    playSwfEvt
  ]);

  const scanSwfDirectory = async (cachedDirectoryPath = "") => {
    setCacheIsLoading(true);
    setSwfFilesScanned(0);

    // Need to call this to count the total SWF files first
    const swfFilesFound = await getDirectorySwfCount(cachedDirectoryPath);
    setSwfFilesFound(swfFilesFound);

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
    <div className={topBar.root}>
      <div className={topBar.fileColumn}>
        <IconButton
          className={topBar.openButton}
          text={ ICON_BUTTON_OPEN }
          title={ TITLE_BUTTON_SCAN_DIRECTORY }
          src={getAsset("ICN_FOLDER")}
          onClick={async () => {
            scanSwfDirectory();
          }} />
        <IconButton
          className={topBar.refreshButton}
          text={ ICON_BUTTON_REFRESH }
          title={ TITLE_BUTTON_REFRESH }
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
      <div className={topBar.divider} />
      <div className={topBar.controlColumn}>
        <IconButton
          className={topBar.pauseButton}
          text={ruffleOpen ? ICON_BUTTON_STOP : ICON_BUTTON_PLAY}
          src={ruffleOpen ? getAsset("ICN_STOP") : getAsset("ICN_PLAY")}
          title={ruffleOpen ? TITLE_BUTTON_STOP : TITLE_BUTTON_PLAY }
          onClick={() => {
            if (ruffleOpen) {
              emitEvtCloseEmulation();
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
      <div className={topBar.divider} />
      <div className={topBar.moreColumn}>
        <IconButton
            className={topBar.settingsButton}
            text={ ICON_BUTTON_SETTINGS }
            src={getAsset("ICN_SETTINGS")}
            onClick={ () => { openSettings() }} />
        <IconButton
          className={topBar.aboutButton}
          text={ ICON_BUTTON_ABOUT }
          src={getAsset("ICN_ABOUT")}
          onClick={ () => { openAbout() }} />
      </div>
      <div className={topBar.divider} />
      {/* <div className={topBar.spoofColumn}>
        <input
          className={topBar.spoofCheckbox}
          type='checkbox'
          checked={globalSpoof.isEnabled}
          onChange={(e) => {
            setGlobalSpoof({ url: globalSpoof.url, isEnabled: e.target.checked});
          }}/>
        <img className={topBar.spoofIcon} src={getAsset("ICN_GLOBE")}/>
        <input
          className={topBar.spoofUrlTextbox}
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