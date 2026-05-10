#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, "..");
const PKG_DIR = join(PROJECT_ROOT, "node_modules/@kipk/ha-better-history/dist");
const DEFINE_ENTRY = join(PKG_DIR, "define.js");
const PICKER_ENTRY = join(PKG_DIR, "picker.js");
const OUT_DIR = join(PROJECT_ROOT, "dist/lib/ha-better-history");
const TEMP_DIR = join(PROJECT_ROOT, "tmp/ha-better-history-build");
const VITE_BIN = join(PROJECT_ROOT, "node_modules/vite/bin/vite.js");

if (!existsSync(DEFINE_ENTRY)) {
  throw new Error("Missing @kipk/ha-better-history dist/define.js. Run `npm install` first.");
}

if (!existsSync(PICKER_ENTRY)) {
  throw new Error("Missing @kipk/ha-better-history dist/picker.js. Run `npm install` first.");
}

if (!existsSync(VITE_BIN)) {
  throw new Error("Missing Vite dependency. Run `npm install` first.");
}

rmSync(OUT_DIR, { recursive: true, force: true });
rmSync(TEMP_DIR, { recursive: true, force: true });
mkdirSync(TEMP_DIR, { recursive: true });

const TEMP_CONFIG = join(TEMP_DIR, "vite.config.mjs");
writeFileSync(TEMP_CONFIG, `import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: true,
    outDir: ${JSON.stringify(OUT_DIR)},
    lib: {
      entry: {
        define: ${JSON.stringify(DEFINE_ENTRY)},
        picker: ${JSON.stringify(PICKER_ENTRY)},
      },
      formats: ["es"],
      fileName: (_, entryName) => entryName + ".js"
    }
  }
});
`);

const result = spawnSync(process.execPath, [VITE_BIN, "build", "--config", TEMP_CONFIG], {
  cwd: PROJECT_ROOT,
  stdio: "inherit"
});

rmSync(TEMP_DIR, { recursive: true, force: true });

if (result.status !== 0) {
  throw new Error(`ha-better-history build failed with exit code ${result.status ?? "unknown"}`);
}
