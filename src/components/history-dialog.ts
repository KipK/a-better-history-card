import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import "./card-export-dialog.js";
import type { BetterHistoryRuntimeConfigSnapshot } from "@kipk/ha-better-history";
import type { CardExportDialogError } from "./card-export-dialog.js";
import { isUsableRuntimeConfigSnapshot } from "../data/build-export-card-config.js";
import { cachedBetterHistoryConfig, type BetterHistoryConfigCache } from "../data/build-better-history-config.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import type { HomeAssistant } from "../types/ha.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

export class HistoryDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    language: {},
    _fullscreen: { state: true },
    _controlsVisible: { state: true },
    _toolsOpen: { state: true },
    _graphVisible: { state: true },
    _cardExportDialogOpen: { state: true },
    _cardExportSnapshot: { state: true },
    _cardExportError: { state: true },
  };

  static styles = css`
    :host,
    ha-dialog {
      user-select: none;
      -webkit-user-select: none;
    }

    .btn {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      --mdc-icon-size: 20px;
      color: var(--primary-text-color);
    }

    .btn-first {
      margin-inline-start: 12px;
    }

    @media (max-width: 600px) {
      .btn-first {
        margin-inline-start: 14px;
      }
      .btn-fs {
        display: none;
      }
    }

    .history {
      display: flex;
      flex: 1 1 auto;
      height: min(72vh, 58vw, 820px);
      min-height: min(420px, calc(100vh - 128px));
      min-width: 0;
      width: 100%;
    }

    ha-dialog[fullscreen] .history {
      height: min(76vh, 52vw, 860px);
      min-height: min(460px, calc(100vh - 128px));
    }
  `;

  open = false;
  hass?: HomeAssistant;
  config?: ABetterHistoryCardConfig;
  language?: string;
  private _fullscreen = false;
  private _controlsVisible = true;
  private _toolsOpen = false;
  private _graphVisible?: boolean;
  private _cardExportDialogOpen = false;
  private _cardExportSnapshot?: BetterHistoryRuntimeConfigSnapshot;
  private _cardExportError?: CardExportDialogError;
  private _translationLanguage = "";
  private _pickerOverlayOpen = false;
  private _suppressNextClose = false;
  private _suppressCloseTimer?: ReturnType<typeof setTimeout>;
  private _betterHistoryConfigCache: BetterHistoryConfigCache = {};

  protected updated(): void {
    this._styleDialogHeader();
    void this._loadTranslations();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("config")) {
      this._graphVisible = undefined;
    }
    if (changed.has("open") && !this.open) {
      this._releaseCardExport();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("pointerdown", this._onDocPointerDown, true);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("pointerdown", this._onDocPointerDown, true);
    if (this._suppressCloseTimer !== undefined) {
      clearTimeout(this._suppressCloseTimer);
      this._suppressCloseTimer = undefined;
    }
  }

  private _onDocPointerDown = (): void => {
    if (!this.open || !this._pickerOverlayOpen) return;

    this._suppressNextClose = true;
    if (this._suppressCloseTimer !== undefined) clearTimeout(this._suppressCloseTimer);
    this._suppressCloseTimer = setTimeout(() => {
      this._suppressNextClose = false;
      this._suppressCloseTimer = undefined;
    }, 1000);
  };

  private _onDialogClosed(event: Event): void {
    if (this._suppressNextClose) {
      event.stopPropagation();
      this._suppressNextClose = false;
      if (this._suppressCloseTimer !== undefined) {
        clearTimeout(this._suppressCloseTimer);
        this._suppressCloseTimer = undefined;
      }
      const dialog = event.currentTarget as HTMLElement & { open?: boolean };
      dialog.open = true;
      this.requestUpdate();
      return;
    }
    event.stopPropagation();
    this._releaseCardExport();
    this.dispatchEvent(new CustomEvent("abh-dialog-closed", { bubbles: true }));
  }

  private _onPickerOverlayChanged(event: CustomEvent<{ open: boolean }>): void {
    this._pickerOverlayOpen = event.detail.open;
  }

  private _onGraphVisibilityChanged(event: CustomEvent<{ visible: boolean }>): void {
    this._graphVisible = event.detail.visible;
    if (!this._graphVisible) this._toolsOpen = false;
  }

  private _hasConfiguredGraphTargets(cfg: ABetterHistoryCardConfig | undefined): boolean {
    return !!(cfg?.entities?.length || cfg?.series?.length);
  }

  private _graphActionsDisabled(cfg: ABetterHistoryCardConfig | undefined): boolean {
    return this._graphVisible === false
      || (this._graphVisible === undefined && !this._hasConfiguredGraphTargets(cfg));
  }

  private _openCardExportDialog(): void {
    const history = this.renderRoot.querySelector(
      "a-better-history-card-history.history",
    ) as (HTMLElement & {
      getRuntimeConfigSnapshot?: () => BetterHistoryRuntimeConfigSnapshot;
    }) | null;

    this._cardExportSnapshot = undefined;
    this._cardExportError = undefined;
    if (typeof history?.getRuntimeConfigSnapshot !== "function") {
      this._cardExportError = "incompatible_component";
    } else {
      try {
        const snapshot = history.getRuntimeConfigSnapshot();
        if (!isUsableRuntimeConfigSnapshot(snapshot)) {
          this._cardExportError = "missing_snapshot";
        } else {
          this._cardExportSnapshot = snapshot;
        }
      } catch {
        this._cardExportError = "missing_snapshot";
      }
    }
    this._cardExportDialogOpen = true;
  }

  private _releaseCardExport(): void {
    this._cardExportDialogOpen = false;
    this._cardExportSnapshot = undefined;
    this._cardExportError = undefined;
  }

  private _closeCardExportDialog(event: Event): void {
    event.stopPropagation();
    this._releaseCardExport();
  }

  private async _loadTranslations(): Promise<void> {
    const language = languageFromHass(this.hass, this.language);
    if (language === this._translationLanguage) return;
    this._translationLanguage = language;
    await ensureTranslations(this.hass, language);
    this.requestUpdate();
  }

  private _styleDialogHeader(): void {
    const dialog = this.renderRoot.querySelector("ha-dialog");
    const root = dialog?.shadowRoot;
    if (!root || root.querySelector("style[data-abh-header]")) return;

    const style = document.createElement("style");
    style.dataset.abhHeader = "true";
    style.textContent = `
      .mdc-dialog__title, .header-title, .title {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .header, .dialog-header, .mdc-dialog__header { gap: 12px; }
      [name="headerActionItems"], slot[name="headerActionItems"] { flex: 0 0 auto; }
    `;
    root.appendChild(style);
  }

  protected render(): TemplateResult {
    const cfg = this.config;
    const title = cfg?.title ?? localize(this.hass, "dialog.title.history", this.language);
    const showCardExport = cfg?.show_card_export_button !== false;
    const showTools = !!cfg?.show_tools_button;
    const showControls = !!(cfg?.show_controls_toggle && (cfg?.show_date_picker || cfg?.show_entity_picker));

    return html`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${title}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e: Event) => this._onDialogClosed(e)}
      >
        ${showCardExport
          ? html`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-first"
              .label=${localize(this.hass, "card.label.create_dashboard_card", this.language)}
              ?disabled=${this._graphActionsDisabled(cfg)}
              @click=${this._openCardExportDialog}
            ><ha-icon icon="mdi:view-dashboard-variant-outline"></ha-icon></ha-icon-button>`
          : nothing}
        ${showTools
          ? html`<ha-icon-button
              slot="headerActionItems"
              class=${`btn ${!showCardExport ? "btn-first" : ""}`}
              .label=${localize(this.hass, "card.label.tools", this.language)}
              ?active=${this._toolsOpen}
              ?disabled=${this._graphActionsDisabled(cfg)}
              @click=${() => { this._toolsOpen = !this._toolsOpen; }}
            ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>`
          : nothing}
        ${showControls
          ? html`<ha-icon-button
              slot="headerActionItems"
              class=${`btn ${!showCardExport && !showTools ? "btn-first" : ""}`}
              .label=${localize(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls", this.language)}
              @click=${() => { this._controlsVisible = !this._controlsVisible; }}
            ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>`
          : nothing}
        ${cfg?.show_fullscreen_button
          ? html`<ha-icon-button
              slot="headerActionItems"
              class=${`btn btn-fs ${!showCardExport && !showTools && !showControls ? "btn-first" : ""}`}
              .label=${localize(this.hass, this._fullscreen ? "dialog.label.exit_fullscreen" : "card.label.fullscreen", this.language)}
              @click=${() => { this._fullscreen = !this._fullscreen; }}
            ><ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon></ha-icon-button>`
          : nothing}
        ${this.open && cfg
          ? html`<a-better-history-card-history
              .hass=${this.hass}
              .config=${cachedBetterHistoryConfig(this._betterHistoryConfigCache, cfg, true)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e: CustomEvent<{ open: boolean }>) => this._onPickerOverlayChanged(e)}
              @graph-visibility-changed=${(e: CustomEvent<{ visible: boolean }>) => this._onGraphVisibilityChanged(e)}
              class="history"
            ></a-better-history-card-history>`
          : nothing}
      </ha-dialog>
      <abh-card-export-dialog
        .open=${this._cardExportDialogOpen}
        .hass=${this.hass}
        .baseConfig=${cfg}
        .snapshot=${this._cardExportSnapshot}
        .language=${this.language}
        .error=${this._cardExportError}
        @abh-card-export-dialog-closed=${this._closeCardExportDialog}
      ></abh-card-export-dialog>
    `;
  }
}

if (!customElements.get("abh-history-dialog")) {
  customElements.define("abh-history-dialog", HistoryDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "abh-history-dialog": HistoryDialog;
  }
}
