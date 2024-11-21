import "./../../styles/Settings.css";
import Header from './../../components/header.jsx';

function SettingsContent() {
  return (
    <div>
        <Header>Settings</Header>
        <h2>Experimental Features</h2>
        <p>These features may not work as intended...Enable at your own risk!</p>
        <div>
          <input type="checkbox" id="url_spoof_enabled" name="url_spoof_enabled" />
          <label htmlFor="url_spoof_enabled">URL Spoof Enabled</label>
          < br/>
          <button onClick={() => { console.log('Reset!') }} >Reset to Default</button>
          <button onClick={() => { console.log('Saved!') }} >Save</button>
          <button onClick={() => { console.log('Cancelled!') }} >Cancel</button>
        </div>
    </div>
  );
}

export default SettingsContent;
