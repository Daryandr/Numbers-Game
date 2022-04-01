function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
}

function saveUser() {
    var username = document.getElementById('user');
    localStorage.setItem('name', username.value);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "auto";

    applyTheme(savedTheme);

    for (const optionElement of document.querySelectorAll("#theme option")) {
        optionElement.selected = savedTheme === optionElement.value;
    }

    document.querySelector("#theme").addEventListener("change", function () {
        localStorage.setItem("theme", this.value);
        applyTheme(this.value);
    });
});