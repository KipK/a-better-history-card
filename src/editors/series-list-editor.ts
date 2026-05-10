import { LitElement, css, html, type TemplateResult } from "lit";
import "./series-item-editor.js";
import type { CardSeriesConfig } from "../types/config.js";
import type { HomeAssistant } from "../types/ha.js";

export class SeriesListEditor extends LitElement {
  static properties = {
    series: { attribute: false },
    hass: { attribute: false },
    _dragIndex: { state: true },
    _dragOverIndex: { state: true }
  };

  static styles = css`
    :host {
      display: block;
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

    .add-btn {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      width: 100%;
    }

    .add-attr-btn {
      --wa-color-fill-normal: var(--ha-color-amber-80, #ffb74d);
      --wa-color-on-normal: #3d2800;
      --ha-color-fill-primary-normal-hover: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 85%, black 15%);
      --ha-color-fill-primary-normal-active: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 70%, black 30%);
    }
  `;

  series: CardSeriesConfig[] = [];
  hass?: HomeAssistant;
  private _dragIndex = -1;
  private _dragOverIndex = -1;

  private _emit(series: CardSeriesConfig[]): void {
    this.dispatchEvent(
      new CustomEvent("series-changed", {
        detail: { series },
        bubbles: true,
        composed: true
      })
    );
  }

  private _add(): void {
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

  protected render(): TemplateResult {
    return html`
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
      <div class="add-btn">
        <ha-button class="add-attr-btn" size="small" appearance="filled" @click=${() => this._add()}>
          <ha-icon icon="mdi:playlist-plus" slot="start"></ha-icon>
          Add attribute
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
