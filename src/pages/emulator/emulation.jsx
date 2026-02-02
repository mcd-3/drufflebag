import ReactDOM from "react-dom/client";
import EmulationContent from "./EmulationContent";
import { getCurrentWindow } from '@tauri-apps/api/window';

// Listen for fullscreen shortcut
window.addEventListener('keydown', async (e) => {
  if (e.altKey && e.key === 'Enter') {
    const win = getCurrentWindow();
    const isFullscreen = await win.isFullscreen();
    win.setFullscreen(!isFullscreen);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <EmulationContent />
);
