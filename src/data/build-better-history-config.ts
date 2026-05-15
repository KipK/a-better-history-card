import type { BetterHistoryConfig, SeriesConfig } from "@kipk/ha-better-history";
import type { ABetterHistoryCardConfig, CardSeriesConfig } from "../types/config.js";

type BetterHistoryConfigWithScaleSplit = BetterHistoryConfig & {
  autoScaleSplit?: boolean;
};

function cssColor(value: string | number[] | undefined): string | undefined {
  if (typeof value === "string" && value.trim() !== "") {
    const color = value.trim();
    if (/^[a-z][a-z0-9-]*$/i.test(color)) return `var(--${color}-color, ${color})`;
    return color;
  }
  if (!Array.isArray(value) || value.length < 3) return undefined;

  const [r, g, b] = value.map((part) => Number(part));
  if (![r, g, b].every((part) => Number.isFinite(part))) return undefined;

  return `rgb(${r}, ${g}, ${b})`;
}

function mapSeries(s: CardSeriesConfig): SeriesConfig {
  const group = s.group ?? s.scale_group;

  return {
    entity: s.entity,
    ...(s.attribute !== undefined && { attribute: s.attribute }),
    ...(s.forced !== undefined && { forced: s.forced }),
    ...(s.label !== undefined && { label: s.label }),
    ...(s.color !== undefined && { color: s.color }),
    ...(s.unit !== undefined && { unit: s.unit }),
    ...(group !== undefined && { scaleGroup: group }),
    ...(s.scale_mode !== undefined && { scaleMode: s.scale_mode }),
    ...(s.scale_min !== undefined && { scaleMin: s.scale_min }),
    ...(s.scale_max !== undefined && { scaleMax: s.scale_max }),
    ...(s.line_mode !== undefined && { lineMode: s.line_mode }),
    ...(s.line_width !== undefined && { lineWidth: s.line_width })
  };
}

/** Converts a card config into the BetterHistoryConfig consumed by <ha-better-history>. */
export function buildBetterHistoryConfig(card: ABetterHistoryCardConfig, skipTitle?: boolean): BetterHistoryConfig {
  const cfg: BetterHistoryConfigWithScaleSplit = {};

  if (card.series) cfg.series = card.series.map(mapSeries);
  if (card.entities) cfg.defaultEntities = card.entities;
  if (card.attribute_units) cfg.attributeUnits = card.attribute_units;

  if (card.range_mode === "absolute") {
    if (card.start_date) cfg.startDate = new Date(card.start_date);
    if (card.end_date) cfg.endDate = new Date(card.end_date);
  } else {
    cfg.hours = card.hours ?? 24;
  }

  if (card.show_date_picker !== undefined) cfg.showDatePicker = card.show_date_picker;
  if (card.show_entity_picker !== undefined) cfg.showEntityPicker = card.show_entity_picker;
  if (card.show_legend !== undefined) cfg.showLegend = card.show_legend;
  if (card.show_tooltip !== undefined) cfg.showTooltip = card.show_tooltip;
  if (card.show_grid !== undefined) cfg.showGrid = card.show_grid;
  if (card.show_scale !== undefined) cfg.showScale = card.show_scale;
  if (card.auto_scale_split !== undefined) cfg.autoScaleSplit = card.auto_scale_split;
  if (card.show_import_button !== undefined) cfg.showImportButton = card.show_import_button;
  if (card.show_export_button !== undefined) cfg.showExportButton = card.show_export_button;
  if (card.show_time_range_selector !== undefined) cfg.showTimeRangeSelector = card.show_time_range_selector;
  if (card.disable_climate_overlay !== undefined) cfg.disableClimateOverlay = card.disable_climate_overlay;

  if (!skipTitle) {
    if (card.title !== undefined) cfg.title = card.title;
    if (card.title_font_family !== undefined) cfg.titleFontFamily = card.title_font_family;
    if (card.title_font_size !== undefined) cfg.titleFontSize = card.title_font_size;
    const titleColor = cssColor(card.title_color);
    if (titleColor !== undefined) cfg.titleColor = titleColor;
  }
  if (card.line_mode !== undefined) cfg.lineMode = card.line_mode;
  if (card.line_width !== undefined) cfg.lineWidth = card.line_width;
  if (card.show_line_mode_buttons !== undefined) cfg.showLineModeButtons = card.show_line_mode_buttons;
  if (card.debug_performance !== undefined) cfg.debugPerformance = card.debug_performance;

  return cfg;
}
