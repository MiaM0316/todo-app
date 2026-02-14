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

function initStateIfEmpty() {
  // Nur wenn noch keine Daten existieren
  if (state.lists.length === 0) {
    const firstListId = crypto.randomUUID();

    state.lists = [
      {
        id: firstListId,
        name: "Uni",
        tasks: [
          { id: crypto.randomUUID(), title: "BA: Gliederung fertig machen", done: false },
          { id: crypto.randomUUID(), title: "Mails beantworten", done: true }
        ]
        },
    ];

    state.selectedListId = firstListId;

    saveState();
  }
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

    const btn = document.createElement("button");
    btn.textContent = list.name;

      btn.addEventListener("click", () => {
        state.selectedListId = list.id;
       saveState();
        renderSelectedListTitle();
        renderTasks();
    });

    li.appendChild(btn);
    listsUl.appendChild(li);
  }
}

function renderTasks() {
  tasksUl.innerHTML = "";

  const selected = state.lists.find(l => l.id === state.selectedListId);
  if (!selected) return;

  for (const task of selected.tasks) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.title;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Löschen";

  delBtn.addEventListener("click", () => {
    selected.tasks = selected.tasks.filter(t => t.id !== task.id);
    saveState();
    renderTasks();
  });

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
initStateIfEmpty();
renderLists();
renderSelectedListTitle();
renderTasks();


console.log("Geladener State:", state);
