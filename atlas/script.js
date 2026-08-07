const backHome = document.querySelector(".back-btn");

if (backHome) {

    backHome.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}

const mapContainer = document.getElementById("map-container");

let isDragging = false;

let startX = 0;
let startY = 0;

let translateX = 0;
let translateY = 0;

mapContainer.addEventListener("mousedown", (e) => {

    isDragging = true;

    startX = e.clientX - translateX;
    startY = e.clientY - translateY;

});

document.addEventListener("mouseup", () => {

    isDragging = false;

});

document.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    mapContainer.style.transform =
        `translate(${translateX}px, ${translateY}px)`;

});