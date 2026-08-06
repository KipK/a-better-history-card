import { stringify } from "yaml";
import type { ABetterHistoryCardConfig } from "../types/config.js";

export function serializeCardConfig(config: ABetterHistoryCardConfig): string {
  const yaml = stringify(config, { lineWidth: 0, directives: false });
  return `${yaml.replace(/^---\s*\n/, "").replace(/\n+$/, "")}\n`;
}
