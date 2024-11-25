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
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <p>Scale</p>
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
