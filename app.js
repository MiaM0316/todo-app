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
    });

    li.appendChild(btn);
    listsUl.appendChild(li);
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




loadState();
initStateIfEmpty();
renderLists();
renderSelectedListTitle();


console.log("Geladener State:", state);
