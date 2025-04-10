import { useEffect, useState } from 'react';
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
import { confirm } from '@tauri-apps/plugin-dialog';
import { invoke, convertFileSrc } from "@tauri-apps/api/core";
import {
  getBroadcastChannel,
  closeBroadcastChanel,
  evtUpdatePlayButton,
  evtUpdateSwfByHash,
  injectOnEmulatorClose,
} from './../../utils/broadcast.js';
import { getSettingsJSON } from './../../utils/settings.js';
import { getCurrentlyPlayingSwfPath } from './../../utils/storage.js';
import { updateSWFDateAVMByHash } from './../../utils/database.js';
import NoItemsBox from './../../components/noItemsBox.jsx';
import "./../../styles/Emulation.css";
import { getAsset } from '../../utils/assets.js';

function EmulationContent() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState({
    topText: "An Error has Occured",
    bottomText: "Please close this window and try again.",
  })

  const settings = getSettingsJSON();

  const unlisten = getCurrentWindow().onCloseRequested(async (event) => {
    const confirmed = await confirm(
      'Any unsaved changes will be lost.',
      { title: 'Stop emulation?', kind: 'warning' }
    );
    if (!confirmed) {
      event.preventDefault();
    } else {
      const broadcastChannel = getBroadcastChannel();
      evtUpdatePlayButton({ broadcastChannel });
      closeBroadcastChanel({ broadcastChannel });
    }
  });

  injectOnEmulatorClose({
    broadcastChannel: getBroadcastChannel(),
    onEmulatorClose: async () => {
      const confirmed = await confirm(
        'Any unsaved changes will be lost.',
        { title: 'Stop emulation?', kind: 'warning' }
      );
      if (confirmed) {
        evtUpdatePlayButton({ broadcastChannel: getBroadcastChannel() });
        getCurrentWindow().destroy();
      }
    }
  });

  const mountRuffle = () => {
    const script = document.createElement("script");
    const swfFilePath = convertFileSrc(
      getCurrentlyPlayingSwfPath()
        .replaceAll("\\", "/")
    );

    if (settings.onlineModeEnabled) {
      // Need to check online connectivity first
      if (!window.navigator.onLine) {
        setHasError(true);
        setError({
          ...error,
          bottomText: 
            "You must be connected to the Internet to use Online Mode. "
            + "You can disable Online Mode in the Settings if this was set by mistake."
          })
      } else {
        script.src = "https://unpkg.com/@ruffle-rs/ruffle"
      }
    } else {
      script.src = "public/ruffle-core/ruffle.js";
    }
    script.async = true;

    script.onload = () => {
      window.RufflePlayer = window.RufflePlayer || {};
      const ruffle = window.RufflePlayer.newest();
      const player = ruffle.createPlayer();

      player.config = {
        autoplay: settings.autoplayEnabled ? "on" : "off",
        splashScreen: settings.splashscreenEnabled,
      }

      const container = document.getElementById("ruffle-container");
      container.appendChild(player);

      // TODO: There's a bug where a duplicate instance of Ruffle is created
      //        Remove it manually for now until the bug is found and fixed
      try {
        const duplicate = document.getElementsByTagName('ruffle-player-1');
        duplicate[0].parentNode.removeChild(duplicate[0])
      } catch (e) { }

      player.load(swfFilePath);

      player.addEventListener('loadedmetadata', () => {
        if (player.metadata.width && player.metadata.height) {
          const scale = settings.emulationScale;
          getCurrentWindow().setSize(new LogicalSize(player.metadata.width * scale, player.metadata.height * scale));
        }

        // Asynchronously update the cache and DB to have the correct AVM version & date last played
        invoke(
          "get_swf_hash",
          { swfAbsolutePath: getCurrentlyPlayingSwfPath() }
        ).then((hash) => {
          const avm = player.metadata.isActionScript3 ? 2 : 1;
          const date = Math.floor(Date.now() / 1000);

          updateSWFDateAVMByHash({
            hash,
            avm,
            date,
          });

          evtUpdateSwfByHash({
            broadcastChannel: getBroadcastChannel(),
            hash,
            avm,
            date,
          });
        });
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
    <div>
      { !hasError
        ?
          <div id="ruffle-container" className="container"></div>
        :
          <NoItemsBox
            topText={error.topText}
            bottomText={error.bottomText}
            icon={getAsset('ICN_WARNING_TRIANGLE')}
            />
      }
    </div>
  );
}

export default EmulationContent;
