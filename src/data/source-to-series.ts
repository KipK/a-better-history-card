import type { HistorySource } from "@kipk/ha-better-history";
import type { CardSeriesConfig } from "../types/config.js";

type HistorySourceWithGroup = HistorySource & { group?: string; scaleGroup?: string };

export function sourceToSeriesConfig(source: HistorySource): CardSeriesConfig {
  const sourceWithGroup = source as HistorySourceWithGroup;

  return {
    entity: source.entityId,
    attribute:
      source.kind === "entity_attribute" && source.path
        ? source.path.join(".")
        : undefined,
    unit: source.unit,
    group: sourceWithGroup.group ?? sourceWithGroup.scaleGroup,
    forced: true,
  };
}
