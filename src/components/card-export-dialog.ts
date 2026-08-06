import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import type { BetterHistoryRuntimeConfigSnapshot } from "@kipk/ha-better-history";
import { buildExportCardConfig, type ExportCardType } from "../data/build-export-card-config.js";
import { serializeCardConfig } from "../data/serialize-card-config.js";
import { localize } from "../localize/localize.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import type { HomeAssistant } from "../types/ha.js";

export type CardExportDialogError = "missing_snapshot" | "incompatible_component";

export class CardExportDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    baseConfig: { attribute: false },
    snapshot: { attribute: false },
    language: {},
    error: {},
    _selectedCardType: { state: true },
    _copyStatus: { state: true },
  };

  static styles = css`
    ha-dialog {
      --mdc-dialog-min-width: min(680px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(820px, calc(100vw - 32px));
    }

    .content {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 100%;
      padding: 4px 0;
    }

    .type-label,
    .yaml-label {
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .type-selector {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
    }

    .type-selector button {
      background: transparent;
      border: 0;
      color: var(--primary-text-color);
      cursor: pointer;
      font: inherit;
      min-height: 42px;
      padding: 8px 12px;
    }

    .type-selector button + button {
      border-inline-start: 1px solid var(--divider-color);
    }

    .type-selector button[aria-checked="true"] {
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
      color: var(--primary-color);
      font-weight: 600;
    }

    .type-selector button:focus-visible,
    textarea:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .instructions,
    .status {
      color: var(--secondary-text-color);
      margin: 0;
    }

    textarea {
      background: var(--card-background-color, var(--ha-card-background));
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      box-sizing: border-box;
      color: var(--primary-text-color);
      font-family: var(--code-font-family, monospace);
      font-size: 13px;
      line-height: 1.45;
      min-height: 24em;
      padding: 12px;
      resize: vertical;
      user-select: text;
      -webkit-user-select: text;
      width: 100%;
    }

    .error {
      color: var(--error-color, #db4437);
    }

    .status {
      min-height: 1.4em;
    }

    .dialog-actions {
      align-items: center;
      border-top: 1px solid var(--divider-color);
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 2px;
      padding-top: 12px;
    }

    @media (max-width: 600px) {
      ha-dialog {
        --mdc-dialog-min-width: calc(100vw - 16px);
        --mdc-dialog-max-width: calc(100vw - 16px);
      }

      textarea {
        max-height: 42vh;
        min-height: 16em;
      }
    }
  `;

  open = false;
  hass?: HomeAssistant;
  baseConfig?: ABetterHistoryCardConfig;
  snapshot?: BetterHistoryRuntimeConfigSnapshot;
  language?: string;
  error?: CardExportDialogError;
  private _selectedCardType: ExportCardType = "inline";
  private _copyStatus: "idle" | "copied" | "failed" = "idle";

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("open") && this.open && changed.get("open") === false) {
      this._selectedCardType = "inline";
      this._copyStatus = "idle";
    }
  }

  private get _yaml(): string {
    if (this.error || !this.baseConfig || !this.snapshot || this.snapshot.importedData) return "";

    try {
      return serializeCardConfig(buildExportCardConfig(
        this.baseConfig,
        this.snapshot,
        this._selectedCardType,
      ));
    } catch {
      return "";
    }
  }

  private _messageKey(): string | undefined {
    if (this.error === "incompatible_component") return "export_dialog.incompatible_component";
    if (this.snapshot?.importedData) return "export_dialog.imported_data_unsupported";
    if (this.error || !this.baseConfig || !this.snapshot) return "export_dialog.missing_snapshot";
    return undefined;
  }

  private _selectCardType(type: ExportCardType): void {
    if (this.snapshot?.importedData || type === this._selectedCardType) return;
    this._selectedCardType = type;
    this._copyStatus = "idle";
  }

  private _onClosed(event: Event): void {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent("abh-card-export-dialog-closed", { bubbles: true }));
  }

  private _requestClose(): void {
    this.open = false;
  }

  private async _copyYaml(): Promise<void> {
    const yaml = this._yaml;
    const textarea = this.renderRoot.querySelector("textarea");
    if (!yaml || !textarea) return;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(yaml);
        this._copyStatus = "copied";
        return;
      } catch {
        // Continue with the selection-based fallback.
      }
    }

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
      if (document.execCommand("copy")) {
        this._copyStatus = "copied";
        return;
      }
    } catch {
      // Keep the YAML selected for manual copying.
    }
    this._copyStatus = "failed";
  }

  protected render(): TemplateResult {
    const yaml = this._yaml;
    const messageKey = this._messageKey();
    const typeDisabled = !!messageKey;
    const copyStatus = this._copyStatus === "copied"
      ? localize(this.hass, "export_dialog.copied", this.language)
      : this._copyStatus === "failed"
        ? localize(this.hass, "export_dialog.copy_failed", this.language)
        : "";

    return html`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${localize(this.hass, "export_dialog.title", this.language)}
        @closed=${this._onClosed}
      >
        <div class="content">
          <div class="type-label" id="card-type-label">
            ${localize(this.hass, "export_dialog.card_type_label", this.language)}
          </div>
          <div class="type-selector" role="radiogroup" aria-labelledby="card-type-label">
            <button
              type="button"
              role="radio"
              aria-checked=${this._selectedCardType === "inline" ? "true" : "false"}
              ?disabled=${typeDisabled}
              @click=${() => this._selectCardType("inline")}
            >${localize(this.hass, "export_dialog.card_type.inline", this.language)}</button>
            <button
              type="button"
              role="radio"
              aria-checked=${this._selectedCardType === "button" ? "true" : "false"}
              ?disabled=${typeDisabled}
              @click=${() => this._selectCardType("button")}
            >${localize(this.hass, "export_dialog.card_type.button", this.language)}</button>
          </div>
          <p class="instructions">
            ${localize(this.hass, "export_dialog.instructions", this.language)}
          </p>
          ${messageKey
            ? html`<p class="error">${localize(this.hass, messageKey, this.language)}</p>`
            : html`
              <label class="yaml-label" for="card-yaml">
                ${localize(this.hass, "export_dialog.yaml_label", this.language)}
              </label>
              <textarea
                id="card-yaml"
                readonly
                spellcheck="false"
                .value=${yaml}
              ></textarea>
            `}
          <div class=${`status ${this._copyStatus === "failed" ? "error" : ""}`} aria-live="polite">
            ${copyStatus || nothing}
          </div>
          <div class="dialog-actions">
            <ha-button @click=${this._requestClose}>
              ${localize(this.hass, "export_dialog.close", this.language)}
            </ha-button>
            <ha-button ?disabled=${!yaml} @click=${this._copyYaml}>
              ${localize(this.hass, "export_dialog.copy", this.language)}
            </ha-button>
          </div>
        </div>
      </ha-dialog>
    `;
  }
}

if (!customElements.get("abh-card-export-dialog")) {
  customElements.define("abh-card-export-dialog", CardExportDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "abh-card-export-dialog": CardExportDialog;
  }
}
