const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
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
}

app.whenReady().then(() => {
  createWindow()
});

