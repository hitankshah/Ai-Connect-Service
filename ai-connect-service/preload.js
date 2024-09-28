const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use certain APIs
contextBridge.exposeInMainWorld('electronAPI', {
  sendAIRequest: (data) => ipcRenderer.send('ai-request', data),
  onAIResponse: (callback) => ipcRenderer.on('ai-response', callback)
});
