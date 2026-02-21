import { app, BrowserWindow } from "electron";
import path from "path";
import { ipcMain } from "electron";

ipcMain.handle("ping", async () => {
    return "pong from electron";
});


let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),

        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        // Dev: load Vite server
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        // Prod: load built files
        mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
