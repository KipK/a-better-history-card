import { LitElement, css, html, type TemplateResult } from "lit";
import "./series-list-editor.js";
import type { CardSeriesConfig, ABetterHistoryCardConfig } from "../types/config.js";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant, LovelaceCardEditor } from "../types/ha.js";
import { ensureDateRangePicker, ensureHaComponents } from "../ha/load-components.js";
import { normalizeConfig } from "../data/normalize-config.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

const COLOR_FIELD_NAMES = new Set(["title_color", "button_color", "button_hover_color"]);

function cssColor(value: string | number[] | undefined): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (!Array.isArray(value) || value.length < 3) return undefined;

  const [r, g, b] = value.map((part) => Number(part));
  if (![r, g, b].every((part) => Number.isFinite(part))) return undefined;

  return `rgb(${r}, ${g}, ${b})`;
}

export abstract class BaseCardEditor extends LitElement implements LovelaceCardEditor {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _activeTab: { state: true },
    _componentsReady: { state: true },
    _dateRangePickerReady: { state: true }
  };

  static styles = css`
    .tabs {
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      margin-bottom: 12px;
    }

    .tab {
      background: transparent;
      border: 0;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      font: inherit;
      padding: 8px 10px;
    }

    .tab[active] {
      border-bottom-color: var(--primary-color);
      color: var(--primary-text-color);
    }

    .date-range-section {
      margin-top: 12px;
    }

    .date-range-label {
      color: var(--secondary-text-color);
      display: block;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .color-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      margin-top: 12px;
    }

    .color-picker {
      max-width: 260px;
      width: 100%;
    }

    .line-width-form {
      display: block;
      max-width: 160px;
    }

    @media (min-width: 721px) {
      .entities-tab {
        min-height: 360px;
      }
    }
  `;

  hass?: HomeAssistant;
  protected _config: ABetterHistoryCardConfig = { type: "" };
  protected _activeTab = "";
  private _componentsReady = false;
  private _dateRangePickerReady = false;
  private _translationLanguage = "";

  override connectedCallback(): void {
    super.connectedCallback();
    ensureHaComponents().then(() => { this._componentsReady = true; });
    ensureDateRangePicker().then(() => { this._dateRangePickerReady = customElements.get("ha-date-range-picker") !== undefined; });
  }

  protected override updated(): void {
    void this._loadTranslations();
  }

  setConfig(config: unknown): void {
    this._config = { ...normalizeConfig(config as ABetterHistoryCardConfig) };
    const tabs = this._tabs();
    if (!tabs.find((t) => t.id === this._activeTab)) {
      this._activeTab = tabs[0]?.id ?? "";
    }
  }

  protected abstract _tabs(): Array<{ id: string; label: string }>;
  protected abstract _schema(tab: string): HaFormSchema[];

  protected _localize(key: string): string {
    return localize(this.hass, key);
  }

  private async _loadTranslations(): Promise<void> {
    const language = languageFromHass(this.hass);
    if (language === this._translationLanguage) return;
    this._translationLanguage = language;
    await ensureTranslations(this.hass, language);
    this.requestUpdate();
  }

  // Shared schema builders

  protected _rangeSchema(): HaFormSchema[] {
    return [
      {
        name: "range_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "relative", label: this._localize("editor.option.relative_hours") },
              { value: "absolute", label: this._localize("editor.option.absolute_date_range") }
            ]
          }
        }
      },
      { name: "hours", selector: { number: { min: 1 } } }
    ];
  }

  protected _displaySchema(): HaFormSchema[] {
    return [
      { name: "show_date_picker", selector: { boolean: {} } },
      { name: "show_entity_picker", selector: { boolean: {} } },
      { name: "show_legend", selector: { boolean: {} } },
      { name: "show_tooltip", selector: { boolean: {} } },
      { name: "show_grid", selector: { boolean: {} } },
      { name: "show_scale", selector: { boolean: {} } },
      { name: "show_controls", selector: { boolean: {} } },
      { name: "disable_climate_overlay", selector: { boolean: {} } }
    ];
  }

  protected _styleSchema(): HaFormSchema[] {
    return [
      {
        name: "line_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "line", label: this._localize("editor.option.line") },
              { value: "stair", label: this._localize("editor.option.stair") },
              { value: "column", label: this._localize("editor.option.column") }
            ]
          }
        }
      },
      { name: "line_width", selector: { number: { min: 1, max: 5, mode: "box" } } },
      { name: "title_font_family", selector: { text: {} } },
      { name: "title_font_size", selector: { text: {} } },
      { name: "title_color", selector: { color_rgb: {} } }
    ];
  }

  protected _headerSchema(): HaFormSchema[] {
    return [
      { name: "title", selector: { text: {} } },
      { name: "show_tools_button", selector: { boolean: {} } },
      { name: "show_controls_toggle", selector: { boolean: {} } },
      { name: "show_fullscreen_button", selector: { boolean: {} } }
    ];
  }

  protected _toolsSchema(): HaFormSchema[] {
    return [
      { name: "show_line_mode_buttons", selector: { boolean: {} } },
      { name: "show_import_button", selector: { boolean: {} } },
      { name: "show_export_button", selector: { boolean: {} } },
      { name: "show_time_range_selector", selector: { boolean: {} } }
    ];
  }

  protected _buttonSchema(): HaFormSchema[] {
    return [
      { name: "button_show_name", selector: { boolean: {} } },
      { name: "button_show_icon", selector: { boolean: {} } },
      { name: "button_hover_effect", selector: { boolean: {} } },
      { name: "button_label", selector: { text: {} } },
      { name: "button_icon", selector: { icon: {} } },
      { name: "button_color", selector: { color_rgb: {} } },
      { name: "button_hover_color", selector: { color_rgb: {} } }
    ];
  }

  protected _advancedSchema(): HaFormSchema[] {
    return [
      { name: "attribute_units", selector: { text: { multiline: true } } },
      { name: "debug_performance", selector: { boolean: {} } }
    ];
  }

  private _computeLabel(schema: HaFormSchema): string {
    return this._localize(`editor.field.${schema.name}`);
  }

  private _getFormData(): Record<string, unknown> {
    const data = { ...this._config } as Record<string, unknown>;
    if (data.attribute_units && typeof data.attribute_units === "object") {
      data.attribute_units = JSON.stringify(data.attribute_units, null, 2);
    }
    return data;
  }

  private _valueChanged(event: HaFormChangedEvent<Record<string, unknown>>): void {
    const raw = { ...event.detail.value };

    if (typeof raw.attribute_units === "string") {
      try { raw.attribute_units = JSON.parse(raw.attribute_units); } catch { delete raw.attribute_units; }
    }

    this._config = { ...this._config, ...(raw as unknown as ABetterHistoryCardConfig) };
    this._emitConfig();
  }

  private _lineWidthChanged(event: HaFormChangedEvent<Record<string, unknown>>): void {
    const raw = event.detail.value;
    const next = { ...this._config };
    const value = raw.line_width;

    if (value === undefined || value === "") {
      delete next.line_width;
    } else {
      next.line_width = value as number | string;
    }

    this._config = next;
    this._emitConfig();
  }

  private _onSeriesChanged(event: CustomEvent<{ series: CardSeriesConfig[] }>): void {
    this._config = { ...this._config, series: event.detail.series };
    this._emitConfig();
  }

  private _emitConfig(): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      })
    );
  }

  protected render(): TemplateResult {
    const tabs = this._tabs();
    const activeTab = tabs.find((t) => t.id === this._activeTab)?.id ?? tabs[0]?.id ?? "";

    return html`
      <div class="tabs">
        ${tabs.map(
          (tab) => html`
            <button
              class="tab"
              ?active=${tab.id === activeTab}
              @click=${() => { this._activeTab = tab.id; }}
            >${tab.label}</button>
          `
        )}
      </div>
      ${activeTab === "entities" ? this._renderEntitiesTab() : activeTab === "range" ? this._renderRangeTab() : activeTab === "style" ? this._renderStyleTab() : activeTab === "button" ? this._renderButtonTab() : html`
        <ha-form
          .hass=${this.hass}
          .data=${this._getFormData()}
          .schema=${this._schema(activeTab)}
          .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
          @value-changed=${(e: HaFormChangedEvent<Record<string, unknown>>) => this._valueChanged(e)}
        ></ha-form>
      `}
    `;
  }

  private _renderSchemaForm(schema: HaFormSchema[], data: Record<string, unknown> = this._getFormData()): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
        @value-changed=${(e: HaFormChangedEvent<Record<string, unknown>>) => this._valueChanged(e)}
      ></ha-form>
    `;
  }

  private _withoutColorFields(schema: HaFormSchema[]): HaFormSchema[] {
    return schema.filter((item) => !COLOR_FIELD_NAMES.has(item.name));
  }

  private _colorFields(schema: HaFormSchema[]): HaFormSchema[] {
    return schema.filter((item) => COLOR_FIELD_NAMES.has(item.name));
  }

  private _renderStyleTab(): TemplateResult {
    const schema = this._styleSchema();
    const lineWidthSchema = schema.filter((item) => item.name === "line_width");
    const mainSchema = this._withoutColorFields(schema).filter((item) => item.name !== "line_width");

    return html`
      ${this._renderSchemaForm(mainSchema)}
      <ha-form
        class="line-width-form"
        .hass=${this.hass}
        .data=${this._getFormData()}
        .schema=${lineWidthSchema}
        .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
        @value-changed=${(e: HaFormChangedEvent<Record<string, unknown>>) => this._lineWidthChanged(e)}
      ></ha-form>
      ${this._renderColorGrid(this._colorFields(schema))}
    `;
  }

  private _renderButtonTab(): TemplateResult {
    const schema = this._buttonSchema();

    return html`
      ${this._renderSchemaForm(this._withoutColorFields(schema))}
      ${this._renderColorGrid(this._colorFields(schema))}
    `;
  }

  private _renderColorGrid(schema: HaFormSchema[]): TemplateResult {
    return html`
      <div class="color-grid">
        ${schema.map((item) => this._renderColorField(item))}
      </div>
    `;
  }

  private _renderColorField(schema: HaFormSchema): TemplateResult {
    return html`
      <ha-color-picker
        class="color-picker"
        .label=${this._computeLabel(schema)}
        .value=${this._colorValue(schema.name)}
        @value-changed=${(event: CustomEvent<{ value?: string | number[] }>) => this._colorChanged(schema.name, event)}
      ></ha-color-picker>
    `;
  }

  private _colorValue(name: string): string | undefined {
    const value = (this._config as unknown as Record<string, unknown>)[name];
    if (typeof value === "string" && value.trim() !== "") return value;
    if (!Array.isArray(value) || value.length < 3) return undefined;

    const [r, g, b] = value.map((part) => Number(part));
    if (![r, g, b].every((part) => Number.isFinite(part))) return undefined;

    return `rgb(${r}, ${g}, ${b})`;
  }

  private _colorChanged(name: string, event: CustomEvent<{ value?: string | number[] }>): void {
    const next = { ...this._config } as Record<string, unknown>;
    const value = cssColor(event.detail.value);
    if (value === undefined || value === "") {
      delete next[name];
    } else {
      next[name] = value;
    }
    this._config = next as unknown as ABetterHistoryCardConfig;
    this._emitConfig();
  }

  private _renderEntitiesTab(): TemplateResult {
    return html`
      <div class="entities-tab">
        <abh-series-list-editor
          .series=${this._config.series ?? []}
          .hass=${this.hass}
          @series-changed=${(e: CustomEvent<{ series: CardSeriesConfig[] }>) => this._onSeriesChanged(e)}
        ></abh-series-list-editor>
      </div>
    `;
  }

  private _renderRangeTab(): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._getFormData()}
        .schema=${this._rangeSchema()}
        .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
        @value-changed=${(e: HaFormChangedEvent<Record<string, unknown>>) => this._valueChanged(e)}
      ></ha-form>
      ${this._config.range_mode === "absolute" && this._componentsReady && this._dateRangePickerReady
        ? html`
            <div class="date-range-section">
              <span class="date-range-label">${this._localize("editor.date_range")}</span>
              <ha-date-range-picker
                .hass=${this.hass}
                .startDate=${this._dateRangeStartDate()}
                .endDate=${this._dateRangeEndDate()}
                time-picker
                extended-presets
                @value-changed=${(event: CustomEvent) => this._dateRangeChanged(event)}
              ></ha-date-range-picker>
            </div>
          `
        : html``}
    `;
  }

  private _dateRangeStartDate(): Date {
    return this._coerceDate(this._config.start_date) ?? new Date(Date.now() - 24 * 3600000);
  }

  private _dateRangeEndDate(): Date {
    return this._coerceDate(this._config.end_date) ?? new Date();
  }

  private _coerceDate(value: unknown): Date | undefined {
    if (value instanceof Date && Number.isFinite(value.getTime())) return value;
    if (typeof value !== "string" || value === "") return undefined;
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? date : undefined;
  }

  private _dateRangeChanged(event: CustomEvent): void {
    const detail = event.detail as {
      value?: { startDate?: unknown; endDate?: unknown };
      startDate?: unknown;
      endDate?: unknown;
    };
    const startDate = this._coerceDate(detail.value?.startDate ?? detail.startDate);
    const endDate = this._coerceDate(detail.value?.endDate ?? detail.endDate);

    if (!startDate || !endDate) return;

    this._config = {
      ...this._config,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString()
    };
    this._emitConfig();
  }
}
