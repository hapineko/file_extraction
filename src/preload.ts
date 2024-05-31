// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("image", {
  read: (srcPath:string) => ipcRenderer.invoke("image:read", srcPath),
});

contextBridge.exposeInMainWorld("extraction", {
  copy: (data:{
    source: string;
    destination: string;
    extract: string[];
  }) => ipcRenderer.invoke("extraction:copy", data),
});

// 履歴読み書き用のAPIの定義を書く
