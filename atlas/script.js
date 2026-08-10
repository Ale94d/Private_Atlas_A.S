/* =====================================
   VOLVER AL HOME
===================================== */

const homeButton = document.querySelector(".back-home");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}


/* =====================================
   ELEMENTOS DEL MAPA
===================================== */

const mapContainer = document.getElementById("map-container");
const mapArea = document.querySelector(".map-background");


/* =====================================
   VARIABLES
===================================== */

let isDragging = false;

let startX = 0;
let startY = 0;

let currentX = -900;
let currentY = -350;

let scale = 1;


/* =====================================
   ACTUALIZAR MAPA
===================================== */

function updateMap() {

    if (!mapContainer) return;

    mapContainer.style.transform =
        `translate(${currentX}px, ${currentY}px) scale(${scale})`;

}


/* =====================================
   MOVIMIENTO DEL MAPA
===================================== */

if (mapContainer && mapArea) {

    mapArea.addEventListener("pointerdown", (e) => {

        if (e.target.closest(".scroll-btn")) {
            return;
        }

        isDragging = true;

        startX = e.clientX - currentX;
        startY = e.clientY - currentY;

        mapArea.setPointerCapture(e.pointerId);

        mapArea.style.cursor = "grabbing";

    });


    mapArea.addEventListener("pointermove", (e) => {

        if (!isDragging) {
            return;
        }

        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        updateMap();

    });


    mapArea.addEventListener("pointerup", (e) => {

        isDragging = false;

        if (mapArea.hasPointerCapture(e.pointerId)) {
            mapArea.releasePointerCapture(e.pointerId);
        }

        mapArea.style.cursor = "grab";

    });


    mapArea.addEventListener("pointercancel", () => {

        isDragging = false;

        mapArea.style.cursor = "grab";

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

        scale = Math.max(
            0.6,
            Math.min(scale, 4)
        );

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

    updateMap();

}


/* =====================================
   CONECTAR CON EL WORLD.SVG
===================================== */

const worldMap = document.getElementById("world-map");

if (worldMap) {

    worldMap.addEventListener("load", () => {

        const svgDocument = worldMap.contentDocument;

        if (!svgDocument) {

            console.log("No se pudo acceder al SVG.");

            return;

        }

        const colombia =
            svgDocument.getElementById("CO");

        if (!colombia) {

            console.log("No se encontró Colombia.");

            return;

        }

        console.log("Colombia encontrada.");

    });

}