document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // ELEMENTOS PRINCIPALES
    // =========================================

    const entrance = document.querySelector("#entrance-screen");
    const enterButton = document.querySelector("#enter-button");
    const timeline = document.querySelector("#timeline-container");
    const homeButton = document.querySelector("#back-home");

    const cards = Array.from(
        document.querySelectorAll(".achievement-card")
    );

    const filterButtons = Array.from(
        document.querySelectorAll(".filter-button")
    );

    const achievementModal = document.querySelector("#achievement-modal");
    const premiumModal = document.querySelector("#premium-modal");
    const puzzleModal = document.querySelector("#puzzle-modal");

    const discoverPremiumButton = document.querySelector("#discover-premium");

    let entranceStarted = false;
    let lastFocusedElement = null;

    // =========================================
    // ICONOS
    // =========================================

    function renderIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // =========================================
    // ENTRADA AL TIMELINE
    // =========================================

    function enterTimeline(event) {
        if (event) {
            event.preventDefault();
        }

        if (!entrance || entranceStarted) {
            return;
        }

        entranceStarted = true;
        entrance.classList.add("is-opening");

        if (enterButton) {
            enterButton.disabled = true;
        }

        window.setTimeout(() => {
            entrance.classList.add("is-hidden");
            entrance.setAttribute("aria-hidden", "true");

            if (timeline) {
                timeline.classList.add("is-visible");
                timeline.setAttribute("aria-hidden", "false");
            }
        }, 1400);
    }

    if (enterButton) {
        enterButton.addEventListener("click", enterTimeline);
    }

    // También permite entrar haciendo clic en el fondo.
    if (entrance) {
        entrance.addEventListener("click", (event) => {
            if (event.target.closest("button")) {
                return;
            }

            enterTimeline(event);
        });
    }

    // =========================================
    // VOLVER AL HOME
    // =========================================

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    // =========================================
    // ABRIR Y CERRAR MODALES
    // =========================================

    const allModals = [
        achievementModal,
        premiumModal,
        puzzleModal
    ];

    function openModal(modal) {
        if (!modal) {
            return;
        }

        lastFocusedElement = document.activeElement;

        modal.classList.add("active");
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector("button");

        if (closeButton) {
            closeButton.focus();
        }

        renderIcons();
    }

    function closeModal(modal) {
        if (!modal) {
            return;
        }

        modal.classList.remove("active");
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        const hasOpenModal = allModals.some((item) => {
            return item &&
                (
                    item.classList.contains("active") ||
                    item.classList.contains("is-open")
                );
        });

        if (!hasOpenModal) {
            document.body.style.overflow = "";

            if (
                lastFocusedElement &&
                typeof lastFocusedElement.focus === "function"
            ) {
                lastFocusedElement.focus();
            }
        }
    }

    function closeAllModals() {
        allModals.forEach((modal) => {
            closeModal(modal);
        });
    }

    // Cerrar al pulsar los fondos de los modales.
    allModals.forEach((modal) => {
        if (!modal) {
            return;
        }

        modal.addEventListener("click", (event) => {
            if (
                event.target === modal ||
                event.target.classList.contains(
                    `${modal.id}-backdrop`
                )
            ) {
                closeModal(modal);
            }
        });
    });

    // Cerrar con Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });

    // =========================================
    // INFORMACIÓN DE LOS LOGROS
    // =========================================

    function getCardText(card, selector, fallback = "") {
        const element = card.querySelector(selector);

        return element
            ? element.textContent.trim()
            : fallback;
    }

    function showAchievement(card) {
        if (!card || !achievementModal) {
            return;
        }

        const tier = getCardText(
            card,
            ".achievement-tier",
            card.dataset.tier || "Logro"
        );

        const title = getCardText(
            card,
            ".achievement-name",
            "Logro"
        );

        const description = getCardText(
            card,
            ".achievement-description",
            "Información no disponible."
        );

        const progressLabel = getCardText(
            card,
            ".achievement-progress-label",
            "Progreso por registrar"
        );

        const unlocked = card.dataset.unlocked === "true";

        const tierElement = document.querySelector(
            "#achievement-modal-tier"
        );

        const titleElement = document.querySelector(
            "#achievement-modal-title"
        );

        const descriptionElement = document.querySelector(
            "#achievement-modal-description"
        );

        const conditionElement = document.querySelector(
            "#achievement-modal-condition"
        );

        const rewardElement = document.querySelector(
            "#achievement-modal-reward"
        );

        const progressLabelElement = document.querySelector(
            "#achievement-modal-progress-label"
        );

        const progressBar = document.querySelector(
            "#achievement-modal-progress-bar"
        );

        if (tierElement) {
            tierElement.textContent = tier;
        }

        if (titleElement) {
            titleElement.textContent = title;
        }

        if (descriptionElement) {
            descriptionElement.textContent = description;
        }

        if (conditionElement) {
            conditionElement.textContent = description;
        }

        if (rewardElement) {
            rewardElement.textContent = unlocked
                ? "Desbloqueado"
                : "Aún no desbloqueado";
        }

        if (progressLabelElement) {
            progressLabelElement.textContent = progressLabel;
        }

        if (progressBar) {
            const cardProgress = card.querySelector(
                ".achievement-progress .progress-fill"
            );

            const width = cardProgress
                ? cardProgress.style.width
                : "0%";

            progressBar.style.width = width || "0%";
        }

        openModal(achievementModal);
    }

    // =========================================
    // CLIC EN LAS TARJETAS
    // =========================================

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const isPremium =
                card.classList.contains("premium") ||
                card.classList.contains("locked") ||
                card.dataset.premium === "true" ||
                card.dataset.tier === "premium";

            if (isPremium) {
                openModal(premiumModal);
                return;
            }

            showAchievement(card);
        });
    });

    // =========================================
    // FILTROS: TODOS / DESBLOQUEADOS
    // =========================================

    function applyFilter(filter) {
        cards.forEach((card) => {
            const unlocked = card.dataset.unlocked === "true";

            if (filter === "unlocked") {
                card.hidden = !unlocked;
            } else {
                card.hidden = false;
            }
        });

        filterButtons.forEach((button) => {
            const active = button.dataset.filter === filter;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter =
                button.dataset.filter === "unlocked"
                    ? "unlocked"
                    : "all";

            applyFilter(filter);
        });
    });

    // =========================================
    // ROMPECABEZAS
    // =========================================

    const puzzleSlots = document.querySelectorAll(".puzzle-slot");

    puzzleSlots.forEach((slot) => {
        slot.addEventListener("click", () => {
            const isPremium =
                slot.dataset.premium === "true" ||
                slot.classList.contains("premium-puzzle") ||
                slot.classList.contains("locked");

            if (isPremium) {
                openModal(premiumModal);
                return;
            }

            const puzzleNumber = slot.dataset.puzzle || "1";

            const puzzleName = slot.querySelector(".puzzle-name");

            const puzzleTitle = document.querySelector(
                "#puzzle-modal-title"
            );

            const puzzleDescription = document.querySelector(
                "#puzzle-modal-description"
            );

            const puzzleNote = document.querySelector(
                "#puzzle-modal-note"
            );

            if (puzzleTitle) {
                puzzleTitle.textContent = puzzleName
                    ? puzzleName.textContent.trim()
                    : `Rompecabezas ${puzzleNumber}`;
            }

            if (puzzleDescription) {
                puzzleDescription.textContent =
                    "Reúne las piezas necesarias para completar este rompecabezas.";
            }

            if (puzzleNote) {
                puzzleNote.textContent =
                    "Las piezas aparecerán a medida que completes los desafíos.";
            }

            openModal(puzzleModal);
        });
    });

    // =========================================
    // BOTONES PARA CERRAR MODALES
    // =========================================

    document.querySelectorAll("[data-close-achievement]").forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(achievementModal);
        });
    });

    document.querySelectorAll("[data-close-premium]").forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(premiumModal);
        });
    });

    document.querySelectorAll("[data-close-puzzle]").forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(puzzleModal);
        });
    });

    // =========================================
    // ACCESO A PREMIUM
    // =========================================

    if (discoverPremiumButton) {
        discoverPremiumButton.addEventListener("click", () => {
            window.location.href = "../premium/index.html";
        });
    }

    // =========================================
    // INICIALIZACIÓN
    // =========================================

    applyFilter("all");
    renderIcons();
});