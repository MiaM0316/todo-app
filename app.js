const STORAGE_KEY = "todo-state";

let state = {
  lists: [],
  selectedListId: null
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state = JSON.parse(saved);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}



const listsUl = document.getElementById("lists");
const tasksUl = document.getElementById("tasks");
const currentListTitle = document.getElementById("current-list-title");

const addListBtn = document.getElementById("add-list-btn");
const addTaskBtn = document.getElementById("add-task-btn");



function renderLists() {
  listsUl.innerHTML = "";

  for (const list of state.lists) {
    const li = document.createElement("li");
    li.textContent = list.name;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Löschen";
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
      
    
    const span = document.createElement("span");
    span.textContent = task.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Löschen";
    delBtn.classList.add("delete-btn");


    delBtn.addEventListener("click", () => {
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


function renderSelectedListTitle() {
  const selected = state.lists.find(l => l.id === state.selectedListId);

  if (!selected) {
    currentListTitle.textContent = "Keine Liste ausgewählt";
    return;
  }

  currentListTitle.textContent = selected.name;
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

addTaskBtn.addEventListener("click", () => {
  const selected = state.lists.find(l => l.id === state.selectedListId);
  if (!selected) {
    alert("Bitte zuerst eine Liste auswählen.");
    return;
  }

  const title = prompt("Neue Aufgabe:");
  if (!title) return;

  const trimmed = title.trim();
  if (!trimmed) return;

  selected.tasks.push({
    id: crypto.randomUUID(),
    title: trimmed,
    done: false
  });

  saveState();
  renderTasks();
});





loadState();
renderLists();
renderSelectedListTitle();
renderTasks();


console.log("Geladener State:", state);
