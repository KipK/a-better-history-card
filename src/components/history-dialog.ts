import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { buildBetterHistoryConfig } from "../data/build-better-history-config.js";
import type { ABetterHistoryCardConfig } from "../types/config.js";
import type { HomeAssistant } from "../types/ha.js";
import { ensureTranslations, languageFromHass, localize } from "../localize/localize.js";

const HISTORY_ELEMENT_URL = new URL(
  /* @vite-ignore */ "lib/ha-better-history/define.js",
  import.meta.url
).toString();

export class HistoryDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    hass: { attribute: false },
    config: { attribute: false },
    language: {},
    _fullscreen: { state: true },
    _controlsVisible: { state: true },
    _toolsOpen: { state: true },
    _historyElementReady: { state: true }
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

    .btn-tools {
      margin-inline-start: 12px;
    }

    @media (max-width: 600px) {
      .btn-tools {
        margin-inline-start: 14px;
      }
      .btn-fs {
        display: none;
      }
    }

    .loading {
      align-items: center;
      color: var(--secondary-text-color);
      display: flex;
      flex: 1;
      justify-content: center;
      min-height: 70vh;
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
  private _historyElementReady = customElements.get("ha-better-history") !== undefined;
  private _historyElementLoadStarted = false;
  private _translationLanguage = "";
  private _pickerOverlayOpen = false;
  private _suppressNextClose = false;
  private _suppressCloseTimer?: ReturnType<typeof setTimeout>;

  protected updated(): void {
    this._styleDialogHeader();
    void this._loadTranslations();
    if (this.open) void this._loadHistoryElement();
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
    this.dispatchEvent(new CustomEvent("dialog-closed", { bubbles: true, composed: true }));
  }

  private _onPickerOverlayChanged(event: CustomEvent<{ open: boolean }>): void {
    this._pickerOverlayOpen = event.detail.open;
  }

  private async _loadHistoryElement(): Promise<void> {
    if (this._historyElementReady || this._historyElementLoadStarted) return;
    this._historyElementLoadStarted = true;

    try {
      await import(/* @vite-ignore */ HISTORY_ELEMENT_URL);
      await customElements.whenDefined("ha-better-history");
      this._historyElementReady = true;
    } catch (error) {
      console.warn("[a-better-history-card] Failed to load ha-better-history:", error);
      this._historyElementLoadStarted = false;
    }
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

    return html`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${title}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e: Event) => this._onDialogClosed(e)}
      >
        ${cfg?.show_tools_button
          ? html`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-tools"
              .label=${localize(this.hass, "card.label.tools", this.language)}
              ?active=${this._toolsOpen}
              @click=${() => { this._toolsOpen = !this._toolsOpen; }}
            ><ha-icon icon="mdi:tools"></ha-icon></ha-icon-button>`
          : nothing}
        ${cfg?.show_controls_toggle && (cfg?.show_date_picker || cfg?.show_entity_picker)
          ? html`<ha-icon-button
              slot="headerActionItems"
              class="btn"
              .label=${localize(this.hass, this._controlsVisible ? "card.label.hide_controls" : "card.label.show_controls", this.language)}
              @click=${() => { this._controlsVisible = !this._controlsVisible; }}
            ><ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon></ha-icon-button>`
          : nothing}
        ${cfg?.show_fullscreen_button
          ? html`<ha-icon-button
              slot="headerActionItems"
              class="btn btn-fs"
              .label=${localize(this.hass, this._fullscreen ? "dialog.label.exit_fullscreen" : "card.label.fullscreen", this.language)}
              @click=${() => { this._fullscreen = !this._fullscreen; }}
            ><ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon></ha-icon-button>`
          : nothing}
        ${this.open && !this._historyElementReady
          ? html`<div class="loading">${localize(this.hass, "dialog.loading_history", this.language)}</div>`
          : nothing}
        ${this.open && this._historyElementReady && cfg
          ? html`<ha-better-history
              .hass=${this.hass}
              .config=${buildBetterHistoryConfig(cfg, true)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e: CustomEvent<{ open: boolean }>) => this._onPickerOverlayChanged(e)}
              class="history"
            ></ha-better-history>`
          : nothing}
      </ha-dialog>
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
