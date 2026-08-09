/* =====================================
        VOLVER AL HOME
===================================== */

const backHome = document.querySelector(".back-btn");

if (backHome) {

    backHome.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}

const mapContainer = document.getElementById("map-container");
const mapArea = document.querySelector(".map-background");

let isDragging = false;

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

let scale = 1;


/* =====================================
        ACTUALIZAR MAPA
===================================== */

function updateMap(){

    mapContainer.style.transform =
        `translate(${currentX}px, ${currentY}px) scale(${scale})`;

}


/* =====================================
        MOVER MAPA
===================================== */

mapArea.addEventListener("mousedown", (e) => {

    if (e.target.closest(".scroll-btn")) return;

    isDragging = true;

    startX = e.clientX - currentX;
    startY = e.clientY - currentY;

    mapArea.style.cursor = "grabbing";

});


/* =====================================
        SOLTAR MAPA
===================================== */

document.addEventListener("mouseup", () => {

    isDragging = false;

    mapArea.style.cursor = "grab";

});


/* =====================================
        ARRASTRAR MAPA
===================================== */

document.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    updateMap();

});


/* =====================================
        ZOOM CON RUEDA
===================================== */

mapArea.addEventListener("wheel", (e) => {

    e.preventDefault();

    if (e.deltaY < 0) {

        scale += 0.08;

    } else {

        scale -= 0.08;

    }

    scale = Math.max(0.6, Math.min(scale, 4));

    updateMap();

}, { passive: false });


/* =====================================
        DOBLE CLIC = CENTRAR
===================================== */

mapArea.addEventListener("dblclick", () => {

    currentX = -900;
    currentY = -350;

    scale = 1;

    updateMap();

});


/* =====================================
        POSICIÓN INICIAL
===================================== */

window.addEventListener("load", () => {

    currentX = -900;
    currentY = -350;

    scale = 1;

    updateMap();

});