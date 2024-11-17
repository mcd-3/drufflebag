import { useEffect } from 'react';
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
import { confirm } from '@tauri-apps/plugin-dialog';
import { getBroadcastChannel, evtCloseEmulation, closeBroadcastChanel } from './../../utils/broadcast.js';
import "./../../styles/Emulation.css";

function EmulationContent() {
  const unlisten = getCurrentWindow().onCloseRequested(async (event) => {
    const confirmed = await confirm(
      'Any unsaved changes will be lost.',
      { title: 'Stop emulation?', kind: 'warning' }
    );
    if (!confirmed) {
      event.preventDefault();
    } else {
      const broadcastChannel = getBroadcastChannel();
      evtCloseEmulation({ broadcastChannel });
      closeBroadcastChanel({ broadcastChannel });
    }
  });

  const mountRuffle = () => {
    const script = document.createElement("script");

    script.src = "ruffle-core/ruffle.js";
    script.async = true;

    script.onload = () => {
      window.RufflePlayer = window.RufflePlayer || {};
      const ruffle = window.RufflePlayer.newest();
      const player = ruffle.createPlayer();

      player.config = {
        autoplay: "auto",
        splashScreen: false,
      }

      const container = document.getElementById("ruffle-container");
      container.appendChild(player);

      // TODO: There's a bug where a duplicate instance of Ruffle is created
      //        Remove it manually for now until the bug is found and fixed
      try {
        const duplicate = document.getElementsByTagName('ruffle-player-1');
        console.log(duplicate);
        duplicate[0].parentNode.removeChild(duplicate[0])
      } catch (e) { }

      player.load("/public/play.temp.swf");

      player.addEventListener('loadedmetadata', () => {
        console.info(player.metadata);
        if (player.metadata.width && player.metadata.height) {
          getCurrentWindow().setSize(new LogicalSize(player.metadata.width, player.metadata.height));
        }
      })
    };

    document.body.appendChild(script);

    return script;
  }

  useEffect(() => {
    const ruffleScript = mountRuffle();

    return () => {
      // Remove script tag from body
      document.body.removeChild(ruffleScript);
      // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
      unlisten.then(() => {});
    };
  }, []);

  return (
    <div id="ruffle-container" className="container">

    </div>
  );
}

export default EmulationContent;
