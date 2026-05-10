import { loadHaComponents } from "@kipk/load-ha-components";

const HA_COMPONENTS = [
  "ha-form",
  "ha-icon",
  "ha-icon-button",
  "ha-button",
  "ha-color-picker",
  "ha-expansion-panel"
];

let loadPromise: Promise<void> | undefined;

export function ensureHaComponents(): Promise<void> {
  loadPromise ??= loadHaComponents(HA_COMPONENTS);
  return loadPromise;
}

let dateRangePickerPromise: Promise<void> | undefined;

export function ensureDateRangePicker(): Promise<void> {
  dateRangePickerPromise ??= _loadDateRangePicker();
  return dateRangePickerPromise;
}

async function _loadDateRangePicker(): Promise<void> {
  if (customElements.get("ha-date-range-picker")) return;

  try {
    await Promise.race([
      customElements.whenDefined("partial-panel-resolver"),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 10000))
    ]);

    const ppr = document.createElement("partial-panel-resolver") as HTMLElement & {
      hass: unknown;
      _updateRoutes(): void;
      routerOptions?: { routes?: Record<string, { load: () => Promise<unknown> }> };
    };

    ppr.hass = { panels: [{ url_path: "history", component_name: "history" }] };
    ppr._updateRoutes();

    await ppr.routerOptions?.routes?.history?.load();
    await customElements.whenDefined("ha-date-range-picker");
  } catch (error) {
    console.warn("[a-better-history-card] Failed to load ha-date-range-picker:", error);
  }
}
