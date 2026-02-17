import { state, setState } from "./state.js";

const STORAGE_KEY = "todo-state";

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    setState(JSON.parse(saved));
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
