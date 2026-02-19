---
lang: en-US
title: "Anatomy of an Electron 4 application"
description: "Article(s) > Anatomy of an Electron 4 application"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Anatomy of an Electron 4 application"
    - property: og:description
      content: "Anatomy of an Electron 4 application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/anatomy-of-an-electron-4-application.html
prev: /programming/ts/articles/README.md
date: 2019-04-16
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Anatomy of an Electron 4 application"
  desc="In Electron 4 applications, there are two main processes: the main process and the renderer process. The main process is responsible for displaying the GUI, managing BrowserWindow instances and registering global shortcuts."
  url="https://typescript.tv/hands-on/anatomy-of-an-electron-4-application"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

In Electron 4 applications, there are two main processes: the main process and the renderer process. The main process is responsible for displaying the GUI, managing BrowserWindow instances and registering global shortcuts.

Overview of main concepts in Electron 4 applications.

---

## main process

Every Electron app has one (and just one!) main process. The main process is used to display a GUI and started from the main script defined <VPIcon icon="iconfont icon-json"/>`package.json`.

### Concerns

- Entry point for Electron applications
- Creates and manages [<VPIcon icon="iconfont icon-electron"/>BrowserWindow](https://electronjs.org/docs/api/browser-window) instances
- Registers global shortcuts
- Creates native menus
- Shows native GUI
- Responds to auto-update events

---

## renderer process

Each web page in Electron runs in a separate renderer process. If not limited, web pages running in a renderer process have to power to access Node.js modules.

### Concerns

- Takes care of showing your HTML & JS in the Chromium browser
- Runs UI in [<VPIcon icon="iconfont icon-electron"/>webContents](https://electronjs.org/docs/api/web-contents) instances
- Access information about audio and video devices using [<VPIcon icon="iconfont icon-electron"/>desktopCapturer](https://electronjs.org/docs/api/desktop-capturer)
- Can access main process modules via [<VPIcon icon="iconfont icon-electron"/>remote](https://electronjs.org/docs/api/remote) module

### Characteristics

- `process.type` is `"renderer"`

::: tip Example

```ts
const { desktopCapturer, ipcRenderer, webFrame } = require('electron');
const { app } = require('electron').remote;
 
webFrame.setZoomFactor(1.0);
webFrame.setVisualZoomLevelLimits(1, 1);
 
console.log('App configuration directory', app.getPath('userData'));
```

:::

---

## Inter-process communication (IPC)

Using inter-process communication a renderer process can exchange messages with a main process:

```js title="renderer.js"
import {ipcRenderer} from 'electron';
 
const updateBtn = document.getElementById('updateBtn')
 
updateBtn.addEventListener('click', () => {
  ipcRenderer.send('my-app-event', document.getElementById('notifyVal').value);
});
```

```ts title="main.ts"
import {BrowserWindow, ipcMain, IpcMessageEvent} from 'electron';
 
const main = new BrowserWindow();
 
ipcMain.on('my-app-event', (event: IpcMessageEvent, price: number) => {
  main.webContents.send('target-price', price);
});
```

Note: `ipcRenderer` does not send messages to itself, it sends them to `ipcMain`. If you want to access the messages within a renderer process, you need to check `ipcMain` using `electron.remote`:

```js title="renderer.js"
import {remote} from 'electron';
 
// ...
 
remote.ipcMain.on('my-app-event', (event, price) => {
  console.log(`Received "${price}" in renderer process.`);
});
```

---

## Webview Preload Script

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <script>
    require('./renderer.js');
  </script>
  <body>
    <webview
      preload="./preload.js"
      src="https://benny.work"
    ></webview>
  </body>
</html>
```

You can assign a preload script programmatically:

```ts
import fileUrl = require('file-url');
 
const main = new BrowserWindow();
 
const contents = main.webContents;
 
contents.on('will-attach-webview', (event, webPreferences, params) => {
  webPreferences.preloadURL = fileUrl('./preload.js');
});
```

```js title="preload.js"
const {ipcRenderer} = require('electron');
 
window.addEventListener('DOMContentLoaded', () => {
  // From guest (webview content) to host (main process)
  window.addEventListener(z.event.WebApp.LIFECYCLE.RESTART, (event) => {
    ipcRenderer.send(EVENT_TYPE.WRAPPER.RELAUNCH);
  });
 
  // From host (main process) to guest (webview content)
  ipcRenderer.on(EVENT_TYPE.WRAPPER.RELAUNCHED, () => {
    window.dispatchEvent(new CustomEvent(EVENT_TYPE.ACTION.CREATE_ACCOUNT));
  });
});
```

```ts title="main.ts"
import {BrowserWindow} from 'electron';
 
const main = new BrowserWindow();
main.loadFile('index.html');
ipcMain.on(
  EVENT_TYPE.WRAPPER.RELAUNCH,
  async (event: IpcMessageEvent) => {
    console.log('Do some work and send a reply...');
    main.webContents.send(EVENT_TYPE.WRAPPER.RELAUNCHED);
  }
);
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Anatomy of an Electron 4 application",
  "desc": "In Electron 4 applications, there are two main processes: the main process and the renderer process. The main process is responsible for displaying the GUI, managing BrowserWindow instances and registering global shortcuts.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/anatomy-of-an-electron-4-application.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
