import { state } from "./state.js";
import { renderTasks } from "./tasks.js";
import { renderSelectedListTitle } from "./listTitel.js";
import { saveState } from "./storage.js";

const listsUl = document.getElementById("lists");

export function renderLists() {
  listsUl.innerHTML = "";

  for (const list of state.lists) {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("list-name");
    nameSpan.textContent = list.name;

    li.addEventListener("click", () => {
        state.selectedListId = list.id;
       saveState();
        renderSelectedListTitle();
        renderTasks();
      });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
    </svg>
    `;
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      if (li.querySelector(".list-input")) return;

      const nameSpan = li.querySelector(".list-name");
      nameSpan.style.display = "none";
      
      const input = document.createElement("input");
      input.type = "text";
      input.value = list.name;
      input.classList.add("list-input");

      nameSpan.insertAdjacentElement("afterend", input);

      input.focus();
      input.select();
      
      let saved = false;
      let cancelled = false;

      function saveIfNeeded() {
      if (saved) return;

      const value = input.value.trim();
      if (!value) return;

      list.name = value.trim();

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
    });

    const delBtn = document.createElement("button");
    delBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"/>
      <path d="M8 6V4h8v2"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
    </svg>
    `;
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      state.lists = state.lists.filter(t => t.id !== list.id);

      if (state.selectedListId === list.id) {
      state.selectedListId = state.lists.length ? state.lists[0].id : null;
      }

      saveState();
      renderLists();
      renderSelectedListTitle();
      renderTasks();
    })
    
    li.appendChild(nameSpan);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    listsUl.appendChild(li);
    }
    renderSelectedListTitle();
    renderTasks();
}