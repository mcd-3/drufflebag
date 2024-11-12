import { useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import "./../../styles/Emulation.css";

function EmulationContent() {
  const bc = new BroadcastChannel("drufflebag_channel");

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
        // and so on...
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

      player.load("/the-worlds-hardest-game.swf");
    };

    document.body.appendChild(script);

    return script;
  }

  useEffect(() => {
    const ruffleScript = mountRuffle();

    return () => {
      // Remove script tag from body
      document.body.removeChild(ruffleScript);
    };
  }, []);

  return (
    <div id="ruffle-container" className="container">

    </div>
  );
}

export default EmulationContent;
