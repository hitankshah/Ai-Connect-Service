const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional: Add a preload script
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Disable the remote module
      nodeIntegration: false, // Recommended for security
    },
  });

  // Load the Next.js application (ensure your Next.js app is running)
  mainWindow.loadURL('http://localhost:3000'); // Use your production URL here if necessary



// Event when Electron is ready
app.whenReady().then(createWindow);

// Handle window closure
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate the window on macOS when the app is activated
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
