const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1200,
    height: 1020,
    minHeight: 1020,
    webPreferences: {
      resizeable: false,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  })

  Menu.setApplicationMenu(null)

  appWindow.loadFile('dist/untitled1/browser/index.html');

  appWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.log('Fehler beim Laden:', errorDescription);
  });

  appWindow.on('closed', function () {
    appWindow = null
  });

  appWindow.webContents.on('will-navigate', (event, url) => {
    // Verhindern Sie externe Navigationen
    event.preventDefault();

  });

}

app.whenReady().then(() => {
  createWindow()
});

