import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { injectOnUpdateSwfByHash, getBroadcastChannel } from './../../utils/broadcast.js';
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";
import NoItemsBox from "../../components/noItemsBox";

function MainContent() {
  const [swfFiles, setSwfFiles] = useState([]);
  const [selectedSwfPath, setSelectedSwfPath] = useState("");

  useEffect(() => {
    invoke('get_cached_swfs').then((cache, err) => {
      if (!err && cache.length > 0) {
        setSwfFiles(cache);
      } else {
        setSwfFiles([]);
      }
    });

    return () => {

    };
  }, []);

  injectOnUpdateSwfByHash({
    broadcastChannel: getBroadcastChannel(),
    onUpdateSwfByHash: async (params) => {
      for (let i = 0; i < swfFiles.length; i++) {
        if (swfFiles[i]['md5_hash'] === params[0]) {
          const newArray = swfFiles.slice();
          newArray[i].avm = parseInt(params[1]);
          newArray[i].lp = params[2];
          setSwfFiles([...newArray]);
          await invoke("cache_swfs", { swfs: [...newArray] });
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
        />
      </div>
      <div className={`${swfFiles.length > 0 ? "has-items" : "no-items"} swf-content-table`}>
        {swfFiles.length > 0 
          ?
            <SwfTable swfFiles={swfFiles} setSelectedSwfPath={setSelectedSwfPath}/>
          :
            <NoItemsBox />
        }
      </div>
    </div>
  );
}

export default MainContent;
