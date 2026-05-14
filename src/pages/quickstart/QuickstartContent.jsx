import { useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { openUrl } from '@tauri-apps/plugin-opener';
import {
  getSettingsJSON,
  saveSettings,
} from './../../utils/settings.js';
import { quickstart as quickstartStyles } from './../../styles';
import { Locale } from '../../locales';

const {
  BUTTON_CLOSE,
  DESCRIPTION_SETTINGS_QUICKSTART,
  DESCRIPTION_QUICKSTART,
  HEADER_WELCOME,
  LIST_HOW_TO_1,
  LIST_HOW_TO_2,
  LIST_HOW_TO_3,
  LIST_HOW_TO_4,
  LIST_HOW_TO_5,
  TEXT_HOW_TO,
  TEXT_RUFFLE,
} = Locale

function QuickstartContent() {
  const config = getSettingsJSON();
  const [settings, setSettings] = useState(config);

  return (
    <div>
      <div className={quickstartStyles.row}>
        <h2 className={quickstartStyles.header}>{HEADER_WELCOME}</h2>
        <span>{DESCRIPTION_QUICKSTART} <a onClick={() => openUrl("https://ruffle.rs/")} className={quickstartStyles.link}>{TEXT_RUFFLE}</a></span>
      </div>

      <div className={quickstartStyles.list}>
        <span>{TEXT_HOW_TO}</span>
        <ul>
          <li>{LIST_HOW_TO_1}</li>
          <li>{LIST_HOW_TO_2}</li>
          <li>{LIST_HOW_TO_3}</li>
          <li>{LIST_HOW_TO_4}</li>
          <li>{LIST_HOW_TO_5}</li>
        </ul>
      </div>

      <div className={quickstartStyles.row}>
        <input
          type="checkbox"
          className={quickstartStyles.inputCheckbox}
          name="setting_guide"
          checked={!settings.quickstartEnabled}
          onChange={(evt) => {
            setSettings({
              ...settings,
              quickstartEnabled: (!evt.target.checked)
            });
          }}
        />
        <span>{DESCRIPTION_SETTINGS_QUICKSTART}</span>
      </div>

      <div className={quickstartStyles.row}>
        <button
          className={quickstartStyles.closeButton}
          onClick={async () => {
            saveSettings(settings);
            const appWindow = getCurrentWindow();
            await appWindow.close();
          }}>
            {BUTTON_CLOSE}
          </button>
      </div>
    </div>
  );
};

export default QuickstartContent;