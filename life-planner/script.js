(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        console.log("Private Atlas A.S. / Sistema abisal inicializado.");

        // 1. Control del botón de la casa y barra lateral
        const sidebarIcons = document.querySelectorAll('.sidebar-icon');
        const homeBtn = document.getElementById('home-btn');
        const macroContent = document.querySelector('.macro-content');

        sidebarIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault(); // Evita que la página brinque o recargue con el '#'
                
                sidebarIcons.forEach(item => item.classList.remove('active'));
                this.classList.add('active');

                if (this === homeBtn) {
                    if (macroContent) {
                        macroContent.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    console.log("Regresando al inicio del santuario...");
                } else {
                    const targetName = this.getAttribute('data-target');
                    console.log(`Navegando a la sección: ${targetName}`);
                }
            });
        });

        // 2. Interactividad en las tareas (Marcar/Desmarcar)
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(task => {
            task.addEventListener('click', function() {
                this.classList.toggle('done');
                
                const icon = this.querySelector('i');
                const statusTag = this.querySelector('.task-tag-status, .task-tag-date');
                
                if (this.classList.contains('done')) {
                    if (icon) {
                        icon.className = 'fas fa-check-circle text-cyan';
                    }
                    if (statusTag) {
                        statusTag.className = 'task-tag-status';
                        statusTag.textContent = 'Completado';
                    }
                } else {
                    if (icon) {
                        icon.className = 'far fa-circle';
                    }
                    if (statusTag) {
                        statusTag.className = 'task-tag-date';
                        statusTag.textContent = 'Vence: 10 Sep';
                    }
                }
            });
        });

        // 3. Botón flotante de finanzas / añadir
        const addFinanceBtn = document.querySelector('.add-circle-btn');
        if (addFinanceBtn) {
            addFinanceBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert("Panel del método 50/30/20: Listo para registrar nuevo movimiento.");
            });
        }
    });
})();