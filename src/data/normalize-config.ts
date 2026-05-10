import type { ABetterHistoryCardConfig } from "../types/config.js";

/** Returns a copy of the raw card config with safe defaults applied. */
export function normalizeConfig(raw: ABetterHistoryCardConfig): ABetterHistoryCardConfig {
  return {
    range_mode: "relative",
    hours: 24,
    show_legend: true,
    show_tooltip: true,
    show_controls: true,
    ...raw
  };
}
