import { state } from "./state.js";
import { loadState, saveState } from "./storage.js";
import { renderSelectedListTitle } from "./listTitel.js";



const listsUl = document.getElementById("lists");
const tasksUl = document.getElementById("tasks");


const addListBtn = document.getElementById("add-list-btn");
const addTaskBtn = document.getElementById("add-task-btn");



function renderLists() {
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
}

function renderTasks() {
  tasksUl.innerHTML = "";

  const selected = state.lists.find(l => l.id === state.selectedListId);
  if (!selected) return;

  for (const task of selected.tasks) {
    const li = document.createElement("li");
    li.classList.toggle("task-done", task.done);

    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
      
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveState();
      renderTasks();
    });

    li.addEventListener("click", () => {
      task.done = !task.done;
      saveState();
      renderTasks();
      });
      
    
    const span = document.createElement("span");
    span.textContent = task.title;

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
      selected.tasks = selected.tasks.filter(t => t.id !== task.id);
      saveState();
      renderTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    tasksUl.appendChild(li);
}

}





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
  renderSelectedListTitle();
  renderTasks();
});

addTaskBtn.addEventListener("click", showTaskInput);

function showTaskInput() {
  if (document.querySelector(".task-input")) return;
  const selected = state.lists.find(l => l.id === state.selectedListId);
  if (!selected) {
    alert("Bitte zuerst eine Liste auswählen.");
    return;
  }

  const li = document.createElement("li");
  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "Neue Aufgabe...";
  input.classList.add("task-input");

  li.appendChild(input);
  tasksUl.appendChild(li);

  input.focus();

  let saved = false;
  let cancelled = false;

function saveIfNeeded() {
  if (saved) return;

  const value = input.value.trim();
  if (!value) return;

  selected.tasks.push({
    id: crypto.randomUUID(),
    title: value,
    done: false
  });

  saveState();
  saved = true;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveIfNeeded();
    renderTasks();
  }
  else if (e.key === "Escape") {
    cancelled = true;
    renderTasks();
  }
});

  input.addEventListener("blur", () => {
    if (cancelled) return;
  saveIfNeeded();
  renderTasks();
});

}








loadState();
renderLists();
renderSelectedListTitle();
renderTasks();