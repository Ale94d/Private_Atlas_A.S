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

    // Cambio de estado activo en los botones de navegación lateral
    const navButtons = document.querySelectorAll(".nav-icon-btn:not(.user-avatar)");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
});
// =====================================
// ANIMACIÓN DE RETORNO / CLIC EN BOTONES
// =====================================
document.addEventListener("DOMContentLoaded", () => {
    const homeBtn = document.querySelector(".nav-icon-btn.active, .nav-icon-btn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function(e) {
            // Efecto de pulso / rebote al presionar
            this.style.transform = "scale(0.9)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });
    }
});
