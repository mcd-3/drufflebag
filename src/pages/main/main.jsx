import React from "react";
import ReactDOM from "react-dom/client";
import { getSettingsJSON } from './../../utils/settings.js'
import MainContent from "./MainContent";
import {
  openQuickstart,
} from './../../utils/invoker.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainContent />
  </React.StrictMode>,
);

// Note: This opens the Quickstart Guide
//       Strict mode inteferes with this, so keep this logic here
(() => {
  const { quickstartEnabled } = getSettingsJSON();

  if (quickstartEnabled) {
    openQuickstart();
  }
})();
