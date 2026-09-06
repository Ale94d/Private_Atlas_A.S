document.addEventListener("DOMContentLoaded", () => {
    // Botón de exploración del banner
    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            alert("¡Bienvenido al núcleo de Private Atlas A.S.! Tu viaje está en marcha.");
        });
    }

    // Incremento dinámico de estadísticas vitales
    const nextGoalBtn = document.getElementById("nextGoalBtn");
    const counterVal = document.getElementById("counterVal");
    let progress = 88;

    if (nextGoalBtn && counterVal) {
        nextGoalBtn.addEventListener("click", () => {
            progress = progress >= 98 ? 75 : progress + 3;
            counterVal.textContent = progress + "%";
        });
    }

    // Navegación lateral con estado activo y animación de rebote fluida
    const navButtons = document.querySelectorAll(".nav-icon-btn:not(.user-avatar)");
    const homeBtn = document.getElementById("homeBtn");

    navButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            // Si es la casita, no bloqueamos su comportamiento de enlace
            if (this.id === "homeBtn") return;

            navButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Animación elástica de rebote al presionar
            this.style.transform = "scale(0.82)";
            setTimeout(() => {
                this.style.transform = "scale(1.1)";
            }, 120);
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 250);
        });
    });

    // Casita: Reproduce la animación de rebote y regresa al indice.html
    if (homeBtn) {
        homeBtn.addEventListener("click", function(e) {
            e.preventDefault(); // Pausa un segundo para lucir el rebote
            
            // Animación de rebote antes de salir
            this.style.transform = "scale(0.82)";
            setTimeout(() => {
                this.style.transform = "scale(1.1)";
            }, 100);
            
            // Redirige a tu pantalla principal (indice.html)
            setTimeout(() => {
                window.location.href = "indice.html";
            }, 220);
        });
    }
});
