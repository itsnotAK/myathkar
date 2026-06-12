function countBox(box) {
    let button = box.querySelector("button.counter");
    if (!button) return;

    let id = button.getAttribute("data-id");
    let current = Number(button.getAttribute("data-current"));
    let total = Number(button.getAttribute("data-total"));

    if (current < total) {
        current++;
        button.setAttribute("data-current", current);
        button.innerText = current + " / " + total;
        localStorage.setItem(id, current);
    }

    if (current === total) {
        button.innerText = total + " / " + total + " ✅";
        box.classList.add("done");
    }

    checkPageComplete();
}

function checkPageComplete() {
    let buttons = document.querySelectorAll("button.counter");
    let nextButton = document.getElementById("nextButton");
    if (!nextButton) return;

    let allDone = true;

    buttons.forEach(function(button) {
        let current = Number(button.getAttribute("data-current"));
        let total = Number(button.getAttribute("data-total"));
        if (current < total) allDone = false;
    });

    if (allDone) {
        nextButton.style.display = "block";
    }
}

function toggleSetting(key) {
    let current = localStorage.getItem(key);
    localStorage.setItem(key, current === "show" ? "hide" : "show");
    loadSettings();
}

function toggleDark() {
    let current = localStorage.getItem("darkMode");
    localStorage.setItem("darkMode", current === "light" ? "dark" : "light");
    loadSettings();
}

function loadSettings() {
    let showEN = localStorage.getItem("showEN");
    let showTR = localStorage.getItem("showTR");
    let darkMode = localStorage.getItem("darkMode");

    document.querySelectorAll(".translation").forEach(function(item) {
        item.classList.toggle("hidden", showEN !== "show");
    });

    document.querySelectorAll(".transliteration").forEach(function(item) {
        item.classList.toggle("hidden", showTR !== "show");
    });

    if (darkMode === "light") {
        document.body.classList.remove("dark");
    } else {
        document.body.classList.add("dark");
    }
}

function loadProgress() {
    document.querySelectorAll("button.counter").forEach(function(button) {
        let id = button.getAttribute("data-id");
        let saved = localStorage.getItem(id);
        let total = Number(button.getAttribute("data-total"));

        if (saved !== null) {
            button.setAttribute("data-current", saved);
            button.innerText = saved + " / " + total;

            if (Number(saved) === total) {
                button.parentElement.classList.add("done");
            }
        }
    });

    loadSettings();
    checkPageComplete();
}

function resetAll() {
    localStorage.clear();
    localStorage.setItem("darkMode", "dark");
    location.reload();
}

window.onload = loadProgress;