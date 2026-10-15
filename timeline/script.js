document.addEventListener("DOMContentLoaded", () => {
    const entrance = document.querySelector(".timeline-entrance");
    const homeButton = document.querySelector(".back-home");
    const premiumModal = document.querySelector(".premium-modal");
    const modalCard = document.querySelector(".premium-modal-card");
    const closeModalButton = document.querySelector(".premium-modal-close");
    const discoverPremiumButton = document.querySelector(".discover-premium");

    let entranceStarted = false;
    let lastFocusedElement = null;

    function renderIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function enterTimeline() {
        if (!entrance || entranceStarted) {
            return;
        }

        entranceStarted = true;
        entrance.classList.add("is-opening");

        window.setTimeout(() => {
            entrance.classList.add("is-hidden");
        }, 1400);
    }

    function openPremiumModal() {
        if (!premiumModal) {
            return;
        }

        lastFocusedElement = document.activeElement;
        premiumModal.classList.add("active");
        premiumModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (closeModalButton) {
            closeModalButton.focus();
        }
    }

    function closePremiumModal() {
        if (!premiumModal) {
            return;
        }

        premiumModal.classList.remove("active");
        premiumModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    }

    if (entrance) {
        entrance.addEventListener("click", enterTimeline);

        entrance.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                enterTimeline();
            }
        });

        entrance.setAttribute("tabindex", "0");
        entrance.setAttribute("role", "button");
        entrance.setAttribute(
            "aria-label",
            "Entrar al Salón de los Logros"
        );
    }

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    document
        .querySelectorAll(
            ".achievement-card.premium, .achievement-card.locked, .puzzle-slot.premium-puzzle"
        )
        .forEach((element) => {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                openPremiumModal();
            });

            if (!element.hasAttribute("tabindex")) {
                element.setAttribute("tabindex", "0");
            }

            element.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPremiumModal();
                }
            });
        });

    document
        .querySelectorAll(".puzzle-slot.free-puzzle")
        .forEach((slot, index) => {
            slot.addEventListener("click", () => {
                const puzzleNumber = index + 1;

                window.alert(
                    `Rompecabezas ${puzzleNumber}\n\nEste espacio está reservado para el rompecabezas gratuito. Su dinámica se conectará cuando se implemente el sistema de piezas.`
                );
            });
        });

    document
        .querySelectorAll(".achievement-card.free")
        .forEach((card) => {
            card.addEventListener("click", () => {
                const title =
                    card.querySelector("h2")?.textContent.trim() || "Logro";

                const level =
                    card.querySelector(".level")?.textContent.trim() ||
                    "Gratuito";

                const description =
                    card.querySelector("p")?.textContent.trim() || "";

                const reward =
                    card.querySelector(".reward")?.textContent.trim() ||
                    "Recompensa por definir";

                window.alert(
                    `${title}\n${level}\n\n${description}\n\n${reward}`
                );
            });
        });

    if (closeModalButton) {
        closeModalButton.addEventListener(
            "click",
            closePremiumModal
        );
    }

    if (premiumModal) {
        premiumModal.addEventListener("click", (event) => {
            if (event.target === premiumModal) {
                closePremiumModal();
            }
        });
    }

    if (modalCard) {
        modalCard.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            premiumModal?.classList.contains("active")
        ) {
            closePremiumModal();
        }
    });

    if (discoverPremiumButton) {
        discoverPremiumButton.addEventListener("click", () => {
            window.location.href = "../premium/index.html";
        });
    }

    renderIcons();
});