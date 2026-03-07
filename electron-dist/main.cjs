var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// electron/main.ts
var import_electron = require("electron");
var import_electron_updater = require("electron-updater");
var import_path = __toESM(require("path"), 1);
import_electron.ipcMain.handle("ping", async () => "pong from electron");
var mainWindow = null;
function createWindow() {
  mainWindow = new import_electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: import_path.default.join(__dirname, "preload.cjs"),
      contextIsolation: true
    }
  });
  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    const indexHtml = import_path.default.join(process.resourcesPath, "renderer", "index.html");
    mainWindow.loadFile(indexHtml);
  }
}
import_electron.app.whenReady().then(() => {
  createWindow();
  if (import_electron.app.isPackaged) {
    import_electron_updater.autoUpdater.checkForUpdates();
    import_electron_updater.autoUpdater.on("update-available", () => {
      console.log("Update available");
    });
    import_electron_updater.autoUpdater.on("update-downloaded", () => {
      console.log("Update downloaded, installing...");
      import_electron_updater.autoUpdater.quitAndInstall();
    });
    import_electron_updater.autoUpdater.on("error", (err) => {
      console.error("Updater error:", err);
    });
  }
});
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") import_electron.app.quit();
});
//# sourceMappingURL=main.cjs.map