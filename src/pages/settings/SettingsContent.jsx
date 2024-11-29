import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./../../styles/Settings.css";
// import 'react-tabs/style/react-tabs.css';
import Header from './../../components/header.jsx';

function SettingsContent() {
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
                <p>This is where you can change your app's theme</p>
                <select>
                  <option>System (default)</option>
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Ruffled</option>
                  <option>Flashy</option>
                </select>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panel-container'>
                <br />
                <div className='inner-panel-container'>
                  <Header>Scale</Header>
                  <p>Scale the emulation display</p>
                </div>
                < br/>
                <div className='inner-panel-container'>
                  <Header>Start Up</Header>
                  <p>Enable the Ruffle splashscreen</p>
                  <p>Enable autoplay</p>
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
              <button className='footer-button footer-button-save' onClick={() => { console.log('Saved!') }} >Save</button>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default SettingsContent;
