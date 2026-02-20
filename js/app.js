import { loadState} from "./storage.js";
import { renderLists } from "./lists.js";
import { initTheme } from "./darkmode.js";

import "./addLists.js"
import "./addTasks.js"
import "./darkmode.js"


initTheme();
loadState();
renderLists();