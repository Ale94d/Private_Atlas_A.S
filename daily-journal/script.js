
/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
========================================= */

const sectionButtons = document.querySelectorAll(".section-button");
const journalSections = document.querySelectorAll(".journal-section");

sectionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionName = button.dataset.section;

        sectionButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        journalSections.forEach(section => {
            section.classList.remove("active-section");
        });

        const selectedSection = document.getElementById(sectionName);

        if (selectedSection) {
            selectedSection.classList.add("active-section");
        }

        // Actualizar los recuerdos al abrir su sección.
        if (sectionName === "mis-recuerdos") {
            renderMemories();
        }
    });
});


/* =========================================
   ELEMENTOS DEL DIARIO
========================================= */

const emotionButtons = document.querySelectorAll(".emotion");
const selectedMood = document.getElementById("selectedMood");
const journalText = document.getElementById("journalText");
const saveButton = document.getElementById("saveButton");

const memoriesList = document.getElementById("memoriesList");
const memoriesCount = document.getElementById("memoriesCount");

const STORAGE_KEY = "privateAtlasJournalMemories";

let selectedEmotion = "Sin emoción";


/* =========================================
   SELECCIÓN DE EMOCIONES
========================================= */

emotionButtons.forEach(button => {
    button.addEventListener("click", () => {
        emotionButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedEmotion = button.dataset.mood || "Sin emoción";

        if (selectedMood) {
            selectedMood.textContent = selectedEmotion;
        }

        // Ir al diario para continuar escribiendo.
        // La emoción seleccionada se conserva en memoria.
    });
});


/* =========================================
   OBTENER LOS RECUERDOS GUARDADOS
========================================= */

function getMemories() {
    try {
        const storedMemories = localStorage.getItem(STORAGE_KEY);

        if (!storedMemories) {
            return [];
        }

        const memories = JSON.parse(storedMemories);

        return Array.isArray(memories) ? memories : [];

    } catch (error) {
        console.error("Error al leer los recuerdos:", error);
        return [];
    }
}


/* =========================================
   ACTUALIZAR EL ALMACENAMIENTO
========================================= */

function saveMemories(memories) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(memories)
    );
}


/* =========================================
   ACTUALIZAR EL CONTADOR DE RECUERDOS
========================================= */

function updateMemoriesCount(total) {
    if (!memoriesCount) {
        return;
    }

    if (total === 0) {
        memoriesCount.textContent =
            "Todavía no tienes recuerdos guardados.";
    } else if (total === 1) {
        memoriesCount.textContent =
            "Has conservado 1 recuerdo de tu historia.";
    } else {
        memoriesCount.textContent =
            `Has conservado ${total} recuerdos de tu historia.`;
    }
}


/* =========================================
   FORMATEAR FECHAS
========================================= */

function formatMemoryDate(memory) {
    // Preferir la fecha de creación cuando está disponible.
    if (memory.createdAt) {
        const date = new Date(memory.createdAt);

        if (!Number.isNaN(date.getTime())) {
            return date.toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
    }

    // Compatibilidad con recuerdos guardados anteriormente.
    return memory.date || "Fecha no disponible";
}


/* =========================================
   CREAR UNA TARJETA DE RECUERDO
========================================= */

function createMemoryCard(memory) {
    const card = document.createElement("article");
    card.className = "memory-card";

    // Fecha del recuerdo.
    const date = document.createElement("span");
    date.className = "memory-date";
    date.textContent = formatMemoryDate(memory);

    // Emoción registrada.
    const mood = document.createElement("span");
    mood.className = "memory-mood";
    mood.textContent = `✧ ${memory.mood || "Sin emoción"}`;

    // Texto escrito por el usuario.
    const text = document.createElement("p");
    text.className = "memory-text";
    text.textContent = memory.text || "";

    // Botón para eliminar el recuerdo.
    const deleteButton = document.createElement("button");
    deleteButton.className = "memory-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "Eliminar recuerdo";
    deleteButton.setAttribute(
        "aria-label",
        "Eliminar este recuerdo"
    );

    deleteButton.addEventListener("click", () => {
        deleteMemory(memory.id);
    });

    card.appendChild(date);
    card.appendChild(mood);
    card.appendChild(text);
    card.appendChild(deleteButton);

    return card;
}


/* =========================================
   MOSTRAR ESTADO VACÍO
========================================= */

function renderEmptyMemories() {
    if (!memoriesList) {
        return;
    }

    const emptyState = document.createElement("div");
    emptyState.className = "memories-empty";

    const symbol = document.createElement("span");
    symbol.textContent = "✧";

    const title = document.createElement("h4");
    title.textContent = "Tu historia comienza aquí";

    const description = document.createElement("p");
    description.textContent =
        "Cuando guardes una página de tu diario, la encontrarás aquí, como un recuerdo de tu propio atlas.";

    emptyState.appendChild(symbol);
    emptyState.appendChild(title);
    emptyState.appendChild(description);

    memoriesList.appendChild(emptyState);
}


/* =========================================
   MOSTRAR TODOS LOS RECUERDOS
========================================= */

function renderMemories() {
    if (!memoriesList) {
        return;
    }

    // Limpiar las tarjetas anteriores para evitar duplicados.
    memoriesList.replaceChildren();

    const memories = getMemories();

    updateMemoriesCount(memories.length);

    if (memories.length === 0) {
        renderEmptyMemories();
        return;
    }

    // Mostrar primero el recuerdo más reciente.
    const recentFirst = [...memories].reverse();

    recentFirst.forEach(memory => {
        const card = createMemoryCard(memory);
        memoriesList.appendChild(card);
    });
}


/* =========================================
   GUARDAR UN NUEVO RECUERDO
========================================= */

if (saveButton && journalText) {
    saveButton.addEventListener("click", () => {
        const text = journalText.value.trim();

        if (!text) {
            alert("Escribe algo en tu diario antes de guardar.");
            journalText.focus();
            return;
        }

        const memory = {
            id: Date.now(),
            text: text,
            mood: selectedEmotion,
            date: new Date().toLocaleDateString("es-CO"),
            createdAt: new Date().toISOString()
        };

        try {
            const memories = getMemories();

            memories.push(memory);

            saveMemories(memories);

            // Actualizar inmediatamente la colección y el contador.
            renderMemories();

            saveButton.innerHTML =
                "<span>✦</span> Recuerdo guardado";

            saveButton.classList.add("saved");

            console.log("Recuerdo guardado correctamente:", memory);

            // Volver al aspecto original del botón.
            window.setTimeout(() => {
                saveButton.innerHTML =
                    "<span>✦</span> Guardar recuerdo";

                saveButton.classList.remove("saved");
            }, 2500);

        } catch (error) {
            console.error(
                "No se pudo guardar el recuerdo:",
                error
            );

            alert(
                "No se pudo guardar el recuerdo. Revisa el almacenamiento del navegador."
            );
        }
    });
}


/* =========================================
   ELIMINAR UN RECUERDO
========================================= */

function deleteMemory(memoryId) {
    const confirmed = window.confirm(
        "¿Seguro que deseas eliminar este recuerdo? Esta acción no se puede deshacer."
    );

    if (!confirmed) {
        return;
    }

    try {
        const memories = getMemories();

        const updatedMemories = memories.filter(
            memory => memory.id !== memoryId
        );

        saveMemories(updatedMemories);

        renderMemories();

        // Si el recuerdo eliminado era el último guardado,
        // no borrar automáticamente el texto que se está editando.

    } catch (error) {
        console.error(
            "No se pudo eliminar el recuerdo:",
            error
        );

        alert(
            "No se pudo eliminar el recuerdo. Inténtalo nuevamente."
        );
    }
}


/* =========================================
   RECUPERAR EL ÚLTIMO RECUERDO EN EL DIARIO
========================================= */

function loadLastMemory() {
    const memories = getMemories();

    if (memories.length === 0) {
        return;
    }

    const lastMemory = memories[memories.length - 1];

    if (journalText) {
        journalText.value = lastMemory.text || "";
    }

    selectedEmotion = lastMemory.mood || "Sin emoción";

    if (selectedMood) {
        selectedMood.textContent = selectedEmotion;
    }

    emotionButtons.forEach(button => {
        button.classList.toggle(
            "selected",
            button.dataset.mood === selectedEmotion
        );
    });
}


/* =========================================
   INICIALIZAR DAILY JOURNAL
========================================= */

function initializeJournal() {
    loadLastMemory();
    renderMemories();
}

initializeJournal();
