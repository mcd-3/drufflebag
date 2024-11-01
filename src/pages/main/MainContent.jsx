import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../../styles/App.css";

import TopBar from "../../components/topBar";

function MainContent() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet", { name }));
    await invoke("open_ruffle");
  }

  return (
    <div>
      <div className="top-level-nav">
        <TopBar />
      </div>
      <div className="swf-content-table">
        <table>
          <thead>
            <tr>
              <th>ASV</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Last Played</th>
              <th>URL Spoof</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 (image)</td>
              <td><button onClick={() => greet()}>Duck Life</button></td>
              <td>Game (Select)</td>
              <td>253 kb</td>
              <td>June 23, 2024</td>
              <td>ducklife.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainContent;
