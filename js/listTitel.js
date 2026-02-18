import { state } from "./state.js";

const currentListTitle = document.getElementById("current-list-title");

export function renderSelectedListTitle() {
  const selected = state.lists.find(l => l.id === state.selectedListId);

  if (!selected) {
    currentListTitle.textContent = "Keine Liste ausgewählt";
    return;
  }

  currentListTitle.textContent = selected.name;
}