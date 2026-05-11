import { EDITOR_TAG } from "../const.js";
import type { HaFormSchema } from "../types/ha.js";
import { BaseCardEditor } from "./base-card-editor.js";

export class ABetterHistoryCardEditor extends BaseCardEditor {
  protected _tabs(): Array<{ id: string; label: string }> {
    return [
      { id: "entities", label: this._localize("editor.tab.entities") },
      { id: "range", label: this._localize("editor.tab.range") },
      { id: "display", label: this._localize("editor.tab.display") },
      { id: "style", label: this._localize("editor.tab.style") },
      { id: "header", label: this._localize("editor.tab.header") },
      ...(this._config.show_tools_button ? [{ id: "tools", label: this._localize("editor.tab.tools") }] : []),
      { id: "advanced", label: this._localize("editor.tab.advanced") }
    ];
  }

  protected _schema(tab: string): HaFormSchema[] {
    switch (tab) {
      case "range": return this._rangeSchema();
      case "display": return this._displaySchema();
      case "style": return this._styleSchema();
      case "header": return this._headerSchema();
      case "tools": return this._toolsSchema();
      case "advanced": return this._advancedSchema();
      default: return [];
    }
  }
}

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, ABetterHistoryCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "a-better-history-card-editor": ABetterHistoryCardEditor;
  }
}
