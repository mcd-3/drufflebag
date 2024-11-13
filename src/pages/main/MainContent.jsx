import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { formatBytes } from './../../utils/bytes.js';
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";

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

  return (
    <div>
      <div className="top-level-nav">
        <TopBar 
          setSwfFiles={setSwfFiles}
          selectedSwfPath={selectedSwfPath}
        />
      </div>
      <div className="swf-content-table">
        <SwfTable>
          <thead>
            <tr>
              <th>AVM</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Last Played</th>
              <th>URL Spoof</th>
            </tr>
          </thead>
          <tbody>
            {
              swfFiles.map((swf) => {
                return (
                  <tr onClick={() => { setSelectedSwfPath(swf.path) }}>
                    <td><img src="public/avm_unknown.svg" width={32} height={32} /></td>
                    <td>{swf.path.split('/').pop()}</td>
                    <td>Animation</td>
                    <td>{formatBytes(swf.size)}</td>
                    <td>June 23, 2024</td>
                    <td>ducklife.com</td>
                  </tr>
                )
              })
            }
            <tr>
              <td><img src="public/avm2.svg"  width={32} height={32} /></td>
              <td><button onClick={() => greet()}>That Gravity Game</button></td>
              <td>Game (Select)</td>
              <td>543 kb</td>
              <td>November 4, 2024</td>
              <td>moegames.com</td>
            </tr>
            <tr>
              <td><img src="public/avm1.svg"  width={32} height={32} /></td>
              <td><button onClick={() => greet()}>Red Ball</button></td>
              <td>Game (Select)</td>
              <td>123 kb</td>
              <td>April 20, 2024</td>
              <td>king.com</td>
            </tr>
          </tbody>
        </SwfTable>
      </div>
    </div>
  );
}

export default MainContent;
