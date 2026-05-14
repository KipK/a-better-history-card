import type { HistorySource } from "@kipk/ha-better-history";
import type { CardSeriesConfig } from "../types/config.js";

type HistorySourceWithScaleGroup = HistorySource & { scaleGroup?: string };

export function sourceToSeriesConfig(source: HistorySource): CardSeriesConfig {
  const sourceWithScaleGroup = source as HistorySourceWithScaleGroup;

  return {
    entity: source.entityId,
    attribute:
      source.kind === "entity_attribute" && source.path
        ? source.path.join(".")
        : undefined,
    unit: source.unit,
    scale_group: sourceWithScaleGroup.scaleGroup,
    forced: true,
  };
}
