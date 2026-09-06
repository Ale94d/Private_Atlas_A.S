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

    // Navegación lateral: estado activo y animación de rebote robusta
    const navButtons = document.querySelectorAll(".nav-icon-btn");
    
    navButtons.forEach(btn => {
        // Evitamos afectar el avatar del usuario si lo tuviera
        if (btn.classList.contains('user-avatar')) return;

        btn.addEventListener("click", function() {
            navButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Aplicar clase de animación de rebote
            this.classList.add("clicked");
            setTimeout(() => {
                this.classList.remove("clicked");
            }, 200);
        });
    });
});
