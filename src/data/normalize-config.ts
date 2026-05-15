import type { ABetterHistoryCardConfig } from "../types/config.js";

/** Returns a copy of the raw card config with safe defaults applied. */
export function normalizeConfig(raw: ABetterHistoryCardConfig): ABetterHistoryCardConfig {
  return {
    range_mode: "relative",
    hours: 24,
    show_legend: true,
    show_tooltip: true,
    show_grid: true,
    show_scale: true,
    auto_scale_split: true,
    show_controls: true,
    show_line_mode_buttons: true,
    show_export_button: true,
    show_time_range_selector: true,
    button_show_name: true,
    button_show_icon: true,
    button_hover_effect: true,
    ...raw
  };
}
