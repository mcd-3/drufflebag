import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./../../styles/Settings.css";
import Header from './../../components/header.jsx';
import { getSettingsJSON } from './../../utils/settings.js';

function SettingsContent() {
  const config = getSettingsJSON();

  return (
    <div>
      <Tabs>
          <TabList>
            <Tab>Application</Tab>
            <Tab>Emulation</Tab>
          </TabList>

          <TabPanel>
            <div className='panel-container'>
              <br />
              <div className='inner-panel-container'>
                <Header>Themes</Header>
                <div className='row'>
                  <select>
                    <option>System (default)</option>
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Ruffled</option>
                    <option>Flashy</option>
                  </select>
                  <span>Application Theme</span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panel-container'>
                <br />
                <div className='inner-panel-container'>
                  <Header>Scale</Header>
                  <div className='row'>
                    <select>
                      <option>1x</option>
                      <option>1.5x</option>
                      <option>2x</option>
                    </select>
                    <span>Emulation window scale size</span>
                  </div>
                </div>
                < br/>
                <div className='inner-panel-container'>
                  <Header>Start Up</Header>
                  <div className='row'>
                    <input type='checkbox' />
                    <span>Enable the Ruffle splashscreen</span>
                  </div>
                  <div className='row'>
                    <input type='checkbox' />
                    <span>Enable autoplay</span>
                  </div>
                </div>
              </div>
          </TabPanel>
        </Tabs>
        <footer>
          <div className='footer-container'>
            <div>
              <button className='footer-button footer-button-danger' onClick={() => { console.log('Reset!') }} >Reset to Default</button>
            </div>
            <div>
              <button className='footer-button' onClick={() => { console.log('Cancelled!') }} >Cancel</button>
              <button
                className='footer-button footer-button-save'
                onClick={() => {
                  console.log(config)
                }}
              >Save</button>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default SettingsContent;
