document.addEventListener("DOMContentLoaded", () => {
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

    const entrance = document.querySelector(".timeline-entrance");
    const enterButton = document.querySelector("#enter-button");
    const homeButton = document.querySelector(".back-home");

    const achievementGrid = document.querySelector("#achievement-grid");
    const filterButtons = document.querySelectorAll(".filter-button");

    // Modal de logros
    const achievementModal = document.querySelector("#achievement-modal");
    const achievementModalCard = document.querySelector(
        ".achievement-modal-card"
    );
    const achievementModalClose = document.querySelector(
        ".achievement-modal-close"
    );

    const achievementModalTier = document.querySelector(
        "#achievement-modal-tier"
    );
    const achievementModalTitle = document.querySelector(
        "#achievement-modal-title"
    );
    const achievementModalDescription = document.querySelector(
        "#achievement-modal-description"
    );
    const achievementModalCondition = document.querySelector(
        "#achievement-modal-condition"
    );
    const achievementModalReward = document.querySelector(
        "#achievement-modal-reward"
    );
    const achievementModalProgressLabel = document.querySelector(
        "#achievement-modal-progress-label"
    );
    const achievementModalProgressBar = document.querySelector(
        "#achievement-modal-progress-bar"
    );

    // Modal Premium
    const premiumModal = document.querySelector("#premium-modal");
    const premiumModalCard = document.querySelector(".premium-modal-card");
    const premiumModalClose = document.querySelector(".premium-modal-close");
    const discoverPremiumButton = document.querySelector(
        "#discover-premium"
    );

    // Modal de rompecabezas
    const puzzleModal = document.querySelector("#puzzle-modal");
    const puzzleModalCard = document.querySelector(".puzzle-modal-card");
    const puzzleModalClose = document.querySelector(".puzzle-modal-close");
    const puzzleModalTitle = document.querySelector("#puzzle-modal-title");
    const puzzleModalDescription = document.querySelector(
        "#puzzle-modal-description"
    );
    const puzzleModalNote = document.querySelector("#puzzle-modal-note");
    const puzzlePieces = document.querySelectorAll(".puzzle-piece");


    let entranceStarted = false;
    let lastFocusedElement = null;
    let activeModal = null;

>>>>>>> aa0f245 (timeline)

    function renderIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

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
        }

        if (headerSubtitle) {
            headerSubtitle.textContent = "Salón de logros";
        }

        // Mantener coherente la pantalla de entrada
        if (entranceTitle) {
            entranceTitle.textContent = "Timeline";
        }

        if (entranceSubtitle) {
            entranceSubtitle.textContent = "Salón de logros";
        }

        // Retirar el bloque introductorio de la galería
        const achievementSection = document.querySelector(
            ".achievement-section"
        );

        if (achievementSection) {
            const sectionHeading = achievementSection.querySelector(
                ".section-heading"
            );

            const summary = achievementSection.querySelector(
                ".achievement-summary"
            );

            if (sectionHeading) {
                sectionHeading.remove();
            }

            if (summary) {
                summary.remove();
            }
        }

        document.querySelectorAll(
            '.filter-button[data-filter="locked"], ' +
            '.filter-button[data-filter="premium"]'
        ).forEach((button) => button.remove());

        // Garantizar que el filtro inicial sea "Todos"
        filterButtons.forEach((button) => {
            const isAll = button.dataset.filter === "all";

            button.classList.toggle("active", isAll);
            button.setAttribute("aria-pressed", String(isAll));
        });

        document.querySelectorAll(".achievement-card").forEach((card) => {
            if (card.dataset.premium === "true" ||
                card.classList.contains("premium")) {
                card.classList.add("premium", "locked");
            } else {
                card.classList.add("free");
            }
        });
    }

    function enterTimeline() {
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
        }, 1400);
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
            "Entrar a Timeline"
        );
    }

    if (enterButton) {
        enterButton.addEventListener("click", (event) => {
            event.stopPropagation();
            enterTimeline();
        });
    }


>>>>>>> aa0f245 (timeline)
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

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
        if (!modal) {
            return;
        }

        // Cerrar el modal anterior si se cambia directamente a otro.
        if (activeModal && activeModal !== modal) {
            activeModal.classList.remove("active");
            activeModal.setAttribute("aria-hidden", "true");
        }

        lastFocusedElement = document.activeElement;
        activeModal = modal;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        renderIcons();

        if (focusElement) {
            focusElement.focus();
        }
    }

    function closeModal(modal) {
        if (!modal) {
            return;
        }

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        if (activeModal === modal) {
            activeModal = null;
        }

        if (!activeModal) {
            document.body.style.overflow = "";
        }

        if (
            lastFocusedElement &&
            document.contains(lastFocusedElement) &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    }

    function openAchievementModal(card) {
        if (!card || !achievementModal) {
            return;
        }

        const number = card.querySelector(".achievement-number");
        const tier = card.querySelector(".achievement-tier");
        const title = card.querySelector(".achievement-name");
        const description = card.querySelector(
            ".achievement-description"
        );
        const progressLabel = card.querySelector(
            ".achievement-progress-label"
        );
        const progressFill = card.querySelector(
            ".progress-fill"
        );

        const achievementName = title
            ? title.textContent.trim()
            : "Logro";

        const achievementTier = tier
            ? tier.textContent.trim()
            : "Gratuito";

        const achievementDescription = description
            ? description.textContent.trim()
            : "No hay una descripción disponible.";

        const progressText = progressLabel
            ? progressLabel.textContent.trim()
            : "Progreso por registrar";

        let progress = 0;

        if (progressFill) {
            const width = progressFill.style.width;
            const parsedProgress = Number.parseFloat(width);

            if (Number.isFinite(parsedProgress)) {
                progress = Math.min(100, Math.max(0, parsedProgress));
            }
        }

        if (achievementModalTier) {
            achievementModalTier.textContent = number
                ? `${achievementTier} · Logro ${number.textContent.trim()}`
                : achievementTier;
        }

        if (achievementModalTitle) {
            achievementModalTitle.textContent = achievementName;
        }

        if (achievementModalDescription) {
            achievementModalDescription.textContent =
                achievementDescription;
        }

        // El HTML no contiene condiciones individuales ni recompensas
        // específicas. Se muestra información coherente con el estado actual.
        if (achievementModalCondition) {
            achievementModalCondition.textContent =
                "Consulta la descripción del logro. " +
                "La condición específica se debe conectar al sistema de progreso.";
        }

        if (achievementModalReward) {
            achievementModalReward.textContent =
                card.dataset.unlocked === "true"
                    ? "Logro desbloqueado."
                    : "Este logro todavía no está desbloqueado.";
        }

        if (achievementModalProgressLabel) {
            achievementModalProgressLabel.textContent =
                card.dataset.unlocked === "true"
                    ? "100%"
                    : `${progress}%`;
        }

        if (achievementModalProgressBar) {
            achievementModalProgressBar.style.width =
                card.dataset.unlocked === "true"
                    ? "100%"
                    : `${progress}%`;
        }

        openModal(achievementModal, achievementModalClose);
    }

    function openPremiumModal() {
        openModal(premiumModal, premiumModalClose);
    }

    if (premiumModalClose) {
        premiumModalClose.addEventListener("click", () => {
            closeModal(premiumModal);
        });
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
            }
        });
    }

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
    renderIcons();
});
=======
    function openPuzzleModal(slot) {
        if (!slot || !puzzleModal) {
            return;
        }

        const puzzleNumber = Number.parseInt(
            slot.dataset.puzzle || "1",
            10
        );

        const puzzleName = slot.querySelector(".puzzle-name");
        const puzzleStatus = slot.querySelector(".puzzle-status");

        const name = puzzleName
            ? puzzleName.textContent.trim()
            : `Rompecabezas ${puzzleNumber}`;

        const isPremium =
            slot.dataset.premium === "true" ||
            slot.classList.contains("premium-puzzle");

        if (isPremium) {
            openPremiumModal();
            return;
        }

        if (puzzleModalTitle) {
            puzzleModalTitle.textContent = name;
        }

        if (puzzleModalDescription) {
            puzzleModalDescription.textContent =
                `Este es el ${name}. Sus piezas y su progreso ` +
                "se mostrarán cuando se conecte el sistema de rompecabezas.";
        }

        if (puzzleModalNote) {
            puzzleModalNote.textContent = puzzleStatus
                ? `${puzzleStatus.textContent.trim()}. El progreso aún no está conectado.`
                : "El progreso aún no está conectado.";
        }

        // Las piezas son una representación visual, no progreso real.
        puzzlePieces.forEach((piece) => {
            piece.classList.remove("collected", "completed");
            piece.setAttribute("aria-hidden", "true");
        });

        openModal(puzzleModal, puzzleModalClose);
    }

    document.querySelectorAll(".puzzle-slot").forEach((slot) => {
        slot.addEventListener("click", () => {
            openPuzzleModal(slot);
        });
    });

    if (puzzleModalClose) {
        puzzleModalClose.addEventListener("click", () => {
            closeModal(puzzleModal);
        });
    }

    if (puzzleModal) {
        puzzleModal.addEventListener("click", (event) => {
            if (
                event.target === puzzleModal ||
                event.target.closest("[data-close-puzzle]")
            ) {
                closeModal(puzzleModal);
            }
        });
    }

    if (puzzleModalCard) {
        puzzleModalCard.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    if (achievementModalClose) {
        achievementModalClose.addEventListener("click", () => {
            closeModal(achievementModal);
        });
    }

    if (achievementModal) {
        achievementModal.addEventListener("click", (event) => {
            if (
                event.target === achievementModal ||
                event.target.closest("[data-close-achievement]")
            ) {
                closeModal(achievementModal);
            }
        });
    }

    if (achievementModalCard) {
        achievementModalCard.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    function applyFilter(filter) {
        if (!achievementGrid) {
            return;
        }

        const cards = achievementGrid.querySelectorAll(
            ".achievement-card"
        );

        cards.forEach((card) => {
            const isUnlocked = card.dataset.unlocked === "true";

            // "Todos" incluye gratuitos y Premium.
            // "Desbloqueados" solo muestra logros marcados como desbloqueados.
            const shouldShow =
                filter === "all" ||
                (filter === "unlocked" && isUnlocked);

            card.hidden = !shouldShow;
        });

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === filter;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            if (filter === "all" || filter === "unlocked") {
                applyFilter(filter);
            }
        });
    });

    document.querySelectorAll(".achievement-card").forEach((card) => {
        card.addEventListener("click", () => {
            const isPremium =
                card.dataset.premium === "true" ||
                card.classList.contains("premium");

            if (isPremium) {
                openPremiumModal();
            } else {
                openAchievementModal(card);
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && activeModal) {
            closeModal(activeModal);
        }
    });

    configureTimeline();
    applyFilter("all");
    renderIcons();
});
>>>>>>> aa0f245 (timeline)
