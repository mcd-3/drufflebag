import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { appDataDir } from '@tauri-apps/api/path';
import { injectOnUpdateSwfByHash, getBroadcastChannel } from './../../utils/broadcast.js';
import { writeJsonCache, openRuffle } from './../../utils/invoker.js';
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";
import NoItemsBox from "../../components/noItemsBox";

function MainContent() {
  const [cacheIsLoading, setCacheIsLoading] = useState(true);
  const [swfFiles, setSwfFiles] = useState([]);
  const [selectedSwfPath, setSelectedSwfPath] = useState("");
  const [ruffleOpen, setRuffleOpen] = useState(false);

  useEffect(() => {
    setCacheIsLoading(true);
    appDataDir().then((dir, err) => {
      return invoke('get_cached_swfs', { appDataDir: dir });
    }).then((cache, err) => {
      if (!err && cache.length > 0) {
        setSwfFiles(cache);
      } else {
        setSwfFiles([]);
      }
      setCacheIsLoading(false);
    });

    return () => {

    };
  }, []);

  const launchRuffle = (swfPath, swfName) => {
    if (!ruffleOpen) {
      setSelectedSwfPath(swfPath);
      openRuffle(swfName);
      setRuffleOpen(true);
    }
  };

  injectOnUpdateSwfByHash({
    broadcastChannel: getBroadcastChannel(),
    onUpdateSwfByHash: async (params) => {
      for (let i = 0; i < swfFiles.length; i++) {
        if (swfFiles[i]['md5_hash'] === params[0]) {
          const newArray = swfFiles.slice();
          newArray[i].avm = parseInt(params[1]);
          newArray[i].lp = params[2];
          setSwfFiles([...newArray]);
          writeJsonCache([...newArray]);
          break;
        }
      }
    } 
  });

  return (
    <div>
      <div className="top-level-nav">
        <TopBar 
          setSwfFiles={setSwfFiles}
          selectedSwfPath={selectedSwfPath}
          ruffleOpen={ruffleOpen}
          setRuffleOpen={setRuffleOpen}
          setCacheIsLoading={setCacheIsLoading}
          playSwfEvt={launchRuffle}
        />
      </div>
      <div className={`${swfFiles.length > 0 ? "has-items" : "no-items"} swf-content-table`}>
        {swfFiles.length > 0 && !cacheIsLoading
          ?
            <SwfTable
              swfFiles={swfFiles}
              setSwfFiles={setSwfFiles}
              setSelectedSwfPath={setSelectedSwfPath}
              playSwfEvt={launchRuffle}
            />
          :
            <NoItemsBox isLoading={cacheIsLoading}/>
        }
      </div>
    </div>
  );
}

export default MainContent;
