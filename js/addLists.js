import { state } from "./state.js";
import {saveState } from "./storage.js";
import { renderLists } from "./lists.js";

const addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", () => {
  const name = prompt("Name der neuen Liste:");
  if (!name) return;

  const newList = {
    id: crypto.randomUUID(),
    name: name.trim(),
    tasks: []
  };

  state.lists.push(newList);
  state.selectedListId = newList.id;

  saveState();
  renderLists();
});