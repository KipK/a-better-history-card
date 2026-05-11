import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import "../components/history-dialog.js";
import { buildBetterHistoryConfig } from "../data/build-better-history-config.js";
import { normalizeConfig } from "../data/normalize-config.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import { CARD_TYPE, EDITOR_TAG } from "../const.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardGridOptions } from "../types/ha.js";

// Resolved at runtime relative to the bundle — do not let Vite resolve this path.
const HISTORY_ELEMENT_URL = new URL(
  /* @vite-ignore */ "lib/ha-better-history/define.js",
  import.meta.url
).toString();

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

export class ABetterHistoryCard extends LitElement implements LovelaceCard {
  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  static getStubConfig(hass: HomeAssistant): ABetterHistoryCardConfig {
    const states = hass.states;
    const entityId =
      Object.keys(states).find(
        (id) => /^sensor\.[^.]*temperature/.test(id) || id.startsWith("climate.")
      ) ??
      Object.keys(states).find(
        (id) => id.startsWith("sensor.") && !isNaN(Number(states[id]?.state))
      );
    if (entityId) {
      return {
        type: CARD_TYPE,
        entities: [entityId],
        range_mode: "relative",
        hours: 24,
        show_entity_picker: true,
        show_legend: true,
        show_tooltip: true
      };
    }
    return { type: CARD_TYPE };
  }

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _toolsOpen: { state: true },
    _controlsVisible: { state: true },
    _dialogOpen: { state: true },
    _historyElementReady: { state: true }
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      gap: 8px;
      min-height: 40px;
      padding: 4px 8px 0;
    }

    .header-actions {
      align-items: center;
      display: flex;
      gap: 4px;
      margin-inline-start: auto;
    }

    .header-actions ha-icon-button {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      --mdc-icon-size: 20px;
      color: var(--primary-text-color);
    }

    .card-title {
      font-weight: 500;
      line-height: 1.25;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    ha-better-history {
      --better-history-min-height: 0px;
      --better-history-surface-overflow-y: hidden;
      flex: 1;
      min-height: 0;
    }

    .error {
      align-items: center;
      color: var(--error-color, red);
      display: flex;
      justify-content: center;
      padding: 16px;
    }

    .loading {
      align-items: center;
      color: var(--secondary-text-color);
      display: flex;
      flex: 1;
      justify-content: center;
    }
  `;

  hass?: HomeAssistant;
  private _config?: ABetterHistoryCardConfig;
  private _toolsOpen = false;
  private _controlsVisible = true;
  private _dialogOpen = false;
  private _historyElementReady = customElements.get("ha-better-history") !== undefined;
  private _historyElementLoadStarted = false;

  setConfig(config: unknown): void {
    const raw = config as ABetterHistoryCardConfig;
    if (!raw.entities?.length && !raw.series?.length) {
      // Allow empty config — show placeholder rather than throw.
    }
    this._config = { ...normalizeConfig(raw) };
    this._controlsVisible = this._config.show_controls ?? true;
    void this._loadHistoryElement();
  }

  getCardSize(): number {
    const rows = this._config?.grid_options?.rows;
    if (typeof rows === "number") return rows;
    return 6;
  }

  getGridOptions(): LovelaceCardGridOptions {
    return {
      columns: 12,
      rows: 6,
      min_columns: 6,
      min_rows: 2
    };
  }

  private async _loadHistoryElement(): Promise<void> {
    if (this._historyElementReady || this._historyElementLoadStarted) return;
    this._historyElementLoadStarted = true;

    try {
      await import(/* @vite-ignore */ HISTORY_ELEMENT_URL);
      await customElements.whenDefined("ha-better-history");
      this._historyElementReady = true;
    } catch (error) {
      console.warn("[a-better-history-card] Failed to load ha-better-history:", error);
      this._historyElementLoadStarted = false;
    }
  }

  private _openDialog(): void {
    this._dialogOpen = true;
  }

  private _onDialogClosed(e: Event): void {
    e.stopPropagation();
    this._dialogOpen = false;
  }

  private _renderHeader(): TemplateResult | typeof nothing {
    const cfg = this._config;
    const title = cfg?.title;
    const showChevron = !!(cfg?.show_controls_toggle && (cfg?.show_date_picker || cfg?.show_entity_picker));
    const hasButtons = cfg?.show_tools_button || showChevron || cfg?.show_fullscreen_button;

    if (!title && !hasButtons) return nothing;

    const titleColor = cssColor(cfg?.title_color);
    const titleStyle = [
      cfg?.title_font_family ? `font-family:${cfg.title_font_family};` : "",
      cfg?.title_font_size ? `font-size:${cfg.title_font_size};` : "",
      titleColor ? `color:${titleColor};` : ""
    ].join("");

    return html`
      <div class="header">
        ${title ? html`<div class="card-title" style=${titleStyle}>${title}</div>` : nothing}
        ${hasButtons ? html`<div class="header-actions">
          ${cfg.show_tools_button
            ? html`<ha-icon-button
                .label=${"Tools"}
                ?active=${this._toolsOpen}
                @click=${() => { this._toolsOpen = !this._toolsOpen; }}
              ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>`
            : nothing}
          ${showChevron
            ? html`<ha-icon-button
                .label=${this._controlsVisible ? "Hide controls" : "Show controls"}
                @click=${() => { this._controlsVisible = !this._controlsVisible; }}
              ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>`
            : nothing}
          ${cfg.show_fullscreen_button
            ? html`<ha-icon-button
                .label=${"Fullscreen"}
                @click=${() => this._openDialog()}
              ><ha-icon icon="mdi:fullscreen"></ha-icon></ha-icon-button>`
            : nothing}
        </div>` : nothing}
      </div>
    `;
  }

  protected render(): TemplateResult {
    const cfg = this._config;

    if (!cfg) {
      return html`<div class="error">No configuration.</div>`;
    }

    if (!cfg.entities?.length && !cfg.series?.length) {
      return html`<div class="error">Configure at least one entity.</div>`;
    }

    if (!this._historyElementReady) {
      return html`<div class="loading">Loading history…</div>`;
    }

    const bhConfig = buildBetterHistoryConfig(cfg, !!cfg.title);
    const language = this.hass?.locale?.language ?? this.hass?.language;

    return html`
      ${this._renderHeader()}
      <ha-better-history
        .hass=${this.hass}
        .config=${bhConfig}
        .language=${language}
        .toolsOpen=${this._toolsOpen}
        .showControls=${this._controlsVisible}
        style="width:100%;height:100%;"
      ></ha-better-history>
      <abh-history-dialog
        .open=${this._dialogOpen}
        .hass=${this.hass}
        .config=${cfg}
        .language=${language}
        @dialog-closed=${this._onDialogClosed}
      ></abh-history-dialog>
    `;
  }
}
