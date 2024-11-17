import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
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
