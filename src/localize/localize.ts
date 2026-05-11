import type { HomeAssistant } from "../types/ha.js";

type TranslationMap = Record<string, string>;
type HomeAssistantLocalize = {
  localize?: (key: string) => string;
};

const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = new Set(["en", "fr"]);

const HA_KEYS: Record<string, string> = {
  "common.loading": "ui.common.loading"
};

const loadedTranslations: Record<string, TranslationMap | undefined> = {};
const loadingTranslations: Record<string, Promise<void> | undefined> = {};

function translationUrl(language: string): string {
  return new URL(
    /* @vite-ignore */ `translations/${language}.json`,
    import.meta.url
  ).toString();
}

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

async function loadLanguage(language: string): Promise<void> {
  if (loadedTranslations[language]) return;
  if (loadingTranslations[language]) return loadingTranslations[language];

  loadingTranslations[language] = fetch(translationUrl(language))
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json() as Promise<TranslationMap>;
    })
    .then((translations) => {
      loadedTranslations[language] = translations;
    })
    .catch((error) => {
      console.warn(`[a-better-history-card] Failed to load ${language} translations:`, error);
      loadedTranslations[language] = {};
    })
    .finally(() => {
      delete loadingTranslations[language];
    });

  return loadingTranslations[language];
}

export async function ensureTranslations(hass: HomeAssistant | undefined, language?: string): Promise<string> {
  const resolvedLanguage = languageFromHass(hass, language);
  const languages = resolvedLanguage === DEFAULT_LANGUAGE
    ? [DEFAULT_LANGUAGE]
    : [DEFAULT_LANGUAGE, resolvedLanguage];

  await Promise.all(languages.map((lang) => loadLanguage(lang)));
  return resolvedLanguage;
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
