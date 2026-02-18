import { state } from "./state.js";
import {saveState } from "./storage.js";
import { renderLists } from "./lists.js";

const ListsUl = document.getElementById("lists");
const addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", showListInput);

function showListInput() {
  const li = document.createElement("li");
  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "Liste...";
  input.classList.add("list-input");

  li.appendChild(input);
  ListsUl.appendChild(li);

  input.focus();

  let saved = false;
  let cancelled = false;

  function saveIfNeeded() {
  if (saved) return;

  const value = input.value.trim();
  if (!value) return;

  const newList = {
    id: crypto.randomUUID(),
    name: value.trim(),
    tasks: []
  };

  state.lists.push(newList);
  state.selectedListId = newList.id;

  saveState();
  saved = true;
  }
  
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveIfNeeded();
      renderLists();
    }
    else if (e.key === "Escape") {
      cancelled = true;
      renderLists();
    }
  });

  input.addEventListener("blur", () => {
      if (cancelled) return;
    saveIfNeeded();
    renderLists();
  });
};