import { LitElement, css, html, type TemplateResult } from "lit";
import "../components/history-dialog.js";
import { normalizeConfig } from "../data/normalize-config.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import { BUTTON_CARD_TYPE, BUTTON_EDITOR_TAG } from "../const.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardGridOptions } from "../types/ha.js";

export class ABetterHistoryButtonCard extends LitElement implements LovelaceCard {
  static getConfigElement(): HTMLElement {
    return document.createElement(BUTTON_EDITOR_TAG);
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
        type: BUTTON_CARD_TYPE,
        entities: [entityId],
        range_mode: "relative",
        hours: 24,
        show_entity_picker: true,
        show_legend: true,
        show_tooltip: true
      };
    }
    return { type: BUTTON_CARD_TYPE };
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
      color: var(--primary-text-color);
    }

    .label {
      color: var(--primary-text-color);
      font-size: 0.9em;
    }
  `;

  hass?: HomeAssistant;
  private _config?: ABetterHistoryCardConfig;
  private _open = false;

  setConfig(config: unknown): void {
    this._config = { ...normalizeConfig(config as ABetterHistoryCardConfig) };
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

  private _onDialogClosed(): void {
    this._open = false;
  }

  protected render(): TemplateResult {
    const cfg = this._config;
    const icon = cfg?.button_icon ?? "mdi:chart-line";
    const label = cfg?.button_label ?? "History";
    const showName = cfg?.button_show_name !== false;
    const language = this.hass?.locale?.language ?? this.hass?.language;

    return html`
      <ha-card @click=${this._openDialog}>
        <div class="btn-content">
          <ha-icon icon=${icon}></ha-icon>
          ${showName ? html`<span class="label">${label}</span>` : null}
        </div>
      </ha-card>
      <abh-history-dialog
        .open=${this._open}
        .hass=${this.hass}
        .config=${cfg}
        .language=${language}
        @dialog-closed=${this._onDialogClosed}
      ></abh-history-dialog>
    `;
  }
}
