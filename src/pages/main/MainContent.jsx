import { useState, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { appDataDir } from '@tauri-apps/api/path';
import { main } from './../../styles'
import { writeJsonCache, openRuffle, exitApp } from './../../utils/invoker.js';
import { getAsset } from './../../utils/assets.js';
import {
  listenEvtUpdateSwfByHash,
  listenEvtUpdateSwfCount,
  listenSingleInstance,
} from './../../utils/events.js';
import {
  setCurrentlyPlayingSwfPath,
} from './../../utils/storage.js';

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";
import NoItemsBox from "../../components/noItemsBox";
import { Locale } from "../../locales/index.js";

const {
  ALERT_ALREADY_RUNNING_WARNING,
  DESCRIPTION_MAIN_CLICK_OPEN,
  DESCRIPTION_MAIN_PLEASE_WAIT,
  HEADER_MAIN_LOADING,
  HEADER_MAIN_NO_SWF,
} = Locale;

function MainContent() {
  const [cacheIsLoading, setCacheIsLoading] = useState(true);
  const [swfFiles, setSwfFiles] = useState([]);
  const [selectedSwfPath, setSelectedSwfPath] = useState("");
  const [ruffleOpen, setRuffleOpen] = useState(false);
  const [swfFilesScanned, setSwfFilesScanned] = useState(0);
  const [swfFilesFound, setSwfFilesFound] = useState(0);

  const launchRuffle = useCallback((swfPath, swfName) => {
    if (!ruffleOpen) {
      setSelectedSwfPath(swfPath);
      openRuffle(swfName);
      setRuffleOpen(true);
    }
  });

  const unlistenOnCloseRequested = getCurrentWindow().onCloseRequested(
    async (event) => {
      event.preventDefault();
      exitApp();
    }
  );

  const unlistenUpdateSwfCount = listenEvtUpdateSwfCount((payload) => setSwfFilesScanned(payload.count));

  const unlistenUpdateSwfByHash = listenEvtUpdateSwfByHash((payload) => {
    for (let i = 0; i < swfFiles.length; i++) {
      if (swfFiles[i]['md5_hash'] === payload.hash) {
        const newArray = swfFiles.slice();
        newArray[i].avm = parseInt(payload.avm);
        newArray[i].lp = payload.date;
        setSwfFiles([...newArray]);
        writeJsonCache([...newArray]);
        break;
      }
    }
  });

  // Note: only works if app is already open
  // BUG: Multiple instances of the window + alert appear. Alert pops up more if launched a second/third+ time
  //      Shows up on Strict Mode
  const unlistenSingleInstance = listenSingleInstance((payload) => {
    if (payload.payload.args) {
      payload.payload.args.forEach((item) => {
        if (typeof item === "string" && item.endsWith('.swf')) {
          if (!ruffleOpen) {
            setCurrentlyPlayingSwfPath(item);
            launchRuffle(item, item);
          } else {
            alert(ALERT_ALREADY_RUNNING_WARNING);
          }
        }
      })
    }
  })

  useEffect(() => {
    return () => {
      unlistenOnCloseRequested.then(f => f());
      unlistenUpdateSwfByHash.then(f => f());
      unlistenUpdateSwfCount.then(f => f());
      unlistenSingleInstance.then(f => f())
    };
  }, [
    cacheIsLoading,
    swfFiles,
    selectedSwfPath,
    ruffleOpen,
    swfFilesScanned,
    swfFilesFound
  ]);

  useEffect(() => {
    setCacheIsLoading(true);
    appDataDir().then((dir, err) => {
      return invoke('c_get_cached_swfs', { appDataDir: dir });
    }).then((cache, err) => {
      if (!err && cache.length > 0) {
        setSwfFiles(cache);
      } else {
        setSwfFiles([]);
      }
      setCacheIsLoading(false);
    });
  }, [setCacheIsLoading, setSwfFiles]);

  return (
    <div>
      <div className={main.topLevelNav}>
        <TopBar 
          setSwfFiles={setSwfFiles}
          selectedSwfPath={selectedSwfPath}
          ruffleOpen={ruffleOpen}
          setRuffleOpen={setRuffleOpen}
          setCacheIsLoading={setCacheIsLoading}
          setSwfFilesScanned={setSwfFilesScanned}
          setSwfFilesFound={setSwfFilesFound}
          playSwfEvt={launchRuffle}
        />
      </div>
      <div className={
        `${swfFiles.length > 0 && !cacheIsLoading ? main.hasItems : main.noItems} ${main.contentTable}`
      }>
        {swfFiles.length > 0 && !cacheIsLoading
          ?
            <SwfTable
              swfFiles={swfFiles}
              setSwfFiles={setSwfFiles}
              setSelectedSwfPath={setSelectedSwfPath}
              playSwfEvt={launchRuffle}
            />
          :
            <NoItemsBox
              topText={cacheIsLoading ? HEADER_MAIN_LOADING : HEADER_MAIN_NO_SWF}
              bottomText={cacheIsLoading ? DESCRIPTION_MAIN_PLEASE_WAIT : DESCRIPTION_MAIN_CLICK_OPEN}
              extraText={cacheIsLoading ? `Loading ${swfFilesScanned} / ${swfFilesFound} SWFs...` : ""}
              icon={cacheIsLoading ? getAsset('GIF_LOADING') : getAsset('ICN_FILE_NOT_FOUND')} />
        }
      </div>
    </div>
  );
}

export default MainContent;
