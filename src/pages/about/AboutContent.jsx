import { useState, useEffect } from 'react';
import { getVersion } from '@tauri-apps/api/app';
import { getAsset } from './../../utils/assets.js';
import Header from '../../components/header';
import Collapse from '../../components/collapse';
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
        <p className='centered big-text'>Drufflebag</p>
        <img className='centered' src={getAsset('LOGO_DRUFFLEBAG')} height={72} width={72} />
        <p className='centered medium-text'>By: Matthew Carvalho-Dagenais</p>
        <p className='end subtext'>Version: { appVersion }</p>
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
        <br />
        
        {/*
          The rest of the page is dedicated to 3rd party licenses.
          They are copy-pasted from their respective Git repositories.

          The reason for copy-pasting as opposed to other (more efficient) methods
          is to not accidentally mis-apply the licenses. There are also a lot of licenses,
          and text renders much faster than states.
        */}
        <Collapse expandedText='3rd Party Licenses' collapsedText='3rd Party Licenses'>
          <h4>Ruffle</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2018-2022 Ruffle LLC ruffle@ruffle.rs and Ruffle contributors (https://github.com/ruffle-rs/ruffle/graphs/contributors)</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </div>
          <h4>Tauri</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2017 - Present Tauri Apps Contributors</p>
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
          <h4>React</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) Meta Platforms, Inc. and affiliates.</p>
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
          <h4>Tanstack Table</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2016 Tanner Linsley</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy</p>
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
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
          <h4>React Tabs</h4>
          <div className="license-container">
            <p>Copyright (c) Matt Zabriskie and Daniel Tschinder</p>

            <p>Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:</p>

            <p>The above copyright notice and this permission notice shall be included in
            all copies or substantial portions of the Software.</p>

            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.</p>
          </div>
          <h4>React Collapsed</h4>
          <div className="license-container">
            <p>The MIT License (MIT)</p>
            <p>Copyright (c) 2019-2024, Rogin Farrer</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of
            this software and associated documentation files (the "Software"), to deal in
            the Software without restriction, including without limitation the rights to
            use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
            the Software, and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
            COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
            IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </div>
          <h4>BroadcastChannel</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2018 Daniel Meyer</p>
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
          <h4>Vite</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2019-present, VoidZero Inc. and Vite contributors</p>
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
          <h4>Iconoir</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2021 Luca Burgio</p>
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
          <h4>SVG-Loaders</h4>
          <div className="license-container">
            <p>The MIT License (MIT)</p>
            <p>Copyright (c) 2014 Sam Herbert</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </div>
          <h4>Inter Font</h4>
          <div className="license-container">
            <p>Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)</p>
            <p>This Font Software is licensed under the SIL Open Font License, Version 1.1.</p>
            <p>This license is copied below, and is also available with a FAQ at:</p>
            <p>https://openfontlicense.org</p>
            <p>-----------------------------------------------------------</p>
            <p>SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007</p>
            <p>-----------------------------------------------------------</p>
            <p>PREAMBLE</p>
            <p>The goals of the Open Font License (OFL) are to stimulate worldwide
            development of collaborative font projects, to support the font creation
            efforts of academic and linguistic communities, and to provide a free and
            open framework in which fonts may be shared and improved in partnership
            with others.</p>
            <p>The OFL allows the licensed fonts to be used, studied, modified and
            redistributed freely as long as they are not sold by themselves. The
            fonts, including any derivative works, can be bundled, embedded, 
            redistributed and/or sold with any software provided that any reserved
            names are not used by derivative works. The fonts and derivatives,
            however, cannot be released under any other type of license. The
            requirement for fonts to remain under this license does not apply
            to any document created using the fonts or their derivatives.</p>
            <p>DEFINITIONS</p>
            <p>"Font Software" refers to the set of files released by the Copyright
            Holder(s) under this license and clearly marked as such. This may
            include source files, build scripts and documentation.</p>
            <p>"Reserved Font Name" refers to any names specified as such after the
            copyright statement(s).</p>
            <p>"Original Version" refers to the collection of Font Software components as
            distributed by the Copyright Holder(s).</p>
            <p>"Modified Version" refers to any derivative made by adding to, deleting,
            or substituting -- in part or in whole -- any of the components of the
            Original Version, by changing formats or by porting the Font Software to a
            new environment.</p>
            <p>"Author" refers to any designer, engineer, programmer, technical
            writer or other person who contributed to the Font Software.</p>
            <p>PERMISSION & CONDITIONS</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining
            a copy of the Font Software, to use, study, copy, merge, embed, modify,
            redistribute, and sell modified and unmodified copies of the Font
            Software, subject to the following conditions:</p>
            <p>1) Neither the Font Software nor any of its individual components,
            in Original or Modified Versions, may be sold by itself.</p>
            <p>2) Original or Modified Versions of the Font Software may be bundled,
            redistributed and/or sold with any software, provided that each copy
            contains the above copyright notice and this license. These can be
            included either as stand-alone text files, human-readable headers or
            in the appropriate machine-readable metadata fields within text or
            binary files as long as those fields can be easily viewed by the user.</p>
            <p>3) No Modified Version of the Font Software may use the Reserved Font
            Name(s) unless explicit written permission is granted by the corresponding
            Copyright Holder. This restriction only applies to the primary font name as
            presented to the users.</p>
            <p>4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
            Software shall not be used to promote, endorse or advertise any
            Modified Version, except to acknowledge the contribution(s) of the
            Copyright Holder(s) and the Author(s) or with their explicit written
            permission.</p>
            <p>5) The Font Software, modified or unmodified, in part or in whole,
            must be distributed entirely under this license, and must not be
            distributed under any other license. The requirement for fonts to
            remain under this license does not apply to any document created
            using the Font Software.</p>
            <p>TERMINATION</p>
            <p>This license becomes null and void if any of the above conditions are
            not met.</p>
            <p>DISCLAIMER</p>
            <p>THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
            OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
            COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
            INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
            DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
            FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
            OTHER DEALINGS IN THE FONT SOFTWARE.</p>
          </div>
          <h4>Serde</h4>
          <div className="license-container">
            <p>Permission is hereby granted, free of charge, to any
            person obtaining a copy of this software and associated
            documentation files (the "Software"), to deal in the
            Software without restriction, including without
            limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of
            the Software, and to permit persons to whom the Software
            is furnished to do so, subject to the following
            conditions:</p>
            <p>The above copyright notice and this permission notice
            shall be included in all copies or substantial portions
            of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
            ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
            TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
            SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
            CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
            OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
            IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
            DEALINGS IN THE SOFTWARE.</p>
          </div>
          <h4>chksum-md5</h4>
          <div className="license-container">
            <p>MIT License</p>
            <p>Copyright (c) 2023-2024 Konrad Goławski</p>
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
          <br />
        </Collapse>
        <br />
    </div>
  );
}

export default AboutContent;
