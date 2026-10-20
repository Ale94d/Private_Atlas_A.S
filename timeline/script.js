document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
<<<<<<< HEAD
    const entrance = document.querySelector(".timeline-entrance");
    const homeButton = document.querySelector(".back-home");
    const premiumModal = document.querySelector(".premium-modal");
    const modalCard = document.querySelector(".premium-modal-card");
    const closeModalButton = document.querySelector(".premium-modal-close");
    const discoverPremiumButton = document.querySelector(".discover-premium");

    let entranceStarted = false;
    let lastFocusedElement = null;
=======
=======
    // =========================================
    // ELEMENTOS PRINCIPALES
    // =========================================
>>>>>>> 00b7ae2 (timeline)

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

    const closeAchievementButtons = document.querySelectorAll(
        "[data-close-achievement]"
    );

    const closePremiumButtons = document.querySelectorAll(
        "[data-close-premium]"
    );

    const closePuzzleButtons = document.querySelectorAll(
        "[data-close-puzzle]"
    );

    let lastFocusedElement = null;

<<<<<<< HEAD
>>>>>>> aa0f245 (timeline)
=======
    // =========================================
    // ICONOS
    // =========================================
>>>>>>> 00b7ae2 (timeline)

    function renderIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

<<<<<<< HEAD
    function enterTimeline() {
        if (!entrance || entranceStarted) {
            return;
        }

<<<<<<< HEAD
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

=======
    function configureTimeline() {
        const headerTitle = document.querySelector(".timeline-header h1");
        const headerSubtitle = document.querySelector(".timeline-header p");
        const entranceTitle = document.querySelector(
            ".entrance-content h1"
        );
        const entranceSubtitle = document.querySelector(
            ".entrance-content p"
        );

        // Título y subtítulo de la página
        if (headerTitle) {
            headerTitle.textContent = "Timeline";
=======
    // =========================================
    // ENTRADA AL TIMELINE
    // =========================================

    function enterTimeline(event) {
        if (event) {
            event.preventDefault();
>>>>>>> 00b7ae2 (timeline)
        }

        if (!entrance) {
            return;
        }

        entrance.classList.add("is-opening");

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

    // Permite entrar al hacer clic en la pantalla de entrada.
    if (entrance) {
        entrance.addEventListener("click", (event) => {
            if (
                event.target === entrance ||
                event.target.closest(".entrance-wall")
            ) {
                if (!event.target.closest("button")) {
                    enterTimeline(event);
                }
            }
        });
    }

    // =========================================
    // VOLVER AL HOME
    // =========================================

>>>>>>> aa0f245 (timeline)
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    function openModal(modal, focusElement) {
=======
    // =========================================
    // ABRIR Y CERRAR MODALES
    // =========================================

    function openModal(modal) {
>>>>>>> 00b7ae2 (timeline)
        if (!modal) {
            return;
        }

        lastFocusedElement = document.activeElement;

        modal.classList.add("is-open");
        modal.classList.add("active");
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

        modal.classList.remove("is-open");
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        const anyModalOpen = [
            achievementModal,
            premiumModal,
            puzzleModal
        ].some((item) => {
            return item &&
                (
                    item.classList.contains("is-open") ||
                    item.classList.contains("active")
                );
        });

        if (!anyModalOpen) {
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
        closeModal(achievementModal);
        closeModal(premiumModal);
        closeModal(puzzleModal);
    }

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

        // Lee el progreso de la barra que ya existe en la tarjeta.
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
    // CLIC EN LAS TARJETAS DE LOGROS
    // =========================================

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const isPremium =
                card.classList.contains("premium") ||
                card.classList.contains("locked") ||
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
            const isActive = button.dataset.filter === filter;

            button.classList.toggle("active", isActive);
            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter === "unlocked"
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
                slot.classList.contains("premium-puzzle");

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

            if (puzzleTitle) {
                puzzleTitle.textContent = puzzleName
                    ? puzzleName.textContent.trim()
                    : `Rompecabezas ${puzzleNumber}`;
            }

            if (puzzleDescription) {
                puzzleDescription.textContent =
                    "Reúne las piezas necesarias para completar este rompecabezas.";
            }

            openModal(puzzleModal);
        });
    });

    // =========================================
    // BOTONES PARA CERRAR MODALES
    // =========================================

    closeAchievementButtons.forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(achievementModal);
        });
    });

    closePremiumButtons.forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(premiumModal);
        });
<<<<<<< HEAD
>>>>>>> aa0f245 (timeline)
    }

    if (premiumModal) {
        premiumModal.addEventListener("click", (event) => {
<<<<<<< HEAD
            if (event.target === premiumModal) {
                closePremiumModal();
=======
            if (
                event.target === premiumModal ||
                event.target.closest("[data-close-premium]")
            ) {
                closeModal(premiumModal);
>>>>>>> aa0f245 (timeline)
=======
    });

    closePuzzleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(puzzleModal);
        });
    });

    // Cerrar al pulsar fuera del contenido.
    [
        achievementModal,
        premiumModal,
        puzzleModal
    ].forEach((modal) => {
        if (!modal) {
            return;
        }

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
>>>>>>> 00b7ae2 (timeline)
            }
        });
    });

<<<<<<< HEAD
<<<<<<< HEAD
    if (modalCard) {
        modalCard.addEventListener("click", (event) => {
=======
    if (premiumModalCard) {
        premiumModalCard.addEventListener("click", (event) => {
>>>>>>> aa0f245 (timeline)
            event.stopPropagation();
        });
    }
=======
    // Cerrar con Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });

    // =========================================
    // ACCESO A PREMIUM
    // =========================================

    const discoverPremiumButton = document.querySelector(
        "#discover-premium"
    );
>>>>>>> 00b7ae2 (timeline)

<<<<<<< HEAD
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            premiumModal?.classList.contains("active")
        ) {
            closePremiumModal();
        }
    });

=======
>>>>>>> aa0f245 (timeline)
    if (discoverPremiumButton) {
        discoverPremiumButton.addEventListener("click", () => {
            window.location.href = "../premium/index.html";
        });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    renderIcons();
});
=======
    function openPuzzleModal(slot) {
        if (!slot || !puzzleModal) {
            return;
        }
=======
    // =========================================
    // INICIALIZACIÓN
    // =========================================
>>>>>>> 00b7ae2 (timeline)

    applyFilter("all");
    renderIcons();
<<<<<<< HEAD
});
>>>>>>> aa0f245 (timeline)
=======
});
>>>>>>> 00b7ae2 (timeline)
