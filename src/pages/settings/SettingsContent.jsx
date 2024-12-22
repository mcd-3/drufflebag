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

function SettingsContent() {
  const config = getSettingsJSON();
  const [settings, setSettings] = useState(config);

  return (
    <div>
      <Tabs>
          <TabList>
            <Tab>Emulation</Tab>
          </TabList>
          <TabPanel>
            <div className='panel-container'>
                <br />
                <div className='inner-panel-container'>
                  <Header>Online Mode</Header>
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
                      <span>Use the latest version of Ruffle automatically from the Internet</span>
                  </div>
                </div>
                <br />
                <div className='inner-panel-container'>
                  <Header>Scale</Header>
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
                      <option value={1}>1x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                    <span>Emulation window scale size</span>
                  </div>
                </div>
                < br/>
                <div className='inner-panel-container'>
                  <Header>Start Up</Header>
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
                    <span>Enable the Ruffle splash screen</span>
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
                    <span>Enable autoplay</span>
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
                    'Settings will be reverted back to factory settings and saved.',
                    { title: 'Revert to default settings?', kind: 'warning' }
                  );
                  if (confirmed) {
                    setSettings({ ...getDefaultSettings()});
                    saveSettings(getDefaultSettings());
                  }
                }}
              >Reset to Default</button>
            </div>
            <div>
              <button
                className='footer-button'
                onClick={async () => {
                  if (!compareSettings(settings, config)) {
                    const confirmed = await confirm(
                      'You have unsaved changes',
                      { title: 'Discard changes?', kind: 'warning' }
                    );

                    if (confirmed) {
                      getCurrentWindow().destroy();
                    }
                  } else {
                    getCurrentWindow().destroy();
                  }
                }}
              >Cancel</button>
              {/* This span is just for spacing between the buttons */}
              <span>  </span>
              <button
                className='footer-button footer-button-save'
                onClick={() => {
                  saveSettings(settings);
                  getCurrentWindow().destroy();
                }}
              >Save</button>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default SettingsContent;
