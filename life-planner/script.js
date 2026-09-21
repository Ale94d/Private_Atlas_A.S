/* js/script.js */
function updateRealtimeInfo() {
    const now = new Date();
    
    // Actualizar hora en formato de 24 horas
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = now.toLocaleTimeString('es-ES', { hour12: false });
    }

    // Actualizar fecha en español (Ej: dom, 6 sept 2026)
    const dateElement = document.getElementById('live-date');
    if (dateElement) {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('es-ES', options);
    }
}

// Inicializar de inmediato y actualizar cada segundo
setInterval(updateRealtimeInfo, 1000);
updateRealtimeInfo();
