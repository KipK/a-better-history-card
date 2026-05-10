import { ABetterHistoryCard } from "./cards/a-better-history-card.js";
import { CARD_TAG, CARD_TYPE, NAME } from "./const.js";

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, ABetterHistoryCard);
}

window.customCards = window.customCards ?? [];
const customCards = window.customCards;
customCards
  .filter((c) => c.type === CARD_TAG || c.type === CARD_TYPE)
  .forEach((c) => { customCards.splice(customCards.indexOf(c), 1); });
customCards.push({
  type: CARD_TAG,
  name: NAME,
  description: "Display history charts directly in your dashboard.",
  preview: true
});
