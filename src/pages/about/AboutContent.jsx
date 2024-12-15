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
        <p className='centered '>Drufflebag</p>
        <p>Version: { appVersion }</p>
        <Header>License</Header>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2024 Matthew Carvalho-Dagenais</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.</p>

            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.</p>
          </div>
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
