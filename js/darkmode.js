const darkmodeBtn = document.getElementById("theme-toggle");

darkmodeBtn.addEventListener("change", switchTheme);

const THEME_KEY = "theme"; 

export function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "dark") {
    document.body.classList.add("dark");
    darkmodeBtn.checked = true;
  } else if (saved === "light") {
    document.body.classList.remove("dark");
    darkmodeBtn.checked = false;
  } else {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark);
    darkmodeBtn.checked = prefersDark;
  }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add("dark");
        localStorage.setItem(THEME_KEY, "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem(THEME_KEY, "light");
    }
}
