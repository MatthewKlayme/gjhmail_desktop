import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["electron/main.ts", "electron/preload.ts"],
    outDir: "electron-dist",
    format: ["cjs"],
    platform: "node",
    target: "node18",
    sourcemap: true,
    clean: true,
    external: ["electron"],
});
