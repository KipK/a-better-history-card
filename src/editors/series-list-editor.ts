import { LitElement, css, html, type TemplateResult } from "lit";
import "./series-item-editor.js";
import type { HistorySource } from "@kipk/ha-better-history";
import type { CardSeriesConfig } from "../types/config.js";
import type { HomeAssistant } from "../types/ha.js";
import { sourceToSeriesConfig } from "../data/source-to-series.js";
import { ensureHaComponents } from "../ha/load-components.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

export class SeriesListEditor extends LitElement {
  static properties = {
    series: { attribute: false },
    hass: { attribute: false },
    _dragIndex: { state: true },
    _dragOverIndex: { state: true },
    _componentsReady: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .picker-section {
      margin-bottom: 0;
      max-height: 44px;
      min-height: 36px;
      overflow: visible;
      position: relative;
    }

    .picker-section abh-series-picker {
      display: block;
      max-height: 44px;
      overflow: visible;
    }

    .series-list {
      margin-top: 8px;
    }

    .series-panel {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      display: block;
      margin-bottom: 8px;
      overflow: hidden;
    }

    .series-panel[drag-over] {
      border-color: var(--primary-color);
    }

    .series-summary {
      align-items: center;
      display: grid;
      gap: 8px;
      grid-template-columns: auto minmax(0, 1fr) auto;
      min-height: 40px;
      padding: 4px 8px;
    }

    .drag-handle {
      color: var(--secondary-text-color);
      cursor: grab;
      flex: 0 0 auto;
    }

    .series-title {
      color: var(--primary-text-color);
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .series-subtitle {
      color: var(--secondary-text-color);
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .series-details {
      border-top: 1px solid var(--divider-color);
      padding: 8px;
    }

    .delete-btn {
      flex: 0 0 auto;
    }

  `;

  series: CardSeriesConfig[] = [];
  hass?: HomeAssistant;
  private _dragIndex = -1;
  private _dragOverIndex = -1;
  private _componentsReady = false;
  private _translationLanguage = "";

  override connectedCallback(): void {
    super.connectedCallback();
    ensureHaComponents().then(() => { this._componentsReady = true; });
  }

  protected override updated(): void {
    void this._loadTranslations();
  }

  private async _loadTranslations(): Promise<void> {
    const language = languageFromHass(this.hass);
    if (language === this._translationLanguage) return;
    this._translationLanguage = language;
    await ensureTranslations(this.hass, language);
    this.requestUpdate();
  }

  private _emit(series: CardSeriesConfig[]): void {
    this.dispatchEvent(
      new CustomEvent("series-changed", {
        detail: { series },
        bubbles: true,
        composed: true
      })
    );
  }

  private _remove(index: number): void {
    this._emit(this.series.filter((_, i) => i !== index));
  }

  private _onItemChanged(index: number, item: CardSeriesConfig): void {
    this._emit(this.series.map((s, i) => (i === index ? item : s)));
  }

  private _onDragStart(index: number): void {
    this._dragIndex = index;
  }

  private _onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
    this._dragOverIndex = index;
  }

  private _onDrop(index: number): void {
    if (this._dragIndex < 0 || this._dragIndex === index) {
      this._dragIndex = -1;
      this._dragOverIndex = -1;
      return;
    }
    const next = [...this.series];
    const [item] = next.splice(this._dragIndex, 1);
    next.splice(index, 0, item);
    this._dragIndex = -1;
    this._dragOverIndex = -1;
    this._emit(next);
  }

  private _onDragEnd(): void {
    this._dragIndex = -1;
    this._dragOverIndex = -1;
  }

  private _onSourcesConfirmed(event: CustomEvent<{ sources: HistorySource[] }>): void {
    const added = event.detail.sources.map(sourceToSeriesConfig);
    if (added.length > 0) {
      this._emit([...this.series, ...added]);
    }
  }

  private _seriesTitle(item: CardSeriesConfig): string {
    if (item.label) return item.label;
    if (!item.entity) return localize(this.hass, "editor.series.new_series");
    const friendlyName = this.hass?.states[item.entity]?.attributes.friendly_name;
    return typeof friendlyName === "string" && friendlyName ? friendlyName : item.entity;
  }

  private _seriesSubtitle(item: CardSeriesConfig): string {
    const parts = [item.entity, item.attribute].filter((part): part is string => Boolean(part));
    return parts.length > 0 ? parts.join(" · ") : localize(this.hass, "editor.series.no_entity_selected");
  }

  protected render(): TemplateResult {
    return html`
      <div class="picker-section">
        <abh-series-picker
          .hass=${this.hass}
          @sources-confirmed=${(e: CustomEvent<{ sources: HistorySource[] }>) =>
            this._onSourcesConfirmed(e)}
        ></abh-series-picker>
      </div>
      <div class="series-list">
        ${this.series.map((item, i) => this._renderSeriesPanel(item, i))}
      </div>
    `;
  }

  private _renderSeriesPanel(item: CardSeriesConfig, index: number): TemplateResult {
    const header = html`
      <div class="series-summary">
        <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
        <div>
          <div class="series-title">${this._seriesTitle(item)}</div>
          <div class="series-subtitle">${this._seriesSubtitle(item)}</div>
        </div>
        <ha-icon-button
          class="delete-btn"
          .label=${localize(this.hass, "editor.series.remove")}
          @click=${(event: Event) => {
            event.stopPropagation();
            this._remove(index);
          }}
        ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
      </div>
    `;

    const content = html`
      <div class="series-details">
        <abh-series-item-editor
          .series=${item}
          .hass=${this.hass}
          @item-changed=${(e: CustomEvent<{ item: CardSeriesConfig }>) =>
            this._onItemChanged(index, e.detail.item)}
        ></abh-series-item-editor>
      </div>
    `;

    if (!this._componentsReady) {
      return html`${header}${content}`;
    }

    return html`
      <ha-expansion-panel
        class="series-panel"
        outlined
        ?drag-over=${this._dragOverIndex === index}
        draggable="true"
        @dragstart=${() => this._onDragStart(index)}
        @dragover=${(e: DragEvent) => this._onDragOver(e, index)}
        @drop=${() => this._onDrop(index)}
        @dragend=${() => this._onDragEnd()}
      >
        <div slot="header">${header}</div>
        ${content}
      </ha-expansion-panel>
    `;
  }
}

if (!customElements.get("abh-series-list-editor")) {
  customElements.define("abh-series-list-editor", SeriesListEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "abh-series-list-editor": SeriesListEditor;
  }
}
