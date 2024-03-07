# Info webtor-io-embed-sdk-js

This library is a part of Webtor.io project. It allows to embed Webtor.io player into your website.
A submodules of this library is in rootforlder/libs/webtor-io-embed-sdk-js.

## Installation

All command should be executed in the projectFolder/libs/webtor-io-embed-sdk-js folder.

```bash
npm install
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

Then in the projectFolder/libs/webtor-io-embed-sdk-js/dist folder you can find the library.
index.min.js is the minified version of the library which have been moved to the projectFolder/public/libs/webtor-io-embed-sdk-js folder.

Node options is required to build the library with Node.js 18.19.1 it may be different for your environment.

## Usage

In projectFolder/src/components/TorrentPlayer/ file you can find an example of usage of this library.
