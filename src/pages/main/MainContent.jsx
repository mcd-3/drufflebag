import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { appDataDir } from '@tauri-apps/api/path';
import { listen } from '@tauri-apps/api/event';
import { writeJsonCache, openRuffle, exitApp } from './../../utils/invoker.js';
import { getAsset } from './../../utils/assets.js';
import {
  listenEvtUpdateSwfByHash,
  listenEvtUpdateSwfCount,
} from './../../utils/events.js';
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";
import NoItemsBox from "../../components/noItemsBox";
import { Locale } from "../../locales/index.js";

const {
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

  const unlisten = getCurrentWindow().onCloseRequested(
    async (event) => {
      event.preventDefault();
      exitApp();
    }
  );

  listenEvtUpdateSwfCount((payload) => setSwfFilesScanned(payload.count));

  listenEvtUpdateSwfByHash((payload) => {
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

    return () => {
      unlisten.then(() => {});
    };
  }, []);

  const launchRuffle = (swfPath, swfName) => {
    if (!ruffleOpen) {
      setSelectedSwfPath(swfPath);
      openRuffle(swfName);
      setRuffleOpen(true);
    }
  };

  return (
    <div>
      <div className="top-level-nav">
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
        `${swfFiles.length > 0 && !cacheIsLoading ? "has-items" : "no-items"} swf-content-table`
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
