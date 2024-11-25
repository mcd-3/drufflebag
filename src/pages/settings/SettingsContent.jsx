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
            <Tab>Experimental</Tab>
          </TabList>

          <TabPanel>
            <p>Themes</p>
          </TabPanel>
          <TabPanel>
            <p>Scale</p>
          </TabPanel>
          <TabPanel>
            <p>These features may not work as intended...Enable at your own risk!</p>
            <div>
              <input type="checkbox" id="url_spoof_enabled" name="url_spoof_enabled" />
              <label htmlFor="url_spoof_enabled">URL Spoof Enabled</label>
              < br/>
            </div>
          </TabPanel>
        </Tabs>
        <footer>
          <button onClick={() => { console.log('Reset!') }} >Reset to Default</button>
          <button onClick={() => { console.log('Saved!') }} >Save</button>
          <button onClick={() => { console.log('Cancelled!') }} >Cancel</button>
        </footer>
    </div>
  );
}

export default SettingsContent;
