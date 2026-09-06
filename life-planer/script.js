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

    // Navegación lateral: estado activo y animación de rebote unificada para todos
    const navButtons = document.querySelectorAll(".nav-icon-btn:not(.user-avatar)");
    
    navButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            // Cambiar clase activa
            navButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Animación fluida de rebote / retorno
            this.style.transform = "scale(0.85)";
            setTimeout(() => {
                this.style.transform = "scale(1.08)";
            }, 120);
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 250);
        });
    });
});
