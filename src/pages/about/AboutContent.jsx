import { useState, useEffect } from 'react';
import { getVersion } from '@tauri-apps/api/app';
import Header from '../../components/header';
import "./../../styles/About.css";

function AboutContent() {
  const [appVersion, setAppVersion] = useState();

  useEffect(() => {
    getVersion().then((res) => {
      setAppVersion(res);
    });

    return () => { }
  }, [setAppVersion])

  return (
    <div>
        <p>Drufflebag</p>
        <p>Version: { appVersion }</p>
        <Header>License</Header>
          <p>MIT license of this project</p>
        <Header>3rd Party</Header>
          <ul>
            <li>Tauri</li>
            <li>React</li>
            <li>Tanstack Table</li>
            <li>BroadcastChannel</li>
            <li>React Tabs</li>
            <li>Vite</li>
            <li>Iconoir</li>
            <li>Inter Font</li>
            <li>Serde</li>
            <li>chksum-md5</li>
          </ul>
    </div>
  );
}

export default AboutContent;
