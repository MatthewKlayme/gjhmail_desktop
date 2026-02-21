// electron/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("api", {
  ping: () => import_electron.ipcRenderer.invoke("ping")
});
//# sourceMappingURL=preload.cjs.map