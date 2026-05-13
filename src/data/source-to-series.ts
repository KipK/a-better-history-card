import type { HistorySource } from "@kipk/ha-better-history";
import type { CardSeriesConfig } from "../types/config.js";

export function sourceToSeriesConfig(source: HistorySource): CardSeriesConfig {
  return {
    entity: source.entityId,
    attribute:
      source.kind === "entity_attribute" && source.path
        ? source.path.join(".")
        : undefined,
    unit: source.unit,
    forced: true,
  };
}
