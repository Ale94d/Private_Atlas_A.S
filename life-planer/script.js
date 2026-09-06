document.addEventListener('DOMContentLoaded', () => {
    console.log("Private Atlas A.S. / Santuario Submarino inicializado correctamente.");

    // 1. Gestión de selección activa en los iconos de la barra lateral
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');
    
    sidebarIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Si el enlace apunta a otra página o archivo interno, permitimos la navegación normal
            // Si es un enlace interno de anclaje o interactivo, prevenimos comportamiento por defecto si se desea
            sidebarIcons.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Interactividad para los menús desplegables superiores (Filtros)
    const filterDropdowns = document.querySelectorAll('.filter-dropdown:not(.primary-pill)');
    
    filterDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            // Ejemplo de interacción visual al hacer clic en los filtros
            const spanText = this.querySelector('span');
            console.log(`Filtro seleccionado: ${spanText ? spanText.textContent : 'Opción'}`);
            
            // Efecto sutil de selección temporal
            this.style.borderColor = '#38bdf8';
            setTimeout(() => {
                this.style.borderColor = 'rgba(255, 255, 255, 0.07)';
            }, 400);
        });
    });

    // 3. Interactividad para marcar tareas como completadas en el cronograma
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(task => {
        task.addEventListener('click', function() {
            this.classList.toggle('done');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('done')) {
                if (icon) {
                    icon.classList.remove('far', 'fa-circle');
                    icon.classList.add('fas', 'fa-check-circle');
                }
            } else {
                if (icon) {
                    icon.classList.remove('fas', 'fa-check-circle');
                    icon.classList.add('far', 'fa-circle');
                }
            }
        });
    });

    // 4. Botón de añadir en la sección de finanzas
    const addFinanceBtn = document.querySelector('.add-circle-btn');
    if (addFinanceBtn) {
        addFinanceBtn.addEventListener('click', () => {
            alert("Función para registrar nuevo movimiento en el método 50/30/20 próximamente.");
        });
    }
});
