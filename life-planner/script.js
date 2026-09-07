/* js/script.js */
function updateRealtimeInfo() {
    const now = new Date();
    
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = now.toLocaleTimeString('es-ES');
    }

    const dateElement = document.getElementById('live-date');
    if (dateElement) {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('es-ES', options);
    }
}

setInterval(updateRealtimeInfo, 1000);
updateRealtimeInfo();
