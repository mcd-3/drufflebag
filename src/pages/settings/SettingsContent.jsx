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
            <Tab>{ Locale.TAB_SETTINGS_EMULATION  }</Tab>
          </TabList>
          <TabPanel>
            <div className='panel-container'>
                <br />
                <div className='inner-panel-container'>
                  <Header>{ Locale.HEADER_SETTINGS_USE_LATEST_RUFFLE }</Header>
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
                      <span>{ Locale.DESCRIPTION_SETTINGS_USE_LATEST_RUFFLE }</span>
                  </div>
                </div>
                <br />
                <div className='inner-panel-container'>
                  <Header>{ Locale.HEADER_SETTINGS_SCALE }</Header>
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
                      <option value={SCALE_1}>{ Locale.OPTION_SETTINGS_SCALE_1x }</option>
                      <option value={SCALE_1_5}>{ Locale.OPTION_SETTINGS_SCALE_1_5x }</option>
                      <option value={SCALE_2}>{ Locale.OPTION_SETTINGS_SCALE_2x}</option>
                    </select>
                    <span>{ Locale.DESCRIPTION_SETTINGS_SCALE }</span>
                  </div>
                </div>
                < br/>
                <div className='inner-panel-container'>
                  <Header>{ Locale.HEADER_SETTINGS_START_UP }</Header>
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
                    <span>{ Locale.DESCRIPTION_SETTINGS_START_UP_SPLASH }</span>
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
                    <span>{ Locale.DESCRIPTION_SETTINGS_START_UP_AUTOPLAY }</span>
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
                    Locale.PROMPT_DESCRIPTION_REVERT_BACK,
                    { title: Locale.PROMPT_TITLE_REVERT_BACK, kind: 'warning' }
                  );
                  if (confirmed) {
                    setSettings({ ...getDefaultSettings()});
                    saveSettings(getDefaultSettings());
                  }
                }}
              >{ Locale.BUTTON_SETTINGS_RESET_DEFAULT }</button>
            </div>
            <div>
              <button
                className='footer-button'
                onClick={async () => {
                  if (!compareSettings(settings, config)) {
                    const confirmed = await confirm(
                      Locale.PROMPT_DESCRIPTION_UNSAVED_CHANGES,
                      { title: Locale.PROMPT_TITLE_UNSAVED_CHANGES, kind: 'warning' }
                    );

                    if (confirmed) {
                      getCurrentWindow().destroy();
                    }
                  } else {
                    getCurrentWindow().destroy();
                  }
                }}
              >{ Locale.BUTTON_SETTINGS_CANCEL }</button>
              {/* This span is just for spacing between the buttons */}
              <span>  </span>
              <button
                className='footer-button footer-button-save'
                onClick={() => {
                  saveSettings(settings);
                  getCurrentWindow().destroy();
                }}
              >{ Locale.BUTTON_SETTINGS_SAVE }</button>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default SettingsContent;
