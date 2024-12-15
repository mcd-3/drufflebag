import { useState, useEffect } from 'react';
import { getVersion } from '@tauri-apps/api/app';

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
    </div>
  );
}

export default AboutContent;
