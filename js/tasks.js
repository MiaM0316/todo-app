import { state } from "./state.js";
import {saveState } from "./storage.js";

const tasksUl = document.getElementById("tasks");

export function renderTasks() {
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
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    tasksUl.appendChild(li);
}}