/* =====================================
   TIMELINE
===================================== */


/* =====================================
   ELEMENTOS
===================================== */

const entrance =
    document.querySelector(".timeline-entrance");

const timeline =
    document.querySelector(".timeline-workspace");

const timelineContainer =
    document.querySelector(".timeline-container");

const timelineWorld =
    document.querySelector(".timeline-world");

const homeButton =
    document.querySelector(".back-home");


/* =====================================
   ICONOS
===================================== */

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}


/* =====================================
   ENTRADA
===================================== */

if (entrance) {
    entrance.classList.add("open");
}

if (timeline) {
    timeline.classList.add("active");
}


/* =====================================
   VOLVER AL HOME
===================================== */

if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "../index.html";

        }
    );

}


/* =====================================
   MOVIMIENTO HORIZONTAL
===================================== */

let isDragging = false;

let startX = 0;

let currentX = 0;


if (
    timelineContainer &&
    timelineWorld
) {

    timelineContainer.addEventListener(
        "pointerdown",
        (event) => {

            isDragging = true;

            startX =
                event.clientX -
                currentX;

            timelineContainer.setPointerCapture(
                event.pointerId
            );

        }
    );


    timelineContainer.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) {

                return;

            }


            currentX =
                event.clientX -
                startX;


            const containerWidth =
                timelineContainer.clientWidth;

            const worldWidth =
                timelineWorld.offsetWidth;


            const minimumX =
                -(worldWidth -
                    containerWidth);


            currentX =
                Math.max(
                    minimumX,
                    Math.min(
                        0,
                        currentX
                    )
                );


            timelineWorld.style.transform =
                `translateX(${currentX}px)`;

        }
    );


    timelineContainer.addEventListener(
        "pointerup",
        (event) => {

            isDragging = false;

            if (
                timelineContainer.hasPointerCapture(
                    event.pointerId
                )
            ) {

                timelineContainer.releasePointerCapture(
                    event.pointerId
                );

            }

        }
    );


    timelineContainer.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

        }
    );

}