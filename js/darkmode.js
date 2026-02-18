const darkmodeBtn = document.getElementById("theme-toggle");

darkmodeBtn.addEventListener("change", switchTheme);

function switchTheme(e) {
    if (e.target.checked) {
        console.log("Dark Mode AN");
    } else {
        console.log("Dark Mode AUS");
    }
}
