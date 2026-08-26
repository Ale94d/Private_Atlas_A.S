if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

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
   VENTANAS DEL BAÚL
===================================== */

.content-overlay {
    position: fixed;
    inset: 0;
    z-index: 20;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.45);

    opacity: 0;
    visibility: hidden;

    transition:
        opacity 0.35s ease,
        visibility 0.35s ease;
}

.content-window {
    position: relative;

    width: min(850px, 85vw);
    height: min(600px, 80vh);

    padding: 35px;

    background:
        linear-gradient(
            145deg,
            #121214,
            #2b2b2e
        );

    border-radius: 28px;

    box-shadow:
        0 15px 35px rgba(0, 0, 0, 0.75),
        inset 4px 4px 8px rgba(255, 255, 255, 0.08),
        inset -5px -5px 10px rgba(0, 0, 0, 0.75);

    transform: translateY(40px) scale(0.94);
    opacity: 0;

    transition:
        transform 0.4s ease,
        opacity 0.35s ease;

    display: none;
}

.content-overlay.active {
    opacity: 1;
    visibility: visible;
}

.content-overlay.active .content-window.active {
    display: block;

    transform: translateY(0) scale(1);
    opacity: 1;
}

/* ENCABEZADO */

.content-window-header {
    display: flex;
    align-items: center;
    gap: 12px;

    padding-bottom: 18px;

    border-bottom: 1px solid rgba(243, 230, 208, 0.15);
}

.content-window-header i {
    width: 28px;
    height: 28px;

    color: #d32f0f;
}

.content-window-header h2 {
    color: #f3e6d0;

    font-family: "Cormorant Garamond", serif;
    font-size: 2rem;
    font-weight: 700;
}

/* BOTÓN CERRAR */

.close-window {
    position: absolute;

    top: 18px;
    right: 18px;

    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: #121214;
    color: #d32f0f;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.close-window:hover {
    transform: translateY(-3px);

    box-shadow:
        0 6px 12px rgba(0, 0, 0, 0.65),
        inset 0 0 8px rgba(211, 47, 15, 0.35);
}

.close-window i {
    width: 18px;
    height: 18px;
}

/* CUERPO */

.content-window-body {
    height: calc(100% - 70px);
    padding-top: 25px;
}