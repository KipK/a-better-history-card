import type { BetterHistoryRuntimeConfigSnapshot, SeriesConfig } from "@kipk/ha-better-history";
import { BUTTON_CARD_TYPE, CARD_TYPE } from "../const.js";
import type { ABetterHistoryCardConfig, CardSeriesConfig } from "../types/config.js";
import { normalizeConfig } from "./normalize-config.js";

export type ExportCardType = "inline" | "button";

export function isUsableRuntimeConfigSnapshot(
  value: unknown,
): value is BetterHistoryRuntimeConfigSnapshot {
  if (typeof value !== "object" || value === null) return false;
  const snapshot = value as Record<string, unknown>;
  if (!Array.isArray(snapshot.series)
    || !snapshot.series.every((series) => typeof series === "object"
      && series !== null
      && typeof (series as Record<string, unknown>).entity === "string")) return false;
  if (snapshot.lineMode !== "stair" && snapshot.lineMode !== "line" && snapshot.lineMode !== "column") return false;
  if (typeof snapshot.importedData !== "boolean") return false;
  if (typeof snapshot.range !== "object" || snapshot.range === null) return false;

  const range = snapshot.range as Record<string, unknown>;
  if (range.mode === "relative") {
    return typeof range.hours === "number" && Number.isFinite(range.hours) && range.hours > 0;
  }
  return range.mode === "absolute"
    && range.startDate instanceof Date
    && range.endDate instanceof Date
    && Number.isFinite(range.startDate.getTime())
    && range.endDate.getTime() > range.startDate.getTime();
}

const SHARED_FIELDS = [
  "attribute_units",
  "show_date_picker",
  "show_entity_picker",
  "show_legend",
  "show_tooltip",
  "show_grid",
  "show_scale",
  "auto_scale_split",
  "show_import_button",
  "show_export_button",
  "show_time_range_selector",
  "show_controls",
  "disable_climate_overlay",
  "title",
  "title_font_family",
  "title_font_size",
  "title_color",
  "card_background_color",
  "card_background_opacity",
  "line_width",
  "show_tools_button",
  "show_controls_toggle",
  "show_fullscreen_button",
  "show_line_mode_buttons",
  "show_card_export_button",
] as const;

const BUTTON_FIELDS = [
  "button_label",
  "button_icon",
  "button_show_name",
  "button_show_icon",
  "button_color",
  "button_hover_color",
  "button_hover_effect",
] as const;

function mapSeries(series: SeriesConfig & { decimals?: number }): CardSeriesConfig {
  return {
    entity: series.entity,
    ...(series.attribute !== undefined && {
      attribute: Array.isArray(series.attribute) ? [...series.attribute] : series.attribute,
    }),
    ...(series.forced !== undefined && { forced: series.forced }),
    ...(series.label !== undefined && { label: series.label }),
    ...(series.color !== undefined && { color: series.color }),
    ...(series.unit !== undefined && { unit: series.unit }),
    ...(series.decimals !== undefined && { decimals: series.decimals }),
    ...((series.group ?? series.scaleGroup) !== undefined && { group: series.group ?? series.scaleGroup }),
    ...(series.scaleMode !== undefined && { scale_mode: series.scaleMode }),
    ...(series.scaleMin !== undefined && { scale_min: series.scaleMin }),
    ...(series.scaleMax !== undefined && { scale_max: series.scaleMax }),
    ...(series.scalePreference !== undefined && { scale_preference: series.scalePreference }),
    ...(series.lineMode !== undefined && { line_mode: series.lineMode }),
    ...(series.lineWidth !== undefined && { line_width: series.lineWidth }),
    ...(series.showPoints !== undefined && { show_points: series.showPoints }),
    ...(series.pointRadius !== undefined && { point_radius: series.pointRadius }),
  };
}

function copyDefinedFields(
  target: Record<string, unknown>,
  source: ABetterHistoryCardConfig,
  fields: readonly (keyof ABetterHistoryCardConfig)[],
): void {
  for (const field of fields) {
    const value = source[field];
    if (value !== undefined) {
      target[field] = Array.isArray(value)
        ? [...value]
        : typeof value === "object" && value !== null
          ? { ...value }
          : value;
    }
  }
}

function compactDefaults(config: ABetterHistoryCardConfig): ABetterHistoryCardConfig {
  const defaults = normalizeConfig({ type: config.type });
  const required = new Set(["type", "series", "range_mode", "hours", "start_date", "end_date", "line_mode"]);
  const compacted = { ...config } as Record<string, unknown>;

  for (const [key, value] of Object.entries(compacted)) {
    if (!required.has(key) && value === (defaults as unknown as Record<string, unknown>)[key]) {
      delete compacted[key];
    }
  }

  return compacted as unknown as ABetterHistoryCardConfig;
}

export function buildExportCardConfig(
  base: ABetterHistoryCardConfig,
  snapshot: BetterHistoryRuntimeConfigSnapshot,
  cardType: ExportCardType,
): ABetterHistoryCardConfig {
  if (snapshot.importedData) {
    throw new Error("Imported history data cannot be exported as a dashboard card.");
  }

  const result: Record<string, unknown> = {
    type: cardType === "inline" ? CARD_TYPE : BUTTON_CARD_TYPE,
    series: snapshot.series.map(mapSeries),
  };

  if (snapshot.range.mode === "relative") {
    result.range_mode = "relative";
    result.hours = snapshot.range.hours;
  } else {
    result.range_mode = "absolute";
    result.start_date = new Date(snapshot.range.startDate.getTime()).toISOString();
    result.end_date = new Date(snapshot.range.endDate.getTime()).toISOString();
  }
  result.line_mode = snapshot.lineMode;

  copyDefinedFields(result, base, SHARED_FIELDS);
  if (cardType === "button") copyDefinedFields(result, base, BUTTON_FIELDS);

  return compactDefaults(result as unknown as ABetterHistoryCardConfig);
}
