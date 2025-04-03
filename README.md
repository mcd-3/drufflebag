# Drufflebag

A desktop frontend for the Adobe Flash emulator Ruffle. Plays single-file SWF applications.

Note: you will need to provide your own SWF files.

## Requirements
You will need Rust version 2024 installed on your system.

## Building
In the project's root directory, do the following:

```
# To install dependencies:
npm i

# To start in dev mode:
npm run tauri dev

# To build a production build:
npm run tauri build
```

## Bundling Ruffle
To bundle an install of Ruffle in the app, you'll need to get the self-hosted version. You can download that version [on Ruffle's download page](https://ruffle.rs/downloads).

You should now have a zip file named `ruffle-nightly-[DATE]-web-selfhosted.zip`.

1. Extract the contents of the `ruffle-nightly-[DATE]-web-selfhosted.zip` to a directory named `ruffle-core`. The contents should look like this:
    ```
        - ruffle-core
            - [hash].wasm
            - [hash].wasm
            - core.ruffle.[hash].wasm
            - core.ruffle.[hash].wasm
            - core.ruffle.[hash].wasm
            - core.ruffle.[hash].wasm
            - LICENSE_APACHE
            - LICENSE_MIT
            - package.json
            - README.md
            - ruffle.js
            - ruffle.js.map
    ```
    **Note:** Files and names of files could change if the Ruffle team changes them, but as long as the `ruffle-core` directory contains ONLY the contents from the downloaded zip file then the app should work.
2. Ensure that the newly created `ruffle-core` directory ONLY contains the contents of the zip file
3. Move the `ruffle-core` directory with it's contents to the project's `public` directory.
4. If done correctly, Ruffle should now be bundled when you build the app via `npm run tauri build`.
