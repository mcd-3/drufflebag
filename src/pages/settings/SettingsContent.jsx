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
            <button onClick={() => { console.log('Reset!') }} >Reset to Default</button>
            <button onClick={() => { console.log('Saved!') }} >Save</button>
            <button onClick={() => { console.log('Cancelled!') }} >Cancel</button>
          </div>
        </footer>
    </div>
  );
}

export default SettingsContent;
