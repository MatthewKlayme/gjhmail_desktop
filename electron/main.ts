import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

ipcMain.handle("ping", async () => "pong from electron");

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
        },
    });

    const devUrl = process.env.VITE_DEV_SERVER_URL;

    if (devUrl) {
        mainWindow.loadURL(devUrl);
        mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
        const indexHtml = path.join(process.resourcesPath, "renderer", "index.html");
        mainWindow.loadFile(indexHtml);
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});