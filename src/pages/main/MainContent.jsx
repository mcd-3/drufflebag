import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./../../styles/App.css";

import Iconbutton from "./../../components/iconButton";
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
        <div className="nav-left">
          <TopBar />
          <p>Top Level Buttons (Open, Scan Directory, Settings)</p>
        </div>
        <div className="nav-right">
          <p>If "Global URL" is set in settings, show this</p>
          <p>URL: [ url... ]</p>
        </div>
      </div>
      <div className="swf-content-table">
        <table>
          <tr>
            <th>Name</th>
          </tr>
          <tr>
            <td><button onClick={() => greet()}>Duck Life</button></td>

          </tr>
        </table>
      </div>
    </div>
  );
}

export default MainContent;
