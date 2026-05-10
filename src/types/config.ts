import type { BetterHistoryLineMode } from "@kipk/ha-better-history";

export interface CardSeriesConfig {
  entity: string;
  attribute?: string | string[];
  label?: string;
  color?: string;
  unit?: string;
  scale_group?: string;
  scale_mode?: "auto" | "manual";
  scale_min?: number;
  scale_max?: number;
  line_mode?: BetterHistoryLineMode;
  line_width?: number | string;
  forced?: boolean;
}

export interface ABetterHistoryCardConfig {
  type: string;

  // Data
  entities?: string[];
  series?: CardSeriesConfig[];
  attribute_units?: Record<string, string>;

  // Range
  range_mode?: "relative" | "absolute";
  hours?: number;
  start_date?: string;
  end_date?: string;

  // Component display
  show_date_picker?: boolean;
  show_entity_picker?: boolean;
  show_legend?: boolean;
  show_tooltip?: boolean;
  show_import_button?: boolean;
  show_export_button?: boolean;
  show_time_range_selector?: boolean;
  show_controls?: boolean;
  disable_climate_overlay?: boolean;

  // Style
  title?: string;
  title_font_family?: string;
  title_font_size?: string;
  title_color?: string;
  background_color?: string;
  line_mode?: BetterHistoryLineMode;
  line_width?: number | string;

  // Toolbar buttons rendered above the component
  show_tools_button?: boolean;
  show_controls_toggle?: boolean;
  show_fullscreen_button?: boolean;
  show_line_mode_buttons?: boolean;

  // Button-card variant only
  button_label?: string;
  button_icon?: string;
  button_show_name?: boolean;
  button_show_icon?: boolean;
  button_color?: string | number[];
  button_hover_color?: string | number[];
  button_hover_effect?: boolean;

  // Layout (written by HA layout panel)
  grid_options?: { columns?: number | string; rows?: number | string };

  // Debug
  debug_performance?: boolean;
}
