import {
  HaComponentsLoadError,
  loadHaComponents as loadRequestedHaComponents
} from "@kipk/load-ha-components";

const HA_COMPONENTS = [
  "ha-form",
  "ha-icon",
  "ha-icon-button",
  "ha-button",
  "ha-color-picker",
  "ha-expansion-panel"
];

let loadPromise: Promise<void> | undefined;
let loadWarningShown = false;

export function ensureHaComponents(): Promise<void> {
  if (HA_COMPONENTS.every((component) => customElements.get(component))) {
    return Promise.resolve();
  }

  loadPromise ??= loadComponents(HA_COMPONENTS, () => {
    loadPromise = undefined;
  });
  return loadPromise;
}

let dateRangePickerPromise: Promise<void> | undefined;

export function ensureDateRangePicker(): Promise<void> {
  if (customElements.get("ha-date-range-picker")) {
    return Promise.resolve();
  }

  dateRangePickerPromise ??= loadComponents(["ha-date-range-picker"], () => {
    dateRangePickerPromise = undefined;
  });
  return dateRangePickerPromise;
}

async function loadComponents(components: readonly string[], resetPromise: () => void): Promise<void> {
  try {
    await loadRequestedHaComponents(components);
  } catch (error) {
    resetPromise();
    if (!loadWarningShown) {
      loadWarningShown = true;
      if (error instanceof HaComponentsLoadError) {
        console.warn(
          `[a-better-history-card] Failed to load Home Assistant UI components. Missing: ${error.result.missing.join(", ") || "unknown"}.`,
          error.cause ?? error
        );
      } else {
        console.warn("[a-better-history-card] Failed to load Home Assistant UI components.", error);
      }
    }
    throw error;
  }
}
