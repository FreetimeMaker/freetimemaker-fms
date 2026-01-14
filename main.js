const { app, BrowserWindow, Notification, Menu } = require('electron');
const { autoUpdater } = require("electron-updater"); 

autoUpdater.checkForUpdatesAndNotify();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + 'images/icon.png'
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null);   // Menü komplett entfernen

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
