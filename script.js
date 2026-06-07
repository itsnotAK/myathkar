function countBox(box) {
    let button = box.querySelector("button.counter");

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

function loadProgress() {
    let buttons = document.querySelectorAll("button.counter");

    buttons.forEach(function(button) {
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

    checkPageComplete();
}

function toggleClass(className) {
    let items = document.querySelectorAll("." + className);

    items.forEach(function(item) {
        item.classList.toggle("hidden");
    });
}

function checkPageComplete() {
    let buttons = document.querySelectorAll("button.counter");
    let nextButton = document.getElementById("nextButton");

    if (!nextButton) return;

    let allDone = true;

    buttons.forEach(function(button) {
        let current = Number(button.getAttribute("data-current"));
        let total = Number(button.getAttribute("data-total"));

        if (current < total) {
            allDone = false;
        }
    });

    if (allDone) {
        nextButton.style.display = "block";
    }
}

window.onload = loadProgress;