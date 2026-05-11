import { LitElement, css, html, type TemplateResult } from "lit";
import type { CardSeriesConfig } from "../types/config.js";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant } from "../types/ha.js";

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: {} } },
  { name: "attribute", selector: { text: {} } },
  { name: "label", selector: { text: {} } },
  { name: "color", selector: { text: {} } },
  { name: "unit", selector: { text: {} } },
  { name: "scale_group", selector: { text: {} } },
  {
    name: "scale_mode",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "auto", label: "Auto" },
          { value: "manual", label: "Manual" }
        ]
      }
    }
  },
  {
    type: "conditional",
    name: "scale_min",
    conditions: [{ name: "scale_mode", value: "manual" }],
    schema: [{ name: "scale_min", selector: { number: {} } }]
  },
  {
    type: "conditional",
    name: "scale_max",
    conditions: [{ name: "scale_mode", value: "manual" }],
    schema: [{ name: "scale_max", selector: { number: {} } }]
  },
  {
    name: "line_mode",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "line", label: "Line" },
          { value: "stair", label: "Stair" },
          { value: "column", label: "Column" }
        ]
      }
    }
  },
  { name: "line_width", selector: { number: { min: 1, max: 5, mode: "box" } } },
  { name: "forced", selector: { boolean: {} } }
];
const LINE_WIDTH_SCHEMA = SCHEMA.filter((item) => item.name === "line_width");
const MAIN_SCHEMA = SCHEMA.filter((item) => item.name !== "line_width");

const LABELS: Record<string, string> = {
  entity: "Entity",
  attribute: "Attribute (dot path, leave blank for state)",
  label: "Label",
  color: "Color (CSS value)",
  unit: "Unit",
  scale_group: "Scale group",
  scale_mode: "Scale mode",
  scale_min: "Scale min",
  scale_max: "Scale max",
  line_mode: "Line mode",
  line_width: "Line width",
  forced: "Forced (always shown)"
};

export class SeriesItemEditor extends LitElement {
  static properties = {
    series: { attribute: false },
    hass: { attribute: false }
  };

  static styles = css`
    :host {
      display: block;
      flex: 1;
      min-width: 0;
    }

    ha-form {
      box-sizing: border-box;
      display: block;
    }

    .line-width-form {
      max-width: 160px;
    }
  `;

  series: CardSeriesConfig = { entity: "" };
  hass?: HomeAssistant;

  private _valueChanged(event: HaFormChangedEvent<CardSeriesConfig>): void {
    this._emitItem({ forced: true, ...event.detail.value });
  }

  private _lineWidthChanged(event: HaFormChangedEvent<CardSeriesConfig>): void {
    const next = { forced: true, ...this.series };
    const value = event.detail.value.line_width;

    if (value === undefined || value === "") {
      delete next.line_width;
    } else {
      next.line_width = value;
    }

    this._emitItem(next);
  }

  private _emitItem(item: CardSeriesConfig): void {
    this.dispatchEvent(
      new CustomEvent("item-changed", {
        detail: { item },
        bubbles: true,
        composed: true
      })
    );
  }

  protected render(): TemplateResult {
    const data = { forced: true, ...this.series };
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${MAIN_SCHEMA}
        .computeLabel=${(s: HaFormSchema) => LABELS[s.name] ?? s.name}
        @value-changed=${(e: HaFormChangedEvent<CardSeriesConfig>) => this._valueChanged(e)}
      ></ha-form>
      <ha-form
        class="line-width-form"
        .hass=${this.hass}
        .data=${data}
        .schema=${LINE_WIDTH_SCHEMA}
        .computeLabel=${(s: HaFormSchema) => LABELS[s.name] ?? s.name}
        @value-changed=${(e: HaFormChangedEvent<CardSeriesConfig>) => this._lineWidthChanged(e)}
      ></ha-form>
    `;
  }
}

if (!customElements.get("abh-series-item-editor")) {
  customElements.define("abh-series-item-editor", SeriesItemEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "abh-series-item-editor": SeriesItemEditor;
  }
}
