if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


const homeButton = document.querySelector(".back-home");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}


const overlay = document.querySelector(".content-overlay");

const booksButton = document.querySelector(".books-window");
const recipesButton = document.querySelector(".recipes-window");
const travelButton = document.querySelector(".travel-window");

const booksContent = document.querySelector(".books-content");
const recipesContent = document.querySelector(".recipes-content");
const travelContent = document.querySelector(".travel-content");

const closeButtons = document.querySelectorAll(".close-window");


function openWindow(content) {

    if (!overlay || !content) return;

    overlay.classList.add("active");

    content.style.display = "block";

    requestAnimationFrame(() => {
        content.classList.add("active");
    });

}


function closeWindow() {

    if (!overlay) return;

    const activeWindow =
        document.querySelector(".content-window.active");

    if (activeWindow) {

        activeWindow.classList.remove("active");

        setTimeout(() => {
            activeWindow.style.display = "none";
        }, 400);

    }

    setTimeout(() => {
        overlay.classList.remove("active");
    }, 400);

}


if (booksButton) {

    booksButton.addEventListener("click", () => {
        openWindow(booksContent);
    });

}


if (recipesButton) {

    recipesButton.addEventListener("click", () => {
        openWindow(recipesContent);
    });

}


if (travelButton) {

    travelButton.addEventListener("click", () => {
        openWindow(travelContent);
    });

}


closeButtons.forEach(button => {

    button.addEventListener("click", () => {
        closeWindow();
    });

});


if (overlay) {

    overlay.addEventListener("click", (event) => {

        if (event.target === overlay) {
            closeWindow();
        }

    });

}


const lavaTransition =
    document.querySelector(".lava-transition");


function playLavaTransition() {

    if (!lavaTransition) return;

    lavaTransition.classList.remove("hide");

    lavaTransition.classList.add("active");

    setTimeout(() => {

        lavaTransition.classList.add("hide");

        setTimeout(() => {
            lavaTransition.classList.remove("active");
            lavaTransition.classList.remove("hide");
        }, 900);

    }, 2800);

}


window.addEventListener("load", () => {

    playLavaTransition();

});