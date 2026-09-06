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


if (typeof lucide !== "undefined") {

    lucide.createIcons();

}


if (entrance) {

    entrance.classList.add("open");

}

if (timeline) {

    timeline.classList.add("active");

}


if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "../index.html";

        }
    );

}



let isDragging = false;

let startX = 0;

let currentX = 0;


function updateTimelinePosition() {

    if (
        !timelineContainer ||
        !timelineWorld
    ) {

        return;

    }


    const containerWidth =
        timelineContainer.clientWidth;

    const worldWidth =
        timelineWorld.offsetWidth;


    const minimumX =
        -(worldWidth - containerWidth);


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


            updateTimelinePosition();

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



document.addEventListener(
    "keydown",
    (event) => {

        const keyboardSpeed = 50;


        if (event.key === "ArrowLeft") {

            currentX += keyboardSpeed;

            updateTimelinePosition();

        }


        if (event.key === "ArrowRight") {

            currentX -= keyboardSpeed;

            updateTimelinePosition();

        }

    }
);