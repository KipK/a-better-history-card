import type { HomeAssistant } from "../types/ha.js";
import { translations as loadedTranslations } from "../translations/index.js";

type HomeAssistantLocalize = {
  localize?: (key: string) => string;
};

const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = new Set(["en", "fr", "cs", "de", "es", "el", "it", "pl", "ru", "sk", "bg", "ca", "da", "fi", "hu", "nl", "no", "pt", "zh"]);

const HA_KEYS: Record<string, string> = {
  "common.loading": "ui.common.loading"
};

export function languageFromHass(hass: HomeAssistant | undefined, language?: string): string {
  const raw =
    language ??
    hass?.locale?.language ??
    hass?.language ??
    DEFAULT_LANGUAGE;
  const normalized = raw.split("-")[0]?.toLowerCase() ?? DEFAULT_LANGUAGE;

  return SUPPORTED_LANGUAGES.has(normalized) ? normalized : DEFAULT_LANGUAGE;
}

function fallbackLabel(key: string): string {
  const segment = key.split(".").at(-1) ?? key;
  return segment
    .replace(/_/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

export function ensureTranslations(hass: HomeAssistant | undefined, language?: string): string {
  return languageFromHass(hass, language);
}

export function localize(
  hass: HomeAssistant | undefined,
  key: string,
  language?: string
): string {
  const haKey = HA_KEYS[key];
  const haLocalize = (hass as HomeAssistantLocalize | undefined)?.localize;
  if (haKey && haLocalize) {
    const localized = haLocalize(haKey);
    if (localized) return localized;
  }

  const resolvedLanguage = languageFromHass(hass, language);
  return (
    loadedTranslations[resolvedLanguage]?.[key] ??
    loadedTranslations[DEFAULT_LANGUAGE]?.[key] ??
    fallbackLabel(key)
  );
}
