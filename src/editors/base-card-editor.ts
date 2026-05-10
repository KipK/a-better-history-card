import { LitElement, css, html, type TemplateResult } from "lit";
import "./series-list-editor.js";
import type { CardSeriesConfig, ABetterHistoryCardConfig } from "../types/config.js";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant, LovelaceCardEditor } from "../types/ha.js";

const LABELS: Record<string, string> = {
  entities: "Entities",
  series: "Series (JSON)",
  range_mode: "Range mode",
  hours: "Hours",
  start_date: "Start date",
  end_date: "End date",
  show_date_picker: "Date picker",
  show_entity_picker: "Entity picker",
  show_legend: "Legend",
  show_tooltip: "Tooltip",
  show_import_button: "Import button",
  show_controls: "Controls (chevron, initial state)",
  disable_climate_overlay: "Disable climate overlay",
  title: "Title",
  title_font_family: "Title font family",
  title_font_size: "Title font size",
  title_color: "Title color",
  background_color: "Background color",
  line_mode: "Line mode",
  line_width: "Line width",
  show_tools_button: "Tools button",
  show_controls_toggle: "Controls toggle button",
  button_label: "Button label",
  button_icon: "Button icon",
  button_show_name: "Show button name",
  show_fullscreen_button: "Fullscreen button (dialog only)",
  attribute_units: "Attribute units (JSON object)",
  debug_performance: "Debug performance"
};

export abstract class BaseCardEditor extends LitElement implements LovelaceCardEditor {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _activeTab: { state: true }
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
  `;

  hass?: HomeAssistant;
  protected _config: ABetterHistoryCardConfig = { type: "" };
  protected _activeTab = "";

  setConfig(config: unknown): void {
    this._config = { ...(config as ABetterHistoryCardConfig) };
    const tabs = this._tabs();
    if (!tabs.find((t) => t.id === this._activeTab)) {
      this._activeTab = tabs[0]?.id ?? "";
    }
  }

  protected abstract _tabs(): Array<{ id: string; label: string }>;
  protected abstract _schema(tab: string): HaFormSchema[];

  // Shared schema builders

  protected _entitiesSchema(): HaFormSchema[] {
    return [{ name: "entities", selector: { entity: { multiple: true } } }];
  }

  protected _rangeSchema(): HaFormSchema[] {
    return [
      {
        name: "range_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "relative", label: "Relative (hours)" },
              { value: "absolute", label: "Absolute (date range)" }
            ]
          }
        }
      },
      { name: "hours", selector: { number: { min: 1 } } },
      { name: "start_date", selector: { datetime: {} } },
      { name: "end_date", selector: { datetime: {} } }
    ];
  }

  protected _displaySchema(): HaFormSchema[] {
    return [
      { name: "show_date_picker", selector: { boolean: {} } },
      { name: "show_entity_picker", selector: { boolean: {} } },
      { name: "show_legend", selector: { boolean: {} } },
      { name: "show_tooltip", selector: { boolean: {} } },
      { name: "show_import_button", selector: { boolean: {} } },
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
              { value: "line", label: "Line" },
              { value: "stair", label: "Stair" },
              { value: "column", label: "Column" }
            ]
          }
        }
      },
      { name: "line_width", selector: { number: { min: 1, max: 10 } } },
      { name: "background_color", selector: { color_rgb: {} } },
      { name: "title", selector: { text: {} } },
      { name: "title_font_family", selector: { text: {} } },
      { name: "title_font_size", selector: { text: {} } },
      { name: "title_color", selector: { color_rgb: {} } }
    ];
  }

  protected _toolbarSchema(): HaFormSchema[] {
    return [
      { name: "show_tools_button", selector: { boolean: {} } },
      { name: "show_controls_toggle", selector: { boolean: {} } }
    ];
  }

  protected _buttonSchema(): HaFormSchema[] {
    return [
      { name: "button_label", selector: { text: {} } },
      { name: "button_icon", selector: { icon: {} } },
      { name: "button_show_name", selector: { boolean: {} } },
      { name: "show_fullscreen_button", selector: { boolean: {} } }
    ];
  }

  protected _advancedSchema(): HaFormSchema[] {
    return [
      { name: "attribute_units", selector: { text: { multiline: true } } },
      { name: "debug_performance", selector: { boolean: {} } }
    ];
  }

  private _computeLabel(schema: HaFormSchema): string {
    return LABELS[schema.name] ?? schema.name;
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
      ${activeTab === "entities" ? this._renderEntitiesTab() : html`
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

  private _renderEntitiesTab(): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._getFormData()}
        .schema=${this._entitiesSchema()}
        .computeLabel=${(s: HaFormSchema) => this._computeLabel(s)}
        @value-changed=${(e: HaFormChangedEvent<Record<string, unknown>>) => this._valueChanged(e)}
      ></ha-form>
      <abh-series-list-editor
        .series=${this._config.series ?? []}
        .hass=${this.hass}
        @series-changed=${(e: CustomEvent<{ series: CardSeriesConfig[] }>) => this._onSeriesChanged(e)}
      ></abh-series-list-editor>
    `;
  }
}
