/* =====================================
   TIMELINE
===================================== */


/* =====================================
   ELEMENTOS
===================================== */

const entrance =
    document.querySelector(".timeline-entrance");

const gallery =
    document.querySelector(".timeline-gallery");

const homeButton =
    document.querySelector(".back-home");

const timelineSpace =
    document.querySelector(".timeline-space");

const timelineWorld =
    document.querySelector(".timeline-world");

const eventsContainer =
    document.getElementById("timeline-events");


/* =====================================
   ENTRADA
===================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (entrance) {
            entrance.classList.add("open");
        }

        if (gallery) {
            gallery.classList.add("active");
        }

    }, 300);

});


/* =====================================
   VOLVER AL HOME
===================================== */

if (homeButton) {

    homeButton.addEventListener("click", () => {

        window.location.href = "../index.html";

    });

}


/* =====================================
   MOVIMIENTO HORIZONTAL
===================================== */

let isDragging = false;

let startX = 0;

let worldX = 0;


if (timelineSpace && timelineWorld) {

    timelineSpace.addEventListener(
        "pointerdown",
        (event) => {

            isDragging = true;

            startX =
                event.clientX - worldX;

            timelineSpace.setPointerCapture(
                event.pointerId
            );

        }
    );


    timelineSpace.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) {
                return;
            }

            worldX =
                event.clientX - startX;

            const viewportWidth =
                timelineSpace.clientWidth;

            const worldWidth =
                timelineWorld.scrollWidth;

            const minimumX =
                -(worldWidth - viewportWidth);

            worldX =
                Math.max(
                    minimumX,
                    Math.min(0, worldX)
                );

            timelineWorld.style.transform =
                `translateX(${worldX}px)`;

        }
    );


    timelineSpace.addEventListener(
        "pointerup",
        () => {

            isDragging = false;

        }
    );


    timelineSpace.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

        }
    );

}


/* =====================================
   DATOS DE PRUEBA
===================================== */

const timelineEvents = [

    {
        year: 2026,
        title: "El comienzo",
        description:
            "Private Atlas A.S. comienza a tomar forma.",
        position: 420
    },

    {
        year: 2026,
        title: "Un momento especial",
        description:
            "Este será un recuerdo destacado.",
        position: 1000
    },

    {
        year: 2026,
        title: "Un nuevo capítulo",
        description:
            "La historia continúa.",
        position: 1650
    }

];


/* =====================================
   CREAR EVENTOS
===================================== */

function createTimelineEvents() {

    if (!eventsContainer) {
        return;
    }

    eventsContainer.innerHTML = "";


    timelineEvents.forEach((event, index) => {

        const article =
            document.createElement("article");

        article.className =
            "timeline-event";

        article.style.left =
            `${event.position}px`;

        article.style.top =
            index % 2 === 0
                ? "28%"
                : "55%";


        article.innerHTML = `

            <div class="timeline-event-marker">
                ★
            </div>

            <div class="timeline-event-card">

                <span class="timeline-event-date">
                    ${event.year}
                </span>

                <h2>
                    ${event.title}
                </h2>

                <p>
                    ${event.description}
                </p>

            </div>

        `;


        eventsContainer.appendChild(article);

    });

}


/* =====================================
   INICIAR
===================================== */

createTimelineEvents();