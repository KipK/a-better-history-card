import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import "../components/history-dialog.js";
import { buildBetterHistoryConfig } from "../data/build-better-history-config.js";
import { normalizeConfig } from "../data/normalize-config.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import { CARD_TYPE, EDITOR_TAG } from "../const.js";
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

export class ABetterHistoryCard extends LitElement implements LovelaceCard {
  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
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
      type: CARD_TYPE,
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
    _toolsOpen: { state: true },
    _controlsVisible: { state: true },
    _dialogOpen: { state: true },
    _graphVisible: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
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

    .history-frame {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      min-height: 0;
      padding: 0 8px;
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
  private _graphVisible?: boolean;
  private _translationLanguage = "";

  setConfig(config: unknown): void {
    const raw = config as ABetterHistoryCardConfig;
    if (!raw.entities?.length && !raw.series?.length) {
      // Allow empty config — show placeholder rather than throw.
    }
    this._config = { ...normalizeConfig(raw) };
    this._controlsVisible = this._config.show_controls ?? true;
    this._graphVisible = undefined;
  }

  protected override updated(): void {
    void this._loadTranslations();
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

  private async _loadTranslations(): Promise<void> {
    const language = languageFromHass(this.hass);
    if (language === this._translationLanguage) return;
    this._translationLanguage = language;
    await ensureTranslations(this.hass, language);
    this.requestUpdate();
  }

  private _openDialog(): void {
    this._dialogOpen = true;
  }

  private _onDialogClosed(e: Event): void {
    e.stopPropagation();
    this._dialogOpen = false;
  }

  private _onGraphVisibilityChanged(event: CustomEvent<{ visible: boolean }>): void {
    this._graphVisible = event.detail.visible;
    if (!this._graphVisible) this._toolsOpen = false;
  }

  private _hasConfiguredGraphTargets(cfg: ABetterHistoryCardConfig | undefined): boolean {
    return !!(cfg?.entities?.length || cfg?.series?.length);
  }

  private _toolsDisabled(cfg: ABetterHistoryCardConfig | undefined): boolean {
    return this._graphVisible === false
      || (this._graphVisible === undefined && !this._hasConfiguredGraphTargets(cfg));
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
                .label=${localize(this.hass, "card.label.tools")}
                ?active=${this._toolsOpen}
                ?disabled=${this._toolsDisabled(cfg)}
                @click=${() => { this._toolsOpen = !this._toolsOpen; }}
              ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>`
            : nothing}
          ${showChevron
            ? html`<ha-icon-button
                .label=${localize(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls")}
                @click=${() => { this._controlsVisible = !this._controlsVisible; }}
              ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>`
            : nothing}
          ${cfg.show_fullscreen_button
            ? html`<ha-icon-button
                .label=${localize(this.hass, "card.label.fullscreen")}
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
      return html`<ha-card><div class="error">${localize(this.hass, "card.error.no_configuration")}</div></ha-card>`;
    }

    const bhConfig = buildBetterHistoryConfig(cfg, !!cfg.title);
    const language = this.hass?.locale?.language ?? this.hass?.language;

    return html`
      <ha-card>
        ${this._renderHeader()}
        <div class="history-frame">
          <ha-better-history
            .hass=${this.hass}
            .config=${bhConfig}
            .language=${language}
            .toolsOpen=${this._toolsOpen}
            .showControls=${this._controlsVisible}
            @graph-visibility-changed=${(e: CustomEvent<{ visible: boolean }>) => this._onGraphVisibilityChanged(e)}
            style="width:100%;height:100%;"
          ></ha-better-history>
        </div>
        <abh-history-dialog
          .open=${this._dialogOpen}
          .hass=${this.hass}
          .config=${cfg}
          .language=${language}
          @abh-dialog-closed=${this._onDialogClosed}
        ></abh-history-dialog>
      </ha-card>
    `;
  }
}
