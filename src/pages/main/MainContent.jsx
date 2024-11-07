import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";

function MainContent() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [swfFiles, setSwfFiles] = useState([]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet", { name }));
    await invoke("open_ruffle");
  }

  const formatBytes = (bytes, decimals = 2) => {
    // This should never be less than 0, but check just in case
    if (bytes <= 0) {
      return '0 Bytes'
    }

    const kilo = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];

    const sizesIndex = Math.floor(Math.log(bytes) / Math.log(kilo));

    return `${parseFloat((bytes / Math.pow(kilo, sizesIndex)).toFixed(dm))} ${sizes[sizesIndex]}`;
}

  return (
    <div>
      <div className="top-level-nav">
        <TopBar 
          setSwfFiles={setSwfFiles}
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
                console.log(swf)
                return (
                  <tr>
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
