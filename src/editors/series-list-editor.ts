import { LitElement, css, html, type TemplateResult } from "lit";
import "./series-item-editor.js";
import type { HistorySource } from "@kipk/ha-better-history";
import type { CardSeriesConfig } from "../types/config.js";
import type { HomeAssistant } from "../types/ha.js";
import { sourceToSeriesConfig } from "../data/source-to-series.js";

const PICKER_ELEMENT_URL = new URL(
  /* @vite-ignore */ "lib/ha-better-history/picker.js",
  import.meta.url
).toString();

let _pickerLoaded = false;
async function loadPickerElement(): Promise<void> {
  if (_pickerLoaded) return;
  _pickerLoaded = true;
  await import(/* @vite-ignore */ PICKER_ELEMENT_URL);
}

export class SeriesListEditor extends LitElement {
  static properties = {
    series: { attribute: false },
    hass: { attribute: false },
    _dragIndex: { state: true },
    _dragOverIndex: { state: true },
    _pickerReady: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .picker-section {
      margin-bottom: 12px;
    }

    .series-row {
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      display: flex;
      align-items: flex-start;
      gap: 4px;
      margin-bottom: 8px;
      padding: 4px;
    }

    .series-row[drag-over] {
      border-color: var(--primary-color);
    }

    .drag-handle {
      color: var(--secondary-text-color);
      cursor: grab;
      flex: 0 0 auto;
      padding-top: 12px;
    }

    .delete-btn {
      flex: 0 0 auto;
    }

    .add-manual-btn {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      width: 100%;
    }
  `;

  series: CardSeriesConfig[] = [];
  hass?: HomeAssistant;
  private _dragIndex = -1;
  private _dragOverIndex = -1;
  private _pickerReady = false;

  override connectedCallback(): void {
    super.connectedCallback();
    loadPickerElement().then(() => { this._pickerReady = true; });
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

  private _addEmpty(): void {
    this._emit([...this.series, { entity: "", forced: true }]);
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

  protected render(): TemplateResult {
    return html`
      <div class="picker-section">
        ${this._pickerReady
          ? html`<abh-series-picker
              .hass=${this.hass}
              @sources-confirmed=${(e: CustomEvent<{ sources: HistorySource[] }>) =>
                this._onSourcesConfirmed(e)}
            ></abh-series-picker>`
          : html``}
      </div>
      ${this.series.map(
        (item, i) => html`
          <div
            class="series-row"
            ?drag-over=${this._dragOverIndex === i}
            draggable="true"
            @dragstart=${() => this._onDragStart(i)}
            @dragover=${(e: DragEvent) => this._onDragOver(e, i)}
            @drop=${() => this._onDrop(i)}
            @dragend=${() => this._onDragEnd()}
          >
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <abh-series-item-editor
              .series=${item}
              .hass=${this.hass}
              @item-changed=${(e: CustomEvent<{ item: CardSeriesConfig }>) =>
                this._onItemChanged(i, e.detail.item)}
            ></abh-series-item-editor>
            <ha-icon-button
              class="delete-btn"
              .label=${"Remove"}
              @click=${() => this._remove(i)}
            ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
          </div>
        `
      )}
      <div class="add-manual-btn">
        <ha-button size="small" @click=${() => this._addEmpty()}>
          <ha-icon icon="mdi:text-box-plus-outline" slot="start"></ha-icon>
          Add manually
        </ha-button>
      </div>
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
