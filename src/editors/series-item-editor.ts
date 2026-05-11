import { LitElement, css, html, type TemplateResult } from "lit";
import type { CardSeriesConfig } from "../types/config.js";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant } from "../types/ha.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

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
      { name: "color", selector: { text: {} } },
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
    const schema = this._schema();
    const lineWidthSchema = schema.filter((item) => item.name === "line_width");
    const mainSchema = schema.filter((item) => item.name !== "line_width");

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
