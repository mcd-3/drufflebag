import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { confirm } from '@tauri-apps/plugin-dialog';
import { getCurrentWindow } from '@tauri-apps/api/window';
import "./../../styles/Settings.css";
import Header from './../../components/header.jsx';
import {
  getSettingsJSON,
  getDefaultSettings,
  saveSettings,
  compareSettings,
} from './../../utils/settings.js';
import { Locale } from '../../locales/index.js';

const {
  BUTTON_SETTINGS_CANCEL,
  BUTTON_SETTINGS_RESET_DEFAULT,
  BUTTON_SETTINGS_SAVE,
  DESCRIPTION_SETTINGS_USE_LATEST_RUFFLE,
  DESCRIPTION_SETTINGS_SCALE,
  DESCRIPTION_SETTINGS_START_UP_AUTOPLAY,
  DESCRIPTION_SETTINGS_START_UP_SPLASH,
  HEADER_SETTINGS_SCALE,
  HEADER_SETTINGS_START_UP,
  HEADER_SETTINGS_USE_LATEST_RUFFLE,
  OPTION_SETTINGS_SCALE_1x,
  OPTION_SETTINGS_SCALE_1_5x,
  OPTION_SETTINGS_SCALE_2x,
  PROMPT_DESCRIPTION_REVERT_BACK,
  PROMPT_DESCRIPTION_UNSAVED_CHANGES,
  PROMPT_TITLE_REVERT_BACK,
  PROMPT_TITLE_UNSAVED_CHANGES,
  TAB_SETTINGS_EMULATION
} = Locale;

function SettingsContent() {
  const SCALE_1 = 1;
  const SCALE_1_5 = 1.5;
  const SCALE_2 = 2;

  const config = getSettingsJSON();
  const [settings, setSettings] = useState(config);

  return (
    <div>
      <Tabs>
          <TabList>
            <Tab>{ TAB_SETTINGS_EMULATION  }</Tab>
          </TabList>
          <TabPanel>
            <div className='panel-container'>
                <br />
                <div className='inner-panel-container'>
                  <Header>{ HEADER_SETTINGS_USE_LATEST_RUFFLE }</Header>
                  <div className='row'>
                    <input
                        type='checkbox'
                        checked={settings.onlineModeEnabled}
                        onChange={(evt) => {
                          setSettings({
                            ...settings,
                            onlineModeEnabled: evt.target.checked
                          });
                        }}
                      />
                      <span>{ DESCRIPTION_SETTINGS_USE_LATEST_RUFFLE }</span>
                  </div>
                </div>
                <br />
                <div className='inner-panel-container'>
                  <Header>{ HEADER_SETTINGS_SCALE }</Header>
                  <div className='row'>
                    <select
                      onChange={(evt) => {
                        setSettings({
                          ...settings,
                          emulationScale: parseFloat(evt.target.value)
                        });
                      }}
                      value={settings.emulationScale}
                    >
                      <option value={SCALE_1}>{ OPTION_SETTINGS_SCALE_1x }</option>
                      <option value={SCALE_1_5}>{ OPTION_SETTINGS_SCALE_1_5x }</option>
                      <option value={SCALE_2}>{ OPTION_SETTINGS_SCALE_2x}</option>
                    </select>
                    <span>{ DESCRIPTION_SETTINGS_SCALE }</span>
                  </div>
                </div>
                < br/>
                <div className='inner-panel-container'>
                  <Header>{ HEADER_SETTINGS_START_UP }</Header>
                  <div className='row'>
                    <input
                      type='checkbox'
                      checked={settings.splashscreenEnabled}
                      onChange={(evt) => {
                        setSettings({
                          ...settings,
                          splashscreenEnabled: evt.target.checked
                        });
                      }}
                    />
                    <span>{ DESCRIPTION_SETTINGS_START_UP_SPLASH }</span>
                  </div>
                  <div className='row'>
                    <input
                      type='checkbox'
                      checked={settings.autoplayEnabled}
                      onChange={(evt) => {
                        setSettings({
                          ...settings,
                          autoplayEnabled: evt.target.checked
                        });
                      }}
                    />
                    <span>{ DESCRIPTION_SETTINGS_START_UP_AUTOPLAY }</span>
                  </div>
                </div>
              </div>
          </TabPanel>
        </Tabs>
        <footer>
          <div className='footer-container'>
            <div>
              <button
                className='footer-button footer-button-danger'
                onClick={async () => {
                  const confirmed = await confirm(
                    PROMPT_DESCRIPTION_REVERT_BACK,
                    { title: PROMPT_TITLE_REVERT_BACK, kind: 'warning' }
                  );
                  if (confirmed) {
                    setSettings({ ...getDefaultSettings()});
                    saveSettings(getDefaultSettings());
                  }
                }}
              >{ BUTTON_SETTINGS_RESET_DEFAULT }</button>
            </div>
            <div>
              <button
                className='footer-button'
                onClick={async () => {
                  if (!compareSettings(settings, config)) {
                    const confirmed = await confirm(
                      PROMPT_DESCRIPTION_UNSAVED_CHANGES,
                      { title: PROMPT_TITLE_UNSAVED_CHANGES, kind: 'warning' }
                    );

                    if (confirmed) {
                      getCurrentWindow().destroy();
                    }
                  } else {
                    getCurrentWindow().destroy();
                  }
                }}
              >{ BUTTON_SETTINGS_CANCEL }</button>
              {/* This span is just for spacing between the buttons */}
              <span>  </span>
              <button
                className='footer-button footer-button-save'
                onClick={() => {
                  saveSettings(settings);
                  getCurrentWindow().destroy();
                }}
              >{ BUTTON_SETTINGS_SAVE }</button>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default SettingsContent;
