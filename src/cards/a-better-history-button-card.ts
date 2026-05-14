import { LitElement, css, html, type TemplateResult } from "lit";
import "../components/history-dialog.js";
import { normalizeConfig } from "../data/normalize-config.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import { BUTTON_CARD_TYPE, BUTTON_EDITOR_TAG } from "../const.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardGridOptions } from "../types/ha.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

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

function normalizedOpacity(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const opacity = Number(value);
  if (!Number.isFinite(opacity)) return undefined;

  return Math.min(100, Math.max(0, opacity));
}

export class ABetterHistoryButtonCard extends LitElement implements LovelaceCard {
  static getConfigElement(): HTMLElement {
    return document.createElement(BUTTON_EDITOR_TAG);
  }

  static getStubConfig(hass?: HomeAssistant): ABetterHistoryCardConfig {
    const states = hass?.states ?? {};
    const entityId =
      Object.keys(states).find(
        (id) => /^sensor\.[^.]*temperature/.test(id) || id.startsWith("climate.")
      ) ??
      Object.keys(states).find(
        (id) => id.startsWith("sensor.") && !isNaN(Number(states[id]?.state))
      );

    return {
      type: BUTTON_CARD_TYPE,
      ...(entityId ? { entities: [entityId], _store_preview: true } : {}),
      range_mode: "relative",
      hours: 24,
      show_entity_picker: true,
      show_import_button: true,
      show_legend: true,
      show_tooltip: true
    };
  }

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _open: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      align-items: center;
      background: var(--_card-bg, var(--ha-card-background, var(--card-background-color)));
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 16px;
    }

    .btn-content {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ha-icon {
      --mdc-icon-size: 36px;
      color: var(--_btn-color, var(--primary-text-color));
    }

    .label {
      color: var(--_btn-color, var(--primary-text-color));
      font-size: 0.9em;
    }

    ha-card:hover {
      --ha-card-box-shadow: var(--_btn-hover-shadow, none);
    }
  `;

  hass?: HomeAssistant;
  private _config?: ABetterHistoryCardConfig;
  private _open = false;
  private _translationLanguage = "";

  setConfig(config: unknown): void {
    this._config = { ...normalizeConfig(config as ABetterHistoryCardConfig) };
  }

  protected override updated(): void {
    void this._loadTranslations();
  }

  getCardSize(): number {
    return 1;
  }

  getGridOptions(): LovelaceCardGridOptions {
    return {
      columns: 3,
      rows: 1,
      min_columns: 1,
      min_rows: 1
    };
  }

  private _openDialog(): void {
    this._open = true;
  }

  private _onDialogClosed(event: Event): void {
    event.stopPropagation();
    this._open = false;
  }

  private async _loadTranslations(): Promise<void> {
    const language = languageFromHass(this.hass);
    if (language === this._translationLanguage) return;
    this._translationLanguage = language;
    await ensureTranslations(this.hass, language);
    this.requestUpdate();
  }

  protected render(): TemplateResult {
    const cfg = this._config;
    const icon = cfg?.button_icon ?? "mdi:chart-line";
    const label = cfg?.button_label ?? localize(this.hass, "dialog.title.history");
    const showName = cfg?.button_show_name !== false;
    const showIcon = cfg?.button_show_icon !== false;
    const hoverEffect = cfg?.button_hover_effect !== false;
    const color = cssColor(cfg?.button_color);
    const hoverColor = cssColor(cfg?.button_hover_color);
    const backgroundColor = cssColor(cfg?.card_background_color);
    const backgroundOpacity = normalizedOpacity(cfg?.card_background_opacity);
    const language = this.hass?.locale?.language ?? this.hass?.language;

    const cardStyleParts: string[] = [];
    if (color) cardStyleParts.push(`--_btn-color: ${color}`);
    if (hoverColor) cardStyleParts.push(`--_btn-hover-color: ${hoverColor}`);
    if (backgroundColor && backgroundOpacity !== undefined) {
      cardStyleParts.push(`--_card-bg: color-mix(in srgb, ${backgroundColor} ${backgroundOpacity}%, transparent)`);
    } else if (backgroundColor) {
      cardStyleParts.push(`--_card-bg: ${backgroundColor}`);
    } else if (backgroundOpacity !== undefined) {
      cardStyleParts.push(`--_card-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) ${backgroundOpacity}%, transparent)`);
    }
    cardStyleParts.push(`--_btn-hover-shadow: ${hoverEffect ? "0 0 0 2px var(--_btn-hover-color, var(--primary-color))" : "none"}`);
    const cardStyle = cardStyleParts.join("; ");

    return html`
      <ha-card style=${cardStyle} @click=${this._openDialog}>
        <div class="btn-content">
          ${showIcon ? html`<ha-icon icon=${icon}></ha-icon>` : null}
          ${showName ? html`<span class="label">${label}</span>` : null}
        </div>
      </ha-card>
      <abh-history-dialog
        .open=${this._open}
        .hass=${this.hass}
        .config=${cfg}
        .language=${language}
        @abh-dialog-closed=${this._onDialogClosed}
      ></abh-history-dialog>
    `;
  }
}
