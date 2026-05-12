import "@kipk/ha-better-history";
import { ABetterHistoryCard } from "./cards/a-better-history-card.js";
import { ABetterHistoryButtonCard } from "./cards/a-better-history-button-card.js";
import "./editors/a-better-history-card-editor.js";
import "./editors/a-better-history-button-card-editor.js";
import { BUTTON_CARD_TAG, BUTTON_CARD_TYPE, CARD_TAG, CARD_TYPE, NAME } from "./const.js";

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, ABetterHistoryCard);
}

if (!customElements.get(BUTTON_CARD_TAG)) {
  customElements.define(BUTTON_CARD_TAG, ABetterHistoryButtonCard);
}

window.customCards = window.customCards ?? [];
const customCards = window.customCards;

customCards
  .filter((c) => c.type === CARD_TAG || c.type === CARD_TYPE || c.type === BUTTON_CARD_TAG || c.type === BUTTON_CARD_TYPE)
  .forEach((c) => { customCards.splice(customCards.indexOf(c), 1); });

customCards.push({
  type: CARD_TAG,
  name: NAME,
  description: "Display history charts directly in your dashboard.",
  preview: true
});

customCards.push({
  type: BUTTON_CARD_TAG,
  name: `${NAME} Button`,
  description: "Button that opens a history chart dialog.",
  preview: true
});
