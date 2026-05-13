import { LitElement, css, html, type TemplateResult } from "lit";
import type { CardSeriesConfig } from "../types/config.js";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant } from "../types/ha.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

function cssColor(value: string | number[] | undefined): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (!Array.isArray(value) || value.length < 3) return undefined;

  const [r, g, b] = value.map((part) => Number(part));
  if (![r, g, b].every((part) => Number.isFinite(part))) return undefined;

  return `rgb(${r}, ${g}, ${b})`;
}

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

    .color-picker {
      display: block;
      margin-top: 8px;
      max-width: 260px;
      width: 100%;
    }
  `;

  series: CardSeriesConfig = { entity: "" };
  hass?: HomeAssistant;
  private _translationLanguage = "";

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

  private _schema(): HaFormSchema[] {
    const manualScaleSchema: HaFormSchema[] = this.series.scale_mode === "manual"
      ? [
          { name: "scale_min", selector: { number: {} } },
          { name: "scale_max", selector: { number: {} } }
        ]
      : [];

    return [
      { name: "entity", selector: { entity: {} } },
      { name: "attribute", selector: { text: {} } },
      { name: "label", selector: { text: {} } },
      { name: "unit", selector: { text: {} } },
      { name: "scale_group", selector: { text: {} } },
      {
        name: "scale_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: localize(this.hass, "editor.option.auto") },
              { value: "manual", label: localize(this.hass, "editor.option.manual") }
            ]
          }
        }
      },
      ...manualScaleSchema,
      {
        name: "line_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "line", label: localize(this.hass, "editor.option.line") },
              { value: "stair", label: localize(this.hass, "editor.option.stair") },
              { value: "column", label: localize(this.hass, "editor.option.column") }
            ]
          }
        }
      },
      { name: "line_width", selector: { number: { min: 1, max: 5, mode: "box" } } },
      { name: "forced", selector: { boolean: {} } }
    ];
  }

  private _computeLabel(schema: HaFormSchema): string {
    return localize(this.hass, `editor.field.${schema.name}`);
  }

  private _valueChanged(event: HaFormChangedEvent<CardSeriesConfig>): void {
    const value = { forced: true, ...event.detail.value };

    this._emitItem(this._withDefaultUnit(value));
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

  private _withDefaultUnit(item: CardSeriesConfig): CardSeriesConfig {
    if (item.unit || item.entity === this.series.entity) return item;

    const unit = this._entityUnit(item.entity);
    return unit ? { ...item, unit } : item;
  }

  private _entityUnit(entityId: string | undefined): string | undefined {
    if (!entityId) return undefined;

    const unit = this.hass?.states[entityId]?.attributes.unit_of_measurement;
    return typeof unit === "string" && unit.trim() !== "" ? unit : undefined;
  }

  private _colorValue(): string | undefined {
    return this.series.color?.trim() || undefined;
  }

  private _colorChanged(event: CustomEvent<{ value?: string | number[] }>): void {
    const next = { forced: true, ...this.series };
    const value = cssColor(event.detail.value);

    if (value === undefined || value === "") {
      delete next.color;
    } else {
      next.color = value;
    }

    this._emitItem(next);
  }

  protected render(): TemplateResult {
    const data = { forced: true, ...this.series };
    const schema = this._schema();
    const lineWidthSchema = schema.filter((item) => item.name === "line_width");
    const mainSchema = schema.filter((item) => item.name !== "line_width");
    const colorSchema: HaFormSchema = { name: "color", selector: { color_rgb: {} } };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${mainSchema}
        .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
        @value-changed=${(e: HaFormChangedEvent<CardSeriesConfig>) => this._valueChanged(e)}
      ></ha-form>
      <ha-form
        class="line-width-form"
        .hass=${this.hass}
        .data=${data}
        .schema=${lineWidthSchema}
        .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
        @value-changed=${(e: HaFormChangedEvent<CardSeriesConfig>) => this._lineWidthChanged(e)}
      ></ha-form>
      <ha-color-picker
        class="color-picker"
        .label=${this._computeLabel(colorSchema)}
        .value=${this._colorValue()}
        @value-changed=${(event: CustomEvent<{ value?: string | number[] }>) => this._colorChanged(event)}
      ></ha-color-picker>
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
