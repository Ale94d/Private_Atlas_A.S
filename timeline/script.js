document.addEventListener("DOMContentLoaded", () => {
    const entranceScreen = document.getElementById("entrance-screen");
    const enterButton = document.getElementById("enter-button");
    const homeButton = document.querySelector(".home-button");

    const premiumModal = document.querySelector(".premium-modal");
    const closeModalButton = document.querySelector(".close-modal");


    function renderIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    renderIcons();


    if (enterButton && entranceScreen) {
        enterButton.addEventListener("click", () => {
            entranceScreen.classList.add("open");

            setTimeout(() => {
                entranceScreen.style.display = "none";
            }, 1500);
        });
    }


    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }


    function openPremiumModal() {
        if (!premiumModal) return;

        premiumModal.classList.add("active");
        document.body.style.overflow = "hidden";

        const closeButton = premiumModal.querySelector(".close-modal");

        if (closeButton) {
            closeButton.focus();
        }
    }

    function closePremiumModal() {
        if (!premiumModal) return;

        premiumModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".premium").forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            openPremiumModal();
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener("click", closePremiumModal);
    }

    if (premiumModal) {
        premiumModal.addEventListener("click", (event) => {
            if (event.target === premiumModal) {
                closePremiumModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePremiumModal();
        }
    });


    const discoverPremiumButton = premiumModal
        ? premiumModal.querySelector(".discover-premium")
        : null;

    if (discoverPremiumButton) {
        discoverPremiumButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }


    document.querySelectorAll(
        ".achievement-card:not(.premium)"
    ).forEach((card) => {
        card.addEventListener("click", () => {
        });
    });


    document.querySelectorAll(".puzzle-slot").forEach((slot) => {
        slot.addEventListener("click", () => {
            if (slot.classList.contains("premium")) {
                openPremiumModal();
                return;
            }

        });
    });



    document.querySelectorAll(
        ".achievement-card.premium, .puzzle-slot.premium"
    ).forEach((element) => {
        if (!element.hasAttribute("tabindex")) {
            element.setAttribute("tabindex", "0");
        }

        if (!element.hasAttribute("role")) {
            element.setAttribute("role", "button");
        }

        element.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPremiumModal();
            }
        });
    });

    renderIcons();
});