import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ABetterHistoryCard",
      formats: ["es"],
      fileName: () => "a-better-history-card.js"
    },
    rolldownOptions: {
      output: {
        entryFileNames: "a-better-history-card.js"
      }
    }
  }
});
