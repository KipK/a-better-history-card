import type { BetterHistoryConfig, SeriesConfig } from "@kipk/ha-better-history";
import type { ABetterHistoryCardConfig, CardSeriesConfig } from "../types/config.js";

function mapSeries(s: CardSeriesConfig): SeriesConfig {
  return {
    entity: s.entity,
    ...(s.attribute !== undefined && { attribute: s.attribute }),
    ...(s.forced !== undefined && { forced: s.forced }),
    ...(s.label !== undefined && { label: s.label }),
    ...(s.color !== undefined && { color: s.color }),
    ...(s.unit !== undefined && { unit: s.unit }),
    ...(s.scale_group !== undefined && { scaleGroup: s.scale_group }),
    ...(s.scale_mode !== undefined && { scaleMode: s.scale_mode }),
    ...(s.scale_min !== undefined && { scaleMin: s.scale_min }),
    ...(s.scale_max !== undefined && { scaleMax: s.scale_max }),
    ...(s.line_mode !== undefined && { lineMode: s.line_mode }),
    ...(s.line_width !== undefined && { lineWidth: s.line_width })
  };
}

/** Converts a card config into the BetterHistoryConfig consumed by <ha-better-history>. */
export function buildBetterHistoryConfig(card: ABetterHistoryCardConfig, skipTitle?: boolean): BetterHistoryConfig {
  const cfg: BetterHistoryConfig = {};

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
  if (card.show_import_button !== undefined) cfg.showImportButton = card.show_import_button;
  if (card.disable_climate_overlay !== undefined) cfg.disableClimateOverlay = card.disable_climate_overlay;

  if (!skipTitle) {
    if (card.title !== undefined) cfg.title = card.title;
    if (card.title_font_family !== undefined) cfg.titleFontFamily = card.title_font_family;
    if (card.title_font_size !== undefined) cfg.titleFontSize = card.title_font_size;
    if (card.title_color !== undefined) cfg.titleColor = card.title_color;
  }
  if (card.background_color !== undefined) cfg.backgroundColor = card.background_color;
  if (card.line_mode !== undefined) cfg.lineMode = card.line_mode;
  if (card.line_width !== undefined) cfg.lineWidth = card.line_width;
  if (card.show_line_mode_buttons !== undefined) cfg.showLineModeButtons = card.show_line_mode_buttons;
  if (card.debug_performance !== undefined) cfg.debugPerformance = card.debug_performance;

  return cfg;
}
