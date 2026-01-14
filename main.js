const { app, BrowserWindow, Notification } = require('electron');
const { autoUpdater } = require('electron-updater');

function sendNotification(title, body) {
  new Notification({ title, body }).show();
}

function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify()
    .then(() => {
      sendNotification('Updater', 'Checking for updates…');

      autoUpdater.on('update-downloaded', () => {
        sendNotification('Updater', 'Update downloaded. Installing…');
        autoUpdater.quitAndInstall();
      });
    })
    .catch(err => {
      sendNotification('Updater Error', String(err));
    });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/icon/icon.png'
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null);   // Menü komplett entfernen
  setupAutoUpdater();

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
