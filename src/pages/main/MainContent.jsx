import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../../styles/App.css";

import TopBar from "../../components/topBar";
import SwfTable from "../../components/swfTable";

function MainContent() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet", { name }));
    await invoke("open_ruffle");
  }

  const scan_directory = async () => {
    const i = await invoke("scan_directory");

    console.error(i);
  }

  return (
    <div>
      <div className="top-level-nav">
        <TopBar />
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
            <tr>
              <td><img src="public/AVM1.png" /></td>
              <td><button onClick={() => greet()}>Duck Life</button></td>
              <td>Game (Select)</td>
              <td>253 kb</td>
              <td>June 23, 2024</td>
              <td>ducklife.com</td>
            </tr>
            <tr>
              <td><img src="public/AVM2.png" /></td>
              <td><button onClick={() => greet()}>That Gravity Game</button></td>
              <td>Game (Select)</td>
              <td>543 kb</td>
              <td>November 4, 2024</td>
              <td>moegames.com</td>
            </tr>
            <tr>
              <td><img src="public/AVM1.png" /></td>
              <td><button onClick={() => scan_directory()}>Red Ball</button></td>
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
