import { state } from "./state.js";
import { loadState, saveState } from "./storage.js";
import { renderTasks } from "./tasks.js";
import { renderLists } from "./lists.js";



const tasksUl = document.getElementById("tasks");


const addListBtn = document.getElementById("add-list-btn");
const addTaskBtn = document.getElementById("add-task-btn");


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