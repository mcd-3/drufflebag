import { useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import "./../../styles/Emulation.css";

function EmulationContent() {
  const bc = new BroadcastChannel("drufflebag_channel");

  const mountRuffle = () => {
    const script = document.createElement("script");

    script.src = "ruffle-core/ruffle.js";
    script.async = true;

    document.body.appendChild(script);
  }

  const play = () => {
    window.RufflePlayer = window.RufflePlayer || {};
    window.addEventListener("load", (event) => {
        const ruffle = window.RufflePlayer.newest();
        const player = ruffle.createPlayer();

        player.config = {
          autoplay: "auto",
          // and so on...
        }

        const container = document.getElementById("ruffle-container");
        container.appendChild(player);
        player.load("/the-worlds-hardest-game.swf");
    });
  }

  useEffect(() => {
    mountRuffle();
    play();
  }, []);

  return (
    <div id="ruffle-container" className="container">

    </div>
  );
}

export default EmulationContent;
