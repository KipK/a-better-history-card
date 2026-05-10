import { BUTTON_EDITOR_TAG } from "../const.js";
import type { HaFormSchema } from "../types/ha.js";
import { BaseCardEditor } from "./base-card-editor.js";

export class ABetterHistoryButtonCardEditor extends BaseCardEditor {
  protected _tabs(): Array<{ id: string; label: string }> {
    return [
      { id: "entities", label: "Entities" },
      { id: "range", label: "Range" },
      { id: "display", label: "Display" },
      { id: "style", label: "Style" },
      { id: "toolbar", label: "Toolbar" },
      { id: "button", label: "Button" },
      { id: "advanced", label: "Advanced" }
    ];
  }

  protected _schema(tab: string): HaFormSchema[] {
    switch (tab) {
      case "entities": return this._entitiesSchema();
      case "range": return this._rangeSchema();
      case "display": return this._displaySchema();
      case "style": return this._styleSchema();
      case "toolbar": return this._toolbarSchema();
      case "button": return this._buttonSchema();
      case "advanced": return this._advancedSchema();
      default: return [];
    }
  }
}

if (!customElements.get(BUTTON_EDITOR_TAG)) {
  customElements.define(BUTTON_EDITOR_TAG, ABetterHistoryButtonCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "a-better-history-button-card-editor": ABetterHistoryButtonCardEditor;
  }
}
