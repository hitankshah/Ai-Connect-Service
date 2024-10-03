const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendAIRequest: (data) => ipcRenderer.send('ai-request', data),
  onAIResponse: (callback) => ipcRenderer.on('ai-response', callback)
});
