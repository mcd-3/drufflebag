import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";
import NoItemsBox from "../../components/noItemsBox";

function MainContent() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [swfFiles, setSwfFiles] = useState([]);
  const [selectedSwfPath, setSelectedSwfPath] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet", { name }));
    await invoke("open_ruffle");
  }

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
      <div className="swf-content-table">
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
