import { state } from "./state.js";
import { renderTasks } from "./tasks.js";
import { renderSelectedListTitle } from "./listTitel.js";
import { saveState } from "./storage.js";

const listsUl = document.getElementById("lists");

export function renderLists() {
  listsUl.innerHTML = "";

  for (const list of state.lists) {
    const li = document.createElement("li");
    li.textContent = list.name;

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


      li.addEventListener("click", () => {
        state.selectedListId = list.id;
       saveState();
        renderSelectedListTitle();
        renderTasks();
      });
    
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
    
    li.appendChild(delBtn);
    listsUl.appendChild(li);
    }
    renderSelectedListTitle();
    renderTasks();
}