import { loadState} from "./storage.js";
import { renderLists } from "./lists.js";

import "./addLists.js"
import "./addTasks.js"


loadState();
renderLists();